import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeAliasesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Type Aliases
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Type aliases create names for any type, including primitives, unions,
        tuples, and complex object types. Understanding when to use type aliases
        versus interfaces is crucial for effective TypeScript development.
      </p>

      <Section title="1. Basic Type Aliases">
        <p className="text-gray-700 dark:text-gray-300">
          Type aliases use the type keyword to create reusable type definitions
          for any TypeScript type.
        </p>

        <CodeBlock title="Basic type alias examples">
          {`// Primitive type aliases
type Name = string;
type Age = number;
type IsActive = boolean;

const userName: Name = "John";
const userAge: Age = 30;
const active: IsActive = true;

// Object type alias
type User = {
  name: string;
  age: number;
  email: string;
};

const user: User = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

// Union type alias
type ID = string | number;
type Status = "pending" | "active" | "inactive";

let userId: ID = "user_123";
userId = 456;  // OK

// Tuple type alias
type Point = [number, number];
type RGB = [number, number, number];

const point: Point = [10, 20];
const color: RGB = [255, 128, 0];

// Function type alias
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

// Array type alias
type StringArray = string[];
type NumberMatrix = number[][];

const names: StringArray = ["Alice", "Bob"];
const matrix: NumberMatrix = [[1, 2], [3, 4]];

// Intersection type alias
type Identifiable = { id: number };
type Nameable = { name: string };
type Entity = Identifiable & Nameable;

const entity: Entity = {
  id: 1,
  name: "Item"
};

// Literal type alias
type Direction = "north" | "south" | "east" | "west";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// Complex nested type
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
};

// Recursive type alias
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const json: JsonValue = {
  name: "John",
  age: 30,
  tags: ["developer", "typescript"],
  metadata: {
    created: "2024-01-01"
  }
};`}
        </CodeBlock>

        <InfoBox type="info">
          Type aliases can represent any type: primitives, objects, unions,
          intersections, tuples, and functions. They're more flexible than
          interfaces but can't be merged or extended in the same way.
        </InfoBox>
      </Section>

      <Section title="2. Type Aliases vs Interfaces">
        <p className="text-gray-700 dark:text-gray-300">
          While type aliases and interfaces can often be used interchangeably
          for object types, they have important differences.
        </p>

        <CodeBlock title="Type aliases vs interfaces comparison">
          {`// Both can describe object shapes
type UserType = {
  name: string;
  age: number;
};

interface UserInterface {
  name: string;
  age: number;
}

// Both work the same for basic usage
const user1: UserType = { name: "John", age: 30 };
const user2: UserInterface = { name: "Jane", age: 25 };

// Key Difference 1: Declaration Merging
// Interfaces can be merged
interface Window {
  title: string;
}

interface Window {
  width: number;
}

// Window now has both title and width

// Types cannot be merged (this would error)
// type Window = { title: string };
// type Window = { width: number };  // Error: Duplicate identifier

// Key Difference 2: Extending Syntax
// Interface extending
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Type alias extending (using intersection)
type Animal2 = {
  name: string;
};

type Dog2 = Animal2 & {
  breed: string;
};

// Key Difference 3: Unions and Primitives
// Types can be unions
type ID = string | number;
type Status = "pending" | "active";

// Interfaces cannot be unions
// interface ID = string | number;  // Error

// Types can alias primitives
type Name = string;
type Count = number;

// Interfaces cannot
// interface Name = string;  // Error

// Key Difference 4: Computed Properties
// Types can use computed property names
type Keys = "name" | "age";
type Person = {
  [K in Keys]: string;
};

// Interfaces cannot use mapped types directly
// interface Person {
//   [K in Keys]: string;  // Error
// }

// Key Difference 5: Conditional Types
// Types can be conditional
type IsString<T> = T extends string ? true : false;

// Interfaces cannot
// interface IsString<T> = T extends string ? true : false;  // Error

// Key Difference 6: Tuple Types
// Both can describe tuples, but syntax differs
type Coordinate = [number, number];

interface CoordinateInterface {
  0: number;
  1: number;
  length: 2;
}

// Key Difference 7: Function Types
// Type for function
type MathOp = (a: number, b: number) => number;

// Interface for function
interface MathOpInterface {
  (a: number, b: number): number;
}

// Both work
const add1: MathOp = (a, b) => a + b;
const add2: MathOpInterface = (a, b) => a + b;

// Key Difference 8: Complexity
// Types can be more complex
type Tree<T> =
  | { type: "leaf"; value: T }
  | { type: "branch"; left: Tree<T>; right: Tree<T> };

// This is harder to express with interfaces

// Key Difference 9: Error Messages
// Interfaces often show the interface name in errors
interface User3 {
  name: string;
}

// const user: User3 = { name: 123 };
// Error: Type 'number' is not assignable to type 'string' in 'User3'

// Types show the entire structure
type User4 = {
  name: string;
};

// const user: User4 = { name: 123 };
// Error: Type 'number' is not assignable to type 'string' in '{ name: string }'

// Key Difference 10: Performance
// Interfaces can be faster for type checking (cached by name)
// Types might be slower for very complex types (computed each time)

// Combining both
type AdminUser = UserInterface & {
  role: "admin";
  permissions: string[];
};

interface ExtendedUser extends UserType {
  email: string;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Interfaces and type aliases are often interchangeable for object
          types, but interfaces support declaration merging and extending, while
          type aliases support unions, intersections, and advanced type
          operations.
        </InfoBox>
      </Section>

      <Section title="3. When to Use Type Aliases">
        <p className="text-gray-700 dark:text-gray-300">
          Use type aliases when you need unions, intersections, primitives,
          tuples, or advanced type operations that interfaces don't support.
        </p>

        <CodeBlock title="When to use type aliases">
          {`// Use Case 1: Union Types
type StringOrNumber = string | number;
type Result = Success | Failure;
type Status = "idle" | "loading" | "success" | "error";

// Use Case 2: Intersection Types
type HasId = { id: number };
type HasName = { name: string };
type Entity = HasId & HasName;

// Use Case 3: Primitive Aliases (for domain modeling)
type UserId = string;
type Timestamp = number;
type Percentage = number;

// Use Case 4: Tuple Types
type Point2D = [number, number];
type Point3D = [number, number, number];
type NamedPoint = [x: number, y: number];

// Use Case 5: Function Types
type Callback = () => void;
type Predicate<T> = (value: T) => boolean;
type Comparator<T> = (a: T, b: T) => number;

// Use Case 6: Mapped Types
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Use Case 7: Conditional Types
type NonNullable<T> = T extends null | undefined ? never : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Use Case 8: Template Literal Types
type EventName = \`on\${"Click" | "Focus" | "Blur"}\`;
type CSSProperty = \`\${"margin" | "padding"}-\${"top" | "right" | "bottom" | "left"}\`;

// Use Case 9: Utility Types Composition
type ReadonlyPartial<T> = Readonly<Partial<T>>;
type RequiredNonNullable<T> = Required<NonNullable<T>>;

// Use Case 10: Complex Type Transformations
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }

// Use Case 11: Discriminated Unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

// Use Case 12: Recursive Types
type TreeNode<T> = {
  value: T;
  children?: TreeNode<T>[];
};

// Use Case 13: Type Inference Helpers
type ElementType<T> = T extends (infer E)[] ? E : never;
type ArrayElement = ElementType<string[]>;  // string

// Use Case 14: Branded Types (Nominal Typing)
type Brand<K, T> = K & { __brand: T };
type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

// Use Case 15: Complex Generic Constraints
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

interface Example {
  name: string;
  age: number;
  active: boolean;
}

type StringKeys = KeysOfType<Example, string>;  // "name"
type NumberKeys = KeysOfType<Example, number>;  // "age"

// Real-world examples:

// API Response Types
type ApiSuccess<T> = {
  status: "success";
  data: T;
};

type ApiError = {
  status: "error";
  error: string;
  code: number;
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

// State Management
type LoadingState = { type: "loading" };
type SuccessState<T> = { type: "success"; data: T };
type ErrorState = { type: "error"; error: string };
type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

// Form Field Types
type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
};

type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};`}
        </CodeBlock>

        <InfoBox type="important">
          Choose type aliases when you need: unions, intersections, mapped
          types, conditional types, template literals, or to alias primitives
          and tuples. They're essential for advanced type transformations.
        </InfoBox>
      </Section>

      <Section title="4. When to Use Interfaces">
        <p className="text-gray-700 dark:text-gray-300">
          Use interfaces when defining object shapes, especially for public
          APIs, class contracts, or when you need declaration merging.
        </p>

        <CodeBlock title="When to use interfaces">
          {`// Use Case 1: Object Shapes (Public API)
interface User {
  id: number;
  name: string;
  email: string;
}

// Use Case 2: Class Contracts
interface Drawable {
  draw(): void;
  getPosition(): [number, number];
}

class Circle implements Drawable {
  draw() {
    console.log("Drawing circle");
  }
  getPosition(): [number, number] {
    return [0, 0];
  }
}

// Use Case 3: Declaration Merging (Library Augmentation)
interface Window {
  myCustomProperty: string;
}

// Later or in another file
interface Window {
  anotherProperty: number;
}

// Both properties exist on Window

// Use Case 4: Extending (Inheritance)
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

// Use Case 5: Multiple Inheritance
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

interface Duck extends Flyable, Swimmable {
  quack(): void;
}

// Use Case 6: Plugin/Extension Systems
interface PluginConfig {
  name: string;
  version: string;
}

// Plugins can augment this
interface PluginConfig {
  // Additional plugin-specific properties
}

// Use Case 7: Event Emitters
interface EventMap {
  click: [x: number, y: number];
  keypress: [key: string];
}

interface Emitter {
  on<K extends keyof EventMap>(
    event: K,
    handler: (...args: EventMap[K]) => void
  ): void;
}

// Use Case 8: Consistency in Large Codebases
// Interfaces provide consistent naming in error messages
interface UserProfile {
  username: string;
  bio: string;
  avatar: string;
}

// Error messages show "UserProfile" instead of the full type structure

// Use Case 9: Framework/Library Definitions
// Most frameworks prefer interfaces
interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
}

interface ComponentState {
  isOpen: boolean;
  data: any[];
}

// Use Case 10: Gradual Type Adoption
// Interfaces can start simple and be extended later
interface Config {
  apiUrl: string;
}

// Later, add more properties
interface Config {
  timeout: number;
  retries: number;
}

// Use Case 11: Abstract Data Structures
interface Stack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
}

interface Queue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  size(): number;
}

// Use Case 12: Service Contracts
interface UserService {
  getUser(id: number): Promise<User>;
  createUser(data: Partial<User>): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User>;
  deleteUser(id: number): Promise<void>;
}

// Use Case 13: Protocol Definitions
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

interface Comparable<T> {
  compareTo(other: T): number;
}

// Use Case 14: Configuration Objects
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

// Use Case 15: Type-Safe Builders
interface QueryBuilder {
  select(...fields: string[]): this;
  where(condition: string): this;
  orderBy(field: string, direction: "asc" | "desc"): this;
  execute(): Promise<any[]>;
}

// When NOT to use interfaces:
// ❌ Union types
// ❌ Intersection types (prefer type aliases)
// ❌ Mapped types
// ❌ Conditional types
// ❌ Primitive aliases
// ❌ Tuple types
// ❌ Template literal types

// Best practice: Use interfaces for objects, classes, and public APIs
// Use type aliases for everything else`}
        </CodeBlock>

        <InfoBox type="tip">
          Choose interfaces for: object shapes, class contracts, public APIs,
          library definitions, and when you need declaration merging or
          inheritance. They provide better error messages and are the convention
          for object-oriented patterns.
        </InfoBox>
      </Section>

      <Section title="5. Best Practices and Guidelines">
        <p className="text-gray-700 dark:text-gray-300">
          Follow these guidelines to choose between type aliases and interfaces
          effectively in your TypeScript projects.
        </p>

        <CodeBlock title="Best practices">
          {`// Guideline 1: Be Consistent
// Pick one style for similar use cases and stick with it

// Good: Consistent use of interfaces for all domain models
interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

// Bad: Mixing unnecessarily
interface User2 {
  id: number;
}

type Product2 = {
  id: number;
};

// Guideline 2: Use Interfaces for Public APIs
// Interfaces provide better documentation and error messages

// Good: Public API with interface
export interface ApiClient {
  get(url: string): Promise<Response>;
  post(url: string, data: any): Promise<Response>;
}

// Guideline 3: Use Type Aliases for Complex Types
// Type aliases handle unions, conditionals, and mapped types

// Good: Complex type with type alias
export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

// Guideline 4: Prefer Type Aliases for Utility Types
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P];
};

// Guideline 5: Use Interfaces for Extending
// Interfaces are clearer for inheritance

// Good: Clear inheritance
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Less clear with type aliases
type Animal2 = {
  name: string;
};

type Dog2 = Animal2 & {
  breed: string;
};

// Guideline 6: Document Your Choice
// Add comments explaining non-obvious choices

// Using type alias here because we need union types
type Status = "pending" | "approved" | "rejected";

// Using interface for declaration merging
interface PluginAPI {
  version: string;
}

// Guideline 7: Use Type Aliases for Function Types
// Cleaner syntax for function signatures

// Good
type EventHandler = (event: Event) => void;
type Predicate<T> = (value: T) => boolean;

// Less common
interface EventHandler2 {
  (event: Event): void;
}

// Guideline 8: Combine Both When Needed
interface User3 {
  id: number;
  name: string;
}

type AdminUser = User3 & {
  role: "admin";
  permissions: string[];
};

// Guideline 9: Keep It Simple
// Don't over-engineer type definitions

// Bad: Overly complex
type ComplexUser<
  T extends string = string,
  U extends number = number
> = {
  id: U;
  name: T;
} & (T extends "admin" ? { permissions: string[] } : {});

// Good: Simple and clear
interface User4 {
  id: number;
  name: string;
}

interface AdminUser2 extends User4 {
  permissions: string[];
}

// Guideline 10: Team Conventions
// Follow your team's established patterns

// Example team guideline:
// - Use interfaces for all data models
// - Use type aliases for all utility types
// - Use type aliases for union types
// - Document exceptions

// Real-world decision tree:

// Need unions or intersections? → Type alias
// Need mapped types? → Type alias
// Need conditional types? → Type alias
// Need template literals? → Type alias
// Aliasing primitives? → Type alias
// Defining tuples? → Type alias

// Defining object shape? → Interface (usually)
// Defining class contract? → Interface
// Need declaration merging? → Interface
// Public API? → Interface
// Extending other types? → Interface (clearer)

// Summary:
// ✅ Interface: Objects, classes, public APIs, inheritance
// ✅ Type Alias: Unions, mapped types, utilities, complex types
// ✅ Either: Simple object shapes (be consistent)
// ✅ Both: Combine as needed

// Quick reference:
type GuidelineMap = {
  unions: "type alias";
  intersections: "type alias";
  mappedTypes: "type alias";
  conditionals: "type alias";
  templateLiterals: "type alias";
  primitiveAlias: "type alias";
  tuples: "type alias";
  functions: "type alias";
  objects: "interface or type";
  classes: "interface";
  inheritance: "interface";
  merging: "interface";
  publicAPI: "interface";
};`}
        </CodeBlock>

        <InfoBox type="important">
          <strong>Quick Decision Guide:</strong>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              Use <strong>interfaces</strong> for object shapes, classes, and
              public APIs
            </li>
            <li>
              Use <strong>type aliases</strong> for unions, mapped types, and
              advanced operations
            </li>
            <li>Be consistent within your codebase</li>
            <li>Both can often work—choose based on the specific use case</li>
            <li>
              When in doubt, use interfaces for objects and type aliases for
              everything else
            </li>
          </ul>
        </InfoBox>
      </Section>
    </div>
  );
}
