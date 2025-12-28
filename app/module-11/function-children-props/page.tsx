import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function FunctionChildrenPropsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Function Props & Children Props
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Function props enable callbacks and event handlers. Children props
        support different patterns for children typing. Understanding both
        patterns enables flexible, type-safe component APIs.
      </p>

      <Section title="1. Function Props & Callbacks">
        <p className="text-gray-700 dark:text-gray-300">
          Function props use callback types for event handlers and async
          operations. Understanding function prop typing enables type-safe
          callbacks and event handlers.
        </p>

        <CodeBlock title="Function Props Typing">
          {`// Basic function props
interface ButtonProps {
  onClick: () => void;
  onHover?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ onClick, onHover }: ButtonProps) {
  return (
    <button onClick={onClick} onMouseEnter={onHover}>
      Click me
    </button>
  );
}

// Typed event handler props
interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (field: string, value: string) => void;
  onValidate?: (data: FormData) => boolean | string;
}

function Form({ onSubmit, onChange, onValidate }: FormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onValidate) {
      const formData = new FormData(e.currentTarget);
      const result = onValidate(formData);
      if (result !== true) {
        console.error(result || "Validation failed");
        return;
      }
    }
    onSubmit(e);
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}

// Async function props
interface AsyncButtonProps {
  onClick: () => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

function AsyncButton({ onClick, onSuccess, onError }: AsyncButtonProps) {
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Loading..." : "Submit"}
    </button>
  );
}

// Generic function props
interface DataFetcherProps<T> {
  fetchData: () => Promise<T>;
  onSuccess: (data: T) => void;
  onError?: (error: Error) => void;
}

function DataFetcher<T>({
  fetchData,
  onSuccess,
  onError,
}: DataFetcherProps<T>) {
  React.useEffect(() => {
    fetchData()
      .then(onSuccess)
      .catch((error) => onError?.(error));
  }, [fetchData, onSuccess, onError]);

  return null;
}

// Function props with multiple parameters
interface CalculatorProps {
  onCalculate: (a: number, b: number, operation: "+" | "-" | "*" | "/") => number;
  onResult?: (result: number) => void;
}

function Calculator({ onCalculate, onResult }: CalculatorProps) {
  const [result, setResult] = React.useState<number | null>(null);

  const calculate = (a: number, b: number, op: "+" | "-" | "*" | "/") => {
    const res = onCalculate(a, b, op);
    setResult(res);
    onResult?.(res);
  };

  return (
    <div>
      <button onClick={() => calculate(5, 3, "+")}>5 + 3</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
}

// Function props with overloads
interface OverloadProps {
  onAction: {
    (value: string): void;
    (value: number): void;
    (value: boolean): void;
  };
}

function OverloadComponent({ onAction }: OverloadProps) {
  return (
    <div>
      <button onClick={() => onAction("string")}>String</button>
      <button onClick={() => onAction(42)}>Number</button>
      <button onClick={() => onAction(true)}>Boolean</button>
    </div>
  );
}

// Function props with conditional return
interface ConditionalProps {
  onAction: (input: string) => string | number | null;
  onResult: (result: string | number | null) => void;
}

function ConditionalComponent({ onAction, onResult }: ConditionalProps) {
  const handleAction = (input: string) => {
    const result = onAction(input);
    onResult(result);
  };

  return <input onChange={(e) => handleAction(e.target.value)} />;
}

// Function props with generic parameters
interface GenericCallbackProps<T, R> {
  transform: (value: T) => R;
  onTransform: (result: R) => void;
  value: T;
}

function GenericCallback<T, R>({
  transform,
  onTransform,
  value,
}: GenericCallbackProps<T, R>) {
  React.useEffect(() => {
    const result = transform(value);
    onTransform(result);
  }, [transform, onTransform, value]);

  return null;
}

// Function props with higher-order functions
interface HOFProps {
  createHandler: (id: string) => () => void;
  items: string[];
}

function HOFComponent({ createHandler, items }: HOFProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
          <button onClick={createHandler(item)}>{item}</button>
        </li>
      ))}
    </ul>
  );
}

// Usage
<HOFComponent
  items={["item1", "item2", "item3"]}
  createHandler={(id) => () => console.log(\`Clicked \${id}\`)}
/>

// Function props with currying
interface CurriedProps {
  onClick: (step: number) => (event: React.MouseEvent) => void;
}

function CurriedComponent({ onClick }: CurriedProps) {
  return (
    <div>
      <button onClick={onClick(1)}>Step 1</button>
      <button onClick={onClick(2)}>Step 2</button>
      <button onClick={onClick(3)}>Step 3</button>
    </div>
  );
}

// Usage
<CurriedComponent onClick={(step) => (e) => console.log(\`Step \${step}\`)} />

// Typed callback utility types
type Callback<T extends any[] = [], R = void> = (...args: T) => R;

interface UtilityProps {
  onSuccess: Callback<[string, number]>;
  onError: Callback<[Error]>;
  onComplete: Callback;
}

function UtilityComponent({ onSuccess, onError, onComplete }: UtilityProps) {
  React.useEffect(() => {
    try {
      onSuccess("result", 42);
    } catch (error) {
      onError(error as Error);
    } finally {
      onComplete();
    }
  }, [onSuccess, onError, onComplete]);

  return null;
}

// Function props with memoization
interface MemoizedProps {
  onClick: React.MemoExoticComponent<(id: string) => void>;
  items: string[];
}

// Or better: use React.useCallback in parent
interface BetterMemoizedProps {
  onClick: (id: string) => void;  // Parent should memoize with useCallback
  items: string[];
}`}
        </CodeBlock>

        <InfoBox type="info">
          Function props use callback types for event handlers. Type event
          handlers with React event types. Use generic function props for
          reusable callbacks. Use overloads for multiple signatures. Function
          props enable flexible, type-safe component callbacks.
        </InfoBox>
      </Section>

      <Section title="2. Children Props Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Children props support different patterns for children typing.
          Understanding children prop patterns enables flexible component APIs
          with different children types.
        </p>

        <CodeBlock title="Children Props Typing">
          {`// Basic children prop
interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return <div className="container">{children}</div>;
}

// Usage
<Container>
  <p>Text content</p>
  <button>Button</button>
</Container>

// Specific children types
interface SpecificChildrenProps {
  children: React.ReactElement;  // Single element only
}

function SpecificContainer({ children }: SpecificChildrenProps) {
  return <div className="specific">{children}</div>;
}

// Usage
<SpecificContainer>
  <div>Single element</div>
</SpecificContainer>

// Children as array
interface ArrayChildrenProps {
  children: React.ReactElement[];
}

function ArrayContainer({ children }: ArrayChildrenProps) {
  return (
    <ul>
      {children.map((child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
}

// Usage
<ArrayContainer>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</ArrayContainer>

// Children with render prop
interface RenderPropProps {
  children: (data: { count: number; increment: () => void }) => React.ReactNode;
}

function RenderPropComponent({ children }: RenderPropProps) {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount((c) => c + 1);

  return <>{children({ count, increment })}</>;
}

// Usage
<RenderPropComponent>
  {({ count, increment }) => (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )}
</RenderPropComponent>

// Children with multiple render functions
interface MultiRenderProps {
  header?: () => React.ReactNode;
  children: React.ReactNode;
  footer?: () => React.ReactNode;
}

function MultiRenderComponent({
  header,
  children,
  footer,
}: MultiRenderProps) {
  return (
    <div>
      {header?.()}
      <main>{children}</main>
      {footer?.()}
    </div>
  );
}

// Usage
<MultiRenderComponent
  header={() => <header>Header</header>}
  footer={() => <footer>Footer</footer>}
>
  <p>Content</p>
</MultiRenderComponent>

// Children with typed context
interface TypedContextProps {
  children: (context: { value: string; setValue: (v: string) => void }) => React.ReactNode;
}

function TypedContextComponent({ children }: TypedContextProps) {
  const [value, setValue] = React.useState("initial");

  return <>{children({ value, setValue })}</>;
}

// Usage
<TypedContextComponent>
  {({ value, setValue }) => (
    <input value={value} onChange={(e) => setValue(e.target.value)} />
  )}
</TypedContextComponent>

// Children as function or element
interface FlexibleChildrenProps {
  children: React.ReactNode | ((data: { id: string }) => React.ReactNode);
  data: { id: string };
}

function FlexibleChildren({ children, data }: FlexibleChildrenProps) {
  if (typeof children === "function") {
    return <>{children(data)}</>;
  }
  return <>{children}</>;
}

// Usage
<FlexibleChildren data={{ id: "1" }}>
  {({ id }) => <p>ID: {id}</p>}
</FlexibleChildren>

<FlexibleChildren data={{ id: "1" }}>
  <p>Static content</p>
</FlexibleChildren>

// Children with optional render
interface OptionalRenderProps {
  children?: React.ReactNode | (() => React.ReactNode);
  fallback?: React.ReactNode;
}

function OptionalRender({ children, fallback }: OptionalRenderProps) {
  if (!children) {
    return <>{fallback || null}</>;
  }

  if (typeof children === "function") {
    return <>{children()}</>;
  }

  return <>{children}</>;
}

// Children with slot pattern
interface SlotProps {
  children: {
    header?: React.ReactNode;
    content: React.ReactNode;
    footer?: React.ReactNode;
  };
}

function SlotComponent({ children }: SlotProps) {
  return (
    <div>
      {children.header && <header>{children.header}</header>}
      <main>{children.content}</main>
      {children.footer && <footer>{children.footer}</footer>}
    </div>
  );
}

// Usage (requires React.Children manipulation or compound components)
// Better pattern: use separate props

interface BetterSlotProps {
  header?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

function BetterSlotComponent({
  header,
  content,
  footer,
}: BetterSlotProps) {
  return (
    <div>
      {header && <header>{header}</header>}
      <main>{content}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

// Children with React.Children utilities
interface ChildrenUtilsProps {
  children: React.ReactNode;
}

function ChildrenUtilsComponent({ children }: ChildrenUtilsProps) {
  // Count children
  const count = React.Children.count(children);

  // Map over children
  const mapped = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { key: index });
    }
    return child;
  });

  // ForEach
  React.Children.forEach(children, (child, index) => {
    console.log(\`Child \${index}:\`, child);
  });

  // To array
  const array = React.Children.toArray(children);

  return (
    <div>
      <p>Children count: {count}</p>
      {mapped}
    </div>
  );
}

// Children with type narrowing
interface NarrowedChildrenProps {
  children: React.ReactElement<{ variant?: string }> | React.ReactElement<{ variant?: string }>[];
}

function NarrowedChildrenComponent({ children }: NarrowedChildrenProps) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<{
    variant?: string;
  }>[];

  return (
    <div>
      {childrenArray.map((child, index) => {
        const variant = child.props.variant || "default";
        return (
          <div key={index} className={\`variant-\${variant}\`}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

// Children with validation
interface ValidatedChildrenProps {
  children: React.ReactElement<{ required: boolean }>;
  minCount?: number;
}

function ValidatedChildren({ children, minCount = 1 }: ValidatedChildrenProps) {
  const childrenArray = React.Children.toArray(children);

  if (childrenArray.length < minCount) {
    return <div>At least {minCount} child required</div>;
  }

  // Validate all children have required prop
  const valid = childrenArray.every((child) =>
    React.isValidElement(child) && child.props.required !== undefined
  );

  if (!valid) {
    return <div>All children must have required prop</div>;
  }

  return <>{children}</>;
}

// Type-safe children helper
type ChildrenType =
  | React.ReactNode
  | ((props: Record<string, any>) => React.ReactNode)
  | React.ReactElement[]
  | React.ReactElement;

function isRenderFunction(
  children: ChildrenType
): children is (props: Record<string, any>) => React.ReactNode {
  return typeof children === "function";
}

function processChildren(children: ChildrenType, props?: Record<string, any>) {
  if (isRenderFunction(children)) {
    return children(props || {});
  }
  return children;
}`}
        </CodeBlock>

        <InfoBox type="important">
          Children props support different patterns: ReactNode for flexible
          children, ReactElement for single element, arrays for multiple
          elements, and functions for render props. Use React.Children utilities
          for manipulation. Children props enable flexible, type-safe component
          composition.
        </InfoBox>
      </Section>
    </div>
  );
}
