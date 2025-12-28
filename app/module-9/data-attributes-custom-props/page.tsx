import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function DataAttributesCustomPropsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Data Attributes & Custom Props
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React provides typed data-* attributes and support for custom props.
        Understanding data attribute typing enables type-safe data passing and
        testing attributes.
      </p>

      <Section title="1. Data Attributes">
        <p className="text-gray-700 dark:text-gray-300">
          React supports data-* attributes with camelCase naming. All data-*
          attributes are typed as string | undefined in HTMLAttributes.
          Understanding data attribute typing enables type-safe testing and data
          passing.
        </p>

        <CodeBlock title="Data Attributes Typing">
          {`// Data attributes in React
// React converts data-* attributes to camelCase (e.g., data-test-id -> dataTestId)

// Basic data attributes
function DataAttributesExample() {
  const props: React.HTMLAttributes<HTMLDivElement> = {
    // Standard data attributes (camelCase)
    dataTestId: "test-element",
    dataId: "unique-id",
    dataValue: "some-value",
    dataName: "element-name",
    dataType: "component",
    dataRole: "container",
    dataState: "active",
    dataIndex: "0",
    dataKey: "item-key",
    
    // Any data-* attribute is supported
    dataCustomAttribute: "custom-value",
    dataFeatureFlag: "enabled",
    dataAnalyticsId: "analytics-123",
    dataTrackingId: "tracking-456",
  };

  return <div {...props}>Content</div>;
}

// Data attributes with different elements
function DataAttributesWithElements() {
  return (
    <div>
      {/* Div with data attributes */}
      <div dataTestId="div" dataRole="container">
        Div
      </div>

      {/* Button with data attributes */}
      <button dataTestId="button" dataAction="submit">
        Button
      </button>

      {/* Input with data attributes */}
      <input
        dataTestId="input"
        dataValidation="required"
        dataFormat="email"
      />

      {/* Form with data attributes */}
      <form dataTestId="form" dataFormType="registration">
        Form
      </form>

      {/* Image with data attributes */}
      <img
        dataTestId="image"
        dataSource="cdn"
        dataLazy="true"
        src="image.jpg"
        alt="Image"
      />
    </div>
  );
}

// Type-safe data attributes component
interface DataTestableProps extends React.HTMLAttributes<HTMLDivElement> {
  dataTestId?: string;
  dataComponent?: string;
  dataState?: string;
  dataIndex?: string;
}

function DataTestable({
  dataTestId,
  dataComponent,
  dataState,
  dataIndex,
  ...props
}: DataTestableProps) {
  return (
    <div
      data-test-id={dataTestId}
      data-component={dataComponent}
      data-state={dataState}
      data-index={dataIndex}
      {...props}
    >
      {props.children}
    </div>
  );
}

// Data attributes for testing
function TestingAttributes() {
  return (
    <div>
      {/* Common testing attributes */}
      <button
        dataTestId="submit-button"
        dataTestName="submit"
        dataTestAction="submit"
      >
        Submit
      </button>

      <input
        dataTestId="email-input"
        dataTestName="email"
        dataTestValidation="required|email"
      />

      <div
        dataTestId="modal"
        dataTestState="open"
        dataTestComponent="Modal"
      >
        Modal content
      </div>

      {/* List with data attributes */}
      <ul>
        {["Item 1", "Item 2", "Item 3"].map((item, index) => (
          <li
            key={index}
            dataTestId={\`list-item-\${index}\`}
            dataTestIndex={String(index)}
            dataTestValue={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Data attributes for state
function StateAttributes() {
  const [isActive, setIsActive] = React.useState(false);
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button
        dataTestId="toggle"
        dataState={isActive ? "active" : "inactive"}
        dataActive={String(isActive)}
        onClick={() => setIsActive(!isActive)}
      >
        Toggle
      </button>

      <div
        dataTestId="counter"
        dataCount={String(count)}
        dataIsPositive={String(count > 0)}
      >
        Count: {count}
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
}

// Data attributes for analytics
function AnalyticsAttributes() {
  return (
    <div>
      <button
        dataAnalyticsId="header-cta"
        dataAnalyticsCategory="engagement"
        dataAnalyticsAction="click"
        dataAnalyticsLabel="header-button"
        onClick={() => {}}
      >
        CTA
      </button>

      <a
        href="/page"
        dataAnalyticsId="navigation-link"
        dataAnalyticsTrack="true"
        dataAnalyticsPage="home"
      >
        Link
      </a>
    </div>
  );
}

// Data attributes for feature flags
function FeatureFlagAttributes() {
  const features = {
    newDesign: true,
    betaFeature: false,
  };

  return (
    <div
      dataFeatureFlag="new-design"
      dataFeatureEnabled={String(features.newDesign)}
      dataFeatureBeta={String(features.betaFeature)}
    >
      Content
    </div>
  );
}

// Data attributes helper type
type DataAttributes = {
  [K in \`data-\${string}\`]?: string;
};

// Custom data attributes type
interface CustomDataAttributes {
  dataTestId?: string;
  dataComponent?: string;
  dataState?: string;
  dataIndex?: string;
  dataValue?: string;
  dataKey?: string;
}

function CustomDataComponent({
  dataTestId,
  dataComponent,
  dataState,
  dataIndex,
  dataValue,
  dataKey,
  ...props
}: CustomDataAttributes & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-test-id={dataTestId}
      data-component={dataComponent}
      data-state={dataState}
      data-index={dataIndex}
      data-value={dataValue}
      data-key={dataKey}
      {...props}
    >
      {props.children}
    </div>
  );
}

// Generic data attributes
function GenericDataAttributes<T extends Record<string, string>>(
  props: {
    dataAttributes?: T;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  const dataProps: Record<string, string> = {};

  if (props.dataAttributes) {
    Object.entries(props.dataAttributes).forEach(([key, value]) => {
      // Convert camelCase to kebab-case for data-* attributes
      const dataKey = \`data-\${key.replace(/([A-Z])/g, "-$1").toLowerCase()}\`;
      dataProps[dataKey] = value;
    });
  }

  const { dataAttributes, ...rest } = props;

  return (
    <div {...dataProps} {...rest}>
      {props.children}
    </div>
  );
}

// Usage
function GenericUsage() {
  return (
    <GenericDataAttributes
      dataAttributes={{
        testId: "test",
        component: "Button",
        state: "active",
      }}
    >
      Content
    </GenericDataAttributes>
  );
}

// Data attributes with spread
function DataAttributesSpread() {
  const baseDataAttributes = {
    dataTestId: "base",
    dataComponent: "BaseComponent",
  };

  const additionalDataAttributes = {
    dataState: "loaded",
    dataIndex: "0",
  };

  return (
    <div {...baseDataAttributes} {...additionalDataAttributes}>
      Content
    </div>
  );
}

// Type-safe data attribute extraction
function extractDataAttributes(
  element: HTMLElement
): Record<string, string> {
  const dataAttrs: Record<string, string> = {};

  Array.from(element.attributes).forEach((attr) => {
    if (attr.name.startsWith("data-")) {
      // Convert kebab-case to camelCase
      const camelKey = attr.name
        .replace(/^data-/, "")
        .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      dataAttrs[camelKey] = attr.value;
    }
  });

  return dataAttrs;
}

// Usage
function ExtractUsage() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      const dataAttrs = extractDataAttributes(ref.current);
      console.log("Data attributes:", dataAttrs);
    }
  }, []);

  return (
    <div
      ref={ref}
      dataTestId="test"
      dataComponent="TestComponent"
      dataState="active"
    >
      Content
    </div>
  );
}

// Note: React converts camelCase data attributes to kebab-case in HTML
// dataTestId in JSX becomes data-test-id in HTML
// This is handled automatically by React`}
        </CodeBlock>

        <InfoBox type="info">
          React supports data-* attributes with camelCase naming in JSX (e.g.,
          dataTestId). React automatically converts these to kebab-case in HTML
          (e.g., data-test-id). All data-* attributes are typed as string |
          undefined in HTMLAttributes. Use data attributes for testing,
          analytics, feature flags, and passing data to components.
        </InfoBox>
      </Section>

      <Section title="2. Custom Props">
        <p className="text-gray-700 dark:text-gray-300">
          React components can accept custom props beyond standard HTML
          attributes. Understanding custom prop patterns enables flexible,
          type-safe component APIs.
        </p>

        <CodeBlock title="Custom Props Patterns">
          {`// Custom props with HTML attributes
interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function CustomButton({
  variant = "primary",
  size = "medium",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className,
  ...props
}: CustomButtonProps) {
  const baseClasses = "btn";
  const variantClass = \`btn-\${variant}\`;
  const sizeClass = \`btn-\${size}\`;
  const loadingClass = isLoading ? "btn-loading" : "";
  const classes = [baseClasses, variantClass, sizeClass, loadingClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      className={classes}
      disabled={disabled || isLoading}
    >
      {isLoading && <span className="spinner">Loading...</span>}
      {leftIcon && <span className="icon-left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="icon-right">{rightIcon}</span>}
    </button>
  );
}

// Custom props that don't extend HTML attributes
interface CustomComponentProps {
  title: string;
  description?: string;
  items: string[];
  onItemClick?: (item: string) => void;
  renderItem?: (item: string) => React.ReactNode;
}

function CustomComponent({
  title,
  description,
  items,
  onItemClick,
  renderItem,
}: CustomComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => onItemClick?.(item)}
          >
            {renderItem ? renderItem(item) : item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Custom props with composition
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  body?: React.ReactNode;
  title?: string;
  subtitle?: string;
}

function Card({
  header,
  footer,
  body,
  title,
  subtitle,
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div className={\`card \${className || ""}\`} {...props}>
      {header && <div className="card-header">{header}</div>}
      {(title || subtitle) && (
        <div className="card-title-section">
          {title && <h3>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      {(body || children) && (
        <div className="card-body">{body || children}</div>
      )}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Polymorphic component with custom props
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children?: React.ReactNode;
  customProp?: string;
} & React.ComponentPropsWithoutRef<E>;

function PolymorphicComponent<E extends React.ElementType = "div">({
  as,
  children,
  customProp,
  ...props
}: PolymorphicProps<E>) {
  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
}

// Usage
function PolymorphicUsage() {
  return (
    <div>
      <PolymorphicComponent>Default div</PolymorphicComponent>
      <PolymorphicComponent as="button" onClick={() => {}}>
        Button
      </PolymorphicComponent>
      <PolymorphicComponent as="a" href="/link">
        Link
      </PolymorphicComponent>
    </div>
  );
}

// Discriminated union props
type ButtonProps =
  | {
      variant: "icon";
      icon: React.ReactNode;
      label?: never;
    }
  | {
      variant: "text";
      label: string;
      icon?: never;
    }
  | {
      variant: "icon-text";
      icon: React.ReactNode;
      label: string;
    };

function DiscriminatedButton(props: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      {props.variant === "icon-text" && (
        <>
          {props.icon}
          {props.label}
        </>
      )}
      {props.variant === "icon" && props.icon}
      {props.variant === "text" && props.label}
    </button>
  );
}

// Conditional props
type ConditionalProps<T extends boolean> = T extends true
  ? { required: true; value: string }
  : { required?: false; value?: string };

function ConditionalComponent<T extends boolean>(
  props: { isRequired: T } & ConditionalProps<T>
) {
  return <div>Value: {props.value || "default"}</div>;
}

// Generic custom props
interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  emptyMessage?: string;
  onItemClick?: (item: T) => void;
}

function GenericList<T>({
  items,
  renderItem,
  keyExtractor = (_, index) => index,
  emptyMessage = "No items",
  onItemClick,
}: GenericListProps<T>) {
  if (items.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={keyExtractor(item, index)}
          onClick={() => onItemClick?.(item)}
        >
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage
function GenericListUsage() {
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ];

  return (
    <GenericList
      items={users}
      renderItem={(user) => user.name}
      keyExtractor={(user) => user.id}
      onItemClick={(user) => console.log(user)}
    />
  );
}

// Custom props with render props
interface RenderPropsComponentProps {
  render: (data: { count: number; increment: () => void }) => React.ReactNode;
  initialCount?: number;
}

function RenderPropsComponent({
  render,
  initialCount = 0,
}: RenderPropsComponentProps) {
  const [count, setCount] = React.useState(initialCount);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return <>{render({ count, increment })}</>;
}

// Usage
function RenderPropsUsage() {
  return (
    <RenderPropsComponent
      initialCount={10}
      render={({ count, increment }) => (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      )}
    />
  );
}

// Custom props with slots
interface SlotsComponentProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

function SlotsComponent({
  header,
  sidebar,
  content,
  footer,
}: SlotsComponentProps) {
  return (
    <div className="layout">
      {header && <header>{header}</header>}
      <div className="body">
        {sidebar && <aside>{sidebar}</aside>}
        <main>{content}</main>
      </div>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

// Usage
function SlotsUsage() {
  return (
    <SlotsComponent
      header={<h1>Header</h1>}
      sidebar={<nav>Sidebar</nav>}
      content={<div>Content</div>}
      footer={<div>Footer</div>}
    />
  );
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Custom props extend HTML attributes or define component-specific
          interfaces. Use TypeScript interfaces for type-safe custom props.
          Common patterns include extending HTMLAttributes, discriminated
          unions, conditional props, generic props, render props, and slot
          patterns. Filter out custom props before spreading to DOM elements.
        </InfoBox>
      </Section>
    </div>
  );
}
