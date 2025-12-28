import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ObjectsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Objects
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Objects are the most fundamental way to group and structure data in
        JavaScript and TypeScript. TypeScript provides powerful type checking
        for object shapes, properties, and patterns.
      </p>

      <Section title="1. Object Type Basics">
        <p className="text-gray-700 dark:text-gray-300">
          The most basic way to type objects is through object literal types,
          which define the exact shape an object must have.
        </p>

        <CodeBlock title="Basic object types">
          {`// Object literal type
let user: { name: string; age: number } = {
  name: "John",
  age: 30
};

// Object with optional properties
let person: {
  name: string;
  age?: number;
  email?: string;
} = {
  name: "Jane"
};

// Adding optional properties
person.email = "jane@example.com"; // OK

// Object with readonly properties
let config: {
  readonly apiUrl: string;
  readonly timeout: number;
} = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};

// config.apiUrl = "new-url"; // Error: readonly property

// Empty object type
let empty: {} = {}; // Can be any value except null/undefined
empty = 42;        // OK
empty = "hello";   // OK
empty = { a: 1 };  // OK

// Object type (lowercase 'object')
let obj: object = { a: 1 }; // Only objects, not primitives
obj = [1, 2, 3];            // OK: arrays are objects
obj = () => {};              // OK: functions are objects
// obj = 42;                 // Error: number is not an object
// obj = "hello";            // Error: string is not an object

// Record<string, unknown> for generic objects
let genericObj: Record<string, unknown> = {
  name: "John",
  age: 30,
  active: true
};

// Type inference with objects
let inferred = {
  name: "John",
  age: 30
};
// Type: { name: string; age: number }

// Nested objects
let nested: {
  user: {
    name: string;
    address: {
      street: string;
      city: string;
    };
  };
} = {
  user: {
    name: "John",
    address: {
      street: "123 Main St",
      city: "NYC"
    }
  }
};

// Object with method
let calculator: {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
} = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// Method shorthand
let person2: {
  name: string;
  greet(): string;
} = {
  name: "John",
  greet() {
    return \`Hello, \${this.name}\`;
  }
};

// Object with mixed property types
let mixed: {
  id: number;
  name: string;
  tags: string[];
  metadata: { [key: string]: any };
} = {
  id: 1,
  name: "Product",
  tags: ["new", "featured"],
  metadata: { color: "blue", size: "large" }
};`}
        </CodeBlock>

        <InfoBox type="info">
          Use object literal types for simple shapes. For reusable types,
          consider using interfaces or type aliases (covered in later modules).
        </InfoBox>
      </Section>

      <Section title="2. Index Signatures">
        <p className="text-gray-700 dark:text-gray-300">
          Index signatures allow you to define types for objects with dynamic
          keys, where you know the value type but not the specific property
          names.
        </p>

        <CodeBlock title="Index signature examples">
          {`// Basic index signature
let dictionary: { [key: string]: string } = {
  hello: "bonjour",
  goodbye: "au revoir",
  thanks: "merci"
};

// Add any string key
dictionary.please = "s'il vous plaît"; // OK
dictionary.welcome = "bienvenue";      // OK

// Values must match the signature type
// dictionary.number = 42; // Error: must be string

// Index signature with number keys
let scores: { [id: number]: number } = {
  101: 95,
  102: 87,
  103: 92
};

scores[104] = 88; // OK
// scores[105] = "90"; // Error: must be number

// Mixed index signature and known properties
let userData: {
  name: string;              // Known property
  age: number;               // Known property
  [key: string]: string | number; // Additional properties
} = {
  name: "John",
  age: 30,
  email: "john@example.com", // OK: string
  score: 95                   // OK: number
};

// Known properties must match index signature
let invalidType: {
  // name: boolean;  // Error: boolean not assignable to string | number
  [key: string]: string | number;
} = { name: "John" };

// String index signature includes number keys
let stringIndex: { [key: string]: any } = {
  0: "zero",        // OK: number key
  1: "one",         // OK: number key
  name: "value"     // OK: string key
};

// But number index signature is more restrictive
let numberIndex: { [key: number]: string } = {
  0: "zero",
  1: "one"
  // name: "value"  // Error: 'name' is not a number
};

// Number index must be subtype of string index
let compatible: {
  [key: string]: string | number;
  [key: number]: number; // OK: number is subtype of string | number
} = {
  0: 42,
  1: 84,
  name: "test"
};

// Invalid: number index type not compatible
// let incompatible: {
//   [key: string]: number;
//   [key: number]: string; // Error: string not assignable to number
// };

// Readonly index signature
let readonlyDict: { readonly [key: string]: string } = {
  a: "alpha",
  b: "beta"
};

// readonlyDict.c = "gamma"; // Error: readonly
// readonlyDict.a = "new";   // Error: readonly

// Optional vs index signature
let withOptional: {
  name?: string;
  age?: number;
} = {};

let withIndex: {
  [key: string]: string | number | undefined;
} = {};

withOptional.name = "John";  // OK
// withOptional.email = "..."; // Error: 'email' doesn't exist

withIndex.name = "John";     // OK
withIndex.email = "test";    // OK: any string key allowed
withIndex.random = 42;       // OK

// Real-world use case: API responses
type ApiResponse = {
  status: number;
  message: string;
  data: {
    [key: string]: any; // Dynamic data structure
  };
};

let response: ApiResponse = {
  status: 200,
  message: "Success",
  data: {
    userId: 123,
    userName: "john_doe",
    items: [1, 2, 3]
  }
};

// Use case: Configuration objects
type Config = {
  required: string;
  [option: string]: string | number | boolean;
};

let appConfig: Config = {
  required: "value",
  debug: true,
  maxRetries: 3,
  apiKey: "secret"
};

// Use case: Localization
type Translations = {
  [language: string]: {
    [key: string]: string;
  };
};

let i18n: Translations = {
  en: {
    greeting: "Hello",
    farewell: "Goodbye"
  },
  fr: {
    greeting: "Bonjour",
    farewell: "Au revoir"
  }
};

// Accessing with index signatures
console.log(i18n["en"]["greeting"]); // "Hello"
console.log(i18n["fr"]["greeting"]); // "Bonjour"

// Symbol keys with index signature
let symbolIndex: { [key: symbol]: string } = {
  [Symbol.iterator]: "iterator"
};`}
        </CodeBlock>

        <InfoBox type="warning">
          Index signatures make all properties of that type required when
          accessing. Use Record&lt;K, V&gt; or partial types for more control
          over optional dynamic properties.
        </InfoBox>
      </Section>

      <Section title="3. Object Type Operators">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript provides operators to work with object types, including
          optional properties, readonly modifiers, and property access.
        </p>

        <CodeBlock title="Object type operators">
          {`// Optional properties with ?
type User = {
  id: number;
  name: string;
  email?: string;    // Optional
  phone?: string;    // Optional
};

let user1: User = { id: 1, name: "John" };                    // OK
let user2: User = { id: 2, name: "Jane", email: "jane@..." }; // OK

// Accessing optional properties
function printEmail(user: User) {
  if (user.email) {
    console.log(user.email.toUpperCase()); // OK: narrowed to string
  }
}

// Optional chaining with objects
console.log(user1.email?.toUpperCase()); // undefined (safe)

// Readonly properties
type Point = {
  readonly x: number;
  readonly y: number;
};

let point: Point = { x: 10, y: 20 };
// point.x = 30; // Error: readonly property

// Readonly vs const
const constPoint = { x: 10, y: 20 };
constPoint.x = 30; // OK: const means constant reference, not properties

const readonlyPoint: Point = { x: 10, y: 20 };
// readonlyPoint.x = 30; // Error: readonly property

// Readonly applies deeply with nested objects
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Property access types
type User2 = {
  name: string;
  age: number;
  email: string;
};

type UserName = User2["name"];      // string
type UserAge = User2["age"];        // number
type UserProps = User2["name" | "age"]; // string | number

// keyof operator
type UserKeys = keyof User2; // "name" | "age" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let user: User2 = { name: "John", age: 30, email: "john@..." };
let userName = getProperty(user, "name");  // string
let userAge = getProperty(user, "age");    // number

// in operator for type narrowing
function process(obj: { name: string } | { id: number }) {
  if ("name" in obj) {
    console.log(obj.name); // OK: narrowed to { name: string }
  } else {
    console.log(obj.id);   // OK: narrowed to { id: number }
  }
}

// typeof with objects
let config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

type Config = typeof config;
// Type: { apiUrl: string; timeout: number; retries: number }

// satisfies operator (TypeScript 4.9+)
type Colors = "red" | "green" | "blue";

const colorConfig = {
  primary: "blue",
  secondary: "green",
  error: "red"
} satisfies Record<string, Colors>;

// colorConfig has literal types
colorConfig.primary; // "blue" (not just string)

// Intersection with objects
type Identifiable = { id: number };
type Nameable = { name: string };
type Entity = Identifiable & Nameable;

let entity: Entity = { id: 1, name: "Item" }; // Must have both properties

// Union with objects
type Success = { success: true; data: string };
type Failure = { success: false; error: string };
type Result = Success | Failure;

function handle(result: Result) {
  if (result.success) {
    console.log(result.data);  // OK: narrowed to Success
  } else {
    console.log(result.error); // OK: narrowed to Failure
  }
}

// Excess property checking
type Point2D = { x: number; y: number };

// Direct assignment - excess properties not allowed
// let p1: Point2D = { x: 10, y: 20, z: 30 }; // Error: 'z' doesn't exist

// Via variable - excess properties OK
let temp = { x: 10, y: 20, z: 30 };
let p2: Point2D = temp; // OK: structural typing

// Fresh object literal vs non-fresh
function printPoint(point: Point2D) {
  console.log(point.x, point.y);
}

// printPoint({ x: 10, y: 20, z: 30 }); // Error: excess property
printPoint(temp);                        // OK: non-fresh object`}
        </CodeBlock>

        <InfoBox type="tip">
          Use optional properties (?) for properties that may not exist,
          readonly for immutability, and keyof/typeof for deriving types from
          existing objects and their properties.
        </InfoBox>
      </Section>

      <Section title="4. Object Patterns and Best Practices">
        <p className="text-gray-700 dark:text-gray-300">
          Common patterns and best practices for working with object types in
          TypeScript.
        </p>

        <CodeBlock title="Object patterns">
          {`// 1. Partial objects (all properties optional)
type User = {
  id: number;
  name: string;
  email: string;
};

type PartialUser = {
  id?: number;
  name?: string;
  email?: string;
};

// Or use Partial utility type (covered later)
type PartialUser2 = Partial<User>;

// Use case: Updates
function updateUser(id: number, updates: PartialUser) {
  // Apply updates to user
}

updateUser(1, { name: "New Name" });           // OK
updateUser(1, { email: "new@email.com" });     // OK
updateUser(1, { name: "New", email: "new@" }); // OK

// 2. Required properties (remove optionality)
type OptionalUser = {
  id?: number;
  name?: string;
};

type RequiredUser = {
  id: number;
  name: string;
};

// 3. Pick specific properties
type UserPreview = {
  name: string;
  email: string;
};

// Manual pick
function getUserPreview(user: User): UserPreview {
  return {
    name: user.name,
    email: user.email
  };
}

// 4. Omit properties
type UserWithoutId = {
  name: string;
  email: string;
};

// 5. Extending objects
type BaseUser = {
  id: number;
  name: string;
};

type AdminUser = BaseUser & {
  role: "admin";
  permissions: string[];
};

let admin: AdminUser = {
  id: 1,
  name: "Admin",
  role: "admin",
  permissions: ["read", "write", "delete"]
};

// 6. Object merging
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge(
  { name: "John", age: 30 },
  { email: "john@example.com", active: true }
);
// Type: { name: string; age: number; email: string; active: boolean }

// 7. Object with computed properties
type EventMap = {
  click: { x: number; y: number };
  keypress: { key: string };
  focus: {};
};

type EventType = keyof EventMap;

function emit<T extends EventType>(
  event: T,
  data: EventMap[T]
) {
  console.log(event, data);
}

emit("click", { x: 10, y: 20 });     // OK
emit("keypress", { key: "Enter" });  // OK
// emit("click", { key: "A" });      // Error: wrong data type

// 8. Discriminated object unions
type Square = {
  kind: "square";
  size: number;
};

type Rectangle = {
  kind: "rectangle";
  width: number;
  height: number;
};

type Circle = {
  kind: "circle";
  radius: number;
};

type Shape = Square | Rectangle | Circle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "square":
      return shape.size ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius ** 2;
  }
}

// 9. Object factory pattern
function createUser(
  name: string,
  email: string
): { readonly id: number; name: string; email: string } {
  return {
    id: Math.random(),
    name,
    email
  };
}

// 10. Object validation
function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string"
  );
}

// 11. Readonly deep
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

type Config = {
  database: {
    host: string;
    port: number;
  };
  api: {
    timeout: number;
  };
};

type ReadonlyConfig = DeepReadonly<Config>;

// 12. Object destructuring with types
function printUser({ name, email }: { name: string; email: string }) {
  console.log(\`\${name} <\${email}>\`);
}

// 13. Rest properties
type UserBase = { id: number; name: string };
type UserWithMeta = UserBase & { [key: string]: any };

function extractUser(user: UserWithMeta): [UserBase, Record<string, any>] {
  const { id, name, ...rest } = user;
  return [{ id, name }, rest];
}

// 14. Object builder pattern
class UserBuilder {
  private user: Partial<User> = {};

  setId(id: number): this {
    this.user.id = id;
    return this;
  }

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  build(): User {
    if (!this.user.id || !this.user.name || !this.user.email) {
      throw new Error("Incomplete user");
    }
    return this.user as User;
  }
}

const newUser = new UserBuilder()
  .setId(1)
  .setName("John")
  .setEmail("john@example.com")
  .build();

// 15. Object comparison
function shallowEqual(obj1: object, obj2: object): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every(key => 
    (obj1 as any)[key] === (obj2 as any)[key]
  );
}`}
        </CodeBlock>

        <InfoBox type="important">
          Use discriminated unions for objects with different shapes, prefer
          type operators and utility types over manual property definitions, and
          leverage structural typing for flexible object patterns.
        </InfoBox>
      </Section>

      <Section title="5. Object vs Interface">
        <p className="text-gray-700 dark:text-gray-300">
          While interfaces are covered in detail later, it's important to
          understand when to use object types vs interfaces.
        </p>

        <CodeBlock title="Object types vs interfaces">
          {`// Object literal type
type UserType = {
  id: number;
  name: string;
};

// Interface (equivalent for simple cases)
interface UserInterface {
  id: number;
  name: string;
}

// Both work the same way
let user1: UserType = { id: 1, name: "John" };
let user2: UserInterface = { id: 1, name: "John" };

// Key differences:

// 1. Declaration merging (interfaces only)
interface Window {
  title: string;
}

interface Window {
  width: number;
}

// Window now has both title and width

// Can't do this with types:
// type Window = { title: string };
// type Window = { width: number }; // Error: Duplicate identifier

// 2. Extending (syntax difference)
// Interface extension
interface Person {
  name: string;
}

interface Employee extends Person {
  employeeId: number;
}

// Type intersection
type PersonType = {
  name: string;
};

type EmployeeType = PersonType & {
  employeeId: number;
};

// 3. Types can represent primitives, unions, tuples
type ID = string | number;           // OK
type Coord = [number, number];       // OK
type Name = string;                  // OK

// Interfaces can't
// interface ID = string | number;    // Error

// 4. Computed properties
type Keys = "name" | "age";

type DynamicType = {
  [K in Keys]: string;
};

// Can't do this directly with interfaces

// When to use what:
// Use interfaces when:
// - Defining object shapes
// - Need declaration merging
// - Defining class contracts
// - Public API definitions

// Use types when:
// - Need unions or intersections
// - Working with primitives
// - Need mapped types
// - Utility types

// Both are fine for:
// - Simple object shapes
// - Function types
// - Most common use cases

// In practice, pick one style and be consistent!`}
        </CodeBlock>

        <InfoBox type="tip">
          For most object shapes, interfaces and type aliases are
          interchangeable. Use interfaces for public APIs and types for complex
          type operations, unions, and intersections.
        </InfoBox>
      </Section>
    </div>
  );
}
