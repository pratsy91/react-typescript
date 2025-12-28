import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function CodeSplittingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Code Splitting TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Code splitting with React.lazy can be typed for type-safe lazy
        imports and dynamic component loading.
      </p>

      <Section title="1. Typing Lazy Imports">
        <p className="text-gray-700 dark:text-gray-300">
          React.lazy can be typed to preserve component types while enabling
          code splitting.
        </p>

        <CodeBlock title="Typed React.lazy">
          {`import { lazy, Suspense, ComponentType } from 'react';

// Typed lazy component
interface LazyComponentProps {
  title: string;
  onAction: () => void;
}

// Typed lazy import
const LazyComponent = lazy<ComponentType<LazyComponentProps>>(
  () => import('./LazyComponent')
);

// Usage with Suspense
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent
        title="Hello"
        onAction={() => console.log('action')}
      />
    </Suspense>
  );
}

// Typed lazy with default export
const LazyDefault = lazy(() => import('./LazyDefault'));

// Typed lazy with named export
const LazyNamed = lazy(() =>
  import('./LazyNamed').then(module => ({ default: module.LazyNamed }))
);

// Typed lazy factory
function createLazyComponent<P extends Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<P> }>
) {
  return lazy(importFn) as React.LazyExoticComponent<ComponentType<P>>;
}

// Usage
interface MyComponentProps {
  value: string;
}

const MyLazyComponent = createLazyComponent<MyComponentProps>(
  () => import('./MyComponent')
);

// Typed lazy with error boundary
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class TypedErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Error: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

// Usage with error boundary
function AppWithErrorBoundary() {
  return (
    <TypedErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent title="Test" onAction={() => {}} />
      </Suspense>
    </TypedErrorBoundary>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Dynamic Imports">
          {`// Typed dynamic import function
async function loadComponent<P extends Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<P> }>
): Promise<ComponentType<P>> {
  const module = await importFn();
  return module.default;
}

// Typed dynamic import with loading state
function useLazyComponent<P extends Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<P> }>
) {
  const [Component, setComponent] = useState<ComponentType<P> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    loadComponent(importFn)
      .then(setComponent)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [importFn]);
  
  return { Component, loading, error };
}

// Usage
interface DynamicComponentProps {
  data: string;
}

function DynamicLoader() {
  const { Component, loading, error } = useLazyComponent<DynamicComponentProps>(
    () => import('./DynamicComponent')
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!Component) return null;
  
  return <Component data="test" />;
}

// Typed route-based code splitting
interface RouteConfig {
  path: string;
  component: () => Promise<{ default: ComponentType<any> }>;
}

const routes: RouteConfig[] = [
  {
    path: '/home',
    component: () => import('./Home'),
  },
  {
    path: '/about',
    component: () => import('./About'),
  },
];

function RouteLoader({ path }: { path: string }) {
  const route = routes.find(r => r.path === path);
  if (!route) return null;
  
  const LazyRoute = lazy(route.component);
  
  return (
    <Suspense fallback={<div>Loading route...</div>}>
      <LazyRoute />
    </Suspense>
  );
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>React.lazy preserves component prop types</li>
          <li>Lazy components work with Suspense boundaries</li>
          <li>Dynamic imports can be typed with generic parameters</li>
          <li>Error boundaries handle lazy loading errors</li>
          <li>Route-based splitting supports typed route configs</li>
        </ul>
      </InfoBox>
    </div>
  );
}

