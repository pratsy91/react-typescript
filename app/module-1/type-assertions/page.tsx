import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeAssertionsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Type Assertions
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Type assertions tell TypeScript to treat a value as a specific type,
        overriding its inferred type. Think of it as a way to say "trust me, I
        know what type this is." Use them carefully as they bypass TypeScript's
        type checking.
      </p>

      <Section title="1. 'as' Syntax (Preferred)">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            as
          </code>{" "}
          syntax is the modern and preferred way to perform type assertions in
          TypeScript.
        </p>

        <CodeBlock title="'as' syntax examples">
          {`// Basic 'as' assertions
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// Asserting from any to specific type
let data: any = { name: "John", age: 30 };
let user = data as { name: string; age: number };
console.log(user.name);

// Asserting DOM elements
const inputElement = document.getElementById("username") as HTMLInputElement;
inputElement.value = "John";

const button = document.querySelector(".submit-btn") as HTMLButtonElement;
button.disabled = true;

const div = document.createElement("div") as HTMLDivElement;

// Multiple assertions
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;

// Asserting in function returns
function getElement(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}

function getInput(id: string): HTMLInputElement {
  return document.getElementById(id) as HTMLInputElement;
}

// Asserting with union types
type NetworkState = 
  | { state: "loading" }
  | { state: "success"; data: string }
  | { state: "error"; error: Error };

function handleResponse(response: unknown) {
  const networkState = response as NetworkState;
  
  if (networkState.state === "success") {
    console.log(networkState.data);
  }
}

// Asserting API responses
interface ApiResponse {
  status: number;
  data: {
    users: Array<{ id: number; name: string }>;
  };
}

async function fetchUsers() {
  const response = await fetch("/api/users");
  const json = await response.json();
  const data = json as ApiResponse;
  return data.data.users;
}

// Asserting with generics
function parseJSON<T>(json: string): T {
  return JSON.parse(json) as T;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const user = parseJSON<User>('{"id": 1, "name": "John", "email": "john@example.com"}');

// Asserting in arrays
const mixedArray: (string | number)[] = ["a", 1, "b", 2];
const strings = mixedArray.filter(item => typeof item === "string") as string[];

// Asserting object properties
interface Config {
  apiUrl: string;
  timeout?: number;
}

const config: unknown = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

const typedConfig = config as Config;

// Asserting with type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processValue(value: unknown) {
  if (isString(value)) {
    // No assertion needed - type guard narrows the type
    console.log(value.toUpperCase());
  } else {
    // Assertion if we're sure about the type
    const num = value as number;
    console.log(num.toFixed(2));
  }
}

// Asserting in React (JSX)
// const component = <MyComponent /> as React.ReactElement;

// Asserting with interfaces
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const animal: Animal = {
  name: "Buddy",
  age: 5
};

// Asserting to more specific type (dangerous if wrong!)
const dog = animal as Dog; // No error, but animal doesn't have breed/bark!

// Safer approach - check first or add properties
const safeDog = {
  ...animal,
  breed: "Labrador",
  bark: () => console.log("Woof!")
} as Dog;

// Asserting with literal types
type Status = "pending" | "approved" | "rejected";

let currentStatus: string = "pending";
let typedStatus = currentStatus as Status;

// Asserting in class instances
class Base {
  name: string = "";
}

class Derived extends Base {
  age: number = 0;
}

const base: Base = new Derived();
const derived = base as Derived;
console.log(derived.age);

// Asserting with Pick/Omit
interface FullUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

const userData: unknown = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

const publicUser = userData as Pick<FullUser, "id" | "name" | "email">;

// Asserting with Partial
const partialUser = {
  name: "Jane"
} as Partial<User>;

// Asserting in error handling
try {
  throw new Error("Something went wrong");
} catch (error) {
  const err = error as Error;
  console.log(err.message);
}

// Asserting with custom types
type Point = { x: number; y: number };
type Point3D = Point & { z: number };

const point: Point = { x: 1, y: 2 };
const point3D = { ...point, z: 3 } as Point3D;

// Asserting event targets
function handleClick(event: Event) {
  const target = event.target as HTMLElement;
  target.classList.add("clicked");
  
  // More specific assertion
  if (target.tagName === "BUTTON") {
    const button = target as HTMLButtonElement;
    button.disabled = true;
  }
}

// Asserting with Record types
const dataMap: unknown = {
  user1: { name: "John" },
  user2: { name: "Jane" }
};

const typedMap = dataMap as Record<string, { name: string }>;`}
        </CodeBlock>

        <InfoBox type="tip">
          The 'as' syntax is preferred over angle brackets because it works in
          both .ts and .tsx (React) files, while angle brackets cause syntax
          conflicts with JSX.
        </InfoBox>
      </Section>

      <Section title="2. Angle Bracket Syntax (Legacy)">
        <p className="text-gray-700 dark:text-gray-300">
          The angle bracket syntax is an older way to perform type assertions.
          It's not compatible with JSX/TSX files, so prefer the 'as' syntax.
        </p>

        <CodeBlock title="Angle bracket syntax examples">
          {`// Basic angle bracket assertions
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;

// Asserting from any
let data: any = { name: "John", age: 30 };
let user = <{ name: string; age: number }>data;

// Asserting variables
let value: unknown = 42;
let num = <number>value;

// Asserting function returns
function getValue(): unknown {
  return "text";
}

let text = <string>getValue();

// Asserting with interfaces
interface Person {
  name: string;
  age: number;
}

let obj: unknown = { name: "Jane", age: 25 };
let person = <Person>obj;

// Multiple assertions (nested)
let nested: unknown = "123";
let numValue = <number>(<unknown>nested);

// Asserting arrays
let items: unknown = [1, 2, 3];
let numbers = <number[]>items;

// With generics
function identity<T>(value: unknown): T {
  return <T>value;
}

// Asserting object literals
let config = <{ host: string; port: number }>{
  host: "localhost",
  port: 3000
};

// Why angle brackets are problematic in JSX:
// In .tsx files, <Type> conflicts with JSX syntax
// <string>value  // Looks like a JSX element!
// value as string  // ✅ Clear and unambiguous

// Comparison: Same assertion, different syntax
let val1: unknown = "test";
let method1 = <string>val1;        // Angle bracket
let method2 = val1 as string;      // 'as' syntax

// Both do the same thing, but 'as' syntax is preferred`}
        </CodeBlock>

        <InfoBox type="warning">
          <strong>Avoid angle bracket syntax!</strong> It doesn't work in .tsx
          files and is less readable. Always use the 'as' syntax instead. The
          angle bracket syntax exists only for backwards compatibility.
        </InfoBox>
      </Section>

      <Section title="3. Const Assertions">
        <p className="text-gray-700 dark:text-gray-300">
          Const assertions (using{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            as const
          </code>
          ) tell TypeScript to infer the most specific type possible, treating
          all properties as readonly and all values as literal types.
        </p>

        <CodeBlock title="Const assertion examples">
          {`// Without const assertion (widened types)
let name = "John";           // Type: string
let age = 30;                // Type: number
let colors = ["red", "blue"]; // Type: string[]

// With const assertion (literal types)
let nameConst = "John" as const;        // Type: "John"
let ageConst = 30 as const;             // Type: 30
let colorsConst = ["red", "blue"] as const; // Type: readonly ["red", "blue"]

// Object with const assertion
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
} as const;

// Type: {
//   readonly apiUrl: "https://api.example.com";
//   readonly timeout: 5000;
//   readonly retries: 3;
// }

// config.timeout = 10000; // Error: Cannot assign to 'timeout' because it is a read-only property

// Array with const assertion
const directions = ["north", "south", "east", "west"] as const;
// Type: readonly ["north", "south", "east", "west"]

type Direction = typeof directions[number];
// Type: "north" | "south" | "east" | "west"

// Const assertion in function returns
function getConfig() {
  return {
    env: "production",
    debug: false
  } as const;
}

const appConfig = getConfig();
// Type: { readonly env: "production"; readonly debug: false }

// Const assertion with nested objects
const theme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    success: "#28a745"
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24
  }
} as const;

// All properties are deeply readonly and literal types

// Const assertion for tuple types
const point = [10, 20] as const;
// Type: readonly [10, 20] (not number[])

function drawPoint(point: readonly [number, number]) {
  const [x, y] = point;
  console.log(\`Drawing at (\${x}, \${y})\`);
}

drawPoint(point); // OK

// Const assertion for enum-like patterns
const Status = {
  Pending: "pending",
  Approved: "approved",
  Rejected: "rejected"
} as const;

type StatusType = typeof Status[keyof typeof Status];
// Type: "pending" | "approved" | "rejected"

function updateStatus(status: StatusType) {
  console.log(\`Status: \${status}\`);
}

updateStatus(Status.Pending); // OK
// updateStatus("unknown"); // Error

// Const assertion with arrays of objects
const users = [
  { id: 1, name: "John", role: "admin" },
  { id: 2, name: "Jane", role: "user" }
] as const;

// Type: readonly [
//   { readonly id: 1; readonly name: "John"; readonly role: "admin"; },
//   { readonly id: 2; readonly name: "Jane"; readonly role: "user"; }
// ]

// Extracting types from const assertions
const Routes = {
  Home: "/",
  About: "/about",
  Contact: "/contact",
  Blog: "/blog"
} as const;

type RouteKey = keyof typeof Routes;
// Type: "Home" | "About" | "Contact" | "Blog"

type RoutePath = typeof Routes[RouteKey];
// Type: "/" | "/about" | "/contact" | "/blog"

// Const assertion with template literals
const eventName = \`user_\${"login" as const}\` as const;
// Type: "user_login"

// Const assertion for action creators (Redux pattern)
const createAction = <T extends string>(type: T) => {
  return (payload?: any) => ({
    type,
    payload
  } as const);
};

const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");

// Const assertion in React
const buttonVariants = {
  primary: {
    bg: "blue",
    color: "white"
  },
  secondary: {
    bg: "gray",
    color: "black"
  }
} as const;

type ButtonVariant = keyof typeof buttonVariants;

// Const assertion with discriminated unions
const actions = [
  { type: "ADD", payload: 1 },
  { type: "SUBTRACT", payload: 2 },
  { type: "RESET" }
] as const;

// Const assertion for API endpoints
const API = {
  users: {
    list: "/api/users",
    detail: "/api/users/:id",
    create: "/api/users"
  },
  posts: {
    list: "/api/posts",
    detail: "/api/posts/:id"
  }
} as const;

type ApiEndpoint = typeof API[keyof typeof API][keyof typeof API[keyof typeof API]];

// Const assertion with satisfies (TypeScript 4.9+)
const colors2 = {
  red: "#ff0000",
  green: "#00ff00",
  blue: "#0000ff"
} as const satisfies Record<string, string>;

// Prevents typos while keeping literal types
// colors2.red is type "#ff0000", not string

// Const assertion in class properties
class Configuration {
  readonly modes = ["development", "production", "test"] as const;
  readonly ports = [3000, 8080, 9000] as const;
  
  getMode(index: number) {
    return this.modes[index]; // Type: "development" | "production" | "test" | undefined
  }
}

// Const assertion with symbol
const sym = Symbol("mySymbol") as const;

// Const assertion for readonly tuples
const rgb = [255, 128, 0] as const;
// Type: readonly [255, 128, 0]

function setColor(color: readonly [number, number, number]) {
  console.log(\`RGB(\${color[0]}, \${color[1]}, \${color[2]})\`);
}

setColor(rgb); // OK

// Const assertion vs const variable
const value1 = { x: 10 };           // x is mutable (type: number)
const value2 = { x: 10 } as const;  // x is readonly (type: 10)

value1.x = 20; // OK
// value2.x = 20; // Error

// Nested const assertion
const data = {
  user: {
    name: "John",
    settings: {
      theme: "dark",
      notifications: true
    }
  },
  metadata: {
    version: "1.0.0",
    build: 123
  }
} as const;

// All nested properties are readonly and literal types`}
        </CodeBlock>

        <InfoBox type="important">
          Const assertions are incredibly powerful for creating type-safe
          constants, enum-like objects, and configuration. They ensure values
          can't be changed and provide precise literal types instead of widened
          types.
        </InfoBox>
      </Section>

      <Section title="4. Double Assertions (as unknown as Type)">
        <p className="text-gray-700 dark:text-gray-300">
          Sometimes TypeScript won't allow a direct assertion between
          incompatible types. You can use a double assertion via unknown, but
          this is dangerous and should be avoided.
        </p>

        <CodeBlock title="Double assertion examples">
          {`// Direct assertion doesn't work for incompatible types
interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

const cat: Cat = { meow: () => console.log("Meow") };

// const dog = cat as Dog; // Error: Conversion may be a mistake

// Double assertion bypasses the check (dangerous!)
const dog = cat as unknown as Dog;
// No error, but dog.bark() will fail at runtime!

// When you might need double assertion (still risky)
const numberAsString = 123 as unknown as string;
// TypeScript won't stop you, but this will cause runtime errors!

// More realistic (but still questionable) use case
interface LegacyData {
  old_field: string;
}

interface NewData {
  newField: string;
}

const legacy: LegacyData = { old_field: "value" };
// If you're ABSOLUTELY sure about the transformation
const modern = legacy as unknown as NewData;

// Better approach: Create a new object
const betterModern: NewData = {
  newField: legacy.old_field
};

// Double assertion with DOM (rarely needed)
const element = document.getElementById("special") as unknown as CustomElement;

// Double assertion in testing/mocking
interface RealType {
  complexMethod(): Promise<void>;
  anotherMethod(x: number): string;
}

// In tests, you might mock incompletely
const mock = {
  complexMethod: jest.fn()
} as unknown as RealType;

// Better: Use Partial
const betterMock = {
  complexMethod: jest.fn()
} as Partial<RealType>;

// When migrating from JavaScript
declare const legacyLib: any;

interface ExpectedType {
  method(): void;
}

const typed = legacyLib as unknown as ExpectedType;

// Double assertion for extreme type transformation
type A = { a: string };
type B = { b: number };

const a: A = { a: "test" };
const b = a as unknown as B; // Completely different shape

// Why double assertions are dangerous
interface User {
  id: number;
  name: string;
}

const data: unknown = "not a user at all";
const user = data as unknown as User;
// No error, but user.id and user.name are actually undefined!

// Rule of thumb: If you need double assertion, you're probably doing something wrong
// Alternatives:
// 1. Fix your types
// 2. Use type guards
// 3. Use unknown and narrow properly
// 4. Restructure your data
// 5. Use Partial/Pick/Omit utilities

// Exception: Type predicates can avoid double assertions
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

function processUnknown(value: unknown) {
  if (isUser(value)) {
    // Type narrowed safely - no assertion needed!
    console.log(value.id, value.name);
  }
}`}
        </CodeBlock>

        <InfoBox type="warning">
          <strong>Avoid double assertions!</strong> They completely bypass type
          safety. If you find yourself needing 'as unknown as Type', it's
          usually a sign that:
          <ul className="list-disc ml-5 mt-2">
            <li>Your types are wrong</li>
            <li>You should use type guards instead</li>
            <li>You need to restructure your data</li>
            <li>You're working around a real problem that should be fixed</li>
          </ul>
        </InfoBox>
      </Section>

      <Section title="Type Assertion Best Practices">
        <CodeBlock title="When and how to use assertions safely">
          {`// ✅ GOOD: Asserting DOM elements
const input = document.getElementById("username") as HTMLInputElement;

// ✅ GOOD: Asserting with type guards (safer)
function processValue(value: unknown) {
  if (typeof value === "string") {
    return value.toUpperCase(); // No assertion needed!
  }
  return String(value);
}

// ✅ GOOD: Const assertions for literal types
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const;

// ✅ GOOD: Asserting JSON with validation
interface User {
  id: number;
  name: string;
}

function parseUser(json: string): User {
  const data = JSON.parse(json);
  
  // Validate before asserting
  if (typeof data.id === "number" && typeof data.name === "string") {
    return data as User;
  }
  
  throw new Error("Invalid user data");
}

// ✅ GOOD: Narrow first, assert second
function handleUnknown(value: unknown) {
  if (typeof value === "object" && value !== null && "id" in value) {
    const obj = value as { id: number };
    return obj.id;
  }
}

// ❌ BAD: Blind assertion without checking
function badParse(json: string): User {
  return JSON.parse(json) as User; // Dangerous!
}

// ❌ BAD: Asserting incompatible types
const num = "123" as number; // Error: types not compatible

// ❌ BAD: Double assertion to force it
const num2 = "123" as unknown as number; // No error, but WRONG!

// ✅ GOOD: Create type guard instead
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    typeof (value as User).id === "number" &&
    typeof (value as User).name === "string"
  );
}

// ✅ GOOD: Use with validation libraries
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email()
});

function safeParseUser(data: unknown): User {
  return UserSchema.parse(data); // Validates and types
}

// ✅ GOOD: Assertion in catch blocks
try {
  throw new Error("Error message");
} catch (error) {
  const err = error as Error;
  console.log(err.message);
}

// ✅ GOOD: Progressive enhancement of types
function getData(raw: unknown) {
  // Step 1: Check basic structure
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Invalid data");
  }
  
  // Step 2: Assert to basic object
  const obj = raw as Record<string, unknown>;
  
  // Step 3: Validate specific fields
  if (typeof obj.id !== "number") {
    throw new Error("Missing id");
  }
  
  // Step 4: Safe to assert to final type
  return obj as { id: number; [key: string]: unknown };
}

// Summary: Type Assertion Safety Checklist
// 1. Can you use a type guard instead? (Prefer this)
// 2. Can you validate the data first? (Much safer)
// 3. Are you asserting DOM elements? (Usually safe)
// 4. Are you using const assertions? (Always safe)
// 5. Is it a narrow cast (wider to narrower type)? (OK if you're sure)
// 6. Are you using unknown as an intermediate? (Red flag!)
// 7. Could you restructure to avoid the assertion? (Best option)`}
        </CodeBlock>

        <InfoBox type="important">
          <strong>Type Assertion Guidelines:</strong>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              <strong>Prefer type guards:</strong> They're safer and provide
              runtime validation
            </li>
            <li>
              <strong>Validate before asserting:</strong> Especially for
              external data
            </li>
            <li>
              <strong>Use const assertions:</strong> For literal types and
              readonly properties
            </li>
            <li>
              <strong>Avoid 'as any':</strong> It defeats the purpose of
              TypeScript
            </li>
            <li>
              <strong>Never use double assertions:</strong> Unless you
              absolutely must (you probably don't)
            </li>
            <li>
              <strong>Document your assertions:</strong> Explain why you're
              overriding TypeScript
            </li>
            <li>
              <strong>Use 'as' syntax:</strong> Not angle brackets (TSX
              compatibility)
            </li>
          </ul>
        </InfoBox>
      </Section>
    </div>
  );
}
