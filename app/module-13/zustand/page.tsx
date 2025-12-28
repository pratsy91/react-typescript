import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ZustandPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Zustand TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Zustand is a lightweight state management library with excellent
        TypeScript support. Typing stores, selectors, and actions enables
        fully type-safe state management.
      </p>

      <Section title="1. Typing Stores">
        <p className="text-gray-700 dark:text-gray-300">
          Zustand stores can be fully typed with interfaces for state and
          actions.
        </p>

        <CodeBlock title="Basic Typed Store">
          {`import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Define store state interface
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (amount: number) => void;
}

// Create typed store
const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
}));

// Usage in component
function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Complex Typed Store with Nested State">
          {`interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UserStoreState {
  // State
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  filters: {
    role: User['role'] | 'all';
    search: string;
  };
  
  // Actions
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: string, changes: Partial<User>) => void;
  removeUser: (id: string) => void;
  selectUser: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setFilter: (filter: Partial<UserStoreState['filters']>) => void;
  reset: () => void;
}

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  filters: {
    role: 'all' as const,
    search: '',
  },
};

const useUserStore = create<UserStoreState>()((set) => ({
  ...initialState,
  
  setUsers: (users) => set({ users }),
  
  addUser: (user) => set((state) => ({
    users: [...state.users, user],
  })),
  
  updateUser: (id, changes) => set((state) => ({
    users: state.users.map((user) =>
      user.id === id ? { ...user, ...changes } : user
    ),
    selectedUser: state.selectedUser?.id === id
      ? { ...state.selectedUser, ...changes }
      : state.selectedUser,
  })),
  
  removeUser: (id) => set((state) => ({
    users: state.users.filter((user) => user.id !== id),
    selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
  })),
  
  selectUser: (id) => set((state) => ({
    selectedUser: id
      ? state.users.find((user) => user.id === id) || null
      : null,
  })),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),
  
  setFilter: (filter) => set((state) => ({
    filters: { ...state.filters, ...filter },
  })),
  
  reset: () => set(initialState),
}));`}
        </CodeBlock>

        <CodeBlock title="Typed Store with Middleware">
          {`import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoStoreState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setFilter: (filter: TodoStoreState['filter']) => void;
  clearCompleted: () => void;
}

// Typed store with middleware
const useTodoStore = create<TodoStoreState>()(
  devtools(
    persist(
      subscribeWithSelector((set) => ({
        todos: [],
        filter: 'all',
        
        addTodo: (text) => set((state) => ({
          todos: [
            ...state.todos,
            {
              id: Date.now().toString(),
              text,
              completed: false,
              createdAt: Date.now(),
            },
          ],
        })),
        
        toggleTodo: (id) => set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
        
        removeTodo: (id) => set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
        
        setFilter: (filter) => set({ filter }),
        
        clearCompleted: () => set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
      })),
      {
        name: 'todo-storage',
        partialize: (state) => ({ todos: state.todos }), // Only persist todos
      }
    ),
    { name: 'TodoStore' }
  )
);`}
        </CodeBlock>
      </Section>

      <Section title="2. Typing Selectors">
        <p className="text-gray-700 dark:text-gray-300">
          Zustand selectors can be typed for type-safe state access and
          computed values.
        </p>

        <CodeBlock title="Typed Selectors">
          {`// Typed selector functions
const selectCount = (state: CounterState) => state.count;
const selectIncrement = (state: CounterState) => state.increment;

// Usage with typed selectors
function CounterDisplay() {
  const count = useCounterStore(selectCount);
  const increment = useCounterStore(selectIncrement);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// Computed selectors with types
const selectDoubleCount = (state: CounterState) => state.count * 2;
const selectIsEven = (state: CounterState) => state.count % 2 === 0;

function AdvancedCounter() {
  const count = useCounterStore(selectCount);
  const doubleCount = useCounterStore(selectDoubleCount);
  const isEven = useCounterStore(selectIsEven);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <p>Is Even: {isEven ? 'Yes' : 'No'}</p>
    </div>
  );
}

// Typed selector with multiple values
const selectUserData = (state: UserStoreState) => ({
  users: state.users,
  selectedUser: state.selectedUser,
  loading: state.loading,
});

function UserList() {
  const { users, selectedUser, loading } = useUserStore(selectUserData);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} {selectedUser?.id === user.id && '(Selected)'}
        </div>
      ))}
    </div>
  );
}

// Typed filtered selector
const selectFilteredUsers = (state: UserStoreState) => {
  const { users, filters } = state;
  let filtered = users;
  
  if (filters.role !== 'all') {
    filtered = filtered.filter((user) => user.role === filters.role);
  }
  
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    );
  }
  
  return filtered;
};

function FilteredUserList() {
  const filteredUsers = useUserStore(selectFilteredUsers);
  const setFilter = useUserStore((state) => state.setFilter);
  
  return (
    <div>
      <input
        onChange={(e) => setFilter({ search: e.target.value })}
        placeholder="Search users..."
      />
      {filteredUsers.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Selector with Equality Function">
          {`import { shallow } from 'zustand/shallow';

// Typed shallow comparison for object selectors
function UserStats() {
  // Without shallow, this would cause re-renders on any state change
  const { users, loading, error } = useUserStore(
    (state) => ({
      users: state.users,
      loading: state.loading,
      error: state.error,
    }),
    shallow
  );
  
  return (
    <div>
      <p>Total Users: {users.length}</p>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

// Custom equality function with types
const customEquals = <T,>(a: T, b: T): boolean => {
  // Custom comparison logic
  return JSON.stringify(a) === JSON.stringify(b);
};

function UserListWithCustomEquality() {
  const users = useUserStore(
    (state) => state.users,
    customEquals
  );
  
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Typing Actions">
        <p className="text-gray-700 dark:text-gray-300">
          Actions in Zustand can be typed with parameters and return values
          for type-safe state updates.
        </p>

        <CodeBlock title="Typed Actions">
          {`// Typed actions with parameters
interface ProductStoreState {
  products: Product[];
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  productId: string;
  quantity: number;
}

const useProductStore = create<ProductStoreState>()((set, get) => ({
  products: [],
  cart: [],
  
  addToCart: (productId, quantity) => {
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.productId === productId
      );
      
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      
      return {
        cart: [...state.cart, { productId, quantity }],
      };
    });
  },
  
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    }));
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    
    set((state) => ({
      cart: state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));
  },
  
  clearCart: () => set({ cart: [] }),
  
  getTotalPrice: () => {
    const state = get();
    return state.cart.reduce((total, item) => {
      const product = state.products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  },
}));

// Typed async actions
interface AsyncStoreState {
  data: Data | null;
  loading: boolean;
  error: Error | null;
  fetchData: (id: string) => Promise<void>;
  reset: () => void;
}

const useAsyncStore = create<AsyncStoreState>()((set) => ({
  data: null,
  loading: false,
  error: null,
  
  fetchData: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(\`/api/data/\${id}\`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data: Data = await response.json();
      set({ data, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Unknown error'),
        loading: false,
      });
    }
  },
  
  reset: () => set({ data: null, loading: false, error: null }),
}));`}
        </CodeBlock>

        <CodeBlock title="Typed Actions with Immer">
          {`import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ComplexState {
  nested: {
    items: Array<{ id: string; value: number }>;
    metadata: {
      total: number;
      lastUpdated: number | null;
    };
  };
  addItem: (item: { id: string; value: number }) => void;
  updateItem: (id: string, value: number) => void;
  removeItem: (id: string) => void;
}

// Typed store with Immer middleware for immutable updates
const useComplexStore = create<ComplexState>()(
  immer((set) => ({
    nested: {
      items: [],
      metadata: {
        total: 0,
        lastUpdated: null,
      },
    },
    
    addItem: (item) =>
      set((state) => {
        // Direct mutation with Immer
        state.nested.items.push(item);
        state.nested.metadata.total += 1;
        state.nested.metadata.lastUpdated = Date.now();
      }),
    
    updateItem: (id, value) =>
      set((state) => {
        const item = state.nested.items.find((i) => i.id === id);
        if (item) {
          item.value = value;
          state.nested.metadata.lastUpdated = Date.now();
        }
      }),
    
    removeItem: (id) =>
      set((state) => {
        state.nested.items = state.nested.items.filter((i) => i.id !== id);
        state.nested.metadata.total -= 1;
        state.nested.metadata.lastUpdated = Date.now();
      }),
  }))
);`}
        </CodeBlock>
      </Section>

      <Section title="4. Advanced Zustand Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns including store composition, typed subscriptions,
          and store slices.
        </p>

        <CodeBlock title="Store Composition and Slices">
          {`// Typed store slice pattern
interface SliceState {
  value: number;
  setValue: (value: number) => void;
}

const createSlice = (): SliceState => ({
  value: 0,
  setValue: (value) => ({ value }),
});

// Compose multiple slices
interface CombinedStoreState {
  counter: SliceState;
  user: UserStoreState;
  todos: TodoStoreState;
}

const useCombinedStore = create<CombinedStoreState>()((set, get) => ({
  counter: {
    ...createSlice(),
    setValue: (value) =>
      set((state) => ({
        counter: { ...state.counter, value },
      })),
  },
  user: {
    ...initialUserState,
    setUsers: (users) =>
      set((state) => ({
        user: { ...state.user, users },
      })),
  },
  todos: {
    ...initialTodoState,
    addTodo: (text) =>
      set((state) => ({
        todos: {
          ...state.todos,
          todos: [
            ...state.todos.todos,
            { id: Date.now().toString(), text, completed: false },
          ],
        },
      })),
  },
}));

// Typed store subscription
const unsubscribe = useCounterStore.subscribe(
  (state) => state.count,
  (count) => {
    console.log('Count changed to:', count);
  }
);

// Typed store subscription with selector
useUserStore.subscribe(
  (state) => state.selectedUser,
  (selectedUser) => {
    if (selectedUser) {
      console.log('User selected:', selectedUser.name);
    }
  }
);

// Typed store getState
const currentState = useCounterStore.getState();
const currentCount = currentState.count;
currentState.increment();`}
        </CodeBlock>

        <CodeBlock title="Typed Store with Type Guards">
          {`// Type guard for store state
function isUserStoreState(state: unknown): state is UserStoreState {
  return (
    typeof state === 'object' &&
    state !== null &&
    'users' in state &&
    'selectedUser' in state &&
    'loading' in state
  );
}

// Typed store with validation
interface ValidatedStoreState {
  data: unknown;
  setData: (data: unknown) => void;
  getValidatedData: () => User[] | null;
}

const useValidatedStore = create<ValidatedStoreState>()((set, get) => ({
  data: null,
  
  setData: (data) => set({ data }),
  
  getValidatedData: () => {
    const state = get();
    if (Array.isArray(state.data)) {
      // Type guard validation
      if (state.data.every((item) => isUser(item))) {
        return state.data;
      }
    }
    return null;
  },
}));

// Helper type guard
function isUser(item: unknown): item is User {
  return (
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'name' in item &&
    'email' in item
  );
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Zustand stores are fully typed with TypeScript interfaces</li>
          <li>Selectors provide type-safe state access</li>
          <li>Actions can be typed with parameters and return types</li>
          <li>Middleware (devtools, persist, immer) works seamlessly with types</li>
          <li>Store composition enables modular state management</li>
          <li>Subscriptions can be typed for reactive updates</li>
        </ul>
      </InfoBox>
    </div>
  );
}

