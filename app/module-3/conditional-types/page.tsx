import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ConditionalTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Conditional Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Conditional types enable you to create types that depend on conditions,
        using the syntax T extends U ? X : Y. They're fundamental to advanced
        type transformations and type-level programming.
      </p>

      <Section title="1. Basic Conditional Types">
        <p className="text-gray-700 dark:text-gray-300">
          Conditional types use the extends keyword to test if one type is
          assignable to another, returning different types based on the result.
        </p>

        <CodeBlock title="Basic conditional type examples">
          {`// Basic conditional type
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;   // true
type Test2 = IsString<number>;   // false
type Test3 = IsString<"hello">;  // true

// Conditional with multiple types
type TypeName<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  "other";

type T1 = TypeName<string>;   // "string"
type T2 = TypeName<number>;   // "number"
type T3 = TypeName<boolean>;  // "boolean"
type T4 = TypeName<object>;   // "other"

// Conditional with null/undefined
type NonNullable<T> = T extends null | undefined ? never : T;

type NotNull = NonNullable<string | null>;  // string
type NotUndefined = NonNullable<number | undefined>;  // number

// Conditional with arrays
type IsArray<T> = T extends any[] ? true : false;

type Arr1 = IsArray<string[]>;  // true
type Arr2 = IsArray<number>;    // false

// Conditional with functions
type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

type Fn1 = IsFunction<() => void>;  // true
type Fn2 = IsFunction<string>;      // false

// Conditional with objects
type IsObject<T> = T extends object ? true : false;

type Obj1 = IsObject<{ a: string }>;  // true
type Obj2 = IsObject<string>;         // false

// Nested conditionals
type DeepCheck<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends any[] ? "array" :
  T extends object ? "object" :
  "unknown";

// Conditional with literal types
type IsLiteral<T> = T extends string
  ? string extends T
    ? false
    : true
  : false;

type Lit1 = IsLiteral<"hello">;  // true
type Lit2 = IsLiteral<string>;   // false

// Conditional with never
type ExcludeNever<T> = T extends never ? "is never" : "not never";

type Never1 = ExcludeNever<never>;  // "is never"
type Never2 = ExcludeNever<string>; // "not never"

// Conditional with union types (distributive)
type ToArray<T> = T extends any ? T[] : never;

type Arr = ToArray<string | number>;  // string[] | number[]

// Conditional with intersection
type ExtractString<T> = T extends string & infer U ? U : never;`}
        </CodeBlock>

        <InfoBox type="info">
          Conditional types use T extends U ? X : Y syntax. When T is assignable
          to U, the type resolves to X; otherwise, it resolves to Y. They're
          essential for type-level logic.
        </InfoBox>
      </Section>

      <Section title="2. Infer Keyword">
        <p className="text-gray-700 dark:text-gray-300">
          The infer keyword allows you to extract and capture types within
          conditional types, enabling powerful type inference patterns.
        </p>

        <CodeBlock title="Infer keyword examples">
          {`// Basic infer - extract return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet(): string {
  return "Hello";
}

type GreetReturn = ReturnType<typeof greet>;  // string

// Infer parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function add(a: number, b: number): number {
  return a + b;
}

type AddParams = Parameters<typeof add>;  // [a: number, b: number]

// Infer first parameter
type FirstParameter<T> = T extends (first: infer F, ...rest: any[]) => any
  ? F
  : never;

type FirstParam = FirstParameter<typeof add>;  // number

// Infer array element type
type ElementType<T> = T extends (infer E)[] ? E : never;

type StringElement = ElementType<string[]>;  // string
type NumberElement = ElementType<number[]>;  // number

// Infer promise type
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type AsyncString = Awaited<Promise<string>>;  // string
type NestedAsync = Awaited<Promise<Promise<number>>>;  // number

// Infer tuple elements
type First<T> = T extends [infer F, ...any[]] ? F : never;
type Second<T> = T extends [any, infer S, ...any[]] ? S : never;

type Tuple = [string, number, boolean];
type FirstType = First<Tuple>;   // string
type SecondType = Second<Tuple>; // number

// Infer rest elements
type Tail<T> = T extends [any, ...infer Rest] ? Rest : never;

type TailType = Tail<[1, 2, 3, 4]>;  // [2, 3, 4]

// Infer object property types
type PropertyType<T, K extends keyof T> = T extends { [P in K]: infer V }
  ? V
  : never;

interface User {
  name: string;
  age: number;
}

type UserName = PropertyType<User, "name">;  // string

// Infer function this type
type ThisParameter<T> = T extends (this: infer U, ...args: any[]) => any
  ? U
  : unknown;

function withThis(this: { value: number }) {
  return this.value;
}

type ThisType = ThisParameter<typeof withThis>;  // { value: number }

// Infer constructor parameters
type ConstructorParameters<T> = T extends new (...args: infer P) => any
  ? P
  : never;

class Person {
  constructor(name: string, age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>;  // [name: string, age: number]

// Infer instance type
type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : never;

type PersonInstance = InstanceType<typeof Person>;  // Person

// Multiple infer
type UnwrapPromises<T> = T extends Promise<infer U>
  ? U extends Promise<infer V>
    ? V
    : U
  : T;

// Infer in nested structures
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

// Infer with conditional chains
type FlattenArray<T> = T extends (infer U)[]
  ? U extends (infer V)[]
    ? V
    : U
  : T;

type Flat = FlattenArray<string[][]>;  // string

// Infer function arguments
type ArgumentTypes<F> = F extends (...args: infer A) => any ? A : never;

// Infer mapped type value
type ValueOf<T> = T extends { [K in keyof T]: infer V } ? V : never;

type Values = ValueOf<{ a: string; b: number }>;  // string | number`}
        </CodeBlock>

        <InfoBox type="tip">
          The infer keyword extracts types within conditional types. Use it to
          capture return types, parameters, array elements, promise values, and
          more. It's essential for building utility types.
        </InfoBox>
      </Section>

      <Section title="3. Distributive Conditional Types">
        <p className="text-gray-700 dark:text-gray-300">
          When conditional types are applied to union types, they distribute
          over each member, creating powerful type transformation patterns.
        </p>

        <CodeBlock title="Distributive conditional type examples">
          {`// Basic distribution
type ToArray<T> = T extends any ? T[] : never;

type Arrays = ToArray<string | number>;  // string[] | number[]
// Distributes as: ToArray<string> | ToArray<number>

// Without distribution (wrapped in tuple)
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type NonDist = ToArrayNonDist<string | number>;  // (string | number)[]

// Exclude utility type
type Exclude<T, U> = T extends U ? never : T;

type WithoutString = Exclude<string | number | boolean, string>;  // number | boolean

// Extract utility type
type Extract<T, U> = T extends U ? T : never;

type OnlyString = Extract<string | number | boolean, string>;  // string

// Filter null and undefined
type NonNullable<T> = T extends null | undefined ? never : T;

type Clean = NonNullable<string | null | number | undefined>;  // string | number

// Distribution with object types
type BoxedValue<T> = T extends any ? { value: T } : never;

type Boxed = BoxedValue<string | number>;
// { value: string } | { value: number }

// Distribution with conditional narrowing
type Filter<T, U> = T extends U ? T : never;

type Numbers = Filter<string | number | boolean, number>;  // number
type Strings = Filter<"a" | "b" | 1 | 2, string>;  // "a" | "b"

// Distribution in mapped types
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Distribution with function types
type ReturnTypes<T> = T extends (...args: any[]) => infer R ? R : never;

type Returns = ReturnTypes<(() => string) | (() => number)>;
// string | number

// Custom distribution
type Wrap<T> = T extends any ? { data: T } : never;

type Wrapped = Wrap<1 | 2 | 3>;
// { data: 1 } | { data: 2 } | { data: 3 }

// Distribution with arrays
type ArrayElement<T> = T extends (infer E)[] ? E : T;

type Elements = ArrayElement<string[] | number[]>;  // string | number

// Prevent distribution with tuple
type NoDistribution<T> = [T] extends [any] ? "yes" : "no";

type Test1 = NoDistribution<string | number>;  // "yes"

// Distribution with objects
type Values<T> = T extends { value: infer V } ? V : never;

type AllValues = Values<{ value: string } | { value: number }>;
// string | number

// Conditional distribution with constraints
type KeysOfType<T, U> = T extends any
  ? { [K in keyof T]: T[K] extends U ? K : never }[keyof T]
  : never;

interface Mixed {
  name: string;
  age: number;
  email: string;
}

type StringKeys = KeysOfType<Mixed, string>;  // "name" | "email"

// Distribution in recursive types
type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

// Union distribution example
type StringOrNumber = string | number;
type Result = StringOrNumber extends any ? StringOrNumber[] : never;
// (string | number)[]

// Practical: Event handler types
type EventMap = {
  click: MouseEvent;
  keypress: KeyboardEvent;
};

type EventHandlers<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]: (event: T[K]) => void;
};

type Handlers = EventHandlers<EventMap>;
// { onClick: (event: MouseEvent) => void; onKeypress: (event: KeyboardEvent) => void }

// Distribution with never
type RemoveNever<T> = T extends never ? never : T;

type WithNever = RemoveNever<string | never | number>;  // string | number`}
        </CodeBlock>

        <InfoBox type="important">
          Distributive conditional types automatically distribute over union
          type members. To prevent distribution, wrap the checked type in a
          tuple [T]. This is how built-in utilities like Exclude and Extract
          work.
        </InfoBox>
      </Section>

      <Section title="4. Advanced Conditional Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Complex conditional type patterns combine multiple conditions,
          recursion, and type inference for sophisticated transformations.
        </p>

        <CodeBlock title="Advanced conditional patterns">
          {`// Recursive conditional types
type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

interface Nested {
  user: {
    profile: {
      name: string;
    };
  };
}

type PartialNested = DeepPartial<Nested>;
// { user?: { profile?: { name?: string } } }

// Conditional with multiple constraints
type Flatten<T> = T extends (infer U)[]
  ? U extends (infer V)[]
    ? Flatten<V[]>
    : U
  : T;

type Deep = Flatten<string[][][]>;  // string

// Type-level if-else chains
type TypeCheck<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined" :
  T extends null ? "null" :
  T extends any[] ? "array" :
  T extends Function ? "function" :
  T extends object ? "object" :
  "unknown";

// Conditional with unions and intersections
type MergeInsertions<T> = T extends object
  ? { [K in keyof T]: MergeInsertions<T[K]> }
  : T;

// Recursive path type
type Leaves<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T]
  : "";

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? \`\${K}\${"" extends P ? "" : "."}\${P}\`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Conditional with template literals
type EventKey<T extends string> = T extends \`on\${infer E}\`
  ? Uncapitalize<E>
  : never;

type Click = EventKey<"onClick">;  // "click"

// Reverse mapping
type ReverseMap<T extends Record<string, string>> = {
  [K in keyof T as T[K]]: K;
};

type StatusCodes = { ok: "200"; notFound: "404" };
type Reversed = ReverseMap<StatusCodes>;  // { "200": "ok"; "404": "notFound" }

// Conditional with discriminated unions
type Action =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "reset" };

type ActionPayload<T extends Action["type"]> = Extract<
  Action,
  { type: T }
> extends { payload: infer P }
  ? P
  : never;

type IncrementPayload = ActionPayload<"increment">;  // number
type ResetPayload = ActionPayload<"reset">;  // never

// Conditional type guards
type IsExact<T, U> = [T] extends [U]
  ? [U] extends [T]
    ? true
    : false
  : false;

type Same = IsExact<string, string>;  // true
type Different = IsExact<string, number>;  // false

// Async type unwrapping
type UnwrapPromise<T> = T extends Promise<infer U>
  ? UnwrapPromise<U>
  : T;

type Unwrapped = UnwrapPromise<Promise<Promise<Promise<string>>>>;  // string

// Conditional with function overloads
type OverloadedReturnType<T> = T extends {
  (...args: any[]): infer R;
  (...args: any[]): infer R;
}
  ? R
  : never;

// Tuple to union conversion
type TupleToUnion<T> = T extends (infer E)[] ? E : never;

type Union = TupleToUnion<[string, number, boolean]>;
// string | number | boolean

// Union to intersection (complex)
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type Intersection = UnionToIntersection<{ a: string } | { b: number }>;
// { a: string } & { b: number }

// Conditional with mapped types
type ReadonlyByType<T, U> = {
  [K in keyof T]: T[K] extends U ? Readonly<T[K]> : T[K];
};

// Optional by type
type OptionalByType<T, U> = {
  [K in keyof T]: T[K] extends U ? T[K] | undefined : T[K];
};

// Recursive object traversal
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

// Conditional with never elimination
type NonEmptyArray<T> = [T, ...T[]];

type IsNonEmpty<T> = T extends NonEmptyArray<any> ? true : false;

// Deep required type
type DeepRequired<T> = T extends object
  ? { [K in keyof T]-?: DeepRequired<T[K]> }
  : T;

// Conditional type factory
type Factory<T, Condition> = Condition extends true
  ? T[]
  : Condition extends false
  ? T
  : T | T[];`}
        </CodeBlock>

        <InfoBox type="tip">
          Advanced conditional patterns combine recursion, multiple conditions,
          and type inference to create powerful utilities. Use them for deep
          transformations, type filtering, and complex type-level logic.
        </InfoBox>
      </Section>

      <Section title="5. Practical Conditional Type Applications">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world applications of conditional types in API design, form
          validation, state management, and type-safe utilities.
        </p>

        <CodeBlock title="Practical conditional type examples">
          {`// Type-safe API responses
type ApiResponse<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

type UserResponse = ApiResponse<User, string>;

function handleResponse<T>(response: ApiResponse<T>) {
  if (response.success) {
    return response.data;  // T
  } else {
    throw new Error(response.error.message);
  }
}

// Async operation states
type AsyncState<T, E = Error> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: E };

type ExtractData<T> = T extends { data: infer D } ? D : never;
type ExtractError<T> = T extends { error: infer E } ? E : never;

// Form field types based on value type
type FormField<T> = T extends string
  ? { type: "text"; value: T }
  : T extends number
  ? { type: "number"; value: T }
  : T extends boolean
  ? { type: "checkbox"; checked: T }
  : { type: "unknown"; value: T };

type NameField = FormField<string>;   // { type: "text"; value: string }
type AgeField = FormField<number>;    // { type: "number"; value: number }
type ActiveField = FormField<boolean>; // { type: "checkbox"; checked: boolean }

// Validator types
type Validator<T> = T extends string
  ? (value: T) => string | undefined
  : T extends number
  ? (value: T, min?: number, max?: number) => string | undefined
  : (value: T) => string | undefined;

// Type-safe routes
type RouteParams<T extends string> = T extends \`\${string}:\${infer Param}/\${infer Rest}\`
  ? { [K in Param | keyof RouteParams<Rest>]: string }
  : T extends \`\${string}:\${infer Param}\`
  ? { [K in Param]: string }
  : {};

type UserRoute = RouteParams<"/users/:id/posts/:postId">;
// { id: string; postId: string }

// Conditional mutation helpers
type Mutable<T> = T extends object
  ? { -readonly [K in keyof T]: Mutable<T[K]> }
  : T;

type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object
    ? DeepMutable<T[K]>
    : T[K];
};

// Error message types
type ErrorMessage<T> = T extends { error: infer E }
  ? E extends string
    ? E
    : E extends Error
    ? E["message"]
    : "Unknown error"
  : never;

// Type-safe event handlers
type EventHandler<E extends Event> = (event: E) => void;

type GetEventType<T extends string> = T extends "click"
  ? MouseEvent
  : T extends "keypress"
  ? KeyboardEvent
  : T extends "focus"
  ? FocusEvent
  : Event;

type ClickHandler = EventHandler<GetEventType<"click">>;
// (event: MouseEvent) => void

// Conditional property types
type PropType<T, K extends keyof T> = T[K] extends (...args: any[]) => any
  ? never
  : T[K];

type DataProps<T> = {
  [K in keyof T as PropType<T, K> extends never ? never : K]: PropType<T, K>;
};

// Type-safe query builder
class QueryBuilder<T> {
  where<K extends keyof T>(
    field: K,
    operator: T[K] extends number ? ">" | "<" | "=" : "=",
    value: T[K]
  ): this {
    return this;
  }
}

// Conditional return types
function process<T>(value: T): T extends string ? string : T extends number ? number : unknown {
  if (typeof value === "string") {
    return value.toUpperCase() as any;
  }
  if (typeof value === "number") {
    return (value * 2) as any;
  }
  return value as any;
}

// Type-safe storage adapter
type StorageValue<T> = T extends object
  ? string
  : T extends string
  ? string
  : T extends number
  ? string
  : string;

class TypedStorage {
  set<T>(key: string, value: T): void {
    const stored: StorageValue<T> = (
      typeof value === "object" ? JSON.stringify(value) : String(value)
    ) as StorageValue<T>;
    localStorage.setItem(key, stored);
  }

  get<T>(key: string, defaultValue: T): T {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    
    if (typeof defaultValue === "object") {
      return JSON.parse(item);
    }
    return item as T;
  }
}

// Conditional middleware types
type Middleware<T, U> = T extends U
  ? (value: T) => U
  : never;

// Type-safe command pattern
type Command<T> = T extends { execute: infer E }
  ? E extends (...args: infer P) => infer R
    ? { params: P; result: R }
    : never
  : never;

// Result type helpers
type OkResult<T> = { ok: true; value: T };
type ErrResult<E> = { ok: false; error: E };
type Result<T, E = Error> = OkResult<T> | ErrResult<E>;

function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) {
    return result.value;
  }
  throw result.error;
}`}
        </CodeBlock>

        <InfoBox type="important">
          Use conditional types in real applications for type-safe APIs, form
          handling, validation, routing, and state management. They enable
          runtime behavior to match type-level decisions.
        </InfoBox>
      </Section>
    </div>
  );
}
