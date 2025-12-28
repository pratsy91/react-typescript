import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function RenderSlotPropsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Render Function & Slot Props
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Render function props enable functions that return JSX. Slot props
        enable typed component slots. Understanding both patterns enables
        flexible, type-safe component APIs.
      </p>

      <Section title="1. Render Function Props">
        <p className="text-gray-700 dark:text-gray-300">
          Render function props use functions that return JSX. Understanding
          render function typing enables flexible component APIs with render
          props.
        </p>

        <CodeBlock title="Render Function Props Typing">
          {`// Basic render function prop
interface RenderPropProps {
  render: (data: { count: number }) => React.ReactNode;
}

function RenderPropComponent({ render }: RenderPropProps) {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      {render({ count })}
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// Usage
<RenderPropComponent
  render={({ count }) => <p>Count: {count}</p>}
/>

// Render function with children (function as children)
interface FunctionChildrenProps {
  children: (data: { value: string; setValue: (v: string) => void }) => React.ReactNode;
}

function FunctionChildrenComponent({ children }: FunctionChildrenProps) {
  const [value, setValue] = React.useState("");

  return <>{children({ value, setValue })}</>;
}

// Usage
<FunctionChildrenComponent>
  {({ value, setValue }) => (
    <input value={value} onChange={(e) => setValue(e.target.value)} />
  )}
</FunctionChildrenComponent>

// Generic render function
interface GenericRenderProps<T> {
  data: T;
  render: (data: T) => React.ReactNode;
}

function GenericRender<T>({ data, render }: GenericRenderProps<T>) {
  return <>{render(data)}</>;
}

// Usage
<GenericRender
  data={{ name: "John", age: 30 }}
  render={(user) => (
    <div>
      {user.name} is {user.age} years old
    </div>
  )}
/>

// Render function with conditional rendering
interface ConditionalRenderProps<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  render: (data: T) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: Error) => React.ReactNode;
}

function ConditionalRender<T>({
  data,
  loading,
  error,
  render,
  renderLoading,
  renderError,
}: ConditionalRenderProps<T>) {
  if (loading) {
    return <>{renderLoading?.() || <div>Loading...</div>}</>;
  }

  if (error) {
    return <>{renderError?.(error) || <div>Error: {error.message}</div>}</>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return <>{render(data)}</>;
}

// Usage
<ConditionalRender
  data={user}
  loading={isLoading}
  error={error}
  render={(user) => <div>{user.name}</div>}
  renderLoading={() => <div>Loading user...</div>}
  renderError={(error) => <div>Error: {error.message}</div>}
/>

// Render function with multiple data sources
interface MultiRenderProps {
  data1: string;
  data2: number;
  data3: boolean;
  render: (props: { data1: string; data2: number; data3: boolean }) => React.ReactNode;
}

function MultiRender({
  data1,
  data2,
  data3,
  render,
}: MultiRenderProps) {
  return <>{render({ data1, data2, data3 })}</>;
}

// Render function with async data
interface AsyncRenderProps<T> {
  promise: Promise<T>;
  render: (data: T) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: Error) => React.ReactNode;
}

function AsyncRender<T>({
  promise,
  render,
  renderLoading,
  renderError,
}: AsyncRenderProps<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    promise
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [promise]);

  if (loading) {
    return <>{renderLoading?.() || <div>Loading...</div>}</>;
  }

  if (error) {
    return <>{renderError?.(error) || <div>Error: {error.message}</div>}</>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return <>{render(data)}</>;
}

// Render function with state management
interface StatefulRenderProps {
  initialState: any;
  render: (state: any, setState: React.Dispatch<React.SetStateAction<any>>) => React.ReactNode;
}

function StatefulRender({ initialState, render }: StatefulRenderProps) {
  const [state, setState] = React.useState(initialState);
  return <>{render(state, setState)}</>;
}

// Render function with context
interface ContextRenderProps<T> {
  createContext: () => T;
  render: (context: T) => React.ReactNode;
}

function ContextRender<T>({ createContext, render }: ContextRenderProps<T>) {
  const context = React.useMemo(createContext, [createContext]);
  return <>{render(context)}</>;
}

// Render function with hooks
interface HookRenderProps {
  render: () => React.ReactNode;
  dependencies?: React.DependencyList;
}

function HookRender({ render, dependencies }: HookRenderProps) {
  React.useEffect(() => {
    // Effect runs when dependencies change
  }, dependencies);

  return <>{render()}</>;
}

// Typed render function helper
type RenderFunction<T = void> = (data: T) => React.ReactNode;

interface TypedRenderProps<T> {
  data: T;
  render: RenderFunction<T>;
}

function TypedRender<T>({ data, render }: TypedRenderProps<T>) {
  return <>{render(data)}</>;
}

// Render function factory
function createRenderComponent<T>(defaultRender: RenderFunction<T>) {
  return function Component({
    data,
    render = defaultRender,
  }: {
    data: T;
    render?: RenderFunction<T>;
  }) {
    return <>{render(data)}</>;
  };
}

// Usage
const UserComponent = createRenderComponent<User>((user) => (
  <div>{user.name}</div>
));

<UserComponent data={{ name: "John", age: 30 }} />

// Render function with overloads
interface OverloadRenderProps {
  render:
    | ((data: string) => React.ReactNode)
    | ((data: number) => React.ReactNode)
    | ((data: boolean) => React.ReactNode);
  data: string | number | boolean;
}

function OverloadRender({ render, data }: OverloadRenderProps) {
  return <>{render(data as any)}</>;
}

// Better: use discriminated union
type RenderOverloadProps =
  | { data: string; render: (data: string) => React.ReactNode }
  | { data: number; render: (data: number) => React.ReactNode }
  | { data: boolean; render: (data: boolean) => React.ReactNode };

function BetterOverloadRender(props: RenderOverloadProps) {
  return <>{props.render(props.data)}</>;
}

// Render function with memoization
interface MemoizedRenderProps<T> {
  data: T;
  render: React.MemoExoticComponent<RenderFunction<T>>;
}

function MemoizedRender<T>({ data, render }: MemoizedRenderProps<T>) {
  return <>{render(data)}</>;
}`}
        </CodeBlock>

        <InfoBox type="info">
          Render function props use functions that return JSX. Type render
          functions with React.ReactNode return type. Use generic types for
          reusable render functions. Combine with conditional rendering for
          flexible APIs. Render function props enable powerful component
          composition.
        </InfoBox>
      </Section>

      <Section title="2. Slot Props">
        <p className="text-gray-700 dark:text-gray-300">
          Slot props enable typed component slots. Understanding slot prop
          typing enables structured component composition with named slots.
        </p>

        <CodeBlock title="Slot Props Typing">
          {`// Basic slot props
interface SlotProps {
  header?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

function SlotComponent({ header, content, footer }: SlotProps) {
  return (
    <div>
      {header && <header>{header}</header>}
      <main>{content}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

// Usage
<SlotComponent
  header={<h1>Title</h1>}
  content={<p>Content</p>}
  footer={<p>Footer</p>}
/>

// Typed slot props
interface TypedSlotProps {
  header?: React.ReactElement<{ title: string }>;
  content: React.ReactNode;
  footer?: React.ReactElement;
}

function TypedSlotComponent({ header, content, footer }: TypedSlotProps) {
  return (
    <div>
      {header && <header>{header.props.title}</header>}
      <main>{content}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

// Slot props with render functions
interface RenderSlotProps {
  header?: () => React.ReactNode;
  content: () => React.ReactNode;
  footer?: () => React.ReactNode;
}

function RenderSlotComponent({
  header,
  content,
  footer,
}: RenderSlotProps) {
  return (
    <div>
      {header?.()}
      <main>{content()}</main>
      {footer?.()}
    </div>
  );
}

// Slot props with context
interface ContextSlotProps {
  slots: {
    header?: (context: { title: string }) => React.ReactNode;
    content: (context: { count: number }) => React.ReactNode;
    footer?: (context: { year: number }) => React.ReactNode;
  };
}

function ContextSlotComponent({ slots }: ContextSlotProps) {
  const context = {
    title: "Page Title",
    count: 42,
    year: 2024,
  };

  return (
    <div>
      {slots.header?.(context)}
      <main>{slots.content(context)}</main>
      {slots.footer?.(context)}
    </div>
  );
}

// Usage
<ContextSlotComponent
  slots={{
    header: ({ title }) => <h1>{title}</h1>,
    content: ({ count }) => <p>Count: {count}</p>,
    footer: ({ year }) => <p>© {year}</p>,
  }}
/>

// Slot props with compound components
interface CardSlots {
  Header?: React.FC<{ title: string }>;
  Content: React.FC<{ children: React.ReactNode }>;
  Footer?: React.FC<{ actions?: React.ReactNode }>;
}

interface CardProps {
  slots: CardSlots;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

function Card({ slots, title, children, actions }: CardProps) {
  const Header = slots.Header;
  const Content = slots.Content;
  const Footer = slots.Footer;

  return (
    <div className="card">
      {Header && <Header title={title} />}
      <Content>{children}</Content>
      {Footer && <Footer actions={actions} />}
    </div>
  );
}

// Slot props with generic types
interface GenericSlotProps<THeader, TContent, TFooter> {
  header?: (props: THeader) => React.ReactNode;
  content: (props: TContent) => React.ReactNode;
  footer?: (props: TFooter) => React.ReactNode;
  headerProps: THeader;
  contentProps: TContent;
  footerProps?: TFooter;
}

function GenericSlot<THeader, TContent, TFooter>({
  header,
  content,
  footer,
  headerProps,
  contentProps,
  footerProps,
}: GenericSlotProps<THeader, TContent, TFooter>) {
  return (
    <div>
      {header?.(headerProps)}
      <main>{content(contentProps)}</main>
      {footerProps && footer?.(footerProps)}
    </div>
  );
}

// Usage
<GenericSlot
  header={(props) => <h1>{props.title}</h1>}
  content={(props) => <p>{props.text}</p>}
  footer={(props) => <p>{props.year}</p>}
  headerProps={{ title: "Title" }}
  contentProps={{ text: "Content" }}
  footerProps={{ year: 2024 }}
/>

// Slot props with validation
interface ValidatedSlotProps {
  header?: React.ReactElement<{ required: boolean }>;
  content: React.ReactNode;
  footer?: React.ReactElement;
}

function ValidatedSlotComponent({
  header,
  content,
  footer,
}: ValidatedSlotProps) {
  if (header && !header.props.required) {
    throw new Error("Header must have required prop");
  }

  return (
    <div>
      {header}
      <main>{content}</main>
      {footer}
    </div>
  );
}

// Slot props with optional slots
interface OptionalSlotProps {
  slots?: {
    header?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
  };
  defaultContent: React.ReactNode;
}

function OptionalSlotComponent({
  slots,
  defaultContent,
}: OptionalSlotProps) {
  return (
    <div>
      {slots?.header}
      <main>{slots?.content || defaultContent}</main>
      {slots?.footer}
    </div>
  );
}

// Slot props with dynamic slots
interface DynamicSlotProps {
  slots: Record<string, React.ReactNode>;
  order: string[];
}

function DynamicSlotComponent({ slots, order }: DynamicSlotProps) {
  return (
    <div>
      {order.map((key) => (
        <div key={key}>{slots[key]}</div>
      ))}
    </div>
  );
}

// Usage
<DynamicSlotComponent
  slots={{
    header: <h1>Header</h1>,
    content: <p>Content</p>,
    footer: <p>Footer</p>,
  }}
  order={["header", "content", "footer"]}
/>

// Slot props with type-safe keys
type SlotKey = "header" | "content" | "footer";

interface TypedSlotProps {
  slots: Partial<Record<SlotKey, React.ReactNode>>;
  defaultSlot: SlotKey;
}

function TypedSlotComponent({ slots, defaultSlot }: TypedSlotProps) {
  const content = slots[defaultSlot] || slots.content || null;

  return (
    <div>
      {slots.header && <header>{slots.header}</header>}
      <main>{content}</main>
      {slots.footer && <footer>{slots.footer}</footer>}
    </div>
  );
}

// Slot props factory
function createSlotComponent<T extends Record<string, any>>(
  slotKeys: Array<keyof T>
) {
  return function Component({
    slots,
    ...props
  }: {
    slots: Partial<Record<keyof T, React.ReactNode>>;
  } & Omit<T, keyof T>) {
    return (
      <div>
        {slotKeys.map((key) => (
          <div key={String(key)}>{slots[key]}</div>
        ))}
      </div>
    );
  };
}

// Type-safe slot helper
type SlotProps<T extends Record<string, any>> = {
  [K in keyof T]?: (props: T[K]) => React.ReactNode;
} & {
  props: T;
};

function useSlots<T extends Record<string, any>>(
  slots: Partial<Record<keyof T, (props: T[typeof keyof T]) => React.ReactNode>>,
  props: T
) {
  return Object.keys(props).reduce((acc, key) => {
    const slot = slots[key as keyof T];
    if (slot) {
      acc[key] = slot(props[key]);
    }
    return acc;
  }, {} as Partial<Record<keyof T, React.ReactNode>>);
}`}
        </CodeBlock>

        <InfoBox type="important">
          Slot props enable typed component slots. Use named props for slots
          instead of children manipulation. Use generic types for reusable
          slots. Combine with render functions for dynamic slots. Slot props
          enable structured, type-safe component composition.
        </InfoBox>
      </Section>
    </div>
  );
}
