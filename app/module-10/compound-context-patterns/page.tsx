import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function CompoundContextPatternsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Compound Components & Context Patterns
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Compound Components pattern uses related components that work together.
        Context Patterns provide typed provider/consumer relationships.
        Understanding these patterns enables flexible, type-safe component
        composition.
      </p>

      <Section title="1. Compound Components">
        <p className="text-gray-700 dark:text-gray-300">
          Compound Components are related components that share state through
          context or props. Understanding compound component typing enables
          flexible, type-safe component APIs with multiple related components.
        </p>

        <CodeBlock title="Compound Components Typing">
          {`// Basic compound component pattern
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined
);

interface TabsProps {
  defaultValue?: string;
  children: React.ReactNode;
}

function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue || "");

  const value: TabsContextValue = React.useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab]
  );

  return (
    <TabsContext.Provider value={value}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  children: React.ReactNode;
}

function TabList({ children }: TabListProps) {
  return <div className="tab-list">{children}</div>;
}

interface TabProps {
  value: string;
  children: React.ReactNode;
}

function Tab({ value, children }: TabProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("Tab must be used within Tabs");

  const isActive = context.activeTab === value;

  return (
    <button
      className={\`tab \${isActive ? "active" : ""}\`}
      onClick={() => context.setActiveTab(value)}
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
}

function TabPanel({ value, children }: TabPanelProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabPanel must be used within Tabs");

  if (context.activeTab !== value) return null;
  return <div className="tab-panel">{children}</div>;
}

// Attach sub-components
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Usage
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
  <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs>

// Typed compound component
interface CompoundComponentType {
  Root: React.FC<TabsProps>;
  List: React.FC<TabListProps>;
  Tab: React.FC<TabProps>;
  Panel: React.FC<TabPanelProps>;
}

const TypedTabs: React.FC<TabsProps> & CompoundComponentType = Tabs as any;
TypedTabs.List = TabList;
TypedTabs.Tab = Tab;
TypedTabs.Panel = TabPanel;

// Accordion compound component
interface AccordionContextValue {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
}

const AccordionContext = React.createContext<
  AccordionContextValue | undefined
>(undefined);

interface AccordionProps {
  allowMultiple?: boolean;
  children: React.ReactNode;
}

function Accordion({ allowMultiple = false, children }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = React.useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  const value: AccordionContextValue = React.useMemo(
    () => ({
      openItems,
      toggleItem,
    }),
    [openItems, toggleItem]
  );

  return (
    <AccordionContext.Provider value={value}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  id: string;
  children: React.ReactNode;
}

function AccordionItem({ id, children }: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used within Accordion");

  const isOpen = context.openItems.has(id);

  return (
    <div className={\`accordion-item \${isOpen ? "open" : ""}\`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { id, isOpen } as any);
        }
        return child;
      })}
    </div>
  );
}

interface AccordionHeaderProps {
  id?: string;
  isOpen?: boolean;
  children: React.ReactNode;
}

function AccordionHeader({ id, isOpen, children }: AccordionHeaderProps) {
  const context = React.useContext(AccordionContext);
  if (!context || !id) return null;

  return (
    <button
      className="accordion-header"
      onClick={() => context.toggleItem(id)}
    >
      {children}
      <span>{isOpen ? "▼" : "▶"}</span>
    </button>
  );
}

interface AccordionContentProps {
  id?: string;
  isOpen?: boolean;
  children: React.ReactNode;
}

function AccordionContent({ id, isOpen, children }: AccordionContentProps) {
  if (!isOpen) return null;
  return <div className="accordion-content">{children}</div>;
}

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

// Usage
<Accordion allowMultiple>
  <Accordion.Item id="item1">
    <Accordion.Header>Section 1</Accordion.Header>
    <Accordion.Content>Content 1</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item id="item2">
    <Accordion.Header>Section 2</Accordion.Header>
    <Accordion.Content>Content 2</Accordion.Content>
  </Accordion.Item>
</Accordion>

// Menu compound component
interface MenuContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const MenuContext = React.createContext<MenuContextValue | undefined>(
  undefined
);

interface MenuProps {
  children: React.ReactNode;
}

function Menu({ children }: MenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const value: MenuContextValue = React.useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((prev) => !prev),
    }),
    [isOpen]
  );

  return (
    <MenuContext.Provider value={value}>
      <div className="menu">{children}</div>
    </MenuContext.Provider>
  );
}

interface MenuButtonProps {
  children: React.ReactNode;
}

function MenuButton({ children }: MenuButtonProps) {
  const context = React.useContext(MenuContext);
  if (!context) throw new Error("MenuButton must be used within Menu");

  return (
    <button
      className="menu-button"
      onClick={context.toggle}
      aria-expanded={context.isOpen}
    >
      {children}
    </button>
  );
}

interface MenuListProps {
  children: React.ReactNode;
}

function MenuList({ children }: MenuListProps) {
  const context = React.useContext(MenuContext);
  if (!context) throw new Error("MenuList must be used within Menu");

  if (!context.isOpen) return null;

  return <div className="menu-list">{children}</div>;
}

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function MenuItem({ children, onClick }: MenuItemProps) {
  const context = React.useContext(MenuContext);
  if (!context) throw new Error("MenuItem must be used within Menu");

  const handleClick = () => {
    onClick?.();
    context.close();
  };

  return (
    <div className="menu-item" onClick={handleClick}>
      {children}
    </div>
  );
}

Menu.Button = MenuButton;
Menu.List = MenuList;
Menu.Item = MenuItem;

// Usage
<Menu>
  <Menu.Button>Open Menu</Menu.Button>
  <Menu.List>
    <Menu.Item onClick={() => console.log("Item 1")}>Item 1</Menu.Item>
    <Menu.Item onClick={() => console.log("Item 2")}>Item 2</Menu.Item>
  </Menu.List>
</Menu>

// Generic compound component factory
function createCompoundComponent<
  TContextValue,
  TRootProps extends { children: React.ReactNode }
>(
  contextValueFactory: (props: TRootProps) => TContextValue
) {
  const Context = React.createContext<TContextValue | undefined>(undefined);

  const Root: React.FC<TRootProps> = ({ children, ...props }) => {
    const value = contextValueFactory(props as TRootProps);
    return (
      <Context.Provider value={value}>
        <div>{children}</div>
      </Context.Provider>
    );
  };

  const useContext = () => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error("Must be used within Root component");
    }
    return context;
  };

  return { Root, Context, useContext };
}

// Usage
interface CounterContextValue {
  count: number;
  increment: () => void;
  decrement: () => void;
}

interface CounterProps {
  initialCount?: number;
  children: React.ReactNode;
}

const { Root: CounterRoot, useContext: useCounter } = createCompoundComponent<
  CounterContextValue,
  CounterProps
>(({ initialCount = 0 }) => {
  const [count, setCount] = React.useState(initialCount);
  return {
    count,
    increment: () => setCount((c) => c + 1),
    decrement: () => setCount((c) => c - 1),
  };
});

function CounterDisplay() {
  const { count } = useCounter();
  return <div>Count: {count}</div>;
}

function CounterButton() {
  const { increment, decrement } = useCounter();
  return (
    <div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

CounterRoot.Display = CounterDisplay;
CounterRoot.Button = CounterButton;

// Usage
<CounterRoot initialCount={0}>
  <CounterRoot.Display />
  <CounterRoot.Button />
</CounterRoot>`}
        </CodeBlock>

        <InfoBox type="info">
          Compound Components pattern uses related components that share state
          through context. Attach sub-components as properties of the root
          component. Use TypeScript to type context values and component props.
          Create compound components with context for flexible, type-safe APIs.
        </InfoBox>
      </Section>

      <Section title="2. Context Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Context Patterns provide typed provider/consumer relationships with
          default values and optional context. Understanding context typing
          enables type-safe state sharing across component trees.
        </p>

        <CodeBlock title="Context Patterns Typing">
          {`// Basic context pattern
interface ThemeContextValue {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

// Provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const value: ThemeContextValue = React.useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Consumer hook with type safety
function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

// Usage
function ThemedComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={\`theme-\${theme}\`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// Context with default value
interface ConfigContextValue {
  apiUrl: string;
  timeout: number;
}

const ConfigContext = React.createContext<ConfigContextValue>({
  apiUrl: "https://api.example.com",
  timeout: 5000,
});

// No need for undefined check with default value
function useConfig() {
  return React.useContext(ConfigContext);  // Always defined
}

// Optional context pattern
interface OptionalContextValue {
  featureEnabled: boolean;
}

const OptionalContext = React.createContext<OptionalContextValue | null>(null);

function useOptionalFeature() {
  const context = React.useContext(OptionalContext);
  return context?.featureEnabled ?? false;  // Default to false
}

// Generic context creation helper
function createTypedContext<T>() {
  const Context = React.createContext<T | undefined>(undefined);

  function useTypedContext() {
    const context = React.useContext(Context);

    if (!context) {
      throw new Error("Context must be used within Provider");
    }

    return context;
  }

  function Provider({ value, children }: { value: T; children: React.ReactNode }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  return { Context, Provider, useTypedContext };
}

// Usage
interface UserContextValue {
  user: { id: string; name: string } | null;
  login: (user: { id: string; name: string }) => void;
  logout: () => void;
}

const { Provider: UserProvider, useTypedContext: useUser } =
  createTypedContext<UserContextValue>();

// Usage
function UserProviderComponent({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<{ id: string; name: string } | null>(
    null
  );

  const value: UserContextValue = React.useMemo(
    () => ({
      user,
      login: setUser,
      logout: () => setUser(null),
    }),
    [user]
  );

  return <UserProvider value={value}>{children}</UserProvider>;
}

function UserComponent() {
  const { user, logout } = useUser();  // Fully typed

  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Context with reducer
type CounterAction = { type: "increment" } | { type: "decrement" };

function counterReducer(state: number, action: CounterAction): number {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

interface CounterContextValue {
  state: number;
  dispatch: React.Dispatch<CounterAction>;
}

const { Provider: CounterProvider, useTypedContext: useCounter } =
  createTypedContext<CounterContextValue>();

function CounterProviderComponent({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(counterReducer, 0);

  const value: CounterContextValue = React.useMemo(
    () => ({ state, dispatch }),
    [state]
  );

  return <CounterProvider value={value}>{children}</CounterProvider>;
}

function CounterComponent() {
  const { state, dispatch } = useCounter();

  return (
    <div>
      <p>Count: {state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}

// Context selector pattern (performance optimization)
interface LargeContextValue {
  user: { id: string; name: string };
  settings: { theme: string; notifications: boolean };
  preferences: { language: string; timezone: string };
}

const LargeContext = React.createContext<LargeContextValue | undefined>(
  undefined
);

// Selector hook for optimized re-renders
function useLargeContextSelector<T>(
  selector: (value: LargeContextValue) => T
): T {
  const context = React.useContext(LargeContext);
  if (!context) throw new Error("Must be used within Provider");

  return React.useMemo(() => selector(context), [context, selector]);
}

// Usage: only re-renders when selected value changes
function OptimizedComponent() {
  const userName = useLargeContextSelector((value) => value.user.name);
  // Only subscribes to user.name changes, not entire context
  return <div>{userName}</div>;
}

// Multiple contexts pattern
interface AuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
}

interface ThemeContextValue2 {
  theme: "light" | "dark";
}

const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
);
const ThemeContext2 = React.createContext<ThemeContextValue2 | undefined>(
  undefined
);

function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

function useTheme2() {
  const context = React.useContext(ThemeContext2);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

// Nested context providers
function NestedProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UserProviderComponent>
        <CounterProviderComponent>{children}</CounterProviderComponent>
      </UserProviderComponent>
    </ThemeProvider>
  );
}

// Context with discriminated union
type AppState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: any[] }
  | { status: "error"; error: Error };

interface AppContextValue {
  state: AppState;
  fetchData: () => void;
}

const { Provider: AppProvider, useTypedContext: useApp } =
  createTypedContext<AppContextValue>();

function AppProviderComponent({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AppState>({ status: "idle" });

  const fetchData = React.useCallback(() => {
    setState({ status: "loading" });
    // Simulate async operation
    setTimeout(() => {
      setState({ status: "success", data: [] });
    }, 1000);
  }, []);

  const value: AppContextValue = React.useMemo(
    () => ({ state, fetchData }),
    [state, fetchData]
  );

  return <AppProvider value={value}>{children}</AppProvider>;
}

function AppComponent() {
  const { state } = useApp();

  // Type narrowing works perfectly
  if (state.status === "success") {
    return <div>{state.data.map((item) => item).join(", ")}</div>;
  }

  if (state.status === "error") {
    return <div>Error: {state.error.message}</div>;
  }

  return null;
}

// Context with action creators
interface CounterContextValue2 {
  count: number;
  actions: {
    increment: () => void;
    decrement: () => void;
    reset: () => void;
  };
}

const { Provider: CounterProvider2, useTypedContext: useCounter2 } =
  createTypedContext<CounterContextValue2>();

function CounterProvider2Component({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = React.useState(0);

  const actions = React.useMemo(
    () => ({
      increment: () => setCount((c) => c + 1),
      decrement: () => setCount((c) => c - 1),
      reset: () => setCount(0),
    }),
    []
  );

  const value: CounterContextValue2 = React.useMemo(
    () => ({ count, actions }),
    [count, actions]
  );

  return <CounterProvider2 value={value}>{children}</CounterProvider2>;
}

// Context value factory pattern
type ContextValueFactory<T> = (props: Record<string, any>) => T;

function createContextWithFactory<T>(
  factory: ContextValueFactory<T>
): {
  Provider: React.FC<{ children: React.ReactNode } & Record<string, any>>;
  useContext: () => T;
} {
  const Context = React.createContext<T | undefined>(undefined);

  const Provider: React.FC<{ children: React.ReactNode } & Record<string, any>> = ({
    children,
    ...props
  }) => {
    const value = factory(props);
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  const useContext = () => {
    const context = React.useContext(Context);
    if (!context) throw new Error("Must be used within Provider");
    return context;
  };

  return { Provider, useContext };
}

// Usage
interface FormContextValue {
  values: Record<string, any>;
  setValue: (field: string, value: any) => void;
}

const { Provider: FormProvider, useContext: useFormContext } =
  createContextWithFactory<FormContextValue>(({ initialValues = {} }) => {
    const [values, setValues] = React.useState(initialValues);
    const setValue = (field: string, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));
    };
    return { values, setValue };
  });`}
        </CodeBlock>

        <InfoBox type="important">
          Context Patterns provide typed provider/consumer relationships. Use
          generic context creation helpers for type safety. Provide default
          values for optional contexts. Use selectors for performance with large
          contexts. Combine contexts with nested providers. Use discriminated
          unions for complex state management.
        </InfoBox>
      </Section>
    </div>
  );
}

