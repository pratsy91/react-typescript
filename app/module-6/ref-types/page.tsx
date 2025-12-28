import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function RefTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Ref Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React provides several ref types for accessing DOM elements and
        component instances: Ref, RefObject, MutableRefObject, ForwardedRef, and
        LegacyRef. Understanding each type enables type-safe imperative DOM
        access and component references.
      </p>

      <Section title="1. React.RefObject">
        <p className="text-gray-700 dark:text-gray-300">
          RefObject is the read-only ref type returned by useRef when
          initialized with null. It's the most common ref type for DOM element
          access.
        </p>

        <CodeBlock title="RefObject examples">
          {`// Basic RefObject with useRef
function InputComponent() {
  // RefObject<HTMLInputElement>
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();  // current is readonly
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

// RefObject type definition
interface RefObject<T> {
  readonly current: T | null;
}

// Different element types
function RefExamples() {
  const divRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (
    <div>
      <div ref={divRef}>Div</div>
      <button ref={buttonRef}>Button</button>
      <video ref={videoRef} />
      <canvas ref={canvasRef} />
    </div>
  );
}

// Accessing DOM methods
function VideoPlayer() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const play = () => {
    videoRef.current?.play();
  };

  const pause = () => {
    videoRef.current?.pause();
  };

  const getCurrentTime = (): number | undefined => {
    return videoRef.current?.currentTime;
  };

  return (
    <div>
      <video ref={videoRef} src="video.mp4" />
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
}

// Multiple refs
function MultipleRefs() {
  const refs = {
    first: React.useRef<HTMLDivElement>(null),
    second: React.useRef<HTMLDivElement>(null),
    third: React.useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: keyof typeof refs) => {
    refs[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <button onClick={() => scrollToSection("first")}>Go to First</button>
      <div ref={refs.first}>First Section</div>
      <div ref={refs.second}>Second Section</div>
      <div ref={refs.third}>Third Section</div>
    </div>
  );
}

// Array of refs
function ListWithRefs({ items }: { items: string[] }) {
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    // Access array of refs
    itemRefs.current.forEach((element, index) => {
      if (element) {
        console.log(\`Item \${index}:\`, element.offsetHeight);
      }
    });
  }, [items]);

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

// Ref with measurements
function MeasuredComponent() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div>
      <div ref={ref}>Measured Content</div>
      <p>
        Width: {dimensions.width}px, Height: {dimensions.height}px
      </p>
    </div>
  );
}

// Ref with ResizeObserver
function ResizeObserverComponent() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <div ref={ref} style={{ resize: "both", overflow: "auto" }}>
        Resizable Content
      </div>
      <p>
        Size: {size.width}x{size.height}
      </p>
    </div>
  );
}

// Ref callback function
function CallbackRefExample() {
  const [height, setHeight] = React.useState(0);

  const measureRef = React.useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div>
      <div ref={measureRef}>Measured with callback</div>
      <p>Height: {height}px</p>
    </div>
  );
}

// Conditional refs
function ConditionalRef({ shouldAttach }: { shouldAttach: boolean }) {
  const ref = React.useRef<HTMLDivElement>(null);

  return <div ref={shouldAttach ? ref : null}>Content</div>;
}`}
        </CodeBlock>

        <InfoBox type="info">
          React.RefObject is the standard ref type for DOM elements. Use
          useRef&lt;HTMLElement&gt;(null) to create refs. The current property
          is readonly and may be null. Always use optional chaining
          (current?.method) to safely access methods.
        </InfoBox>
      </Section>

      <Section title="2. React.MutableRefObject">
        <p className="text-gray-700 dark:text-gray-300">
          MutableRefObject is returned when useRef is initialized with a
          non-null value. The current property is mutable and never null, making
          it useful for storing mutable values across renders.
        </p>

        <CodeBlock title="MutableRefObject examples">
          {`// Basic MutableRefObject
function Counter() {
  // MutableRefObject<number>
  const countRef = React.useRef<number>(0);

  const increment = () => {
    countRef.current += 1;  // current is mutable, not readonly
    console.log(countRef.current);
  };

  return <button onClick={increment}>Increment (no re-render)</button>;
}

// MutableRefObject type definition
interface MutableRefObject<T> {
  current: T;  // Not readonly, not nullable
}

// Difference between RefObject and MutableRefObject
function RefComparison() {
  // RefObject<HTMLDivElement>
  const elementRef = React.useRef<HTMLDivElement>(null);
  // elementRef.current = document.createElement("div");  // ✗ Error: readonly

  // MutableRefObject<number>
  const valueRef = React.useRef<number>(0);
  valueRef.current = 42;  // ✓ OK: mutable

  return <div ref={elementRef}>Content</div>;
}

// Storing previous values
function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage
function ComponentWithPrevious() {
  const [count, setCount] = React.useState(0);
  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Storing interval/timeout IDs
function TimerComponent() {
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      console.log("Tick");
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  React.useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}

// Caching expensive computations
function ExpensiveComponent({ data }: { data: number[] }) {
  const cacheRef = React.useRef<Map<string, number>>(new Map());

  const expensiveCalculation = (input: number[]): number => {
    const key = input.join(",");

    if (cacheRef.current.has(key)) {
      return cacheRef.current.get(key)!;
    }

    const result = input.reduce((sum, n) => sum + n * n, 0);
    cacheRef.current.set(key, result);
    return result;
  };

  return <div>{expensiveCalculation(data)}</div>;
}

// Tracking component lifecycle
function LifecycleTracker() {
  const mountTimeRef = React.useRef<number>(Date.now());
  const renderCountRef = React.useRef<number>(0);

  renderCountRef.current += 1;

  React.useEffect(() => {
    const mountTime = mountTimeRef.current;
    return () => {
      const lifetime = Date.now() - mountTime;
      console.log(\`Component lived for \${lifetime}ms\`);
    };
  }, []);

  return <div>Render count: {renderCountRef.current}</div>;
}

// Storing callbacks without causing re-renders
function CallbackRef() {
  const callbackRef = React.useRef<(() => void) | null>(null);

  const setCallback = (callback: () => void) => {
    callbackRef.current = callback;
  };

  const invokeCallback = () => {
    callbackRef.current?.();
  };

  return (
    <div>
      <button onClick={() => setCallback(() => console.log("Callback 1"))}>
        Set Callback 1
      </button>
      <button onClick={() => setCallback(() => console.log("Callback 2"))}>
        Set Callback 2
      </button>
      <button onClick={invokeCallback}>Invoke</button>
    </div>
  );
}

// Event listener management
function ScrollTracker() {
  const scrollHandlerRef = React.useRef<((e: Event) => void) | null>(null);

  scrollHandlerRef.current = (e: Event) => {
    console.log("Scroll position:", window.scrollY);
  };

  React.useEffect(() => {
    const handler = (e: Event) => {
      scrollHandlerRef.current?.(e);
    };

    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return <div>Scroll the page</div>;
}

// Generic ref value
function GenericRefComponent<T>(props: { initialValue: T }) {
  const valueRef = React.useRef<T>(props.initialValue);

  return <div>Ref value: {String(valueRef.current)}</div>;
}

// Ref with complex object
interface UserData {
  id: number;
  name: string;
  settings: {
    theme: string;
    notifications: boolean;
  };
}

function UserComponent() {
  const userDataRef = React.useRef<UserData>({
    id: 1,
    name: "John",
    settings: {
      theme: "dark",
      notifications: true,
    },
  });

  const updateSettings = (theme: string) => {
    userDataRef.current.settings.theme = theme;
  };

  return <div>User: {userDataRef.current.name}</div>;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          React.MutableRefObject is perfect for storing mutable values that
          don't trigger re-renders: timers, previous values, instance variables,
          and caches. Use useRef with an initial value (not null) to get
          MutableRefObject.
        </InfoBox>
      </Section>

      <Section title="3. React.ForwardedRef & forwardRef">
        <p className="text-gray-700 dark:text-gray-300">
          ForwardedRef is used with React.forwardRef to pass refs through
          components. It enables parent components to access child DOM elements
          or component instances.
        </p>

        <CodeBlock title="ForwardedRef examples">
          {`// Basic forwardRef
interface InputProps {
  placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);

// Usage
function Parent() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <Input ref={inputRef} placeholder="Enter text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// ForwardedRef type (internal React type)
type ForwardedRef<T> = 
  | ((instance: T | null) => void)
  | React.MutableRefObject<T | null>
  | null;

// Generic forwardRef component
interface BoxProps<T extends HTMLElement = HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

// forwardRef with TypeScript helper
function forwardRefWithAs<T, P = {}>(
  component: React.ForwardRefRenderFunction<T, P>
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
> {
  return React.forwardRef(component);
}

// Custom component with imperative handle
interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
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
    }));

    return <video ref={videoRef} src={src} />;
  }
);

// Usage of imperative handle
function VideoController() {
  const playerRef = React.useRef<VideoPlayerRef>(null);

  return (
    <div>
      <VideoPlayer ref={playerRef} src="video.mp4" />
      <button onClick={() => playerRef.current?.play()}>Play</button>
      <button onClick={() => playerRef.current?.pause()}>Pause</button>
      <button onClick={() => playerRef.current?.seek(10)}>Seek to 10s</button>
    </div>
  );
}

// forwardRef with additional props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, isLoading, children, ...rest }, ref) => {
    return (
      <button ref={ref} className={\`btn-\${variant}\`} disabled={isLoading} {...rest}>
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

// Generic forwardRef
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// Note: generics with forwardRef require casting
const List = React.forwardRef(
  <T,>(
    { items, renderItem }: ListProps<T>,
    ref: React.ForwardedRef<HTMLUListElement>
  ) => {
    return (
      <ul ref={ref}>
        {items.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
    );
  }
) as <T>(
  props: ListProps<T> & { ref?: React.ForwardedRef<HTMLUListElement> }
) => ReturnType<React.FC>;

// forwardRef with hooks
const FocusableInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <input
        ref={ref}
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          border: isFocused ? "2px solid blue" : "1px solid gray",
        }}
      />
    );
  }
);

// Combining refs
function useCombinedRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return React.useCallback(
    (element: T | null) => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === "function") {
          ref(element);
        } else {
          (ref as React.MutableRefObject<T | null>).current = element;
        }
      });
    },
    [refs]
  );
}

// Usage of combined refs
const InputWithCombinedRefs = React.forwardRef<HTMLInputElement, InputProps>(
  (props, forwardedRef) => {
    const localRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = useCombinedRefs(localRef, forwardedRef);

    React.useEffect(() => {
      // Can use localRef here
      console.log(localRef.current);
    }, []);

    return <input ref={combinedRef} {...props} />;
  }
);

// displayName for debugging
Input.displayName = "Input";
Button.displayName = "Button";

// forwardRef with memo
const MemoizedInput = React.memo(
  React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input ref={ref} {...props} />;
  })
);

// Polymorphic forwardRef
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<E>;

type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

const PolymorphicComponent = React.forwardRef(
  <E extends React.ElementType = "div">(
    { as, children, ...rest }: PolymorphicProps<E>,
    ref: PolymorphicRef<E>
  ) => {
    const Component = as || "div";
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  }
) as <E extends React.ElementType = "div">(
  props: PolymorphicProps<E> & { ref?: PolymorphicRef<E> }
) => React.ReactElement | null;

// Usage
<PolymorphicComponent>Default div</PolymorphicComponent>
<PolymorphicComponent as="button" onClick={() => {}}>
  Button
</PolymorphicComponent>
<PolymorphicComponent as="a" href="/link">
  Link
</PolymorphicComponent>`}
        </CodeBlock>

        <InfoBox type="important">
          Use React.forwardRef to pass refs through components. The second
          parameter (ref) has type ForwardedRef&lt;T&gt;. Combine with
          useImperativeHandle to expose custom methods. Always add displayName
          for better debugging.
        </InfoBox>
      </Section>

      <Section title="4. React.Ref & React.LegacyRef">
        <p className="text-gray-700 dark:text-gray-300">
          React.Ref is a union type accepting RefObject, callback refs, and
          null. LegacyRef includes string refs (deprecated). These types are
          used for ref props in components.
        </p>

        <CodeBlock title="Ref and LegacyRef examples">
          {`// React.Ref type definition
type Ref<T> =
  | RefCallback<T>
  | RefObject<T>
  | null;

type RefCallback<T> = (instance: T | null) => void;

// React.LegacyRef (includes string refs - deprecated)
type LegacyRef<T> = string | Ref<T>;

// Component accepting ref prop
interface ComponentWithRefProps {
  ref?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}

function ComponentWithRef({ ref, children }: ComponentWithRefProps) {
  return <div ref={ref}>{children}</div>;
}

// Callback ref
function CallbackRefExample() {
  const handleRef = (element: HTMLDivElement | null) => {
    if (element) {
      console.log("Element mounted:", element);
    } else {
      console.log("Element unmounted");
    }
  };

  return <div ref={handleRef}>Content</div>;
}

// RefObject vs callback ref
function BothRefTypes() {
  // RefObject
  const refObject = React.useRef<HTMLDivElement>(null);

  // Callback ref
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const callbackRef = React.useCallback((node: HTMLDivElement | null) => {
    setElement(node);
  }, []);

  return (
    <div>
      <div ref={refObject}>RefObject</div>
      <div ref={callbackRef}>Callback ref</div>
    </div>
  );
}

// Generic ref prop
interface GenericComponentProps<T extends HTMLElement> {
  ref?: React.Ref<T>;
  children: React.ReactNode;
}

function GenericComponent<T extends HTMLElement>({
  ref,
  children,
}: GenericComponentProps<T>) {
  return <div ref={ref as React.Ref<HTMLDivElement>}>{children}</div>;
}

// Ref type narrowing
function handleRefValue(ref: React.Ref<HTMLElement>) {
  if (typeof ref === "function") {
    // Callback ref
    ref(document.createElement("div"));
  } else if (ref && "current" in ref) {
    // RefObject
    console.log(ref.current);
  } else if (ref === null) {
    // Null ref
    console.log("No ref");
  }
}

// Setting refs dynamically
function DynamicRef() {
  const [refType, setRefType] = React.useState<"object" | "callback">("object");

  const refObject = React.useRef<HTMLDivElement>(null);
  const callbackRef = (node: HTMLDivElement | null) => {
    console.log("Callback ref:", node);
  };

  const ref: React.Ref<HTMLDivElement> =
    refType === "object" ? refObject : callbackRef;

  return (
    <div>
      <button onClick={() => setRefType("object")}>Use RefObject</button>
      <button onClick={() => setRefType("callback")}>Use Callback</button>
      <div ref={ref}>Content</div>
    </div>
  );
}

// Ref with conditional rendering
function ConditionalRefComponent() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    console.log("Ref current:", ref.current);  // null when not rendered
  }, [show]);

  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <div ref={ref}>Conditionally rendered</div>}
    </div>
  );
}

// String refs (deprecated - don't use)
class LegacyComponent extends React.Component {
  // @ts-ignore
  refs: {
    myInput: HTMLInputElement;
  };

  focusInput() {
    // String ref (deprecated)
    // this.refs.myInput.focus();
  }

  render() {
    return <input ref="myInput" />;
  }
}

// Modern alternative to string refs
class ModernComponent extends React.Component {
  private inputRef = React.createRef<HTMLInputElement>();

  focusInput() {
    this.inputRef.current?.focus();
  }

  render() {
    return <input ref={this.inputRef} />;
  }
}

// Ref forwarding with Ref type
interface ForwardedComponentProps {
  children: React.ReactNode;
}

const ForwardedComponent = React.forwardRef<
  HTMLDivElement,
  ForwardedComponentProps
>((props, ref) => {
  // ref has type ForwardedRef<HTMLDivElement>
  // ForwardedRef<T> = Ref<T>
  return <div ref={ref}>{props.children}</div>;
});

// Custom ref type
type CustomRef<T> = {
  readonly current: T | null;
  subscribe: (callback: (value: T | null) => void) => () => void;
};

function useCustomRef<T>(initialValue: T | null = null): CustomRef<T> {
  const ref = React.useRef<T | null>(initialValue);
  const listeners = React.useRef<Array<(value: T | null) => void>>([]);

  return React.useMemo(
    () => ({
      get current() {
        return ref.current;
      },
      set current(value: T | null) {
        ref.current = value;
        listeners.current.forEach((listener) => listener(value));
      },
      subscribe(callback: (value: T | null) => void) {
        listeners.current.push(callback);
        return () => {
          listeners.current = listeners.current.filter((l) => l !== callback);
        };
      },
    }),
    []
  );
}

// Ref assertion
function refAssertion() {
  const ref = React.useRef<HTMLDivElement>(null);

  const assertRef = (): HTMLDivElement => {
    if (!ref.current) {
      throw new Error("Ref not initialized");
    }
    return ref.current;
  };

  const useElement = () => {
    const element = assertRef();  // Guaranteed non-null
    element.focus();
  };

  return <div ref={ref}>Content</div>;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          React.Ref is a union of RefObject, callback ref, and null. Use
          callback refs for dynamic behavior or side effects on mount/unmount.
          Avoid string refs (LegacyRef) - they're deprecated. Prefer RefObject
          for simple cases.
        </InfoBox>
      </Section>

      <Section title="5. Advanced Ref Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns combining refs with hooks, context, and TypeScript
          for powerful imperative APIs, ref sharing, and complex component
          interactions.
        </p>

        <CodeBlock title="Advanced ref pattern examples">
          {`// useImperativeHandle with full typing
interface FormHandle {
  submit: () => void;
  reset: () => void;
  validate: () => boolean;
  getValues: () => Record<string, any>;
}

interface FormProps {
  onSubmit: (data: Record<string, any>) => void;
  children: React.ReactNode;
}

const Form = React.forwardRef<FormHandle, FormProps>(
  ({ onSubmit, children }, ref) => {
    const [values, setValues] = React.useState<Record<string, any>>({});

    React.useImperativeHandle(ref, () => ({
      submit() {
        onSubmit(values);
      },
      reset() {
        setValues({});
      },
      validate() {
        return Object.keys(values).length > 0;
      },
      getValues() {
        return values;
      },
    }));

    return <form>{children}</form>;
  }
);

// Usage
function FormExample() {
  const formRef = React.useRef<FormHandle>(null);

  const handleSubmit = () => {
    if (formRef.current?.validate()) {
      formRef.current.submit();
    }
  };

  return (
    <div>
      <Form ref={formRef} onSubmit={(data) => console.log(data)}>
        {/* Form fields */}
      </Form>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// Ref context for sharing refs
interface RefContextValue<T> {
  registerRef: (id: string, ref: T) => void;
  unregisterRef: (id: string) => void;
  getRef: (id: string) => T | undefined;
  getAllRefs: () => Map<string, T>;
}

function createRefContext<T>() {
  const RefContext = React.createContext<RefContextValue<T> | undefined>(
    undefined
  );

  function RefProvider({ children }: { children: React.ReactNode }) {
    const refs = React.useRef<Map<string, T>>(new Map());

    const contextValue: RefContextValue<T> = React.useMemo(
      () => ({
        registerRef(id: string, ref: T) {
          refs.current.set(id, ref);
        },
        unregisterRef(id: string) {
          refs.current.delete(id);
        },
        getRef(id: string) {
          return refs.current.get(id);
        },
        getAllRefs() {
          return refs.current;
        },
      }),
      []
    );

    return <RefContext.Provider value={contextValue}>{children}</RefContext.Provider>;
  }

  function useRefContext() {
    const context = React.useContext(RefContext);
    if (!context) {
      throw new Error("useRefContext must be used within RefProvider");
    }
    return context;
  }

  return { RefProvider, useRefContext };
}

// Usage
const { RefProvider, useRefContext } = createRefContext<HTMLDivElement>();

function ChildComponent({ id }: { id: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { registerRef, unregisterRef } = useRefContext();

  React.useEffect(() => {
    if (ref.current) {
      registerRef(id, ref.current);
    }
    return () => {
      unregisterRef(id);
    };
  }, [id, registerRef, unregisterRef]);

  return <div ref={ref}>Child {id}</div>;
}

// Ref composition hook
function useRefComposition<T>() {
  const refs = React.useRef<Array<React.RefObject<T>>>([]);

  const addRef = React.useCallback(() => {
    const ref = React.createRef<T>();
    refs.current.push(ref);
    return ref;
  }, []);

  const getAllRefs = React.useCallback(() => {
    return refs.current;
  }, []);

  const getElements = React.useCallback(() => {
    return refs.current
      .map((ref) => ref.current)
      .filter((el): el is T => el !== null);
  }, []);

  return { addRef, getAllRefs, getElements };
}

// Ref observer pattern
type RefObserver<T> = (element: T | null) => void | (() => void);

function useObservedRef<T>(observer: RefObserver<T>) {
  const ref = React.useRef<T>(null);
  const cleanupRef = React.useRef<(() => void) | void>();

  const observedRef = React.useCallback(
    (element: T | null) => {
      cleanupRef.current?.();
      ref.current = element;
      cleanupRef.current = observer(element);
    },
    [observer]
  );

  React.useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  return observedRef;
}

// Usage
function ObservedComponent() {
  const ref = useObservedRef<HTMLDivElement>((element) => {
    if (!element) return;

    console.log("Element mounted:", element);

    const observer = new IntersectionObserver((entries) => {
      console.log("Intersection:", entries[0].isIntersecting);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  });

  return <div ref={ref}>Observed content</div>;
}

// Ref synchronization between components
function useRefSync<T>(...refs: Array<React.Ref<T> | undefined>) {
  return React.useCallback(
    (value: T | null) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref && "current" in ref) {
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      });
    },
    [refs]
  );
}

// Ref with lazy initialization
function useLazyRef<T>(initializer: () => T): React.MutableRefObject<T> {
  const ref = React.useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = initializer();
  }

  return ref as React.MutableRefObject<T>;
}

// Usage
function LazyComponent() {
  const expensiveRef = useLazyRef(() => {
    console.log("Expensive initialization");
    return { data: new Array(1000).fill(0) };
  });

  return <div>Data length: {expensiveRef.current.data.length}</div>;
}

// Ref with state synchronization
function useRefWithState<T>(
  initialValue: T
): [React.RefObject<T>, T, (value: T) => void] {
  const ref = React.useRef<T>(initialValue);
  const [state, setState] = React.useState<T>(initialValue);

  const setValue = React.useCallback((value: T) => {
    ref.current = value;
    setState(value);
  }, []);

  return [ref, state, setValue];
}

// Ref map for dynamic lists
function useRefMap<T>() {
  const map = React.useRef<Map<string | number, T>>(new Map());

  const setRef = React.useCallback((key: string | number) => {
    return (element: T | null) => {
      if (element) {
        map.current.set(key, element);
      } else {
        map.current.delete(key);
      }
    };
  }, []);

  const getRef = React.useCallback((key: string | number) => {
    return map.current.get(key);
  }, []);

  return { setRef, getRef, map: map.current };
}

// Usage
function ListWithRefMap({ items }: { items: Array<{ id: number; name: string }> }) {
  const { setRef, getRef } = useRefMap<HTMLDivElement>();

  const scrollToItem = (id: number) => {
    const element = getRef(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} ref={setRef(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

// Type-safe ref assertion
function assertRef<T>(
  ref: React.RefObject<T>,
  message?: string
): asserts ref is React.RefObject<T> & { current: T } {
  if (!ref.current) {
    throw new Error(message || "Ref is null");
  }
}

// Usage
function AssertedRefComponent() {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    assertRef(ref, "Div element not found");
    // TypeScript now knows ref.current is not null
    ref.current.scrollIntoView();
  };

  return (
    <div>
      <div ref={ref}>Content</div>
      <button onClick={handleClick}>Scroll</button>
    </div>
  );
}`}
        </CodeBlock>

        <InfoBox type="important">
          Advanced ref patterns enable imperative APIs (useImperativeHandle),
          ref sharing (context), dynamic refs (maps), and ref synchronization.
          Combine refs with hooks for powerful, type-safe component interactions
          beyond declarative patterns.
        </InfoBox>
      </Section>
    </div>
  );
}
