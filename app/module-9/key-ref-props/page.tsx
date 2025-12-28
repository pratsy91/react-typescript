import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function KeyRefPropsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Key & Ref Props
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React.Key types the key prop for lists. Ref typing varies by element
        type. Understanding key and ref typing enables type-safe list rendering
        and ref management.
      </p>

      <Section title="1. React.Key Type">
        <p className="text-gray-700 dark:text-gray-300">
          React.Key types the key prop for list items. Understanding React.Key
          enables type-safe list rendering and component key management.
        </p>

        <CodeBlock title="React.Key Type">
          {`// React.Key type
// type Key = string | number | null | undefined

// Basic key usage
function BasicKey() {
  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Key with string
function StringKey() {
  const items = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ];

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Key with number
function NumberKey() {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Key with React.Key type
function TypedKey() {
  const items = ["Item 1", "Item 2", "Item 3"];

  const keys: React.Key[] = items.map((_, index) => index);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={keys[index]}>{item}</li>
      ))}
    </ul>
  );
}

// Key with unique identifier
function UniqueKey() {
  const items = [
    { id: "a1", name: "Item 1" },
    { id: "b2", name: "Item 2" },
    { id: "c3", name: "Item 3" },
  ];

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Key with composite key
function CompositeKey() {
  const items = [
    { category: "A", id: 1, name: "Item 1" },
    { category: "A", id: 2, name: "Item 2" },
    { category: "B", id: 1, name: "Item 3" },
  ];

  return (
    <ul>
      {items.map((item) => (
        <li key={\`\${item.category}-\${item.id}\`}>{item.name}</li>
      ))}
    </ul>
  );
}

// Key with generated ID
function GeneratedKey() {
  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <ul>
      {items.map((item) => (
        <li key={crypto.randomUUID()}>{item}</li>
        // Note: Not recommended - generates new key on each render
      ))}
    </ul>
  );
}

// Key extraction helper
function extractKey<T>(
  item: T,
  keyExtractor: (item: T, index: number) => React.Key
): React.Key {
  return keyExtractor(item, 0);
}

// Key with key extractor
interface KeyExtractorProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T, index: number) => React.Key;
}

function KeyExtractorList<T>({
  items,
  renderItem,
  keyExtractor,
}: KeyExtractorProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
function KeyExtractorUsage() {
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ];

  return (
    <KeyExtractorList
      items={users}
      renderItem={(user) => user.name}
      keyExtractor={(user) => user.id}
    />
  );
}

// Key with Fragment
function FragmentKey() {
  const items = [
    { id: 1, items: ["A", "B"] },
    { id: 2, items: ["C", "D"] },
  ];

  return (
    <ul>
      {items.map((group) => (
        <React.Fragment key={group.id}>
          {group.items.map((item, index) => (
            <li key={\`\${group.id}-\${index}\`}>{item}</li>
          ))}
        </React.Fragment>
      ))}
    </ul>
  );
}

// Key with conditional rendering
function ConditionalKey() {
  const items = ["Item 1", "Item 2", "Item 3"];
  const [visibleItems, setVisibleItems] = React.useState<string[]>(items);

  return (
    <ul>
      {visibleItems.map((item, index) => (
        <li key={items.indexOf(item)}>{item}</li>
        // Use original index for stable key
      ))}
    </ul>
  );
}

// Key best practices
function KeyBestPractices() {
  const items = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
  ];

  return (
    <div>
      {/* ✓ Good: Use stable, unique identifier */}
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}

      {/* ✗ Bad: Don't use index if list order changes */}
      {/* {items.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))} */}

      {/* ✗ Bad: Don't use Math.random() */}
      {/* {items.map((item) => (
        <div key={Math.random()}>{item.name}</div>
      ))} */}
    </div>
  );
}

// Key type helper
type KeyType<T> = T extends { id: infer ID }
  ? ID extends React.Key
    ? ID
    : never
  : never;

function useKeys<T extends { id: React.Key }>(
  items: T[]
): React.Key[] {
  return items.map((item) => item.id);
}

// Usage
function UseKeysUsage() {
  const items = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
  ];

  const keys = useKeys(items);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={keys[index]}>{item.name}</li>
      ))}
    </ul>
  );
}

// Note: key is a special prop in React
// - Not accessible in component props
// - Used by React for reconciliation
// - Should be stable across renders
// - Should be unique among siblings`}
        </CodeBlock>

        <InfoBox type="info">
          React.Key is type string | number | null | undefined. Use stable,
          unique identifiers for keys (preferably item.id). Avoid using index if
          list order changes. Don't use Math.random() or generated IDs on each
          render. Keys help React efficiently update lists. Keys are not
          accessible in component props - they're special React props.
        </InfoBox>
      </Section>

      <Section title="2. Ref Prop Typing">
        <p className="text-gray-700 dark:text-gray-300">
          Ref typing varies by element type. Understanding ref typing enables
          type-safe ref management for different HTML and SVG elements.
        </p>

        <CodeBlock title="Ref Prop Typing">
          {`// Ref prop types
// Ref prop is typed based on element type

// HTML element refs
function HTMLElementRefs() {
  // Div element ref
  const divRef = React.useRef<HTMLDivElement>(null);

  // Input element ref
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Button element ref
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Form element ref
  const formRef = React.useRef<HTMLFormElement>(null);

  // Select element ref
  const selectRef = React.useRef<HTMLSelectElement>(null);

  // Textarea element ref
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Image element ref
  const imgRef = React.useRef<HTMLImageElement>(null);

  // Video element ref
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Audio element ref
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Canvas element ref
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // IFrame element ref
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  return (
    <div ref={divRef}>
      <input ref={inputRef} />
      <button ref={buttonRef}>Click</button>
      <form ref={formRef}>
        <select ref={selectRef}>
          <option>Option</option>
        </select>
        <textarea ref={textareaRef} />
      </form>
      <img ref={imgRef} src="image.jpg" alt="Image" />
      <video ref={videoRef} />
      <audio ref={audioRef} />
      <canvas ref={canvasRef} />
      <iframe ref={iframeRef} src="https://example.com" />
    </div>
  );
}

// SVG element refs
function SVGElementRefs() {
  // SVG root element ref
  const svgRef = React.useRef<SVGSVGElement>(null);

  // SVG rect element ref
  const rectRef = React.useRef<SVGRectElement>(null);

  // SVG circle element ref
  const circleRef = React.useRef<SVGCircleElement>(null);

  // SVG path element ref
  const pathRef = React.useRef<SVGPathElement>(null);

  // SVG text element ref
  const textRef = React.useRef<SVGTextElement>(null);

  // SVG group element ref
  const gRef = React.useRef<SVGGElement>(null);

  return (
    <svg ref={svgRef} viewBox="0 0 100 100">
      <g ref={gRef}>
        <rect ref={rectRef} x="10" y="10" width="20" height="20" />
        <circle ref={circleRef} cx="50" cy="50" r="10" />
        <path ref={pathRef} d="M 0 0 L 10 10" />
        <text ref={textRef} x="10" y="90">
          Text
        </text>
      </g>
    </svg>
  );
}

// Ref with forwardRef
interface ButtonProps {
  children: React.ReactNode;
}

const ForwardedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children }, ref) => {
    return <button ref={ref}>{children}</button>;
  }
);

function ForwardRefUsage() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const focusButton = () => {
    buttonRef.current?.focus();
  };

  return (
    <div>
      <ForwardedButton ref={buttonRef}>Button</ForwardedButton>
      <button onClick={focusButton}>Focus</button>
    </div>
  );
}

// Ref with useImperativeHandle
interface CustomHandle {
  focus: () => void;
  blur: () => void;
}

interface InputProps {
  defaultValue?: string;
}

const CustomInput = React.forwardRef<CustomHandle, InputProps>(
  ({ defaultValue = "" }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },
      blur() {
        inputRef.current?.blur();
      },
    }));

    return <input ref={inputRef} defaultValue={defaultValue} />;
  }
);

function ImperativeHandleUsage() {
  const inputRef = React.useRef<CustomHandle>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <CustomInput ref={inputRef} defaultValue="Text" />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

// Ref type extraction
function RefTypeExtraction() {
  const divRef = React.useRef<HTMLDivElement>(null);

  // Extract ref type
  type DivRefType = React.ElementRef<typeof divRef>;  // HTMLDivElement

  // Extract from element type
  type ButtonRefType = React.ComponentRef<"button">;  // HTMLButtonElement

  // Extract from forwardRef component
  type ForwardedRefType = React.ComponentRef<typeof ForwardedButton>;  // HTMLButtonElement

  return null;
}

// Generic ref hook
function useElementRef<T extends HTMLElement>() {
  return React.useRef<T>(null);
}

function GenericRefHook() {
  const divRef = useElementRef<HTMLDivElement>();
  const inputRef = useElementRef<HTMLInputElement>();

  return (
    <div>
      <div ref={divRef}>Div</div>
      <input ref={inputRef} />
    </div>
  );
}

// Ref with callback
function CallbackRef() {
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);

  const refCallback = React.useCallback((node: HTMLDivElement | null) => {
    setElement(node);
  }, []);

  React.useEffect(() => {
    if (element) {
      console.log("Element mounted:", element);
    }
  }, [element]);

  return <div ref={refCallback}>Content</div>;
}

// Multiple refs
function MultipleRefs() {
  const refs = {
    first: React.useRef<HTMLDivElement>(null),
    second: React.useRef<HTMLDivElement>(null),
    third: React.useRef<HTMLDivElement>(null),
  };

  const scrollTo = (key: keyof typeof refs) => {
    refs[key].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div ref={refs.first}>First</div>
      <div ref={refs.second}>Second</div>
      <div ref={refs.third}>Third</div>
      <button onClick={() => scrollTo("first")}>Go to First</button>
    </div>
  );
}

// Ref with array
function ArrayRefs() {
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    itemRefs.current.forEach((element, index) => {
      if (element) {
        console.log(\`Item \${index}:\`, element);
      }
    });
  }, []);

  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

// Ref with Map
function MapRefs() {
  const refs = React.useRef<Map<string, HTMLDivElement>>(new Map());

  const setRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      refs.current.set(id, el);
    } else {
      refs.current.delete(id);
    }
  };

  const getRef = (id: string) => {
    return refs.current.get(id);
  };

  const scrollTo = (id: string) => {
    const element = getRef(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div ref={setRef("item1")}>Item 1</div>
      <div ref={setRef("item2")}>Item 2</div>
      <button onClick={() => scrollTo("item1")}>Go to Item 1</button>
    </div>
  );
}

// Type-safe ref component
interface RefComponentProps<T extends HTMLElement> {
  ref?: React.Ref<T>;
  children?: React.ReactNode;
}

function RefComponent<T extends HTMLElement>({
  ref,
  children,
}: RefComponentProps<T>) {
  return <div ref={ref as React.Ref<HTMLDivElement>}>{children}</div>;
}

// Usage
function RefComponentUsage() {
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <RefComponent<HTMLDivElement> ref={divRef}>
      Content
    </RefComponent>
  );
}

// Note: ref is a special prop in React
// - Must use forwardRef to forward refs
// - Use useImperativeHandle for custom handles
// - Refs are not accessible in component props
// - Refs are typed based on element type`}
        </CodeBlock>

        <InfoBox type="important">
          Ref typing is based on element type: HTMLDivElement for div,
          HTMLInputElement for input, SVGSVGElement for svg, etc. Use forwardRef
          to forward refs through components. Use useImperativeHandle for custom
          ref handles. Extract ref types with React.ElementRef or
          React.ComponentRef. Refs are not accessible in component props -
          they're special React props.
        </InfoBox>
      </Section>
    </div>
  );
}
