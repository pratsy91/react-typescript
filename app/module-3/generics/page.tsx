import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function GenericsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Generics
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Generics enable you to create reusable components that work with
        multiple types while maintaining type safety. They're fundamental to
        writing flexible, type-safe code in TypeScript.
      </p>

      <Section title="1. Generic Functions">
        <p className="text-gray-700 dark:text-gray-300">
          Generic functions use type parameters to create functions that work
          with any type while preserving type information.
        </p>

        <CodeBlock title="Generic function examples">
          {`// Basic generic function
function identity<T>(value: T): T {
  return value;
}

const num = identity(42);         // T is number
const str = identity("hello");    // T is string
const bool = identity(true);      // T is boolean

// Explicit type parameter
const explicit = identity<string>("hello");

// Generic with array
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const first1 = firstElement([1, 2, 3]);      // number | undefined
const first2 = firstElement(["a", "b"]);     // string | undefined

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p1 = pair(1, "hello");      // [number, string]
const p2 = pair(true, 42);        // [boolean, number]

// Generic with explicit return type
function wrap<T>(value: T): { value: T } {
  return { value };
}

const wrapped1 = wrap(42);        // { value: number }
const wrapped2 = wrap("hello");   // { value: string }

// Generic array methods
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const numbers = [1, 2, 3];
const strings = map(numbers, n => n.toString());  // string[]
const doubled = map(numbers, n => n * 2);         // number[]

// Generic with multiple parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "John" }, { age: 30 });
// { name: string; age: number }

// Generic filter
function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

const evens = filter([1, 2, 3, 4], n => n % 2 === 0);  // number[]

// Generic reduce
function reduce<T, U>(
  arr: T[],
  fn: (acc: U, item: T) => U,
  initial: U
): U {
  return arr.reduce(fn, initial);
}

const sum = reduce([1, 2, 3], (acc, n) => acc + n, 0);  // number

// Generic promise function
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

// Usage with explicit type
interface User {
  id: number;
  name: string;
}

const user = await fetchData<User>("/api/user");  // User

// Generic with default type
function create<T = string>(value: T): T {
  return value;
}

const auto = create("hello");   // string (inferred)
const explicit2 = create<number>(42);  // number

// Generic with rest parameters
function concat<T>(...arrays: T[][]): T[] {
  return arrays.flat();
}

const combined = concat([1, 2], [3, 4], [5, 6]);  // number[]

// Generic curried function
function curry<T, U, R>(fn: (a: T, b: U) => R) {
  return (a: T) => (b: U) => fn(a, b);
}

const add = (a: number, b: number) => a + b;
const curriedAdd = curry(add);
const add5 = curriedAdd(5);
const result = add5(10);  // 15

// Generic with type guards
function isArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value);
}

function process<T>(value: T | T[]): T[] {
  if (isArray(value)) {
    return value;
  }
  return [value];
}`}
        </CodeBlock>

        <InfoBox type="info">
          Generic functions use angle brackets &lt;T&gt; to declare type
          parameters. TypeScript usually infers these types, but you can provide
          them explicitly when needed.
        </InfoBox>
      </Section>

      <Section title="2. Generic Interfaces">
        <p className="text-gray-700 dark:text-gray-300">
          Generic interfaces allow you to create flexible, reusable interface
          definitions that work with multiple types.
        </p>

        <CodeBlock title="Generic interface examples">
          {`// Basic generic interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };

// Generic interface with methods
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

const container: Container<number> = {
  value: 0,
  getValue() {
    return this.value;
  },
  setValue(value) {
    this.value = value;
  }
};

// Multiple type parameters
interface Pair<K, V> {
  key: K;
  value: V;
}

const pair: Pair<string, number> = {
  key: "age",
  value: 30
};

// Generic interface with optional properties
interface Result<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

const result1: Result<User> = {
  data: { id: 1, name: "John" },
  loading: false
};

const result2: Result<string> = {
  error: "Failed to load",
  loading: false
};

// Generic interface extending another
interface Response<T> {
  data: T;
  status: number;
}

interface ApiResponse<T> extends Response<T> {
  message: string;
  timestamp: Date;
}

// Generic interface with index signature
interface Dictionary<T> {
  [key: string]: T;
}

const stringDict: Dictionary<string> = {
  name: "John",
  city: "NYC"
};

const numberDict: Dictionary<number> = {
  age: 30,
  score: 95
};

// Generic interface for functions
interface Transformer<T, U> {
  (input: T): U;
}

const toString: Transformer<number, string> = (n) => n.toString();
const double: Transformer<number, number> = (n) => n * 2;

// Generic interface with constructor
interface Constructor<T> {
  new (...args: any[]): T;
}

function create<T>(ctor: Constructor<T>): T {
  return new ctor();
}

// Generic interface with readonly
interface ReadonlyBox<T> {
  readonly value: T;
}

const box: ReadonlyBox<number> = { value: 42 };
// box.value = 50;  // Error: readonly

// Generic interface with optional methods
interface Validator<T> {
  validate(value: T): boolean;
  format?(value: T): string;
  parse?(input: string): T;
}

// Generic interface for collections
interface Collection<T> {
  items: T[];
  add(item: T): void;
  remove(item: T): void;
  find(predicate: (item: T) => boolean): T | undefined;
  map<U>(fn: (item: T) => U): Collection<U>;
}

// Generic interface for async operations
interface AsyncOperation<T> {
  execute(): Promise<T>;
  cancel(): void;
  onComplete(callback: (result: T) => void): void;
  onError(callback: (error: Error) => void): void;
}

// Generic interface with discriminated union
interface Success<T> {
  status: "success";
  data: T;
}

interface Failure {
  status: "error";
  error: string;
}

type AsyncResult<T> = Success<T> | Failure;

// Generic interface with nested generics
interface Tree<T> {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
}

const tree: Tree<number> = {
  value: 10,
  left: { value: 5 },
  right: { value: 15 }
};

// Generic interface for state management
interface State<T> {
  data: T;
  setState(newState: Partial<T>): void;
  getState(): T;
  subscribe(listener: (state: T) => void): () => void;
}

// Generic interface with callbacks
interface EventEmitter<T> {
  on(event: string, handler: (data: T) => void): void;
  off(event: string, handler: (data: T) => void): void;
  emit(event: string, data: T): void;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Generic interfaces are perfect for creating reusable data structures,
          API responses, and type-safe collections. They maintain type safety
          while providing flexibility.
        </InfoBox>
      </Section>

      <Section title="3. Generic Classes">
        <p className="text-gray-700 dark:text-gray-300">
          Generic classes allow you to create class definitions that work with
          multiple types, maintaining type safety across instance properties and
          methods.
        </p>

        <CodeBlock title="Generic class examples">
          {`// Basic generic class
class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box(42);        // Box<number>
const stringBox = new Box("hello");   // Box<string>

// Generic class with multiple type parameters
class Pair<K, V> {
  constructor(public key: K, public value: V) {}

  getKey(): K {
    return this.key;
  }

  getValue(): V {
    return this.value;
  }
}

const pair = new Pair("age", 30);  // Pair<string, number>

// Generic class with methods
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop());  // 2

// Generic class with static methods
class ArrayUtils<T> {
  constructor(private array: T[]) {}

  static create<U>(items: U[]): ArrayUtils<U> {
    return new ArrayUtils(items);
  }

  map<U>(fn: (item: T) => U): ArrayUtils<U> {
    return new ArrayUtils(this.array.map(fn));
  }

  filter(predicate: (item: T) => boolean): ArrayUtils<T> {
    return new ArrayUtils(this.array.filter(predicate));
  }

  toArray(): T[] {
    return [...this.array];
  }
}

// Generic class extending generic class
class NumberBox extends Box<number> {
  double(): number {
    return this.value * 2;
  }
}

// Generic class implementing generic interface
interface Repository<T> {
  find(id: number): Promise<T | undefined>;
  findAll(): Promise<T[]>;
  save(item: T): Promise<T>;
  delete(id: number): Promise<void>;
}

class UserRepository implements Repository<User> {
  async find(id: number): Promise<User | undefined> {
    // Implementation
    return undefined;
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  async save(user: User): Promise<User> {
    return user;
  }

  async delete(id: number): Promise<void> {
    // Implementation
  }
}

// Generic class with constraints
class Comparable<T extends { toString(): string }> {
  constructor(private value: T) {}

  compareTo(other: T): string {
    return this.value.toString() === other.toString() ? "equal" : "different";
  }
}

// Generic class with private type parameter
class SecretBox<T> {
  private secret: T;

  constructor(value: T) {
    this.secret = value;
  }

  reveal(): T {
    return this.secret;
  }
}

// Generic class for data validation
class Validator<T> {
  constructor(private rules: Array<(value: T) => boolean>) {}

  validate(value: T): boolean {
    return this.rules.every(rule => rule(value));
  }

  addRule(rule: (value: T) => boolean): this {
    this.rules.push(rule);
    return this;
  }
}

const numberValidator = new Validator<number>([
  n => n > 0,
  n => n < 100
]);

// Generic class with factory method
class Optional<T> {
  private constructor(private value: T | null) {}

  static of<U>(value: U): Optional<U> {
    return new Optional(value);
  }

  static empty<U>(): Optional<U> {
    return new Optional<U>(null);
  }

  isPresent(): boolean {
    return this.value !== null;
  }

  get(): T {
    if (this.value === null) {
      throw new Error("No value present");
    }
    return this.value;
  }

  orElse(defaultValue: T): T {
    return this.value ?? defaultValue;
  }

  map<U>(fn: (value: T) => U): Optional<U> {
    if (this.value === null) {
      return Optional.empty();
    }
    return Optional.of(fn(this.value));
  }
}

// Generic class with builder pattern
class QueryBuilder<T> {
  private conditions: string[] = [];

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: keyof T): this {
    // Implementation
    return this;
  }

  limit(count: number): this {
    // Implementation
    return this;
  }

  execute(): Promise<T[]> {
    // Implementation
    return Promise.resolve([]);
  }
}

// Generic class with events
class Observable<T> {
  private observers: Array<(value: T) => void> = [];
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  subscribe(observer: (value: T) => void): () => void {
    this.observers.push(observer);
    return () => {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  next(value: T): void {
    this.value = value;
    this.observers.forEach(observer => observer(value));
  }

  getValue(): T {
    return this.value;
  }
}`}
        </CodeBlock>

        <InfoBox type="important">
          Generic classes are perfect for creating reusable data structures,
          collections, and utilities. Use them for stacks, queues, repositories,
          and other type-safe containers.
        </InfoBox>
      </Section>

      <Section title="4. Generic Constraints">
        <p className="text-gray-700 dark:text-gray-300">
          Generic constraints use the extends keyword to limit the types that
          can be used with a generic, ensuring specific properties or methods
          exist.
        </p>

        <CodeBlock title="Generic constraint examples">
          {`// Basic constraint
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");      // OK: string has length
getLength([1, 2, 3]);    // OK: array has length
// getLength(42);        // Error: number doesn't have length

// Constraint to specific type
function processNumber<T extends number>(value: T): T {
  return value;
}

processNumber(42);       // OK
// processNumber("42");  // Error: string not assignable to number

// Constraint with interface
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Keyof constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name");  // string
const age = getProperty(user, "age");    // number
// getProperty(user, "invalid");         // Error: not a key of user

// Multiple constraints
interface Printable {
  toString(): string;
}

interface Comparable {
  compareTo(other: any): number;
}

function process<T extends Printable & Comparable>(value: T): void {
  console.log(value.toString());
  value.compareTo(value);
}

// Constraint with union
function handle<T extends string | number>(value: T): T {
  return value;
}

handle("hello");  // OK
handle(42);       // OK
// handle(true);  // Error: boolean not in union

// Constructor constraint
interface Constructor<T> {
  new (...args: any[]): T;
}

function create<T>(ctor: Constructor<T>, ...args: any[]): T {
  return new ctor(...args);
}

class Person {
  constructor(public name: string) {}
}

const person = create(Person, "John");

// Constraint with generic
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// Array constraint
function firstElement<T extends any[]>(arr: T): T[0] {
  return arr[0];
}

const first = firstElement([1, 2, 3]);  // number

// Recursive constraint
interface TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];
}

function traverse<T extends TreeNode<any>>(node: T): void {
  console.log(node.value);
  node.children?.forEach(traverse);
}

// Constraint with conditional
function wrap<T extends string | number>(
  value: T
): T extends string ? { text: T } : { num: T } {
  if (typeof value === "string") {
    return { text: value } as any;
  }
  return { num: value } as any;
}

// Constraint to exclude types
type NonNullable<T> = T extends null | undefined ? never : T;

function process2<T>(value: NonNullable<T>): NonNullable<T> {
  return value;
}

// Constraint with literal types
function create2<T extends "user" | "admin">(type: T): T {
  return type;
}

create2("user");   // OK
// create2("guest"); // Error

// Constraint with template literals
function handle2<T extends \`on\${string}\`>(event: T): void {
  console.log(event);
}

handle2("onClick");   // OK
handle2("onHover");   // OK
// handle2("click");  // Error: doesn't match pattern

// Nested constraints
function process3<T extends { value: { nested: number } }>(obj: T): number {
  return obj.value.nested;
}

// Constraint with methods
interface Serializable {
  toJSON(): object;
}

function serialize<T extends Serializable>(obj: T): string {
  return JSON.stringify(obj.toJSON());
}

// Constraint to base class
class Animal {}

class Dog extends Animal {}

function handleAnimal<T extends Animal>(animal: T): T {
  return animal;
}

handleAnimal(new Dog());  // OK
// handleAnimal({});      // Error: not an Animal

// Constraint with tuple
function reverse<T extends readonly any[]>(
  arr: T
): [...T] {
  return [...arr].reverse() as [...T];
}

// Constraint with Record
function getValues<T extends Record<string, any>>(obj: T): Array<T[keyof T]> {
  return Object.values(obj);
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Use constraints to ensure generic type parameters have required
          properties or methods. The extends keyword narrows acceptable types
          while maintaining type safety.
        </InfoBox>
      </Section>

      <Section title="5. Default Generic Types">
        <p className="text-gray-700 dark:text-gray-300">
          Default generic types provide fallback types when type arguments
          aren't specified, making generics more convenient to use.
        </p>

        <CodeBlock title="Default generic type examples">
          {`// Basic default type
interface Container<T = string> {
  value: T;
}

const stringContainer: Container = { value: "hello" };  // T defaults to string
const numberContainer: Container<number> = { value: 42 };  // Explicit number

// Function with default type
function create<T = string>(value: T): T {
  return value;
}

const defaulted = create("hello");   // T is string (default)
const explicit = create<number>(42); // T is number (explicit)

// Multiple defaults
interface Result<T = unknown, E = Error> {
  data?: T;
  error?: E;
}

const result1: Result = {};  // Result<unknown, Error>
const result2: Result<string> = {};  // Result<string, Error>
const result3: Result<string, string> = {};  // Result<string, string>

// Default with constraint
interface Box<T extends number = number> {
  value: T;
}

const box1: Box = { value: 42 };  // Box<number>
const box2: Box<42> = { value: 42 };  // Box<42> (literal type)

// Class with default type
class Collection<T = any> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  getAll(): T[] {
    return this.items;
  }
}

const defaultCollection = new Collection();  // Collection<any>
const typedCollection = new Collection<number>();  // Collection<number>

// Default dependent on another type parameter
interface Pair<K, V = K> {
  key: K;
  value: V;
}

const pair1: Pair<string> = { key: "name", value: "John" };  // V defaults to string
const pair2: Pair<string, number> = { key: "age", value: 30 };  // Explicit types

// Default with utility types
interface State<T = {}> {
  data: T;
  loading: boolean;
}

const emptyState: State = { data: {}, loading: false };
const userState: State<User> = { data: { id: 1, name: "John" }, loading: false };

// Default in function type
type Fetcher<T = unknown> = (url: string) => Promise<T>;

const defaultFetcher: Fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();  // Returns unknown
};

const userFetcher: Fetcher<User> = async (url) => {
  const response = await fetch(url);
  return response.json();  // Returns User
};

// Default with conditional
interface Response<T = void, Success extends boolean = true> {
  success: Success;
  data: Success extends true ? T : never;
}

// Default in mapped types
type Partial2<T, K extends keyof T = keyof T> = {
  [P in K]?: T[P];
};

// Default for React components
interface Props<T = string> {
  value: T;
  onChange: (value: T) => void;
}

// Default with template literals
type EventHandler<T extends string = string> = \`on\${Capitalize<T>}\`;

// Complex default types
type ApiResponse<
  T = unknown,
  E = { message: string; code: number }
> = {
  data?: T;
  error?: E;
  status: number;
};

// Defaults in generic constraints
function process<T extends string | number = string>(value: T): T {
  return value;
}

process("hello");  // T is string (default & inferred)
process(42);       // T is number (inferred)

// Default with tuple
type Tuple<T = number, U = T> = [T, U];

const tuple1: Tuple = [1, 2];  // [number, number]
const tuple2: Tuple<string> = ["a", "b"];  // [string, string]
const tuple3: Tuple<string, number> = ["a", 1];  // [string, number]

// Default in interface extending
interface Base<T = string> {
  value: T;
}

interface Extended extends Base {
  extra: number;
}  // Extended has value: string (default)

// Practical example: Form field
interface FormField<T = string, E = string> {
  value: T;
  error?: E;
  touched: boolean;
  validate?: (value: T) => E | undefined;
}

const textField: FormField = {
  value: "",
  touched: false
};  // FormField<string, string>

const numberField: FormField<number> = {
  value: 0,
  touched: false
};  // FormField<number, string>`}
        </CodeBlock>

        <InfoBox type="info">
          Default generic types make APIs more convenient by providing sensible
          defaults. Users can override them when needed, but get reasonable
          behavior without explicit type arguments.
        </InfoBox>
      </Section>

      <Section title="6. Generic Type Inference">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript automatically infers generic types from usage context,
          reducing the need for explicit type annotations.
        </p>

        <CodeBlock title="Generic type inference examples">
          {`// Basic inference from arguments
function identity<T>(value: T): T {
  return value;
}

const num = identity(42);         // T inferred as number
const str = identity("hello");    // T inferred as string
const arr = identity([1, 2, 3]);  // T inferred as number[]

// Inference from array
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const first1 = firstElement([1, 2, 3]);      // T is number
const first2 = firstElement(["a", "b"]);     // T is string
const first3 = firstElement([true, false]);  // T is boolean

// Inference with multiple parameters
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "John" }, { age: 30 });
// T is { name: string }, U is { age: number }
// Result is { name: string } & { age: number }

// Inference from return type usage
function create<T>(value: T): { value: T } {
  return { value };
}

const result = create(42);
// T inferred as number, result is { value: number }

// Inference with const assertions
const point = create([10, 20] as const);
// T inferred as readonly [10, 20]

// Inference from context
type Callback<T> = (value: T) => void;

const callback: Callback<number> = (value) => {
  // value is inferred as number from context
  console.log(value * 2);
};

// Inference with array methods
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);  // n inferred as number
const strings = numbers.map(n => n.toString());  // Returns string[]

// Inference with object methods
interface Box<T> {
  value: T;
  map<U>(fn: (value: T) => U): Box<U>;
}

const box: Box<number> = {
  value: 42,
  map(fn) {
    // fn's parameter inferred as number
    return { value: fn(this.value), map: this.map };
  }
};

// Inference from class constructors
class Container<T> {
  constructor(public value: T) {}
}

const container1 = new Container(42);        // Container<number>
const container2 = new Container("hello");   // Container<string>

// Best common type inference
const mixed = [1, "two", 3];  // (string | number)[]
const objects = [{ a: 1 }, { a: 2, b: 3 }];  // { a: number; b?: number }[]

// Contextual typing
const arr: Array<(x: number) => number> = [
  x => x * 2,  // x inferred as number
  x => x + 1   // x inferred as number
];

// Inference with generic constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name");
// T inferred as { name: string; age: number }
// K inferred as "name"
// Return type inferred as string

// Inference with conditional types
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

const promise = Promise.resolve(42);
type Result = UnwrapPromise<typeof promise>;  // number

// Inference with tuple types
function tuple<T extends any[]>(...args: T): T {
  return args;
}

const t = tuple(1, "hello", true);
// T inferred as [number, string, boolean]

// Partial inference
function partial<T>(obj: Partial<T>): T {
  return obj as T;  // Unsafe, for demonstration
}

// T cannot be fully inferred from Partial<T>
// Need explicit type: partial<User>({ name: "John" })

// Inference with generic functions as parameters
function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const result2 = map([1, 2, 3], n => n.toString());
// T inferred as number
// U inferred as string from return value of fn

// Inference failure - needs explicit type
function create2<T>(): T {
  return {} as T;
}

// const value = create2();  // Error: Can't infer T
const value = create2<User>();  // OK: explicit type

// Inference with default values
function createWithDefault<T = string>(value?: T): T {
  return value as T;
}

const def1 = createWithDefault();         // string (default)
const def2 = createWithDefault(42);       // number (inferred)
const def3 = createWithDefault<boolean>(); // boolean (explicit)

// Inference in arrow functions
const identity2 = <T,>(value: T): T => value;
// Comma after T prevents parsing as JSX

// Inference with rest parameters
function concat<T>(...arrays: T[][]): T[] {
  return arrays.flat();
}

const combined = concat([1, 2], [3, 4], [5, 6]);
// T inferred as number

// Inference with object spread
function extend<T, U>(base: T, extension: U): T & U {
  return { ...base, ...extension };
}

const extended = extend({ a: 1 }, { b: 2 });
// T inferred as { a: number }
// U inferred as { b: number }

// Inference priority:
// 1. Explicit type arguments
// 2. Contextual typing (from expected type)
// 3. Inference from argument values
// 4. Default type parameters
// 5. Unknown/any fallback

// Tips for better inference:
// ✅ Provide example values
// ✅ Use const assertions for literals
// ✅ Use contextual typing when possible
// ✅ Add explicit types when inference fails
// ✅ Use type parameters consistently`}
        </CodeBlock>

        <InfoBox type="tip">
          TypeScript's type inference for generics is powerful. Most of the
          time, you don't need explicit type arguments—let TypeScript infer them
          from usage. Add explicit types only when inference fails or you need
          more specific types.
        </InfoBox>
      </Section>
    </div>
  );
}
