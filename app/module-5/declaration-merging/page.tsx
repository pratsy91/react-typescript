import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function DeclarationMergingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Declaration Merging
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Declaration merging is TypeScript's ability to merge multiple
        declarations with the same name into a single definition. This powerful
        feature enables interface merging, namespace merging, and module
        augmentation.
      </p>

      <Section title="1. Interface Merging">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript automatically merges multiple interface declarations with
          the same name, combining their members. This is the most common form
          of declaration merging.
        </p>

        <CodeBlock title="Interface merging examples">
          {`// Basic interface merging
interface User {
  id: number;
  name: string;
}

interface User {
  email: string;
  age: number;
}

// Merged result:
// interface User {
//   id: number;
//   name: string;
//   email: string;
//   age: number;
// }

const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 30
};

// Merging with methods
interface Calculator {
  add(a: number, b: number): number;
}

interface Calculator {
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// Merging with function overloads
interface Parser {
  parse(input: string): object;
}

interface Parser {
  parse(input: string, options: ParseOptions): object;
  parse(input: Buffer): object;
}

// Merged: Parser has overloaded parse method

// Merging across files
// file1.ts
interface Config {
  apiUrl: string;
  timeout: number;
}

// file2.ts
interface Config {
  retries: number;
  debug: boolean;
}

// Config now has all 4 properties

// Merging with generic interfaces
interface Box<T> {
  value: T;
}

interface Box<T> {
  getValue(): T;
}

const box: Box<string> = {
  value: "hello",
  getValue() {
    return this.value;
  }
};

// Conflicting property types cause errors
interface Conflict {
  value: string;
}

// ✗ Error: Subsequent property declarations must have the same type
// interface Conflict {
//   value: number;
// }

// Compatible property types
interface Compatible {
  data: string | number;
}

interface Compatible {
  data: string;  // ✓ OK: string is assignable to string | number
}

// Merging with index signatures
interface Dictionary {
  [key: string]: any;
}

interface Dictionary {
  length: number;
  name: string;
}

// Both specific properties and index signature are present

// Merging with optional properties
interface Person {
  name: string;
  age?: number;
}

interface Person {
  email: string;
  age?: number;  // ✓ OK: same optionality
}

// Extending merged interfaces
interface Animal {
  name: string;
}

interface Animal {
  age: number;
}

interface Dog extends Animal {
  breed: string;
}
// Dog has name, age, and breed

// Plugin pattern with interface merging
interface PluginAPI {
  version: string;
}

// Plugin 1 adds methods
interface PluginAPI {
  log(message: string): void;
}

// Plugin 2 adds more methods
interface PluginAPI {
  error(message: string): void;
}

// All plugins contribute to the same API

// Merging with readonly
interface ReadonlyData {
  readonly id: number;
}

interface ReadonlyData {
  readonly id: number;  // ✓ OK: same modifier
  name: string;
}

// Merging with call signatures
interface EventEmitter {
  (event: string, handler: Function): void;
}

interface EventEmitter {
  on(event: string, handler: Function): void;
  emit(event: string, ...args: any[]): void;
}

const emitter: EventEmitter = Object.assign(
  (event: string, handler: Function) => {},
  {
    on: (event: string, handler: Function) => {},
    emit: (event: string, ...args: any[]) => {}
  }
);

// Merging with construct signatures
interface Factory {
  new (name: string): Product;
}

interface Factory {
  create(name: string): Product;
}

// Practical: Extending library types
interface Array<T> {
  // Add custom method to Array
  first(): T | undefined;
}

Array.prototype.first = function() {
  return this[0];
};

const arr = [1, 2, 3];
const firstElement = arr.first();  // 1

// Request/Response augmentation
interface Request {
  user?: {
    id: number;
    name: string;
  };
}

// Middleware adds properties
interface Request {
  session?: {
    token: string;
  };
}

// Third-party library augmentation
interface Window {
  myCustomProperty: string;
}

window.myCustomProperty = "custom value";

// jQuery-style plugin merging
interface JQuery {
  customPlugin(options?: any): JQuery;
}

// Different plugin
interface JQuery {
  anotherPlugin(config: any): JQuery;
}`}
        </CodeBlock>

        <InfoBox type="info">
          Interface merging combines multiple interface declarations with the
          same name. Use it for extending types incrementally, plugin systems,
          and augmenting third-party libraries. Properties must have compatible
          types.
        </InfoBox>
      </Section>

      <Section title="2. Namespace Merging">
        <p className="text-gray-700 dark:text-gray-300">
          Namespaces can merge with other namespaces, classes, functions, and
          enums, enabling complex organizational patterns.
        </p>

        <CodeBlock title="Namespace merging examples">
          {`// Basic namespace merging
namespace Utility {
  export function log(message: string): void {
    console.log(message);
  }
}

namespace Utility {
  export function error(message: string): void {
    console.error(message);
  }
}

// Merged: Utility has both log and error
Utility.log("Info");
Utility.error("Error");

// Nested namespace merging
namespace App {
  export namespace Utils {
    export function format(value: string): string {
      return value.toUpperCase();
    }
  }
}

namespace App {
  export namespace Utils {
    export function parse(value: string): number {
      return parseInt(value);
    }
  }
}

// Both format and parse available
App.Utils.format("hello");
App.Utils.parse("123");

// Namespace merging with classes
class Album {
  title: string;
  constructor(title: string) {
    this.title = title;
  }
}

namespace Album {
  export class Track {
    constructor(public name: string, public duration: number) {}
  }
  
  export function create(title: string): Album {
    return new Album(title);
  }
}

// Usage
const album = new Album("Greatest Hits");
const track = new Album.Track("Song 1", 180);
const created = Album.create("New Album");

// Namespace merging with functions
function buildUrl(path: string): string {
  return \`https://api.example.com\${path}\`;
}

namespace buildUrl {
  export const baseUrl = "https://api.example.com";
  export function withQuery(path: string, params: Record<string, string>): string {
    const query = new URLSearchParams(params).toString();
    return \`\${buildUrl(path)}?\${query}\`;
  }
}

// Usage
const url1 = buildUrl("/users");
const url2 = buildUrl.withQuery("/users", { limit: "10" });
console.log(buildUrl.baseUrl);

// Namespace merging with enums
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

namespace Color {
  export function toHex(color: Color): string {
    switch (color) {
      case Color.Red: return "#FF0000";
      case Color.Green: return "#00FF00";
      case Color.Blue: return "#0000FF";
    }
  }
  
  export function fromString(str: string): Color | undefined {
    return Color[str as keyof typeof Color];
  }
}

// Usage
const red = Color.Red;
const hex = Color.toHex(red);
const parsed = Color.fromString("Green");

// Multi-level namespace merging
namespace Company {
  export namespace HR {
    export class Employee {
      constructor(public name: string) {}
    }
  }
}

namespace Company {
  export namespace HR {
    export function hire(name: string): Employee {
      return new Employee(name);
    }
  }
}

namespace Company {
  export namespace IT {
    export class Computer {
      constructor(public model: string) {}
    }
  }
}

// All merged
const employee = Company.HR.hire("John");
const computer = new Company.IT.Computer("Dell");

// Namespace with interface merging
namespace API {
  export interface Response {
    status: number;
    data: any;
  }
}

namespace API {
  export interface Response {
    headers: Record<string, string>;
  }
  
  export function fetch(url: string): Promise<Response> {
    return {} as Promise<Response>;
  }
}

// Response interface is merged, fetch function added

// Non-exported members don't merge
namespace Private {
  let secret = "hidden";  // Not exported
  export function getSecret() {
    return secret;
  }
}

namespace Private {
  // Can't access 'secret' from first declaration
  export function setSecret(value: string) {
    // secret = value;  // ✗ Error
  }
}

// Module-namespace merging pattern
class Logger {
  log(message: string): void {
    console.log(message);
  }
}

namespace Logger {
  export const version = "1.0.0";
  export enum Level {
    Info,
    Warn,
    Error
  }
  
  export interface Config {
    prefix?: string;
    timestamp?: boolean;
  }
}

// Usage
const logger = new Logger();
logger.log("Message");
console.log(Logger.version);
const level = Logger.Level.Info;

// Conditional namespace merging
namespace Config {
  export const isDev = process.env.NODE_ENV === "development";
}

if (Config.isDev) {
  namespace Config {
    export function debug(message: string): void {
      console.log("[DEBUG]", message);
    }
  }
}

// Factory pattern with namespace
class User {
  constructor(public name: string, public email: string) {}
}

namespace User {
  export function create(data: { name: string; email: string }): User {
    return new User(data.name, data.email);
  }
  
  export function validate(user: User): boolean {
    return user.name.length > 0 && user.email.includes("@");
  }
  
  export interface Data {
    name: string;
    email: string;
  }
}

// Create users
const user1 = new User("John", "john@example.com");
const user2 = User.create({ name: "Jane", email: "jane@example.com" });
const isValid = User.validate(user1);`}
        </CodeBlock>

        <InfoBox type="tip">
          Namespace merging combines namespace declarations and can merge with
          classes, functions, and enums. Use it to organize related
          functionality, create factory patterns, and add static members to
          classes.
        </InfoBox>
      </Section>

      <Section title="3. Module Augmentation">
        <p className="text-gray-700 dark:text-gray-300">
          Module augmentation allows you to extend existing modules by adding
          new exports or modifying existing ones. Essential for extending
          third-party libraries.
        </p>

        <CodeBlock title="Module augmentation examples">
          {`// Augmenting a module
// Original module: express.d.ts
declare module "express" {
  export interface Request {
    // Original properties
  }
  export interface Response {
    // Original properties
  }
}

// Your augmentation file
import "express";

declare module "express" {
  interface Request {
    user?: {
      id: number;
      name: string;
    };
    session?: {
      token: string;
    };
  }
}

// Now Request has user and session properties
import { Request, Response } from "express";

function handler(req: Request, res: Response) {
  if (req.user) {
    console.log(req.user.name);  // ✓ Type-safe
  }
}

// Augmenting third-party libraries
// Augment Array
declare global {
  interface Array<T> {
    groupBy<K extends string>(
      keyFn: (item: T) => K
    ): Record<K, T[]>;
  }
}

Array.prototype.groupBy = function<T, K extends string>(
  this: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return this.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

// Usage
const users = [
  { name: "John", role: "admin" },
  { name: "Jane", role: "user" },
  { name: "Bob", role: "admin" }
];

const byRole = users.groupBy(u => u.role);
// { admin: [...], user: [...] }

// Augmenting React types
import "react";

declare module "react" {
  interface CSSProperties {
    "--custom-property"?: string;
  }
}

// Now custom CSS properties are type-safe
const styles: React.CSSProperties = {
  color: "red",
  "--custom-property": "value"
};

// Augmenting Vue types
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $myPlugin: {
      doSomething(): void;
    };
  }
}

// Augmenting Redux types
import "redux";

declare module "redux" {
  export interface Dispatch {
    <T extends Action>(action: T): T;
    // Add custom dispatch signature
    <T extends ThunkAction>(action: T): ReturnType<T>;
  }
}

// Augmenting Node.js types
declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        CUSTOM_ENV_VAR: string;
        API_KEY: string;
        DATABASE_URL: string;
      }
    }
  }
}

// Type-safe environment variables
const apiKey = process.env.API_KEY;  // string

// Augmenting jQuery
declare module "jquery" {
  interface JQuery {
    customPlugin(options?: {
      speed?: number;
      easing?: string;
    }): JQuery;
  }
}

// Usage
import $ from "jquery";
$(".element").customPlugin({ speed: 500 });

// Augmenting Axios
import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    useCache?: boolean;
    cacheTimeout?: number;
  }
}

// Type-safe custom config
axios.get("/api/data", {
  useCache: true,
  cacheTimeout: 3600
});

// Augmenting utility libraries
import "lodash";

declare module "lodash" {
  interface LoDashStatic {
    customMethod<T>(arr: T[], fn: (item: T) => boolean): T[];
  }
}

// Augmenting testing libraries
import "vitest";

declare module "vitest" {
  interface Assertion {
    toBeWithinRange(floor: number, ceiling: number): void;
  }
}

// Custom matcher
expect(5).toBeWithinRange(1, 10);

// Augmenting GraphQL types
declare module "graphql" {
  interface GraphQLFieldConfig<TSource, TContext> {
    complexity?: number;
  }
}

// Conditional module augmentation
if (process.env.NODE_ENV === "development") {
  declare module "mylib" {
    interface Config {
      debugMode: boolean;
    }
  }
}

// Wildcard module augmentation
declare module "*.css" {
  const styles: { [key: string]: string };
  export default styles;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "*.json" {
  const value: any;
  export default value;
}

// Augmenting module exports
declare module "mylib" {
  export function existingFunction(): void;
  
  // Add new export
  export function newFunction(): void;
  
  // Add types
  export interface Options {
    verbose?: boolean;
  }
}

// Augmenting default exports
declare module "single-export-lib" {
  interface DefaultExport {
    version: string;
  }
  
  const lib: DefaultExport;
  export = lib;
}

// Augmenting class-based libraries
declare module "class-lib" {
  export class MyClass {
    // Add new method
    newMethod(): void;
  }
}

// Practical: Express middleware augmentation
import "express-session";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    cart?: Array<{
      productId: number;
      quantity: number;
    }>;
  }
}

// Type-safe session access
app.get("/cart", (req, res) => {
  const cart = req.session.cart;  // Typed!
  res.json(cart);
});

// Augmenting with generics
declare module "generic-lib" {
  export class Container<T> {
    // Add method to existing generic class
    mapAsync<U>(fn: (item: T) => Promise<U>): Promise<Container<U>>;
  }
}`}
        </CodeBlock>

        <InfoBox type="important">
          Module augmentation extends existing modules by merging declarations.
          Use it to add custom properties to Express Request, extend React
          types, add methods to third-party libraries, and create type-safe
          custom functionality.
        </InfoBox>
      </Section>

      <Section title="4. Global Augmentation">
        <p className="text-gray-700 dark:text-gray-300">
          Global augmentation adds declarations to the global scope, making
          types and values available everywhere without imports.
        </p>

        <CodeBlock title="Global augmentation examples">
          {`// Basic global augmentation
declare global {
  interface Window {
    myGlobalFunction(): void;
    config: AppConfig;
  }
  
  interface AppConfig {
    apiUrl: string;
    version: string;
  }
}

// Now available globally
window.myGlobalFunction();
const url = window.config.apiUrl;

// Augment global with custom types
declare global {
  type UUID = string & { __brand: "UUID" };
  type Email = string & { __brand: "Email" };
  
  function generateUUID(): UUID;
  function validateEmail(email: string): email is Email;
}

// Use anywhere without import
const id: UUID = generateUUID();

// Augment global Array
declare global {
  interface Array<T> {
    last(): T | undefined;
    shuffle(): T[];
  }
}

// Implementation
Array.prototype.last = function() {
  return this[this.length - 1];
};

Array.prototype.shuffle = function() {
  const arr = [...this];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Usage
[1, 2, 3].last();     // 3
[1, 2, 3].shuffle();  // [2, 1, 3]

// Augment String
declare global {
  interface String {
    capitalize(): string;
    truncate(length: number): string;
  }
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.truncate = function(length: number) {
  return this.length > length 
    ? this.substring(0, length) + "..." 
    : this.toString();
};

// Global utility types
declare global {
  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };
  
  type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
  };
  
  type Nullable<T> = T | null;
  type Optional<T> = T | undefined;
}

// Use without import
const partial: DeepPartial<User> = { name: "John" };
const nullable: Nullable<string> = null;

// Global constants
declare global {
  const APP_VERSION: string;
  const API_BASE_URL: string;
  const IS_PRODUCTION: boolean;
}

// Global functions
declare global {
  function sleep(ms: number): Promise<void>;
  function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number
  ): T;
}

// Implementation
globalThis.sleep = (ms: number) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Augment Promise
declare global {
  interface Promise<T> {
    timeout(ms: number): Promise<T>;
    retry(attempts: number): Promise<T>;
  }
}

Promise.prototype.timeout = function<T>(this: Promise<T>, ms: number) {
  return Promise.race([
    this,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    )
  ]);
};

// Usage
fetch("/api/data")
  .timeout(5000)
  .catch(err => console.error(err));

// Global namespace
declare global {
  namespace App {
    interface Config {
      theme: "light" | "dark";
      language: string;
    }
    
    interface User {
      id: number;
      name: string;
      roles: string[];
    }
    
    type Result<T> = 
      | { success: true; data: T }
      | { success: false; error: string };
  }
}

// Use App namespace globally
const config: App.Config = {
  theme: "dark",
  language: "en"
};

// Augment Number
declare global {
  interface Number {
    times(fn: (i: number) => void): void;
    toPrice(): string;
  }
}

Number.prototype.times = function(fn: (i: number) => void) {
  for (let i = 0; i < this.valueOf(); i++) {
    fn(i);
  }
};

Number.prototype.toPrice = function() {
  return \`$\${this.toFixed(2)}\`;
};

// Usage
(3).times(i => console.log(i));  // 0, 1, 2
(19.99).toPrice();  // "$19.99"

// Global type guards
declare global {
  function isString(value: unknown): value is string;
  function isNumber(value: unknown): value is number;
  function isDefined<T>(value: T | undefined): value is T;
}

globalThis.isString = (value): value is string => typeof value === "string";
globalThis.isNumber = (value): value is number => typeof value === "number";
globalThis.isDefined = <T>(value: T | undefined): value is T => value !== undefined;

// Augment Object
declare global {
  interface ObjectConstructor {
    isEmpty(obj: any): boolean;
    deepClone<T>(obj: T): T;
  }
}

Object.isEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

Object.deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Global event types
declare global {
  interface CustomEventMap {
    "user:login": { userId: number; timestamp: Date };
    "user:logout": { userId: number };
    "data:update": { type: string; data: any };
  }
  
  interface WindowEventMap extends CustomEventMap {}
}

// Type-safe custom events
window.addEventListener("user:login", (event) => {
  console.log(event.detail.userId);
});

// Global fetch augmentation
declare global {
  function fetchJSON<T>(url: string): Promise<T>;
  function fetchWithAuth(url: string, token: string): Promise<Response>;
}

globalThis.fetchJSON = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.json();
};

// JSX global augmentation
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "custom-element": {
        name?: string;
        value?: string;
      };
    }
  }
}

// Now custom-element is valid JSX
const element = <custom-element name="test" value="123" />;

// Module must have at least one export for global augmentation
export {};`}
        </CodeBlock>

        <InfoBox type="tip">
          Global augmentation adds types to the global scope. Use it for custom
          global utilities, extending built-in types (Array, String, etc.),
          adding window properties, and creating globally available types.
        </InfoBox>
      </Section>

      <Section title="5. Practical Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world patterns combining declaration merging, module
          augmentation, and global augmentation for plugin systems, library
          extensions, and framework integration.
        </p>

        <CodeBlock title="Practical declaration merging patterns">
          {`// Plugin architecture with merging
// Core plugin interface
interface Plugin {
  name: string;
  version: string;
}

// Plugin 1 augments
interface Plugin {
  logger?: {
    log(message: string): void;
  };
}

// Plugin 2 augments
interface Plugin {
  storage?: {
    get(key: string): any;
    set(key: string, value: any): void;
  };
}

// All plugins contribute to Plugin interface
class PluginManager {
  plugins: Plugin[] = [];
  
  register(plugin: Plugin): void {
    this.plugins.push(plugin);
  }
}

// Express-like middleware system
interface Request {
  url: string;
  method: string;
}

interface Response {
  send(data: any): void;
}

// Authentication middleware augments
interface Request {
  user?: { id: number; name: string };
  isAuthenticated(): boolean;
}

// Session middleware augments
interface Request {
  session?: {
    id: string;
    data: Record<string, any>;
  };
}

// All middleware contributions merged

// Framework plugin pattern
class Framework {
  plugins: Map<string, any> = new Map();
}

namespace Framework {
  export interface PluginAPI {
    version: string;
  }
  
  export function use(plugin: Plugin): void {
    // Register plugin
  }
}

// Plugins extend PluginAPI
declare module "./Framework" {
  namespace Framework {
    interface PluginAPI {
      router: {
        get(path: string, handler: Function): void;
        post(path: string, handler: Function): void;
      };
    }
  }
}

// Type-safe library extension
import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    // Add retry config
    retry?: {
      attempts: number;
      delay: number;
    };
    
    // Add cache config
    cache?: {
      enabled: boolean;
      ttl: number;
    };
  }
  
  interface AxiosInstance {
    // Add custom methods
    getWithRetry<T>(url: string): Promise<T>;
    cachedGet<T>(url: string): Promise<T>;
  }
}

// Implementation
import axios from "axios";

axios.getWithRetry = async function<T>(url: string): Promise<T> {
  // Retry logic
  return {} as T;
};

// State management augmentation
interface Store {
  state: any;
  dispatch(action: any): void;
}

// Middleware adds properties
interface Store {
  subscribe(listener: Function): () => void;
  replaceReducer(reducer: Function): void;
}

// DevTools augmentation
if (process.env.NODE_ENV === "development") {
  interface Store {
    devtools: {
      send(action: any, state: any): void;
    };
  }
}

// Testing framework augmentation
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(floor: number, ceiling: number): R;
      toMatchUser(expected: Partial<User>): R;
    }
  }
}

// Custom matchers implementation
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    return {
      pass,
      message: () => \`expected \${received} to be within range \${floor} - \${ceiling}\`
    };
  }
});

// ORM model augmentation
class Model {
  static tableName: string;
  id: number = 0;
}

namespace Model {
  export interface QueryBuilder {
    where(field: string, value: any): this;
    orderBy(field: string): this;
  }
  
  export function query(): QueryBuilder {
    return {} as QueryBuilder;
  }
}

// Usage
class User extends Model {
  name: string = "";
  email: string = "";
}

const users = User.query()
  .where("active", true)
  .orderBy("name");

// CSS-in-JS augmentation
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}

// Theme is now type-safe
const theme: DefaultTheme = {
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#ffffff",
    text: "#212529"
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px"
  },
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    desktop: "1024px"
  }
};

// GraphQL augmentation
import { GraphQLFieldConfig } from "graphql";

declare module "graphql" {
  interface GraphQLFieldConfig<TSource, TContext> {
    // Add custom directives
    auth?: string[];
    rateLimit?: {
      max: number;
      window: string;
    };
  }
}

// Type-safe field config
const userField: GraphQLFieldConfig<any, any> = {
  type: GraphQLString,
  auth: ["admin"],
  rateLimit: {
    max: 100,
    window: "1m"
  }
};

// Router augmentation pattern
interface Router {
  get(path: string, handler: Function): void;
  post(path: string, handler: Function): void;
}

// Plugin adds methods
interface Router {
  use(middleware: Function): void;
  param(name: string, handler: Function): void;
}

// Another plugin
interface Router {
  resource(name: string, controller: any): void;
  namespace(path: string, routes: () => void): void;
}

// All methods available on Router`}
        </CodeBlock>

        <InfoBox type="important">
          Use declaration merging patterns for plugin architectures, framework
          extensions, middleware systems, and library augmentation. Combine
          interface merging, namespace merging, and module augmentation for
          flexible, type-safe extensibility.
        </InfoBox>
      </Section>
    </div>
  );
}

// Required for global augmentation
export {};
