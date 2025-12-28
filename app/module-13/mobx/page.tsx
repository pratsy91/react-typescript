import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function MobXPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        MobX TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        MobX is a reactive state management library. Typing observables and
        computed values enables type-safe reactive programming.
      </p>

      <Section title="1. Typing Observables">
        <p className="text-gray-700 dark:text-gray-300">
          MobX observables can be typed with TypeScript for type-safe reactive
          state.
        </p>

        <CodeBlock title="Basic Typed Observables">
          {`import { makeObservable, observable, action, computed } from 'mobx';
import { observer } from 'mobx-react-lite';

// Typed observable class
class CounterStore {
  count: number = 0;
  
  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
      decrement: action,
      doubleCount: computed,
    });
  }
  
  increment() {
    this.count += 1;
  }
  
  decrement() {
    this.count -= 1;
  }
  
  get doubleCount(): number {
    return this.count * 2;
  }
}

// Usage in component
const counterStore = new CounterStore();

const Counter = observer(() => {
  return (
    <div>
      <p>Count: {counterStore.count}</p>
      <p>Double: {counterStore.doubleCount}</p>
      <button onClick={() => counterStore.increment()}>+</button>
      <button onClick={() => counterStore.decrement()}>-</button>
    </div>
  );
});`}
        </CodeBlock>

        <CodeBlock title="Complex Typed Observables">
          {`interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

class UserStore {
  users: User[] = [];
  selectedUser: User | null = null;
  loading: boolean = false;
  error: string | null = null;
  
  constructor() {
    makeObservable(this, {
      users: observable,
      selectedUser: observable,
      loading: observable,
      error: observable,
      setUsers: action,
      addUser: action,
      updateUser: action,
      removeUser: action,
      selectUser: action,
      setLoading: action,
      setError: action,
      filteredUsers: computed,
      userCount: computed,
    });
  }
  
  setUsers(users: User[]) {
    this.users = users;
  }
  
  addUser(user: User) {
    this.users.push(user);
  }
  
  updateUser(id: string, changes: Partial<User>) {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      Object.assign(user, changes);
    }
  }
  
  removeUser(id: string) {
    this.users = this.users.filter((u) => u.id !== id);
  }
  
  selectUser(id: string | null) {
    this.selectedUser = id
      ? this.users.find((u) => u.id === id) || null
      : null;
  }
  
  setLoading(loading: boolean) {
    this.loading = loading;
  }
  
  setError(error: string | null) {
    this.error = error;
  }
  
  get filteredUsers(): User[] {
    return this.users.filter((u) => u.role === 'user');
  }
  
  get userCount(): number {
    return this.users.length;
  }
}

// Usage
const userStore = new UserStore();

const UserList = observer(() => {
  if (userStore.loading) return <div>Loading...</div>;
  if (userStore.error) return <div>Error: {userStore.error}</div>;
  
  return (
    <div>
      <p>Total Users: {userStore.userCount}</p>
      {userStore.filteredUsers.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
});`}
        </CodeBlock>

        <CodeBlock title="Typed Observable with makeAutoObservable">
          {`import { makeAutoObservable } from 'mobx';

// Typed store with makeAutoObservable
class TodoStore {
  todos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';
  
  constructor() {
    makeAutoObservable(this);
  }
  
  addTodo(text: string) {
    this.todos.push({
      id: Date.now().toString(),
      text,
      completed: false,
    });
  }
  
  toggleTodo(id: string) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
  
  removeTodo(id: string) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }
  
  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
  }
  
  get filteredTodos(): Todo[] {
    switch (this.filter) {
      case 'active':
        return this.todos.filter((t) => !t.completed);
      case 'completed':
        return this.todos.filter((t) => t.completed);
      default:
        return this.todos;
    }
  }
  
  get stats() {
    return {
      total: this.todos.length,
      completed: this.todos.filter((t) => t.completed).length,
      active: this.todos.filter((t) => !t.completed).length,
    };
  }
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Typing Computed Values">
        <p className="text-gray-700 dark:text-gray-300">
          Computed values in MobX can be typed for type-safe derived state.
        </p>

        <CodeBlock title="Typed Computed Values">
          {`class ProductStore {
  products: Product[] = [];
  cart: CartItem[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  addToCart(productId: string, quantity: number) {
    const existing = this.cart.find((item) => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ productId, quantity });
    }
  }
  
  // Typed computed value
  get cartItems(): (CartItem & { product: Product })[] {
    return this.cart.map((item) => ({
      ...item,
      product: this.products.find((p) => p.id === item.productId)!,
    }));
  }
  
  // Typed computed with multiple dependencies
  get totalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
  
  // Typed computed with conditional logic
  get hasItems(): boolean {
    return this.cart.length > 0;
  }
  
  // Typed computed with filtering
  get expensiveItems(): Product[] {
    return this.products.filter((p) => p.price > 100);
  }
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

// Usage
const productStore = new ProductStore();

const Cart = observer(() => {
  return (
    <div>
      <p>Total: \${productStore.totalPrice}</p>
      {productStore.cartItems.map((item) => (
        <div key={item.productId}>
          {item.product.name} x {item.quantity}
        </div>
      ))}
    </div>
  );
});`}
        </CodeBlock>

        <CodeBlock title="Typed Computed with Parameters">
          {`// Typed computed with parameters using getter functions
class SearchStore {
  items: Item[] = [];
  searchQuery: string = '';
  
  constructor() {
    makeAutoObservable(this);
  }
  
  setSearchQuery(query: string) {
    this.searchQuery = query;
  }
  
  // Typed computed getter
  get filteredItems(): Item[] {
    if (!this.searchQuery) return this.items;
    const query = this.searchQuery.toLowerCase();
    return this.items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }
  
  // Typed computed with memoization
  get sortedItems(): Item[] {
    return [...this.filteredItems].sort((a, b) => a.name.localeCompare(b.name));
  }
  
  // Typed computed with grouping
  get groupedItems(): Record<string, Item[]> {
    return this.items.reduce((acc, item) => {
      const category = item.category || 'uncategorized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as Record<string, Item[]>);
  }
}

interface Item {
  id: string;
  name: string;
  description: string;
  category?: string;
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Advanced MobX Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns including reactions, typed actions, and store
          composition.
        </p>

        <CodeBlock title="Typed Reactions and Autorun">
          {`import { reaction, autorun, when } from 'mobx';

class NotificationStore {
  count: number = 0;
  threshold: number = 10;
  
  constructor() {
    makeAutoObservable(this);
    
    // Typed reaction
    reaction(
      () => this.count,
      (count) => {
        if (count > this.threshold) {
          console.log('Count exceeded threshold!');
        }
      }
    );
    
    // Typed autorun
    autorun(() => {
      console.log('Current count:', this.count);
    });
    
    // Typed when
    when(
      () => this.count > 5,
      () => {
        console.log('Count is now greater than 5');
      }
    );
  }
  
  increment() {
    this.count += 1;
  }
}

// Typed reaction with multiple observables
class MultiObservableStore {
  user: User | null = null;
  isAuthenticated: boolean = false;
  
  constructor() {
    makeAutoObservable(this);
    
    reaction(
      () => ({ user: this.user, isAuthenticated: this.isAuthenticated }),
      ({ user, isAuthenticated }) => {
        if (isAuthenticated && user) {
          console.log('User authenticated:', user.name);
        }
      }
    );
  }
}`}
        </CodeBlock>

        <CodeBlock title="Typed Actions and Flow">
          {`import { flow } from 'mobx';

class AsyncStore {
  data: Data | null = null;
  loading: boolean = false;
  error: Error | null = null;
  
  constructor() {
    makeAutoObservable(this);
  }
  
  // Typed async action
  async fetchData(id: string): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch(\`/api/data/\${id}\`);
      if (!response.ok) throw new Error('Failed to fetch');
      this.data = await response.json();
    } catch (error) {
      this.error = error instanceof Error ? error : new Error('Unknown error');
    } finally {
      this.loading = false;
    }
  }
  
  // Typed flow action
  fetchDataFlow = flow(function* (this: AsyncStore, id: string) {
    this.loading = true;
    this.error = null;
    try {
      const response = yield fetch(\`/api/data/\${id}\`);
      if (!response.ok) throw new Error('Failed to fetch');
      this.data = yield response.json();
    } catch (error) {
      this.error = error instanceof Error ? error : new Error('Unknown error');
    } finally {
      this.loading = false;
    }
  });
}

// Typed action with parameters
class TypedActionStore {
  items: Item[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  addItem(item: Item) {
    this.items.push(item);
  }
  
  updateItem(id: string, changes: Partial<Item>) {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      Object.assign(item, changes);
    }
  }
  
  removeItem(id: string) {
    this.items = this.items.filter((i) => i.id !== id);
  }
  
  // Typed batch action
  batchUpdate(updates: Array<{ id: string; changes: Partial<Item> }>) {
    updates.forEach(({ id, changes }) => {
      this.updateItem(id, changes);
    });
  }
}`}
        </CodeBlock>

        <CodeBlock title="Typed Store Composition">
          {`// Typed root store with multiple stores
class RootStore {
  counterStore: CounterStore;
  userStore: UserStore;
  todoStore: TodoStore;
  
  constructor() {
    this.counterStore = new CounterStore();
    this.userStore = new UserStore();
    this.todoStore = new TodoStore();
    makeAutoObservable(this);
  }
}

// Typed store context
import { createContext, useContext } from 'react';

const StoreContext = createContext<RootStore | null>(null);

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('Store not found');
  }
  return store;
};

// Typed provider
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = new RootStore();
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// Usage
function App() {
  return (
    <StoreProvider>
      <Counter />
      <UserList />
    </StoreProvider>
  );
}

const Counter = observer(() => {
  const { counterStore } = useStore();
  return (
    <div>
      <p>Count: {counterStore.count}</p>
      <button onClick={() => counterStore.increment()}>+</button>
    </div>
  );
});`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Observables are typed with TypeScript class properties</li>
          <li>Computed values infer types from their dependencies</li>
          <li>Actions can be typed with parameters and return types</li>
          <li>makeAutoObservable automatically infers types</li>
          <li>Reactions and autorun support typed observables</li>
          <li>Store composition enables modular state management</li>
        </ul>
      </InfoBox>
    </div>
  );
}

