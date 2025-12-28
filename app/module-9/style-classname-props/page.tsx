import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function StyleClassNamePropsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Style & ClassName Props
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React.CSSProperties provides typed CSS styling. className accepts
        strings, arrays, and conditional classes. Understanding style and
        className typing enables type-safe styling and CSS-in-JS patterns.
      </p>

      <Section title="1. React.CSSProperties">
        <p className="text-gray-700 dark:text-gray-300">
          React.CSSProperties provides typed CSS property values for the style
          prop. Understanding CSSProperties enables type-safe inline styling and
          CSS-in-JS integration.
        </p>

        <CodeBlock title="React.CSSProperties">
          {`// React.CSSProperties provides typed CSS properties
type CSSProperties = React.CSSProperties;

// Basic CSSProperties
function CSSPropertiesExample() {
  const style: React.CSSProperties = {
    // Layout
    display: "flex",
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    minWidth: "200px",
    minHeight: "200px",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "10px",
    marginTop: 10,
    marginRight: "10px",
    marginBottom: 10,
    marginLeft: "10px",
    padding: "10px",
    paddingTop: 10,
    paddingRight: "10px",
    paddingBottom: 10,
    paddingLeft: "10px",
    boxSizing: "border-box",
    overflow: "hidden",
    overflowX: "auto",
    overflowY: "scroll",
    
    // Flexbox
    flex: 1,
    flexDirection: "row",  // "row" | "row-reverse" | "column" | "column-reverse"
    flexWrap: "nowrap",  // "nowrap" | "wrap" | "wrap-reverse"
    justifyContent: "flex-start",  // "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
    alignItems: "stretch",  // "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
    alignContent: "stretch",  // "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch"
    alignSelf: "auto",  // "auto" | "flex-start" | "flex-end" | "center" | "baseline" | "stretch"
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    order: 0,
    
    // Grid
    grid: "none",
    gridArea: "1 / 1 / 2 / 2",
    gridTemplate: "none",
    gridTemplateAreas: "none",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto",
    gridColumn: "1 / 2",
    gridColumnStart: 1,
    gridColumnEnd: 2,
    gridRow: "1 / 2",
    gridRowStart: 1,
    gridRowEnd: 2,
    gap: "10px",
    rowGap: "10px",
    columnGap: "10px",
    
    // Typography
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    fontWeight: 400,
    fontStyle: "normal",  // "normal" | "italic" | "oblique"
    lineHeight: 1.5,
    letterSpacing: "normal",
    textAlign: "left",  // "left" | "right" | "center" | "justify"
    textDecoration: "none",
    textTransform: "none",  // "none" | "uppercase" | "lowercase" | "capitalize"
    color: "#000000",
    
    // Background
    backgroundColor: "#ffffff",
    backgroundImage: "url(image.jpg)",
    backgroundSize: "cover",  // "auto" | "cover" | "contain" | string
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",  // "repeat" | "repeat-x" | "repeat-y" | "no-repeat"
    backgroundAttachment: "scroll",  // "scroll" | "fixed" | "local"
    backgroundClip: "border-box",
    backgroundOrigin: "padding-box",
    
    // Border
    border: "1px solid black",
    borderTop: "1px solid black",
    borderRight: "1px solid black",
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderWidth: 1,
    borderStyle: "solid",  // "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset"
    borderColor: "#000000",
    borderRadius: "4px",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    
    // Shadow
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    
    // Transform
    transform: "translate(10px, 20px)",
    transformOrigin: "center",
    perspective: "1000px",
    perspectiveOrigin: "50% 50%",
    backfaceVisibility: "visible",  // "visible" | "hidden"
    
    // Transition
    transition: "all 0.3s ease",
    transitionProperty: "all",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease",  // "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out"
    transitionDelay: "0s",
    
    // Animation
    animation: "fade 1s ease",
    animationName: "fade",
    animationDuration: "1s",
    animationTimingFunction: "ease",
    animationDelay: "0s",
    animationIterationCount: 1,
    animationDirection: "normal",  // "normal" | "reverse" | "alternate" | "alternate-reverse"
    animationFillMode: "none",  // "none" | "forwards" | "backwards" | "both"
    animationPlayState: "running",  // "running" | "paused"
    
    // Opacity
    opacity: 1,
    visibility: "visible",  // "visible" | "hidden" | "collapse"
    
    // Cursor
    cursor: "pointer",  // "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" | "wait" | etc.
    
    // Pointer events
    pointerEvents: "auto",  // "auto" | "none" | "visiblePainted" | etc.
    
    // User select
    userSelect: "none",  // "auto" | "none" | "text" | "all" | "contain"
    
    // Z-index
    zIndex: 1,
    
    // Variables
    "--custom-property": "value",  // CSS custom properties
  } as React.CSSProperties;

  return <div style={style}>Styled div</div>;
}

// CSSProperties with type inference
function TypeInference() {
  // TypeScript infers CSSProperties automatically
  const style = {
    color: "red",
    fontSize: "16px",
    padding: "10px",
  };  // Inferred as CSSProperties

  return <div style={style}>Inferred style</div>;
}

// CSSProperties with React state
function StyleWithState() {
  const [color, setColor] = React.useState("red");
  const [size, setSize] = React.useState(16);

  const style: React.CSSProperties = {
    color,
    fontSize: \`\${size}px\`,
    transition: "all 0.3s ease",
  };

  return (
    <div>
      <div style={style}>Dynamic style</div>
      <button onClick={() => setColor(color === "red" ? "blue" : "red")}>
        Toggle color
      </button>
      <button onClick={() => setSize(size + 2)}>Increase size</button>
    </div>
  );
}

// CSSProperties with computed values
function ComputedStyle() {
  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(100);

  const style: React.CSSProperties = React.useMemo(
    () => ({
      width: \`\${width}px\`,
      height: \`\${height}px\`,
      aspectRatio: width / height,
      backgroundColor: width > height ? "blue" : "red",
    }),
    [width, height]
  );

  return (
    <div>
      <div style={style}>Computed style</div>
      <button onClick={() => setWidth(width + 10)}>Increase width</button>
      <button onClick={() => setHeight(height + 10)}>Increase height</button>
    </div>
  );
}

// CSSProperties with CSS variables
function CSSVariables() {
  const style: React.CSSProperties = {
    "--primary-color": "blue",
    "--secondary-color": "red",
    "--spacing": "10px",
    color: "var(--primary-color)",
    padding: "var(--spacing)",
    backgroundColor: "var(--secondary-color)",
  } as React.CSSProperties;

  return <div style={style}>CSS variables</div>;
}

// CSSProperties with media queries (via object)
function ResponsiveStyle() {
  const [isMobile, setIsMobile] = React.useState(false);

  const style: React.CSSProperties = {
    width: isMobile ? "100%" : "800px",
    padding: isMobile ? "10px" : "20px",
    fontSize: isMobile ? "14px" : "16px",
  };

  return <div style={style}>Responsive</div>;
}

// CSSProperties helper functions
function createStyle(overrides: Partial<React.CSSProperties>): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...overrides,
  };
}

function StyleHelpers() {
  const style = createStyle({
    backgroundColor: "blue",
    color: "white",
  });

  return <div style={style}>Helper style</div>;
}

// Type-safe CSS-in-JS
interface Theme {
  colors: {
    primary: string;
    secondary: string;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
}

const theme: Theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

function createThemedStyle(
  theme: Theme,
  overrides?: Partial<React.CSSProperties>
): React.CSSProperties {
  return {
    color: theme.colors.primary,
    padding: theme.spacing.medium,
    ...overrides,
  };
}

function ThemedStyle() {
  const style = createThemedStyle(theme, {
    backgroundColor: theme.colors.secondary,
  });

  return <div style={style}>Themed</div>;
}

// CSSProperties with arrays (not supported - use strings)
// const style: React.CSSProperties = {
//   margin: [10, 20, 10, 20],  // ✗ Error: not supported
//   margin: "10px 20px 10px 20px",  // ✓ Correct
// };

// CSSProperties with undefined (allowed)
function OptionalStyle() {
  const style: React.CSSProperties = {
    color: "red",
    // fontSize: undefined,  // ✓ Allowed (will be ignored)
  };

  return <div style={style}>Optional</div>;
}

// Merging CSSProperties
function mergeStyles(
  ...styles: Array<React.CSSProperties | undefined | null>
): React.CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean));
}

function MergedStyles() {
  const baseStyle: React.CSSProperties = {
    padding: "10px",
    margin: "10px",
  };

  const overrideStyle: React.CSSProperties = {
    padding: "20px",  // Override
    backgroundColor: "blue",  // Add
  };

  const merged = mergeStyles(baseStyle, overrideStyle);

  return <div style={merged}>Merged</div>;
}

// Type-safe style component props
interface StyledProps extends React.HTMLAttributes<HTMLDivElement> {
  customStyle?: React.CSSProperties;
}

function StyledComponent({ customStyle, style, ...props }: StyledProps) {
  const mergedStyle = React.useMemo(
    () => mergeStyles({ padding: "10px" }, customStyle, style),
    [customStyle, style]
  );

  return <div {...props} style={mergedStyle} />;
}`}
        </CodeBlock>

        <InfoBox type="info">
          React.CSSProperties provides typed CSS property values for the style
          prop. All CSS properties are typed with correct value types (strings,
          numbers, unions). Use CSS variables via --custom-property syntax.
          Merge styles using Object.assign or spread. CSSProperties supports all
          standard CSS properties with full type safety.
        </InfoBox>
      </Section>

      <Section title="2. className Prop">
        <p className="text-gray-700 dark:text-gray-300">
          className accepts string, string arrays, and conditional classes.
          Understanding className typing enables type-safe class name management
          and conditional styling.
        </p>

        <CodeBlock title="className Prop Typing">
          {`// className type
// className is typed as string | undefined in HTMLAttributes

// Basic className
function BasicClassName() {
  return <div className="container">Content</div>;
}

// className with variable
function VariableClassName() {
  const className = "container active";
  return <div className={className}>Content</div>;
}

// className with state
function StateClassName() {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className={isActive ? "active" : "inactive"}>
      Content
    </div>
  );
}

// className with conditional classes
function ConditionalClassName() {
  const [isActive, setIsActive] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [variant, setVariant] = React.useState<"primary" | "secondary">("primary");

  const className = [
    "button",
    isActive && "active",
    isDisabled && "disabled",
    variant === "primary" && "btn-primary",
    variant === "secondary" && "btn-secondary",
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={className}>Button</button>;
}

// className with template literals
function TemplateClassName() {
  const variant = "primary";
  const size = "large";

  const className = \`btn btn-\${variant} btn-\${size}\`;

  return <button className={className}>Button</button>;
}

// className with arrays
function ArrayClassName() {
  const baseClasses = ["button", "btn"];
  const variantClasses = ["btn-primary"];
  const stateClasses = ["active"];

  const className = [...baseClasses, ...variantClasses, ...stateClasses].join(" ");

  return <button className={className}>Button</button>;
}

// className helper function
function classNames(
  ...classes: Array<string | undefined | null | false>
): string {
  return classes.filter(Boolean).join(" ");
}

function ClassNamesHelper() {
  const isActive = true;
  const isDisabled = false;
  const variant = "primary";

  const className = classNames(
    "button",
    "btn",
    \`btn-\${variant}\`,
    isActive && "active",
    isDisabled && "disabled"
  );

  return <button className={className}>Button</button>;
}

// className with objects (like clsx library)
function clsx(
  ...inputs: Array<
    | string
    | undefined
    | null
    | false
    | Record<string, boolean | undefined>
    | Array<string | undefined>
  >
): string {
  const classes: string[] = [];

  inputs.forEach((input) => {
    if (!input) return;

    if (typeof input === "string") {
      classes.push(input);
    } else if (Array.isArray(input)) {
      const result = clsx(...input);
      if (result) classes.push(result);
    } else if (typeof input === "object") {
      Object.entries(input).forEach(([key, value]) => {
        if (value) classes.push(key);
      });
    }
  });

  return classes.join(" ");
}

function ClsxUsage() {
  const isActive = true;
  const variant = "primary";

  const className = clsx("button", {
    active: isActive,
    disabled: false,
    [\`btn-\${variant}\`]: true,
  });

  return <button className={className}>Button</button>;
}

// className with useMemo
function MemoizedClassName() {
  const [isActive, setIsActive] = React.useState(false);
  const [variant, setVariant] = React.useState<"primary" | "secondary">("primary");

  const className = React.useMemo(
    () =>
      classNames(
        "button",
        \`btn-\${variant}\`,
        isActive && "active"
      ),
    [isActive, variant]
  );

  return <button className={className}>Button</button>;
}

// className merging
function mergeClassNames(
  ...classes: Array<string | undefined | null>
): string {
  return classes.filter(Boolean).join(" ");
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  active?: boolean;
}

function ButtonWithClassName({
  variant = "primary",
  size = "medium",
  active = false,
  className,
  ...props
}: ButtonProps) {
  const classes = mergeClassNames(
    "btn",
    \`btn-\${variant}\`,
    \`btn-\${size}\`,
    active && "btn-active",
    className
  );

  return <button className={classes} {...props} />;
}

// className with TypeScript types
type ClassName = string | undefined | null | false;

function combineClasses(...classes: ClassName[]): string {
  return classes.filter((c): c is string => Boolean(c)).join(" ");
}

function TypedClassName() {
  const base: ClassName = "container";
  const active: ClassName = true ? "active" : null;
  const disabled: ClassName = false ? "disabled" : null;

  const className = combineClasses(base, active, disabled);

  return <div className={className}>Content</div>;
}

// className with conditional object
function ConditionalObjectClassName() {
  const isActive = true;
  const isDisabled = false;

  const className = clsx({
    button: true,
    active: isActive,
    disabled: isDisabled,
    "btn-primary": true,
    "btn-large": false,
  });

  return <button className={className}>Button</button>;
}

// className with arrays and objects
function ComplexClassName() {
  const isActive = true;

  const className = clsx(
    ["button", "btn"],
    {
      active: isActive,
      disabled: false,
    },
    "btn-primary"
  );

  return <button className={className}>Button</button>;
}

// className with CSS modules
// With CSS modules, className is typed as string
import styles from "./styles.module.css";  // Assuming CSS module

function CSSModuleClassName() {
  // styles is typed object with class names as keys
  const className = clsx(styles.container, styles.active);

  return <div className={className}>Content</div>;
}

// Type-safe className utility
function useClassName(...classes: Array<string | undefined | null | false>) {
  return React.useMemo(
    () => classes.filter(Boolean).join(" "),
    [classes.join(" ")]
  );
}

function UseClassNameHook() {
  const isActive = true;
  const className = useClassName("button", isActive && "active");

  return <button className={className}>Button</button>;
}

// Note: className is always string | undefined in TypeScript
// React handles undefined by not adding a class attribute
// Multiple classes are space-separated strings`}
        </CodeBlock>

        <InfoBox type="tip">
          className is typed as string | undefined in HTMLAttributes. Use string
          concatenation, arrays, or helper functions (classNames, clsx) for
          conditional classes. Filter out falsy values before joining. React
          handles undefined by omitting the class attribute. Use useMemo for
          expensive className computations.
        </InfoBox>
      </Section>
    </div>
  );
}
