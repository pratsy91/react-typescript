import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ReactTypeScriptPatternsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        React + TypeScript Patterns - Interview Cheatsheet
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Essential React + TypeScript patterns commonly tested in interviews.
      </p>

      <Section title="1. Component Typing Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Common component typing patterns asked in interviews.
        </p>

        <CodeBlock title="Function Components - Interview Patterns">
          {`// ✅ Preferred: Explicit function with typed props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// ✅ Generic Component (Common Interview Question)
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// ✅ Polymorphic Component (Advanced Interview Question)
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<E>;

function Polymorphic<E extends React.ElementType = "div">({
  as,
  children,
  ...props
}: PolymorphicProps<E>) {
  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
}

// Usage
<Polymorphic as="button" onClick={() => {}}>Click</Polymorphic>
<Polymorphic as="a" href="/link">Link</Polymorphic>`}
        </CodeBlock>

        <CodeBlock title="Hooks Typing - Interview Essentials">
          {`// useState - Type Inference
const [count, setCount] = useState(0);  // number
const [name, setName] = useState<string | null>(null);  // Explicit

// useState with Function Initializer
const [data, setData] = useState<User | null>(() => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
});

// useReducer - Typed (Common Interview Question)
type State = { count: number };
type Action = { type: "increment" } | { type: "decrement"; payload: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0 });

// useRef - Typed
const inputRef = useRef<HTMLInputElement>(null);
const timerRef = useRef<number | null>(null);

// useCallback - Typed
const handleClick = useCallback<(id: string) => void>(
  (id) => {
    console.log(id);
  },
  []
);

// useMemo - Typed
const expensiveValue = useMemo<number>(() => {
  return computeExpensiveValue(data);
}, [data]);`}
        </CodeBlock>

        <CodeBlock title="Event Handlers - Common Interview Topic">
          {`// ✅ Typed Event Handlers
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log("clicked");
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  console.log(formData);
};

// ✅ Generic Event Handler
function useEventHandler<T extends HTMLElement, E extends React.SyntheticEvent<T>>(
  handler: (e: E) => void
) {
  return useCallback(handler, [handler]);
}

// ✅ Typed Event Handler Factory
function createEventHandler<T>(
  handler: (value: T) => void
): (e: React.ChangeEvent<HTMLInputElement>) => void {
  return (e) => handler(e.target.value as T);
}

// Usage
const handleNumberChange = createEventHandler<number>((value) => {
  console.log(value);  // Typed as number
});`}
        </CodeBlock>
      </Section>

      <Section title="2. Advanced React Patterns - Interview Favorites">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns frequently asked in senior interviews.
        </p>

        <CodeBlock title="Higher-Order Components & Render Props">
          {`// ✅ Typed HOC (Common Interview Question)
function withLoading<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithLoadingComponent(
    props: P & { loading?: boolean }
  ) {
    if (props.loading) {
      return <div>Loading...</div>;
    }
    return <Component {...(props as P)} />;
  };
}

// Usage
const ButtonWithLoading = withLoading(Button);

// ✅ Typed Render Props
interface RenderProps<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface DataFetcherProps<T> {
  url: string;
  children: (props: RenderProps<T>) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);
  
  return <>{children({ data, loading, error })}</>;
}

// Usage
<DataFetcher<User> url="/api/user">
  {({ data, loading, error }) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>{data?.name}</div>;
  }}
</DataFetcher>`}
        </CodeBlock>

        <CodeBlock title="Context & Custom Hooks">
          {`// ✅ Typed Context (Interview Favorite)
interface ThemeContextValue {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// ✅ Typed Custom Hook (Common Interview Question)
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  
  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );
  
  return [storedValue, setValue];
}

// ✅ Typed Async Hook
function useAsync<T>(
  asyncFunction: () => Promise<T>
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const execute = useCallback(() => {
    setLoading(true);
    setError(null);
    asyncFunction()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [asyncFunction]);
  
  return { data, loading, error, execute };
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Interview Tips:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Always type component props explicitly</li>
          <li>Use generics for reusable components</li>
          <li>Understand the difference between React.FC and plain functions</li>
          <li>Know how to type event handlers correctly</li>
          <li>Be able to create typed custom hooks</li>
          <li>Understand HOC and render props typing patterns</li>
        </ul>
      </InfoBox>
    </div>
  );
}

