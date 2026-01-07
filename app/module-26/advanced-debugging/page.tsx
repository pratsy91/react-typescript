import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function AdvancedDebuggingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Advanced Debugging - Interview Questions
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Advanced TypeScript + React + Next.js debugging scenarios.
      </p>

      <Section title="1. Complex Type Errors">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging complex type system issues.
        </p>

        <CodeBlock title="Problem 1: Conditional Type Not Working">
          {`// ❌ WHAT'S WRONG
type IsArray<T> = T extends any[] ? true : false;
type Test1 = IsArray<string[]>;  // true ✓
type Test2 = IsArray<number>;     // false ✓
type Test3 = IsArray<string[] | number[]>;  // boolean (not true | false)

// WHY IT HAPPENS
// Conditional types are distributive over union types
// IsArray<string[] | number[]> becomes IsArray<string[]> | IsArray<number[]>
// Which is true | false = boolean

// ✅ EXACT FIX
// Prevent distribution with brackets
type IsArray<T> = [T] extends [any[]] ? true : false;
type Test3 = IsArray<string[] | number[]>;  // false (correct!)

// OR use never to exclude distribution
type IsArray<T> = T extends any[] 
  ? [T] extends [never] 
    ? false 
    : true 
  : false;`}
        </CodeBlock>

        <CodeBlock title="Problem 2: Mapped Type Key Error">
          {`// ❌ WHAT'S WRONG
type Optional<T> = {
  [K in keyof T]?: T[K];
};
type Test = Optional<{ a: string; b: number }>;
// Works, but...
type ReadonlyKeys<T> = {
  readonly [K in keyof T]: T[K];
};
type Test2 = ReadonlyKeys<{ a: string } & { b: number }>;
// Error: Type instantiation is excessively deep

// WHY IT HAPPENS
// Intersection types can cause infinite recursion in mapped types
// TypeScript tries to resolve all possible combinations

// ✅ EXACT FIX
// Flatten intersection first
type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type ReadonlyKeys<T> = {
  readonly [K in keyof Prettify<T>]: Prettify<T>[K];
};

// OR use simpler approach
type ReadonlyKeys<T extends Record<string, unknown>> = {
  readonly [K in keyof T]: T[K];
};`}
        </CodeBlock>

        <CodeBlock title="Problem 3: Template Literal Type Too Complex">
          {`// ❌ WHAT'S WRONG
type Route<T extends string> = T extends \`/\${infer Rest}\`
  ? Rest extends \`\${infer Part}/\${infer Rest2}\`
    ? Rest2 extends \`\${infer Part2}/\${infer Rest3}\`
      ? [Part, Part2, Rest3]  // Too nested!
      : never
    : never
  : never;
// Error: Type instantiation is excessively deep

// WHY IT HAPPENS
// Deeply nested template literal inference causes recursion
// TypeScript has limits on type instantiation depth

// ✅ EXACT FIX
// Use simpler, iterative approach
type SplitRoute<T extends string> = T extends \`/\${infer Rest}\`
  ? Rest extends \`\${infer Part}/\${infer Rest2}\`
    ? [Part, ...SplitRoute<\`/\${Rest2}\`>]
    : [Rest]
  : [];

// OR use string manipulation
type RouteParts<T extends string> = T extends \`/\${infer Rest}\`
  ? Rest extends \`\${infer Part}/\${infer Rest2}\`
    ? [Part, Rest2]
    : [Rest]
  : [];`}
        </CodeBlock>
      </Section>

      <Section title="2. React Performance Type Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging React performance-related type problems.
        </p>

        <CodeBlock title="Problem 4: Memo Comparison Type Error">
          {`// ❌ WHAT'S WRONG
const Memoized = memo(Component, (prev, next) => {
  return prev.data.id === next.data.id;
});  // Error: Comparison function not typed correctly

// WHY IT HAPPENS
// memo's comparison function needs proper typing
// TypeScript can't infer the comparison signature

// ✅ EXACT FIX
import { memo } from "react";

interface ComponentProps {
  data: { id: string; name: string };
}

const Memoized = memo<ComponentProps>(
  Component,
  (prevProps, nextProps) => {
    return prevProps.data.id === nextProps.data.id;
  }
);

// OR use typed comparison helper
function typedMemo<T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
  areEqual?: (prev: T, next: T) => boolean
) {
  return memo(Component, areEqual);
}`}
        </CodeBlock>

        <CodeBlock title="Problem 5: useMemo Dependency Type Error">
          {`// ❌ WHAT'S WRONG
const expensive = useMemo(() => {
  return compute(data);
}, [data.id]);  // Error: data.id might not exist

// WHY IT HAPPENS
// data might be null/undefined
// Accessing .id on potentially null value

// ✅ EXACT FIX
// Check for data existence
const expensive = useMemo(() => {
  if (!data) return null;
  return compute(data);
}, [data?.id]);

// OR ensure data is defined
const expensive = useMemo(() => {
  return compute(data);
}, [data.id]);  // If data is guaranteed to exist

// OR use optional chaining in dependency
const expensive = useMemo(() => {
  return data ? compute(data) : null;
}, [data?.id ?? ""]);`}
        </CodeBlock>
      </Section>

      <Section title="3. Next.js Advanced Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging advanced Next.js type problems.
        </p>

        <CodeBlock title="Problem 6: Server Action Type Error">
          {`// ❌ WHAT'S WRONG
"use server";

export async function createUser(data: FormData) {
  const name = data.get("name");  // Type: FormDataEntryValue | null
  const email = data.get("email");  // Type: FormDataEntryValue | null
  // name and email might be File or null!
  
  await saveUser({ name, email });  // Error: Type mismatch
}

// WHY IT HAPPENS
// FormData.get() returns FormDataEntryValue | null
// FormDataEntryValue is string | File
// Need proper type narrowing

// ✅ EXACT FIX
"use server";

interface CreateUserData {
  name: string;
  email: string;
}

export async function createUser(formData: FormData): Promise<CreateUserData> {
  const name = formData.get("name");
  const email = formData.get("email");
  
  if (!name || !email) {
    throw new Error("Name and email are required");
  }
  
  if (typeof name !== "string" || typeof email !== "string") {
    throw new Error("Invalid form data");
  }
  
  const userData: CreateUserData = { name, email };
  await saveUser(userData);
  return userData;
}

// OR use validation library
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function createUser(formData: FormData) {
  const data = UserSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
  });
  await saveUser(data);
}`}
        </CodeBlock>

        <CodeBlock title="Problem 7: Middleware Type Error">
          {`// ❌ WHAT'S WRONG
export function middleware(request: Request) {
  const token = request.headers.get("authorization");
  if (token) {
    return Response.redirect(new URL("/dashboard", request.url));
  }
  return Response.next();  // Error: Response.next() doesn't exist
}

// WHY IT HAPPENS
// Using standard Request/Response instead of Next.js types
// Response.next() is not a standard method

// ✅ EXACT FIX
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.headers.get("authorization");
  
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();  // Correct Next.js method
}

// OR with typed response
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-custom-header", "value");
  return response;
}`}
        </CodeBlock>

        <CodeBlock title="Problem 8: Dynamic Route Params Type">
          {`// ❌ WHAT'S WRONG
// app/users/[...slug]/page.tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <div>{params.slug}</div>;  // Error: slug is actually string[]
}

// WHY IT HAPPENS
// Catch-all routes ([...slug]) return array, not string
// Type definition doesn't match actual Next.js behavior

// ✅ EXACT FIX
// Type catch-all routes correctly
interface PageProps {
  params: {
    slug: string[];  // Array for catch-all
  };
}

export default function Page({ params }: PageProps) {
  const path = params.slug.join("/");  // "users/123/posts/456"
  return <div>Path: {path}</div>;
}

// OR for optional catch-all [[...slug]]
interface OptionalPageProps {
  params: {
    slug?: string[];  // Optional array
  };
}

export default function Page({ params }: OptionalPageProps) {
  const path = params.slug?.join("/") || "home";
  return <div>Path: {path}</div>;
}`}
        </CodeBlock>
      </Section>

      <Section title="4. Common Interview Debugging Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Real interview debugging scenarios.
        </p>

        <CodeBlock title="Problem 9: Type Narrowing in useEffect">
          {`// ❌ WHAT'S WRONG
function Component({ userId }: { userId: string | null }) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (userId) {
      fetchUser(userId).then(setUser);  // userId is string here
    }
  }, [userId]);  // Error: userId might be null in dependency
}

// WHY IT HAPPENS
// TypeScript sees userId as string | null in dependency array
// Even though we check it inside, dependency array needs proper type

// ✅ EXACT FIX
function Component({ userId }: { userId: string | null }) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (!userId) return;
    
    fetchUser(userId).then(setUser);
  }, [userId]);  // TypeScript knows userId is string | null
  
  // OR use separate effect
  useEffect(() => {
    if (userId) {
      fetchUser(userId).then(setUser);
    }
  }, [userId ?? ""]);  // Convert null to empty string for dependency
}`}
        </CodeBlock>

        <CodeBlock title="Problem 10: Context Type Narrowing">
          {`// ❌ WHAT'S WRONG
const AuthContext = createContext<{ user: User | null } | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  return context.user;  // Error: context might be undefined
}

// WHY IT HAPPENS
// Context can be undefined if used outside provider
// Need to handle undefined case

// ✅ EXACT FIX
const AuthContext = createContext<{ user: User | null } | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  
  return context.user;  // Type narrowed: context is defined
}

// OR provide default value
const AuthContext = createContext<{ user: User | null }>({ user: null });

function useAuth() {
  const context = useContext(AuthContext);
  return context.user;  // Always defined
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Advanced Debugging Tips:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Use type narrowing to handle union types</li>
          <li>Prevent conditional type distribution with brackets</li>
          <li>Flatten complex types before mapping</li>
          <li>Always check for null/undefined in Next.js params</li>
          <li>Type server actions with proper FormData handling</li>
          <li>Use Next.js types (NextRequest, NextResponse) in middleware</li>
        </ul>
      </InfoBox>
    </div>
  );
}

