import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function HOCRenderPropsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Higher-Order Components & Render Props
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Higher-Order Components (HOCs) and Render Props are advanced React
        patterns for code reuse and component composition. Understanding their
        TypeScript typing enables type-safe component enhancement and flexible
        APIs.
      </p>

      <Section title="1. Higher-Order Components (HOCs)">
        <p className="text-gray-700 dark:text-gray-300">
          HOCs are functions that take a component and return a new component
          with additional props or behavior. Understanding HOC typing, prop
          inference, and injected props enables type-safe component enhancement.
        </p>

        <CodeBlock title="HOC Typing Patterns">
          {`// Basic HOC typing
// HOC takes a component and returns enhanced component

// Simple HOC without injected props
function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return (props: P) => {
    const [loading, setLoading] = React.useState(false);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}

// Usage
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

const ButtonWithLoading = withLoading(Button);

<ButtonWithLoading label="Click" onClick={() => {}} />

// HOC with injected props
type InjectedProps = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

function withLoadingState<P extends object>(
  Component: React.ComponentType<P & InjectedProps>
): React.FC<P> {
  return (props: P) => {
    const [loading, setLoading] = React.useState(false);

    return (
      <Component
        {...props}
        isLoading={loading}
        setLoading={setLoading}
      />
    );
  };
}

// Usage
interface EnhancedButtonProps {
  label: string;
  onClick: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

function EnhancedButton({
  label,
  onClick,
  isLoading,
  setLoading,
}: EnhancedButtonProps) {
  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? "Loading..." : label}
    </button>
  );
}

const EnhancedButtonWithLoading = withLoadingState(EnhancedButton);

<EnhancedButtonWithLoading label="Click" onClick={() => {}} />

// HOC with Omit for prop exclusion
function withTheme<P extends object>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, "theme"> & { theme?: string }> {
  return (props) => {
    const theme = "dark";  // Get from context or state
    
    return <Component {...props as P} theme={theme} />;
  };
}

// HOC type inference helper
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

// Advanced HOC with multiple injected props
interface WithAuthProps {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  login: () => void;
  logout: () => void;
}

function withAuth<P extends object>(
  Component: React.ComponentType<P & WithAuthProps>
): React.FC<P> {
  return (props: P) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState<{ id: string; name: string } | null>(null);

    const login = () => {
      setIsAuthenticated(true);
      setUser({ id: "1", name: "John" });
    };

    const logout = () => {
      setIsAuthenticated(false);
      setUser(null);
    };

    return (
      <Component
        {...props}
        isAuthenticated={isAuthenticated}
        user={user}
        login={login}
        logout={logout}
      />
    );
  };
}

// Usage
interface ProtectedComponentProps {
  message: string;
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  login: () => void;
  logout: () => void;
}

function ProtectedComponent({
  message,
  isAuthenticated,
  user,
  login,
  logout,
}: ProtectedComponentProps) {
  if (!isAuthenticated) {
    return (
      <div>
        <p>Please login</p>
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <p>{message}</p>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

const ProtectedComponentWithAuth = withAuth(ProtectedComponent);

<ProtectedComponentWithAuth message="Protected content" />

// HOC with additional configuration
interface HOCConfig {
  showLoading?: boolean;
  errorMessage?: string;
}

function withAsync<P extends object>(
  Component: React.ComponentType<P>,
  config: HOCConfig = {}
): React.FC<P> {
  return (props: P) => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
      // Simulate async operation
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);

    if (config.showLoading && loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{config.errorMessage || "Error occurred"}</div>;
    }

    return <Component {...props} />;
  };
}

// Generic HOC type
type HOC<InjectedProps = {}, AdditionalProps = {}> = <P extends object>(
  Component: React.ComponentType<P & InjectedProps>
) => React.ComponentType<P & AdditionalProps>;

// Type-safe HOC creator
function createHOC<TInjected extends object, TAdditional extends object = {}>(
  injector: (props: TAdditional) => TInjected
): HOC<TInjected, TAdditional> {
  return <P extends object>(
    Component: React.ComponentType<P & TInjected>
  ): React.ComponentType<P & TAdditional> => {
    return (props: P & TAdditional) => {
      const injected = injector(props);
      return <Component {...props} {...injected} />;
    };
  };
}

// Usage
const withCounter = createHOC<{ count: number; increment: () => void }>(() => {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);

  return { count, increment };
});

interface CounterComponentProps {
  title: string;
  count: number;
  increment: () => void;
}

function CounterComponent({ title, count, increment }: CounterComponentProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

const CounterWithHOC = withCounter(CounterComponent);

<CounterWithHOC title="Counter" />

// HOC with forwardRef support
function withRefForwarding<P extends object, T>(
  Component: React.ComponentType<P & { ref?: React.Ref<T> }>
): React.ForwardRefExoticComponent<P & React.RefAttributes<T>> {
  return React.forwardRef<T, P>((props, ref) => {
    return <Component {...props} ref={ref} />;
  });
}

// HOC with memo
function withMemo<P extends object>(
  Component: React.ComponentType<P>
): React.MemoExoticComponent<React.ComponentType<P>> {
  return React.memo(Component);
}

// HOC composition
function composeHOCs(...hocs: Array<(component: React.ComponentType<any>) => React.ComponentType<any>>) {
  return (Component: React.ComponentType<any>) => {
    return hocs.reduceRight((acc, hoc) => hoc(acc), Component);
  };
}

// Usage
const EnhancedComponent = composeHOCs(
  withLoading,
  withMemo,
  withTheme
)(Button);

// HOC prop inference
type InferredProps<T> = T extends React.ComponentType<infer P> ? P : never;

function withProps<P>(
  Component: React.ComponentType<P>,
  additionalProps: Partial<P>
): React.FC<Omit<P, keyof typeof additionalProps>> {
  return (props) => {
    return <Component {...props as P} {...additionalProps} />;
  };
}

// Type-safe HOC with constraints
interface HasId {
  id: string;
}

function withId<P extends HasId>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, "id"> & { id?: string }> {
  return (props) => {
    const id = props.id || Math.random().toString(36);
    return <Component {...props as P} id={id} />;
  };
}`}
        </CodeBlock>

        <InfoBox type="info">
          HOCs are functions that take a component and return enhanced
          component. Use generic types for prop inference and type safety. Use
          Omit/Pick to exclude/include props. Use forwardRef for ref forwarding.
          Combine HOCs with composeHOCs. Infer component props with conditional
          types for full type safety.
        </InfoBox>
      </Section>

      <Section title="2. Render Props Pattern">
        <p className="text-gray-700 dark:text-gray-300">
          Render Props pattern uses a function as a prop that returns React
          elements. Understanding render prop typing enables flexible, type-safe
          component APIs with function as children or render props.
        </p>

        <CodeBlock title="Render Props Typing">
          {`// Basic render prop pattern
interface MouseProps {
  render: (position: { x: number; y: number }) => React.ReactNode;
}

function Mouse({ render }: MouseProps) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <>{render(position)}</>;
}

// Usage
<Mouse
  render={({ x, y }) => (
    <div>
      Mouse position: {x}, {y}
    </div>
  )}
/>

// Render prop with children (function as children)
interface MouseProps2 {
  children: (position: { x: number; y: number }) => React.ReactNode;
}

function Mouse2({ children }: MouseProps2) {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <>{children(position)}</>;
}

// Usage
<Mouse2>
  {({ x, y }) => (
    <div>
      Mouse position: {x}, {y}
    </div>
  )}
</Mouse2>

// Generic render prop
interface DataFetcherProps<T> {
  url: string;
  children: (data: {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
  }) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => res.json())
      .then((json: T) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <>{children({ data, loading, error, refetch: fetchData })}</>;
}

// Usage
interface User {
  id: number;
  name: string;
}

<DataFetcher<User[]> url="/api/users">
  {({ data, loading, error, refetch }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return null;

    return (
      <div>
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <button onClick={refetch}>Reload</button>
      </div>
    );
  }}
</DataFetcher>

// Render prop with multiple values
interface ToggleProps {
  children: (state: {
    isOn: boolean;
    toggle: () => void;
    setOn: () => void;
    setOff: () => void;
  }) => React.ReactNode;
}

function Toggle({ children }: ToggleProps) {
  const [isOn, setIsOn] = React.useState(false);

  const toggle = () => setIsOn((prev) => !prev);
  const setOn = () => setIsOn(true);
  const setOff = () => setIsOn(false);

  return <>{children({ isOn, toggle, setOn, setOff })}</>;
}

// Usage
<Toggle>
  {({ isOn, toggle, setOn, setOff }) => (
    <div>
      <button onClick={toggle}>{isOn ? "ON" : "OFF"}</button>
      <button onClick={setOn}>Turn On</button>
      <button onClick={setOff}>Turn Off</button>
    </div>
  )}
</Toggle>

// Render prop with optional render prop
interface FlexibleRenderProps {
  render?: (data: string) => React.ReactNode;
  children?: (data: string) => React.ReactNode;
  fallback?: React.ReactNode;
}

function FlexibleRender({ render, children, fallback }: FlexibleRenderProps) {
  const data = "Data";

  const renderFn = render || children;

  if (!renderFn) {
    return <>{fallback || null}</>;
  }

  return <>{renderFn(data)}</>;
}

// Usage
<FlexibleRender
  render={(data) => <div>{data}</div>}
  fallback={<div>No render function</div>}
/>

<FlexibleRender>
  {(data) => <div>{data}</div>}
</FlexibleRender>

// Type-safe render prop component
type RenderProp<T> = (data: T) => React.ReactNode;

interface TypedRenderProps<T> {
  data: T;
  render: RenderProp<T>;
}

function TypedRender<T>({ data, render }: TypedRenderProps<T>) {
  return <>{render(data)}</>;
}

// Usage
<TypedRender
  data={{ name: "John", age: 30 }}
  render={(user) => (
    <div>
      {user.name} is {user.age} years old
    </div>
  )}
/>

// Render prop with conditional rendering
interface ConditionalRenderProps<T> {
  condition: boolean;
  whenTrue: (data: T) => React.ReactNode;
  whenFalse: (data: T) => React.ReactNode;
  data: T;
}

function ConditionalRender<T>({
  condition,
  whenTrue,
  whenFalse,
  data,
}: ConditionalRenderProps<T>) {
  return <>{condition ? whenTrue(data) : whenFalse(data)}</>;
}

// Render prop with loading states
interface AsyncRenderProps<T> {
  promise: Promise<T>;
  children: (state: {
    data: T | null;
    loading: boolean;
    error: Error | null;
  }) => React.ReactNode;
  fallback?: React.ReactNode;
}

function AsyncRender<T>({ promise, children, fallback }: AsyncRenderProps<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    promise
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [promise]);

  if (loading && fallback) {
    return <>{fallback}</>;
  }

  return <>{children({ data, loading, error })}</>;
}

// Render prop pattern for form state
interface FormRenderProps<T> {
  initialValues: T;
  children: (state: {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    setValue: <K extends keyof T>(field: K, value: T[K]) => void;
    setError: <K extends keyof T>(field: K, error: string) => void;
    setTouched: <K extends keyof T>(field: K, touched: boolean) => void;
    handleSubmit: (onSubmit: (values: T) => void) => (e: React.FormEvent) => void;
    reset: () => void;
  }) => React.ReactNode;
}

function FormRender<T extends Record<string, any>>({
  initialValues,
  children,
}: FormRenderProps<T>) {
  const [values, setValues] = React.useState<T>(initialValues);
  const [errors, setErrors] = React.useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof T, boolean>>>({});

  const setValue = React.useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const setError = React.useCallback(<K extends keyof T>(field: K, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  }, []);

  const setTouched = React.useCallback(<K extends keyof T>(field: K, touched: boolean) => {
    setTouched((prev) => ({ ...prev, [field]: touched }));
  }, []);

  const handleSubmit = React.useCallback(
    (onSubmit: (values: T) => void) => (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(values);
    },
    [values]
  );

  const reset = React.useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return (
    <>
      {children({
        values,
        errors,
        touched,
        setValue,
        setError,
        setTouched,
        handleSubmit,
        reset,
      })}
    </>
  );
}

// Usage
<FormRender initialValues={{ name: "", email: "" }}>
  {({ values, setValue, handleSubmit }) => (
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      <input
        value={values.name}
        onChange={(e) => setValue("name", e.target.value)}
      />
      <input
        value={values.email}
        onChange={(e) => setValue("email", e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  )}
</FormRender>

// Type-safe render prop helper
function createRenderProp<T>(): {
  Component: React.FC<{ children: (data: T) => React.ReactNode }>;
  useData: () => T;
} {
  const Context = React.createContext<T | undefined>(undefined);

  const Component: React.FC<{ children: (data: T) => React.ReactNode }> = ({
    children,
  }) => {
    const [data, setData] = React.useState<T>({} as T);
    return (
      <Context.Provider value={data}>
        {children(data)}
      </Context.Provider>
    );
  };

  const useData = () => {
    const data = React.useContext(Context);
    if (!data) throw new Error("Must be used within Component");
    return data;
  };

  return { Component, useData };
}`}
        </CodeBlock>

        <InfoBox type="important">
          Render Props pattern uses functions as props or children that return
          React elements. Type render prop functions with generic types for
          flexibility. Use function as children for cleaner API. Support both
          render prop and children patterns for maximum flexibility. Use generic
          types for type-safe data passing in render props.
        </InfoBox>
      </Section>
    </div>
  );
}

