import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function GenericEventHandlersPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Generic Event Handlers
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React provides generic event handler types and utilities for type-safe
        event handling. Understanding EventHandler&lt;T&gt;, typing
        event.target, and generic event patterns enables flexible, reusable
        event handling.
      </p>

      <Section title="1. EventHandler Types">
        <p className="text-gray-700 dark:text-gray-300">
          React provides EventHandler type aliases for all event types. These
          enable consistent, type-safe event handler definitions across
          components.
        </p>

        <CodeBlock title="React EventHandler types">
          {`// EventHandler type aliases
// All event handler types follow the pattern:
// type EventHandler<E> = (event: E) => void;

// Mouse events
type MouseEventHandler<T> = (event: React.MouseEvent<T>) => void;

// Keyboard events
type KeyboardEventHandler<T> = (event: React.KeyboardEvent<T>) => void;

// Form events
type FormEventHandler<T> = (event: React.FormEvent<T>) => void;
type ChangeEventHandler<T> = (event: React.ChangeEvent<T>) => void;

// Focus events
type FocusEventHandler<T> = (event: React.FocusEvent<T>) => void;

// Touch events
type TouchEventHandler<T> = (event: React.TouchEvent<T>) => void;

// Pointer events
type PointerEventHandler<T> = (event: React.PointerEvent<T>) => void;

// UI events
type UIEventHandler<T> = (event: React.UIEvent<T>) => void;

// Wheel events
type WheelEventHandler<T> = (event: React.WheelEvent<T>) => void;

// Animation events
type AnimationEventHandler<T> = (event: React.AnimationEvent<T>) => void;

// Transition events
type TransitionEventHandler<T> = (event: React.TransitionEvent<T>) => void;

// Clipboard events
type ClipboardEventHandler<T> = (event: React.ClipboardEvent<T>) => void;

// Composition events
type CompositionEventHandler<T> = (event: React.CompositionEvent<T>) => void;

// Drag events
type DragEventHandler<T> = (event: React.DragEvent<T>) => void;

// Generic EventHandler pattern
interface GenericEventProps<T extends HTMLElement> {
  onClick?: React.MouseEventHandler<T>;
  onKeyDown?: React.KeyboardEventHandler<T>;
  onFocus?: React.FocusEventHandler<T>;
}

function GenericEventComponent<T extends HTMLElement>({
  onClick,
  onKeyDown,
  onFocus,
}: GenericEventProps<T>) {
  return null;  // Example component
}

// Usage
function Usage() {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log(e.currentTarget);  // HTMLButtonElement
  };

  return <button onClick={handleClick}>Click</button>;
}

// Event handler props pattern
interface ComponentProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

function TypedComponent({
  onClick,
  onKeyDown,
  onSubmit,
  onChange,
  onFocus,
}: ComponentProps) {
  return (
    <div>
      <div onClick={onClick} onKeyDown={onKeyDown}>Div</div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} onFocus={onFocus} />
      </form>
    </div>
  );
}

// Optional event handlers
interface OptionalHandlers {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

function ButtonWithHandlers({
  onClick,
  onMouseEnter,
  onMouseLeave,
}: OptionalHandlers) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      Button
    </button>
  );
}

// Required event handlers
interface RequiredHandlers {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function FormWithRequiredHandlers({
  onSubmit,
  onChange,
}: RequiredHandlers) {
  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange} />
    </form>
  );
}

// Multiple handlers of same type
interface MultipleHandlers {
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
}

function DivWithMultipleHandlers({
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onMouseDown,
  onMouseUp,
}: MultipleHandlers) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      Multiple handlers
    </div>
  );
}

// Union of handlers
type ButtonHandler =
  | React.MouseEventHandler<HTMLButtonElement>
  | React.KeyboardEventHandler<HTMLButtonElement>;

// Handler with constraints
function HandlerWithConstraints<T extends HTMLElement>(
  handler: React.MouseEventHandler<T>
): React.MouseEventHandler<T> {
  return handler;
}

// Handler wrapper (HOC pattern)
function withClickHandler<T extends HTMLElement>(
  Component: React.ComponentType<{ onClick?: React.MouseEventHandler<T> }>,
  additionalHandler: React.MouseEventHandler<T>
) {
  return (props: { onClick?: React.MouseEventHandler<T> }) => {
    const handleClick: React.MouseEventHandler<T> = (e) => {
      additionalHandler(e);
      props.onClick?.(e);
    };

    return <Component {...props} onClick={handleClick} />;
  };
}`}
        </CodeBlock>

        <InfoBox type="info">
          React provides EventHandler type aliases for all event types (e.g.,
          MouseEventHandler, KeyboardEventHandler). These types ensure type-safe
          event handler definitions. Use them in component props for consistent,
          type-safe event handling across components.
        </InfoBox>
      </Section>

      <Section title="2. Typing event.target">
        <p className="text-gray-700 dark:text-gray-300">
          event.target is EventTarget | null, requiring type narrowing.
          event.currentTarget is typed based on the element. Understanding the
          difference enables type-safe event handling.
        </p>

        <CodeBlock title="Typing event.target and event.currentTarget">
          {`// event.target vs event.currentTarget
function TargetDifference() {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // currentTarget: HTMLElement (the element handler is attached to)
    console.log(e.currentTarget);  // HTMLDivElement (typed)
    console.log(e.currentTarget.tagName);  // "DIV" (type-safe)
    
    // target: EventTarget | null (the element that triggered the event)
    console.log(e.target);  // EventTarget | null
    // console.log(e.target.tagName);  // ✗ Error: EventTarget doesn't have tagName
    
    // Type narrowing needed for target
    if (e.target instanceof HTMLElement) {
      console.log(e.target.tagName);  // ✓ OK after type narrowing
    }
  };

  return (
    <div onClick={handleClick}>
      <button>Button inside div</button>
    </div>
  );
}

// Type narrowing patterns
function TypeNarrowing() {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Pattern 1: instanceof check
    if (e.target instanceof HTMLButtonElement) {
      console.log(e.target.value);  // Type-safe
      console.log(e.target.disabled);  // Type-safe
    }

    // Pattern 2: Type guard function
    function isButton(target: EventTarget | null): target is HTMLButtonElement {
      return target instanceof HTMLButtonElement;
    }

    if (isButton(e.target)) {
      console.log(e.target.value);  // Type-safe
    }

    // Pattern 3: Tag name check
    if (e.target instanceof HTMLElement && e.target.tagName === "BUTTON") {
      console.log(e.target.textContent);  // Type-safe
    }
  };

  return <div onClick={handleClick}>Content</div>;
}

// Generic target type narrowing
function GenericTargetNarrowing<T extends HTMLElement>(
  e: React.MouseEvent<T>,
  predicate: (target: EventTarget | null) => target is T
) {
  if (predicate(e.target)) {
    // Now e.target is T
    console.log(e.target);
  }
}

// CurrentTarget is always typed
function CurrentTargetTyped() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // currentTarget is always HTMLButtonElement
    const button = e.currentTarget;  // HTMLButtonElement (typed)
    console.log(button.value);  // Type-safe
    console.log(button.disabled);  // Type-safe
    console.log(button.type);  // Type-safe
  };

  return <button onClick={handleClick}>Click</button>;
}

// Event delegation with target
function EventDelegation() {
  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    // currentTarget: HTMLUListElement
    const list = e.currentTarget;
    
    // target: could be any child element
    if (e.target instanceof HTMLLIElement) {
      console.log("Clicked list item:", e.target.textContent);
      e.target.style.backgroundColor = "yellow";
    }
    
    if (e.target instanceof HTMLButtonElement) {
      console.log("Clicked button:", e.target.value);
    }
  };

  return (
    <ul onClick={handleClick}>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>
        <button value="button">Button</button>
      </li>
    </ul>
  );
}

// Target in form events
function FormTarget() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // currentTarget: HTMLFormElement
    const form = e.currentTarget;
    console.log(form.action);  // Type-safe
    
    // target: could be form or button
    if (e.target instanceof HTMLButtonElement) {
      console.log("Submit button:", e.target.type);
    }
    
    if (e.target instanceof HTMLFormElement) {
      console.log("Form itself");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

// Target in change events
function ChangeTarget() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // currentTarget: HTMLInputElement (typed)
    const input = e.currentTarget;
    console.log(input.value);  // Type-safe
    console.log(input.type);  // Type-safe
    
    // target: HTMLInputElement (same as currentTarget for change events)
    if (e.target instanceof HTMLInputElement) {
      console.log(e.target.value);  // Type-safe after narrowing
    }
  };

  return <input onChange={handleChange} />;
}

// Helper for target narrowing
function getTypedTarget<T extends HTMLElement>(
  event: React.SyntheticEvent,
  type: new () => T
): T | null {
  return event.target instanceof type ? event.target : null;
}

// Usage
function HelperUsage() {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = getTypedTarget(e, HTMLButtonElement);
    if (button) {
      console.log(button.value);  // Type-safe
    }
    
    const input = getTypedTarget(e, HTMLInputElement);
    if (input) {
      console.log(input.value);  // Type-safe
    }
  };

  return (
    <div onClick={handleClick}>
      <button value="click">Click</button>
      <input defaultValue="text" />
    </div>
  );
}

// Type assertion (use carefully)
function TypeAssertion() {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Unsafe: assumes target is always HTMLButtonElement
    const button = e.target as HTMLButtonElement;
    console.log(button.value);  // Might throw if target isn't button
    
    // Safer: with null check
    const button2 = e.target as HTMLButtonElement | null;
    if (button2) {
      console.log(button2.value);  // Type-safe after null check
    }
  };

  return <div onClick={handleClick}>Content</div>;
}

// Event target utilities
function useEventTarget<T extends HTMLElement>(
  predicate: (target: EventTarget | null) => target is T
) {
  return (e: React.SyntheticEvent) => {
    return predicate(e.target) ? e.target : null;
  };
}

// Usage
function UtilityUsage() {
  const getButtonTarget = useEventTarget<HTMLButtonElement>(
    (target): target is HTMLButtonElement =>
      target instanceof HTMLButtonElement
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = getButtonTarget(e);
    if (button) {
      console.log(button.value);  // Type-safe
    }
  };

  return <div onClick={handleClick}>Content</div>;
}

// Summary
// - currentTarget: Typed based on element, safe to use directly
// - target: EventTarget | null, requires type narrowing
// - Use instanceof or type guards for target
// - Prefer currentTarget when possible (it's typed)`}
        </CodeBlock>

        <InfoBox type="important">
          event.currentTarget is typed based on the element type, safe to use
          directly. event.target is EventTarget | null, requires type narrowing
          with instanceof or type guards. Use currentTarget when possible for
          type safety. Use target for event delegation and dynamic element
          handling.
        </InfoBox>
      </Section>

      <Section title="3. Generic Event Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Generic event patterns enable reusable, type-safe event handling
          across components. Understanding these patterns enables flexible event
          handling utilities and hooks.
        </p>

        <CodeBlock title="Generic event handling patterns">
          {`// Generic event handler hook
function useEventHandler<T extends HTMLElement, E extends React.SyntheticEvent>(
  handler?: (e: E) => void
): (e: E) => void {
  return React.useCallback(
    (e: E) => {
      handler?.(e);
    },
    [handler]
  );
}

// Generic event handler with conditions
function useConditionalHandler<T extends HTMLElement, E extends React.SyntheticEvent>(
  handler: (e: E) => void,
  condition: (e: E) => boolean
): (e: E) => void {
  return React.useCallback(
    (e: E) => {
      if (condition(e)) {
        handler(e);
      }
    },
    [handler, condition]
  );
}

// Event handler wrapper with logging
function useLoggedHandler<T extends HTMLElement, E extends React.SyntheticEvent>(
  handler: (e: E) => void,
  eventName: string
): (e: E) => void {
  return React.useCallback(
    (e: E) => {
      console.log(\`\${eventName}:\`, e);
      handler(e);
    },
    [handler, eventName]
  );
}

// Prevent default wrapper
function usePreventDefaultHandler<T extends HTMLElement>(
  handler?: React.MouseEventHandler<T>
): React.MouseEventHandler<T> {
  return React.useCallback(
    (e: React.MouseEvent<T>) => {
      e.preventDefault();
      handler?.(e);
    },
    [handler]
  );
}

// Stop propagation wrapper
function useStopPropagationHandler<T extends HTMLElement>(
  handler?: React.MouseEventHandler<T>
): React.MouseEventHandler<T> {
  return React.useCallback(
    (e: React.MouseEvent<T>) => {
      e.stopPropagation();
      handler?.(e);
    },
    [handler]
  );
}

// Debounced event handler
function useDebouncedHandler<T extends HTMLElement>(
  handler: React.MouseEventHandler<T>,
  delay: number
): React.MouseEventHandler<T> {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  return React.useCallback(
    (e: React.MouseEvent<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        handler(e);
      }, delay);
    },
    [handler, delay]
  );
}

// Throttled event handler
function useThrottledHandler<T extends HTMLElement>(
  handler: React.MouseEventHandler<T>,
  delay: number
): React.MouseEventHandler<T> {
  const lastCallRef = React.useRef<number>(0);

  return React.useCallback(
    (e: React.MouseEvent<T>) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        handler(e);
      }
    },
    [handler, delay]
  );
}

// Event handler with state
function useHandlerWithState<T extends HTMLElement, S>(
  handler: (e: React.MouseEvent<T>, state: S) => void,
  initialState: S
): [React.MouseEventHandler<T>, S] {
  const [state, setState] = React.useState<S>(initialState);

  const handleEvent: React.MouseEventHandler<T> = React.useCallback(
    (e: React.MouseEvent<T>) => {
      handler(e, state);
      setState((prev) => prev);  // Trigger update
    },
    [handler, state]
  );

  return [handleEvent, state];
}

// Composable event handlers
function composeHandlers<T extends HTMLElement>(
  ...handlers: Array<React.MouseEventHandler<T> | undefined>
): React.MouseEventHandler<T> {
  return (e: React.MouseEvent<T>) => {
    handlers.forEach((handler) => {
      handler?.(e);
    });
  };
}

// Usage
function ComposedHandlers() {
  const handleClick1: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("Handler 1");
  };

  const handleClick2: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("Handler 2");
  };

  const composed = composeHandlers(handleClick1, handleClick2);

  return <button onClick={composed}>Click (both handlers)</button>;
}

// Event handler factory
function createEventHandler<T extends HTMLElement, E extends React.SyntheticEvent>(
  transform?: (e: E) => E
) {
  return (handler?: (e: E) => void) => {
    return (e: E) => {
      const transformedEvent = transform ? transform(e) : e;
      handler?.(transformedEvent);
    };
  };
}

// Usage
function FactoryUsage() {
  const createClickHandler = createEventHandler<HTMLButtonElement, React.MouseEvent<HTMLButtonElement>>();

  const handleClick = createClickHandler((e) => {
    console.log("Clicked:", e.currentTarget);
  });

  return <button onClick={handleClick}>Click</button>;
}

// Type-safe event handler builder
class EventHandlerBuilder<T extends HTMLElement> {
  private handlers: Array<(e: React.MouseEvent<T>) => void> = [];

  addPreventDefault() {
    this.handlers.push((e) => e.preventDefault());
    return this;
  }

  addStopPropagation() {
    this.handlers.push((e) => e.stopPropagation());
    return this;
  }

  add(handler: React.MouseEventHandler<T>) {
    this.handlers.push(handler);
    return this;
  }

  build(): React.MouseEventHandler<T> {
    return (e: React.MouseEvent<T>) => {
      this.handlers.forEach((handler) => handler(e));
    };
  }
}

// Usage
function BuilderUsage() {
  const handleClick = new EventHandlerBuilder<HTMLButtonElement>()
    .addPreventDefault()
    .addStopPropagation()
    .add((e) => console.log("Clicked"))
    .build();

  return <button onClick={handleClick}>Click</button>;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          Generic event patterns enable reusable, type-safe event handling. Use
          hooks for event handler composition, debouncing, throttling, and
          transformation. Create utilities for common patterns like prevent
          default, stop propagation, and handler composition. These patterns
          provide flexibility while maintaining type safety.
        </InfoBox>
      </Section>
    </div>
  );
}
