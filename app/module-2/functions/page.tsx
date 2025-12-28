import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function FunctionsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Functions
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Functions are the building blocks of TypeScript applications. TypeScript
        provides rich type annotations for parameters, return values, and
        function signatures, including optional, default, rest parameters, and
        overloads.
      </p>

      <Section title="1. Function Types">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript allows you to type both the parameters and return value of
          functions, providing complete type safety for function calls.
        </p>

        <CodeBlock title="Basic function types">
          {`// Function declaration with types
function add(a: number, b: number): number {
  return a + b;
}

// Function expression
const subtract = function(a: number, b: number): number {
  return a - b;
};

// Arrow function
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Concise arrow function
const divide = (a: number, b: number): number => a / b;

// Function type annotation
let operation: (a: number, b: number) => number;

operation = add;       // OK
operation = subtract;  // OK
// operation = "test"; // Error: not a function

// Type alias for function type
type MathOperation = (a: number, b: number) => number;

const modulo: MathOperation = (a, b) => a % b;

// Function with no return value (void)
function log(message: string): void {
  console.log(message);
}

// Void function can implicitly return undefined
function doNothing(): void {
  return; // OK
}

// Function that never returns (never)
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    // Never exits
  }
}

// Function with object parameter
function printUser(user: { name: string; age: number }): void {
  console.log(\`\${user.name} is \${user.age} years old\`);
}

// Function with array parameter
function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

// Function returning object
function createUser(name: string, age: number): { name: string; age: number } {
  return { name, age };
}

// Function returning array
function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

// Type inference for return type
function inferredReturn(x: number) {
  return x * 2; // Return type inferred as number
}

// Explicit vs inferred
function explicit(x: number): number {
  return x * 2;
}

function inferred(x: number) {
  return x * 2; // Same as explicit
}

// Best practice: Explicit return types for public APIs
export function publicAPI(x: number): number {
  return x * 2;
}

// Inferred is fine for private/internal functions
function helper(x: number) {
  return x * 2;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          TypeScript can infer return types, but explicit annotations improve
          readability and catch errors earlier, especially for public APIs and
          complex functions.
        </InfoBox>
      </Section>

      <Section title="2. Optional Parameters">
        <p className="text-gray-700 dark:text-gray-300">
          Optional parameters allow calling functions with or without specific
          arguments, making them more flexible.
        </p>

        <CodeBlock title="Optional parameter examples">
          {`// Optional parameter with ?
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return \`\${greeting}, \${name}!\`;
  }
  return \`Hello, \${name}!\`;
}

greet("John");              // "Hello, John!"
greet("John", "Hi");        // "Hi, John!"
// greet();                 // Error: 'name' is required

// Optional parameters must come after required ones
// function invalid(optional?: string, required: string) {} // Error

function valid(required: string, optional?: string) {
  console.log(required, optional);
}

// Optional parameter is type | undefined
function process(value: string, options?: { verbose: boolean }) {
  // options is { verbose: boolean } | undefined
  if (options?.verbose) {
    console.log("Processing:", value);
  }
}

process("data");                      // OK
process("data", { verbose: true });   // OK

// Multiple optional parameters
function createUser(
  name: string,
  age?: number,
  email?: string
): { name: string; age?: number; email?: string } {
  return { name, age, email };
}

createUser("John");                          // OK
createUser("John", 30);                      // OK
createUser("John", 30, "john@example.com"); // OK

// Optional with type guard
function printLength(str?: string): void {
  if (str !== undefined) {
    console.log(str.length); // OK: narrowed to string
  }
}

// Or with optional chaining
function printLengthSafe(str?: string): void {
  console.log(str?.length); // number | undefined
}

// Optional object properties
function configureApp(config?: {
  theme?: string;
  language?: string;
}): void {
  const theme = config?.theme ?? "light";
  const language = config?.language ?? "en";
  console.log(\`Theme: \${theme}, Language: \${language}\`);
}

configureApp();                              // OK
configureApp({});                            // OK
configureApp({ theme: "dark" });             // OK
configureApp({ theme: "dark", language: "fr" }); // OK

// Optional callback
function fetchData(url: string, callback?: (data: any) => void): void {
  // Simulated fetch
  const data = { result: "success" };
  
  if (callback) {
    callback(data);
  }
}

fetchData("/api/data");                        // OK
fetchData("/api/data", (data) => console.log(data)); // OK

// Destructuring with optional parameters
function display({ name, age }: { name: string; age?: number }): void {
  console.log(age !== undefined ? \`\${name}, \${age}\` : name);
}

display({ name: "John" });           // "John"
display({ name: "Jane", age: 25 });  // "Jane, 25"`}
        </CodeBlock>

        <InfoBox type="info">
          Optional parameters are equivalent to parameter | undefined. They must
          come after all required parameters. Use them when a function can work
          without certain arguments.
        </InfoBox>
      </Section>

      <Section title="3. Default Parameters">
        <p className="text-gray-700 dark:text-gray-300">
          Default parameters provide a fallback value when an argument is not
          provided or is undefined.
        </p>

        <CodeBlock title="Default parameter examples">
          {`// Basic default parameters
function greet(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}

greet("John");              // "Hello, John!"
greet("John", "Hi");        // "Hi, John!"
greet("John", undefined);   // "Hello, John!" (undefined uses default)

// Type is inferred from default value
function multiply(a: number, b = 2): number {
  return a * b; // b is inferred as number
}

multiply(5);      // 10
multiply(5, 3);   // 15

// Default parameters can come before non-default (but requires explicit undefined)
function createUser(name: string = "Anonymous", age: number): string {
  return \`\${name} is \${age} years old\`;
}

createUser(undefined, 30);  // "Anonymous is 30 years old"
createUser("John", 25);     // "John is 25 years old"
// createUser(30);          // Error: number not assignable to string

// Default with complex types
function configure(options: { timeout: number; retries: number } = { timeout: 5000, retries: 3 }) {
  console.log(\`Timeout: \${options.timeout}, Retries: \${options.retries}\`);
}

configure();                                  // Uses defaults
configure({ timeout: 10000, retries: 5 });   // Custom values

// Default with destructuring
function printUser({
  name = "Anonymous",
  age = 0
}: {
  name?: string;
  age?: number;
} = {}) {
  console.log(\`\${name}, \${age}\`);
}

printUser();                           // "Anonymous, 0"
printUser({});                         // "Anonymous, 0"
printUser({ name: "John" });           // "John, 0"
printUser({ name: "Jane", age: 25 }); // "Jane, 25"

// Default parameters with expressions
function log(message: string, timestamp: Date = new Date()): void {
  console.log(\`[\${timestamp.toISOString()}] \${message}\`);
}

// Default computed from other parameters
function createRange(end: number, start: number = 0, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

createRange(10);           // [0, 1, 2, ..., 10]
createRange(10, 5);        // [5, 6, 7, 8, 9, 10]
createRange(10, 0, 2);     // [0, 2, 4, 6, 8, 10]

// Default with union types
function format(value: number, precision: number = 2): string {
  return value.toFixed(precision);
}

// Null vs undefined with defaults
function process(value: string | null = "default"): void {
  console.log(value); // value is never undefined
}

process();          // "default"
process(null);      // null (null doesn't trigger default)
process(undefined); // "default"

// Rest parameters with defaults
function combine(separator: string = ", ", ...items: string[]): string {
  return items.join(separator);
}

combine();                      // ""
combine("-", "a", "b", "c");   // "a-b-c"
combine(undefined, "x", "y");  // "x, y"`}
        </CodeBlock>

        <InfoBox type="tip">
          Default parameters are evaluated at call time, not at function
          definition. Use them for commonly used values and to reduce optional
          parameter checks.
        </InfoBox>
      </Section>

      <Section title="4. Rest Parameters">
        <p className="text-gray-700 dark:text-gray-300">
          Rest parameters allow functions to accept an indefinite number of
          arguments as an array.
        </p>

        <CodeBlock title="Rest parameter examples">
          {`// Basic rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3);           // 6
sum(1, 2, 3, 4, 5);     // 15
sum();                  // 0

// Rest parameters must be last
function log(prefix: string, ...messages: string[]): void {
  messages.forEach(msg => console.log(\`\${prefix}: \${msg}\`));
}

log("INFO", "App started", "Port 3000");

// Invalid: Rest parameter not last
// function invalid(...items: string[], last: string) {} // Error

// Rest with tuple type
function tuple<T extends any[]>(...args: T): T {
  return args;
}

const t = tuple(1, "hello", true);
// Type: [number, string, boolean]

// Typed rest parameters
interface User {
  id: number;
  name: string;
}

function createUsers(...users: User[]): User[] {
  return users;
}

createUsers(
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
);

// Rest with spread
function combine(...arrays: number[][]): number[] {
  return arrays.flat();
}

combine([1, 2], [3, 4], [5, 6]); // [1, 2, 3, 4, 5, 6]

// Rest parameters with other parameters
function format(template: string, ...values: (string | number)[]): string {
  let result = template;
  values.forEach((value, index) => {
    result = result.replace(\`{$\{index}}\`, String(value));
  });
  return result;
}

format("Hello {0}, you are {1} years old", "John", 30);
// "Hello John, you are 30 years old"

// Variadic tuple types (TypeScript 4.0+)
type Args = [string, number, ...boolean[]];

function variadic(...args: Args): void {
  const [str, num, ...bools] = args;
  console.log(str, num, bools);
}

variadic("test", 42, true, false, true);

// Leading rest parameters (after required parameters)
function process(
  required: string,
  ...middle: number[],
): string {
  return \`\${required}: \${middle.join(", ")}\`;
}

// Mixing defaults and rest
function createList(
  prefix: string = "Item",
  ...items: string[]
): string[] {
  return items.map((item, i) => \`\${prefix} \${i + 1}: \${item}\`);
}

createList("Task", "Buy milk", "Walk dog");
// ["Task 1: Buy milk", "Task 2: Walk dog"]

// Rest parameters with union types
function logAll(...items: (string | number)[]): void {
  items.forEach(item => {
    console.log(item);
  });
}

logAll(1, "two", 3, "four");

// Generic rest parameters
function concat<T>(...arrays: T[][]): T[] {
  return arrays.reduce((acc, arr) => acc.concat(arr), []);
}

const combined = concat([1, 2], [3, 4], [5, 6]); // number[]

// Rest parameters in arrow functions
const max = (...nums: number[]): number => Math.max(...nums);

max(1, 5, 3, 9, 2); // 9

// Callback with rest parameters
function forEach<T>(
  array: T[],
  callback: (item: T, ...rest: any[]) => void
): void {
  array.forEach(callback);
}

forEach([1, 2, 3], (item, index, arr) => {
  console.log(\`[\${index}] = \${item}\`);
});`}
        </CodeBlock>

        <InfoBox type="important">
          Rest parameters collect all remaining arguments into an array. They
          must be the last parameter and can be combined with required and
          default parameters.
        </InfoBox>
      </Section>

      <Section title="5. Function Overloads">
        <p className="text-gray-700 dark:text-gray-300">
          Function overloads allow you to define multiple call signatures for a
          single function, enabling different parameter types and return types.
        </p>

        <CodeBlock title="Function overload examples">
          {`// Basic overload
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
  return a + b;
}

const str = combine("Hello", " World");  // string
const num = combine(5, 10);              // number
// const invalid = combine("Hello", 5);  // Error: no matching overload

// Overload with different parameter counts
function makeDate(timestamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;
function makeDate(yearOrTimestamp: number, month?: number, day?: number): Date {
  if (month !== undefined && day !== undefined) {
    return new Date(yearOrTimestamp, month - 1, day);
  }
  return new Date(yearOrTimestamp);
}

const date1 = makeDate(1640000000000);     // Date from timestamp
const date2 = makeDate(2024, 1, 15);       // Date from year, month, day
// const invalid = makeDate(2024, 1);      // Error: no matching overload

// Overload with different return types
function getValue(key: "name"): string;
function getValue(key: "age"): number;
function getValue(key: "active"): boolean;
function getValue(key: string): string | number | boolean {
  const data: Record<string, any> = {
    name: "John",
    age: 30,
    active: true
  };
  return data[key];
}

const name = getValue("name");      // string
const age = getValue("age");        // number
const active = getValue("active");  // boolean

// Overload with optional parameters
function format(value: string): string;
function format(value: number, precision: number): string;
function format(value: string | number, precision?: number): string {
  if (typeof value === "number" && precision !== undefined) {
    return value.toFixed(precision);
  }
  return String(value);
}

format("hello");    // string
format(3.14159, 2); // "3.14"

// Overload with arrays
function reverse(str: string): string;
function reverse<T>(arr: T[]): T[];
function reverse<T>(value: string | T[]): string | T[] {
  if (typeof value === "string") {
    return value.split("").reverse().join("");
  }
  return value.slice().reverse();
}

const str2 = reverse("hello");         // "olleh"
const arr = reverse([1, 2, 3, 4, 5]); // [5, 4, 3, 2, 1]

// Overload with object parameters
interface User {
  id: number;
  name: string;
}

function getUser(id: number): User;
function getUser(name: string): User;
function getUser(idOrName: number | string): User {
  // Implementation
  return { id: 1, name: "John" };
}

const user1 = getUser(1);        // User
const user2 = getUser("John");   // User

// Generic overloads
function map<T, U>(array: T[], fn: (item: T) => U): U[];
function map<T>(array: T[], fn: (item: T) => T): T[];
function map<T, U>(array: T[], fn: (item: T) => U): U[] {
  return array.map(fn);
}

// Overload ordering matters
function process(value: any): string;      // Catch-all
function process(value: number): number;   // More specific (never called!)
function process(value: any): any {
  return value;
}

// WRONG: Specific overload after general one
// TypeScript matches first compatible overload

// Correct ordering (specific to general)
function processCorrect(value: number): number;
function processCorrect(value: string): string;
function processCorrect(value: any): any;
function processCorrect(value: any): any {
  return value;
}

// Overload with callbacks
function on(event: "click", handler: (x: number, y: number) => void): void;
function on(event: "keypress", handler: (key: string) => void): void;
function on(event: string, handler: (...args: any[]) => void): void {
  // Implementation
}

on("click", (x, y) => console.log(x, y));      // Type-safe: (number, number)
on("keypress", (key) => console.log(key));     // Type-safe: (string)

// Real-world example: fetch wrapper
function fetchAPI(url: string): Promise<any>;
function fetchAPI(url: string, method: "GET"): Promise<any>;
function fetchAPI(url: string, method: "POST", body: any): Promise<any>;
function fetchAPI(url: string, method?: string, body?: any): Promise<any> {
  return fetch(url, {
    method: method || "GET",
    body: body ? JSON.stringify(body) : undefined
  }).then(res => res.json());
}

fetchAPI("/api/users");                           // GET
fetchAPI("/api/users", "GET");                    // GET
fetchAPI("/api/users", "POST", { name: "John" }); // POST with body

// Overloads with constructors
class Container<T> {
  constructor(value: T);
  constructor(values: T[]);
  constructor(valueOrValues: T | T[]) {
    // Implementation
  }
}`}
        </CodeBlock>

        <InfoBox type="warning">
          Function overloads must be ordered from most specific to most general.
          TypeScript matches the first compatible overload, so order matters.
          The implementation signature must be compatible with all overload
          signatures.
        </InfoBox>
      </Section>

      <Section title="6. Advanced Function Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns for working with functions in TypeScript, including
          generics, callbacks, and higher-order functions.
        </p>

        <CodeBlock title="Advanced function patterns">
          {`// 1. Generic functions
function identity<T>(value: T): T {
  return value;
}

const num = identity(42);         // number
const str = identity("hello");    // string
const arr = identity([1, 2, 3]);  // number[]

// 2. Constrained generics
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name");  // string
const age = getProperty(user, "age");    // number
// getProperty(user, "invalid");         // Error

// 3. Function returning function (currying)
function multiply(a: number): (b: number) => number {
  return (b: number) => a * b;
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// 4. Higher-order function
function withLogging<T extends any[], R>(
  fn: (...args: T) => R
): (...args: T) => R {
  return (...args: T) => {
    console.log("Calling with:", args);
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  };
}

const add = (a: number, b: number) => a + b;
const addWithLogging = withLogging(add);

addWithLogging(2, 3); // Logs: "Calling with: [2, 3]" and "Result: 5"

// 5. Function composition
function compose<A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
): (a: A) => C {
  return (a: A) => f(g(a));
}

const addOne = (x: number) => x + 1;
const double2 = (x: number) => x * 2;

const addOneThenDouble = compose(double2, addOne);
console.log(addOneThenDouble(5)); // 12 (5 + 1 = 6, 6 * 2 = 12)

// 6. Async function types
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}

// Type is automatically: (id: number) => Promise<User>

// 7. Callback patterns
function processArray<T, U>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => U
): U[] {
  return array.map(callback);
}

processArray([1, 2, 3], (n) => n * 2);              // [2, 4, 6]
processArray(["a", "b"], (s) => s.toUpperCase());   // ["A", "B"]

// 8. This parameter
interface Counter {
  count: number;
  increment(this: Counter): void;
}

const counter: Counter = {
  count: 0,
  increment(this: Counter) {
    this.count++;
  }
};

counter.increment(); // OK
// const inc = counter.increment;
// inc(); // Error: this is undefined

// 9. Function type guards
function isFunction(value: any): value is Function {
  return typeof value === "function";
}

// 10. Partial application
function partial<T extends any[], U extends any[], R>(
  fn: (...args: [...T, ...U]) => R,
  ...fixedArgs: T
): (...rest: U) => R {
  return (...rest: U) => fn(...fixedArgs, ...rest);
}

function greet3(greeting: string, name: string): string {
  return \`\${greeting}, \${name}!\`;
}

const sayHello = partial(greet3, "Hello");
console.log(sayHello("John")); // "Hello, John!"

// 11. Memoization
function memoize<T extends any[], R>(fn: (...args: T) => R): (...args: T) => R {
  const cache = new Map<string, R>();
  
  return (...args: T): R => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveOperation = memoize((n: number): number => {
  console.log("Computing...");
  return n ** 2;
});

expensiveOperation(5); // Logs "Computing...", returns 25
expensiveOperation(5); // Returns 25 (from cache)

// 12. Type-safe event emitter
type EventMap = {
  click: [x: number, y: number];
  keypress: [key: string];
  resize: [width: number, height: number];
};

function createEmitter<T extends Record<string, any[]>>() {
  const listeners: Partial<Record<keyof T, Array<(...args: any[]) => void>>> = {};
  
  return {
    on<K extends keyof T>(event: K, handler: (...args: T[K]) => void): void {
      if (!listeners[event]) {
        listeners[event] = [];
      }
      listeners[event]!.push(handler as any);
    },
    
    emit<K extends keyof T>(event: K, ...args: T[K]): void {
      listeners[event]?.forEach(handler => handler(...args));
    }
  };
}

const emitter = createEmitter<EventMap>();

emitter.on("click", (x, y) => console.log(x, y));      // Type-safe
emitter.emit("click", 10, 20);                          // Type-safe
// emitter.emit("click", "invalid");                    // Error

// 13. Pipeline operator simulation
function pipe<T>(...fns: Array<(arg: T) => T>): (initial: T) => T {
  return (initial: T) => fns.reduce((acc, fn) => fn(acc), initial);
}

const transform = pipe(
  (n: number) => n + 1,
  (n: number) => n * 2,
  (n: number) => n - 3
);

console.log(transform(5)); // (5 + 1) * 2 - 3 = 9`}
        </CodeBlock>

        <InfoBox type="tip">
          Use generics for reusable functions, leverage higher-order functions
          for composition, and consider type-safe patterns like constrained
          generics and discriminated unions for complex function signatures.
        </InfoBox>
      </Section>
    </div>
  );
}
