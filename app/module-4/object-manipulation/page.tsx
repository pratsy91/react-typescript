import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ObjectManipulationPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Object Manipulation Utilities
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript provides utilities for creating and transforming object
        types: Record&lt;K, T&gt; creates objects with specific keys, Pick&lt;T,
        K&gt; selects properties, and Omit&lt;T, K&gt; excludes properties.
      </p>

      <Section title="1. Record<K, T>">
        <p className="text-gray-700 dark:text-gray-300">
          Record&lt;K, T&gt; constructs an object type with keys of type K and
          values of type T. It's perfect for dictionaries, maps, and indexed
          collections.
        </p>

        <CodeBlock title="Record<K, T> examples">
          {`// Basic Record usage
type UserRoles = Record<string, boolean>;

const roles: UserRoles = {
  admin: true,
  editor: true,
  viewer: false
};

// Record with specific keys
type Permission = "read" | "write" | "delete";
type PermissionSet = Record<Permission, boolean>;

const permissions: PermissionSet = {
  read: true,
  write: true,
  delete: false
};

// Record with number keys
type ScoreMap = Record<number, string>;

const scores: ScoreMap = {
  100: "Perfect",
  90: "Excellent",
  80: "Good",
  70: "Pass"
};

// Record with complex values
interface User {
  name: string;
  email: string;
}

type UserById = Record<number, User>;

const users: UserById = {
  1: { name: "Alice", email: "alice@example.com" },
  2: { name: "Bob", email: "bob@example.com" }
};

// Record for enums
enum Status {
  Pending = "PENDING",
  Active = "ACTIVE",
  Complete = "COMPLETE"
}

type StatusMessages = Record<Status, string>;

const messages: StatusMessages = {
  [Status.Pending]: "Waiting to start",
  [Status.Active]: "In progress",
  [Status.Complete]: "Finished"
};

// Record with union type keys
type Color = "red" | "green" | "blue";
type ColorHex = Record<Color, string>;

const colorCodes: ColorHex = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF"
};

// Record for translation keys
type LocaleKey = "en" | "es" | "fr";
type Translations = Record<LocaleKey, string>;

const greetings: Translations = {
  en: "Hello",
  es: "Hola",
  fr: "Bonjour"
};

// Nested Record
type LanguageTranslations = Record<string, Record<LocaleKey, string>>;

const translations: LanguageTranslations = {
  greeting: {
    en: "Hello",
    es: "Hola",
    fr: "Bonjour"
  },
  farewell: {
    en: "Goodbye",
    es: "Adiós",
    fr: "Au revoir"
  }
};

// Record with optional values
type OptionalRecord<K extends string | number | symbol, T> = Record<K, T | undefined>;

const config: OptionalRecord<string, string> = {
  apiUrl: "https://api.example.com",
  apiKey: undefined  // Can be undefined
};

// Record for form errors
type FormFields = "name" | "email" | "password";
type FormErrors = Record<FormFields, string | undefined>;

const errors: FormErrors = {
  name: undefined,
  email: "Invalid email",
  password: "Too short"
};

// Record for API endpoints
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoints = Record<HttpMethod, string[]>;

const apiEndpoints: Endpoints = {
  GET: ["/users", "/posts"],
  POST: ["/users", "/posts"],
  PUT: ["/users/:id", "/posts/:id"],
  DELETE: ["/users/:id", "/posts/:id"]
};

// Record with functions
type EventHandlers = Record<string, (...args: any[]) => void>;

const handlers: EventHandlers = {
  click: (e: MouseEvent) => console.log("Clicked"),
  submit: (e: SubmitEvent) => console.log("Submitted")
};

// Type-safe Record with template literals
type Route = \`/\${"users" | "posts"}\`;
type RouteHandlers = Record<Route, () => void>;

const routes: RouteHandlers = {
  "/users": () => console.log("Users route"),
  "/posts": () => console.log("Posts route")
};

// Record for state machine
type State = "idle" | "loading" | "success" | "error";
type StateConfig = Record<State, { color: string; message: string }>;

const stateConfig: StateConfig = {
  idle: { color: "gray", message: "Ready" },
  loading: { color: "blue", message: "Loading..." },
  success: { color: "green", message: "Success!" },
  error: { color: "red", message: "Error occurred" }
};

// Record with generics
function createMap<K extends string, V>(
  keys: K[],
  getValue: (key: K) => V
): Record<K, V> {
  const result = {} as Record<K, V>;
  for (const key of keys) {
    result[key] = getValue(key);
  }
  return result;
}

const lengthMap = createMap(["a", "ab", "abc"], (key) => key.length);
// { a: 1, ab: 2, abc: 3 }

// Partial Record (not all keys required)
type PartialRecord<K extends string | number | symbol, T> = Partial<Record<K, T>>;

const partialConfig: PartialRecord<"debug" | "verbose", boolean> = {
  debug: true
  // verbose is optional
};

// Record for cache
class Cache<T> {
  private data: Record<string, T> = {};

  set(key: string, value: T): void {
    this.data[key] = value;
  }

  get(key: string): T | undefined {
    return this.data[key];
  }

  has(key: string): boolean {
    return key in this.data;
  }
}

// Record for configuration
type Environment = "development" | "staging" | "production";
type EnvConfig = Record<Environment, { apiUrl: string; debug: boolean }>;

const envConfig: EnvConfig = {
  development: { apiUrl: "http://localhost:3000", debug: true },
  staging: { apiUrl: "https://staging.example.com", debug: true },
  production: { apiUrl: "https://api.example.com", debug: false }
};

// Record with readonly values
type ReadonlyRecord<K extends string | number | symbol, T> = Readonly<Record<K, T>>;

const constants: ReadonlyRecord<"PI" | "E", number> = {
  PI: 3.14159,
  E: 2.71828
};`}
        </CodeBlock>

        <InfoBox type="info">
          Record&lt;K, T&gt; creates object types with specific keys and value
          types. Use it for dictionaries, lookup tables, configuration objects,
          and any mapping from keys to values.
        </InfoBox>
      </Section>

      <Section title="2. Pick<T, K>">
        <p className="text-gray-700 dark:text-gray-300">
          Pick&lt;T, K&gt; creates a type by selecting specific properties from
          an existing type. Essential for creating smaller types from larger
          interfaces.
        </p>

        <CodeBlock title="Pick<T, K> examples">
          {`// Basic Pick usage
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
  createdAt: Date;
}

type UserPreview = Pick<User, "id" | "name" | "email">;
// { id: number; name: string; email: string }

const preview: UserPreview = {
  id: 1,
  name: "John",
  email: "john@example.com"
  // password, age, createdAt not included
};

// Pick for public API responses
type PublicUser = Pick<User, "id" | "name">;
// Hide sensitive fields like email, password

function getUserPublic(id: number): PublicUser {
  const user = getUser(id);
  return {
    id: user.id,
    name: user.name
  };
}

// Pick for form fields
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

type ProductFormFields = Pick<Product, "name" | "description" | "price" | "stock" | "categoryId">;
// Exclude id and timestamps

const formData: ProductFormFields = {
  name: "Widget",
  description: "A useful widget",
  price: 19.99,
  stock: 100,
  categoryId: 5
};

// Pick with nested objects
interface Article {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    email: string;
  };
  tags: string[];
  publishedAt: Date;
}

type ArticlePreview = Pick<Article, "id" | "title" | "author">;

// Pick for DTOs (Data Transfer Objects)
interface Database User {
  id: number;
  username: string;
  passwordHash: string;
  salt: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

type UserDto = Pick<DatabaseUser, "id" | "username" | "email" | "emailVerified">;
// Send to client without sensitive data

// Pick single property
type UserId = Pick<User, "id">;
// { id: number }

type UserName = Pick<User, "name">;
// { name: string }

// Pick for component props
interface ComponentProps {
  title: string;
  subtitle?: string;
  onClick: () => void;
  onHover?: () => void;
  className?: string;
  disabled?: boolean;
}

type RequiredProps = Pick<ComponentProps, "title" | "onClick">;
// { title: string; onClick: () => void }

// Pick with generics
function selectFields<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  password: "secret",
  age: 30,
  createdAt: new Date()
};

const selected = selectFields(user, ["id", "name"]);
// { id: 1, name: "John" }

// Pick for API request bodies
interface UpdateUserRequest extends Pick<User, "name" | "email" | "age"> {
  // Only allow updating specific fields
}

function updateUser(id: number, data: UpdateUserRequest): void {
  // data can only contain name, email, age
}

// Pick with conditional types
type PickByType<T, V> = Pick<T, {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T]>;

type StringProps = PickByType<User, string>;
// { name: string; email: string; password: string }

type NumberProps = PickByType<User, number>;
// { id: number; age: number }

// Pick for partial updates
type UserUpdate = Partial<Pick<User, "name" | "email" | "age">>;
// { name?: string; email?: string; age?: number }

function patchUser(id: number, updates: UserUpdate): void {
  // Apply partial updates to specific fields
}

patchUser(1, { name: "Jane" });
patchUser(1, { email: "jane@example.com", age: 31 });

// Pick for search filters
type UserFilters = Partial<Pick<User, "name" | "email" | "age">>;

function searchUsers(filters: UserFilters): User[] {
  // Search by specific fields
  return [];
}

searchUsers({ name: "John" });
searchUsers({ age: 30, email: "john@example.com" });

// Pick for readonly fields
type ReadonlyUser = Readonly<Pick<User, "id" | "createdAt">>;
// { readonly id: number; readonly createdAt: Date }

// Pick multiple times
type BasicInfo = Pick<User, "name" | "email">;
type ContactInfo = Pick<User, "email">;
type Identity = Pick<User, "id" | "name">;

// Pick for database queries
interface QueryOptions<T> {
  select?: (keyof T)[];
  where?: Partial<T>;
  orderBy?: keyof T;
}

function query<T, K extends keyof T>(
  options: QueryOptions<T> & { select: K[] }
): Pick<T, K>[] {
  // Return only selected fields
  return [];
}

const results = query<User, "id" | "name">({
  select: ["id", "name"],
  where: { age: 30 }
});
// Result type: { id: number; name: string }[]

// Pick for audit logs
type AuditLog = Pick<User, "id" | "name"> & {
  action: string;
  timestamp: Date;
};

// Pick for caching
class UserCache {
  private cache: Map<number, Pick<User, "id" | "name" | "email">> = new Map();

  set(user: User): void {
    this.cache.set(user.id, {
      id: user.id,
      name: user.name,
      email: user.email
    });
  }

  get(id: number): Pick<User, "id" | "name" | "email"> | undefined {
    return this.cache.get(id);
  }
}

// Pick with intersection
type UserWithRole = User & { role: string };
type PublicUserWithRole = Pick<UserWithRole, "id" | "name" | "role">;

// Pick for events
interface Event {
  id: string;
  type: string;
  timestamp: Date;
  userId: number;
  data: unknown;
}

type EventMetadata = Pick<Event, "id" | "type" | "timestamp">;

function logEvent(metadata: EventMetadata): void {
  console.log(\`Event \${metadata.type} at \${metadata.timestamp}\`);
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Pick&lt;T, K&gt; selects specific properties from a type. Use it for
          DTOs, API responses, form fields, partial updates, and creating
          focused types from larger interfaces.
        </InfoBox>
      </Section>

      <Section title="3. Omit<T, K>">
        <p className="text-gray-700 dark:text-gray-300">
          Omit&lt;T, K&gt; creates a type by excluding specific properties from
          an existing type. The opposite of Pick, useful for hiding sensitive
          fields.
        </p>

        <CodeBlock title="Omit<T, K> examples">
          {`// Basic Omit usage
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
}

type UserWithoutPassword = Omit<User, "password">;
// { id: number; name: string; email: string; age: number }

const safeUser: UserWithoutPassword = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 30
  // password excluded
};

// Omit multiple properties
type PublicUser = Omit<User, "password" | "id">;
// { name: string; email: string; age: number }

// Omit for creating DTOs
interface DatabaseUser {
  id: number;
  username: string;
  passwordHash: string;
  salt: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

type CreateUserDto = Omit<DatabaseUser, "id" | "createdAt" | "updatedAt">;
// Fields that user provides (excluding generated fields)

const newUser: CreateUserDto = {
  username: "john",
  passwordHash: "hashed",
  salt: "salt",
  email: "john@example.com"
};

// Omit for API responses
type UserResponse = Omit<DatabaseUser, "passwordHash" | "salt">;
// Safe to send to client

// Omit for updates
type UpdateUser = Omit<User, "id"> & { id: number };
// Can't change id, but must provide it

function updateUser(data: UpdateUser): void {
  // data.id is readonly context
}

// Omit for form inputs
interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  authorId: number;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

type ArticleFormInput = Omit<Article, "id" | "slug" | "createdAt" | "updatedAt">;
// User provides title, content, authorId, publishedAt

const articleForm: ArticleFormInput = {
  title: "My Article",
  content: "Article content",
  authorId: 1,
  publishedAt: null
};

// Omit with Partial
type PartialUserUpdate = Partial<Omit<User, "id">>;
// { name?: string; email?: string; password?: string; age?: number }
// Can update any field except id

function patchUser(id: number, updates: PartialUserUpdate): void {
  // updates cannot contain id
}

// Omit readonly fields
interface Product {
  readonly id: number;
  name: string;
  price: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

type MutableProduct = Omit<Product, "id" | "createdAt" | "updatedAt">;
// { name: string; price: number }

// Omit for extending interfaces
interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Post extends Omit<BaseEntity, "id"> {
  id: string;  // Override id type
  title: string;
  content: string;
}

// Omit methods from class
class UserService {
  private token: string = "";

  async login(email: string, password: string): Promise<User> {
    return {} as User;
  }

  async logout(): Promise<void> {}

  private validateToken(): boolean {
    return true;
  }
}

type UserServiceData = Omit<UserService, "login" | "logout" | "validateToken">;
// { token: string }

// Omit for event payloads
interface Event {
  type: string;
  timestamp: Date;
  id: string;
}

interface UserEvent extends Omit<Event, "type"> {
  type: "user.login" | "user.logout";
  userId: number;
}

const userEvent: UserEvent = {
  type: "user.login",
  timestamp: new Date(),
  id: "event-123",
  userId: 1
};

// Omit with generic constraints
function sanitize<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  password: "secret",
  age: 30
};

const sanitized = sanitize(user, ["password"]);
// Type: Omit<User, "password">

// Omit for builder pattern
interface BuilderConfig {
  value: number;
  doubled: number;
  tripled: number;
}

class ValueBuilder {
  private value: number = 0;

  setValue(v: number): this {
    this.value = v;
    return this;
  }

  build(): BuilderConfig {
    return {
      value: this.value,
      doubled: this.value * 2,
      tripled: this.value * 3
    };
  }
}

type BuilderInput = Omit<BuilderConfig, "doubled" | "tripled">;
// { value: number } - only what user provides

// Omit discriminated union tag
type Action =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "reset" };

type ActionPayload = Omit<Action, "type">;
// { payload: number } | { payload: number } | {}

// Omit for component props
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
}

interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: React.ReactNode;
}

const iconButton: IconButtonProps = {
  icon: <Icon />,
  onClick: () => {},
  type: "button"
};

// Omit nested properties (custom utility)
type OmitNested<T, K extends string> = K extends \`\${infer P}.\${infer R}\`
  ? P extends keyof T
    ? { [Key in keyof T]: Key extends P ? OmitNested<T[P], R> : T[Key] }
    : T
  : Omit<T, K extends keyof T ? K : never>;

// Omit for state management
interface AppState {
  user: User;
  auth: {
    token: string;
    refreshToken: string;
  };
  ui: {
    theme: string;
  };
}

type PublicState = Omit<AppState, "auth">;
// { user: User; ui: { theme: string } }

// Omit with Record
type UserRecord = Record<string, User>;
type PublicUserRecord = Record<string, Omit<User, "password">>;

// Omit for testing
interface TestUser extends Omit<User, "id"> {
  id?: number;  // Optional for tests
}

function createTestUser(overrides?: Partial<TestUser>): TestUser {
  return {
    name: "Test User",
    email: "test@example.com",
    password: "test",
    age: 25,
    ...overrides
  };
}

// Omit with Required
type RequiredFields = Required<Omit<User, "password">>;
// All fields required except password is removed

// Omit for permissions
interface AdminUser extends Omit<User, "age"> {
  role: "admin";
  permissions: string[];
}

// Omit callback properties
interface ComponentWithCallbacks {
  title: string;
  onLoad: () => void;
  onError: (error: Error) => void;
  onComplete: () => void;
}

type ComponentData = Omit<ComponentWithCallbacks, "onLoad" | "onError" | "onComplete">;
// { title: string }`}
        </CodeBlock>

        <InfoBox type="important">
          Omit&lt;T, K&gt; excludes specific properties from a type. Use it for
          hiding sensitive fields, removing generated fields for DTOs, creating
          safe API responses, and composing types by exclusion.
        </InfoBox>
      </Section>

      <Section title="4. Combining Record, Pick, and Omit">
        <p className="text-gray-700 dark:text-gray-300">
          These utilities can be combined to create sophisticated type
          transformations for complex data modeling scenarios.
        </p>

        <CodeBlock title="Combining object manipulation utilities">
          {`// Create Record from picked properties
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserLookup = Record<number, Pick<User, "name" | "email">>;

const lookup: UserLookup = {
  1: { name: "Alice", email: "alice@example.com" },
  2: { name: "Bob", email: "bob@example.com" }
};

// Record with omitted sensitive fields
type SafeUserLookup = Record<number, Omit<User, "password">>;

// Pick from Record type
type Config = Record<string, string | number | boolean>;
type StringConfig = Record<string, Extract<Config[string], string>>;

// Omit and Pick together
type UserFormData = Omit<Pick<User, "name" | "email" | "password">, never>;
// Same as Pick<User, "name" | "email" | "password">

// More practical: Omit some, Pick others
type EditableUserFields = Omit<User, "id"> & Pick<Required<User>, "name">;
// Can edit all fields except id, and name is required

// Record of Partial
type PartialUserCache = Record<number, Partial<Omit<User, "id">>>;

const cache: PartialUserCache = {
  1: { name: "Alice" },  // Partial updates
  2: { email: "bob@example.com" }
};

// Complex DTO pattern
interface DatabaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface Product extends DatabaseEntity {
  name: string;
  price: number;
  categoryId: number;
}

// Create DTO: omit generated fields
type CreateProductDto = Omit<Product, keyof DatabaseEntity>;

// Update DTO: omit id and timestamps, make fields optional
type UpdateProductDto = Partial<Omit<Product, keyof DatabaseEntity>> & Pick<Product, "id">;

// Response DTO: omit soft delete field
type ProductResponse = Omit<Product, "deletedAt">;

const createDto: CreateProductDto = {
  name: "Widget",
  price: 19.99,
  categoryId: 1
};

const updateDto: UpdateProductDto = {
  id: 1,
  price: 24.99  // Only update price
};

// API endpoint patterns
type Endpoint = "/users" | "/posts" | "/comments";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiRoutes = Record<Endpoint, Record<HttpMethod, (data?: any) => Promise<any>>>;

const api: ApiRoutes = {
  "/users": {
    GET: async () => [],
    POST: async (data) => data,
    PUT: async (data) => data,
    DELETE: async () => {}
  },
  "/posts": {
    GET: async () => [],
    POST: async (data) => data,
    PUT: async (data) => data,
    DELETE: async () => {}
  },
  "/comments": {
    GET: async () => [],
    POST: async (data) => data,
    PUT: async (data) => data,
    DELETE: async () => {}
  }
};

// Form state with Record and Pick
interface FormSchema {
  name: string;
  email: string;
  age: number;
}

type FormState = {
  values: FormSchema;
  errors: Record<keyof FormSchema, string | undefined>;
  touched: Record<keyof FormSchema, boolean>;
  dirty: Record<keyof FormSchema, boolean>;
};

// Feature flags with Pick
interface Features {
  darkMode: boolean;
  notifications: boolean;
  analytics: boolean;
  experimental: boolean;
}

type PublicFeatures = Pick<Features, "darkMode" | "notifications">;
type InternalFeatures = Omit<Features, keyof PublicFeatures>;

// Permissions system
type Resource = "user" | "post" | "comment";
type Action = "create" | "read" | "update" | "delete";
type Permission = \`\${Resource}:\${Action}\`;

type PermissionSet = Record<Permission, boolean>;

const permissions: PermissionSet = {
  "user:create": true,
  "user:read": true,
  "user:update": true,
  "user:delete": false,
  "post:create": true,
  "post:read": true,
  "post:update": true,
  "post:delete": true,
  "comment:create": true,
  "comment:read": true,
  "comment:update": false,
  "comment:delete": false
};

// State management with complex types
interface AppState {
  user: User | null;
  settings: Record<string, any>;
  cache: Record<string, unknown>;
}

type StateUpdate = Partial<{
  [K in keyof AppState]: K extends "user"
    ? Partial<Omit<User, "id">>
    : AppState[K];
}>;

// Multi-level Record
type LocaleKey = "en" | "es" | "fr";
type TranslationKey = "greeting" | "farewell" | "error";

type Translations = Record<LocaleKey, Record<TranslationKey, string>>;

const translations: Translations = {
  en: {
    greeting: "Hello",
    farewell: "Goodbye",
    error: "Error"
  },
  es: {
    greeting: "Hola",
    farewell: "Adiós",
    error: "Error"
  },
  fr: {
    greeting: "Bonjour",
    farewell: "Au revoir",
    error: "Erreur"
  }
};

// Generic CRUD operations
interface CrudEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

type CreateDto<T extends CrudEntity> = Omit<T, keyof CrudEntity>;
type UpdateDto<T extends CrudEntity> = Partial<Omit<T, keyof CrudEntity>> & Pick<T, "id">;
type ResponseDto<T extends CrudEntity> = T;

// Apply to specific entity
interface Article extends CrudEntity {
  title: string;
  content: string;
  authorId: number;
}

type CreateArticle = CreateDto<Article>;
// { title: string; content: string; authorId: number }

type UpdateArticle = UpdateDto<Article>;
// { id: number; title?: string; content?: string; authorId?: number }

// Builder with Record
type BuilderMethods<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

type UserBuilderMethods = BuilderMethods<Omit<User, "id">>;
// { setName: (value: string) => void; setEmail: ...; setPassword: ...; setAge: ... }`}
        </CodeBlock>

        <InfoBox type="tip">
          Combine Record, Pick, and Omit for powerful type transformations.
          Create DTOs with Omit, select fields with Pick, and build lookups with
          Record. Use them together for complex data modeling patterns.
        </InfoBox>
      </Section>

      <Section title="5. Practical Use Cases">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world applications of object manipulation utilities in API
          design, database models, form handling, and state management.
        </p>

        <CodeBlock title="Practical object manipulation examples">
          {`// REST API patterns
interface ApiUser {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
}

// POST /users - Create
type CreateUserRequest = Omit<ApiUser, "id" | "createdAt" | "updatedAt">;

// PATCH /users/:id - Update
type UpdateUserRequest = Partial<Omit<ApiUser, "id" | "createdAt" | "updatedAt" | "passwordHash">>;

// GET /users/:id - Response
type GetUserResponse = Omit<ApiUser, "passwordHash">;

// GET /users - List
type ListUsersResponse = Pick<ApiUser, "id" | "username" | "role">[];

class UserController {
  async create(data: CreateUserRequest): Promise<GetUserResponse> {
    const user: ApiUser = {
      ...data,
      id: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return this.toResponse(user);
  }

  async update(id: number, data: UpdateUserRequest): Promise<GetUserResponse> {
    const user = await this.findById(id);
    const updated = {
      ...user,
      ...data,
      updatedAt: new Date()
    };
    return this.toResponse(updated);
  }

  private toResponse(user: ApiUser): GetUserResponse {
    const { passwordHash, ...response } = user;
    return response;
  }

  private async findById(id: number): Promise<ApiUser> {
    return {} as ApiUser;
  }
}

// Database Repository Pattern
interface DbEntity {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

interface DbUser extends DbEntity {
  username: string;
  email: string;
  password_hash: string;
  email_verified: boolean;
}

// Repository methods use different types
class UserRepository {
  async create(data: Omit<DbUser, keyof DbEntity>): Promise<DbUser> {
    const now = new Date();
    return {
      ...data,
      id: Date.now(),
      created_at: now,
      updated_at: now,
      deleted_at: null
    };
  }

  async update(
    id: number,
    data: Partial<Omit<DbUser, keyof DbEntity>>
  ): Promise<DbUser> {
    return {} as DbUser;
  }

  async findById(id: number): Promise<Omit<DbUser, "deleted_at"> | null> {
    // Don't expose soft delete field
    return null;
  }

  async list(): Promise<Pick<DbUser, "id" | "username" | "email">[]> {
    // Return minimal data for lists
    return [];
  }
}

// Form Handling
interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  subscribe: boolean;
}

type FormErrors = Record<keyof ContactForm, string | undefined>;
type FormTouched = Record<keyof ContactForm, boolean>;
type FormValues = ContactForm;

interface FormState {
  values: Partial<FormValues>;
  errors: FormErrors;
  touched: FormTouched;
  isSubmitting: boolean;
  isValid: boolean;
}

class Form {
  private state: FormState = {
    values: {},
    errors: {} as FormErrors,
    touched: {} as FormTouched,
    isSubmitting: false,
    isValid: false
  };

  setField<K extends keyof ContactForm>(field: K, value: ContactForm[K]): void {
    this.state.values[field] = value;
    this.state.touched[field] = true;
    this.validate();
  }

  setError<K extends keyof ContactForm>(field: K, error: string): void {
    this.state.errors[field] = error;
    this.state.isValid = false;
  }

  private validate(): void {
    // Validation logic
  }

  getValues(): Required<FormValues> | null {
    const { values } = this.state;
    if (this.isComplete(values)) {
      return values;
    }
    return null;
  }

  private isComplete(values: Partial<FormValues>): values is Required<FormValues> {
    return !!(values.name && values.email && values.phone && values.message);
  }
}

// State Management (Redux/Zustand)
interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoState {
  items: Record<string, TodoItem>;
  filter: "all" | "active" | "completed";
  loading: boolean;
}

// Actions work with different shapes
type AddTodoPayload = Omit<TodoItem, "id" | "createdAt">;
type UpdateTodoPayload = Pick<TodoItem, "id"> & Partial<Omit<TodoItem, "id">>;
type TodoResponse = Pick<TodoItem, "id" | "text" | "completed">;

class TodoStore {
  private state: TodoState = {
    items: {},
    filter: "all",
    loading: false
  };

  addTodo(payload: AddTodoPayload): void {
    const todo: TodoItem = {
      ...payload,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.state.items[todo.id] = todo;
  }

  updateTodo(payload: UpdateTodoPayload): void {
    const existing = this.state.items[payload.id];
    if (existing) {
      this.state.items[payload.id] = { ...existing, ...payload };
    }
  }

  getTodos(): TodoResponse[] {
    return Object.values(this.state.items).map(todo => ({
      id: todo.id,
      text: todo.text,
      completed: todo.completed
    }));
  }
}

// Configuration Management
interface AppConfig {
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  features: Record<string, boolean>;
  theme: {
    primary: string;
    secondary: string;
  };
}

// Different configs for different environments
type DevConfig = AppConfig;
type ProdConfig = Omit<AppConfig, "features"> & {
  features: Record<string, boolean> & { debug: false };
};

// User can only configure certain parts
type UserConfig = Pick<AppConfig, "theme"> & {
  api: Pick<AppConfig["api"], "timeout">;
};

// Cache with TTL
interface CacheEntry<T> {
  value: T;
  expiresAt: Date;
}

type UserCache = Record<number, CacheEntry<Omit<ApiUser, "passwordHash">>>;

class Cache {
  private data: UserCache = {};

  set(id: number, user: ApiUser, ttl: number): void {
    const { passwordHash, ...safeUser } = user;
    this.data[id] = {
      value: safeUser,
      expiresAt: new Date(Date.now() + ttl)
    };
  }

  get(id: number): Omit<ApiUser, "passwordHash"> | null {
    const entry = this.data[id];
    if (!entry || entry.expiresAt < new Date()) {
      return null;
    }
    return entry.value;
  }
}`}
        </CodeBlock>

        <InfoBox type="important">
          Use Record for lookups and mappings, Pick for selecting specific
          fields, and Omit for hiding sensitive data. Combine them to create
          type-safe APIs, DTOs, form handlers, and state management systems.
        </InfoBox>
      </Section>
    </div>
  );
}
