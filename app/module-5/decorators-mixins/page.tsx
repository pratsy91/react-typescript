import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function DecoratorsMixinsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Decorators & Mixins
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Decorators provide a way to add annotations and meta-programming syntax
        for class declarations and members. Mixins enable multiple inheritance
        patterns. Both are powerful tools for code reuse and composition.
      </p>

      <Section title="1. Class Decorators">
        <p className="text-gray-700 dark:text-gray-300">
          Class decorators are applied to class constructors and can observe,
          modify, or replace a class definition. Enable with
          experimentalDecorators in tsconfig.json.
        </p>

        <CodeBlock title="Class decorator examples">
          {`// Enable in tsconfig.json:
// "experimentalDecorators": true

// Basic class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}

// Decorator factory (returns decorator)
function component(options: { selector: string }) {
  return function(constructor: Function) {
    console.log(\`Component: \${options.selector}\`);
    // Add metadata
    (constructor as any).selector = options.selector;
  };
}

@component({ selector: "app-root" })
class AppComponent {
  title = "My App";
}

// Decorator that modifies constructor
function timestamp<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    createdAt = new Date();
  };
}

@timestamp
class Document {
  constructor(public title: string) {}
}

const doc = new Document("Test");
console.log((doc as any).createdAt);  // Current date

// Multiple decorators (bottom-up execution)
function first() {
  console.log("first(): factory");
  return function(constructor: Function) {
    console.log("first(): called");
  };
}

function second() {
  console.log("second(): factory");
  return function(constructor: Function) {
    console.log("second(): called");
  };
}

@first()
@second()
class Example {
  // Logs:
  // first(): factory
  // second(): factory
  // second(): called
  // first(): called
}

// Practical: Singleton decorator
function singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
  let instance: T;
  return class extends constructor {
    constructor(...args: any[]) {
      if (instance) {
        return instance;
      }
      super(...args);
      instance = this as any;
    }
  } as T;
}

@singleton
class DatabaseConnection {
  constructor(public connectionString: string) {}
}

const db1 = new DatabaseConnection("postgres://...");
const db2 = new DatabaseConnection("mysql://...");
console.log(db1 === db2);  // true

// Practical: Logging decorator
function logged(constructor: Function) {
  const original = constructor;

  function construct(constructor: Function, args: any[]) {
    console.log(\`Creating instance of \${constructor.name}\`);
    return new (constructor as any)(...args);
  }

  const newConstructor: any = function(...args: any[]) {
    return construct(original, args);
  };

  newConstructor.prototype = original.prototype;
  return newConstructor;
}

@logged
class Person {
  constructor(public name: string) {}
}

// Injectable decorator (DI)
const Injectable = () => {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    // Register class for dependency injection
    (global as any).injectableRegistry = (global as any).injectableRegistry || new Map();
    (global as any).injectableRegistry.set(constructor.name, constructor);
    return constructor;
  };
};

@Injectable()
class UserService {
  getUsers() {
    return ["John", "Jane"];
  }
}`}
        </CodeBlock>

        <InfoBox type="info">
          Class decorators wrap or modify class constructors. Use them for
          sealing classes, adding metadata, implementing patterns like
          Singleton, and framework features like dependency injection.
        </InfoBox>
      </Section>

      <Section title="2. Method & Property Decorators">
        <p className="text-gray-700 dark:text-gray-300">
          Method decorators modify method definitions, while property decorators
          work with class properties. They enable features like logging,
          validation, and memoization.
        </p>

        <CodeBlock title="Method and property decorator examples">
          {`// Method decorator signature
function log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(\`Calling \${propertyKey} with\`, args);
    const result = originalMethod.apply(this, args);
    console.log(\`Result:\`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3);
// Logs: Calling add with [2, 3]
// Logs: Result: 5

// Memoization decorator
function memoize(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const cache = new Map<string, any>();

  descriptor.value = function(...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("Cache hit!");
      return cache.get(key);
    }

    const result = originalMethod.apply(this, args);
    cache.set(key, result);
    return result;
  };

  return descriptor;
}

class Fibonacci {
  @memoize
  calculate(n: number): number {
    if (n <= 1) return n;
    return this.calculate(n - 1) + this.calculate(n - 2);
  }
}

// Timing decorator
function measureTime(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args: any[]) {
    const start = performance.now();
    const result = await originalMethod.apply(this, args);
    const end = performance.now();
    console.log(\`\${propertyKey} took \${end - start}ms\`);
    return result;
  };

  return descriptor;
}

class ApiClient {
  @measureTime
  async fetchData(url: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: "..." };
  }
}

// Validation decorator
function validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    if (args.some(arg => arg == null)) {
      throw new Error(\`Null argument passed to \${propertyKey}\`);
    }
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class UserService {
  @validate
  createUser(name: string, email: string): User {
    return { name, email } as User;
  }
}

// Property decorator
function readonly(target: any, propertyKey: string) {
  const descriptor: PropertyDescriptor = {
    writable: false,
    configurable: false
  };

  return descriptor;
}

class Config {
  @readonly
  apiUrl: string = "https://api.example.com";
}

// Property decorator with initialization
function default Value(value: any) {
  return function(target: any, propertyKey: string) {
    let val = value;

    Object.defineProperty(target, propertyKey, {
      get() {
        return val;
      },
      set(newValue) {
        if (newValue === undefined) {
          val = value;
        } else {
          val = newValue;
        }
      },
      enumerable: true,
      configurable: true
    });
  };
}

class Settings {
  @defaultValue(10)
  timeout?: number;

  @defaultValue("en")
  language?: string;
}

// Deprecated decorator
function deprecated(message?: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      console.warn(\`\${propertyKey} is deprecated. \${message || ""}\`);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class OldApi {
  @deprecated("Use newMethod instead")
  oldMethod(): void {
    console.log("Old method");
  }

  newMethod(): void {
    console.log("New method");
  }
}

// Debounce decorator
function debounce(delay: number) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    let timeoutId: NodeJS.Timeout;

    descriptor.value = function(...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };

    return descriptor;
  };
}

class SearchComponent {
  @debounce(300)
  onSearchInput(query: string): void {
    console.log(\`Searching for: \${query}\`);
  }
}

// Authorization decorator
function authorize(...roles: string[]) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const userRole = (this as any).currentUserRole;
      if (!roles.includes(userRole)) {
        throw new Error("Unauthorized");
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class AdminController {
  currentUserRole: string = "user";

  @authorize("admin", "moderator")
  deleteUser(userId: number): void {
    console.log(\`Deleting user \${userId}\`);
  }
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Method decorators modify method behavior for logging, validation,
          memoization, and authorization. Property decorators configure property
          behavior. Chain multiple decorators for composed functionality.
        </InfoBox>
      </Section>

      <Section title="3. Parameter & Accessor Decorators">
        <p className="text-gray-700 dark:text-gray-300">
          Parameter decorators annotate method parameters for validation and
          injection. Accessor decorators work with getters and setters.
        </p>

        <CodeBlock title="Parameter and accessor decorator examples">
          {`// Parameter decorator
function required(
  target: any,
  propertyKey: string,
  parameterIndex: number
) {
  const existingRequired: number[] = Reflect.getMetadata("required", target, propertyKey) || [];
  existingRequired.push(parameterIndex);
  Reflect.defineMetadata("required", existingRequired, target, propertyKey);
}

function validate(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const requiredIndices: number[] = Reflect.getMetadata("required", target, propertyKey) || [];

    for (const index of requiredIndices) {
      if (args[index] == null) {
        throw new Error(\`Parameter at index \${index} is required\`);
      }
    }

    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class UserController {
  @validate
  createUser(@required name: string, @required email: string, age?: number): User {
    return { name, email, age } as User;
  }
}

// Parameter validation decorator
function validateType(type: "string" | "number" | "boolean") {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const types: string[] = Reflect.getMetadata("paramTypes", target, propertyKey) || [];
    types[parameterIndex] = type;
    Reflect.defineMetadata("paramTypes", types, target, propertyKey);
  };
}

// Accessor decorator (getter/setter)
function configurable(value: boolean) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.configurable = value;
    return descriptor;
  };
}

class Person {
  private _name: string = "";

  @configurable(false)
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}

// Accessor decorator with validation
function minLength(length: number) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalSet = descriptor.set!;

    descriptor.set = function(value: string) {
      if (value.length < length) {
        throw new Error(\`\${propertyKey} must be at least \${length} characters\`);
      }
      originalSet.call(this, value);
    };

    return descriptor;
  };
}

class User {
  private _password: string = "";

  get password(): string {
    return this._password;
  }

  @minLength(8)
  set password(value: string) {
    this._password = value;
  }
}

// Dependency injection with parameter decorators
const Injectable = Symbol("injectable");
const Inject = (token: any) => {
  return function(target: any, propertyKey: string, parameterIndex: number) {
    const injectTokens = Reflect.getMetadata(Injectable, target) || [];
    injectTokens[parameterIndex] = token;
    Reflect.defineMetadata(Injectable, injectTokens, target);
  };
};

class Database {
  constructor(public connectionString: string) {}
}

class UserRepository {
  constructor(
    @Inject(Database) private db: Database,
    @Inject("LoggerService") private logger: any
  ) {}
}

// Transform decorator
function uppercase(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalSet = descriptor.set!;

  descriptor.set = function(value: string) {
    originalSet.call(this, value.toUpperCase());
  };

  return descriptor;
}

class Form {
  private _country: string = "";

  get country(): string {
    return this._country;
  }

  @uppercase
  set country(value: string) {
    this._country = value;
  }
}`}
        </CodeBlock>

        <InfoBox type="important">
          Parameter decorators enable dependency injection and parameter
          validation. Accessor decorators add validation, transformation, and
          configuration to getters/setters. Use with reflect-metadata for
          advanced scenarios.
        </InfoBox>
      </Section>

      <Section title="4. Mixins">
        <p className="text-gray-700 dark:text-gray-300">
          Mixins provide a way to add functionality to classes through
          composition rather than inheritance, enabling multiple inheritance
          patterns in TypeScript.
        </p>

        <CodeBlock title="Mixin examples">
          {`// Basic mixin pattern
type Constructor<T = {}> = new (...args: any[]) => T;

// Mixin function
function Timestamped<T extends Constructor>(Base: T) {
  return class extends Base {
    timestamp = new Date();

    getTimestamp(): Date {
      return this.timestamp;
    }
  };
}

class User {
  constructor(public name: string) {}
}

const TimestampedUser = Timestamped(User);
const user = new TimestampedUser("John");
console.log(user.name, user.getTimestamp());

// Multiple mixins
function Activatable<T extends Constructor>(Base: T) {
  return class extends Base {
    isActive = false;

    activate(): void {
      this.isActive = true;
    }

    deactivate(): void {
      this.isActive = false;
    }
  };
}

function Deletable<T extends Constructor>(Base: T) {
  return class extends Base {
    isDeleted = false;

    delete(): void {
      this.isDeleted = true;
    }

    restore(): void {
      this.isDeleted = false;
    }
  };
}

// Compose multiple mixins
class Product {
  constructor(public name: string, public price: number) {}
}

const EnhancedProduct = Timestamped(Activatable(Deletable(Product)));
const product = new EnhancedProduct("Widget", 19.99);
product.activate();
product.delete();
console.log(product.isActive, product.isDeleted, product.timestamp);

// Generic mixin with constraints
function Searchable<T extends Constructor<{ name: string }>>(Base: T) {
  return class extends Base {
    search(query: string): boolean {
      return this.name.toLowerCase().includes(query.toLowerCase());
    }
  };
}

const SearchableUser = Searchable(User);
const searchUser = new SearchableUser("John Doe");
console.log(searchUser.search("john"));  // true

// Mixin with additional properties
function Taggable<T extends Constructor>(Base: T) {
  return class extends Base {
    tags: string[] = [];

    addTag(tag: string): void {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
    }

    removeTag(tag: string): void {
      this.tags = this.tags.filter(t => t !== tag);
    }

    hasTag(tag: string): boolean {
      return this.tags.includes(tag);
    }
  };
}

// Mixin with methods
function Loggable<T extends Constructor>(Base: T) {
  return class extends Base {
    log(message: string): void {
      console.log(\`[\${this.constructor.name}] \${message}\`);
    }

    logError(error: Error): void {
      console.error(\`[\${this.constructor.name}] \${error.message}\`);
    }
  };
}

// Practical: Entity mixin
function Entity<T extends Constructor>(Base: T) {
  return class extends Base {
    id: number = Math.floor(Math.random() * 10000);
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    update(): void {
      this.updatedAt = new Date();
    }
  };
}

class Post {
  constructor(public title: string, public content: string) {}
}

const EntityPost = Entity(Timestamped(Loggable(Post)));
const post = new EntityPost("Title", "Content");
post.log("Post created");
console.log(post.id, post.createdAt);

// Mixin with interfaces
interface ITimestamped {
  timestamp: Date;
  getTimestamp(): Date;
}

interface IActivatable {
  isActive: boolean;
  activate(): void;
  deactivate(): void;
}

// Type helper for mixed class
type Mixed<T extends Constructor> = T & Constructor<ITimestamped & IActivatable>;

function applyMixins<T extends Constructor>(Base: T): Mixed<T> {
  return Timestamped(Activatable(Base)) as Mixed<T>;
}

// Alternative mixin syntax using Object.assign
class Disposable {
  isDisposed: boolean = false;

  dispose(): void {
    this.isDisposed = true;
  }
}

class Activatable2 {
  isActive: boolean = false;

  activate(): void {
    this.isActive = true;
  }
}

class SmartObject implements Disposable, Activatable2 {
  // Placeholder properties
  isDisposed: boolean = false;
  isActive: boolean = false;

  // Placeholder methods  dispose!: () => void;
  activate!: () => void;

  interact(): void {
    this.activate();
  }
}

// Apply mixins
applyMixins(SmartObject, [Disposable, Activatable2]);

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

// Conditional mixins
function DebugMixin<T extends Constructor>(Base: T, debug: boolean) {
  if (!debug) return Base;

  return class extends Base {
    debug(message: string): void {
      console.log(\`[DEBUG] \${message}\`);
    }
  };
}

const ProductionClass = DebugMixin(Product, false);
const DevelopmentClass = DebugMixin(Product, true);

// Mixin with state
function Cacheable<T extends Constructor>(Base: T) {
  return class extends Base {
    private cache = new Map<string, any>();

    getCached<R>(key: string, factory: () => R): R {
      if (this.cache.has(key)) {
        return this.cache.get(key);
      }
      const value = factory();
      this.cache.set(key, value);
      return value;
    }

    clearCache(): void {
      this.cache.clear();
    }
  };
}

// Serialization mixin
function Serializable<T extends Constructor>(Base: T) {
  return class extends Base {
    toJSON(): object {
      return { ...this };
    }

    toString(): string {
      return JSON.stringify(this.toJSON());
    }
  };
}

const SerializableProduct = Serializable(Product);
const serProduct = new SerializableProduct("Widget", 19.99);
console.log(serProduct.toString());`}
        </CodeBlock>

        <InfoBox type="tip">
          Mixins enable multiple inheritance by composing functionality. Use
          them to add cross-cutting concerns like timestamps, logging, caching,
          and validation without deep inheritance hierarchies. Combine multiple
          mixins for flexible composition.
        </InfoBox>
      </Section>

      <Section title="5. Practical Decorator & Mixin Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world patterns combining decorators and mixins for frameworks,
          validation, authorization, and dependency injection.
        </p>

        <CodeBlock title="Practical decorator and mixin patterns">
          {`// Complete controller example with decorators
function Controller(route: string) {
  return function(constructor: Function) {
    Reflect.defineMetadata("route", route, constructor);
  };
}

function Get(path: string) {
  return function(target: any, propertyKey: string) {
    const routes = Reflect.getMetadata("routes", target.constructor) || [];
    routes.push({ method: "GET", path, handler: propertyKey });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
}

function Post(path: string) {
  return function(target: any, propertyKey: string) {
    const routes = Reflect.getMetadata("routes", target.constructor) || [];
    routes.push({ method: "POST", path, handler: propertyKey });
    Reflect.defineMetadata("routes", routes, target.constructor);
  };
}

@Controller("/api/users")
class UserController {
  @Get("/")
  getAll(): User[] {
    return [];
  }

  @Get("/:id")
  getById(id: number): User {
    return {} as User;
  }

  @Post("/")
  create(data: CreateUserDto): User {
    return {} as User;
  }
}

// Validation framework
function Validate(schema: any) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      const validated = await schema.validate(args[0]);
      return originalMethod.call(this, validated);
    };

    return descriptor;
  };
}

class UserService {
  @Validate(userSchema)
  async createUser(data: any): Promise<User> {
    return data as User;
  }
}

// Transaction decorator
function Transactional(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function(...args: any[]) {
    const transaction = await startTransaction();
    try {
      const result = await originalMethod.apply(this, args);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };

  return descriptor;
}

class OrderService {
  @Transactional
  async createOrder(order: CreateOrderDto): Promise<Order> {
    // Database operations wrapped in transaction
    return {} as Order;
  }
}

// Complete mixin system
type GConstructor<T = {}> = new (...args: any[]) => T;

// Base mixins
const TimestampMixin = <T extends GConstructor>(Base: T) =>
  class extends Base {
    createdAt = new Date();
    updatedAt = new Date();
  };

const SoftDeleteMixin = <T extends GConstructor>(Base: T) =>
  class extends Base {
    deletedAt: Date | null = null;

    softDelete() {
      this.deletedAt = new Date();
    }

    restore() {
      this.deletedAt = null;
    }
  };

const VersionMixin = <T extends GConstructor>(Base: T) =>
  class extends Base {
    version = 1;

    incrementVersion() {
      this.version++;
    }
  };

// Compose all mixins
class BaseEntity {
  id: number = 0;
}

class FullEntity extends VersionMixin(
  SoftDeleteMixin(TimestampMixin(BaseEntity))
) {
  constructor(id: number) {
    super();
    this.id = id;
  }
}

const entity = new FullEntity(1);
entity.softDelete();
entity.incrementVersion();
console.log(entity.deletedAt, entity.version);

// Type-safe decorator factory
function createDecorator<T>(
  handler: (target: any, key: string, descriptor: PropertyDescriptor, options: T) => void
) {
  return (options: T) => {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
      handler(target, key, descriptor, options);
    };
  };
}

const Retry = createDecorator<{ attempts: number; delay: number }>(
  (target, key, descriptor, options) => {
    const original = descriptor.value;

    descriptor.value = async function(...args: any[]) {
      for (let i = 0; i < options.attempts; i++) {
        try {
          return await original.apply(this, args);
        } catch (error) {
          if (i === options.attempts - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, options.delay));
        }
      }
    };
  }
);

class ApiClient {
  @Retry({ attempts: 3, delay: 1000 })
  async fetch(url: string): Promise<any> {
    return fetch(url).then(r => r.json());
  }
}`}
        </CodeBlock>

        <InfoBox type="important">
          Combine decorators and mixins for powerful composition patterns. Use
          decorators for cross-cutting concerns (logging, validation,
          authorization) and mixins for reusable functionality (timestamps,
          soft-delete, versioning). Enable experimentalDecorators in tsconfig.
        </InfoBox>
      </Section>
    </div>
  );
}
