import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function IndexedAccessTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Indexed Access Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Indexed access types (T[K]) allow you to look up specific properties on
        another type, creating powerful type-safe property access patterns and
        type transformations.
      </p>

      <Section title="1. Basic Indexed Access">
        <p className="text-gray-700 dark:text-gray-300">
          Use bracket notation to access the type of a property within another
          type.
        </p>

        <CodeBlock title="Basic indexed access examples">
          {`// Basic property access
interface User {
  name: string;
  age: number;
  email: string;
}

type UserName = User["name"];  // string
type UserAge = User["age"];    // number
type UserEmail = User["email"]; // string

// Multiple property access (union)
type UserNameOrAge = User["name" | "age"];  // string | number

// All properties
type UserProperty = User[keyof User];  // string | number

// Nested property access
interface Company {
  name: string;
  address: {
    street: string;
    city: string;
    country: string;
  };
}

type AddressType = Company["address"];
// { street: string; city: string; country: string }

type CityType = Company["address"]["city"];  // string

// Array element type
type Numbers = number[];
type NumberElement = Numbers[number];  // number

type StringArray = string[];
type StringElement = StringArray[number];  // string

// Tuple element access
type Point = [number, number];
type X = Point[0];  // number
type Y = Point[1];  // number

// Union of tuple elements
type PointElement = Point[number];  // number

// Array with specific index
const tuple: [string, number, boolean] = ["hello", 42, true];
type First = typeof tuple[0];   // string
type Second = typeof tuple[1];  // number
type Third = typeof tuple[2];   // boolean

// Object index access
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

type ApiUrl = typeof config["apiUrl"];  // string
type Timeout = typeof config["timeout"]; // number

// Index access with never
type Empty = {}["anything"];  // never (property doesn't exist)

// Index access with optional properties
interface Optional {
  required: string;
  optional?: number;
}

type RequiredProp = Optional["required"];  // string
type OptionalProp = Optional["optional"];  // number | undefined`}
        </CodeBlock>

        <InfoBox type="info">
          Indexed access types use bracket notation T[K] to extract property
          types. Use keyof to access all properties, or specific property names
          to extract individual types.
        </InfoBox>
      </Section>

      <Section title="2. Generic Indexed Access">
        <p className="text-gray-700 dark:text-gray-300">
          Combine indexed access with generics to create flexible, type-safe
          property accessors and utilities.
        </p>

        <CodeBlock title="Generic indexed access examples">
          {`// Generic property getter
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30, email: "john@example.com" };
const name = getProperty(user, "name");  // string
const age = getProperty(user, "age");    // number

// Generic property setter
function setProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;
}

setProperty(user, "name", "Jane");  // OK
// setProperty(user, "name", 123);  // Error: wrong type

// Generic with multiple properties
function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map(item => item[key]);
}

const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 }
];

const names = pluck(users, "name");  // string[]
const ages = pluck(users, "age");    // number[]

// Generic nested access
function getNestedProperty<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1]
>(obj: T, key1: K1, key2: K2): T[K1][K2] {
  return obj[key1][key2];
}

const company = {
  name: "Acme",
  address: { city: "NYC", street: "123 Main St" }
};

const city = getNestedProperty(company, "address", "city");  // string

// Generic array element access
function firstElement<T extends any[]>(arr: T): T[0] {
  return arr[0];
}

const point: [number, number] = [10, 20];
const x = firstElement(point);  // number

// Generic with constraints
function getValues<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): T[K][] {
  return keys.map(key => obj[key]);
}

// Generic mapped type with indexed access
type PropertyTypes<T> = {
  [K in keyof T]: T[K];
};

// Generic pick with indexed access
type Pick2<T, K extends keyof T> = {
  [P in K]: T[P];
};

type UserPick = Pick2<User, "name" | "email">;
// { name: string; email: string }

// Generic with conditional indexed access
type GetProperty<T, K> = K extends keyof T ? T[K] : never;

type UserName2 = GetProperty<User, "name">;  // string
type Invalid = GetProperty<User, "invalid">; // never

// Generic deep property access
type DeepProperty<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends \`\${infer K1}.\${infer K2}\`
  ? K1 extends keyof T
    ? DeepProperty<T[K1], K2>
    : never
  : never;

type NestedCity = DeepProperty<Company, "address.city">;  // string

// Generic array transformation
function mapArray<T extends any[], U>(
  arr: T,
  fn: (item: T[number]) => U
): U[] {
  return (arr as any[]).map(fn);
}

// Generic with union indexed access
function getValue<T, K extends keyof T>(
  obj: T,
  key: K | K[]
): T[K] | T[K][] {
  if (Array.isArray(key)) {
    return key.map(k => obj[k]);
  }
  return obj[key];
}

// Generic update with indexed access
function update<T, K extends keyof T>(
  obj: T,
  updates: { [P in K]?: T[P] }
): T {
  return { ...obj, ...updates };
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Generic indexed access enables type-safe property operations. The
          pattern &lt;T, K extends keyof T&gt; with T[K] ensures keys are valid
          and values match property types.
        </InfoBox>
      </Section>

      <Section title="3. Advanced Indexed Access Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns combine indexed access with mapped types,
          conditional types, and template literals for powerful transformations.
        </p>

        <CodeBlock title="Advanced indexed access patterns">
          {`// Extract property types by value type
type PropertiesOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

interface Example {
  name: string;
  age: number;
  email: string;
  active: boolean;
}

type StringProps = PropertiesOfType<Example, string>;  // "name" | "email"
type NumberProps = PropertiesOfType<Example, number>;  // "age"

// Create subset type by value type
type PickByValue<T, V> = Pick<T, PropertiesOfType<T, V>>;

type StringFields = PickByValue<Example, string>;
// { name: string; email: string }

// Deep property paths
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? \`\${K}\${"" extends P ? "" : "."}\${P}\`
    : never
  : never;

type Paths<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? \`\${K}\` | Join<K, Paths<T[K], Prev[D]>>
        : never;
    }[keyof T]
  : "";

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Nested {
  user: {
    profile: {
      name: string;
      age: number;
    };
    settings: {
      theme: string;
    };
  };
}

type NestedPaths = Paths<Nested>;
// "user" | "user.profile" | "user.profile.name" | ...

// Get type by path
type PathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends \`\${infer K}.\${infer Rest}\`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : never;

type UserName = PathValue<Nested, "user.profile.name">;  // string

// Array element types
type Unarray<T> = T extends (infer U)[] ? U : T;

type NumArray = number[];
type Num = Unarray<NumArray>;  // number

// Deep required
type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object
    ? DeepRequired<T[K]>
    : T[K];
};

// Deep partial
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

// Mutable (remove readonly)
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
}

type MutableUser = Mutable<ReadonlyUser>;
// { id: number; name: string }

// Function property types
type FunctionProperties<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface Service {
  data: string;
  getData(): string;
  setData(value: string): void;
}

type Methods = FunctionProperties<Service>;  // "getData" | "setData"

// Non-function properties
type NonFunctionProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type Data = NonFunctionProperties<Service>;  // "data"

// Promise unwrapping
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;

type AsyncResult = Promise<Promise<string>>;
type Result = Awaited<AsyncResult>;  // string

// Array operations
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer T] ? T : never;

type Numbers = [1, 2, 3, 4, 5];
type First = Head<Numbers>;  // 1
type Rest = Tail<Numbers>;   // [2, 3, 4, 5]

// Tuple to union
type TupleToUnion<T extends any[]> = T[number];

type Union = TupleToUnion<[string, number, boolean]>;
// string | number | boolean

// Union to intersection
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

type Inter = UnionToIntersection<{ a: string } | { b: number }>;
// { a: string } & { b: number }

// Recursive indexed access
type DeepValue<T, K extends string> = K extends \`\${infer First}.\${infer Rest}\`
  ? First extends keyof T
    ? DeepValue<T[First], Rest>
    : never
  : K extends keyof T
  ? T[K]
  : never;

// Flatten object
type Flatten<T> = {
  [K in keyof T]: T[K];
};

type Nested2 = { a: number } & { b: string };
type Flat = Flatten<Nested2>;  // { a: number; b: string }

// Extract by prefix
type ExtractByPrefix<T, P extends string> = {
  [K in keyof T as K extends \`\${P}\${string}\` ? K : never]: T[K];
};

interface Prefixed {
  getName: () => string;
  getAge: () => number;
  setName: (name: string) => void;
}

type Getters = ExtractByPrefix<Prefixed, "get">;
// { getName: () => string; getAge: () => number }`}
        </CodeBlock>

        <InfoBox type="important">
          Advanced indexed access patterns enable deep property manipulation,
          type filtering, and complex transformations. They're essential for
          building sophisticated type utilities.
        </InfoBox>
      </Section>

      <Section title="4. Practical Applications">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world applications of indexed access types in form handling, API
          clients, validation, and data transformation.
        </p>

        <CodeBlock title="Practical indexed access examples">
          {`// Type-safe form state
interface User {
  name: string;
  email: string;
  age: number;
}

type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error?: string;
    touched: boolean;
  };
};

type UserFormState = FormState<User>;
// {
//   name: { value: string; error?: string; touched: boolean };
//   email: { value: string; error?: string; touched: boolean };
//   age: { value: number; error?: string; touched: boolean };
// }

// Type-safe API client
interface Endpoints {
  getUser: { params: { id: number }; response: User };
  createUser: { params: Omit<User, "id">; response: User };
  updateUser: { params: User; response: User };
}

class ApiClient {
  async call<E extends keyof Endpoints>(
    endpoint: E,
    params: Endpoints[E]["params"]
  ): Promise<Endpoints[E]["response"]> {
    // Implementation
    return {} as Endpoints[E]["response"];
  }
}

const client = new ApiClient();
const user = await client.call("getUser", { id: 1 });  // User

// Type-safe validators
type Validator<T> = {
  [K in keyof T]: (value: T[K]) => string | undefined;
};

const userValidator: Validator<User> = {
  name: (name) => name.length > 0 ? undefined : "Required",
  email: (email) => email.includes("@") ? undefined : "Invalid",
  age: (age) => age >= 18 ? undefined : "Must be 18+"
};

// Type-safe selectors
interface State {
  user: User;
  posts: Post[];
  settings: Settings;
}

function createSelector<T extends keyof State>(key: T) {
  return (state: State): State[T] => state[key];
}

const selectUser = createSelector("user");  // (state: State) => User
const selectPosts = createSelector("posts"); // (state: State) => Post[]

// Type-safe diff
type Diff<T> = {
  [K in keyof T]?: {
    old: T[K];
    new: T[K];
  };
};

function diff<T extends object>(old: T, new: T): Diff<T> {
  const changes: Diff<T> = {};
  (Object.keys(old) as Array<keyof T>).forEach(key => {
    if (old[key] !== new[key]) {
      changes[key] = { old: old[key], new: new[key] };
    }
  });
  return changes;
}

// Type-safe query builder
class QueryBuilder<T> {
  where<K extends keyof T>(field: K, value: T[K]): this {
    // Implementation
    return this;
  }

  orderBy(field: keyof T): this {
    return this;
  }

  select<K extends keyof T>(...fields: K[]): Pick<T, K>[] {
    return [] as Pick<T, K>[];
  }
}

// Type-safe event emitter
type EventMap = {
  [K: string]: any[];
};

class TypedEmitter<Events extends EventMap> {
  on<E extends keyof Events>(
    event: E,
    handler: (...args: Events[E]) => void
  ): void {
    // Implementation
  }

  emit<E extends keyof Events>(event: E, ...args: Events[E]): void {
    // Implementation
  }
}

interface MyEvents {
  click: [x: number, y: number];
  keypress: [key: string];
}

const emitter = new TypedEmitter<MyEvents>();
emitter.on("click", (x, y) => {});  // Type-safe!

// Type-safe storage
class TypedStorage<Schema extends Record<string, any>> {
  get<K extends keyof Schema>(key: K): Schema[K] | null {
    const item = localStorage.getItem(String(key));
    return item ? JSON.parse(item) : null;
  }

  set<K extends keyof Schema>(key: K, value: Schema[K]): void {
    localStorage.setItem(String(key), JSON.stringify(value));
  }
}

interface StorageSchema {
  user: User;
  token: string;
}

const storage = new TypedStorage<StorageSchema>();
const user2 = storage.get("user");  // User | null

// Type-safe paths
function get<T, P extends Paths<T>>(
  obj: T,
  path: P
): PathValue<T, P> {
  const keys = path.split(".");
  let result: any = obj;
  for (const key of keys) {
    result = result[key];
  }
  return result;
}

const city = get(company, "address.city");  // string

// Type-safe setters with nested paths
function set<T, P extends Paths<T>>(
  obj: T,
  path: P,
  value: PathValue<T, P>
): T {
  const keys = path.split(".");
  const result = { ...obj };
  let current: any = result;
  
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  return result;
}

// Type-safe pick/omit utilities
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Use indexed access types to build type-safe APIs, form handlers,
          validators, and data utilities. They ensure property names are valid
          and types match at every access point.
        </InfoBox>
      </Section>
    </div>
  );
}
