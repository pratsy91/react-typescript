import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TypeNarrowingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Type Narrowing
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Type narrowing is TypeScript's process of refining types to more
        specific types based on control flow analysis. It uses type guards,
        truthiness checks, equality checks, and other patterns to automatically
        narrow union types.
      </p>

      <Section title="1. Control Flow Analysis">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript analyzes code flow and automatically narrows types based on
          conditional checks, making your code both safe and convenient.
        </p>

        <CodeBlock title="Control flow analysis examples">
          {`// Basic narrowing with if statement
function process(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is number here
    console.log(value.toFixed(2));
  }
  // After if/else, value is string | number again
}

// Narrowing with early return
function format(value: string | null): string {
  if (value === null) {
    return "N/A";
  }
  // TypeScript knows value is string here (null was returned)
  return value.toUpperCase();
}

// Narrowing with throw
function getValue(value: string | undefined): string {
  if (value === undefined) {
    throw new Error("Value is required");
  }
  // TypeScript knows value is string here
  return value.toUpperCase();
}

// Multiple narrowing steps
function handle(value: string | number | null) {
  if (value === null) {
    return;
  }
  // value is string | number here

  if (typeof value === "string") {
    console.log(value.toUpperCase());
    return;
  }
  // value is number here
  console.log(value.toFixed(2));
}

// Narrowing in switch statements
type Status = "idle" | "loading" | "success" | "error";

function getStatusMessage(status: Status): string {
  switch (status) {
    case "idle":
      return "Not started";
    case "loading":
      return "Loading...";
    case "success":
      return "Complete";
    case "error":
      return "Failed";
  }
  // TypeScript knows all cases covered
}

// Control flow with try-catch
function parseJSON(json: string): unknown {
  let result: unknown;
  
  try {
    result = JSON.parse(json);
  } catch (error) {
    result = null;
  }
  
  return result; // unknown or null
}

// Narrowing with && operator
function printLength(value: string | null) {
  if (value && value.length > 0) {
    console.log(value.toUpperCase()); // value is string
  }
}

// Narrowing with || operator
function getDefault(value: string | null): string {
  return value || "default"; // If value is null, use "default"
}

// Narrowing in while loops
function countdown(start: number | null) {
  let count = start;
  
  while (count !== null && count > 0) {
    console.log(count); // count is number here
    count--;
  }
}

// Narrowing with for loops
function processArray(items: (string | number)[]) {
  for (const item of items) {
    if (typeof item === "string") {
      console.log(item.toUpperCase());
    } else {
      console.log(item.toFixed(2));
    }
  }
}

// Complex control flow
function complex(value: string | number | boolean | null) {
  if (value === null) {
    return "null";
  }
  
  if (typeof value === "boolean") {
    return value ? "yes" : "no";
  }
  
  if (typeof value === "number") {
    return value > 0 ? "positive" : "negative";
  }
  
  // TypeScript knows value is string here
  return value.toUpperCase();
}

// Narrowing with ternary operator
function format2(value: string | null): string {
  return value === null ? "N/A" : value.toUpperCase();
}

// Narrowing scope is limited to blocks
function scoped(value: string | null) {
  if (value !== null) {
    console.log(value.toUpperCase()); // OK: string
  }
  // value is string | null again outside the block
  // console.log(value.toUpperCase()); // Error: might be null
}

// Assignment narrows type
function assign(value: string | number) {
  let result: string;
  
  if (typeof value === "string") {
    result = value; // OK: value is string
  } else {
    result = value.toString(); // OK: value is number
  }
  
  return result;
}`}
        </CodeBlock>

        <InfoBox type="info">
          TypeScript's control flow analysis tracks the possible types of
          variables through your code's logic, narrowing types based on type
          guards, returns, throws, and other control flow statements.
        </InfoBox>
      </Section>

      <Section title="2. Truthiness Narrowing">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript can narrow types based on truthiness checks, eliminating
          null, undefined, and other falsy values from union types.
        </p>

        <CodeBlock title="Truthiness narrowing examples">
          {`// Basic truthiness check
function printName(name: string | null | undefined) {
  if (name) {
    console.log(name.toUpperCase()); // name is string
  }
}

// Truthiness with multiple falsy types
function getValue(value: string | number | null | undefined): string {
  if (value) {
    return String(value); // string | number (truthy values)
  }
  return "empty";
}

// Be careful with falsy values!
function processNumber(num: number | null) {
  if (num) {
    console.log(num * 2); // num is number, but excludes 0!
  }
}

// Better: explicit null check
function processNumber2(num: number | null) {
  if (num !== null) {
    console.log(num * 2); // num is number (includes 0)
  }
}

// Truthiness with strings
function processString(str: string | null) {
  if (str) {
    console.log(str.toUpperCase()); // str is string, but excludes ""
  }
}

// Explicit empty string check
function processString2(str: string | null) {
  if (str !== null) {
    console.log(str.toUpperCase()); // str is string (includes "")
  }
}

// Double negation (!! operator)
function isValid(value: string | null): boolean {
  return !!value; // Converts to boolean
}

// Truthiness in conditions
function format(value: string | null | undefined): string {
  // Eliminates null and undefined
  return value ? value.toUpperCase() : "N/A";
}

// Truthiness with logical AND
function process(value: string | null) {
  // Short-circuit: if value is falsy, doesn't access .length
  const length = value && value.length;
  console.log(length); // number | 0 | null
}

// Truthiness with logical OR
function getDisplayName(name: string | null | undefined): string {
  return name || "Anonymous"; // Uses "Anonymous" if name is falsy
}

// Nullish coalescing (better than ||)
function getDisplayName2(name: string | null | undefined): string {
  return name ?? "Anonymous"; // Only uses "Anonymous" if name is null/undefined
}

// Difference between || and ??
const value1 = "" || "default";    // "default" (empty string is falsy)
const value2 = "" ?? "default";    // "" (empty string is not nullish)

const value3 = 0 || "default";     // "default" (0 is falsy)
const value4 = 0 ?? "default";     // 0 (0 is not nullish)

// Truthiness in array filter
const mixed: (string | null | undefined)[] = ["a", null, "b", undefined, "c"];

// Removes null and undefined
const defined = mixed.filter(x => x); // (string | null | undefined)[]
// Still shows as union! Need type predicate for proper narrowing

// Better: with type predicate
const defined2 = mixed.filter((x): x is string => !!x); // string[]

// Truthiness with optional chaining
interface User {
  name?: string;
  address?: {
    city?: string;
  };
}

function getCity(user: User | null): string {
  // Optional chaining with nullish coalescing
  return user?.address?.city ?? "Unknown";
}

// Truthiness in nested conditions
function nested(value: string | null | undefined) {
  if (value) {
    if (value.length > 0) {
      console.log(value.toUpperCase()); // value is non-empty string
    }
  }
}

// Truthiness with objects
function processObject(obj: { value: string } | null) {
  if (obj) {
    console.log(obj.value); // obj is { value: string }
  }
}

// Empty object is truthy!
const emptyObj = {};
if (emptyObj) {
  console.log("This runs!"); // Empty objects are truthy
}

// Truthiness with arrays
function processArray(arr: number[] | null) {
  if (arr) {
    console.log(arr.length); // arr is number[]
  }
}

// Empty array is truthy!
const emptyArr: number[] = [];
if (emptyArr) {
  console.log("This runs!"); // Empty arrays are truthy
}

// Checking for empty array
function hasItems(arr: number[] | null): boolean {
  return arr !== null && arr.length > 0;
}

// Truthiness with NaN
function processNaN(value: number | null) {
  if (value) {
    // NaN is falsy, so this excludes NaN too
    console.log(value * 2);
  }
}

// Explicit NaN check
function processWithNaN(value: number | null) {
  if (value !== null && !isNaN(value)) {
    console.log(value * 2); // value is valid number
  }
}

// Common falsy values in JavaScript/TypeScript:
// false, 0, -0, 0n, "", null, undefined, NaN

// Common truthy values:
// true, any non-zero number, any non-empty string, objects, arrays, functions`}
        </CodeBlock>

        <InfoBox type="warning">
          Truthiness narrowing removes null and undefined, but also filters out
          other falsy values like 0, "", and false. Use explicit null/undefined
          checks when you need to preserve these values.
        </InfoBox>
      </Section>

      <Section title="3. Equality Narrowing">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript narrows types based on equality checks (===, !==, ==, !=),
          which is especially useful for literal types and discriminated unions.
        </p>

        <CodeBlock title="Equality narrowing examples">
          {`// Strict equality narrowing
function process(value: string | number, compare: string | number) {
  if (value === compare) {
    // Both must be the same type (intersection)
    // If they're equal, they share a common type
    console.log(value); // string | number
  }
}

// Narrowing with literal types
type Status = "pending" | "approved" | "rejected";

function handleStatus(status: Status) {
  if (status === "approved") {
    console.log("Access granted"); // status is "approved"
  } else if (status === "rejected") {
    console.log("Access denied"); // status is "rejected"
  } else {
    console.log("Waiting..."); // status is "pending"
  }
}

// Narrowing with null/undefined
function processValue(value: string | null) {
  if (value === null) {
    return "empty";
  }
  // value is string here
  return value.toUpperCase();
}

// Loose equality (== and !=)
function looseCheck(value: string | null | undefined) {
  if (value == null) {
    // Checks for both null AND undefined
    return "empty";
  }
  // value is string here
  return value.toUpperCase();
}

// Strict vs loose equality
function compare(value: string | null | undefined) {
  // Strict: only checks for null
  if (value === null) {
    return "null";
  }
  
  // Loose: checks for null OR undefined
  if (value == null) {
    return "nullish";
  }
  
  return value.toUpperCase();
}

// Narrowing with discrimination property
type Success = { status: "success"; data: string };
type Failure = { status: "error"; error: string };
type Result = Success | Failure;

function handle(result: Result) {
  if (result.status === "success") {
    console.log(result.data); // Success
  } else {
    console.log(result.error); // Failure
  }
}

// Equality with multiple checks
type Animal = "dog" | "cat" | "bird";

function makeSound(animal: Animal) {
  if (animal === "dog" || animal === "cat") {
    console.log("Mammal sound"); // "dog" | "cat"
  } else {
    console.log("Bird sound"); // "bird"
  }
}

// Narrowing with numbers
type Port = 80 | 443 | 3000 | 8080;

function getProtocol(port: Port): string {
  if (port === 80) {
    return "http";
  } else if (port === 443) {
    return "https";
  } else {
    return "custom";
  }
}

// Inequality narrowing
function exclude(value: string | number | boolean) {
  if (value !== "special") {
    // Eliminates "special" from string type
    // value is number | boolean | (string excluding "special")
  }
}

// Narrowing with switch on literals
type Color = "red" | "green" | "blue";

function getHex(color: Color): string {
  switch (color) {
    case "red":
      return "#FF0000";
    case "green":
      return "#00FF00";
    case "blue":
      return "#0000FF";
  }
}

// Complex equality narrowing
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else if (shape.kind === "square") {
    return shape.size ** 2;
  } else {
    return shape.width * shape.height;
  }
}

// Narrowing with boolean literals
type Response = 
  | { success: true; data: string }
  | { success: false; error: string };

function process2(response: Response) {
  if (response.success === true) {
    console.log(response.data);
  } else {
    console.log(response.error);
  }
}

// Simplified boolean check
function process3(response: Response) {
  if (response.success) {
    console.log(response.data);
  } else {
    console.log(response.error);
  }
}

// Narrowing with const
const STATUS_ACTIVE = "active" as const;

function checkStatus(status: string) {
  if (status === STATUS_ACTIVE) {
    // status could be any string, but we know it equals "active"
  }
}

// Equality narrowing with objects (reference equality)
const SPECIAL_OBJ = { type: "special" };

function checkObject(obj: object) {
  if (obj === SPECIAL_OBJ) {
    // obj is the exact same reference
  }
}

// Narrowing multiple values
function processTwo(a: string | number, b: string | number) {
  if (a === b) {
    // They're equal, so they must be the same type
    // But TypeScript still shows union type
  }
}

// Narrowing with enum values
enum Status2 {
  Pending,
  Active,
  Complete
}

function handle2(status: Status2) {
  if (status === Status2.Active) {
    console.log("Active state");
  }
}

// Template literal narrowing
type EventType = \`\${"mouse" | "key"}-\${"down" | "up"}\`;

function handleEvent(event: EventType) {
  if (event === "mouse-down") {
    // event is "mouse-down"
  }
}

// Narrowing with never
function assertNever(value: never): never {
  throw new Error(\`Unexpected value: \${value}\`);
}

type Status3 = "idle" | "loading" | "complete";

function handle3(status: Status3) {
  if (status === "idle") {
    // ...
  } else if (status === "loading") {
    // ...
  } else if (status === "complete") {
    // ...
  } else {
    assertNever(status); // status is never here
  }
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Equality narrowing works with literal types, discriminated unions, and
          null/undefined checks. Use === for strict equality and == when you
          want to check for both null and undefined simultaneously.
        </InfoBox>
      </Section>

      <Section title="4. Advanced Narrowing Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns combine multiple narrowing techniques for complex
          type refinement scenarios.
        </p>

        <CodeBlock title="Advanced narrowing patterns">
          {`// 1. Narrowing with type predicates
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());
  }
}

// 2. Narrowing with assertion functions
function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string");
  }
}

function process2(value: unknown) {
  assertString(value);
  console.log(value.toUpperCase()); // value is string
}

// 3. Narrowing with user-defined type guards
interface User {
  name: string;
  email: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "email" in value
  );
}

// 4. Multi-step narrowing
function complex(value: unknown) {
  // Step 1: Check if object
  if (typeof value !== "object" || value === null) {
    return;
  }
  
  // Step 2: Check if has specific property
  if (!("name" in value)) {
    return;
  }
  
  // Step 3: Check property type
  if (typeof value.name !== "string") {
    return;
  }
  
  // value is { name: string } & object
  console.log(value.name.toUpperCase());
}

// 5. Narrowing with instanceof and typeof combined
function process3(value: string | Date | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (value instanceof Date) {
    return value.toISOString();
  } else {
    return value.toFixed(2);
  }
}

// 6. Narrowing with optional chaining
interface Data {
  user?: {
    profile?: {
      name: string;
    };
  };
}

function getName(data: Data): string {
  const name = data.user?.profile?.name;
  if (name) {
    return name.toUpperCase(); // name is string
  }
  return "Unknown";
}

// 7. Narrowing with array methods
const mixed: (string | number)[] = [1, "two", 3, "four"];

const strings = mixed.filter((x): x is string => typeof x === "string");
// strings is string[]

const numbers = mixed.filter((x): x is number => typeof x === "number");
// numbers is number[]

// 8. Narrowing with discriminated unions
type Action =
  | { type: "increment"; amount: number }
  | { type: "decrement"; amount: number }
  | { type: "reset" };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "increment":
      return state + action.amount; // amount available
    case "decrement":
      return state - action.amount; // amount available
    case "reset":
      return 0; // no amount needed
  }
}

// 9. Narrowing with never for exhaustiveness
function assertNever2(value: never): never {
  throw new Error(\`Unexpected: \${value}\`);
}

type Status = "idle" | "loading" | "success" | "error";

function handle(status: Status): string {
  switch (status) {
    case "idle":
      return "Not started";
    case "loading":
      return "Loading...";
    case "success":
      return "Complete";
    case "error":
      return "Failed";
    default:
      return assertNever2(status); // Ensures all cases handled
  }
}

// 10. Narrowing with template literals
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = \`/api/\${string}\`;
type Request = \`\${HTTPMethod} \${Endpoint}\`;

function parseRequest(req: Request) {
  if (req.startsWith("GET")) {
    // req starts with "GET"
  } else if (req.startsWith("POST")) {
    // req starts with "POST"
  }
}

// 11. Narrowing with mapped types
type Result<T> = 
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function unwrap<T>(result: Result<T>): T {
  if (result.status === "success") {
    return result.data;
  }
  throw new Error(result.error);
}

// 12. Narrowing with conditional types
type Unwrap<T> = T extends Promise<infer U> ? U : T;

async function process4<T>(value: T | Promise<T>): Promise<Unwrap<T>> {
  if (value instanceof Promise) {
    return value; // Promise<T>
  }
  return value; // T
}

// 13. Narrowing with intersection types
type HasId = { id: number };
type HasName = { name: string };

function process5(value: HasId | HasName) {
  if ("id" in value && "name" in value) {
    // value is HasId & HasName
    console.log(value.id, value.name);
  }
}

// 14. Narrowing with branded types
type USD = number & { __brand: "USD" };
type EUR = number & { __brand: "EUR" };

function convertToUSD(amount: EUR): USD {
  // Conversion logic
  return (amount * 1.1) as USD;
}

// 15. Narrowing with readonly
function process6(value: readonly string[] | string[]) {
  if ("push" in value) {
    // value is string[] (mutable)
    value.push("new");
  } else {
    // value is readonly string[]
  }
}

// 16. Complex real-world narrowing
type ApiResponse<T> =
  | { status: 200; data: T }
  | { status: 400; error: string; field?: string }
  | { status: 401; error: "Unauthorized" }
  | { status: 500; error: string };

function handleResponse<T>(response: ApiResponse<T>): T {
  switch (response.status) {
    case 200:
      return response.data;
    case 400:
      if (response.field) {
        throw new Error(\`Invalid \${response.field}: \${response.error}\`);
      }
      throw new Error(response.error);
    case 401:
      throw new Error("Please log in");
    case 500:
      throw new Error(\`Server error: \${response.error}\`);
  }
}

// 17. Narrowing with utility types
type NonNullable2<T> = T extends null | undefined ? never : T;

function process7<T>(value: T): NonNullable2<T> {
  if (value === null || value === undefined) {
    throw new Error("Value is required");
  }
  return value as NonNullable2<T>;
}`}
        </CodeBlock>

        <InfoBox type="important">
          TypeScript's type narrowing is powerful and automatic. Combine typeof,
          instanceof, in operator, type guards, and control flow for precise
          type refinement. Always aim for exhaustiveness in discriminated unions
          using never checks.
        </InfoBox>
      </Section>

      <Section title="5. Common Narrowing Pitfalls">
        <p className="text-gray-700 dark:text-gray-300">
          Understanding common mistakes and limitations of type narrowing helps
          you write better TypeScript code.
        </p>

        <CodeBlock title="Narrowing pitfalls and solutions">
          {`// Pitfall 1: Narrowing doesn't persist across function boundaries
function isString2(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (typeof value === "string") {
    const fn = () => {
      // value is still unknown here (different scope)
      // console.log(value.toUpperCase()); // Error
    };
  }
}

// Solution: Pass narrowed value
function process_fixed(value: unknown) {
  if (typeof value === "string") {
    const fn = (str: string) => {
      console.log(str.toUpperCase()); // OK
    };
    fn(value);
  }
}

// Pitfall 2: Mutations can break narrowing
function process2(value: string | number) {
  if (typeof value === "string") {
    setTimeout(() => {
      // value might have changed by now
      console.log(value.toUpperCase()); // Still works, but risky
    }, 1000);
  }
}

// Pitfall 3: Truthiness removes more than just null/undefined
function getNumber(value: number | null): number {
  if (value) {
    return value; // Excludes 0!
  }
  return 0;
}

// Solution: Explicit null check
function getNumber_fixed(value: number | null): number {
  if (value !== null) {
    return value; // Includes 0
  }
  return 0;
}

// Pitfall 4: Type assertions bypass narrowing
function process3(value: unknown) {
  const str = value as string; // No narrowing, just assertion
  // console.log(str.toUpperCase()); // Compiles but might crash
}

// Solution: Use type guards
function process3_fixed(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // Safe
  }
}

// Pitfall 5: Array/Object checks with typeof
function process4(value: unknown) {
  if (typeof value === "object") {
    // value could be array, null, or object
    // console.log(value.length); // Error: might be object
  }
}

// Solution: More specific checks
function process4_fixed(value: unknown) {
  if (Array.isArray(value)) {
    console.log(value.length); // OK: array
  } else if (value !== null && typeof value === "object") {
    // OK: non-null object
  }
}

// Pitfall 6: Narrowing lost in async context
async function process5(value: string | null) {
  if (value !== null) {
    await someAsyncOperation();
    // TypeScript still knows value is string
    // But value might have been mutated externally
    console.log(value.toUpperCase());
  }
}

// Pitfall 7: Generic constraints don't narrow
function process6<T extends string | number>(value: T) {
  if (typeof value === "string") {
    // value is T & string, not just string
    console.log(value.toUpperCase());
  }
}

// Pitfall 8: Union of functions
type Fn = ((x: string) => void) | ((x: number) => void);

function call(fn: Fn, value: string | number) {
  // fn(value); // Error: can't safely call
}

// Solution: Narrow the function
function call_fixed(fn: Fn, value: string | number) {
  if (typeof value === "string") {
    (fn as (x: string) => void)(value);
  } else {
    (fn as (x: number) => void)(value);
  }
}

// Pitfall 9: Loose equality confusion
function process7(value: string | null | undefined) {
  if (value == null) {
    // Checks for BOTH null AND undefined
    return;
  }
  // value is string
}

// Pitfall 10: Narrowing with optional chaining doesn't propagate
interface User {
  profile?: {
    name: string;
  };
}

function getName(user: User) {
  if (user.profile?.name) {
    // user.profile is still optional here
    // console.log(user.profile.name); // Error
  }
}

// Solution: Check each level
function getName_fixed(user: User) {
  if (user.profile && user.profile.name) {
    console.log(user.profile.name); // OK
  }
}

// Best practices:
// 1. Use explicit checks instead of truthiness when possible
// 2. Be aware of type narrowing scope limitations
// 3. Prefer type guards over type assertions
// 4. Use discriminated unions for complex types
// 5. Add exhaustiveness checks with never
// 6. Test edge cases (null, undefined, 0, "", false, NaN)
// 7. Be careful with mutations in async code
// 8. Use const assertions for literal types
// 9. Leverage control flow analysis
// 10. Create custom type guards for complex validation`}
        </CodeBlock>

        <InfoBox type="tip">
          Type narrowing is powerful but has limitations. Be aware of scope
          boundaries, truthiness pitfalls, and the difference between type
          guards and type assertions. Always test edge cases with null,
          undefined, 0, and empty strings.
        </InfoBox>
      </Section>
    </div>
  );
}
