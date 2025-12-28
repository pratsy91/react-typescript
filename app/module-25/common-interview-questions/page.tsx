import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function CommonInterviewQuestionsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Common Interview Questions & Solutions
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Real interview questions with typed solutions and explanations.
      </p>

      <Section title="1. TypeScript Interview Questions">
        <p className="text-gray-700 dark:text-gray-300">
          Common TypeScript questions with complete solutions.
        </p>

        <CodeBlock title="Q1: Implement Pick, Omit, Partial">
          {`// Interview Question: Implement utility types

// Pick - Select specific properties
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit - Remove specific properties
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Partial - Make all properties optional
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

// Required - Make all properties required
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

// Example Usage
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

type UserPreview = Pick<User, "id" | "name">;  // { id: string; name: string }
type UserWithoutEmail = Omit<User, "email">;  // { id: string; name: string; age: number }
type PartialUser = Partial<User>;  // All properties optional`}
        </CodeBlock>

        <CodeBlock title="Q2: Deep Readonly Implementation">
          {`// Interview Question: Create a DeepReadonly type

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P];
};

// Example
interface Nested {
  a: number;
  b: {
    c: string;
    d: {
      e: boolean;
    };
  };
}

type ReadonlyNested = DeepReadonly<Nested>;
// All nested properties are readonly

// Test
const obj: ReadonlyNested = {
  a: 1,
  b: {
    c: "test",
    d: {
      e: true,
    },
  },
};

// obj.b.d.e = false;  // Error: Cannot assign to 'e' because it is a read-only property`}
        </CodeBlock>

        <CodeBlock title="Q3: Type-Safe Event Emitter">
          {`// Interview Question: Create a type-safe event emitter

type EventMap = {
  click: { x: number; y: number };
  change: { value: string };
  error: { message: string };
};

class TypedEventEmitter<T extends Record<string, unknown>> {
  private listeners: {
    [K in keyof T]?: Array<(event: T[K]) => void>;
  } = {};
  
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }
  
  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners[event]?.forEach((listener) => listener(data));
  }
  
  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      this.listeners[event] = eventListeners.filter((l) => l !== listener);
    }
  }
}

// Usage
const emitter = new TypedEventEmitter<EventMap>();
emitter.on("click", (data) => {
  console.log(data.x, data.y);  // Typed!
});
emitter.emit("click", { x: 10, y: 20 });  // Type-safe!`}
        </CodeBlock>

        <CodeBlock title="Q4: Extract Promise Return Type">
          {`// Interview Question: Extract type from Promise

type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

// Handles nested promises
type Result1 = Awaited<Promise<string>>;  // string
type Result2 = Awaited<Promise<Promise<number>>>;  // number

// Extract from async function
type AsyncFunction = () => Promise<User>;
type ReturnType = Awaited<ReturnType<AsyncFunction>>;  // User

// Practical example
async function fetchUser(): Promise<User> {
  return { id: "1", name: "John" };
}

type UserFromPromise = Awaited<ReturnType<typeof fetchUser>>;  // User`}
        </CodeBlock>
      </Section>

      <Section title="2. React + TypeScript Interview Questions">
        <p className="text-gray-700 dark:text-gray-300">
          Common React + TypeScript questions with solutions.
        </p>

        <CodeBlock title="Q1: Generic Table Component">
          {`// Interview Question: Create a generic, type-safe table component

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

function Table<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
}: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            onClick={() => onRowClick?.(row)}
            style={{ cursor: onRowClick ? "pointer" : "default" }}
          >
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render
                  ? col.render(row[col.key], row)
                  : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const columns: Column<User>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  {
    key: "role",
    header: "Role",
    render: (value) => <span className={\`role-\${value}\`}>{value}</span>,
  },
];

<Table<User> data={users} columns={columns} onRowClick={(user) => console.log(user)} />`}
        </CodeBlock>

        <CodeBlock title="Q2: Type-Safe Form Hook">
          {`// Interview Question: Create a type-safe form hook

function useForm<T extends Record<string, unknown>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  
  const setValue = useCallback(<K extends keyof T>(
    key: K,
    value: T[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear error when value changes
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  }, []);
  
  const setError = useCallback(<K extends keyof T>(
    key: K,
    error: string
  ) => {
    setErrors((prev) => ({ ...prev, [key]: error }));
  }, []);
  
  const validate = useCallback((validator: (values: T) => Partial<Record<keyof T, string>>) => {
    const validationErrors = validator(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [values]);
  
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);
  
  return {
    values,
    errors,
    setValue,
    setError,
    validate,
    reset,
  };
}

// Usage
interface FormData {
  name: string;
  email: string;
  age: number;
}

function MyForm() {
  const { values, errors, setValue, validate } = useForm<FormData>({
    name: "",
    email: "",
    age: 0,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate((vals) => {
      const errs: Partial<Record<keyof FormData, string>> = {};
      if (!vals.name) errs.name = "Name is required";
      if (!vals.email.includes("@")) errs.email = "Invalid email";
      return errs;
    });
    
    if (isValid) {
      console.log("Form is valid:", values);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={values.name}
        onChange={(e) => setValue("name", e.target.value)}
      />
      {errors.name && <span>{errors.name}</span>}
      {/* ... other fields */}
    </form>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Q3: Polymorphic Component">
          {`// Interview Question: Create a polymorphic component

type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<E>;

type PolymorphicComponent<E extends React.ElementType> = <
  T extends React.ElementType = E
>(
  props: PolymorphicProps<T>
) => React.ReactElement | null;

const Box: PolymorphicComponent<"div"> = <E extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: PolymorphicProps<E>) => {
  const Component = as || "div";
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
};

// Usage - Type-safe!
<Box as="button" onClick={() => {}} type="button">
  Button
</Box>
<Box as="a" href="/link">
  Link
</Box>
<Box as="section" id="content">
  Section
</Box>`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Interview Strategy:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Start with the type signature, then implement</li>
          <li>Explain your thinking process out loud</li>
          <li>Consider edge cases (null, undefined, empty arrays)</li>
          <li>Ask clarifying questions before coding</li>
          <li>Test your solution with examples</li>
          <li>Discuss trade-offs and alternatives</li>
        </ul>
      </InfoBox>
    </div>
  );
}

