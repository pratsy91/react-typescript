import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ThemeProviderPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Theme Provider TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Theme providers can be typed for type-safe theme objects and context
        access.
      </p>

      <Section title="1. Typing Theme Objects">
        <p className="text-gray-700 dark:text-gray-300">
          Theme objects can be typed with interfaces for type-safe theme
          access.
        </p>

        <CodeBlock title="Typed Theme Provider">
          {`import { createContext, useContext, ReactNode } from 'react';

// Typed theme interface
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
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

// Typed theme context
const ThemeContext = createContext<Theme | undefined>(undefined);

// Typed theme provider
interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Typed theme hook
export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return theme;
}

// Usage
const theme: Theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    background: '#ffffff',
    text: '#333333',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ThemedComponent />
    </ThemeProvider>
  );
}

function ThemedComponent() {
  const theme = useTheme(); // Typed as Theme
  return (
    <div style={{ color: theme.colors.primary }}>
      Themed content
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Theme with Dark Mode">
          {`// Typed theme modes
type ThemeMode = 'light' | 'dark';

interface ThemeConfig {
  mode: ThemeMode;
  colors: {
    primary: string;
    background: string;
    text: string;
  };
}

// Typed theme provider with mode
interface ThemeProviderProps {
  mode?: ThemeMode;
  children: ReactNode;
}

export function ThemeProvider({ mode = 'light', children }: ThemeProviderProps) {
  const theme: ThemeConfig = {
    mode,
    colors: {
      primary: mode === 'dark' ? '#0d6efd' : '#007bff',
      background: mode === 'dark' ? '#212529' : '#ffffff',
      text: mode === 'dark' ? '#ffffff' : '#333333',
    },
  };
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Typed theme toggle
function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('light');
  
  return (
    <ThemeProvider mode={mode}>
      <button onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}>
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
          <li>Theme objects are typed with interfaces</li>
          <li>Theme context provides typed theme access</li>
          <li>Theme provider supports typed theme configuration</li>
          <li>Theme modes can be typed with unions</li>
        </ul>
      </InfoBox>
    </div>
  );
}

