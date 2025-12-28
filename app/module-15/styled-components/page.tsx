import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function StyledComponentsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Styled Components TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Styled Components can be fully typed with TypeScript for type-safe
        styled components and theme objects.
      </p>

      <Section title="1. Typing Styled Components">
        <p className="text-gray-700 dark:text-gray-300">
          Styled components can be typed with props interfaces for type-safe
          styling.
        </p>

        <CodeBlock title="Basic Typed Styled Components">
          {`import styled from 'styled-components';

// Typed styled component with props
interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>\`
  background: \${props => props.primary ? '#007bff' : '#6c757d'};
  color: white;
  padding: \${props => {
    switch (props.size) {
      case 'small': return '0.25rem 0.5rem';
      case 'large': return '0.75rem 1.5rem';
      default: return '0.5rem 1rem';
    }
  }};
  border: none;
  border-radius: 4px;
  cursor: \${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: \${props => props.disabled ? 0.6 : 1};
\`;

// Usage
<Button primary size="large">Click me</Button>
<Button disabled>Disabled</Button>

// Typed styled component extending another
const PrimaryButton = styled(Button)\`
  background: #007bff;
  font-weight: bold;
\`;

// Typed styled component with HTML element
const StyledInput = styled.input<{ error?: boolean }>\`
  border: 1px solid \${props => props.error ? 'red' : '#ccc'};
  padding: 0.5rem;
  border-radius: 4px;
\`;`}
        </CodeBlock>

        <CodeBlock title="Advanced Typed Styled Components">
          {`// Typed styled component with complex props
interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: number;
  maxWidth?: string;
}

const Card = styled.div<CardProps>\`
  padding: \${props => props.padding ?? 16}px;
  max-width: \${props => props.maxWidth ?? '100%'};
  border-radius: 8px;
  
  \${props => {
    switch (props.variant) {
      case 'outlined':
        return 'border: 1px solid #ccc;';
      case 'elevated':
        return 'box-shadow: 0 2px 8px rgba(0,0,0,0.1);';
      default:
        return 'background: white;';
    }
  }}
\`;

// Typed polymorphic styled component
const StyledButton = styled.button<{ as?: React.ElementType }>\`
  display: inline-block;
  padding: 0.5rem 1rem;
\`;

// Usage as different elements
<StyledButton>Button</StyledButton>
<StyledButton as="a" href="/link">Link</StyledButton>

// Typed styled component with ref
const StyledInput = styled.input.attrs<{ type: string }>(props => ({
  type: props.type || 'text',
}))<{ error?: boolean }>\`
  border: 1px solid \${props => props.error ? 'red' : '#ccc'};
\`;`}
        </CodeBlock>
      </Section>

      <Section title="2. Typing Theme">
        <p className="text-gray-700 dark:text-gray-300">
          Theme objects can be typed for type-safe theme access throughout
          styled components.
        </p>

        <CodeBlock title="Typed Theme">
          {`import { DefaultTheme } from 'styled-components';

// Define typed theme
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
    success: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

// Declare module augmentation
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// Create theme instance
const theme: DefaultTheme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#333333',
    error: '#dc3545',
    success: '#28a745',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
    },
  },
};

// Typed styled component using theme
const ThemedButton = styled.button\`
  background: \${props => props.theme.colors.primary};
  color: \${props => props.theme.colors.text};
  padding: \${props => props.theme.spacing.md};
  font-family: \${props => props.theme.typography.fontFamily};
  
  @media (max-width: \${props => props.theme.breakpoints.mobile}) {
    padding: \${props => props.theme.spacing.sm};
  }
\`;

// Typed theme hook
import { useTheme } from 'styled-components';

function ThemedComponent() {
  const theme = useTheme(); // Typed as DefaultTheme
  return <div style={{ color: theme.colors.primary }}>Themed</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Theme Provider">
          {`import { ThemeProvider } from 'styled-components';

// Typed theme provider
function App() {
  return (
    <ThemeProvider theme={theme}>
      <ThemedButton>Button</ThemedButton>
    </ThemeProvider>
  );
}

// Typed theme with dark mode
interface ThemeMode {
  light: DefaultTheme;
  dark: DefaultTheme;
}

const themes: ThemeMode = {
  light: {
    colors: {
      primary: '#007bff',
      background: '#ffffff',
      text: '#333333',
      // ... other colors
    },
    // ... other theme properties
  },
  dark: {
    colors: {
      primary: '#0d6efd',
      background: '#212529',
      text: '#ffffff',
      // ... other colors
    },
    // ... other theme properties
  },
};

// Typed theme toggle
function ThemeToggle() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const currentTheme = themes[themeMode];
  
  return (
    <ThemeProvider theme={currentTheme}>
      <button onClick={() => setThemeMode(mode => mode === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </ThemeProvider>
  );
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Styled components are typed with props interfaces</li>
          <li>Theme is typed with DefaultTheme interface</li>
          <li>Theme provider provides typed theme access</li>
          <li>Polymorphic components support type-safe element changes</li>
          <li>Theme can be extended with module augmentation</li>
        </ul>
      </InfoBox>
    </div>
  );
}

