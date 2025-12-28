import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function FunctionComponentsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Function Components
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React function components can be typed in multiple ways. Understanding
        React.FC, React.FunctionComponent, and plain function signatures helps
        you choose the right approach for type-safe components.
      </p>

      <Section title="1. Basic Function Component Typing">
        <p className="text-gray-700 dark:text-gray-300">
          Function components can be typed explicitly with React.FC or
          React.FunctionComponent, or implicitly by typing props and return
          values.
        </p>

        <CodeBlock title="Basic function component examples">
          {`// Plain function with typed props (Recommended)
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// Arrow function with typed props
const Button2 = ({ label, onClick, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// Explicit return type
function Button3({ label, onClick }: ButtonProps): JSX.Element {
  return <button onClick={onClick}>{label}</button>;
}

// React.FC (React.FunctionComponent)
const Button4: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// React.FunctionComponent (same as React.FC)
const Button5: React.FunctionComponent<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// With children (React.FC automatically includes children)
interface CardProps {
  title: string;
  subtitle?: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <div>{children}</div>
    </div>
  );
};

// Plain function without React.FC (must explicitly type children)
interface CardProps2 {
  title: string;
  children?: React.ReactNode;
}

function Card2({ title, children }: CardProps2) {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

// Generic function component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List
  items={[1, 2, 3]}
  renderItem={(num) => <span>{num}</span>}
/>

<List
  items={["a", "b", "c"]}
  renderItem={(str) => <span>{str.toUpperCase()}</span>}
/>

// Generic with React.FC (limitations)
// React.FC doesn't work well with generics
const List2 = <T,>({ items, renderItem }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
};

// Destructuring with default values
interface ConfigProps {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
}

const Config: React.FC<ConfigProps> = ({
  apiUrl = "https://api.example.com",
  timeout = 5000,
  retries = 3,
}) => {
  return (
    <div>
      <p>API: {apiUrl}</p>
      <p>Timeout: {timeout}ms</p>
      <p>Retries: {retries}</p>
    </div>
  );
};

// Component with no props
const Header: React.FC = () => {
  return <header>My App</header>;
};

// Or without React.FC
function Header2() {
  return <header>My App</header>;
}

// Rest props pattern
interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
}

const Button6 = ({ variant, children, ...rest }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={\`btn-\${variant}\`} {...rest}>
      {children}
    </button>
  );
};

// Usage with additional HTML attributes
<Button6 variant="primary" onClick={() => {}} disabled>
  Click me
</Button6>

// Component with render prop
interface MouseTrackerProps {
  render: (position: { x: number; y: number }) => React.ReactNode;
}

const MouseTracker: React.FC<MouseTrackerProps> = ({ render }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
      style={{ height: "100vh" }}
    >
      {render(position)}
    </div>
  );
};

// Usage
<MouseTracker
  render={({ x, y }) => (
    <p>
      Mouse at ({x}, {y})
    </p>
  )}
/>

// Component with function children
interface ToggleProps {
  children: (isOn: boolean, toggle: () => void) => React.ReactNode;
}

const Toggle: React.FC<ToggleProps> = ({ children }) => {
  const [isOn, setIsOn] = React.useState(false);
  const toggle = () => setIsOn(!isOn);

  return <>{children(isOn, toggle)}</>;
};

// Usage
<Toggle>
  {(isOn, toggle) => (
    <button onClick={toggle}>{isOn ? "ON" : "OFF"}</button>
  )}
</Toggle>

// Conditional rendering helper
type ConditionalWrapperProps = {
  condition: boolean;
  wrapper: (children: React.ReactNode) => JSX.Element;
  children: React.ReactNode;
};

const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => {
  return condition ? wrapper(children) : <>{children}</>;
};

// Usage
<ConditionalWrapper
  condition={isLoggedIn}
  wrapper={(children) => <div className="authenticated">{children}</div>}
>
  <Dashboard />
</ConditionalWrapper>`}
        </CodeBlock>

        <InfoBox type="info">
          Plain function components with typed props are now recommended over
          React.FC. React.FC automatically includes children prop but has
          limitations with generics and default props. Choose based on your
          needs.
        </InfoBox>
      </Section>

      <Section title="2. React.FC vs Plain Functions">
        <p className="text-gray-700 dark:text-gray-300">
          React.FC and plain functions each have trade-offs. Understanding the
          differences helps you make informed decisions about component typing.
        </p>

        <CodeBlock title="React.FC vs plain function comparison">
          {`// React.FC advantages
// 1. Implicit children prop
const Card: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      {children}  // children available without explicit typing
    </div>
  );
};

// Plain function requires explicit children
interface CardProps {
  title: string;
  children?: React.ReactNode;  // Must be explicit
}

function Card2({ title, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// React.FC provides displayName, propTypes, defaultProps
const Button: React.FC<{ label: string }> = ({ label }) => {
  return <button>{label}</button>;
};

Button.displayName = "Button";  // Type-safe
Button.defaultProps = { label: "Click" };  // Type-safe (though deprecated)

// React.FC limitations
// 1. Cannot use generics easily
// ✗ Doesn't work well
const List: React.FC<{ items: T[] }> = ({ items }) => {
  // T is not defined
};

// ✓ Plain function with generics
function List<T>({ items }: { items: T[] }) {
  return <ul>{items.map((item, i) => <li key={i}>{String(item)}</li>)}</ul>;
}

// 2. React.FC doesn't support default props inference
const Button2: React.FC<{ variant?: "primary" | "secondary" }> = ({
  variant = "primary",  // Works but not inferred in parent
}) => {
  return <button className={variant}>Click</button>;
};

// Plain function with default params (better inference)
function Button3({ variant = "primary" }: { variant?: "primary" | "secondary" }) {
  return <button className={variant}>Click</button>;
}

// 3. React.FC return type is more restrictive
const Component1: React.FC = () => {
  return null;  // ✓ OK
  // return undefined;  // ✗ Error
  // return "string";  // ✗ Error
};

// Plain function is more flexible
function Component2(): React.ReactNode {
  return null;  // ✓ OK
  return undefined;  // ✓ OK
  return "string";  // ✓ OK
  return 123;  // ✓ OK
  return <div>JSX</div>;  // ✓ OK
}

// Recommended pattern (2023+)
// Plain function with explicit children when needed
interface Props {
  title: string;
  children?: React.ReactNode;
}

export function Component({ title, children }: Props) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

// When to use React.FC
// - Prefer plain functions for new code
// - Use React.FC for consistency in existing codebase
// - Use React.FC when you want implicit children

// Migration from React.FC to plain function
// Before
const OldComponent: React.FC<{ name: string }> = ({ name, children }) => {
  return <div>{name} {children}</div>;
};

// After
interface ComponentProps {
  name: string;
  children?: React.ReactNode;
}

function NewComponent({ name, children }: ComponentProps) {
  return <div>{name} {children}</div>;
}

// Named export with displayName
export function Button({ label }: { label: string }) {
  return <button>{label}</button>;
}
Button.displayName = "Button";

// VFC (Void Function Component) - Deprecated in React 18
// Was used for components without children
const NoChildren: React.VFC<{ title: string }> = ({ title }) => {
  return <div>{title}</div>;
};

// Now just use plain function
function NoChildren2({ title }: { title: string }) {
  return <div>{title}</div>;
}

// Type extraction from component
type ButtonProps = React.ComponentProps<typeof Button>;

// Props of intrinsic elements
type DivProps = React.ComponentProps<"div">;
type ButtonElementProps = React.ComponentProps<"button">;

// Combining with HTML attributes
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  isLoading?: boolean;
}

function CustomButton({ variant, isLoading, children, ...rest }: CustomButtonProps) {
  return (
    <button {...rest} className={\`btn-\${variant}\`} disabled={isLoading || rest.disabled}>
      {isLoading ? "Loading..." : children}
    </button>
  );
}

// Polymorphic component pattern
type As = keyof JSX.IntrinsicElements;

interface BoxProps<T extends As = "div"> {
  as?: T;
  children?: React.ReactNode;
}

function Box<T extends As = "div">({
  as,
  children,
  ...rest
}: BoxProps<T> & Omit<React.ComponentProps<T>, keyof BoxProps<T>>) {
  const Component = as || "div";
  return <Component {...rest}>{children}</Component>;
}

// Usage
<Box>Default div</Box>
<Box as="section">Section</Box>
<Box as="button" onClick={() => {}}>Button</Box>`}
        </CodeBlock>

        <InfoBox type="tip">
          Modern React (18+) recommends plain functions over React.FC. Plain
          functions offer better generic support, more flexible return types,
          and clearer intent. Use React.FC only for consistency in existing
          codebases or when you prefer implicit children.
        </InfoBox>
      </Section>

      <Section title="3. Component Props Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced prop patterns including PropsWithChildren, PropsWithoutRef,
          PropsWithRef, and composition patterns for flexible component APIs.
        </p>

        <CodeBlock title="Component props pattern examples">
          {`// PropsWithChildren helper
type PropsWithChildren<P = unknown> = P & { children?: React.ReactNode };

// Usage
interface CardProps {
  title: string;
  subtitle?: string;
}

function Card({ title, subtitle, children }: React.PropsWithChildren<CardProps>) {
  return (
    <div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </div>
  );
}

// PropsWithoutRef - props without ref
type ButtonProps = React.PropsWithoutRef<{
  label: string;
  onClick: () => void;
}>;

function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.label}</button>;
}

// PropsWithRef - props with ref
type InputProps = React.PropsWithRef<{
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
}>;

// Combining with HTML attributes
interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "small" | "medium" | "large";
  error?: string;
}

function CustomInput({ size = "medium", error, ...rest }: CustomInputProps) {
  return (
    <div>
      <input {...rest} className={\`input-\${size}\`} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// Optional vs required children
interface RequiredChildrenProps {
  title: string;
  children: React.ReactNode;  // Required
}

interface OptionalChildrenProps {
  title: string;
  children?: React.ReactNode;  // Optional
}

// Multiple children with specific types
interface DialogProps {
  header: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

function Dialog({ header, body, footer }: DialogProps) {
  return (
    <div className="dialog">
      <div className="header">{header}</div>
      <div className="body">{body}</div>
      {footer && <div className="footer">{footer}</div>}
    </div>
  );
}

// Usage
<Dialog
  header={<h2>Title</h2>}
  body={<p>Content</p>}
  footer={<button>Close</button>}
/>

// Named slots pattern
interface LayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  footer?: React.ReactNode;
}

function Layout({ sidebar, main, footer }: LayoutProps) {
  return (
    <div className="layout">
      <aside>{sidebar}</aside>
      <main>{main}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

// Discriminated union props
type ButtonProps =
  | { variant: "link"; href: string }
  | { variant: "button"; onClick: () => void };

function Button(props: ButtonProps) {
  if (props.variant === "link") {
    return <a href={props.href}>Link</a>;
  }
  return <button onClick={props.onClick}>Button</button>;
}

// Usage
<Button variant="link" href="/about" />
<Button variant="button" onClick={() => {}} />

// Conditional props based on boolean
interface BaseProps {
  title: string;
}

type ConditionalProps =
  | (BaseProps & { editable: true; onSave: (title: string) => void })
  | (BaseProps & { editable?: false; onSave?: never });

function Title(props: ConditionalProps) {
  if (props.editable) {
    return <input value={props.title} onChange={(e) => props.onSave(e.target.value)} />;
  }
  return <h1>{props.title}</h1>;
}

// Render prop pattern
interface DataFetcherProps<T> {
  url: string;
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return <>{children(data, loading, error)}</>;
}

// Usage
<DataFetcher<User[]> url="/api/users">
  {(users, loading, error) => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <ul>{users?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
  }}
</DataFetcher>

// Component composition with props spreading
interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: number;
  margin?: number;
}

function Box({ padding = 0, margin = 0, style, ...rest }: BoxProps) {
  return (
    <div
      {...rest}
      style={{
        ...style,
        padding: \`\${padding}px\`,
        margin: \`\${margin}px\`,
      }}
    />
  );
}

// Strict prop checking with exact types
type Exact<T, Shape> = T extends Shape
  ? Exclude<keyof T, keyof Shape> extends never
    ? T
    : never
  : never;

interface StrictProps {
  name: string;
  age: number;
}

function StrictComponent<T extends StrictProps>(props: Exact<T, StrictProps>) {
  return <div>{props.name}</div>;
}

// OK
<StrictComponent name="John" age={30} />

// Error: extra prop
// <StrictComponent name="John" age={30} email="..." />

// Props with callbacks
interface FormProps {
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
  onChange?: (field: string, value: any) => void;
  onValidate?: (data: FormData) => Record<string, string>;
}

// Props with required and optional groups
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];`}
        </CodeBlock>

        <InfoBox type="important">
          Use React.PropsWithChildren for components with children,
          PropsWithoutRef to exclude refs, and PropsWithRef when forwarding
          refs. Combine with discriminated unions for conditional props and
          type- safe component APIs.
        </InfoBox>
      </Section>

      <Section title="4. Generic Function Components">
        <p className="text-gray-700 dark:text-gray-300">
          Generic components enable reusable, type-safe components that work
          with any data type while maintaining full type inference and safety.
        </p>

        <CodeBlock title="Generic function component examples">
          {`// Basic generic component
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
}

function Select<T>({ options, value, onChange, getLabel }: SelectProps<T>) {
  return (
    <select
      value={getLabel(value)}
      onChange={(e) => {
        const option = options.find((opt) => getLabel(opt) === e.target.value);
        if (option) onChange(option);
      }}
    >
      {options.map((option, index) => (
        <option key={index} value={getLabel(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}

// Usage with type inference
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

<Select
  options={users}
  value={users[0]}
  onChange={(user) => console.log(user.id)}  // user is typed as User
  getLabel={(user) => user.name}
/>

// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  emptyMessage?: string;
}

function List<T>({
  items,
  renderItem,
  keyExtractor = (_, index) => index,
  emptyMessage = "No items",
}: ListProps<T>) {
  if (items.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

// Generic table component
interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i} style={{ width: col.width }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>{col.accessor(row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage
<Table
  data={users}
  columns={[
    { header: "ID", accessor: (user) => user.id },
    { header: "Name", accessor: (user) => user.name.toUpperCase() },
  ]}
/>

// Generic with constraints
interface HasId {
  id: number | string;
}

interface EntityListProps<T extends HasId> {
  entities: T[];
  onSelect: (entity: T) => void;
}

function EntityList<T extends HasId>({ entities, onSelect }: EntityListProps<T>) {
  return (
    <ul>
      {entities.map((entity) => (
        <li key={entity.id} onClick={() => onSelect(entity)}>
          {JSON.stringify(entity)}
        </li>
      ))}
    </ul>
  );
}

// Generic form field
interface FieldProps<T> {
  value: T;
  onChange: (value: T) => void;
  validator?: (value: T) => string | undefined;
}

function TextField({ value, onChange, validator }: FieldProps<string>) {
  const error = validator?.(value);
  return (
    <div>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
      {error && <span>{error}</span>}
    </div>
  );
}

function NumberField({ value, onChange, validator }: FieldProps<number>) {
  const error = validator?.(value);
  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {error && <span>{error}</span>}
    </div>
  );
}

// Generic with multiple type parameters
interface PairProps<K, V> {
  items: Map<K, V>;
  renderKey: (key: K) => React.ReactNode;
  renderValue: (value: V) => React.ReactNode;
}

function PairList<K, V>({ items, renderKey, renderValue }: PairProps<K, V>) {
  return (
    <ul>
      {Array.from(items.entries()).map(([key, value], index) => (
        <li key={index}>
          {renderKey(key)}: {renderValue(value)}
        </li>
      ))}
    </ul>
  );
}

// Generic with default type parameter
interface BoxProps<T = string> {
  value: T;
  render?: (value: T) => React.ReactNode;
}

function Box<T = string>({ value, render }: BoxProps<T>) {
  return <div>{render ? render(value) : String(value)}</div>;
}

// Usage
<Box value="string" />  // T is string (default)
<Box value={42} />  // T is number
<Box value={{ name: "John" }} render={(obj) => obj.name} />  // T is { name: string }

// Conditional generic component
type DataProps<T> =
  | { data: T[]; loading?: false; error?: never }
  | { data?: never; loading: true; error?: never }
  | { data?: never; loading?: false; error: Error };

function DataDisplay<T>({ data, loading, error }: DataProps<T>) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <ul>{data.map((item, i) => <li key={i}>{String(item)}</li>)}</ul>;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Generic components provide type-safe, reusable interfaces. Use
          constraints to ensure types have required properties. Multiple type
          parameters enable complex, fully type-safe component APIs with perfect
          type inference.
        </InfoBox>
      </Section>

      <Section title="5. Practical Component Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world patterns combining function component types with hooks,
          context, and advanced composition for production-ready components.
        </p>

        <CodeBlock title="Practical function component patterns">
          {`// Compound component pattern
interface TabsProps {
  defaultValue?: string;
  children: React.ReactNode;
}

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue || "");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
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

// HOC pattern with types
interface WithLoadingProps {
  isLoading: boolean;
}

function withLoading<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> {
  return ({ isLoading, ...props }: WithLoadingProps & P) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...(props as P)} />;
  };
}

// Usage
interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

const UserListWithLoading = withLoading(UserList);

<UserListWithLoading users={users} isLoading={loading} />

// Controlled vs uncontrolled pattern
interface InputProps {
  // Controlled
  value?: string;
  onChange?: (value: string) => void;
  // Uncontrolled
  defaultValue?: string;
  onBlur?: (value: string) => void;
}

function Input({ value, onChange, defaultValue, onBlur }: InputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <input
      value={currentValue}
      onChange={handleChange}
      onBlur={() => onBlur?.(currentValue)}
    />
  );
}

// Error boundary wrapper (class-based, then hook usage)
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Async component pattern
interface AsyncComponentProps<T> {
  promise: Promise<T>;
  children: (data: T) => React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: (error: Error) => React.ReactNode;
}

function AsyncComponent<T>({
  promise,
  children,
  fallback = <div>Loading...</div>,
  errorFallback = (error) => <div>Error: {error.message}</div>,
}: AsyncComponentProps<T>) {
  const [state, setState] = React.useState<
    | { status: "loading" }
    | { status: "success"; data: T }
    | { status: "error"; error: Error }
  >({ status: "loading" });

  React.useEffect(() => {
    promise
      .then((data) => setState({ status: "success", data }))
      .catch((error) => setState({ status: "error", error }));
  }, [promise]);

  if (state.status === "loading") return <>{fallback}</>;
  if (state.status === "error") return <>{errorFallback(state.error)}</>;
  return <>{children(state.data)}</>;
}

// Portal wrapper
interface PortalProps {
  children: React.ReactNode;
  container?: Element | null;
}

function Portal({ children, container }: PortalProps) {
  const defaultContainer = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!container && !defaultContainer.current) {
      const div = document.createElement("div");
      document.body.appendChild(div);
      defaultContainer.current = div;
    }

    return () => {
      if (defaultContainer.current) {
        document.body.removeChild(defaultContainer.current);
      }
    };
  }, [container]);

  const targetContainer = container || defaultContainer.current;
  if (!targetContainer) return null;

  return ReactDOM.createPortal(children, targetContainer);
}`}
        </CodeBlock>

        <InfoBox type="important">
          Combine function component types with hooks, context, and composition
          patterns for production-ready components. Use compound components for
          flexible APIs, HOCs for cross-cutting concerns, and type-safe patterns
          for controlled/uncontrolled components.
        </InfoBox>
      </Section>
    </div>
  );
}
