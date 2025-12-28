import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeAnnotationsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Type Annotations
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Type annotations are explicit declarations that specify the type of a
        variable, parameter, or return value. They tell TypeScript exactly what
        type a value should be, enabling compile-time type checking and better
        IDE support.
      </p>

      <Section title="1. Variable Type Annotations">
        <p className="text-gray-700 dark:text-gray-300">
          You can annotate variable types using a colon followed by the type
          name.
        </p>

        <CodeBlock title="Variable type annotation examples">
          {`// Basic variable annotations
let name: string = "John Doe";
let age: number = 30;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Array annotations
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: string[] = ["a", "b", "c"];
let mixed: (string | number)[] = [1, "two", 3, "four"];

// Alternative array syntax
let numbers2: Array<number> = [1, 2, 3];
let strings2: Array<string> = ["x", "y", "z"];

// Object type annotations
let user: { name: string; age: number } = {
  name: "Jane",
  age: 25
};

// Object with optional properties
let config: { host: string; port?: number } = {
  host: "localhost"
};

// Object with readonly properties
let point: { readonly x: number; readonly y: number } = {
  x: 10,
  y: 20
};
// point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// Tuple annotations
let coordinate: [number, number] = [10, 20];
let person: [string, number, boolean] = ["John", 30, true];

// Tuple with optional elements
let optionalTuple: [string, number?] = ["test"];

// Tuple with rest elements
let restTuple: [string, ...number[]] = ["first", 1, 2, 3];

// Union type annotations
let id: string | number = "abc123";
id = 42; // OK, can be either string or number

let status: "pending" | "approved" | "rejected" = "pending";

// Intersection type annotations
type HasName = { name: string };
type HasAge = { age: number };
let personData: HasName & HasAge = {
  name: "Bob",
  age: 35
};

// Function type annotations
let greet: (name: string) => string;
greet = (name) => \`Hello, \${name}\`;

// Complex nested objects
let complexData: {
  id: number;
  user: {
    name: string;
    email: string;
    address: {
      street: string;
      city: string;
      country: string;
    };
  };
  tags: string[];
  metadata: { [key: string]: any };
} = {
  id: 1,
  user: {
    name: "Alice",
    email: "alice@example.com",
    address: {
      street: "123 Main St",
      city: "New York",
      country: "USA"
    }
  },
  tags: ["important", "urgent"],
  metadata: { priority: "high" }
};

// Const vs let annotations
const constantName: string = "John"; // Type is still string
const literalValue = "John"; // Type is "John" (literal type)

let variable: "fixed" = "fixed"; // Must always be "fixed"
// variable = "changed"; // Error

// Multiple variable declarations
let a: number, b: number, c: number;
a = 1;
b = 2;
c = 3;

// Destructuring with annotations
let [first, second]: [string, number] = ["text", 42];

let { name: userName, age: userAge }: { name: string; age: number } = {
  name: "Tom",
  age: 28
};

// Type assertions combined with annotations
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// Annotating variables declared later
let futureNumber: number;
// ... later in code
futureNumber = 42;`}
        </CodeBlock>

        <InfoBox type="tip">
          While TypeScript can often infer variable types, explicit annotations
          make your intentions clear and catch errors early. Use them for public
          APIs and complex types.
        </InfoBox>
      </Section>

      <Section title="2. Function Parameter Type Annotations">
        <p className="text-gray-700 dark:text-gray-300">
          Parameters always need type annotations unless TypeScript can infer
          them from context.
        </p>

        <CodeBlock title="Function parameter annotation examples">
          {`// Basic parameter annotations
function add(a: number, b: number) {
  return a + b;
}

function greet(name: string) {
  console.log(\`Hello, \${name}\`);
}

function isEven(num: number) {
  return num % 2 === 0;
}

// Optional parameters (with ?)
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return \`\${firstName} \${lastName}\`;
  }
  return firstName;
}

buildName("John");           // OK
buildName("John", "Doe");    // OK

// Default parameters (type inferred from default value)
function multiply(a: number, b: number = 1) {
  return a * b;
}

// Can explicitly annotate default parameters
function power(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4, 5); // OK

// Object parameters
function createUser(user: { name: string; age: number; email: string }) {
  console.log(\`Creating user: \${user.name}\`);
}

// Object parameters with optional properties
function updateUser(user: { 
  id: number; 
  name?: string; 
  age?: number 
}) {
  console.log(\`Updating user \${user.id}\`);
}

// Destructured parameters with annotations
function printCoordinates({ x, y }: { x: number; y: number }) {
  console.log(\`X: \${x}, Y: \${y}\`);
}

// Destructured with defaults and types
function drawCircle({ 
  x = 0, 
  y = 0, 
  radius 
}: { 
  x?: number; 
  y?: number; 
  radius: number 
}) {
  console.log(\`Drawing circle at (\${x}, \${y}) with radius \${radius}\`);
}

// Array parameters
function processNumbers(numbers: number[]) {
  return numbers.map(n => n * 2);
}

function joinStrings(strings: string[], separator: string = ", ") {
  return strings.join(separator);
}

// Function parameters
function execute(callback: (result: number) => void) {
  callback(42);
}

function transform(value: number, transformer: (n: number) => number) {
  return transformer(value);
}

// Union type parameters
function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return \`ID-\${id}\`;
}

// Generic parameters (will be covered in detail later)
function identity<T>(value: T): T {
  return value;
}

// Tuple parameters
function printPair([first, second]: [string, number]) {
  console.log(\`\${first}: \${second}\`);
}

// This parameter annotation
interface Counter {
  count: number;
  increment(this: Counter, amount?: number): void;
}

const counter: Counter = {
  count: 0,
  increment(this: Counter, amount: number = 1) {
    this.count += amount;
  }
};

// Multiple parameters with different types
function complexFunction(
  id: number,
  name: string,
  options: { verbose: boolean; format: "json" | "xml" },
  callback: (error: Error | null, result: string) => void
): void {
  // Implementation
}

// Parameters with literal types
function setDirection(direction: "north" | "south" | "east" | "west") {
  console.log(\`Moving \${direction}\`);
}

// Readonly parameters
function processData(data: readonly number[]) {
  // data.push(1); // Error: Property 'push' does not exist on type 'readonly number[]'
  return data.filter(n => n > 0);
}

// Function overload parameters
function makeDate(timestamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;
function makeDate(yearOrTimestamp: number, month?: number, day?: number): Date {
  if (month !== undefined && day !== undefined) {
    return new Date(yearOrTimestamp, month - 1, day);
  }
  return new Date(yearOrTimestamp);
}

// Arrow function parameters
const square = (n: number): number => n * n;
const greetUser = (name: string, greeting: string = "Hello"): string => 
  \`\${greeting}, \${name}\`;

// Async function parameters
async function fetchUser(id: number): Promise<{ name: string; email: string }> {
  // Fetch logic
  return { name: "User", email: "user@example.com" };
}

// Generator function parameters
function* generateNumbers(start: number, end: number): Generator<number> {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}`}
        </CodeBlock>

        <InfoBox type="important">
          Always annotate function parameters! TypeScript cannot infer parameter
          types (except in contextual typing scenarios). Missing parameter
          annotations will result in implicit 'any' types with strict mode
          enabled.
        </InfoBox>
      </Section>

      <Section title="3. Return Type Annotations">
        <p className="text-gray-700 dark:text-gray-300">
          While TypeScript can infer return types, explicit annotations improve
          readability and catch mistakes.
        </p>

        <CodeBlock title="Return type annotation examples">
          {`// Basic return type annotations
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return \`Hello, \${name}\`;
}

function isPositive(num: number): boolean {
  return num > 0;
}

// Void return type (no return value)
function logMessage(message: string): void {
  console.log(message);
}

function processArray(items: string[]): void {
  items.forEach(item => console.log(item));
}

// Never return type (function never returns)
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // Loop forever
  }
}

// Object return types
function createUser(name: string, age: number): { name: string; age: number } {
  return { name, age };
}

function getCoordinates(): { x: number; y: number; z?: number } {
  return { x: 10, y: 20 };
}

// Array return types
function getNumbers(): number[] {
  return [1, 2, 3, 4, 5];
}

function getRange(start: number, end: number): Array<number> {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

// Tuple return types
function splitName(fullName: string): [string, string] {
  const parts = fullName.split(" ");
  return [parts[0], parts[1]];
}

function getStatus(): ["loading" | "success" | "error", string] {
  return ["success", "Data loaded"];
}

// Union return types
function findUser(id: number): { name: string; email: string } | null {
  if (id === 1) {
    return { name: "John", email: "john@example.com" };
  }
  return null;
}

function parseValue(input: string): string | number {
  const num = parseInt(input);
  if (isNaN(num)) {
    return input;
  }
  return num;
}

// Promise return types
async function fetchData(): Promise<string> {
  return "data";
}

async function getUser(id: number): Promise<{ name: string; age: number }> {
  return { name: "Jane", age: 25 };
}

async function loadJson(): Promise<unknown> {
  const response = await fetch("api/data");
  return response.json();
}

// Optional return (undefined included)
function findFirst(arr: number[]): number | undefined {
  return arr[0];
}

function getProperty(obj: any, key: string): any | undefined {
  return obj[key];
}

// Function return types
function getAdder(): (a: number, b: number) => number {
  return (a, b) => a + b;
}

function createMultiplier(factor: number): (n: number) => number {
  return (n) => n * factor;
}

// Generic return types
function identity<T>(value: T): T {
  return value;
}

function wrapInArray<T>(value: T): T[] {
  return [value];
}

// Complex return types
function processData(data: string[]): {
  processed: string[];
  count: number;
  errors: string[];
} {
  return {
    processed: data.map(d => d.toUpperCase()),
    count: data.length,
    errors: []
  };
}

// Discriminated union return types
function apiCall(endpoint: string):
  | { success: true; data: any }
  | { success: false; error: string } {
  try {
    return { success: true, data: {} };
  } catch (error) {
    return { success: false, error: "Failed to fetch" };
  }
}

// Generator return types
function* numberGenerator(): Generator<number, void, undefined> {
  yield 1;
  yield 2;
  yield 3;
}

function* fibonacciGenerator(): Generator<number> {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Arrow function return types
const multiply = (a: number, b: number): number => a * b;

const formatUser = (name: string, age: number): string => 
  \`\${name} (\${age} years old)\`;

const createPoint = (x: number, y: number): { x: number; y: number } => ({
  x,
  y
});

// Method return types
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  
  subtract(a: number, b: number): number {
    return a - b;
  }
  
  getHistory(): number[] {
    return [];
  }
}

// Async/await return types
async function parallelFetch(): Promise<[string, string]> {
  const [data1, data2] = await Promise.all([
    fetchData(),
    fetchData()
  ]);
  return [data1, data2];
}

// Type guards with return type predicates
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

interface Dog {
  bark(): void;
}

interface Cat {
  meow(): void;
}

function isDog(pet: Dog | Cat): pet is Dog {
  return "bark" in pet;
}

// Assertion functions
function assert(condition: any, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
}

// Readonly return types
function getReadonlyArray(): readonly number[] {
  return [1, 2, 3];
}

// Literal return types
function getDirection(): "north" | "south" | "east" | "west" {
  return "north";
}

function getStatus(): "pending" | "approved" | "rejected" {
  return "pending";
}

// This return type (method chaining)
class StringBuilder {
  private value: string = "";
  
  append(text: string): this {
    this.value += text;
    return this;
  }
  
  prepend(text: string): this {
    this.value = text + this.value;
    return this;
  }
  
  build(): string {
    return this.value;
  }
}

const result = new StringBuilder()
  .append("Hello")
  .append(" ")
  .append("World")
  .build();`}
        </CodeBlock>

        <InfoBox type="tip">
          Explicit return type annotations help catch errors where you might
          accidentally return the wrong type. They also make your function's
          contract clear to other developers and improve IDE autocomplete.
        </InfoBox>
      </Section>

      <Section title="Best Practices for Type Annotations">
        <CodeBlock title="When and where to use type annotations">
          {`// ✅ DO: Always annotate function parameters
function processUser(name: string, age: number) {
  // ...
}

// ✅ DO: Annotate public API return types
export function calculate(x: number, y: number): number {
  return x + y;
}

// ✅ DO: Annotate when type isn't obvious
let data: { name: string; items: string[] };
// Later assigned
data = { name: "Test", items: ["a", "b"] };

// ✅ DO: Annotate complex types
let config: {
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    darkMode: boolean;
    notifications: boolean;
  };
};

// ❌ DON'T: Over-annotate when inference is clear
let name: string = "John"; // Type is obvious
let name2 = "John";        // ✅ Better: let TypeScript infer

let numbers: number[] = [1, 2, 3]; // Type is obvious
let numbers2 = [1, 2, 3];          // ✅ Better: inferred as number[]

// ❌ DON'T: Use any without good reason
function badFunction(data: any): any { // ❌ Avoid any
  return data.value;
}

function goodFunction(data: unknown): string { // ✅ Use unknown
  if (typeof data === "object" && data !== null && "value" in data) {
    return String((data as { value: any }).value);
  }
  return "";
}

// ✅ DO: Use type aliases for complex types
type User = {
  id: number;
  name: string;
  email: string;
  roles: string[];
};

function createUser(user: User): User {
  return user;
}

// ✅ DO: Annotate when inference would be wrong
let value = "test" as const; // Type: "test"
let value2 = "test";          // Type: string

// ✅ DO: Use union types for multiple possibilities
function format(value: string | number | boolean): string {
  return String(value);
}

// ✅ DO: Use optional vs undefined explicitly
interface Options {
  timeout?: number;        // Optional (can be omitted)
  retries: number | undefined; // Must be provided, can be undefined
}

// ✅ DO: Annotate class properties
class Person {
  name: string;
  age: number;
  private email: string;
  
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
}

// ✅ DO: Use readonly when appropriate
interface Config {
  readonly apiKey: string;
  readonly baseUrl: string;
  timeout: number; // Can be modified
}

// ✅ DO: Annotate callback parameters
function processItems(
  items: string[],
  callback: (item: string, index: number) => void
): void {
  items.forEach(callback);
}`}
        </CodeBlock>

        <InfoBox type="important">
          <strong>Key Principles:</strong>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              Always annotate function parameters and public API return types
            </li>
            <li>Let TypeScript infer simple, obvious types</li>
            <li>Annotate complex types that aren't immediately clear</li>
            <li>
              Use type aliases and interfaces for reusable type definitions
            </li>
            <li>Prefer unknown over any for dynamic data</li>
            <li>Use const assertions when you want literal types</li>
          </ul>
        </InfoBox>
      </Section>
    </div>
  );
}
