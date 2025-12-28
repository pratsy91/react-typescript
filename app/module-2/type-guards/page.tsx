import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeGuardsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Type Guards
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Type guards are runtime checks that inform TypeScript about the type of
        a value, enabling safe type narrowing. They include typeof, instanceof,
        in operator, and custom type guard functions.
      </p>

      <Section title="1. typeof Type Guards">
        <p className="text-gray-700 dark:text-gray-300">
          The typeof operator checks primitive types at runtime and helps
          TypeScript narrow union types to specific primitives.
        </p>

        <CodeBlock title="typeof type guard examples">
          {`// Basic typeof checks
function process(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // value is string
  } else {
    console.log(value.toFixed(2));    // value is number
  }
}

// typeof with multiple types
function handle(value: string | number | boolean | symbol) {
  if (typeof value === "string") {
    return value.length;
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else if (typeof value === "boolean") {
    return value ? "yes" : "no";
  } else {
    return value.toString();
  }
}

// typeof return values
// "string", "number", "bigint", "boolean", "symbol", "undefined", "object", "function"

function identify(value: unknown): string {
  return typeof value;
}

console.log(identify("hello"));      // "string"
console.log(identify(42));           // "number"
console.log(identify(true));         // "boolean"
console.log(identify(undefined));    // "undefined"
console.log(identify(Symbol()));     // "symbol"
console.log(identify(123n));         // "bigint"
console.log(identify({}));           // "object"
console.log(identify([]));           // "object" (arrays are objects!)
console.log(identify(null));         // "object" (quirk of JavaScript)
console.log(identify(() => {}));     // "function"

// Handling typeof quirks
function processValue(value: string | number | null | any[]) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toFixed(2);
  } else if (value === null) {
    return "null";  // Must check null separately
  } else {
    return value.length; // array
  }
}

// typeof with unknown
function parseValue(value: unknown): string | number {
  if (typeof value === "string") {
    return value; // narrowed to string
  } else if (typeof value === "number") {
    return value; // narrowed to number
  }
  throw new Error("Invalid value");
}

// typeof in expressions
const result = typeof someValue === "string" ? someValue.toUpperCase() : someValue;

// Multiple typeof checks
function format(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  return "unknown";
}

// typeof with function types
function execute(fn: Function | string) {
  if (typeof fn === "function") {
    fn(); // OK: it's a function
  } else {
    eval(fn); // OK: it's a string
  }
}

// typeof doesn't distinguish object types
function process2(value: { a: string } | { b: number }) {
  if (typeof value === "object") {
    // Still a union - typeof doesn't help here
    // Use 'in' operator instead
  }
}

// typeof with bigint
function addNumbers(a: number | bigint, b: number | bigint): number | bigint {
  if (typeof a === "bigint" && typeof b === "bigint") {
    return a + b; // bigint + bigint
  } else if (typeof a === "number" && typeof b === "number") {
    return a + b; // number + number
  }
  throw new Error("Mixed types");
}

// typeof in filter
const mixed: (string | number)[] = [1, "two", 3, "four"];
const strings = mixed.filter(x => typeof x === "string"); // any[] - needs type predicate!

// Better with type predicate (covered in custom guards)
function isString(x: any): x is string {
  return typeof x === "string";
}

const strings2 = mixed.filter(isString); // string[]`}
        </CodeBlock>

        <InfoBox type="info">
          typeof works with primitives (string, number, boolean, symbol, bigint,
          undefined) and can distinguish functions, but treats all objects
          (including null and arrays) as "object". Use other guards for objects.
        </InfoBox>
      </Section>

      <Section title="2. instanceof Type Guards">
        <p className="text-gray-700 dark:text-gray-300">
          The instanceof operator checks if an object is an instance of a
          specific class or constructor function.
        </p>

        <CodeBlock title="instanceof type guard examples">
          {`// Basic instanceof with classes
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
    animal.bark(); // animal is Dog
  } else {
    animal.meow(); // animal is Cat
  }
}

// instanceof with built-in types
function processValue(value: Date | RegExp | Error) {
  if (value instanceof Date) {
    console.log(value.toISOString());
  } else if (value instanceof RegExp) {
    console.log(value.source);
  } else {
    console.log(value.message);
  }
}

// instanceof with arrays
function process(value: string | any[]) {
  if (value instanceof Array) {
    console.log(value.length); // value is any[]
  } else {
    console.log(value.toUpperCase()); // value is string
  }
}

// Better: Array.isArray for arrays
function process2(value: string | number[]) {
  if (Array.isArray(value)) {
    console.log(value.length); // value is number[]
  } else {
    console.log(value.toUpperCase()); // value is string
  }
}

// instanceof with Error handling
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
    console.error(error.stack);
  } else {
    console.error("Unknown error:", error);
  }
}

// instanceof with custom errors
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

class NetworkError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

function handleSpecificError(error: Error) {
  if (error instanceof ValidationError) {
    console.log(\`Validation failed on \${error.field}\`);
  } else if (error instanceof NetworkError) {
    console.log(\`Network error: \${error.statusCode}\`);
  } else {
    console.log(\`Generic error: \${error.message}\`);
  }
}

// instanceof with inheritance
class Animal {
  move() {}
}

class Dog2 extends Animal {
  bark() {}
}

class Cat2 extends Animal {
  meow() {}
}

function handle(animal: Animal) {
  if (animal instanceof Dog2) {
    animal.bark(); // OK: Dog2
  } else if (animal instanceof Cat2) {
    animal.meow(); // OK: Cat2
  }
  animal.move(); // OK: all are Animal
}

// instanceof with null/undefined
function safeInstance(value: any) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return null;
}

safeInstance(null);      // null (instanceof returns false)
safeInstance(undefined); // null (instanceof returns false)

// instanceof doesn't work with interfaces
interface IAnimal {
  name: string;
}

// Can't use: value instanceof IAnimal (interfaces don't exist at runtime)

// instanceof with primitives (doesn't work as expected)
const str = "hello";
console.log(str instanceof String); // false (primitive, not String object)

const strObj = new String("hello");
console.log(strObj instanceof String); // true (String object)

// instanceof with constructor functions
function Person(name: string) {
  // @ts-ignore
  this.name = name;
}

const person = new (Person as any)("John");
console.log(person instanceof (Person as any)); // true

// instanceof in expressions
const result = value instanceof Date ? value.toISOString() : String(value);

// Multiple instanceof checks
function identify(value: Date | RegExp | Map<any, any> | Set<any>): string {
  if (value instanceof Date) return "date";
  if (value instanceof RegExp) return "regex";
  if (value instanceof Map) return "map";
  if (value instanceof Set) return "set";
  return "unknown";
}

// instanceof with Promise
async function handlePromise(value: Promise<string> | string) {
  if (value instanceof Promise) {
    const result = await value;
    console.log(result);
  } else {
    console.log(value);
  }
}

// Checking multiple instances
function isDateOrRegExp(value: unknown): value is Date | RegExp {
  return value instanceof Date || value instanceof RegExp;
}

// instanceof with custom class hierarchies
class Shape {}
class Circle extends Shape {
  radius: number = 0;
}
class Square extends Shape {
  size: number = 0;
}

function getArea(shape: Shape): number {
  if (shape instanceof Circle) {
    return Math.PI * shape.radius ** 2;
  } else if (shape instanceof Square) {
    return shape.size ** 2;
  }
  return 0;
}`}
        </CodeBlock>

        <InfoBox type="warning">
          instanceof only works with constructors that exist at runtime
          (classes, built-in types). It doesn't work with interfaces, type
          aliases, or primitive values. Use it for class hierarchies and
          built-in objects.
        </InfoBox>
      </Section>

      <Section title="3. in Operator Type Guards">
        <p className="text-gray-700 dark:text-gray-300">
          The in operator checks if a property exists on an object, allowing
          TypeScript to narrow object types based on their properties.
        </p>

        <CodeBlock title="in operator type guard examples">
          {`// Basic in operator
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // animal is Fish
  } else {
    animal.fly();  // animal is Bird
  }
}

// in with optional properties
interface User {
  name: string;
  email?: string;
}

function printEmail(user: User) {
  if ("email" in user && user.email !== undefined) {
    console.log(user.email.toUpperCase());
  }
}

// in with discriminated unions
type Success = { status: "success"; data: string };
type Failure = { status: "error"; error: string };
type Result = Success | Failure;

function handle(result: Result) {
  if ("data" in result) {
    console.log(result.data); // Success
  } else {
    console.log(result.error); // Failure
  }
}

// Multiple property checks
type Cat = { meow: () => void; purr: () => void };
type Dog = { bark: () => void; wag: () => void };

function interact(animal: Cat | Dog) {
  if ("meow" in animal && "purr" in animal) {
    animal.meow();
    animal.purr();
  } else {
    animal.bark();
    animal.wag();
  }
}

// in with complex objects
interface Admin {
  role: "admin";
  permissions: string[];
}

interface User2 {
  role: "user";
}

function checkPermissions(user: Admin | User2) {
  if ("permissions" in user) {
    console.log(user.permissions); // Admin
  }
}

// in with intersection types
type HasId = { id: number };
type HasName = { name: string };

function process(value: HasId | HasName) {
  if ("id" in value && "name" in value) {
    // value is HasId & HasName
    console.log(value.id, value.name);
  }
}

// in doesn't check undefined values
interface Config {
  apiUrl: string;
  timeout?: number;
}

function configure(config: Config | { debug: boolean }) {
  if ("timeout" in config) {
    // config is Config, but timeout might still be undefined!
    const t = config.timeout; // number | undefined
  }
}

// in with arrays (checking index)
const arr = [1, 2, 3];
console.log(0 in arr);    // true
console.log(5 in arr);    // false
console.log("length" in arr); // true

// in with string keys
type Response = 
  | { type: "success"; data: string }
  | { type: "error"; message: string };

function handleResponse(res: Response) {
  if ("data" in res) {
    console.log(res.data);
  } else {
    console.log(res.message);
  }
}

// in with methods
interface Readable {
  read(): string;
}

interface Writable {
  write(data: string): void;
}

function process2(stream: Readable | Writable) {
  if ("read" in stream) {
    const data = stream.read();
  } else {
    stream.write("data");
  }
}

// in with prototype chain
class Base {
  baseMethod() {}
}

class Derived extends Base {
  derivedMethod() {}
}

const derived = new Derived();
console.log("baseMethod" in derived);    // true (inherited)
console.log("derivedMethod" in derived); // true

// in with Symbol keys
const symKey = Symbol("key");
type WithSymbol = { [symKey]: string };

function hasSymbol(obj: any): obj is WithSymbol {
  return symKey in obj;
}

// in with nested objects
type Deep = {
  user: {
    profile: {
      name: string;
    };
  };
};

function accessDeep(obj: unknown) {
  if (
    typeof obj === "object" &&
    obj !== null &&
    "user" in obj &&
    typeof obj.user === "object" &&
    obj.user !== null &&
    "profile" in obj.user
  ) {
    // Now we can safely access obj.user.profile
  }
}

// in with union of many types
type Multiple = 
  | { type: "a"; valueA: string }
  | { type: "b"; valueB: number }
  | { type: "c"; valueC: boolean };

function handleMultiple(obj: Multiple) {
  if ("valueA" in obj) {
    console.log(obj.valueA);
  } else if ("valueB" in obj) {
    console.log(obj.valueB);
  } else {
    console.log(obj.valueC);
  }
}

// Combining in with typeof
function process3(value: { data: string } | { count: number } | string) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if ("data" in value) {
    console.log(value.data);
  } else {
    console.log(value.count);
  }
}`}
        </CodeBlock>

        <InfoBox type="tip">
          The in operator is perfect for distinguishing object types based on
          their properties. It works with discriminated unions and can check for
          optional properties, but remember that a property existing doesn't
          mean it's not undefined.
        </InfoBox>
      </Section>

      <Section title="4. Custom Type Guards">
        <p className="text-gray-700 dark:text-gray-300">
          Custom type guards are user-defined functions that use the "is"
          keyword to tell TypeScript about type narrowing.
        </p>

        <CodeBlock title="Custom type guard examples">
          {`// Basic type predicate (is keyword)
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // value is string
  }
}

// Type guard for custom interface
interface User {
  id: number;
  name: string;
  email: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "email" in value &&
    typeof (value as User).id === "number" &&
    typeof (value as User).name === "string" &&
    typeof (value as User).email === "string"
  );
}

// Usage
function greetUser(value: unknown) {
  if (isUser(value)) {
    console.log(\`Hello, \${value.name}!\`);
  }
}

// Type guard for arrays
function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every(item => typeof item === "string")
  );
}

const data: unknown = ["a", "b", "c"];
if (isStringArray(data)) {
  data.forEach(str => console.log(str.toUpperCase()));
}

// Type guard for null/undefined
function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

const nullable: string | null = Math.random() > 0.5 ? "hello" : null;
if (isDefined(nullable)) {
  console.log(nullable.toUpperCase());
}

// Using with filter
const mixed: (string | null)[] = ["a", null, "b", null, "c"];
const strings = mixed.filter(isDefined); // string[]

// Type guard for literal types
type Status = "pending" | "active" | "complete";

function isStatus(value: string): value is Status {
  return value === "pending" || value === "active" || value === "complete";
}

function updateStatus(status: string) {
  if (isStatus(status)) {
    // status is "pending" | "active" | "complete"
  }
}

// Type guard for discriminated unions
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function isCircle(shape: Shape): shape is Extract<Shape, { kind: "circle" }> {
  return shape.kind === "circle";
}

function getArea(shape: Shape) {
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  }
  return shape.size ** 2;
}

// Generic type guards
function isArrayOf<T>(
  value: unknown,
  check: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(check);
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

const data2: unknown = [1, 2, 3];
if (isArrayOf(data2, isNumber)) {
  const sum = data2.reduce((a, b) => a + b, 0);
}

// Type guard for Error types
class ValidationError extends Error {
  field: string = "";
}

function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

try {
  throw new ValidationError("Invalid input");
} catch (error) {
  if (isValidationError(error)) {
    console.log(\`Error in field: \${error.field}\`);
  }
}

// Type guard with multiple checks
interface Admin {
  role: "admin";
  permissions: string[];
}

interface User2 {
  role: "user";
}

type Account = Admin | User2;

function isAdmin(account: Account): account is Admin {
  return account.role === "admin" && "permissions" in account;
}

// Type guard for promises
function isPromise<T = any>(value: unknown): value is Promise<T> {
  return (
    value instanceof Promise ||
    (typeof value === "object" &&
      value !== null &&
      "then" in value &&
      typeof (value as any).then === "function")
  );
}

// Type guard for record types
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Negated type guards
function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

const values: (number | null)[] = [1, null, 2, null, 3];
const numbers = values.filter(isNotNull); // number[]

// Type guard for union types
type StringOrNumber = string | number;

function isStringOrNumber(value: unknown): value is StringOrNumber {
  return typeof value === "string" || typeof value === "number";
}

// Complex validation type guard
interface Product {
  id: number;
  name: string;
  price: number;
  tags?: string[];
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.price === "number" &&
    (obj.tags === undefined || isArrayOf(obj.tags, isString))
  );
}

// Type guard with refinement
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  size: number;
}

type Shape2 = Circle | Square;

function isCircle2(shape: Shape2): shape is Circle {
  return shape.kind === "circle" && typeof shape.radius === "number";
}

// Type guard factory
function createIsArrayOf<T>(
  itemGuard: (item: unknown) => item is T
): (value: unknown) => value is T[] {
  return (value): value is T[] => {
    return Array.isArray(value) && value.every(itemGuard);
  };
}

const isNumberArray = createIsArrayOf(isNumber);
const isStringArray2 = createIsArrayOf(isString);`}
        </CodeBlock>

        <InfoBox type="important">
          Custom type guards use the <code>value is Type</code> return type to
          tell TypeScript about narrowing. They should perform runtime checks
          that match the type they claim to verify. Always validate thoroughly!
        </InfoBox>
      </Section>

      <Section title="5. Assertion Functions">
        <p className="text-gray-700 dark:text-gray-300">
          Assertion functions use the "asserts" keyword to throw errors if a
          condition isn't met, automatically narrowing types for the rest of the
          scope.
        </p>

        <CodeBlock title="Assertion function examples">
          {`// Basic assertion function
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg || "Assertion failed");
  }
}

function process(value: string | null) {
  assert(value !== null, "Value must not be null");
  // value is now string (null was asserted away)
  console.log(value.toUpperCase());
}

// Type predicate assertion
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new TypeError("Value must be a string");
  }
}

function upper(value: unknown) {
  assertIsString(value);
  // value is now string
  return value.toUpperCase();
}

// Asserting non-null
function assertDefined<T>(
  value: T | null | undefined,
  msg?: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(msg || "Value must be defined");
  }
}

function getLength(str: string | null) {
  assertDefined(str, "String is required");
  return str.length; // str is string
}

// Assertion with type guard
function assertIsUser(value: unknown): asserts value is User {
  if (!isUser(value)) {
    throw new Error("Value is not a User");
  }
}

function greet(value: unknown) {
  assertIsUser(value);
  // value is User
  console.log(\`Hello, \${value.name}!\`);
}

// Multiple assertions
function assertIsPositiveNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") {
    throw new TypeError("Must be a number");
  }
  if (value <= 0) {
    throw new RangeError("Must be positive");
  }
}

function calculateSquareRoot(value: unknown) {
  assertIsPositiveNumber(value);
  return Math.sqrt(value); // value is number and positive
}

// Assertion with object properties
interface Config {
  apiUrl: string;
  apiKey: string;
}

function assertValidConfig(config: Partial<Config>): asserts config is Config {
  if (!config.apiUrl) {
    throw new Error("apiUrl is required");
  }
  if (!config.apiKey) {
    throw new Error("apiKey is required");
  }
}

function initialize(config: Partial<Config>) {
  assertValidConfig(config);
  // config is now Config (all properties present)
  fetch(config.apiUrl, {
    headers: { Authorization: config.apiKey }
  });
}

// Conditional assertion
function assertCondition(
  condition: boolean,
  msg?: string
): asserts condition {
  if (!condition) {
    throw new Error(msg || "Condition not met");
  }
}

function divide(a: number, b: number): number {
  assertCondition(b !== 0, "Cannot divide by zero");
  return a / b;
}

// Generic assertion
function assertType<T>(
  value: unknown,
  guard: (value: unknown) => value is T,
  msg?: string
): asserts value is T {
  if (!guard(value)) {
    throw new Error(msg || "Type assertion failed");
  }
}

function handleValue(value: unknown) {
  assertType(value, isString, "Expected string");
  console.log(value.toUpperCase());
}

// Assertion with array elements
function assertAllStrings(arr: unknown[]): asserts arr is string[] {
  if (!arr.every(item => typeof item === "string")) {
    throw new Error("All items must be strings");
  }
}

function processArray(items: unknown[]) {
  assertAllStrings(items);
  // items is string[]
  items.forEach(item => console.log(item.toUpperCase()));
}

// Assertion for never (exhaustive check)
function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

type Status2 = "idle" | "loading" | "success";

function handle(status: Status2) {
  switch (status) {
    case "idle":
      return "Not started";
    case "loading":
      return "In progress";
    case "success":
      return "Done";
    default:
      assertNever(status); // Compile error if status not exhausted
  }
}

// Assertion with custom errors
class AssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AssertionError";
  }
}

function strictAssert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(msg || "Strict assertion failed");
  }
}

// Assertion in class
class Validator {
  assertString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
      throw new Error("Must be string");
    }
  }

  validate(input: unknown) {
    this.assertString(input);
    return input.toUpperCase();
  }
}

// Assertion for discriminated unions
type Result = 
  | { success: true; data: string }
  | { success: false; error: string };

function assertSuccess(result: Result): asserts result is Extract<Result, { success: true }> {
  if (!result.success) {
    throw new Error(result.error);
  }
}

function getData(result: Result): string {
  assertSuccess(result);
  return result.data; // result is success type
}

// Combining type guards and assertions
function ensureNumber(value: unknown): number {
  assertType(value, isNumber, "Value must be a number");
  return value; // TypeScript knows it's number
}

// Assertion with message formatting
function assertWithContext(
  condition: any,
  context: Record<string, unknown>
): asserts condition {
  if (!condition) {
    const msg = \`Assertion failed with context: \${JSON.stringify(context)}\`;
    throw new Error(msg);
  }
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Assertion functions are powerful for enforcing invariants and
          narrowing types. Use <code>asserts condition</code> for boolean
          conditions and <code>asserts value is Type</code> for type narrowing.
          They throw errors, so use them for conditions that should never be
          false.
        </InfoBox>
      </Section>
    </div>
  );
}
