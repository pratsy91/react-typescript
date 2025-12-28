import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function EdgeCasesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Edge Cases & Gotchas
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Common TypeScript edge cases and gotchas in React development,
        including event handler return types, ref forwarding issues, generic
        component constraints, type widening, circular dependencies, and
        performance considerations.
      </p>

      <Section title="1. Common Edge Cases">
        <p className="text-gray-700 dark:text-gray-300">
          Understanding and solving common TypeScript edge cases in React.
        </p>

        <CodeBlock title="Event Handler Return Types">
          {`// Event handlers should return void, not undefined
// ❌ Bad
const handleClick = (): undefined => {
  console.log('clicked');
  return undefined;  // TypeScript error
};

// ✅ Good
const handleClick = (): void => {
  console.log('clicked');
  // No return needed
};

// ✅ Also good (implicit void)
const handleClick = () => {
  console.log('clicked');
};

// React event handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  e.target.value;
};

// Async event handlers
const handleSubmit = async (e: React.FormEvent): Promise<void> => {
  e.preventDefault();
  await submitForm();
};`}
        </CodeBlock>

        <CodeBlock title="Ref Forwarding Issues">
          {`// Common ref forwarding pitfalls

// ❌ Bad: Ref type mismatch
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// ✅ Good: Correct ref type
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// ❌ Bad: Forgetting to forward ref
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props) => {
  return <button {...props} />;  // Ref not forwarded
});

// ✅ Good: Forward ref correctly
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <button ref={ref} {...props} />;
});

// ❌ Bad: Wrong ref type
const CustomInput = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;  // Type error
});

// ✅ Good: Correct ref type
const CustomInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});`}
        </CodeBlock>

        <CodeBlock title="Generic Component Issues">
          {`// Generic component constraints

// ❌ Bad: Missing constraint
function List<T>({ items }: { items: T[] }) {
  return items.map(item => <div>{item}</div>);  // Error: T might not be renderable
}

// ✅ Good: Add constraint
function List<T extends { id: string }>({ items }: { items: T[] }) {
  return items.map(item => <div key={item.id}>{item.id}</div>);
}

// ❌ Bad: Constraint too restrictive
function List<T extends string>({ items }: { items: T[] }) {
  return items.map(item => <div>{item}</div>);
}

// ✅ Good: Flexible constraint
function List<T extends string | number>({ items }: { items: T[] }) {
  return items.map(item => <div>{String(item)}</div>);
}

// Type widening issues
// ❌ Bad: Type widens to string
const status = 'pending';  // Type: string

// ✅ Good: Use const assertion
const status = 'pending' as const;  // Type: "pending"

// ✅ Good: Use satisfies
const status = 'pending' satisfies 'pending' | 'loading' | 'success';`}
        </CodeBlock>

        <CodeBlock title="Circular Dependencies & Module Augmentation">
          {`// Circular dependencies

// ❌ Bad: Circular type reference
type A = { b: B };
type B = { a: A };  // Error: Circular reference

// ✅ Good: Use interfaces or make optional
interface A {
  b?: B;
}
interface B {
  a?: A;
}

// ✅ Good: Use forward references
type A = { b?: B };
type B = { a?: A };

// Module augmentation conflicts

// ❌ Bad: Conflicting augmentations
declare module 'react' {
  interface Component {
    customMethod(): void;
  }
}

declare module 'react' {
  interface Component {
    anotherMethod(): void;  // Merges, but can cause issues
  }
}

// ✅ Good: Single augmentation
declare module 'react' {
  interface Component {
    customMethod(): void;
    anotherMethod(): void;
  }
}

// Working with poor library typings
// ✅ Good: Create wrapper types
import { LibraryFunction } from 'poorly-typed-library';

type TypedResult = {
  id: string;
  name: string;
  value: number;
};

function useTypedLibraryFunction(): TypedResult {
  const result = LibraryFunction();
  // Validate and transform
  return {
    id: String(result.id),
    name: String(result.name),
    value: Number(result.value),
  };
}`}
        </CodeBlock>

        <CodeBlock title="Performance of Complex Types">
          {`// Type instantiation depth

// ❌ Bad: Deeply nested types
type DeepType<T> = T extends object
  ? {
      [K in keyof T]: DeepType<T[K]>;
    }
  : T;

// Can cause: "Type instantiation is excessively deep and possibly infinite"

// ✅ Good: Limit depth
type DeepType<T, Depth extends number = 5> = Depth extends 0
  ? T
  : T extends object
  ? {
      [K in keyof T]: DeepType<T[K], Prev<Depth>>;
    }
  : T;

// ✅ Good: Use simpler types
type SimpleType<T> = {
  [K in keyof T]: T[K];
};

// Conditional type performance
// ❌ Bad: Complex conditional chains
type ComplexType<T> = T extends string
  ? T extends \`\${infer _}\`
    ? T extends \`\${infer _}\${infer _}\`
      ? 'complex'
      : 'simple'
    : never
  : never;

// ✅ Good: Simplify conditionals
type SimpleType<T> = T extends string ? 'string' : 'other';

// Mapped type performance
// ❌ Bad: Too many mapped types
type VeryComplex<T> = {
  [K in keyof T]: {
    [K2 in keyof T[K]]: {
      [K3 in keyof T[K][K2]]: T[K][K2][K3];
    };
  };
};

// ✅ Good: Flatten structure
type Flattened<T> = {
  [K in keyof T]: T[K];
};`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Event handlers should return void, not undefined</li>
          <li>Ref forwarding requires correct ref types</li>
          <li>Generic components need appropriate constraints</li>
          <li>Type widening can be prevented with const assertions</li>
          <li>Circular dependencies require careful type design</li>
          <li>Complex types can impact compilation performance</li>
        </ul>
      </InfoBox>
    </div>
  );
}

