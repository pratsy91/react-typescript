import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function LiteralTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Literal Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Literal types allow you to specify exact values that a variable can
        hold. Instead of accepting any string or number, you can restrict values
        to specific literals, making your code more precise and type-safe.
      </p>

      <Section title="1. String Literal Types">
        <p className="text-gray-700 dark:text-gray-300">
          String literal types allow you to specify exact string values a
          variable can have.
        </p>

        <CodeBlock title="String literal type examples">
          {`// Basic string literal types
let direction: "north" | "south" | "east" | "west";
direction = "north";  // OK
direction = "east";   // OK
// direction = "up";  // Error: Type '"up"' is not assignable

// Type alias for reusability
type Direction = "north" | "south" | "east" | "west";
let currentDirection: Direction = "north";

// Function with string literal parameters
function move(direction: "up" | "down" | "left" | "right") {
  console.log(\`Moving \${direction}\`);
}

move("up");    // OK
move("left");  // OK
// move("forward"); // Error

// Function with string literal return type
function getStatus(): "success" | "error" | "pending" {
  return "success";
}

// String literals in object types
interface ButtonProps {
  variant: "primary" | "secondary" | "danger";
  size: "small" | "medium" | "large";
  type: "button" | "submit" | "reset";
}

const button: ButtonProps = {
  variant: "primary",
  size: "medium",
  type: "button"
};

// String literals with const
const status = "active"; // Type: "active" (literal)
let status2 = "active";  // Type: string (widened)

// Discriminated unions with string literals
type Result = 
  | { status: "success"; data: string }
  | { status: "error"; message: string }
  | { status: "loading" };

function handleResult(result: Result) {
  switch (result.status) {
    case "success":
      console.log(result.data); // TypeScript knows result.data exists
      break;
    case "error":
      console.log(result.message); // TypeScript knows result.message exists
      break;
    case "loading":
      console.log("Loading..."); // No data or message
      break;
  }
}

// HTTP methods
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

function request(url: string, method: HttpMethod) {
  console.log(\`\${method} \${url}\`);
}

// Event types
type MouseEventType = "click" | "dblclick" | "mousedown" | "mouseup" | "mousemove";
type KeyboardEventType = "keydown" | "keyup" | "keypress";

function handleEvent(type: MouseEventType | KeyboardEventType) {
  console.log(\`Handling \${type} event\`);
}

// CSS properties with literals
interface StyleProps {
  display: "none" | "block" | "inline" | "flex" | "grid";
  position: "static" | "relative" | "absolute" | "fixed" | "sticky";
  textAlign: "left" | "center" | "right" | "justify";
}

// React example
interface AlertProps {
  severity: "error" | "warning" | "info" | "success";
  message: string;
}

// Color themes
type Theme = "light" | "dark" | "auto";
type ColorScheme = "red" | "blue" | "green" | "purple";

let currentTheme: Theme = "dark";
let primaryColor: ColorScheme = "blue";

// Alignment options
type HorizontalAlign = "left" | "center" | "right";
type VerticalAlign = "top" | "middle" | "bottom";

interface AlignmentProps {
  horizontal: HorizontalAlign;
  vertical: VerticalAlign;
}

// File extensions
type ImageExtension = ".jpg" | ".jpeg" | ".png" | ".gif" | ".webp";
type VideoExtension = ".mp4" | ".webm" | ".ogg";
type FileExtension = ImageExtension | VideoExtension;

function getFileType(extension: FileExtension): "image" | "video" {
  const imageExts: ImageExtension[] = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  return imageExts.includes(extension as ImageExtension) ? "image" : "video";
}`}
        </CodeBlock>

        <InfoBox type="tip">
          String literal types are perfect for creating type-safe enums without
          using the enum keyword. They're especially useful for API responses,
          configuration options, and component props.
        </InfoBox>
      </Section>

      <Section title="2. Numeric Literal Types">
        <p className="text-gray-700 dark:text-gray-300">
          Numeric literal types restrict variables to specific numeric values.
        </p>

        <CodeBlock title="Numeric literal type examples">
          {`// Basic numeric literal types
let httpStatusCode: 200 | 404 | 500;
httpStatusCode = 200; // OK
httpStatusCode = 404; // OK
// httpStatusCode = 201; // Error

// Type alias with numeric literals
type HttpSuccessCode = 200 | 201 | 204;
type HttpErrorCode = 400 | 401 | 403 | 404 | 500;
type HttpStatusCode = HttpSuccessCode | HttpErrorCode;

let responseCode: HttpStatusCode = 200;

// Function with numeric literal parameters
function setVolume(level: 0 | 25 | 50 | 75 | 100) {
  console.log(\`Volume set to \${level}%\`);
}

setVolume(50);  // OK
// setVolume(60); // Error

// Dice rolls
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
  return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

// Port numbers
type CommonPort = 80 | 443 | 3000 | 8080;

interface ServerConfig {
  port: CommonPort;
  host: string;
}

// Version numbers
type MajorVersion = 1 | 2 | 3 | 4 | 5;
type MinorVersion = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface Version {
  major: MajorVersion;
  minor: MinorVersion;
  patch: number; // Any number for patch
}

// Grid columns
type GridColumns = 1 | 2 | 3 | 4 | 6 | 12;

interface GridProps {
  columns: GridColumns;
}

// Opacity levels
type Opacity = 0 | 0.25 | 0.5 | 0.75 | 1;

interface ElementStyle {
  opacity: Opacity;
}

// Zoom levels
type ZoomLevel = 25 | 50 | 75 | 100 | 125 | 150 | 200;

function setZoom(level: ZoomLevel) {
  console.log(\`Zoom: \${level}%\`);
}

// Priority levels
type Priority = 1 | 2 | 3 | 4 | 5;

interface Task {
  title: string;
  priority: Priority;
}

// Bit flags
type BitFlag = 0 | 1;

interface Permissions {
  read: BitFlag;
  write: BitFlag;
  execute: BitFlag;
}

// Rating systems
type StarRating = 1 | 2 | 3 | 4 | 5;
type ScaleRating = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Review {
  stars: StarRating;
  npsScore: ScaleRating;
}

// Combining with ranges (using union of literals)
type SmallNumber = 1 | 2 | 3 | 4 | 5;
type MediumNumber = 6 | 7 | 8 | 9 | 10;
type LargeNumber = 11 | 12 | 13 | 14 | 15;
type AllNumbers = SmallNumber | MediumNumber | LargeNumber;

// Discriminated union with numeric literals
type ApiResponse =
  | { status: 200; data: string }
  | { status: 404; error: "Not Found" }
  | { status: 500; error: "Internal Server Error" };

function handleApiResponse(response: ApiResponse) {
  if (response.status === 200) {
    console.log(response.data);
  } else {
    console.error(response.error);
  }
}

// Age groups
type ChildAge = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type TeenAge = 13 | 14 | 15 | 16 | 17 | 18 | 19;

interface Person {
  name: string;
  age: ChildAge | TeenAge | number; // Or just use number for adults
}

// Negative numbers
type Temperature = -10 | -5 | 0 | 5 | 10 | 15 | 20 | 25 | 30;

// Decimal numbers
type Percentage = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1.0;

// RGB color values (0-255)
type RGBValue = 0 | 51 | 102 | 153 | 204 | 255;

interface RGBColor {
  r: RGBValue;
  g: RGBValue;
  b: RGBValue;
}`}
        </CodeBlock>

        <InfoBox type="info">
          Numeric literal types are useful for status codes, configuration
          values, and enumerations with meaningful numbers. They provide
          compile-time safety for magic numbers.
        </InfoBox>
      </Section>

      <Section title="3. Boolean Literal Types">
        <p className="text-gray-700 dark:text-gray-300">
          Boolean literal types allow you to specify exactly true or false,
          useful in discriminated unions.
        </p>

        <CodeBlock title="Boolean literal type examples">
          {`// Basic boolean literal types
let isTrue: true = true;
// isTrue = false; // Error: Type 'false' is not assignable to type 'true'

let isFalse: false = false;
// isFalse = true; // Error

// Boolean literals in discriminated unions
type LoadingState = 
  | { loading: true }
  | { loading: false; data: string };

function handleLoadingState(state: LoadingState) {
  if (state.loading) {
    console.log("Loading...");
  } else {
    console.log(state.data); // TypeScript knows data exists
  }
}

// Success/failure states
type Result<T> =
  | { success: true; value: T }
  | { success: false; error: Error };

function processResult<T>(result: Result<T>) {
  if (result.success) {
    console.log(result.value); // value exists when success is true
  } else {
    console.error(result.error); // error exists when success is false
  }
}

// Feature flags with boolean literals
interface FeatureFlags {
  darkMode: boolean;
  betaFeatures: boolean;
  experimentalUI: boolean;
}

// Boolean literal in function returns
function isAuthenticated(): true | false {
  return true;
}

// Optional vs boolean literal
interface Config {
  enabled: boolean;           // true or false
  required?: boolean;         // true, false, or undefined
  strictMode: true;           // Must be true
  devMode: false;             // Must be false
}

const config: Config = {
  enabled: true,
  strictMode: true,
  devMode: false
};

// Combining with other types
type Status = 
  | { ready: true; message: string }
  | { ready: false; reason: string };

// Guard functions with boolean literals
type Validated<T> = 
  | { valid: true; data: T }
  | { valid: false; errors: string[] };

function validateUser(user: unknown): Validated<{ name: string; age: number }> {
  // Validation logic
  if (typeof user === "object" && user !== null) {
    return {
      valid: true,
      data: user as { name: string; age: number }
    };
  }
  return {
    valid: false,
    errors: ["Invalid user object"]
  };
}

// Boolean literals in React
interface ModalProps {
  open: true | false;
  closable: true | false;
}

// Readonly with boolean literal
interface Document {
  readonly: true;
  content: string;
}

// Combining boolean literals with unions
type NetworkState =
  | { online: true; latency: number }
  | { online: false; lastSeen: Date };

function displayNetworkStatus(state: NetworkState) {
  if (state.online) {
    console.log(\`Online - Latency: \${state.latency}ms\`);
  } else {
    console.log(\`Offline - Last seen: \${state.lastSeen}\`);
  }
}

// Boolean literal type guards
function isSuccess<T>(result: Result<T>): result is { success: true; value: T } {
  return result.success === true;
}

// Multi-level boolean discrimination
type DataState =
  | { loaded: false; loading: true }
  | { loaded: false; loading: false; error: string }
  | { loaded: true; loading: false; data: string };

function renderDataState(state: DataState) {
  if (state.loading) {
    return "Loading...";
  }
  if (state.loaded) {
    return state.data;
  }
  return \`Error: \${state.error}\`;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Boolean literals shine in discriminated unions where a boolean field
          determines the shape of the entire object. This pattern is very common
          in state management.
        </InfoBox>
      </Section>

      <Section title="4. Template Literal Types">
        <p className="text-gray-700 dark:text-gray-300">
          Template literal types allow you to create string types by combining
          literal types, enabling powerful string pattern matching at the type
          level.
        </p>

        <CodeBlock title="Template literal type examples">
          {`// Basic template literal types
type Greeting = \`Hello, \${"World" | "TypeScript" | "Developer"}\`;
// Type: "Hello, World" | "Hello, TypeScript" | "Hello, Developer"

let greeting: Greeting = "Hello, World"; // OK
// let invalid: Greeting = "Hi, World";  // Error

// Building CSS class names
type Size = "sm" | "md" | "lg";
type Color = "red" | "blue" | "green";
type ButtonClass = \`btn-\${Size}-\${Color}\`;

// Type: "btn-sm-red" | "btn-sm-blue" | "btn-sm-green" |
//       "btn-md-red" | "btn-md-blue" | "btn-md-green" |
//       "btn-lg-red" | "btn-lg-blue" | "btn-lg-green"

let buttonClass: ButtonClass = "btn-md-blue"; // OK

// Event names
type EventName = "click" | "focus" | "blur";
type EventHandler = \`on\${Capitalize<EventName>}\`;
// Type: "onClick" | "onFocus" | "onBlur"

interface Events {
  onClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

// API endpoints
type Resource = "users" | "posts" | "comments";
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = \`/api/\${Resource}\`;
// Type: "/api/users" | "/api/posts" | "/api/comments"

type ApiCall = \`\${Method} \${Endpoint}\`;
// Type: "GET /api/users" | "POST /api/users" | ...

// CSS properties with units
type Unit = "px" | "em" | "rem" | "%";
type Size = \`\${number}\${Unit}\`;
// Can't enforce number at type level, but documents intent

// Color hex codes
type HexDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "A" | "B" | "C" | "D" | "E" | "F";
type HexColor = \`#\${HexDigit}\${HexDigit}\${HexDigit}\`; // Simplified 3-digit
// In practice, full hex validation is complex

// Database table names with prefixes
type TablePrefix = "tbl" | "view" | "temp";
type TableName = "users" | "orders" | "products";
type FullTableName = \`\${TablePrefix}_\${TableName}\`;
// Type: "tbl_users" | "view_users" | "temp_users" | ...

// URL patterns
type Protocol = "http" | "https";
type Domain = "example.com" | "test.com";
type URL = \`\${Protocol}://\${Domain}\`;
// Type: "http://example.com" | "https://example.com" | ...

// Combining with Uppercase, Lowercase, Capitalize, Uncapitalize
type Action = "create" | "read" | "update" | "delete";
type UppercaseAction = Uppercase<Action>;
// Type: "CREATE" | "READ" | "UPDATE" | "DELETE"

type LowercaseAction = Lowercase<Uppercase<Action>>;
// Type: "create" | "read" | "update" | "delete"

type CapitalizedAction = Capitalize<Action>;
// Type: "Create" | "Read" | "Update" | "Delete"

type ActionHandler = \`handle\${Capitalize<Action>}\`;
// Type: "handleCreate" | "handleRead" | "handleUpdate" | "handleDelete"

// Environment variables
type EnvPrefix = "REACT_APP" | "NEXT_PUBLIC" | "VITE";
type EnvVar = "API_URL" | "API_KEY" | "DEBUG";
type EnvVarName = \`\${EnvPrefix}_\${EnvVar}\`;
// Type: "REACT_APP_API_URL" | "NEXT_PUBLIC_API_URL" | ...

// Redux action types
type EntityType = "USER" | "POST" | "COMMENT";
type ActionType = "FETCH" | "CREATE" | "UPDATE" | "DELETE";
type ReduxActionType = \`\${EntityType}/\${ActionType}\`;
// Type: "USER/FETCH" | "USER/CREATE" | "POST/FETCH" | ...

// CSS custom properties (CSS variables)
type CSSVarName = "primary" | "secondary" | "accent";
type CSSVar = \`--color-\${CSSVarName}\`;
// Type: "--color-primary" | "--color-secondary" | "--color-accent"

// Path parameters
type PathParam = "id" | "slug" | "userId";
type PathWithParam = \`/post/:\${PathParam}\`;
// Type: "/post/:id" | "/post/:slug" | "/post/:userId"

// Mapped types with template literals
type PropEventSource<T> = {
  on<K extends string & keyof T>
    (eventName: \`\${K}Changed\`, callback: (newValue: T[K]) => void): void;
};

declare function makeWatchedObject<T>(obj: T): T & PropEventSource<T>;

const person = makeWatchedObject({
  firstName: "John",
  lastName: "Doe",
  age: 30
});

person.on("firstNameChanged", (newName) => {
  console.log(\`New name: \${newName}\`);
});

// person.on("firstChanged", () => {}); // Error: invalid event name

// HTTP status messages
type SuccessCode = 200 | 201 | 204;
type ErrorCode = 400 | 401 | 404 | 500;
type StatusMessage = \`Status: \${SuccessCode | ErrorCode}\`;

// Versioned API paths
type Version = "v1" | "v2" | "v3";
type VersionedEndpoint = \`/api/\${Version}/\${Resource}\`;

// Data attribute names
type DataAttr = "id" | "name" | "value";
type DataAttrName = \`data-\${DataAttr}\`;
// Type: "data-id" | "data-name" | "data-value"

// BEM CSS methodology
type Block = "button" | "card" | "header";
type Element = "title" | "body" | "footer";
type Modifier = "primary" | "secondary" | "large";

type BEMClass = 
  | Block
  | \`\${Block}__\${Element}\`
  | \`\${Block}--\${Modifier}\`
  | \`\${Block}__\${Element}--\${Modifier}\`;

let bemClass: BEMClass = "button__title--large"; // OK

// SQL queries (simplified)
type SQLAction = "SELECT" | "INSERT" | "UPDATE" | "DELETE";
type SQLTable = "users" | "posts";
type SQLQuery = \`\${SQLAction} * FROM \${SQLTable}\`;`}
        </CodeBlock>

        <InfoBox type="important">
          Template literal types are one of TypeScript's most powerful features
          for string manipulation at the type level. They're perfect for
          creating type-safe APIs, CSS class names, event systems, and more.
        </InfoBox>
      </Section>

      <Section title="Practical Examples: Combining Literal Types">
        <CodeBlock title="Real-world literal type patterns">
          {`// Complete example: Type-safe routing system
type Route = "/home" | "/about" | "/contact" | "/blog";
type RouteWithId = \`\${Route}/\${string}\`;
type AllRoutes = Route | RouteWithId;

function navigate(route: Route) {
  console.log(\`Navigating to \${route}\`);
}

// Complete example: Type-safe form validation
type ValidationResult = 
  | { valid: true; value: string }
  | { valid: false; errors: string[] };

type FieldName = "email" | "password" | "username";
type FieldValidation = \`validate\${Capitalize<FieldName>}\`;

interface Validators {
  validateEmail(value: string): ValidationResult;
  validatePassword(value: string): ValidationResult;
  validateUsername(value: string): ValidationResult;
}

// Complete example: Type-safe state machine
type State = "idle" | "loading" | "success" | "error";
type Event = "FETCH" | "SUCCESS" | "ERROR" | "RESET";

type Transition = \`\${State} -> \${Event}\`;

const validTransitions: Transition[] = [
  "idle -> FETCH",
  "loading -> SUCCESS",
  "loading -> ERROR",
  "success -> RESET",
  "error -> RESET"
];

// Complete example: Type-safe CSS-in-JS
type CSSProperty = "color" | "backgroundColor" | "fontSize";
type CSSValue = string | number;

type StyleObject = {
  [K in CSSProperty]?: CSSValue;
};

const styles: StyleObject = {
  color: "red",
  fontSize: 16
};

// Complete example: Permission system
type Role = "admin" | "editor" | "viewer";
type Resource = "posts" | "users" | "settings";
type Action = "create" | "read" | "update" | "delete";

type Permission = \`\${Role}:\${Resource}:\${Action}\`;

const permissions: Permission[] = [
  "admin:posts:create",
  "admin:posts:read",
  "editor:posts:update",
  "viewer:posts:read"
];

function hasPermission(permission: Permission): boolean {
  return permissions.includes(permission);
}

// Complete example: Internationalization
type Locale = "en" | "es" | "fr" | "de";
type TranslationKey = "welcome" | "goodbye" | "hello";
type LocalizedKey = \`\${Locale}.\${TranslationKey}\`;

const translations: Record<LocalizedKey, string> = {
  "en.welcome": "Welcome",
  "en.goodbye": "Goodbye",
  "en.hello": "Hello",
  "es.welcome": "Bienvenido",
  "es.goodbye": "Adiós",
  "es.hello": "Hola",
  "fr.welcome": "Bienvenue",
  "fr.goodbye": "Au revoir",
  "fr.hello": "Bonjour",
  "de.welcome": "Willkommen",
  "de.goodbye": "Auf Wiedersehen",
  "de.hello": "Hallo"
};`}
        </CodeBlock>
      </Section>
    </div>
  );
}
