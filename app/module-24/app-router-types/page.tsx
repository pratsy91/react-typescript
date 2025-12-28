import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function AppRouterTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Next.js App Router Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Next.js App Router (Next.js 13+) introduces new type patterns for
        server components, client components, metadata, and route handlers.
      </p>

      <Section title="1. Server & Client Component Types">
        <p className="text-gray-700 dark:text-gray-300">
          Typing server components and client components in the App Router.
        </p>

        <CodeBlock title="Server Component Types">
          {`// Server Component (default in App Router)
// No 'use client' directive = Server Component

// Typed server component with async
async function ServerComponent(): Promise<JSX.Element> {
  const data = await fetch('https://api.example.com/data');
  const result: Data = await data.json();
  
  return <div>{result.title}</div>;
}

// Typed server component with params
interface PageProps {
  params: {
    id: string;
    slug: string;
  };
}

async function DynamicPage({ params }: PageProps) {
  const { id, slug } = params;
  // params are typed
  return <div>ID: {id}, Slug: {slug}</div>;
}

// Typed server component with searchParams
interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
    sort?: 'asc' | 'desc';
  };
}

function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const page = Number(searchParams.page) || 1;
  const sort = searchParams.sort || 'asc';
  
  return <div>Search: {query}, Page: {page}, Sort: {sort}</div>;
}

// Typed server component with both params and searchParams
interface FullPageProps {
  params: { id: string };
  searchParams: { tab?: string };
}

function FullPage({ params, searchParams }: FullPageProps) {
  return (
    <div>
      <p>ID: {params.id}</p>
      <p>Tab: {searchParams.tab || 'default'}</p>
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Client Component Types">
          {`'use client';

// Client Component (requires 'use client' directive)
// Typed client component
interface ClientComponentProps {
  initialCount: number;
  onIncrement?: (count: number) => void;
}

export function ClientComponent({
  initialCount,
  onIncrement,
}: ClientComponentProps) {
  const [count, setCount] = useState(initialCount);
  
  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    onIncrement?.(newCount);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

// Typed client component with Next.js hooks
'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

function NavigationComponent() {
  const pathname = usePathname();  // Type: string
  const searchParams = useSearchParams();  // Type: ReadonlyURLSearchParams
  const router = useRouter();  // Type: AppRouterInstance
  
  const handleNavigate = (path: string) => {
    router.push(path);  // Typed
  };
  
  return (
    <div>
      <p>Current path: {pathname}</p>
      <button onClick={() => handleNavigate('/about')}>Go to About</button>
    </div>
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Metadata Types">
        <p className="text-gray-700 dark:text-gray-300">
          Typing metadata and generateMetadata functions for SEO and page
          configuration.
        </p>

        <CodeBlock title="Typed Metadata">
          {`import { Metadata } from 'next';

// Typed static metadata
export const metadata: Metadata = {
  title: 'My Page',
  description: 'Page description',
  keywords: ['nextjs', 'typescript'],
  authors: [{ name: 'John Doe' }],
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Page',
    description: 'Page description',
  },
};

// Typed dynamic metadata with generateMetadata
interface PageProps {
  params: { id: string };
  searchParams: { tab?: string };
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { id } = params;
  const tab = searchParams.tab || 'default';
  
  // Fetch data for metadata
  const data = await fetch(\`https://api.example.com/data/\${id}\`).then(
    (r) => r.json()
  );
  
  return {
    title: \`\${data.title} - \${tab}\`,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data.image],
    },
  };
}

// Typed metadata with template
export const metadata: Metadata = {
  title: {
    template: '%s | My Site',
    default: 'My Site',
  },
  description: 'Default description',
};

// Typed metadata with robots
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};`}
        </CodeBlock>
      </Section>

      <Section title="3. Route Handler Types">
        <p className="text-gray-700 dark:text-gray-300">
          Typing route handlers (API routes) in the App Router.
        </p>

        <CodeBlock title="Typed Route Handlers">
          {`import { NextRequest, NextResponse } from 'next/server';

// Typed GET handler
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  const data = await fetch(\`https://api.example.com/data/\${id}\`);
  const result = await data.json();
  
  return NextResponse.json(result);
}

// Typed POST handler with request body
interface CreateUserRequest {
  name: string;
  email: string;
}

export async function POST(request: NextRequest) {
  const body: CreateUserRequest = await request.json();
  
  // Validate body
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }
  
  // Process request
  const user = await createUser(body);
  
  return NextResponse.json(user, { status: 201 });
}

// Typed route handler with params
interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = params;
  
  const data = await fetch(\`https://api.example.com/data/\${id}\`);
  const result = await data.json();
  
  return NextResponse.json(result);
}

// Typed route handler with dynamic segments
interface DynamicRouteParams {
  params: {
    slug: string[];
  };
}

export async function GET(
  request: NextRequest,
  { params }: DynamicRouteParams
) {
  const { slug } = params;
  // slug is typed as string[]
  const path = slug.join('/');
  
  return NextResponse.json({ path });
}

// Typed route handler with all HTTP methods
export async function PUT(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ method: 'PUT', body });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ method: 'PATCH', body });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ method: 'DELETE' });
}

// Typed route handler with headers
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  return NextResponse.json({ authenticated: true });
}

// Typed route handler with cookies
export async function GET(request: NextRequest) {
  const token = request.cookies.get('token');
  
  if (!token) {
    return NextResponse.json(
      { error: 'No token' },
      { status: 401 }
    );
  }
  
  return NextResponse.json({ token: token.value });
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Server components are async by default in App Router</li>
          <li>Client components require 'use client' directive</li>
          <li>params and searchParams are typed in page props</li>
          <li>Metadata is typed with Metadata interface</li>
          <li>Route handlers use NextRequest and NextResponse</li>
          <li>Route params are typed in handler context</li>
        </ul>
      </InfoBox>
    </div>
  );
}

