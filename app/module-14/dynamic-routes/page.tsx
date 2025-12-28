import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function DynamicRoutesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Typing Dynamic Routes
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Dynamic routes can be typed for parameter extraction and validation.
      </p>

      <Section title="1. Parameter Extraction">
        <p className="text-gray-700 dark:text-gray-300">
          Dynamic route parameters can be extracted and typed for type-safe
          route handling.
        </p>

        <CodeBlock title="Typed Parameter Extraction">
          {`import { useParams, useMatch } from 'react-router-dom';

// Typed parameter extraction
interface DynamicParams {
  userId: string;
  postId?: string;
}

function DynamicRouteComponent() {
  const params = useParams<keyof DynamicParams>() as DynamicParams;
  
  // params.userId is typed as string
  // params.postId is typed as string | undefined
  return (
    <div>
      <p>User: {params.userId}</p>
      {params.postId && <p>Post: {params.postId}</p>}
    </div>
  );
}

// Typed route matching
function useTypedMatch<T extends Record<string, string>>(pattern: string) {
  const match = useMatch(pattern);
  return match ? (match.params as T) : null;
}

// Usage
function UserPostComponent() {
  const params = useTypedMatch<{ userId: string; postId: string }>(
    '/users/:userId/posts/:postId'
  );
  
  if (!params) return null;
  
  // params is fully typed
  return (
    <div>
      <p>User: {params.userId}</p>
      <p>Post: {params.postId}</p>
    </div>
  );
}

// Typed parameter validation
function validateRouteParams<T extends Record<string, string>>(
  params: Record<string, string | undefined>,
  required: (keyof T)[]
): T {
  const validated: Partial<T> = {};
  
  for (const key of required) {
    const value = params[key as string];
    if (!value) {
      throw new Error(\`Missing required parameter: \${String(key)}\`);
    }
    validated[key] = value as T[keyof T];
  }
  
  return validated as T;
}

// Usage
function ValidatedRouteComponent() {
  const rawParams = useParams();
  const params = validateRouteParams<{ userId: string; postId: string }>(
    rawParams,
    ['userId', 'postId']
  );
  
  // params is guaranteed to have userId and postId
  return <div>{params.userId} - {params.postId}</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Route Parameter Utilities">
          {`// Typed route parameter parser
function parseRouteParams<T extends Record<string, string>>(
  pathname: string,
  pattern: string
): T | null {
  const patternParts = pattern.split('/');
  const pathParts = pathname.split('/');
  
  if (patternParts.length !== pathParts.length) {
    return null;
  }
  
  const params: Partial<T> = {};
  
  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const pathPart = pathParts[i];
    
    if (patternPart.startsWith(':')) {
      const paramName = patternPart.slice(1) as keyof T;
      params[paramName] = pathPart as T[keyof T];
    } else if (patternPart !== pathPart) {
      return null;
    }
  }
  
  return params as T;
}

// Typed route builder
function buildRoute<T extends Record<string, string>>(
  pattern: string,
  params: T
): string {
  let route = pattern;
  Object.entries(params).forEach(([key, value]) => {
    route = route.replace(\`:\${key}\`, value);
  });
  return route;
}

// Usage
const pattern = '/users/:userId/posts/:postId';
const params = { userId: '123', postId: '456' };
const route = buildRoute(pattern, params); // '/users/123/posts/456'

const extracted = parseRouteParams<typeof params>(route, pattern);
// extracted = { userId: '123', postId: '456' }`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Dynamic route params are typed with useParams</li>
          <li>Route matching can be typed with useMatch</li>
          <li>Parameter validation ensures type safety</li>
          <li>Route builders support typed parameter construction</li>
        </ul>
      </InfoBox>
    </div>
  );
}

