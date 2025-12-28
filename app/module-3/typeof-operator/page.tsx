import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeofOperatorPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Typeof Operator
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        The typeof operator in TypeScript serves dual purposes: as a runtime
        JavaScript operator for value types and as a compile-time type query
        operator to extract types from values.
      </p>

      <Section title="1. Type Queries with Typeof">
        <p className="text-gray-700 dark:text-gray-300">
          In type positions, typeof extracts the type of a value, allowing you
          to derive types from existing JavaScript values.
        </p>

        <CodeBlock title="Type query examples">
          {`// Basic typeof for types
const message = "Hello";
type MessageType = typeof message;  // string

const count = 42;
type CountType = typeof count;  // number

const isActive = true;
type ActiveType = typeof isActive;  // boolean

// Typeof with const assertions
const colors = ["red", "green", "blue"] as const;
type ColorsType = typeof colors;  // readonly ["red", "green", "blue"]

// Without as const
const colors2 = ["red", "green", "blue"];
type Colors2Type = typeof colors2;  // string[]

// Typeof with objects
const user = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

type UserType = typeof user;
// { name: string; age: number; email: string }

// Typeof with nested objects
const config = {
  api: {
    baseUrl: "https://api.example.com",
    timeout: 5000
  },
  features: {
    darkMode: true
  }
} as const;

type ConfigType = typeof config;

// Typeof with functions
function greet(name: string): string {
  return \`Hello, \${name}\`;
}

type GreetType = typeof greet;  // (name: string) => string

// Typeof with arrow functions
const add = (a: number, b: number) => a + b;
type AddType = typeof add;  // (a: number, b: number) => number

// Typeof with classes
class Person {
  constructor(public name: string, public age: number) {}
  
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }
}

type PersonType = typeof Person;  // typeof Person (constructor)
type PersonInstance = InstanceType<typeof Person>;  // Person instance

// Typeof with enums
enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Complete = "COMPLETE"
}

type StatusEnum = typeof Status;
// { Pending: Status.Pending; Active: Status.Active; Complete: Status.Complete }

type StatusValue = Status;  // Status.Pending | Status.Active | Status.Complete

// Typeof with arrays
const numbers = [1, 2, 3, 4, 5];
type NumbersType = typeof numbers;  // number[]

// Typeof with tuples
const point: [number, number] = [10, 20];
type PointType = typeof point;  // [number, number]

// Typeof with symbols
const sym = Symbol("key");
type SymType = typeof sym;  // typeof sym (unique symbol)

// Typeof with BigInt
const bigNum = 9007199254740991n;
type BigNumType = typeof bigNum;  // bigint

// Typeof with null and undefined
const nothing = null;
type NothingType = typeof nothing;  // null

const undef = undefined;
type UndefType = typeof undef;  // undefined`}
        </CodeBlock>

        <InfoBox type="info">
          Use typeof in type positions to extract types from values. This is
          especially useful with const assertions, configuration objects, and
          when you want to derive types from runtime values.
        </InfoBox>
      </Section>

      <Section title="2. Typeof with Keyof">
        <p className="text-gray-700 dark:text-gray-300">
          Combining typeof with keyof creates powerful patterns for extracting
          keys from value objects.
        </p>

        <CodeBlock title="Typeof keyof patterns">
          {`// Basic typeof keyof
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

type ConfigKeys = keyof typeof config;  // "apiUrl" | "timeout" | "retries"

// Using in function parameter
function getConfigValue(key: keyof typeof config) {
  return config[key];
}

getConfigValue("apiUrl");    // OK: string
getConfigValue("timeout");   // OK: number
// getConfigValue("invalid"); // Error

// Typeof keyof with const assertion
const routes = {
  home: "/",
  about: "/about",
  contact: "/contact"
} as const;

type RouteKeys = keyof typeof routes;  // "home" | "about" | "contact"
type RouteValues = typeof routes[RouteKeys];  // "/" | "/about" | "/contact"

// Typeof keyof with enum
enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}

type ColorKeys = keyof typeof Color;  // "Red" | "Green" | "Blue"

// Complex example
const statusMessages = {
  200: "OK",
  404: "Not Found",
  500: "Server Error"
} as const;

type StatusCode = keyof typeof statusMessages;  // "200" | "404" | "500"
type StatusMessage = typeof statusMessages[StatusCode];  // "OK" | "Not Found" | "Server Error"

// Typeof keyof in generic function
function pick<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

const user = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

const picked = pick(user, "name", "email");
// Type: { name: string; email: string }

// Type-safe environment variables
const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  API_URL: process.env.API_URL || "http://localhost:3000",
  PORT: parseInt(process.env.PORT || "3000")
} as const;

type EnvKey = keyof typeof env;

function getEnv(key: EnvKey) {
  return env[key];
}

// Typeof keyof with nested objects
const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d"
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px"
  }
} as const;

type ThemeSection = keyof typeof theme;  // "colors" | "spacing"
type ColorKey = keyof typeof theme.colors;  // "primary" | "secondary"
type SpacingKey = keyof typeof theme.spacing;  // "small" | "medium" | "large"

// Practical validator example
const validators = {
  email: (value: string) => value.includes("@"),
  minLength: (min: number) => (value: string) => value.length >= min,
  maxLength: (max: number) => (value: string) => value.length <= max
};

type ValidatorName = keyof typeof validators;

function validate(
  value: string,
  validatorName: ValidatorName,
  ...args: any[]
): boolean {
  const validator = validators[validatorName];
  return typeof validator === "function"
    ? validator(...args)(value)
    : validator(value);
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Combining typeof and keyof is perfect for creating type-safe accessors
          to configuration objects, environment variables, and other constant
          data structures.
        </InfoBox>
      </Section>

      <Section title="3. Typeof Guards (Runtime)">
        <p className="text-gray-700 dark:text-gray-300">
          At runtime, typeof is JavaScript's type checking operator, essential
          for type narrowing and guards.
        </p>

        <CodeBlock title="Runtime typeof examples">
          {`// Basic typeof guards
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();  // string
  } else {
    return value.toFixed(2);  // number
  }
}

// All typeof return values
function identify(value: unknown): string {
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "undefined") return "undefined";
  if (typeof value === "function") return "function";
  if (typeof value === "symbol") return "symbol";
  if (typeof value === "bigint") return "bigint";
  if (typeof value === "object") {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return "object";
  }
  return "unknown";
}

// Typeof with union types
function handle(value: string | number | boolean) {
  if (typeof value === "string") {
    console.log(value.length);
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else {
    console.log(value ? "yes" : "no");
  }
}

// Typeof in type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

// Using type guards
function process2(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else if (isNumber(value)) {
    console.log(value.toFixed(2));
  }
}

// Typeof with objects (careful!)
function checkObject(value: unknown) {
  if (typeof value === "object") {
    // value could be null, array, or object
    if (value === null) {
      return "null";
    }
    if (Array.isArray(value)) {
      return "array";
    }
    return "object";
  }
  return "not object";
}

// Typeof with functions
function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

function callIfFunction(value: unknown) {
  if (isFunction(value)) {
    value();  // Safe to call
  }
}

// Typeof in filter
const mixed: (string | number)[] = [1, "two", 3, "four"];
const strings = mixed.filter(x => typeof x === "string");  // (string | number)[]
// Need type predicate for proper narrowing:
const strings2 = mixed.filter((x): x is string => typeof x === "string");  // string[]

// Multiple typeof checks
function processValue(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  return "invalid";
}

// Typeof with optional parameters
function greet(name?: string) {
  if (typeof name !== "undefined") {
    return \`Hello, \${name}\`;
  }
  return "Hello, stranger";
}

// Typeof in switch
function handleType(value: unknown) {
  switch (typeof value) {
    case "string":
      return value.toUpperCase();
    case "number":
      return value.toFixed(2);
    case "boolean":
      return value ? "yes" : "no";
    default:
      return "unknown type";
  }
}

// Typeof with property access
function getProperty(obj: any, key: string) {
  if (typeof obj === "object" && obj !== null && key in obj) {
    return obj[key];
  }
  return undefined;
}

// Typeof for validation
function validateInput(input: unknown): input is string {
  if (typeof input !== "string") {
    throw new Error("Input must be a string");
  }
  return true;
}

// Typeof in array methods
const values: unknown[] = [1, "two", true, 4];
const numbers = values.filter((v): v is number => typeof v === "number");  // number[]`}
        </CodeBlock>

        <InfoBox type="warning">
          Runtime typeof returns "object" for null, arrays, and objects. Always
          check for null explicitly and use Array.isArray() for arrays. Use
          typeof for primitive type checks and type guards.
        </InfoBox>
      </Section>

      <Section title="4. Advanced Typeof Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns combine typeof with other TypeScript features for
          sophisticated type operations.
        </p>

        <CodeBlock title="Advanced typeof patterns">
          {`// Typeof with ReturnType
function createUser(name: string, age: number) {
  return {
    name,
    age,
    createdAt: new Date()
  };
}

type User = ReturnType<typeof createUser>;
// { name: string; age: number; createdAt: Date }

// Typeof with Parameters
function greet(name: string, greeting: string = "Hello") {
  return \`\${greeting}, \${name}!\`;
}

type GreetParams = Parameters<typeof greet>;  // [name: string, greeting?: string]

// Typeof with ConstructorParameters
class Person {
  constructor(public name: string, public age: number) {}
}

type PersonParams = ConstructorParameters<typeof Person>;  // [name: string, age: number]

// Typeof with InstanceType
type PersonInstance = InstanceType<typeof Person>;  // Person

// Typeof in mapped types
const actions = {
  increment: (state: number) => state + 1,
  decrement: (state: number) => state - 1,
  reset: () => 0
};

type ActionMap = {
  [K in keyof typeof actions]: typeof actions[K];
};

// Typeof with generic utilities
function createStore<T>(initialState: T) {
  let state = initialState;
  
  return {
    getState: () => state,
    setState: (newState: T) => { state = newState; }
  };
}

const userStore = createStore({ name: "John", age: 30 });
type UserStore = typeof userStore;
type UserState = ReturnType<typeof userStore.getState>;

// Typeof with discriminated unions
const handlers = {
  string: (value: string) => value.toUpperCase(),
  number: (value: number) => value.toFixed(2),
  boolean: (value: boolean) => value ? "yes" : "no"
} as const;

type HandlerKey = keyof typeof handlers;
type HandlerFn<K extends HandlerKey> = typeof handlers[K];

// Typeof with template literals
const eventHandlers = {
  onClick: (e: MouseEvent) => {},
  onKeyPress: (e: KeyboardEvent) => {},
  onFocus: (e: FocusEvent) => {}
};

type EventHandlerKeys = keyof typeof eventHandlers;  // "onClick" | "onKeyPress" | "onFocus"

// Extract event name from handler key
type EventName<T extends string> = T extends \`on\${infer E}\` ? Lowercase<E> : never;
type EventNames = EventName<EventHandlerKeys>;  // "click" | "keypress" | "focus"

// Typeof with branded types
const UserId = Symbol("UserId");
const PostId = Symbol("PostId");

const ids = {
  [UserId]: (id: number) => ({ __brand: UserId, value: id }),
  [PostId]: (id: number) => ({ __brand: PostId, value: id })
};

type UserIdType = ReturnType<typeof ids[typeof UserId]>;
type PostIdType = ReturnType<typeof ids[typeof PostId]>;

// Typeof with builder pattern
function createBuilder() {
  const data: any = {};
  
  return {
    setName(name: string) {
      data.name = name;
      return this;
    },
    setAge(age: number) {
      data.age = age;
      return this;
    },
    build() {
      return data;
    }
  };
}

type Builder = ReturnType<typeof createBuilder>;
type BuilderResult = ReturnType<Builder["build"]>;

// Typeof with factory functions
function createFactory<T>(create: () => T) {
  return {
    create,
    createMany(count: number): T[] {
      return Array.from({ length: count }, create);
    }
  };
}

const userFactory = createFactory(() => ({
  id: Math.random(),
  name: "User"
}));

type UserFactory = typeof userFactory;
type FactoryUser = ReturnType<typeof userFactory.create>;

// Typeof with module patterns
const mathUtils = {
  constants: {
    PI: Math.PI,
    E: Math.E
  },
  operations: {
    add: (a: number, b: number) => a + b,
    multiply: (a: number, b: number) => a * b
  }
} as const;

type MathUtils = typeof mathUtils;
type MathOperation = typeof mathUtils.operations[keyof typeof mathUtils.operations];

// Typeof with configuration objects
const createConfig = <T extends Record<string, any>>(config: T) => config;

const appConfig = createConfig({
  api: {
    baseUrl: "https://api.example.com" as const,
    timeout: 5000
  },
  features: {
    darkMode: true,
    analytics: false
  }
});

type AppConfig = typeof appConfig;
type ApiConfig = typeof appConfig.api;

// Typeof in recursive types
const nestedData = {
  level1: {
    level2: {
      level3: {
        value: "deep"
      }
    }
  }
} as const;

type NestedData = typeof nestedData;
type Level3 = typeof nestedData.level1.level2.level3;`}
        </CodeBlock>

        <InfoBox type="important">
          Advanced typeof patterns extract types from complex value structures,
          enabling type-safe factories, builders, and configuration systems
          without manually defining types.
        </InfoBox>
      </Section>

      <Section title="5. Typeof Best Practices">
        <p className="text-gray-700 dark:text-gray-300">
          Guidelines for effectively using typeof in both type queries and
          runtime checks.
        </p>

        <CodeBlock title="Typeof best practices">
          {`// Practice 1: Use typeof for deriving types from values
const defaultConfig = {
  theme: "light" as const,
  language: "en" as const,
  notifications: true
};

type Config = typeof defaultConfig;  // Better than manually defining

// Practice 2: Combine with as const for precise types
const colors = {
  primary: "#007bff",
  secondary: "#6c757d"
} as const;

type ColorKey = keyof typeof colors;  // "primary" | "secondary"
type ColorValue = typeof colors[ColorKey];  // "#007bff" | "#6c757d"

// Practice 3: Use typeof for function types
function processUser(user: User): UserResult {
  // implementation
  return {} as UserResult;
}

// Extract types without duplication
type ProcessUser = typeof processUser;
type UserResult = ReturnType<typeof processUser>;
type UserParam = Parameters<typeof processUser>[0];

// Practice 4: Runtime typeof for type guards
function isStringOrNumber(value: unknown): value is string | number {
  return typeof value === "string" || typeof value === "number";
}

// Practice 5: Always check for null with objects
function processObject(value: unknown) {
  if (typeof value === "object" && value !== null) {
    // Safe to use as object
  }
}

// Practice 6: Use typeof with enums carefully
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

// typeof Status is the enum object itself
type StatusEnum = typeof Status;

// Status (without typeof) is the union of values
type StatusValue = Status;  // Status.Active | Status.Inactive

// Practice 7: Prefer type queries over manual types
// Bad: Manually defining types
const apiConfig = {
  baseUrl: "https://api.example.com",
  timeout: 5000
};

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

// Good: Use typeof
type ApiConfig2 = typeof apiConfig;

// Practice 8: Use typeof for configuration objects
const endpoints = {
  users: "/api/users",
  posts: "/api/posts",
  comments: "/api/comments"
} as const;

function getEndpoint(key: keyof typeof endpoints) {
  return endpoints[key];
}

// Practice 9: Typeof with generics for flexibility
function createTypedMap<T extends Record<string, any>>(obj: T) {
  return new Map(Object.entries(obj));
}

const userMap = createTypedMap({ id: 1, name: "John" });
type UserMap = typeof userMap;  // Map<string, string | number>

// Practice 10: Document typeof usage
/**
 * Configuration object for the application
 */
const appConfig = {
  api: { baseUrl: "https://api.example.com" },
  features: { darkMode: true }
} as const;

/**
 * Type extracted from appConfig
 * @see appConfig
 */
type AppConfig = typeof appConfig;

// Anti-patterns to avoid:

// ❌ Don't use typeof when you can use the type directly
function getUser(): User {
  return {} as User;
}
type UserType = typeof getUser;  // Bad: Use User directly

// ❌ Don't forget null check with objects
function bad(value: unknown) {
  if (typeof value === "object") {
    // value could be null!
    // value.toString();  // Might crash
  }
}

// ❌ Don't use typeof for array detection
function badArrayCheck(value: unknown) {
  if (typeof value === "object") {
    // Could be array, object, or null
  }
}

// ✅ Use Array.isArray instead
function goodArrayCheck(value: unknown) {
  if (Array.isArray(value)) {
    // Definitely an array
  }
}

// Summary:
// Type Query (compile-time):
// - Extract types from values with typeof
// - Combine with as const for literal types
// - Use with ReturnType, Parameters, etc.

// Runtime Check:
// - Use typeof for primitive checks
// - Always check null for objects
// - Use Array.isArray for arrays
// - Use instanceof for class instances

// When to use typeof:
// ✅ Deriving types from configuration objects
// ✅ Extracting function types
// ✅ Runtime type guards for primitives
// ✅ Type-safe accessors with keyof

// When NOT to use typeof:
// ❌ When a type is already defined
// ❌ For array detection (use Array.isArray)
// ❌ For class instance checks (use instanceof)
// ❌ For null checks (use === null)`}
        </CodeBlock>

        <InfoBox type="tip">
          Use typeof in type positions to derive types from values, reducing
          duplication. At runtime, use typeof for primitive type checks, but
          remember its limitations with objects, arrays, and null.
        </InfoBox>
      </Section>
    </div>
  );
}
