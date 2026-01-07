import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function NextJSDebuggingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Next.js + TypeScript Debugging - Interview Questions
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Common Next.js + TypeScript debugging scenarios with solutions.
      </p>

      <Section title="1. App Router Type Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging Next.js App Router type errors.
        </p>

        <CodeBlock title="Problem 1: Page Props Type Error">
          {`// ❌ WHAT'S WRONG
export default function Page({ params }) {
  const { id } = params;
  return <div>{id}</div>;  // Error: params is 'any'
}

// WHY IT HAPPENS
// params is not typed in App Router pages
// TypeScript infers it as any

// ✅ EXACT FIX
// Type the params explicitly
interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;  // Type: string
  return <div>{id}</div>;
}

// OR for async server components
export default async function Page({ params }: PageProps) {
  const { id } = params;
  const data = await fetchData(id);
  return <div>{data.name}</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Problem 2: SearchParams Type Error">
          {`// ❌ WHAT'S WRONG
export default function SearchPage({ searchParams }) {
  const page = searchParams.page;  // Type: string | string[] | undefined
  const pageNum = Number(page);  // Might be NaN if undefined

// WHY IT HAPPENS
// searchParams from URL are always strings or arrays
// Can be undefined if not in URL
// Need proper type handling

// ✅ EXACT FIX
interface SearchPageProps {
  searchParams: {
    page?: string;
    q?: string;
    sort?: "asc" | "desc";
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const page = Number(searchParams.page) || 1;  // Default to 1
  const query = searchParams.q || "";
  const sort = searchParams.sort || "asc";
  
  return <div>Page: {page}, Query: {query}, Sort: {sort}</div>;
}

// OR use URLSearchParams for validation
export default function SearchPage({ searchParams }: SearchPageProps) {
  const params = new URLSearchParams(searchParams as Record<string, string>);
  const page = Number(params.get("page")) || 1;
  return <div>Page: {page}</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Problem 3: Route Handler Type Error">
          {`// ❌ WHAT'S WRONG
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const data = await fetchData(id);  // Error: id might be null

// WHY IT HAPPENS
// URLSearchParams.get() returns string | null
// Need to handle null case

// ✅ EXACT FIX
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  
  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }
  
  const data = await fetchData(id);  // Type: string (narrowed)
  return NextResponse.json(data);
}

// OR with typed params
interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = params;  // Type: string
  const data = await fetchData(id);
  return NextResponse.json(data);
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Metadata & Server Components">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging metadata and server component issues.
        </p>

        <CodeBlock title="Problem 4: Metadata Type Error">
          {`// ❌ WHAT'S WRONG
export const metadata = {
  title: "My Page",
  description: "Page description",
  openGraph: {
    title: "My Page",
    images: ["/og.jpg"],  // Error: Type mismatch
  },
};

// WHY IT HAPPENS
// Metadata object needs proper typing
// openGraph.images expects specific format

// ✅ EXACT FIX
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page",
  description: "Page description",
  openGraph: {
    title: "My Page",
    description: "Page description",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// OR for dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await fetchData(params.id);
  return {
    title: data.title,
    description: data.description,
  };
}`}
        </CodeBlock>

        <CodeBlock title="Problem 5: Client Component in Server Component">
          {`// ❌ WHAT'S WRONG
// app/page.tsx (Server Component)
import InteractiveButton from "./InteractiveButton";

export default function Page() {
  return (
    <div>
      <InteractiveButton />  // Error: Cannot use hooks in server component
    </div>
  );
}

// InteractiveButton.tsx
function InteractiveButton() {
  const [count, setCount] = useState(0);  // Hook used here
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// WHY IT HAPPENS
// Server components can't use hooks or browser APIs
// Interactive components need 'use client' directive

// ✅ EXACT FIX
// Add 'use client' to interactive component
// InteractiveButton.tsx
"use client";

import { useState } from "react";

export default function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// app/page.tsx (Server Component - no changes needed)
import InteractiveButton from "./InteractiveButton";

export default function Page() {
  return (
    <div>
      <InteractiveButton />  // Works! Client component boundary
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Problem 6: Async Server Component Error">
          {`// ❌ WHAT'S WRONG
export default function Page() {
  const data = await fetchData();  // Error: 'await' is only allowed in async functions
  return <div>{data.name}</div>;
}

// WHY IT HAPPENS
// Server components can be async, but function must be marked async
// Missing async keyword

// ✅ EXACT FIX
export default async function Page() {
  const data = await fetchData();  // Now works!
  return <div>{data.name}</div>;
}

// OR with error handling
export default async function Page() {
  try {
    const data = await fetchData();
    return <div>{data.name}</div>;
  } catch (error) {
    return <div>Error loading data</div>;
  }
}

// OR with loading state (using Suspense)
// app/page.tsx
import { Suspense } from "react";
import DataComponent from "./DataComponent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />
    </Suspense>
  );
}

// DataComponent.tsx
export default async function DataComponent() {
  const data = await fetchData();
  return <div>{data.name}</div>;
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Next.js Component Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging Next.js-specific component problems.
        </p>

        <CodeBlock title="Problem 7: Image Component Type Error">
          {`// ❌ WHAT'S WRONG
import Image from "next/image";

function MyImage() {
  return <Image src="/image.jpg" alt="Image" />;  // Error: width/height required
}

// WHY IT HAPPENS
// Next.js Image requires width/height OR fill prop
// TypeScript enforces this requirement

// ✅ EXACT FIX
// Option 1: Provide width and height
import Image from "next/image";

function MyImage() {
  return (
    <Image
      src="/image.jpg"
      alt="Image"
      width={500}
      height={300}
    />
  );
}

// Option 2: Use fill with container
function MyImage() {
  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <Image
        src="/image.jpg"
        alt="Image"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

// Option 3: External image with sizes
function MyImage() {
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="Image"
      width={500}
      height={300}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
}`}
        </CodeBlock>

        <CodeBlock title="Problem 8: Link Component Type Error">
          {`// ❌ WHAT'S WRONG
import Link from "next/link";

function Navigation() {
  return (
    <Link href={dynamicPath}>  // Error: href must be string
      Home
    </Link>
  );
}

// WHY IT HAPPENS
// Link href must be a string or URL object
// Dynamic paths need proper typing

// ✅ EXACT FIX
// Type the path
type Route = "/" | "/about" | "/contact";

function Navigation() {
  const path: Route = "/about";
  return <Link href={path}>Home</Link>;
}

// OR use object syntax for dynamic routes
function Navigation({ userId }: { userId: string }) {
  return (
    <Link
      href={{
        pathname: "/users/[id]",
        query: { id: userId },
      }}
    >
      User Profile
    </Link>
  );
}

// OR for App Router
function Navigation({ userId }: { userId: string }) {
  return <Link href={\`/users/\${userId}\`}>User Profile</Link>;
}`}
        </CodeBlock>

        <CodeBlock title="Problem 9: useRouter Hook Type Error">
          {`// ❌ WHAT'S WRONG
"use client";
import { useRouter } from "next/router";  // Pages Router
const router = useRouter();
router.push("/about");  // Works but wrong import for App Router

// WHY IT HAPPENS
// Using Pages Router hook in App Router
// Different imports for different routers

// ✅ EXACT FIX
// For App Router (Next.js 13+)
"use client";
import { useRouter } from "next/navigation";  // App Router

function Navigation() {
  const router = useRouter();
  router.push("/about");  // Type-safe!
  return <button onClick={() => router.push("/about")}>Go</button>;
}

// For Pages Router (Next.js 12 and below)
import { useRouter } from "next/router";  // Pages Router

function Navigation() {
  const router = useRouter();
  router.push("/about");
  return <button onClick={() => router.push("/about")}>Go</button>;
}

// Typed navigation helper
"use client";
import { useRouter } from "next/navigation";

type AppRoute = "/" | "/about" | "/contact";

function useTypedRouter() {
  const router = useRouter();
  return {
    push: (route: AppRoute) => router.push(route),
    replace: (route: AppRoute) => router.replace(route),
  };
}`}
        </CodeBlock>
      </Section>

      <Section title="4. Server Actions & Form Handling">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging server actions and form handling issues.
        </p>

        <CodeBlock title="Problem 10: Server Action Return Type">
          {`// ❌ WHAT'S WRONG
"use server";

export async function createPost(data: FormData) {
  const title = data.get("title");
  await savePost({ title });
  return { success: true };  // Error: Return type not properly typed
}

// Client component
"use client";
import { createPost } from "./actions";

function Form() {
  const handleSubmit = async (formData: FormData) => {
    const result = await createPost(formData);
    console.log(result.success);  // Error: result might be undefined
  };
  return <form action={createPost}>...</form>;
}

// WHY IT HAPPENS
// Server actions need explicit return types
// TypeScript can't infer async return types properly

// ✅ EXACT FIX
"use server";

interface CreatePostResult {
  success: boolean;
  id?: string;
  error?: string;
}

export async function createPost(
  data: FormData
): Promise<CreatePostResult> {
  const title = data.get("title");
  
  if (!title || typeof title !== "string") {
    return { success: false, error: "Title is required" };
  }
  
  const post = await savePost({ title });
  return { success: true, id: post.id };
}

// Client component
"use client";
import { createPost } from "./actions";

function Form() {
  const handleSubmit = async (formData: FormData) => {
    const result = await createPost(formData);
    if (result.success) {
      console.log("Post created:", result.id);
    } else {
      console.error(result.error);
    }
  };
  return <form action={handleSubmit}>...</form>;
}`}
        </CodeBlock>

        <CodeBlock title="Problem 11: Server Action with useActionState">
          {`// ❌ WHAT'S WRONG
"use client";
import { useActionState } from "react";
import { loginAction } from "./actions";

function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  // Error: loginAction signature doesn't match
}

// WHY IT HAPPENS
// useActionState expects (prevState, formData) => Promise<newState>
// Server action might not match this signature

// ✅ EXACT FIX
"use server";

interface LoginState {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");
  
  if (!email || !password) {
    return { error: "Email and password required" };
  }
  
  try {
    await authenticate(email as string, password as string);
    return { success: true };
  } catch (error) {
    return { error: "Invalid credentials" };
  }
}

// Client component
"use client";
import { useActionState } from "react";
import { loginAction } from "./actions";

function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  
  return (
    <form action={formAction}>
      {state?.error && <p>{state.error}</p>}
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="5. Suspense & Error Boundaries">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging Suspense and error boundary issues.
        </p>

        <CodeBlock title="Problem 12: Suspense with Async Component">
          {`// ❌ WHAT'S WRONG
async function DataComponent() {
  const data = await fetchData();
  return <div>{data.name}</div>;
}

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />  // Error: Suspense doesn't work with async components
    </Suspense>
  );
}

// WHY IT HAPPENS
// Suspense works with promises, not directly with async components
// Need to use React.use() or proper promise handling

// ✅ EXACT FIX
// Option 1: Use React.use() with promise
import { use } from "react";

function DataComponent({ dataPromise }: { dataPromise: Promise<Data> }) {
  const data = use(dataPromise);
  return <div>{data.name}</div>;
}

function Page() {
  const dataPromise = fetchData();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent dataPromise={dataPromise} />
    </Suspense>
  );
}

// Option 2: Use async component in App Router (Next.js)
// app/page.tsx
export default async function Page() {
  const data = await fetchData();
  return <div>{data.name}</div>;
}

// With loading.tsx
// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Problem 13: Error Boundary Type Error">
          {`// ❌ WHAT'S WRONG
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}

// WHY IT HAPPENS
// Error boundary needs proper TypeScript typing
// Missing props and state types

// ✅ EXACT FIX
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (error: Error, errorInfo: React.ErrorInfo) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      if (this.props.fallback && this.state.error) {
        return this.props.fallback(this.state.error, {} as React.ErrorInfo);
      }
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary fallback={(error) => <div>Error: {error.message}</div>}>
  <App />
</ErrorBoundary>`}
        </CodeBlock>
      </Section>

      <Section title="6. Advanced Next.js Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging advanced Next.js patterns.
        </p>

        <CodeBlock title="Problem 14: Parallel Routes Type Error">
          {`// ❌ WHAT'S WRONG
// app/layout.tsx
export default function Layout({ children, analytics }) {
  return (
    <div>
      {children}
      {analytics}  // Error: analytics is not typed
    </div>
  );
}

// WHY IT HAPPENS
// Parallel routes (@analytics) need explicit typing
// TypeScript doesn't know about parallel route slots

// ✅ EXACT FIX
interface LayoutProps {
  children: React.ReactNode;
  analytics: React.ReactNode;  // Parallel route slot
  notifications?: React.ReactNode;  // Optional parallel route
}

export default function Layout({
  children,
  analytics,
  notifications,
}: LayoutProps) {
  return (
    <div>
      {children}
      <aside>{analytics}</aside>
      {notifications && <aside>{notifications}</aside>}
    </div>
  );
}

// OR with default slot
// app/@analytics/default.tsx
export default function DefaultAnalytics() {
  return null;
}

interface LayoutProps {
  children: React.ReactNode;
  analytics?: React.ReactNode;  // Optional with default
}`}
        </CodeBlock>

        <CodeBlock title="Problem 15: Middleware Config Type Error">
          {`// ❌ WHAT'S WRONG
export function middleware(request: NextRequest) {
  // middleware logic
}

export const config = {
  matcher: "/about/:path*",  // Error: Invalid matcher syntax
};

// WHY IT HAPPENS
// Middleware matcher needs proper syntax
// TypeScript doesn't validate matcher patterns

// ✅ EXACT FIX
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-custom-header", "value");
  return response;
}

export const config = {
  matcher: [
    "/about/:path*",
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

// OR with typed matcher
type MatcherConfig = {
  matcher: string | string[];
};

export const config: MatcherConfig = {
  matcher: "/about/:path*",
};`}
        </CodeBlock>

        <CodeBlock title="Problem 16: Dynamic Route with Optional Params">
          {`// ❌ WHAT'S WRONG
// app/users/[[...id]]/page.tsx
export default function Page({ params }: { params: { id: string } }) {
  return <div>User: {params.id}</div>;  // Error: id might not exist
}

// WHY IT HAPPENS
// Optional catch-all routes [[...id]] make params optional
// Need to handle undefined case

// ✅ EXACT FIX
interface PageProps {
  params: {
    id?: string[];  // Optional array for optional catch-all
  };
}

export default function Page({ params }: PageProps) {
  if (!params.id) {
    return <div>All Users</div>;
  }
  
  const userId = params.id[0];
  return <div>User: {userId}</div>;
}

// OR with type guard
export default function Page({ params }: PageProps) {
  const userId = params.id?.[0];
  
  if (!userId) {
    return <div>All Users</div>;
  }
  
  return <div>User: {userId}</div>;
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Next.js Debugging Strategy:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Always type page props (params, searchParams)</li>
          <li>Handle null/undefined from URLSearchParams</li>
          <li>Use 'use client' for interactive components</li>
          <li>Mark async server components with async keyword</li>
          <li>Use correct Next.js imports (navigation vs router)</li>
          <li>Type metadata with Metadata interface</li>
          <li>Type server actions with explicit return types</li>
          <li>Handle optional catch-all routes with optional params</li>
          <li>Type parallel route slots explicitly</li>
          <li>Use NextRequest/NextResponse in middleware</li>
        </ul>
      </InfoBox>
    </div>
  );
}

