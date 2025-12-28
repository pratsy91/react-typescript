import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function StringManipulationPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        String Manipulation Utilities
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript provides intrinsic string manipulation types:
        Uppercase&lt;T&gt;, Lowercase&lt;T&gt;, Capitalize&lt;T&gt;, and
        Uncapitalize&lt;T&gt; for transforming string literal types.
      </p>

      <Section title="1. Uppercase<T>">
        <p className="text-gray-700 dark:text-gray-300">
          Uppercase&lt;T&gt; converts string literal types to uppercase. Works
          with both single strings and union types.
        </p>

        <CodeBlock title="Uppercase<T> examples">
          {`// Basic Uppercase usage
type LowerString = "hello";
type UpperString = Uppercase<LowerString>;
// "HELLO"

type Mixed = "hello world";
type UpperMixed = Uppercase<Mixed>;
// "HELLO WORLD"

// Uppercase with union types
type Status = "pending" | "active" | "complete";
type UpperStatus = Uppercase<Status>;
// "PENDING" | "ACTIVE" | "COMPLETE"

// Environment variables
type EnvKey = "api_url" | "api_key" | "port" | "debug";
type EnvVar = Uppercase<EnvKey>;
// "API_URL" | "API_KEY" | "PORT" | "DEBUG"

const apiUrl: EnvVar = "API_URL";
const apiKey: EnvVar = "API_KEY";

// HTTP methods
type Method = "get" | "post" | "put" | "delete" | "patch";
type HttpMethod = Uppercase<Method>;
// "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

function request(method: HttpMethod, url: string): void {
  console.log(\`\${method} \${url}\`);
}

request("GET", "/api/users");
request("POST", "/api/users");

// Constants
type LogLevel = "info" | "warn" | "error" | "debug";
type LogConstant = Uppercase<LogLevel>;
// "INFO" | "WARN" | "ERROR" | "DEBUG"

const LOG_LEVELS: Record<LogConstant, number> = {
  INFO: 0,
  WARN: 1,
  ERROR: 2,
  DEBUG: 3
};

// SQL keywords
type SqlKeyword = "select" | "from" | "where" | "order by";
type SqlUpper = Uppercase<SqlKeyword>;
// "SELECT" | "FROM" | "WHERE" | "ORDER BY"

// Action types
type Action = "increment" | "decrement" | "reset";
type ActionType = Uppercase<Action>;
// "INCREMENT" | "DECREMENT" | "RESET"

const INCREMENT: ActionType = "INCREMENT";
const DECREMENT: ActionType = "DECREMENT";

// Event names to constants
type EventName = "click" | "hover" | "focus" | "blur";
type EventConstant = Uppercase<EventName>;
// "CLICK" | "HOVER" | "FOCUS" | "BLUR"

// Configuration keys
type ConfigKey = "timeout" | "retries" | "baseUrl";
type ConfigConstant = Uppercase<ConfigKey>;
// "TIMEOUT" | "RETRIES" | "BASEURL"

// Generic uppercase
function toUpperConstant<T extends string>(value: T): Uppercase<T> {
  return value.toUpperCase() as Uppercase<T>;
}

const upper = toUpperConstant("hello");  // "HELLO"

// Map to uppercase
type UppercaseKeys<T extends Record<string, any>> = {
  [K in keyof T as Uppercase<K & string>]: T[K];
};

interface Config {
  apiUrl: string;
  timeout: number;
}

type UpperConfig = UppercaseKeys<Config>;
// { APIURL: string; TIMEOUT: number }

// Template literal with Uppercase
type Prefix = "on";
type Event = "click" | "focus";
type EventHandler = \`\${Prefix}\${Uppercase<Event>}\`;
// "onCLICK" | "onFOCUS"

// Better version
type ProperEventHandler = \`\${Prefix}\${Capitalize<Event>}\`;
// "onClick" | "onFocus"

// Uppercase for API endpoints
type Resource = "users" | "posts" | "comments";
type ApiConstant = \`API_\${Uppercase<Resource>}\`;
// "API_USERS" | "API_POSTS" | "API_COMMENTS"

// State machine states
type State = "idle" | "loading" | "success" | "error";
type StateConstant = \`STATE_\${Uppercase<State>}\`;
// "STATE_IDLE" | "STATE_LOADING" | "STATE_SUCCESS" | "STATE_ERROR"

const STATE_IDLE: StateConstant = "STATE_IDLE";
const STATE_LOADING: StateConstant = "STATE_LOADING";

// Error codes
type ErrorType = "network" | "validation" | "auth" | "server";
type ErrorCode = \`ERROR_\${Uppercase<ErrorType>}\`;
// "ERROR_NETWORK" | "ERROR_VALIDATION" | "ERROR_AUTH" | "ERROR_SERVER"

// Uppercase with mapped types
type UppercaseValues<T> = {
  [K in keyof T]: T[K] extends string ? Uppercase<T[K]> : T[K];
};

interface Messages {
  greeting: "hello";
  farewell: "goodbye";
  count: number;
}

type UpperMessages = UppercaseValues<Messages>;
// { greeting: "HELLO"; farewell: "GOODBYE"; count: number }

// Uppercase record keys
type UppercaseRecord<K extends string, V> = Record<Uppercase<K>, V>;

type StatusMap = UppercaseRecord<Status, number>;
// Record<"PENDING" | "ACTIVE" | "COMPLETE", number>

const statusCodes: StatusMap = {
  PENDING: 0,
  ACTIVE: 1,
  COMPLETE: 2
};

// Environment type
type Env = "development" | "staging" | "production";
type EnvConstant = \`NODE_ENV_\${Uppercase<Env>}\`;
// "NODE_ENV_DEVELOPMENT" | "NODE_ENV_STAGING" | "NODE_ENV_PRODUCTION"`}
        </CodeBlock>

        <InfoBox type="info">
          Uppercase&lt;T&gt; converts string literals to uppercase. Use it for
          constants, environment variables, action types, SQL keywords, HTTP
          methods, and any scenario requiring SCREAMING_SNAKE_CASE.
        </InfoBox>
      </Section>

      <Section title="2. Lowercase<T>">
        <p className="text-gray-700 dark:text-gray-300">
          Lowercase&lt;T&gt; converts string literal types to lowercase. Useful
          for normalizing strings and creating lowercase variants.
        </p>

        <CodeBlock title="Lowercase<T> examples">
          {`// Basic Lowercase usage
type UpperString = "HELLO";
type LowerString = Lowercase<UpperString>;
// "hello"

type Mixed = "HeLLo WoRLd";
type LowerMixed = Lowercase<Mixed>;
// "hello world"

// Lowercase with union types
type Status = "PENDING" | "ACTIVE" | "COMPLETE";
type LowerStatus = Lowercase<Status>;
// "pending" | "active" | "complete"

// Normalize HTTP methods
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type NormalizedMethod = Lowercase<HttpMethod>;
// "get" | "post" | "put" | "delete"

// CSS properties
type CssProperty = "MARGIN" | "PADDING" | "BORDER";
type CssProp = Lowercase<CssProperty>;
// "margin" | "padding" | "border"

// File extensions
type Extension = ".TS" | ".TSX" | ".JS" | ".JSX";
type LowerExtension = Lowercase<Extension>;
// ".ts" | ".tsx" | ".js" | ".jsx"

// Email normalization
type Email<T extends string> = Lowercase<T>;
type UserEmail = Email<"John@Example.COM">;
// "john@example.com"

// URL paths
type Path = "/API/USERS" | "/API/POSTS";
type LowerPath = Lowercase<Path>;
// "/api/users" | "/api/posts"

// Lowercase keys
type LowercaseKeys<T extends Record<string, any>> = {
  [K in keyof T as Lowercase<K & string>]: T[K];
};

interface Config {
  API_URL: string;
  API_KEY: string;
}

type LowerConfig = LowercaseKeys<Config>;
// { api_url: string; api_key: string }

// Normalize event names
type EventName = "CLICK" | "HOVER" | "FOCUS";
type NormalizedEvent = Lowercase<EventName>;
// "click" | "hover" | "focus"

// Database table names
type TableName = "USERS" | "POSTS" | "COMMENTS";
type DbTable = Lowercase<TableName>;
// "users" | "posts" | "comments"

// Generic lowercase
function toLowerNorm<T extends string>(value: T): Lowercase<T> {
  return value.toLowerCase() as Lowercase<T>;
}

const lower = toLowerNorm("HELLO");  // "hello"

// Lowercase with template literals
type EventType = "CLICK" | "FOCUS";
type EventHandler = \`on\${Capitalize<Lowercase<EventType>>}\`;
// "onClick" | "onFocus"

// Normalize form fields
type FieldName = "FIRST_NAME" | "LAST_NAME" | "EMAIL";
type FormField = Lowercase<FieldName>;
// "first_name" | "last_name" | "email"

// API endpoint normalization
type Endpoint = "/API/V1/USERS" | "/API/V1/POSTS";
type ApiEndpoint = Lowercase<Endpoint>;
// "/api/v1/users" | "/api/v1/posts"

// Lowercase record
type LowercaseRecord<K extends string, V> = Record<Lowercase<K>, V>;

type MethodHandlers = LowercaseRecord<HttpMethod, () => void>;
// Record<"get" | "post" | "put" | "delete", () => void>

// Normalize constants to variables
type Constant = "API_URL" | "API_KEY";
type Variable = Lowercase<Constant>;
// "api_url" | "api_key"

// Case-insensitive lookup
type CaseInsensitiveLookup<T extends string> = Lowercase<T> | Uppercase<T>;
type FlexibleStatus = CaseInsensitiveLookup<"active">;
// "active" | "ACTIVE"

// Lowercase values
type LowercaseValues<T> = {
  [K in keyof T]: T[K] extends string ? Lowercase<T[K]> : T[K];
};

interface Commands {
  save: "SAVE";
  delete: "DELETE";
  count: number;
}

type LowerCommands = LowercaseValues<Commands>;
// { save: "save"; delete: "delete"; count: number }`}
        </CodeBlock>

        <InfoBox type="tip">
          Lowercase&lt;T&gt; converts string literals to lowercase. Use it for
          normalizing strings, email addresses, URLs, database table names, and
          creating consistent lowercase variants.
        </InfoBox>
      </Section>

      <Section title="3. Capitalize<T>">
        <p className="text-gray-700 dark:text-gray-300">
          Capitalize&lt;T&gt; converts the first character of a string literal
          to uppercase. Essential for creating PascalCase from camelCase.
        </p>

        <CodeBlock title="Capitalize<T> examples">
          {`// Basic Capitalize usage
type Lower = "hello";
type Capitalized = Capitalize<Lower>;
// "Hello"

type Name = "john doe";
type PropperName = Capitalize<Name>;
// "John doe" (only first character)

// Capitalize with union types
type EventName = "click" | "hover" | "focus";
type CapitalizedEvent = Capitalize<EventName>;
// "Click" | "Hover" | "Focus"

// Event handlers
type Event = "click" | "focus" | "blur" | "change";
type EventHandler = \`on\${Capitalize<Event>}\`;
// "onClick" | "onFocus" | "onBlur" | "onChange"

// Method names
type Action = "save" | "delete" | "update";
type MethodName = \`handle\${Capitalize<Action>}\`;
// "handleSave" | "handleDelete" | "handleUpdate"

// Component names
type Element = "button" | "input" | "select" | "textarea";
type Component = \`\${Capitalize<Element>}Component\`;
// "ButtonComponent" | "InputComponent" | "SelectComponent" | "TextareaComponent"

// Getter names
type Property = "name" | "age" | "email";
type Getter = \`get\${Capitalize<Property>}\`;
// "getName" | "getAge" | "getEmail"

// Setter names
type Setter = \`set\${Capitalize<Property>}\`;
// "setName" | "setAge" | "setEmail"

// Class names from types
type EntityType = "user" | "post" | "comment";
type EntityClass = Capitalize<EntityType>;
// "User" | "Post" | "Comment"

// Capitalize keys
type CapitalizeKeys<T extends Record<string, any>> = {
  [K in keyof T as Capitalize<K & string>]: T[K];
};

interface Config {
  apiUrl: string;
  apiKey: string;
}

type CapConfig = CapitalizeKeys<Config>;
// { ApiUrl: string; ApiKey: string }

// React prop types
type PropName = "title" | "subtitle" | "content";
type PropType = \`\${Capitalize<PropName>}Props\`;
// "TitleProps" | "SubtitleProps" | "ContentProps"

// Hook names
type StateName = "count" | "user" | "loading";
type HookName = \`use\${Capitalize<StateName>}\`;
// "useCount" | "useUser" | "useLoading"

// Action creators
type ActionType = "increment" | "decrement" | "reset";
type ActionCreator = \`create\${Capitalize<ActionType>}Action\`;
// "createIncrementAction" | "createDecrementAction" | "createResetAction"

// Generic capitalize
function capitalize<T extends string>(value: T): Capitalize<T> {
  return (value.charAt(0).toUpperCase() + value.slice(1)) as Capitalize<T>;
}

const cap = capitalize("hello");  // "Hello"

// Mapped types with Capitalize
type GetterMethods<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User {
  name: string;
  age: number;
  email: string;
}

type UserGetters = GetterMethods<User>;
// { getName: () => string; getAge: () => number; getEmail: () => string }

// Setter methods
type SetterMethods<T> = {
  [K in keyof T as \`set\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

type UserSetters = SetterMethods<User>;
// { setName: (value: string) => void; setAge: (value: number) => void; ... }

// Event emitter methods
type EmitterMethods<T extends string> = {
  [K in T as \`on\${Capitalize<K>}\`]: (handler: Function) => void;
};

type Events = "click" | "load" | "error";
type EventEmitter = EmitterMethods<Events>;
// { onClick: (handler: Function) => void; onLoad: ...; onError: ... }

// Builder pattern
type BuilderMethods<T> = {
  [K in keyof T as \`with\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

type UserBuilder = BuilderMethods<User>;
// { withName: (value: string) => void; withAge: (value: number) => void; ... }

// API response types
type Resource = "user" | "post" | "comment";
type ResponseType = \`\${Capitalize<Resource>}Response\`;
// "UserResponse" | "PostResponse" | "CommentResponse"

// Error types
type ErrorKind = "network" | "validation" | "auth";
type ErrorType = \`\${Capitalize<ErrorKind>}Error\`;
// "NetworkError" | "ValidationError" | "AuthError"

// Service names
type ServiceType = "user" | "auth" | "api";
type ServiceName = \`\${Capitalize<ServiceType>}Service\`;
// "UserService" | "AuthService" | "ApiService"

// Capitalize with template literals
type Prefix = "handle";
type Action2 = "click" | "submit";
type Handler = \`\${Prefix}\${Capitalize<Action2>}\`;
// "handleClick" | "handleSubmit"

// State property names
type State = "loading" | "error" | "data";
type StateProp = \`is\${Capitalize<State>}\`;
// "isLoading" | "isError" | "isData"`}
        </CodeBlock>

        <InfoBox type="important">
          Capitalize&lt;T&gt; capitalizes the first character of string
          literals. Use it for event handlers, getters/setters, component names,
          class names, and converting snake_case or camelCase to PascalCase.
        </InfoBox>
      </Section>

      <Section title="4. Uncapitalize<T>">
        <p className="text-gray-700 dark:text-gray-300">
          Uncapitalize&lt;T&gt; converts the first character to lowercase. The
          opposite of Capitalize, useful for converting PascalCase to camelCase.
        </p>

        <CodeBlock title="Uncapitalize<T> examples">
          {`// Basic Uncapitalize usage
type Pascal = "Hello";
type Camel = Uncapitalize<Pascal>;
// "hello"

type ClassName = "UserService";
type InstanceName = Uncapitalize<ClassName>;
// "userService"

// Uncapitalize with union types
type Component = "Button" | "Input" | "Select";
type InstanceType = Uncapitalize<Component>;
// "button" | "input" | "select"

// Convert class names to instance names
type Class = "UserController" | "PostController";
type Instance = Uncapitalize<Class>;
// "userController" | "postController"

// Extract event from handler
type Handler = "onClick" | "onFocus" | "onBlur";
type ExtractEvent<T extends string> = T extends \`on\${infer E}\`
  ? Uncapitalize<E>
  : never;

type Event = ExtractEvent<Handler>;
// "click" | "focus" | "blur"

// Variable names from types
type TypeName = "User" | "Post" | "Comment";
type VarName = Uncapitalize<TypeName>;
// "user" | "post" | "comment"

// Convert PascalCase to camelCase
type PascalCase = "FirstName" | "LastName" | "EmailAddress";
type CamelCase = Uncapitalize<PascalCase>;
// "firstName" | "lastName" | "emailAddress"

// Uncapitalize keys
type UncapitalizeKeys<T extends Record<string, any>> = {
  [K in keyof T as Uncapitalize<K & string>]: T[K];
};

interface Schema {
  FirstName: string;
  LastName: string;
  Age: number;
}

type CamelSchema = UncapitalizeKeys<Schema>;
// { firstName: string; lastName: string; age: number }

// Instance method names
type Method = "HandleClick" | "HandleSubmit";
type MethodName = Uncapitalize<Method>;
// "handleClick" | "handleSubmit"

// Generic uncapitalize
function uncapitalize<T extends string>(value: T): Uncapitalize<T> {
  return (value.charAt(0).toLowerCase() + value.slice(1)) as Uncapitalize<T>;
}

const uncap = uncapitalize("Hello");  // "hello"

// Router param names from paths
type PathSegment = "UserId" | "PostId";
type ParamName = Uncapitalize<PathSegment>;
// "userId" | "postId"

// CSS class to JS property
type CssClass = "BackgroundColor" | "FontSize";
type JsProperty = Uncapitalize<CssClass>;
// "backgroundColor" | "fontSize"

// Convert component prop types
type PropType = "TitleProps" | "ButtonProps";
type ExtractProp<T extends string> = T extends \`\${infer P}Props\`
  ? Uncapitalize<P>
  : never;

type PropName = ExtractProp<PropType>;
// "title" | "button"

// Database field names
type DbColumn = "CreatedAt" | "UpdatedAt" | "DeletedAt";
type FieldName = Uncapitalize<DbColumn>;
// "createdAt" | "updatedAt" | "deletedAt"

// Form field names
type Label = "FirstName" | "LastName" | "Email";
type FieldId = Uncapitalize<Label>;
// "firstName" | "lastName" | "email"

// Uncapitalize with mapped types
type ToInstanceStyle<T> = {
  [K in keyof T as Uncapitalize<K & string>]: T[K];
};

interface ApiResponse {
  UserId: number;
  UserName: string;
  Email: string;
}

type FrontendModel = ToInstanceStyle<ApiResponse>;
// { userId: number; userName: string; email: string }

// Enum to variable
type EnumValue = "Active" | "Pending" | "Complete";
type Variable = Uncapitalize<EnumValue>;
// "active" | "pending" | "complete"

// Extract action from creator
type ActionCreator = "CreateUser" | "DeletePost";
type ExtractAction<T extends string> = T extends \`Create\${infer A}\` | \`Delete\${infer A}\`
  ? Uncapitalize<A>
  : never;

type Action = ExtractAction<ActionCreator>;
// "user" | "post"

// Service to instance
type Service = "UserService" | "AuthService";
type ServiceInstance = Uncapitalize<Service>;
// "userService" | "authService"

// Normalize API response keys
type ApiKey = "FirstName" | "LastName";
type NormalizedKey = Uncapitalize<ApiKey>;
// "firstName" | "lastName"

function normalizeKeys<T extends Record<string, any>>(
  obj: T
): UncapitalizeKeys<T> {
  const result = {} as any;
  for (const key in obj) {
    const newKey = key.charAt(0).toLowerCase() + key.slice(1);
    result[newKey] = obj[key];
  }
  return result;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Uncapitalize&lt;T&gt; lowercases the first character. Use it for
          converting PascalCase to camelCase, extracting events from handlers,
          normalizing API responses, and creating instance names from class
          names.
        </InfoBox>
      </Section>

      <Section title="5. Combining String Manipulation Utilities">
        <p className="text-gray-700 dark:text-gray-300">
          Combine string manipulation utilities for sophisticated string
          transformations, naming conventions, and type-safe string operations.
        </p>

        <CodeBlock title="Combining string manipulation utilities">
          {`// Convert between naming conventions
type ToConstantCase<T extends string> = Uppercase<T>;
type ToPascalCase<T extends string> = Capitalize<T>;
type ToCamelCase<T extends string> = Uncapitalize<Capitalize<T>>;

type snake = "user_name";
type CONSTANT = ToConstantCase<snake>;  // "USER_NAME"
type Pascal = ToPascalCase<snake>;      // "User_name" (partial)
type camel = ToCamelCase<snake>;        // "user_name" (needs more work)

// Event system with transformations
type DomEvent = "click" | "focus" | "blur";
type EventConstant = Uppercase<DomEvent>;
// "CLICK" | "FOCUS" | "BLUR"

type EventHandler = \`on\${Capitalize<DomEvent>}\`;
// "onClick" | "onFocus" | "onBlur"

type EventEmitter = \`\${DomEvent}Event\`;
// "clickEvent" | "focusEvent" | "blurEvent"

// Complete CRUD operation names
type Operation = "create" | "read" | "update" | "delete";
type Resource = "user" | "post";

type ApiMethod = \`\${Operation}\${Capitalize<Resource>}\`;
// "createUser" | "readUser" | "updateUser" | "deleteUser" | ...

type ApiConstant = Uppercase<ApiMethod>;
// "CREATEUSER" | "READUSER" | ...

type ApiClass = Capitalize<ApiMethod>;
// "CreateUser" | "ReadUser" | ...

// State machine with multiple cases
type State = "idle" | "loading" | "success" | "error";

type StateConstant = \`STATE_\${Uppercase<State>}\`;
// "STATE_IDLE" | "STATE_LOADING" | ...

type StateHandler = \`handle\${Capitalize<State>}\`;
// "handleIdle" | "handleLoading" | ...

type StateClass = \`\${Capitalize<State>}State\`;
// "IdleState" | "LoadingState" | ...

// Transform API responses
interface ApiResponse {
  FirstName: string;
  LastName: string;
  EMAIL: string;
  user_id: number;
}

type NormalizeKeys<T> = {
  [K in keyof T as Uncapitalize<Capitalize<Lowercase<K & string>>>]: T[K];
};

type Normalized = NormalizeKeys<ApiResponse>;
// Attempts to normalize to camelCase

// Generic transformer
type Transform<T extends string, Style extends "upper" | "lower" | "capital" | "uncapital"> = 
  Style extends "upper" ? Uppercase<T> :
  Style extends "lower" ? Lowercase<T> :
  Style extends "capital" ? Capitalize<T> :
  Style extends "uncapital" ? Uncapitalize<T> :
  T;

type Upper = Transform<"hello", "upper">;     // "HELLO"
type Lower = Transform<"HELLO", "lower">;     // "hello"
type Capital = Transform<"hello", "capital">; // "Hello"

// Database to TypeScript naming
type DbField = "created_at" | "updated_at" | "user_id";
type TsField = Capitalize<DbField>;
// "Created_at" | "Updated_at" | "User_id" (needs proper snake to camel)

// HTTP header names
type Header = "content-type" | "authorization";
type HeaderConstant = Uppercase<Header>;
// "CONTENT-TYPE" | "AUTHORIZATION"

type HeaderProperty = Capitalize<Header>;
// "Content-type" | "Authorization"

// Redux action patterns
type ActionBase = "set" | "update" | "delete";
type Entity = "user" | "post";

type ActionType = \`\${ActionBase}_\${Entity}\`;
// "set_user" | "update_user" | ...

type ActionConstant = Uppercase<ActionType>;
// "SET_USER" | "UPDATE_USER" | ...

type ActionCreator = \`\${ActionBase}\${Capitalize<Entity>}\`;
// "setUser" | "updateUser" | ...

// Environment variables
type EnvKey = "apiUrl" | "apiKey" | "port";
type EnvVarName = \`REACT_APP_\${Uppercase<EnvKey>}\`;
// "REACT_APP_APIURL" | "REACT_APP_APIKEY" | "REACT_APP_PORT"

// Component naming convention
type Element = "button" | "input" | "select";
type ComponentName = \`\${Capitalize<Element>}Component\`;
// "ButtonComponent" | "InputComponent" | "SelectComponent"

type ComponentInstance = Uncapitalize<ComponentName>;
// "buttonComponent" | "inputComponent" | "selectComponent"

// Test naming
type TestType = "unit" | "integration" | "e2e";
type TestFile = \`\${Element}.\${TestType}.test\`;
// "button.unit.test" | "input.integration.test" | ...

type TestClass = \`\${Capitalize<Element>}\${Capitalize<TestType>}Test\`;
// "ButtonUnitTest" | "InputIntegrationTest" | ...

// Logger methods
type LogLevel = "info" | "warn" | "error";
type LogMethod = Lowercase<LogLevel>;
// "info" | "warn" | "error"

type LogConstant = \`LOG_\${Uppercase<LogLevel>}\`;
// "LOG_INFO" | "LOG_WARN" | "LOG_ERROR"

// Build complete API client
type HttpVerb = "get" | "post" | "put" | "delete";
type ApiEndpoint = "users" | "posts";

// Method names: getUsers, postUsers, etc.
type ClientMethod = \`\${HttpVerb}\${Capitalize<ApiEndpoint>}\`;

// Constants: GET_USERS, POST_USERS, etc.
type ApiConstant2 = \`\${Uppercase<HttpVerb>}_\${Uppercase<ApiEndpoint>}\`;

// Classes: GetUsers, PostUsers, etc.
type ServiceClass = Capitalize<ClientMethod>;

interface ApiClient {
  [K in ClientMethod]: (data?: any) => Promise<any>;
}

// Complete transformation pipeline
type Pipeline<T extends string> = {
  original: T;
  uppercase: Uppercase<T>;
  lowercase: Lowercase<T>;
  capitalized: Capitalize<T>;
  uncapitalized: Uncapitalize<T>;
};

type UserPipeline = Pipeline<"userName">;
/* {
  original: "userName";
  uppercase: "USERNAME";
  lowercase: "username";
  capitalized: "UserName";
  uncapitalized: "userName";
} */`}
        </CodeBlock>

        <InfoBox type="important">
          Combine Uppercase, Lowercase, Capitalize, and Uncapitalize for
          powerful string transformations. Use them for naming conventions,
          converting between camelCase/PascalCase/SNAKE_CASE, event systems, and
          API integration.
        </InfoBox>
      </Section>
    </div>
  );
}
