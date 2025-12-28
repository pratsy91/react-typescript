import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ClassesOOPPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Classes & OOP Features
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript enhances JavaScript classes with abstract classes, access
        modifiers, parameter properties, and advanced OOP features for robust
        object-oriented programming.
      </p>

      <Section title="1. Abstract Classes">
        <p className="text-gray-700 dark:text-gray-300">
          Abstract classes cannot be instantiated directly and may contain
          abstract members that must be implemented by derived classes. They
          define common behavior and enforce contracts.
        </p>

        <CodeBlock title="Abstract class examples">
          {`// Basic abstract class
abstract class Animal {
  abstract makeSound(): string;
  abstract move(distance: number): void;

  // Concrete method
  describe(): string {
    return \`This animal makes: \${this.makeSound()}\`;
  }
}

// Must implement abstract members
class Dog extends Animal {
  makeSound(): string {
    return "Woof!";
  }

  move(distance: number): void {
    console.log(\`Dog runs \${distance} meters\`);
  }
}

const dog = new Dog();
console.log(dog.describe());  // "This animal makes: Woof!"
dog.move(10);

// Cannot instantiate abstract class
// const animal = new Animal();  // ✗ Error

// Abstract class with constructor
abstract class Vehicle {
  constructor(protected brand: string) {}

  abstract start(): void;
  abstract stop(): void;

  getBrand(): string {
    return this.brand;
  }
}

class Car extends Vehicle {
  constructor(brand: string, private model: string) {
    super(brand);
  }

  start(): void {
    console.log(\`\${this.brand} \${this.model} starting...\`);
  }

  stop(): void {
    console.log(\`\${this.brand} \${this.model} stopping...\`);
  }
}

// Abstract properties
abstract class Shape {
  abstract readonly name: string;
  abstract area(): number;
  abstract perimeter(): number;

  describe(): string {
    return \`\${this.name}: area=\${this.area()}, perimeter=\${this.perimeter()}\`;
  }
}

class Circle extends Shape {
  readonly name = "Circle";

  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  readonly name = "Rectangle";

  constructor(private width: number, private height: number) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Abstract generic class
abstract class Repository<T> {
  protected items: Map<number, T> = new Map();

  abstract validate(item: T): boolean;

  save(id: number, item: T): void {
    if (!this.validate(item)) {
      throw new Error("Invalid item");
    }
    this.items.set(id, item);
  }

  findById(id: number): T | undefined {
    return this.items.get(id);
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }
}

interface User {
  name: string;
  email: string;
}

class UserRepository extends Repository<User> {
  validate(user: User): boolean {
    return user.name.length > 0 && user.email.includes("@");
  }

  findByEmail(email: string): User | undefined {
    return this.findAll().find(u => u.email === email);
  }
}

// Abstract class with static members
abstract class MathOperation {
  static PI = 3.14159;

  abstract calculate(x: number, y: number): number;

  static degreesToRadians(degrees: number): number {
    return degrees * (MathOperation.PI / 180);
  }
}

class Addition extends MathOperation {
  calculate(x: number, y: number): number {
    return x + y;
  }
}

// Abstract builder pattern
abstract class Builder<T> {
  protected data: Partial<T> = {};

  abstract build(): T;

  reset(): this {
    this.data = {};
    return this;
  }
}

class UserBuilder extends Builder<User> {
  setName(name: string): this {
    this.data.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.data.email = email;
    return this;
  }

  build(): User {
    if (!this.data.name || !this.data.email) {
      throw new Error("Missing required fields");
    }
    return this.data as User;
  }
}

// Abstract with inheritance chain
abstract class BaseService {
  abstract initialize(): Promise<void>;
  abstract destroy(): Promise<void>;
}

abstract class HttpService extends BaseService {
  protected baseUrl: string = "";

  abstract fetch<T>(endpoint: string): Promise<T>;

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }
}

class ApiService extends HttpService {
  async initialize(): Promise<void> {
    console.log("API Service initialized");
  }

  async destroy(): Promise<void> {
    console.log("API Service destroyed");
  }

  async fetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`);
    return response.json();
  }
}

// Abstract factory pattern
abstract class ProductFactory {
  abstract createProduct(type: string): Product;

  build(type: string): Product {
    const product = this.createProduct(type);
    this.configure(product);
    return product;
  }

  protected configure(product: Product): void {
    // Common configuration
  }
}

// Template method pattern
abstract class DataProcessor<T> {
  process(data: T[]): T[] {
    const validated = this.validate(data);
    const transformed = this.transform(validated);
    return this.save(transformed);
  }

  abstract validate(data: T[]): T[];
  abstract transform(data: T[]): T[];
  abstract save(data: T[]): T[];
}`}
        </CodeBlock>

        <InfoBox type="info">
          Abstract classes define contracts with abstract members that
          subclasses must implement. Use them for base classes, template method
          patterns, and enforcing implementation contracts. They cannot be
          instantiated directly.
        </InfoBox>
      </Section>

      <Section title="2. Access Modifiers">
        <p className="text-gray-700 dark:text-gray-300">
          Access modifiers control member visibility: public (default), private
          (class-only), protected (class and subclasses), and readonly
          (immutable after initialization).
        </p>

        <CodeBlock title="Access modifier examples">
          {`// Public members (default)
class PublicExample {
  public name: string;  // Explicitly public
  age: number;  // Implicitly public

  public greet(): void {
    console.log(\`Hello, I'm \${this.name}\`);
  }
}

const example = new PublicExample();
example.name = "John";  // ✓ OK
example.greet();  // ✓ OK

// Private members
class BankAccount {
  private balance: number = 0;
  private accountNumber: string;

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  getBalance(): number {
    return this.balance;  // Can access private within class
  }
}

const account = new Bank Account("123456");
// account.balance = 1000;  // ✗ Error: private
account.deposit(1000);  // ✓ OK
console.log(account.getBalance());  // ✓ OK

// Protected members
class Person {
  protected name: string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  protected getInfo(): string {
    return \`\${this.name}, \${this.age}\`;
  }
}

class Employee extends Person {
  private employeeId: string;

  constructor(name: string, age: number, id: string) {
    super(name, age);
    this.employeeId = id;
  }

  getDetails(): string {
    // Can access protected members from base class
    return \`\${this.getInfo()}, ID: \${this.employeeId}\`;
  }
}

const emp = new Employee("John", 30, "E123");
console.log(emp.getDetails());  // ✓ OK
// console.log(emp.name);  // ✗ Error: protected
// console.log(emp.getInfo());  // ✗ Error: protected

// Readonly members
class Config {
  readonly apiUrl: string;
  readonly timeout: number;

  constructor(apiUrl: string, timeout: number = 5000) {
    this.apiUrl = apiUrl;
    this.timeout = timeout;
  }

  // Can't modify readonly after construction
  // setTimeout(newTimeout: number): void {
  //   this.timeout = newTimeout;  // ✗ Error: readonly
  // }
}

const config = new Config("https://api.example.com");
// config.apiUrl = "https://new-api.com";  // ✗ Error: readonly

// Private static members
class Counter {
  private static count: number = 0;

  static increment(): void {
    Counter.count++;
  }

  static getCount(): number {
    return Counter.count;
  }
}

Counter.increment();
console.log(Counter.getCount());  // 1
// console.log(Counter.count);  // ✗ Error: private

// Protected constructor
class Singleton {
  private static instance: Singleton;

  protected constructor() {
    // Protected constructor prevents direct instantiation
  }

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

// const single = new Singleton();  // ✗ Error: protected constructor
const single = Singleton.getInstance();  // ✓ OK

// Readonly arrays and objects
class DataStore {
  private readonly data: readonly string[] = ["a", "b", "c"];
  readonly config: { readonly apiUrl: string } = { apiUrl: "..." };

  getData(): readonly string[] {
    return this.data;
  }
}

const store = new DataStore();
const data = store.getData();
// data.push("d");  // ✗ Error: readonly array
// store.config.apiUrl = "new";  // ✗ Error: readonly property

// Private fields (ES2020+)
class ModernPrivate {
  #privateField: string = "secret";
  #privateMethod(): void {
    console.log(this.#privateField);
  }

  public accessPrivate(): void {
    this.#privateMethod();
  }
}

const modern = new ModernPrivate();
modern.accessPrivate();  // ✓ OK
// modern.#privateField;  // ✗ Syntax error

// Combining modifiers
class Complex {
  public readonly publicReadonly: string = "public";
  protected readonly protectedReadonly: string = "protected";
  private readonly privateReadonly: string = "private";

  private static readonly CONSTANT: string = "constant";

  protected static helper(): void {
    console.log(Complex.CONSTANT);
  }
}

// Getters and setters with access control
class User {
  private _email: string = "";
  private _age: number = 0;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    if (!value.includes("@")) {
      throw new Error("Invalid email");
    }
    this._email = value;
  }

  get age(): number {
    return this._age;
  }

  // No setter - readonly via accessor
}

const user = new User();
user.email = "john@example.com";  // ✓ OK
console.log(user.email);  // ✓ OK
// user.age = 30;  // ✗ Error: no setter

// Protected setters, public getters
class BaseClass {
  private _value: number = 0;

  get value(): number {
    return this._value;
  }

  protected set value(v: number) {
    this._value = v;
  }
}

class DerivedClass extends BaseClass {
  initialize(v: number): void {
    this.value = v;  // ✓ OK: protected setter accessible
  }
}

const derived = new DerivedClass();
console.log(derived.value);  // ✓ OK: public getter
// derived.value = 10;  // ✗ Error: protected setter

// Access modifiers in interfaces
interface IUser {
  // All interface members are public
  name: string;
  getName(): string;
}

// Implementing interface
class UserImpl implements IUser {
  // Must be public to satisfy interface
  name: string = "";

  getName(): string {
    return this.name;
  }

  // Can have additional private members
  private id: number = 0;
}

// Abstract class with various modifiers
abstract class BaseService {
  protected abstract initialize(): Promise<void>;
  private readonly id: string = Math.random().toString();

  public async start(): Promise<void> {
    await this.initialize();
    console.log("Service started");
  }

  protected log(message: string): void {
    console.log(\`[\${this.id}] \${message}\`);
  }
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Use public for external API, private for internal implementation,
          protected for inheritance, and readonly for immutability. Default is
          public. Private fields (#) provide runtime privacy unlike private
          keyword.
        </InfoBox>
      </Section>

      <Section title="3. Parameter Properties">
        <p className="text-gray-700 dark:text-gray-300">
          Parameter properties are a shorthand syntax that declares and
          initializes class properties directly from constructor parameters.
        </p>

        <CodeBlock title="Parameter property examples">
          {`// Basic parameter properties
class Point {
  // Shorthand: declares and assigns in one step
  constructor(public x: number, public y: number) {}
}

// Equivalent to:
class PointLongform {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const point = new Point(10, 20);
console.log(point.x, point.y);  // 10, 20

// Private parameter properties
class User {
  constructor(
    private id: number,
    public name: string,
    private email: string
  ) {}

  getEmail(): string {
    return this.email;  // Can access private within class
  }
}

const user = new User(1, "John", "john@example.com");
console.log(user.name);  // ✓ OK: public
// console.log(user.email);  // ✗ Error: private
console.log(user.getEmail());  // ✓ OK

// Protected parameter properties
class Animal {
  constructor(protected name: string, protected age: number) {}
}

class Dog extends Animal {
  constructor(name: string, age: number, private breed: string) {
    super(name, age);
  }

  describe(): string {
    return \`\${this.name} is a \${this.age} year old \${this.breed}\`;
  }
}

// Readonly parameter properties
class Config {
  constructor(
    public readonly apiUrl: string,
    public readonly timeout: number = 5000,
    private readonly apiKey: string
  ) {}

  // Cannot modify readonly after construction
  // setTimeout(newTimeout: number): void {
  //   this.timeout = newTimeout;  // ✗ Error: readonly
  // }
}

const config = new Config("https://api.example.com", 3000, "secret");
// config.apiUrl = "new";  // ✗ Error: readonly
console.log(config.timeout);  // ✓ OK

// Combining parameter properties with regular properties
class Product {
  version: string = "1.0.0";  // Regular property

  constructor(
    public readonly id: number,
    public name: string,
    private price: number
  ) {}

  getPrice(): number {
    return this.price;
  }

  setPrice(newPrice: number): void {
    if (newPrice > 0) {
      this.price = newPrice;
    }
  }
}

// Optional parameter properties
class OptionalUser {
  constructor(
    public name: string,
    public email?: string,
    public age?: number
  ) {}
}

const user1 = new OptionalUser("John");
const user2 = new OptionalUser("Jane", "jane@example.com");
const user3 = new OptionalUser("Bob", "bob@example.com", 30);

// Default parameter values
class Service {
  constructor(
    public name: string,
    public timeout: number = 5000,
    private retries: number = 3
  ) {}

  getRetries(): number {
    return this.retries;
  }
}

const service1 = new Service("API");  // Uses defaults
const service2 = new Service("DB", 10000);  // Custom timeout
const service3 = new Service("Cache", 3000, 5);  // All custom

// Rest parameters (not as parameter property)
class Collection {
  constructor(public name: string, ...items: string[]) {
    // items is just a regular parameter, not a property
    console.log(items);
  }
}

// Destructured parameters (not as parameter property)
class Point3D {
  public x: number;
  public y: number;
  public z: number;

  constructor({ x, y, z }: { x: number; y: number; z: number }) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

// Can't use parameter properties with destructuring
// constructor(public { x, y, z }: { x: number; y: number; z: number }) {}  // ✗ Error

// Multiple access levels
class Account {
  constructor(
    private accountNumber: string,
    protected balance: number,
    public owner: string,
    public readonly createdAt: Date = new Date()
  ) {}

  getAccountNumber(): string {
    return this.accountNumber;
  }
}

// Generic classes with parameter properties
class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

const numBox = new Box(42);
const strBox = new Box("hello");

// Inheritance with parameter properties
class BaseEntity {
  constructor(
    public readonly id: number,
    public readonly createdAt: Date = new Date()
  ) {}
}

class UserEntity extends BaseEntity {
  constructor(
    id: number,
    public name: string,
    public email: string
  ) {
    super(id);
  }
}

// Static members cannot be parameter properties
class WithStatic {
  static count: number = 0;

  // constructor(public static prop: string) {}  // ✗ Error: static not allowed

  constructor(public instanceProp: string) {
    WithStatic.count++;
  }
}

// Abstract classes with parameter properties
abstract class Shape {
  constructor(protected readonly name: string) {}

  abstract area(): number;

  describe(): string {
    return \`\${this.name}: \${this.area()}\`;
  }
}

class Circle extends Shape {
  constructor(name: string, private radius: number) {
    super(name);
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }
}

// Practical: Dependency injection
class Database {
  constructor(private connectionString: string) {}

  connect(): void {
    console.log(\`Connecting to: \${this.connectionString}\`);
  }
}

class UserRepository {
  constructor(
    private readonly db: Database,
    private readonly tableName: string = "users"
  ) {}

  findAll(): void {
    this.db.connect();
    console.log(\`Querying \${this.tableName}\`);
  }
}

const db = new Database("postgresql://localhost");
const repo = new UserRepository(db);

// Practical: Immutable data objects
class Person {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly birthDate: Date
  ) {}

  get fullName(): string {
    return \`\${this.firstName} \${this.lastName}\`;
  }

  get age(): number {
    const now = new Date();
    return now.getFullYear() - this.birthDate.getFullYear();
  }
}

const person = new Person("John", "Doe", new Date(1990, 0, 1));
// person.firstName = "Jane";  // ✗ Error: readonly
console.log(person.fullName, person.age);`}
        </CodeBlock>

        <InfoBox type="important">
          Parameter properties declare and initialize class properties from
          constructor parameters. Use them to reduce boilerplate. Combine with
          access modifiers (public, private, protected) and readonly for
          concise, type-safe class definitions.
        </InfoBox>
      </Section>

      <Section title="4. Advanced Class Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns combining abstract classes, access modifiers, and
          parameter properties for robust OOP designs.
        </p>

        <CodeBlock title="Advanced class patterns">
          {`// Factory with abstract base
abstract class Logger {
  constructor(protected prefix: string) {}

  abstract log(message: string): void;
  abstract error(message: string): void;

  protected format(level: string, message: string): string {
    return \`[\${this.prefix}] [\${level}] \${message}\`;
  }
}

class ConsoleLogger extends Logger {
  log(message: string): void {
    console.log(this.format("INFO", message));
  }

  error(message: string): void {
    console.error(this.format("ERROR", message));
  }
}

class FileLogger extends Logger {
  constructor(prefix: string, private readonly filePath: string) {
    super(prefix);
  }

  log(message: string): void {
    // Write to file
  }

  error(message: string): void {
    // Write to error log
  }
}

// Builder pattern
class UserBuilder {
  private constructor(
    private name?: string,
    private email?: string,
    private age?: number
  ) {}

  static create(): UserBuilder {
    return new UserBuilder();
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  setAge(age: number): this {
    this.age = age;
    return this;
  }

  build(): User {
    if (!this.name || !this.email) {
      throw new Error("Name and email required");
    }
    return {
      name: this.name,
      email: this.email,
      age: this.age
    } as User;
  }
}

const user = UserBuilder.create()
  .setName("John")
  .setEmail("john@example.com")
  .setAge(30)
  .build();

// Command pattern
abstract class Command {
  constructor(protected readonly receiver: Receiver) {}

  abstract execute(): void;
  abstract undo(): void;
}

class Receiver {
  constructor(private state: string = "initial") {}

  action(newState: string): void {
    console.log(\`State: \${this.state} -> \${newState}\`);
    this.state = newState;
  }

  getState(): string {
    return this.state;
  }
}

class ConcreteCommand extends Command {
  private previousState?: string;

  execute(): void {
    this.previousState = this.receiver.getState();
    this.receiver.action("executed");
  }

  undo(): void {
    if (this.previousState) {
      this.receiver.action(this.previousState);
    }
  }
}

// Template Method pattern
abstract class DataMigration {
  constructor(
    protected readonly source: string,
    protected readonly destination: string
  ) {}

  async migrate(): Promise<void> {
    await this.connect();
    const data = await this.extract();
    const transformed = await this.transform(data);
    await this.load(transformed);
    await this.disconnect();
  }

  protected abstract extract(): Promise<any[]>;
  protected abstract transform(data: any[]): Promise<any[]>;
  protected abstract load(data: any[]): Promise<void>;

  protected async connect(): Promise<void> {
    console.log(\`Connecting to \${this.source} and \${this.destination}\`);
  }

  protected async disconnect(): Promise<void> {
    console.log("Disconnecting");
  }
}

// Strategy pattern with abstract base
abstract class SortStrategy {
  abstract sort<T>(items: T[], comparator: (a: T, b: T) => number): T[];

  protected swap<T>(items: T[], i: number, j: number): void {
    [items[i], items[j]] = [items[j], items[i]];
  }
}

class QuickSort extends SortStrategy {
  sort<T>(items: T[], comparator: (a: T, b: T) => number): T[] {
    // QuickSort implementation
    return items;
  }
}

class MergeSort extends SortStrategy {
  sort<T>(items: T[], comparator: (a: T, b: T) => number): T[] {
    // MergeSort implementation
    return items;
  }
}

class Sorter {
  constructor(private strategy: SortStrategy) {}

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  sort<T>(items: T[], comparator: (a: T, b: T) => number): T[] {
    return this.strategy.sort(items, comparator);
  }
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Combine abstract classes, access modifiers, and parameter properties
          for design patterns like Factory, Builder, Command, Template Method,
          and Strategy. These patterns create maintainable, extensible
          architectures.
        </InfoBox>
      </Section>

      <Section title="5. Practical Class Examples">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world examples using OOP features for API clients, repositories,
          services, and domain models.
        </p>

        <CodeBlock title="Practical class examples">
          {`// Repository pattern
abstract class Repository<T extends { id: number }> {
  protected items = new Map<number, T>();

  constructor(protected readonly entityName: string) {}

  abstract validate(item: T): boolean;

  async findById(id: number): Promise<T | null> {
    return this.items.get(id) ?? null;
  }

  async findAll(): Promise<T[]> {
    return Array.from(this.items.values());
  }

  async save(item: T): Promise<T> {
    if (!this.validate(item)) {
      throw new Error(\`Invalid \${this.entityName}\`);
    }
    this.items.set(item.id, item);
    return item;
  }

  async delete(id: number): Promise<boolean> {
    return this.items.delete(id);
  }
}

class UserRepository extends Repository<User> {
  constructor() {
    super("User");
  }

  validate(user: User): boolean {
    return user.name.length > 0 && user.email.includes("@");
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.findAll();
    return users.find(u => u.email === email) ?? null;
  }
}

// Service layer with DI
class ApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly timeout: number = 5000
  ) {}

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`);
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

class UserService {
  constructor(
    private readonly client: ApiClient,
    private readonly repository: UserRepository
  ) {}

  async getUser(id: number): Promise<User> {
    // Try cache first
    const cached = await this.repository.findById(id);
    if (cached) return cached;

    // Fetch from API
    const user = await this.client.get<User>(\`/users/\${id}\`);
    await this.repository.save(user);
    return user;
  }

  async createUser(data: Omit<User, "id">): Promise<User> {
    const user = await this.client.post<User>("/users", data);
    await this.repository.save(user);
    return user;
  }
}

// Domain model with behavior
class Order {
  private constructor(
    public readonly id: number,
    private items: OrderItem[],
    private _status: OrderStatus,
    public readonly createdAt: Date = new Date()
  ) {}

  static create(id: number, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }
    return new Order(id, items, "pending");
  }

  get status(): OrderStatus {
    return this._status;
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  addItem(item: OrderItem): void {
    if (this._status !== "pending") {
      throw new Error("Cannot modify confirmed order");
    }
    this.items.push(item);
  }

  confirm(): void {
    if (this._status !== "pending") {
      throw new Error("Order already confirmed");
    }
    this._status = "confirmed";
  }

  cancel(): void {
    if (this._status === "shipped") {
      throw new Error("Cannot cancel shipped order");
    }
    this._status = "cancelled";
  }
}

// Event emitter
class TypedEventEmitter<Events extends Record<string, any>> {
  private listeners = new Map<keyof Events, Set<Function>>();

  on<K extends keyof Events>(
    event: K,
    handler: (data: Events[K]) => void
  ): () => void {
    const handlers = this.listeners.get(event) ?? new Set();
    handlers.add(handler);
    this.listeners.set(event, handlers);

    return () => {
      handlers.delete(handler);
    };
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const handlers = this.listeners.get(event) ?? new Set();
    handlers.forEach(handler => handler(data));
  }
}

type AppEvents = {
  "user:login": { userId: number };
  "user:logout": { userId: number };
  "order:created": { orderId: number };
};

const emitter = new TypedEventEmitter<AppEvents>();
emitter.on("user:login", ({ userId }) => {
  console.log(\`User \${userId} logged in\`);
});`}
        </CodeBlock>

        <InfoBox type="important">
          Use abstract classes for base functionality, private/protected for
          encapsulation, readonly for immutability, and parameter properties for
          concise constructors. These features enable robust, maintainable OOP
          designs.
        </InfoBox>
      </Section>
    </div>
  );
}
