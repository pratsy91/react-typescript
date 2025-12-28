import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ArraysPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Arrays
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Arrays are one of the most fundamental data structures in TypeScript.
        TypeScript provides multiple ways to type arrays, from simple syntax to
        complex generic types, along with readonly variants for immutability.
      </p>

      <Section title="1. Array Type Syntax">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript offers two primary syntaxes for typing arrays: the square
          bracket notation and the generic Array type.
        </p>

        <CodeBlock title="Basic array syntax">
          {`// Square bracket syntax (preferred)
let numbers: number[] = [1, 2, 3, 4, 5];
let strings: string[] = ["apple", "banana", "cherry"];
let booleans: boolean[] = [true, false, true];

// Generic Array<T> syntax
let numbers2: Array<number> = [1, 2, 3];
let strings2: Array<string> = ["x", "y", "z"];
let booleans2: Array<boolean> = [false, true];

// Both are equivalent - choose based on team preference
// Square brackets are more common in TypeScript

// Type inference with arrays
let inferredNumbers = [1, 2, 3]; // Type: number[]
let inferredStrings = ["a", "b"]; // Type: string[]
let mixed = [1, "two", true];     // Type: (string | number | boolean)[]

// Empty arrays need explicit typing
let emptyNumbers: number[] = [];
let emptyStrings: Array<string> = [];
// let bad = []; // Type: any[] - avoid!

// Array of specific literal types
let directions: ("north" | "south" | "east" | "west")[] = ["north", "south"];
let statusCodes: Array<200 | 404 | 500> = [200, 404];

// Nested arrays
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

let grid: Array<Array<string>> = [
  ["a", "b"],
  ["c", "d"]
];

// Array of objects
interface User {
  id: number;
  name: string;
}

let users: User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
];

// Or with Array<T>
let users2: Array<User> = [
  { id: 3, name: "Bob" },
  { id: 4, name: "Alice" }
];

// Array of functions
let callbacks: ((x: number) => number)[] = [
  (x) => x * 2,
  (x) => x + 10,
  (x) => x ** 2
];

// Or with Array<T>
let callbacks2: Array<(x: number) => number> = [
  (x) => x * 2
];`}
        </CodeBlock>

        <InfoBox type="tip">
          Use the square bracket syntax (type[]) for simple types and the
          generic syntax (Array&lt;T&gt;) when it improves readability,
          especially with complex types or function types.
        </InfoBox>
      </Section>

      <Section title="2. Array Methods and Type Safety">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript provides full type safety for array methods, with proper
          type inference for transformations and operations.
        </p>

        <CodeBlock title="Array methods with TypeScript">
          {`const numbers = [1, 2, 3, 4, 5];

// map - transforms array, returns new array
const doubled = numbers.map(n => n * 2); // Type: number[]
const strings = numbers.map(n => n.toString()); // Type: string[]

// filter - narrows type
const evenNumbers = numbers.filter(n => n % 2 === 0); // Type: number[]

// Type guard in filter
const mixed: (string | number)[] = [1, "two", 3, "four"];
const onlyStrings = mixed.filter((item): item is string => {
  return typeof item === "string";
}); // Type: string[] (narrowed!)

// reduce - aggregates values
const sum = numbers.reduce((acc, n) => acc + n, 0); // Type: number
const product = numbers.reduce((acc, n) => acc * n, 1); // Type: number

// reduce with different return type
interface Summary {
  count: number;
  sum: number;
}

const summary = numbers.reduce<Summary>(
  (acc, n) => ({
    count: acc.count + 1,
    sum: acc.sum + n
  }),
  { count: 0, sum: 0 }
); // Type: Summary

// find - returns T | undefined
const firstEven = numbers.find(n => n % 2 === 0); // Type: number | undefined
if (firstEven !== undefined) {
  console.log(firstEven * 2); // Safe to use
}

// findIndex - returns number
const index = numbers.findIndex(n => n > 3); // Type: number (-1 if not found)

// some / every - returns boolean
const hasEven = numbers.some(n => n % 2 === 0); // Type: boolean
const allPositive = numbers.every(n => n > 0); // Type: boolean

// forEach - no return value
numbers.forEach((n, index) => {
  console.log(\`[\${index}]: \${n}\`);
});

// sort - modifies array, returns reference
const sorted = numbers.sort((a, b) => a - b); // Type: number[]

// slice - returns new array
const subset = numbers.slice(1, 3); // Type: number[]

// concat - combines arrays
const combined = numbers.concat([6, 7, 8]); // Type: number[]

// flat - flattens nested arrays
const nested = [[1, 2], [3, 4], [5]];
const flattened = nested.flat(); // Type: number[]

// flatMap - map + flat
const duplicated = numbers.flatMap(n => [n, n]); // Type: number[]

// includes - type-safe membership check
const hasThree = numbers.includes(3); // Type: boolean

// join - creates string
const joined = numbers.join(", "); // Type: string

// Array destructuring with types
const [first, second, ...rest] = numbers;
// first: number, second: number, rest: number[]

// Array.from with typing
const arrayFrom = Array.from<number>({ length: 5 }, (_, i) => i);
// Type: number[]

// Array.of
const arrayOf = Array.of<string>("a", "b", "c"); // Type: string[]

// Type-safe array operations
interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Widget", price: 9.99 },
  { id: 2, name: "Gadget", price: 19.99 }
];

// Chaining methods with proper types
const result = products
  .filter(p => p.price < 15)    // Product[]
  .map(p => p.name)              // string[]
  .map(name => name.toUpperCase()) // string[]
  .sort();                        // string[]`}
        </CodeBlock>

        <InfoBox type="info">
          TypeScript automatically infers return types for array methods. Use
          type guards with filter() to narrow union types, and provide explicit
          type parameters for reduce() when the accumulator type differs from
          the array element type.
        </InfoBox>
      </Section>

      <Section title="3. Readonly Arrays">
        <p className="text-gray-700 dark:text-gray-300">
          Readonly arrays prevent modifications, ensuring immutability at the
          type level. They're essential for functional programming patterns.
        </p>

        <CodeBlock title="Readonly array examples">
          {`// Readonly array syntax
const numbers: readonly number[] = [1, 2, 3, 4, 5];

// Alternative syntax
const numbers2: ReadonlyArray<number> = [1, 2, 3];

// Cannot modify readonly arrays
// numbers.push(6);     // Error: push does not exist on readonly array
// numbers.pop();       // Error: pop does not exist
// numbers[0] = 10;     // Error: Index signature is readonly
// numbers.sort();      // Error: sort modifies array

// Can read and use non-mutating methods
const first = numbers[0];         // OK: 1
const sliced = numbers.slice(1);  // OK: returns new array
const mapped = numbers.map(n => n * 2); // OK: returns new array
const filtered = numbers.filter(n => n > 2); // OK: returns new array

// Converting to mutable array
const mutable = [...numbers]; // Type: number[]
mutable.push(6); // OK now

// Readonly with object arrays
interface User {
  id: number;
  name: string;
}

const users: readonly User[] = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
];

// Cannot modify array
// users.push({ id: 3, name: "Bob" }); // Error

// But CAN modify object properties!
users[0].name = "Johnny"; // OK - only array is readonly

// Deep readonly (objects are also readonly)
interface ReadonlyUser {
  readonly id: number;
  readonly name: string;
}

const deepReadonly: readonly ReadonlyUser[] = [
  { id: 1, name: "John" }
];

// deepReadonly[0].name = "Johnny"; // Error: property is readonly

// Readonly tuple
const tuple: readonly [number, string] = [1, "hello"];
// tuple[0] = 2; // Error: readonly

// Readonly in function parameters
function processArray(arr: readonly number[]): number {
  // arr.push(1); // Error: cannot modify
  return arr.reduce((sum, n) => sum + n, 0); // OK: reduce doesn't modify
}

// Return type can be readonly
function getConstants(): readonly number[] {
  return [1, 2, 3, 4, 5];
}

const constants = getConstants();
// constants.push(6); // Error: readonly

// Readonly generic type
type ReadonlyArray2<T> = readonly T[];

const strings: ReadonlyArray2<string> = ["a", "b", "c"];

// as const creates readonly tuples/arrays
const colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]
// colors.push("yellow"); // Error
// colors[0] = "purple";  // Error

// Benefits of readonly arrays
// 1. Prevents accidental mutations
// 2. Makes intent clear (this array won't change)
// 3. Enables optimizations in some cases
// 4. Better for functional programming

// When to use readonly arrays:
// ✅ Configuration data
// ✅ Constants
// ✅ Function parameters you won't modify
// ✅ Return values that shouldn't be modified
// ✅ Props in React components

// Example: React component with readonly props
interface Props {
  items: readonly string[];
}

function List({ items }: Props) {
  // items.push("new"); // Error: readonly
  return items.map(item => item); // OK: map doesn't modify
}`}
        </CodeBlock>

        <InfoBox type="important">
          Readonly arrays prevent array mutations but don't make object elements
          immutable. For deep immutability, combine readonly with readonly
          object properties or use utility types like Readonly&lt;T&gt;.
        </InfoBox>
      </Section>

      <Section title="4. Tuple Types (Brief Introduction)">
        <p className="text-gray-700 dark:text-gray-300">
          While tuples are covered in detail in the next lesson, they're a
          special kind of array with fixed length and specific types for each
          position.
        </p>

        <CodeBlock title="Basic tuple examples">
          {`// Tuple: fixed-length array with specific types
let coordinate: [number, number] = [10, 20];

// Different from array
let numberArray: number[] = [10, 20, 30]; // Can have any length

// Tuple enforces exact structure
let person: [string, number] = ["John", 30];
// let invalid: [string, number] = [30, "John"]; // Error: wrong order
// let invalid2: [string, number] = ["John", 30, true]; // Error: too many

// Accessing tuple elements
const [x, y] = coordinate;
console.log(coordinate[0]); // number
console.log(coordinate[1]); // number

// Tuple with different types
let response: [boolean, string] = [true, "Success"];
let httpResponse: [number, string] = [200, "OK"];

// Tuple vs Array
// Tuple: Fixed length, each position has specific type
// Array: Variable length, all elements same type

// Use tuples when:
// - You need a fixed number of elements
// - Each position has a specific meaning
// - Order matters

// Use arrays when:
// - Length can vary
// - All elements are the same type
// - Order doesn't define meaning

// More on tuples in the next lesson!`}
        </CodeBlock>
      </Section>

      <Section title="5. Advanced Array Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Common patterns and best practices for working with arrays in
          TypeScript.
        </p>

        <CodeBlock title="Advanced array patterns">
          {`// 1. Array union types
let mixedNumbers: (number | null)[] = [1, null, 3, null, 5];
let stringOrNumber: (string | number)[] = [1, "two", 3, "four"];

// 2. Array of union types vs Union of array types
type ArrayOfUnion = (string | number)[]; // Array containing strings OR numbers
type UnionOfArrays = string[] | number[]; // EITHER string array OR number array

const arr1: ArrayOfUnion = [1, "two", 3]; // OK
const arr2: UnionOfArrays = [1, 2, 3];    // OK: number[]
const arr3: UnionOfArrays = ["a", "b"];   // OK: string[]
// const arr4: UnionOfArrays = [1, "two"]; // Error: must be all one type

// 3. Filtering with type guards
const values: (string | number | null)[] = [1, "two", null, 3, "four", null];

// Remove nulls
const withoutNulls = values.filter((v): v is string | number => v !== null);
// Type: (string | number)[]

// Get only strings
const onlyStrings = values.filter((v): v is string => typeof v === "string");
// Type: string[]

// 4. Array initialization patterns
// Fixed-size array with initial values
const zeros = new Array<number>(5).fill(0); // [0, 0, 0, 0, 0]
const empty = Array.from<string>({ length: 3 }).fill(""); // ["", "", ""]

// Array from range
const range = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
const rangeFrom10 = Array.from({ length: 5 }, (_, i) => i + 10); // [10, 11, 12, 13, 14]

// 5. Type-safe array builders
function createArray<T>(length: number, generator: (index: number) => T): T[] {
  return Array.from({ length }, (_, i) => generator(i));
}

const squares = createArray(5, i => i ** 2); // [0, 1, 4, 9, 16]
const letters = createArray(3, i => String.fromCharCode(65 + i)); // ["A", "B", "C"]

// 6. Conditional array types
type ArrayOrSingle<T> = T | T[];

function process(value: ArrayOrSingle<string>) {
  const array = Array.isArray(value) ? value : [value];
  // array is always string[] here
  array.forEach(s => console.log(s));
}

process("hello");           // OK
process(["a", "b", "c"]);  // OK

// 7. Array grouping
function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

interface Product {
  id: number;
  category: string;
  price: number;
}

const products: Product[] = [
  { id: 1, category: "electronics", price: 100 },
  { id: 2, category: "books", price: 20 },
  { id: 3, category: "electronics", price: 200 }
];

const byCategory = groupBy(products, p => p.category);
// Type: Record<string, Product[]>

// 8. Type-safe array concatenation
function concat<T, U>(arr1: T[], arr2: U[]): (T | U)[] {
  return [...arr1, ...arr2];
}

const combined = concat([1, 2], ["a", "b"]); // Type: (number | string)[]

// 9. NonEmptyArray type
type NonEmptyArray<T> = [T, ...T[]];

function first<T>(arr: NonEmptyArray<T>): T {
  return arr[0]; // Always safe - array has at least one element
}

// first([1, 2, 3]); // OK
// first([]); // Error: [] is not assignable to NonEmptyArray

// 10. Array diff/intersection
function arrayIntersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}

function arrayDifference<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => !arr2.includes(item));
}

const a = [1, 2, 3, 4];
const b = [3, 4, 5, 6];

const intersection = arrayIntersection(a, b); // [3, 4]
const difference = arrayDifference(a, b);     // [1, 2]`}
        </CodeBlock>

        <InfoBox type="tip">
          Use type guards with filter() to narrow types, Array.from() for
          creating initialized arrays, and consider creating utility types like
          NonEmptyArray for arrays that must have elements.
        </InfoBox>
      </Section>
    </div>
  );
}
