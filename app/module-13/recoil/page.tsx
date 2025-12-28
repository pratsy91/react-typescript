import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function RecoilPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Recoil TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Recoil is Facebook's state management library. Typing atoms and
        selectors enables type-safe atomic state management.
      </p>

      <Section title="1. Typing Atoms">
        <p className="text-gray-700 dark:text-gray-300">
          Recoil atoms can be typed with TypeScript for type-safe state
          access and updates.
        </p>

        <CodeBlock title="Basic Typed Atoms">
          {`import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Typed primitive atom
const countState = atom<number>({
  key: 'countState',
  default: 0,
});

// Typed atom with object
interface User {
  id: string;
  name: string;
  email: string;
}

const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

// Typed atom with array
const todosState = atom<string[]>({
  key: 'todosState',
  default: [],
});

// Usage in components
function Counter() {
  const [count, setCount] = useRecoilState(countState);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Read-only atom value
function CountDisplay() {
  const count = useRecoilValue(countState);
  return <p>Count: {count}</p>;
}

// Write-only atom
function CountControls() {
  const setCount = useSetRecoilState(countState);
  return (
    <div>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Atoms with Effects">
          {`// Typed atom with localStorage effect
const persistedCountState = atom<number>({
  key: 'persistedCountState',
  default: 0,
  effects: [
    ({ setSelf, onSet }) => {
      // Load from localStorage
      const savedValue = localStorage.getItem('count');
      if (savedValue != null) {
        setSelf(Number(savedValue));
      }
      
      // Save to localStorage on change
      onSet((newValue) => {
        localStorage.setItem('count', String(newValue));
      });
    },
  ],
});

// Typed atom with async initialization
const userDataState = atom<Promise<User>>({
  key: 'userDataState',
  default: async () => {
    const response = await fetch('/api/user');
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },
});

// Typed atom with validation
const validatedInputState = atom<string>({
  key: 'validatedInputState',
  default: '',
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (newValue.length > 100) {
          console.warn('Input too long');
        }
      });
    },
  ],
});`}
        </CodeBlock>
      </Section>

      <Section title="2. Typing Selectors">
        <p className="text-gray-700 dark:text-gray-300">
          Recoil selectors can be typed for computed values and async
          operations.
        </p>

        <CodeBlock title="Typed Selectors">
          {`import { selector, useRecoilValue } from 'recoil';

// Typed read-only selector
const doubleCountState = selector<number>({
  key: 'doubleCountState',
  get: ({ get }) => {
    const count = get(countState);
    return count * 2;
  },
});

// Typed selector with multiple dependencies
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const todosState = atom<Todo[]>({
  key: 'todosState',
  default: [],
});

const filterState = atom<'all' | 'active' | 'completed'>({
  key: 'filterState',
  default: 'all',
});

const filteredTodosState = selector<Todo[]>({
  key: 'filteredTodosState',
  get: ({ get }) => {
    const todos = get(todosState);
    const filter = get(filterState);
    
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },
});

// Typed writable selector
const todoStatsState = selector<{ total: number; completed: number; active: number }>({
  key: 'todoStatsState',
  get: ({ get }) => {
    const todos = get(todosState);
    return {
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      active: todos.filter((t) => !t.completed).length,
    };
  },
  set: ({ set, get }, newValue) => {
    // Writable selector can update multiple atoms
    const todos = get(todosState);
    // Example: reset all todos
    if (newValue.total === 0) {
      set(todosState, []);
    }
  },
});

// Usage
function TodoStats() {
  const stats = useRecoilValue(todoStatsState);
  
  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Completed: {stats.completed}</p>
      <p>Active: {stats.active}</p>
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Async Selectors">
          {`// Typed async selector
const userQueryState = selector<Promise<User>>({
  key: 'userQueryState',
  get: async ({ get }) => {
    const userId = get(userIdState);
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },
});

// Typed async selector with error handling
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const asyncUserState = selector<AsyncState<User>>({
  key: 'asyncUserState',
  get: async ({ get }) => {
    const userId = get(userIdState);
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) throw new Error('Failed to fetch');
      const user: User = await response.json();
      return { data: user, loading: false, error: null };
    } catch (error) {
      return {
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      };
    }
  },
});

// Typed selector with parameters using selectorFamily
import { selectorFamily } from 'recoil';

const userByIdState = selectorFamily<User, string>({
  key: 'userByIdState',
  get: (userId: string) => async () => {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },
});

// Usage
function UserProfile({ userId }: { userId: string }) {
  const user = useRecoilValue(userByIdState(userId));
  return <div>{user.name}</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Selector Families">
          {`// Typed selector family
const itemState = selectorFamily<Item, string>({
  key: 'itemState',
  get: (id: string) => async () => {
    const response = await fetch(\`/api/items/\${id}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },
});

// Typed selector family with object parameter
interface ItemParams {
  id: string;
  category: string;
}

const categoryItemState = selectorFamily<Item, ItemParams>({
  key: 'categoryItemState',
  get: (params: ItemParams) => async () => {
    const response = await fetch(
      \`/api/items/\${params.id}?category=\${params.category}\`
    );
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },
});

// Typed selector family with multiple parameters
const multiParamState = selectorFamily<
  Result,
  { id: string; filter: string }
>({
  key: 'multiParamState',
  get: (params) => async () => {
    const response = await fetch(
      \`/api/data/\${params.id}?filter=\${params.filter}\`
    );
    return response.json();
  },
});

// Usage
function ItemList() {
  const item1 = useRecoilValue(itemState('item1'));
  const item2 = useRecoilValue(itemState('item2'));
  
  return (
    <div>
      <div>{item1.name}</div>
      <div>{item2.name}</div>
    </div>
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Advanced Recoil Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns including atom families, typed hooks, and
          state persistence.
        </p>

        <CodeBlock title="Typed Atom Families">
          {`import { atomFamily } from 'recoil';

// Typed atom family
const counterStateFamily = atomFamily<number, string>({
  key: 'counterStateFamily',
  default: 0,
});

// Typed atom family with parameter
const todoStateFamily = atomFamily<Todo, string>({
  key: 'todoStateFamily',
  default: (id: string) => ({
    id,
    text: '',
    completed: false,
  }),
});

// Typed atom family with async default
const userStateFamily = atomFamily<User, string>({
  key: 'userStateFamily',
  default: async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  },
});

// Usage
function CounterGroup() {
  const [count1, setCount1] = useRecoilState(counterStateFamily('counter1'));
  const [count2, setCount2] = useRecoilState(counterStateFamily('counter2'));
  
  return (
    <div>
      <div>
        Counter 1: {count1}
        <button onClick={() => setCount1(count1 + 1)}>+</button>
      </div>
      <div>
        Counter 2: {count2}
        <button onClick={() => setCount2(count2 + 1)}>+</button>
      </div>
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Custom Hooks">
          {`// Typed custom hook for user state
function useUserState() {
  const user = useRecoilValue(userState);
  const setUser = useSetRecoilState(userState);
  
  return {
    user,
    setUser,
    isAuthenticated: user !== null,
  };
}

// Typed custom hook with selector
function useTodoStats() {
  const stats = useRecoilValue(todoStatsState);
  const todos = useRecoilValue(todosState);
  
  return {
    ...stats,
    completionRate: stats.total > 0 ? stats.completed / stats.total : 0,
    hasTodos: todos.length > 0,
  };
}

// Typed custom hook with async selector
function useUserData(userId: string) {
  const user = useRecoilValue(userByIdState(userId));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
  }, [userId]);
  
  return { user, loading, error };
}

// Usage
function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUserData(userId);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;
  
  return <div>{user.name}</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Typed RecoilRoot and Providers">
          {`import { RecoilRoot } from 'recoil';

// Typed RecoilRoot with initial state
const initializer = (mutableSnapshot: MutableSnapshot) => {
  mutableSnapshot.set(countState, 10);
  mutableSnapshot.set(userState, { id: '1', name: 'John', email: 'john@example.com' });
};

function App() {
  return (
    <RecoilRoot initializeState={initializer}>
      <Counter />
      <UserProfile />
    </RecoilRoot>
  );
}

// Typed state persistence
import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';

function StatePersistence() {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    const state: Record<string, unknown> = {};
    for (const node of snapshot.getNodes_UNSTABLE()) {
      state[node.key] = snapshot.getLoadable(node).contents;
    }
    localStorage.setItem('recoil-state', JSON.stringify(state));
  });
  
  return null;
}

// Typed state restoration
function StateRestoration() {
  useEffect(() => {
    const saved = localStorage.getItem('recoil-state');
    if (saved) {
      const state = JSON.parse(saved);
      // Restore state
    }
  }, []);
  
  return null;
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Atoms are typed with TypeScript generics</li>
          <li>Selectors provide typed computed values</li>
          <li>Selector families enable parameterized selectors</li>
          <li>Atom families support parameterized atoms</li>
          <li>Async selectors support Promise types</li>
          <li>Custom hooks can encapsulate Recoil logic with types</li>
        </ul>
      </InfoBox>
    </div>
  );
}

