import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function LazyErrorBoundariesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Lazy Loading & Error Boundaries
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React.lazy enables code splitting and lazy loading of components. Error
        Boundaries catch errors in component trees. Understanding both patterns
        with TypeScript enables optimized, robust applications.
      </p>

      <Section title="1. React.lazy Typing">
        <p className="text-gray-700 dark:text-gray-300">
          React.lazy dynamically imports components for code splitting. Suspense
          boundaries handle loading states. Understanding lazy typing enables
          type-safe code splitting.
        </p>

        <CodeBlock title="React.lazy Typing">
          {`// Basic React.lazy
const LazyComponent = React.lazy(() => import("./Component"));

// Typed lazy component
const TypedLazyComponent: React.LazyExoticComponent<
  React.ComponentType<{ prop: string }>
> = React.lazy(() => import("./TypedComponent"));

// Lazy component with default export
const LazyDefault = React.lazy(
  () => import("./Component").then((module) => ({ default: module.default }))
);

// Lazy component with named export
const LazyNamed = React.lazy(
  () => import("./Component").then((module) => ({ default: module.NamedComponent }))
);

// Typed lazy import helper
function lazyImport<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return React.lazy(importFn);
}

// Usage
const LazyButton = lazyImport(() =>
  import("./Button").then((module) => ({ default: module.Button }))
);

// Lazy with type inference
const LazyInferred = React.lazy(
  () => import("./Component")
) as React.LazyExoticComponent<React.ComponentType<{ prop: string }>>;

// Suspense boundary
function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent prop="value" />
    </React.Suspense>
  );
}

// Multiple lazy components
const LazyHome = React.lazy(() => import("./Home"));
const LazyAbout = React.lazy(() => import("./About"));
const LazyContact = React.lazy(() => import("./Contact"));

function Router() {
  return (
    <React.Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<LazyHome />} />
        <Route path="/about" element={<LazyAbout />} />
        <Route path="/contact" element={<LazyContact />} />
      </Routes>
    </React.Suspense>
  );
}

// Nested Suspense boundaries
function NestedSuspense() {
  return (
    <React.Suspense fallback={<div>Loading app...</div>}>
      <Header />
      <React.Suspense fallback={<div>Loading content...</div>}>
        <LazyComponent prop="value" />
      </React.Suspense>
    </React.Suspense>
  );
}

// Lazy with error handling
function LazyWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyComponent prop="value" />
      </React.Suspense>
    </ErrorBoundary>
  );
}

// Lazy route component
interface LazyRouteProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  fallback?: React.ReactNode;
}

function LazyRoute({ component: Component, fallback }: LazyRouteProps) {
  return (
    <React.Suspense fallback={fallback || <div>Loading...</div>}>
      <Component />
    </React.Suspense>
  );
}

// Type-safe lazy loader
type LazyComponent<T> = React.LazyExoticComponent<React.ComponentType<T>>;

function createLazyComponent<T>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>
): LazyComponent<T> {
  return React.lazy(importFn);
}

// Usage
const LazyForm = createLazyComponent<{ onSubmit: () => void }>(() =>
  import("./Form")
);

// Lazy with preload
function preloadComponent(
  lazyComponent: React.LazyExoticComponent<React.ComponentType<any>>
) {
  // Trigger import
  (lazyComponent as any)._ctor();
}

// Lazy component with metadata
interface LazyComponentMetadata {
  name: string;
  chunkName: string;
  preload?: () => void;
}

const lazyComponents: Record<string, LazyComponentMetadata> = {
  home: {
    name: "Home",
    chunkName: "home",
    preload: () => import("./Home"),
  },
  about: {
    name: "About",
    chunkName: "about",
    preload: () => import("./About"),
  },
};

function createLazyWithMetadata<T>(
  metadata: LazyComponentMetadata
): LazyComponent<T> {
  return React.lazy(metadata.preload as any);
}`}
        </CodeBlock>

        <InfoBox type="info">
          React.lazy enables code splitting with dynamic imports. Use
          LazyExoticComponent type for typed lazy components. Wrap lazy
          components in Suspense boundaries. Use nested Suspense for granular
          loading states. Combine with error boundaries for robust error
          handling.
        </InfoBox>
      </Section>

      <Section title="2. Error Boundaries">
        <p className="text-gray-700 dark:text-gray-300">
          Error Boundaries catch errors in component trees. Only class
          components can be error boundaries. Understanding error boundary
          typing enables robust error handling.
        </p>

        <CodeBlock title="Error Boundary Typing">
          {`// Basic Error Boundary class component
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div>
            <h2>Something went wrong.</h2>
            <p>{this.state.error?.message}</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <ComponentThatMayError />
</ErrorBoundary>

// Error Boundary with reset
interface ResettableErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
}

interface ResettableErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ResettableErrorBoundary extends React.Component<
  ResettableErrorBoundaryProps,
  ResettableErrorBoundaryState
> {
  constructor(props: ResettableErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<ResettableErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.handleReset}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Error Boundary with error reporting
interface ReportingErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

class ReportingErrorBoundary extends React.Component<
  ReportingErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ReportingErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Report to error service
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>An error occurred</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
<ReportingErrorBoundary
  onError={(error, errorInfo) => {
    // Send to error reporting service
    console.error("Reported error:", error, errorInfo);
  }}
>
  <ComponentThatMayError />
</ReportingErrorBoundary>

// Error Boundary with fallback render prop
interface FallbackRenderProps {
  error: Error;
  resetError: () => void;
}

interface ErrorBoundaryWithFallbackProps {
  children: React.ReactNode;
  fallback: (props: FallbackRenderProps) => React.ReactNode;
}

class ErrorBoundaryWithFallback extends React.Component<
  ErrorBoundaryWithFallbackProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryWithFallbackProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback({
        error: this.state.error,
        resetError: this.resetError,
      });
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundaryWithFallback
  fallback={({ error, resetError }) => (
    <div>
      <h2>Error: {error.message}</h2>
      <button onClick={resetError}>Reset</button>
    </div>
  )}
>
  <ComponentThatMayError />
</ErrorBoundaryWithFallback>

// Multiple Error Boundaries
function NestedErrorBoundaries() {
  return (
    <ErrorBoundary fallback={<div>Outer error</div>}>
      <Component1 />
      <ErrorBoundary fallback={<div>Inner error</div>}>
        <Component2 />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}

// Error Boundary hook (for function components, wrap in class)
function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return React.useCallback((err: Error) => {
    setError(err);
  }, []);
}

// Function component with error handling
function ComponentWithErrorHandler() {
  const handleError = useErrorHandler();

  const handleAsync = async () => {
    try {
      // Async operation
    } catch (error) {
      handleError(error as Error);
    }
  };

  return <button onClick={handleAsync}>Trigger async</button>;
}

// Type-safe error boundary factory
function createErrorBoundary<TError extends Error = Error>(
  config: {
    onError?: (error: TError, errorInfo: React.ErrorInfo) => void;
    fallback?: (error: TError, reset: () => void) => React.ReactNode;
  }
) {
  return class ConfigurableErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error: TError | null }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error: error as TError };
    }

    componentDidCatch(error: TError, errorInfo: React.ErrorInfo) {
      config.onError?.(error, errorInfo);
    }

    reset = () => {
      this.setState({ hasError: false, error: null });
    };

    render() {
      if (this.state.hasError && this.state.error) {
        return (
          config.fallback?.(this.state.error, this.reset) || (
            <div>Error: {this.state.error.message}</div>
          )
        );
      }
      return this.props.children;
    }
  };
}

// Usage
const CustomErrorBoundary = createErrorBoundary({
  onError: (error, errorInfo) => {
    console.error("Custom error:", error, errorInfo);
  },
  fallback: (error, reset) => (
    <div>
      <h2>Error: {error.message}</h2>
      <button onClick={reset}>Reset</button>
    </div>
  ),
});`}
        </CodeBlock>

        <InfoBox type="important">
          Error Boundaries catch errors in component trees. Only class
          components can be error boundaries. Use getDerivedStateFromError for
          error state. Use componentDidCatch for error reporting. Provide
          fallback UI for better UX. Combine with lazy loading for robust
          code-split applications.
        </InfoBox>
      </Section>
    </div>
  );
}
