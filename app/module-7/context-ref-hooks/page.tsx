import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ContextRefHooksPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Context & Ref Hooks
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        useContext provides typed context access, useRef manages mutable refs,
        and useImperativeHandle exposes custom ref handles. Understanding their
        TypeScript patterns enables type-safe context sharing and imperative
        APIs.
      </p>

      <Section title="1. useContext Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useContext provides type-safe access to React Context. Understanding
          generic context typing, provider patterns, and default values enables
          robust context sharing.
        </p>

        <CodeBlock title="useContext with TypeScript">
          {`// Basic context creation and usage
interface ThemeContextValue {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

// Provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const value: ThemeContextValue = React.useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Consumer hook with type safety
function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;  // Type is ThemeContextValue
}

// Usage
function ThemedComponent() {
  const { theme, toggleTheme } = useTheme();  // Fully typed

  return (
    <div className={\`theme-\${theme}\`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// Context with default value (no undefined)
interface ConfigContextValue {
  apiUrl: string;
  timeout: number;
}

const ConfigContext = React.createContext<ConfigContextValue>({
  apiUrl: "https://api.example.com",
  timeout: 5000,
});

// No need for undefined check with default value
function useConfig() {
  return React.useContext(ConfigContext);  // Always defined
}

// Generic context hook
function createTypedContext<T>() {
  const Context = React.createContext<T | undefined>(undefined);

  function useTypedContext() {
    const context = React.useContext(Context);

    if (!context) {
      throw new Error("Context must be used within Provider");
    }

    return context;  // Type is T
  }

  return [Context, useTypedContext] as const;
}

// Usage
interface UserContextValue {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const [UserContext, useUser] = createTypedContext<UserContextValue>();

function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  const value: UserContextValue = React.useMemo(
    () => ({
      user,
      login: setUser,
      logout: () => setUser(null),
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Consumer component
function UserProfile() {
  const { user, logout } = useUser();  // Fully typed

  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Multiple contexts
interface AuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
}

interface ThemeContextValue {
  theme: "light" | "dark";
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);
const ThemeContext2 = React.createContext<ThemeContextValue | undefined>(
  undefined
);

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

function useTheme2() {
  const context = React.useContext(ThemeContext2);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

// Usage with multiple contexts
function ComponentWithMultipleContexts() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme2();

  return null;
}

// Context with discriminated union
type AppState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: Error };

interface AppContextValue {
  state: AppState;
  fetchData: () => void;
}

const AppContext = React.createContext<AppContextValue | undefined>(undefined);

function useApp() {
  const context = React.useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}

// Type narrowing works perfectly
function AppComponent() {
  const { state } = useApp();

  if (state.status === "success") {
    return <div>{state.data.map((u) => u.name).join(", ")}</div>;
  }

  if (state.status === "error") {
    return <div>Error: {state.error.message}</div>;
  }

  return null;
}

// Optional context (with fallback)
interface OptionalContextValue {
  featureEnabled: boolean;
}

const OptionalContext = React.createContext<OptionalContextValue>({
  featureEnabled: false,  // Default value
});

function useOptionalFeature() {
  const { featureEnabled } = React.useContext(OptionalContext);
  return featureEnabled;  // Always defined (has default)
}

// Context with action creators
interface CounterContextValue {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const CounterContext = React.createContext<CounterContextValue | undefined>(
  undefined
);

function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = React.useState(0);

  const value: CounterContextValue = React.useMemo(
    () => ({
      count,
      increment: () => setCount((prev) => prev + 1),
      decrement: () => setCount((prev) => prev - 1),
      reset: () => setCount(0),
    }),
    [count]
  );

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

function useCounter() {
  const context = React.useContext(CounterContext);
  if (!context) throw new Error("useCounter must be used within CounterProvider");
  return context;
}

// Nested contexts
function NestedProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <CounterProvider>{children}</CounterProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

// Context selector pattern (performance)
interface LargeContextValue {
  user: User;
  settings: Settings;
  preferences: Preferences;
  // ... many other values
}

const LargeContext = React.createContext<LargeContextValue | undefined>(
  undefined
);

// Selector function for optimized re-renders
function useLargeContext<T>(selector: (value: LargeContextValue) => T): T {
  const context = React.useContext(LargeContext);
  if (!context) throw new Error("Must be used within Provider");

  return React.useMemo(() => selector(context), [context, selector]);
}

// Usage: only re-renders when selected value changes
function OptimizedComponent() {
  // Only subscribes to user changes
  const user = useLargeContext((value) => value.user);

  return <div>{user.name}</div>;
}

// Context with reducer
type CounterAction = { type: "increment" } | { type: "decrement" };

function counterReducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

interface CounterContextWithReducer {
  state: number;
  dispatch: React.Dispatch<CounterAction>;
}

const CounterContextWithReducer = React.createContext<
  CounterContextWithReducer | undefined
>(undefined);

function CounterProviderWithReducer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(counterReducer, 0);

  const value = React.useMemo(
    () => ({ state, dispatch }),
    [state]
  );

  return (
    <CounterContextWithReducer.Provider value={value}>
      {children}
    </CounterContextWithReducer.Provider>
  );
}`}
        </CodeBlock>

        <InfoBox type="info">
          useContext with TypeScript provides type-safe context access. Use
          generic context creation, typed provider values, and custom hooks for
          type safety. Always check for undefined unless context has a default
          value. Use selector patterns for performance with large contexts.
        </InfoBox>
      </Section>

      <Section title="2. useRef Hook (Revisited)">
        <p className="text-gray-700 dark:text-gray-300">
          useRef provides mutable refs for DOM elements and values.
          Understanding RefObject vs MutableRefObject, null handling, and
          element refs enables type-safe imperative access.
        </p>

        <CodeBlock title="useRef typing patterns">
          {`// Element refs (RefObject)
function ElementRef() {
  // RefObject<HTMLInputElement> - readonly current
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();  // Optional chaining
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

// Mutable value refs (MutableRefObject)
function ValueRef() {
  // MutableRefObject<number> - mutable current
  const countRef = React.useRef<number>(0);

  const increment = () => {
    countRef.current += 1;  // Mutable, no re-render
    console.log(countRef.current);
  };

  return <button onClick={increment}>Increment (no re-render)</button>;
}

// Type inference
function InferredRef() {
  // Inferred as RefObject<HTMLDivElement>
  const divRef = React.useRef<HTMLDivElement>(null);

  // Inferred as MutableRefObject<number>
  const valueRef = React.useRef(0);

  return <div ref={divRef}>Content</div>;
}

// Null handling
function NullHandling() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      // TypeScript knows ref.current is HTMLDivElement here
      ref.current.scrollIntoView();
    }
  }, []);

  // Or use non-null assertion (use carefully)
  const assertRef = () => {
    ref.current!.focus();  // ! asserts non-null
  };

  return <div ref={ref}>Content</div>;
}

// Ref with initial value
function InitialValueRef() {
  // MutableRefObject with initial value
  const dataRef = React.useRef<{ items: number[] }>({ items: [] });

  const addItem = (item: number) => {
    dataRef.current.items.push(item);  // Mutable
  };

  return null;
}

// Ref callback pattern
function CallbackRef() {
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);

  // Callback ref receives element
  const refCallback = React.useCallback((node: HTMLDivElement | null) => {
    setElement(node);
  }, []);

  React.useEffect(() => {
    if (element) {
      // Use element here
      element.scrollIntoView();
    }
  }, [element]);

  return <div ref={refCallback}>Content</div>;
}

// Previous value pattern
function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage
function PreviousValueExample() {
  const [count, setCount] = React.useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
    </div>
  );
}

// Interval/timeout refs
function IntervalRef() {
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      console.log("Tick");
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  React.useEffect(() => {
    return () => stopInterval();
  }, []);

  return null;
}

// Ref with complex type
interface RefValue {
  data: string[];
  metadata: { count: number; timestamp: number };
}

function ComplexRef() {
  const ref = React.useRef<RefValue>({
    data: [],
    metadata: { count: 0, timestamp: Date.now() },
  });

  const addData = (item: string) => {
    ref.current.data.push(item);
    ref.current.metadata.count += 1;
    ref.current.metadata.timestamp = Date.now();
  };

  return null;
}

// Ref type helpers
type RefType<T> = T extends React.RefObject<infer U>
  ? U
  : T extends React.MutableRefObject<infer U>
  ? U
  : never;

function getRefValue<T>(ref: React.RefObject<T>): T | null {
  return ref.current;
}

function getMutableRefValue<T>(ref: React.MutableRefObject<T>): T {
  return ref.current;  // Never null
}`}
        </CodeBlock>

        <InfoBox type="tip">
          useRef creates RefObject (readonly, nullable) for element refs or
          MutableRefObject (mutable, non-null) for value refs. Use explicit
          generics for type safety. Always use optional chaining for element
          refs or check for null before accessing.
        </InfoBox>
      </Section>

      <Section title="3. useImperativeHandle Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useImperativeHandle exposes custom methods on refs, enabling
          imperative APIs while maintaining type safety. Perfect for exposing
          component methods to parent components.
        </p>

        <CodeBlock title="useImperativeHandle with TypeScript">
          {`// Basic useImperativeHandle
interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
}

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = React.forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ src }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useImperativeHandle(ref, () => ({
      play() {
        videoRef.current?.play();
      },
      pause() {
        videoRef.current?.pause();
      },
      seek(time: number) {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      getCurrentTime() {
        return videoRef.current?.currentTime || 0;
      },
    }));

    return <video ref={videoRef} src={src} />;
  }
);

// Usage
function VideoController() {
  const playerRef = React.useRef<VideoPlayerRef>(null);

  const handlePlay = () => {
    playerRef.current?.play();  // Type-safe method call
  };

  return (
    <div>
      <VideoPlayer ref={playerRef} src="video.mp4" />
      <button onClick={handlePlay}>Play</button>
    </div>
  );
}

// Form handle pattern
interface FormHandle {
  submit: () => void;
  reset: () => void;
  validate: () => boolean;
  getValues: () => Record<string, any>;
  setValue: (field: string, value: any) => void;
}

interface FormProps {
  onSubmit: (data: Record<string, any>) => void;
  children: React.ReactNode;
}

const Form = React.forwardRef<FormHandle, FormProps>(
  ({ onSubmit, children }, ref) => {
    const [values, setValues] = React.useState<Record<string, any>>({});
    const formRef = React.useRef<HTMLFormElement>(null);

    React.useImperativeHandle(ref, () => ({
      submit() {
        if (formRef.current) {
          formRef.current.requestSubmit();
        } else {
          onSubmit(values);
        }
      },
      reset() {
        setValues({});
        formRef.current?.reset();
      },
      validate() {
        return Object.keys(values).length > 0;
      },
      getValues() {
        return values;
      },
      setValue(field: string, value: any) {
        setValues((prev) => ({ ...prev, [field]: value }));
      },
    }));

    return <form ref={formRef}>{children}</form>;
  }
);

// Input with methods
interface InputHandle {
  focus: () => void;
  blur: () => void;
  select: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

interface InputProps {
  defaultValue?: string;
}

const Input = React.forwardRef<InputHandle, InputProps>(
  ({ defaultValue = "" }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [value, setValue] = React.useState(defaultValue);

    React.useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },
      blur() {
        inputRef.current?.blur();
      },
      select() {
        inputRef.current?.select();
      },
      getValue() {
        return value;
      },
      setValue(newValue: string) {
        setValue(newValue);
        if (inputRef.current) {
          inputRef.current.value = newValue;
        }
      },
    }));

    return (
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }
);

// Scrollable container
interface ScrollableHandle {
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollTo: (position: number) => void;
  getScrollPosition: () => number;
}

interface ScrollableProps {
  children: React.ReactNode;
}

const Scrollable = React.forwardRef<ScrollableHandle, ScrollableProps>(
  ({ children }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => ({
      scrollToTop() {
        containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      },
      scrollToBottom() {
        if (containerRef.current) {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      },
      scrollTo(position: number) {
        containerRef.current?.scrollTo({ top: position, behavior: "smooth" });
      },
      getScrollPosition() {
        return containerRef.current?.scrollTop || 0;
      },
    }));

    return (
      <div ref={containerRef} style={{ overflow: "auto", height: "300px" }}>
        {children}
      </div>
    );
  }
);

// Conditional imperative handle
interface ConditionalHandle {
  method1: () => void;
  method2: () => void;
}

const ConditionalComponent = React.forwardRef<
  ConditionalHandle,
  { enabled: boolean }
>(({ enabled }, ref) => {
  React.useImperativeHandle(
    ref,
    () => ({
      method1() {
        console.log("Method 1");
      },
      method2() {
        if (enabled) {
          console.log("Method 2");
        }
      },
    }),
    [enabled]  // Dependencies array
  );

  return <div>Content</div>;
});

// Generic imperative handle
interface GenericHandle<T> {
  getValue: () => T;
  setValue: (value: T) => void;
}

function createGenericComponent<T>() {
  return React.forwardRef<GenericHandle<T>, { initialValue: T }>(
    ({ initialValue }, ref) => {
      const [value, setValue] = React.useState<T>(initialValue);

      React.useImperativeHandle(ref, () => ({
        getValue() {
          return value;
        },
        setValue(newValue: T) {
          setValue(newValue);
        },
      }));

      return <div>{String(value)}</div>;
    }
  );
}

// Multiple refs pattern
interface ComponentWithMultipleRefs {
  inputRef: React.RefObject<HTMLInputElement>;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

// Type-safe imperative handle creator
function createImperativeHandle<Handle, Props>(
  handler: (
    props: Props,
    refs: Record<string, React.RefObject<any>>
  ) => Handle
) {
  return (ref: React.Ref<Handle>, props: Props) => {
    const handle = handler(props, {});
    React.useImperativeHandle(ref, () => handle);
  };
}`}
        </CodeBlock>

        <InfoBox type="important">
          useImperativeHandle exposes custom methods on forwarded refs. Define
          an interface for the handle type, use with forwardRef, and include
          dependencies array when needed. Provides type-safe imperative APIs
          while keeping components declarative.
        </InfoBox>
      </Section>
    </div>
  );
}
