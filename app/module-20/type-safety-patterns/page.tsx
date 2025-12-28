import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeSafetyPatternsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Type Safety Best Practices
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Best practices for maintaining type safety in React TypeScript
        applications.
      </p>

      <Section title="1. Avoiding Type Assertions, Exhaustive Checking, Branded Types">
        <p className="text-gray-700 dark:text-gray-300">
          Patterns for avoiding unsafe type assertions, exhaustive type
          checking, and creating nominal types.
        </p>

        <CodeBlock title="Avoiding Type Assertions">
          {`// ❌ Bad: Using type assertions
const data = response.json() as User;  // Unsafe!

// ✅ Good: Type guards
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    typeof (data as any).id === 'string' &&
    typeof (data as any).name === 'string'
  );
}

const data = response.json();
if (isUser(data)) {
  // data is now typed as User
  console.log(data.name);
}

// ✅ Good: Validation with zod
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

const data = UserSchema.parse(response.json());  // Typed and validated

// ✅ Good: Narrowing with type predicates
function parseUser(input: unknown): User | null {
  if (typeof input !== 'object' || input === null) return null;
  const obj = input as Record<string, unknown>;
  if (typeof obj.id === 'string' && typeof obj.name === 'string') {
    return { id: obj.id, name: obj.name };
  }
  return null;
}`}
        </CodeBlock>

        <CodeBlock title="Exhaustive Type Checking">
          {`// Exhaustive checking with never type
type Status = 'pending' | 'loading' | 'success' | 'error';

function handleStatus(status: Status) {
  switch (status) {
    case 'pending':
      return 'Waiting...';
    case 'loading':
      return 'Loading...';
    case 'success':
      return 'Done!';
    case 'error':
      return 'Failed!';
    default:
      // TypeScript error if status type is extended
      const exhaustiveCheck: never = status;
      throw new Error(\`Unhandled status: \${exhaustiveCheck}\`);
  }
}

// Exhaustive checking with discriminated unions
type Result<T> =
  | { type: 'success'; data: T }
  | { type: 'error'; error: string }
  | { type: 'loading' };

function handleResult<T>(result: Result<T>) {
  switch (result.type) {
    case 'success':
      return result.data;  // Typed as T
    case 'error':
      return result.error;  // Typed as string
    case 'loading':
      return null;
    default:
      const exhaustiveCheck: never = result;
      return exhaustiveCheck;
  }
}

// Exhaustive checking helper
function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

function processEvent(event: Event) {
  switch (event.type) {
    case 'click':
      return handleClick(event);
    case 'keydown':
      return handleKeyDown(event);
    default:
      return assertNever(event);  // Ensures exhaustiveness
  }
}`}
        </CodeBlock>

        <CodeBlock title="Branded Types">
          {`// Branded types for nominal typing
type UserId = string & { readonly __brand: unique symbol };
type ProductId = string & { readonly __brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

function createProductId(id: string): ProductId {
  return id as ProductId;
}

// Type-safe ID usage
function getUser(id: UserId): User {
  // Implementation
  return {} as User;
}

function getProduct(id: ProductId): Product {
  // Implementation
  return {} as Product;
}

// Usage - prevents mixing IDs
const userId = createUserId('user-123');
const productId = createProductId('prod-456');

getUser(userId);      // OK
getUser(productId);   // Error: Type 'ProductId' is not assignable to 'UserId'

// Branded types for validated data
type ValidatedEmail = string & { readonly __brand: 'ValidatedEmail' };

function validateEmail(email: string): ValidatedEmail | null {
  if (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return email as ValidatedEmail;
  }
  return null;
}

function sendEmail(email: ValidatedEmail) {
  // Only accepts validated emails
}

const email = validateEmail('test@example.com');
if (email) {
  sendEmail(email);  // Type-safe
}

// Branded types for units
type Meters = number & { readonly __brand: 'Meters' };
type Seconds = number & { readonly __brand: 'Seconds' };

function createMeters(value: number): Meters {
  return value as Meters;
}

function createSeconds(value: number): Seconds {
  return value as Seconds;
}

function calculateSpeed(distance: Meters, time: Seconds): number {
  return distance / time;  // Type-safe unit calculation
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Type Predicates, Const Assertions, Satisfies Operator">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns for type narrowing, const assertions, and the
          satisfies operator.
        </p>

        <CodeBlock title="Type Predicates">
          {`// Type predicate functions
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}

// Usage with narrowing
function processValue(value: unknown) {
  if (isString(value)) {
    // value is now typed as string
    console.log(value.toUpperCase());
  } else if (isNumber(value)) {
    // value is now typed as number
    console.log(value.toFixed(2));
  } else if (isUser(value)) {
    // value is now typed as User
    console.log(value.name);
  }
}

// Type predicate with generic
function isArrayOf<T>(
  value: unknown,
  predicate: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(predicate);
}

// Usage
const data: unknown = [1, 2, 3];
if (isArrayOf(data, isNumber)) {
  // data is typed as number[]
  const sum = data.reduce((a, b) => a + b, 0);
}`}
        </CodeBlock>

        <CodeBlock title="Const Assertions">
          {`// Const assertions for literal types
const colors = ['red', 'green', 'blue'] as const;
// Type: readonly ["red", "green", "blue"]

type Color = typeof colors[number];  // "red" | "green" | "blue"

// Const assertions with objects
const config = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
  },
  features: {
    darkMode: true,
    analytics: false,
  },
} as const;

// Type is deeply readonly
type Config = typeof config;
// Config.api.baseUrl is readonly

// Const assertions with functions
function getStatus() {
  return 'active' as const;
}
// Return type is literal "active", not string

// Const assertions for tuple types
const point = [10, 20] as const;
// Type: readonly [10, 20]

// Const assertions with template literals
const route = \`/users/\${userId}\` as const;
// Type is literal string, not template literal type

// Const assertions for enums
const Status = {
  Pending: 'pending',
  Loading: 'loading',
  Success: 'success',
} as const;

type Status = typeof Status[keyof typeof Status];
// Type: "pending" | "loading" | "success"`}
        </CodeBlock>

        <CodeBlock title="Satisfies Operator">
          {`// Satisfies operator (TypeScript 4.9+)
// Checks type without widening

// Without satisfies (type is widened)
const config1 = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
  },
};
// Type: { api: { baseUrl: string; timeout: number } }

// With satisfies (preserves literal types)
const config2 = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
  },
} satisfies {
  api: {
    baseUrl: string;
    timeout: number;
  };
};
// Type is preserved with literal types

// Satisfies with const assertion
const config3 = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
  },
} as const satisfies {
  api: {
    baseUrl: string;
    timeout: number;
  };
};

// Satisfies for validation
interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
}

const config4 = {
  api: {
    baseUrl: 'https://api.example.com',
    timeout: 5000,
    // extra: 'property',  // Error: Object literal may only specify known properties
  },
} satisfies Config;

// Satisfies with function return types
function createConfig() {
  return {
    api: {
      baseUrl: 'https://api.example.com',
      timeout: 5000,
    },
  } satisfies Config;
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Advanced Type Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Template literal types, recursive types, conditional types, and
          variadic tuple types.
        </p>

        <CodeBlock title="Template Literal Types & Recursive Types">
          {`// Template literal types for string validation
type Route = \`/\${string}\`;
type ApiRoute = \`/api/\${string}\`;
type UserRoute = \`/users/\${string}\`;

function navigate(route: Route) {
  // Implementation
}

navigate('/home');        // OK
navigate('/api/users');   // OK
navigate('invalid');      // Error

// Template literal types with unions
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = \`\${HttpMethod} /api/\${string}\`;

// Recursive types
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

// Recursive type for tree structures
type TreeNode<T> = {
  value: T;
  children: TreeNode<T>[];
};

// Recursive type for linked lists
type LinkedList<T> =
  | { value: T; next: LinkedList<T> }
  | null;

// Conditional type patterns
type NonNullable<T> = T extends null | undefined ? never : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Variadic tuple types
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [
  ...T,
  ...U
];

type Result = Concat<[1, 2], [3, 4]>;  // [1, 2, 3, 4]

// Variadic tuple with rest elements
type Head<T extends readonly unknown[]> = T extends readonly [
  infer H,
  ...unknown[]
]
  ? H
  : never;

type Tail<T extends readonly unknown[]> = T extends readonly [
  unknown,
  ...infer Rest
]
  ? Rest
  : [];

type First = Head<[1, 2, 3]>;  // 1
type Rest = Tail<[1, 2, 3]>;   // [2, 3]`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Avoid type assertions; use type guards instead</li>
          <li>Use never type for exhaustive checking</li>
          <li>Branded types create nominal types in structural type system</li>
          <li>Type predicates enable type narrowing</li>
          <li>Const assertions preserve literal types</li>
          <li>Satisfies operator checks types without widening</li>
        </ul>
      </InfoBox>
    </div>
  );
}

