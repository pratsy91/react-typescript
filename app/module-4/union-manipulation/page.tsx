import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function UnionManipulationPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Union Manipulation Utilities
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript provides utilities for filtering and transforming union
        types: Exclude&lt;T, U&gt; removes types, Extract&lt;T, U&gt; selects
        types, and NonNullable&lt;T&gt; removes null and undefined.
      </p>

      <Section title="1. Exclude<T, U>">
        <p className="text-gray-700 dark:text-gray-300">
          Exclude&lt;T, U&gt; removes types from a union that are assignable to
          U. It filters out unwanted types from union types.
        </p>

        <CodeBlock title="Exclude<T, U> examples">
          {`// Basic Exclude usage
type AllTypes = string | number | boolean;
type WithoutBoolean = Exclude<AllTypes, boolean>;
// string | number

type Status = "pending" | "active" | "complete" | "cancelled";
type ActiveStatus = Exclude<Status, "cancelled">;
// "pending" | "active" | "complete"

// Exclude multiple types
type Mixed = string | number | boolean | null | undefined;
type PrimitiveValues = Exclude<Mixed, null | undefined>;
// string | number | boolean

// Exclude with type categories
type Value = string | number | boolean | object | Function;
type NonObject = Exclude<Value, object | Function>;
// string | number | boolean

// Exclude string literals
type Color = "red" | "green" | "blue" | "yellow";
type PrimaryColors = Exclude<Color, "yellow">;
// "red" | "green" | "blue"

type AllColors = "red" | "green" | "blue" | "yellow" | "orange" | "purple";
type WarmColors = Exclude<AllColors, "blue" | "green" | "purple">;
// "red" | "yellow" | "orange"

// Exclude from function types
type Handler = ((e: MouseEvent) => void) | ((e: KeyboardEvent) => void) | (() => void);
type EventHandler = Exclude<Handler, () => void>;
// ((e: MouseEvent) => void) | ((e: KeyboardEvent) => void)

// Exclude with object types
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

type NonCircle = Exclude<Shape, { kind: "circle" }>;
// { kind: "square"; size: number } | { kind: "rectangle"; width: number; height: number }

// Exclude with template literals
type EventName = \`on\${"Click" | "Hover" | "Focus" | "Blur"}\`;
type MouseEvents = Exclude<EventName, "onFocus" | "onBlur">;
// "onClick" | "onHover"

// Exclude with conditional types
type NonNullable<T> = Exclude<T, null | undefined>;

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

// Exclude error types
type Result<T, E> = { success: true; data: T } | { success: false; error: E };
type SuccessResult<T, E> = Exclude<Result<T, E>, { success: false }>;
// { success: true; data: T }

// Exclude with keys
type AllKeys = "id" | "name" | "email" | "password";
type PublicKeys = Exclude<AllKeys, "password">;
// "id" | "name" | "email"

// Exclude from union of functions
type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type ReadOnlyMethods = Exclude<ApiMethod, "POST" | "PUT" | "DELETE" | "PATCH">;
// "GET"

type WriteMethod = Exclude<ApiMethod, "GET">;
// "POST" | "PUT" | "DELETE" | "PATCH"

// Exclude with arrays
type ArrayTypes = string[] | number[] | boolean[];
type NonBooleanArray = Exclude<ArrayTypes, boolean[]>;
// string[] | number[]

// Exclude primitive types
type AllPrimitives = string | number | boolean | symbol | bigint | null | undefined;
type NumberLike = Exclude<AllPrimitives, string | boolean | null | undefined>;
// number | symbol | bigint

// Exclude from object property types
interface User {
  id: number;
  name: string;
  email: string | null;
  age: number | undefined;
}

type NonNullableUser = {
  [K in keyof User]: Exclude<User[K], null | undefined>;
};
// { id: number; name: string; email: string; age: number }

// Exclude with generics
function filter<T, U>(items: T[], exclude: U): Exclude<T, U>[] {
  return items.filter((item): item is Exclude<T, U> => item !== exclude);
}

const numbers: (number | null)[] = [1, 2, null, 3];
const filtered = filter(numbers, null);  // number[]

// Exclude in discriminated unions
type Action =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "reset" }
  | { type: "setTo"; payload: number };

type PayloadActions = Exclude<Action, { type: "reset" }>;
// All actions except reset

// Exclude with mapped types
type EventMap = {
  click: MouseEvent;
  keypress: KeyboardEvent;
  focus: FocusEvent;
  blur: FocusEvent;
};

type MouseEventKeys = {
  [K in keyof EventMap]: EventMap[K] extends MouseEvent ? K : never;
}[keyof EventMap];
// "click"

type NonMouseEventKeys = Exclude<keyof EventMap, MouseEventKeys>;
// "keypress" | "focus" | "blur"

// Practical: Remove error states
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

type NonErrorState<T> = Exclude<AsyncState<T>, { status: "error" }>;
// { status: "idle" } | { status: "loading" } | { status: "success"; data: T }

// Exclude from utility types
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

interface Config {
  apiUrl: string;
  timeout?: number;
  debug?: boolean;
}

type RequiredKeys = Exclude<keyof Config, OptionalKeys<Config>>;
// "apiUrl"

// Exclude with never
type FilterNever<T> = T extends never ? never : T;
type WithNever = string | never | number;
type WithoutNever = Exclude<WithNever, never>;
// string | number

// Exclude branded types
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<number, "UserId">;
type PostId = Brand<number, "PostId">;
type Id = UserId | PostId | number;

type NonUserId = Exclude<Id, UserId>;
// PostId | number

// Exclude readonly
type Mutable<T> = {
  [K in keyof T]: T[K] extends readonly any[] 
    ? Exclude<T[K], readonly any[]>
    : T[K];
};`}
        </CodeBlock>

        <InfoBox type="info">
          Exclude&lt;T, U&gt; removes types from a union that are assignable to
          U. Use it to filter out unwanted types, remove null/undefined, exclude
          specific literals, and create filtered union types.
        </InfoBox>
      </Section>

      <Section title="2. Extract<T, U>">
        <p className="text-gray-700 dark:text-gray-300">
          Extract&lt;T, U&gt; selects types from a union that are assignable to
          U. It's the opposite of Exclude, extracting only matching types.
        </p>

        <CodeBlock title="Extract<T, U> examples">
          {`// Basic Extract usage
type AllTypes = string | number | boolean;
type OnlyString = Extract<AllTypes, string>;
// string

type Status = "pending" | "active" | "complete" | "cancelled";
type ActiveOrComplete = Extract<Status, "active" | "complete">;
// "active" | "complete"

// Extract primitives
type Mixed = string | number | boolean | object | Function;
type OnlyPrimitives = Extract<Mixed, string | number | boolean>;
// string | number | boolean

// Extract string literals
type Color = "red" | "green" | "blue" | "yellow";
type BlueShades = Extract<Color, "blue">;
// "blue"

type Fruit = "apple" | "banana" | "orange" | "grape";
type Citrus = Extract<Fruit, "orange" | "lemon">;
// "orange"

// Extract function types
type Handler = ((e: MouseEvent) => void) | ((e: KeyboardEvent) => void) | string | number;
type FunctionHandlers = Extract<Handler, Function>;
// ((e: MouseEvent) => void) | ((e: KeyboardEvent) => void)

// Extract with object types
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

type CircleOnly = Extract<Shape, { kind: "circle" }>;
// { kind: "circle"; radius: number }

// Extract by discriminant
type Action =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "reset" };

type PayloadAction = Extract<Action, { payload: number }>;
// { type: "increment"; payload: number } | { type: "decrement"; payload: number }

// Extract nullable types
type MaybeValues = string | null | number | undefined | boolean;
type NullableOnly = Extract<MaybeValues, null | undefined>;
// null | undefined

// Extract with template literals
type EventName = "onClick" | "onHover" | "onChange" | "onFocus";
type OnEvents = Extract<EventName, \`on\${string}\`>;
// "onClick" | "onHover" | "onChange" | "onFocus" (all of them)

type ClickEvents = Extract<EventName, \`\${"onClick" | "onDblClick"}\`>;
// "onClick"

// Extract with conditionals
type ExtractPromise<T> = Extract<T, Promise<any>>;

type Values = string | Promise<number> | boolean | Promise<string>;
type PromiseValues = ExtractPromise<Values>;
// Promise<number> | Promise<string>

// Extract keys by value type
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  active: boolean;
}

type StringKeys = {
  [K in keyof User]: User[K] extends string ? K : never;
}[keyof User];
// "name" | "email"

type ExtractedStringKeys = Extract<keyof User, StringKeys>;
// "name" | "email"

// Extract from discriminated union
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error };

type SuccessResult<T> = Extract<Result<T>, { success: true }>;
// { success: true; data: T }

type FailureResult<T> = Extract<Result<T>, { success: false }>;
// { success: false; error: Error }

// Extract array types
type ArrayTypes = string[] | number[] | boolean[] | string;
type OnlyArrays = Extract<ArrayTypes, any[]>;
// string[] | number[] | boolean[]

// Extract by property existence
type WithId = Extract<
  | { id: number; name: string }
  | { name: string }
  | { id: number; email: string },
  { id: any }
>;
// { id: number; name: string } | { id: number; email: string }

// Extract HTTP methods
type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
type MutatingMethods = Extract<Method, "POST" | "PUT" | "DELETE" | "PATCH">;
// "POST" | "PUT" | "DELETE" | "PATCH"

// Extract with branded types
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<number, "UserId">;
type PostId = Brand<number, "PostId">;
type Id = UserId | PostId | string;

type NumericIds = Extract<Id, number>;
// UserId | PostId

// Extract from union of objects
type Config =
  | { type: "api"; url: string }
  | { type: "database"; connection: string }
  | { type: "cache"; ttl: number };

type ApiConfig = Extract<Config, { type: "api" }>;
// { type: "api"; url: string }

// Extract async functions
type Functions = (() => void) | (() => Promise<void>) | ((x: number) => number);
type AsyncFunctions = Extract<Functions, () => Promise<any>>;
// () => Promise<void>

// Extract by return type
type Handlers =
  | ((x: number) => number)
  | ((x: string) => string)
  | ((x: boolean) => void);

type ReturningHandlers = Extract<Handlers, (...args: any[]) => any>;
// All of them (could narrow further)

// Extract readonly arrays
type Arrays = string[] | readonly number[] | boolean[];
type ReadonlyArrays = Extract<Arrays, readonly any[]>;
// readonly number[]

// Extract with generics
function extractType<T, U>(value: T): value is Extract<T, U> {
  return value !== null && value !== undefined;
}

// Practical: Extract states
type AppState =
  | { status: "idle" }
  | { status: "loading"; progress: number }
  | { status: "success"; data: any }
  | { status: "error"; error: Error };

type LoadingState = Extract<AppState, { status: "loading" }>;
// { status: "loading"; progress: number }

type DataStates = Extract<AppState, { status: "success" | "error" }>;
// { status: "success"; data: any } | { status: "error"; error: Error }

// Extract optional properties
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

interface FormData {
  name: string;
  email?: string;
  phone?: string;
}

type OnlyOptional = Extract<keyof FormData, OptionalKeys<FormData>>;
// "email" | "phone"

// Extract from utility types
type Primitives = string | number | boolean | symbol | bigint;
type StringLike = Extract<Primitives, string | symbol>;
// string | symbol

// Extract action types with payload
type Actions =
  | { type: "ADD"; payload: number }
  | { type: "REMOVE"; payload: number }
  | { type: "CLEAR" }
  | { type: "RESET" };

type ActionWithPayload = Extract<Actions, { payload: any }>;
// { type: "ADD"; payload: number } | { type: "REMOVE"; payload: number }

// Extract by index signature
type WithIndex = Extract<
  | { [key: string]: any }
  | { name: string }
  | { id: number },
  { [key: string]: any }
>;`}
        </CodeBlock>

        <InfoBox type="tip">
          Extract&lt;T, U&gt; selects types from a union that match U. Use it to
          filter union types, select specific discriminated union members,
          extract functions or objects, and narrow complex union types.
        </InfoBox>
      </Section>

      <Section title="3. NonNullable<T>">
        <p className="text-gray-700 dark:text-gray-300">
          NonNullable&lt;T&gt; removes null and undefined from a type. It's
          essential for ensuring values are present and avoiding null pointer
          errors.
        </p>

        <CodeBlock title="NonNullable<T> examples">
          {`// Basic NonNullable usage
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

type Value = string | number | null | undefined;
type DefiniteValue = NonNullable<Value>;
// string | number

// NonNullable with optionals
interface User {
  id: number;
  name: string;
  email: string | null;
  phone?: string;
}

type NonNullableUser = {
  [K in keyof User]: NonNullable<User[K]>;
};
// { id: number; name: string; email: string; phone: string | undefined }
// Note: undefined from optional (?) is not removed

// Remove null from union
type Status = "active" | "inactive" | null;
type DefiniteStatus = NonNullable<Status>;
// "active" | "inactive"

// NonNullable with arrays
type MaybeArray = string[] | null | undefined;
type DefiniteArray = NonNullable<MaybeArray>;
// string[]

type Items = (string | null)[] | null;
type DefiniteItems = NonNullable<Items>;
// (string | null)[]
// Note: Doesn't remove null from array elements

// Deep NonNullable
type DeepNonNullable<T> = T extends null | undefined
  ? never
  : T extends (infer U)[]
  ? DeepNonNullable<U>[]
  : T extends object
  ? { [K in keyof T]: DeepNonNullable<T[K]> }
  : T;

interface Nested {
  user: {
    name: string | null;
    email: string | undefined;
  } | null;
}

type CleanNested = DeepNonNullable<Nested>;
// { user: { name: string; email: string } }

// NonNullable function parameters
function process(value: string | null | undefined): NonNullable<typeof value> {
  if (value === null || value === undefined) {
    throw new Error("Value required");
  }
  return value;  // string
}

// NonNullable return types
function getValue(): string | null {
  return Math.random() > 0.5 ? "value" : null;
}

function getValueSafe(): NonNullable<ReturnType<typeof getValue>> {
  const value = getValue();
  if (!value) {
    throw new Error("No value");
  }
  return value;  // string
}

// NonNullable with generics
function assertNonNull<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new Error("Value is null or undefined");
  }
}

const maybeValue: string | null = getValue();
assertNonNull(maybeValue);
// maybeValue is now string

// NonNullable for object properties
interface Config {
  apiUrl: string | null;
  timeout: number | undefined;
  retries: number;
}

type RequiredConfig = {
  [K in keyof Config]: NonNullable<Config[K]>;
};
// { apiUrl: string; timeout: number; retries: number }

// NonNullable with utility types
type PartialConfig = Partial<Config>;
// { apiUrl?: string | null; timeout?: number | undefined; retries?: number }

type NonNullablePartial = {
  [K in keyof PartialConfig]: NonNullable<PartialConfig[K]>;
};
// { apiUrl?: string; timeout?: number; retries?: number }

// NonNullable with Pick
type PickedNonNull = NonNullable<Pick<Config, "apiUrl">>;
// { apiUrl: string | null }

type CorrectPickedNonNull = {
  [K in keyof Pick<Config, "apiUrl">]: NonNullable<Pick<Config, "apiUrl">[K]>;
};
// { apiUrl: string }

// NonNullable in type guards
function isNonNull<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

const values: (string | null)[] = ["a", null, "b", null, "c"];
const nonNullValues = values.filter(isNonNull);
// string[]

// NonNullable with discriminated unions
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: Error | null };

type NonNullResult<T> = {
  [K in keyof Result<T>]: NonNullable<Result<T>[K]>;
};

// NonNullable array elements
type ArrayElement<T> = T extends (infer E)[] ? E : never;
type NonNullableArray<T extends any[]> = NonNullable<ArrayElement<T>>[];

type MixedArray = (string | null | undefined)[];
type CleanArray = NonNullableArray<MixedArray>;
// string[]

// Practical: API responses
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

function unwrapResponse<T>(response: ApiResponse<T>): NonNullable<T> {
  if (response.data === null) {
    throw new Error(response.error ?? "Unknown error");
  }
  return response.data as NonNullable<T>;
}

// NonNullable with mapped types
type RemoveNullable<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};

interface UserProfile {
  name: string;
  avatar: string | null;
  bio: string | undefined;
  website: string | null | undefined;
}

type RequiredProfile = RemoveNullable<UserProfile>;
// { name: string; avatar: string; bio: string; website: string }

// NonNullable with conditional types
type NonNullableIf<T, Condition extends boolean> = Condition extends true
  ? NonNullable<T>
  : T;

type StrictMode = true;
type Value1 = NonNullableIf<string | null, StrictMode>;
// string

// NonNullable for state management
interface AppState {
  user: User | null;
  settings: Config | null;
  data: any | undefined;
}

type InitializedState = {
  [K in keyof AppState]: NonNullable<AppState[K]>;
};
// { user: User; settings: Config; data: any }

function ensureInitialized(state: AppState): InitializedState {
  if (!state.user || !state.settings) {
    throw new Error("State not initialized");
  }
  return state as InitializedState;
}

// NonNullable with Record
type MaybeRecord = Record<string, string | null>;
type DefiniteRecord = Record<string, NonNullable<MaybeRecord[string]>>;
// Record<string, string>

// NonNullable return type helper
type NonNullableReturn<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => NonNullable<ReturnType<T>>;

function maybeGetUser(): User | null {
  return null;
}

const getUser: NonNullableReturn<typeof maybeGetUser> = () => {
  const user = maybeGetUser();
  if (!user) throw new Error("No user");
  return user;
};

// NonNullable with Promise
type MaybePromise = Promise<string | null>;
type DefinitePromise = Promise<NonNullable<Awaited<MaybePromise>>>;
// Promise<string>

async function fetchDataSafe(): DefinitePromise {
  const data = await fetchData();
  if (!data) throw new Error("No data");
  return data;
}

// NonNullable filter function
function filterNullable<T>(array: T[]): NonNullable<T>[] {
  return array.filter((item): item is NonNullable<T> => 
    item !== null && item !== undefined
  );
}

const mixed = [1, null, 2, undefined, 3];
const filtered = filterNullable(mixed);  // number[]`}
        </CodeBlock>

        <InfoBox type="important">
          NonNullable&lt;T&gt; removes null and undefined from a type. Use it
          for type guards, assertion functions, ensuring values are present, and
          creating non-nullable versions of nullable types.
        </InfoBox>
      </Section>

      <Section title="4. Combining Union Utilities">
        <p className="text-gray-700 dark:text-gray-300">
          Exclude, Extract, and NonNullable can be combined for sophisticated
          union type transformations and filtering.
        </p>

        <CodeBlock title="Combining union utilities">
          {`// Exclude and NonNullable
type Value = string | number | null | undefined;
type NonNullValue = NonNullable<Value>;
// string | number

type ExcludedValue = Exclude<Value, null | undefined>;
// string | number (same result)

// Extract and NonNullable
type MixedHandlers = (() => string) | (() => null) | ((x: number) => void);
type NonNullHandlers = Extract<MixedHandlers, () => NonNullable<any>>;

// Complex filtering
type AllTypes = string | number | boolean | null | undefined | object;
type PrimitiveNonNull = NonNullable<Exclude<AllTypes, object>>;
// string | number | boolean

// Filter by pattern
type Status = "pending" | "active" | "complete" | "cancelled" | null;
type ActiveStatuses = NonNullable<Exclude<Status, "cancelled">>;
// "pending" | "active" | "complete"

// Discriminated union filtering
type Action =
  | { type: "add"; payload: number }
  | { type: "remove"; payload: number }
  | { type: "clear" }
  | { type: "error"; error: Error | null };

type PayloadActions = Extract<Action, { payload: any }>;
type ValidPayloadActions = {
  [K in keyof PayloadActions]: NonNullable<PayloadActions[K]>;
};

// Remove error states and null
type Result<T> =
  | { success: true; data: T | null }
  | { success: false; error: Error };

type SuccessData<T> = NonNullable<
  Extract<Result<T>, { success: true }>["data"]
>;

// Filter and clean
type ApiResponse = {
  user: User | null;
  posts: Post[] | null;
  comments: Comment[] | undefined;
};

type CleanResponse = {
  [K in keyof ApiResponse]: NonNullable<ApiResponse[K]>;
};

// Extract non-null keys
type NonNullKeys<T> = {
  [K in keyof T]: null extends T[K] ? never : undefined extends T[K] ? never : K;
}[keyof T];

interface Data {
  id: number;
  name: string;
  email: string | null;
  phone?: string;
}

type DefiniteKeys = NonNullKeys<Data>;
// "id" | "name"

// Practical: State machine
type State =
  | { status: "idle"; data: null }
  | { status: "loading"; data: null }
  | { status: "success"; data: any }
  | { status: "error"; data: null; error: Error };

type LoadedState = Extract<State, { status: "success" }>;
type LoadedData = NonNullable<LoadedState["data"]>;

// Filter and validate
type ValidationResult =
  | { valid: true; value: string; error: null }
  | { valid: false; value: null; error: string };

type ValidResult = Extract<ValidationResult, { valid: true }>;
type ValidValue = NonNullable<ValidResult["value"]>;

// Multiple filters
type AllValues = string | number | boolean | null | undefined | symbol | bigint;
type FilteredValues = Exclude<NonNullable<AllValues>, symbol | bigint>;
// string | number | boolean

// Extract and transform
type Handlers = {
  onClick: ((e: MouseEvent) => void) | null;
  onKeyPress: ((e: KeyboardEvent) => void) | null;
  onSubmit: (() => void) | undefined;
};

type ValidHandlers = {
  [K in keyof Handlers]: NonNullable<Handlers[K]>;
};

// Conditional filtering
type FilterByCondition<T, Condition> = {
  [K in keyof T]: T[K] extends Condition ? never : T[K];
};

type WithoutNull<T> = FilterByCondition<T, null>;
type WithoutUndefined<T> = FilterByCondition<T, undefined>;
type WithoutNullable<T> = FilterByCondition<T, null | undefined>;

// Union distribution
type DistributeNonNullable<T> = T extends any ? NonNullable<T> : never;

type Union = (string | null) | (number | undefined);
type Clean = DistributeNonNullable<Union>;
// string | number

// Extract specific patterns
type EventType = "click" | "dblclick" | "mousedown" | null;
type MouseEventType = NonNullable<Extract<EventType, \`\${"click" | "dblclick"}\`>>;
// "click" | "dblclick"`}
        </CodeBlock>

        <InfoBox type="tip">
          Combine Exclude, Extract, and NonNullable for powerful union
          filtering. Use Exclude to remove types, Extract to select types, and
          NonNullable to remove null/undefined. Chain them for complex
          transformations.
        </InfoBox>
      </Section>

      <Section title="5. Practical Use Cases">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world applications of union manipulation utilities in API
          handling, state management, form validation, and type-safe filtering.
        </p>

        <CodeBlock title="Practical union manipulation examples">
          {`// API error handling
type ApiError = 
  | { code: "NETWORK_ERROR"; message: string }
  | { code: "AUTH_ERROR"; message: string }
  | { code: "VALIDATION_ERROR"; fields: Record<string, string> }
  | { code: "SERVER_ERROR"; status: number };

type NetworkErrors = Extract<ApiError, { code: "NETWORK_ERROR" | "AUTH_ERROR" }>;
type ValidationError = Extract<ApiError, { code: "VALIDATION_ERROR" }>;
type NonValidationErrors = Exclude<ApiError, ValidationError>;

function handleError(error: ApiError): void {
  if (error.code === "VALIDATION_ERROR") {
    const validationError: ValidationError = error;
    console.error("Validation errors:", validationError.fields);
  } else {
    const otherError: NonValidationErrors = error;
    console.error("Error:", otherError.message ?? otherError.status);
  }
}

// Form state management
interface FormField<T = any> {
  value: T | null;
  error: string | null;
  touched: boolean;
}

type ValidField<T> = FormField<T> & {
  value: NonNullable<T>;
  error: null;
};

function isValid<T>(field: FormField<T>): field is ValidField<T> {
  return field.value !== null && field.error === null;
}

class FormState {
  private fields: Record<string, FormField> = {};

  getValidFields(): Record<string, ValidField<any>> {
    const valid: Record<string, ValidField<any>> = {};
    for (const [key, field] of Object.entries(this.fields)) {
      if (isValid(field)) {
        valid[key] = field;
      }
    }
    return valid;
  }
}

// Async operation states
type LoadingState<T> =
  | { type: "idle"; data: null }
  | { type: "loading"; data: null; progress?: number }
  | { type: "success"; data: T }
  | { type: "error"; data: null; error: Error };

type DataState<T> = Extract<LoadingState<T>, { data: NonNullable<any> }>;
type ErrorState = Extract<LoadingState<any>, { type: "error" }>;
type PendingState = Exclude<LoadingState<any>, DataState<any> | ErrorState>;

function useAsync<T>() {
  const [state, setState] = useState<LoadingState<T>>({ type: "idle", data: null });

  const isSuccess = (s: LoadingState<T>): s is DataState<T> => {
    return s.type === "success" && s.data !== null;
  };

  const getData = (): NonNullable<T> | null => {
    return isSuccess(state) ? state.data : null;
  };

  return { state, getData };
}

// Event filtering
type DOMEvent = MouseEvent | KeyboardEvent | FocusEvent | TouchEvent | null;

type MouseEvents = NonNullable<Extract<DOMEvent, MouseEvent>>;
type KeyboardEvents = NonNullable<Extract<DOMEvent, KeyboardEvent>>;
type OtherEvents = NonNullable<Exclude<DOMEvent, MouseEvents | KeyboardEvents>>;

function handleEvent(event: DOMEvent): void {
  if (!event) return;

  if (event instanceof MouseEvent) {
    handleMouseEvent(event);  // MouseEvents
  } else if (event instanceof KeyboardEvent) {
    handleKeyboardEvent(event);  // KeyboardEvents
  } else {
    handleOtherEvent(event);  // OtherEvents
  }
}

function handleMouseEvent(e: MouseEvents): void {}
function handleKeyboardEvent(e: KeyboardEvents): void {}
function handleOtherEvent(e: OtherEvents): void {}

// Permission system
type Permission = "read" | "write" | "delete" | "admin" | null;
type UserPermission = Exclude<Permission, "admin" | null>;
type AdminPermission = NonNullable<Extract<Permission, "admin">>;

interface User {
  permissions: UserPermission[];
}

interface Admin extends User {
  permissions: (UserPermission | AdminPermission)[];
}

// State machine with filtered transitions
type AppStatus = "initializing" | "ready" | "error" | "terminated";
type ActiveStatus = Exclude<AppStatus, "terminated">;
type RecoverableStatus = Exclude<ActiveStatus, "error">;

function canTransition(from: AppStatus, to: AppStatus): boolean {
  const invalid: AppStatus[] = ["terminated"];
  if (invalid.includes(from)) {
    return false;
  }
  return true;
}

// Data validation
interface UserInput {
  name: string | null;
  email: string | null;
  age: number | null;
}

type ValidatedUser = {
  [K in keyof UserInput]: NonNullable<UserInput[K]>;
};

function validateUser(input: UserInput): ValidatedUser | null {
  if (!input.name || !input.email || !input.age) {
    return null;
  }
  return input as ValidatedUser;
}

// Filter collection by type
type Item = 
  | { type: "text"; content: string }
  | { type: "image"; url: string }
  | { type: "video"; url: string; duration: number }
  | null;

type MediaItem = NonNullable<Extract<Item, { url: string }>>;
type TextItem = NonNullable<Extract<Item, { type: "text" }>>;

function filterItems(items: Item[]): {
  media: MediaItem[];
  text: TextItem[];
} {
  const media: MediaItem[] = [];
  const text: TextItem[] = [];

  for (const item of items) {
    if (!item) continue;
    
    if ("url" in item) {
      media.push(item);
    } else if (item.type === "text") {
      text.push(item);
    }
  }

  return { media, text };
}

// Configuration with environment-specific types
type DevConfig = { debug: true; verbose: boolean; apiUrl: string | null };
type ProdConfig = { debug: false; apiUrl: string };

type Config = DevConfig | ProdConfig;
type WithApiUrl = NonNullable<Extract<Config, { apiUrl: string }>>;

function getApiUrl(config: Config): string {
  if ("apiUrl" in config && config.apiUrl) {
    return config.apiUrl;
  }
  return "https://api.example.com";
}`}
        </CodeBlock>

        <InfoBox type="important">
          Use Exclude to remove unwanted types, Extract to select specific
          types, and NonNullable to ensure values exist. Combine them for
          type-safe error handling, state management, event filtering, and data
          validation.
        </InfoBox>
      </Section>
    </div>
  );
}
