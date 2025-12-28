import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ThisParameterUtilitiesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        This Parameter Utilities
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript provides utilities for working with the this parameter:
        ThisParameterType&lt;T&gt; extracts it, OmitThisParameter&lt;T&gt;
        removes it, and ThisType&lt;T&gt; marks the contextual this type.
      </p>

      <Section title="1. ThisParameterType<T>">
        <p className="text-gray-700 dark:text-gray-300">
          ThisParameterType&lt;T&gt; extracts the type of the this parameter
          from a function type. Returns unknown if no explicit this parameter is
          declared.
        </p>

        <CodeBlock title="ThisParameterType<T> examples">
          {`// Basic ThisParameterType usage
function greet(this: { name: string }, message: string): string {
  return \`\${this.name} says: \${message}\`;
}

type GreetThis = ThisParameterType<typeof greet>;
// { name: string }

const context: GreetThis = { name: "John" };
const greeting = greet.call(context, "Hello!");
// "John says: Hello!"

// ThisParameterType with class methods
class User {
  name: string = "John";

  greet(this: User, message: string): string {
    return \`\${this.name}: \${message}\`;
  }
}

type UserGreetThis = ThisParameterType<typeof User.prototype.greet>;
// User

// ThisParameterType without explicit this
function noThis(value: string): string {
  return value;
}

type NoThisType = ThisParameterType<typeof noThis>;
// unknown

// ThisParameterType with arrow functions
const arrowFn = (value: string) => value;
type ArrowThis = ThisParameterType<typeof arrowFn>;
// unknown (arrow functions don't have this parameter)

// ThisParameterType with interfaces
interface Context {
  user: string;
  isAdmin: boolean;
}

interface HandlerFn {
  (this: Context, data: any): void;
}

type HandlerThis = ThisParameterType<HandlerFn>;
// Context

// Extract this from method signature
type Method<This, Args extends any[], Return> = (
  this: This,
  ...args: Args
) => Return;

type ExtractThis<T extends Method<any, any[], any>> = ThisParameterType<T>;

function withContext(this: { value: number }, multiplier: number): number {
  return this.value * multiplier;
}

type ContextType = ExtractThis<typeof withContext>;
// { value: number }

// ThisParameterType for event handlers
interface EventContext {
  preventDefault(): void;
  stopPropagation(): void;
}

type EventHandler = (this: EventContext, data: any) => void;
type EventThis = ThisParameterType<EventHandler>;
// EventContext

// ThisParameterType with generic functions
function genericMethod<T>(this: { data: T }, newData: T): void {
  this.data = newData;
}

type GenericThis = ThisParameterType<typeof genericMethod>;
// { data: unknown }

// Validate this context
function requiresContext(this: { id: number; name: string }): void {
  console.log(\`\${this.name} (\${this.id})\`);
}

type RequiredContext = ThisParameterType<typeof requiresContext>;
// { id: number; name: string }

function callWithContext(
  fn: typeof requiresContext,
  context: RequiredContext
): void {
  fn.call(context);
}

// ThisParameterType for builders
interface Builder {
  value: number;
}

interface BuilderMethods {
  add(this: Builder, n: number): this;
  multiply(this: Builder, n: number): this;
  build(this: Builder): number;
}

type AddThis = ThisParameterType<BuilderMethods["add"]>;
// Builder

// ThisParameterType with callback types
type Callback<This, Args extends any[]> = (this: This, ...args: Args) => void;

type CallbackContext<T extends Callback<any, any>> = ThisParameterType<T>;

type MyCallback = Callback<{ value: string }, [number]>;
type MyContext = CallbackContext<MyCallback>;
// { value: string }

// Check if function has this parameter
type HasThis<T extends (...args: any[]) => any> = 
  ThisParameterType<T> extends unknown ? false : true;

type HasThisGreet = HasThis<typeof greet>;
// true

type HasThisNoThis = HasThis<typeof noThis>;
// false

// ThisParameterType for jQuery-style plugins
interface JQueryContext {
  element: HTMLElement;
  data: Record<string, any>;
}

type PluginFn = (this: JQueryContext, options: any) => void;
type PluginThis = ThisParameterType<PluginFn>;
// JQueryContext

// ThisParameterType with method decorators
function logThis<T extends (...args: any[]) => any>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
): void {
  const originalMethod = descriptor.value;
  if (!originalMethod) return;

  type This = ThisParameterType<T>;
  
  descriptor.value = function(this: This, ...args: Parameters<T>) {
    console.log("This context:", this);
    return originalMethod.apply(this, args);
  } as T;
}

class Example {
  value = 10;

  @logThis
  method(this: Example, n: number): number {
    return this.value + n;
  }
}

// ThisParameterType for state management
interface State {
  count: number;
  user: string | null;
}

interface Actions {
  increment(this: State): void;
  setUser(this: State, name: string): void;
  reset(this: State): void;
}

type IncrementThis = ThisParameterType<Actions["increment"]>;
// State

function bindActions<T extends Record<string, (this: any, ...args: any[]) => any>>(
  actions: T,
  state: ThisParameterType<T[keyof T]>
): { [K in keyof T]: OmitThisParameter<T[K]> } {
  const bound = {} as any;
  for (const key in actions) {
    bound[key] = actions[key].bind(state);
  }
  return bound;
}`}
        </CodeBlock>

        <InfoBox type="info">
          ThisParameterType&lt;T&gt; extracts the explicit this parameter type
          from a function. Use it to validate contexts, create type-safe
          bindings, and work with methods that require specific this contexts.
        </InfoBox>
      </Section>

      <Section title="2. OmitThisParameter<T>">
        <p className="text-gray-700 dark:text-gray-300">
          OmitThisParameter&lt;T&gt; removes the this parameter from a function
          type. Useful for creating bound versions or extracting just the
          regular parameters.
        </p>

        <CodeBlock title="OmitThisParameter<T> examples">
          {`// Basic OmitThisParameter usage
function greet(this: { name: string }, message: string, time: string): string {
  return \`\${this.name} says \${message} at \${time}\`;
}

type BoundGreet = OmitThisParameter<typeof greet>;
// (message: string, time: string) => string

const user = { name: "John" };
const boundGreet: BoundGreet = greet.bind(user);
boundGreet("Hello", "10:00");  // No this parameter needed

// OmitThisParameter for method binding
class Calculator {
  constructor(private value: number = 0) {}

  add(this: Calculator, n: number): number {
    return this.value + n;
  }

  multiply(this: Calculator, n: number): number {
    return this.value * n;
  }
}

const calc = new Calculator(10);

type BoundAdd = OmitThisParameter<typeof calc.add>;
// (n: number) => number

const boundAdd: BoundAdd = calc.add.bind(calc);
const result = boundAdd(5);  // 15

// Create bound version of all methods
type BoundMethods<T> = {
  [K in keyof T]: T[K] extends (this: any, ...args: infer A) => infer R
    ? OmitThisParameter<T[K]>
    : T[K];
};

type BoundCalculator = BoundMethods<Calculator>;
// { add: (n: number) => number; multiply: (n: number) => number }

function bindAll<T extends object>(obj: T): BoundMethods<T> {
  const bound = {} as BoundMethods<T>;
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "function") {
      bound[key] = value.bind(obj) as any;
    } else {
      bound[key] = value as any;
    }
  }
  return bound;
}

const boundCalc = bindAll(calc);
boundCalc.add(5);  // No this parameter

// OmitThisParameter for event handlers
interface EventContext {
  preventDefault(): void;
  stopPropagation(): void;
}

type EventHandler = (this: EventContext, data: any) => void;
type BoundEventHandler = OmitThisParameter<EventHandler>;
// (data: any) => void

const handleEvent: EventHandler = function(this: EventContext, data: any) {
  this.preventDefault();
  console.log(data);
};

const context: EventContext = {
  preventDefault: () => {},
  stopPropagation: () => {}
};

const boundHandler: BoundEventHandler = handleEvent.bind(context);
boundHandler({ value: 123 });  // No this parameter

// OmitThisParameter for callbacks
type Callback<This, Args extends any[]> = (this: This, ...args: Args) => void;
type BoundCallback<T extends Callback<any, any>> = OmitThisParameter<T>;

type MyCallback = Callback<{ value: number }, [string, number]>;
type MyBoundCallback = BoundCallback<MyCallback>;
// (arg0: string, arg1: number) => void

// OmitThisParameter for action creators
interface State {
  count: number;
  users: string[];
}

interface Actions {
  increment(this: State): void;
  addUser(this: State, name: string): void;
  reset(this: State): void;
}

type BoundActions = {
  [K in keyof Actions]: OmitThisParameter<Actions[K]>;
};
// { increment: () => void; addUser: (name: string) => void; reset: () => void }

function createActions(state: State): BoundActions {
  const actions: Actions = {
    increment() {
      this.count++;
    },
    addUser(name: string) {
      this.users.push(name);
    },
    reset() {
      this.count = 0;
      this.users = [];
    }
  };

  return {
    increment: actions.increment.bind(state),
    addUser: actions.addUser.bind(state),
    reset: actions.reset.bind(state)
  };
}

const state: State = { count: 0, users: [] };
const boundActions = createActions(state);
boundActions.increment();  // No this needed
boundActions.addUser("Alice");

// OmitThisParameter for method references
class Logger {
  constructor(private prefix: string) {}

  log(this: Logger, message: string): void {
    console.log(\`[\${this.prefix}] \${message}\`);
  }

  error(this: Logger, message: string): void {
    console.error(\`[\${this.prefix}] ERROR: \${message}\`);
  }
}

const logger = new Logger("APP");

type BoundLog = OmitThisParameter<typeof logger.log>;
// (message: string) => void

const log: BoundLog = logger.log.bind(logger);
log("Application started");

// OmitThisParameter for React event handlers
interface ComponentThis {
  state: any;
  setState: (state: any) => void;
}

type ComponentHandler = (this: ComponentThis, event: React.MouseEvent) => void;
type BoundHandler = OmitThisParameter<ComponentHandler>;
// (event: React.MouseEvent) => void

class Component {
  state = { count: 0 };

  handleClick(this: Component, event: React.MouseEvent): void {
    this.setState({ count: this.state.count + 1 });
  }

  setState(newState: any): void {
    this.state = { ...this.state, ...newState };
  }
}

const component = new Component();
const onClick: OmitThisParameter<typeof component.handleClick> = 
  component.handleClick.bind(component);

// OmitThisParameter with generics
function createBound<T extends (this: any, ...args: any[]) => any>(
  fn: T,
  context: ThisParameterType<T>
): OmitThisParameter<T> {
  return fn.bind(context);
}

const boundGeneric = createBound(greet, { name: "Alice" });
boundGeneric("Hi", "noon");  // Type-safe!

// OmitThisParameter for store methods
class Store<T> {
  constructor(private data: T) {}

  get(this: Store<T>): T {
    return this.data;
  }

  set(this: Store<T>, value: T): void {
    this.data = value;
  }

  update(this: Store<T>, updater: (current: T) => T): void {
    this.data = updater(this.data);
  }
}

const store = new Store({ count: 0 });

type BoundStore = {
  [K in keyof Store<any>]: Store<any>[K] extends Function
    ? OmitThisParameter<Store<any>[K]>
    : Store<any>[K];
};

function bindStore<T>(store: Store<T>): BoundStore {
  return {
    get: store.get.bind(store),
    set: store.set.bind(store),
    update: store.update.bind(store)
  } as BoundStore;
}

// OmitThisParameter for middleware
type Middleware<This> = (
  this: This,
  next: OmitThisParameter<Middleware<This>>
) => void;

function createMiddleware<T>(context: T) {
  const middleware: Middleware<T> = function(this: T, next) {
    console.log("Before", this);
    next();
    console.log("After", this);
  };

  const bound: OmitThisParameter<typeof middleware> = middleware.bind(context);
  return bound;
}

// OmitThisParameter for plugin systems
interface PluginContext {
  register(name: string): void;
  emit(event: string): void;
}

interface Plugin {
  init(this: PluginContext): void;
  destroy(this: PluginContext): void;
}

type BoundPlugin = {
  [K in keyof Plugin]: OmitThisParameter<Plugin[K]>;
};

function loadPlugin(plugin: Plugin, context: PluginContext): BoundPlugin {
  return {
    init: plugin.init.bind(context),
    destroy: plugin.destroy.bind(context)
  };
}`}
        </CodeBlock>

        <InfoBox type="tip">
          OmitThisParameter&lt;T&gt; removes the this parameter from function
          types. Use it for creating bound versions of methods, converting
          instance methods to standalone functions, and working with callbacks.
        </InfoBox>
      </Section>

      <Section title="3. ThisType<T>">
        <p className="text-gray-700 dark:text-gray-300">
          ThisType&lt;T&gt; is a marker interface that sets the contextual this
          type in object literals. It doesn't return a type but influences type
          checking within the object.
        </p>

        <CodeBlock title="ThisType<T> examples">
          {`// Basic ThisType usage
interface State {
  count: number;
  name: string;
}

interface Methods {
  increment(): void;
  setName(name: string): void;
  greet(): string;
}

type Store = State & ThisType<State & Methods>;

const store: Store = {
  count: 0,
  name: "Store",
  
  increment() {
    this.count++;  // this is State & Methods
  },
  
  setName(name: string) {
    this.name = name;  // this is State & Methods
  },
  
  greet() {
    return \`Hello from \${this.name}\`;  // this is State & Methods
  }
};

// ThisType with Vue-like API
interface ComponentData {
  message: string;
  count: number;
}

interface ComponentMethods {
  increment(): void;
  updateMessage(msg: string): void;
}

interface ComponentComputed {
  doubled(): number;
  fullMessage(): string;
}

type Component = ComponentData & 
  ThisType<ComponentData & ComponentMethods & ComponentComputed>;

function defineComponent<D, M, C>(config: {
  data: D;
  methods: M & ThisType<D & M & C>;
  computed: C & ThisType<D & M & C>;
}): D & M & C {
  return {} as D & M & C;
}

const component = defineComponent({
  data: {
    message: "Hello",
    count: 0
  },
  methods: {
    increment() {
      this.count++;  // this has data, methods, and computed
      console.log(this.doubled());  // Can access computed
    },
    updateMessage(msg: string) {
      this.message = msg;
    }
  },
  computed: {
    doubled() {
      return this.count * 2;  // this has data, methods, and computed
    },
    fullMessage() {
      return \`Message: \${this.message}\`;
    }
  }
});

// ThisType for object builders
interface BuilderState {
  value: number;
}

interface BuilderMethods {
  add(n: number): this;
  multiply(n: number): this;
  build(): number;
}

function createBuilder(): BuilderState & BuilderMethods {
  const obj: BuilderState & ThisType<BuilderState & BuilderMethods> = {
    value: 0
  };

  const methods: BuilderMethods & ThisType<BuilderState & BuilderMethods> = {
    add(n: number) {
      this.value += n;
      return this;
    },
    multiply(n: number) {
      this.value *= n;
      return this;
    },
    build() {
      return this.value;
    }
  };

  return Object.assign(obj, methods);
}

const builder = createBuilder();
const result = builder.add(5).multiply(2).build();  // 10

// ThisType for mixin pattern
function createMixin<State, Methods>(
  state: State,
  methods: Methods & ThisType<State & Methods>
): State & Methods {
  return Object.assign({}, state, methods);
}

interface CounterState {
  count: number;
}

interface CounterMethods {
  increment(): void;
  decrement(): void;
  reset(): void;
}

const counter = createMixin<CounterState, CounterMethods>(
  { count: 0 },
  {
    increment() {
      this.count++;  // this is CounterState & CounterMethods
    },
    decrement() {
      this.count--;
    },
    reset() {
      this.count = 0;
    }
  }
);

// ThisType for Redux-like store
interface StoreState {
  user: string | null;
  isAuthenticated: boolean;
}

interface StoreActions {
  login(username: string): void;
  logout(): void;
  checkAuth(): boolean;
}

function createStore<S, A>(
  initialState: S,
  actions: A & ThisType<S & A>
): S & A {
  return Object.assign({}, initialState, actions);
}

const authStore = createStore<StoreState, StoreActions>(
  {
    user: null,
    isAuthenticated: false
  },
  {
    login(username: string) {
      this.user = username;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    },
    checkAuth() {
      return this.isAuthenticated;  // this has state and actions
    }
  }
);

// ThisType for ORM-like models
interface ModelData {
  id: number;
  name: string;
  email: string;
}

interface ModelMethods {
  save(): Promise<void>;
  delete(): Promise<void>;
  validate(): boolean;
}

function defineModel<D, M>(
  data: D,
  methods: M & ThisType<D & M>
): D & M {
  return Object.assign({}, data, methods);
}

const user = defineModel<ModelData, ModelMethods>(
  {
    id: 1,
    name: "John",
    email: "john@example.com"
  },
  {
    async save() {
      if (!this.validate()) {
        throw new Error("Validation failed");
      }
      console.log("Saving", this.name, this.email);
    },
    async delete() {
      console.log("Deleting user", this.id);
    },
    validate() {
      return this.name.length > 0 && this.email.includes("@");
    }
  }
);

// ThisType for plugin system
interface PluginContext {
  plugins: Plugin[];
  state: any;
}

interface Plugin {
  name: string;
  init(): void;
  destroy(): void;
}

function createPlugin<T extends Plugin>(
  config: T & ThisType<PluginContext & T>
): Plugin {
  const context: PluginContext = {
    plugins: [],
    state: {}
  };

  return Object.assign(context, config);
}

// ThisType with getters and setters
interface StoreData {
  _count: number;
}

interface StoreGettersSetters {
  count: number;  // Will be getter/setter
  doubled: number;  // Getter only
}

const storeWithGetters: StoreData & ThisType<StoreData & StoreGettersSetters> = {
  _count: 0,
  
  get count() {
    return this._count;
  },
  
  set count(value: number) {
    this._count = value;
  },
  
  get doubled() {
    return this._count * 2;
  }
};

// ThisType for event emitter
interface EmitterState {
  listeners: Map<string, Function[]>;
}

interface EmitterMethods {
  on(event: string, handler: Function): void;
  emit(event: string, ...args: any[]): void;
  off(event: string, handler: Function): void;
}

function createEmitter(): EmitterState & EmitterMethods {
  const state: EmitterState & ThisType<EmitterState & EmitterMethods> = {
    listeners: new Map()
  };

  const methods: EmitterMethods & ThisType<EmitterState & EmitterMethods> = {
    on(event: string, handler: Function) {
      const handlers = this.listeners.get(event) ?? [];
      this.listeners.set(event, [...handlers, handler]);
    },
    
    emit(event: string, ...args: any[]) {
      const handlers = this.listeners.get(event) ?? [];
      handlers.forEach(handler => handler(...args));
    },
    
    off(event: string, handler: Function) {
      const handlers = this.listeners.get(event) ?? [];
      this.listeners.set(
        event,
        handlers.filter(h => h !== handler)
      );
    }
  };

  return Object.assign(state, methods);
}

const emitter = createEmitter();
emitter.on("test", (data: any) => console.log(data));
emitter.emit("test", { value: 123 });`}
        </CodeBlock>

        <InfoBox type="important">
          ThisType&lt;T&gt; is a marker that sets the contextual this type in
          object literals. Use it for mixins, Vue-like component APIs, builders,
          ORM models, and any pattern where methods need access to both state
          and other methods.
        </InfoBox>
      </Section>

      <Section title="4. Combining This Parameter Utilities">
        <p className="text-gray-700 dark:text-gray-300">
          Combine this parameter utilities for sophisticated patterns involving
          context binding, method extraction, and type-safe this handling.
        </p>

        <CodeBlock title="Combining this parameter utilities">
          {`// Extract this type and create bound version
function bindMethod<T extends (this: any, ...args: any[]) => any>(
  method: T,
  context: ThisParameterType<T>
): OmitThisParameter<T> {
  return method.bind(context);
}

// Type-safe method binding utility
class MethodBinder {
  static bindAll<T extends object>(obj: T): {
    [K in keyof T]: T[K] extends (this: infer This, ...args: infer Args) => infer R
      ? OmitThisParameter<T[K]>
      : T[K];
  } {
    const bound = {} as any;
    
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "function") {
        bound[key] = value.bind(obj);
      } else {
        bound[key] = value;
      }
    }
    
    return bound;
  }
}

// Create mixin with proper this types
function createMixinWithThis<S, M>(
  state: S,
  methods: M & ThisType<S & M>
): {
  state: S;
  methods: {
    [K in keyof M]: M[K] extends (this: any, ...args: infer A) => infer R
      ? OmitThisParameter<M[K]>
      : M[K];
  };
} {
  const boundMethods = {} as any;
  const combined = Object.assign({}, state, methods);
  
  for (const key in methods) {
    const method = methods[key];
    if (typeof method === "function") {
      boundMethods[key] = method.bind(combined);
    }
  }
  
  return {
    state,
    methods: boundMethods
  };
}

// Advanced store pattern
function createAdvancedStore<S, A, G>(config: {
  state: S;
  actions: A & ThisType<S & A & G>;
  getters: G & ThisType<S & A & G>;
}): {
  state: S;
  actions: {
    [K in keyof A]: OmitThisParameter<A[K]>;
  };
  getters: {
    [K in keyof G]: OmitThisParameter<G[K]>;
  };
} {
  const combined = Object.assign({}, config.state, config.actions, config.getters);
  
  const boundActions = {} as any;
  for (const key in config.actions) {
    const action = config.actions[key];
    if (typeof action === "function") {
      boundActions[key] = action.bind(combined);
    }
  }
  
  const boundGetters = {} as any;
  for (const key in config.getters) {
    const getter = config.getters[key];
    if (typeof getter === "function") {
      boundGetters[key] = getter.bind(combined);
    }
  }
  
  return {
    state: config.state,
    actions: boundActions,
    getters: boundGetters
  };
}

// Usage
const advancedStore = createAdvancedStore({
  state: {
    count: 0,
    name: "Store"
  },
  actions: {
    increment() {
      this.count++;
    },
    setName(name: string) {
      this.name = name;
    }
  },
  getters: {
    doubled() {
      return this.count * 2;
    },
    info() {
      return \`\${this.name}: \${this.count}\`;
    }
  }
});

// All methods are bound, no this parameter needed
advancedStore.actions.increment();
advancedStore.actions.setName("New Store");
const doubled = advancedStore.getters.doubled();

// Validate this context at compile time
function requiresContext<T extends (this: any, ...args: any[]) => any>(
  fn: T,
  expectedContext: ThisParameterType<T>
): OmitThisParameter<T> {
  return fn.bind(expectedContext);
}

// Create type-safe event bus with this
interface EventBusContext {
  listeners: Map<string, Function[]>;
}

interface EventBusMethods {
  on(event: string, handler: Function): void;
  emit(event: string, ...args: any[]): void;
}

type EventBus = EventBusContext & EventBusMethods;

const eventBus: EventBusContext & ThisType<EventBus> = {
  listeners: new Map(),
  
  on(event: string, handler: Function) {
    const handlers = this.listeners.get(event) ?? [];
    this.listeners.set(event, [...handlers, handler]);
  },
  
  emit(event: string, ...args: any[]) {
    const handlers = this.listeners.get(event) ?? [];
    handlers.forEach(h => h(...args));
  }
};

// Extract method signatures without this
type MethodSignatures<T> = {
  [K in keyof T]: T[K] extends (this: any, ...args: infer A) => infer R
    ? (...args: A) => R
    : T[K];
};

type EventBusAPI = MethodSignatures<EventBusMethods>;
// { on: (event: string, handler: Function) => void; emit: (event: string, ...args: any[]) => void }`}
        </CodeBlock>

        <InfoBox type="tip">
          Combine this parameter utilities for powerful patterns. Use
          ThisParameterType to extract context, OmitThisParameter to create
          bound versions, and ThisType to define contextual this in object
          literals.
        </InfoBox>
      </Section>

      <Section title="5. Practical Use Cases">
        <p className="text-gray-700 dark:text-gray-300">
          Real-world applications of this parameter utilities in frameworks,
          state management, plugin systems, and method binding patterns.
        </p>

        <CodeBlock title="Practical this parameter examples">
          {`// React-like component system
interface ComponentState {
  count: number;
  loading: boolean;
}

interface ComponentMethods {
  setState(partial: Partial<ComponentState>): void;
  increment(): void;
  load(): Promise<void>;
}

function createComponent<S, M>(config: {
  state: S;
  methods: M & ThisType<S & M>;
}): S & { [K in keyof M]: OmitThisParameter<M[K]> } {
  const combined = Object.assign({}, config.state, config.methods);
  const api = {} as any;
  
  for (const key in config.methods) {
    const method = config.methods[key];
    if (typeof method === "function") {
      api[key] = method.bind(combined);
    }
  }
  
  return Object.assign({}, config.state, api);
}

const component = createComponent({
  state: {
    count: 0,
    loading: false
  },
  methods: {
    setState(partial: Partial<ComponentState>) {
      Object.assign(this, partial);
    },
    increment() {
      this.setState({ count: this.count + 1 });
    },
    async load() {
      this.setState({ loading: true });
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.setState({ loading: false });
    }
  }
});

// Vuex-like store
function createVuexStore<S, M, G>(config: {
  state: S;
  mutations: M & ThisType<S>;
  actions: {
    [K in keyof any]: (
      this: S & ThisType<S & M & G>,
      context: { commit: (mutation: keyof M, ...args: any[]) => void }
    ) => any;
  };
  getters: G & ThisType<S & M>;
}) {
  const store = {
    state: config.state,
    commit<K extends keyof M>(mutation: K, ...args: any[]) {
      const mut = config.mutations[mutation] as any;
      mut.apply(this.state, args);
    },
    dispatch(action: keyof typeof config.actions, ...args: any[]) {
      const act = config.actions[action];
      return act.call(this.state, { commit: this.commit.bind(this) }, ...args);
    }
  };
  
  return store;
}

// Method decorator that preserves this
function autobind<T extends (this: any, ...args: any[]) => any>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
): void {
  const originalMethod = descriptor.value;
  if (!originalMethod) return;

  descriptor.value = function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    return originalMethod.apply(this, args);
  } as T;
}

class Service {
  private value = 10;

  @autobind
  getValue(): number {
    return this.value;
  }
}

const service = new Service();
const getValue = service.getValue;  // Still works, this is bound

// Plugin system with this context
interface PluginAPI {
  register(name: string, plugin: any): void;
  emit(event: string, ...args: any[]): void;
  state: Record<string, any>;
}

interface PluginDefinition {
  name: string;
  install(this: PluginAPI): void;
  destroy?(this: PluginAPI): void;
}

class PluginManager {
  private api: PluginAPI = {
    register: (name, plugin) => {},
    emit: (event, ...args) => {},
    state: {}
  };

  use<T extends PluginDefinition>(
    plugin: T & ThisType<PluginAPI>
  ): void {
    plugin.install.call(this.api);
  }
}

// jQuery-style API
function createjQuery<E extends HTMLElement>() {
  interface Context {
    elements: E[];
    selector: string;
  }

  interface Methods {
    find(selector: string): this;
    addClass(className: string): this;
    on(event: string, handler: (e: Event) => void): this;
    each(callback: (element: E, index: number) => void): this;
  }

  const $ = function(selector: string): Context & Methods {
    const context: Context & ThisType<Context & Methods> = {
      elements: [],
      selector
    };

    const methods: Methods & ThisType<Context & Methods> = {
      find(selector: string) {
        // Find logic
        return this;
      },
      addClass(className: string) {
        this.elements.forEach(el => el.classList.add(className));
        return this;
      },
      on(event: string, handler: (e: Event) => void) {
        this.elements.forEach(el => el.addEventListener(event, handler));
        return this;
      },
      each(callback: (element: E, index: number) => void) {
        this.elements.forEach((el, i) => callback(el, i));
        return this;
      }
    };

    return Object.assign(context, methods);
  };

  return $;
}

const $ = createjQuery<HTMLDivElement>();
$(".container").addClass("active").on("click", (e) => console.log(e));`}
        </CodeBlock>

        <InfoBox type="important">
          Use this parameter utilities for framework design, component systems,
          state management, plugin APIs, and method binding. They enable
          type-safe this handling while maintaining flexibility and
          composability.
        </InfoBox>
      </Section>
    </div>
  );
}
