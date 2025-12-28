import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function UseMemoUseCallbackPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        useMemo & useCallback TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        useMemo and useCallback can be typed with TypeScript for type-safe
        memoized values and callbacks.
      </p>

      <Section title="1. Typing Memoized Values">
        <p className="text-gray-700 dark:text-gray-300">
          useMemo can be typed to preserve value types while adding
          memoization.
        </p>

        <CodeBlock title="Typed useMemo">
          {`import { useMemo } from 'react';

// Typed useMemo with explicit return type
function ExpensiveComponent({ items, filter }: { items: Item[]; filter: string }) {
  const filteredItems = useMemo<Item[]>(() => {
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);
  
  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// Typed useMemo with computed object
interface ComputedStats {
  total: number;
  average: number;
  max: number;
  min: number;
}

function StatsComponent({ numbers }: { numbers: number[] }) {
  const stats = useMemo<ComputedStats>(() => {
    if (numbers.length === 0) {
      return { total: 0, average: 0, max: 0, min: 0 };
    }
    
    const total = numbers.reduce((sum, n) => sum + n, 0);
    const average = total / numbers.length;
    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    
    return { total, average, max, min };
  }, [numbers]);
  
  return (
    <div>
      <p>Total: {stats.total}</p>
      <p>Average: {stats.average}</p>
      <p>Max: {stats.max}</p>
      <p>Min: {stats.min}</p>
    </div>
  );
}

// Typed useMemo with conditional return
function ConditionalMemo({ data, condition }: { data: Data[]; condition: boolean }) {
  const result = useMemo<Data[] | null>(() => {
    if (!condition) return null;
    return data.filter(item => item.active);
  }, [data, condition]);
  
  if (!result) return null;
  
  return <div>{result.length} items</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Typed useCallback">
          {`// Typed useCallback with explicit function type
interface ButtonProps {
  onClick: () => void;
  label: string;
}

function Button({ onClick, label }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

function ParentComponent({ userId }: { userId: string }) {
  // Typed callback
  const handleClick = useCallback<() => void>(() => {
    console.log('Clicked for user:', userId);
  }, [userId]);
  
  return <Button onClick={handleClick} label="Click me" />;
}

// Typed useCallback with parameters
interface FormProps {
  onSubmit: (data: FormData) => void;
}

function Form({ onSubmit }: FormProps) {
  const handleSubmit = useCallback<(data: FormData) => void>(
    (data) => {
      onSubmit(data);
    },
    [onSubmit]
  );
  
  return <form onSubmit={(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleSubmit(formData);
  }}>Form</form>;
}

// Typed useCallback with event handlers
function EventHandlerComponent({ onValueChange }: { onValueChange: (value: string) => void }) {
  const handleChange = useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>(
    (e) => {
      onValueChange(e.target.value);
    },
    [onValueChange]
  );
  
  return <input onChange={handleChange} />;
}

// Typed useCallback with async function
function AsyncComponent({ onFetch }: { onFetch: (id: string) => Promise<void> }) {
  const handleFetch = useCallback<() => Promise<void>>(
    async () => {
      await onFetch('123');
    },
    [onFetch]
  );
  
  return <button onClick={handleFetch}>Fetch</button>;
}

// Typed useCallback with generic function
function GenericComponent<T>({ items, onSelect }: { items: T[]; onSelect: (item: T) => void }) {
  const handleSelect = useCallback<(item: T) => void>(
    (item) => {
      onSelect(item);
    },
    [onSelect]
  );
  
  return (
    <div>
      {items.map((item, index) => (
        <button key={index} onClick={() => handleSelect(item)}>
          Select
        </button>
      ))}
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Advanced Typed Memoization Patterns">
          {`// Typed memoization factory
function useTypedMemo<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  return useMemo(factory, deps);
}

// Typed callback factory
function useTypedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  return useCallback(callback, deps) as T;
}

// Typed memoized selector
function useTypedSelector<T, R>(
  selector: (value: T) => R,
  value: T,
  deps?: React.DependencyList
): R {
  return useMemo(() => selector(value), deps || [value]);
}

// Usage
interface State {
  users: User[];
  filter: string;
}

function Component({ state }: { state: State }) {
  const filteredUsers = useTypedSelector(
    (s) => s.users.filter(u => u.name.includes(s.filter)),
    state,
    [state]
  );
  
  return <div>{filteredUsers.length} users</div>;
}

// Typed memoized event handler factory
function useTypedEventHandler<T extends HTMLElement, E extends React.SyntheticEvent<T>>(
  handler: (event: E) => void,
  deps: React.DependencyList
) {
  return useCallback(handler, deps);
}

// Usage
function InputComponent({ onChange }: { onChange: (value: string) => void }) {
  const handleChange = useTypedEventHandler<HTMLInputElement, React.ChangeEvent<HTMLInputElement>>(
    (e) => onChange(e.target.value),
    [onChange]
  );
  
  return <input onChange={handleChange} />;
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>useMemo can be typed with explicit generic return types</li>
          <li>useCallback preserves function signatures with types</li>
          <li>Event handlers are typed with specific event types</li>
          <li>Generic functions work with typed memoization</li>
          <li>Memoization factories enable reusable patterns</li>
        </ul>
      </InfoBox>
    </div>
  );
}

