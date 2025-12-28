import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeInferencePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Type Inference
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Type inference is TypeScript's ability to automatically determine types
        without explicit annotations. The TypeScript compiler analyzes your code
        and infers types based on how values are used, making code cleaner while
        maintaining type safety.
      </p>

      <Section title="1. Basic Type Inference (Implicit Typing)">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript infers types from initial values. This is the most common
          form of inference.
        </p>

        <CodeBlock title="Basic type inference examples">
          {`// Primitive type inference
let name = "John";        // Type: string
let age = 30;             // Type: number
let isActive = true;      // Type: boolean
let nothing = null;       // Type: null
let notDefined = undefined; // Type: undefined

// Array type inference
let numbers = [1, 2, 3];           // Type: number[]
let strings = ["a", "b", "c"];     // Type: string[]
let mixed = [1, "two", true];      // Type: (string | number | boolean)[]
let empty = [];                    // Type: any[]

// Object type inference
let user = {
  name: "Jane",
  age: 25,
  isAdmin: false
};
// Type: { name: string; age: number; isAdmin: boolean }

// Nested object inference
let config = {
  server: {
    host: "localhost",
    port: 3000
  },
  database: {
    name: "mydb",
    timeout: 5000
  }
};
// Type is inferred for entire nested structure

// Function return type inference
function add(a: number, b: number) {
  return a + b;  // Return type inferred as number
}

function greet(name: string) {
  return \`Hello, \${name}\`; // Return type inferred as string
}

function isEven(n: number) {
  return n % 2 === 0; // Return type inferred as boolean
}

// Arrow function inference
const multiply = (a: number, b: number) => a * b; // Returns number

const getName = (user: { name: string }) => user.name; // Returns string

// Conditional return type inference
function findUser(id: number) {
  if (id === 1) {
    return { name: "John", email: "john@example.com" };
  }
  return null;
}
// Type: { name: string; email: string } | null

// Best common type inference
let values = [1, 2, 3, null]; // Type: (number | null)[]

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" }
]; // Type: { id: number; name: string }[]

// Type widening
let x = 3;              // Type: number (not literal 3)
let y = "hello";        // Type: string (not literal "hello")
let z = true;           // Type: boolean (not literal true)

// Const doesn't widen for primitives
const a = 3;            // Type: 3 (literal)
const b = "hello";      // Type: "hello" (literal)
const c = true;         // Type: true (literal)

// But objects still widen with const
const obj = {
  name: "John"          // name is type string, not "John"
};

// Union type inference
let value = Math.random() > 0.5 ? "string" : 42;
// Type: string | number

function process(input: string | number) {
  let result = input; // Type: string | number
  return result;
}

// Generic type inference
function identity<T>(value: T) {
  return value;
}

let num = identity(42);        // T inferred as number
let str = identity("hello");   // T inferred as string
let arr = identity([1, 2, 3]); // T inferred as number[]

// Type inference with destructuring
let { name: userName, age: userAge } = {
  name: "Bob",
  age: 30
};
// userName: string, userAge: number

let [first, second, third] = [1, 2, 3];
// first: number, second: number, third: number

// Type inference in loops
for (let i = 0; i < 10; i++) {
  // i is inferred as number
}

for (let item of [1, 2, 3]) {
  // item is inferred as number
}

for (let char of "hello") {
  // char is inferred as string
}

// Class property inference (requires initialization)
class Person {
  name = "Unknown";     // Type: string
  age = 0;              // Type: number
  // email;             // Error: needs type annotation or initializer
  email: string;        // Needs annotation if not initialized
  
  constructor() {
    this.email = ""; 
  }
}

// Method return type inference
class Calculator {
  add(a: number, b: number) {
    return a + b;  // Inferred as number
  }
  
  getResult() {
    return this.add(1, 2); // Inferred as number
  }
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Let TypeScript infer types whenever the inference is clear and
          correct. This keeps your code clean while maintaining type safety.
          Only add explicit annotations when necessary or to improve clarity.
        </InfoBox>
      </Section>

      <Section title="2. Contextual Typing">
        <p className="text-gray-700 dark:text-gray-300">
          Contextual typing occurs when TypeScript infers types based on the
          location of an expression. This is especially useful for callbacks and
          event handlers.
        </p>

        <CodeBlock title="Contextual typing examples">
          {`// Array method callbacks - types inferred from context
const numbers = [1, 2, 3, 4, 5];

numbers.forEach(num => {
  // num is inferred as number from array type
  console.log(num * 2);
});

numbers.map(n => n * 2);     // n is number, return is number[]
numbers.filter(n => n > 2);  // n is number, return is number[]
numbers.reduce((acc, n) => acc + n, 0); // acc and n are numbers

// Object method callbacks
const users = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 }
];

users.forEach(user => {
  // user is inferred as { name: string; age: number }
  console.log(user.name);
});

// Function type provides context
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (x, y) => {
  // x and y inferred as number from MathOperation
  return x + y;
};

const multiply: MathOperation = (a, b) => a * b;
// a and b inferred as number, return type inferred as number

// Event handlers - types from event
window.addEventListener("click", event => {
  // event inferred as MouseEvent
  console.log(event.clientX, event.clientY);
});

window.addEventListener("keydown", evt => {
  // evt inferred as KeyboardEvent
  console.log(evt.key);
});

// React event handlers (example)
interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const button: ButtonProps = {
  onClick: (e) => {
    // e inferred as React.MouseEvent<HTMLButtonElement>
    e.currentTarget.disabled = true;
  }
};

// Promise callbacks
Promise.resolve(42).then(value => {
  // value inferred as number
  return value * 2;
}).then(doubled => {
  // doubled inferred as number
  console.log(doubled);
});

// Async/await contextual typing
async function fetchData(): Promise<string> {
  return "data";
}

fetchData().then(data => {
  // data inferred as string from Promise<string>
  console.log(data.toUpperCase());
});

// Generic function context
function map<T, U>(array: T[], fn: (item: T) => U): U[] {
  return array.map(fn);
}

const doubled = map([1, 2, 3], n => {
  // n inferred as number
  return n * 2; // return type inferred as number
});
// doubled is number[]

const strings = map([1, 2, 3], n => {
  // n inferred as number
  return n.toString(); // return type inferred as string
});
// strings is string[]

// Type inference in object literals assigned to typed variables
interface User {
  name: string;
  age: number;
  greet(): void;
}

const user: User = {
  name: "John",
  age: 30,
  greet() {
    // 'this' is inferred as User
    console.log(\`Hello, I'm \${this.name}\`);
  }
};

// Callback with type parameters
function processArray<T>(
  items: T[],
  callback: (item: T, index: number) => void
): void {
  items.forEach(callback);
}

processArray([1, 2, 3], (num, idx) => {
  // num inferred as number, idx inferred as number
  console.log(\`[\${idx}] = \${num}\`);
});

processArray(["a", "b"], (str, i) => {
  // str inferred as string, i inferred as number
  console.log(str.toUpperCase());
});

// React component props context (example)
interface ComponentProps {
  onSubmit: (data: { name: string; email: string }) => void;
  onChange: (field: string, value: string) => void;
}

const component: ComponentProps = {
  onSubmit: (data) => {
    // data type inferred from interface
    console.log(data.name, data.email);
  },
  onChange: (field, value) => {
    // field and value types inferred
    console.log(\`\${field}: \${value}\`);
  }
};

// Discriminated union context
type Result = 
  | { success: true; data: string }
  | { success: false; error: string };

function handleResult(callback: (result: Result) => void): void {
  callback({ success: true, data: "test" });
}

handleResult(result => {
  // result type inferred as Result
  if (result.success) {
    console.log(result.data);
  } else {
    console.log(result.error);
  }
});

// Constructor context
class Point {
  constructor(public x: number, public y: number) {}
}

const points = [1, 2, 3].map(n => new Point(n, n * 2));
// n inferred as number

// Type guards provide context
function processValue(value: string | number) {
  if (typeof value === "string") {
    // value inferred as string here
    return value.toUpperCase();
  } else {
    // value inferred as number here
    return value.toFixed(2);
  }
}

// Switch statement context
type Action = 
  | { type: "ADD"; payload: number }
  | { type: "SUBTRACT"; payload: number }
  | { type: "RESET" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "ADD":
      // action inferred as { type: "ADD"; payload: number }
      return state + action.payload;
    case "SUBTRACT":
      // action inferred as { type: "SUBTRACT"; payload: number }
      return state - action.payload;
    case "RESET":
      // action inferred as { type: "RESET" }
      return 0;
  }
}

// JSX context (React)
interface LinkProps {
  href: string;
  onClick?: (event: React.MouseEvent) => void;
}

function Link(props: LinkProps) {
  // props.onClick is inferred as optional function
  return null;
}

// Contextual typing with generics
interface Box<T> {
  value: T;
  map<U>(fn: (value: T) => U): Box<U>;
}

declare const numberBox: Box<number>;

const stringBox = numberBox.map(n => {
  // n inferred as number
  return n.toString();
});
// stringBox is Box<string>

// Tuple context
const pair: [string, number] = ["age", 30];

pair.forEach(item => {
  // item inferred as string | number
  console.log(item);
});

// Record context
const roles: Record<string, string[]> = {
  admin: ["read", "write", "delete"],
  user: ["read"]
};

Object.entries(roles).forEach(([role, permissions]) => {
  // role inferred as string
  // permissions inferred as string[]
  console.log(\`\${role}: \${permissions.join(", ")}\`);
});`}
        </CodeBlock>

        <InfoBox type="info">
          Contextual typing is powerful for callback functions and event
          handlers. TypeScript uses the expected type (from the function
          signature or variable type) to infer parameter types, reducing the
          need for explicit annotations.
        </InfoBox>
      </Section>

      <Section title="3. Type Inference Best Practices">
        <CodeBlock title="When to rely on inference vs explicit annotations">
          {`// ✅ GOOD: Let inference work for obvious cases
const name = "John";
const age = 30;
const numbers = [1, 2, 3];

// ✅ GOOD: Explicit annotation for empty arrays
const emptyNumbers: number[] = [];
const emptyStrings: string[] = [];

// ❌ BAD: Empty array without annotation
const empty = []; // Type: any[] - avoid this!

// ✅ GOOD: Inference for simple functions
function add(a: number, b: number) {
  return a + b; // Return type inferred as number
}

// ✅ GOOD: Explicit return type for complex functions
function processData(data: string[]): { 
  result: string[]; 
  count: number 
} {
  return {
    result: data.map(d => d.toUpperCase()),
    count: data.length
  };
}

// ✅ GOOD: Explicit annotation for public APIs
export function publicFunction(input: string): string {
  return input.toUpperCase();
}

// ✅ GOOD: Let contextual typing work
[1, 2, 3].map(n => n * 2); // n inferred as number

// ❌ BAD: Redundant annotation
[1, 2, 3].map((n: number): number => n * 2);

// ✅ GOOD: Inference with const assertions
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
} as const;
// Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000 }

// ✅ GOOD: Let union types be inferred
function formatId(id: string | number) {
  return id.toString();
}

const result = Math.random() > 0.5 
  ? formatId("abc")
  : formatId(123);
// result inferred as string

// ❌ BAD: Fighting inference unnecessarily
const value: string | number = Math.random() > 0.5 ? "abc" : 123;
const result2: string = formatId(value); // Redundant annotation

// ✅ GOOD: Use inference with generics
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const first = firstElement([1, 2, 3]); // first: number | undefined
const firstStr = firstElement(["a", "b"]); // firstStr: string | undefined

// ✅ GOOD: Inference in class properties with initialization
class User {
  name = "Unknown"; // Inferred as string
  count = 0;        // Inferred as number
}

// ❌ BAD: Uninitialized without annotation
class BadUser {
  // name; // Error: needs annotation or initializer
  email: string; // ✅ Must annotate if not initialized
  
  constructor() {
    this.email = "";
  }
}

// ✅ GOOD: Trust inference with type guards
function process(value: unknown) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
  return String(value);
}

// ✅ GOOD: Return type inference for simple cases
const getUser = () => ({ name: "John", age: 30 });
// Return type: { name: string; age: number }

// ✅ GOOD: Explicit type for recursive functions
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// ✅ GOOD: Widening with unions
const status = "pending"; // Type: string (widened)
const statusLiteral = "pending" as const; // Type: "pending" (literal)

type Status = "pending" | "approved" | "rejected";
const typedStatus: Status = "pending"; // Type: Status

// ✅ GOOD: Inference with destructuring
const { name: userName, age: userAge } = getUser();
// userName: string, userAge: number

// ✅ GOOD: Inference in async/await
async function fetchUser() {
  return { id: 1, name: "John" };
}

async function processUser() {
  const user = await fetchUser();
  // user: { id: number; name: string }
  console.log(user.name);
}

// Summary: When to use explicit annotations
// 1. Function parameters (always)
// 2. Empty arrays/objects
// 3. Public API return types
// 4. When inference would be wrong or unclear
// 5. Complex types that aren't obvious
// 6. When you want to restrict types more than inference would

// Summary: When to rely on inference
// 1. Variable initialization with obvious types
// 2. Simple function return types
// 3. Array method callbacks
// 4. Generic function arguments
// 5. Object literals
// 6. Arithmetic and string operations`}
        </CodeBlock>

        <InfoBox type="important">
          <strong>Type Inference Guidelines:</strong>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              <strong>Rely on inference:</strong> For simple, obvious cases like
              variable initialization
            </li>
            <li>
              <strong>Use annotations:</strong> For function parameters, public
              APIs, and complex types
            </li>
            <li>
              <strong>Contextual typing:</strong> Trust TypeScript to infer
              callback parameter types
            </li>
            <li>
              <strong>Empty collections:</strong> Always annotate empty arrays
              and objects
            </li>
            <li>
              <strong>Const assertions:</strong> Use 'as const' when you want
              literal types
            </li>
            <li>
              <strong>Type guards:</strong> Let TypeScript narrow types
              automatically
            </li>
          </ul>
        </InfoBox>
      </Section>

      <Section title="Advanced Type Inference">
        <CodeBlock title="Complex inference scenarios">
          {`// Inference with mapped types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

const mutable = { x: 1, y: 2 };
const immutable: Readonly<typeof mutable> = mutable;
// immutable: { readonly x: number; readonly y: number }

// Inference with conditional types
type TypeName<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  "object";

type T1 = TypeName<string>;  // "string"
type T2 = TypeName<42>;      // "number"
type T3 = TypeName<true>;    // "boolean"

// Inference in template literal types
type EventName = \`on\${Capitalize<"click" | "focus">}\`;
// Type: "onClick" | "onFocus"

// Inference with utility types
type User = { name: string; age: number; email: string };
type PartialUser = Partial<User>;
// Type: { name?: string; age?: number; email?: string }

type RequiredUser = Required<PartialUser>;
// Type: { name: string; age: number; email: string }

// Inference with typeof
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

type Config = typeof config;
// Type: { apiUrl: string; timeout: number; retries: number }

// Inference with ReturnType
function createUser() {
  return { id: 1, name: "John", email: "john@example.com" };
}

type UserType = ReturnType<typeof createUser>;
// Type: { id: number; name: string; email: string }

// Inference with Parameters
function process(id: number, name: string, active: boolean) {}

type ProcessParams = Parameters<typeof process>;
// Type: [number, string, boolean]

// Inference in recursive types
type NestedArray<T> = T | NestedArray<T>[];

const nested: NestedArray<number> = [1, [2, [3, [4]]]];
// TypeScript infers the nested structure

// Inference with discriminated unions
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      // shape inferred as { kind: "circle"; radius: number }
      return Math.PI * shape.radius ** 2;
    case "square":
      // shape inferred as { kind: "square"; size: number }
      return shape.size ** 2;
  }
}

// Inference with infer keyword
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;

type T4 = UnpackPromise<Promise<string>>;  // string
type T5 = UnpackPromise<string>;           // string

// Inference in variadic tuple types
function concat<T extends unknown[], U extends unknown[]>(
  arr1: T,
  arr2: U
): [...T, ...U] {
  return [...arr1, ...arr2];
}

const result = concat([1, 2], ["a", "b"]);
// result: [number, number, string, string]

// Inference with indexed access types
type Person = {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
};

type AddressType = Person["address"];
// Type: { street: string; city: string }

type NameType = Person["name"];
// Type: string`}
        </CodeBlock>
      </Section>
    </div>
  );
}
