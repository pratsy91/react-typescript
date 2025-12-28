import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function AdvancedHooksPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Advanced Hooks
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React provides advanced hooks for transitions, deferred values, external
        store synchronization, debugging, and ID generation. Understanding their
        TypeScript typing enables powerful concurrent features and debugging
        capabilities.
      </p>

      <Section title="1. useTransition Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useTransition enables non-blocking state updates, marking updates as
          transitions. It returns a tuple with a boolean indicating pending
          state and a startTransition function for marking updates.
        </p>

        <CodeBlock title="useTransition with TypeScript">
          {`// Basic useTransition
function TransitionExample() {
  const [isPending, startTransition] = React.useTransition();

  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);  // Urgent update

    // Mark non-urgent update as transition
    startTransition(() => {
      const filtered = filterLargeList(value);
      setResults(filtered);  // Non-urgent update
    });
  };

  return (
    <div>
      <input value={input} onChange={handleChange} />
      {isPending && <div>Searching...</div>}
      <ul>
        {results.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

// Return type: [boolean, (callback: () => void) => void]
function TransitionTypes() {
  // isPending: boolean - indicates if transition is pending
  // startTransition: (callback: () => void) => void
  const [isPending, startTransition] = React.useTransition();

  // TypeScript ensures startTransition accepts a callback
  startTransition(() => {
    console.log("Transition");
  });

  return (
    <div>
      {isPending ? "Loading..." : "Ready"}
    </div>
  );
}

// Multiple transitions
function MultipleTransitions() {
  const [isPending, startTransition] = React.useTransition();
  const [count, setCount] = React.useState(0);
  const [items, setItems] = React.useState<string[]>([]);

  const handleUpdate = () => {
    // Multiple state updates in one transition
    startTransition(() => {
      setCount((prev) => prev + 1);
      setItems((prev) => [...prev, "new item"]);
    });
  };

  return (
    <div>
      <button onClick={handleUpdate} disabled={isPending}>
        Update
      </button>
      {isPending && <div>Updating...</div>}
    </div>
  );
}

// Transition with async operations
function AsyncTransition() {
  const [isPending, startTransition] = React.useTransition();
  const [data, setData] = React.useState<string | null>(null);

  const loadData = async () => {
    startTransition(async () => {
      const result = await fetchData();
      setData(result);  // State update in transition
    });
  };

  return (
    <div>
      <button onClick={loadData} disabled={isPending}>
        Load Data
      </button>
      {isPending && <div>Loading...</div>}
      {data && <div>{data}</div>}
    </div>
  );
}

// Urgent vs non-urgent updates
function UrgentUpdates() {
  const [isPending, startTransition] = React.useTransition();
  const [urgentValue, setUrgentValue] = React.useState("");
  const [nonUrgentValue, setNonUrgentValue] = React.useState("");

  const handleChange = (value: string) => {
    // Urgent: input must update immediately
    setUrgentValue(value);

    // Non-urgent: expensive computation can wait
    startTransition(() => {
      const expensive = expensiveComputation(value);
      setNonUrgentValue(expensive);
    });
  };

  return (
    <div>
      <input
        value={urgentValue}
        onChange={(e) => handleChange(e.target.value)}
      />
      {isPending && <div>Processing...</div>}
      <div>{nonUrgentValue}</div>
    </div>
  );
}

// Tab switching pattern
function TabSwitcher() {
  const [isPending, startTransition] = React.useTransition();
  const [activeTab, setActiveTab] = React.useState("tab1");

  const switchTab = (tab: string) => {
    // Tab button click is urgent
    setActiveTab(tab);

    // Tab content loading is non-urgent
    startTransition(() => {
      loadTabContent(tab);
    });
  };

  return (
    <div>
      <button onClick={() => switchTab("tab1")}>Tab 1</button>
      <button onClick={() => switchTab("tab2")}>Tab 2</button>
      {isPending && <div>Loading tab...</div>}
      <TabContent tab={activeTab} />
    </div>
  );
}

// Type-safe startTransition
type StartTransition = (callback: () => void) => void;

function useTypedTransition(): [boolean, StartTransition] {
  return React.useTransition();
}

// Nested transitions
function NestedTransitions() {
  const [isPending, startTransition] = React.useTransition();

  const handleNested = () => {
    startTransition(() => {
      // Outer transition
      setValue1("value1");

      startTransition(() => {
        // Nested transition
        setValue2("value2");
      });
    });
  };

  return null;
}

// Transition with error handling
function TransitionWithError() {
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<Error | null>(null);

  const riskyUpdate = () => {
    startTransition(() => {
      try {
        performRiskyOperation();
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    });
  };

  return (
    <div>
      <button onClick={riskyUpdate} disabled={isPending}>
        Update
      </button>
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}

// Filter large lists pattern
function FilterLargeList({ items }: { items: string[] }) {
  const [isPending, startTransition] = React.useTransition();
  const [filter, setFilter] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState<string[]>(items);

  const handleFilterChange = (value: string) => {
    setFilter(value);  // Urgent: input update

    startTransition(() => {
      // Non-urgent: expensive filtering
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    });
  };

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
      />
      {isPending && <div>Filtering...</div>}
      <ul>
        {filteredItems.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`}
        </CodeBlock>

        <InfoBox type="info">
          useTransition returns [isPending: boolean, startTransition: function].
          Use it for non-urgent updates that can be interrupted. Mark expensive
          operations (filtering, calculations) as transitions while keeping
          urgent updates (input, clicks) immediate. TypeScript infers tuple
          types automatically.
        </InfoBox>
      </Section>

      <Section title="2. useDeferredValue Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useDeferredValue defers updating a value, allowing React to show old
          values while new ones are being computed. It accepts a generic value
          type and returns a deferred version.
        </p>

        <CodeBlock title="useDeferredValue with TypeScript">
          {`// Basic useDeferredValue
function DeferredValueExample() {
  const [value, setValue] = React.useState("");
  const deferredValue = React.useDeferredValue(value);

  // deferredValue updates with delay, value updates immediately
  const results = React.useMemo(() => {
    return expensiveSearch(deferredValue);
  }, [deferredValue]);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}  // Immediate update
      />
      <Results data={results} />  {/* Updates when deferredValue changes */}
    </div>
  );
}

// Generic typing
function GenericDeferred<T>(value: T): T {
  return React.useDeferredValue(value);
}

// Usage with different types
function TypedDeferred() {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState("");
  const [items, setItems] = React.useState<string[]>([]);

  // All types work
  const deferredCount = React.useDeferredValue(count);  // number
  const deferredText = React.useDeferredValue(text);  // string
  const deferredItems = React.useDeferredValue(items);  // string[]

  return null;
}

// Deferred object
function DeferredObject() {
  const [user, setUser] = React.useState<User>({
    id: 0,
    name: "",
    email: "",
  });

  const deferredUser = React.useDeferredValue(user);  // User type

  // Expensive operation on deferred value
  const processedUser = React.useMemo(() => {
    return processUser(deferredUser);
  }, [deferredUser]);

  return null;
}

// Deferred array
function DeferredArray() {
  const [items, setItems] = React.useState<Item[]>([]);
  const deferredItems = React.useDeferredValue(items);

  const processedItems = React.useMemo(() => {
    return deferredItems
      .filter((item) => item.active)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [deferredItems]);

  return (
    <ul>
      {processedItems.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Combined with useMemo
function DeferredWithMemo() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(searchQuery);

  // Only recalculate when deferredQuery changes
  const searchResults = React.useMemo(() => {
    return performSearch(deferredQuery);
  }, [deferredQuery]);

  return (
    <div>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchResults results={searchResults} />
    </div>
  );
}

// Deferred vs immediate updates
function DeferredComparison() {
  const [input, setInput] = React.useState("");
  const deferredInput = React.useDeferredValue(input);

  // Immediate UI update
  const immediateDisplay = input;  // Shows immediately

  // Deferred expensive computation
  const expensiveResult = React.useMemo(() => {
    return expensiveComputation(deferredInput);
  }, [deferredInput]);  // Updates later

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <div>Input: {immediateDisplay}</div>  {/* Immediate */}
      <div>Result: {expensiveResult}</div>  {/* Deferred */}
    </div>
  );
}

// Type-safe deferred value hook
function useTypedDeferredValue<T>(value: T): T {
  return React.useDeferredValue(value);
}

// Usage
function TypedDeferredHook() {
  const [data, setData] = React.useState<string[]>([]);
  const deferredData = useTypedDeferredValue(data);  // string[]

  return null;
}

// Deferred with null handling
function DeferredNullable<T>(value: T | null): T | null {
  return React.useDeferredValue(value);
}

// Deferred with union types
function DeferredUnion() {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const deferredStatus = React.useDeferredValue(status);  // Same union type

  return null;
}

// Pattern: Search with deferred filtering
function SearchWithDeferred() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [allItems, setAllItems] = React.useState<Item[]>([]);

  const deferredSearchTerm = React.useDeferredValue(searchTerm);

  const filteredItems = React.useMemo(() => {
    if (!deferredSearchTerm) return allItems;

    return allItems.filter((item) =>
      item.name.toLowerCase().includes(deferredSearchTerm.toLowerCase())
    );
  }, [allItems, deferredSearchTerm]);

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ItemList items={filteredItems} />
    </div>
  );
}

// Deferred value in context
function DeferredContext() {
  const context = React.useContext(DataContext);
  const deferredData = React.useDeferredValue(context.data);

  const processed = React.useMemo(() => {
    return processData(deferredData);
  }, [deferredData]);

  return <div>{processed}</div>;
}

// Comparison: useDeferredValue vs useTransition
function Comparison() {
  const [value, setValue] = React.useState("");

  // useDeferredValue: defers a value
  const deferredValue = React.useDeferredValue(value);

  // useTransition: defers state updates
  const [isPending, startTransition] = React.useTransition();

  const handleChange = (newValue: string) => {
    setValue(newValue);  // Immediate

    startTransition(() => {
      processValue(newValue);  // Deferred update
    });
  };

  // Use useDeferredValue when you have a value to defer
  // Use useTransition when you control when updates happen

  return null;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          useDeferredValue defers a value, keeping UI responsive while expensive
          computations run. It accepts any type and returns the same type. Use
          with useMemo to recalculate only when the deferred value changes.
          Perfect for search/filter scenarios where input should update
          immediately but results can lag slightly.
        </InfoBox>
      </Section>

      <Section title="3. useSyncExternalStore Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useSyncExternalStore subscribes to external stores, ensuring
          consistent rendering with external state. It requires store typing,
          subscription function, and snapshot selector typing.
        </p>

        <CodeBlock title="useSyncExternalStore with TypeScript">
          {`// Basic useSyncExternalStore
interface Store<T> {
  getState: () => T;
  subscribe: (listener: () => void) => () => void;
}

function useStore<T>(store: Store<T>): T {
  return React.useSyncExternalStore(
    store.subscribe,
    store.getState
  );
}

// Typed store
interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
}

function createCounterStore(): {
  getState: () => CounterStore;
  subscribe: (listener: () => void) => () => void;
} {
  let state: CounterStore = {
    count: 0,
    increment() {
      state.count++;
      listeners.forEach((listener) => listener());
    },
    decrement() {
      state.count--;
      listeners.forEach((listener) => listener());
    },
  };

  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

// Usage
function CounterComponent() {
  const store = React.useMemo(() => createCounterStore(), []);
  const counter = useStore(store);

  return (
    <div>
      <p>Count: {counter.count}</p>
      <button onClick={counter.increment}>+</button>
      <button onClick={counter.decrement}>-</button>
    </div>
  );
}

// Selector pattern
function useStoreSelector<T, R>(
  store: Store<T>,
  selector: (state: T) => R
): R {
  return React.useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState())
  );
}

// Usage with selector
function SelectorExample() {
  const store = React.useMemo(() => createCounterStore(), []);

  // Only subscribe to count, not entire store
  const count = useStoreSelector(store, (state) => state.count);

  return <div>Count: {count}</div>;
}

// Server-side rendering support
function useStoreSSR<T>(
  store: Store<T>,
  getServerSnapshot?: () => T
): T {
  return React.useSyncExternalStore(
    store.subscribe,
    store.getState,
    getServerSnapshot
  );
}

// Usage with SSR
function SSRStoreExample() {
  const store = React.useMemo(() => createCounterStore(), []);

  const counter = useStoreSSR(store, () => ({
    count: 0,  // Server snapshot
    increment: () => {},
    decrement: () => {},
  }));

  return <div>Count: {counter.count}</div>;
}

// Redux-like store
interface AppState {
  user: User | null;
  settings: Settings;
  count: number;
}

interface AppStore {
  getState: () => AppState;
  subscribe: (listener: () => void) => () => void;
  dispatch: (action: Action) => void;
}

function useAppStore(): AppState {
  const store = React.useContext(AppStoreContext);

  return React.useSyncExternalStore(store.subscribe, store.getState);
}

// Selector for specific state slice
function useUser(): User | null {
  const store = React.useContext(AppStoreContext);

  return React.useSyncExternalStore(
    store.subscribe,
    () => store.getState().user
  );
}

function useSettings(): Settings {
  const store = React.useContext(AppStoreContext);

  return React.useSyncExternalStore(
    store.subscribe,
    () => store.getState().settings
  );
}

// Type-safe store creation
function createTypedStore<T>(
  initialState: T
): {
  getState: () => T;
  subscribe: (listener: () => void) => () => void;
  setState: (updater: (state: T) => T) => void;
} {
  let state = initialState;
  const listeners = new Set<() => void>();

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const setState = (updater: (state: T) => T) => {
    state = updater(state);
    listeners.forEach((listener) => listener());
  };

  return {
    getState: () => state,
    subscribe,
    setState,
  };
}

// Usage
function TypedStoreExample() {
  interface State {
    count: number;
    text: string;
  }

  const store = React.useMemo(
    () =>
      createTypedStore<State>({
        count: 0,
        text: "",
      }),
    []
  );

  const state = React.useSyncExternalStore(store.subscribe, store.getState);

  const increment = () => {
    store.setState((prev) => ({ ...prev, count: prev.count + 1 }));
  };

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// Subscribe to browser API
function useBrowserStore<T>(
  subscribe: (callback: () => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T
): T {
  return React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}

// Example: Media query store
function useMediaQuery(query: string): boolean {
  return useBrowserStore(
    React.useCallback(
      (callback: () => void) => {
        const mediaQuery = window.matchMedia(query);
        mediaQuery.addEventListener("change", callback);
        return () => {
          mediaQuery.removeEventListener("change", callback);
        };
      },
      [query]
    ),
    () => window.matchMedia(query).matches,
    () => false  // Server snapshot
  );
}

// Example: Online status
function useOnlineStatus(): boolean {
  return useBrowserStore(
    (callback: () => void) => {
      window.addEventListener("online", callback);
      window.addEventListener("offline", callback);
      return () => {
        window.removeEventListener("online", callback);
        window.removeEventListener("offline", callback);
      };
    },
    () => navigator.onLine,
    () => true  // Server snapshot
  );
}

// Multiple subscriptions
function useMultipleStores<T1, T2>(
  store1: Store<T1>,
  store2: Store<T2>
): [T1, T2] {
  const value1 = React.useSyncExternalStore(store1.subscribe, store1.getState);
  const value2 = React.useSyncExternalStore(store2.subscribe, store2.getState);

  return [value1, value2];
}

// Store equality check
function useStoreWithEquality<T>(
  store: Store<T>,
  selector: (state: T) => any,
  equalityFn?: (a: any, b: any) => boolean
): any {
  return React.useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    undefined,
    equalityFn  // Custom equality function
  );
}`}
        </CodeBlock>

        <InfoBox type="important">
          useSyncExternalStore subscribes to external stores with full type
          safety. Provide subscribe function (returns unsubscribe), getSnapshot
          function, and optional getServerSnapshot for SSR. Use selectors to
          subscribe to specific state slices. Perfect for Redux, Zustand, or any
          external state management.
        </InfoBox>
      </Section>

      <Section title="4. useDebugValue Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useDebugValue displays custom labels in React DevTools for custom
          hooks. It accepts a value and optional formatter function, with full
          type safety.
        </p>

        <CodeBlock title="useDebugValue with TypeScript">
          {`// Basic useDebugValue
function useCounter(initialCount: number = 0) {
  const [count, setCount] = React.useState(initialCount);

  // Display in React DevTools
  React.useDebugValue(count);

  return [count, setCount] as const;
}

// With label string
function useCounterWithLabel(initialCount: number = 0) {
  const [count, setCount] = React.useState(initialCount);

  React.useDebugValue(\`Count: \${count}\`);  // Custom label

  return [count, setCount] as const;
}

// With formatter function
function useCounterWithFormatter(initialCount: number = 0) {
  const [count, setCount] = React.useState(initialCount);

  // Formatter only runs in DevTools
  React.useDebugValue(count, (count) => \`Count: \${count.toLocaleString()}\`);

  return [count, setCount] as const;
}

// Typed formatter
function useTypedCounter(initialCount: number = 0) {
  const [count, setCount] = React.useState(initialCount);

  const formatter: (value: number) => string = (value) => {
    return \`Value: \${value}, Doubled: \${value * 2}\`;
  };

  React.useDebugValue(count, formatter);

  return [count, setCount] as const;
}

// Complex state display
function useComplexState<T>(initialState: T) {
  const [state, setState] = React.useState<T>(initialState);

  React.useDebugValue(state, (value) => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  });

  return [state, setState] as const;
}

// Multiple debug values (not supported - only one per hook)
// Use object for multiple values
function useMultipleValues() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");

  React.useDebugValue({ count, name });  // Display object

  return { count, setCount, name, setName };
}

// Conditional debug value
function useConditionalDebug(condition: boolean) {
  const [value, setValue] = React.useState(0);

  // Only show in DevTools when condition is true
  if (condition) {
    React.useDebugValue(\`Value: \${value} (enabled)\`);
  }

  return [value, setValue] as const;
}

// Async state debug
function useAsyncData<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    fetchFn()
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, [fetchFn]);

  // Debug all states
  React.useDebugValue(
    { loading, error: error?.message, hasData: !!data },
    (debug) => \`Loading: \${debug.loading}, Error: \${debug.error || "none"}, HasData: \${debug.hasData}\`
  );

  return { data, loading, error };
}

// Debug value with computed properties
function useComputedDebug(value: number) {
  const doubled = value * 2;
  const squared = value * value;

  React.useDebugValue(
    { value, doubled, squared },
    (debug) => \`v:\${debug.value} d:\${debug.doubled} s:\${debug.squared}\`
  );

  return { doubled, squared };
}

// Type-safe debug value
function useTypedDebugValue<T>(
  value: T,
  formatter?: (value: T) => string
): T {
  React.useDebugValue(value, formatter);
  return value;
}

// Note: useDebugValue only works in custom hooks
// Don't use it in regular components - it won't do anything`}
        </CodeBlock>

        <InfoBox type="tip">
          useDebugValue displays custom labels in React DevTools. Accepts a
          value (any type) and optional formatter function. Formatter only runs
          when DevTools are open. Use for debugging custom hooks, showing
          computed values, and improving DevTools experience. No runtime effect
          in production.
        </InfoBox>
      </Section>

      <Section title="5. useId Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useId generates unique IDs that are stable across server and client
          renders. It returns a string, perfect for accessibility attributes and
          form labels.
        </p>

        <CodeBlock title="useId with TypeScript">
          {`// Basic useId
function BasicId() {
  const id = React.useId();  // Returns: string

  return (
    <div>
      <label htmlFor={id}>Name</label>
      <input id={id} type="text" />
    </div>
  );
}

// Type is always string
function TypedId() {
  const id: string = React.useId();  // Explicit type (optional)

  return <div id={id}>Content</div>;
}

// Multiple IDs
function MultipleIds() {
  const nameId = React.useId();
  const emailId = React.useId();
  const passwordId = React.useId();

  return (
    <form>
      <div>
        <label htmlFor={nameId}>Name</label>
        <input id={nameId} type="text" />
      </div>
      <div>
        <label htmlFor={emailId}>Email</label>
        <input id={emailId} type="email" />
      </div>
      <div>
        <label htmlFor={passwordId}>Password</label>
        <input id={passwordId} type="password" />
      </div>
    </form>
  );
}

// ID prefix pattern
function usePrefixedId(prefix: string): string {
  const baseId = React.useId();
  return \`\${prefix}-\${baseId}\`;
}

// Usage
function PrefixedIdExample() {
  const inputId = usePrefixedId("input");
  const labelId = usePrefixedId("label");

  return (
    <div>
      <label id={labelId} htmlFor={inputId}>Name</label>
      <input id={inputId} aria-labelledby={labelId} />
    </div>
  );
}

// ID suffix pattern
function useSuffixedId(suffix: string): string {
  const baseId = React.useId();
  return \`\${baseId}-\${suffix}\`;
}

// Compound IDs
function useCompoundId(parts: string[]): string {
  const baseId = React.useId();
  return [baseId, ...parts].join("-");
}

// Usage
function CompoundIdExample() {
  const fieldId = useCompoundId(["form", "field", "name"]);

  return <input id={fieldId} />;
}

// Accessibility pattern
function AccessibleForm() {
  const nameId = React.useId();
  const nameErrorId = React.useId();

  return (
    <div>
      <label htmlFor={nameId}>Name</label>
      <input
        id={nameId}
        aria-describedby={nameErrorId}
        aria-invalid={true}
      />
      <span id={nameErrorId} role="alert">
        Name is required
      </span>
    </div>
  );
}

// Multiple related IDs
function useRelatedIds(count: number): string[] {
  const baseId = React.useId();
  return Array.from({ length: count }, (_, i) => \`\${baseId}-\${i}\`);
}

// Usage
function RelatedIdsExample() {
  const itemIds = useRelatedIds(3);

  return (
    <ul>
      {itemIds.map((id, index) => (
        <li key={id} id={id}>Item {index}</li>
      ))}
    </ul>
  );
}

// ID with context
function useContextualId(context: string): string {
  const baseId = React.useId();
  return \`\${context}-\${baseId}\`;
}

// Stable ID across renders
function StableId() {
  const id = React.useId();  // Same ID on every render

  React.useEffect(() => {
    console.log("ID:", id);  // Same ID logged on every render
  });

  return <div id={id}>Stable ID</div>;
}

// ID for list items (not recommended - use keys instead)
function ListWithIds() {
  const items = ["a", "b", "c"];
  const listId = React.useId();

  return (
    <ul id={listId}>
      {items.map((item, index) => (
        <li key={index} id={\`\${listId}-item-\${index}\`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

// Type-safe ID generator
function useTypedId(): string {
  return React.useId();
}

// ID with validation
function useValidatedId(prefix?: string): string {
  const baseId = React.useId();
  const id = prefix ? \`\${prefix}-\${baseId}\` : baseId;

  // Ensure valid HTML ID (no spaces, starts with letter)
  return id.replace(/\\s+/g, "-").replace(/^[^a-zA-Z]/, "id-");
}

// Note: useId returns strings like ":r1:", ":r2:" etc.
// These are stable and safe for SSR
// Don't use for keys in lists - use keys prop instead
// Perfect for accessibility (htmlFor, aria-describedby, etc.)`}
        </CodeBlock>

        <InfoBox type="important">
          useId returns a unique string ID stable across server and client
          renders. Use for accessibility attributes (htmlFor, aria-describedby,
          id). Perfect for form labels and accessibility relationships. Don't
          use for list keys - use the key prop instead. Type is always string.
        </InfoBox>
      </Section>
    </div>
  );
}
