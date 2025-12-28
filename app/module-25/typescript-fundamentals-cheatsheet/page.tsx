import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeScriptFundamentalsCheatsheetPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        TypeScript Fundamentals - Interview Cheatsheet
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Quick reference for TypeScript fundamentals commonly asked in
        interviews.
      </p>

      <Section title="1. Core Type System Quick Reference">
        <p className="text-gray-700 dark:text-gray-300">
          Essential TypeScript types and concepts for interviews.
        </p>

        <CodeBlock title="Primitive & Special Types">
          {`// Primitive Types
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let nul: null = null;
let undef: undefined = undefined;
let sym: symbol = Symbol("key");
let big: bigint = 100n;

// Special Types
let anyValue: any = "anything";  // ⚠️ Avoid in production
let unknownValue: unknown = "unknown";  // ✅ Use instead of any
let neverValue: never;  // For functions that never return
let voidValue: void;  // For functions that return nothing

// Type Guards
if (typeof value === "string") {
  // value is string here
}

if (value instanceof Date) {
  // value is Date here
}

if ("property" in object) {
  // object has property
}`}
        </CodeBlock>

        <CodeBlock title="Union, Intersection, Literal Types">
          {`// Union Types
type Status = "pending" | "loading" | "success" | "error";
type ID = string | number;

// Intersection Types
type User = { name: string } & { email: string };

// Literal Types
const direction = "north" as const;  // Type: "north"
type Direction = "north" | "south" | "east" | "west";

// Discriminated Unions (Interview Favorite!)
type Result<T> =
  | { type: "success"; data: T }
  | { type: "error"; error: string };

function handleResult<T>(result: Result<T>) {
  switch (result.type) {
    case "success":
      return result.data;  // TypeScript knows this is T
    case "error":
      return result.error;  // TypeScript knows this is string
  }
}`}
        </CodeBlock>

        <CodeBlock title="Generics - Interview Essential">
          {`// Basic Generic
function identity<T>(arg: T): T {
  return arg;
}

// Generic with Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Generic with Default
interface Container<T = string> {
  value: T;
}

// Multiple Generics
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Generic Classes
class Box<T> {
  constructor(private value: T) {}
  getValue(): T {
    return this.value;
  }
}

// Generic Utility Types (Common Interview Question)
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;`}
        </CodeBlock>

        <CodeBlock title="Type Inference & Assertions">
          {`// Type Inference
const arr = [1, 2, 3];  // Type: number[]
const obj = { name: "John", age: 30 };  // Type: { name: string; age: number }

// Type Assertions
const value = someValue as string;
const value2 = <string>someValue;  // Alternative syntax

// Const Assertions
const config = {
  api: "https://api.example.com",
  timeout: 5000,
} as const;  // Deeply readonly

// Type Guards (Better than assertions!)
function isString(value: unknown): value is string {
  return typeof value === "string";
}

if (isString(value)) {
  // value is string here
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Advanced Type Patterns - Interview Favorites">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns frequently asked in senior-level interviews.
        </p>

        <CodeBlock title="Conditional Types">
          {`// Basic Conditional Type
type IsString<T> = T extends string ? true : false;

// Extract from Promise
type Awaited<T> = T extends Promise<infer U> ? U : T;

// Extract Function Return Type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Extract Function Parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Non-nullable
type NonNullable<T> = T extends null | undefined ? never : T;

// Flatten Array
type Flatten<T> = T extends (infer U)[] ? U : T;

// Deep Readonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};`}
        </CodeBlock>

        <CodeBlock title="Mapped Types & Template Literals">
          {`// Mapped Types
type Optional<T> = {
  [P in keyof T]?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Template Literal Types
type EventName = "click" | "change" | "submit";
type HandlerName = \`on\${Capitalize<EventName>}\`;  // "onClick" | "onChange" | "onSubmit"

// API Route Types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiRoute = \`/api/\${string}\`;
type MethodRoute = \`\${HttpMethod} \${ApiRoute}\`;

// String Manipulation
type Uppercase<S extends string> = // Built-in
type Lowercase<S extends string> = // Built-in
type Capitalize<S extends string> = // Built-in
type Uncapitalize<S extends string> = // Built-in`}
        </CodeBlock>

        <CodeBlock title="Branded Types & Type Predicates">
          {`// Branded Types (Nominal Typing)
type UserId = string & { readonly __brand: unique symbol };
type ProductId = string & { readonly __brand: unique symbol };

function createUserId(id: string): UserId {
  return id as UserId;
}

// Type Predicates
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

// Exhaustive Checking
function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

type Status = "pending" | "loading" | "success";
function handleStatus(status: Status) {
  switch (status) {
    case "pending":
      return "waiting";
    case "loading":
      return "loading";
    case "success":
      return "done";
    default:
      return assertNever(status);  // Ensures exhaustiveness
  }
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Interview Tips:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Always prefer type guards over type assertions</li>
          <li>Use discriminated unions for state management</li>
          <li>Understand the difference between any, unknown, and never</li>
          <li>Know when to use generics vs union types</li>
          <li>Be able to explain conditional types and mapped types</li>
          <li>Understand type inference and when it fails</li>
        </ul>
      </InfoBox>
    </div>
  );
}

