import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ContextAPIPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Context API Advanced Typing
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React Context API can be fully typed with advanced patterns for
        type-safe context providers and consumers.
      </p>

      <Section title="1. Basic Typed Context">
        <p className="text-gray-700 dark:text-gray-300">
          Context can be typed with TypeScript interfaces for type-safe
          context values.
        </p>

        <CodeBlock title="Basic Typed Context">
          {`import { createContext, useContext, useState, ReactNode } from 'react';

// Define context value type
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create typed context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Typed provider
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  
  const value: ThemeContextValue = {
    theme,
    toggleTheme,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Typed hook for context consumption
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Usage
function App() {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );
}

function ThemedComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Complex Typed Context">
          {`interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      const userData: User = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const value: AuthContextValue = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: user !== null,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};`}
        </CodeBlock>
      </Section>

      <Section title="2. Advanced Context Typing Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns including generic contexts, context composition,
          and typed default values.
        </p>

        <CodeBlock title="Generic Typed Context">
          {`// Generic context factory
function createTypedContext<T>() {
  const context = createContext<T | undefined>(undefined);
  
  const useTypedContext = () => {
    const contextValue = useContext(context);
    if (contextValue === undefined) {
      throw new Error('Context must be used within Provider');
    }
    return contextValue;
  };
  
  return [context.Provider, useTypedContext] as const;
}

// Usage with generic context
interface CounterContextValue {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const [CounterProvider, useCounter] = createTypedContext<CounterContextValue>();

function CounterProviderComponent({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  
  const value: CounterContextValue = {
    count,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => c - 1),
  };
  
  return <CounterProvider value={value}>{children}</CounterProvider>;
}

// Generic context with constraints
interface StoreContextValue<T> {
  items: T[];
  addItem: (item: T) => void;
  removeItem: (id: string) => void;
}

function createStoreContext<T extends { id: string }>() {
  return createTypedContext<StoreContextValue<T>>();
}

// Usage
interface Todo {
  id: string;
  text: string;
}

const [TodoProvider, useTodoStore] = createStoreContext<Todo>();`}
        </CodeBlock>

        <CodeBlock title="Context Composition Pattern">
          {`// Compose multiple contexts
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

interface LanguageContextValue {
  language: 'en' | 'es' | 'fr';
  setLanguage: (lang: 'en' | 'es' | 'fr') => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// Typed combined provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  
  const themeValue: ThemeContextValue = {
    theme,
    toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
  };
  
  const languageValue: LanguageContextValue = {
    language,
    setLanguage,
  };
  
  return (
    <ThemeContext.Provider value={themeValue}>
      <LanguageContext.Provider value={languageValue}>
        {children}
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

// Typed hooks
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within AppProvider');
  return context;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within AppProvider');
  return context;
};

// Combined hook
export const useAppSettings = () => {
  const theme = useTheme();
  const language = useLanguage();
  return { theme, language };
};`}
        </CodeBlock>

        <CodeBlock title="Typed Context with Default Values">
          {`// Context with typed default value
interface SettingsContextValue {
  fontSize: number;
  setFontSize: (size: number) => void;
  notifications: boolean;
  toggleNotifications: () => void;
}

const defaultSettings: SettingsContextValue = {
  fontSize: 14,
  setFontSize: () => {},
  notifications: true,
  toggleNotifications: () => {},
};

const SettingsContext = createContext<SettingsContextValue>(defaultSettings);

// Provider with optional override
export const SettingsProvider: React.FC<{
  children: ReactNode;
  defaultValues?: Partial<SettingsContextValue>;
}> = ({ children, defaultValues }) => {
  const [fontSize, setFontSize] = useState(
    defaultValues?.fontSize ?? defaultSettings.fontSize
  );
  const [notifications, setNotifications] = useState(
    defaultValues?.notifications ?? defaultSettings.notifications
  );
  
  const value: SettingsContextValue = {
    fontSize,
    setFontSize,
    notifications,
    toggleNotifications: () => setNotifications((n) => !n),
  };
  
  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook that never throws (uses default if not in provider)
export const useSettings = (): SettingsContextValue => {
  return useContext(SettingsContext);
};`}
        </CodeBlock>
      </Section>

      <Section title="3. Advanced Context Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns including context selectors, memoization, and
          typed context factories.
        </p>

        <CodeBlock title="Typed Context with Selectors">
          {`// Context with selector pattern
interface DataContextValue {
  items: Item[];
  selectedItem: Item | null;
  filters: FilterState;
  setItems: (items: Item[]) => void;
  selectItem: (id: string | null) => void;
  setFilters: (filters: Partial<FilterState>) => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

// Typed selector hook
export const useDataSelector = <T,>(
  selector: (value: DataContextValue) => T
): T => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useDataSelector must be used within DataProvider');
  return selector(context);
};

// Usage with typed selectors
function ItemList() {
  const items = useDataSelector((state) => state.items);
  const selectedItem = useDataSelector((state) => state.selectedItem);
  
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          {item.name} {selectedItem?.id === item.id && '(Selected)'}
        </div>
      ))}
    </div>
  );
}

// Memoized selector
const useFilteredItems = () => {
  return useDataSelector((state) => {
    const { items, filters } = state;
    return items.filter((item) => {
      if (filters.category && item.category !== filters.category) return false;
      if (filters.search && !item.name.includes(filters.search)) return false;
      return true;
    });
  });
};`}
        </CodeBlock>

        <CodeBlock title="Typed Context Factory Pattern">
          {`// Factory for creating typed contexts
function createContextProvider<T extends Record<string, unknown>>(
  displayName: string
) {
  const Context = createContext<T | undefined>(undefined);
  Context.displayName = displayName;
  
  const Provider: React.FC<{ value: T; children: ReactNode }> = ({
    value,
    children,
  }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  
  const useContextValue = (): T => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(\`\${displayName} must be used within Provider\`);
    }
    return context;
  };
  
  return [Provider, useContextValue] as const;
}

// Usage
interface CounterState {
  count: number;
  increment: () => void;
}

const [CounterProvider, useCounterState] = createContextProvider<CounterState>(
  'Counter'
);

// Typed factory with initializer
function createStatefulContext<T, P extends unknown[]>(
  initialState: T,
  initializer: (...args: P) => T
) {
  const Context = createContext<T | undefined>(undefined);
  
  const Provider: React.FC<{ args: P; children: ReactNode }> = ({
    args,
    children,
  }) => {
    const [state] = useState(() => initializer(...args));
    return <Context.Provider value={state}>{children}</Context.Provider>;
  };
  
  const useContextValue = (): T => {
    const context = useContext(Context);
    if (!context) throw new Error('Context must be used within Provider');
    return context;
  };
  
  return [Provider, useContextValue] as const;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Context with Reducer Pattern">
          {`// Typed context with useReducer
type ThemeAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TOGGLE_THEME' };

interface ThemeState {
  theme: 'light' | 'dark';
  systemPreference: 'light' | 'dark';
}

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
};

interface ThemeContextValue {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: 'light',
    systemPreference: 'light',
  });
  
  const value: ThemeContextValue = {
    state,
    dispatch,
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Context values are typed with TypeScript interfaces</li>
          <li>Custom hooks provide type-safe context consumption</li>
          <li>Generic contexts enable reusable context patterns</li>
          <li>Context composition allows multiple providers</li>
          <li>Selectors enable efficient context value access</li>
          <li>Reducer pattern works well with typed contexts</li>
        </ul>
      </InfoBox>
    </div>
  );
}

