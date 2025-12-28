import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function KeyofOperatorPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Keyof Operator
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        The keyof operator creates a union type of all property keys in an
        object type, enabling powerful type-safe property access and
        manipulation patterns.
      </p>

      <Section title="1. Basic Keyof Usage">
        <p className="text-gray-700 dark:text-gray-300">
          The keyof operator extracts all keys from a type as a string literal
          union.
        </p>

        <CodeBlock title="Basic keyof examples">
          {`// Basic keyof
interface User {
  name: string;
  age: number;
  email: string;
}

type UserKeys = keyof User;  // "name" | "age" | "email"

// Using keyof in function parameter
function getProperty(user: User, key: keyof User) {
  return user[key];
}

const user: User = { name: "John", age: 30, email: "john@example.com" };
const name = getProperty(user, "name");    // OK
const age = getProperty(user, "age");      // OK
// getProperty(user, "invalid");           // Error: not a key

// Keyof with type alias
type Person = {
  firstName: string;
  lastName: string;
};

type PersonKeys = keyof Person;  // "firstName" | "lastName"

// Keyof with class
class Animal {
  name: string = "";
  age: number = 0;
}

type AnimalKeys = keyof Animal;  // "name" | "age"

// Keyof with index signature
interface StringMap {
  [key: string]: string;
}

type StringMapKeys = keyof StringMap;  // string | number
// Note: number is included because JavaScript coerces numeric keys to strings

// Keyof with number index signature
interface NumberMap {
  [key: number]: string;
}

type NumberMapKeys = keyof NumberMap;  // number

// Keyof with mixed properties
interface Mixed {
  name: string;
  [key: string]: any;
}

type MixedKeys = keyof Mixed;  // string | number

// Keyof with readonly
interface ReadonlyUser {
  readonly id: number;
  name: string;
}

type ReadonlyUserKeys = keyof ReadonlyUser;  // "id" | "name"

// Keyof with optional properties
interface OptionalProps {
  required: string;
  optional?: number;
}

type OptionalKeys = keyof OptionalProps;  // "required" | "optional"

// Keyof with symbol keys
const sym = Symbol("key");

interface WithSymbol {
  [sym]: string;
  name: string;
}

type WithSymbolKeys = keyof WithSymbol;  // typeof sym | "name"

// Keyof with empty interface
interface Empty {}

type EmptyKeys = keyof Empty;  // never

// Keyof with methods
interface Calculator {
  add(a: number, b: number): number;
  value: number;
}

type CalculatorKeys = keyof Calculator;  // "add" | "value"`}
        </CodeBlock>

        <InfoBox type="info">
          keyof creates a union of literal types representing all property keys.
          It works with interfaces, type aliases, and classes, including
          methods, properties, and index signatures.
        </InfoBox>
      </Section>

      <Section title="2. Keyof with Typeof">
        <p className="text-gray-700 dark:text-gray-300">
          Combining keyof with typeof allows you to extract keys from object
          values, not just types.
        </p>

        <CodeBlock title="Keyof typeof examples">
          {`// Keyof typeof with object
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

type ConfigKeys = keyof typeof config;  // "apiUrl" | "timeout" | "retries"

// Using it in a function
function getConfigValue(key: keyof typeof config) {
  return config[key];
}

getConfigValue("apiUrl");    // OK
// getConfigValue("invalid"); // Error

// Keyof typeof with const assertion
const colors = {
  primary: "#007bff",
  secondary: "#6c757d",
  success: "#28a745"
} as const;

type ColorKeys = keyof typeof colors;  // "primary" | "secondary" | "success"

// Keyof typeof with enum
enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Complete = "COMPLETE"
}

type StatusKeys = keyof typeof Status;  // "Pending" | "Active" | "Complete"

// Keyof typeof with class instance
class Person {
  firstName: string = "";
  lastName: string = "";
  getFullName() {
    return \`\${this.firstName} \${this.lastName}\`;
  }
}

const person = new Person();
type PersonInstanceKeys = keyof typeof person;  // "firstName" | "lastName" | "getFullName"

// Keyof typeof with array
const arr = [1, 2, 3];
type ArrayKeys = keyof typeof arr;  // number | keyof Array<number>

// Keyof typeof with function
const myFunc = () => {};
myFunc.customProp = "value";
type FuncKeys = keyof typeof myFunc;  // "customProp" | keyof Function

// Practical example: Type-safe config access
const appConfig = {
  api: {
    baseUrl: "https://api.example.com",
    timeout: 5000
  },
  features: {
    darkMode: true,
    analytics: false
  }
} as const;

type AppConfigKeys = keyof typeof appConfig;  // "api" | "features"
type ApiConfigKeys = keyof typeof appConfig.api;  // "baseUrl" | "timeout"

function getFeature(key: keyof typeof appConfig.features) {
  return appConfig.features[key];
}

// Keyof typeof with complex objects
const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  user: {
    profile: "/user/profile",
    settings: "/user/settings"
  }
} as const;

type RouteKeys = keyof typeof routes;  // "home" | "about" | "contact" | "user"
type UserRouteKeys = keyof typeof routes.user;  // "profile" | "settings"

// Generic function with keyof typeof
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

const picked = pick(config, ["apiUrl", "timeout"]);
// Type: { apiUrl: string; timeout: number }`}
        </CodeBlock>

        <InfoBox type="tip">
          Use keyof typeof to extract keys from actual JavaScript values instead
          of types. This is especially useful with configuration objects, enums,
          and const assertions.
        </InfoBox>
      </Section>

      <Section title="3. Generic Keyof Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Keyof is powerful when combined with generics to create type-safe
          property access functions and utilities.
        </p>

        <CodeBlock title="Generic keyof patterns">
          {`// Generic property getter
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30, email: "john@example.com" };
const name = getProperty(user, "name");  // string
const age = getProperty(user, "age");    // number

// Generic property setter
function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
  obj[key] = value;
}

setProperty(user, "name", "Jane");  // OK
// setProperty(user, "name", 123);  // Error: wrong type

// Pick specific properties
function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

const picked = pick(user, "name", "email");
// Type: { name: string; email: string }

// Omit specific properties
function omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}

const omitted = omit(user, "email");
// Type: { name: string; age: number }

// Has property check
function hasProperty<T, K extends keyof T>(obj: T, key: K): boolean {
  return key in obj;
}

// Get multiple properties
function pluck<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map(item => item[key]);
}

const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 }
];

const names = pluck(users, "name");  // string[]
const ages = pluck(users, "age");    // number[]

// Update property immutably
function updateProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): T {
  return { ...obj, [key]: value };
}

// Group by property
function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
  return arr.reduce((groups, item) => {
    const keyValue = String(item[key]);
    if (!groups[keyValue]) {
      groups[keyValue] = [];
    }
    groups[keyValue].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

// Sort by property
function sortBy<T, K extends keyof T>(arr: T[], key: K): T[] {
  return [...arr].sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
}

// Map object values
function mapObject<T extends object, U>(
  obj: T,
  fn: <K extends keyof T>(value: T[K], key: K) => U
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  (Object.keys(obj) as Array<keyof T>).forEach(key => {
    result[key] = fn(obj[key], key);
  });
  return result;
}

// Filter object properties
function filterObject<T extends object>(
  obj: T,
  predicate: <K extends keyof T>(value: T[K], key: K) => boolean
): Partial<T> {
  const result = {} as Partial<T>;
  (Object.keys(obj) as Array<keyof T>).forEach(key => {
    if (predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  });
  return result;
}

// Type-safe event emitter
class TypedEventEmitter<Events extends Record<string, any>> {
  private listeners: {
    [K in keyof Events]?: Array<(data: Events[K]) => void>;
  } = {};

  on<K extends keyof Events>(event: K, handler: (data: Events[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(handler);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]) {
    this.listeners[event]?.forEach(handler => handler(data));
  }
}

interface MyEvents {
  click: { x: number; y: number };
  keypress: { key: string };
}

const emitter = new TypedEventEmitter<MyEvents>();
emitter.on("click", data => console.log(data.x, data.y));  // Type-safe!`}
        </CodeBlock>

        <InfoBox type="important">
          Generic functions with keyof constraints enable type-safe property
          manipulation. The K extends keyof T pattern ensures keys are valid and
          return types match property types.
        </InfoBox>
      </Section>

      <Section title="4. Advanced Keyof Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns combine keyof with mapped types, conditional types,
          and other TypeScript features for powerful type transformations.
        </p>

        <CodeBlock title="Advanced keyof patterns">
          {`// Get keys of specific type
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

interface Example {
  name: string;
  age: number;
  email: string;
  active: boolean;
}

type StringKeys = KeysOfType<Example, string>;   // "name" | "email"
type NumberKeys = KeysOfType<Example, number>;   // "age"
type BooleanKeys = KeysOfType<Example, boolean>; // "active"

// Required keys only
type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

interface PartialExample {
  required: string;
  optional?: number;
}

type Required = RequiredKeys<PartialExample>;  // "required"

// Optional keys only
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type Optional = OptionalKeys<PartialExample>;  // "optional"

// Readonly keys
type ReadonlyKeys<T> = {
  [K in keyof T]-?: (<U>() => U extends { [Q in K]: T[K] } ? 1 : 2) extends
    (<U>() => U extends { -readonly [Q in K]: T[K] } ? 1 : 2)
    ? never
    : K;
}[keyof T];

interface MixedReadonly {
  readonly id: number;
  name: string;
}

type ReadonlyProps = ReadonlyKeys<MixedReadonly>;  // "id"

// Mutable keys (non-readonly)
type MutableKeys<T> = {
  [K in keyof T]-?: (<U>() => U extends { [Q in K]: T[K] } ? 1 : 2) extends
    (<U>() => U extends { -readonly [Q in K]: T[K] } ? 1 : 2)
    ? K
    : never;
}[keyof T];

type MutableProps = MutableKeys<MixedReadonly>;  // "name"

// Function property keys
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface Service {
  data: string;
  getData(): string;
  setData(value: string): void;
}

type Methods = FunctionKeys<Service>;  // "getData" | "setData"

// Non-function property keys
type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type Properties = NonFunctionKeys<Service>;  // "data"

// Deep keyof (nested property paths)
type DeepKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? K | \`\${K}.\${DeepKeys<T[K]>}\`
          : K
        : never;
    }[keyof T]
  : never;

interface Nested {
  user: {
    profile: {
      name: string;
    };
    settings: {
      theme: string;
    };
  };
}

type NestedKeys = DeepKeys<Nested>;
// "user" | "user.profile" | "user.profile.name" | "user.settings" | "user.settings.theme"

// Paths type for nested access
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>];
    }[Extract<keyof T, string>];

type Paths = PathsToStringProps<Nested>;

// Type-safe path-based getter
function getNestedProperty<T, P extends string[]>(
  obj: T,
  ...path: P
): any {
  return path.reduce((acc: any, key) => acc?.[key], obj);
}

// Pick by value type
type PickByValue<T, V> = Pick<T, KeysOfType<T, V>>;

type StringProps = PickByValue<Example, string>;
// { name: string; email: string }

// Omit by value type
type OmitByValue<T, V> = Omit<T, KeysOfType<T, V>>;

type NonStringProps = OmitByValue<Example, string>;
// { age: number; active: boolean }

// Invert key-value
type Invert<T extends Record<string, string>> = {
  [K in keyof T as T[K]]: K;
};

type StatusCodes = {
  ok: "200";
  notFound: "404";
  serverError: "500";
};

type InvertedCodes = Invert<StatusCodes>;
// { "200": "ok"; "404": "notFound"; "500": "serverError" }

// Prefix/suffix keys
type PrefixKeys<T, P extends string> = {
  [K in keyof T as \`\${P}\${string & K}\`]: T[K];
};

type PrefixedUser = PrefixKeys<User, "get">;
// { getName: string; getAge: number; getEmail: string }

// Capitalize keys
type CapitalizeKeys<T> = {
  [K in keyof T as Capitalize<string & K>]: T[K];
};

type CapitalizedUser = CapitalizeKeys<User>;
// { Name: string; Age: number; Email: string }

// Camel to snake case keys
type CamelToSnake<S extends string> = S extends \`\${infer T}\${infer U}\`
  ? \`\${T extends Capitalize<T> ? "_" : ""}\${Lowercase<T>}\${CamelToSnake<U>}\`
  : S;

type SnakeCaseKeys<T> = {
  [K in keyof T as CamelToSnake<string & K>]: T[K];
};

interface CamelCase {
  firstName: string;
  lastName: string;
}

type SnakeCase = SnakeCaseKeys<CamelCase>;
// { first_name: string; last_name: string }`}
        </CodeBlock>

        <InfoBox type="tip">
          Advanced keyof patterns enable sophisticated type transformations. Use
          them for filtering properties by type, extracting specific kinds of
          keys, and creating type-safe utilities for complex data manipulation.
        </InfoBox>
      </Section>

      <Section title="5. Practical Keyof Applications">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world applications of keyof in form handling, API clients, state
          management, and validation.
        </p>

        <CodeBlock title="Practical keyof examples">
          {`// Form field handler
interface FormData {
  username: string;
  email: string;
  password: string;
}

class FormHandler<T> {
  private data: T;
  private errors: Partial<Record<keyof T, string>> = {};

  constructor(initialData: T) {
    this.data = initialData;
  }

  getValue<K extends keyof T>(field: K): T[K] {
    return this.data[field];
  }

  setValue<K extends keyof T>(field: K, value: T[K]): void {
    this.data[field] = value;
  }

  setError<K extends keyof T>(field: K, error: string): void {
    this.errors[field] = error;
  }

  getError<K extends keyof T>(field: K): string | undefined {
    return this.errors[field];
  }

  validate<K extends keyof T>(
    field: K,
    validator: (value: T[K]) => string | undefined
  ): void {
    const error = validator(this.data[field]);
    if (error) {
      this.setError(field, error);
    }
  }
}

// Type-safe API client
interface ApiEndpoints {
  getUser: { params: { id: number }; response: User };
  createUser: { params: { name: string; email: string }; response: User };
  deleteUser: { params: { id: number }; response: void };
}

class ApiClient<Endpoints extends Record<string, any>> {
  async call<K extends keyof Endpoints>(
    endpoint: K,
    params: Endpoints[K]["params"]
  ): Promise<Endpoints[K]["response"]> {
    // API call implementation
    return {} as Endpoints[K]["response"];
  }
}

const client = new ApiClient<ApiEndpoints>();
const user = await client.call("getUser", { id: 1 });  // User

// Type-safe query builder
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

class QueryBuilder<T> {
  private conditions: Array<{ field: keyof T; value: any }> = [];

  where<K extends keyof T>(field: K, value: T[K]): this {
    this.conditions.push({ field, value });
    return this;
  }

  orderBy(field: keyof T, direction: "asc" | "desc" = "asc"): this {
    // Implementation
    return this;
  }

  select<K extends keyof T>(...fields: K[]): Pick<T, K>[] {
    // Implementation
    return [] as Pick<T, K>[];
  }
}

const query = new QueryBuilder<User>()
  .where("age", 30)
  .orderBy("name")
  .select("id", "name");

// Type-safe storage
class TypedStorage<T extends Record<string, any>> {
  getItem<K extends keyof T>(key: K): T[K] | null {
    const item = localStorage.getItem(String(key));
    return item ? JSON.parse(item) : null;
  }

  setItem<K extends keyof T>(key: K, value: T[K]): void {
    localStorage.setItem(String(key), JSON.stringify(value));
  }

  removeItem<K extends keyof T>(key: K): void {
    localStorage.removeItem(String(key));
  }
}

interface StorageSchema {
  user: User;
  token: string;
  settings: { theme: string };
}

const storage = new TypedStorage<StorageSchema>();
const user2 = storage.getItem("user");  // User | null

// Type-safe validator
type Validator<T> = {
  [K in keyof T]: (value: T[K]) => string | undefined;
};

function createValidator<T>(rules: Partial<Validator<T>>) {
  return {
    validate(data: T): Partial<Record<keyof T, string>> {
      const errors: Partial<Record<keyof T, string>> = {};
      (Object.keys(rules) as Array<keyof T>).forEach(key => {
        const rule = rules[key];
        if (rule) {
          const error = rule(data[key]);
          if (error) {
            errors[key] = error;
          }
        }
      });
      return errors;
    }
  };
}

const userValidator = createValidator<User>({
  name: (name) => name.length > 0 ? undefined : "Name required",
  email: (email) => email.includes("@") ? undefined : "Invalid email"
});

// Type-safe reducer
type Action<T> =
  | { type: "set"; field: keyof T; value: any }
  | { type: "reset" };

function createReducer<T>(initialState: T) {
  return (state: T, action: Action<T>): T => {
    switch (action.type) {
      case "set":
        return { ...state, [action.field]: action.value };
      case "reset":
        return initialState;
      default:
        return state;
    }
  };
}

// Type-safe comparison
function isEqual<T extends object>(obj1: T, obj2: T): boolean {
  const keys = Object.keys(obj1) as Array<keyof T>;
  return keys.every(key => obj1[key] === obj2[key]);
}

// Type-safe diff
function diff<T extends object>(
  obj1: T,
  obj2: T
): Partial<Record<keyof T, { old: any; new: any }>> {
  const changes: Partial<Record<keyof T, { old: any; new: any }>> = {};
  (Object.keys(obj1) as Array<keyof T>).forEach(key => {
    if (obj1[key] !== obj2[key]) {
      changes[key] = { old: obj1[key], new: obj2[key] };
    }
  });
  return changes;
}`}
        </CodeBlock>

        <InfoBox type="important">
          Use keyof in real applications for type-safe form handling, API
          clients, query builders, and data validation. It ensures property
          access is always valid and types match expected values.
        </InfoBox>
      </Section>
    </div>
  );
}
