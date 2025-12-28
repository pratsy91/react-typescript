import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TemplateLiteralTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Template Literal Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Template literal types build on string literal types, using template
        literal syntax to create types that match specific string patterns. They
        enable powerful string manipulation and pattern matching at the type
        level.
      </p>

      <Section title="1. Basic Template Literals">
        <p className="text-gray-700 dark:text-gray-300">
          Template literal types use backticks and ${} syntax to create string
          patterns, similar to JavaScript template literals but at the type
          level.
        </p>

        <CodeBlock title="Basic template literal examples">
          {`// Basic template literal type
type Greeting = \`Hello, \${"World" | "TypeScript"}!\`;
// "Hello, World!" | "Hello, TypeScript!"

// With union types
type Color = "red" | "blue" | "green";
type ColorClass = \`color-\${Color}\`;
// "color-red" | "color-blue" | "color-green"

// Multiple placeholders
type Size = "small" | "medium" | "large";
type Variant = "primary" | "secondary";
type ButtonClass = \`btn-\${Size}-\${Variant}\`;
// "btn-small-primary" | "btn-small-secondary" | ...

// With string literal
type Version = \`v\${number}\`;  // v followed by any number
type ApiPath = \`/api/\${string}\`;  // /api/ followed by any string

// Combining with other types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = \`\${HttpMethod} /api/\${string}\`;
// "GET /api/..." | "POST /api/..." | ...

// Nested template literals
type Status = "success" | "error";
type Message = \`[\${Uppercase<Status>}]: \${string}\`;
// "[SUCCESS]: ..." | "[ERROR]: ..."

// Template with boolean
type IsActive = \`is-active-\${boolean}\`;
// "is-active-true" | "is-active-false"

// Template with number
type Port = \`:\${number}\`;  // :3000, :8080, etc.

// Simple patterns
type HttpsUrl = \`https://\${string}\`;
type EmailPattern = \`\${string}@\${string}\`;

// Combining strings
type Prefix = "pre";
type Suffix = "post";
type Combined = \`\${Prefix}-\${Suffix}\`;  // "pre-post"

// With literal strings
type ClassName = \`container-\${"fluid" | "fixed"}\`;
// "container-fluid" | "container-fixed"`}
        </CodeBlock>

        <InfoBox type="info">
          Template literal types create string patterns using ${} syntax. They
          work with unions, creating all possible combinations. Use them for CSS
          classes, API routes, event names, and string patterns.
        </InfoBox>
      </Section>

      <Section title="2. String Manipulation with Intrinsic Types">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript provides intrinsic string manipulation types: Uppercase,
          Lowercase, Capitalize, and Uncapitalize for transforming string
          literal types.
        </p>

        <CodeBlock title="String manipulation examples">
          {`// Uppercase
type Upper = Uppercase<"hello">;  // "HELLO"
type UpperUnion = Uppercase<"hello" | "world">;  // "HELLO" | "WORLD"

// Lowercase
type Lower = Lowercase<"HELLO">;  // "hello"
type LowerUnion = Lowercase<"HELLO" | "WORLD">;  // "hello" | "world"

// Capitalize (first letter uppercase)
type Cap = Capitalize<"hello">;  // "Hello"
type CapUnion = Capitalize<"hello" | "world">;  // "Hello" | "World"

// Uncapitalize (first letter lowercase)
type Uncap = Uncapitalize<"Hello">;  // "hello"
type UncapUnion = Uncapitalize<"Hello" | "World">;  // "hello" | "world"

// Combining with template literals
type EventName = "click" | "focus" | "blur";
type EventHandler = \`on\${Capitalize<EventName>}\`;
// "onClick" | "onFocus" | "onBlur"

// Method names from properties
type PropName = "firstName" | "lastName";
type Getter = \`get\${Capitalize<PropName>}\`;
// "getFirstName" | "getLastName"

type Setter = \`set\${Capitalize<PropName>}\`;
// "setFirstName" | "setLastName"

// HTTP headers
type HeaderName = "content-type" | "authorization";
type Header = Capitalize<HeaderName>;
// "Content-type" | "Authorization"

// Environment variables
type EnvVar = "api_url" | "api_key";
type EnvVarName = Uppercase<EnvVar>;
// "API_URL" | "API_KEY"

// Convert to constant case
type ToConstantCase<S extends string> = Uppercase<S>;
type Constants = ToConstantCase<"max_value" | "min_value">;
// "MAX_VALUE" | "MIN_VALUE"

// Multiple transformations
type Status = "pending" | "active" | "complete";
type StatusConstant = Uppercase<Status>;  // "PENDING" | "ACTIVE" | "COMPLETE"
type StatusMessage = \`Status is \${Status}\`;
// "Status is pending" | "Status is active" | "Status is complete"

// With mapped types
type User = {
  name: string;
  age: number;
};

type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }

// Event types
type MouseEvent = "click" | "dblclick" | "mousedown";
type MouseEventHandler = \`on\${Capitalize<MouseEvent>}\`;
// "onClick" | "onDblclick" | "onMousedown"

// Proper case for mouse events
type ProperMouseEvent = \`on\${Capitalize<"click">}\` | \`on\${Capitalize<"dbl">}Click\`;
// "onClick" | "onDblClick"

// Snake to camel case conversion (simplified)
type SnakeToCamel<S extends string> = S extends \`\${infer T}_\${infer U}\`
  ? \`\${T}\${Capitalize<SnakeToCamel<U>>}\`
  : S;

type CamelCase = SnakeToCamel<"user_name">;  // "userName"

// Kebab to camel case
type KebabToCamel<S extends string> = S extends \`\${infer T}-\${infer U}\`
  ? \`\${T}\${Capitalize<KebabToCamel<U>>}\`
  : S;

type FromKebab = KebabToCamel<"user-profile-name">;  // "userProfileName"`}
        </CodeBlock>

        <InfoBox type="tip">
          Use Uppercase, Lowercase, Capitalize, and Uncapitalize to transform
          string literal types. Combine them with template literals for powerful
          string pattern transformations.
        </InfoBox>
      </Section>

      <Section title="3. Pattern Matching and Inference">
        <p className="text-gray-700 dark:text-gray-300">
          Template literal types support pattern matching with infer, enabling
          extraction of substrings and complex string parsing.
        </p>

        <CodeBlock title="Pattern matching examples">
          {`// Extract prefix
type ExtractPrefix<S extends string> = S extends \`\${infer P}-\${string}\`
  ? P
  : never;

type Prefix = ExtractPrefix<"btn-primary">;  // "btn"

// Extract suffix
type ExtractSuffix<S extends string> = S extends \`\${string}-\${infer S}\`
  ? S
  : never;

type Suffix = ExtractSuffix<"btn-primary">;  // "primary"

// Extract between delimiters
type ExtractBetween<S extends string> = S extends \`\${string}[\${infer Content}]\${string}\`
  ? Content
  : never;

type Content = ExtractBetween<"[hello] world">;  // "hello"

// Extract event name from handler
type ExtractEventName<S extends string> = S extends \`on\${infer E}\`
  ? Uncapitalize<E>
  : never;

type EventName = ExtractEventName<"onClick">;  // "click"

// Extract path parameters
type ExtractParams<S extends string> = S extends \`\${string}:\${infer Param}/\${infer Rest}\`
  ? Param | ExtractParams<Rest>
  : S extends \`\${string}:\${infer Param}\`
  ? Param
  : never;

type RouteParams = ExtractParams<"/users/:id/posts/:postId">;
// "id" | "postId"

// Extract file extension
type ExtractExtension<S extends string> = S extends \`\${string}.\${infer Ext}\`
  ? Ext
  : never;

type Extension = ExtractExtension<"file.txt">;  // "txt"

// Check if string starts with
type StartsWith<S extends string, P extends string> = S extends \`\${P}\${string}\`
  ? true
  : false;

type StartsWithApi = StartsWith<"/api/users", "/api">;  // true

// Check if string ends with
type EndsWith<S extends string, P extends string> = S extends \`\${string}\${P}\`
  ? true
  : false;

type EndsWithTs = EndsWith<"file.ts", ".ts">;  // true

// Remove prefix
type RemovePrefix<S extends string, P extends string> = S extends \`\${P}\${infer Rest}\`
  ? Rest
  : S;

type WithoutApi = RemovePrefix<"/api/users", "/api">;  // "/users"

// Remove suffix
type RemoveSuffix<S extends string, P extends string> = S extends \`\${infer Rest}\${P}\`
  ? Rest
  : S;

type WithoutExt = RemoveSuffix<"file.txt", ".txt">;  // "file"

// Split string
type Split<S extends string, D extends string> = S extends \`\${infer T}\${D}\${infer U}\`
  ? [T, ...Split<U, D>]
  : [S];

type Parts = Split<"a.b.c", ".">;  // ["a", "b", "c"]

// Join strings
type Join<T extends string[], D extends string> = T extends [infer F extends string, ...infer R extends string[]]
  ? R extends []
    ? F
    : \`\${F}\${D}\${Join<R, D>}\`
  : "";

type Joined = Join<["a", "b", "c"], ".">;  // "a.b.c"

// Replace substring
type Replace<S extends string, From extends string, To extends string> = 
  S extends \`\${infer Prefix}\${From}\${infer Suffix}\`
    ? \`\${Prefix}\${To}\${Suffix}\`
    : S;

type Replaced = Replace<"hello world", "world", "TypeScript">;
// "hello TypeScript"

// Extract domain from URL
type ExtractDomain<S extends string> = S extends \`http://\${infer Domain}/\${string}\`
  ? Domain
  : S extends \`https://\${infer Domain}/\${string}\`
  ? Domain
  : never;

type Domain = ExtractDomain<"https://example.com/path">;  // "example.com"

// Parse route path
type ParseRoute<S extends string> = S extends \`/\${infer Segment}/\${infer Rest}\`
  ? [Segment, ...ParseRoute<\`/\${Rest}\`>]
  : S extends \`/\${infer Segment}\`
  ? [Segment]
  : [];

type Segments = ParseRoute<"/api/users/123">;  // ["api", "users", "123"]

// Extract method from signature
type ExtractMethod<S extends string> = S extends \`\${infer Method} \${string}\`
  ? Method
  : never;

type Method = ExtractMethod<"GET /api/users">;  // "GET"`}
        </CodeBlock>

        <InfoBox type="important">
          Pattern matching with infer extracts parts of strings based on
          patterns. Use it for parsing routes, extracting parameters, splitting
          strings, and validating string formats at the type level.
        </InfoBox>
      </Section>

      <Section title="4. Advanced Template Literal Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Complex patterns combine template literals with mapped types,
          conditional types, and recursion for sophisticated string
          transformations.
        </p>

        <CodeBlock title="Advanced template literal patterns">
          {`// Deep property paths
type PathsToStringProps<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends string
    ? \`\${Prefix & string}\${K & string}\`
    : T[K] extends object
    ? PathsToStringProps<T[K], \`\${Prefix & string}\${K & string}.\`>
    : never;
}[keyof T];

interface Config {
  api: {
    url: string;
    timeout: number;
  };
  user: {
    name: string;
  };
}

type StringPaths = PathsToStringProps<Config>;  // "api.url" | "user.name"

// CSS property names
type CSSProperty = "margin" | "padding";
type CSSDirection = "top" | "right" | "bottom" | "left";
type LonghandCSS = \`\${CSSProperty}-\${CSSDirection}\`;
// "margin-top" | "margin-right" | ... | "padding-left"

// Event bus
type EventMap = {
  "user:login": { userId: string };
  "user:logout": void;
  "post:create": { postId: number };
};

type EventNames = keyof EventMap;
// "user:login" | "user:logout" | "post:create"

// Extract namespace
type ExtractNamespace<E extends string> = E extends \`\${infer N}:\${string}\`
  ? N
  : never;

type Namespaces = ExtractNamespace<EventNames>;  // "user" | "post"

// SQL query builder types
type TableName = "users" | "posts";
type Operation = "SELECT" | "INSERT" | "UPDATE" | "DELETE";
type Query = \`\${Operation} FROM \${TableName}\`;
// "SELECT FROM users" | "INSERT FROM users" | ...

// State machine events
type State = "idle" | "loading" | "success" | "error";
type Transition = \`\${State}->\${State}\`;
// "idle->loading" | "loading->success" | ...

// REST API paths
type Resource = "users" | "posts" | "comments";
type ApiPath = \`/api/v1/\${Resource}\` | \`/api/v1/\${Resource}/:\${"id"}\`;
// "/api/v1/users" | "/api/v1/users/:id" | ...

// Branded string types
type Brand<T, B> = T & { __brand: B };
type Email = Brand<string, "Email">;
type ValidEmail = Brand<\`\${string}@\${string}.\${string}\`, "ValidEmail">;

// Form field names
interface FormData {
  user: {
    name: string;
    email: string;
  };
  settings: {
    theme: string;
  };
}

type FieldName<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? FieldName<T[K], \`\${Prefix}\${K & string}.\`>
    : \`\${Prefix}\${K & string}\`;
}[keyof T];

type FormFields = FieldName<FormData>;
// "user.name" | "user.email" | "settings.theme"

// Environment variable patterns
type EnvVarName<S extends string> = Uppercase<S>;
type EnvVars = EnvVarName<"api_url" | "api_key" | "port">;
// "API_URL" | "API_KEY" | "PORT"

// Hex color validation
type HexDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f";
type HexColor = \`#\${HexDigit}\${HexDigit}\${HexDigit}\${HexDigit}\${HexDigit}\${HexDigit}\`;

// Route patterns with constraints
type NumericId = \`\${number}\`;
type StringId = \`\${string}\`;
type Route = \`/users/\${NumericId}\` | \`/posts/\${StringId}\`;

// Action creator names
type Action = {
  type: "INCREMENT" | "DECREMENT" | "RESET";
};

type ActionCreator = \`create\${Capitalize<Lowercase<Action["type"]>>}Action\`;
// "createIncrementAction" | "createDecrementAction" | "createResetAction"

// Webhook event names
type WebhookEvent = \`webhook.\${"created" | "updated" | "deleted"}\`;
// "webhook.created" | "webhook.updated" | "webhook.deleted"

// GraphQL field names
type QueryType = "query" | "mutation" | "subscription";
type OperationName = \`\${QueryType}\${Capitalize<string>}\`;

// Logger level prefixes
type LogLevel = "info" | "warn" | "error";
type LogMessage = \`[\${Uppercase<LogLevel>}] \${string}\`;
// "[INFO] ..." | "[WARN] ..." | "[ERROR] ..."

// File path patterns
type FileExtension = ".ts" | ".tsx" | ".js" | ".jsx";
type FilePath = \`\${string}\${FileExtension}\`;

// Semantic version
type SemanticVersion = \`\${number}.\${number}.\${number}\`;

// HTTP status patterns
type SuccessStatus = \`2\${number}\${number}\`;
type ErrorStatus = \`4\${number}\${number}\` | \`5\${number}\${number}\`;

// CSS selector patterns
type PseudoClass = "hover" | "focus" | "active";
type Selector = \`\${string}:\${PseudoClass}\`;

// Data attribute patterns
type DataAttr = \`data-\${string}\`;
type AriaAttr = \`aria-\${string}\`;

// Custom element names (must contain hyphen)
type CustomElement = \`\${string}-\${string}\`;`}
        </CodeBlock>

        <InfoBox type="tip">
          Advanced template literal patterns enable complex string validations,
          path generation, and type-safe string APIs. Use them for routing,
          event systems, configuration, and domain-specific string types.
        </InfoBox>
      </Section>

      <Section title="5. Practical Template Literal Applications">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world applications of template literal types in routing, event
          handling, API design, and type-safe string manipulation.
        </p>

        <CodeBlock title="Practical template literal examples">
          {`// Type-safe router
type RouteMap = {
  "/": {};
  "/users": {};
  "/users/:id": { id: string };
  "/posts/:postId/comments/:commentId": { postId: string; commentId: string };
};

type ExtractRouteParams<T extends string> = {
  [K in T as K extends \`\${string}:\${infer P}\${infer Rest}\`
    ? Rest extends \`/\${string}\`
      ? P | ExtractRouteParams<Rest>
      : P
    : never]: string;
};

type UserParams = ExtractRouteParams<"/users/:id">;  // { id: string }

// Type-safe event emitter
type EventMap = {
  "user:login": { userId: string; timestamp: Date };
  "user:logout": { userId: string };
  "post:create": { postId: number; title: string };
  "post:delete": { postId: number };
};

class TypedEmitter<Events extends Record<string, any>> {
  on<E extends keyof Events>(
    event: E,
    handler: (data: Events[E]) => void
  ): void {
    // Implementation
  }

  emit<E extends keyof Events>(event: E, data: Events[E]): void {
    // Implementation
  }
}

const emitter = new TypedEmitter<EventMap>();
emitter.on("user:login", (data) => {
  console.log(data.userId, data.timestamp);  // Type-safe!
});

// CSS-in-JS type safety
type CSSValue = string | number;
type CSSProperties = {
  [K in \`\${"margin" | "padding"}\${Capitalize<"top" | "right" | "bottom" | "left">}\`]?: CSSValue;
};

const styles: CSSProperties = {
  marginTop: 10,
  paddingLeft: "20px"
};

// Environment variable helper
type EnvVar<T extends string> = \`REACT_APP_\${Uppercase<T>}\`;

type AppEnvVars = EnvVar<"api_url" | "api_key">;
// "REACT_APP_API_URL" | "REACT_APP_API_KEY"

function getEnv<T extends string>(key: EnvVar<T>): string | undefined {
  return process.env[key];
}

// Translation keys
type LocaleKey = \`\${"auth" | "profile" | "settings"}.\${string}\`;

const translations: Record<LocaleKey, string> = {
  "auth.login": "Login",
  "auth.logout": "Logout",
  "profile.edit": "Edit Profile",
  "settings.theme": "Theme"
};

// API endpoint builder
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Resource = "users" | "posts" | "comments";
type Endpoint = \`\${Method} /api/\${Resource}\`;

function request<E extends Endpoint>(endpoint: E): Promise<any> {
  const [method, path] = endpoint.split(" ");
  return fetch(path, { method });
}

// Form validation keys
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

type ValidationError<T> = {
  [K in keyof T as \`\${K & string}Error\`]?: string;
};

type FormErrors = ValidationError<FormData>;
// { emailError?: string; passwordError?: string; confirmPasswordError?: string }

// Redux action types
type ActionType<T extends string> = Uppercase<T>;
type UserActions = ActionType<"login" | "logout" | "update">;
// "LOGIN" | "LOGOUT" | "UPDATE"

const LOGIN: UserActions = "LOGIN";  // Type-safe constant

// Logger with namespaces
type Namespace = "app" | "api" | "db";
type LogMethod = \`\${Namespace}:\${"info" | "error" | "debug"}\`;

class Logger {
  log<M extends LogMethod>(method: M, message: string): void {
    console.log(\`[\${method}] \${message}\`);
  }
}

const logger = new Logger();
logger.log("api:info", "Request completed");

// Type-safe CSS modules
type CSSModule<T extends string> = {
  [K in T]: string;
};

type ButtonStyles = CSSModule<\`btn\${Capitalize<"primary" | "secondary" | "danger">}\`>;
// { btnPrimary: string; btnSecondary: string; btnDanger: string }

// Command pattern with template literals
type CommandName<T extends string> = \`execute\${Capitalize<T>}Command\`;

type Commands = CommandName<"save" | "delete" | "update">;
// "executeSaveCommand" | "executeDeleteCommand" | "executeUpdateCommand"

// GraphQL-like query builder
type QueryBuilder<T extends string> = {
  [K in T as \`get\${Capitalize<K>}\`]: () => Promise<any>;
};

type UserQueries = QueryBuilder<"user" | "users" | "userByEmail">;
// { getUser: () => Promise<any>; getUsers: () => Promise<any>; getUserByEmail: () => Promise<any> }

// State machine with transitions
type States = "idle" | "loading" | "success" | "error";
type Events = "fetch" | "resolve" | "reject" | "reset";
type Transition = \`\${States} + \${Events} -> \${States}\`;

// Permission system
type Resource2 = "post" | "comment" | "user";
type Action2 = "create" | "read" | "update" | "delete";
type Permission = \`\${Resource2}:\${Action2}\`;
// "post:create" | "post:read" | ... | "user:delete"`}
        </CodeBlock>

        <InfoBox type="important">
          Template literal types enable type-safe string APIs for routing,
          events, configuration, translations, and more. They catch string
          errors at compile time and provide excellent autocomplete support.
        </InfoBox>
      </Section>
    </div>
  );
}
