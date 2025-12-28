import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ReturnChildrenTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Component Return & Children Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Understanding React's return types (ReactElement, ReactNode,
        JSX.Element) and children types (ReactNode, ReactChild) is essential for
        type-safe component development and flexible component APIs.
      </p>

      <Section title="1. Component Return Types">
        <p className="text-gray-700 dark:text-gray-300">
          React components can return different types: JSX.Element for single
          elements, ReactElement for typed elements, ReactNode for any valid
          render output, and ReactPortal for portals.
        </p>

        <CodeBlock title="Component return type examples">
          {`// JSX.Element - most specific, single React element
function SingleElement(): JSX.Element {
  return <div>Hello</div>;
}

// Can return any single JSX element
function Button(): JSX.Element {
  return <button>Click</button>;
}

// Cannot return null, string, number, etc.
// function Invalid(): JSX.Element {
//   return null;  // ✗ Error
//   return "string";  // ✗ Error
//   return 123;  // ✗ Error
// }

// React.ReactElement - generic, typed React element
function TypedElement(): React.ReactElement {
  return <div>Hello</div>;
}

// With type parameters
function TypedButton(): React.ReactElement<{ onClick: () => void }> {
  return <button onClick={() => {}}>Click</button>;
}

// More flexible than JSX.Element
function FlexibleElement(): React.ReactElement {
  if (Math.random() > 0.5) {
    return <div>Div</div>;
  }
  return <span>Span</span>;
}

// React.ReactNode - most flexible, any renderable content
function AnyContent(): React.ReactNode {
  return <div>JSX</div>;  // ✓ OK
  return "string";  // ✓ OK
  return 123;  // ✓ OK
  return null;  // ✓ OK
  return undefined;  // ✓ OK
  return [<div key="1">1</div>, <div key="2">2</div>];  // ✓ OK
}

// Conditional rendering with ReactNode
function ConditionalRender(props: { show: boolean }): React.ReactNode {
  if (!props.show) {
    return null;
  }
  return <div>Content</div>;
}

// Array of elements
function List(): React.ReactNode {
  return [1, 2, 3].map((n) => <div key={n}>{n}</div>);
}

// Fragments
function Multiple(): React.ReactNode {
  return (
    <>
      <div>First</div>
      <div>Second</div>
    </>
  );
}

// React.ReactPortal - for portals
function ModalPortal(): React.ReactPortal {
  return ReactDOM.createPortal(
    <div>Modal</div>,
    document.body
  );
}

// Comparison of return types
type Comparison = {
  JSXElement: JSX.Element;  // Single JSX element only
  ReactElement: React.ReactElement;  // Single React element, more generic
  ReactNode: React.ReactNode;  // Anything renderable
  ReactPortal: React.ReactPortal;  // Portal specifically
};

// JSX.Element vs React.ReactElement
// JSX.Element is:
type JSXElement = React.ReactElement<any, any>;

// So React.ReactElement is more generic:
function Specific(): React.ReactElement<{ title: string }, "div"> {
  return <div title="Hello">Content</div>;
}

// ReactNode includes everything
type ReactNodeTypes =
  | React.ReactElement
  | string
  | number
  | boolean
  | null
  | undefined
  | React.ReactPortal
  | Iterable<React.ReactNode>;

// Practical: Conditional return types
function Render<T extends boolean>(props: {
  condition: T;
  children: React.ReactNode;
}): T extends true ? JSX.Element : null {
  if (props.condition) {
    return <div>{props.children}</div> as any;
  }
  return null as any;
}

// Return type based on props
type ComponentReturn<P> = P extends { fallback: any }
  ? React.ReactElement
  : React.ReactNode;

function Component<P extends { show: boolean; fallback?: React.ReactNode }>(
  props: P
): ComponentReturn<P> {
  if (!props.show) {
    return (props.fallback ?? null) as ComponentReturn<P>;
  }
  return <div>Content</div> as ComponentReturn<P>;
}

// Async component (Promise)
// Note: React doesn't directly support Promise returns yet
// But with Suspense and Server Components:
async function AsyncServerComponent(): Promise<JSX.Element> {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Generator functions (not common)
function* generatorComponent(): Generator<JSX.Element> {
  yield <div>First</div>;
  yield <div>Second</div>;
}

// Void return (no rendering)
function NoRender(): void {
  console.log("Side effect only");
  // Doesn't render anything
}

// Multiple return types with overloads
function flexibleRender(type: "element"): JSX.Element;
function flexibleRender(type: "node"): React.ReactNode;
function flexibleRender(type: "element" | "node"): JSX.Element | React.ReactNode {
  if (type === "element") {
    return <div>Element</div>;
  }
  return "Node";
}

// Higher-order component return types
function withWrapper<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return (props: P): JSX.Element => {
    return (
      <div className="wrapper">
        <Component {...props} />
      </div>
    );
  };
}

// Render prop return type
interface RenderProps {
  render: (data: string) => React.ReactNode;
}

function WithRender({ render }: RenderProps): React.ReactElement {
  const data = "Hello";
  return <div>{render(data)}</div>;
}

// Factory function return type
function createComponent(type: "button" | "link"): () => JSX.Element {
  if (type === "button") {
    return () => <button>Button</button>;
  }
  return () => <a href="#">Link</a>;
}

// Never return type (always throws)
function ThrowError(): never {
  throw new Error("Always throws");
}

function ComponentWithError(): React.ReactNode {
  if (someCondition) {
    ThrowError();  // Type is never, won't continue
  }
  return <div>Content</div>;
}

// Explicitly typed return
const ExplicitComponent = (): JSX.Element => {
  return <div>Explicit</div>;
};

// Inferred return (recommended)
const InferredComponent = () => {
  return <div>Inferred</div>;
};  // Return type is inferred as JSX.Element

// Complex return type
type ComplexReturn =
  | JSX.Element
  | null
  | Array<JSX.Element | null>;

function ComplexComponent(): ComplexReturn {
  const items = [1, 2, 3];
  if (items.length === 0) return null;
  if (items.length === 1) return <div>{items[0]}</div>;
  return items.map((n) => <div key={n}>{n}</div>);
}`}
        </CodeBlock>

        <InfoBox type="info">
          Use JSX.Element for single JSX elements, React.ReactElement for typed
          elements, and React.ReactNode for flexible return types (including
          null, strings, numbers). ReactNode is most common for component
          returns allowing conditional rendering.
        </InfoBox>
      </Section>

      <Section title="2. Children Types">
        <p className="text-gray-700 dark:text-gray-300">
          React provides several types for children props. ReactNode is the most
          flexible and recommended. ReactChild and ReactChildren are deprecated
          but still found in legacy code.
        </p>

        <CodeBlock title="Children type examples">
          {`// React.ReactNode - recommended for children
interface Props {
  children?: React.ReactNode;
}

function Container({ children }: Props) {
  return <div className="container">{children}</div>;
}

// ReactNode accepts everything
<Container>
  String child
</Container>

<Container>
  {123}
</Container>

<Container>
  <div>JSX Element</div>
</Container>

<Container>
  {null}
</Container>

<Container>
  {[<div key="1">1</div>, <div key="2">2</div>]}
</Container>

// React.ReactChild (deprecated, don't use in new code)
// Was: React.ReactElement | string | number
interface DeprecatedProps {
  children?: React.ReactChild;
}

// React.ReactChildren (deprecated, don't use)
// Use React.ReactNode instead

// Single child constraint
interface SingleChildProps {
  children: React.ReactElement;  // Only one React element
}

function SingleChild({ children }: SingleChildProps) {
  return <div className="single">{children}</div>;
}

// OK
<SingleChild>
  <div>One element</div>
</SingleChild>

// Error: multiple children
// <SingleChild>
//   <div>First</div>
//   <div>Second</div>
// </SingleChild>

// Error: string child
// <SingleChild>String</SingleChild>

// Specific element type
interface ButtonChildProps {
  children: React.ReactElement<{ onClick: () => void }>;
}

// Array of children
interface ListProps {
  children: React.ReactElement[];
}

function List({ children }: ListProps) {
  return (
    <ul>
      {React.Children.map(children, (child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
}

// Typed children with constraints
interface CardProps {
  children: React.ReactElement<typeof CardHeader | typeof CardBody>;
}

function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="card-header">{children}</div>;
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="card-body">{children}</div>;
}

// Function children (render prop)
interface ToggleProps {
  children: (isOpen: boolean, toggle: () => void) => React.ReactNode;
}

function Toggle({ children }: ToggleProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return <>{children(isOpen, toggle)}</>;
}

// Usage
<Toggle>
  {(isOpen, toggle) => (
    <div>
      <button onClick={toggle}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  )}
</Toggle>

// Render callback with data
interface DataProviderProps<T> {
  data: T;
  children: (data: T) => React.ReactNode;
}

function DataProvider<T>({ data, children }: DataProviderProps<T>) {
  return <>{children(data)}</>;
}

// Multiple children slots
interface LayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

function Layout({ header, sidebar, content, footer }: LayoutProps) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{content}</main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

// Children with specific structure
type TabsChildren = Array<React.ReactElement<typeof Tab>>;

interface TabsProps {
  children: TabsChildren;
}

function Tabs({ children }: TabsProps) {
  return <div className="tabs">{children}</div>;
}

interface TabProps {
  label: string;
  children: React.ReactNode;
}

function Tab({ label, children }: TabProps) {
  return <div data-label={label}>{children}</div>;
}

// Usage
<Tabs>
  {[
    <Tab key="1" label="Tab 1">Content 1</Tab>,
    <Tab key="2" label="Tab 2">Content 2</Tab>,
  ]}
</Tabs>

// React.Children utilities
function ChildrenExample({ children }: { children: React.ReactNode }) {
  // Count children
  const count = React.Children.count(children);

  // Map children
  const mapped = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { key: index });
    }
    return child;
  });

  // For each child
  React.Children.forEach(children, (child) => {
    console.log(child);
  });

  // To array
  const array = React.Children.toArray(children);

  // Only child (throws if not exactly one)
  // const single = React.Children.only(children);

  return <div>{mapped}</div>;
}

// Validate children type
function validateChild(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child);
}

function FilteredChildren({ children }: { children: React.ReactNode }) {
  const validChildren = React.Children.toArray(children).filter(validateChild);

  return <>{validChildren}</>;
}

// Clone and enhance children
interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

function Wrapper({ children, className }: WrapperProps) {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            className: \`\${child.props.className || ""} \${className || ""}\`.trim(),
          });
        }
        return child;
      })}
    </>
  );
}

// Required children
interface RequiredChildrenProps {
  children: React.ReactNode;  // Not optional
}

function RequiredChildren({ children }: RequiredChildrenProps) {
  if (!children) {
    throw new Error("Children are required");
  }
  return <div>{children}</div>;
}

// No children allowed
interface NoChildrenProps {
  title: string;
  // Explicitly no children property
}

function NoChildren({ title }: NoChildrenProps) {
  return <div>{title}</div>;
}

// Or explicitly never
interface StrictNoChildrenProps {
  title: string;
  children?: never;
}

// Conditional children type
type ConditionalChildrenProps<T extends boolean> = T extends true
  ? { children: React.ReactNode }
  : { children?: never };

function ConditionalChildren<T extends boolean>(
  props: { hasChildren: T } & ConditionalChildrenProps<T>
) {
  if (props.hasChildren) {
    return <div>{props.children}</div>;
  }
  return <div>No children</div>;
}

// Discriminated union with children
type CardProps =
  | { variant: "simple"; title: string }
  | { variant: "complex"; header: React.ReactNode; children: React.ReactNode };

function Card(props: CardProps) {
  if (props.variant === "simple") {
    return <div>{props.title}</div>;
  }
  return (
    <div>
      <div>{props.header}</div>
      <div>{props.children}</div>
    </div>
  );
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Use React.ReactNode for children props - it's the most flexible and
          handles all valid React children. Avoid deprecated ReactChild and
          ReactChildren. Use React.ReactElement when you need to constrain to
          specific JSX elements.
        </InfoBox>
      </Section>

      <Section title="3. JSX.Element vs ReactElement vs ReactNode">
        <p className="text-gray-700 dark:text-gray-300">
          Understanding the differences between JSX.Element, React.ReactElement,
          and React.ReactNode helps you choose the right type for return values,
          children props, and render functions.
        </p>

        <CodeBlock title="Type comparison examples">
          {`// Type definitions (simplified)
namespace JSX {
  type Element = React.ReactElement<any, any>;
}

namespace React {
  type ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> = {
    type: T;
    props: P;
    key: Key | null;
  };

  type ReactNode =
    | ReactElement
    | string
    | number
    | boolean
    | null
    | undefined
    | ReactPortal
    | Iterable<ReactNode>;
}

// JSX.Element - least flexible
function MustReturnJSX(): JSX.Element {
  return <div>Only JSX allowed</div>;
  // return null;  // ✗ Error
  // return "string";  // ✗ Error
}

// React.ReactElement - middle ground
function MustReturnElement(): React.ReactElement {
  return <div>Element</div>;
  return React.createElement("div", null, "Created");
  // return null;  // ✗ Error
  // return "string";  // ✗ Error
}

// React.ReactNode - most flexible
function CanReturnAnything(): React.ReactNode {
  return <div>JSX</div>;  // ✓
  return "string";  // ✓
  return 123;  // ✓
  return true;  // ✓
  return null;  // ✓
  return undefined;  // ✓
  return [<div key="1">1</div>, <div key="2">2</div>];  // ✓
}

// When to use each:

// 1. JSX.Element - when you MUST return JSX
interface MustRenderProps {
  render: () => JSX.Element;  // Must be JSX
}

function MustRender({ render }: MustRenderProps) {
  return <div>{render()}</div>;
}

// 2. ReactElement - when you need typed elements
interface TypedRenderProps {
  render: () => React.ReactElement<{ title: string }>;
}

function TypedRender({ render }: TypedRenderProps) {
  const element = render();
  console.log(element.props.title);  // Type-safe access
  return element;
}

// 3. ReactNode - for children and flexible returns
interface FlexibleProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

function Flexible({ children, fallback }: FlexibleProps) {
  return <div>{children || fallback}</div>;
}

// Practical: Conditional rendering
function ConditionalRender(props: {
  show: boolean;
  children: React.ReactNode;
}): React.ReactNode {  // ReactNode allows null
  if (!props.show) return null;
  return props.children;
}

// Practical: List rendering
function ListRender(props: {
  items: string[];
  renderItem: (item: string) => React.ReactNode;  // Can return null
}): React.ReactNode {
  return props.items.map((item, i) => (
    <React.Fragment key={i}>
      {props.renderItem(item)}
    </React.Fragment>
  ));
}

// Type narrowing
function renderContent(content: React.ReactNode): JSX.Element {
  // Narrow ReactNode to JSX.Element
  if (typeof content === "string") {
    return <div>{content}</div>;
  }
  if (typeof content === "number") {
    return <div>{content}</div>;
  }
  if (content === null || content === undefined) {
    return <div>Empty</div>;
  }
  if (React.isValidElement(content)) {
    return content;  // JSX.Element
  }
  if (Array.isArray(content)) {
    return <>{content}</>;
  }
  return <div>Unknown</div>;
}

// Type guards
function isElement(node: React.ReactNode): node is React.ReactElement {
  return React.isValidElement(node);
}

function isString(node: React.ReactNode): node is string {
  return typeof node === "string";
}

function isNumber(node: React.ReactNode): node is number {
  return typeof node === "number";
}

function processNode(node: React.ReactNode) {
  if (isElement(node)) {
    console.log("Element:", node.type);
  } else if (isString(node)) {
    console.log("String:", node.toUpperCase());
  } else if (isNumber(node)) {
    console.log("Number:", node.toFixed(2));
  }
}

// Return type conversion
function nodeToElement(node: React.ReactNode): JSX.Element {
  if (React.isValidElement(node)) {
    return node;
  }
  return <div>{node}</div>;
}

// Props type comparison
interface StrictProps {
  content: JSX.Element;  // Must be JSX
}

interface TypedProps {
  content: React.ReactElement;  // Element with type info
}

interface FlexibleProps2 {
  content: React.ReactNode;  // Any renderable
}

// Function return type recommendations
// ✓ Recommended: Let TypeScript infer
const Component1 = () => {
  return <div>Content</div>;
};  // Inferred as JSX.Element

// ✓ OK: Explicit when needed for flexibility
const Component2 = (): React.ReactNode => {
  if (condition) return null;
  return <div>Content</div>;
};

// ✗ Avoid: Overly restrictive
const Component3 = (): JSX.Element => {
  // return null;  // Can't return null
  return <div>Must be JSX</div>;
};

// Generic return type helper
type ReturnTypeHelper<T> = T extends (...args: any[]) => infer R ? R : never;

type ComponentReturn = ReturnTypeHelper<typeof Component1>;  // JSX.Element

// Assignability
let node: React.ReactNode;
let element: React.ReactElement;
let jsxElement: JSX.Element;

jsxElement = <div>JSX</div>;
element = jsxElement;  // ✓ OK: JSX.Element is ReactElement
node = element;  // ✓ OK: ReactElement is ReactNode

// element = node;  // ✗ Error: ReactNode is not ReactElement
// jsxElement = element;  // ✗ Error: ReactElement is not JSX.Element

// Summary
type TypeHierarchy = {
  // Most restrictive
  JSXElement: JSX.Element;
  // Middle
  ReactElement: React.ReactElement;
  // Most flexible
  ReactNode: React.ReactNode;
};`}
        </CodeBlock>

        <InfoBox type="important">
          JSX.Element = single JSX element. React.ReactElement = single React
          element with type info. React.ReactNode = any renderable content. Use
          ReactNode for children and flexible returns, ReactElement for typed
          elements, JSX.Element when JSX is required.
        </InfoBox>
      </Section>

      <Section title="4. React.ReactPortal">
        <p className="text-gray-700 dark:text-gray-300">
          ReactPortal is a special type for content rendered into a different
          DOM node via ReactDOM.createPortal. It's part of ReactNode and used
          for modals, tooltips, and overlays.
        </p>

        <CodeBlock title="ReactPortal examples">
          {`// Basic portal
function Modal({ children }: { children: React.ReactNode }): React.ReactPortal {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.body
  );
}

// Portal with custom container
function CustomPortal({
  children,
  container,
}: {
  children: React.ReactNode;
  container?: Element | null;
}): React.ReactPortal | null {
  const [defaultContainer] = React.useState(() => document.createElement("div"));

  React.useEffect(() => {
    if (!container) {
      document.body.appendChild(defaultContainer);
      return () => {
        document.body.removeChild(defaultContainer);
      };
    }
  }, [container, defaultContainer]);

  const targetContainer = container || defaultContainer;
  if (!targetContainer) return null;

  return ReactDOM.createPortal(children, targetContainer);
}

// Conditional portal
function ConditionalPortal({
  isPortal,
  children,
}: {
  isPortal: boolean;
  children: React.ReactNode;
}): React.ReactNode {
  if (isPortal) {
    return ReactDOM.createPortal(children, document.body);
  }
  return children;
}

// Portal with event bubbling
function ModalWithEvents({
  onClose,
  children,
}: {
  onClose: () => void;
  children: React.ReactNode;
}): React.ReactPortal {
  // Events bubble through React tree, not DOM tree
  return ReactDOM.createPortal(
    <div className="modal" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

// Tooltip portal
function Tooltip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}): JSX.Element {
  const [isVisible, setIsVisible] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              left: position.x,
              top: position.y,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

// Layered portal
function LayeredPortal({
  layer = 0,
  children,
}: {
  layer?: number;
  children: React.ReactNode;
}): React.ReactPortal {
  const container = React.useMemo(() => {
    const div = document.createElement("div");
    div.style.zIndex = String(1000 + layer);
    return div;
  }, [layer]);

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
}

// Portal manager
class PortalManager {
  private portals = new Map<string, Element>();

  getPortal(id: string): Element {
    if (!this.portals.has(id)) {
      const div = document.createElement("div");
      div.id = \`portal-\${id}\`;
      document.body.appendChild(div);
      this.portals.set(id, div);
    }
    return this.portals.get(id)!;
  }

  removePortal(id: string): void {
    const portal = this.portals.get(id);
    if (portal) {
      document.body.removeChild(portal);
      this.portals.delete(id);
    }
  }
}

const portalManager = new PortalManager();

function ManagedPortal({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}): React.ReactPortal {
  const container = portalManager.getPortal(id);

  React.useEffect(() => {
    return () => {
      portalManager.removePortal(id);
    };
  }, [id]);

  return ReactDOM.createPortal(children, container);
}

// Portal with SSR support
function SSRSafePortal({
  children,
}: {
  children: React.ReactNode;
}): React.ReactPortal | null {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return ReactDOM.createPortal(children, document.body);
}

// Type checking
function isPortal(node: React.ReactNode): node is React.ReactPortal {
  return (
    typeof node === "object" &&
    node !== null &&
    "key" in node &&
    "children" in node &&
    "containerInfo" in node
  );
}`}
        </CodeBlock>

        <InfoBox type="tip">
          React.ReactPortal renders children into a different DOM node. Use
          ReactDOM.createPortal for modals, tooltips, and overlays. Portals
          maintain React event bubbling despite being rendered elsewhere in the
          DOM.
        </InfoBox>
      </Section>

      <Section title="5. Practical Return & Children Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world patterns combining return types, children types, and
          portals for flexible, type-safe component APIs.
        </p>

        <CodeBlock title="Practical return and children patterns">
          {`// Flexible render function
interface RenderConfig {
  loading?: React.ReactNode;
  error?: React.ReactNode;
  empty?: React.ReactNode;
}

function DataRenderer<T>({
  data,
  isLoading,
  error,
  config = {},
  children,
}: {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  config?: RenderConfig;
  children: (data: T) => React.ReactNode;
}): React.ReactNode {
  if (isLoading) {
    return config.loading ?? <div>Loading...</div>;
  }

  if (error) {
    return config.error ?? <div>Error: {error.message}</div>;
  }

  if (!data) {
    return config.empty ?? <div>No data</div>;
  }

  return children(data);
}

// Compound component with flexible children
interface AccordionProps {
  children: React.ReactNode;
  defaultOpen?: number;
}

interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  index?: number;
}

function Accordion({ children, defaultOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState(defaultOpen);

  const items = React.Children.toArray(children);

  return (
    <div className="accordion">
      {items.map((child, index) => {
        if (!React.isValidElement(child)) return null;
        return React.cloneElement(child, {
          key: index,
          index,
          isOpen: openIndex === index,
          onToggle: () => setOpenIndex(openIndex === index ? -1 : index),
        } as any);
      })}
    </div>
  );
}

function AccordionItem({
  title,
  children,
  isOpen,
  onToggle,
}: AccordionItemProps & { isOpen?: boolean; onToggle?: () => void }) {
  return (
    <div className="accordion-item">
      <button onClick={onToggle}>{title}</button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

// Usage
<Accordion>
  <AccordionItem title="Section 1">Content 1</AccordionItem>
  <AccordionItem title="Section 2">Content 2</AccordionItem>
</Accordion>

// Conditional rendering helper
function Show({
  when,
  fallback,
  children,
}: {
  when: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}): React.ReactNode {
  return when ? children : fallback ?? null;
}

// Switch/Case component
interface CaseProps {
  when: boolean;
  children: React.ReactNode;
}

function Case({ when, children }: CaseProps): React.ReactNode {
  return when ? children : null;
}

interface SwitchProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function Switch({ children, fallback }: SwitchProps): React.ReactNode {
  const cases = React.Children.toArray(children);

  for (const caseElement of cases) {
    if (React.isValidElement(caseElement) && caseElement.props.when) {
      return caseElement;
    }
  }

  return fallback ?? null;
}

// Usage
<Switch fallback={<div>No match</div>}>
  <Case when={status === "loading"}>Loading...</Case>
  <Case when={status === "error"}>Error occurred</Case>
  <Case when={status === "success"}>Success!</Case>
</Switch>

// Portal with children manipulation
function ModalWithBackdrop({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}): React.ReactPortal | null {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="backdrop" onClick={onClose} />
      <div className="modal-container">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              onClose,  // Inject onClose to all children
            } as any);
          }
          return child;
        })}
      </div>
    </>,
    document.body
  );
}

// Type-safe slots
interface PageProps {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

function Page({ header, sidebar, content, footer }: PageProps): JSX.Element {
  return (
    <div className="page">
      {header && <header>{header}</header>}
      <div className="page-body">
        {sidebar && <aside>{sidebar}</aside>}
        <main>{content}</main>
      </div>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

// Render optimization
const MemoizedChild = React.memo(({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
});

// children is compared by reference
<MemoizedChild>
  <ExpensiveComponent />
</MemoizedChild>

// Fragment with key
function ListWithFragments({ items }: { items: string[] }): React.ReactNode {
  return items.map((item, index) => (
    <React.Fragment key={index}>
      <div>{item}</div>
      <hr />
    </React.Fragment>
  ));
}`}
        </CodeBlock>

        <InfoBox type="important">
          Combine return types and children types for flexible component APIs.
          Use React.ReactNode for maximum flexibility, portals for overlays,
          React.Children utilities for manipulation, and type guards for
          narrowing.
        </InfoBox>
      </Section>
    </div>
  );
}
