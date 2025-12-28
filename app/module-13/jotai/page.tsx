import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function JotaiPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Jotai TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Jotai is an atomic state management library. Typing atoms and atom
        families enables type-safe atomic state management.
      </p>

      <Section title="1. Typing Atoms">
        <p className="text-gray-700 dark:text-gray-300">
          Atoms in Jotai can be typed with TypeScript for type-safe state
          access and updates.
        </p>

        <CodeBlock title="Basic Typed Atoms">
          {`import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

// Typed primitive atom
const countAtom = atom<number>(0);

// Typed atom with object
interface User {
  id: string;
  name: string;
  email: string;
}

const userAtom = atom<User | null>(null);

// Typed atom with array
const todosAtom = atom<string[]>([]);

// Usage in components
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Read-only atom value
function CountDisplay() {
  const count = useAtomValue(countAtom);
  return <p>Count: {count}</p>;
}

// Write-only atom
function CountControls() {
  const setCount = useSetAtom(countAtom);
  return (
    <div>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Derived Typed Atoms">
          {`// Typed derived atom (read-only)
const doubleCountAtom = atom<number>((get) => {
  const count = get(countAtom);
  return count * 2;
});

// Typed derived atom with multiple dependencies
interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const todosAtom = atom<Todo[]>([]);
const filterAtom = atom<'all' | 'active' | 'completed'>('all');

const filteredTodosAtom = atom<Todo[]>((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);
  
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
});

// Typed writable derived atom
const toggleTodoAtom = atom(
  null,
  (get, set, id: string) => {
    const todos = get(todosAtom);
    set(
      todosAtom,
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
);

// Usage
function TodoList() {
  const todos = useAtomValue(filteredTodosAtom);
  const toggleTodo = useSetAtom(toggleTodoAtom);
  
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
        </div>
      ))}
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Async Typed Atoms">
          {`// Typed async atom
const userDataAtom = atom<Promise<User>>(async () => {
  const response = await fetch('/api/user');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
});

// Typed async atom with parameters
const fetchUserAtom = atom(
  null,
  async (get, set, userId: string): Promise<User> => {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    const user: User = await response.json();
    return user;
  }
);

// Typed atom with loading state
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const asyncUserAtom = atom<AsyncState<User>>({
  data: null,
  loading: false,
  error: null,
});

const fetchUserActionAtom = atom(
  null,
  async (get, set, userId: string) => {
    set(asyncUserAtom, { data: null, loading: true, error: null });
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) throw new Error('Failed to fetch');
      const user: User = await response.json();
      set(asyncUserAtom, { data: user, loading: false, error: null });
    } catch (error) {
      set(asyncUserAtom, {
        data: null,
        loading: false,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  }
);

// Usage
function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error } = useAtomValue(asyncUserAtom);
  const fetchUser = useSetAtom(fetchUserActionAtom);
  
  useEffect(() => {
    fetchUser(userId);
  }, [userId, fetchUser]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;
  
  return <div>{user.name}</div>;
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Typing Atom Families">
        <p className="text-gray-700 dark:text-gray-300">
          Atom families allow creating multiple atoms with the same structure
          but different parameters.
        </p>

        <CodeBlock title="Typed Atom Families">
          {`import { atomFamily } from 'jotai/utils';

// Typed atom family with string parameter
const todoAtomFamily = atomFamily((id: string) =>
  atom<Todo | null>(null)
);

// Typed atom family with object parameter
interface TodoParams {
  id: string;
  category: string;
}

const categoryTodoAtomFamily = atomFamily(
  (params: TodoParams) =>
    atom<Todo | null>(null)
);

// Typed atom family with computed initial value
const userAtomFamily = atomFamily((userId: string) =>
  atom(async (): Promise<User> => {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  })
);

// Usage
function TodoItem({ id }: { id: string }) {
  const [todo, setTodo] = useAtom(todoAtomFamily(id));
  
  if (!todo) return null;
  
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) =>
          setTodo({ ...todo, completed: e.target.checked })
        }
      />
      {todo.text}
    </div>
  );
}

// Typed atom family with reset
const counterAtomFamily = atomFamily((key: string) =>
  atom<number>(0)
);

function CounterGroup() {
  const [count1, setCount1] = useAtom(counterAtomFamily('counter1'));
  const [count2, setCount2] = useAtom(counterAtomFamily('counter2'));
  
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

        <CodeBlock title="Advanced Typed Atom Families">
          {`// Typed atom family with validation
const validatedAtomFamily = atomFamily(
  (key: string) =>
    atom<string>('', (get, set, newValue: string) => {
      if (newValue.length > 100) {
        throw new Error('Value too long');
      }
      set(validatedAtomFamily(key), newValue);
    })
);

// Typed atom family with dependencies
const derivedAtomFamily = atomFamily((id: string) =>
  atom((get) => {
    const baseValue = get(baseAtom);
    const item = get(itemAtomFamily(id));
    return { baseValue, item };
  })
);

// Typed atom family with async initialization
interface AsyncItem {
  id: string;
  data: unknown;
}

const asyncItemAtomFamily = atomFamily((id: string) =>
  atom<Promise<AsyncItem>>(async () => {
    const response = await fetch(\`/api/items/\${id}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  })
);

// Typed atom family with reset functionality
import { RESET } from 'jotai/utils';

const resettableAtomFamily = atomFamily((key: string) =>
  atom<number>(0)
);

function ResettableCounter({ key }: { key: string }) {
  const [count, setCount] = useAtom(resettableAtomFamily(key));
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(RESET)}>Reset</button>
    </div>
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Advanced Jotai Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns including atom storage, splitting atoms, and
          typed providers.
        </p>

        <CodeBlock title="Typed Atom Storage">
          {`import { atomWithStorage } from 'jotai/utils';

// Typed atom with localStorage
const persistedCountAtom = atomWithStorage<number>('count', 0);

// Typed atom with sessionStorage
const sessionDataAtom = atomWithStorage<{ token: string }>(
  'session',
  { token: '' },
  {
    getItem: (key) => {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    },
    setItem: (key, value) => {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
      sessionStorage.removeItem(key);
    },
  }
);

// Typed atom with custom storage
interface CustomStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

const customStorageAtom = atomWithStorage<User>(
  'user',
  null,
  {
    getItem: (key, initialValue) => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
  }
);`}
        </CodeBlock>

        <CodeBlock title="Typed Atom Splitting">
          {`import { splitAtom } from 'jotai/utils';

// Split array atom into individual atoms
const todosAtom = atom<Todo[]>([]);
const todoAtomsAtom = splitAtom(todosAtom);

// Usage with split atoms
function TodoList() {
  const todoAtoms = useAtomValue(todoAtomsAtom);
  
  return (
    <div>
      {todoAtoms.map((todoAtom) => (
        <TodoItem key={todoAtom.toString()} todoAtom={todoAtom} />
      ))}
    </div>
  );
}

function TodoItem({ todoAtom }: { todoAtom: PrimitiveAtom<Todo> }) {
  const [todo, setTodo] = useAtom(todoAtom);
  
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) =>
          setTodo({ ...todo, completed: e.target.checked })
        }
      />
      {todo.text}
    </div>
  );
}

// Typed atom with focus
import { focusAtom } from 'jotai/utils';

const userAtom = atom<User | null>(null);
const userNameAtom = focusAtom(userAtom, (user) => user?.name ?? '');

function UserName() {
  const [name, setName] = useAtom(userNameAtom);
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Provider Pattern">
          {`import { Provider, useAtomValue } from 'jotai';
import { createStore } from 'jotai';

// Create typed store
const store = createStore();

// Set initial values
store.set(countAtom, 10);
store.set(userAtom, { id: '1', name: 'John', email: 'john@example.com' });

// Typed provider with store
function App() {
  return (
    <Provider store={store}>
      <Counter />
      <UserProfile />
    </Provider>
  );
}

// Typed store subscription
store.sub(countAtom, () => {
  const count = store.get(countAtom);
  console.log('Count changed to:', count);
});

// Typed store with multiple providers
const store1 = createStore();
const store2 = createStore();

function MultiProviderApp() {
  return (
    <div>
      <Provider store={store1}>
        <Counter /> {/* Uses store1 */}
      </Provider>
      <Provider store={store2}>
        <Counter /> {/* Uses store2 */}
      </Provider>
    </div>
  );
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Atoms are typed with TypeScript generics</li>
          <li>Derived atoms infer types from their dependencies</li>
          <li>Atom families enable parameterized atom creation</li>
          <li>Async atoms support Promise types</li>
          <li>Storage atoms work with typed persistence</li>
          <li>Atom splitting enables granular updates</li>
        </ul>
      </InfoBox>
    </div>
  );
}

