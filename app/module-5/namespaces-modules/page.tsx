import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function NamespacesModulesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Namespaces, Modules & Declarations
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript provides namespaces for organizing code, ES modules for
        modularity, ambient declarations for typing existing JavaScript, and
        triple-slash directives for compiler instructions.
      </p>

      <Section title="1. Namespaces">
        <p className="text-gray-700 dark:text-gray-300">
          Namespaces provide a way to organize code and avoid global namespace
          pollution. While modules are preferred in modern code, namespaces are
          still useful for organizing types and ambient declarations.
        </p>

        <CodeBlock title="Namespace examples">
          {`// Basic namespace
namespace Utilities {
  export function log(message: string): void {
    console.log(\`[LOG] \${message}\`);
  }
  
  export function error(message: string): void {
    console.error(\`[ERROR] \${message}\`);
  }
  
  // Not exported, internal only
  function format(message: string): string {
    return message.toUpperCase();
  }
}

// Usage
Utilities.log("Application started");
Utilities.error("Something went wrong");
// Utilities.format("test");  // ✗ Error: not exported

// Nested namespaces
namespace App {
  export namespace Models {
    export interface User {
      id: number;
      name: string;
    }
    
    export interface Post {
      id: number;
      title: string;
      authorId: number;
    }
  }
  
  export namespace Services {
    export class UserService {
      getUser(id: number): Models.User {
        return { id, name: "John" };
      }
    }
    
    export class PostService {
      getPost(id: number): Models.Post {
        return { id, title: "Post", authorId: 1 };
      }
    }
  }
}

// Usage
const user: App.Models.User = { id: 1, name: "John" };
const userService = new App.Services.UserService();

// Namespace with classes
namespace Geometry {
  export class Point {
    constructor(public x: number, public y: number) {}
    
    distance(other: Point): number {
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  }
  
  export class Circle {
    constructor(
      public center: Point,
      public radius: number
    ) {}
    
    area(): number {
      return Math.PI * this.radius ** 2;
    }
  }
  
  export function distance(p1: Point, p2: Point): number {
    return p1.distance(p2);
  }
}

const p1 = new Geometry.Point(0, 0);
const p2 = new Geometry.Point(3, 4);
const dist = Geometry.distance(p1, p2);  // 5

// Namespace aliases
import G = Geometry;
const p3 = new G.Point(1, 1);

// Multi-file namespaces
// file1.ts
namespace Data {
  export interface Config {
    apiUrl: string;
  }
}

// file2.ts
/// <reference path="file1.ts" />
namespace Data {
  export class Repository {
    constructor(private config: Config) {}
  }
}

// Namespace with enums
namespace HTTP {
  export enum Status {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    ServerError = 500
  }
  
  export enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
  }
  
  export function isSuccess(status: Status): boolean {
    return status >= 200 && status < 300;
  }
}

const status = HTTP.Status.OK;
const isOk = HTTP.isSuccess(status);

// Ambient namespaces
declare namespace API {
  interface Response {
    data: any;
    status: number;
  }
  
  function get(url: string): Promise<Response>;
  function post(url: string, data: any): Promise<Response>;
}

// Use without implementation
API.get("/users").then(response => {
  console.log(response.data);
});

// Namespace with const
namespace Config {
  export const API_URL = "https://api.example.com";
  export const TIMEOUT = 5000;
  export const MAX_RETRIES = 3;
}

console.log(Config.API_URL);

// Namespace merging across files
// validators.ts
namespace Validation {
  export function isEmail(value: string): boolean {
    return value.includes("@");
  }
}

// more-validators.ts
namespace Validation {
  export function isPhone(value: string): boolean {
    return /^\d{10}$/.test(value);
  }
}

// Both validators available
Validation.isEmail("test@example.com");
Validation.isPhone("1234567890");`}
        </CodeBlock>

        <InfoBox type="info">
          Namespaces organize code hierarchically. Use them for type
          organization, ambient declarations, and legacy code. Prefer ES modules
          for new code.
        </InfoBox>
      </Section>

      <Section title="2. ES Modules">
        <p className="text-gray-700 dark:text-gray-300">
          ES modules are the modern, standard way to organize TypeScript code.
          They provide explicit imports/exports, tree-shaking, and better
          tooling support.
        </p>

        <CodeBlock title="ES Module examples">
          {`// Named exports
// user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export class UserService {
  async getUser(id: number): Promise<User> {
    return { id, name: "John", email: "john@example.com" };
  }
}

export const DEFAULT_USER: User = {
  id: 0,
  name: "Guest",
  email: "guest@example.com"
};

export function validateUser(user: User): boolean {
  return user.name.length > 0 && user.email.includes("@");
}

// Import named exports
import { User, UserService, DEFAULT_USER, validateUser } from "./user";

const service = new UserService();
const user = await service.getUser(1);
const isValid = validateUser(user);

// Default exports
// logger.ts
export default class Logger {
  log(message: string): void {
    console.log(\`[LOG] \${message}\`);
  }
  
  error(message: string): void {
    console.error(\`[ERROR] \${message}\`);
  }
}

// Import default export
import Logger from "./logger";
const logger = new Logger();

// Re-exports
// index.ts
export { User, UserService } from "./user";
export { default as Logger } from "./logger";
export * from "./utils";

// Namespace import
import * as User from "./user";
const service = new User.UserService();

// Type-only imports/exports
// types.ts
export type UserId = number;
export type UserName = string;
export interface UserData {
  id: UserId;
  name: UserName;
}

// Import types only
import type { UserData, UserId } from "./types";
import { type UserName } from "./types";  // Inline type import

// Side-effect imports
import "./polyfills";  // Executes code, no imports
import "reflect-metadata";  // For decorators

// Dynamic imports
async function loadModule() {
  const module = await import("./heavy-module");
  return module.default;
}

// Conditional imports
if (process.env.NODE_ENV === "development") {
  import("./dev-tools").then(tools => {
    tools.enableDebugMode();
  });
}

// Module resolution
// Relative imports
import { User } from "./models/user";
import { config } from "../config";

// Non-relative imports
import React from "react";
import { Observable } from "rxjs";

// Path mapping (tsconfig.json)
// "@/models/user" -> "./src/models/user"
import { User } from "@/models/user";
import { utils } from "@/utils";

// CommonJS interop
// CommonJS module
module.exports = {
  add: (a: number, b: number) => a + b
};

// Import CommonJS in TypeScript
import math = require("./math");
const sum = math.add(1, 2);

// Export = syntax (CommonJS style)
function createServer() {
  return { start: () => {} };
}

export = createServer;

// Import
import createServer = require("./server");
const server = createServer();

// Barrel exports
// models/index.ts
export * from "./user";
export * from "./post";
export * from "./comment";

// Import from barrel
import { User, Post, Comment } from "./models";

// Circular dependencies
// a.ts
import { B } from "./b";
export class A {
  b = new B();
}

// b.ts
import type { A } from "./a";  // Type-only import breaks circularity
export class B {
  a?: A;
}

// Module augmentation with imports
import { Express } from "express";

declare module "express" {
  interface Request {
    user?: User;
  }
}

// Type exports
// Export type and value with same name
export type Config = {
  apiUrl: string;
};

export const Config = {
  default: {
    apiUrl: "https://api.example.com"
  }
};

// Import both
import { Config } from "./config";  // Value
import type { Config as ConfigType } from "./config";  // Type

// Re-export with rename
export { User as UserModel } from "./models/user";
export { default as UserService } from "./services/user";

// Wildcard re-export with exclusions
export * from "./utils";
// Can't exclude specific exports with *

// Export type separately
export type { User, Post } from "./models";
export { UserService, PostService } from "./services";`}
        </CodeBlock>

        <InfoBox type="tip">
          ES modules are the standard for TypeScript. Use named exports for
          multiple exports, default for single main export, type-only imports to
          avoid circular dependencies, and barrel files for convenient imports.
        </InfoBox>
      </Section>

      <Section title="3. Ambient Declarations">
        <p className="text-gray-700 dark:text-gray-300">
          Ambient declarations describe the shape of external code that exists
          at runtime. Use the declare keyword to tell TypeScript about existing
          JavaScript code, libraries, or global variables.
        </p>

        <CodeBlock title="Ambient declaration examples">
          {`// Ambient variables
declare const VERSION: string;
declare let config: Config;
declare var globalState: any;

// Usage without defining
console.log(VERSION);
config = { apiUrl: "..." };

// Ambient functions
declare function $(selector: string): any;
declare function require(module: string): any;
declare function setTimeout(handler: () => void, timeout: number): number;

// Use declared functions
$("#app").html("<div>Hello</div>");
const module = require("./module");

// Ambient classes
declare class jQuery {
  constructor(selector: string);
  html(content: string): this;
  css(property: string, value: string): this;
}

// Use declared class
const $el = new jQuery(".element");

// Ambient interfaces
declare interface Window {
  myGlobalVar: string;
  myGlobalFunction(): void;
}

// Ambient modules (.d.ts file)
// lodash.d.ts
declare module "lodash" {
  export function map<T, U>(
    array: T[],
    iteratee: (item: T) => U
  ): U[];
  
  export function filter<T>(
    array: T[],
    predicate: (item: T) => boolean
  ): T[];
  
  export function groupBy<T>(
    array: T[],
    iteratee: (item: T) => string
  ): Record<string, T[]>;
}

// Use declared module
import { map, filter } from "lodash";

// Ambient namespaces
declare namespace NodeJS {
  interface Global {
    myGlobalVar: string;
  }
  
  interface Process {
    env: {
      NODE_ENV: string;
      API_URL: string;
    };
  }
}

// Access declared namespace types
global.myGlobalVar = "value";
const env = process.env.NODE_ENV;

// Declare module with wildcard
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

// Import works without actual implementation
import styles from "./App.module.css";
import logo from "./logo.svg";
import data from "./data.json";

// Ambient enums
declare enum LogLevel {
  Debug,
  Info,
  Warn,
  Error
}

// Ambient const enums
declare const enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

// UMD module declaration
declare module "my-lib" {
  export function doSomething(): void;
  
  export interface Options {
    verbose?: boolean;
  }
  
  // Default export for UMD
  export = MyLib;
}

interface MyLib {
  (options?: MyLib.Options): void;
  doSomething(): void;
}

namespace MyLib {
  interface Options {
    verbose?: boolean;
  }
}

// Global augmentation in .d.ts
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
  
  const gtag: (command: string, ...args: any[]) => void;
}

// Library with global side effects
declare module "jquery" {
  global {
    interface Window {
      jQuery: JQueryStatic;
      $: JQueryStatic;
    }
  }
  
  interface JQueryStatic {
    (selector: string): JQuery;
  }
  
  interface JQuery {
    html(content: string): this;
    css(property: string, value: string): this;
  }
  
  const jQuery: JQueryStatic;
  export = jQuery;
}

// Ambient type declarations
declare type ID = string | number;
declare type Callback<T> = (value: T) => void;
declare type Nullable<T> = T | null;

// Type-only declarations
declare interface Config {
  apiUrl: string;
  timeout: number;
}

// Doesn't create runtime value, only type
const config: Config = {
  apiUrl: "...",
  timeout: 5000
};

// Declare const assertions
declare const enum Direction {
  Up,
  Down,
  Left,
  Right
}

// Ambient declaration for existing JS library
// my-old-lib.d.ts
declare module "my-old-lib" {
  export function initialize(options: InitOptions): void;
  export function destroy(): void;
  
  export interface InitOptions {
    container: HTMLElement;
    theme?: "light" | "dark";
  }
  
  export class Widget {
    constructor(options: WidgetOptions);
    render(): void;
    destroy(): void;
  }
  
  export interface WidgetOptions {
    title: string;
    width?: number;
    height?: number;
  }
}

// Ambient module with nested namespaces
declare module "complex-lib" {
  export namespace Utils {
    function format(value: string): string;
    function parse(value: string): number;
  }
  
  export namespace Components {
    class Button {
      constructor(label: string);
      onClick(handler: () => void): void;
    }
    
    class Input {
      constructor(placeholder: string);
      onChange(handler: (value: string) => void): void;
    }
  }
}

// Declare class with static and instance members
declare class StorageManager {
  static instance: StorageManager;
  static getInstance(): StorageManager;
  
  get(key: string): any;
  set(key: string, value: any): void;
  remove(key: string): void;
  clear(): void;
}

// Ambient declarations for Node.js built-ins
declare module "fs" {
  export function readFile(
    path: string,
    encoding: string,
    callback: (err: Error | null, data: string) => void
  ): void;
  
  export function writeFile(
    path: string,
    data: string,
    callback: (err: Error | null) => void
  ): void;
}

// Use Node.js declarations
import { readFile } from "fs";
readFile("./file.txt", "utf8", (err, data) => {
  console.log(data);
});`}
        </CodeBlock>

        <InfoBox type="important">
          Ambient declarations describe existing code without implementation.
          Use declare for global variables/functions, .d.ts files for type
          definitions, and module declarations for third-party libraries.
        </InfoBox>
      </Section>

      <Section title="4. Triple-Slash Directives">
        <p className="text-gray-700 dark:text-gray-300">
          Triple-slash directives are single-line comments with special meaning
          to the TypeScript compiler, used for including references, types, and
          library dependencies.
        </p>

        <CodeBlock title="Triple-slash directive examples">
          {`// Reference directive - include another file
/// <reference path="./types/custom.d.ts" />

// Now types from custom.d.ts are available
const value: CustomType = {};

// Types directive - include type definitions
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="jest" />

// Node.js types available
import { readFile } from "fs";

// Lib directive - include library
/// <reference lib="es2015" />
/// <reference lib="dom" />
/// <reference lib="webworker" />

// ES2015 features available
const map = new Map();

// No-default-lib directive
/// <reference no-default-lib="true"/>
/// <reference lib="es2015" />

// Excludes default lib, only includes specified libs

// Multiple references
/// <reference path="./types/models.d.ts" />
/// <reference path="./types/services.d.ts" />
/// <reference types="node" />
/// <reference types="express" />
/// <reference lib="es2020" />

// Referencing declaration files
// types/custom.d.ts
declare global {
  interface CustomType {
    value: string;
  }
}

// main.ts
/// <reference path="./types/custom.d.ts" />
const custom: CustomType = { value: "test" };

// AMD module loading
/// <reference path="./vendor/lib.d.ts" />

// Path resolution in triple-slash
/// <reference path="../shared/types.d.ts" />
/// <reference path="../../global.d.ts" />

// Types directive for @types packages
/// <reference types="jquery" />
/// <reference types="lodash" />

// Use jQuery types
$(".selector").hide();

// Order matters
/// <reference path="./base.d.ts" />  // Must come first
/// <reference path="./extended.d.ts" />  // Depends on base

// In declaration files
// lib.d.ts
/// <reference path="./core.d.ts" />

declare namespace MyLib {
  // Uses types from core.d.ts
  function doSomething(): Core.Result;
}

// Reference in output
// When compiling with --declaration
/// <reference types="node" />
export function readConfig(): Promise<Config>;

// tsconfig.json types alternative
{
  "compilerOptions": {
    "types": ["node", "jest", "react"]
  }
}

// No need for triple-slash when using tsconfig types

// Legacy module system
/// <reference path="./vendor/old-lib.js" />

declare var OldLib: {
  init(): void;
  destroy(): void;
};

// Conditional compilation (doesn't work)
// Triple-slash directives are processed before compilation
// Can't conditionally include

// Best practices
// 1. Prefer tsconfig.json types over triple-slash
// 2. Use path only for non-npm type files
// 3. Order references from general to specific

// Modern alternative: Import types
import type { CustomType } from "./types/custom";
// Preferred over /// <reference path="..." />`}
        </CodeBlock>

        <InfoBox type="tip">
          Triple-slash directives include type definitions at compile time. Use
          path for local .d.ts files, types for @types packages, and lib for
          specific library versions. Prefer tsconfig.json configuration when
          possible.
        </InfoBox>
      </Section>

      <Section title="5. Module Resolution Strategies">
        <p className="text-gray-700 dark:text-gray-300">
          TypeScript uses different strategies to resolve module imports:
          Classic and Node. Understanding module resolution helps troubleshoot
          import issues and configure projects correctly.
        </p>

        <CodeBlock title="Module resolution examples">
          {`// Node module resolution (default, recommended)
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}

// Resolves imports like Node.js:
// 1. Check for .ts, .tsx, .d.ts files
// 2. Check node_modules/@types
// 3. Check node_modules with package.json types field

// Relative imports
import { User } from "./models/user";
// Looks for:
// - ./models/user.ts
// - ./models/user.tsx
// - ./models/user.d.ts
// - ./models/user/index.ts
// - ./models/user/index.tsx
// - ./models/user/index.d.ts

// Non-relative imports
import React from "react";
// Looks for:
// - node_modules/react/package.json (types field)
// - node_modules/react/index.d.ts
// - node_modules/@types/react/index.d.ts

// Path mapping
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}

// Use path aliases
import { Button } from "@components/Button";
import { formatDate } from "@utils/date";

// Classic resolution (legacy)
{
  "compilerOptions": {
    "moduleResolution": "classic"
  }
}

// Simpler algorithm, walks up directory tree
// Not recommended for new projects

// Type roots
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@types",
      "./types"
    ]
  }
}

// Looks for type definitions in:
// - ./node_modules/@types
// - ./types

// Explicit types
{
  "compilerOptions": {
    "types": ["node", "jest"]
  }
}

// Only includes specified @types packages
// Useful to limit scope or fix conflicts

// RootDirs for virtual directories
{
  "compilerOptions": {
    "rootDirs": ["src", "generated"]
  }
}

// Treats src and generated as one virtual directory
import { Schema } from "./schema";
// Can resolve from src/schema.ts or generated/schema.ts

// Package.json types field
{
  "name": "my-lib",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "typings": "./dist/index.d.ts"  // Alternative to types
}

// Module formats
{
  "compilerOptions": {
    "module": "ESNext",        // Modern ES modules
    "module": "CommonJS",      // Node.js modules
    "module": "AMD",           // RequireJS
    "module": "UMD",           // Universal
    "module": "System",        // SystemJS
    "module": "ES2015",        // ES6 modules
    "module": "ES2020"         // ES2020 modules
  }
}

// Target affects module
{
  "compilerOptions": {
    "target": "ES5",
    "module": "CommonJS"  // For Node.js
  }
}

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext"  // For modern bundlers
  }
}

// Imports with extensions (Node16/NodeNext)
{
  "compilerOptions": {
    "module": "Node16",
    "moduleResolution": "Node16"
  }
}

// Requires .js extension in imports
import { User } from "./models/user.js";  // Even for .ts files!

// Package.json exports field
{
  "name": "my-package",
  "exports": {
    ".": "./dist/index.js",
    "./utils": "./dist/utils/index.js",
    "./components/*": "./dist/components/*.js"
  }
}

// Import subpaths
import { Button } from "my-package/components/Button";

// Conditional exports
{
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.js",
      "types": "./dist/types/index.d.ts"
    }
  }
}

// Module augmentation resolution
// Automatically finds and merges declarations
declare module "express" {
  interface Request {
    user?: User;
  }
}

// Works across files, no explicit imports needed

// Wildcard module declarations
declare module "*.css" {
  const styles: Record<string, string>;
  export default styles;
}

// Resolves any .css import
import styles from "./App.module.css";

// Troubleshooting resolution
// Use --traceResolution flag
// tsc --traceResolution

// Shows detailed resolution steps:
// ======== Resolving module 'react' from '...' ========
// Module resolution kind is not specified, using 'NodeJs'.
// Loading module 'react' from 'node_modules' folder.
// File 'node_modules/react.ts' does not exist.
// File 'node_modules/react.tsx' does not exist.
// ...

// Resolution with monorepos
{
  "compilerOptions": {
    "paths": {
      "@my-org/*": ["packages/*/src"]
    }
  }
}

// Import from workspace packages
import { shared } from "@my-org/shared";`}
        </CodeBlock>

        <InfoBox type="important">
          Module resolution determines how TypeScript finds imported modules.
          Use Node resolution for most projects, configure path mapping for
          aliases, use typeRoots for custom type locations, and
          --traceResolution for debugging import issues.
        </InfoBox>
      </Section>
    </div>
  );
}
