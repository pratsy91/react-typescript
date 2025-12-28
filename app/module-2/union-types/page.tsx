import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function UnionTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Union Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Union types allow a value to be one of several types, providing
        flexibility while maintaining type safety. They're fundamental to
        TypeScript's type system and enable powerful patterns like discriminated
        unions.
      </p>

      <Section title="1. Basic Union Types">
        <p className="text-gray-700 dark:text-gray-300">
          Union types are created using the pipe (|) operator, allowing a value
          to be one of multiple types.
        </p>

        <CodeBlock title="Basic union type examples">
          {`// Basic union type
let value: string | number;

value = "hello";  // OK
value = 42;       // OK
// value = true;  // Error: boolean not in union

// Function parameter with union type
function printId(id: string | number) {
  console.log(\`ID: \${id}\`);
}

printId(101);      // OK
printId("abc123"); // OK
// printId(true);  // Error

// Multiple types in union
let mixed: string | number | boolean;

mixed = "text";   // OK
mixed = 123;      // OK
mixed = true;     // OK

// Union with null/undefined
let nullable: string | null;
let optional: number | undefined;
let both: string | null | undefined;

nullable = "hello";  // OK
nullable = null;     // OK
// nullable = undefined; // Error (not in union)

optional = 42;         // OK
optional = undefined;  // OK
// optional = null;    // Error (not in union)

both = "value";     // OK
both = null;        // OK
both = undefined;   // OK

// Array of union types
let mixedArray: (string | number)[] = [1, "two", 3, "four"];

// Union of array types (different!)
let arrayUnion: string[] | number[] = ["a", "b"];
arrayUnion = [1, 2, 3];
// arrayUnion = [1, "two"]; // Error: must be all one type

// Union in type alias
type ID = string | number;

let userId: ID = "user_123";
let productId: ID = 456;

// Union with literal types
type Status = "pending" | "active" | "inactive";

let status: Status = "active";  // OK
// let status2: Status = "paused"; // Error: not in union

// Union with object types
type Success = { success: true; data: string };
type Failure = { success: false; error: string };
type Result = Success | Failure;

let result: Result = { success: true, data: "Done" };
// let invalid: Result = { success: true, error: "..." }; // Error: wrong shape

// Union with function types
type StringFn = () => string;
type NumberFn = () => number;
type Callback = StringFn | NumberFn;

let callback: Callback = () => "hello";
callback = () => 42;

// Nested unions
type A = string | number;
type B = boolean | null;
type C = A | B; // string | number | boolean | null

// Union flattens automatically
type Flat = string | number | string; // Just string | number`}
        </CodeBlock>

        <InfoBox type="info">
          Union types use the | operator to combine multiple types. A value of a
          union type can be any one of the constituent types, but TypeScript
          enforces that you handle all possibilities safely.
        </InfoBox>
      </Section>

      <Section title="2. Working with Union Types">
        <p className="text-gray-700 dark:text-gray-300">
          When working with union types, you can only access members that are
          common to all types in the union, unless you narrow the type first.
        </p>

        <CodeBlock title="Working with unions">
          {`// Can only access common properties
function printValue(value: string | number) {
  console.log(value.toString()); // OK: both have toString()
  // console.log(value.toUpperCase()); // Error: number doesn't have toUpperCase
  // console.log(value.toFixed(2));    // Error: string doesn't have toFixed
}

// Type narrowing with typeof
function format(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // OK: narrowed to string
  } else {
    return value.toFixed(2);    // OK: narrowed to number
  }
}

// Type narrowing with Array.isArray
function getLength(value: string | any[]): number {
  if (Array.isArray(value)) {
    return value.length; // OK: narrowed to array
  } else {
    return value.length; // OK: narrowed to string
  }
}

// Type narrowing with instanceof
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // OK: Dog
  } else {
    animal.meow(); // OK: Cat
  }
}

// Type narrowing with 'in' operator
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // OK: Fish
  } else {
    animal.fly();  // OK: Bird
  }
}

// Union with undefined (optional)
function greet(name?: string) {
  // name is string | undefined
  if (name !== undefined) {
    console.log(\`Hello, \${name}\`);
  } else {
    console.log("Hello, stranger");
  }
}

// Optional chaining with unions
interface User {
  name: string;
  address?: {
    street: string;
    city: string;
  };
}

function printCity(user: User | null) {
  console.log(user?.address?.city); // Safe even if user is null
}

// Nullish coalescing with unions
function getDisplayName(name: string | null | undefined): string {
  return name ?? "Anonymous";
}

// Union with never
type NonNullable<T> = T extends null | undefined ? never : T;

type StringOrNull = NonNullable<string | null>; // string

// Type guards return boolean
function isString(value: any): value is string {
  return typeof value === "string";
}

function process(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // OK: string
  } else {
    console.log(value.toFixed(2));    // OK: number
  }
}

// Array methods with unions
const mixed: (string | number)[] = [1, "two", 3, "four"];

// Filter with type guard
const strings = mixed.filter((item): item is string => {
  return typeof item === "string";
}); // Type: string[]

const numbers = mixed.filter((item): item is number => {
  return typeof item === "number";
}); // Type: number[]

// Map preserves union
const upperOrDoubled = mixed.map(item => {
  if (typeof item === "string") {
    return item.toUpperCase();
  }
  return item * 2;
}); // Type: (string | number)[]`}
        </CodeBlock>

        <InfoBox type="tip">
          Use type guards (typeof, instanceof, in) to narrow union types before
          accessing type-specific properties. TypeScript's control flow analysis
          automatically narrows types based on these checks.
        </InfoBox>
      </Section>

      <Section title="3. Discriminated Unions">
        <p className="text-gray-700 dark:text-gray-300">
          Discriminated unions (also called tagged unions) use a common property
          (the discriminant) to distinguish between union members, enabling
          exhaustive type checking.
        </p>

        <CodeBlock title="Discriminated union examples">
          {`// Basic discriminated union
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Circle | Square | Rectangle;

// TypeScript narrows based on discriminant
function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;  // shape is Circle
    case "square":
      return shape.size ** 2;              // shape is Square
    case "rectangle":
      return shape.width * shape.height;   // shape is Rectangle
  }
}

// Exhaustiveness checking with never
function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

function getAreaExhaustive(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      return assertNever(shape); // Error if we missed a case
  }
}

// API response pattern
type LoadingState = {
  status: "loading";
};

type SuccessState = {
  status: "success";
  data: string;
};

type ErrorState = {
  status: "error";
  error: string;
};

type RequestState = LoadingState | SuccessState | ErrorState;

function handleResponse(state: RequestState) {
  switch (state.status) {
    case "loading":
      console.log("Loading...");
      break;
    case "success":
      console.log("Data:", state.data);  // OK: has data
      break;
    case "error":
      console.log("Error:", state.error); // OK: has error
      break;
  }
}

// Union of actions (Redux-style)
type IncrementAction = {
  type: "INCREMENT";
  payload: number;
};

type DecrementAction = {
  type: "DECREMENT";
  payload: number;
};

type ResetAction = {
  type: "RESET";
};

type Action = IncrementAction | DecrementAction | ResetAction;

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload;  // payload available
    case "DECREMENT":
      return state - action.payload;  // payload available
    case "RESET":
      return 0;                       // no payload needed
  }
}

// Nested discriminated unions
type TextNode = {
  type: "text";
  content: string;
};

type ElementNode = {
  type: "element";
  tag: string;
  children: Node[];
};

type Node = TextNode | ElementNode;

function renderNode(node: Node): string {
  if (node.type === "text") {
    return node.content;
  } else {
    const children = node.children.map(renderNode).join("");
    return \`<\${node.tag}>\${children}</\${node.tag}>\`;
  }
}

// Multiple discriminants
type NetworkSuccess = {
  status: "success";
  method: "GET" | "POST";
  data: any;
};

type NetworkError = {
  status: "error";
  method: "GET" | "POST";
  error: string;
};

type NetworkState = NetworkSuccess | NetworkError;

function handleNetwork(state: NetworkState) {
  if (state.status === "success") {
    console.log(\`\${state.method} succeeded:, state.data\`);
  } else {
    console.log(\`\${state.method} failed:, state.error\`);
  }
}

// Boolean discriminant
type Authenticated = {
  isAuthenticated: true;
  user: { id: number; name: string };
  token: string;
};

type NotAuthenticated = {
  isAuthenticated: false;
};

type AuthState = Authenticated | NotAuthenticated;

function getUser(auth: AuthState) {
  if (auth.isAuthenticated) {
    return auth.user;  // OK: user exists
  }
  return null;
}

// Literal type discriminant
type Payment = 
  | { method: "cash"; amount: number }
  | { method: "card"; cardNumber: string; amount: number }
  | { method: "paypal"; email: string; amount: number };

function processPayment(payment: Payment) {
  switch (payment.method) {
    case "cash":
      console.log(\`Cash payment: $\${payment.amount}\`);
      break;
    case "card":
      console.log(\`Card \${payment.cardNumber}: $\${payment.amount}\`);
      break;
    case "paypal":
      console.log(\`PayPal \${payment.email}: $\${payment.amount}\`);
      break;
  }
}`}
        </CodeBlock>

        <InfoBox type="important">
          Discriminated unions are one of TypeScript's most powerful features.
          Use a common literal property (discriminant) to distinguish between
          union members, enabling exhaustive checking and type-safe narrowing.
        </InfoBox>
      </Section>

      <Section title="4. Union Narrowing Techniques">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript provides multiple ways to narrow union types, from simple
          type guards to advanced control flow analysis.
        </p>

        <CodeBlock title="Union narrowing techniques">
          {`// 1. typeof narrowing
function process(value: string | number | boolean) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else {
    return value ? "yes" : "no";
  }
}

// 2. Truthiness narrowing
function printName(name: string | null | undefined) {
  if (name) {
    console.log(name.toUpperCase()); // OK: truthy values are strings
  }
}

// Be careful with falsy values!
function printValue(value: string | number) {
  if (value) {
    // This excludes 0, "", etc.
    console.log(value);
  }
}

// 3. Equality narrowing
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // x and y are both string (only common type)
    console.log(x.toUpperCase());
    console.log(y.toUpperCase());
  }
}

// 4. in operator narrowing
type Dog = { bark: () => void };
type Cat = { meow: () => void };

function makeSound(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// 5. instanceof narrowing
function getLength(value: string | String | any[]) {
  if (value instanceof String) {
    return value.length; // String object
  } else if (value instanceof Array) {
    return value.length; // Array
  } else {
    return value.length; // string primitive
  }
}

// 6. Custom type guard functions
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function handle(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else if (isNumber(value)) {
    console.log(value.toFixed(2));
  }
}

// 7. Discriminated union narrowing
type Result<T> =
  | { success: true; value: T }
  | { success: false; error: string };

function unwrap<T>(result: Result<T>): T {
  if (result.success) {
    return result.value;
  }
  throw new Error(result.error);
}

// 8. Array narrowing
function processValue(value: string | string[]) {
  if (Array.isArray(value)) {
    value.forEach(s => console.log(s)); // string[]
  } else {
    console.log(value.toUpperCase());   // string
  }
}

// 9. Null/undefined narrowing
function getLength2(str: string | null | undefined): number {
  // Narrow out null and undefined
  if (str == null) {
    return 0;
  }
  return str.length; // str is string
}

// 10. Non-null assertion (use carefully!)
function getLength3(str: string | null): number {
  return str!.length; // Asserts str is not null
}

// 11. Type predicate in filter
const mixed: (string | number | null)[] = ["a", 1, null, "b", 2];

const strings = mixed.filter((x): x is string => typeof x === "string");
// Type: string[]

// 12. Control flow analysis
function example(value: string | number) {
  if (typeof value === "string") {
    value; // string
    return;
  }
  value; // number (string was returned)
}

// 13. Exhaustive check with switch
type Status = "idle" | "loading" | "success" | "error";

function handle2(status: Status) {
  switch (status) {
    case "idle":
      return "Not started";
    case "loading":
      return "In progress";
    case "success":
      return "Complete";
    case "error":
      return "Failed";
    default:
      const _exhaustive: never = status;
      return _exhaustive;
  }
}

// 14. Union with literal narrowing
function move(direction: "up" | "down" | "left" | "right") {
  switch (direction) {
    case "up":
      return { x: 0, y: -1 };
    case "down":
      return { x: 0, y: 1 };
    case "left":
      return { x: -1, y: 0 };
    case "right":
      return { x: 1, y: 0 };
  }
}

// 15. Intersection for narrowing
type HasId = { id: number };
type HasName = { name: string };

function process2(value: HasId | HasName) {
  if ("id" in value && "name" in value) {
    // value is HasId & HasName
    console.log(value.id, value.name);
  }
}

// 16. Optional property narrowing
interface User {
  name: string;
  email?: string;
}

function printEmail(user: User) {
  if (user.email !== undefined) {
    console.log(user.email.toUpperCase()); // OK: string
  }
}

// 17. Template literal narrowing
type Method = \`\${"GET" | "POST"} /api\`;

function handle3(method: Method) {
  if (method.startsWith("GET")) {
    // method is "GET /api"
  }
}`}
        </CodeBlock>

        <InfoBox type="tip">
          TypeScript's control flow analysis is powerful. Use typeof,
          instanceof, in, and equality checks to narrow unions. Custom type
          guard functions provide reusable narrowing logic with the{" "}
          <code>is</code> predicate.
        </InfoBox>
      </Section>

      <Section title="5. Advanced Union Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns and best practices for working with union types in
          real-world applications.
        </p>

        <CodeBlock title="Advanced union patterns">
          {`// 1. Optional vs union with undefined
type OptionalProp = { value?: string };        // { value: string | undefined }
type UnionProp = { value: string | undefined }; // Same but explicit

// Difference: optional can be omitted
const obj1: OptionalProp = {};                  // OK
const obj2: UnionProp = { value: undefined };   // Must include property

// 2. Union distribution
type Wrapped<T> = T extends any ? { value: T } : never;
type Result = Wrapped<string | number>;
// Expands to: { value: string } | { value: number }

// 3. Extract specific types from union
type ExtractStrings<T> = T extends string ? T : never;
type OnlyStrings = ExtractStrings<string | number | boolean>; // string

// 4. Exclude types from union
type WithoutNull<T> = Exclude<T, null>;
type NonNull = WithoutNull<string | number | null>; // string | number

// 5. Union of function returns
type Functions = (() => string) | (() => number);
type Returns = ReturnType<Functions>; // string | number

// 6. Conditional types with unions
type UnwrapArray<T> = T extends Array<infer U> ? U : T;
type Unwrapped = UnwrapArray<string[] | number>; // string | number

// 7. Branded types (nominal typing)
type Brand<T, B> = T & { __brand: B };
type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

type Money = USD | EUR;

function formatMoney(amount: Money) {
  // Can't mix USD and EUR
}

// 8. Union helpers
type OneOf<T, K extends keyof T> = T[K];
type StringOrNumber = OneOf<{ a: string; b: number }, "a" | "b">;

// 9. Recursive unions
type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

const json: Json = {
  name: "John",
  age: 30,
  tags: ["developer", "typescript"],
  metadata: {
    created: "2024-01-01",
    nested: {
      deep: true
    }
  }
};

// 10. Union with generics
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = getFirst([1, 2, 3]);      // number | undefined
const str = getFirst(["a", "b"]);     // string | undefined

// 11. Variadic unions
type UnionOfTuple<T extends any[]> = T[number];
type Union = UnionOfTuple<[string, number, boolean]>; // string | number | boolean

// 12. Merged object unions
type Merge<T, U> = Omit<T, keyof U> & U;

type Base = { id: number; name: string };
type Update = { name: string; email: string };
type Merged = Merge<Base, Update>;
// { id: number; name: string; email: string }

// 13. Union to intersection
type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

type Union2 = { a: string } | { b: number };
type Intersection = UnionToIntersection<Union2>;
// { a: string } & { b: number }

// 14. Result type pattern
type Result2<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result2<number, string> {
  if (b === 0) {
    return { ok: false, error: "Division by zero" };
  }
  return { ok: true, value: a / b };
}

const result = divide(10, 2);
if (result.ok) {
  console.log(result.value * 2);
} else {
  console.error(result.error);
}

// 15. State machine with unions
type State =
  | { phase: "idle" }
  | { phase: "fetching"; requestId: string }
  | { phase: "success"; data: string }
  | { phase: "error"; error: string; retryCount: number };

function transition(state: State, action: string): State {
  switch (state.phase) {
    case "idle":
      if (action === "fetch") {
        return { phase: "fetching", requestId: Math.random().toString() };
      }
      return state;
    case "fetching":
      if (action === "success") {
        return { phase: "success", data: "Data loaded" };
      }
      if (action === "error") {
        return { phase: "error", error: "Failed", retryCount: 1 };
      }
      return state;
    default:
      return state;
  }
}

// 16. Builder pattern with unions
type Incomplete = {
  kind: "incomplete";
  partial: Partial<User>;
};

type Complete = {
  kind: "complete";
  user: User;
};

type UserBuilder = Incomplete | Complete;

// 17. Event system with unions
type MouseEvent = { type: "mouse"; x: number; y: number };
type KeyEvent = { type: "key"; key: string; ctrl: boolean };
type Event = MouseEvent | KeyEvent;

function handleEvent(event: Event) {
  switch (event.type) {
    case "mouse":
      console.log(\`Click at \${event.x}, \${event.y}\`);
      break;
    case "key":
      console.log(\`Key \${event.key}, Ctrl: \${event.ctrl}\`);
      break;
  }
}`}
        </CodeBlock>

        <InfoBox type="important">
          Union types are versatile and powerful. Use discriminated unions for
          state machines and API responses, leverage TypeScript's built-in union
          utilities, and consider branded types for domain-specific type safety.
        </InfoBox>
      </Section>
    </div>
  );
}
