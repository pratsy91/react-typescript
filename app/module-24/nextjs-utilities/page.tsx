import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function NextJSUtilitiesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Next.js Utility Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Typing Next.js utilities like middleware, redirects, notFound, and
        navigation functions.
      </p>

      <Section title="1. Middleware, Redirects, Navigation Types">
        <p className="text-gray-700 dark:text-gray-300">
          Typing Next.js middleware, redirect functions, and navigation
          utilities.
        </p>

        <CodeBlock title="Typed Middleware">
          {`import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Typed middleware function
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get('token');
  
  // Typed response
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Typed response with headers
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  
  return response;
}

// Typed middleware with config
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ],
};

// Typed middleware with typed request/response
export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent');
  const referer = request.headers.get('referer');
  
  // Typed URL manipulation
  const url = request.nextUrl.clone();
  url.searchParams.set('timestamp', Date.now().toString());
  
  return NextResponse.rewrite(url);
}

// Typed middleware with cookies
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Typed cookie operations
  response.cookies.set('visited', 'true', {
    maxAge: 60 * 60 * 24, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  
  return response;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Redirects & Not Found">
          {`import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

// Typed redirect in server component
async function Page({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  
  if (!user) {
    redirect('/users');  // Typed redirect
  }
  
  return <div>{user.name}</div>;
}

// Typed redirect with permanent redirect
import { permanentRedirect } from 'next/navigation';

async function OldPage() {
  permanentRedirect('/new-page');  // Typed permanent redirect
}

// Typed notFound
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();  // Typed notFound - triggers not-found.tsx
  }
  
  return <div>{product.name}</div>;
}

// Typed redirect in route handler
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const isAuthenticated = checkAuth(request);
  
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.json({ data: 'protected' });
}

// Typed redirect with status code
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/new-location', request.url), {
    status: 301,  // Permanent redirect
  });
}`}
        </CodeBlock>

        <CodeBlock title="Typed Navigation Utilities">
          {`'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Typed useRouter
function NavigationComponent() {
  const router = useRouter();
  
  // Typed navigation methods
  const handlePush = (path: string) => {
    router.push(path);  // Typed
  };
  
  const handleReplace = (path: string) => {
    router.replace(path);  // Typed
  };
  
  const handleBack = () => {
    router.back();  // Typed
  };
  
  const handleForward = () => {
    router.forward();  // Typed
  };
  
  const handleRefresh = () => {
    router.refresh();  // Typed
  };
  
  const handlePrefetch = (path: string) => {
    router.prefetch(path);  // Typed
  };
  
  return (
    <div>
      <button onClick={() => handlePush('/about')}>Go to About</button>
      <button onClick={() => handleReplace('/home')}>Replace with Home</button>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

// Typed usePathname
function PathnameDisplay() {
  const pathname = usePathname();  // Type: string
  
  return <div>Current path: {pathname}</div>;
}

// Typed useSearchParams
function SearchParamsDisplay() {
  const searchParams = useSearchParams();  // Type: ReadonlyURLSearchParams
  
  const query = searchParams.get('q');  // Type: string | null
  const page = searchParams.get('page');  // Type: string | null
  
  return (
    <div>
      <p>Query: {query || 'none'}</p>
      <p>Page: {page || '1'}</p>
    </div>
  );
}

// Typed navigation with typed params
function TypedNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(\`?\${params.toString()}\`);
  };
  
  return (
    <button onClick={() => updateSearchParams('page', '2')}>
      Go to page 2
    </button>
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Typed Next.js Hooks & Functions">
        <p className="text-gray-700 dark:text-gray-300">
          Typing Next.js-specific hooks and utility functions.
        </p>

        <CodeBlock title="Typed Next.js Hooks">
          {`'use client';

import { useParams, useSelectedLayoutSegment } from 'next/navigation';

// Typed useParams
function DynamicPage() {
  const params = useParams();  // Type: { [key: string]: string | string[] | undefined }
  
  const id = params.id as string;  // Type assertion needed
  const slug = params.slug as string[];
  
  return (
    <div>
      <p>ID: {id}</p>
      <p>Slug: {slug?.join('/')}</p>
    </div>
  );
}

// Typed useParams with interface
interface PageParams {
  id: string;
  slug: string[];
}

function TypedDynamicPage() {
  const params = useParams() as PageParams;
  
  return (
    <div>
      <p>ID: {params.id}</p>
      <p>Slug: {params.slug.join('/')}</p>
    </div>
  );
}

// Typed useSelectedLayoutSegment
function LayoutSegmentDisplay() {
  const segment = useSelectedLayoutSegment();  // Type: string | null
  
  return <div>Selected segment: {segment || 'none'}</div>;
}

// Typed useSelectedLayoutSegments
import { useSelectedLayoutSegments } from 'next/navigation';

function LayoutSegmentsDisplay() {
  const segments = useSelectedLayoutSegments();  // Type: string[]
  
  return (
    <div>
      {segments.map((segment, index) => (
        <span key={index}>{segment} / </span>
      ))}
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Server Actions">
          {`'use server';

// Typed server action
export async function createUser(data: {
  name: string;
  email: string;
}): Promise<{ id: string; name: string; email: string }> {
  // Server action implementation
  const user = await db.user.create({ data });
  return user;
}

// Typed server action with form data
export async function updateUser(
  formData: FormData
): Promise<{ success: boolean }> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  
  await db.user.update({ where: { email }, data: { name } });
  
  return { success: true };
}

// Typed server action with error handling
export async function deleteUser(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await db.user.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Usage in client component
'use client';

import { createUser } from './actions';

function UserForm() {
  const handleSubmit = async (formData: FormData) => {
    const result = await createUser({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    });
    
    // result is typed
    console.log('User created:', result.id);
  };
  
  return (
    <form action={handleSubmit}>
      <input name="name" />
      <input name="email" type="email" />
      <button type="submit">Create User</button>
    </form>
  );
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Middleware uses NextRequest and NextResponse types</li>
          <li>redirect and notFound are typed functions</li>
          <li>Navigation hooks are typed in client components</li>
          <li>useParams returns typed params object</li>
          <li>Server actions are typed with async functions</li>
          <li>All Next.js utilities maintain type safety</li>
        </ul>
      </InfoBox>
    </div>
  );
}

