import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeScriptDebuggingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        TypeScript Debugging - Interview Questions
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Common TypeScript debugging scenarios with solutions. Each problem
        includes: What's wrong, Why it happens, and Exact fix.
      </p>

      <Section title="1. Type Inference Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging type inference problems.
        </p>

        <CodeBlock title="Problem 1: Type Widening">
          {`// ❌ WHAT'S WRONG
const status = "pending";  // Type: string (not "pending")
function setStatus(s: "pending" | "loading" | "success") {
  // ...
}
setStatus(status);  // Error: Argument of type 'string' is not assignable

// WHY IT HAPPENS
// TypeScript infers 'string' instead of literal type "pending"
// because const without 'as const' widens to the base type

// ✅ EXACT FIX
const status = "pending" as const;  // Type: "pending"
// OR
const status: "pending" | "loading" | "success" = "pending";
// OR
setStatus(status as "pending");`}
        </CodeBlock>

        <CodeBlock title="Problem 2: Array Type Inference">
          {`// ❌ WHAT'S WRONG
const colors = ["red", "green", "blue"];  // Type: string[]
type Color = typeof colors[number];  // Type: string (not union)

// WHY IT HAPPENS
// Arrays are inferred as mutable, so element type widens to string

// ✅ EXACT FIX
const colors = ["red", "green", "blue"] as const;  // readonly ["red", "green", "blue"]
type Color = typeof colors[number];  // "red" | "green" | "blue"`}
        </CodeBlock>

        <CodeBlock title="Problem 3: Object Property Inference">
          {`// ❌ WHAT'S WRONG
const config = {
  api: "https://api.example.com",
  timeout: 5000,
};
config.timeout = "5000";  // No error! Should be number

// WHY IT HAPPENS
// Object properties are inferred as their literal types initially
// but can be reassigned to wider types

// ✅ EXACT FIX
const config = {
  api: "https://api.example.com",
  timeout: 5000,
} as const;  // All properties readonly with literal types
// OR
const config: { api: string; timeout: number } = {
  api: "https://api.example.com",
  timeout: 5000,
};`}
        </CodeBlock>
      </Section>

      <Section title="2. Generic Type Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging generic type problems.
        </p>

        <CodeBlock title="Problem 4: Missing Generic Constraints">
          {`// ❌ WHAT'S WRONG
function getProperty<T>(obj: T, key: string) {
  return obj[key];  // Error: Element implicitly has 'any' type
}

// WHY IT HAPPENS
// TypeScript doesn't know that 'key' exists on type T
// Need constraint to ensure key is a property of T

// ✅ EXACT FIX
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];  // Type-safe!
}

// Usage
const user = { name: "John", age: 30 };
const name = getProperty(user, "name");  // Type: string
const age = getProperty(user, "age");    // Type: number`}
        </CodeBlock>

        <CodeBlock title="Problem 5: Generic Inference Failure">
          {`// ❌ WHAT'S WRONG
function createArray<T>(items: T[]): T[] {
  return items;
}
const numbers = createArray([1, 2, 3]);  // Type: number[]
const mixed = createArray([1, "two", 3]);  // Type: (string | number)[]
// But we want: [number, string, number]

// WHY IT HAPPENS
// TypeScript infers the most general type that fits all elements
// Arrays are covariant, so union types are created

// ✅ EXACT FIX
function createArray<T extends readonly unknown[]>(...items: T): T {
  return items;
}
const mixed = createArray(1, "two", 3);  // Type: [number, string, number]
// OR use tuple type explicitly
const mixed: [number, string, number] = [1, "two", 3];`}
        </CodeBlock>

        <CodeBlock title="Problem 6: Generic Default Parameter">
          {`// ❌ WHAT'S WRONG
interface Container<T> {
  value: T;
}
function createContainer<T>(value: T): Container<T> {
  return { value };
}
const container = createContainer(null);  // Type: Container<null>
// But we want Container<string | null>

// WHY IT HAPPENS
// TypeScript infers T as null when null is passed
// No default type provided

// ✅ EXACT FIX
interface Container<T = unknown> {
  value: T;
}
function createContainer<T = string>(value: T): Container<T> {
  return { value };
}
const container = createContainer(null);  // Type: Container<null>
const container2 = createContainer("hello");  // Type: Container<string>
// OR be explicit
const container3 = createContainer<string | null>(null);`}
        </CodeBlock>
      </Section>

      <Section title="3. Type Assertion & Type Guards">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging unsafe type assertions and missing type guards.
        </p>

        <CodeBlock title="Problem 7: Unsafe Type Assertion">
          {`// ❌ WHAT'S WRONG
const data = response.json() as User;  // Unsafe!
console.log(data.name);  // Might crash if data isn't User

// WHY IT HAPPENS
// Type assertion bypasses type checking
// Runtime data might not match the asserted type

// ✅ EXACT FIX
// Use type guard
function isUser(data: unknown): data is User {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "name" in data &&
    typeof (data as any).id === "string" &&
    typeof (data as any).name === "string"
  );
}

const data = await response.json();
if (isUser(data)) {
  console.log(data.name);  // Type-safe!
} else {
  throw new Error("Invalid user data");
}

// OR use validation library
import { z } from "zod";
const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
});
const data = UserSchema.parse(await response.json());  // Typed and validated`}
        </CodeBlock>

        <CodeBlock title="Problem 8: Missing Type Narrowing">
          {`// ❌ WHAT'S WRONG
function processValue(value: string | number) {
  return value.toUpperCase();  // Error: toUpperCase doesn't exist on number
}

// WHY IT HAPPENS
// TypeScript doesn't narrow the type automatically
// Need explicit type checking

// ✅ EXACT FIX
function processValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();  // Type narrowed to string
  }
  return value.toString();  // Type narrowed to number
}

// OR use type predicate
function isString(value: string | number): value is string {
  return typeof value === "string";
}

function processValue(value: string | number) {
  if (isString(value)) {
    return value.toUpperCase();
  }
  return value.toString();
}`}
        </CodeBlock>

        <CodeBlock title="Problem 9: Null/Undefined Not Checked">
          {`// ❌ WHAT'S WRONG
interface User {
  name: string;
  email?: string;
}
function getEmail(user: User): string {
  return user.email.toUpperCase();  // Error: Object is possibly 'undefined'
}

// WHY IT HAPPENS
// Optional property (email?) can be undefined
// TypeScript enforces null safety

// ✅ EXACT FIX
function getEmail(user: User): string {
  if (!user.email) {
    throw new Error("Email is required");
  }
  return user.email.toUpperCase();  // Type narrowed to string
}

// OR use optional chaining with default
function getEmail(user: User): string {
  return (user.email ?? "").toUpperCase();
}

// OR use non-null assertion (only if you're certain)
function getEmail(user: User): string {
  return user.email!.toUpperCase();  // ⚠️ Use sparingly!`}
        </CodeBlock>
      </Section>

      <Section title="4. Utility Type Issues">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging problems with utility types.
        </p>

        <CodeBlock title="Problem 10: Partial Not Working as Expected">
          {`// ❌ WHAT'S WRONG
interface User {
  id: string;
  name: string;
  email: string;
}
function updateUser(id: string, data: Partial<User>) {
  // ...
}
updateUser("123", { id: "456" });  // Should not allow changing id!

// WHY IT HAPPENS
// Partial makes ALL properties optional, including id
// Need to exclude certain properties

// ✅ EXACT FIX
function updateUser(
  id: string,
  data: Partial<Omit<User, "id">>
) {
  // Now id cannot be changed
}

// OR create custom utility type
type UpdateableUser = Partial<Pick<User, "name" | "email">> & {
  id: string;  // Keep id required
};

function updateUser(id: string, data: UpdateableUser) {
  // id is required, name and email are optional
}`}
        </CodeBlock>

        <CodeBlock title="Problem 11: Pick/Omit Type Errors">
          {`// ❌ WHAT'S WRONG
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}
type UserPreview = Pick<User, "id" | "name" | "invalid">;  // Error!

// WHY IT HAPPENS
// "invalid" is not a key of User
// Pick only works with existing keys

// ✅ EXACT FIX
type UserPreview = Pick<User, "id" | "name">;  // Valid keys only

// OR use keyof to ensure type safety
type UserKeys = keyof User;  // "id" | "name" | "email" | "role"
type UserPreview = Pick<User, Extract<UserKeys, "id" | "name">>;`}
        </CodeBlock>
      </Section>

      <Section title="5. Module Augmentation & Declaration Merging">
        <p className="text-gray-700 dark:text-gray-300">
          Debugging module augmentation and declaration merging issues.
        </p>

        <CodeBlock title="Problem 12: Module Augmentation Type Error">
          {`// ❌ WHAT'S WRONG
// node_modules/@types/react/index.d.ts (can't modify)
// We want to add custom property to React.Component

declare module "react" {
  interface Component {
    customMethod: () => void;  // Error: Cannot augment
  }
}

// WHY IT HAPPENS
// Module augmentation must be in ambient module declaration
// Need proper augmentation syntax

// ✅ EXACT FIX
// Create types/react-augment.d.ts
declare module "react" {
  namespace React {
    interface Component {
      customMethod?(): void;
    }
  }
}

// OR augment global types
declare global {
  namespace React {
    interface Component {
      customMethod?(): void;
    }
  }
}

// Usage
class MyComponent extends React.Component {
  componentDidMount() {
    this.customMethod?.();  // Now available!
  }
}`}
        </CodeBlock>

        <CodeBlock title="Problem 13: Declaration Merging Conflict">
          {`// ❌ WHAT'S WRONG
// types/user.d.ts
interface User {
  id: string;
  name: string;
}

// types/admin.d.ts
interface User {
  id: string;
  name: string;
  role: "admin";  // Error: Property 'role' conflicts
}

// WHY IT HAPPENS
// Declaration merging requires compatible types
// Conflicting property types cause errors

// ✅ EXACT FIX
// Option 1: Use intersection types
interface BaseUser {
  id: string;
  name: string;
}

interface AdminUser extends BaseUser {
  role: "admin";
}

type User = BaseUser | AdminUser;

// Option 2: Use namespace merging
namespace User {
  export interface Base {
    id: string;
    name: string;
  }
  
  export interface Admin extends Base {
    role: "admin";
  }
}

// Option 3: Use module augmentation properly
// types/user.d.ts
interface User {
  id: string;
  name: string;
}

// types/admin.d.ts
interface User {
  role?: "admin";  // Optional to allow merging
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Debugging Strategy:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Always check type inference - use explicit types when needed</li>
          <li>Use type guards instead of type assertions</li>
          <li>Check for null/undefined with optional chaining or type narrowing</li>
          <li>Verify generic constraints are correct</li>
          <li>Use const assertions to prevent type widening</li>
          <li>Module augmentation must be in ambient declarations</li>
          <li>Declaration merging requires compatible property types</li>
        </ul>
      </InfoBox>
    </div>
  );
}

