import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ReactDebuggingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        React + TypeScript Debugging - Interview Questions
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Common React + TypeScript debugging scenarios with solutions.
      </p>

      <Section title="1. Component Props Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging component prop type errors.
        </p>

        <CodeBlock title="Problem 1: Missing Required Props">
          {`// ❌ WHAT'S WRONG
interface ButtonProps {
  label: string;
  onClick: () => void;
}
function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
<Button />  // Error: Property 'label' is missing

// WHY IT HAPPENS
// All props in interface are required by default
// TypeScript enforces required props

// ✅ EXACT FIX
// Make props optional if needed
interface ButtonProps {
  label?: string;
  onClick?: () => void;
}
// OR provide defaults
function Button({ label = "Click", onClick = () => {} }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
// OR keep required and always pass them
<Button label="Click me" onClick={() => {}} />`}
        </CodeBlock>

        <CodeBlock title="Problem 2: Event Handler Type Mismatch">
          {`// ❌ WHAT'S WRONG
interface InputProps {
  onChange: (value: string) => void;
}
function Input({ onChange }: InputProps) {
  return (
    <input
      onChange={(e) => onChange(e.target.value)}  // Error!
      // Type 'string' is not assignable to parameter of type '(value: string) => void'
    />
  );
}

// WHY IT HAPPENS
// onChange expects a function that takes string
// But we're calling it with string directly
// Also, e.target.value might be string | undefined

// ✅ EXACT FIX
interface InputProps {
  onChange: (value: string) => void;
}
function Input({ onChange }: InputProps) {
  return (
    <input
      onChange={(e) => {
        const value = e.target.value;  // string
        onChange(value);
      }}
    />
  );
}

// OR better: use React.ChangeEvent
interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ onChange }: InputProps) {
  return <input onChange={onChange} />;
}`}
        </CodeBlock>

        <CodeBlock title="Problem 3: Children Prop Type Error">
          {`// ❌ WHAT'S WRONG
interface CardProps {
  children: string;  // Too restrictive!
}
function Card({ children }: CardProps) {
  return <div>{children}</div>;
}
<Card>
  <h1>Title</h1>  // Error: Type 'Element' is not assignable to type 'string'
</Card>

// WHY IT HAPPENS
// children is typed as string, but JSX elements are ReactNode
// ReactNode is the correct type for children

// ✅ EXACT FIX
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;  // Accepts string, number, JSX, arrays, etc.
}
function Card({ children }: CardProps) {
  return <div>{children}</div>;
}

// OR if you only want elements
interface CardProps {
  children: React.ReactElement;
}

// OR if you want function children
interface CardProps {
  children: (data: { count: number }) => ReactNode;
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Hooks Type Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging React hooks type errors.
        </p>

        <CodeBlock title="Problem 4: useState Type Inference Failure">
          {`// ❌ WHAT'S WRONG
const [user, setUser] = useState(null);  // Type: null
setUser({ id: "1", name: "John" });  // Error: Type is not assignable

// WHY IT HAPPENS
// TypeScript infers useState(null) as useState<null>
// Can't assign object to null type

// ✅ EXACT FIX
// Explicitly type useState
const [user, setUser] = useState<User | null>(null);
// OR
const [user, setUser] = useState<User | null>(() => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
});

// OR use type assertion (if you're certain)
const [user, setUser] = useState<User | null>(null as User | null);`}
        </CodeBlock>

        <CodeBlock title="Problem 5: useRef Type Error">
          {`// ❌ WHAT'S WRONG
const inputRef = useRef(null);
inputRef.current.value;  // Error: Object is possibly 'null'
inputRef.current.focus();  // Error: Object is possibly 'null'

// WHY IT HAPPENS
// useRef(null) infers type as MutableRefObject<null>
// current is always null in type system

// ✅ EXACT FIX
// Type the ref explicitly
const inputRef = useRef<HTMLInputElement>(null);

// Then check before use
if (inputRef.current) {
  inputRef.current.focus();
}

// OR use non-null assertion (only if you're certain it exists)
inputRef.current!.focus();

// OR use callback ref
const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
<input ref={setInputRef} />
{inputRef?.focus()}`}
        </CodeBlock>

        <CodeBlock title="Problem 6: useCallback/useMemo Type Inference">
          {`// ❌ WHAT'S WRONG
const handleClick = useCallback((id: string) => {
  console.log(id);
}, []);  // Type: (id: string) => void
<button onClick={handleClick} />  // Error: Expected 0 arguments

// WHY IT HAPPENS
// React's onClick expects (e: MouseEvent) => void
// But handleClick expects (id: string) => void
// Type mismatch

// ✅ EXACT FIX
// Fix the event handler
const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
  const id = e.currentTarget.id;
  console.log(id);
}, []);

// OR if you need the id parameter
const handleClick = useCallback((id: string) => {
  console.log(id);
}, []);

<button onClick={() => handleClick("button-id")} />

// OR typed wrapper
const createClickHandler = (id: string) => (e: React.MouseEvent) => {
  console.log(id);
};
<button onClick={createClickHandler("button-id")} />`}
        </CodeBlock>
      </Section>

      <Section title="3. Ref Forwarding Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging forwardRef problems.
        </p>

        <CodeBlock title="Problem 7: Wrong Ref Type">
          {`// ❌ WHAT'S WRONG
const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
  // Error: Type 'Ref<HTMLDivElement>' is not assignable to type 'Ref<HTMLInputElement>'
});

// WHY IT HAPPENS
// Ref type (HTMLDivElement) doesn't match element type (HTMLInputElement)
// TypeScript enforces type safety for refs

// ✅ EXACT FIX
// Use correct ref type
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// OR if it's a custom component
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div className="input-wrapper">
      <input ref={ref} {...props} />
    </div>
  );
});`}
        </CodeBlock>

        <CodeBlock title="Problem 8: Ref Not Forwarded">
          {`// ❌ WHAT'S WRONG
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props) => {
  return <button {...props} />;  // Ref not forwarded!
});

// WHY IT HAPPENS
// forwardRef provides ref parameter, but it's not used
// Ref must be explicitly passed to the element

// ✅ EXACT FIX
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button ref={ref} {...props} />;
});

// OR with useImperativeHandle
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  useImperativeHandle(ref, () => ({
    focus: () => {
      // Custom focus logic
    },
  }));
  return <button {...props} />;
});`}
        </CodeBlock>
      </Section>

      <Section title="4. Generic Component Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging generic component problems.
        </p>

        <CodeBlock title="Problem 9: Generic Component Type Error">
          {`// ❌ WHAT'S WRONG
function List<T>({ items }: { items: T[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>  // Error: Property 'id' doesn't exist
      ))}
    </ul>
  );
}

// WHY IT HAPPENS
// Type T has no constraints, so TypeScript doesn't know it has id/name
// Need to constrain T to have required properties

// ✅ EXACT FIX
// Add constraint
interface ListItem {
  id: string;
  name: string;
}

function List<T extends ListItem>({ items }: { items: T[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>  // Now type-safe!
      ))}
    </ul>
  );
}

// OR use keyExtractor pattern
function List<T>({
  items,
  keyExtractor,
  renderItem,
}: {
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Problem 10: Generic Props Not Preserved">
          {`// ❌ WHAT'S WRONG
function Wrapper<T>({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
<Wrapper<string>><span>Hello</span></Wrapper>  // Generic lost!

// WHY IT HAPPENS
// Generic type parameter T is not used in props
// TypeScript can't preserve the generic type

// ✅ EXACT FIX
// Use generic in props
function Wrapper<T>({
  children,
  data,
}: {
  children: (data: T) => React.ReactNode;
  data: T;
}) {
  return <div>{children(data)}</div>;
}

// OR use generic component pattern
function Wrapper<T extends Record<string, unknown>>({
  children,
  value,
}: {
  children: React.ReactNode;
  value: T;
}) {
  return <div>{children}</div>;
}

// Usage preserves type
<Wrapper value={{ name: "John" }}>
  <span>Hello</span>
</Wrapper>`}
        </CodeBlock>
      </Section>

      <Section title="5. React 19 Hooks Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging React 19 hooks type errors.
        </p>

        <CodeBlock title="Problem 11: useActionState Type Error">
          {`// ❌ WHAT'S WRONG
"use client";
import { useActionState } from "react";

async function submitForm(prevState: any, formData: FormData) {
  return { success: true };
}

function Form() {
  const [state, formAction, isPending] = useActionState(submitForm, null);
  // Error: submitForm signature doesn't match
}

// WHY IT HAPPENS
// useActionState expects (prevState, formData) => Promise<newState>
// Action function signature must match exactly

// ✅ EXACT FIX
"use client";
import { useActionState } from "react";

interface FormState {
  success?: boolean;
  error?: string;
}

async function submitForm(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email");
  
  if (!email || typeof email !== "string") {
    return { error: "Email is required" };
  }
  
  await saveEmail(email);
  return { success: true };
}

function Form() {
  const [state, formAction, isPending] = useActionState(submitForm, null);
  
  return (
    <form action={formAction}>
      {state?.error && <p>{state.error}</p>}
      <input name="email" />
      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Problem 12: useOptimistic Type Error">
          {`// ❌ WHAT'S WRONG
"use client";
import { useOptimistic } from "react";

function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(todos, (state, newTodo) => {
    return [...state, newTodo];  // Error: newTodo type not defined
  });
}

// WHY IT HAPPENS
// useOptimistic reducer needs proper typing
// TypeScript can't infer the action type

// ✅ EXACT FIX
"use client";
import { useOptimistic } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type OptimisticAction = 
  | { type: "add"; text: string }
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number };

function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, updateOptimistic] = useOptimistic(
    todos,
    (state: Todo[], action: OptimisticAction): Todo[] => {
      switch (action.type) {
        case "add":
          return [...state, { id: Date.now(), text: action.text, completed: false }];
        case "toggle":
          return state.map(todo =>
            todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
          );
        case "delete":
          return state.filter(todo => todo.id !== action.id);
        default:
          return state;
      }
    }
  );
  
  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Problem 13: useFormStatus Outside Form">
          {`// ❌ WHAT'S WRONG
"use client";
import { useFormStatus } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();  // Error: Must be used within form
  return <button disabled={pending}>Submit</button>;
}

function Page() {
  return <SubmitButton />;  // Not inside form!
}

// WHY IT HAPPENS
// useFormStatus must be used within a form action context
// Component using it must be a child of a form

// ✅ EXACT FIX
"use client";
import { useFormStatus } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

function Form() {
  async function handleSubmit(formData: FormData) {
    "use server";
    // Form action
  }
  
  return (
    <form action={handleSubmit}>
      <input name="email" />
      <SubmitButton />  {/* Now inside form context */}
    </form>
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="6. Context & State Management Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging context and state management type errors.
        </p>

        <CodeBlock title="Problem 14: Context Provider Type Error">
          {`// ❌ WHAT'S WRONG
const ThemeContext = createContext<{ theme: string }>({ theme: "light" });

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme }}>  // Error: Missing setTheme
      {children}
    </ThemeContext.Provider>
  );
}

// WHY IT HAPPENS
// Context value type doesn't match what provider gives
// Type mismatch between context definition and usage

// ✅ EXACT FIX
interface ThemeContextValue {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  const value: ThemeContextValue = useMemo(
    () => ({ theme, setTheme }),
    [theme]
  );
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}`}
        </CodeBlock>

        <CodeBlock title="Problem 15: useReducer Action Type Error">
          {`// ❌ WHAT'S WRONG
type State = { count: number };
type Action = { type: "increment" } | { type: "decrement"; amount: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - action.amount };  // Error: amount might not exist
    default:
      return state;
  }
}

// WHY IT HAPPENS
// TypeScript doesn't narrow discriminated union in switch
// Need explicit type narrowing

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
      // TypeScript knows action has amount here
      return { count: state.count - action.amount };
    default:
      // Exhaustive check
      const _exhaustive: never = action;
      return state;
  }
}

// OR with type guard
function isDecrementAction(action: Action): action is { type: "decrement"; amount: number } {
  return action.type === "decrement";
}

function reducer(state: State, action: Action): State {
  if (action.type === "increment") {
    return { count: state.count + 1 };
  }
  if (isDecrementAction(action)) {
    return { count: state.count - action.amount };
  }
  return state;
}`}
        </CodeBlock>
      </Section>

      <Section title="7. Advanced React Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging advanced React pattern type errors.
        </p>

        <CodeBlock title="Problem 16: Render Props Type Error">
          {`// ❌ WHAT'S WRONG
interface DataRendererProps {
  render: (data: any) => React.ReactNode;  // Too loose!
}

function DataRenderer({ render }: DataRendererProps) {
  const data = fetchData();
  return render(data);  // Error: data type not preserved
}

// WHY IT HAPPENS
// Render prop function loses type information
// Generic type not used properly

// ✅ EXACT FIX
interface DataRendererProps<T> {
  render: (data: T) => React.ReactNode;
  data: T;
}

function DataRenderer<T>({ render, data }: DataRendererProps<T>) {
  return <>{render(data)}</>;
}

// Usage
<DataRenderer
  data={{ id: "1", name: "John" }}
  render={(user) => <div>{user.name}</div>}  // user is typed!
/>

// OR with children as function
interface DataRendererProps<T> {
  children: (data: T) => React.ReactNode;
  data: T;
}

function DataRenderer<T>({ children, data }: DataRendererProps<T>) {
  return <>{children(data)}</>;
}

<DataRenderer data={user}>
  {(user) => <div>{user.name}</div>}  {/* Typed! */}
</DataRenderer>`}
        </CodeBlock>

        <CodeBlock title="Problem 17: Polymorphic Component Type Error">
          {`// ❌ WHAT'S WRONG
interface ButtonProps {
  as?: string;
  children: React.ReactNode;
}

function Button({ as = "button", children, ...props }: ButtonProps) {
  const Component = as;
  return <Component {...props}>{children}</Component>;  // Error: Component type unknown
}

// WHY IT HAPPENS
// Polymorphic component needs proper generic typing
// Component type must be preserved

// ✅ EXACT FIX
type PolymorphicProps<E extends React.ElementType = "button"> = {
  as?: E;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<E>;

function Button<E extends React.ElementType = "button">({
  as,
  children,
  ...props
}: PolymorphicProps<E>) {
  const Component = as || ("button" as React.ElementType);
  return <Component {...props}>{children}</Component>;
}

// Usage
<Button>Click</Button>  {/* Default: button */}
<Button as="a" href="/link">Link</Button>  {/* Typed as anchor! */}
<Button as="div" onClick={() => {}}>Div</Button>  {/* Typed as div! */}

// OR simpler version
interface ButtonProps<T extends React.ElementType = "button"> {
  as?: T;
  children: React.ReactNode;
}

function Button<T extends React.ElementType = "button">({
  as,
  children,
  ...props
}: ButtonProps<T> & Omit<React.ComponentProps<T>, keyof ButtonProps<T>>) {
  const Component = (as || "button") as React.ElementType;
  return <Component {...props}>{children}</Component>;
}`}
        </CodeBlock>

        <CodeBlock title="Problem 18: Portal Type Error">
          {`// ❌ WHAT'S WRONG
function Modal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(children, document.body);  // Error: children type
}

// WHY IT HAPPENS
// createPortal expects ReactNode, but return type is Portal
// Type mismatch between input and output

// ✅ EXACT FIX
import { createPortal } from "react-dom";

function Modal({ children }: { children: React.ReactNode }): React.ReactPortal {
  return createPortal(children, document.body);
}

// OR with conditional return
function Modal({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}): React.ReactPortal | null {
  if (!isOpen) return null;
  return createPortal(children, document.body);
}

// OR with proper typing
function Modal({
  children,
  container,
}: {
  children: React.ReactNode;
  container?: HTMLElement;
}): JSX.Element {
  const target = container || document.body;
  return createPortal(children, target) as JSX.Element;
}

// Usage
<Modal isOpen={true}>
  <div>Modal Content</div>
</Modal>`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>React Debugging Strategy:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Always type component props explicitly</li>
          <li>Use ReactNode for children, not string</li>
          <li>Type useState with explicit generic when initial value is null</li>
          <li>Use correct ref types matching the HTML element</li>
          <li>Add constraints to generic components</li>
          <li>Type event handlers with React event types</li>
          <li>Type React 19 hooks (useActionState, useOptimistic) with proper signatures</li>
          <li>Ensure useFormStatus is used within form context</li>
          <li>Type context values and providers consistently</li>
          <li>Use discriminated unions for useReducer actions</li>
          <li>Type render props with generics to preserve data types</li>
          <li>Use generic constraints for polymorphic components</li>
          <li>Type portals with React.ReactPortal return type</li>
        </ul>
      </InfoBox>
    </div>
  );
}

