import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function IntersectionTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Intersection Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Intersection types combine multiple types into one, creating a type that
        has all properties of all constituent types. They're created using the
        ampersand (&) operator and are essential for composing types.
      </p>

      <Section title="1. Basic Intersection Types">
        <p className="text-gray-700 dark:text-gray-300">
          Intersection types merge multiple types together, requiring a value to
          satisfy all combined types simultaneously.
        </p>

        <CodeBlock title="Basic intersection examples">
          {`// Basic intersection
type HasName = { name: string };
type HasAge = { age: number };

type Person = HasName & HasAge;

const person: Person = {
  name: "John",
  age: 30
}; // Must have both properties

// Intersection with multiple types
type HasId = { id: number };
type HasTimestamp = { createdAt: Date };
type Entity = HasId & HasName & HasTimestamp;

const entity: Entity = {
  id: 1,
  name: "Entity",
  createdAt: new Date()
};

// Intersection vs Union
type Union = { a: string } | { b: number };      // Either a OR b
type Intersection = { a: string } & { b: number }; // Both a AND b

const union1: Union = { a: "test" };          // OK
const union2: Union = { b: 42 };              // OK
// const invalid: Intersection = { a: "test" }; // Error: missing b

const valid: Intersection = { a: "test", b: 42 }; // OK

// Intersection with interfaces
interface Identifiable {
  id: number;
}

interface Nameable {
  name: string;
}

type User = Identifiable & Nameable;

const user: User = {
  id: 1,
  name: "John"
};

// Inline intersection
function process(obj: { x: number } & { y: number }) {
  console.log(obj.x, obj.y);
}

process({ x: 10, y: 20 }); // OK

// Intersection with type aliases
type Point2D = { x: number; y: number };
type Labeled = { label: string };
type LabeledPoint = Point2D & Labeled;

const point: LabeledPoint = {
  x: 10,
  y: 20,
  label: "Origin"
};

// Empty intersection (all types)
type Everything = {} & { name: string } & { age: number };
// Equivalent to { name: string; age: number }

// Intersection with primitives (results in never)
type Impossible = string & number; // never (can't be both)

// const invalid: Impossible = "test"; // Error: can't assign to never
// const invalid2: Impossible = 42;    // Error: can't assign to never`}
        </CodeBlock>

        <InfoBox type="info">
          Intersection types combine types using &, creating a new type that
          includes all properties from all constituent types. Unlike unions
          (which use |), intersections require all types to be satisfied.
        </InfoBox>
      </Section>

      <Section title="2. Combining Object Types">
        <p className="text-gray-700 dark:text-gray-300">
          Intersection types excel at combining object shapes, allowing you to
          compose complex types from simpler pieces.
        </p>

        <CodeBlock title="Combining objects with intersection">
          {`// Mixin pattern
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type Versioned = {
  version: number;
};

type Document = {
  id: string;
  title: string;
  content: string;
};

type FullDocument = Document & Timestamped & Versioned;

const doc: FullDocument = {
  id: "doc1",
  title: "My Document",
  content: "Content here",
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1
};

// Extending base types
type BaseEntity = {
  id: number;
  createdAt: Date;
};

type UserEntity = BaseEntity & {
  username: string;
  email: string;
};

type ProductEntity = BaseEntity & {
  name: string;
  price: number;
};

// Overlapping properties (must be compatible)
type A = { value: string };
type B = { value: string; extra: number };

type AB = A & B; // { value: string; extra: number }

const ab: AB = {
  value: "test",
  extra: 42
};

// Conflicting property types result in never
type X = { prop: string };
type Y = { prop: number };

type XY = X & Y; // { prop: never } - prop can't be both string and number

// const impossible: XY = { prop: ... }; // Can't satisfy this

// But unions in properties work
type M = { prop: string };
type N = { prop: number };

type MorN = M | N;
type MandN = M & N;

const morN1: MorN = { prop: "text" };  // OK
const morN2: MorN = { prop: 42 };      // OK

// Combining methods
type Readable = {
  read(): string;
};

type Writable = {
  write(content: string): void;
};

type ReadWrite = Readable & Writable;

const rw: ReadWrite = {
  read() {
    return "content";
  },
  write(content: string) {
    console.log(content);
  }
};

// Intersection with optional properties
type Optional = { a?: string };
type Required = { a: string };

type Combined = Optional & Required; // { a: string } - Required wins

// Multiple definitions of same property
type Base = { id: number; name?: string };
type Extended = { name: string };

type Final = Base & Extended; // { id: number; name: string } - name becomes required

// Generic intersections
type WithId<T> = T & { id: number };

type UserWithId = WithId<{ name: string; email: string }>;
// { name: string; email: string; id: number }

// Intersection with index signatures
type StringMap = { [key: string]: string };
type WithCount = { count: number };

type StringMapWithCount = StringMap & WithCount;

const smc: StringMapWithCount = {
  count: 5,
  a: "alpha",
  b: "beta"
  // count must be number, other properties must be string
};`}
        </CodeBlock>

        <InfoBox type="warning">
          When intersecting types with the same property name but different
          types, the result is an intersection of those property types, which
          may be never if incompatible.
        </InfoBox>
      </Section>

      <Section title="3. Intersection with Functions">
        <p className="text-gray-700 dark:text-gray-300">
          Intersection types can combine function types, creating overloaded
          function signatures.
        </p>

        <CodeBlock title="Function intersections">
          {`// Function overload with intersection
type StringFunc = (x: string) => string;
type NumberFunc = (x: number) => number;

type BothFunc = StringFunc & NumberFunc;

// Must implement both signatures
const both: BothFunc = ((x: string | number): string | number => {
  if (typeof x === "string") {
    return x.toUpperCase();
  }
  return x * 2;
}) as BothFunc;

const str = both("hello"); // string
const num = both(42);      // number

// Intersection of callable objects
type Logger = {
  (message: string): void;
  level: "info" | "warn" | "error";
};

type ExtendedLogger = Logger & {
  namespace: string;
};

const logger: ExtendedLogger = Object.assign(
  (message: string) => console.log(message),
  {
    level: "info" as const,
    namespace: "app"
  }
);

logger("Hello"); // Call as function
console.log(logger.level); // Access property

// Constructor intersection
type Constructable<T> = new () => T;
type WithPrototype = { prototype: any };

type ConstructorWithPrototype<T> = Constructable<T> & WithPrototype;

// Method intersections
type HasLog = {
  log(message: string): void;
};

type HasError = {
  error(message: string): void;
};

type Console = HasLog & HasError;

const myConsole: Console = {
  log(message: string) {
    console.log(message);
  },
  error(message: string) {
    console.error(message);
  }
};

// Generic function intersection
type Mapper<T, U> = (value: T) => U;
type Filter<T> = (value: T) => boolean;

type MapperAndFilter<T, U> = Mapper<T, U> & { filter: Filter<T> };

// Callable with properties
type Callable = {
  (): string;
  version: number;
};

const callable: Callable = Object.assign(
  () => "result",
  { version: 1 }
);

// Async function intersection
type SyncFn = () => string;
type AsyncFn = () => Promise<string>;

// type Both = SyncFn & AsyncFn; // Tricky - may not work as expected

// Better: Use overloads
type FlexibleFn = {
  (): string;
  (): Promise<string>;
};`}
        </CodeBlock>

        <InfoBox type="tip">
          Function intersections create overloaded signatures. The
          implementation must satisfy all intersected function types, which
          often requires union types in the implementation.
        </InfoBox>
      </Section>

      <Section title="4. Advanced Intersection Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns and techniques for working with intersection types
          in complex scenarios.
        </p>

        <CodeBlock title="Advanced intersection patterns">
          {`// 1. Intersection with generics
type Merge<T, U> = T & U;

type A = { a: number };
type B = { b: string };
type C = Merge<A, B>; // { a: number; b: string }

// 2. Conditional intersections
type AddTimestamp<T, WithTime extends boolean> = WithTime extends true
  ? T & { timestamp: Date }
  : T;

type WithTime = AddTimestamp<{ value: string }, true>;
// { value: string; timestamp: Date }

type WithoutTime = AddTimestamp<{ value: string }, false>;
// { value: string }

// 3. Recursive intersections
type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? T[K] & U[K]
      : T[K]
    : K extends keyof U
    ? U[K]
    : never;
};

// 4. Intersection distribution
type Distribute<T, U> = T extends any ? T & U : never;

type Result = Distribute<{ a: number } | { b: string }, { id: number }>;
// { a: number; id: number } | { b: string; id: number }

// 5. Mixin utilities
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = new Date();
  };
}

function Tagged<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    tags: string[] = [];
  };
}

class Entity {
  id = 0;
}

const TimestampedEntity = Timestamped(Entity);
const FullEntity = Tagged(TimestampedEntity);

const entity2 = new FullEntity();
// Has: id, timestamp, tags

// 6. Brand with intersection
type Brand<T, B> = T & { __brand: B };

type Meters = Brand<number, "meters">;
type Feet = Brand<number, "feet">;

function toMeters(feet: Feet): Meters {
  return (feet * 0.3048) as Meters;
}

// Can't mix Meters and Feet
// const distance: Meters = 5 as Feet; // Error

// 7. Intersection for constraints
type NonEmptyArray<T> = [T, ...T[]];

type ValidatedUser = {
  name: string;
  email: string;
} & {
  _validated: true;
};

function validate(user: { name: string; email: string }): ValidatedUser {
  // Validation logic
  return { ...user, _validated: true };
}

// 8. Utility type combinations
type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P];
};

type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends object ? PartialDeep<T[P]> : T[P];
};

type RequiredReadonly<T> = Required<T> & ReadonlyDeep<T>;

// 9. Intersection with mapped types
type WithMeta<T> = T & {
  [K in keyof T as \`_\${string & K}_meta\`]?: string;
};

type UserWithMeta = WithMeta<{ name: string; age: number }>;
// { name: string; age: number; _name_meta?: string; _age_meta?: string }

// 10. Complex type composition
type Auditable = {
  createdBy: string;
  updatedBy: string;
};

type SoftDeletable = {
  deletedAt: Date | null;
};

type Trackable = Auditable & SoftDeletable & {
  version: number;
};

type TrackedUser = {
  id: number;
  name: string;
} & Trackable;

// 11. Intersection with template literals
type EventHandlers<T extends string> = {
  [K in T as \`on\${Capitalize<K>}\`]: (data: any) => void;
};

type ClickHandlers = EventHandlers<"click" | "doubleClick">;
// { onClick: (data: any) => void; onDoubleClick: (data: any) => void }

type WithHandlers<T> = T & EventHandlers<"change" | "submit">;

// 12. Flattening intersections
type Flatten<T> = {
  [K in keyof T]: T[K];
};

type Nested = { a: number } & { b: string } & { c: boolean };
type Flat = Flatten<Nested>;
// { a: number; b: string; c: boolean }

// 13. Intersection with discriminated unions
type Shape = 
  | ({ kind: "circle"; radius: number })
  | ({ kind: "square"; size: number });

type Colored = { color: string };

type ColoredShape = Shape & Colored;

const cs: ColoredShape = {
  kind: "circle",
  radius: 10,
  color: "red"
};

// 14. Overwrite pattern
type Overwrite<T, U> = Omit<T, keyof U> & U;

type Original = { a: string; b: number; c: boolean };
type Update = { b: string; d: number };

type Updated = Overwrite<Original, Update>;
// { a: string; c: boolean; b: string; d: number }

// 15. RequireAtLeastOne
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

type Contact = {
  email?: string;
  phone?: string;
  address?: string;
};

type RequiredContact = RequireAtLeastOne<Contact, "email" | "phone">;
// Must have at least email or phone

// 16. Exclusive OR pattern
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

type Auth = XOR<{ username: string }, { apiKey: string }>;

// Must have username OR apiKey, not both
const auth1: Auth = { username: "john" };     // OK
const auth2: Auth = { apiKey: "key" };        // OK
// const auth3: Auth = { username: "john", apiKey: "key" }; // Error`}
        </CodeBlock>

        <InfoBox type="important">
          Intersection types are powerful for type composition. Use them to
          combine object types, create mixins, and build complex types from
          smaller pieces. Be aware of property conflicts and never types.
        </InfoBox>
      </Section>

      <Section title="5. Intersection vs Union Trade-offs">
        <p className="text-gray-700 dark:text-gray-300">
          Understanding when to use intersections vs unions is crucial for
          effective TypeScript type design.
        </p>

        <CodeBlock title="Intersection vs Union comparison">
          {`// Union: Value is ONE OF the types
type UnionType = { a: string } | { b: number };

const union1: UnionType = { a: "test" };      // OK
const union2: UnionType = { b: 42 };          // OK
// const union3: UnionType = { a: "test", b: 42 }; // Also OK!

// Intersection: Value is ALL OF the types
type IntersectionType = { a: string } & { b: number };

// const int1: IntersectionType = { a: "test" };      // Error: missing b
// const int2: IntersectionType = { b: 42 };          // Error: missing a
const int3: IntersectionType = { a: "test", b: 42 }; // OK

// Union narrows properties (only common ones available)
function processUnion(value: { a: string; c: boolean } | { b: number; c: boolean }) {
  console.log(value.c); // OK: c is common
  // console.log(value.a); // Error: a might not exist
  // console.log(value.b); // Error: b might not exist
}

// Intersection extends properties (all available)
function processIntersection(value: { a: string } & { b: number }) {
  console.log(value.a); // OK
  console.log(value.b); // OK
}

// When to use Union:
// ✅ Value can be different shapes
// ✅ Discriminated unions
// ✅ Optional alternatives
// ✅ State machines

type ApiResponse =
  | { status: "success"; data: any }
  | { status: "error"; error: string };

// When to use Intersection:
// ✅ Combining object types
// ✅ Adding properties to existing types
// ✅ Mixins and composition
// ✅ Type constraints

type Entity2 = BaseEntity & Timestamped & Versioned;

// Union of functions (multiple signatures)
type UnionFunc = ((x: string) => string) | ((x: number) => number);

// Caller must handle both cases
function callUnion(fn: UnionFunc, value: string | number) {
  // Need to narrow the function type first
}

// Intersection of functions (overloaded signature)
type IntersectionFunc = ((x: string) => string) & ((x: number) => number);

// Function must handle both signatures
const intFunc: IntersectionFunc = ((x: string | number): string | number => {
  if (typeof x === "string") return x.toUpperCase();
  return x * 2;
}) as IntersectionFunc;

// Combinations
type Complex =
  | ({ type: "a" } & { value: string })
  | ({ type: "b" } & { value: number });

// Equivalent to:
type Complex2 =
  | { type: "a"; value: string }
  | { type: "b"; value: number };

// Best practices:
// 1. Use unions for exclusive alternatives
// 2. Use intersections for additive properties
// 3. Combine both for complex scenarios
// 4. Prefer interfaces for object extensions (when possible)
// 5. Use discriminated unions for state management

// Example combining both effectively:
type UserPermission = "read" | "write" | "delete";

type BaseUser2 = {
  id: number;
  name: string;
};

type AdminUser2 = BaseUser2 & {
  role: "admin";
  permissions: UserPermission[];
};

type GuestUser = BaseUser2 & {
  role: "guest";
  expiresAt: Date;
};

type User2 = AdminUser2 | GuestUser; // Union of intersections

function authorize(user: User2) {
  if (user.role === "admin") {
    console.log(user.permissions); // OK: AdminUser
  } else {
    console.log(user.expiresAt);   // OK: GuestUser
  }
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Use unions when a value can be one of several alternatives. Use
          intersections when you need to combine multiple types into one. Often,
          you'll use both: unions of intersections or intersections with unions.
        </InfoBox>
      </Section>
    </div>
  );
}
