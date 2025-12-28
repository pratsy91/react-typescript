import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function PolymorphicGenericPropsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Polymorphic & Generic Props
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Polymorphic props enable generic component props that work with
        different types. Generic props enable reusable component patterns.
        Understanding both patterns enables flexible, type-safe component APIs.
      </p>

      <Section title="1. Polymorphic Props">
        <p className="text-gray-700 dark:text-gray-300">
          Polymorphic props enable components to render as different HTML
          elements. Understanding polymorphic prop typing enables flexible,
          reusable component APIs.
        </p>

        <CodeBlock title="Polymorphic Props Typing">
          {`// Basic polymorphic props
type As = keyof JSX.IntrinsicElements;

interface PolymorphicProps<T extends As = "div"> {
  as?: T;
  children?: React.ReactNode;
}

function Polymorphic<T extends As = "div">({
  as,
  children,
  ...rest
}: PolymorphicProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof PolymorphicProps<T>>) {
  const Component = as || "div";
  return <Component {...rest}>{children}</Component>;
}

// Usage
<Polymorphic>Default div</Polymorphic>
<Polymorphic as="section">Section</Polymorphic>
<Polymorphic as="button" onClick={() => {}}>Button</Polymorphic>
<Polymorphic as="a" href="/link">Link</Polymorphic>

// Polymorphic with constraints
type AllowedElements = "div" | "section" | "article" | "aside" | "nav";

interface ConstrainedPolymorphicProps<T extends AllowedElements = "div"> {
  as?: T;
  children?: React.ReactNode;
}

function ConstrainedPolymorphic<T extends AllowedElements = "div">({
  as,
  children,
  ...rest
}: ConstrainedPolymorphicProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ConstrainedPolymorphicProps<T>>) {
  const Component = as || "div";
  return <Component {...rest}>{children}</Component>;
}

// Polymorphic with custom props
interface CustomPolymorphicProps<E extends React.ElementType = "div"> {
  as?: E;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
}

function CustomPolymorphic<E extends React.ElementType = "div">({
  as,
  variant = "primary",
  size = "medium",
  children,
  ...props
}: CustomPolymorphicProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof CustomPolymorphicProps<E>>) {
  const Component = as || "div";
  const className = \`\${variant} \${size}\`;

  return (
    <Component {...props} className={className}>
      {children}
    </Component>
  );
}

// Polymorphic with forwardRef
interface PolymorphicRefProps<E extends React.ElementType = "div"> {
  as?: E;
  children?: React.ReactNode;
}

const PolymorphicRef = React.forwardRef(
  <E extends React.ElementType = "div">(
    { as, children, ...props }: PolymorphicRefProps<E> &
      Omit<React.ComponentPropsWithoutRef<E>, keyof PolymorphicRefProps<E>>,
    ref: React.ComponentPropsWithRef<E>["ref"]
  ) => {
    const Component = as || "div";
    // Type assertion needed for polymorphic refs
    return (
      <Component {...props} ref={ref as any}>
        {children}
      </Component>
    );
  }
);

// Polymorphic with discriminated union
type PolymorphicUnionProps =
  | { as: "button"; onClick: () => void; children: React.ReactNode }
  | { as: "a"; href: string; children: React.ReactNode }
  | { as?: "div"; children: React.ReactNode };

function PolymorphicUnion(props: PolymorphicUnionProps) {
  if (props.as === "button") {
    return <button onClick={props.onClick}>{props.children}</button>;
  }
  if (props.as === "a") {
    return <a href={props.href}>{props.children}</a>;
  }
  return <div>{props.children}</div>;
}

// Type-safe polymorphic helper
type PolymorphicPropsHelper<E extends React.ElementType> = {
  as?: E;
} & React.ComponentPropsWithoutRef<E>;

function PolymorphicHelper<E extends React.ElementType = "div">(
  props: PolymorphicPropsHelper<E>
) {
  const { as = "div", ...rest } = props;
  const Component = as as React.ElementType;
  return <Component {...rest} />;
}`}
        </CodeBlock>

        <InfoBox type="info">
          Polymorphic props enable components to render as different HTML
          elements. Use generic types with element type constraints. Combine
          polymorphic props with element props using Omit. Use discriminated
          unions for type-safe conditional props. Polymorphic props enable
          flexible, reusable component APIs.
        </InfoBox>
      </Section>

      <Section title="2. Strict Props">
        <p className="text-gray-700 dark:text-gray-300">
          Strict props enforce exact prop typing without extra properties.
          Understanding strict prop typing enables precise type checking.
        </p>

        <CodeBlock title="Strict Props Typing">
          {`// Basic strict props
interface StrictProps {
  name: string;
  age: number;
}

// This allows extra props (not strict)
function Component(props: StrictProps & Record<string, any>) {
  return <div>{props.name}</div>;
}

// Strict props (exact typing)
type StrictPropsExact = {
  name: string;
  age: number;
} & { [K in never]: never };  // Prevents extra props

// Better: use satisfies for strict checking
function StrictComponent(props: StrictProps) {
  // TypeScript will error on extra props when using satisfies
  return <div>{props.name}</div>;
}

// Usage with satisfies
const props: StrictProps = {
  name: "John",
  age: 30,
  // extra: "value"  // ✗ Error: extra property not allowed
};

<StrictComponent {...props} />

// Strict props with Record
type StrictRecord<T extends string> = {
  [K in T]: string;
};

interface StrictKeys {
  name: string;
  age: string;
}

type StrictPropsRecord = StrictRecord<keyof StrictKeys>;

// Strict props helper type
type Exact<T> = T & { [K in Exclude<string, keyof T>]: never };

interface ExactProps {
  name: string;
  age: number;
}

function ExactComponent(props: Exact<ExactProps>) {
  return <div>{props.name}</div>;
}

// Strict props with object spread
interface SpreadProps {
  required: string;
  optional?: number;
}

function SpreadComponent({ required, optional, ...rest }: SpreadProps) {
  // rest should be empty in strict mode
  if (Object.keys(rest).length > 0) {
    console.warn("Unexpected props:", rest);
  }

  return (
    <div>
      <p>{required}</p>
      {optional && <p>{optional}</p>}
    </div>
  );
}

// Strict props with satisfies operator (TypeScript 4.9+)
interface StrictInterface {
  name: string;
  age: number;
}

function StrictComponentWithSatisfies(props: StrictInterface) {
  return <div>{props.name}</div>;
}

// Usage with satisfies
const strictProps = {
  name: "John",
  age: 30,
} satisfies StrictInterface;

<StrictComponentWithSatisfies {...strictProps} />

// Strict props validation at runtime
interface RuntimeStrictProps {
  name: string;
  age: number;
}

const allowedKeys: Array<keyof RuntimeStrictProps> = ["name", "age"];

function RuntimeStrictComponent(props: RuntimeStrictProps & Record<string, any>) {
  // Validate props at runtime
  const extraKeys = Object.keys(props).filter(
    (key) => !allowedKeys.includes(key as keyof RuntimeStrictProps)
  );

  if (extraKeys.length > 0) {
    console.warn("Unexpected props:", extraKeys);
  }

  return <div>{props.name}</div>;
}

// Strict props with type-level validation
type NoExtraProps<T, U extends T> = T & {
  [K in Exclude<keyof U, keyof T>]: never;
};

interface BaseProps {
  name: string;
}

function StrictComponentWithTypeValidation<T extends BaseProps>(
  props: NoExtraProps<BaseProps, T>
) {
  return <div>{props.name}</div>;
}

// Usage
<StrictComponentWithTypeValidation<BaseProps & { extra: string }>
  name="John"
  // extra="value"  // ✗ Type error
/>

// Better strict props pattern
type Strict<T, U extends T = T> = U & { [K in Exclude<keyof T, keyof U>]?: never };

interface Props {
  name: string;
  age?: number;
}

function BetterStrictComponent(props: Strict<Props>) {
  return <div>{props.name}</div>;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Strict props enforce exact prop typing. Use satisfies operator for
          strict checking. Use type-level validation to prevent extra props.
          Strict props enable precise type checking and catch errors early.
        </InfoBox>
      </Section>

      <Section title="3. Props with Generics">
        <p className="text-gray-700 dark:text-gray-300">
          Generic props enable reusable component patterns that work with
          different types. Understanding generic prop typing enables flexible,
          type-safe component APIs.
        </p>

        <CodeBlock title="Generic Props Typing">
          {`// Basic generic props
interface GenericProps<T> {
  value: T;
  onChange: (value: T) => void;
  render?: (value: T) => React.ReactNode;
}

function GenericComponent<T>({
  value,
  onChange,
  render,
}: GenericProps<T>) {
  return (
    <div>
      {render ? render(value) : String(value)}
      <button onClick={() => onChange(value)}>Trigger</button>
    </div>
  );
}

// Usage
<GenericComponent<string>
  value="Hello"
  onChange={(value) => console.log(value)}
/>

<GenericComponent<number>
  value={42}
  onChange={(value) => console.log(value)}
/>

// Generic props with constraints
interface ConstrainedGenericProps<T extends string | number> {
  value: T;
  format?: (value: T) => string;
}

function ConstrainedGeneric<T extends string | number>({
  value,
  format,
}: ConstrainedGenericProps<T>) {
  const formatted = format ? format(value) : String(value);
  return <div>{formatted}</div>;
}

// Generic props with multiple type parameters
interface MultiGenericProps<T, U> {
  value1: T;
  value2: U;
  combine: (v1: T, v2: U) => React.ReactNode;
}

function MultiGeneric<T, U>({
  value1,
  value2,
  combine,
}: MultiGenericProps<T, U>) {
  return <div>{combine(value1, value2)}</div>;
}

// Usage
<MultiGeneric<string, number>
  value1="Count"
  value2={42}
  combine={(v1, v2) => <p>{v1}: {v2}</p>}
/>

// Generic props with default types
interface DefaultGenericProps<T = string> {
  value: T;
  onChange: (value: T) => void;
}

function DefaultGeneric<T = string>({
  value,
  onChange,
}: DefaultGenericProps<T>) {
  return <input value={String(value)} onChange={(e) => onChange(e.target.value as T)} />;
}

// Usage
<DefaultGeneric value="default" onChange={(v) => {}} />  // T = string
<DefaultGeneric<number> value={42} onChange={(v) => {}} />  // T = number

// Generic props with object constraints
interface ObjectGenericProps<T extends Record<string, any>> {
  data: T;
  keys: Array<keyof T>;
  render: (value: T[keyof T]) => React.ReactNode;
}

function ObjectGeneric<T extends Record<string, any>>({
  data,
  keys,
  render,
}: ObjectGenericProps<T>) {
  return (
    <div>
      {keys.map((key) => (
        <div key={String(key)}>{render(data[key])}</div>
      ))}
    </div>
  );
}

// Usage
<ObjectGeneric
  data={{ name: "John", age: 30 }}
  keys={["name", "age"]}
  render={(value) => <p>{String(value)}</p>}
/>

// Generic props with array constraints
interface ArrayGenericProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor?: (item: T) => string | number;
}

function ArrayGeneric<T>({
  items,
  renderItem,
  keyExtractor,
}: ArrayGenericProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor ? keyExtractor(item) : index}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage
<ArrayGeneric<{ id: number; name: string }>
  items={[{ id: 1, name: "John" }, { id: 2, name: "Jane" }]}
  renderItem={(item) => <p>{item.name}</p>}
  keyExtractor={(item) => item.id}
/>

// Generic props with function constraints
interface FunctionGenericProps<T extends (...args: any[]) => any> {
  fn: T;
  args: Parameters<T>;
  onResult: (result: ReturnType<T>) => void;
}

function FunctionGeneric<T extends (...args: any[]) => any>({
  fn,
  args,
  onResult,
}: FunctionGenericProps<T>) {
  React.useEffect(() => {
    const result = fn(...args);
    onResult(result);
  }, [fn, args, onResult]);

  return null;
}

// Generic props with conditional types
interface ConditionalGenericProps<T> {
  value: T;
  render: T extends string
    ? (value: string) => React.ReactNode
    : T extends number
    ? (value: number) => React.ReactNode
    : (value: T) => React.ReactNode;
}

function ConditionalGeneric<T>({
  value,
  render,
}: ConditionalGenericProps<T>) {
  return <div>{render(value as any)}</div>;
}

// Generic props factory
function createGenericComponent<T>() {
  return function Component({
    value,
    onChange,
  }: {
    value: T;
    onChange: (value: T) => void;
  }) {
    return (
      <input
        value={String(value)}
        onChange={(e) => onChange(e.target.value as T)}
      />
    );
  };
}

// Usage
const StringInput = createGenericComponent<string>();
const NumberInput = createGenericComponent<number>();

<StringInput value="hello" onChange={(v) => {}} />
<NumberInput value={42} onChange={(v) => {}} />

// Generic props with higher-order types
type GenericComponent<T> = React.FC<{
  value: T;
  onChange: (value: T) => void;
}>;

function createTypedComponent<T>(): GenericComponent<T> {
  return function Component({ value, onChange }) {
    return (
      <input
        value={String(value)}
        onChange={(e) => onChange(e.target.value as T)}
      />
    );
  };
}

// Type-safe generic props helper
type GenericPropsHelper<T> = {
  value: T;
} & (T extends string
  ? { format?: (value: string) => string }
  : T extends number
  ? { format?: (value: number) => string }
  : { format?: (value: T) => string });

function GenericHelper<T>({
  value,
  format,
}: GenericPropsHelper<T>) {
  const formatted = format ? format(value as any) : String(value);
  return <div>{formatted}</div>;
}`}
        </CodeBlock>

        <InfoBox type="important">
          Generic props enable reusable component patterns. Use type constraints
          for type safety. Use default types for convenience. Combine with
          conditional types for advanced patterns. Generic props enable
          flexible, type-safe component APIs that work with different types.
        </InfoBox>
      </Section>
    </div>
  );
}
