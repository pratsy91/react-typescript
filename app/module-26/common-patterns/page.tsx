import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function CommonPatternsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Common Debugging Patterns - Interview Questions
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Frequently encountered debugging patterns in interviews.
      </p>

      <Section title="1. Event Handler Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging event handler type issues.
        </p>

        <CodeBlock title="Problem 1: Event Handler Return Type">
          {`// ❌ WHAT'S WRONG
const handleClick = (): undefined => {
  console.log("clicked");
  return undefined;  // Error: Event handler should return void
};

// WHY IT HAPPENS
// React event handlers must return void, not undefined
// TypeScript enforces this for type safety

// ✅ EXACT FIX
const handleClick = (): void => {
  console.log("clicked");
  // No return needed
};

// OR implicit void (preferred)
const handleClick = () => {
  console.log("clicked");
};

// OR for async handlers
const handleSubmit = async (e: React.FormEvent): Promise<void> => {
  e.preventDefault();
  await submitForm();
};`}
        </CodeBlock>

        <CodeBlock title="Problem 2: Event Target Type">
          {`// ❌ WHAT'S WRONG
function Input() {
  const handleChange = (e: React.ChangeEvent) => {
    console.log(e.target.value);  // Error: Property 'value' doesn't exist
  };
  return <input onChange={handleChange} />;
}

// WHY IT HAPPENS
// React.ChangeEvent is generic
// Need to specify the element type for proper typing

// ✅ EXACT FIX
function Input() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);  // Type: string
  };
  return <input onChange={handleChange} />;
}

// OR use currentTarget (recommended)
function Input() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);  // Always typed correctly
  };
  return <input onChange={handleChange} />;
}`}
        </CodeBlock>

        <CodeBlock title="Problem 3: Generic Event Handler">
          {`// ❌ WHAT'S WRONG
function useEventHandler(handler: (e: Event) => void) {
  return handler;
}
const clickHandler = useEventHandler((e) => {
  console.log(e.clientX);  // Error: Event doesn't have clientX
});

// WHY IT HAPPENS
// Generic Event type doesn't have MouseEvent properties
// Need to use React's event types

// ✅ EXACT FIX
function useEventHandler<T extends HTMLElement, E extends React.SyntheticEvent<T>>(
  handler: (e: E) => void
) {
  return handler;
}

const clickHandler = useEventHandler<HTMLButtonElement, React.MouseEvent<HTMLButtonElement>>(
  (e) => {
    console.log(e.clientX);  // Type: number
  }
);

// OR simpler with React types
function useClickHandler(
  handler: (e: React.MouseEvent<HTMLElement>) => void
) {
  return handler;
}`}
        </CodeBlock>
      </Section>

      <Section title="2. State Management Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging state management type issues.
        </p>

        <CodeBlock title="Problem 4: Reducer Action Type">
          {`// ❌ WHAT'S WRONG
type State = { count: number };
type Action = { type: "increment" } | { type: "decrement"; amount: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - action.amount };  // Error: amount might not exist
  }
}

// WHY IT HAPPENS
// TypeScript doesn't narrow discriminated union in switch
// Need exhaustive checking

// ✅ EXACT FIX
type State = { count: number };
type Action =
  | { type: "increment" }
  | { type: "decrement"; amount: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - action.amount };  // TypeScript knows amount exists
    default:
      const exhaustiveCheck: never = action;
      throw new Error(\`Unhandled action: \${exhaustiveCheck}\`);
  }
}

// OR use type guard
function isDecrementAction(action: Action): action is { type: "decrement"; amount: number } {
  return action.type === "decrement";
}`}
        </CodeBlock>

        <CodeBlock title="Problem 5: Context Default Value">
          {`// ❌ WHAT'S WRONG
const ThemeContext = createContext<{ theme: "light" | "dark" }>(undefined);
// Error: Type 'undefined' is not assignable

// WHY IT HAPPENS
// createContext requires a default value matching the type
// Can't use undefined directly

// ✅ EXACT FIX
// Option 1: Provide default value
const ThemeContext = createContext<{ theme: "light" | "dark" }>({
  theme: "light",
});

// Option 2: Allow undefined in type
const ThemeContext = createContext<{ theme: "light" | "dark" } | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;  // Type narrowed
}

// Option 3: Use null
const ThemeContext = createContext<{ theme: "light" | "dark" } | null>(null);`}
        </CodeBlock>
      </Section>

      <Section title="3. Form Handling Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging form-related type issues.
        </p>

        <CodeBlock title="Problem 6: FormData Type Extraction">
          {`// ❌ WHAT'S WRONG
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  const formData = new FormData(e.target);  // Error: target might not be form
  const name = formData.get("name");
  console.log(name.toUpperCase());  // Error: name might be null or File
}

// WHY IT HAPPENS
// e.target is EventTarget, not HTMLFormElement
// FormData.get() returns FormDataEntryValue | null
// FormDataEntryValue is string | File

// ✅ EXACT FIX
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);  // currentTarget is typed
  const name = formData.get("name");
  
  if (!name || typeof name !== "string") {
    throw new Error("Name is required and must be a string");
  }
  
  console.log(name.toUpperCase());  // Type: string
}

// OR use type guard
function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === "string";
}

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const name = formData.get("name");
  
  if (isString(name)) {
    console.log(name.toUpperCase());  // Type: string
  }
}`}
        </CodeBlock>

        <CodeBlock title="Problem 7: Controlled Input Type">
          {`// ❌ WHAT'S WRONG
function Input() {
  const [value, setValue] = useState();
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );  // Error: value type is undefined
}

// WHY IT HAPPENS
// useState() without initial value infers undefined
// Input value prop needs string

// ✅ EXACT FIX
function Input() {
  const [value, setValue] = useState<string>("");
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// OR for number input
function NumberInput() {
  const [value, setValue] = useState<number>(0);
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  );
}

// OR for optional value
function OptionalInput() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <input
      value={value ?? ""}
      onChange={(e) => setValue(e.target.value || null)}
    />
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="4. API & Data Fetching Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging API and data fetching type issues.
        </p>

        <CodeBlock title="Problem 8: Fetch Response Type">
          {`// ❌ WHAT'S WRONG
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();  // Type: any
}

// WHY IT HAPPENS
// response.json() returns Promise<any>
// No type information

// ✅ EXACT FIX
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  
  if (!response.ok) {
    throw new Error(\`Failed to fetch user: \${response.statusText}\`);
  }
  
  const data: User = await response.json();
  return data;
}

// OR use type assertion with validation
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();
  
  // Validate data
  if (!isUser(data)) {
    throw new Error("Invalid user data");
  }
  
  return data;
}

// OR use validation library
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
});

async function fetchUser(id: string): Promise<z.infer<typeof UserSchema>> {
  const response = await fetch(\`/api/users/\${id}\`);
  const data = await response.json();
  return UserSchema.parse(data);  // Typed and validated
}`}
        </CodeBlock>

        <CodeBlock title="Problem 9: Async Function in useEffect">
          {`// ❌ WHAT'S WRONG
useEffect(() => {
  const data = fetchData();  // Returns Promise
  setData(data);  // Error: Setting Promise instead of data
}, []);

// WHY IT HAPPENS
// fetchData() returns Promise, not the data
// Need to await or use .then()

// ✅ EXACT FIX
useEffect(() => {
  fetchData().then(setData);
}, []);

// OR with async/await
useEffect(() => {
  async function loadData() {
    const data = await fetchData();
    setData(data);
  }
  loadData();
}, []);

// OR with error handling
useEffect(() => {
  let cancelled = false;
  
  async function loadData() {
    try {
      const data = await fetchData();
      if (!cancelled) {
        setData(data);
      }
    } catch (error) {
      if (!cancelled) {
        setError(error);
      }
    }
  }
  
  loadData();
  
  return () => {
    cancelled = true;
  };
}, []);`}
        </CodeBlock>
      </Section>

      <Section title="5. Custom Hooks & Advanced Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging custom hooks and advanced React patterns.
        </p>

        <CodeBlock title="Problem 10: Custom Hook Return Type">
          {`// ❌ WHAT'S WRONG
function useCounter(initial: number) {
  const [count, setCount] = useState(initial);
  return { count, setCount };  // Type not explicit
}

const { count, increment } = useCounter(0);  // Error: increment doesn't exist

// WHY IT HAPPENS
// Custom hook return type not explicitly defined
// TypeScript infers return type, might miss properties

// ✅ EXACT FIX
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter(initial: number = 0): UseCounterReturn {
  const [count, setCount] = useState(initial);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  const reset = useCallback(() => {
    setCount(initial);
  }, [initial]);
  
  return { count, increment, decrement, reset };
}

// Usage
const { count, increment, decrement } = useCounter(0);  // Fully typed!`}
        </CodeBlock>

        <CodeBlock title="Problem 11: useEffect Cleanup Type Error">
          {`// ❌ WHAT'S WRONG
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("Timer");
  }, 1000);
  
  return () => {
    clearTimeout(timer);
  };  // Error: Cleanup function type mismatch
}, []);

// WHY IT HAPPENS
// useEffect cleanup must return void or undefined
// TypeScript enforces cleanup return type

// ✅ EXACT FIX
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("Timer");
  }, 1000);
  
  return (): void => {
    clearTimeout(timer);
  };
}, []);

// OR implicit void (preferred)
useEffect(() => {
  const timer = setTimeout(() => {
    console.log("Timer");
  }, 1000);
  
  return () => {
    clearTimeout(timer);
  };
}, []);

// OR with async cleanup (not recommended, but if needed)
useEffect(() => {
  let cancelled = false;
  
  async function fetchData() {
    const data = await api.getData();
    if (!cancelled) {
      setData(data);
    }
  }
  
  fetchData();
  
  return () => {
    cancelled = true;
  };
}, []);`}
        </CodeBlock>

        <CodeBlock title="Problem 12: Higher-Order Component Type">
          {`// ❌ WHAT'S WRONG
function withAuth(Component: React.ComponentType) {
  return (props: any) => {
    if (!isAuthenticated()) {
      return <Login />;
    }
    return <Component {...props} />;  // Error: Props type lost
  };
}

// WHY IT HAPPENS
// HOC doesn't preserve component prop types
// Type information is lost

// ✅ EXACT FIX
function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return (props: P) => {
    if (!isAuthenticated()) {
      return <Login />;
    }
    return <Component {...props} />;
  };
}

// OR with injected props
interface WithAuthProps {
  isAuthenticated: boolean;
}

function withAuth<P extends object>(
  Component: React.ComponentType<P & WithAuthProps>
): React.ComponentType<P> {
  return (props: P) => {
    if (!isAuthenticated()) {
      return <Login />;
    }
    return <Component {...props} isAuthenticated={true} />;
  };
}

// Usage
const ProtectedPage = withAuth(Page);
<ProtectedPage userId="123" />  // Props preserved!`}
        </CodeBlock>

        <CodeBlock title="Problem 13: Dynamic Import Type Error">
          {`// ❌ WHAT'S WRONG
const LazyComponent = React.lazy(() => import("./Component"));
// Error: Component type not preserved

// WHY IT HAPPENS
// React.lazy doesn't preserve component types automatically
// Need explicit typing

// ✅ EXACT FIX
// Option 1: Type the lazy component
const LazyComponent = React.lazy(
  () => import("./Component")
) as React.LazyExoticComponent<React.ComponentType<ComponentProps>>;

// Option 2: Type the import function
const LazyComponent = React.lazy<React.ComponentType<ComponentProps>>(
  () => import("./Component")
);

// Option 3: Use typed helper
function typedLazy<P>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>
): React.LazyExoticComponent<React.ComponentType<P>> {
  return React.lazy(importFn);
}

const LazyComponent = typedLazy<ComponentProps>(() => import("./Component"));

// Usage with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent prop1="value" />
</Suspense>`}
        </CodeBlock>

        <CodeBlock title="Problem 14: Environment Variables Type Error">
          {`// ❌ WHAT'S WRONG
const apiUrl = process.env.API_URL;  // Type: string | undefined
fetch(apiUrl);  // Error: apiUrl might be undefined

// WHY IT HAPPENS
// Environment variables are always string | undefined
// Need to handle undefined case

// ✅ EXACT FIX
// Option 1: Type assertion with validation
const apiUrl = process.env.API_URL;
if (!apiUrl) {
  throw new Error("API_URL is not set");
}
fetch(apiUrl);  // Type: string

// Option 2: Type guard function
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(\`Environment variable \${key} is not set\`);
  }
  return value;
}

const apiUrl = getEnvVar("API_URL");  // Type: string

// Option 3: Type declaration
declare namespace NodeJS {
  interface ProcessEnv {
    API_URL: string;
    DATABASE_URL: string;
  }
}

const apiUrl = process.env.API_URL;  // Type: string (if set in env)

// Option 4: Default value
const apiUrl = process.env.API_URL || "https://api.example.com";`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Common Pattern Debugging Tips:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Event handlers must return void, not undefined</li>
          <li>Use generic event types (React.ChangeEvent&lt;HTMLInputElement&gt;)</li>
          <li>Type reducer actions with discriminated unions</li>
          <li>Handle FormData values as string | File | null</li>
          <li>Type useState with explicit generic when initial value is null</li>
          <li>Always type fetch responses and validate data</li>
          <li>Explicitly type custom hook return values</li>
          <li>useEffect cleanup must return void</li>
          <li>Preserve prop types in Higher-Order Components</li>
          <li>Type React.lazy components explicitly</li>
          <li>Handle undefined environment variables</li>
        </ul>
      </InfoBox>
    </div>
  );
}

