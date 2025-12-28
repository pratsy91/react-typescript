import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ProtectedRoutesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Typing Protected Routes
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Protected routes can be typed with auth guards and role-based access
        control.
      </p>

      <Section title="1. Typed Auth Guards">
        <p className="text-gray-700 dark:text-gray-300">
          Auth guards can be typed to protect routes with type-safe
          authentication checks.
        </p>

        <CodeBlock title="Typed Protected Route Component">
          {`import { Navigate, useLocation } from 'react-router-dom';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Typed protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'guest';
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation();
  const auth = useAuth(); // Your auth hook
  
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (requiredRole && auth.user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
}

// Typed route with auth guard
const protectedRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
];`}
        </CodeBlock>

        <CodeBlock title="Typed Auth Guard Hook">
          {`// Typed auth guard hook
interface AuthGuardResult {
  isAuthorized: boolean;
  redirectTo?: string;
  reason?: string;
}

function useAuthGuard(requiredRole?: 'admin' | 'user'): AuthGuardResult {
  const auth = useAuth();
  const location = useLocation();
  
  if (!auth.isAuthenticated) {
    return {
      isAuthorized: false,
      redirectTo: '/login',
      reason: 'Not authenticated',
    };
  }
  
  if (requiredRole && auth.user?.role !== requiredRole) {
    return {
      isAuthorized: false,
      redirectTo: '/unauthorized',
      reason: 'Insufficient permissions',
    };
  }
  
  return { isAuthorized: true };
}

// Typed protected route with hook
function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const guard = useAuthGuard(requiredRole);
  
  if (!guard.isAuthorized) {
    return <Navigate to={guard.redirectTo!} replace />;
  }
  
  return <>{children}</>;
}

// Typed route loader with auth check
export async function protectedLoader({
  request,
}: LoaderFunctionArgs): Promise<User> {
  const auth = await getAuthFromRequest(request);
  
  if (!auth.isAuthenticated) {
    throw new Response('Unauthorized', { status: 401 });
  }
  
  return auth.user;
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Protected routes are typed with auth state</li>
          <li>Role-based access control is type-safe</li>
          <li>Auth guards return typed results</li>
          <li>Loaders can include auth checks</li>
        </ul>
      </InfoBox>
    </div>
  );
}

