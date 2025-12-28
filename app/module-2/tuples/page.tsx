import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TuplesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Tuples
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Tuples are TypeScript's way of representing arrays with a fixed number
        of elements where each element can have a different type. They're
        perfect for representing pairs, coordinates, or any fixed-structure
        data.
      </p>

      <Section title="1. Basic Tuple Types">
        <p className="text-gray-700 dark:text-gray-300">
          Tuples are defined with square brackets and specific types for each
          position.
        </p>

        <CodeBlock title="Basic tuple examples">
          {`// Basic tuple definition
let pair: [string, number] = ["age", 30];

// Tuple vs Array
let tuple: [number, string] = [1, "hello"];      // Fixed: 2 elements
let array: (number | string)[] = [1, "hello"];   // Variable length

// Accessing tuple elements
console.log(pair[0]); // string
console.log(pair[1]); // number

// Tuple must match exactly
let coordinate: [number, number] = [10, 20]; // OK
// let invalid: [number, number] = [10, 20, 30]; // Error: too many elements
// let invalid2: [number, number] = [10]; // Error: too few elements
// let invalid3: [number, number] = ["10", "20"]; // Error: wrong types

// Different types in tuple
let response: [boolean, string, number] = [true, "Success", 200];
let user: [number, string, boolean] = [1, "John", true];

// Tuple destructuring
let [id, name, active] = user;
// id: number, name: string, active: boolean

// Tuples with complex types
interface User {
  id: number;
  name: string;
}

let userTuple: [User, Date] = [
  { id: 1, name: "John" },
  new Date()
];

// Function returning tuple
function getNameAndAge(): [string, number] {
  return ["John", 30];
}

const [userName, userAge] = getNameAndAge();

// Tuple as function parameter
function printCoordinate(point: [number, number]) {
  const [x, y] = point;
  console.log(\`x: \${x}, y: \${y}\`);
}

printCoordinate([10, 20]); // OK
// printCoordinate([10]); // Error: missing element

// Array methods on tuples
let rgb: [number, number, number] = [255, 128, 0];

// map returns array, not tuple
const doubled = rgb.map(n => n * 2); // Type: number[]

// slice returns array
const partial = rgb.slice(0, 2); // Type: number[]

// Tuples maintain structure until modified
const firstColor = rgb[0]; // Type: number (not number | undefined)

// But push/pop work (though they break tuple structure)
rgb.push(1); // Compiles, but now has 4 elements!
// This is a TypeScript limitation`}
        </CodeBlock>

        <InfoBox type="warning">
          Tuples allow push/pop at compile time, which can break the
          fixed-length guarantee. Use readonly tuples or const assertions to
          prevent this.
        </InfoBox>
      </Section>

      <Section title="2. Optional Tuple Elements">
        <p className="text-gray-700 dark:text-gray-300">
          Tuple elements can be marked as optional using the ? syntax, making
          them undefined if not provided.
        </p>

        <CodeBlock title="Optional tuple elements">
          {`// Optional elements must come after required elements
type StringNumber = [string, number?];

let pair1: StringNumber = ["hello", 42];     // OK
let pair2: StringNumber = ["hello"];         // OK: number is optional

// Optional element is number | undefined
const [str, num] = pair2;
// str: string, num: number | undefined

if (num !== undefined) {
  console.log(num * 2); // Safe to use
}

// Multiple optional elements
type Response = [status: number, message?: string, timestamp?: number];

let resp1: Response = [200];                        // OK
let resp2: Response = [200, "Success"];             // OK
let resp3: Response = [200, "Success", Date.now()]; // OK
// let resp4: Response = [200, , Date.now()];       // Error: can't skip middle element

// Optional elements in the middle require undefined
type Mixed = [string, number?, string?];

let m1: Mixed = ["first"];                    // OK
let m2: Mixed = ["first", 10];                // OK
let m3: Mixed = ["first", 10, "last"];        // OK
let m4: Mixed = ["first", undefined, "last"]; // OK: explicit undefined

// Accessing optional elements
function process(data: [string, number?]) {
  const [name, age] = data;
  
  if (age !== undefined) {
    console.log(\`\${name} is \${age} years old\`);
  } else {
    console.log(\`\${name}'s age is unknown\`);
  }
}

// Optional with default values
function processWithDefault(data: [string, number?]) {
  const [name, age = 0] = data; // age defaults to 0 if undefined
  console.log(\`\${name}: \${age}\`);
}

// Use case: Parsing results
type ParseResult = [success: true, value: string] | [success: false, error?: string];

function parse(input: string): ParseResult {
  if (input.length > 0) {
    return [true, input.toUpperCase()];
  }
  return [false, "Empty input"];
}

const result = parse("hello");
if (result[0]) {
  console.log(result[1]); // string
} else {
  console.log(result[1]); // string | undefined
}

// Optional elements with objects
type UserTuple = [id: number, name: string, metadata?: { role: string }];

let user1: UserTuple = [1, "John"];
let user2: UserTuple = [2, "Jane", { role: "admin" }];

// Function with optional tuple parameter
function createPoint(coords: [x: number, y: number, z?: number]) {
  const [x, y, z = 0] = coords; // z defaults to 0
  return { x, y, z };
}

createPoint([10, 20]);     // OK
createPoint([10, 20, 30]); // OK`}
        </CodeBlock>

        <InfoBox type="tip">
          Optional tuple elements are useful for function return types where
          additional data might be available, or for parsing results that may
          include error details.
        </InfoBox>
      </Section>

      <Section title="3. Rest Elements in Tuples">
        <p className="text-gray-700 dark:text-gray-300">
          Rest elements allow tuples to have a variable number of elements at
          the end, combining fixed and variable-length features.
        </p>

        <CodeBlock title="Rest elements in tuples">
          {`// Rest element at the end
type StringNumberAndRest = [string, number, ...boolean[]];

let t1: StringNumberAndRest = ["hello", 42, true, false, true]; // OK
let t2: StringNumberAndRest = ["hello", 42];                    // OK: no booleans
// let t3: StringNumberAndRest = ["hello"]; // Error: missing number

// Rest element must be an array type
type NameAndScores = [name: string, ...scores: number[]];

let student1: NameAndScores = ["John", 85, 90, 78];
let student2: NameAndScores = ["Jane", 95];
let student3: NameAndScores = ["Bob"]; // OK: no scores

// Multiple fixed elements before rest
type RequestData = [method: string, url: string, ...headers: string[]];

let request: RequestData = [
  "GET",
  "/api/users",
  "Authorization: Bearer token",
  "Content-Type: application/json"
];

// Rest with different types
type Mixed = [string, ...number[], string];
// Error: Rest element must be last

// Correct: Rest at the end
type MixedCorrect = [string, string, ...number[]];

let mc: MixedCorrect = ["first", "second", 1, 2, 3]; // OK

// Destructuring with rest
let data: [string, ...number[]] = ["label", 1, 2, 3, 4, 5];
const [label, ...numbers] = data;
// label: string, numbers: number[]

// Function accepting tuple with rest
function logData(data: [string, ...any[]]) {
  const [message, ...args] = data;
  console.log(message, ...args);
}

logData(["Hello", 1, 2, 3]);
logData(["World"]);

// Rest with union types
type FlexibleTuple = [number, ...(string | number)[]];

let ft1: FlexibleTuple = [1, "a", 2, "b", 3]; // OK
let ft2: FlexibleTuple = [1, 2, 3, 4];        // OK

// Practical use case: Event handlers
type EventHandler = [eventName: string, ...args: any[]];

function emit(event: EventHandler) {
  const [name, ...data] = event;
  console.log(\`Event: \${name}\`, data);
}

emit(["click", { x: 10, y: 20 }]);
emit(["keypress", "Enter", { ctrlKey: true }]);

// Use case: Function arguments
function concat<T>(...args: [T[], ...T[]]): T[] {
  const [first, ...rest] = args;
  return first.concat(...rest);
}

const combined = concat([1, 2], [3, 4], [5, 6]); // OK

// Rest in readonly tuples
type ReadonlyRest = readonly [string, ...number[]];

let rr: ReadonlyRest = ["label", 1, 2, 3];
// rr.push(4); // Error: readonly

// Generic tuple with rest
type Prefix<T extends any[]> = [string, ...T];

type WithPrefix = Prefix<[number, boolean]>; // [string, number, boolean]

let wp: WithPrefix = ["prefix", 42, true];`}
        </CodeBlock>

        <InfoBox type="info">
          Rest elements in tuples are perfect for representing variadic
          arguments or lists with required leading elements. They must always be
          the last element in the tuple.
        </InfoBox>
      </Section>

      <Section title="4. Labeled Tuples">
        <p className="text-gray-700 dark:text-gray-300">
          Labeled tuple elements improve code readability by giving meaningful
          names to each position without affecting the type.
        </p>

        <CodeBlock title="Labeled tuple examples">
          {`// Basic labeled tuples
type Point = [x: number, y: number];
type Point3D = [x: number, y: number, z: number];

let p1: Point = [10, 20];
let p2: Point3D = [10, 20, 30];

// Labels are for documentation only
const [x, y] = p1; // Can use any names in destructuring

// More readable function signatures
function move(point: [x: number, y: number], delta: [dx: number, dy: number]) {
  return [point[0] + delta[0], point[1] + delta[1]];
}

// Without labels (less clear)
function moveOld(point: [number, number], delta: [number, number]) {
  return [point[0] + delta[0], point[1] + delta[1]];
}

// Complex labeled tuples
type HTTPResponse = [
  status: number,
  statusText: string,
  body: string,
  headers: Record<string, string>
];

let response: HTTPResponse = [
  200,
  "OK",
  '{"data": "value"}',
  { "Content-Type": "application/json" }
];

// Labeled optional elements
type User = [id: number, name: string, email?: string];

let user1: User = [1, "John"];
let user2: User = [2, "Jane", "jane@example.com"];

// Labeled rest elements
type Measurement = [unit: string, ...values: number[]];

let temp: Measurement = ["celsius", 20, 21, 22, 23];

// In function parameters
function createRange(range: [start: number, end: number, step?: number]) {
  const [start, end, step = 1] = range;
  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

createRange([1, 10]);      // 1 to 10, step 1
createRange([0, 100, 10]); // 0 to 100, step 10

// In return types
function parseDate(dateStr: string): [year: number, month: number, day: number] | null {
  const parts = dateStr.split("-").map(Number);
  if (parts.length === 3) {
    return [parts[0], parts[1], parts[2]];
  }
  return null;
}

const date = parseDate("2024-01-15");
if (date) {
  const [year, month, day] = date;
  console.log(\`Year: \${year}, Month: \${month}, Day: \${day}\`);
}

// Labeled tuples with generics
type Result<T> = [success: true, data: T] | [success: false, error: string];

function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return [false, "Division by zero"];
  }
  return [true, a / b];
}

const result = divide(10, 2);
if (result[0]) {
  console.log("Result:", result[1]); // number
} else {
  console.log("Error:", result[1]);  // string
}

// Nested labeled tuples
type NestedPoint = [
  coords: [x: number, y: number],
  label: string
];

let np: NestedPoint = [[10, 20], "Point A"];

// All elements must be labeled or none
// type Mixed = [x: number, number]; // Error: must label all or none

// Benefits of labeled tuples:
// 1. Better IDE tooltips
// 2. Clearer intent in function signatures
// 3. Self-documenting code
// 4. No runtime cost (labels are erased)

// Real-world example: Database query result
type QueryResult = [
  success: boolean,
  rows: any[],
  affectedRows?: number,
  insertId?: number
];

function executeQuery(sql: string): QueryResult {
  // Simulated query
  return [true, [{ id: 1, name: "John" }], 1, 1];
}

const [success, rows, affectedRows, insertId] = executeQuery("SELECT * FROM users");`}
        </CodeBlock>

        <InfoBox type="tip">
          Always use labeled tuples for public APIs and function signatures with
          more than 2 elements. Labels make code self-documenting and improve
          IDE support without any runtime cost.
        </InfoBox>
      </Section>

      <Section title="5. Readonly Tuples">
        <p className="text-gray-700 dark:text-gray-300">
          Readonly tuples prevent modification of both the tuple structure and
          individual elements, ensuring true immutability.
        </p>

        <CodeBlock title="Readonly tuple examples">
          {`// Readonly tuple
let point: readonly [number, number] = [10, 20];

// Cannot modify
// point[0] = 30; // Error: readonly
// point.push(30); // Error: push doesn't exist

// Can read
console.log(point[0]); // OK: 10
console.log(point[1]); // OK: 20

// Alternative syntax
type ReadonlyPoint = Readonly<[number, number]>;
let p: ReadonlyPoint = [5, 10];

// as const creates readonly tuples
const colors = ["red", "green", "blue"] as const;
// Type: readonly ["red", "green", "blue"]

// This is a literal type tuple, not just readonly
type Colors = typeof colors; // readonly ["red", "green", "blue"]

// Readonly with labeled tuples
type ReadonlyUser = readonly [id: number, name: string];

const user: ReadonlyUser = [1, "John"];
// user[0] = 2; // Error: readonly

// Readonly with optional elements
type Config = readonly [host: string, port?: number];

const config1: Config = ["localhost"];
const config2: Config = ["localhost", 3000];

// Readonly with rest elements
type LogEntry = readonly [timestamp: Date, level: string, ...messages: string[]];

const entry: LogEntry = [new Date(), "INFO", "App started", "Port 3000"];

// Function with readonly tuple parameter
function distance(point: readonly [number, number]): number {
  const [x, y] = point;
  return Math.sqrt(x * x + y * y);
}

distance([3, 4]); // OK: 5

// Return readonly tuple
function getOrigin(): readonly [number, number] {
  return [0, 0];
}

const origin = getOrigin();
// origin[0] = 1; // Error: readonly

// as const with tuples
const rgb = [255, 128, 0] as const;
// Type: readonly [255, 128, 0] (literal types!)

// Without as const
const rgb2 = [255, 128, 0];
// Type: number[] (mutable array)

// Explicit tuple annotation
const rgb3: [number, number, number] = [255, 128, 0];
// Type: [number, number, number] (mutable tuple)

// Readonly and as const difference
const t1: readonly [number, number] = [10, 20];
// Type: readonly [number, number] (readonly tuple of numbers)

const t2 = [10, 20] as const;
// Type: readonly [10, 20] (readonly tuple with literal types)

// When to use readonly tuples:
// ✅ Constants
// ✅ Configuration
// ✅ Coordinates that shouldn't change
// ✅ Function returns that shouldn't be modified
// ✅ React props

// React example
interface Props {
  position: readonly [number, number];
  colors: readonly string[];
}

function Component({ position, colors }: Props) {
  // position.push(0); // Error: readonly
  const [x, y] = position; // OK: can destructure
  return null;
}

// Generic readonly tuple
type ReadonlyTuple<T extends readonly any[]> = Readonly<T>;

type RT = ReadonlyTuple<[string, number]>; // readonly [string, number]

// Deep readonly tuple
type DeepReadonly<T> = T extends readonly [infer First, ...infer Rest]
  ? readonly [Readonly<First>, ...DeepReadonly<Rest>]
  : T;

interface Nested {
  value: number;
}

type DRT = DeepReadonly<[Nested, Nested]>;
// readonly [Readonly<Nested>, Readonly<Nested>]`}
        </CodeBlock>

        <InfoBox type="important">
          Use <code>as const</code> for constant tuples to get both readonly
          protection and literal types. Use <code>readonly [...]</code> when you
          want readonly protection but need wider types.
        </InfoBox>
      </Section>

      <Section title="6. Advanced Tuple Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns and real-world use cases for tuples in TypeScript.
        </p>

        <CodeBlock title="Advanced tuple patterns">
          {`// 1. Tuple type inference
function tuple<T extends any[]>(...args: T): T {
  return args;
}

const t = tuple(1, "hello", true);
// Type: [number, string, boolean]

// 2. Splitting tuples
type Split<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [First, Rest]
  : never;

type S1 = Split<[1, 2, 3]>; // [1, [2, 3]]

// 3. Tuple concatenation
type Concat<T extends any[], U extends any[]> = [...T, ...U];

type C1 = Concat<[1, 2], [3, 4]>; // [1, 2, 3, 4]

// 4. Tuple to union
type TupleToUnion<T extends any[]> = T[number];

type Union = TupleToUnion<[string, number, boolean]>; // string | number | boolean

// 5. Tuple length
type Length<T extends any[]> = T["length"];

type L1 = Length<[1, 2, 3]>; // 3
type L2 = Length<[]>;        // 0

// 6. Swap tuple elements
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

const swapped = swap([1, "hello"]); // ["hello", 1]

// 7. Zip tuples
function zip<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const length = Math.min(arr1.length, arr2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([arr1[i], arr2[i]]);
  }
  return result;
}

const zipped = zip([1, 2, 3], ["a", "b", "c"]);
// [[1, "a"], [2, "b"], [3, "c"]]

// 8. Tuple as state (like useState)
type State<T> = [value: T, setValue: (val: T) => void];

function createState<T>(initial: T): State<T> {
  let value = initial;
  const setValue = (val: T) => {
    value = val;
  };
  return [value, setValue];
}

const [count, setCount] = createState(0);

// 9. Multiple return values
function divmod(a: number, b: number): [quotient: number, remainder: number] {
  return [Math.floor(a / b), a % b];
}

const [quotient, remainder] = divmod(17, 5); // [3, 2]

// 10. Tuple for coordinates/ranges
type Range = [start: number, end: number];
type Range3D = [x: Range, y: Range, z: Range];

function inRange(value: number, range: Range): boolean {
  const [start, end] = range;
  return value >= start && value <= end;
}

inRange(5, [0, 10]); // true

// 11. Tuple for parsing results
type ParseSuccess<T> = [parsed: T, remaining: string];
type ParseFailure = null;
type ParseResult<T> = ParseSuccess<T> | ParseFailure;

function parseNumber(input: string): ParseResult<number> {
  const match = input.match(/^(\d+)/);
  if (match) {
    return [parseInt(match[1]), input.slice(match[1].length)];
  }
  return null;
}

const result = parseNumber("123abc");
if (result) {
  const [num, rest] = result;
  console.log(num, rest); // 123, "abc"
}

// 12. Tuple for key-value pairs
type Entry<K, V> = [key: K, value: V];

function fromEntries<K extends string | number, V>(
  entries: Entry<K, V>[]
): Record<K, V> {
  const obj = {} as Record<K, V>;
  entries.forEach(([key, value]) => {
    obj[key] = value;
  });
  return obj;
}

const obj = fromEntries([
  ["name", "John"],
  ["age", 30]
]);

// 13. Variadic tuple types
type Prepend<T, U extends any[]> = [T, ...U];
type Append<U extends any[], T> = [...U, T];

type P = Prepend<string, [number, boolean]>; // [string, number, boolean]
type A = Append<[number, boolean], string>;  // [number, boolean, string]

// 14. Tuple validation
function assertTuple<T extends any[]>(
  value: any,
  ...validators: { [K in keyof T]: (val: any) => val is T[K] }
): value is T {
  if (!Array.isArray(value)) return false;
  if (value.length !== validators.length) return false;
  return validators.every((validator, i) => validator(value[i]));
}

// 15. Named tuple constructor
function createPerson(
  data: [name: string, age: number, email?: string]
): { name: string; age: number; email?: string } {
  const [name, age, email] = data;
  return { name, age, email };
}

const person = createPerson(["John", 30, "john@example.com"]);`}
        </CodeBlock>

        <InfoBox type="tip">
          Tuples shine in scenarios where you need to return multiple values,
          represent fixed structures like coordinates, or work with paired data.
          They're especially useful in functional programming patterns.
        </InfoBox>
      </Section>
    </div>
  );
}
