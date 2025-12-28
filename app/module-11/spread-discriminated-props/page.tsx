import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function SpreadDiscriminatedPropsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Spread Props & Discriminated Props
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Spread props enable extending HTML attributes. Discriminated props use
        union types with discriminators. Understanding both patterns enables
        flexible, type-safe component APIs.
      </p>

      <Section title="1. Spread Props & Extending HTML Attributes">
        <p className="text-gray-700 dark:text-gray-300">
          Spread props use rest parameters to extend HTML attributes.
          Understanding spread prop typing enables flexible component APIs that
          accept all HTML attributes.
        </p>

        <CodeBlock title="Spread Props Typing">
          {`// Basic spread props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

function Button({ variant, isLoading, children, ...rest }: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant || "primary"}\`}
      disabled={isLoading || rest.disabled}
      {...rest}  // Spread all other HTML attributes
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

// Usage
<Button variant="primary" onClick={() => {}} type="submit" disabled={false}>
  Click me
</Button>

// Spread with Omit for excluding props
interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  onChange: (value: string) => void;  // Custom onChange signature
}

function CustomInput({ label, onChange, ...rest }: CustomInputProps) {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        {...rest}
        onChange={(e) => onChange(e.target.value)}  // Custom handler
      />
    </div>
  );
}

// Spread with Pick for including specific props
interface MinimalButtonProps
  extends Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onClick" | "disabled" | "type"
  > {
  label: string;
}

function MinimalButton({ label, ...rest }: MinimalButtonProps) {
  return <button {...rest}>{label}</button>;
}

// Spread with intersection for combining
interface StyledButtonProps {
  variant?: "primary" | "secondary";
  size?: "small" | "large";
}

type FullButtonProps = StyledButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

function StyledButton({ variant, size, ...rest }: FullButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      {...rest}
    />
  );
}

// Rest props typing
interface ComponentProps {
  required: string;
  optional?: number;
}

function Component({ required, optional, ...rest }: ComponentProps & {
  [key: string]: any;  // Allow any additional props
}) {
  return (
    <div>
      <p>Required: {required}</p>
      {optional && <p>Optional: {optional}</p>}
      {/* Access rest props */}
      {Object.entries(rest).map(([key, value]) => (
        <p key={key}>{key}: {String(value)}</p>
      ))}
    </div>
  );
}

// Typed rest props
interface TypedRestProps {
  name: string;
  age: number;
  [key: string]: string | number | undefined;  // Typed rest props
}

function TypedRestComponent({ name, age, ...rest }: TypedRestProps) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      {Object.entries(rest).map(([key, value]) => (
        <p key={key}>
          {key}: {value}
        </p>
      ))}
    </div>
  );
}

// Spread with forwardRef
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...rest }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <input ref={ref} {...rest} />
      </div>
    );
  }
);

// Spread with component composition
interface BaseProps {
  className?: string;
}

interface EnhancedProps extends BaseProps {
  variant?: string;
}

function BaseComponent({ className, ...rest }: BaseProps & React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...rest} />;
}

function EnhancedComponent({
  variant,
  className,
  ...rest
}: EnhancedProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <BaseComponent
      className={\`enhanced \${variant} \${className || ""}\`}
      {...rest}
    />
  );
}

// Spread with polymorphic components
interface PolymorphicProps<E extends React.ElementType = "div"> {
  as?: E;
  variant?: string;
}

function Polymorphic<E extends React.ElementType = "div">({
  as,
  variant,
  ...rest
}: PolymorphicProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof PolymorphicProps<E>>) {
  const Component = as || "div";
  return <Component className={variant} {...rest} />;
}

// Spread with form elements
interface FormFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

function FormField({ value, onChange, error, ...rest }: FormFieldProps) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
        style={error ? { borderColor: "red" } : undefined}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

// Spread with event handlers
interface CustomButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>, data: string) => void;
  data: string;
}

function CustomButton({ onClick, data, ...rest }: CustomButtonProps) {
  return (
    <button
      {...rest}
      onClick={(e) => onClick(e, data)}  // Custom handler with extra data
    />
  );
}

// Spread with style props
interface StyledProps extends React.HTMLAttributes<HTMLDivElement> {
  customStyle?: React.CSSProperties;
}

function StyledComponent({ customStyle, style, ...rest }: StyledProps) {
  return (
    <div
      {...rest}
      style={{ ...customStyle, ...style }}  // Merge styles
    />
  );
}

// Spread with aria attributes
interface AccessibleProps extends React.HTMLAttributes<HTMLDivElement> {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  role?: string;
}

function AccessibleComponent(props: AccessibleProps) {
  return <div {...props} />;  // Spread includes aria attributes
}

// Spread with data attributes
interface DataAttributes extends React.HTMLAttributes<HTMLDivElement> {
  "data-testid"?: string;
  "data-analytics"?: string;
}

function DataComponent(props: DataAttributes) {
  return <div {...props} />;
}

// Type-safe spread helper
type ExtendProps<T, E extends object = {}> = T & Omit<E, keyof T>;

interface CustomProps {
  variant: string;
}

type ExtendedProps = ExtendProps<
  CustomProps,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

function ExtendedComponent({ variant, ...rest }: ExtendedProps) {
  return <button className={variant} {...rest} />;
}`}
        </CodeBlock>

        <InfoBox type="info">
          Spread props use rest parameters to extend HTML attributes. Use Omit
          to exclude conflicting props. Use Pick to include specific props.
          Combine with intersection types for multiple extensions. Spread props
          enable flexible, type-safe component APIs.
        </InfoBox>
      </Section>

      <Section title="2. Discriminated Props">
        <p className="text-gray-700 dark:text-gray-300">
          Discriminated props use union types with a discriminator property.
          Understanding discriminated prop typing enables type-safe
          variant-based component APIs.
        </p>

        <CodeBlock title="Discriminated Props Typing">
          {`// Basic discriminated props
type ButtonProps =
  | { variant: "primary"; onClick: () => void }
  | { variant: "secondary"; onClick: () => void; icon: React.ReactNode }
  | { variant: "danger"; onClick: () => void; confirm?: boolean };

function Button(props: ButtonProps) {
  // Type narrowing works based on variant
  if (props.variant === "primary") {
    // props.icon doesn't exist here
    return (
      <button className="btn-primary" onClick={props.onClick}>
        Primary
      </button>
    );
  }

  if (props.variant === "secondary") {
    // props.icon is available here
    return (
      <button className="btn-secondary" onClick={props.onClick}>
        {props.icon}
        Secondary
      </button>
    );
  }

  // props.variant === "danger" here
  // props.confirm is optional but available
  return (
    <button
      className="btn-danger"
      onClick={props.onClick}
      data-confirm={props.confirm}
    >
      Danger
    </button>
  );
}

// Usage
<Button variant="primary" onClick={() => {}} />
<Button variant="secondary" onClick={() => {}} icon={<Icon />} />
<Button variant="danger" onClick={() => {}} confirm />

// Discriminated props with common properties
type AlertProps =
  | {
      type: "success";
      message: string;
      onDismiss?: () => void;
    }
  | {
      type: "error";
      message: string;
      error?: Error;
      onRetry?: () => void;
    }
  | {
      type: "warning";
      message: string;
      action?: () => void;
      actionLabel?: string;
    }
  | {
      type: "info";
      message: string;
      link?: string;
      linkText?: string;
    };

function Alert(props: AlertProps) {
  // Common property access
  const { type, message } = props;

  switch (type) {
    case "success":
      return (
        <div className="alert-success">
          {message}
          {props.onDismiss && (
            <button onClick={props.onDismiss}>Dismiss</button>
          )}
        </div>
      );

    case "error":
      return (
        <div className="alert-error">
          {message}
          {props.error && <p>{props.error.message}</p>}
          {props.onRetry && <button onClick={props.onRetry}>Retry</button>}
        </div>
      );

    case "warning":
      return (
        <div className="alert-warning">
          {message}
          {props.action && (
            <button onClick={props.action}>
              {props.actionLabel || "Action"}
            </button>
          )}
        </div>
      );

    case "info":
      return (
        <div className="alert-info">
          {message}
          {props.link && (
            <a href={props.link}>{props.linkText || "Learn more"}</a>
          )}
        </div>
      );
  }
}

// Usage
<Alert type="success" message="Operation successful" />
<Alert type="error" message="Operation failed" error={new Error("Failed")} />
<Alert type="warning" message="Warning message" action={() => {}} />
<Alert type="info" message="Info message" link="/docs" />

// Discriminated props with nested discrimination
type FormFieldProps =
  | {
      fieldType: "text";
      value: string;
      onChange: (value: string) => void;
      placeholder?: string;
    }
  | {
      fieldType: "number";
      value: number;
      onChange: (value: number) => void;
      min?: number;
      max?: number;
    }
  | {
      fieldType: "select";
      value: string;
      onChange: (value: string) => void;
      options: Array<{ value: string; label: string }>;
    }
  | {
      fieldType: "checkbox";
      value: boolean;
      onChange: (value: boolean) => void;
      label?: string;
    };

function FormField(props: FormFieldProps) {
  switch (props.fieldType) {
    case "text":
      return (
        <input
          type="text"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
        />
      );

    case "number":
      return (
        <input
          type="number"
          value={props.value}
          onChange={(e) => props.onChange(Number(e.target.value))}
          min={props.min}
          max={props.max}
        />
      );

    case "select":
      return (
        <select value={props.value} onChange={(e) => props.onChange(e.target.value)}>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    case "checkbox":
      return (
        <label>
          <input
            type="checkbox"
            checked={props.value}
            onChange={(e) => props.onChange(e.target.checked)}
          />
          {props.label}
        </label>
      );
  }
}

// Discriminated props with multiple discriminators
type ComponentProps =
  | { layout: "horizontal"; alignment: "left" | "right"; content: React.ReactNode }
  | { layout: "vertical"; alignment: "top" | "bottom"; content: React.ReactNode }
  | { layout: "grid"; columns: number; items: React.ReactNode[] };

function Component(props: ComponentProps) {
  switch (props.layout) {
    case "horizontal":
      return (
        <div className={\`horizontal \${props.alignment}\`}>
          {props.content}
        </div>
      );

    case "vertical":
      return (
        <div className={\`vertical \${props.alignment}\`}>
          {props.content}
        </div>
      );

    case "grid":
      return (
        <div className="grid" style={{ gridTemplateColumns: \`repeat(\${props.columns}, 1fr)\` }}>
          {props.items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      );
  }
}

// Discriminated props with optional discriminator
type FlexibleProps =
  | { variant: "primary"; label: string }
  | { variant: "secondary"; label: string; icon?: React.ReactNode }
  | { variant?: "default"; label: string; description?: string };

function FlexibleComponent(props: FlexibleProps) {
  if (props.variant === "primary") {
    return <button className="primary">{props.label}</button>;
  }

  if (props.variant === "secondary") {
    return (
      <button className="secondary">
        {props.icon}
        {props.label}
      </button>
    );
  }

  // Default variant
  return (
    <div>
      <h3>{props.label}</h3>
      {props.description && <p>{props.description}</p>}
    </div>
  );
}

// Discriminated props helper type
type DiscriminatedUnion<
  T extends Record<string, any>,
  K extends keyof T = "type"
> = T extends { [Key in K]: infer V }
  ? V extends string | number
    ? T
    : never
  : never;

// Usage
type ButtonProps2 = DiscriminatedUnion<
  | { type: "button"; onClick: () => void }
  | { type: "link"; href: string }
  | { type: "submit"; form: string }
>;

// Type-safe discriminated props factory
function createDiscriminatedComponent<T extends string>(
  discriminator: T,
  variants: Record<T, React.ComponentType<any>>
) {
  return function Component(props: { [K in T]: K } & Record<string, any>) {
    const Variant = variants[props[discriminator]];
    return <Variant {...props} />;
  };
}`}
        </CodeBlock>

        <InfoBox type="important">
          Discriminated props use union types with a discriminator property.
          Type narrowing works automatically with discriminated unions. Use
          switch statements for exhaustive checking. Discriminated props enable
          type-safe variant-based component APIs with proper type narrowing.
        </InfoBox>
      </Section>
    </div>
  );
}
