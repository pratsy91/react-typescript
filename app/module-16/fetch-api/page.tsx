import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function FetchAPIPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Fetch API TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        The Fetch API can be typed with TypeScript for type-safe HTTP
        requests and responses.
      </p>

      <Section title="1. Typing Fetch Requests and Responses">
        <p className="text-gray-700 dark:text-gray-300">
          Fetch requests and responses can be typed for type-safe API calls.
        </p>

        <CodeBlock title="Typed Fetch Functions">
          {`// Typed fetch function
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error(\`Failed to fetch user: \${response.statusText}\`);
  }
  return response.json();
}

// Typed fetch with error handling
async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Typed fetch with request options
interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
}

async function typedFetch<T>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  const response = await fetch(url, {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
  
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  
  return response.json();
}

// Usage
const user = await typedFetch<User>('/api/users/1');
const users = await typedFetch<User[]>('/api/users');`}
        </CodeBlock>

        <CodeBlock title="Typed Fetch with Response Types">
          {`// Typed API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

async function fetchApiResponse<T>(
  url: string
): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const data: T = await response.json();
  
  return {
    data,
    status: response.status,
    message: response.statusText,
  };
}

// Typed fetch with error response
interface ApiError {
  message: string;
  code: number;
  details?: unknown;
}

async function fetchWithErrorHandling<T>(
  url: string
): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw error;
  }
  
  return response.json();
}

// Typed fetch with timeout
async function fetchWithTimeout<T>(
  url: string,
  timeout: number = 5000
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Fetch responses are typed with generic Promise types</li>
          <li>Request options can be typed with interfaces</li>
          <li>Error handling supports typed error responses</li>
          <li>Response wrappers enable consistent typing</li>
        </ul>
      </InfoBox>
    </div>
  );
}

