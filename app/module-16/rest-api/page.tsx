import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function RESTAPIPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        REST API TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        REST API endpoints can be typed for type-safe request and response
        handling.
      </p>

      <Section title="1. Typing Endpoints, Request/Response Types">
        <p className="text-gray-700 dark:text-gray-300">
          REST API endpoints can be typed with interfaces for requests and
          responses.
        </p>

        <CodeBlock title="Typed REST API Client">
          {`// Typed API endpoint definitions
interface ApiEndpoints {
  '/api/users': {
    GET: {
      request: { query?: { page?: number; limit?: number } };
      response: User[];
    };
    POST: {
      request: { body: CreateUserRequest };
      response: User;
    };
  };
  '/api/users/:id': {
    GET: {
      request: { params: { id: string } };
      response: User;
    };
    PUT: {
      request: { params: { id: string }; body: UpdateUserRequest };
      response: User;
    };
    DELETE: {
      request: { params: { id: string } };
      response: void;
    };
  };
}

// Typed API client
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function apiRequest<
  TEndpoint extends keyof ApiEndpoints,
  TMethod extends HttpMethod & keyof ApiEndpoints[TEndpoint]
>(
  endpoint: TEndpoint,
  method: TMethod,
  options?: ApiEndpoints[TEndpoint][TMethod]['request']
): Promise<ApiEndpoints[TEndpoint][TMethod]['response']> {
  let url = endpoint as string;
  
  // Replace path params
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url = url.replace(\`:\${key}\`, value);
    });
  }
  
  // Add query params
  if (options?.query) {
    const params = new URLSearchParams();
    Object.entries(options.query).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
    url += \`?\${params.toString()}\`;
  }
  
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
  
  if (!response.ok) {
    throw new Error(\`API error: \${response.statusText}\`);
  }
  
  if (method === 'DELETE') {
    return undefined as ApiEndpoints[TEndpoint][TMethod]['response'];
  }
  
  return response.json();
}

// Usage
const users = await apiRequest('/api/users', 'GET', { query: { page: 1 } });
const user = await apiRequest('/api/users/:id', 'GET', { params: { id: '1' } });
const newUser = await apiRequest('/api/users', 'POST', {
  body: { name: 'John', email: 'john@example.com' },
});`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>REST endpoints are typed with interface definitions</li>
          <li>Request and response types are fully typed</li>
          <li>API clients support type-safe method calls</li>
          <li>Path and query parameters are typed</li>
        </ul>
      </InfoBox>
    </div>
  );
}

