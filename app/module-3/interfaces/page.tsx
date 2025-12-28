import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function InterfacesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Interfaces
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Interfaces are TypeScript's way of defining contracts for object shapes.
        They're one of the most fundamental features for creating
        well-structured, type-safe code with support for extension, merging, and
        flexible property definitions.
      </p>

      <Section title="1. Basic Interfaces">
        <p className="text-gray-700 dark:text-gray-300">
          Basic interfaces define the shape of an object with property names and
          their types.
        </p>

        <CodeBlock title="Basic interface examples">
          {`// Basic interface
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: 30
};

// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calculator: Calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

// Method shorthand vs arrow function
interface Logger {
  log(message: string): void;  // Method signature
  error: (message: string) => void;  // Property with function type
}

const logger: Logger = {
  log(message) {
    console.log(message);
  },
  error: (message) => {
    console.error(message);
  }
};

// Interface with different property types
interface Product {
  id: number;
  name: string;
  price: number;
  tags: string[];
  metadata: {
    createdAt: Date;
    updatedAt: Date;
  };
}

// Nested interfaces
interface Address {
  street: string;
  city: string;
  country: string;
}

interface Person {
  name: string;
  address: Address;
}

const person: Person = {
  name: "Jane",
  address: {
    street: "123 Main St",
    city: "NYC",
    country: "USA"
  }
};

// Interfaces can describe arrays
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["a", "b", "c"];

// Interfaces can describe functions
interface SearchFunc {
  (source: string, subString: string): boolean;
}

const mySearch: SearchFunc = (source, subString) => {
  return source.indexOf(subString) > -1;
};

// Interfaces with constructors
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

// Hybrid types (callable with properties)
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  const counter = (function (start: number) {
    return start.toString();
  }) as Counter;
  
  counter.interval = 123;
  counter.reset = function () {};
  
  return counter;
}

// Interface with literal types
interface Config {
  mode: "development" | "production";
  port: 3000 | 8080;
}

// Empty interface (allows any object)
interface EmptyInterface {}

const anything: EmptyInterface = { whatever: "value" };`}
        </CodeBlock>

        <InfoBox type="info">
          Interfaces define contracts for object shapes. They can describe
          objects, functions, arrays, and classes. Use them when you need to
          define the structure of data or APIs.
        </InfoBox>
      </Section>

      <Section title="2. Optional Properties">
        <p className="text-gray-700 dark:text-gray-300">
          Optional properties use the ? symbol and don't need to be present in
          objects implementing the interface.
        </p>

        <CodeBlock title="Optional property examples">
          {`// Basic optional properties
interface User {
  name: string;
  age: number;
  email?: string;  // Optional
  phone?: string;  // Optional
}

const user1: User = {
  name: "John",
  age: 30
}; // OK: email and phone are optional

const user2: User = {
  name: "Jane",
  age: 25,
  email: "jane@example.com"
}; // OK: can include optional properties

// Optional methods
interface Validator {
  validate(value: string): boolean;
  format?(value: string): string;  // Optional method
}

const validator: Validator = {
  validate(value) {
    return value.length > 0;
  }
  // format is not required
};

// Accessing optional properties
function printEmail(user: User) {
  if (user.email) {
    console.log(user.email.toUpperCase());
  }
  // Or with optional chaining
  console.log(user.email?.toUpperCase());
}

// Optional with nested objects
interface Config {
  apiUrl: string;
  timeout?: number;
  retry?: {
    attempts: number;
    delay: number;
  };
}

const config1: Config = {
  apiUrl: "https://api.example.com"
}; // OK

const config2: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retry: {
    attempts: 3,
    delay: 1000
  }
}; // OK

// Optional vs undefined
interface Example1 {
  prop?: string;  // Can be omitted
}

interface Example2 {
  prop: string | undefined;  // Must be present (can be undefined)
}

const ex1: Example1 = {};  // OK
// const ex2: Example2 = {};  // Error: prop is required

const ex2: Example2 = { prop: undefined };  // OK

// Optional with default values
interface Settings {
  theme?: "light" | "dark";
  language?: string;
}

function applySettings(settings: Settings) {
  const theme = settings.theme ?? "light";
  const language = settings.language ?? "en";
  console.log(\`Theme: \${theme}, Language: \${language}\`);
}

// Optional callback functions
interface EventEmitter {
  on(event: string, callback?: () => void): void;
}

const emitter: EventEmitter = {
  on(event, callback) {
    if (callback) {
      callback();
    }
  }
};

// Multiple optional properties
interface RequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

// Partial makes all properties optional
interface Product {
  id: number;
  name: string;
  price: number;
}

type PartialProduct = Partial<Product>;
// Equivalent to:
// interface PartialProduct {
//   id?: number;
//   name?: string;
//   price?: number;
// }`}
        </CodeBlock>

        <InfoBox type="tip">
          Use optional properties for data that may not always be present.
          Remember that <code>prop?: Type</code> is equivalent to{" "}
          <code>prop: Type | undefined</code>, but optional can be omitted
          entirely from the object.
        </InfoBox>
      </Section>

      <Section title="3. Readonly Properties">
        <p className="text-gray-700 dark:text-gray-300">
          Readonly properties cannot be modified after object creation,
          providing immutability at the type level.
        </p>

        <CodeBlock title="Readonly property examples">
          {`// Basic readonly properties
interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 30;  // Error: Cannot assign to 'x' because it is readonly

// Readonly with methods
interface User {
  readonly id: number;
  name: string;
  setName(name: string): void;
}

const user: User = {
  id: 1,
  name: "John",
  setName(name) {
    this.name = name;  // OK: name is not readonly
  }
};

// user.id = 2;  // Error: id is readonly
user.setName("Jane");  // OK

// Readonly arrays
interface Config {
  readonly ports: readonly number[];
}

const config: Config = {
  ports: [80, 443, 8080]
};

// config.ports.push(3000);  // Error: push doesn't exist on readonly array
// config.ports[0] = 90;     // Error: Index signature is readonly

// Readonly with nested objects
interface DeepReadonly {
  readonly value: string;
  readonly nested: {
    readonly prop: number;
  };
}

const obj: DeepReadonly = {
  value: "test",
  nested: {
    prop: 42
  }
};

// obj.value = "new";  // Error: readonly
// obj.nested.prop = 50;  // Error: readonly

// But nested object reference can change
// obj.nested = { prop: 50 };  // This would work without readonly on nested

// Readonly vs const
const constValue = { x: 10 };
constValue.x = 20;  // OK: const means constant reference, not properties

interface ReadonlyInterface {
  readonly x: number;
}

const readonlyValue: ReadonlyInterface = { x: 10 };
// readonlyValue.x = 20;  // Error: readonly property

// Readonly utility type
interface Mutable {
  name: string;
  age: number;
}

type ImmutableUser = Readonly<Mutable>;
// Equivalent to:
// interface ImmutableUser {
//   readonly name: string;
//   readonly age: number;
// }

// Readonly with optional
interface Example {
  readonly id?: number;
  readonly name?: string;
}

// Readonly mapped type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

// Combining readonly with other modifiers
interface Mixed {
  readonly required: string;
  readonly optional?: number;
  mutable: boolean;
}

// ReadonlyArray type
const numbers: ReadonlyArray<number> = [1, 2, 3];
// numbers.push(4);  // Error: push doesn't exist
const doubled = numbers.map(n => n * 2);  // OK: map doesn't modify

// Readonly tuple
const tuple: readonly [string, number] = ["hello", 42];
// tuple[0] = "world";  // Error: readonly

// As const makes everything readonly
const config2 = {
  apiUrl: "https://api.example.com",
  ports: [80, 443]
} as const;

// config2.apiUrl = "new";  // Error: readonly
// config2.ports.push(8080);  // Error: readonly array`}
        </CodeBlock>

        <InfoBox type="important">
          Readonly properties prevent reassignment but don't make nested objects
          immutable unless they're also marked readonly. Use the Readonly
          utility type or as const for deep immutability.
        </InfoBox>
      </Section>

      <Section title="4. Index Signatures">
        <p className="text-gray-700 dark:text-gray-300">
          Index signatures allow interfaces to describe objects with dynamic
          keys where the property names are not known in advance.
        </p>

        <CodeBlock title="Index signature examples">
          {`// Basic index signature
interface StringMap {
  [key: string]: string;
}

const map: StringMap = {
  name: "John",
  email: "john@example.com",
  city: "NYC"
};

// Number index signature
interface NumberArray {
  [index: number]: number;
}

const scores: NumberArray = {
  0: 95,
  1: 87,
  2: 92
};

// Or just use array
const scores2: number[] = [95, 87, 92];

// Index signature with known properties
interface Dictionary {
  name: string;  // Known property
  age: number;   // Known property
  [key: string]: string | number;  // Additional properties
}

const person: Dictionary = {
  name: "John",
  age: 30,
  city: "NYC",     // OK: string
  score: 95        // OK: number
};

// Known properties must match index signature type
interface Invalid {
  // name: boolean;  // Error: boolean not assignable to string | number
  [key: string]: string | number;
}

// String and number index signatures
interface MixedIndex {
  [key: string]: string | number;
  [index: number]: number;  // Number index must be subtype of string index
}

const mixed: MixedIndex = {
  0: 42,
  1: 84,
  name: "test"
};

// Readonly index signature
interface ReadonlyMap {
  readonly [key: string]: string;
}

const readonlyMap: ReadonlyMap = {
  a: "alpha",
  b: "beta"
};

// readonlyMap.c = "gamma";  // Error: readonly

// Index signature with optional properties
interface FlexibleConfig {
  required: string;
  optional?: number;
  [key: string]: string | number | undefined;
}

// Generic index signature
interface GenericMap<T> {
  [key: string]: T;
}

const stringMap: GenericMap<string> = {
  a: "alpha",
  b: "beta"
};

const numberMap: GenericMap<number> = {
  x: 10,
  y: 20
};

// Index signature with methods
interface Cache {
  get(key: string): any;
  set(key: string, value: any): void;
  [key: string]: any;
}

// Record utility type (cleaner alternative)
type StringRecord = Record<string, string>;
// Equivalent to: { [key: string]: string }

type NumberRecord = Record<string, number>;
// Equivalent to: { [key: string]: number }

// Partial record (specific keys)
type StatusRecord = Record<"pending" | "active" | "complete", string>;
// { pending: string; active: string; complete: string }

// Index signature limitations
interface Limited {
  [key: string]: number;
}

// const limited: Limited = {
//   // Can only have number values
//   prop: "string"  // Error
// };

// Using union for flexible types
interface Flexible {
  [key: string]: string | number | boolean | null;
}

const flexible: Flexible = {
  name: "John",
  age: 30,
  active: true,
  deleted: null
};

// Index signature with symbol keys
interface SymbolMap {
  [key: symbol]: string;
}

const sym1 = Symbol("key1");
const sym2 = Symbol("key2");

const symbolMap: SymbolMap = {
  [sym1]: "value1",
  [sym2]: "value2"
};

// Combining multiple index signatures
interface Combined {
  [key: string]: any;
  [index: number]: string;  // More specific for numbers
}

// Index signature with template literals (TypeScript 4.4+)
interface DynamicProps {
  [key: \`data-\${string}\`]: string;
}

const props: DynamicProps = {
  "data-id": "123",
  "data-name": "test"
  // "id": "123"  // Error: doesn't match pattern
};`}
        </CodeBlock>

        <InfoBox type="tip">
          Index signatures are useful for dictionaries and maps. Use Record
          &lt;K, V&gt; for cleaner syntax. Remember that number index signatures
          must be subtypes of string index signatures due to JavaScript's object
          key coercion.
        </InfoBox>
      </Section>

      <Section title="5. Extending Interfaces">
        <p className="text-gray-700 dark:text-gray-300">
          Interfaces can extend other interfaces, allowing you to build complex
          types from simpler ones through inheritance.
        </p>

        <CodeBlock title="Extending interfaces">
          {`// Basic extension
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const dog: Dog = {
  name: "Rex",
  age: 5,
  breed: "Golden Retriever",
  bark() {
    console.log("Woof!");
  }
};

// Multiple extension
interface Nameable {
  name: string;
}

interface Ageable {
  age: number;
}

interface Person extends Nameable, Ageable {
  email: string;
}

const person: Person = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

// Extending with override (must be compatible)
interface Base {
  id: number;
  value: string | number;
}

interface Extended extends Base {
  value: string;  // OK: narrowing type
  extra: boolean;
}

// Extending and adding optional
interface BaseUser {
  id: number;
  name: string;
}

interface AdminUser extends BaseUser {
  role: "admin";
  permissions: string[];
}

// Extending with methods
interface Shape {
  getArea(): number;
}

interface Circle extends Shape {
  radius: number;
}

const circle: Circle = {
  radius: 10,
  getArea() {
    return Math.PI * this.radius ** 2;
  }
};

// Chain of extensions
interface Entity {
  id: number;
}

interface Timestamped extends Entity {
  createdAt: Date;
  updatedAt: Date;
}

interface VersionedEntity extends Timestamped {
  version: number;
}

// Extending generic interfaces
interface Box<T> {
  value: T;
}

interface StringBox extends Box<string> {
  toUpperCase(): string;
}

// Generic extension
interface Container<T> {
  item: T;
}

interface NumberContainer<T> extends Container<T> {
  count: number;
}

// Extending with index signature
interface BaseMap {
  [key: string]: any;
}

interface TypedMap extends BaseMap {
  name: string;
  age: number;
}

// Extending and narrowing
interface Flexible {
  value: string | number | boolean;
}

interface Specific extends Flexible {
  value: string;  // OK: narrowing
}

// Conditional extension
interface Conditional<T> extends T extends string ? { str: string } : { num: number } {}

// Extending class (interfaces can extend classes)
class Animal2 {
  name: string = "";
  move() {}
}

interface Pet extends Animal2 {
  owner: string;
}

// Extending with optional properties
interface Optional {
  required: string;
  optional?: number;
}

interface Extended2 extends Optional {
  extra: boolean;
}

// The extended interface inherits optional nature
const obj: Extended2 = {
  required: "value",
  // optional can be omitted
  extra: true
};

// Extending with readonly
interface Immutable {
  readonly id: number;
}

interface Extended3 extends Immutable {
  name: string;
}

const obj2: Extended3 = {
  id: 1,
  name: "Test"
};

// obj2.id = 2;  // Error: readonly

// Extending multiple with conflicts (last wins in some cases)
interface A {
  prop: string;
}

interface B {
  prop: number;
}

// interface C extends A, B {}  // Error: conflicting types

// Use intersection for conflicts
type C = A & B;  // { prop: never }

// Extending with methods having same name
interface Reader {
  read(): string;
}

interface Writer {
  write(data: string): void;
}

interface ReadWriter extends Reader, Writer {
  // Inherits both methods
}

const rw: ReadWriter = {
  read() {
    return "data";
  },
  write(data) {
    console.log(data);
  }
};`}
        </CodeBlock>

        <InfoBox type="info">
          Interface extension creates an inheritance hierarchy. Use extends with
          one or multiple interfaces to compose complex types. Extended
          properties can narrow types but must remain compatible.
        </InfoBox>
      </Section>

      <Section title="6. Interface Merging">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript automatically merges multiple interface declarations with
          the same name, combining their members into a single interface.
        </p>

        <CodeBlock title="Interface merging examples">
          {`// Basic merging
interface User {
  name: string;
}

interface User {
  age: number;
}

// Both declarations merge into one
const user: User = {
  name: "John",
  age: 30
};

// Merging with methods
interface Logger {
  log(message: string): void;
}

interface Logger {
  error(message: string): void;
  warn(message: string): void;
}

const logger: Logger = {
  log(message) {
    console.log(message);
  },
  error(message) {
    console.error(message);
  },
  warn(message) {
    console.warn(message);
  }
};

// Merging must have compatible types
interface Config {
  apiUrl: string;
}

interface Config {
  apiUrl: string;  // OK: same type
  timeout: number;
}

// interface Config {
//   apiUrl: number;  // Error: incompatible type
// }

// Merging with optional properties
interface Settings {
  theme?: "light" | "dark";
}

interface Settings {
  language?: string;
}

// Augmenting global interfaces (common use case)
interface Window {
  myCustomProperty: string;
}

// Now window.myCustomProperty is typed
window.myCustomProperty = "value";

// Augmenting lib types
interface Array<T> {
  customMethod(): T[];
}

// Merging with generics
interface Box<T> {
  value: T;
}

interface Box<T> {
  getValue(): T;
}

const box: Box<string> = {
  value: "hello",
  getValue() {
    return this.value;
  }
};

// Method overloading through merging
interface Calculator {
  add(a: number, b: number): number;
}

interface Calculator {
  add(a: string, b: string): string;
}

// Both overloads are available
const calc: Calculator = {
  add(a: any, b: any): any {
    return a + b;
  }
};

// Merging namespaces and interfaces
namespace MyLib {
  export interface Options {
    debug: boolean;
  }
}

namespace MyLib {
  export interface Options {
    verbose: boolean;
  }
}

// Options has both debug and verbose
const options: MyLib.Options = {
  debug: true,
  verbose: false
};

// Merging with index signatures
interface Dictionary {
  [key: string]: any;
}

interface Dictionary {
  name: string;
  age: number;
}

// Can have both index signature and known properties
const dict: Dictionary = {
  name: "John",
  age: 30,
  extra: "value"
};

// Module augmentation (extending third-party types)
import 'some-library';

declare module 'some-library' {
  interface LibraryInterface {
    newMethod(): void;
  }
}

// Merging in different files (declaration merging)
// File 1:
// interface GlobalState {
//   user: User;
// }

// File 2:
// interface GlobalState {
//   settings: Settings;
// }

// Both merge in the final program

// Why interface merging is useful:
// 1. Augmenting third-party libraries
// 2. Adding properties to global objects
// 3. Splitting large interfaces across files
// 4. Plugin architectures

// Merging order matters for methods
interface Ordered {
  method(x: string): void;
}

interface Ordered {
  method(x: number): void;  // Later declaration comes first in overload order
}

// Call with number checked first, then string

// Disabling merging (use type alias instead)
type NoMerge = {
  name: string;
};

// type NoMerge = {  // Error: Duplicate identifier
//   age: number;
// };

// Best practices:
// 1. Use merging for library augmentation
// 2. Avoid merging for regular application code
// 3. Keep merged declarations close together
// 4. Ensure compatible types when merging
// 5. Document when intentionally using merging`}
        </CodeBlock>

        <InfoBox type="warning">
          Interface merging is automatic when multiple declarations share the
          same name. While powerful for augmenting libraries and globals, use it
          sparingly in application code. Prefer extending interfaces or using
          type aliases when you don't need merging.
        </InfoBox>
      </Section>
    </div>
  );
}
