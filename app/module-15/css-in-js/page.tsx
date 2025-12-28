import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function CSSInJSPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        CSS-in-JS TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        CSS-in-JS style objects can be typed with TypeScript for type-safe
        inline styles.
      </p>

      <Section title="1. Typing Style Objects">
        <p className="text-gray-700 dark:text-gray-300">
          Style objects can be typed with React.CSSProperties and custom
          interfaces.
        </p>

        <CodeBlock title="Typed Style Objects">
          {`import { CSSProperties } from 'react';

// Typed inline styles
const containerStyle: CSSProperties = {
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '8px',
};

function Component() {
  return <div style={containerStyle}>Content</div>;
}

// Typed style with props
interface StyledProps {
  primary?: boolean;
  size?: number;
}

function StyledComponent({ primary, size = 16 }: StyledProps) {
  const style: CSSProperties = {
    padding: \`\${size}px\`,
    backgroundColor: primary ? 'blue' : 'gray',
    color: 'white',
  };
  
  return <div style={style}>Styled</div>;
}

// Typed style object factory
function createStyle(primary: boolean): CSSProperties {
  return {
    padding: '1rem',
    backgroundColor: primary ? '#007bff' : '#6c757d',
    color: 'white',
    borderRadius: '4px',
  };
}

// Typed style with theme
interface Theme {
  colors: {
    primary: string;
    secondary: string;
  };
  spacing: {
    sm: string;
    md: string;
    lg: string;
  };
}

function createThemedStyle(theme: Theme): CSSProperties {
  return {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    color: 'white',
  };
}`}
        </CodeBlock>

        <CodeBlock title="Typed Style Utilities">
          {`// Typed style merge utility
function mergeStyles(
  ...styles: (CSSProperties | undefined | null)[]
): CSSProperties {
  return Object.assign({}, ...styles.filter(Boolean));
}

// Usage
const baseStyle: CSSProperties = {
  padding: '1rem',
  color: 'black',
};

const overrideStyle: CSSProperties = {
  color: 'blue',
};

const merged = mergeStyles(baseStyle, overrideStyle);
// merged.color is 'blue'

// Typed responsive styles
interface ResponsiveStyle {
  base?: CSSProperties;
  mobile?: CSSProperties;
  tablet?: CSSProperties;
  desktop?: CSSProperties;
}

function useResponsiveStyle(style: ResponsiveStyle): CSSProperties {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (width >= 1200 && style.desktop) return style.desktop;
  if (width >= 768 && style.tablet) return style.tablet;
  if (style.mobile) return style.mobile;
  return style.base || {};
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Style objects are typed with CSSProperties</li>
          <li>Style factories enable reusable typed styles</li>
          <li>Style merging utilities support type safety</li>
          <li>Responsive styles can be typed</li>
        </ul>
      </InfoBox>
    </div>
  );
}

