import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeUtilitiesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Type Utilities & Helpers
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Creating custom utility types, type inference helpers, validation
        types, builder patterns, and type-safe event emitters.
      </p>

      <Section title="1. Custom Utility Types">
        <p className="text-gray-700 dark:text-gray-300">
          Building reusable type helpers for common patterns.
        </p>

        <CodeBlock title="Custom Utility Types">
          {`// Deep readonly utility
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Deep partial utility
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep required utility
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// Optional keys utility
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Required keys utility
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// Function keys utility
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// Non-function keys utility
type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

// ValueOf utility
type ValueOf<T> = T[keyof T];

// KeysOfType utility
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Array to union utility
type ArrayToUnion<T extends readonly unknown[]> = T[number];

// Union to intersection utility
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;`}
        </CodeBlock>

        <CodeBlock title="Type Inference Helpers">
          {`// Extract promise type
type Awaited<T> = T extends Promise<infer U> ? U : T;

// Extract array element type
type ArrayElement<T> = T extends (infer U)[] ? U : never;

// Extract function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Extract function parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Extract first parameter
type FirstParameter<T> = T extends (first: infer F, ...args: any[]) => any
  ? F
  : never;

// Extract constructor parameters
type ConstructorParameters<T> = T extends new (...args: infer P) => any
  ? P
  : never;

// Extract instance type
type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : never;

// Extract property type
type PropertyType<T, K extends keyof T> = T[K];

// Extract nested property type
type NestedPropertyType<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends \`\${infer Key}.\${infer Rest}\`
  ? Key extends keyof T
    ? NestedPropertyType<T[Key], Rest>
    : never
  : never;`}
        </CodeBlock>

        <CodeBlock title="Builder Pattern Types">
          {`// Fluent builder pattern
interface Builder<T> {
  build(): T;
}

class UserBuilder implements Builder<User> {
  private name?: string;
  private email?: string;
  private age?: number;
  
  setName(name: string): this {
    this.name = name;
    return this;
  }
  
  setEmail(email: string): this {
    this.email = email;
    return this;
  }
  
  setAge(age: number): this {
    this.age = age;
    return this;
  }
  
  build(): User {
    if (!this.name || !this.email) {
      throw new Error('Name and email are required');
    }
    return {
      name: this.name,
      email: this.email,
      age: this.age,
    };
  }
}

// Typed chain builder
type ChainBuilder<T> = {
  [K in keyof T]: (value: T[K]) => ChainBuilder<Omit<T, K>>;
} & {
  build(): T;
};

function createBuilder<T extends Record<string, unknown>>(): ChainBuilder<T> {
  // Implementation
  return {} as ChainBuilder<T>;
}

// Type-safe event emitter
type EventMap = {
  click: { x: number; y: number };
  change: { value: string };
  error: { message: string };
};

class TypedEventEmitter<T extends Record<string, unknown>> {
  private listeners: {
    [K in keyof T]?: Array<(event: T[K]) => void>;
  } = {};
  
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }
  
  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.listeners[event]?.forEach((listener) => listener(data));
  }
}

const emitter = new TypedEventEmitter<EventMap>();
emitter.on('click', (data) => {
  console.log(data.x, data.y);  // Typed
});
emitter.emit('click', { x: 10, y: 20 });  // Typed`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Custom utility types solve specific type problems</li>
          <li>Type inference helpers extract types from values</li>
          <li>Builder patterns enable fluent APIs with types</li>
          <li>Type-safe event emitters use mapped types</li>
          <li>Utility types compose for complex patterns</li>
        </ul>
      </InfoBox>
    </div>
  );
}

