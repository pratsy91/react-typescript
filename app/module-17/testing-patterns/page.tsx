import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TestingPatternsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Testing Patterns TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Testing component props, hooks, context, and async components can be
        typed for type-safe testing patterns.
      </p>

      <Section title="1. Testing Component Props, Hooks, Context, Async">
        <p className="text-gray-700 dark:text-gray-300">
          Various testing patterns can be typed for comprehensive type-safe
          testing.
        </p>

        <CodeBlock title="Typed Testing Patterns">
          {`// Typed component props testing
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

test('renders with props', () => {
  const handleClick = jest.fn<void, []>();
  const props: ButtonProps = {
    onClick: handleClick,
    disabled: false,
    children: 'Click me',
  };
  
  render(<Button {...props} />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});

// Typed hook testing
import { renderHook, act } from '@testing-library/react';

function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  return { count, increment, decrement };
}

test('hook increments count', () => {
  const { result } = renderHook(() => useCounter(0));
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});

// Typed context testing
const TestContext = createContext<{ value: string } | undefined>(undefined);

function TestProvider({ children, value }: { children: React.ReactNode; value: string }) {
  return <TestContext.Provider value={{ value }}>{children}</TestContext.Provider>;
}

test('renders with context', () => {
  render(
    <TestProvider value="test">
      <Component />
    </TestProvider>
  );
  
  expect(screen.getByText('test')).toBeInTheDocument();
});

// Typed async component testing
async function AsyncComponent({ userId }: { userId: string }) {
  const user = await fetchUser(userId);
  return <div>{user.name}</div>;
}

test('renders async component', async () => {
  const mockFetch = jest.fn<Promise<User>, [string]>();
  mockFetch.mockResolvedValue({ id: '1', name: 'John' });
  
  render(<AsyncComponent userId="1" />);
  
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});

// Typed mock implementations
interface MockService {
  fetchData: (id: string) => Promise<Data>;
  saveData: (data: Data) => Promise<void>;
}

const createMockService = (): jest.Mocked<MockService> => ({
  fetchData: jest.fn<Promise<Data>, [string]>(),
  saveData: jest.fn<Promise<void>, [Data]>(),
});

test('uses mock service', async () => {
  const mockService = createMockService();
  mockService.fetchData.mockResolvedValue({ id: '1', value: 'test' });
  
  const data = await mockService.fetchData('1');
  expect(data).toEqual({ id: '1', value: 'test' });
});`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Component props are typed in test setup</li>
          <li>Hooks are tested with typed renderHook</li>
          <li>Context providers are typed in test wrappers</li>
          <li>Async components use typed waitFor</li>
          <li>Mock implementations are fully typed</li>
        </ul>
      </InfoBox>
    </div>
  );
}

