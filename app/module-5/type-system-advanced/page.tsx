import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeSystemAdvancedPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Advanced Type System
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript's type system includes structural typing, type compatibility
        rules, advanced type inference, and control flow analysis for
        sophisticated type checking.
      </p>

      <Section title="1. Type Compatibility & Structural Typing">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript uses structural typing (duck typing) rather than nominal
          typing. Types are compatible based on their structure, not their
          names.
        </p>

        <CodeBlock title="Type compatibility examples">
          {`// Structural typing basics
interface Point {
  x: number;
  y: number;
}

interface Vector {
  x: number;
  y: number;
}

// Compatible because structure matches
const point: Point = { x: 10, y: 20 };
const vector: Vector = point;  // ✓ OK

// Extra properties are allowed
interface Named {
  name: string;
}

const person = { name: "John", age: 30 };
const named: Named = person;  // ✓ OK, has required 'name' property

// Object literal excess property check
const named2: Named = { name: "John", age: 30 };  // ✗ Error: excess property 'age'

// Workaround: assign to variable first
const temp = { name: "John", age: 30 };
const named3: Named = temp;  // ✓ OK

// Function compatibility
type Handler1 = (a: number, b: string) => void;
type Handler2 = (a: number) => void;

const handler1: Handler1 = (a, b) => {};
const handler2: Handler2 = handler1;  // ✓ OK: fewer parameters

// Return type compatibility
type Fn1 = () => { name: string; age: number };
type Fn2 = () => { name: string };

const fn1: Fn1 = () => ({ name: "John", age: 30 });
const fn2: Fn2 = fn1;  // ✓ OK: return type is compatible

// Bivariance in function parameters (methods)
class Animal {
  name: string = "";
}

class Dog extends Animal {
  breed: string = "";
}

interface AnimalHandler {
  handle(animal: Animal): void;
}

interface DogHandler {
  handle(dog: Dog): void;
}

// Methods are bivariant
const dogHandler: DogHandler = {
  handle: (dog) => console.log(dog.breed)
};

const animalHandler: AnimalHandler = dogHandler;  // ✓ OK (unsafe!)

// Function parameters are contravariant in strict mode
type AnimalFn = (animal: Animal) => void;
type DogFn = (dog: Dog) => void;

const animalFn: AnimalFn = (animal) => {};
// const dogFn: DogFn = animalFn;  // ✗ Error in strict mode

// Enum compatibility
enum Status {
  Active,
  Inactive
}

enum State {
  Active,
  Inactive
}

let status: Status = Status.Active;
// let state: State = status;  // ✗ Error: enums are not compatible

// But compatible with numbers
let num: number = Status.Active;  // ✓ OK
status = 0;  // ✓ OK

// String enums are not compatible with strings
enum Color {
  Red = "RED",
  Green = "GREEN"
}

// let str: string = Color.Red;  // ✗ Error
let col: Color = "RED" as Color;  // Requires assertion

// Class compatibility
class Point2D {
  constructor(public x: number, public y: number) {}
}

class Vector2D {
  constructor(public x: number, public y: number) {}
}

// Compatible: same structure
const p: Point2D = new Vector2D(1, 2);  // ✓ OK

// Private/protected members affect compatibility
class PointWithPrivate {
  private id: number = 0;
  constructor(public x: number, public y: number) {}
}

class VectorWithPrivate {
  private id: number = 0;
  constructor(public x: number, public y: number) {}
}

const p1 = new PointWithPrivate(1, 2);
// const p2: PointWithPrivate = new VectorWithPrivate(1, 2);  // ✗ Error: private members

// Generic compatibility
interface Box<T> {
  value: T;
}

let numBox: Box<number> = { value: 42 };
// let strBox: Box<string> = numBox;  // ✗ Error: incompatible

// Empty generic types are compatible
interface Empty<T> {
  // No members using T
}

let empty1: Empty<number> = {};
let empty2: Empty<string> = empty1;  // ✓ OK: structure is the same

// Optional properties
interface Optional {
  name?: string;
}

interface Required {
  name: string;
}

const req: Required = { name: "John" };
const opt: Optional = req;  // ✓ OK

// const req2: Required = {};  // ✗ Error: missing 'name'
// const req3: Required = { name: undefined };  // ✗ Error

// Index signatures
interface StringMap {
  [key: string]: string;
}

const map1 = { name: "John", age: "30" };
const map2: StringMap = map1;  // ✓ OK

// Union compatibility
type Result = { success: true; data: string } | { success: false; error: string };

function handle(result: Result) {
  if (result.success) {
    console.log(result.data);
  } else {
    console.log(result.error);
  }
}

// Both branches are compatible
handle({ success: true, data: "OK" });
handle({ success: false, error: "Failed" });

// Freshness check (excess property checking)
interface Config {
  url: string;
  timeout?: number;
}

// Direct assignment: strict
// const cfg: Config = { url: "...", retries: 3 };  // ✗ Error: excess 'retries'

// Via variable: lenient
const temp2 = { url: "...", retries: 3 };
const cfg: Config = temp2;  // ✓ OK

// Type assertions bypass freshness
const cfg2: Config = { url: "...", retries: 3 } as Config;  // ✓ OK

// Array compatibility
let nums: number[] = [1, 2, 3];
let values: (number | string)[] = nums;  // ✓ OK: number[] is subset

// Tuple compatibility
let tuple: [string, number] = ["hello", 42];
let arr: (string | number)[] = tuple;  // ✓ OK

// Never is compatible with everything
function throwError(): never {
  throw new Error("Error");
}

const value1: string = throwError();  // ✓ OK
const value2: number = throwError();  // ✓ OK

// Any breaks type safety
let anything: any = "string";
const num2: number = anything;  // ✓ OK (unsafe!)

// Unknown requires type checking
let unknown: unknown = "string";
// const str2: string = unknown;  // ✗ Error
if (typeof unknown === "string") {
  const str2: string = unknown;  // ✓ OK
}`}
        </CodeBlock>

        <InfoBox type="info">
          TypeScript uses structural typing where types are compatible based on
          structure, not names. Understand function compatibility rules,
          bivariance, enum compatibility, and freshness checks for robust
          typing.
        </InfoBox>
      </Section>

      <Section title="2. Type Inference">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript infers types automatically in many situations.
          Understanding inference helps write less verbose code while
          maintaining type safety.
        </p>

        <CodeBlock title="Type inference examples">
          {`// Basic type inference
let str = "hello";  // string
let num = 42;  // number
let bool = true;  // boolean

// Best common type
let arr = [1, 2, 3];  // number[]
let mixed = [1, "two", true];  // (string | number | boolean)[]

// With null/undefined
let nullable = [1, 2, null];  // (number | null)[]

// Object literal inference
const user = {
  name: "John",
  age: 30,
  email: "john@example.com"
};
// Type: { name: string; age: number; email: string }

// Const inference
const point = { x: 10, y: 20 };  // { x: number; y: number }
const point2 = { x: 10, y: 20 } as const;  // { readonly x: 10; readonly y: 20 }

// Array const inference
const colors = ["red", "green", "blue"];  // string[]
const colors2 = ["red", "green", "blue"] as const;  // readonly ["red", "green", "blue"]

// Function return type inference
function add(a: number, b: number) {
  return a + b;  // Returns number
}

function greet(name: string) {
  return \`Hello, \${name}\`;  // Returns string
}

// Async function inference
async function fetchUser() {
  return { id: 1, name: "John" };
}
// Returns: Promise<{ id: number; name: string }>

// Contextual typing
const handler: (e: MouseEvent) => void = (e) => {
  // e is inferred as MouseEvent
  console.log(e.clientX);
};

// Array methods with contextual typing
const nums = [1, 2, 3];
nums.map(n => n * 2);  // n is inferred as number

// Object method contextual typing
const obj = {
  name: "John",
  greet() {
    return \`Hello, \${this.name}\`;  // this is inferred correctly
  }
};

// Generic type inference
function identity<T>(value: T): T {
  return value;
}

const result1 = identity(42);  // T is inferred as number
const result2 = identity("hello");  // T is inferred as string

// Multiple generics
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p = pair(1, "two");  // [number, string]

// Generic constraints with inference
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user2 = { name: "John", age: 30 };
const name = getProperty(user2, "name");  // string
const age = getProperty(user2, "age");  // number

// Conditional type inference
type Unwrap<T> = T extends Promise<infer U> ? U : T;

type A = Unwrap<Promise<string>>;  // string
type B = Unwrap<number>;  // number

// Infer in template literals
type ExtractParam<T extends string> = 
  T extends \`/users/\${infer ID}\` ? ID : never;

type UserID = ExtractParam<"/users/123">;  // "123"

// Tuple inference
function tuple<T extends any[]>(...args: T): T {
  return args;
}

const t1 = tuple(1, "two", true);  // [number, string, boolean]
const t2 = tuple(1, 2, 3);  // [number, number, number]

// Literal type widening
let x = "hello";  // string (widened)
const y = "hello";  // "hello" (literal)

let arr2 = [1, 2, 3];  // number[]
const arr3 = [1, 2, 3];  // still number[], not tuple

// Prevent widening
let z = "hello" as const;  // "hello"
let arr4 = [1, 2, 3] as const;  // readonly [1, 2, 3]

// Inference from context
interface Config {
  url: string;
  timeout: number;
}

const configs: Config[] = [
  { url: "...", timeout: 5000 },  // Inferred from array type
  { url: "...", timeout: 3000 }
];

// Promise inference
Promise.resolve(42).then(value => {
  // value is inferred as number
  return value * 2;
});

// Inference with destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first: number, second: number, rest: number[]

const { name: userName, age: userAge } = { name: "John", age: 30 };
// userName: string, userAge: number

// Class property inference
class Container {
  value = 42;  // Inferred as number
  items = [1, 2, 3];  // Inferred as number[]
  
  getValue() {
    return this.value;  // Returns number
  }
}

// Generic class inference
class Box<T> {
  constructor(public value: T) {}
}

const box1 = new Box(42);  // Box<number>
const box2 = new Box("hello");  // Box<string>

// Inference with default parameters
function createUser(name: string, age = 30) {
  // age is inferred as number
  return { name, age };
}

const user3 = createUser("John");  // { name: string; age: number }

// Rest parameters inference
function sum(...numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
}

const total = sum(1, 2, 3, 4);  // number

// Discriminated union inference
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;  // shape.radius inferred
  } else {
    return shape.size ** 2;  // shape.size inferred
  }
}

// Recursive type inference
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

function parseJSON(json: string): JSONValue {
  return JSON.parse(json);
}

// Inference with mapped types
type Readonly<T> = { readonly [K in keyof T]: T[K] };

const obj2 = { name: "John", age: 30 };
const readonly = obj2 as Readonly<typeof obj2>;
// Type is inferred with readonly modifiers

// Best common type with supertype
class Animal { name = ""; }
class Dog extends Animal { breed = ""; }
class Cat extends Animal { meow() {} }

const animals = [new Dog(), new Cat()];  // Animal[]

// Explicit type for no common type
const mixed2: (Dog | Cat)[] = [new Dog(), new Cat()];`}
        </CodeBlock>

        <InfoBox type="tip">
          TypeScript infers types from values, context, and usage patterns. Use
          const assertions for literal types, contextual typing for callbacks,
          and understand widening rules for optimal type inference.
        </InfoBox>
      </Section>

      <Section title="3. Control Flow Analysis">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript analyzes control flow to narrow types, detect unreachable
          code, and ensure exhaustiveness in switch statements and conditionals.
        </p>

        <CodeBlock title="Control flow analysis examples">
          {`// Type narrowing with typeof
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();  // value is string
  } else {
    return value.toFixed(2);  // value is number
  }
}

// Type narrowing with instanceof
function handleError(error: Error | string) {
  if (error instanceof Error) {
    console.log(error.stack);  // error is Error
  } else {
    console.log(error);  // error is string
  }
}

// Type narrowing with in operator
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();  // animal is Fish
  } else {
    animal.fly();  // animal is Bird
  }
}

// Truthiness narrowing
function greet(name: string | null | undefined) {
  if (name) {
    console.log(\`Hello, \${name.toUpperCase()}\`);  // name is string
  } else {
    console.log("Hello, guest");  // name is null | undefined
  }
}

// Equality narrowing
function compare(x: string | number, y: string | boolean) {
  if (x === y) {
    // x and y are both string
    console.log(x.toUpperCase());
    console.log(y.toUpperCase());
  }
}

// Type predicates
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process2(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());  // value is string
  }
}

// Custom type guards
interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

function isCat(animal: Cat | Dog): animal is Cat {
  return "meow" in animal;
}

function speak(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow();  // animal is Cat
  } else {
    animal.bark();  // animal is Dog
  }
}

// Assertion functions
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string");
  }
}

function process3(value: unknown) {
  assertString(value);
  console.log(value.toUpperCase());  // value is string
}

// Assertion with this
class User {
  name?: string;

  assertName(): asserts this is this & { name: string } {
    if (!this.name) {
      throw new Error("Name is required");
    }
  }

  greet() {
    this.assertName();
    console.log(this.name.toUpperCase());  // name is defined
  }
}

// Unreachable code detection
function impossible(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

type Shape = { kind: "circle" } | { kind: "square" };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return 0;
    case "square":
      return 0;
    default:
      // If all cases are covered, shape is never here
      return impossible(shape);
  }
}

// Exhaustiveness checking
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      // Exhaustive: action is never
      const _exhaustive: never = action;
      return state;
  }
}

// Adding new case causes error
type Action2 =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "double" };  // New case

function reducer2(state: number, action: Action2): number {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      // Error: type 'double' not handled
      const _exhaustive: never = action;
      return state;
  }
}

// Discriminated union narrowing
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    console.log(result.data);  // result.data is T
  } else {
    console.log(result.error);  // result.error is string
  }
}

// Null/undefined narrowing
function getLength(str: string | null | undefined): number {
  if (str === null || str === undefined) {
    return 0;
  }
  return str.length;  // str is string
}

// Non-null assertion narrowing
function processValue(value?: string) {
  if (value != null) {  // Checks both null and undefined
    console.log(value.toUpperCase());  // value is string
  }
}

// Array narrowing with Array.isArray
function processArray(value: string | string[]) {
  if (Array.isArray(value)) {
    value.forEach(v => console.log(v));  // value is string[]
  } else {
    console.log(value.toUpperCase());  // value is string
  }
}

// Nested narrowing
type Complex =
  | { kind: "a"; value: string }
  | { kind: "b"; value: number }
  | { kind: "c"; value: boolean };

function handle(obj: Complex) {
  if (obj.kind === "a") {
    console.log(obj.value.toUpperCase());  // string
  } else if (obj.kind === "b") {
    console.log(obj.value.toFixed(2));  // number
  } else {
    console.log(obj.value ? "yes" : "no");  // boolean
  }
}

// Control flow with assignments
function example() {
  let value: string | number;
  
  if (Math.random() > 0.5) {
    value = "string";
  } else {
    value = 42;
  }
  
  // value is string | number here
  console.log(value);
}

// Narrowing with destructuring
type Props = { value?: string };

function Component({ value }: Props) {
  if (!value) return null;
  
  return value.toUpperCase();  // value is string
}

// CFA with return statements
function validate(input: string | null): string {
  if (input === null) {
    return "default";
  }
  
  return input.toUpperCase();  // input is string
}

// CFA with throw statements
function assertDefined<T>(value: T | undefined): T {
  if (value === undefined) {
    throw new Error("Value is undefined");
  }
  
  return value;  // value is T
}

// Multiple discriminants
type Message =
  | { type: "text"; content: string }
  | { type: "image"; url: string; alt?: string }
  | { type: "video"; url: string; duration: number };

function renderMessage(msg: Message) {
  switch (msg.type) {
    case "text":
      return msg.content;
    case "image":
      return \`<img src="\${msg.url}" alt="\${msg.alt ?? ''}" />\`;
    case "video":
      return \`<video src="\${msg.url}" duration="\${msg.duration}" />\`;
  }
}

// Loop control flow
function findFirst(arr: (string | number)[]): string | undefined {
  for (const item of arr) {
    if (typeof item === "string") {
      return item;  // item is string
    }
  }
  return undefined;
}`}
        </CodeBlock>

        <InfoBox type="important">
          Control flow analysis narrows types based on conditionals, type
          guards, and assertions. Use exhaustiveness checking with never type to
          ensure all cases are handled. TypeScript tracks type narrowing through
          code paths.
        </InfoBox>
      </Section>

      <Section title="4. Discriminated Unions & Brand Types">
        <p className="text-gray-700 dark:text-gray-300">
          Discriminated unions enable type-safe state management with exhaustive
          checking. Brand types create nominal typing for primitive types.
        </p>

        <CodeBlock title="Discriminated unions and brand types">
          {`// Basic discriminated union
type NetworkState =
  | { state: "loading" }
  | { state: "success"; response: string }
  | { state: "error"; error: Error };

function handleState(network: NetworkState) {
  switch (network.state) {
    case "loading":
      return "Loading...";
    case "success":
      return network.response;  // response is available
    case "error":
      return network.error.message;  // error is available
  }
}

// Async operation states
type AsyncState<T, E = Error> =
  | { status: "idle" }
  | { status: "loading"; progress?: number }
  | { status: "success"; data: T }
  | { status: "error"; error: E };

function renderData<T>(state: AsyncState<T>) {
  switch (state.status) {
    case "idle":
      return "Not started";
    case "loading":
      return \`Loading\${state.progress ? \` \${state.progress}%\` : "..."}\`;
    case "success":
      return JSON.stringify(state.data);
    case "error":
      return \`Error: \${state.error.message}\`;
  }
}

// Redux-style actions
type Action =
  | { type: "SET_USER"; payload: { id: number; name: string } }
  | { type: "REMOVE_USER" }
  | { type: "UPDATE_USER"; payload: { id: number; name: string } }
  | { type: "FETCH_USERS_REQUEST" }
  | { type: "FETCH_USERS_SUCCESS"; payload: User[] }
  | { type: "FETCH_USERS_FAILURE"; error: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "REMOVE_USER":
      return { ...state, user: null };
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "FETCH_USERS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_USERS_SUCCESS":
      return { ...state, loading: false, users: action.payload };
    case "FETCH_USERS_FAILURE":
      return { ...state, loading: false, error: action.error };
  }
}

// Form validation states
type ValidationResult =
  | { valid: true; value: string }
  | { valid: false; errors: string[] };

function validateEmail(email: string): ValidationResult {
  if (!email.includes("@")) {
    return { valid: false, errors: ["Invalid email format"] };
  }
  return { valid: true, value: email };
}

function handleValidation(result: ValidationResult) {
  if (result.valid) {
    console.log("Valid:", result.value);
  } else {
    console.log("Errors:", result.errors.join(", "));
  }
}

// Brand types (Nominal typing)
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<number, "UserId">;
type PostId = Brand<number, "PostId">;
type Email = Brand<string, "Email">;
type UUID = Brand<string, "UUID">;

// Helper functions to create branded types
function createUserId(id: number): UserId {
  return id as UserId;
}

function createPostId(id: number): PostId {
  return id as PostId;
}

function createEmail(email: string): Email {
  if (!email.includes("@")) {
    throw new Error("Invalid email");
  }
  return email as Email;
}

// Type-safe usage
function getUser(id: UserId): User {
  // id is guaranteed to be a UserId
  return {} as User;
}

function getPost(id: PostId): Post {
  // id is guaranteed to be a PostId
  return {} as Post;
}

const userId = createUserId(1);
const postId = createPostId(1);

getUser(userId);  // ✓ OK
// getUser(postId);  // ✗ Error: PostId not assignable to UserId
// getUser(1);  // ✗ Error: number not assignable to UserId

// Phantom types
type Validated<T> = T & { __validated: true };

function validate<T>(value: T, validator: (v: T) => boolean): Validated<T> | null {
  return validator(value) ? (value as Validated<T>) : null;
}

function processValidated(value: Validated<string>) {
  // value is guaranteed to be validated
  console.log(value.toUpperCase());
}

const validated = validate("hello", s => s.length > 0);
if (validated) {
  processValidated(validated);
}

// Opaque types
type Opaque<T, K> = T & { readonly __TYPE__: K };

type PositiveNumber = Opaque<number, "PositiveNumber">;
type NegativeNumber = Opaque<number, "NegativeNumber">;

function makePositive(n: number): PositiveNumber | null {
  return n > 0 ? (n as PositiveNumber) : null;
}

function makeNegative(n: number): NegativeNumber | null {
  return n < 0 ? (n as NegativeNumber) : null;
}

const pos = makePositive(5);
const neg = makeNegative(-5);

// Can't mix them
function addPositive(a: PositiveNumber, b: PositiveNumber): PositiveNumber {
  return (a + b) as PositiveNumber;
}

// Result type pattern
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { ok: false, error: "Division by zero" };
  }
  return { ok: true, value: a / b };
}

function handleResult2(result: Result<number, string>) {
  if (result.ok) {
    console.log("Result:", result.value);
  } else {
    console.log("Error:", result.error);
  }
}

// Option/Maybe type
type Option<T> =
  | { type: "some"; value: T }
  | { type: "none" };

function find<T>(arr: T[], predicate: (item: T) => boolean): Option<T> {
  const item = arr.find(predicate);
  return item !== undefined
    ? { type: "some", value: item }
    : { type: "none" };
}

function handleOption<T>(option: Option<T>) {
  if (option.type === "some") {
    console.log("Found:", option.value);
  } else {
    console.log("Not found");
  }
}

// FSM with discriminated unions
type TrafficLightState =
  | { light: "red"; timer: number }
  | { light: "yellow"; timer: number }
  | { light: "green"; timer: number };

type TrafficLightEvent =
  | { type: "TIMER_TICK" }
  | { type: "EMERGENCY_OVERRIDE" };

function trafficLightReducer(
  state: TrafficLightState,
  event: TrafficLightEvent
): TrafficLightState {
  switch (event.type) {
    case "TIMER_TICK":
      if (state.timer > 0) {
        return { ...state, timer: state.timer - 1 };
      }
      switch (state.light) {
        case "red":
          return { light: "green", timer: 30 };
        case "yellow":
          return { light: "red", timer: 60 };
        case "green":
          return { light: "yellow", timer: 5 };
      }
    case "EMERGENCY_OVERRIDE":
      return { light: "red", timer: 120 };
  }
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Discriminated unions provide type-safe state machines with exhaustive
          checking. Brand types add nominal typing to primitives for domain
          modeling. Use them for state management, validation, and type safety.
        </InfoBox>
      </Section>

      <Section title="5. Practical Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world patterns combining type system features for robust,
          maintainable code with excellent type inference and safety.
        </p>

        <CodeBlock title="Practical advanced type patterns">
          {`// Type-safe event emitter with discriminated unions
type EventMap = {
  "user:login": { userId: number; timestamp: Date };
  "user:logout": { userId: number };
  "data:update": { type: string; data: any };
};

type EventType = keyof EventMap;
type EventData<T extends EventType> = EventMap[T];

class TypedEventEmitter {
  private listeners = new Map<EventType, Set<Function>>();

  on<T extends EventType>(event: T, handler: (data: EventData<T>) => void): void {
    const handlers = this.listeners.get(event) ?? new Set();
    handlers.add(handler);
    this.listeners.set(event, handlers);
  }

  emit<T extends EventType>(event: T, data: EventData<T>): void {
    const handlers = this.listeners.get(event) ?? new Set();
    handlers.forEach(handler => handler(data));
  }
}

const emitter = new TypedEventEmitter();
emitter.on("user:login", (data) => {
  console.log(data.userId, data.timestamp);  // Type-safe!
});

// State machine with exhaustiveness
type LoadingState<T> =
  | { phase: "initial" }
  | { phase: "loading"; startTime: number }
  | { phase: "loaded"; data: T; loadTime: number }
  | { phase: "error"; error: Error; retryCount: number };

type LoadingEvent =
  | { type: "START_LOADING" }
  | { type: "LOAD_SUCCESS"; data: any }
  | { type: "LOAD_ERROR"; error: Error }
  | { type: "RETRY" };

function loadingReducer<T>(
  state: LoadingState<T>,
  event: LoadingEvent
): LoadingState<T> {
  switch (event.type) {
    case "START_LOADING":
      return { phase: "loading", startTime: Date.now() };
    case "LOAD_SUCCESS":
      return {
        phase: "loaded",
        data: event.data,
        loadTime: Date.now() - (state.phase === "loading" ? state.startTime : 0)
      };
    case "LOAD_ERROR":
      return {
        phase: "error",
        error: event.error,
        retryCount: state.phase === "error" ? state.retryCount + 1 : 0
      };
    case "RETRY":
      return { phase: "initial" };
    default:
      const _exhaustive: never = event;
      return state;
  }
}

// Branded validation types
type ValidatedEmail = Brand<string, "ValidatedEmail">;
type ValidatedPhone = Brand<string, "ValidatedPhone">;
type ValidatedURL = Brand<string, "ValidatedURL">;

function validateEmail(email: string): Result<ValidatedEmail> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: new Error("Invalid email") };
  }
  return { ok: true, value: email as ValidatedEmail };
}

function sendEmail(to: ValidatedEmail, subject: string, body: string) {
  // to is guaranteed to be a valid email
}

// Type-safe builder with branded types
class UserBuilder {
  private data: Partial<{
    id: UserId;
    email: ValidatedEmail;
    name: string;
  }> = {};

  setId(id: number): this {
    this.data.id = createUserId(id);
    return this;
  }

  setEmail(email: string): Result<this, string> {
    const validated = validateEmail(email);
    if (!validated.ok) {
      return { ok: false, error: validated.error.message };
    }
    this.data.email = validated.value;
    return { ok: true, value: this };
  }

  setName(name: string): this {
    this.data.name = name;
    return this;
  }

  build(): Result<User, string> {
    if (!this.data.id || !this.data.email || !this.data.name) {
      return { ok: false, error: "Missing required fields" };
    }
    return {
      ok: true,
      value: {
        id: this.data.id,
        email: this.data.email,
        name: this.data.name
      } as User
    };
  }
}

// Parser combinator with discriminated unions
type ParseResult<T> =
  | { success: true; value: T; rest: string }
  | { success: false; error: string; position: number };

type Parser<T> = (input: string) => ParseResult<T>;

function char(expected: string): Parser<string> {
  return (input) => {
    if (input[0] === expected) {
      return { success: true, value: expected, rest: input.slice(1) };
    }
    return { success: false, error: \`Expected '\${expected}'\`, position: 0 };
  };
}

function sequence<T extends any[]>(
  ...parsers: { [K in keyof T]: Parser<T[K]> }
): Parser<T> {
  return (input) => {
    const results: any[] = [];
    let remaining = input;
    
    for (const parser of parsers) {
      const result = parser(remaining);
      if (!result.success) return result as any;
      results.push(result.value);
      remaining = result.rest;
    }
    
    return { success: true, value: results as T, rest: remaining };
  };
}`}
        </CodeBlock>

        <InfoBox type="important">
          Combine structural typing, type inference, control flow analysis,
          discriminated unions, and brand types for type-safe, maintainable
          systems. Use exhaustiveness checking to ensure all cases are handled.
        </InfoBox>
      </Section>
    </div>
  );
}
