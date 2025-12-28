import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ReactTestingLibraryPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        React Testing Library TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React Testing Library can be typed with TypeScript for type-safe
        queries, user events, and custom render functions.
      </p>

      <Section title="1. Typing Queries, User Events, Custom Render">
        <p className="text-gray-700 dark:text-gray-300">
          React Testing Library queries and user events can be typed for
          type-safe testing.
        </p>

        <CodeBlock title="Typed Queries">
          {`import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Typed component render
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// Typed test
test('renders button', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});

// Typed queries
test('finds elements', () => {
  render(<Component />);
  
  // Typed getBy queries
  const heading = screen.getByRole('heading', { name: /title/i });
  const input = screen.getByLabelText(/email/i) as HTMLInputElement;
  const button = screen.getByRole('button');
  
  // Typed queryBy queries (returns null if not found)
  const notFound = screen.queryByText(/not found/i);
  expect(notFound).not.toBeInTheDocument();
  
  // Typed findBy queries (async)
  const asyncElement = await screen.findByText(/loaded/i);
  expect(asyncElement).toBeInTheDocument();
});

// Typed user events
test('handles user interaction', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  
  render(<Button onClick={handleClick}>Click</Button>);
  
  const button = screen.getByRole('button');
  await user.click(button);
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});

// Typed custom render
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  theme?: Theme;
}

function customRender(
  ui: React.ReactElement,
  { theme = defaultTheme, ...options }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
  
  return render(ui, { wrapper: Wrapper, ...options });
}

// Usage
test('renders with theme', () => {
  customRender(<Component />, { theme: customTheme });
  // Component has access to theme
});`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Queries are typed with screen methods</li>
          <li>User events are typed with userEvent</li>
          <li>Custom render functions support typed options</li>
          <li>Component props are typed in tests</li>
        </ul>
      </InfoBox>
    </div>
  );
}

