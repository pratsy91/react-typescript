import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function NonNullAssertionPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Non-null Assertion Operator
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        The non-null assertion operator (postfix{" "}
        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
          !
        </code>
        ) tells TypeScript that a value is not null or undefined, even if the
        type system thinks it might be. It's a shorthand way to assert that you
        know better than the compiler.
      </p>

      <Section title="1. Basic Non-null Assertions">
        <p className="text-gray-700 dark:text-gray-300">
          The postfix ! operator removes null and undefined from a type without
          explicit checking.
        </p>

        <CodeBlock title="Basic non-null assertion examples">
          {`// Without non-null assertion
function getLength(str: string | null): number {
  // return str.length; // Error: Object is possibly 'null'
  
  if (str !== null) {
    return str.length; // OK - type guard
  }
  return 0;
}

// With non-null assertion
function getLengthAsserted(str: string | null): number {
  return str!.length; // No error - we're asserting str is not null
}

// Be careful! This will crash at runtime if str is null
getLengthAsserted(null); // Runtime error!

// Optional chaining vs non-null assertion
let value: string | null = "hello";

// Optional chaining - safe
let length1 = value?.length; // Type: number | undefined

// Non-null assertion - unsafe
let length2 = value!.length; // Type: number

// Removing undefined
function process(name: string | undefined) {
  // console.log(name.toUpperCase()); // Error: Object is possibly 'undefined'
  console.log(name!.toUpperCase()); // OK - asserting name is defined
}

// Multiple non-null assertions
let nested: { value?: { data?: string } } = {};

// Without assertion
// let str = nested.value.data; // Error: possibly undefined

// With non-null assertions
let str = nested.value!.data!; // No error, but dangerous!

// Array access with non-null assertion
let array: number[] = [1, 2, 3];
let first = array[0]; // Type: number | undefined

// Asserting element exists
let firstAsserted = array[0]!; // Type: number

// Object property access
interface User {
  name?: string;
  email?: string;
}

let user: User = { name: "John" };

// Without assertion
// let nameUpper = user.name.toUpperCase(); // Error: possibly undefined

// With assertion
let nameUpper = user.name!.toUpperCase(); // Assumes name is defined

// Function return values
function findUser(id: number): User | undefined {
  if (id === 1) {
    return { name: "John", email: "john@example.com" };
  }
  return undefined;
}

// Asserting the result exists
let foundUser = findUser(1)!;
let userName = foundUser.name;

// Map/Set operations
let map = new Map<string, number>();
map.set("age", 30);

// get() returns number | undefined
let age = map.get("age"); // Type: number | undefined
let ageAsserted = map.get("age")!; // Type: number

// DOM element access
let element = document.getElementById("myElement")!;
// Type: HTMLElement (not HTMLElement | null)

element.style.color = "red"; // No null check needed

// Input elements
let input = document.querySelector("input")!;
// Type: HTMLInputElement (not HTMLInputElement | null)

input.value = "Hello";`}
        </CodeBlock>

        <InfoBox type="warning">
          The non-null assertion operator bypasses TypeScript's safety checks.
          If you're wrong about the value not being null/undefined, you'll get a
          runtime error. Use it only when you're absolutely certain!
        </InfoBox>
      </Section>

      <Section title="2. Common Use Cases">
        <p className="text-gray-700 dark:text-gray-300">
          There are some scenarios where non-null assertions are commonly used,
          though alternatives are often safer.
        </p>

        <CodeBlock title="Common non-null assertion patterns">
          {`// 1. DOM Manipulation (when you know element exists)
function initializeApp() {
  const app = document.getElementById("app")!;
  const header = document.querySelector(".header")!;
  const button = document.querySelector("button")!;
  
  app.innerHTML = "<h1>Hello</h1>";
  header.classList.add("active");
  button.addEventListener("click", () => {});
}

// 2. Array operations (when you know array isn't empty)
function processFirst(items: string[]) {
  // You know items has at least one element
  const first = items[0]!;
  return first.toUpperCase();
}

// 3. Map/Object access (when you know key exists)
function getConfig(key: string) {
  const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000
  };
  
  return (config as any)[key]!;
}

// 4. After filtering null/undefined
let values: (string | null)[] = ["a", null, "b", null, "c"];
let strings = values.filter((v): v is string => v !== null);
// strings is string[], but TypeScript might need help

let first = strings[0]!; // We know array isn't empty after filter

// 5. Class properties initialized in helper method
class Component {
  private element!: HTMLElement; // Definite assignment assertion
  
  constructor() {
    this.initialize();
  }
  
  private initialize() {
    this.element = document.createElement("div");
  }
  
  render() {
    // element is guaranteed to be initialized
    this.element.textContent = "Hello";
  }
}

// 6. React refs (when you know ref is attached)
/*
function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    // After component mounts, ref.current will be set
    inputRef.current!.focus();
  };
  
  return <input ref={inputRef} />;
}
*/

// 7. Optional chaining with non-null assertion
interface DeepObject {
  level1?: {
    level2?: {
      level3?: string;
    };
  };
}

let obj: DeepObject = {
  level1: {
    level2: {
      level3: "value"
    }
  }
};

// Combining optional chaining and non-null assertion
let value1 = obj.level1?.level2?.level3!; // Assert level3 exists if level2 exists

// 8. After type guards
function processValue(value: string | null) {
  if (value === null) {
    throw new Error("Value cannot be null");
  }
  
  // We already checked, but TypeScript might not know
  console.log(value!.toUpperCase());
  // Better: TypeScript should infer value is string here
  console.log(value.toUpperCase()); // This works too!
}

// 9. Definite assignment in constructors
class Database {
  private connection!: Connection; // Tell TS it will be assigned
  
  constructor() {
    this.connect();
  }
  
  private connect() {
    this.connection = createConnection();
  }
  
  query(sql: string) {
    return this.connection.execute(sql);
  }
}

// 10. Environment variables (when you know they exist)
const API_URL = process.env.REACT_APP_API_URL!;
const API_KEY = process.env.REACT_APP_API_KEY!;

// 11. Regex match groups
const text = "Hello, World!";
const match = text.match(/Hello, (\w+)!/);

if (match) {
  // We know match[1] exists because regex has a capture group
  const word = match[1]!;
  console.log(word); // "World"
}

// 12. Array find (when you're certain element exists)
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
];

// You know id 1 exists
const user = users.find(u => u.id === 1)!;
console.log(user.name);

// 13. Object.keys with known keys
interface Config {
  host: string;
  port: number;
}

function printConfig(config: Config) {
  const keys = Object.keys(config) as (keyof Config)[];
  
  keys.forEach(key => {
    console.log(config[key]);
  });
}`}
        </CodeBlock>

        <InfoBox type="tip">
          While these patterns are common, consider if a safer alternative
          exists. Optional chaining (?.), nullish coalescing (??), or explicit
          type guards are often better choices.
        </InfoBox>
      </Section>

      <Section title="3. Safer Alternatives">
        <p className="text-gray-700 dark:text-gray-300">
          Before using non-null assertions, consider these safer alternatives
          that provide runtime protection.
        </p>

        <CodeBlock title="Safer alternatives to non-null assertion">
          {`// ❌ BAD: Non-null assertion without check
function bad(str: string | null) {
  return str!.length; // Will crash if str is null
}

// ✅ GOOD: Type guard
function good1(str: string | null) {
  if (str === null) {
    return 0;
  }
  return str.length; // TypeScript knows str is string
}

// ✅ GOOD: Optional chaining with default
function good2(str: string | null) {
  return str?.length ?? 0; // Safe fallback
}

// ❌ BAD: Asserting DOM element exists
function badDOM() {
  const el = document.getElementById("app")!;
  el.textContent = "Hello";
}

// ✅ GOOD: Check before use
function goodDOM() {
  const el = document.getElementById("app");
  if (!el) {
    console.error("Element not found");
    return;
  }
  el.textContent = "Hello";
}

// ✅ GOOD: Early return pattern
function goodDOM2() {
  const el = document.getElementById("app");
  if (!el) return;
  
  // TypeScript knows el is HTMLElement here
  el.textContent = "Hello";
}

// ❌ BAD: Array access assertion
function badArray(items: string[]) {
  return items[0]!.toUpperCase();
}

// ✅ GOOD: Check array length
function goodArray1(items: string[]) {
  if (items.length === 0) {
    throw new Error("Array is empty");
  }
  return items[0].toUpperCase();
}

// ✅ GOOD: Use optional chaining
function goodArray2(items: string[]) {
  return items[0]?.toUpperCase() ?? "";
}

// ❌ BAD: Multiple assertions
function badNested(obj: { a?: { b?: { c?: string } } }) {
  return obj.a!.b!.c!;
}

// ✅ GOOD: Optional chaining
function goodNested(obj: { a?: { b?: { c?: string } } }) {
  return obj.a?.b?.c ?? "default";
}

// ❌ BAD: Map get assertion
function badMap(map: Map<string, number>, key: string) {
  return map.get(key)!;
}

// ✅ GOOD: Check with has()
function goodMap1(map: Map<string, number>, key: string) {
  if (!map.has(key)) {
    throw new Error(\`Key \${key} not found\`);
  }
  return map.get(key)!; // Now it's safe
}

// ✅ GOOD: Use default value
function goodMap2(map: Map<string, number>, key: string) {
  return map.get(key) ?? 0;
}

// ❌ BAD: Find with assertion
function badFind(users: User[], id: number) {
  return users.find(u => u.id === id)!;
}

// ✅ GOOD: Check result
function goodFind1(users: User[], id: number) {
  const user = users.find(u => u.id === id);
  if (!user) {
    throw new Error(\`User \${id} not found\`);
  }
  return user;
}

// ✅ GOOD: Return null/undefined
function goodFind2(users: User[], id: number): User | undefined {
  return users.find(u => u.id === id);
}

// ❌ BAD: Ref assertion in React
/*
function BadComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleClick = () => {
    ref.current!.focus(); // Might fail if component unmounted
  };
  
  return <div ref={ref} onClick={handleClick} />;
}
*/

// ✅ GOOD: Check ref
/*
function GoodComponent() {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  
  return <div ref={ref} onClick={handleClick} />;
}
*/

// Custom helper functions for safe access
function getOrThrow<T>(value: T | null | undefined, message: string): T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
  return value;
}

function getOrDefault<T>(value: T | null | undefined, defaultValue: T): T {
  return value ?? defaultValue;
}

// Usage
const element = getOrThrow(
  document.getElementById("app"),
  "App element not found"
);

const user = getOrDefault(
  users.find(u => u.id === 1),
  { id: 0, name: "Guest" }
);

// Type guard helper
function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

// Usage
const values: (string | null)[] = ["a", null, "b"];
const strings = values.filter(isDefined); // Type: string[]

// Assert helper with runtime check
function assertDefined<T>(
  value: T | null | undefined,
  message: string = "Value is null or undefined"
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}

// Usage
let maybeString: string | null = getValue();
assertDefined(maybeString, "String is required");
// TypeScript knows maybeString is string here
console.log(maybeString.toUpperCase());`}
        </CodeBlock>

        <InfoBox type="important">
          Always prefer runtime checks over assertions. Type guards, optional
          chaining, and nullish coalescing provide both compile-time and runtime
          safety. Non-null assertions only help the type checker – they don't
          prevent runtime errors!
        </InfoBox>
      </Section>

      <Section title="4. Definite Assignment Assertion">
        <p className="text-gray-700 dark:text-gray-300">
          A special use of the ! operator is the definite assignment assertion
          for class properties, telling TypeScript that a property will be
          initialized even though it's not initialized in the constructor.
        </p>

        <CodeBlock title="Definite assignment assertion examples">
          {`// ❌ Error: Property has no initializer
class Component1 {
  // element: HTMLElement; // Error!
  
  constructor() {
    this.setup();
  }
  
  setup() {
    // this.element = document.createElement("div");
  }
}

// ✅ Definite assignment assertion
class Component2 {
  element!: HTMLElement; // Tell TS: "Trust me, it will be assigned"
  
  constructor() {
    this.setup();
  }
  
  setup() {
    this.element = document.createElement("div");
  }
  
  render() {
    return this.element; // No error
  }
}

// Use case: Dependency injection
class Service {
  private db!: Database; // Assigned by framework
  
  // Framework calls this after constructor
  inject(db: Database) {
    this.db = db;
  }
  
  query(sql: string) {
    return this.db.execute(sql);
  }
}

// Use case: Lifecycle methods
class Widget {
  private container!: HTMLElement;
  
  constructor() {
    // Container not set yet
  }
  
  mount(element: HTMLElement) {
    this.container = element;
    this.render();
  }
  
  private render() {
    this.container.innerHTML = "<div>Widget</div>";
  }
}

// Use case: Async initialization
class AsyncComponent {
  private data!: DataType;
  
  constructor() {
    this.initialize();
  }
  
  private async initialize() {
    this.data = await fetchData();
  }
  
  // Called after initialize completes
  process() {
    return this.data.value;
  }
}

// Better: Make it obvious with method
class BetterAsyncComponent {
  private data?: DataType; // Use optional instead
  
  async initialize() {
    this.data = await fetchData();
  }
  
  process() {
    if (!this.data) {
      throw new Error("Component not initialized");
    }
    return this.data.value;
  }
}

// Comparison: Different approaches
class Example1 {
  // Must initialize in constructor
  prop1: string = "default";
  
  // Or in constructor parameter
  constructor(public prop2: string) {}
}

class Example2 {
  // Optional property
  prop1?: string;
  
  // Definite assignment
  prop2!: string;
  
  // Explicit nullable
  prop3: string | null = null;
  
  constructor() {
    this.setup();
  }
  
  setup() {
    this.prop2 = "initialized";
  }
}

// When to use definite assignment assertion
// ✅ Framework/library will initialize
// ✅ Initialization in helper method called by constructor
// ✅ Lifecycle methods guarantee initialization
// ❌ Just to avoid proper initialization
// ❌ When property might actually be undefined`}
        </CodeBlock>

        <InfoBox type="tip">
          Use definite assignment assertions (!) for class properties only when
          you're certain the property will be initialized through non-standard
          means (framework injection, lifecycle methods, etc.). Otherwise, use
          proper initialization or mark the property as optional.
        </InfoBox>
      </Section>

      <Section title="Summary: Non-null Assertion Best Practices">
        <CodeBlock title="Guidelines for using non-null assertions">
          {`// When to use non-null assertion (!)
// ✅ DOM elements you're certain exist
const app = document.getElementById("root")!;

// ✅ After explicit checks
if (value !== null) {
  doSomething(value!); // TypeScript should infer, but sometimes needs help
}

// ✅ Definite assignment in classes
class MyClass {
  prop!: string; // Framework will initialize
}

// ✅ In tests/mocks where failure is acceptable
const mockUser = getMockUser()!; // Test will fail if returns null

// When NOT to use non-null assertion
// ❌ User input or external data
function process(input: string | null) {
  return input!.length; // DANGEROUS - validate first!
}

// ❌ Optional chains that should be safe
const name = user?.profile?.name!; // Use ?? instead

// ❌ Array access without checking
const first = array[0]!; // Check length first

// ❌ As a shortcut for proper error handling
const data = fetchData()!; // Handle errors properly

// Best practices summary:
// 1. Prefer type guards over assertions
// 2. Use optional chaining (?) and nullish coalescing (??)
// 3. Only use ! when you're absolutely certain
// 4. Add runtime checks in production code
// 5. Document why you're using ! in comments
// 6. Consider alternatives: throw error, return default, etc.

// Good pattern: Assertion with explanation
// We know root exists because it's in our HTML template
const root = document.getElementById("root")!;

// Bad pattern: Blind assertion
const user = getUser()!; // What if getUser returns null?

// Better patterns:
const user = getUser() ?? defaultUser;
const user = getUser() || throw new Error("No user found");
if (!user) throw new Error("No user found");`}
        </CodeBlock>

        <InfoBox type="important">
          <strong>Key Takeaways:</strong>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              <strong>!</strong> removes null/undefined from a type without
              runtime checks
            </li>
            <li>Use sparingly – it bypasses TypeScript's safety features</li>
            <li>
              Prefer type guards, optional chaining, and nullish coalescing
            </li>
            <li>Good for DOM elements and definite assignment in classes</li>
            <li>Bad for user input, API responses, and uncertain data</li>
            <li>Always add runtime validation for critical code paths</li>
            <li>Document why you're using ! to help future maintainers</li>
          </ul>
        </InfoBox>
      </Section>
    </div>
  );
}
