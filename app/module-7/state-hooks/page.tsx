import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function StateHooksPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        State Management Hooks
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        useState and useReducer provide type-safe state management in React.
        Understanding their TypeScript patterns enables robust state typing with
        inference, generics, and discriminated unions.
      </p>

      <Section title="1. useState Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useState can infer types automatically or accept explicit generic
          types. Understanding type inference, function updaters, and lazy
          initialization enables precise state typing.
        </p>

        <CodeBlock title="useState type inference and explicit typing">
          {`// Type inference from initial value
function Counter() {
  // Inferred as: const [count, setCount] = useState<number>(0)
  const [count, setCount] = React.useState(0);

  // Inferred as: const [name, setName] = useState<string>("")
  const [name, setName] = React.useState("");

  // Inferred as: const [items, setItems] = useState<number[]>([])
  const [items, setItems] = React.useState([]);  // Type: never[] ❌

  // Explicit typing for empty arrays
  const [items2, setItems2] = React.useState<number[]>([]);  // ✓

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

// Explicit generic typing
function TypedCounter() {
  const [count, setCount] = React.useState<number>(0);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<User | null>(null);

  return null;
}

// Union type state
function Toggle() {
  // State can be one of multiple types
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleClick = () => {
    setStatus("loading");
    // TypeScript ensures only valid values
    // setStatus("invalid");  // ✗ Error
  };

  return <div>Status: {status}</div>;
}

// Complex object state
interface User {
  id: number;
  name: string;
  email: string;
}

function UserForm() {
  const [user, setUser] = React.useState<User>({
    id: 0,
    name: "",
    email: "",
  });

  // Partial updates with function updater
  const updateName = (name: string) => {
    setUser((prev) => ({ ...prev, name }));  // Type-safe
  };

  // Direct object update
  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return null;
}

// Function updater with type inference
function CounterWithUpdater() {
  const [count, setCount] = React.useState(0);

  // Function updater receives previous state
  const increment = () => {
    setCount((prev) => prev + 1);  // prev is inferred as number
  };

  const double = () => {
    setCount((prev) => prev * 2);
  };

  // Type-safe with conditional logic
  const reset = () => {
    setCount((prev) => (prev > 10 ? 0 : prev));
  };

  return <button onClick={increment}>Count: {count}</button>;
}

// Lazy initialization with function
function LazyInitialization({ initialCount }: { initialCount: number }) {
  // Lazy init: function runs only on first render
  const [count, setCount] = React.useState(() => {
    console.log("Computing initial state");
    return initialCount * 2;
  });

  // Type inference from return value
  const [expensive, setExpensive] = React.useState(() => {
    const data = new Array(1000).fill(0).map((_, i) => i);
    return data;  // Inferred as number[]
  });

  return null;
}

// Nullable state
function NullableState() {
  // State can be null or User
  const [user, setUser] = React.useState<User | null>(null);

  const loadUser = async () => {
    const data = await fetchUser();
    setUser(data);  // Type-safe
  };

  // Type narrowing required
  if (user) {
    console.log(user.name);  // TypeScript knows user is User
  }

  return null;
}

// State with discriminated union
type LoadingState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: Error };

function DataLoader() {
  const [state, setState] = React.useState<LoadingState>({ status: "idle" });

  const loadData = async () => {
    setState({ status: "loading" });

    try {
      const data = await fetchUsers();
      setState({ status: "success", data });  // Type-safe
    } catch (error) {
      setState({ status: "error", error: error as Error });
    }
  };

  // Type narrowing works perfectly
  if (state.status === "success") {
    return <div>{state.data.map(u => u.name).join(", ")}</div>;  // data available
  }

  if (state.status === "error") {
    return <div>Error: {state.error.message}</div>;  // error available
  }

  return null;
}

// Array state with type-safe updates
function TodoList() {
  interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  const [todos, setTodos] = React.useState<Todo[]>([]);

  const addTodo = (text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return null;
}

// Map/Set state
function MapState() {
  const [items, setItems] = React.useState<Map<string, number>>(new Map());

  const increment = (key: string) => {
    setItems((prev) => {
      const next = new Map(prev);
      next.set(key, (next.get(key) || 0) + 1);
      return next;
    });
  };

  return null;
}

// Generic state hook
function useTypedState<T>(initial: T) {
  return React.useState<T>(initial);
}

// Usage
function GenericUsage() {
  const [count, setCount] = useTypedState(0);  // number
  const [name, setName] = useTypedState("");  // string

  return null;
}

// Multiple state values
function MultipleState() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  const [email, setEmail] = React.useState("");

  // Or use single object
  interface FormState {
    name: string;
    age: number;
    email: string;
  }

  const [form, setForm] = React.useState<FormState>({
    name: "",
    age: 0,
    email: "",
  });

  return null;
}

// State with readonly properties
interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
  readonly email: string;
}

function ReadonlyState() {
  const [user, setUser] = React.useState<ReadonlyUser>({
    id: 1,
    name: "John",
    email: "john@example.com",
  });

  // Still mutable through setter (new object)
  setUser((prev) => ({ ...prev, name: "Jane" }));  // ✓ OK

  return null;
}

// Conditional state types
function ConditionalState<T extends boolean>(props: { useObject: T }) {
  type StateType = T extends true ? { value: number } : number;

  const [state, setState] = React.useState<StateType>(
    (props.useObject ? { value: 0 } : 0) as StateType
  );

  return null;
}`}
        </CodeBlock>

        <InfoBox type="info">
          useState infers types from initial values. Use explicit generics for
          empty arrays, nullable states, and union types. Function updaters
          provide type-safe state transitions with access to previous state.
          Lazy initialization improves performance for expensive initial
          computations.
        </InfoBox>
      </Section>

      <Section title="2. useReducer Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useReducer provides complex state management with type-safe actions,
          discriminated unions, and reducer type inference. Perfect for complex
          state logic and predictable state updates.
        </p>

        <CodeBlock title="useReducer with TypeScript">
          {`// Basic useReducer with typed action
interface CounterState {
  count: number;
}

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "add"; payload: number };

function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    case "add":
      return { count: state.count + action.payload };  // payload available
    default:
      // Exhaustiveness check
      const _exhaustive: never = action;
      return state;
  }
}

function Counter() {
  const [state, dispatch] = React.useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "add", payload: 5 })}>+5</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

// Discriminated union actions (recommended pattern)
type TodoAction =
  | { type: "ADD_TODO"; payload: { text: string } }
  | { type: "TOGGLE_TODO"; payload: { id: number } }
  | { type: "DELETE_TODO"; payload: { id: number } }
  | { type: "CLEAR_COMPLETED" }
  | { type: "SET_FILTER"; payload: "all" | "active" | "completed" };

interface TodoState {
  todos: Array<{ id: number; text: string; completed: boolean }>;
  filter: "all" | "active" | "completed";
}

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload.text,  // Type-safe access
            completed: false,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,  // Type-safe
      };

    default:
      const _exhaustive: never = action;
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = React.useReducer(todoReducer, {
    todos: [],
    filter: "all",
  });

  const addTodo = (text: string) => {
    dispatch({ type: "ADD_TODO", payload: { text } });
  };

  return null;
}

// Action creators with type safety
type ActionCreator<A> = A extends { type: infer T; payload: infer P }
  ? P extends undefined
    ? () => { type: T }
    : (payload: P) => { type: T; payload: P }
  : never;

// Helper to create typed action creators
function createActionCreators<A>() {
  return {} as {
    [K in A as K extends { type: infer T }
      ? T extends string
        ? T
        : never
      : never]: K extends { payload: infer P }
      ? P extends undefined
        ? () => { type: K["type"] }
        : (payload: P) => { type: K["type"]; payload: P }
      : never;
  };
}

// Reducer type inference
type Reducer<S, A> = (state: S, action: A) => S;

function useTypedReducer<S, A>(
  reducer: Reducer<S, A>,
  initialState: S
): [S, React.Dispatch<A>] {
  return React.useReducer(reducer, initialState);
}

// Usage
function TypedReducer() {
  const [state, dispatch] = useTypedReducer(counterReducer, { count: 0 });

  // dispatch is fully typed
  dispatch({ type: "increment" });
  dispatch({ type: "add", payload: 10 });
  // dispatch({ type: "invalid" });  // ✗ Error

  return null;
}

// Lazy initialization with useReducer
function LazyReducer() {
  const [state, dispatch] = React.useReducer(
    counterReducer,
    { count: 0 },
    (initial) => ({ ...initial, count: 100 })  // Initialize function
  );

  return null;
}

// Complex state with nested updates
interface AppState {
  user: { name: string; email: string } | null;
  settings: { theme: "light" | "dark"; notifications: boolean };
  ui: { sidebarOpen: boolean; modalOpen: boolean };
}

type AppAction =
  | { type: "SET_USER"; payload: { name: string; email: string } }
  | { type: "CLEAR_USER" }
  | { type: "TOGGLE_THEME" }
  | { type: "TOGGLE_NOTIFICATIONS" }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    case "TOGGLE_THEME":
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: state.settings.theme === "light" ? "dark" : "light",
        },
      };
    case "TOGGLE_NOTIFICATIONS":
      return {
        ...state,
        settings: {
          ...state.settings,
          notifications: !state.settings.notifications,
        },
      };
    case "TOGGLE_SIDEBAR":
      return { ...state, ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen } };
    case "OPEN_MODAL":
      return { ...state, ui: { ...state.ui, modalOpen: true } };
    case "CLOSE_MODAL":
      return { ...state, ui: { ...state.ui, modalOpen: false } };
    default:
      const _exhaustive: never = action;
      return state;
  }
}

// Async actions pattern
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

type AsyncAction<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: Error };

function asyncReducer<T>(
  state: AsyncState<T>,
  action: AsyncAction<T>
): AsyncState<T> {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { data: null, loading: false, error: action.payload };
    default:
      const _exhaustive: never = action;
      return state;
  }
}

function useAsyncData<T>() {
  return React.useReducer(asyncReducer<T>, {
    data: null,
    loading: false,
    error: null,
  });
}

// Generic reducer hook
function useGenericReducer<S, A extends { type: string }>(
  reducer: (state: S, action: A) => S,
  initialState: S
) {
  return React.useReducer(reducer, initialState);
}

// Usage with type inference
function GenericReducerUsage() {
  const [state, dispatch] = useGenericReducer(counterReducer, { count: 0 });

  // Types are fully inferred
  dispatch({ type: "increment" });

  return null;
}

// Reducer with thunks (using action creators)
type ThunkAction<S, A> = (
  dispatch: React.Dispatch<A>,
  getState: () => S
) => void;

function useThunkReducer<S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S
): [S, React.Dispatch<A | ThunkAction<S, A>>] {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const thunkDispatch = React.useCallback(
    (action: A | ThunkAction<S, A>) => {
      if (typeof action === "function") {
        action(dispatch, () => state);
      } else {
        dispatch(action);
      }
    },
    [state]
  );

  return [state, thunkDispatch];
}

// Middleware pattern
type Middleware<S, A> = (
  state: S,
  action: A,
  next: (action: A) => S
) => S;

function useReducerWithMiddleware<S, A>(
  reducer: (state: S, action: A) => S,
  initialState: S,
  middlewares: Middleware<S, A>[]
): [S, React.Dispatch<A>] {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const enhancedDispatch = React.useCallback(
    (action: A) => {
      let newState = state;

      const chain = middlewares.reduceRight(
        (acc, middleware) => (action) => middleware(state, action, acc),
        reducer
      );

      newState = chain(action);
      if (newState !== state) {
        dispatch(action);
      }
    },
    [state, middlewares, reducer]
  );

  return [state, enhancedDispatch];
}`}
        </CodeBlock>

        <InfoBox type="important">
          Use discriminated union actions for type-safe reducers. Each action
          has a \`type\` field that TypeScript narrows in switch statements. Use
          exhaustiveness checking (never type) to ensure all actions are
          handled. Action creators and generic hooks provide reusable, type-safe
          patterns.
        </InfoBox>
      </Section>

      <Section title="3. useState vs useReducer Comparison">
        <p className="text-gray-700 dark:text-gray-300">
          Understanding when to use useState vs useReducer helps choose the
          right state management approach. Both are fully type-safe with
          TypeScript.
        </p>

        <CodeBlock title="Choosing between useState and useReducer">
          {`// useState: Simple state, independent updates
function SimpleForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [age, setAge] = React.useState(0);

  // Each state is independent
  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
    </form>
  );
}

// useReducer: Complex state with interdependent updates
function ComplexForm() {
  type FormState = {
    name: string;
    email: string;
    age: number;
    errors: Record<string, string>;
  };

  type FormAction =
    | { type: "SET_NAME"; payload: string }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_AGE"; payload: number }
    | { type: "VALIDATE" }
    | { type: "RESET" };

  function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
      case "SET_NAME":
        return {
          ...state,
          name: action.payload,
          errors: { ...state.errors, name: "" },  // Clear error
        };
      case "SET_EMAIL":
        return {
          ...state,
          email: action.payload,
          errors: { ...state.errors, email: "" },
        };
      case "VALIDATE":
        const errors: Record<string, string> = {};
        if (!state.name) errors.name = "Name required";
        if (!state.email.includes("@")) errors.email = "Invalid email";
        if (state.age < 0) errors.age = "Age must be positive";
        return { ...state, errors };
      case "RESET":
        return { name: "", email: "", age: 0, errors: {} };
      default:
        return state;
    }
  }

  const [state, dispatch] = React.useReducer(formReducer, {
    name: "",
    email: "",
    age: 0,
    errors: {},
  });

  return (
    <form>
      <input
        value={state.name}
        onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
      />
      {state.errors.name && <span>{state.errors.name}</span>}
      {/* ... */}
    </form>
  );
}

// Recommendation:
// - Use useState for: simple state, independent values, straightforward updates
// - Use useReducer for: complex state, related values, predictable updates, testable logic

// Type-safe patterns for both
function StatePatterns() {
  // Pattern 1: Multiple useState (good for unrelated state)
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");

  // Pattern 2: Single useState with object (good for related state)
  const [form, setForm] = React.useState({ count: 0, name: "" });

  // Pattern 3: useReducer (best for complex logic)
  type State = { count: number; name: string };
  type Action = { type: "SET_COUNT"; payload: number } | { type: "SET_NAME"; payload: string };
  const [state, dispatch] = React.useReducer(
    (s: State, a: Action) => {
      switch (a.type) {
        case "SET_COUNT":
          return { ...s, count: a.payload };
        case "SET_NAME":
          return { ...s, name: a.payload };
        default:
          return s;
      }
    },
    { count: 0, name: "" }
  );

  return null;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Choose useState for simple, independent state. Use useReducer for
          complex state with interdependent updates, predictable logic, and
          easier testing. Both provide full TypeScript type safety when used
          correctly.
        </InfoBox>
      </Section>
    </div>
  );
}
