import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function OptionalDefaultPropsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Optional & Default Props
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Optional props allow props to be omitted, marked with ?. Default props
        provide fallback values. Understanding both patterns enables flexible,
        type-safe component APIs.
      </p>

      <Section title="1. Optional Props">
        <p className="text-gray-700 dark:text-gray-300">
          Optional props use the ? syntax to mark properties as optional.
          Understanding optional prop typing enables flexible component APIs.
        </p>

        <CodeBlock title="Optional Props Typing">
          {`// Basic optional props
interface ButtonProps {
  label: string;
  onClick?: () => void;  // Optional
  disabled?: boolean;    // Optional
  variant?: "primary" | "secondary";  // Optional with union
}

function Button({ label, onClick, disabled, variant }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn \${variant || "primary"}\`}
    >
      {label}
    </button>
  );
}

// Usage
<Button label="Click me" />
<Button label="Click me" onClick={() => {}} />
<Button label="Click me" onClick={() => {}} disabled variant="secondary" />

// Optional with undefined explicitly
interface InputProps {
  value: string;
  placeholder?: string | undefined;  // Explicit undefined
  onChange?: (value: string) => void;
}

function Input({ value, placeholder, onChange }: InputProps) {
  return (
    <input
      value={value}
      placeholder={placeholder}  // Type: string | undefined
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

// Optional nested properties
interface User {
  name: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    zipCode?: string;
  };
}

interface UserCardProps {
  user: User;
  showEmail?: boolean;
  showAddress?: boolean;
}

function UserCard({ user, showEmail, showAddress }: UserCardProps) {
  return (
    <div>
      <h3>{user.name}</h3>
      {showEmail && user.email && <p>{user.email}</p>}
      {showAddress && user.address && (
        <div>
          {user.address.street && <p>{user.address.street}</p>}
          {user.address.city && <p>{user.address.city}</p>}
          {user.address.zipCode && <p>{user.address.zipCode}</p>}
        </div>
      )}
    </div>
  );
}

// Optional with conditional types
type OptionalProps<T> = {
  [K in keyof T]?: T[K];
};

interface RequiredUser {
  name: string;
  email: string;
  age: number;
}

type OptionalUser = OptionalProps<RequiredUser>;
// Result: { name?: string; email?: string; age?: number; }

// Optional function props
interface FormProps {
  onSubmit?: (data: FormData) => void;
  onCancel?: () => void;
  onReset?: () => void;
  validation?: (data: FormData) => boolean | string;
}

function Form({ onSubmit, onCancel, onReset, validation }: FormProps) {
  const handleSubmit = (data: FormData) => {
    if (validation) {
      const result = validation(data);
      if (result === false || typeof result === "string") {
        console.error(result || "Validation failed");
        return;
      }
    }
    onSubmit?.(data);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(new FormData(e.currentTarget));
    }}>
      <input name="field" />
      <button type="submit">Submit</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      {onReset && <button type="button" onClick={onReset}>Reset</button>}
    </form>
  );
}

// Optional with required together
interface CardProps {
  title: string;  // Required
  content?: string;  // Optional
  footer?: React.ReactNode;  // Optional
  onClick?: () => void;  // Optional
}

function Card({ title, content, footer, onClick }: CardProps) {
  return (
    <div onClick={onClick} className={onClick ? "cursor-pointer" : ""}>
      <h3>{title}</h3>
      {content && <p>{content}</p>}
      {footer && <div className="footer">{footer}</div>}
    </div>
  );
}

// Optional props with defaults (not using default props)
interface ComponentProps {
  count?: number;
  label?: string;
  enabled?: boolean;
}

function Component({ count = 0, label = "Default", enabled = true }: ComponentProps) {
  return (
    <div>
      <p>{label}: {count}</p>
      <p>Enabled: {enabled ? "Yes" : "No"}</p>
    </div>
  );
}

// Partial utility for all optional
interface StrictProps {
  name: string;
  age: number;
  email: string;
}

type FlexibleProps = Partial<StrictProps>;
// Result: { name?: string; age?: number; email?: string; }

function FlexibleComponent(props: FlexibleProps) {
  return (
    <div>
      {props.name && <p>Name: {props.name}</p>}
      {props.age && <p>Age: {props.age}</p>}
      {props.email && <p>Email: {props.email}</p>}
    </div>
  );
}`}
        </CodeBlock>

        <InfoBox type="info">
          <p>
            Optional props use ? syntax to allow props to be omitted. Use
            optional chaining (?.) for safe access. Combine optional with
            required props for flexible APIs. Use Partial&lt;T&gt; utility type to make
            all props optional.
          </p>
        </InfoBox>
      </Section>

      <Section title="2. Default Props">
        <p className="text-gray-700 dark:text-gray-300">
          Default props provide fallback values. defaultProps (deprecated in
          React) was used with class components. Use default parameters for
          function components.
        </p>

        <CodeBlock title="Default Props Typing">
          {`// Default props with default parameters (recommended)
interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  label: string;
}

function Button({
  variant = "primary",  // Default value
  size = "medium",     // Default value
  disabled = false,    // Default value
  label,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={\`btn btn-\${variant} btn-\${size}\`}
    >
      {label}
    </button>
  );
}

// Usage
<Button label="Click" />  // Uses defaults
<Button label="Click" variant="secondary" size="large" />

// Default props with computed defaults
interface CounterProps {
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

function Counter({
  initialValue = 0,
  step = 1,
  min = -Infinity,
  max = Infinity,
}: CounterProps) {
  const [count, setCount] = React.useState(initialValue);

  const increment = () => setCount((c) => Math.min(c + step, max));
  const decrement = () => setCount((c) => Math.max(c - step, min));

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

// Default props with function defaults
interface AsyncComponentProps {
  url?: string;
  timeout?: number;
  retries?: number;
  onError?: (error: Error) => void;
}

function AsyncComponent({
  url = "https://api.example.com",
  timeout = 5000,
  retries = 3,
  onError = (error) => console.error(error),
}: AsyncComponentProps) {
  // Component implementation
  return null;
}

// Default props with object defaults
interface FormProps {
  initialValues?: Record<string, string>;
  validation?: Record<string, (value: string) => boolean>;
  onSubmit?: (values: Record<string, string>) => void;
}

function Form({
  initialValues = {},
  validation = {},
  onSubmit = () => {},
}: FormProps) {
  // Component implementation
  return null;
}

// Default props with array defaults
interface ListProps<T> {
  items?: T[];
  renderItem?: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

function List<T>({
  items = [],
  renderItem = (item) => String(item),
  emptyMessage = "No items",
}: ListProps<T>) {
  if (items.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Default props with complex objects
interface Config {
  theme: "light" | "dark";
  language: string;
  features: string[];
}

interface AppProps {
  config?: Partial<Config>;
}

const defaultConfig: Config = {
  theme: "light",
  language: "en",
  features: [],
};

function App({ config = {} }: AppProps) {
  const mergedConfig: Config = {
    ...defaultConfig,
    ...config,
    features: config.features || defaultConfig.features,
  };

  return <div>App with config: {JSON.stringify(mergedConfig)}</div>;
}

// defaultProps (deprecated for function components)
// Only works with class components in older React versions
interface ClassComponentProps {
  name: string;
  count: number;
}

class ClassComponent extends React.Component<ClassComponentProps> {
  static defaultProps: Partial<ClassComponentProps> = {
    count: 0,
  };

  render() {
    const { name, count } = this.props;
    return <div>{name}: {count}</div>;
  }
}

// For function components, use default parameters instead
interface FunctionComponentProps {
  name: string;
  count: number;
}

function FunctionComponent({ name, count = 0 }: FunctionComponentProps) {
  return <div>{name}: {count}</div>;
}

// Default props with type narrowing
interface ModalProps {
  isOpen?: boolean;
  title?: string;
  onClose?: () => void;
  variant?: "alert" | "confirm" | "info";
}

function Modal({
  isOpen = false,
  title = "Modal",
  onClose = () => {},
  variant = "info",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={\`modal modal-\${variant}\`}>
      <h2>{title}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// Default props with conditional defaults
interface ThemeProps {
  mode?: "light" | "dark";
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
  };
}

const defaultColors = {
  light: { primary: "#000", secondary: "#666", background: "#fff" },
  dark: { primary: "#fff", secondary: "#999", background: "#000" },
};

function ThemedComponent({
  mode = "light",
  colors = defaultColors[mode],
}: ThemeProps) {
  return (
    <div style={{ background: colors.background, color: colors.primary }}>
      Themed content
    </div>
  );
}

// Default props helper type
type WithDefaults<T, D extends Partial<T>> = Omit<T, keyof D> & {
  [K in keyof D]: D[K] extends undefined ? T[K] : NonNullable<T[K]>;
};

interface Props {
  name?: string;
  age?: number;
  email?: string;
}

const defaults = {
  name: "Unknown",
  age: 0,
} as const;

type PropsWithDefaults = WithDefaults<Props, typeof defaults>;

function ComponentWithDefaults({ name, age, email }: PropsWithDefaults) {
  // name and age are guaranteed to be defined
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      {email && <p>Email: {email}</p>}
    </div>
  );
}`}
        </CodeBlock>

        <InfoBox type="important">
          Use default parameters for default props in function components.
          defaultProps is deprecated for function components. Use default
          parameters in function signatures. Provide defaults for all optional
          props for better developer experience. Use const assertions for
          literal default values.
        </InfoBox>
      </Section>
    </div>
  );
}

