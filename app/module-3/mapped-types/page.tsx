import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function MappedTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Mapped Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Mapped types transform properties of existing types by iterating over
        keys, creating new types with modified properties. They use the syntax
        {" {[K in keyof T]: ...}"} for powerful type transformations.
      </p>

      <Section title="1. Basic Mapped Types">
        <p className="text-gray-700 dark:text-gray-300">
          Mapped types iterate over the keys of a type, transforming each
          property according to a pattern.
        </p>

        <CodeBlock title="Basic mapped type examples">
          {`// Basic mapped type - make all properties optional
type Partial<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
// { name?: string; age?: number; email?: string }

// Make all properties required
type Required<T> = {
  [K in keyof T]-?: T[K];
};

interface OptionalUser {
  name?: string;
  age?: number;
}

type RequiredUser = Required<OptionalUser>;
// { name: string; age: number }

// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; readonly email: string }

// Remove readonly
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type UserPreview = Pick<User, "name" | "email">;
// { name: string; email: string }

// Omit properties
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type UserWithoutEmail = Omit<User, "email">;
// { name: string; age: number }

// Record type - create object type with specific keys
type Record<K extends string | number | symbol, T> = {
  [P in K]: T;
};

type UserRoles = Record<"admin" | "user" | "guest", boolean>;
// { admin: boolean; user: boolean; guest: boolean }

// Transform property types
type Stringify<T> = {
  [K in keyof T]: string;
};

type StringUser = Stringify<User>;
// { name: string; age: string; email: string }

// Nullify all properties
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null; email: string | null }

// Boolean mapping
type Booleanify<T> = {
  [K in keyof T]: boolean;
};

type UserFlags = Booleanify<User>;
// { name: boolean; age: boolean; email: boolean }`}
        </CodeBlock>

        <InfoBox type="info">
          Mapped types use [K in keyof T] to iterate over keys. Use ? for
          optional, -? to remove optional, readonly for immutability, and
          -readonly to remove readonly modifiers.
        </InfoBox>
      </Section>

      <Section title="2. Mapping Modifiers">
        <p className="text-gray-700 dark:text-gray-300">
          Modifiers (+/-) control whether properties are optional or readonly,
          allowing precise control over property attributes.
        </p>

        <CodeBlock title="Mapping modifier examples">
          {`// Add optional modifier
type AddOptional<T> = {
  [K in keyof T]?: T[K];
};

// Remove optional modifier
type RemoveOptional<T> = {
  [K in keyof T]-?: T[K];
};

// Add readonly modifier
type AddReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Remove readonly modifier
type RemoveReadonly<T> = {
  -readonly [K in keyof T]: T[K];
};

// Combine modifiers
type PartialReadonly<T> = {
  readonly [K in keyof T]?: T[K];
};

type RequiredMutable<T> = {
  -readonly [K in keyof T]-?: T[K];
};

// Conditional modifiers
type OptionalByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]?: T[K];
} & {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

interface Mixed {
  name: string;
  age: number;
  active: boolean;
}

type OptionalStrings = OptionalByType<Mixed, string>;
// { name?: string; age: number; active: boolean }

// Readonly by type
type ReadonlyByType<T, U> = {
  readonly [K in keyof T as T[K] extends U ? K : never]: T[K];
} & {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

// Remove specific modifiers
type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object
    ? DeepMutable<T[K]>
    : T[K];
};

// Partial specific keys
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type UserWithOptionalEmail = PartialBy<User, "email">;
// { name: string; age: number; email?: string }

// Required specific keys
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Modifier combinations
type PartialReadonlyRecord<K extends string, T> = {
  readonly [P in K]?: T;
};

// Complex modifier patterns
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

// Modifier with transformation
type ReadonlyAndNullable<T> = {
  readonly [K in keyof T]: T[K] | null;
};

// Selective modifiers
type SelectivePartial<T, K extends keyof T> = {
  [P in K]?: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
};`}
        </CodeBlock>

        <InfoBox type="tip">
          Use + to add modifiers (default behavior) and - to remove them.
          Combine ? for optionality and readonly for immutability to create
          precise property transformations.
        </InfoBox>
      </Section>

      <Section title="3. Key Remapping">
        <p className="text-gray-700 dark:text-gray-300">
          Key remapping with as allows you to rename, filter, or transform
          property keys during mapping.
        </p>

        <CodeBlock title="Key remapping examples">
          {`// Basic key remapping
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }

// Setters
type Setters<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

type UserSetters = Setters<User>;
// { setName: (value: string) => void; setAge: (value: number) => void }

// Remove keys by condition
type RemoveKindField<T> = {
  [K in keyof T as Exclude<K, "kind">]: T[K];
};

interface WithKind {
  kind: string;
  name: string;
  value: number;
}

type WithoutKind = RemoveKindField<WithKind>;
// { name: string; value: number }

// Filter by type
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type StringProps = PickByType<User, string>;
// { name: string; email: string }

// Add prefix to keys
type Prefix<T, P extends string> = {
  [K in keyof T as \`\${P}\${string & K}\`]: T[K];
};

type PrefixedUser = Prefix<User, "user_">;
// { user_name: string; user_age: number; user_email: string }

// Add suffix to keys
type Suffix<T, S extends string> = {
  [K in keyof T as \`\${string & K}\${S}\`]: T[K];
};

// Transform keys
type SnakeCase<S extends string> = S extends \`\${infer T}\${infer U}\`
  ? \`\${T extends Capitalize<T> ? "_" : ""}\${Lowercase<T>}\${SnakeCase<U>}\`
  : S;

type ToSnakeCase<T> = {
  [K in keyof T as SnakeCase<string & K>]: T[K];
};

interface CamelCase {
  firstName: string;
  lastName: string;
}

type SnakeCaseUser = ToSnakeCase<CamelCase>;
// { first_name: string; last_name: string }

// Conditional key remapping
type OnlyStrings<T> = {
  [K in keyof T as T[K] extends string ? K : never]: T[K];
};

// Event handler mapping
type EventHandlers<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]: (data: T[K]) => void;
};

interface Events {
  click: MouseEvent;
  keypress: KeyboardEvent;
}

type Handlers = EventHandlers<Events>;
// { onClick: (data: MouseEvent) => void; onKeypress: (data: KeyboardEvent) => void }

// Remove prefix from keys
type RemovePrefix<S extends string, P extends string> = S extends \`\${P}\${infer Rest}\`
  ? Rest
  : S;

type UnprefixKeys<T, P extends string> = {
  [K in keyof T as RemovePrefix<string & K, P>]: T[K];
};

// Flatten nested keys
type FlattenKeys<T, Prefix extends string = ""> = {
  [K in keyof T as K extends string
    ? T[K] extends object
      ? keyof FlattenKeys<T[K], \`\${Prefix}\${K}.\`>
      : \`\${Prefix}\${K}\`
    : never]: T[K] extends object
    ? FlattenKeys<T[K]>[keyof FlattenKeys<T[K]>]
    : T[K];
};

// Remove method keys
type OmitMethods<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

// Extract method keys
type PickMethods<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
};

// Custom key transformation
type TransformKeys<T, F extends (key: string) => string> = {
  [K in keyof T as K extends string ? ReturnType<F> : K]: T[K];
};`}
        </CodeBlock>

        <InfoBox type="important">
          Key remapping with as allows sophisticated key transformations:
          renaming, filtering, adding prefixes/suffixes, and converting between
          naming conventions. It's essential for API adapters and DTOs.
        </InfoBox>
      </Section>

      <Section title="4. Recursive Mapped Types">
        <p className="text-gray-700 dark:text-gray-300">
          Recursive mapped types apply transformations deeply through nested
          object structures.
        </p>

        <CodeBlock title="Recursive mapped type examples">
          {`// Deep readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

interface Nested {
  user: {
    profile: {
      name: string;
    };
  };
}

type ReadonlyNested = DeepReadonly<Nested>;
// { readonly user: { readonly profile: { readonly name: string } } }

// Deep partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

// Deep required
type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object
    ? DeepRequired<T[K]>
    : T[K];
};

// Deep mutable (remove readonly)
type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object
    ? DeepMutable<T[K]>
    : T[K];
};

// Deep nullable
type DeepNullable<T> = {
  [K in keyof T]: T[K] extends object
    ? DeepNullable<T[K]>
    : T[K] | null;
};

// Deep non-nullable
type DeepNonNullable<T> = {
  [K in keyof T]: T[K] extends object
    ? DeepNonNullable<T[K]>
    : NonNullable<T[K]>;
};

// Deep record
type DeepRecord<K extends string, T> = {
  [P in K]: T | DeepRecord<K, T>;
};

// Recursive optional
type RecursivePartial<T> = T extends object
  ? { [K in keyof T]?: RecursivePartial<T[K]> }
  : T;

// Recursive transformation
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends object
    ? DeepStringify<T[K]>
    : string;
};

// Recursive with arrays
type DeepArray<T> = {
  [K in keyof T]: T[K] extends any[]
    ? DeepArray<T[K][number]>[]
    : T[K] extends object
    ? DeepArray<T[K]>
    : T[K];
};

// Recursive freeze
type DeepFreeze<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepFreeze<T[K]>
    : T[K];
};

// Recursive with type guards
type DeepPartialExcept<T, K extends keyof T> = {
  [P in keyof T]?: P extends K
    ? T[P]
    : T[P] extends object
    ? DeepPartialExcept<T[P], K>
    : T[P];
};

// Recursive paths
type Paths<T, Prefix extends string = ""> = {
  [K in keyof T]: K extends string
    ? T[K] extends object
      ? \`\${Prefix}\${K}\` | Paths<T[K], \`\${Prefix}\${K}.\`>
      : \`\${Prefix}\${K}\`
    : never;
}[keyof T];

type AllPaths = Paths<Nested>;
// "user" | "user.profile" | "user.profile.name"

// Recursive with depth limit
type DeepPartialWithDepth<T, D extends number = 5> = [D] extends [0]
  ? T
  : {
      [K in keyof T]?: T[K] extends object
        ? DeepPartialWithDepth<T[K], Prev[D]>
        : T[K];
    };

type Prev = [never, 0, 1, 2, 3, 4, 5];

// Recursive modification
type DeepModify<T, From, To> = {
  [K in keyof T]: T[K] extends From
    ? To
    : T[K] extends object
    ? DeepModify<T[K], From, To>
    : T[K];
};

// Replace all strings with numbers
type AllNumbers = DeepModify<Nested, string, number>;`}
        </CodeBlock>

        <InfoBox type="tip">
          Recursive mapped types apply transformations through nested
          structures. Use depth limits to prevent infinite recursion and type
          guards to handle different property types appropriately.
        </InfoBox>
      </Section>

      <Section title="5. Advanced Mapped Type Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Complex mapped type patterns combine multiple features for
          sophisticated type transformations.
        </p>

        <CodeBlock title="Advanced mapped type patterns">
          {`// Discriminated union mapping
type Action =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "reset" };

type ActionCreators = {
  [A in Action as A["type"]]: A extends { payload: infer P }
    ? (payload: P) => A
    : () => A;
};

// { increment: (payload: number) => ...; decrement: (payload: number) => ...; reset: () => ... }

// State machine mapping
type State = "idle" | "loading" | "success" | "error";

type StateHandlers = {
  [S in State as \`on\${Capitalize<S>}\`]: () => void;
};

// Proxy type generation
type Proxify<T> = {
  [K in keyof T]: {
    get(): T[K];
    set(value: T[K]): void;
  };
};

type ProxiedUser = Proxify<User>;
// { name: { get(): string; set(value: string): void }; ... }

// Observable type
type Observable<T> = {
  [K in keyof T]: {
    value: T[K];
    subscribe(callback: (value: T[K]) => void): () => void;
  };
};

// Validation schema
type ValidationSchema<T> = {
  [K in keyof T]: {
    required?: boolean;
    validate?: (value: T[K]) => string | undefined;
    default?: T[K];
  };
};

// Diff type
type Diff<T> = {
  [K in keyof T]?: {
    old: T[K];
    new: T[K];
  };
};

// Flatten type
type Flatten<T> = T extends object
  ? { [K in keyof T]: Flatten<T[K]> }
  : T;

// Merge types
type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
    ? U[K]
    : K extends keyof T
    ? T[K]
    : never;
};

// Optional keys type
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// Required keys type
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

// Split by optionality
type SplitOptional<T> = {
  required: Pick<T, RequiredKeys<T>>;
  optional: Pick<T, OptionalKeys<T>>;
};

// Create setters only for writable properties
type Setters2<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: T[K] extends { readonly [key: string]: any }
    ? never
    : (value: T[K]) => void;
};

// Async version of interface
type Asyncify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};

// Promisify all methods
type PromisifyMethods<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};

// Extract function parameters
type MethodParameters<T> = {
  [K in keyof T]: T[K] extends (...args: infer P) => any ? P : never;
};

// Extract return types
type MethodReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never;
};

// Create builder pattern
type Builder<T> = {
  [K in keyof T as \`with\${Capitalize<string & K>}\`]: (value: T[K]) => Builder<T>;
} & {
  build(): T;
};

// Readonly array properties
type ReadonlyArrayProps<T> = {
  [K in keyof T]: T[K] extends any[] ? readonly T[K][number][] : T[K];
};

// Deep freeze with arrays
type DeepFreezeArray<T> = {
  readonly [K in keyof T]: T[K] extends (infer U)[]
    ? readonly DeepFreezeArray<U>[]
    : T[K] extends object
    ? DeepFreezeArray<T[K]>
    : T[K];
};

// Create DTO (Data Transfer Object)
type DTO<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends object
    ? DTO<T[K]>
    : T[K];
};

// API response wrapper
type ApiWrapper<T> = {
  [K in keyof T]: {
    data: T[K];
    loading: boolean;
    error: Error | null;
  };
};

// Form state
type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error?: string;
    touched: boolean;
    dirty: boolean;
  };
};`}
        </CodeBlock>

        <InfoBox type="important">
          Advanced mapped types combine key remapping, conditional types,
          recursion, and modifiers for sophisticated transformations. Use them
          for proxies, builders, API adapters, and type-safe state management.
        </InfoBox>
      </Section>
    </div>
  );
}
