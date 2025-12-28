import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function SpecialTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Special Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript includes four special types that handle specific scenarios in
        the type system: any, unknown, never, and void. Understanding when and
        how to use these types is crucial for writing type-safe code.
      </p>

      <Section title="1. Any Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            any
          </code>{" "}
          type disables all type checking. It's an escape hatch that tells
          TypeScript "I know what I'm doing, don't check this."
        </p>

        <CodeBlock title="Any type examples">
          {`// Basic any type
let value: any = 42;
value = "string";    // OK
value = true;        // OK
value = { x: 1 };    // OK
value = [1, 2, 3];   // OK
value = null;        // OK
value = undefined;   // OK

// Any allows any operation (no type checking)
let anyValue: any = "hello";
anyValue.toUpperCase();     // OK (string method)
anyValue.someMethod();      // OK (no error, but might fail at runtime)
anyValue.prop.nested.deep;  // OK (no error)
anyValue();                 // OK (treating as function)
new anyValue();             // OK (treating as constructor)

// Any propagates through operations
let x: any = 10;
let y = x + 5;     // y is type any (not number!)
let z = x.foo();   // z is type any

// Function parameters and returns
function processData(data: any): any {
  return data.value; // No type checking
}

let result = processData({ value: 42 });
result.anything(); // No error!

// When any might be necessary (try to avoid)
// 1. Migrating JavaScript to TypeScript gradually
let legacyData: any;

// 2. Working with dynamic data (prefer unknown)
function parseJSON(json: string): any {
  return JSON.parse(json);
}

// 3. Third-party libraries without types (use @types if available)
declare function legacyLibFunction(param: any): any;

// Arrays and objects with any
let mixedArray: any[] = [1, "two", true, { x: 4 }];
let dynamicObj: { [key: string]: any } = {
  name: "John",
  age: 30,
  data: { nested: true }
};

// Any with type assertions (redundant but possible)
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// noImplicitAny compiler option
// When enabled, TypeScript errors on implicit any types
function badFunction(param) { // Error if noImplicitAny is true
  return param.value;
}`}
        </CodeBlock>

        <InfoBox type="warning">
          <strong>Avoid any whenever possible!</strong> It defeats the purpose
          of TypeScript. Use unknown for type-safe dynamic types, or proper type
          annotations. The any type should be a last resort.
        </InfoBox>
      </Section>

      <Section title="2. Unknown Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            unknown
          </code>{" "}
          type is the type-safe counterpart of any. You can assign any value to
          unknown, but you must narrow the type before using it.
        </p>

        <CodeBlock title="Unknown type examples">
          {`// Basic unknown type
let value: unknown = 42;
value = "string";    // OK
value = true;        // OK
value = { x: 1 };    // OK
value = null;        // OK
value = undefined;   // OK

// Cannot use unknown without type checking
let unknownValue: unknown = "hello";
// unknownValue.toUpperCase(); // Error: Object is of type 'unknown'
// unknownValue.length;        // Error: Object is of type 'unknown'

// Must narrow the type first
if (typeof unknownValue === "string") {
  console.log(unknownValue.toUpperCase()); // OK now!
  console.log(unknownValue.length);        // OK now!
}

// Type guards with unknown
function processValue(value: unknown): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  
  if (typeof value === "boolean") {
    return value ? "yes" : "no";
  }
  
  return "unknown type";
}

// Unknown with instanceof
class Dog {
  bark() {
    return "Woof!";
  }
}

function handlePet(pet: unknown) {
  if (pet instanceof Dog) {
    console.log(pet.bark()); // OK - type narrowed to Dog
  }
}

// Unknown with custom type guards
interface User {
  name: string;
  age: number;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "age" in value &&
    typeof (value as User).name === "string" &&
    typeof (value as User).age === "number"
  );
}

function greetUser(value: unknown) {
  if (isUser(value)) {
    console.log(\`Hello, \${value.name}\`); // OK - type narrowed to User
  }
}

// Safe JSON parsing with unknown
function safeParseJSON(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

let data = safeParseJSON('{"name": "John"}');
if (typeof data === "object" && data !== null && "name" in data) {
  console.log((data as { name: string }).name);
}

// Unknown in union types
type ApiResponse = { success: true; data: unknown } | { success: false; error: string };

function handleResponse(response: ApiResponse) {
  if (response.success) {
    // Must check response.data type before using
    if (typeof response.data === "string") {
      console.log(response.data.toUpperCase());
    }
  } else {
    console.error(response.error);
  }
}

// Unknown with type assertions (use carefully)
let someUnknown: unknown = "hello";
let str: string = someUnknown as string; // Assertion (be sure it's correct!)

// Intersection with unknown
type T1 = unknown & string;  // Type: string
type T2 = unknown & number;  // Type: number
type T3 = unknown & unknown; // Type: unknown

// Union with unknown
type T4 = unknown | string;  // Type: unknown (unknown absorbs)
type T5 = unknown | number;  // Type: unknown (unknown absorbs)
type T6 = unknown | unknown; // Type: unknown`}
        </CodeBlock>

        <InfoBox type="tip">
          <strong>Prefer unknown over any!</strong> Unknown forces you to check
          types before use, providing type safety while still allowing
          flexibility. It's perfect for API responses, JSON parsing, and user
          input.
        </InfoBox>
      </Section>

      <Section title="3. Never Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            never
          </code>{" "}
          type represents values that never occur. It's used for functions that
          never return or for exhaustive type checking.
        </p>

        <CodeBlock title="Never type examples">
          {`// Functions that never return
function throwError(message: string): never {
  throw new Error(message);
  // No return statement - function never completes normally
}

function infiniteLoop(): never {
  while (true) {
    console.log("This runs forever");
  }
  // Never reaches the end
}

// Never in conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

type Result1 = NonNullable<string | null>;     // Type: string
type Result2 = NonNullable<number | undefined>; // Type: number

// Exhaustive type checking with never
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default:
      // If we add a new shape type and forget to handle it,
      // TypeScript will error here
      const exhaustiveCheck: never = shape;
      throw new Error(\`Unhandled shape: \${exhaustiveCheck}\`);
  }
}

// Never in union types
type T1 = string | never;  // Type: string (never is removed)
type T2 = number | never;  // Type: number (never is removed)
type T3 = never | never;   // Type: never

// Never in intersection types
type T4 = string & never;  // Type: never (intersection with never)
type T5 = number & never;  // Type: never (intersection with never)

// Unreachable code detection
function example(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
    return;
  }
  
  if (typeof value === "number") {
    console.log(value.toFixed(2));
    return;
  }
  
  // This code is unreachable - value is never
  value; // Type: never
}

// Never with type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed());
  } else {
    // value is never here (all possibilities exhausted)
    const exhaustive: never = value;
  }
}

// Functions that might throw (not never)
function mightThrow(value: number): number {
  if (value < 0) {
    throw new Error("Negative value");
  }
  return value * 2; // Can return normally, so return type is number
}

// Never as function parameter (can never be called)
function cannotCall(param: never): void {
  // This function can never be called because
  // there's no value that can be assigned to never
}

// cannotCall("test");  // Error: Argument of type 'string' is not assignable to parameter of type 'never'

// Helper function for exhaustive checks
function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

type Color = "red" | "green" | "blue";

function printColor(color: Color): void {
  switch (color) {
    case "red":
      console.log("Red");
      break;
    case "green":
      console.log("Green");
      break;
    case "blue":
      console.log("Blue");
      break;
    default:
      assertNever(color); // Will error if we miss a case
  }
}

// Never with conditional types (filtering)
type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T];

interface Example {
  name: string;
  age: number;
  greet(): void;
  calculate(): number;
}

type DataKeys = NonFunctionKeys<Example>; // Type: "name" | "age"`}
        </CodeBlock>

        <InfoBox type="info">
          The never type is crucial for exhaustive type checking. When you
          handle all cases in a discriminated union, TypeScript infers never for
          the default case, ensuring compile-time safety when adding new
          variants.
        </InfoBox>
      </Section>

      <Section title="4. Void Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            void
          </code>{" "}
          type represents the absence of a return value. It's commonly used for
          functions that don't return anything.
        </p>

        <CodeBlock title="Void type examples">
          {`// Basic void functions
function logMessage(message: string): void {
  console.log(message);
  // No return statement
}

function processData(data: string[]): void {
  data.forEach(item => console.log(item));
  // No return value
}

// Void functions can have return statements without values
function conditional(condition: boolean): void {
  if (condition) {
    console.log("True");
    return; // OK - returning nothing
  }
  console.log("False");
}

// Void functions can return undefined explicitly
function explicitUndefined(): void {
  console.log("Done");
  return undefined; // OK - void accepts undefined
}

// Variables of type void (rarely used)
let unusable: void = undefined;
// let invalid: void = null; // Error in strict mode
// let invalid2: void = 42;  // Error

// Void vs undefined
function returnsVoid(): void {
  // Doesn't need to return anything
}

function returnsUndefined(): undefined {
  return undefined; // Must explicitly return undefined
}

// Callback functions with void
function executeCallback(callback: () => void): void {
  callback();
}

executeCallback(() => {
  console.log("Callback executed");
});

// Array methods with void
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num): void => {
  console.log(num * 2);
});

// Void in function types
type VoidFunction = () => void;
type LogFunction = (message: string) => void;
type ProcessFunction<T> = (item: T) => void;

const log: LogFunction = (msg) => {
  console.log(msg);
};

const process: ProcessFunction<number> = (num) => {
  console.log(num * 2);
};

// Important: void return type doesn't prevent returning values
// It just ignores them (contextual typing quirk)
type VoidFunc = () => void;

const func: VoidFunc = () => {
  return 42; // OK! Return value is ignored
};

const result = func(); // Type: void (number is ignored)
// console.log(result); // result is void

// This is useful for callbacks like forEach
const nums = [1, 2, 3];
nums.forEach((num) => {
  return num * 2; // OK even though forEach expects void
});

// Async functions with void
async function fetchData(): Promise<void> {
  const response = await fetch("api/data");
  console.log("Data fetched");
  // No return value
}

// Event handlers with void
interface ButtonProps {
  onClick: (event: MouseEvent) => void;
  onMouseEnter?: () => void;
  onSubmit?: (data: FormData) => void;
}

// Void in React components
function Component() {
  const handleClick = (): void => {
    console.log("Clicked");
  };
  
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    console.log("Submitted");
  };
  
  return null;
}

// Void vs never comparison
function returnsVoid2(): void {
  console.log("This function completes");
  // Returns (with no value)
}

function returnsNever(): never {
  throw new Error("Never returns");
  // Never completes
}

// Method with void return
class Logger {
  private prefix: string;
  
  constructor(prefix: string) {
    this.prefix = prefix;
  }
  
  log(message: string): void {
    console.log(\`[\${this.prefix}] \${message}\`);
  }
  
  error(message: string): void {
    console.error(\`[\${this.prefix}] ERROR: \${message}\`);
  }
}

// Generic function with void
function executeAll<T>(items: T[], action: (item: T) => void): void {
  for (const item of items) {
    action(item);
  }
}

executeAll([1, 2, 3], (num) => {
  console.log(num * 2);
});`}
        </CodeBlock>

        <InfoBox type="tip">
          Use void for functions that don't return values. The key difference
          from undefined is that void means "I don't care about the return
          value" while undefined means "the return value is specifically
          undefined". Void is more flexible for callback types.
        </InfoBox>
      </Section>

      <Section title="Comparison: Special Types">
        <CodeBlock title="When to use each special type">
          {`// ANY - Avoid! Only use when absolutely necessary
// ❌ Bad: Loses all type safety
function processAny(data: any) {
  return data.value.nested.prop; // No safety!
}

// UNKNOWN - Use for dynamic/untrusted data
// ✅ Good: Type-safe handling of dynamic data
function processUnknown(data: unknown) {
  if (typeof data === "object" && data !== null) {
    // Safe to use after checking
  }
}

// NEVER - Use for impossibility and exhaustive checks
// ✅ Good: Exhaustive checking
type Status = "pending" | "approved" | "rejected";

function handleStatus(status: Status) {
  switch (status) {
    case "pending":
      return "Waiting";
    case "approved":
      return "Accepted";
    case "rejected":
      return "Denied";
    default:
      const exhaustive: never = status;
      throw new Error(\`Unhandled status: \${exhaustive}\`);
  }
}

// VOID - Use for functions with no return value
// ✅ Good: Clear intent - no return value expected
function logAction(action: string): void {
  console.log(\`Action: \${action}\`);
}

// Type hierarchy
// - unknown is the top type (all types assignable to it)
// - never is the bottom type (assignable to all types)
// - any breaks the type system

let neverVal: never;
let unknownVal: unknown;
let anyVal: any;

// Never to anything
let str: string = neverVal;     // OK
let num: number = neverVal;     // OK
let bool: boolean = neverVal;   // OK

// Anything to unknown
unknownVal = "string";          // OK
unknownVal = 42;                // OK
unknownVal = true;              // OK

// Any breaks rules
anyVal = "test";                // OK
str = anyVal;                   // OK (no error, but unsafe!)
num = anyVal;                   // OK (no error, but unsafe!)`}
        </CodeBlock>

        <InfoBox type="important">
          <strong>Key Takeaways:</strong>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              <strong>any:</strong> Disables type checking - avoid unless
              absolutely necessary
            </li>
            <li>
              <strong>unknown:</strong> Type-safe alternative to any - requires
              type narrowing
            </li>
            <li>
              <strong>never:</strong> Represents impossible values - used for
              exhaustive checking
            </li>
            <li>
              <strong>void:</strong> No return value - used for side-effect
              functions
            </li>
          </ul>
        </InfoBox>
      </Section>
    </div>
  );
}
