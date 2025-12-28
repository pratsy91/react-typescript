import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function FunctionUtilitiesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Function Utility Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript provides utilities for extracting types from functions and
        constructors: Parameters&lt;T&gt;, ConstructorParameters&lt;T&gt;,
        ReturnType&lt;T&gt;, and InstanceType&lt;T&gt;.
      </p>

      <Section title="1. Parameters<T>">
        <p className="text-gray-700 dark:text-gray-300">
          Parameters&lt;T&gt; extracts the parameter types of a function type as
          a tuple. Essential for creating type-safe wrappers and decorators.
        </p>

        <CodeBlock title="Parameters<T> examples">
          {`// Basic Parameters usage
function greet(name: string, age: number): string {
  return \`Hello \${name}, you are \${age} years old\`;
}

type GreetParams = Parameters<typeof greet>;
// [name: string, age: number]

const params: GreetParams = ["John", 30];
greet(...params);  // Type-safe spreading

// Parameters with optional parameters
function sendEmail(to: string, subject: string, body?: string): void {
  // Send email
}

type EmailParams = Parameters<typeof sendEmail>;
// [to: string, subject: string, body?: string]

// Parameters with rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

type SumParams = Parameters<typeof sum>;
// [numbers: ...number[]]

// Parameters with default parameters
function createUser(name: string, role: string = "user"): User {
  return { id: 1, name, role } as User;
}

type CreateUserParams = Parameters<typeof createUser>;
// [name: string, role?: string]

// Parameters for arrow functions
const add = (a: number, b: number): number => a + b;
type AddParams = Parameters<typeof add>;
// [a: number, b: number]

// Parameters with complex types
interface Config {
  apiUrl: string;
  timeout: number;
}

function fetchData(url: string, config: Config, callback: (data: any) => void): Promise<any> {
  return Promise.resolve();
}

type FetchParams = Parameters<typeof fetchData>;
// [url: string, config: Config, callback: (data: any) => void]

// Extract specific parameter
type FirstParam<T extends (...args: any[]) => any> = Parameters<T>[0];
type SecondParam<T extends (...args: any[]) => any> = Parameters<T>[1];

type UrlParam = FirstParam<typeof fetchData>;  // string
type ConfigParam = SecondParam<typeof fetchData>;  // Config

// Parameters for generic functions
function identity<T>(value: T): T {
  return value;
}

type IdentityParams = Parameters<typeof identity>;
// [value: unknown]

function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

type MapParams = Parameters<typeof map>;
// [arr: unknown[], fn: (item: unknown) => unknown]

// Parameters for function types
type Handler = (event: MouseEvent, data: string) => void;
type HandlerParams = Parameters<Handler>;
// [event: MouseEvent, data: string]

// Parameters with union function types
type LogFunction = ((message: string) => void) | ((level: string, message: string) => void);
type LogParams = Parameters<LogFunction>;
// [message: string] | [level: string, message: string]

// Create function wrapper
function withLogging<T extends (...args: any[]) => any>(
  fn: T,
  logger: (...args: Parameters<T>) => void
): T {
  return ((...args: Parameters<T>) => {
    logger(...args);
    return fn(...args);
  }) as T;
}

const loggedGreet = withLogging(greet, (name, age) => {
  console.log(\`Calling greet with: \${name}, \${age}\`);
});

// Parameters for async functions
async function fetchUser(id: number): Promise<User> {
  return {} as User;
}

type FetchUserParams = Parameters<typeof fetchUser>;
// [id: number]

// Parameters with destructured params
function updateUser({ id, name, email }: { id: number; name: string; email: string }): void {
  // Update user
}

type UpdateUserParams = Parameters<typeof updateUser>;
// [{ id: number; name: string; email: string }]

// Partial application helper
function partial<T extends (...args: any[]) => any, P extends Partial<Parameters<T>>>(
  fn: T,
  ...partialArgs: P
): (...args: any[]) => ReturnType<T> {
  return (...remainingArgs: any[]) => {
    return fn(...[...partialArgs, ...remainingArgs]);
  };
}

const greetJohn = partial(greet, "John");
greetJohn(30);  // "Hello John, you are 30 years old"

// Parameters for class methods
class UserService {
  createUser(name: string, email: string): User {
    return {} as User;
  }
  
  updateUser(id: number, data: Partial<User>): User {
    return {} as User;
  }
}

type CreateUserMethodParams = Parameters<UserService["createUser"]>;
// [name: string, email: string]

// Parameters with this type
function withThis(this: { value: number }, multiplier: number): number {
  return this.value * multiplier;
}

type WithThisParams = Parameters<typeof withThis>;
// [multiplier: number]
// Note: this type is not included in Parameters

// Validation wrapper
function validate<T extends (...args: any[]) => any>(
  fn: T,
  validator: (...args: Parameters<T>) => boolean
): T {
  return ((...args: Parameters<T>) => {
    if (!validator(...args)) {
      throw new Error("Validation failed");
    }
    return fn(...args);
  }) as T;
}

const validatedGreet = validate(
  greet,
  (name, age) => name.length > 0 && age > 0
);

// Memoization helper
function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Rate limiting
function rateLimit<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let lastCall = 0;
  
  return async (...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;
    
    if (timeSinceLastCall < delay) {
      await new Promise(resolve => setTimeout(resolve, delay - timeSinceLastCall));
    }
    
    lastCall = Date.now();
    return fn(...args);
  };
}

// Retry logic
async function retry<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  maxRetries: number,
  ...args: Parameters<T>
): Promise<ReturnType<T>> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn(...args);
    } catch (error) {
      lastError = error as Error;
    }
  }
  
  throw lastError!;
}

// Debounce
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Throttle
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Type-safe event emitter
class TypedEmitter<Events extends Record<string, (...args: any[]) => void>> {
  private listeners = new Map<keyof Events, Function[]>();

  on<K extends keyof Events>(event: K, handler: Events[K]): void {
    const handlers = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...handlers, handler]);
  }

  emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): void {
    const handlers = this.listeners.get(event) ?? [];
    handlers.forEach(handler => handler(...args));
  }
}

type AppEvents = {
  userLogin: (userId: number, timestamp: Date) => void;
  userLogout: (userId: number) => void;
  error: (error: Error) => void;
};

const emitter = new TypedEmitter<AppEvents>();
emitter.on("userLogin", (userId, timestamp) => {
  console.log(\`User \${userId} logged in at \${timestamp}\`);
});

emitter.emit("userLogin", 123, new Date());  // Type-safe!`}
        </CodeBlock>

        <InfoBox type="info">
          Parameters&lt;T&gt; extracts function parameter types as a tuple. Use
          it for type-safe function wrappers, decorators, partial application,
          memoization, and event emitters.
        </InfoBox>
      </Section>

      <Section title="2. ConstructorParameters<T>">
        <p className="text-gray-700 dark:text-gray-300">
          ConstructorParameters&lt;T&gt; extracts the parameter types of a
          constructor function, returning a tuple of constructor argument types.
        </p>

        <CodeBlock title="ConstructorParameters<T> examples">
          {`// Basic ConstructorParameters usage
class User {
  constructor(public name: string, public age: number) {}
}

type UserConstructorParams = ConstructorParameters<typeof User>;
// [name: string, age: number]

const params: UserConstructorParams = ["John", 30];
const user = new User(...params);

// ConstructorParameters with optional parameters
class Product {
  constructor(
    public name: string,
    public price: number,
    public description?: string
  ) {}
}

type ProductParams = ConstructorParameters<typeof Product>;
// [name: string, price: number, description?: string]

// ConstructorParameters with default parameters
class Config {
  constructor(
    public apiUrl: string,
    public timeout: number = 5000,
    public retries: number = 3
  ) {}
}

type ConfigParams = ConstructorParameters<typeof Config>;
// [apiUrl: string, timeout?: number, retries?: number]

// ConstructorParameters for built-in types
type DateParams = ConstructorParameters<typeof Date>;
// [value: string | number | Date] | []

type ArrayParams = ConstructorParameters<typeof Array>;
// [arrayLength?: number] | any[]

type ErrorParams = ConstructorParameters<typeof Error>;
// [message?: string]

// Factory function with ConstructorParameters
function createInstance<T extends new (...args: any[]) => any>(
  Constructor: T,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  return new Constructor(...args);
}

const user1 = createInstance(User, "Alice", 25);
const product1 = createInstance(Product, "Widget", 19.99);

// Dependency injection
class Database {
  constructor(public connectionString: string) {}
}

class UserRepository {
  constructor(private db: Database) {}
}

type UserRepoParams = ConstructorParameters<typeof UserRepository>;
// [db: Database]

class Container {
  private instances = new Map<any, any>();

  register<T extends new (...args: any[]) => any>(
    Constructor: T,
    ...args: ConstructorParameters<T>
  ): void {
    this.instances.set(Constructor, new Constructor(...args));
  }

  resolve<T extends new (...args: any[]) => any>(
    Constructor: T
  ): InstanceType<T> {
    return this.instances.get(Constructor);
  }
}

const container = new Container();
container.register(Database, "postgresql://localhost");
container.register(UserRepository, container.resolve(Database));

// Abstract class parameters
abstract class Animal {
  constructor(public name: string, public age: number) {}
  abstract makeSound(): string;
}

class Dog extends Animal {
  constructor(name: string, age: number, public breed: string) {
    super(name, age);
  }
  
  makeSound(): string {
    return "Woof!";
  }
}

type DogParams = ConstructorParameters<typeof Dog>;
// [name: string, age: number, breed: string]

// Generic class parameters
class Container<T> {
  constructor(public value: T) {}
}

type StringContainerParams = ConstructorParameters<typeof Container<string>>;
// [value: string]

type NumberContainerParams = ConstructorParameters<typeof Container<number>>;
// [value: number]

// Builder pattern
class UserBuilder {
  private name?: string;
  private age?: number;
  private email?: string;

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setAge(age: number): this {
    this.age = age;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  build(): User {
    if (!this.name || !this.age) {
      throw new Error("Name and age are required");
    }
    return new User(this.name, this.age);
  }
}

// Validate constructor params
function validateConstructor<T extends new (...args: any[]) => any>(
  Constructor: T,
  validator: (...args: ConstructorParameters<T>) => boolean,
  ...args: ConstructorParameters<T>
): InstanceType<T> | null {
  if (validator(...args)) {
    return new Constructor(...args);
  }
  return null;
}

const validatedUser = validateConstructor(
  User,
  (name, age) => name.length > 0 && age > 0,
  "John",
  30
);

// Constructor wrapper
function withInitialization<T extends new (...args: any[]) => any>(
  Constructor: T,
  init: (instance: InstanceType<T>) => void
): new (...args: ConstructorParameters<T>) => InstanceType<T> {
  return class extends Constructor {
    constructor(...args: ConstructorParameters<T>) {
      super(...args);
      init(this);
    }
  };
}

const InitializedUser = withInitialization(User, (user) => {
  console.log(\`User created: \${user.name}\`);
});

// Mixin pattern
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<T extends Constructor>(Base: T) {
  return class extends Base {
    timestamp = new Date();
    
    constructor(...args: any[]) {
      super(...args);
    }
  };
}

const TimestampedUser = Timestamped(User);
type TimestampedUserParams = ConstructorParameters<typeof TimestampedUser>;
// [name: string, age: number]

// Singleton pattern
function singleton<T extends new (...args: any[]) => any>(
  Constructor: T
): new (...args: ConstructorParameters<T>) => InstanceType<T> {
  let instance: InstanceType<T>;
  
  return class {
    constructor(...args: ConstructorParameters<T>) {
      if (!instance) {
        instance = new Constructor(...args);
      }
      return instance;
    }
  } as any;
}

const SingletonUser = singleton(User);
const user2 = new SingletonUser("Alice", 25);
const user3 = new SingletonUser("Bob", 30);  // Returns same instance as user2

// Pool pattern
class ObjectPool<T> {
  private available: T[] = [];
  private inUse = new Set<T>();

  constructor(
    private Constructor: new (...args: any[]) => T,
    private params: ConstructorParameters<typeof Constructor>,
    initialSize: number = 10
  ) {
    for (let i = 0; i < initialSize; i++) {
      this.available.push(new Constructor(...params));
    }
  }

  acquire(): T {
    let obj = this.available.pop();
    if (!obj) {
      obj = new this.Constructor(...this.params);
    }
    this.inUse.add(obj);
    return obj;
  }

  release(obj: T): void {
    if (this.inUse.has(obj)) {
      this.inUse.delete(obj);
      this.available.push(obj);
    }
  }
}

// Constructor parameter validation
type ValidateParams<T extends new (...args: any[]) => any> = {
  [K in keyof ConstructorParameters<T>]: (value: ConstructorParameters<T>[K]) => boolean;
};

function createWithValidation<T extends new (...args: any[]) => any>(
  Constructor: T,
  validators: Partial<ValidateParams<T>>,
  ...args: ConstructorParameters<T>
): InstanceType<T> {
  // Validate each parameter
  for (let i = 0; i < args.length; i++) {
    const validator = validators[i as keyof ValidateParams<T>];
    if (validator && !validator(args[i])) {
      throw new Error(\`Parameter \${i} validation failed\`);
    }
  }
  return new Constructor(...args);
}`}
        </CodeBlock>

        <InfoBox type="tip">
          ConstructorParameters&lt;T&gt; extracts constructor parameter types.
          Use it for factory functions, dependency injection, object pools,
          singleton patterns, and constructor wrappers.
        </InfoBox>
      </Section>

      <Section title="3. ReturnType<T>">
        <p className="text-gray-700 dark:text-gray-300">
          ReturnType&lt;T&gt; extracts the return type of a function. Essential
          for deriving types from function returns without duplication.
        </p>

        <CodeBlock title="ReturnType<T> examples">
          {`// Basic ReturnType usage
function getUser(): { id: number; name: string; email: string } {
  return { id: 1, name: "John", email: "john@example.com" };
}

type UserType = ReturnType<typeof getUser>;
// { id: number; name: string; email: string }

const user: UserType = getUser();

// ReturnType with arrow functions
const createProduct = () => ({
  id: 1,
  name: "Widget",
  price: 19.99
});

type Product = ReturnType<typeof createProduct>;
// { id: number; name: string; price: number }

// ReturnType with async functions
async function fetchData(): Promise<{ data: string[] }> {
  return { data: [] };
}

type FetchResult = ReturnType<typeof fetchData>;
// Promise<{ data: string[] }>

type UnwrappedResult = Awaited<ReturnType<typeof fetchData>>;
// { data: string[] }

// ReturnType with generic functions
function identity<T>(value: T): T {
  return value;
}

type IdentityReturn = ReturnType<typeof identity>;
// unknown

type SpecificReturn = ReturnType<typeof identity<string>>;
// string

// ReturnType with union return types
function getValue(): string | number {
  return Math.random() > 0.5 ? "text" : 42;
}

type Value = ReturnType<typeof getValue>;
// string | number

// ReturnType with conditional return types
function process<T extends string | number>(
  value: T
): T extends string ? string[] : number[] {
  return (Array.isArray(value) ? value : [value]) as any;
}

type ProcessReturn = ReturnType<typeof process>;
// string[] | number[]

// ReturnType for API functions
async function api<T>(endpoint: string): Promise<{
  data: T;
  status: number;
  headers: Record<string, string>;
}> {
  return {} as any;
}

type ApiResponse = Awaited<ReturnType<typeof api>>;
// { data: unknown; status: number; headers: Record<string, string> }

// ReturnType with type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

type IsStringReturn = ReturnType<typeof isString>;
// boolean

// ReturnType for factory functions
function createStore<T>() {
  return {
    state: {} as T,
    setState: (newState: Partial<T>) => {},
    getState: (): T => ({} as T)
  };
}

type Store = ReturnType<typeof createStore<{ count: number }>>;
// { state: { count: number }; setState: ...; getState: ... }

// ReturnType for class methods
class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  
  multiply(a: number, b: number): number {
    return a * b;
  }
}

type AddReturn = ReturnType<Calculator["add"]>;
// number

// ReturnType with discriminated unions
function createAction(type: "increment"): { type: "increment"; payload: number };
function createAction(type: "decrement"): { type: "decrement"; payload: number };
function createAction(type: "reset"): { type: "reset" };
function createAction(type: string): any {
  return { type };
}

type Action = ReturnType<typeof createAction>;
// { type: "increment"; payload: number } | { type: "decrement"; payload: number } | { type: "reset" }

// Derive state from reducer
function reducer(state: State, action: Action): State {
  return state;
}

type State = ReturnType<typeof reducer>;

// ReturnType for builders
class QueryBuilder {
  where(condition: string): this {
    return this;
  }
  
  orderBy(field: string): this {
    return this;
  }
  
  execute(): Promise<any[]> {
    return Promise.resolve([]);
  }
}

type QueryResult = Awaited<ReturnType<QueryBuilder["execute"]>>;
// any[]

// ReturnType with hooks
function useCounter(initial: number) {
  const [count, setCount] = useState(initial);
  
  return {
    count,
    increment: () => setCount(count + 1),
    decrement: () => setCount(count - 1),
    reset: () => setCount(initial)
  };
}

type CounterHook = ReturnType<typeof useCounter>;
// { count: number; increment: () => void; decrement: () => void; reset: () => void }

// ReturnType for data transformers
function transformUser(data: any) {
  return {
    id: data.id,
    fullName: \`\${data.firstName} \${data.lastName}\`,
    email: data.email.toLowerCase(),
    age: parseInt(data.age)
  };
}

type TransformedUser = ReturnType<typeof transformUser>;
// { id: any; fullName: string; email: string; age: number }

// ReturnType with Promise utilities
async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  return fn();
}

type RetryResult<T> = ReturnType<typeof withRetry<T>>;
// Promise<T>

// Compose function return types
type Fn = (...args: any[]) => any;

function compose<F1 extends Fn, F2 extends Fn>(
  f1: F1,
  f2: F2
): (arg: Parameters<F1>[0]) => ReturnType<F2> {
  return (arg) => f2(f1(arg));
}

const toUpper = (s: string) => s.toUpperCase();
const getLength = (s: string) => s.length;

const composed = compose(toUpper, getLength);
type ComposedReturn = ReturnType<typeof composed>;
// number

// ReturnType for error handlers
function handleError(error: Error): {
  message: string;
  code: string;
  timestamp: Date;
} {
  return {
    message: error.message,
    code: "ERROR",
    timestamp: new Date()
  };
}

type ErrorResult = ReturnType<typeof handleError>;
// { message: string; code: string; timestamp: Date }

// ReturnType with dependency injection
function createService<T>(dependency: T) {
  return {
    dependency,
    execute: () => {},
    cleanup: () => {}
  };
}

type Service<T> = ReturnType<typeof createService<T>>;
// { dependency: T; execute: () => void; cleanup: () => void }

// Infer return type in generics
function processArray<T, R>(
  arr: T[],
  fn: (item: T) => R
): ReturnType<typeof fn>[] {
  return arr.map(fn);
}

// Use ReturnType for caching
const cache = new Map<string, ReturnType<typeof getUser>>();

function getCachedUser(id: string): ReturnType<typeof getUser> {
  if (cache.has(id)) {
    return cache.get(id)!;
  }
  const user = getUser();
  cache.set(id, user);
  return user;
}`}
        </CodeBlock>

        <InfoBox type="important">
          ReturnType&lt;T&gt; extracts function return types. Use it to derive
          types from functions, avoid type duplication, create type-safe caches,
          and compose function types. Combine with Awaited for async functions.
        </InfoBox>
      </Section>

      <Section title="4. InstanceType<T>">
        <p className="text-gray-700 dark:text-gray-300">
          InstanceType&lt;T&gt; extracts the instance type of a constructor
          function, returning the type of the created object.
        </p>

        <CodeBlock title="InstanceType<T> examples">
          {`// Basic InstanceType usage
class User {
  constructor(public name: string, public age: number) {}
  
  greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }
}

type UserInstance = InstanceType<typeof User>;
// User

const user: UserInstance = new User("John", 30);

// InstanceType with built-in types
type DateInstance = InstanceType<typeof Date>;
// Date

type ErrorInstance = InstanceType<typeof Error>;
// Error

type ArrayInstance = InstanceType<typeof Array>;
// any[]

// InstanceType with generics
class Container<T> {
  constructor(public value: T) {}
}

type StringContainer = InstanceType<typeof Container<string>>;
// Container<string>

type NumberContainer = InstanceType<typeof Container<number>>;
// Container<number>

// InstanceType for factory pattern
function createFactory<T extends new (...args: any[]) => any>(
  Constructor: T
): () => InstanceType<T> {
  return () => new Constructor();
}

const userFactory = createFactory(User);
type FactoryUser = ReturnType<typeof userFactory>;
// User

// InstanceType with abstract classes
abstract class Animal {
  abstract makeSound(): string;
}

class Dog extends Animal {
  makeSound(): string {
    return "Woof!";
  }
}

type DogInstance = InstanceType<typeof Dog>;
// Dog

// InstanceType for dependency injection
class Database {
  connect(): void {}
}

class UserService {
  constructor(private db: Database) {}
}

class Container {
  private instances = new Map<any, any>();

  register<T extends new (...args: any[]) => any>(
    Constructor: T,
    factory: () => InstanceType<T>
  ): void {
    this.instances.set(Constructor, factory());
  }

  resolve<T extends new (...args: any[]) => any>(
    Constructor: T
  ): InstanceType<T> {
    return this.instances.get(Constructor);
  }
}

const container = new Container();
container.register(Database, () => new Database());
container.register(UserService, () => new UserService(container.resolve(Database)));

// InstanceType for type-safe registries
class Registry<T extends new (...args: any[]) => any> {
  private map = new Map<string, InstanceType<T>>();

  register(key: string, instance: InstanceType<T>): void {
    this.map.set(key, instance);
  }

  get(key: string): InstanceType<T> | undefined {
    return this.map.get(key);
  }
}

const userRegistry = new Registry<typeof User>();
userRegistry.register("john", new User("John", 30));
const retrievedUser = userRegistry.get("john");  // User | undefined

// InstanceType with mixins
type Constructor = new (...args: any[]) => {};

function Timestamped<T extends Constructor>(Base: T) {
  return class extends Base {
    timestamp = new Date();
  };
}

function Tagged<T extends Constructor>(Base: T) {
  return class extends Base {
    tag = "tagged";
  };
}

const TimestampedUser = Timestamped(User);
const TaggedTimestampedUser = Tagged(TimestampedUser);

type FinalUser = InstanceType<typeof TaggedTimestampedUser>;
// Has User properties + timestamp + tag

// InstanceType for object pools
class ObjectPool<T extends new (...args: any[]) => any> {
  private available: InstanceType<T>[] = [];
  private inUse = new Set<InstanceType<T>>();

  constructor(
    private Constructor: T,
    private createArgs: ConstructorParameters<T>,
    initialSize: number = 10
  ) {
    for (let i = 0; i < initialSize; i++) {
      this.available.push(new Constructor(...createArgs));
    }
  }

  acquire(): InstanceType<T> {
    let obj = this.available.pop();
    if (!obj) {
      obj = new this.Constructor(...this.createArgs);
    }
    this.inUse.add(obj);
    return obj;
  }

  release(obj: InstanceType<T>): void {
    if (this.inUse.has(obj)) {
      this.inUse.delete(obj);
      this.available.push(obj);
    }
  }
}

const userPool = new ObjectPool(User, ["Default", 0], 5);
const pooledUser = userPool.acquire();  // User

// InstanceType for plugin systems
interface Plugin {
  name: string;
  init(): void;
}

class PluginManager<T extends new () => Plugin> {
  private plugins: InstanceType<T>[] = [];

  register(Plugin: T): void {
    const plugin = new Plugin();
    plugin.init();
    this.plugins.push(plugin);
  }

  getAll(): InstanceType<T>[] {
    return this.plugins;
  }
}

class LoggerPlugin implements Plugin {
  name = "logger";
  init(): void {
    console.log("Logger initialized");
  }
}

const manager = new PluginManager<typeof LoggerPlugin>();
manager.register(LoggerPlugin);

// InstanceType with decorators
function Injectable<T extends new (...args: any[]) => any>(Constructor: T) {
  return class extends Constructor {
    _injectable = true;
  };
}

@Injectable
class ApiService {
  fetch(): void {}
}

type ServiceInstance = InstanceType<typeof ApiService>;
// Has _injectable property

// InstanceType for event emitters
class TypedEventEmitter<T extends Record<string, new (...args: any[]) => any>> {
  private listeners = new Map<keyof T, Set<(event: any) => void>>();

  on<K extends keyof T>(
    event: K,
    handler: (event: InstanceType<T[K]>) => void
  ): void {
    const handlers = this.listeners.get(event) ?? new Set();
    handlers.add(handler);
    this.listeners.set(event, handlers);
  }

  emit<K extends keyof T>(event: K, data: InstanceType<T[K]>): void {
    const handlers = this.listeners.get(event) ?? new Set();
    handlers.forEach(handler => handler(data));
  }
}

class UserLoginEvent {
  constructor(public userId: number, public timestamp: Date) {}
}

class UserLogoutEvent {
  constructor(public userId: number) {}
}

type AppEvents = {
  login: typeof UserLoginEvent;
  logout: typeof UserLogoutEvent;
};

const emitter = new TypedEventEmitter<AppEvents>();
emitter.on("login", (event) => {
  // event is InstanceType<typeof UserLoginEvent>
  console.log(event.userId, event.timestamp);
});

emitter.emit("login", new UserLoginEvent(123, new Date()));

// InstanceType for state machines
class State {
  enter(): void {}
  exit(): void {}
}

class IdleState extends State {
  enter(): void {
    console.log("Entering idle state");
  }
}

class ActiveState extends State {
  enter(): void {
    console.log("Entering active state");
  }
}

class StateMachine<T extends typeof State> {
  private current: InstanceType<T> | null = null;

  transition(StateClass: T): void {
    if (this.current) {
      this.current.exit();
    }
    this.current = new StateClass();
    this.current.enter();
  }

  getCurrent(): InstanceType<T> | null {
    return this.current;
  }
}

const machine = new StateMachine<typeof IdleState | typeof ActiveState>();
machine.transition(IdleState);
machine.transition(ActiveState);`}
        </CodeBlock>

        <InfoBox type="tip">
          InstanceType&lt;T&gt; extracts the type of instances created by a
          constructor. Use it for factories, dependency injection, object pools,
          plugin systems, and type-safe registries.
        </InfoBox>
      </Section>

      <Section title="5. Practical Use Cases">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world applications combining function utilities for decorators,
          middleware, dependency injection, and type-safe patterns.
        </p>

        <CodeBlock title="Practical function utility examples">
          {`// Complete dependency injection system
class DIContainer {
  private factories = new Map<any, () => any>();
  private singletons = new Map<any, any>();

  register<T extends new (...args: any[]) => any>(
    Constructor: T,
    factory: (...args: ConstructorParameters<T>) => InstanceType<T>,
    singleton: boolean = false
  ): void {
    this.factories.set(Constructor, factory);
    if (singleton) {
      this.singletons.set(Constructor, null);
    }
  }

  resolve<T extends new (...args: any[]) => any>(
    Constructor: T
  ): InstanceType<T> {
    if (this.singletons.has(Constructor)) {
      let instance = this.singletons.get(Constructor);
      if (!instance) {
        instance = this.factories.get(Constructor)();
        this.singletons.set(Constructor, instance);
      }
      return instance;
    }

    const factory = this.factories.get(Constructor);
    if (!factory) {
      throw new Error(\`No factory registered for \${Constructor.name}\`);
    }
    return factory();
  }
}

// Type-safe middleware system
type Middleware<T extends (...args: any[]) => any> = (
  next: T
) => (...args: Parameters<T>) => ReturnType<T>;

function applyMiddleware<T extends (...args: any[]) => any>(
  fn: T,
  ...middlewares: Middleware<T>[]
): T {
  return middlewares.reduceRight(
    (acc, middleware) => middleware(acc) as T,
    fn
  );
}

// Logging middleware
const withLogging = <T extends (...args: any[]) => any>(
  next: T
): T => {
  return ((...args: Parameters<T>) => {
    console.log("Called with:", args);
    const result = next(...args);
    console.log("Returned:", result);
    return result;
  }) as T;
};

// Validation middleware
const withValidation = <T extends (...args: any[]) => any>(
  validate: (...args: Parameters<T>) => boolean
) => (next: T): T => {
  return ((...args: Parameters<T>) => {
    if (!validate(...args)) {
      throw new Error("Validation failed");
    }
    return next(...args);
  }) as T;
};

// Apply multiple middlewares
function processUser(name: string, age: number): { name: string; age: number } {
  return { name, age };
}

const enhancedProcessUser = applyMiddleware(
  processUser,
  withLogging,
  withValidation((name, age) => name.length > 0 && age > 0)
);

// Type-safe event system with classes
class EventBus {
  private handlers = new Map<new (...args: any[]) => any, Set<Function>>();

  on<T extends new (...args: any[]) => any>(
    EventClass: T,
    handler: (event: InstanceType<T>) => void
  ): void {
    const handlers = this.handlers.get(EventClass) ?? new Set();
    handlers.add(handler);
    this.handlers.set(EventClass, handlers);
  }

  emit<T extends new (...args: any[]) => any>(
    event: InstanceType<T>
  ): void {
    const EventClass = event.constructor as T;
    const handlers = this.handlers.get(EventClass) ?? new Set();
    handlers.forEach(handler => handler(event));
  }
}

// Event classes
class UserCreatedEvent {
  constructor(
    public userId: number,
    public name: string,
    public timestamp: Date
  ) {}
}

class UserDeletedEvent {
  constructor(public userId: number) {}
}

const bus = new EventBus();

bus.on(UserCreatedEvent, (event) => {
  console.log(\`User \${event.name} created at \${event.timestamp}\`);
});

bus.emit(new UserCreatedEvent(1, "John", new Date()));

// Command pattern with type safety
abstract class Command<T = void> {
  abstract execute(): T;
  abstract undo(): void;
}

class CreateUserCommand extends Command<User> {
  constructor(private name: string, private age: number) {
    super();
  }

  execute(): User {
    console.log(\`Creating user: \${this.name}\`);
    return new User(this.name, this.age);
  }

  undo(): void {
    console.log(\`Undoing user creation: \${this.name}\`);
  }
}

class CommandInvoker {
  private history: Command[] = [];

  execute<T extends Command>(command: T): ReturnType<T["execute"]> {
    const result = command.execute();
    this.history.push(command);
    return result;
  }

  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}

const invoker = new CommandInvoker();
const user = invoker.execute(new CreateUserCommand("Alice", 30));
invoker.undo();

// Repository pattern with generics
abstract class Repository<T extends new (...args: any[]) => any> {
  protected items = new Map<number, InstanceType<T>>();

  save(item: InstanceType<T>): void {
    // Save logic
  }

  findById(id: number): InstanceType<T> | undefined {
    return this.items.get(id);
  }

  findAll(): InstanceType<T>[] {
    return Array.from(this.items.values());
  }

  delete(id: number): void {
    this.items.delete(id);
  }
}

class UserRepository extends Repository<typeof User> {
  findByName(name: string): InstanceType<typeof User>[] {
    return this.findAll().filter(user => user.name === name);
  }
}

// Factory with configuration
function createConfiguredInstance<T extends new (...args: any[]) => any>(
  Constructor: T,
  config: Partial<InstanceType<T>>
): (...args: ConstructorParameters<T>) => InstanceType<T> {
  return (...args: ConstructorParameters<T>) => {
    const instance = new Constructor(...args);
    return Object.assign(instance, config);
  };
}

const createAdminUser = createConfiguredInstance(User, {
  name: "Admin"
});

const admin = createAdminUser("Admin", 30);`}
        </CodeBlock>

        <InfoBox type="important">
          Combine function utilities for powerful patterns: use Parameters for
          middleware, ReturnType for type inference, ConstructorParameters for
          factories, and InstanceType for registries and dependency injection.
        </InfoBox>
      </Section>
    </div>
  );
}
