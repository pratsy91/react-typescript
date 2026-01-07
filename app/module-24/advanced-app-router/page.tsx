import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function AdvancedAppRouterPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Advanced Next.js App Router Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Advanced Next.js App Router features including Suspense, Streaming,
        Route Groups, Parallel Routes, Intercepting Routes, and special files.
      </p>

      <Section title="1. Suspense & Streaming Types">
        <p className="text-gray-700 dark:text-gray-300">
          Typing Suspense boundaries and streaming components.
        </p>

        <CodeBlock title="Typed Suspense Boundaries">
          {`// Typed Suspense with fallback
import { Suspense } from "react";

interface SuspenseBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

function TypedSuspense({ children, fallback }: SuspenseBoundaryProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

// Typed async component with Suspense
async function AsyncDataComponent({ id }: { id: string }) {
  const data = await fetchData(id);
  return <div>{data.name}</div>;
}

function Page() {
  return (
    <Suspense fallback={<div>Loading data...</div>}>
      <AsyncDataComponent id="123" />
    </Suspense>
  );
}

// Typed Suspense with error boundary
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: (error: Error) => React.ReactNode;
}

class TypedErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return this.props.fallback(this.state.error);
    }
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <TypedErrorBoundary fallback={(error) => <div>Error: {error.message}</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncDataComponent id="123" />
      </Suspense>
    </TypedErrorBoundary>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Streaming Components">
          {`// Typed streaming with React.use()
import { use } from "react";

interface StreamingComponentProps {
  promise: Promise<Data>;
}

function StreamingComponent({ promise }: StreamingComponentProps) {
  const data = use(promise);  // Typed as Data
  return <div>{data.name}</div>;
}

// Typed streaming with Suspense
async function getData(): Promise<Data> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { name: "John", age: 30 };
}

function Page() {
  const dataPromise = getData();
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StreamingComponent promise={dataPromise} />
    </Suspense>
  );
}

// Typed streaming with multiple promises
interface MultiStreamProps {
  userPromise: Promise<User>;
  postsPromise: Promise<Post[]>;
}

function MultiStreamComponent({ userPromise, postsPromise }: MultiStreamProps) {
  const user = use(userPromise);  // Typed as User
  const posts = use(postsPromise);  // Typed as Post[]
  
  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Special Files Types">
        <p className="text-gray-700 dark:text-gray-300">
          Typing Next.js special files: loading.tsx, error.tsx, not-found.tsx.
        </p>

        <CodeBlock title="Typed Loading & Error Boundaries">
          {`// app/loading.tsx - Typed loading component
export default function Loading(): JSX.Element {
  return <div>Loading...</div>;
}

// app/error.tsx - Typed error boundary
"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): JSX.Element {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      {error.digest && <p>Digest: {error.digest}</p>}
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// app/not-found.tsx - Typed not found component
export default function NotFound(): JSX.Element {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
}

// Typed error boundary with status codes
interface ErrorBoundaryProps {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}

export default function TypedError({ error, reset }: ErrorBoundaryProps) {
  const statusCode = error.statusCode || 500;
  
  return (
    <div>
      <h2>Error {statusCode}</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}

// Typed global error boundary
// app/global-error.tsx
"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <h2>Global Error</h2>
        <p>{error.message}</p>
        <button onClick={reset}>Reset</button>
      </body>
    </html>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Route Handlers with Streaming">
          {`// Typed streaming response
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      
      // Stream data
      for (let i = 0; i < 10; i++) {
        const data = encoder.encode(\`data: \${i}\\n\\n\`);
        controller.enqueue(data);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      
      controller.close();
    },
  });
  
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}

// Typed Server-Sent Events
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    start(controller) {
      const send = (data: unknown) => {
        const message = \`data: \${JSON.stringify(data)}\\n\\n\`;
        controller.enqueue(encoder.encode(message));
      };
      
      // Send initial data
      send({ type: "connected" });
      
      // Stream updates
      const interval = setInterval(() => {
        send({ type: "update", timestamp: Date.now() });
      }, 1000);
      
      // Cleanup
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });
  
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Route Groups & Parallel Routes">
        <p className="text-gray-700 dark:text-gray-300">
          Typing route groups, parallel routes, and intercepting routes.
        </p>

        <CodeBlock title="Typed Route Groups">
          {`// Route groups don't affect URL structure
// (marketing)/about/page.tsx
interface MarketingPageProps {
  params: Record<string, never>;  // No params for route groups
}

export default function MarketingAbout({ params }: MarketingPageProps) {
  return <div>Marketing About</div>;
}

// (shop)/products/page.tsx
interface ShopPageProps {
  params: Record<string, never>;
  searchParams: {
    category?: string;
    sort?: "price" | "name";
  };
}

export default function ShopProducts({ searchParams }: ShopPageProps) {
  return (
    <div>
      <p>Category: {searchParams.category || "all"}</p>
      <p>Sort: {searchParams.sort || "price"}</p>
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Parallel Routes">
          {`// app/@analytics/page.tsx
interface AnalyticsSlotProps {
  params: { id: string };
}

export default function AnalyticsSlot({ params }: AnalyticsSlotProps) {
  return <div>Analytics for {params.id}</div>;
}

// app/@notifications/page.tsx
interface NotificationsSlotProps {
  params: { id: string };
}

export default function NotificationsSlot({ params }: NotificationsSlotProps) {
  return <div>Notifications for {params.id}</div>;
}

// app/layout.tsx - Typed parallel route layout
interface ParallelLayoutProps {
  children: React.ReactNode;
  analytics: React.ReactNode;
  notifications: React.ReactNode;
}

export default function ParallelLayout({
  children,
  analytics,
  notifications,
}: ParallelLayoutProps) {
  return (
    <div>
      {children}
      <aside>{analytics}</aside>
      <aside>{notifications}</aside>
    </div>
  );
}

// Typed parallel route with default
interface LayoutWithDefaultsProps {
  children: React.ReactNode;
  modal?: React.ReactNode;  // Optional parallel route
}

export default function LayoutWithDefaults({
  children,
  modal,
}: LayoutWithDefaultsProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

// app/@modal/default.tsx - Default for parallel route
export default function DefaultModal() {
  return null;  // Don't render anything if modal slot is empty
}`}
        </CodeBlock>

        <CodeBlock title="Typed Intercepting Routes">
          {`// app/(.)photos/[id]/page.tsx - Intercept same level
interface InterceptPhotoProps {
  params: { id: string };
}

export default function InterceptPhoto({ params }: InterceptPhotoProps) {
  return (
    <div>
      <h1>Intercepted Photo {params.id}</h1>
      {/* Modal or overlay */}
    </div>
  );
}

// app/(..)photos/[id]/page.tsx - Intercept one level up
interface InterceptPhotoUpProps {
  params: { id: string };
}

export default function InterceptPhotoUp({ params }: InterceptPhotoUpProps) {
  return <div>Intercepted from parent: {params.id}</div>;
}

// app/(..)(..)photos/[id]/page.tsx - Intercept two levels up
interface InterceptPhotoUpTwoProps {
  params: { id: string };
}

export default function InterceptPhotoUpTwo({ params }: InterceptPhotoUpTwoProps) {
  return <div>Intercepted from grandparent: {params.id}</div>;
}

// Typed intercepting route with modal
interface ModalPhotoProps {
  params: { id: string };
}

export default function ModalPhoto({ params }: ModalPhotoProps) {
  return (
    <div className="modal">
      <h1>Photo {params.id}</h1>
      {/* Photo details in modal */}
    </div>
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="4. Caching & Revalidation Types">
        <p className="text-gray-700 dark:text-gray-300">
          Typing Next.js caching, revalidation, and data fetching options.
        </p>

        <CodeBlock title="Typed Fetch Cache Options">
          {`// Typed fetch with cache options
async function fetchUser(id: string): Promise<User> {
  // Cache forever (default)
  const response = await fetch(\`/api/users/\${id}\`, {
    cache: "force-cache",
  });
  return response.json();
}

// Typed fetch with revalidation
async function fetchUsers(): Promise<User[]> {
  // Revalidate every 60 seconds
  const response = await fetch("/api/users", {
    next: { revalidate: 60 },
  });
  return response.json();
}

// Typed fetch with no cache
async function fetchRealTimeData(): Promise<Data> {
  const response = await fetch("/api/realtime", {
    cache: "no-store",  // Always fetch fresh
  });
  return response.json();
}

// Typed fetch with tags
async function fetchTaggedData(): Promise<Data> {
  const response = await fetch("/api/data", {
    next: { tags: ["users", "posts"] },
  });
  return response.json();
}

// Typed revalidateTag
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  // Revalidate all data with "users" tag
  revalidateTag("users");
  return Response.json({ revalidated: true });
}

// Typed revalidatePath
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  // Revalidate specific path
  revalidatePath("/users/[id]", "page");
  return Response.json({ revalidated: true });
}

// Typed unstable_cache
import { unstable_cache } from "next/cache";

const getCachedUser = unstable_cache(
  async (id: string): Promise<User> => {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  },
  ["user"],  // Cache key
  {
    revalidate: 3600,  // 1 hour
    tags: ["users"],
  }
);`}
        </CodeBlock>

        <CodeBlock title="Typed Route Segment Config">
          {`// Typed route segment config
export const dynamic = "force-dynamic";  // or "force-static" | "auto"
export const revalidate = 60;  // Revalidate every 60 seconds
export const dynamicParams = true;  // or false
export const runtime = "nodejs";  // or "edge"

// Typed route handler config
export const maxDuration = 30;  // Maximum execution time in seconds
export const preferredRegion = "us-east-1";  // Deployment region

// Typed page config
// app/users/[id]/page.tsx
export const dynamicParams = true;
export const revalidate = 3600;

interface UserPageProps {
  params: { id: string };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await fetchUser(params.id);
  return <div>{user.name}</div>;
}

// Typed route handler with config
// app/api/users/route.ts
export const runtime = "edge";
export const maxDuration = 10;

export async function GET(request: NextRequest) {
  // Edge runtime handler
  return NextResponse.json({ data: "edge" });
}`}
        </CodeBlock>
      </Section>

      <Section title="5. Environment Variables & Fonts">
        <p className="text-gray-700 dark:text-gray-300">
          Typing environment variables and font optimization.
        </p>

        <CodeBlock title="Typed Environment Variables">
          {`// Typed environment variables
// next-env.d.ts or env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    DATABASE_URL: string;
    SECRET_KEY: string;
    NODE_ENV: "development" | "production" | "test";
  }
}

// Usage with types
const apiUrl: string = process.env.NEXT_PUBLIC_API_URL;
const dbUrl: string = process.env.DATABASE_URL;

// Typed env validation
function getEnvVar(key: keyof NodeJS.ProcessEnv): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(\`Environment variable \${key} is not set\`);
  }
  return value;
}

// Typed env config
interface EnvConfig {
  apiUrl: string;
  dbUrl: string;
  secretKey: string;
}

function getEnvConfig(): EnvConfig {
  return {
    apiUrl: getEnvVar("NEXT_PUBLIC_API_URL"),
    dbUrl: getEnvVar("DATABASE_URL"),
    secretKey: getEnvVar("SECRET_KEY"),
  };
}

// Typed client-side env (only NEXT_PUBLIC_*)
"use client";

function ClientComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;  // Available
  // const secret = process.env.SECRET_KEY;  // Error: Not available on client
  return <div>API: {apiUrl}</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Font Optimization">
          {`// Typed next/font usage
import { Inter, Roboto } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

// Typed font in layout
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}

// Typed local font
import localFont from "next/font/local";

const customFont = localFont({
  src: "./fonts/custom.woff2",
  variable: "--font-custom",
  display: "swap",
});

// Typed font with fallback
const fontWithFallback = Inter({
  subsets: ["latin"],
  fallback: ["Arial", "sans-serif"],
  variable: "--font-inter",
});

// Typed font in CSS
const font = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Use in component
function TypedComponent() {
  return (
    <div className={font.variable}>
      <style jsx global>{\`
        :root {
          --font-inter: \${font.style.fontFamily};
        }
      \`}</style>
      <p>Styled text</p>
    </div>
  );
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Advanced Next.js Types:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Suspense boundaries work with typed async components</li>
          <li>Error boundaries are typed with Error & digest</li>
          <li>Parallel routes use typed slot props</li>
          <li>Intercepting routes maintain param types</li>
          <li>Cache options are typed in fetch config</li>
          <li>Environment variables should be typed in ProcessEnv</li>
          <li>Font optimization provides typed className and variable</li>
        </ul>
      </InfoBox>
    </div>
  );
}

