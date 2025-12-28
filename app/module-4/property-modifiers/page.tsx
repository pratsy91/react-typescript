import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function PropertyModifiersPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Property Modifier Utilities
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript provides built-in utility types for modifying property
        modifiers: Partial&lt;T&gt;, Required&lt;T&gt;, and Readonly&lt;T&gt;.
        These utilities transform all properties of a type, making them
        optional, required, or readonly.
      </p>

      <Section title="1. Partial<T>">
        <p className="text-gray-700 dark:text-gray-300">
          Partial&lt;T&gt; makes all properties of a type optional. It's useful
          for updates, patches, and partial data scenarios.
        </p>

        <CodeBlock title="Partial<T> examples">
          {`// Basic Partial usage
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

// Update user with partial data
function updateUser(id: number, updates: Partial<User>): User {
  const existingUser = getUser(id);
  return { ...existingUser, ...updates };
}

updateUser(1, { name: "John" });  // ✓ Only name
updateUser(1, { email: "john@example.com", age: 30 });  // ✓ Multiple fields
updateUser(1, {});  // ✓ Empty updates

// Partial with functions
interface ApiClient {
  get(url: string): Promise<Response>;
  post(url: string, data: any): Promise<Response>;
  put(url: string, data: any): Promise<Response>;
  delete(url: string): Promise<Response>;
}

// Mock client with partial implementation
const mockClient: Partial<ApiClient> = {
  get: async (url) => new Response(),
  // Other methods optional
};

// Partial form state
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface FormState {
  values: FormData;
  errors: Partial<FormData>;  // Not all fields may have errors
  touched: Partial<Record<keyof FormData, boolean>>;
}

const formState: FormState = {
  values: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "123-456-7890"
  },
  errors: {
    email: "Invalid email format"  // Only email has error
  },
  touched: {
    email: true,
    firstName: true
  }
};

// Partial with nested objects
interface Address {
  street: string;
  city: string;
  country: string;
}

interface Profile {
  name: string;
  address: Address;
}

type PartialProfile = Partial<Profile>;
// { name?: string; address?: Address }
// Note: address properties are NOT partial

// Deep partial (custom utility)
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

type DeepPartialProfile = DeepPartial<Profile>;
// { name?: string; address?: { street?: string; city?: string; country?: string } }

// Partial with arrays
interface TodoList {
  id: number;
  title: string;
  items: string[];
}

const partialTodo: Partial<TodoList> = {
  title: "Shopping"
  // items array is optional
};

// Configuration with defaults
interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
  debug: boolean;
}

const defaultConfig: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  debug: false
};

function createConfig(options: Partial<Config>): Config {
  return { ...defaultConfig, ...options };
}

const config = createConfig({ timeout: 10000 });  // Override only timeout

// Partial with unions
type Status = "pending" | "active" | "complete";

interface Task {
  id: number;
  title: string;
  status: Status;
}

const taskUpdate: Partial<Task> = {
  status: "complete"  // Can update just status
};

// Partial constructor parameters
class Person {
  constructor(
    public name: string,
    public age: number,
    public email: string
  ) {}
}

function createPerson(data: Partial<ConstructorParameters<typeof Person>[0]>) {
  // Partial person data
}

// Partial with methods
interface Service {
  start(): void;
  stop(): void;
  restart(): void;
}

// Mock with partial methods
const mockService: Partial<Service> = {
  start: () => console.log("Starting...")
  // stop and restart are optional
};

// Patch operations
type Patch<T> = Partial<T> & { id: number };

function patchResource<T extends { id: number }>(patch: Patch<T>): T {
  // Apply patch to resource
  return {} as T;
}

// Partial with generics
function merge<T>(original: T, updates: Partial<T>): T {
  return { ...original, ...updates };
}

const merged = merge(
  { name: "John", age: 30 },
  { age: 31 }  // Partial update
);

// Partial state updates
interface AppState {
  user: User;
  isLoading: boolean;
  error: string | null;
}

function setState(updates: Partial<AppState>): void {
  // Update only changed properties
}

setState({ isLoading: true });
setState({ user: { id: 1, name: "John", email: "john@example.com", age: 30 } });

// API response with partial data
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

// Search results may have partial product data
interface SearchResult {
  total: number;
  items: Partial<Product>[];  // May not include all fields
}`}
        </CodeBlock>

        <InfoBox type="info">
          Partial&lt;T&gt; makes all properties optional. Use it for updates,
          configurations with defaults, mock objects, and scenarios where only
          some properties may be present.
        </InfoBox>
      </Section>

      <Section title="2. Required<T>">
        <p className="text-gray-700 dark:text-gray-300">
          Required&lt;T&gt; makes all properties required, removing optional
          modifiers. It's the opposite of Partial and useful for ensuring all
          fields are present.
        </p>

        <CodeBlock title="Required<T> examples">
          {`// Basic Required usage
interface Config {
  apiUrl?: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

type RequiredConfig = Required<Config>;
// { apiUrl: string; timeout: number; retries: number; debug: boolean; }

const config: RequiredConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  debug: false
  // All fields are required
};

// Validation before processing
interface FormData {
  name?: string;
  email?: string;
  phone?: string;
}

function isComplete(data: FormData): data is Required<FormData> {
  return !!(data.name && data.email && data.phone);
}

function submitForm(data: FormData): void {
  if (isComplete(data)) {
    // data is now Required<FormData>
    console.log(data.name.toUpperCase());  // No optional chaining needed
    processData(data);
  } else {
    throw new Error("Form incomplete");
  }
}

function processData(data: Required<FormData>): void {
  // All fields guaranteed to exist
  const fullName = data.name;
  const email = data.email;
  const phone = data.phone;
}

// API request vs response
interface UserInput {
  name: string;
  email: string;
  age?: number;
  bio?: string;
}

interface UserResponse extends Required<UserInput> {
  id: number;
  createdAt: Date;
}
// Server always returns all fields

const response: UserResponse = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 30,        // Required in response
  bio: "...",     // Required in response
  createdAt: new Date()
};

// Draft vs published content
interface Article {
  title?: string;
  content?: string;
  author?: string;
  publishedAt?: Date;
}

type PublishedArticle = Required<Article>;

function publishArticle(draft: Article): PublishedArticle {
  if (!draft.title || !draft.content || !draft.author) {
    throw new Error("Cannot publish incomplete article");
  }
  
  return {
    ...draft as Required<Article>,
    publishedAt: new Date()
  };
}

// Required with Pick
interface User {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
}

type RequiredContactInfo = Required<Pick<User, "email" | "phone">>;
// { email: string; phone: string; }

// Partial to Required transformation
function fillDefaults<T>(partial: Partial<T>, defaults: Required<T>): Required<T> {
  return { ...defaults, ...partial } as Required<T>;
}

const partialConfig: Partial<Config> = { timeout: 10000 };
const fullConfig = fillDefaults(partialConfig, {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  debug: false
});

// Required with nested objects
interface Settings {
  theme?: {
    primary?: string;
    secondary?: string;
  };
  language?: string;
}

type RequiredSettings = Required<Settings>;
// { theme: { primary?: string; secondary?: string }; language: string; }
// Note: nested properties NOT required

// Deep Required
type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};

type DeepRequiredSettings = DeepRequired<Settings>;
// { theme: { primary: string; secondary: string }; language: string; }

// Builder pattern completion
interface BuilderState {
  name?: string;
  age?: number;
  email?: string;
}

class PersonBuilder {
  private state: BuilderState = {};

  setName(name: string): this {
    this.state.name = name;
    return this;
  }

  setAge(age: number): this {
    this.state.age = age;
    return this;
  }

  setEmail(email: string): this {
    this.state.email = email;
    return this;
  }

  build(): Required<BuilderState> {
    if (!this.state.name || !this.state.age || !this.state.email) {
      throw new Error("Missing required fields");
    }
    return this.state as Required<BuilderState>;
  }
}

// Required fields check
function assertRequired<T>(
  value: Partial<T>,
  requiredKeys: (keyof T)[]
): asserts value is Required<T> {
  for (const key of requiredKeys) {
    if (value[key] === undefined) {
      throw new Error(\`Missing required field: \${String(key)}\`);
    }
  }
}

const partialUser: Partial<User> = { name: "John", email: "john@example.com" };
assertRequired(partialUser, ["name", "email", "id"]);
// Now partialUser is typed as Required<User>

// Configuration stages
interface AppConfig {
  apiUrl?: string;
  apiKey?: string;
  timeout?: number;
}

function validateConfig(config: AppConfig): Required<AppConfig> {
  if (!config.apiUrl || !config.apiKey) {
    throw new Error("Missing required configuration");
  }
  
  return {
    apiUrl: config.apiUrl,
    apiKey: config.apiKey,
    timeout: config.timeout ?? 5000
  };
}

// Required with unions
interface OptionalFields {
  a?: string;
  b?: number;
}

type AllRequired = Required<OptionalFields>;
// { a: string; b: number; }

// Database model vs DTO
interface UserDTO {
  name?: string;
  email?: string;
  password?: string;
}

interface UserModel extends Required<UserDTO> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Required props for components
interface ComponentProps {
  title?: string;
  onClick?: () => void;
  className?: string;
}

type RequiredComponentProps = Required<ComponentProps>;
// All props become required`}
        </CodeBlock>

        <InfoBox type="tip">
          Required&lt;T&gt; removes optional modifiers from all properties. Use
          it for validation, ensuring complete data, transforming drafts to
          final versions, and enforcing all fields are present.
        </InfoBox>
      </Section>

      <Section title="3. Readonly<T>">
        <p className="text-gray-700 dark:text-gray-300">
          Readonly&lt;T&gt; makes all properties readonly, preventing
          modifications after creation. Essential for immutability and
          preventing accidental mutations.
        </p>

        <CodeBlock title="Readonly<T> examples">
          {`// Basic Readonly usage
interface User {
  id: number;
  name: string;
  email: string;
}

type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; readonly email: string; }

const user: ReadonlyUser = {
  id: 1,
  name: "John",
  email: "john@example.com"
};

// user.name = "Jane";  // ✗ Error: Cannot assign to 'name' because it is a read-only property
// user.id = 2;         // ✗ Error: Cannot assign to 'id' because it is a read-only property

// Immutable configuration
interface Config {
  apiUrl: string;
  apiKey: string;
  timeout: number;
}

const config: Readonly<Config> = {
  apiUrl: "https://api.example.com",
  apiKey: "secret",
  timeout: 5000
};

// config.timeout = 10000;  // ✗ Error: Cannot modify

// Function parameters as readonly
function processUser(user: Readonly<User>): void {
  console.log(user.name);
  // user.name = "Modified";  // ✗ Error: Cannot modify parameter
}

// Readonly arrays
const numbers: readonly number[] = [1, 2, 3, 4, 5];
// numbers.push(6);     // ✗ Error: Property 'push' does not exist
// numbers[0] = 10;     // ✗ Error: Index signature is readonly

const readonlyArray: ReadonlyArray<string> = ["a", "b", "c"];
// readonlyArray.sort();  // ✗ Error: Property 'sort' does not exist

// Readonly with nested objects
interface Profile {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

type ReadonlyProfile = Readonly<Profile>;
// { readonly name: string; readonly address: { street: string; city: string } }
// Note: nested properties are NOT readonly

const profile: ReadonlyProfile = {
  name: "John",
  address: { street: "123 Main St", city: "NYC" }
};

// profile.name = "Jane";           // ✗ Error
profile.address.street = "456 Oak";  // ✓ Allowed (nested not readonly)

// Deep Readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type DeepReadonlyProfile = DeepReadonly<Profile>;
// { readonly name: string; readonly address: { readonly street: string; readonly city: string } }

const deepReadonly: DeepReadonlyProfile = {
  name: "John",
  address: { street: "123 Main St", city: "NYC" }
};

// deepReadonly.address.street = "456";  // ✗ Error: Cannot modify

// Constants object
const HTTP_STATUS: Readonly<{
  OK: number;
  NOT_FOUND: number;
  SERVER_ERROR: number;
}> = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

// HTTP_STATUS.OK = 201;  // ✗ Error

// Readonly with as const
const routes = {
  home: "/",
  about: "/about",
  contact: "/contact"
} as const;
// All properties are readonly

// Readonly return types
function getConfig(): Readonly<Config> {
  return {
    apiUrl: "https://api.example.com",
    apiKey: "secret",
    timeout: 5000
  };
}

const appConfig = getConfig();
// appConfig.timeout = 10000;  // ✗ Error

// Readonly state in Redux/Zustand
interface AppState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

function reducer(state: Readonly<AppState>, action: Action): AppState {
  // state is readonly, must return new state
  // state.isLoading = true;  // ✗ Error
  
  return { ...state, isLoading: true };  // ✓ Create new state
}

// Readonly props in React
interface ComponentProps {
  title: string;
  items: string[];
  onSelect: (item: string) => void;
}

function Component(props: Readonly<ComponentProps>) {
  // props.title = "New Title";  // ✗ Error: Cannot modify props
  return <div>{props.title}</div>;
}

// Readonly with generics
function freeze<T>(obj: T): Readonly<T> {
  return Object.freeze(obj);
}

const frozen = freeze({ name: "John", age: 30 });
// frozen.name = "Jane";  // ✗ Error

// Readonly tuples
type Point = readonly [number, number];

const point: Point = [10, 20];
// point[0] = 15;  // ✗ Error: Cannot assign to '0' because it is a read-only property

// Readonly Record
type ReadonlyRecord<K extends string | number | symbol, T> = Readonly<Record<K, T>>;

const scores: ReadonlyRecord<string, number> = {
  alice: 100,
  bob: 95,
  charlie: 85
};

// scores.alice = 105;  // ✗ Error

// Readonly Map and Set
const readonlyMap: ReadonlyMap<string, number> = new Map([
  ["a", 1],
  ["b", 2]
]);

const readonlySet: ReadonlySet<number> = new Set([1, 2, 3]);

// readonlyMap.set("c", 3);  // ✗ Error
// readonlySet.add(4);       // ✗ Error

// Readonly class properties
class ImmutablePoint {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}
}

const immutablePoint = new ImmutablePoint(10, 20);
// immutablePoint.x = 15;  // ✗ Error

// Readonly with Pick/Omit
type ReadonlyName = Readonly<Pick<User, "name">>;
// { readonly name: string }

// Mutable version of readonly type
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type MutableUser = Mutable<ReadonlyUser>;
// { id: number; name: string; email: string; }

// Readonly API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

function fetchData<T>(): Promise<Readonly<ApiResponse<T>>> {
  // Return readonly response to prevent modifications
  return Promise.resolve({} as Readonly<ApiResponse<T>>);
}

// Readonly event objects
interface CustomEvent {
  type: string;
  timestamp: Date;
  data: unknown;
}

function dispatchEvent(event: Readonly<CustomEvent>): void {
  // event.type = "modified";  // ✗ Error: Cannot modify event
  console.log(event.type);
}`}
        </CodeBlock>

        <InfoBox type="important">
          Readonly&lt;T&gt; makes all properties readonly at the top level. For
          deep immutability, use a custom DeepReadonly utility. Combine with
          Object.freeze() for runtime immutability and readonly arrays for
          immutable collections.
        </InfoBox>
      </Section>

      <Section title="4. Combining Modifier Utilities">
        <p className="text-gray-700 dark:text-gray-300">
          Modifier utilities can be combined to create complex transformations,
          mixing partial, required, and readonly modifiers as needed.
        </p>

        <CodeBlock title="Combining modifier utilities">
          {`// Partial + Readonly
type PartialReadonly<T> = Partial<Readonly<T>>;

interface User {
  id: number;
  name: string;
  email: string;
}

const partialReadonlyUser: PartialReadonly<User> = {
  name: "John"  // Optional and readonly
};
// partialReadonlyUser.name = "Jane";  // ✗ Error: readonly

// Required + Readonly
type RequiredReadonly<T> = Readonly<Required<T>>;

interface Config {
  apiUrl?: string;
  timeout?: number;
}

const requiredReadonlyConfig: RequiredReadonly<Config> = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};
// All fields required and readonly

// Partial some fields, required others
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

interface Article {
  id: number;
  title?: string;
  content?: string;
  author: string;
}

type ArticleWithRequiredContent = RequiredBy<Article, "title" | "content">;
// { id: number; author: string; title: string; content: string }

// Readonly specific fields
type ReadonlyBy<T, K extends keyof T> = Omit<T, K> & Readonly<Pick<T, K>>;

type UserWithReadonlyId = ReadonlyBy<User, "id">;
// { id: readonly number; name: string; email: string }

const userWithReadonlyId: UserWithReadonlyId = {
  id: 1,
  name: "John",
  email: "john@example.com"
};
// userWithReadonlyId.id = 2;     // ✗ Error
userWithReadonlyId.name = "Jane";  // ✓ Allowed

// Deep combinations
type DeepPartialReadonly<T> = {
  readonly [K in keyof T]?: T[K] extends object ? DeepPartialReadonly<T[K]> : T[K];
};

type DeepRequiredReadonly<T> = {
  readonly [K in keyof T]-?: T[K] extends object ? DeepRequiredReadonly<T[K]> : T[K];
};

// Update with partial, return readonly
function updateUser(id: number, updates: Partial<User>): Readonly<User> {
  const user = getUser(id);
  const updated = { ...user, ...updates };
  return Object.freeze(updated);
}

// Builder with modifiers
interface BuildConfig {
  apiUrl?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
}

class ConfigBuilder {
  private config: BuildConfig = {};

  setApiUrl(url: string): this {
    this.config.apiUrl = url;
    return this;
  }

  setApiKey(key: string): this {
    this.config.apiKey = key;
    return this;
  }

  setTimeout(ms: number): this {
    this.config.timeout = ms;
    return this;
  }

  setRetries(count: number): this {
    this.config.retries = count;
    return this;
  }

  build(): Readonly<Required<BuildConfig>> {
    if (!this.config.apiUrl || !this.config.apiKey) {
      throw new Error("Missing required config");
    }
    
    return Object.freeze({
      apiUrl: this.config.apiUrl,
      apiKey: this.config.apiKey,
      timeout: this.config.timeout ?? 5000,
      retries: this.config.retries ?? 3
    });
  }
}

// State transitions
type DraftState<T> = Partial<T>;
type FinalState<T> = Readonly<Required<T>>;

function finalize<T>(draft: DraftState<T>, defaults: T): FinalState<T> {
  return Object.freeze({ ...defaults, ...draft } as Required<T>);
}

// Form states
interface FormValues {
  name?: string;
  email?: string;
}

interface FormState {
  values: Partial<FormValues>;           // Can be incomplete
  submittedValues?: Readonly<Required<FormValues>>;  // Complete and immutable
  errors: Partial<FormValues>;           // Not all fields may have errors
}

// API patterns
interface CreateRequest {
  name: string;
  email: string;
  age?: number;
}

interface UpdateRequest extends Partial<CreateRequest> {
  id: number;
}

interface Entity extends Required<CreateRequest> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

type ImmutableEntity = Readonly<Entity>;

// Conditional modifiers
type ConditionalReadonly<T, Condition extends boolean> = 
  Condition extends true ? Readonly<T> : T;

type ReadonlyIfProduction<T> = ConditionalReadonly<T, typeof process.env.NODE_ENV extends "production" ? true : false>;

// Mutable during development, readonly in production
const settings: ReadonlyIfProduction<Config> = {
  apiUrl: "https://api.example.com",
  apiKey: "secret",
  timeout: 5000
};`}
        </CodeBlock>

        <InfoBox type="tip">
          Combine modifier utilities to create sophisticated type
          transformations. Use Partial for updates, Required for validation,
          Readonly for immutability, and combine them for complex scenarios like
          builder patterns and state management.
        </InfoBox>
      </Section>

      <Section title="5. Practical Use Cases">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world applications of property modifier utilities in React, state
          management, APIs, and type-safe patterns.
        </p>

        <CodeBlock title="Practical use cases">
          {`// React component props with modifiers
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

// All props optional for HOC
function withDefaults(WrappedComponent: React.ComponentType<ButtonProps>) {
  return function WithDefaultsComponent(props: Partial<ButtonProps>) {
    const defaultProps: Required<ButtonProps> = {
      label: "Click me",
      onClick: () => {},
      variant: "primary",
      disabled: false
    };
    
    return <WrappedComponent {...defaultProps} {...props} />;
  };
}

// Redux/Zustand state management
interface AppState {
  user: User | null;
  settings: Settings;
  cache: Record<string, any>;
}

// State is readonly to prevent direct mutations
type ReadonlyState = Readonly<AppState>;

// Actions work with partial updates
type StateUpdate = Partial<AppState>;

function updateState(
  state: ReadonlyState,
  update: StateUpdate
): ReadonlyState {
  return { ...state, ...update };
}

// API client patterns
interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
  retries: number;
}

class ApiClient {
  private config: Readonly<Required<ApiConfig>>;

  constructor(config: Partial<ApiConfig>) {
    const defaults: ApiConfig = {
      baseUrl: "https://api.example.com",
      timeout: 5000,
      headers: {},
      retries: 3
    };
    
    this.config = Object.freeze({ ...defaults, ...config });
  }

  async fetch<T>(endpoint: string, options?: Partial<RequestInit>): Promise<T> {
    // Use readonly config
    const url = \`\${this.config.baseUrl}\${endpoint}\`;
    const response = await fetch(url, {
      ...options,
      headers: { ...this.config.headers, ...options?.headers }
    });
    return response.json();
  }
}

// Form handling with TypeScript
interface SignupForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormState<T> {
  values: Partial<T>;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  submittedValues?: Readonly<Required<T>>;
}

function useForm<T>() {
  const [state, setState] = useState<FormState<T>>({
    values: {},
    errors: {},
    touched: {}
  });

  const updateField = <K extends keyof T>(field: K, value: T[K]) => {
    setState(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value },
      touched: { ...prev.touched, [field]: true }
    }));
  };

  const submit = (values: Required<T>) => {
    setState(prev => ({
      ...prev,
      submittedValues: Object.freeze(values)
    }));
  };

  return { state, updateField, submit };
}

// Database models with modifiers
interface UserModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  age: number;
}

// Create: omit generated fields
type CreateUserDto = Omit<UserModel, "id" | "createdAt" | "updatedAt">;

// Update: all fields optional except id
type UpdateUserDto = Partial<Omit<UserModel, "id">> & { id: number };

// Response: all fields readonly
type UserResponse = Readonly<UserModel>;

class UserRepository {
  async create(data: CreateUserDto): Promise<UserResponse> {
    const now = new Date();
    const user: UserModel = {
      ...data,
      id: Math.random(),
      createdAt: now,
      updatedAt: now
    };
    return Object.freeze(user);
  }

  async update(data: UpdateUserDto): Promise<UserResponse> {
    const existing = await this.findById(data.id);
    const updated: UserModel = {
      ...existing,
      ...data,
      updatedAt: new Date()
    };
    return Object.freeze(updated);
  }

  async findById(id: number): Promise<UserResponse> {
    // Return readonly to prevent modifications
    return Object.freeze({} as UserModel);
  }
}

// Configuration management
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
  poolSize?: number;
}

class ConfigManager {
  private config: Readonly<Required<DatabaseConfig>>;

  constructor(config: Partial<DatabaseConfig>) {
    this.config = this.validateAndFreeze(config);
  }

  private validateAndFreeze(
    config: Partial<DatabaseConfig>
  ): Readonly<Required<DatabaseConfig>> {
    const required: (keyof DatabaseConfig)[] = [
      "host",
      "port",
      "username",
      "password",
      "database"
    ];

    for (const key of required) {
      if (config[key] === undefined) {
        throw new Error(\`Missing required config: \${key}\`);
      }
    }

    const defaults: DatabaseConfig = {
      host: "localhost",
      port: 5432,
      username: "",
      password: "",
      database: "",
      ssl: false,
      poolSize: 10
    };

    return Object.freeze({ ...defaults, ...config } as Required<DatabaseConfig>);
  }

  getConfig(): Readonly<Required<DatabaseConfig>> {
    return this.config;
  }
}

// Event system with modifiers
interface BaseEvent {
  type: string;
  timestamp: Date;
}

interface UserEvent extends BaseEvent {
  userId: number;
  action: string;
}

// Events are immutable once created
type ImmutableEvent = Readonly<UserEvent>;

class EventBus {
  private handlers = new Map<string, ((event: ImmutableEvent) => void)[]>();

  emit(event: Readonly<UserEvent>): void {
    const handlers = this.handlers.get(event.type) ?? [];
    handlers.forEach(handler => handler(event));
  }

  on(type: string, handler: (event: ImmutableEvent) => void): void {
    const handlers = this.handlers.get(type) ?? [];
    this.handlers.set(type, [...handlers, handler]);
  }
}

// Cache with readonly values
class Cache<K, V> {
  private data = new Map<K, Readonly<V>>();

  set(key: K, value: V): void {
    this.data.set(key, Object.freeze(value));
  }

  get(key: K): Readonly<V> | undefined {
    return this.data.get(key);
  }
}

const userCache = new Cache<number, User>();
userCache.set(1, { id: 1, name: "John", email: "john@example.com" });
const cached = userCache.get(1);
// cached is readonly, cannot be modified`}
        </CodeBlock>

        <InfoBox type="important">
          Use Partial for updates and optional configurations, Required for
          validation and ensuring completeness, and Readonly for immutability in
          state management, caching, and API responses. Combine them for robust
          type-safe patterns.
        </InfoBox>
      </Section>
    </div>
  );
}
