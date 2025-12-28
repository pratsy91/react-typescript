import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function PortalsCustomHooksPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Portals, Custom Hooks & Hook Factories
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        ReactDOM.createPortal renders children outside the component tree.
        Custom Hooks encapsulate reusable logic. Hook Factories create typed
        hook generators. Understanding all patterns enables flexible, reusable
        React applications.
      </p>

      <Section title="1. ReactDOM.createPortal Typing">
        <p className="text-gray-700 dark:text-gray-300">
          ReactDOM.createPortal renders children into a DOM node outside the
          component tree. Understanding portal typing enables modal dialogs,
          tooltips, and overlays.
        </p>

        <CodeBlock title="ReactDOM.createPortal Typing">
          {`// Basic portal
function Modal({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">{children}</div>,
    document.body
  );
}

// Typed portal component
interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    children,
    container || document.body
  );
}

// Portal with ref
interface PortalWithRefProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

const PortalWithRef = React.forwardRef<HTMLDivElement, PortalWithRefProps>(
  ({ children, container }, ref) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return ReactDOM.createPortal(
      <div ref={ref}>{children}</div>,
      container || document.body
    );
  }
);

// Modal with portal
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {title && <h2>{title}</h2>}
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

// Tooltip with portal
interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
}

function Tooltip({ children, content }: TooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top + rect.height });
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      {React.cloneElement(children, {
        ref: triggerRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="tooltip"
            style={{
              position: "fixed",
              left: position.x,
              top: position.y,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

// Dropdown with portal
interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

function Dropdown({ trigger, children }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top + rect.height });
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div ref={triggerRef} onClick={handleToggle}>
        {trigger}
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="dropdown"
            style={{
              position: "fixed",
              left: position.x,
              top: position.y,
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
}

// Portal with custom container
function usePortal(containerId?: string) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const element = containerId
      ? document.getElementById(containerId)
      : document.body;

    if (!element && !containerId) {
      const newContainer = document.createElement("div");
      document.body.appendChild(newContainer);
      setContainer(newContainer);
      return () => {
        document.body.removeChild(newContainer);
      };
    }

    setContainer(element);
  }, [containerId]);

  const PortalComponent = React.useCallback(
    ({ children }: { children: React.ReactNode }) => {
      if (!container) return null;
      return ReactDOM.createPortal(children, container);
    },
    [container]
  );

  return PortalComponent;
}

// Usage
function ComponentWithPortal() {
  const Portal = usePortal();

  return (
    <div>
      <button>Open</button>
      <Portal>
        <div>Portal content</div>
      </Portal>
    </div>
  );
}

// Type-safe portal helper
function createPortal(
  children: React.ReactNode,
  container: HTMLElement | null
): React.ReactPortal | null {
  if (!container) return null;
  return ReactDOM.createPortal(children, container);
}

// Portal with animation
interface AnimatedPortalProps {
  children: React.ReactNode;
  isOpen: boolean;
  container?: HTMLElement;
}

function AnimatedPortal({ children, isOpen, container }: AnimatedPortalProps) {
  const [shouldRender, setShouldRender] = React.useState(isOpen);

  React.useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <div className={isOpen ? "fade-in" : "fade-out"}>{children}</div>,
    container || document.body
  );
}`}
        </CodeBlock>

        <InfoBox type="info">
          ReactDOM.createPortal renders children into a DOM node outside the
          component tree. Use portals for modals, tooltips, and overlays. Mount
          portal containers safely with useEffect. Handle cleanup and event
          delegation properly. Portals preserve React event handling.
        </InfoBox>
      </Section>

      <Section title="2. Custom Hooks">
        <p className="text-gray-700 dark:text-gray-300">
          Custom Hooks encapsulate reusable logic. Return type inference and
          generic custom hooks enable type-safe reusable logic. Understanding
          custom hook typing enables clean, reusable code.
        </p>

        <CodeBlock title="Custom Hooks Typing">
          {`// Basic custom hook with return type inference
function useCounter(initialValue = 0) {
  const [count, setCount] = React.useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
  // Return type: { count: number; increment: () => void; decrement: () => void; reset: () => void; }
}

// Explicit return type
function useCounterTyped(initialValue = 0): {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
} {
  const [count, setCount] = React.useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// Generic custom hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
function Component() {
  const [name, setName] = useLocalStorage<string>("name", "");
  const [count, setCount] = useLocalStorage<number>("count", 0);
}

// Custom hook with async
function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): {
  execute: () => Promise<void>;
  value: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [value, setValue] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const execute = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFunction();
      setValue(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, value, loading, error };
}

// Custom hook with reducer
type CounterAction = { type: "increment" } | { type: "decrement" } | { type: "reset" };

function useCounterReducer(initialValue = 0) {
  const [state, dispatch] = React.useReducer(
    (state: number, action: CounterAction) => {
      switch (action.type) {
        case "increment":
          return state + 1;
        case "decrement":
          return state - 1;
        case "reset":
          return initialValue;
        default:
          return state;
      }
    },
    initialValue
  );

  return { count: state, dispatch };
}

// Custom hook with ref
function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Custom hook with callback
function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined
): T {
  const callbackRef = React.useRef(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return React.useCallback(
    ((...args: any[]) => callbackRef.current?.(...args)) as T,
    []
  );
}

// Custom hook factory
function createUseCounter(initialValue = 0) {
  return function useCounter() {
    const [count, setCount] = React.useState(initialValue);
    const increment = () => setCount((c) => c + 1);
    return { count, increment };
  };
}

const useMyCounter = createUseCounter(10);`}
        </CodeBlock>

        <InfoBox type="tip">
          Custom Hooks encapsulate reusable logic. Return types are inferred
          automatically. Use generic types for reusable hooks. Use explicit
          return types for complex hooks. Custom hooks enable clean, reusable
          component logic.
        </InfoBox>
      </Section>

      <Section title="3. Hook Factories">
        <p className="text-gray-700 dark:text-gray-300">
          Hook Factories create typed hook generators. Understanding hook
          factory typing enables reusable hook patterns with configuration.
        </p>

        <CodeBlock title="Hook Factories Typing">
          {`// Basic hook factory
function createUseState<T>(initialValue: T) {
  return function useGeneratedState() {
    return React.useState(initialValue);
  };
}

const useCount = createUseState(0);

// Typed hook factory
interface CounterConfig {
  initialValue: number;
  step: number;
}

function createUseCounter(config: CounterConfig) {
  return function useCounter(): {
    count: number;
    increment: () => void;
    decrement: () => void;
  } {
    const [count, setCount] = React.useState(config.initialValue);

    const increment = () => setCount((c) => c + config.step);
    const decrement = () => setCount((c) => c - config.step);

    return { count, increment, decrement };
  };
}

const useMyCounter = createUseCounter({ initialValue: 0, step: 1 });

// Generic hook factory
function createUseStorage<T>(key: string, defaultValue: T) {
  return function useStorage(): [T, (value: T) => void] {
    const [value, setValue] = useLocalStorage(key, defaultValue);
    return [value, setValue];
  };
}

const useName = createUseStorage<string>("name", "");
const useCount = createUseStorage<number>("count", 0);

// Hook factory with context
function createContextHook<T>() {
  const Context = React.createContext<T | undefined>(undefined);

  function Provider({ value, children }: { value: T; children: React.ReactNode }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useContext() {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error("Must be used within Provider");
    }
    return context;
  }

  return { Provider, useContext };
}

// Usage
interface Theme {
  mode: "light" | "dark";
  toggle: () => void;
}

const { Provider: ThemeProvider, useContext: useTheme } =
  createContextHook<Theme>();

// Hook factory with API
function createUseApi<T>(endpoint: string) {
  return function useApi() {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
      fetch(endpoint)
        .then((res) => res.json())
        .then((json: T) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, [endpoint]);

    return { data, loading, error };
  };
}

const useUsers = createUseApi<Array<{ id: number; name: string }>>(
  "/api/users"
);

// Hook factory with dependencies
function createUseFetch<T>(
  url: string,
  options?: RequestInit
) {
  return function useFetch(): {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
  } {
    const [data, setData] = React.useState<T | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    const fetchData = React.useCallback(() => {
      setLoading(true);
      fetch(url, options)
        .then((res) => res.json())
        .then((json: T) => {
          setData(json);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }, [url, options]);

    React.useEffect(() => {
      fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
  };
}

const useUserData = createUseFetch<{ name: string }>("/api/user");

// Hook factory with state machine
type StateMachine<T extends string> = {
  [K in T]: {
    [K2 in T]?: () => void;
  };
};

function createUseStateMachine<T extends string>(
  initialState: T,
  transitions: StateMachine<T>
) {
  return function useStateMachine(): [T, (newState: T) => void] {
    const [state, setState] = React.useState<T>(initialState);

    const transition = React.useCallback((newState: T) => {
      const transitionFn = transitions[state]?.[newState];
      if (transitionFn) {
        transitionFn();
        setState(newState);
      }
    }, [state]);

    return [state, transition];
  };
}

// Usage
type AppState = "idle" | "loading" | "success" | "error";

const useAppStateMachine = createUseStateMachine<AppState>("idle", {
  idle: { loading: () => console.log("Starting...") },
  loading: { success: () => console.log("Success!"), error: () => console.log("Error!") },
  success: { idle: () => console.log("Reset") },
  error: { idle: () => console.log("Reset") },
});`}
        </CodeBlock>

        <InfoBox type="important">
          Hook Factories create typed hook generators. Use generic types for
          reusable factories. Configure factories with parameters. Combine with
          context for shared state. Hook factories enable powerful, reusable
          hook patterns.
        </InfoBox>
      </Section>
    </div>
  );
}
