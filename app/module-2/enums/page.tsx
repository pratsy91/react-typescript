import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function EnumsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Enums
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Enums allow you to define a set of named constants, making code more
        readable and maintainable. TypeScript supports numeric, string, const,
        computed, and ambient enums.
      </p>

      <Section title="1. Numeric Enums">
        <p className="text-gray-700 dark:text-gray-300">
          Numeric enums are the most basic form, where each member gets assigned
          an auto-incrementing number starting from 0 (or a custom value).
        </p>

        <CodeBlock title="Numeric enum examples">
          {`// Basic numeric enum
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right    // 3
}

console.log(Direction.Up);    // 0
console.log(Direction.Down);  // 1
console.log(Direction.Left);  // 2
console.log(Direction.Right); // 3

// Using enum values
let direction: Direction = Direction.Up;

function move(dir: Direction) {
  switch (dir) {
    case Direction.Up:
      console.log("Moving up");
      break;
    case Direction.Down:
      console.log("Moving down");
      break;
    case Direction.Left:
      console.log("Moving left");
      break;
    case Direction.Right:
      console.log("Moving right");
      break;
  }
}

move(Direction.Up);    // "Moving up"
move(0);               // "Moving up" (numeric value also works)

// Custom starting number
enum Status {
  Pending = 1,    // 1
  Processing,     // 2
  Complete,       // 3
  Failed          // 4
}

console.log(Status.Pending);     // 1
console.log(Status.Processing);  // 2

// Custom numbers for each member
enum HttpStatus {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500
}

function handleResponse(status: HttpStatus) {
  if (status === HttpStatus.OK) {
    console.log("Success!");
  } else if (status >= HttpStatus.BadRequest) {
    console.log("Error occurred");
  }
}

// Reverse mapping (numeric enums only)
console.log(HttpStatus[200]);        // "OK"
console.log(HttpStatus[404]);        // "NotFound"
console.log(HttpStatus.OK);          // 200
console.log(HttpStatus["NotFound"]); // 404

// This means numeric enums generate two-way mappings
// HttpStatus.OK = 200
// HttpStatus[200] = "OK"

// Mixed initialization
enum Mixed {
  A,        // 0
  B = 5,    // 5
  C,        // 6 (auto-increments from previous)
  D = 10,   // 10
  E         // 11
}

console.log(Mixed.A); // 0
console.log(Mixed.B); // 5
console.log(Mixed.C); // 6
console.log(Mixed.E); // 11

// Enum as type
function setStatus(status: Status): void {
  console.log(\`Status: \${status}\`);
}

setStatus(Status.Pending);  // OK
setStatus(1);               // OK (numeric enums are not type-safe!)
// setStatus(999);          // OK but dangerous!

// This is a weakness of numeric enums - they accept any number`}
        </CodeBlock>

        <InfoBox type="warning">
          Numeric enums accept any number value, not just the defined enum
          members. For better type safety, consider using string enums or const
          assertions.
        </InfoBox>
      </Section>

      <Section title="2. String Enums">
        <p className="text-gray-700 dark:text-gray-300">
          String enums require explicit initialization for each member and don't
          support reverse mapping, but provide better type safety and debugging
          experience.
        </p>

        <CodeBlock title="String enum examples">
          {`// Basic string enum
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

console.log(Direction.Up);   // "UP"
console.log(Direction.Down); // "DOWN"

// More type-safe than numeric enums
function move(dir: Direction) {
  console.log(\`Moving \${dir}\`);
}

move(Direction.Up);    // OK
// move("UP");         // Error: "UP" is not assignable to Direction
// move(0);            // Error: 0 is not assignable to Direction

// String enums don't have reverse mapping
// console.log(Direction["UP"]); // Compile error

// Common use case: API endpoints
enum ApiEndpoint {
  Users = "/api/users",
  Posts = "/api/posts",
  Comments = "/api/comments"
}

function fetchData(endpoint: ApiEndpoint) {
  fetch(endpoint)
    .then(res => res.json())
    .then(data => console.log(data));
}

fetchData(ApiEndpoint.Users); // "/api/users"

// Event names
enum EventType {
  Click = "click",
  MouseMove = "mousemove",
  KeyPress = "keypress",
  Focus = "focus",
  Blur = "blur"
}

document.addEventListener(EventType.Click, () => {
  console.log("Clicked!");
});

// HTTP methods
enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

function request(method: HttpMethod, url: string) {
  console.log(\`\${method} \${url}\`);
}

request(HttpMethod.GET, "/api/users");

// File extensions
enum FileType {
  JavaScript = ".js",
  TypeScript = ".ts",
  JSON = ".json",
  Markdown = ".md"
}

// Colors
enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF",
  White = "#FFFFFF",
  Black = "#000000"
}

// Environment
enum Environment {
  Development = "development",
  Staging = "staging",
  Production = "production"
}

const currentEnv: Environment = Environment.Development;

if (currentEnv === Environment.Production) {
  console.log("Running in production");
}

// Heterogeneous enums (mixed string and number)
// Not recommended, but possible
enum Mixed {
  No = 0,
  Yes = "YES"
}

console.log(Mixed.No);  // 0
console.log(Mixed.Yes); // "YES"`}
        </CodeBlock>

        <InfoBox type="tip">
          String enums are more verbose but provide better type safety, clearer
          runtime values, and easier debugging. They're generally preferred over
          numeric enums in modern TypeScript.
        </InfoBox>
      </Section>

      <Section title="3. Const Enums">
        <p className="text-gray-700 dark:text-gray-300">
          Const enums are completely removed during compilation and inlined at
          usage sites, resulting in more efficient generated JavaScript.
        </p>

        <CodeBlock title="Const enum examples">
          {`// Const enum declaration
const enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

// Usage looks the same
let dir: Direction = Direction.Up;

// But the compiled JavaScript is different:
// Regular enum generates object at runtime
// Const enum is inlined to "UP"

// Before compilation:
function move(direction: Direction) {
  console.log(direction);
}

move(Direction.Up);

// After compilation (simplified):
// function move(direction) {
//   console.log(direction);
// }
// move("UP" /* Direction.Up */);

// No runtime object is created for const enums

// Const numeric enum
const enum Status {
  Pending,
  Active,
  Complete
}

let status: Status = Status.Active; // Becomes: let status = 1;

// Benefits of const enums:
// 1. No runtime code generated
// 2. Smaller bundle size
// 3. Potential performance improvement
// 4. Still get compile-time type checking

// Limitations of const enums:
// 1. Can't use computed members
// 2. Can't use enum value at runtime
// 3. No reverse mapping
// 4. Can't use Object.keys/values on them

// Invalid with const enum:
// console.log(Direction);        // Error: const enum removed
// console.log(Direction[0]);     // Error: no reverse mapping
// Object.keys(Direction);        // Error: doesn't exist at runtime

// Const enum with computed values (Error!)
// const enum Computed {
//   A = 1,
//   B = A * 2  // Error: const enum can't have computed members
// }

// When to use const enums:
// ✅ Known values at compile time
// ✅ Want smaller bundle size
// ✅ Don't need runtime enum object
// ✅ Performance-critical code

// When NOT to use const enums:
// ❌ Need to iterate over enum values
// ❌ Need runtime enum object
// ❌ Working with library code (consumers need the enum)
// ❌ Need computed members

// Real-world example: Logging levels
const enum LogLevel {
  Debug,
  Info,
  Warn,
  Error
}

function log(level: LogLevel, message: string) {
  // This will be inlined
  if (level >= LogLevel.Warn) {
    console.warn(message);
  } else {
    console.log(message);
  }
}

log(LogLevel.Info, "Application started");  // Inlined to: log(1, "...")
log(LogLevel.Error, "Something went wrong"); // Inlined to: log(3, "...")

// Note: With --isolatedModules or when publishing libraries,
// const enums can cause issues. Consider using as const objects instead.`}
        </CodeBlock>

        <InfoBox type="important">
          Const enums are inlined at compile time and don't exist at runtime.
          They're great for reducing bundle size but can't be used with dynamic
          access patterns. Be cautious when using them in published libraries.
        </InfoBox>
      </Section>

      <Section title="4. Computed and Constant Members">
        <p className="text-gray-700 dark:text-gray-300">
          Enum members can be constant (computed at compile time) or computed
          (evaluated at runtime).
        </p>

        <CodeBlock title="Computed and constant members">
          {`// Constant enum members (evaluated at compile time)
enum FileAccess {
  // Constant members
  None = 0,
  Read = 1 << 0,      // 1 (bit shift)
  Write = 1 << 1,     // 2
  ReadWrite = Read | Write,  // 3 (bitwise OR)
  Admin = 1 << 2      // 4
}

console.log(FileAccess.None);      // 0
console.log(FileAccess.Read);      // 1
console.log(FileAccess.Write);     // 2
console.log(FileAccess.ReadWrite); // 3
console.log(FileAccess.Admin);     // 4

// Using bitwise flags
function checkAccess(access: FileAccess) {
  if (access & FileAccess.Read) {
    console.log("Can read");
  }
  if (access & FileAccess.Write) {
    console.log("Can write");
  }
}

checkAccess(FileAccess.ReadWrite); // "Can read" and "Can write"

// Constant expressions
enum Computed {
  A = 1,
  B = A * 2,        // 2 - constant expression
  C = B + A,        // 3 - constant expression
  D = A << 2,       // 4 - constant expression
  E = ~A,           // -2 - constant expression
}

// Computed members (evaluated at runtime)
enum Runtime {
  A = 1,
  B = Math.random(),        // Computed at runtime
  C,                        // Error after computed member
}

// After a computed member, all subsequent members must be initialized
enum RuntimeCorrect {
  A = 1,
  B = Math.random(),
  C = 3,                    // Must be explicitly initialized
  D = Math.floor(Date.now() / 1000)
}

// Function calls as computed values
function getValue(): number {
  return 42;
}

enum FunctionEnum {
  A = 1,
  B = getValue(),  // Computed
  C = 3            // Must be explicit after computed
}

// Template literals in string enums
const prefix = "API";

enum Endpoints {
  Users = \`\${prefix}/users\`,         // Computed string
  Posts = \`\${prefix}/posts\`,
  Comments = \`\${prefix}/comments\`
}

// Constant expressions allowed:
enum MathEnum {
  A = 1,
  B = 2,
  Sum = A + B,              // OK: 3
  Product = A * B,          // OK: 2
  Power = A ** B,           // OK: 1
  BitwiseOr = A | B,        // OK: 3
  BitwiseAnd = A & B,       // OK: 0
  BitwiseXor = A ^ B,       // OK: 3
  LeftShift = A << B,       // OK: 4
  RightShift = B >> A,      // OK: 1
}

// NOT allowed in const enums:
// const enum ConstComputed {
//   A = 1,
//   B = Math.random()  // Error: const enum can't have computed members
// }

// Mixing constant and computed
enum Mixed {
  // Constant members
  None = 0,
  Read = 1,
  Write = 2,
  ReadWrite = Read | Write,  // 3 - constant expression
  
  // Computed member
  Timestamp = Date.now(),
  
  // Must be explicit after computed
  Other = 100
}`}
        </CodeBlock>

        <InfoBox type="info">
          Constant members are computed at compile time and can use arithmetic
          and bitwise operations. Computed members are evaluated at runtime and
          require explicit initialization for subsequent members.
        </InfoBox>
      </Section>

      <Section title="5. Ambient Enums">
        <p className="text-gray-700 dark:text-gray-300">
          Ambient enums (declared with declare keyword) describe existing enums
          from other files or libraries without generating JavaScript code.
        </p>

        <CodeBlock title="Ambient enum examples">
          {`// Ambient enum declaration
declare enum ExternalEnum {
  A,
  B,
  C
}

// This enum doesn't generate JavaScript code
// It's a type-level declaration only

// Use it as a type
let value: ExternalEnum = ExternalEnum.A;

// Typically used in .d.ts files
// Example: Describing a third-party library enum

// In some-library.d.ts:
declare enum LibraryStatus {
  Idle = 0,
  Loading = 1,
  Success = 2,
  Error = 3
}

// Now you can use it in your TypeScript code
function handleStatus(status: LibraryStatus) {
  switch (status) {
    case LibraryStatus.Idle:
      console.log("Waiting...");
      break;
    case LibraryStatus.Loading:
      console.log("Loading...");
      break;
    case LibraryStatus.Success:
      console.log("Done!");
      break;
    case LibraryStatus.Error:
      console.log("Error occurred");
      break;
  }
}

// Ambient const enum
declare const enum AmbientConst {
  A = 1,
  B = 2
}

// Used just like const enum
let ambientValue: AmbientConst = AmbientConst.A;

// When to use ambient enums:
// 1. Declaring types for external JavaScript libraries
// 2. Sharing type definitions without runtime code
// 3. Working with global enums from other sources
// 4. Creating type-only enum declarations

// Example: Declaring enum from a global library
// Imagine a library exposes a global 'AppMode' enum
declare enum AppMode {
  Development,
  Production,
  Test
}

// Now you can use it with type safety
function configure(mode: AppMode) {
  if (mode === AppMode.Production) {
    console.log("Production mode");
  }
}

// The actual enum object comes from the library at runtime
// TypeScript just provides type checking

// Ambient enums with string values
declare enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR"
}

// Use for type-safe logging
function log(level: LogLevel, message: string) {
  console.log(\`[\${level}] \${message}\`);
}

log(LogLevel.Info, "App started");

// Note: Ambient enums assume the enum exists at runtime
// If it doesn't, you'll get runtime errors
// Only use them when you're certain the enum will be present`}
        </CodeBlock>

        <InfoBox type="warning">
          Ambient enums declare that an enum exists somewhere else (like in a
          library or global scope). They don't generate any JavaScript code.
          Make sure the enum actually exists at runtime to avoid errors.
        </InfoBox>
      </Section>

      <Section title="6. Enum Alternatives and Best Practices">
        <p className="text-gray-700 dark:text-gray-300">
          While enums are useful, TypeScript offers alternatives that may be
          more suitable depending on your use case.
        </p>

        <CodeBlock title="Enum alternatives">
          {`// 1. Union of string literals (preferred by many)
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

let dir: Direction = "UP";  // Type-safe
// let invalid: Direction = "DIAGONAL"; // Error

// More concise than string enums
// No runtime code generated
// But loses namespace (Direction.Up vs "UP")

// 2. Const object with as const
const Direction = {
  Up: "UP",
  Down: "DOWN",
  Left: "LEFT",
  Right: "RIGHT"
} as const;

type Direction = typeof Direction[keyof typeof Direction];
// Type: "UP" | "DOWN" | "LEFT" | "RIGHT"

let dir2: Direction = Direction.Up;  // "UP"
// let invalid2: Direction = "DIAGONAL"; // Error

// Benefits:
// - Namespace (Direction.Up)
// - Type safety
// - No enum quirks
// - Works with Object.keys/values
// - Tree-shakeable

// 3. Object.freeze for runtime immutability
const Status = Object.freeze({
  Pending: "PENDING",
  Active: "ACTIVE",
  Complete: "COMPLETE"
} as const);

type Status = typeof Status[keyof typeof Status];

// 4. Namespace with constants
namespace Color {
  export const Red = "#FF0000";
  export const Green = "#00FF00";
  export const Blue = "#0000FF";
}

// Usage
let color: string = Color.Red;

// 5. Class with static properties
class HttpStatus {
  static readonly OK = 200;
  static readonly NotFound = 404;
  static readonly ServerError = 500;
  
  private constructor() {} // Prevent instantiation
}

let status = HttpStatus.OK;

// Comparison of approaches:

// String Enum
enum DirectionEnum {
  Up = "UP",
  Down = "DOWN"
}
// Pros: Dedicated syntax, namespaced
// Cons: Extra runtime code, enum quirks

// Union Type
type DirectionUnion = "UP" | "DOWN";
// Pros: No runtime code, simple
// Cons: No namespace, harder to iterate

// Const Object
const DirectionObj = {
  Up: "UP",
  Down: "DOWN"
} as const;
// Pros: Namespace, can iterate, tree-shakeable
// Cons: More verbose to set up types

// Best practices:

// ✅ Use string enums or const objects for:
// - Named constants
// - API values
// - Configuration options

// ✅ Use union types for:
// - Simple string/number sets
// - Discriminated unions
// - When you don't need a namespace

// ✅ Use const enums for:
// - Performance-critical code
// - When you need compile-time inlining
// - Internal implementation details

// ❌ Avoid numeric enums:
// - Not type-safe (accepts any number)
// - Unclear runtime values
// - Use string enums instead

// Real-world examples:

// Good: String enum for HTTP methods
enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

// Good: Const object for colors
const Colors = {
  Primary: "#007bff",
  Secondary: "#6c757d",
  Success: "#28a745",
  Danger: "#dc3545"
} as const;

// Good: Union type for simple cases
type Size = "small" | "medium" | "large";

// Avoid: Numeric enum
enum BadStatus {
  Pending,  // 0 - what does 0 mean?
  Active,   // 1
  Complete  // 2
}

// Better: String enum or const object
enum GoodStatus {
  Pending = "PENDING",
  Active = "ACTIVE",
  Complete = "COMPLETE"
}

// Utility function for const objects
function getEnumValues<T extends Record<string, string | number>>(
  enumObj: T
): Array<T[keyof T]> {
  return Object.values(enumObj);
}

const statusValues = getEnumValues(Colors);
// ["#007bff", "#6c757d", "#28a745", "#dc3545"]`}
        </CodeBlock>

        <InfoBox type="tip">
          Consider using const objects with <code>as const</code> or union types
          instead of enums for most use cases. They provide better type safety,
          are more flexible, and have no runtime overhead. String enums are
          still useful when you need a dedicated namespace and clear runtime
          values.
        </InfoBox>
      </Section>
    </div>
  );
}
