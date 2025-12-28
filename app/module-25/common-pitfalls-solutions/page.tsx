import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function CommonPitfallsSolutionsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Common Pitfalls & Solutions - Interview Cheatsheet
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Common TypeScript + React pitfalls and how to solve them - essential
        for interviews.
      </p>

      <Section title="1. Type Assertion Pitfalls">
        <p className="text-gray-700 dark:text-gray-300">
          Common mistakes with type assertions and how to avoid them.
        </p>

        <CodeBlock title="Avoiding Unsafe Type Assertions">
          {`// ❌ BAD: Unsafe type assertion
const data = response.json() as User;  // What if it's not a User?

// ✅ GOOD: Type guard
function isUser(data: unknown): data is User {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "name" in data &&
    typeof (data as any).id === "string" &&
    typeof (data as any).name === "string"
  );
}

const data = await response.json();
if (isUser(data)) {
  // Now TypeScript knows data is User
  console.log(data.name);
}

// ✅ GOOD: Validation library (zod)
import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

const data = UserSchema.parse(await response.json());  // Typed and validated

// ❌ BAD: Asserting to any
const value = someValue as any;  // Loses all type safety

// ✅ GOOD: Use unknown first
const value = someValue as unknown as TargetType;  // At least shows intent`}
        </CodeBlock>

        <CodeBlock title="Event Handler Return Types">
          {`// ❌ BAD: Returning undefined
const handleClick = (): undefined => {
  console.log("clicked");
  return undefined;  // TypeScript error!
};

// ✅ GOOD: Return void
const handleClick = (): void => {
  console.log("clicked");
  // No return needed
};

// ✅ GOOD: Implicit void (preferred)
const handleClick = () => {
  console.log("clicked");
};

// ❌ BAD: Async handler without proper typing
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  await submitForm();
  // Implicitly returns Promise<void>, which is fine
};

// ✅ GOOD: Explicit async handler
const handleSubmit = async (e: React.FormEvent): Promise<void> => {
  e.preventDefault();
  await submitForm();
};`}
        </CodeBlock>
      </Section>

      <Section title="2. React-Specific Pitfalls">
        <p className="text-gray-700 dark:text-gray-300">
          Common React + TypeScript mistakes and solutions.
        </p>

        <CodeBlock title="Ref Forwarding Issues">
          {`// ❌ BAD: Wrong ref type
const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;  // Error: HTMLDivElement != HTMLInputElement
});

// ✅ GOOD: Correct ref type
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// ❌ BAD: Forgetting to forward ref
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props) => {
  return <button {...props} />;  // Ref not forwarded!
});

// ✅ GOOD: Forward ref correctly
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button ref={ref} {...props} />;
});

// ❌ BAD: Null ref without check
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current.value;  // Error: Object is possibly 'null'

// ✅ GOOD: Null check
if (inputRef.current) {
  inputRef.current.value;  // Safe
}

// ✅ GOOD: Non-null assertion (when you're sure)
inputRef.current!.value;  // Use sparingly!`}
        </CodeBlock>

        <CodeBlock title="Generic Component Constraints">
          {`// ❌ BAD: Missing constraint
function List<T>({ items }: { items: T[] }) {
  return items.map((item) => <div>{item}</div>);  // Error: T might not be renderable
}

// ✅ GOOD: Add constraint
function List<T extends { id: string }>({ items }: { items: T[] }) {
  return items.map((item) => <div key={item.id}>{item.id}</div>);
}

// ❌ BAD: Too restrictive constraint
function List<T extends string>({ items }: { items: T[] }) {
  return items.map((item) => <div>{item}</div>);
}

// ✅ GOOD: Flexible constraint
function List<T extends string | number>({ items }: { items: T[] }) {
  return items.map((item) => <div>{String(item)}</div>);
}

// ❌ BAD: Generic without proper typing
function useData<T>(fetchFn: () => T) {
  const [data, setData] = useState<T | null>(null);
  // Missing error handling, loading state
}

// ✅ GOOD: Complete generic hook
function useData<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    fetchFn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [fetchFn]);
  
  return { data, loading, error };
}`}
        </CodeBlock>

        <CodeBlock title="Type Widening Issues">
          {`// ❌ BAD: Type widens to string
const status = "pending";  // Type: string (not "pending")

// ✅ GOOD: Const assertion
const status = "pending" as const;  // Type: "pending"

// ✅ GOOD: Satisfies operator
const status = "pending" satisfies "pending" | "loading" | "success";

// ❌ BAD: Array type widens
const colors = ["red", "green", "blue"];  // Type: string[]

// ✅ GOOD: Const assertion
const colors = ["red", "green", "blue"] as const;  // Type: readonly ["red", "green", "blue"]
type Color = typeof colors[number];  // "red" | "green" | "blue"

// ❌ BAD: Object type widens
const config = {
  api: "https://api.example.com",
  timeout: 5000,
};  // Types are widened

// ✅ GOOD: Const assertion
const config = {
  api: "https://api.example.com",
  timeout: 5000,
} as const;  // Deeply readonly with literal types`}
        </CodeBlock>
      </Section>

      <Section title="3. Performance & Best Practices">
        <p className="text-gray-700 dark:text-gray-300">
          Performance considerations and best practices for interviews.
        </p>

        <CodeBlock title="Type Performance Issues">
          {`// ❌ BAD: Excessively deep types
type DeepType<T> = T extends object
  ? {
      [K in keyof T]: DeepType<T[K]>;
    }
  : T;
// Can cause: "Type instantiation is excessively deep"

// ✅ GOOD: Limit depth
type DeepType<T, Depth extends number = 5> = Depth extends 0
  ? T
  : T extends object
  ? {
      [K in keyof T]: DeepType<T[K], Prev<Depth>>;
    }
  : T;

// ❌ BAD: Complex conditional chains
type ComplexType<T> = T extends string
  ? T extends \`\${infer _}\`
    ? T extends \`\${infer _}\${infer _}\`
      ? "complex"
      : "simple"
    : never
  : never;

// ✅ GOOD: Simplify
type SimpleType<T> = T extends string ? "string" : "other";

// ✅ GOOD: Use utility types when possible
type MyPartial<T> = Partial<T>;  // Use built-in instead of reimplementing`}
        </CodeBlock>

        <CodeBlock title="React Performance with Types">
          {`// ✅ GOOD: Memoized with proper types
const MemoizedComponent = memo<ComponentProps>(({ data, onAction }) => {
  return <div>{/* ... */}</div>;
}, (prevProps, nextProps) => {
  // Typed comparison function
  return prevProps.data.id === nextProps.data.id;
});

// ✅ GOOD: Typed useMemo
const expensiveValue = useMemo<ComputedValue>(() => {
  return computeValue(data);
}, [data]);

// ✅ GOOD: Typed useCallback
const handleClick = useCallback<(id: string) => void>(
  (id) => {
    onItemClick(id);
  },
  [onItemClick]
);

// ❌ BAD: Missing dependency types
const handleClick = useCallback(() => {
  onItemClick(id);  // id might not be in scope
}, []);  // Missing dependencies

// ✅ GOOD: Proper dependencies
const handleClick = useCallback(() => {
  onItemClick(id);
}, [id, onItemClick]);`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Interview Red Flags to Avoid:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Using 'any' type without justification</li>
          <li>Type assertions without validation</li>
          <li>Missing null/undefined checks</li>
          <li>Incorrect event handler return types</li>
          <li>Generic components without constraints</li>
          <li>Ref forwarding with wrong types</li>
          <li>Type widening when literals are needed</li>
        </ul>
      </InfoBox>
    </div>
  );
}

