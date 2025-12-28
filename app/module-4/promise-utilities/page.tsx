import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function PromiseUtilitiesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Promise Utilities
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript provides the Awaited&lt;T&gt; utility type for unwrapping
        Promise types recursively. It extracts the resolved value type from
        Promises and Promise-like types.
      </p>

      <Section title="1. Basic Awaited<T>">
        <p className="text-gray-700 dark:text-gray-300">
          Awaited&lt;T&gt; recursively unwraps Promise types to get the final
          resolved value type. Essential for working with async functions and
          Promise chains.
        </p>

        <CodeBlock title="Basic Awaited<T> examples">
          {`// Basic Awaited usage
type PromiseString = Promise<string>;
type StringValue = Awaited<PromiseString>;
// string

type PromiseNumber = Promise<number>;
type NumberValue = Awaited<PromiseNumber>;
// number

// Awaited with nested Promises
type NestedPromise = Promise<Promise<string>>;
type UnwrappedValue = Awaited<NestedPromise>;
// string (recursively unwrapped)

type DeepNested = Promise<Promise<Promise<number>>>;
type DeepValue = Awaited<DeepNested>;
// number

// Awaited with async function return types
async function fetchUser(): Promise<{ id: number; name: string }> {
  return { id: 1, name: "John" };
}

type User = Awaited<ReturnType<typeof fetchUser>>;
// { id: number; name: string }

// Awaited with union types
type MaybePromise = string | Promise<string>;
type ResolvedValue = Awaited<MaybePromise>;
// string (unwraps Promise, keeps non-Promise)

type MixedPromises = Promise<number> | Promise<string>;
type ResolvedUnion = Awaited<MixedPromises>;
// number | string

// Awaited with null and undefined
type NullablePromise = Promise<string | null>;
type NullableValue = Awaited<NullablePromise>;
// string | null

type OptionalPromise = Promise<number | undefined>;
type OptionalValue = Awaited<OptionalPromise>;
// number | undefined

// Awaited with complex types
interface ApiResponse<T> {
  data: T;
  status: number;
}

async function fetchData<T>(): Promise<ApiResponse<T>> {
  return { data: {} as T, status: 200 };
}

type Response = Awaited<ReturnType<typeof fetchData<User>>>;
// { data: User; status: number }

// Awaited with generic promises
async function processData<T>(data: T): Promise<T[]> {
  return [data];
}

type ProcessResult = Awaited<ReturnType<typeof processData<string>>>;
// string[]

// Awaited with conditional types
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type Manual = UnwrapPromise<Promise<string>>;  // string
type WithAwaited = Awaited<Promise<string>>;   // string (same result)

// Awaited with array of promises
type PromiseArray = Promise<string>[];
// Note: Awaited works on the type, not the array
type ArrayValue = Awaited<PromiseArray[number]>;
// string

// Awaited with Promise.all
async function fetchAll() {
  return Promise.all([
    Promise.resolve("string"),
    Promise.resolve(123),
    Promise.resolve(true)
  ]);
}

type AllResults = Awaited<ReturnType<typeof fetchAll>>;
// [string, number, boolean]

// Awaited with never
type NeverPromise = Promise<never>;
type NeverValue = Awaited<NeverPromise>;
// never

// Awaited with any
type AnyPromise = Promise<any>;
type AnyValue = Awaited<AnyPromise>;
// any

// Awaited with unknown
type UnknownPromise = Promise<unknown>;
type UnknownValue = Awaited<UnknownPromise>;
// unknown

// Awaited doesn't work with non-Promise types directly
type NonPromise = string;
type StillString = Awaited<NonPromise>;
// string (returns as-is)`}
        </CodeBlock>

        <InfoBox type="info">
          Awaited&lt;T&gt; recursively unwraps Promise types to extract the
          final resolved value. It handles nested Promises, unions, and works
          seamlessly with async function return types.
        </InfoBox>
      </Section>

      <Section title="2. Awaited with Async Functions">
        <p className="text-gray-700 dark:text-gray-300">
          Awaited is particularly useful for extracting types from async
          functions, enabling type-safe handling of async operations.
        </p>

        <CodeBlock title="Awaited with async functions">
          {`// Extract return type from async function
async function getUser(id: number): Promise<{
  id: number;
  name: string;
  email: string;
}> {
  return { id, name: "John", email: "john@example.com" };
}

type UserType = Awaited<ReturnType<typeof getUser>>;
// { id: number; name: string; email: string }

// Type-safe async handlers
async function fetchPosts(): Promise<Array<{ id: number; title: string }>> {
  return [{ id: 1, title: "Post" }];
}

type Post = Awaited<ReturnType<typeof fetchPosts>>[number];
// { id: number; title: string }

// Generic async functions
async function fetchResource<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json();
}

type ResourceData<T> = Awaited<ReturnType<typeof fetchResource<T>>>;
// T

// Async function with nested promises
async function complexFetch(): Promise<Promise<string>> {
  return Promise.resolve("data");
}

type ComplexData = Awaited<ReturnType<typeof complexFetch>>;
// string (fully unwrapped)

// Multiple async operations
async function getUserWithPosts(userId: number) {
  const user = await getUser(userId);
  const posts = await fetchPosts();
  return { user, posts };
}

type UserWithPosts = Awaited<ReturnType<typeof getUserWithPosts>>;
// { user: UserType; posts: Post[] }

// Async generators
async function* generateNumbers(): AsyncGenerator<number> {
  yield 1;
  yield 2;
  yield 3;
}

type GeneratorValue = Awaited<ReturnType<typeof generateNumbers>>;
// AsyncGenerator<number>

// Conditional async returns
async function maybeGetData(
  shouldFetch: boolean
): Promise<string | null> {
  return shouldFetch ? "data" : null;
}

type MaybeData = Awaited<ReturnType<typeof maybeGetData>>;
// string | null

// Error handling types
async function fetchWithError(): Promise<{ data: string } | { error: Error }> {
  try {
    return { data: "success" };
  } catch (error) {
    return { error: error as Error };
  }
}

type FetchResult = Awaited<ReturnType<typeof fetchWithError>>;
// { data: string } | { error: Error }

// Async class methods
class UserService {
  async findById(id: number): Promise<UserType> {
    return getUser(id);
  }

  async findAll(): Promise<UserType[]> {
    return [];
  }
}

type FindByIdResult = Awaited<ReturnType<UserService["findById"]>>;
// UserType

// Async arrow functions
const fetchConfig = async (): Promise<{
  apiUrl: string;
  timeout: number;
}> => {
  return { apiUrl: "https://api.example.com", timeout: 5000 };
};

type Config = Awaited<ReturnType<typeof fetchConfig>>;
// { apiUrl: string; timeout: number }

// Async callback types
type AsyncCallback<T> = () => Promise<T>;
type CallbackResult<T extends AsyncCallback<any>> = Awaited<ReturnType<T>>;

const callback: AsyncCallback<number> = async () => 42;
type Result = CallbackResult<typeof callback>;
// number

// Async middleware
type AsyncMiddleware<T, R> = (input: T) => Promise<R>;
type MiddlewareOutput<M extends AsyncMiddleware<any, any>> = Awaited<ReturnType<M>>;

const middleware: AsyncMiddleware<string, number> = async (s) => s.length;
type Output = MiddlewareOutput<typeof middleware>;
// number

// Async factory functions
async function createUser(data: { name: string; email: string }): Promise<{
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}> {
  return {
    ...data,
    id: Date.now(),
    createdAt: new Date()
  };
}

type CreatedUser = Awaited<ReturnType<typeof createUser>>;
// { id: number; name: string; email: string; createdAt: Date }

// Async validation
async function validateUser(user: unknown): Promise<UserType | null> {
  // Validation logic
  return user as UserType;
}

type ValidatedUser = Awaited<ReturnType<typeof validateUser>>;
// UserType | null

// Promise-returning HOF
function withRetry<T>(fn: () => Promise<T>): () => Promise<T> {
  return async () => {
    try {
      return await fn();
    } catch {
      return await fn();
    }
  };
}

type RetriedResult<T> = Awaited<ReturnType<ReturnType<typeof withRetry<T>>>>;
// T`}
        </CodeBlock>

        <InfoBox type="tip">
          Use Awaited with ReturnType to extract async function return types.
          This enables type-safe handling of async operations, API responses,
          and async function composition.
        </InfoBox>
      </Section>

      <Section title="3. Awaited with Promise Combinators">
        <p className="text-gray-700 dark:text-gray-300">
          Awaited works seamlessly with Promise.all, Promise.race,
          Promise.allSettled, and Promise.any for type-safe concurrent
          operations.
        </p>

        <CodeBlock title="Awaited with Promise combinators">
          {`// Promise.all with Awaited
async function fetchUserData() {
  return Promise.all([
    fetchUser(1),
    fetchPosts(),
    fetchComments()
  ]);
}

type AllData = Awaited<ReturnType<typeof fetchUserData>>;
// [UserType, Post[], Comment[]]

// Extract individual types from Promise.all
const promises = [
  Promise.resolve("string"),
  Promise.resolve(123),
  Promise.resolve(true)
] as const;

type AllResults = Awaited<typeof promises[number]>;
// string | number | boolean

// Promise.race with Awaited
async function raceRequests() {
  return Promise.race([
    fetchFromServer1(),
    fetchFromServer2()
  ]);
}

type RaceResult = Awaited<ReturnType<typeof raceRequests>>;
// Data from first resolved promise

// Promise.allSettled with Awaited
async function fetchAllSettled() {
  return Promise.allSettled([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ]);
}

type SettledResults = Awaited<ReturnType<typeof fetchAllSettled>>;
// PromiseSettledResult<UserType>[]

// Promise.any with Awaited
async function fetchAny() {
  return Promise.any([
    fetchFromCache(),
    fetchFromDatabase(),
    fetchFromAPI()
  ]);
}

type AnyResult = Awaited<ReturnType<typeof fetchAny>>;
// Data from first successful promise

// Type-safe Promise.all with heterogeneous types
async function fetchMultiple() {
  const [user, posts, config] = await Promise.all([
    getUser(1),
    fetchPosts(),
    fetchConfig()
  ]);
  
  return { user, posts, config };
}

type MultipleData = Awaited<ReturnType<typeof fetchMultiple>>;
// { user: UserType; posts: Post[]; config: Config }

// Parallel fetching with mapped types
type FetchFunctions = {
  user: typeof getUser;
  posts: typeof fetchPosts;
  config: typeof fetchConfig;
};

type FetchResults = {
  [K in keyof FetchFunctions]: Awaited<ReturnType<FetchFunctions[K]>>;
};
// { user: UserType; posts: Post[]; config: Config }

// Promise.all with dynamic array
async function fetchUsers(ids: number[]) {
  return Promise.all(ids.map(id => getUser(id)));
}

type Users = Awaited<ReturnType<typeof fetchUsers>>;
// UserType[]

// Nested Promise.all
async function fetchNested() {
  const results = await Promise.all([
    Promise.all([getUser(1), getUser(2)]),
    Promise.all([fetchPosts(), fetchComments()])
  ]);
  return results;
}

type NestedResults = Awaited<ReturnType<typeof fetchNested>>;
// [[UserType, UserType], [Post[], Comment[]]]

// Promise.allSettled with typed results
type SettledResult<T> = {
  status: "fulfilled";
  value: T;
} | {
  status: "rejected";
  reason: any;
};

async function safePromiseAll<T>(promises: Promise<T>[]) {
  return Promise.allSettled(promises);
}

type SafeResults<T> = Awaited<ReturnType<typeof safePromiseAll<T>>>;
// PromiseSettledResult<T>[]

// Conditional Promise.all
async function conditionalFetch(includeOptional: boolean) {
  const required = [getUser(1), fetchPosts()];
  const optional = includeOptional ? [fetchComments()] : [];
  return Promise.all([...required, ...optional]);
}

type ConditionalResults = Awaited<ReturnType<typeof conditionalFetch>>;
// (UserType | Post[] | Comment[])[]

// Type-safe data loader
class DataLoader<T> {
  async loadMany(ids: string[]): Promise<T[]> {
    return Promise.all(ids.map(id => this.load(id)));
  }

  async load(id: string): Promise<T> {
    return {} as T;
  }
}

const userLoader = new DataLoader<UserType>();
type LoadedUsers = Awaited<ReturnType<typeof userLoader.loadMany>>;
// UserType[]

// Promise combinator utility
async function parallelMap<T, R>(
  items: T[],
  mapper: (item: T) => Promise<R>
): Promise<R[]> {
  return Promise.all(items.map(mapper));
}

type MappedResults<T, R> = Awaited<ReturnType<typeof parallelMap<T, R>>>;
// R[]

// Race with timeout
async function fetchWithTimeout<T>(
  promise: Promise<T>,
  timeout: number
): Promise<T> {
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), timeout)
  );
  return Promise.race([promise, timeoutPromise]);
}

type TimeoutResult<T> = Awaited<ReturnType<typeof fetchWithTimeout<T>>>;
// T

// Batch processing
async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize: number = 10
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);
  }
  return results;
}

type BatchResults<T, R> = Awaited<ReturnType<typeof processBatch<T, R>>>;
// R[]`}
        </CodeBlock>

        <InfoBox type="important">
          Awaited works with Promise combinators (all, race, allSettled, any)
          for type-safe concurrent operations. Use it to extract types from
          parallel fetches, batch processing, and complex async workflows.
        </InfoBox>
      </Section>

      <Section title="4. Advanced Awaited Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns combining Awaited with generics, conditional types,
          and mapped types for sophisticated async type handling.
        </p>

        <CodeBlock title="Advanced Awaited patterns">
          {`// Deep unwrap utility
type DeepAwaited<T> = T extends Promise<infer U>
  ? DeepAwaited<U>
  : T extends (...args: any[]) => Promise<infer R>
  ? DeepAwaited<R>
  : T;

type Nested = Promise<Promise<Promise<string>>>;
type Unwrapped = DeepAwaited<Nested>;
// string

// Awaited with mapped types
type AwaitedObject<T> = {
  [K in keyof T]: Awaited<T[K]>;
};

interface PromiseData {
  user: Promise<UserType>;
  posts: Promise<Post[]>;
  config: Promise<Config>;
}

type ResolvedData = AwaitedObject<PromiseData>;
// { user: UserType; posts: Post[]; config: Config }

// Async function map
type AsyncFnMap<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => Promise<infer R>
    ? (...args: A) => R
    : T[K];
};

interface ApiMethods {
  getUser: (id: number) => Promise<UserType>;
  getPosts: () => Promise<Post[]>;
}

type SyncMethods = AsyncFnMap<ApiMethods>;
// { getUser: (id: number) => UserType; getPosts: () => Post[] }

// Conditional awaited
type MaybeAwaited<T, Condition extends boolean> = 
  Condition extends true ? Awaited<T> : T;

type WithAwait = MaybeAwaited<Promise<string>, true>;   // string
type WithoutAwait = MaybeAwaited<Promise<string>, false>; // Promise<string>

// Awaited union helper
type AwaitedUnion<T> = T extends any ? Awaited<T> : never;

type Promises = Promise<string> | Promise<number> | Promise<boolean>;
type Values = AwaitedUnion<Promises>;
// string | number | boolean

// Extract async function return types
type AsyncReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<infer R>
    ? R
    : never;
};

interface AsyncOperations {
  fetchUser: () => Promise<UserType>;
  fetchPosts: () => Promise<Post[]>;
  regular: () => string;
}

type Returns = AsyncReturnTypes<AsyncOperations>;
// { fetchUser: UserType; fetchPosts: Post[]; regular: never }

// Promise-like type checking
type IsPromise<T> = T extends Promise<any> ? true : false;
type IsPromiseString = IsPromise<Promise<string>>;  // true
type IsPromiseNumber = IsPromise<number>;  // false

// Filter async methods
type AsyncMethods<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => Promise<any> ? K : never]: T[K];
};

type OnlyAsync = AsyncMethods<AsyncOperations>;
// { fetchUser: ...; fetchPosts: ... }

// Awaited with inference
function handleAsync<T extends Promise<any>>(
  promise: T
): Promise<Awaited<T>> {
  return promise.then(value => value);
}

// Type-safe async pipe
type AsyncPipe<T, U> = (input: T) => Promise<U>;

function composeAsync<A, B, C>(
  f: AsyncPipe<A, B>,
  g: AsyncPipe<B, C>
): AsyncPipe<A, C> {
  return async (input: A) => {
    const intermediate = await f(input);
    return await g(intermediate);
  };
}

type ComposedResult<
  F extends AsyncPipe<any, any>,
  G extends AsyncPipe<any, any>
> = Awaited<ReturnType<ReturnType<typeof composeAsync<any, any, any>>>>;

// Recursive promise unwrapping
type RecursiveAwaited<T> = T extends Promise<Promise<infer U>>
  ? RecursiveAwaited<Promise<U>>
  : T extends Promise<infer U>
  ? U
  : T;

// Generic async wrapper
class AsyncWrapper<T> {
  constructor(private promise: Promise<T>) {}

  async map<R>(fn: (value: T) => R): Promise<R> {
    const value = await this.promise;
    return fn(value);
  }

  async flatMap<R>(fn: (value: T) => Promise<R>): Promise<R> {
    const value = await this.promise;
    return fn(value);
  }
}

type WrappedValue<W extends AsyncWrapper<any>> = 
  W extends AsyncWrapper<infer T> ? T : never;

// Promise state machine
type PromiseState<T> =
  | { status: "pending"; value: undefined }
  | { status: "fulfilled"; value: Awaited<T> }
  | { status: "rejected"; error: Error };

async function getPromiseState<T>(
  promise: Promise<T>
): Promise<PromiseState<T>> {
  try {
    const value = await promise;
    return { status: "fulfilled", value };
  } catch (error) {
    return { status: "rejected", error: error as Error };
  }
}

type State = Awaited<ReturnType<typeof getPromiseState<UserType>>>;
// { status: "fulfilled"; value: UserType } | { status: "rejected"; error: Error }

// Lazy async evaluation
type LazyAsync<T> = () => Promise<T>;

function createLazy<T>(factory: LazyAsync<T>): {
  get: () => Promise<Awaited<T>>;
} {
  let cached: Awaited<T> | undefined;
  
  return {
    get: async () => {
      if (cached === undefined) {
        cached = await factory();
      }
      return cached;
    }
  };
}

// Awaited with discriminated unions
type AsyncResult<T, E = Error> =
  | Promise<{ success: true; data: T }>
  | Promise<{ success: false; error: E }>;

type UnwrappedResult<T, E = Error> = Awaited<AsyncResult<T, E>>;
// { success: true; data: T } | { success: false; error: E }

// Generic retry mechanism
async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3
): Promise<Awaited<T>> {
  let lastError: Error;
  
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
    }
  }
  
  throw lastError!;
}

type RetryResult<T> = Awaited<ReturnType<typeof retry<T>>>;
// Awaited<T>`}
        </CodeBlock>

        <InfoBox type="tip">
          Advanced Awaited patterns enable deep unwrapping, mapped async types,
          conditional awaiting, and type-safe async composition. Use them for
          complex async workflows and framework design.
        </InfoBox>
      </Section>

      <Section title="5. Practical Use Cases">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world applications of Awaited in API clients, data fetching,
          async state management, and type-safe async operations.
        </p>

        <CodeBlock title="Practical Awaited examples">
          {`// Type-safe API client
class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(\`https://api.example.com\${endpoint}\`);
    return response.json();
  }

  async post<T, R>(endpoint: string, data: T): Promise<R> {
    const response = await fetch(\`https://api.example.com\${endpoint}\`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

const client = new ApiClient();

type GetResult = Awaited<ReturnType<typeof client.get<UserType>>>;
// UserType

type PostResult = Awaited<ReturnType<typeof client.post<CreateUserDto, UserType>>>;
// UserType

// React Query / TanStack Query types
function useQuery<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<Awaited<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetcher()
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

// Usage
const { data } = useQuery(() => client.get<UserType>("/users/1"));
// data is UserType | null

// Async reducer pattern
type AsyncAction<T extends string, P> = {
  type: T;
  payload: Promise<P>;
};

type ResolvedAction<A extends AsyncAction<any, any>> = {
  type: A["type"];
  payload: Awaited<A["payload"]>;
};

async function resolveAction<A extends AsyncAction<any, any>>(
  action: A
): Promise<ResolvedAction<A>> {
  return {
    type: action.type,
    payload: await action.payload
  };
}

// Data loader pattern
class UserLoader {
  private cache = new Map<number, Promise<UserType>>();

  load(id: number): Promise<UserType> {
    if (!this.cache.has(id)) {
      this.cache.set(id, this.fetch(id));
    }
    return this.cache.get(id)!;
  }

  private async fetch(id: number): Promise<UserType> {
    return getUser(id);
  }

  async loadMany(ids: number[]): Promise<Awaited<UserType>[]> {
    return Promise.all(ids.map(id => this.load(id)));
  }
}

type LoadedUser = Awaited<ReturnType<UserLoader["load"]>>;
// UserType

type LoadedUsers = Awaited<ReturnType<UserLoader["loadMany"]>>;
// UserType[]

// Async middleware chain
type AsyncMiddleware<T> = (value: T) => Promise<T>;

class MiddlewareChain<T> {
  private middlewares: AsyncMiddleware<T>[] = [];

  use(middleware: AsyncMiddleware<T>): this {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(value: T): Promise<Awaited<T>> {
    let result = value;
    for (const middleware of this.middlewares) {
      result = await middleware(result);
    }
    return result;
  }
}

// Type-safe service layer
class UserService {
  async createUser(data: CreateUserDto): Promise<UserType> {
    return client.post<CreateUserDto, UserType>("/users", data);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<UserType> {
    return client.post<UpdateUserDto, UserType>(\`/users/\${id}\`, data);
  }

  async deleteUser(id: number): Promise<void> {
    await client.post(\`/users/\${id}\`, {});
  }
}

type CreatedUser = Awaited<ReturnType<UserService["createUser"]>>;
// UserType

// Background job processor
class JobProcessor<T, R> {
  async process(job: T): Promise<R> {
    // Processing logic
    return {} as R;
  }

  async processBatch(jobs: T[]): Promise<Awaited<R>[]> {
    return Promise.all(jobs.map(job => this.process(job)));
  }
}

const processor = new JobProcessor<EmailJob, EmailResult>();
type JobResult = Awaited<ReturnType<typeof processor.process>>;
// EmailResult

// Async cache
class AsyncCache<K, V> {
  private cache = new Map<K, Promise<V>>();

  async get(key: K, fetcher: () => Promise<V>): Promise<Awaited<V>> {
    if (!this.cache.has(key)) {
      this.cache.set(key, fetcher());
    }
    return this.cache.get(key)!;
  }

  async set(key: K, value: Promise<V>): Promise<void> {
    this.cache.set(key, value);
    await value;  // Ensure promise resolves
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }
}

const cache = new AsyncCache<string, UserType>();
type CachedUser = Awaited<ReturnType<typeof cache.get>>;
// UserType

// Database repository
abstract class Repository<T> {
  abstract findById(id: number): Promise<T>;
  abstract findAll(): Promise<T[]>;
  abstract create(data: Omit<T, "id">): Promise<T>;
  abstract update(id: number, data: Partial<T>): Promise<T>;
  abstract delete(id: number): Promise<void>;
}

class UserRepository extends Repository<UserType> {
  async findById(id: number): Promise<UserType> {
    return getUser(id);
  }

  async findAll(): Promise<UserType[]> {
    return [];
  }

  async create(data: Omit<UserType, "id">): Promise<UserType> {
    return {} as UserType;
  }

  async update(id: number, data: Partial<UserType>): Promise<UserType> {
    return {} as UserType;
  }

  async delete(id: number): Promise<void> {}
}

type FoundUser = Awaited<ReturnType<UserRepository["findById"]>>;
// UserType

type AllUsers = Awaited<ReturnType<UserRepository["findAll"]>>;
// UserType[]

// WebSocket message handler
class WebSocketClient<T> {
  async send(message: T): Promise<void> {
    // Send logic
  }

  async waitForResponse(): Promise<T> {
    // Wait for response
    return {} as T;
  }

  async request(message: T): Promise<Awaited<T>> {
    await this.send(message);
    return this.waitForResponse();
  }
}

const wsClient = new WebSocketClient<Message>();
type Response = Awaited<ReturnType<typeof wsClient.request>>;
// Message`}
        </CodeBlock>

        <InfoBox type="important">
          Use Awaited in production for API clients, data loaders, async state
          management, service layers, and any async operations. It ensures
          type-safe Promise handling and seamless integration with async/await.
        </InfoBox>
      </Section>
    </div>
  );
}
