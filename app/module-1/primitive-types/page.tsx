import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function PrimitiveTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Primitive Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript provides seven primitive types that form the foundation of
        the type system. These types represent the most basic values in
        JavaScript with added type safety.
      </p>

      <Section title="1. String Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            string
          </code>{" "}
          type represents textual data. It can be enclosed in single quotes,
          double quotes, or backticks (template literals).
        </p>

        <CodeBlock title="Basic string declarations">
          {`// String type annotations
let firstName: string = "John";
let lastName: string = 'Doe';
let greeting: string = \`Hello, \${firstName} \${lastName}\`;

// Type inference (TypeScript infers string type)
let city = "New York"; // Type: string
let country = 'USA'; // Type: string

// Template literals with expressions
let age: number = 30;
let bio: string = \`I am \${age} years old\`;

// Multi-line strings
let address: string = \`
  123 Main Street
  New York, NY 10001
\`;`}
        </CodeBlock>

        <InfoBox type="tip">
          TypeScript can infer string types, so you don't always need explicit
          annotations. Use annotations when the type isn't obvious or for
          function parameters.
        </InfoBox>
      </Section>

      <Section title="2. Number Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            number
          </code>{" "}
          type represents both integer and floating-point numbers, including
          special values like Infinity and NaN.
        </p>

        <CodeBlock title="Number type examples">
          {`// Integer and floating-point numbers
let age: number = 25;
let price: number = 19.99;
let temperature: number = -5;

// Different number formats
let decimal: number = 6;
let hex: number = 0xf00d;        // Hexadecimal
let binary: number = 0b1010;     // Binary
let octal: number = 0o744;       // Octal

// Special numeric values
let infinite: number = Infinity;
let negInfinite: number = -Infinity;
let notANumber: number = NaN;

// Numeric separators (for readability)
let million: number = 1_000_000;
let billion: number = 1_000_000_000;

// Scientific notation
let scientific: number = 1e6;    // 1000000
let small: number = 1e-6;        // 0.000001`}
        </CodeBlock>

        <InfoBox type="info">
          TypeScript uses JavaScript's number type, which is a double-precision
          64-bit floating point (IEEE 754). For very large integers, consider
          using BigInt.
        </InfoBox>
      </Section>

      <Section title="3. Boolean Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            boolean
          </code>{" "}
          type has only two values: true and false.
        </p>

        <CodeBlock title="Boolean type examples">
          {`// Boolean declarations
let isActive: boolean = true;
let isCompleted: boolean = false;
let hasPermission: boolean = true;

// Boolean expressions
let isAdult: boolean = age >= 18;
let isValid: boolean = username.length > 3;
let canEdit: boolean = isActive && hasPermission;

// Type inference
let isDarkMode = false; // Type: boolean
let isLoggedIn = true;  // Type: boolean

// Function return types
function isEven(num: number): boolean {
  return num % 2 === 0;
}

function isPositive(num: number): boolean {
  return num > 0;
}

// Boolean in conditions
if (isActive) {
  console.log("User is active");
}

// Negation
let isDisabled: boolean = !isActive;`}
        </CodeBlock>

        <InfoBox type="warning">
          Don't confuse boolean with truthy/falsy values. TypeScript's boolean
          type is strict - only true and false are valid, not "truthy" values
          like 1, "text", or objects.
        </InfoBox>
      </Section>

      <Section title="4. Null Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            null
          </code>{" "}
          type represents the intentional absence of any object value.
        </p>

        <CodeBlock title="Null type examples">
          {`// Explicit null assignment
let user: null = null;
let data: null = null;

// Union with other types (most common usage)
let username: string | null = null;
username = "john_doe";
username = null; // Valid

let age: number | null = null;
age = 25;
age = null; // Valid

// Function that may return null
function findUser(id: number): string | null {
  if (id === 1) {
    return "John Doe";
  }
  return null; // User not found
}

// Checking for null
let result: string | null = findUser(1);
if (result !== null) {
  console.log(result.toUpperCase());
}

// Optional chaining with null
interface User {
  name: string;
  address: {
    street: string;
  } | null;
}

let currentUser: User = {
  name: "Jane",
  address: null
};

let street = currentUser.address?.street; // Type: string | undefined`}
        </CodeBlock>

        <InfoBox type="important">
          With strictNullChecks enabled (recommended), null and undefined are
          distinct types and must be explicitly included in type unions if you
          want to allow them.
        </InfoBox>
      </Section>

      <Section title="5. Undefined Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            undefined
          </code>{" "}
          type represents a variable that has been declared but not yet assigned
          a value.
        </p>

        <CodeBlock title="Undefined type examples">
          {`// Explicit undefined
let value: undefined = undefined;

// Union with other types
let count: number | undefined = undefined;
count = 42;
count = undefined; // Valid

// Optional properties (implicitly include undefined)
interface Config {
  port?: number;        // Type: number | undefined
  host?: string;        // Type: string | undefined
  timeout?: number;     // Type: number | undefined
}

let config: Config = {};
console.log(config.port); // undefined

// Function with optional parameters
function greet(name: string, greeting?: string): void {
  if (greeting !== undefined) {
    console.log(\`\${greeting}, \${name}\`);
  } else {
    console.log(\`Hello, \${name}\`);
  }
}

greet("John");           // greeting is undefined
greet("John", "Hi");     // greeting is "Hi"

// Function that may return undefined
function getFirstElement(arr: string[]): string | undefined {
  return arr[0]; // Could be undefined if array is empty
}

// Difference between null and undefined
let explicitlyEmpty: string | null = null;      // Intentionally empty
let notYetAssigned: string | undefined = undefined; // Not initialized

// Checking for undefined
if (count !== undefined) {
  console.log(count * 2);
}

// Default values for undefined
function setDefaults(timeout?: number): number {
  return timeout ?? 5000; // Use 5000 if undefined
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Undefined typically means "not yet initialized" while null means
          "intentionally empty". Use optional properties (?) instead of explicit
          undefined unions for cleaner code.
        </InfoBox>
      </Section>

      <Section title="6. Symbol Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            symbol
          </code>{" "}
          type represents unique, immutable identifiers. Every symbol is
          guaranteed to be unique.
        </p>

        <CodeBlock title="Symbol type examples">
          {`// Creating symbols
let sym1: symbol = Symbol();
let sym2: symbol = Symbol();
let sym3: symbol = Symbol("description");

// Symbols are always unique
console.log(sym1 === sym2); // false
console.log(sym1 === sym1); // true

// Symbol with descriptions (for debugging)
let id: symbol = Symbol("id");
let userId: symbol = Symbol("id");
console.log(id === userId); // false (even with same description)

// Using symbols as object keys
const SECRET_KEY: symbol = Symbol("secret");
const API_KEY: symbol = Symbol("apiKey");

interface User {
  name: string;
  [SECRET_KEY]: string;
  [API_KEY]: string;
}

let user: User = {
  name: "John",
  [SECRET_KEY]: "abc123",
  [API_KEY]: "xyz789"
};

console.log(user[SECRET_KEY]); // "abc123"

// Symbols are not enumerable
console.log(Object.keys(user)); // ["name"] - symbols not included

// Well-known symbols
class Collection {
  private items: string[] = ["a", "b", "c"];
  
  [Symbol.iterator]() {
    let index = 0;
    let items = this.items;
    
    return {
      next(): { value: string; done: boolean } {
        if (index < items.length) {
          return { value: items[index++], done: false };
        }
        return { value: "", done: true };
      }
    };
  }
}

let collection = new Collection();
for (let item of collection) {
  console.log(item); // a, b, c
}

// Symbol registry (global symbols)
let globalSym1: symbol = Symbol.for("app.id");
let globalSym2: symbol = Symbol.for("app.id");
console.log(globalSym1 === globalSym2); // true

// Getting symbol description
let sym: symbol = Symbol("mySymbol");
console.log(sym.description); // "mySymbol"`}
        </CodeBlock>

        <InfoBox type="info">
          Symbols are useful for creating unique property keys that won't
          conflict with string keys. They're commonly used in libraries and
          frameworks for internal properties.
        </InfoBox>
      </Section>

      <Section title="7. BigInt Type">
        <p className="text-gray-700 dark:text-gray-300">
          The{" "}
          <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
            bigint
          </code>{" "}
          type represents integers with arbitrary precision, beyond the safe
          integer limit of the number type.
        </p>

        <CodeBlock title="BigInt type examples">
          {`// Creating BigInt values
let big1: bigint = 100n;
let big2: bigint = BigInt(100);
let big3: bigint = BigInt("9007199254740991");

// Large integers
let maxSafeInteger: number = Number.MAX_SAFE_INTEGER; // 9007199254740991
let biggerThanMax: bigint = 9007199254740991n + 1n;

// BigInt arithmetic
let a: bigint = 10n;
let b: bigint = 20n;

let sum: bigint = a + b;           // 30n
let difference: bigint = b - a;    // 10n
let product: bigint = a * b;       // 200n
let quotient: bigint = b / a;      // 2n
let remainder: bigint = b % a;     // 0n
let power: bigint = a ** 3n;       // 1000n

// Comparisons
console.log(10n > 5n);   // true
console.log(10n === 10n); // true
console.log(10n == 10);   // true (loose equality)
console.log(10n === 10);  // false (different types)

// BigInt cannot mix with number in operations
let num: number = 10;
let big: bigint = 20n;
// let result = num + big; // Error: Cannot mix BigInt and number

// Convert between BigInt and number
let bigValue: bigint = 100n;
let numValue: number = Number(bigValue);

let numValue2: number = 50;
let bigValue2: bigint = BigInt(numValue2);

// Use cases: timestamps, IDs, cryptography
let timestamp: bigint = 1638360000000n;
let userId: bigint = 123456789012345678901234567890n;

// BigInt methods
let negative: bigint = -100n;
let absolute: bigint = negative < 0n ? -negative : negative;

// String conversion
let bigStr: string = big1.toString(); // "100"
let bigHex: string = big1.toString(16); // "64"

// Parsing
let parsed: bigint = BigInt("12345678901234567890");

// Limits
console.log(Number.MAX_SAFE_INTEGER);           // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1);       // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 2);       // 9007199254740992 (wrong!)
console.log(9007199254740991n + 1n);           // 9007199254740992n (correct!)
console.log(9007199254740991n + 2n);           // 9007199254740993n (correct!)`}
        </CodeBlock>

        <InfoBox type="warning">
          BigInt and number are not compatible in arithmetic operations. You
          must explicitly convert between them. Also, BigInt doesn't support
          decimal values - it's only for integers.
        </InfoBox>
      </Section>

      <Section title="Summary: All Primitive Types">
        <CodeBlock title="Complete primitive types reference">
          {`// All 7 primitive types in TypeScript
let str: string = "text";
let num: number = 42;
let bool: boolean = true;
let n: null = null;
let u: undefined = undefined;
let sym: symbol = Symbol("unique");
let big: bigint = 100n;

// Common patterns with primitives
type ID = string | number;
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

let userId: ID = "user_123";
let userAge: Nullable<number> = null;
let userName: Optional<string> = undefined;

// Primitive wrappers (avoid these)
let strObj: String = new String("text");  // Object wrapper
let numObj: Number = new Number(42);      // Object wrapper
let boolObj: Boolean = new Boolean(true); // Object wrapper

// Always use primitives, not their object wrappers
let goodStr: string = "text";  // ✅ Correct
let badStr: String = "text";   // ❌ Avoid`}
        </CodeBlock>

        <InfoBox type="important">
          <strong>Key Takeaways:</strong>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              string: Textual data (single/double quotes, template literals)
            </li>
            <li>
              number: All numeric values including integers, floats, Infinity,
              NaN
            </li>
            <li>boolean: Only true or false</li>
            <li>null: Intentional absence of value</li>
            <li>undefined: Variable declared but not initialized</li>
            <li>symbol: Unique, immutable identifiers</li>
            <li>bigint: Arbitrary precision integers (suffix with 'n')</li>
          </ul>
        </InfoBox>
      </Section>
    </div>
  );
}
