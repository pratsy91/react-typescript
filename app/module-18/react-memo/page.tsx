import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ReactMemoPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        React.memo TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React.memo can be typed with TypeScript for type-safe memoized
        components and custom comparison functions.
      </p>

      <Section title="1. Typing Memoized Components">
        <p className="text-gray-700 dark:text-gray-300">
          React.memo can be typed to preserve component prop types while
          adding memoization.
        </p>

        <CodeBlock title="Basic Typed React.memo">
          {`import { memo } from 'react';

// Typed component props
interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

// Typed memoized component
const Button = memo<ButtonProps>(({ onClick, label, disabled, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {label}
    </button>
  );
});

Button.displayName = 'Button';

// Usage - props are fully typed
<Button
  onClick={() => console.log('clicked')}
  label="Click me"
  variant="secondary"
/>

// Typed memo with forwardRef
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    ({ value, onChange, placeholder }, ref) => {
      return (
        <input
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      );
    }
  )
);

Input.displayName = 'Input';`}
        </CodeBlock>

        <CodeBlock title="Typed Custom Comparison">
          {`// Typed custom comparison function
interface ComplexProps {
  user: User;
  settings: Settings;
  onUpdate: (settings: Settings) => void;
}

// Custom comparison with typed parameters
const areEqual = (
  prevProps: ComplexProps,
  nextProps: ComplexProps
): boolean => {
  // Compare user by id
  if (prevProps.user.id !== nextProps.user.id) {
    return false;
  }
  
  // Deep compare settings
  if (JSON.stringify(prevProps.settings) !== JSON.stringify(nextProps.settings)) {
    return false;
  }
  
  // Compare function references
  if (prevProps.onUpdate !== nextProps.onUpdate) {
    return false;
  }
  
  return true;
};

// Typed memo with custom comparison
const ComplexComponent = memo<ComplexProps>(
  ({ user, settings, onUpdate }) => {
    return (
      <div>
        <p>{user.name}</p>
        <button onClick={() => onUpdate(settings)}>Update</button>
      </div>
    );
  },
  areEqual
);

// Typed shallow comparison helper
function shallowEqual<T extends Record<string, unknown>>(
  prev: T,
  next: T
): boolean {
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);
  
  if (prevKeys.length !== nextKeys.length) {
    return false;
  }
  
  for (const key of prevKeys) {
    if (prev[key] !== next[key]) {
      return false;
    }
  }
  
  return true;
}

// Typed memo with shallow comparison
const ShallowMemoized = memo<ComplexProps>(
  (props) => <ComplexComponent {...props} />,
  shallowEqual
);`}
        </CodeBlock>

        <CodeBlock title="Advanced Typed Memo Patterns">
          {`// Typed memo factory
function createMemoizedComponent<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
) {
  return memo(Component) as React.MemoExoticComponent<
    React.ComponentType<P>
  >;
}

// Usage
interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => (
  <div>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

const MemoizedCard = createMemoizedComponent(Card);

// Typed memo with generic props
interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function GenericList<T>({ items, renderItem, keyExtractor }: GenericListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Typed memo with generics
const MemoizedGenericList = memo(GenericList) as typeof GenericList;

// Typed memo with default props
interface ComponentWithDefaultsProps {
  title: string;
  count?: number;
  active?: boolean;
}

const ComponentWithDefaults = memo<ComponentWithDefaultsProps>(
  ({ title, count = 0, active = false }) => {
    return (
      <div>
        <h1>{title}</h1>
        <p>Count: {count}</p>
        <p>Active: {active ? 'Yes' : 'No'}</p>
      </div>
    );
  }
);`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>React.memo preserves component prop types</li>
          <li>Custom comparison functions are typed with prevProps and nextProps</li>
          <li>Memo works with forwardRef for ref forwarding</li>
          <li>Generic components can be memoized with type preservation</li>
          <li>Memo factories enable reusable memoization patterns</li>
        </ul>
      </InfoBox>
    </div>
  );
}

