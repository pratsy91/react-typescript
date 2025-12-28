import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function QuickReferencePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Quick Reference - Interview Cheatsheet
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Quick reference guide for TypeScript + React interview preparation.
      </p>

      <Section title="1. TypeScript Utility Types Cheatsheet">
        <p className="text-gray-700 dark:text-gray-300">
          All built-in utility types at a glance.
        </p>

        <CodeBlock title="Built-in Utility Types">
          {`// Property Modifiers
Partial<T>           // Make all properties optional
Required<T>          // Make all properties required
Readonly<T>          // Make all properties readonly

// Object Manipulation
Pick<T, K>           // Select specific properties
Omit<T, K>           // Remove specific properties
Record<K, T>         // Create object type with keys K and values T

// Union Manipulation
Exclude<T, U>        // Remove U from T
Extract<T, U>        // Extract U from T
NonNullable<T>       // Remove null and undefined

// Function Utilities
Parameters<T>        // Extract function parameters
ReturnType<T>        // Extract return type
ConstructorParameters<T>  // Extract constructor parameters
InstanceType<T>      // Extract instance type

// String Manipulation
Uppercase<S>         // Convert to uppercase
Lowercase<S>         // Convert to lowercase
Capitalize<S>        // Capitalize first letter
Uncapitalize<S>      // Uncapitalize first letter

// Promise Utilities
Awaited<T>           // Unwrap Promise type

// Example Usage
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

type UserPreview = Pick<User, "id" | "name">;
type UserUpdate = Partial<Omit<User, "id">>;
type UserKeys = keyof User;  // "id" | "name" | "email" | "age"`}
        </CodeBlock>
      </Section>

      <Section title="2. React Type Patterns Cheatsheet">
        <p className="text-gray-700 dark:text-gray-300">
          Common React + TypeScript patterns quick reference.
        </p>

        <CodeBlock title="Component Patterns">
          {`// Function Component
function Component({ prop1, prop2 }: ComponentProps) {
  return <div>{prop1}</div>;
}

// Generic Component
function List<T>({ items }: { items: T[] }) {
  return <ul>{items.map(item => <li>{item}</li>)}</ul>;
}

// Forward Ref
const Component = forwardRef<HTMLElement, Props>((props, ref) => {
  return <div ref={ref}>{/* ... */}</div>;
});

// Memoized Component
const Component = memo<Props>((props) => {
  return <div>{/* ... */}</div>;
});

// Polymorphic Component
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
} & React.ComponentPropsWithoutRef<E>;

function Component<E extends React.ElementType = "div">({
  as,
  ...props
}: PolymorphicProps<E>) {
  const Component = as || "div";
  return <Component {...props} />;
}`}
        </CodeBlock>

        <CodeBlock title="Hook Patterns">
          {`// useState
const [state, setState] = useState<Type>(initialValue);

// useReducer
type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" };
const [state, dispatch] = useReducer(reducer, initialState);

// useRef
const ref = useRef<HTMLElement>(null);

// useCallback
const callback = useCallback<(arg: Type) => void>(
  (arg) => { /* ... */ },
  [deps]
);

// useMemo
const value = useMemo<ReturnType>(() => compute(), [deps]);

// Custom Hook
function useCustom<T>(initial: T) {
  const [value, setValue] = useState<T>(initial);
  return [value, setValue] as const;
}`}
        </CodeBlock>

        <CodeBlock title="Event Handler Patterns">
          {`// Mouse Events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};

// Change Events
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

// Form Events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

// Keyboard Events
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {};

// Generic Event Handler
function useEventHandler<T extends HTMLElement, E extends React.SyntheticEvent<T>>(
  handler: (e: E) => void
) {
  return useCallback(handler, [handler]);
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Common Type Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Frequently used type patterns for quick reference.
        </p>

        <CodeBlock title="Type Patterns">
          {`// Discriminated Union
type Result<T> =
  | { type: "success"; data: T }
  | { type: "error"; error: string };

// Type Guard
function isType(value: unknown): value is Type {
  return /* validation */;
}

// Branded Type
type UserId = string & { readonly __brand: unique symbol };

// Const Assertion
const config = { api: "url" } as const;

// Satisfies Operator
const config = { api: "url" } satisfies Config;

// Template Literal Type
type Route = \`/api/\${string}\`;

// Conditional Type
type IsArray<T> = T extends any[] ? true : false;

// Mapped Type
type Optional<T> = { [P in keyof T]?: T[P] };

// Recursive Type
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };`}
        </CodeBlock>
      </Section>

      <Section title="4. Interview Checklist">
        <p className="text-gray-700 dark:text-gray-300">
          Quick checklist for TypeScript + React interviews.
        </p>

        <CodeBlock title="Pre-Interview Checklist">
          {`✅ TypeScript Fundamentals
  - Primitive types, unions, intersections
  - Generics and constraints
  - Utility types (Pick, Omit, Partial, etc.)
  - Conditional types and mapped types
  - Type guards and type predicates

✅ React + TypeScript
  - Component prop typing
  - Event handler typing
  - Hook typing (useState, useReducer, useRef, etc.)
  - Generic components
  - Forward ref patterns

✅ Advanced Patterns
  - Polymorphic components
  - Higher-order components
  - Render props
  - Custom hooks
  - Context typing

✅ Common Pitfalls
  - Avoid 'any' type
  - Use type guards over assertions
  - Correct event handler return types
  - Proper ref forwarding
  - Type widening issues

✅ Best Practices
  - Explicit prop types
  - Type-safe APIs
  - Exhaustive checking
  - Branded types for IDs
  - Const assertions for literals`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Final Interview Tips:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Practice explaining types out loud</li>
          <li>Know when to use generics vs unions</li>
          <li>Understand type inference and when it fails</li>
          <li>Be able to implement utility types from scratch</li>
          <li>Practice typing common React patterns</li>
          <li>Review your own code for type safety</li>
          <li>Ask questions to clarify requirements</li>
          <li>Think about edge cases and error handling</li>
        </ul>
      </InfoBox>
    </div>
  );
}

