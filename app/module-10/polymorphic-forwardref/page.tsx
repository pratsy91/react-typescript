import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function PolymorphicForwardRefPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Polymorphic Components & Forward Ref
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Polymorphic components can render as different HTML elements using the
        "as" prop. forwardRef enables ref forwarding through components.
        Understanding both patterns with TypeScript enables flexible, type-safe
        component APIs.
      </p>

      <Section title="1. Polymorphic Components">
        <p className="text-gray-700 dark:text-gray-300">
          Polymorphic components use the "as" prop to render as different HTML
          elements. Understanding polymorphic component typing enables flexible,
          type-safe component APIs that work with any element type.
        </p>

        <CodeBlock title="Polymorphic Components Typing">
          {`// Basic polymorphic component
type As = keyof JSX.IntrinsicElements;

interface BoxProps<T extends As = "div"> {
  as?: T;
  children?: React.ReactNode;
}

function Box<T extends As = "div">({
  as,
  children,
  ...rest
}: BoxProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof BoxProps<T>>) {
  const Component = as || "div";
  return <Component {...rest}>{children}</Component>;
}

// Usage
<Box>Default div</Box>
<Box as="section">Section</Box>
<Box as="button" onClick={() => {}}>Button</Box>
<Box as="a" href="/link">Link</Box>

// Type-safe polymorphic component
type PolymorphicProps<E extends React.ElementType> = {
  as?: E;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, keyof { as?: E; children?: React.ReactNode }>;

type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

type PolymorphicComponentProps<E extends React.ElementType> = PolymorphicProps<E> & {
  ref?: PolymorphicRef<E>;
};

function PolymorphicComponent<E extends React.ElementType = "div">(
  { as, children, ...props }: PolymorphicComponentProps<E>
) {
  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
}

// Polymorphic with default type
function TypedPolymorphic<E extends React.ElementType = "div">(
  { as, children, ...props }: PolymorphicProps<E>
) {
  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
}

// Usage
<TypedPolymorphic>Default div</TypedPolymorphic>
<TypedPolymorphic as="button" onClick={() => {}}>Button</TypedPolymorphic>
<TypedPolymorphic as="a" href="/link">Link</TypedPolymorphic>

// Polymorphic with constraints
type AllowedElements = "div" | "section" | "article" | "aside" | "nav";

interface ConstrainedBoxProps<T extends AllowedElements = "div"> {
  as?: T;
  children?: React.ReactNode;
}

function ConstrainedBox<T extends AllowedElements = "div">({
  as,
  children,
  ...rest
}: ConstrainedBoxProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ConstrainedBoxProps<T>>) {
  const Component = as || "div";
  return <Component {...rest}>{children}</Component>;
}

// Usage
<ConstrainedBox as="section">Section</ConstrainedBox>
<ConstrainedBox as="article">Article</ConstrainedBox>
// <ConstrainedBox as="button">Button</ConstrainedBox>  // ✗ Error: button not allowed

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

// Usage
<CustomPolymorphic variant="primary" size="large">
  Content
</CustomPolymorphic>
<CustomPolymorphic as="button" variant="secondary" onClick={() => {}}>
  Button
</CustomPolymorphic>

// Polymorphic with type inference
type PolymorphicAs<E extends React.ElementType> = {
  as: E;
} & React.ComponentPropsWithoutRef<E>;

type PolymorphicWithoutAs = React.ComponentPropsWithoutRef<"div">;

type PolymorphicComponentProps2<E extends React.ElementType> =
  | (PolymorphicAs<E> & { as: E })
  | (PolymorphicWithoutAs & { as?: never });

function AdvancedPolymorphic<E extends React.ElementType = "div">(
  props: PolymorphicComponentProps2<E>
) {
  const { as = "div", ...rest } = props;
  const Component = as as React.ElementType;
  return <Component {...rest} />;
}

// Polymorphic with discriminated union
type PolymorphicProps3 =
  | { as: "button"; onClick: () => void; children: React.ReactNode }
  | { as: "a"; href: string; children: React.ReactNode }
  | { as?: "div"; children: React.ReactNode };

function DiscriminatedPolymorphic(props: PolymorphicProps3) {
  if (props.as === "button") {
    return <button onClick={props.onClick}>{props.children}</button>;
  }
  if (props.as === "a") {
    return <a href={props.href}>{props.children}</a>;
  }
  return <div>{props.children}</div>;
}

// Usage
<DiscriminatedPolymorphic as="button" onClick={() => {}}>
  Button
</DiscriminatedPolymorphic>
<DiscriminatedPolymorphic as="a" href="/link">
  Link
</DiscriminatedPolymorphic>
<DiscriminatedPolymorphic>Div</DiscriminatedPolymorphic>

// Polymorphic component factory
function createPolymorphicComponent<DefaultElement extends React.ElementType>(
  defaultElement: DefaultElement
) {
  return function Polymorphic<E extends React.ElementType = DefaultElement>({
    as,
    ...props
  }: PolymorphicProps<E>) {
    const Component = (as || defaultElement) as React.ElementType;
    return <Component {...props} />;
  };
}

// Usage
const PolymorphicSection = createPolymorphicComponent("section");

<PolymorphicSection>Section</PolymorphicSection>
<PolymorphicSection as="article">Article</PolymorphicSection>

// Type-safe polymorphic helper
type ElementType = React.ElementType;

function isElementType(value: unknown): value is ElementType {
  return typeof value === "string" || typeof value === "function";
}

function SafePolymorphic<E extends ElementType = "div">({
  as,
  ...props
}: PolymorphicProps<E>) {
  const Component = (isElementType(as) ? as : "div") as React.ElementType;
  return <Component {...props} />;
}`}
        </CodeBlock>

        <InfoBox type="info">
          Polymorphic components use the "as" prop to render as different HTML
          elements. Use generic types with element type constraints. Combine
          polymorphic props with element props using Omit. Use discriminated
          unions for type-safe conditional props. Polymorphic components enable
          flexible, reusable component APIs.
        </InfoBox>
      </Section>

      <Section title="2. React.forwardRef Typing">
        <p className="text-gray-700 dark:text-gray-300">
          React.forwardRef forwards refs through components. Understanding
          forwardRef typing enables type-safe ref forwarding and imperative
          APIs.
        </p>

        <CodeBlock title="React.forwardRef Typing">
          {`// Basic forwardRef
interface InputProps {
  placeholder?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder }, ref) => {
    return <input ref={ref} placeholder={placeholder} />;
  }
);

// Usage
function InputUsage() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <Input ref={inputRef} placeholder="Enter text" />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}

// forwardRef with generic component
interface GenericInputProps {
  type?: "text" | "email" | "password";
  placeholder?: string;
}

const GenericInput = React.forwardRef<
  HTMLInputElement,
  GenericInputProps
>(({ type = "text", placeholder }, ref) => {
  return <input ref={ref} type={type} placeholder={placeholder} />;
});

// forwardRef with additional props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, isLoading, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={\`btn btn-\${variant}\`}
        disabled={isLoading || rest.disabled}
        {...rest}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

// forwardRef with useImperativeHandle
interface VideoPlayerRef {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
}

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = React.forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ src }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useImperativeHandle(ref, () => ({
      play() {
        videoRef.current?.play();
      },
      pause() {
        videoRef.current?.pause();
      },
      seek(time: number) {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
    }));

    return <video ref={videoRef} src={src} />;
  }
);

// Usage
function VideoPlayerUsage() {
  const playerRef = React.useRef<VideoPlayerRef>(null);

  return (
    <div>
      <VideoPlayer ref={playerRef} src="video.mp4" />
      <button onClick={() => playerRef.current?.play()}>Play</button>
      <button onClick={() => playerRef.current?.pause()}>Pause</button>
      <button onClick={() => playerRef.current?.seek(10)}>Seek to 10s</button>
    </div>
  );
}

// Generic forwardRef
interface GenericButtonProps {
  label: string;
  onClick: () => void;
}

// Note: Generics with forwardRef require special handling
const GenericButton = React.forwardRef(
  <T,>(
    props: GenericButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return <button ref={ref} onClick={props.onClick}>{props.label}</button>;
  }
) as <T>(props: GenericButtonProps & { ref?: React.Ref<HTMLButtonElement> }) => JSX.Element;

// Better: Use without generics if possible
const SimpleButton = React.forwardRef<
  HTMLButtonElement,
  GenericButtonProps
>(({ label, onClick }, ref) => {
  return <button ref={ref} onClick={onClick}>{label}</button>;
});

// forwardRef with polymorphic component
type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

function PolymorphicWithRef<E extends React.ElementType = "div">({
  as,
  ref,
  ...props
}: {
  as?: E;
  ref?: PolymorphicRef<E>;
} & React.ComponentPropsWithoutRef<E>) {
  const Component = as || "div";
  // Type assertion needed for polymorphic refs
  return <Component {...props} ref={ref as any} />;
}

// Type-safe forwardRef helper
function forwardRefWithAs<T, P = {}>(
  render: (
    props: P & { ref?: React.Ref<T> },
    ref: React.Ref<T>
  ) => React.ReactElement | null
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
> {
  return React.forwardRef(render);
}

// Usage
const TypedInput = forwardRefWithAs<HTMLInputElement, { placeholder?: string }>(
  ({ placeholder }, ref) => {
    return <input ref={ref} placeholder={placeholder} />;
  }
);

// forwardRef with memo
const MemoizedInput = React.memo(
  React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return <input ref={ref} {...props} />;
  })
);

// forwardRef with displayName
Input.displayName = "Input";
Button.displayName = "Button";
VideoPlayer.displayName = "VideoPlayer";

// Multiple ref forwarding
interface MultiRefProps {
  inputRef?: React.Ref<HTMLInputElement>;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

function MultiRefComponent({ inputRef, buttonRef }: MultiRefProps) {
  return (
    <div>
      <input ref={inputRef} />
      <button ref={buttonRef}>Click</button>
    </div>
  );
}

// Combining refs
function useCombinedRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return React.useCallback(
    (element: T | null) => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === "function") {
          ref(element);
        } else {
          (ref as React.MutableRefObject<T | null>).current = element;
        }
      });
    },
    [refs]
  );
}

// Usage with combined refs
const InputWithCombinedRefs = React.forwardRef<
  HTMLInputElement,
  InputProps
>((props, forwardedRef) => {
  const localRef = React.useRef<HTMLInputElement>(null);
  const combinedRef = useCombinedRefs(localRef, forwardedRef);

  React.useEffect(() => {
    // Can use localRef here
    console.log(localRef.current);
  }, []);

  return <input ref={combinedRef} {...props} />;
});

// Conditional ref forwarding
interface ConditionalRefProps {
  forwardRef?: boolean;
  children: React.ReactNode;
}

function ConditionalRef({ forwardRef, children }: ConditionalRefProps) {
  if (forwardRef) {
    return React.cloneElement(children as React.ReactElement, {
      ref: React.useRef(null),
    });
  }
  return <>{children}</>;
}

// Type-safe forwardRef wrapper
function createForwardRefComponent<T, P extends object>(
  componentName: string,
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
) {
  const Component = React.forwardRef<T, P>(render);
  Component.displayName = componentName;
  return Component;
}

// Usage
const NamedInput = createForwardRefComponent<HTMLInputElement, InputProps>(
  "Input",
  ({ placeholder }, ref) => {
    return <input ref={ref} placeholder={placeholder} />;
  }
);`}
        </CodeBlock>

        <InfoBox type="important">
          React.forwardRef forwards refs through components. Use generic types
          for ref type and props. Combine with useImperativeHandle for custom
          ref handles. Use displayName for debugging. Combine refs with
          useCombinedRefs when needed. Polymorphic components with forwardRef
          require type assertions for ref handling.
        </InfoBox>
      </Section>
    </div>
  );
}

