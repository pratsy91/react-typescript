import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ReactRouterV6Page() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        React Router v6 TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React Router v6 provides excellent TypeScript support for typing route
        params, location state, and navigation.
      </p>

      <Section title="1. Typing Route Params">
        <p className="text-gray-700 dark:text-gray-300">
          Route parameters can be typed with TypeScript for type-safe route
          access.
        </p>

        <CodeBlock title="Typed Route Params">
          {`import { useParams, useSearchParams, useLocation } from 'react-router-dom';

// Typed route params
interface UserParams {
  userId: string;
}

function UserProfile() {
  const { userId } = useParams<keyof UserParams>() as UserParams;
  
  // userId is typed as string
  return <div>User ID: {userId}</div>;
}

// Typed route params with multiple parameters
interface PostParams {
  userId: string;
  postId: string;
}

function PostDetail() {
  const { userId, postId } = useParams<keyof PostParams>() as PostParams;
  
  return (
    <div>
      <p>User: {userId}</p>
      <p>Post: {postId}</p>
    </div>
  );
}

// Typed route params with optional parameters
interface CategoryParams {
  category?: string;
  subcategory?: string;
}

function CategoryPage() {
  const params = useParams<keyof CategoryParams>() as CategoryParams;
  
  return (
    <div>
      {params.category && <p>Category: {params.category}</p>}
      {params.subcategory && <p>Subcategory: {params.subcategory}</p>}
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Route Configuration">
          {`import { createBrowserRouter, RouteObject } from 'react-router-dom';

// Typed route configuration
interface RouteParams {
  '/users/:userId': { userId: string };
  '/posts/:postId': { postId: string };
  '/users/:userId/posts/:postId': { userId: string; postId: string };
}

// Typed route objects
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/users/:userId',
    element: <UserProfile />,
  },
  {
    path: '/posts/:postId',
    element: <PostDetail />,
  },
  {
    path: '/users/:userId/posts/:postId',
    element: <UserPostDetail />,
  },
];

const router = createBrowserRouter(routes);

// Typed route component props
interface UserProfileProps {
  userId: string;
}

function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  // Component logic
  return <div>User: {userId}</div>;
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Typing Location State">
        <p className="text-gray-700 dark:text-gray-300">
          Location state can be typed for type-safe navigation with state
          passing.
        </p>

        <CodeBlock title="Typed Location State">
          {`import { useLocation, useNavigate } from 'react-router-dom';

// Typed location state
interface LocationState {
  from?: string;
  message?: string;
  data?: unknown;
}

function useTypedLocation() {
  const location = useLocation();
  return {
    ...location,
    state: location.state as LocationState | null,
  };
}

// Usage
function ProtectedRoute() {
  const location = useTypedLocation();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login', {
      state: {
        from: location.pathname,
        message: 'Please log in to continue',
      },
    });
  };
  
  return <div>Protected content</div>;
}

// Typed location state with specific types
interface LoginLocationState {
  from: string;
  returnTo?: string;
}

function LoginPage() {
  const location = useLocation();
  const state = location.state as LoginLocationState | null;
  const navigate = useNavigate();
  
  const handleLogin = () => {
    const returnTo = state?.returnTo || state?.from || '/';
    navigate(returnTo);
  };
  
  return (
    <div>
      {state?.from && <p>Redirecting from: {state.from}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Navigation State">
          {`// Typed navigate function
function useTypedNavigate() {
  const navigate = useNavigate();
  
  return {
    navigate: <T extends string>(
      to: T,
      options?: {
        state?: unknown;
        replace?: boolean;
      }
    ) => {
      navigate(to, options);
    },
    goBack: () => navigate(-1),
    goForward: () => navigate(1),
  };
}

// Typed navigation with state
interface NavigationState {
  user: User;
  timestamp: number;
}

function UserList() {
  const navigate = useNavigate();
  
  const handleUserClick = (user: User) => {
    navigate(\`/users/\${user.id}\`, {
      state: {
        user,
        timestamp: Date.now(),
      } as NavigationState,
    });
  };
  
  return (
    <div>
      {/* user list */}
    </div>
  );
}

function UserDetail() {
  const location = useLocation();
  const state = location.state as NavigationState | null;
  
  if (state?.user) {
    return <div>User: {state.user.name}</div>;
  }
  
  // Fallback to fetching from params
  const { userId } = useParams<{ userId: string }>();
  return <div>Loading user {userId}...</div>;
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Typing Navigation">
        <p className="text-gray-700 dark:text-gray-300">
          Navigation functions can be typed for type-safe routing throughout
          the application.
        </p>

        <CodeBlock title="Typed Navigation Hooks">
          {`// Typed navigation paths
type AppRoutes =
  | '/'
  | '/users'
  | '/users/:userId'
  | '/posts'
  | '/posts/:postId'
  | '/login'
  | '/dashboard';

// Typed navigate function
function useTypedNavigate() {
  const navigate = useNavigate();
  
  return (path: AppRoutes, options?: { state?: unknown; replace?: boolean }) => {
    navigate(path, options);
  };
}

// Typed link component
interface TypedLinkProps {
  to: AppRoutes;
  state?: unknown;
  children: React.ReactNode;
}

function TypedLink({ to, state, children }: TypedLinkProps) {
  return (
    <Link to={to} state={state}>
      {children}
    </Link>
  );
}

// Usage
function Navigation() {
  const navigate = useTypedNavigate();
  
  return (
    <nav>
      <TypedLink to="/">Home</TypedLink>
      <TypedLink to="/users">Users</TypedLink>
      <button onClick={() => navigate('/login')}>Login</button>
    </nav>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Route Matcher">
          {`// Typed route matching
import { matchPath } from 'react-router-dom';

interface RouteMatch<T> {
  params: T;
  pathname: string;
  pathnameBase: string;
  pattern: {
    path: string;
    caseSensitive?: boolean;
    end?: boolean;
  };
}

// Typed route matcher
function matchTypedRoute<T extends Record<string, string>>(
  pattern: string,
  pathname: string
): RouteMatch<T> | null {
  const match = matchPath(pattern, pathname);
  if (!match) return null;
  return {
    ...match,
    params: match.params as T,
  };
}

// Usage
const match = matchTypedRoute<{ userId: string }>('/users/:userId', '/users/123');
if (match) {
  console.log(match.params.userId); // Typed as string
}

// Typed route generator
function createTypedRoute<T extends Record<string, string>>(
  pattern: string
) {
  return {
    pattern,
    match: (pathname: string) => matchTypedRoute<T>(pattern, pathname),
    generate: (params: T): string => {
      let path = pattern;
      Object.entries(params).forEach(([key, value]) => {
        path = path.replace(\`:\${key}\`, value);
      });
      return path;
    },
  };
}

// Usage
const userRoute = createTypedRoute<{ userId: string }>('/users/:userId');
const path = userRoute.generate({ userId: '123' }); // '/users/123'
const match = userRoute.match('/users/123'); // { params: { userId: '123' } }`}
        </CodeBlock>
      </Section>

      <Section title="4. Advanced React Router Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns including typed loaders, actions, and route
          guards.
        </p>

        <CodeBlock title="Typed Loaders and Actions">
          {`import { LoaderFunctionArgs, ActionFunctionArgs } from 'react-router-dom';

// Typed loader function
interface LoaderParams {
  userId: string;
}

export async function userLoader({
  params,
}: LoaderFunctionArgs): Promise<User> {
  const { userId } = params as LoaderParams;
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) throw new Response('Not Found', { status: 404 });
  return response.json();
}

// Typed action function
interface ActionData {
  name: string;
  email: string;
}

export async function userAction({
  request,
  params,
}: ActionFunctionArgs): Promise<{ success: boolean; user?: User }> {
  const { userId } = params as LoaderParams;
  const formData = await request.formData();
  const data: ActionData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
  };
  
  const response = await fetch(\`/api/users/\${userId}\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    return { success: false };
  }
  
  const user: User = await response.json();
  return { success: true, user };
}

// Typed route with loader
const routes: RouteObject[] = [
  {
    path: '/users/:userId',
    element: <UserProfile />,
    loader: userLoader,
    action: userAction,
  },
];

// Typed useLoaderData hook
function UserProfile() {
  const user = useLoaderData() as Awaited<ReturnType<typeof userLoader>>;
  return <div>{user.name}</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Error Boundaries">
          {`// Typed error boundary
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

interface RouteError {
  status: number;
  statusText: string;
  data?: unknown;
}

function ErrorPage() {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
    // Typed route error
    const routeError = error as RouteError;
    return (
      <div>
        <h1>{routeError.status}</h1>
        <p>{routeError.statusText}</p>
      </div>
    );
  }
  
  // Generic error
  return (
    <div>
      <h1>Error</h1>
      <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
    </div>
  );
}

// Typed error boundary route
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'users/:userId',
        element: <UserProfile />,
        loader: userLoader,
        errorElement: <UserErrorPage />,
      },
    ],
  },
];`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Route params are typed with useParams generic</li>
          <li>Location state is typed with useLocation</li>
          <li>Navigation functions can be typed with route path unions</li>
          <li>Loaders and actions support typed parameters</li>
          <li>Error boundaries work with typed error responses</li>
          <li>Route matching can be fully typed</li>
        </ul>
      </InfoBox>
    </div>
  );
}

