import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function MemoizationHooksPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Memoization Hooks
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        useCallback and useMemo optimize performance by memoizing functions and
        values. Understanding their TypeScript typing, dependency arrays, and
        return type inference enables effective performance optimization.
      </p>

      <Section title="1. useCallback Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useCallback memoizes functions to prevent unnecessary re-renders and
          recreate functions only when dependencies change. Understanding
          function type inference and dependency typing ensures type-safe
          memoization.
        </p>

        <CodeBlock title="useCallback with TypeScript">
          {`// Basic useCallback - memoized function
function CallbackExample() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");

  // Memoized function - recreated only when count changes
  const handleClick = React.useCallback(() => {
    console.log(\`Count: \${count}\`);
  }, [count]);  // Dependency array

  return (
    <div>
      <button onClick={handleClick}>Log Count</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

// Function type inference
function TypedCallback() {
  const [value, setValue] = React.useState(0);

  // Inferred as: () => void
  const noArgsCallback = React.useCallback(() => {
    console.log("No args");
  }, []);

  // Inferred as: (n: number) => void
  const withArgsCallback = React.useCallback((n: number) => {
    setValue(n);
  }, []);

  // Explicit type
  const typedCallback: (value: number) => void = React.useCallback(
    (value: number) => {
      setValue(value);
    },
    []
  );

  return null;
}

// useCallback with parameters
function ParametrizedCallback() {
  const [items, setItems] = React.useState<string[]>([]);

  // Memoized function with parameters
  const addItem = React.useCallback((item: string) => {
    setItems((prev) => [...prev, item]);
  }, []);  // No dependencies - function is stable

  // Or with dependency
  const removeItem = React.useCallback(
    (id: number) => {
      setItems((prev) => prev.filter((_, i) => i !== id));
    },
    []  // No dependencies needed
  );

  return null;
}

// useCallback with complex dependencies
function ComplexDependencies() {
  const [count, setCount] = React.useState(0);
  const [multiplier, setMultiplier] = React.useState(1);

  // Recreated when count or multiplier changes
  const calculate = React.useCallback(
    (base: number) => {
      return (count + base) * multiplier;
    },
    [count, multiplier]  // All dependencies
  );

  return null;
}

// useCallback for event handlers
function EventHandlerCallback() {
  const [data, setData] = React.useState<string[]>([]);

  // Memoized event handler - stable reference
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const value = formData.get("input") as string;
      setData((prev) => [...prev, value]);
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="input" />
      <button type="submit">Submit</button>
    </form>
  );
}

// useCallback with refs
function RefCallback() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Stable callback reference
  const focusInput = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);  // Ref object doesn't need to be in deps

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

// useCallback for child component props
const MemoizedChild = React.memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click</button>;
});

function ParentWithCallback() {
  const [count, setCount] = React.useState(0);
  const [otherState, setOtherState] = React.useState("");

  // Without useCallback: Child re-renders every time
  // const handleClick = () => setCount(count + 1);

  // With useCallback: Child only re-renders when count changes
  const handleClick = React.useCallback(() => {
    setCount((prev) => prev + 1);  // Use function updater
  }, []);  // Stable reference

  return (
    <div>
      <MemoizedChild onClick={handleClick} />
      <input value={otherState} onChange={(e) => setOtherState(e.target.value)} />
    </div>
  );
}

// useCallback with async functions
function AsyncCallback() {
  const [loading, setLoading] = React.useState(false);

  const fetchData = React.useCallback(async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } finally {
      setLoading(false);
    }
  }, []);  // No dependencies

  React.useEffect(() => {
    fetchData("/api/data");
  }, [fetchData]);  // Stable reference

  return null;
}

// useCallback return type inference
function ReturnTypeCallback() {
  // Inferred return type: string
  const getValue = React.useCallback((): string => {
    return "value";
  }, []);

  // Explicit return type
  const getNumber: () => number = React.useCallback(() => {
    return 42;
  }, []);

  return null;
}

// useCallback with generic functions
function GenericCallback<T>() {
  const [value, setValue] = React.useState<T | null>(null);

  // Generic callback
  const setTypedValue = React.useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  return null;
}

// Conditional callback
function ConditionalCallback({ enabled }: { enabled: boolean }) {
  const handleAction = React.useCallback(
    () => {
      if (enabled) {
        console.log("Action enabled");
      }
    },
    [enabled]  // Include condition in deps
  );

  return <button onClick={handleAction}>Action</button>;
}

// Callback with multiple dependencies
function MultipleDependencies() {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [z, setZ] = React.useState(0);

  // Recreated when any dependency changes
  const calculate = React.useCallback(() => {
    return x + y + z;
  }, [x, y, z]);  // All dependencies

  return null;
}

// Callback composition
function CallbackComposition() {
  const [count, setCount] = React.useState(0);

  const increment = React.useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrement = React.useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  // Composed callback
  const reset = React.useCallback(() => {
    setCount(0);
  }, []);

  // Complex composed callback
  const doubleAndIncrement = React.useCallback(() => {
    setCount((prev) => prev * 2 + 1);
  }, []);

  return null;
}

// When NOT to use useCallback
function UnnecessaryCallback() {
  const [count, setCount] = React.useState(0);

  // ❌ Unnecessary: Simple inline function is fine
  // const handleClick = React.useCallback(() => {
  //   setCount(count + 1);
  // }, [count]);

  // ✓ Better: Just inline it
  return <button onClick={() => setCount(count + 1)}>Click</button>;
}

// When to use useCallback:
// 1. Passing to memoized child components
// 2. Functions in dependency arrays
// 3. Event handlers passed as props
// 4. Expensive function creation

// Type-safe callback helper
function useTypedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return React.useCallback(callback, deps);
}`}
        </CodeBlock>

        <InfoBox type="info">
          useCallback memoizes functions to prevent unnecessary re-renders. Use
          it when passing callbacks to memoized children, in dependency arrays,
          or for stable function references. Include all dependencies in the
          dependency array. Don't overuse - inline functions are fine for simple
          cases.
        </InfoBox>
      </Section>

      <Section title="2. useMemo Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useMemo memoizes computed values, recalculating only when dependencies
          change. Understanding return type inference and dependency typing
          enables effective performance optimization.
        </p>

        <CodeBlock title="useMemo with TypeScript">
          {`// Basic useMemo - memoized value
function MemoExample() {
  const [count, setCount] = React.useState(0);
  const [multiplier, setMultiplier] = React.useState(1);

  // Memoized calculation - recalculated only when count or multiplier changes
  const expensiveValue = React.useMemo(() => {
    console.log("Calculating...");
    return count * multiplier;
  }, [count, multiplier]);  // Dependency array

  return (
    <div>
      <p>Value: {expensiveValue}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Type inference
function TypedMemo() {
  const [items] = React.useState<number[]>([1, 2, 3, 4, 5]);

  // Inferred as: number
  const sum = React.useMemo(() => {
    return items.reduce((acc, n) => acc + n, 0);
  }, [items]);

  // Inferred as: string[]
  const strings = React.useMemo(() => {
    return items.map((n) => String(n));
  }, [items]);

  // Explicit type
  const count: number = React.useMemo(() => items.length, [items]);

  return null;
}

// Complex computation
function ComplexMemo() {
  const [users, setUsers] = React.useState<User[]>([]);

  // Expensive computation memoized
  const processedUsers = React.useMemo(() => {
    return users
      .filter((user) => user.active)
      .map((user) => ({
        ...user,
        displayName: \`\${user.firstName} \${user.lastName}\`,
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [users]);  // Recalculate when users change

  return (
    <ul>
      {processedUsers.map((user) => (
        <li key={user.id}>{user.displayName}</li>
      ))}
    </ul>
  );
}

// Object memoization
function ObjectMemo() {
  const [count, setCount] = React.useState(0);

  // Without useMemo: new object every render
  // const config = { count, enabled: true };

  // With useMemo: stable reference when count doesn't change
  const config = React.useMemo(
    () => ({
      count,
      enabled: true,
    }),
    [count]
  );

  // Stable reference for child components
  return <ChildComponent config={config} />;
}

// Array memoization
function ArrayMemo() {
  const [items, setItems] = React.useState<string[]>([]);

  // Memoized array transformation
  const processedItems = React.useMemo(() => {
    return items
      .filter((item) => item.length > 0)
      .map((item) => item.toUpperCase())
      .sort();
  }, [items]);

  return (
    <ul>
      {processedItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Conditional memoization
function ConditionalMemo({ enabled }: { enabled: boolean }) {
  const [data, setData] = React.useState<number[]>([]);

  const result = React.useMemo(() => {
    if (!enabled) return null;

    // Expensive computation only when enabled
    return data.reduce((acc, n) => acc + n, 0);
  }, [enabled, data]);  // Include condition in deps

  return <div>{result}</div>;
}

// useMemo with async data
function AsyncMemo() {
  const [users, setUsers] = React.useState<User[]>([]);

  // Memoized derived data
  const userMap = React.useMemo(() => {
    const map = new Map<number, User>();
    users.forEach((user) => {
      map.set(user.id, user);
    });
    return map;
  }, [users]);

  const getUser = React.useCallback(
    (id: number) => {
      return userMap.get(id);
    },
    [userMap]  // userMap is stable thanks to useMemo
  );

  return null;
}

// Multiple memoized values
function MultipleMemo() {
  const [items, setItems] = React.useState<number[]>([]);

  const sum = React.useMemo(() => {
    return items.reduce((acc, n) => acc + n, 0);
  }, [items]);

  const average = React.useMemo(() => {
    return items.length > 0 ? sum / items.length : 0;
  }, [items, sum]);  // Depends on sum

  const max = React.useMemo(() => {
    return items.length > 0 ? Math.max(...items) : 0;
  }, [items]);

  return (
    <div>
      <p>Sum: {sum}</p>
      <p>Average: {average}</p>
      <p>Max: {max}</p>
    </div>
  );
}

// useMemo for filtering/sorting
function FilterMemo() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [filter, setFilter] = React.useState("");
  const [sortBy, setSortBy] = React.useState<"name" | "date">("name");

  const filteredAndSorted = React.useMemo(() => {
    let result = items;

    // Filter
    if (filter) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return a.date.getTime() - b.date.getTime();
    });

    return result;
  }, [items, filter, sortBy]);  // All dependencies

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter"
      />
      {/* Render filteredAndSorted */}
    </div>
  );
}

// useMemo with refs
function RefMemo() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState("");

  // Memoized config object
  const inputConfig = React.useMemo(
    () => ({
      ref: inputRef,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    }),
    [value]  // ref is stable, only value changes
  );

  return null;
}

// Generic useMemo
function GenericMemo<T>(props: { items: T[]; transform: (item: T) => string }) {
  const transformed = React.useMemo(() => {
    return props.items.map(props.transform);
  }, [props.items, props.transform]);

  return null;
}

// When NOT to use useMemo
function UnnecessaryMemo() {
  const [count, setCount] = React.useState(0);

  // ❌ Unnecessary: Simple calculation is cheap
  // const doubled = React.useMemo(() => count * 2, [count]);

  // ✓ Better: Just calculate directly
  const doubled = count * 2;

  return <div>{doubled}</div>;
}

// When to use useMemo:
// 1. Expensive computations
// 2. Creating objects/arrays for child props
// 3. Deriving data from other state
// 4. Preventing unnecessary re-renders

// Type-safe memo helper
function useTypedMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return React.useMemo(factory, deps);
}

// Memoized selector pattern
function useMemoizedSelector<T, R>(
  data: T,
  selector: (data: T) => R
): R {
  return React.useMemo(() => selector(data), [data, selector]);
}

// Usage
function SelectorExample() {
  const [users, setUsers] = React.useState<User[]>([]);

  // Only active users are memoized
  const activeUsers = useMemoizedSelector(users, (allUsers) =>
    allUsers.filter((u) => u.active)
  );

  return null;
}

// useMemo for expensive operations
function ExpensiveOperation() {
  const [n, setN] = React.useState(40);

  // Fibonacci without memoization would recalculate every render
  const fibonacci = React.useMemo(() => {
    function fib(num: number): number {
      if (num <= 1) return num;
      return fib(num - 1) + fib(num - 2);
    }
    return fib(n);
  }, [n]);  // Only recalculate when n changes

  return <div>Fibonacci({n}): {fibonacci}</div>;
}

// Memoization with context
function ContextMemo() {
  const context = React.useContext(SomeContext);

  // Memoized derived value from context
  const derivedValue = React.useMemo(() => {
    return context.data.map((item) => item.value).join(", ");
  }, [context.data]);  // Only recalculate when context.data changes

  return <div>{derivedValue}</div>;
}`}
        </CodeBlock>

        <InfoBox type="important">
          useMemo memoizes computed values to avoid expensive recalculations.
          Use for expensive computations, object/array creation for props, and
          derived data. Include all dependencies in the dependency array. Don't
          overuse - simple calculations don't need memoization.
        </InfoBox>
      </Section>

      <Section title="3. useCallback vs useMemo Comparison">
        <p className="text-gray-700 dark:text-gray-300">
          Understanding when to use useCallback vs useMemo helps optimize
          performance effectively. useCallback memoizes functions, useMemo
          memoizes values.
        </p>

        <CodeBlock title="useCallback vs useMemo">
          {`// useCallback: memoizes functions
function CallbackExample() {
  const [count, setCount] = React.useState(0);

  // Memoizes the function itself
  const handleClick = React.useCallback(() => {
    console.log(count);
  }, [count]);

  return <button onClick={handleClick}>Click</button>;
}

// useMemo: memoizes values
function MemoExample() {
  const [count, setCount] = React.useState(0);

  // Memoizes the computed value
  const doubled = React.useMemo(() => {
    return count * 2;
  }, [count]);

  return <div>{doubled}</div>;
}

// Common mistake: using useMemo for functions
function WrongUsage() {
  const [count, setCount] = React.useState(0);

  // ❌ Don't use useMemo for functions
  const handleClick = React.useMemo(
    () => () => {
      console.log(count);
    },
    [count]
  );

  // ✓ Use useCallback instead
  const handleClick2 = React.useCallback(() => {
    console.log(count);
  }, [count]);

  return null;
}

// Both together
function BothHooks() {
  const [items, setItems] = React.useState<string[]>([]);

  // Memoized value
  const filteredItems = React.useMemo(
    () => items.filter((item) => item.length > 0),
    [items]
  );

  // Memoized function using memoized value
  const handleItemClick = React.useCallback(
    (index: number) => {
      console.log(filteredItems[index]);
    },
    [filteredItems]  // Depends on memoized value
  );

  return null;
}

// Summary:
// useCallback: Memoize functions (event handlers, callbacks)
// useMemo: Memoize computed values (expensive calculations, derived data)`}
        </CodeBlock>

        <InfoBox type="tip">
          useCallback memoizes functions (for callbacks, event handlers).
          useMemo memoizes computed values (for expensive calculations, derived
          data). Use together when a function depends on a memoized value. Both
          require proper dependency arrays for correctness.
        </InfoBox>
      </Section>
    </div>
  );
}
