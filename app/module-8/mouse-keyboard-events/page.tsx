import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function MouseKeyboardEventsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Mouse & Keyboard Events
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React.MouseEvent and React.KeyboardEvent provide type-safe mouse and
        keyboard interactions. Understanding event types, handlers, and event
        properties enables robust user interaction handling.
      </p>

      <Section title="1. Mouse Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.MouseEvent provides type-safe mouse event handling for clicks,
          movements, and mouse interactions. MouseEventHandler types event
          handlers with full type inference.
        </p>

        <CodeBlock title="React.MouseEvent and MouseEventHandler">
          {`// Basic MouseEvent
function ClickButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();  // Type-safe
    e.stopPropagation();
    console.log("Clicked");
  };

  return <button onClick={handleClick}>Click me</button>;
}

// MouseEvent type with generic element
function GenericMouseEvent<T extends HTMLElement>(
  e: React.MouseEvent<T>
) {
  console.log(e.currentTarget);  // T
  console.log(e.target);  // EventTarget | null
}

// MouseEvent properties
function MouseEventProperties() {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Event properties
    console.log(e.button);  // number (0 = left, 1 = middle, 2 = right)
    console.log(e.buttons);  // number (bitmask of pressed buttons)
    console.log(e.clientX);  // number (X coordinate relative to viewport)
    console.log(e.clientY);  // number (Y coordinate relative to viewport)
    console.log(e.pageX);  // number (X coordinate relative to document)
    console.log(e.pageY);  // number (Y coordinate relative to document)
    console.log(e.screenX);  // number (X coordinate relative to screen)
    console.log(e.screenY);  // number (Y coordinate relative to screen)
    console.log(e.ctrlKey);  // boolean
    console.log(e.shiftKey);  // boolean
    console.log(e.altKey);  // boolean
    console.log(e.metaKey);  // boolean (Cmd on Mac)
    console.log(e.detail);  // number (click count)
  };

  return <div onClick={handleClick}>Clickable</div>;
}

// MouseEventHandler type
function MouseEventHandlerExample() {
  // MouseEventHandler is a type alias for the handler function
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // e is automatically typed as React.MouseEvent<HTMLButtonElement>
    console.log(e.currentTarget);
  };

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.style.backgroundColor = "blue";
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Hover me
      </div>
    </div>
  );
}

// Different mouse events
function AllMouseEvents() {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("click", e.button);
  };

  const handleDoubleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("doubleClick", e.detail);  // Usually 2
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("mouseDown", e.button);
  };

  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("mouseUp", e.button);
  };

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("mouseEnter");
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("mouseLeave");
  };

  const handleMouseOver: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("mouseOver");
  };

  const handleMouseOut: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("mouseOut");
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log("mouseMove", e.clientX, e.clientY);
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseMove={handleMouseMove}
    >
      Interactive div
    </div>
  );
}

// currentTarget vs target
function TargetDifference() {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // currentTarget: The element the handler is attached to (HTMLDivElement)
    console.log(e.currentTarget.tagName);  // "DIV"
    
    // target: The element that triggered the event (EventTarget)
    console.log(e.target);  // Could be any child element
    console.log(e.target instanceof HTMLElement);  // Type guard needed

    // Type narrowing
    if (e.target instanceof HTMLButtonElement) {
      console.log(e.target.value);  // Now TypeScript knows it's a button
    }
  };

  return (
    <div onClick={handleClick}>
      <button>Button inside div</button>
    </div>
  );
}

// Mouse button detection
function MouseButtonDetection() {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    switch (e.button) {
      case 0:
        console.log("Left button");
        break;
      case 1:
        console.log("Middle button");
        break;
      case 2:
        console.log("Right button");
        break;
    }

    // Check modifier keys
    if (e.ctrlKey) console.log("Ctrl pressed");
    if (e.shiftKey) console.log("Shift pressed");
    if (e.altKey) console.log("Alt pressed");
    if (e.metaKey) console.log("Meta pressed");

    // Check multiple buttons
    if (e.buttons & 1) console.log("Left button held");
    if (e.buttons & 2) console.log("Right button held");
    if (e.buttons & 4) console.log("Middle button held");
  };

  return <div onMouseDown={handleClick}>Click with different buttons</div>;
}

// Context menu (right-click)
function ContextMenu() {
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();  // Prevent default context menu
    console.log("Context menu at", e.clientX, e.clientY);
    
    // Show custom context menu
    // ...
  };

  return <div onContextMenu={handleContextMenu}>Right-click me</div>;
}

// Dragging with mouse
function MouseDragging() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      Draggable div
    </div>
  );
}

// Mouse coordinates
function MouseCoordinates() {
  const [coords, setCoords] = React.useState({
    client: { x: 0, y: 0 },
    page: { x: 0, y: 0 },
    screen: { x: 0, y: 0 },
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCoords({
      client: { x: e.clientX, y: e.clientY },
      page: { x: e.pageX, y: e.pageY },
      screen: { x: e.screenX, y: e.screenY },
    });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <p>Client: {coords.client.x}, {coords.client.y}</p>
      <p>Page: {coords.page.x}, {coords.page.y}</p>
      <p>Screen: {coords.screen.x}, {coords.screen.y}</p>
    </div>
  );
}

// Type-safe mouse event handler props
interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onDoubleClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
}

function TypedButton({ onClick, onDoubleClick, onMouseEnter, onMouseLeave }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      Button
    </button>
  );
}

// Generic mouse handler
function useMouseHandler<T extends HTMLElement>(
  handler: (e: React.MouseEvent<T>) => void
): React.MouseEventHandler<T> {
  return handler;
}

// Usage
function GenericHandler() {
  const handler = useMouseHandler<HTMLDivElement>((e) => {
    console.log(e.currentTarget);
  });

  return <div onClick={handler}>Click me</div>;
}`}
        </CodeBlock>

        <InfoBox type="info">
          React.MouseEvent&lt;T&gt; provides type-safe mouse events. The generic
          T specifies the element type (e.g., HTMLButtonElement). Use
          MouseEventHandler&lt;T&gt; for handler function types. Access button,
          coordinates, and modifier keys through event properties. currentTarget
          is typed, target requires type narrowing.
        </InfoBox>
      </Section>

      <Section title="2. Keyboard Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.KeyboardEvent provides type-safe keyboard event handling for key
          presses, releases, and keyboard interactions. KeyboardEventHandler
          types event handlers with full type inference.
        </p>

        <CodeBlock title="React.KeyboardEvent and KeyboardEventHandler">
          {`// Basic KeyboardEvent
function KeyboardInput() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("Key pressed:", e.key);
  };

  return <input onKeyDown={handleKeyDown} />;
}

// KeyboardEvent properties
function KeyboardEventProperties() {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Key properties
    console.log(e.key);  // string (e.g., "a", "Enter", "ArrowUp")
    console.log(e.code);  // string (e.g., "KeyA", "Enter", "ArrowUp")
    console.log(e.keyCode);  // number (deprecated, but still available)
    console.log(e.charCode);  // number (deprecated)
    console.log(e.ctrlKey);  // boolean
    console.log(e.shiftKey);  // boolean
    console.log(e.altKey);  // boolean
    console.log(e.metaKey);  // boolean
    console.log(e.repeat);  // boolean (key is being held down)
    console.log(e.location);  // number (KeyboardEvent.DOM_KEY_LOCATION_*)
    console.log(e.nativeEvent);  // Native KeyboardEvent
  };

  return <input onKeyPress={handleKeyPress} />;
}

// KeyboardEventHandler type
function KeyboardEventHandlerExample() {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    // e is automatically typed as React.KeyboardEvent<HTMLInputElement>
    if (e.key === "Enter") {
      console.log("Enter pressed");
    }
  };

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    console.log("Key released:", e.key);
  };

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    console.log("Key pressed:", e.key);
  };

  return (
    <input
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onKeyPress={handleKeyPress}
    />
  );
}

// Key detection
function KeyDetection() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Specific keys
    if (e.key === "Enter") {
      console.log("Enter key");
    }
    if (e.key === "Escape") {
      console.log("Escape key");
    }
    if (e.key === " ") {
      console.log("Space key");
    }

    // Arrow keys
    if (e.key === "ArrowUp") console.log("Up");
    if (e.key === "ArrowDown") console.log("Down");
    if (e.key === "ArrowLeft") console.log("Left");
    if (e.key === "ArrowRight") console.log("Right");

    // Modifier keys
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();  // Prevent save dialog
      console.log("Ctrl+S");
    }

    if (e.metaKey && e.key === "k") {
      e.preventDefault();
      console.log("Cmd+K (Mac) or Ctrl+K (Windows)");
    }

    // Using code (physical key location)
    if (e.code === "KeyA") {
      console.log("A key pressed (physical key)");
    }
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown}>
      Focus me and press keys
    </div>
  );
}

// Key combinations
function KeyCombinations() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Ctrl/Cmd combinations
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
      e.preventDefault();
      console.log("Undo");
    }

    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "z") {
      e.preventDefault();
      console.log("Redo");
    }

    if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      e.preventDefault();
      console.log("Copy");
    }

    if ((e.ctrlKey || e.metaKey) && e.key === "v") {
      e.preventDefault();
      console.log("Paste");
    }

    // Alt combinations
    if (e.altKey && e.key === "Enter") {
      e.preventDefault();
      console.log("Alt+Enter");
    }

    // Shift combinations
    if (e.shiftKey && e.key === "Tab") {
      console.log("Shift+Tab (focus previous)");
    }
  };

  return <div tabIndex={0} onKeyDown={handleKeyDown}>Keyboard shortcuts</div>;
}

// Form submission on Enter
function FormSubmit() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Submit form
      const form = e.currentTarget.form;
      form?.requestSubmit();
    }
  };

  return (
    <form>
      <input onKeyDown={handleKeyDown} />
      <button type="submit">Submit</button>
    </form>
  );
}

// Prevent default for specific keys
function PreventDefaults() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent arrow keys from moving cursor
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
    }

    // Prevent Enter from submitting
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
    }

    // Allow only numbers
    if (e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  return <input type="text" onKeyDown={handleKeyDown} />;
}

// Keyboard navigation
function KeyboardNavigation() {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % items.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case "Home":
        e.preventDefault();
        setSelectedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setSelectedIndex(items.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        console.log("Selected:", items[selectedIndex]);
        break;
    }
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: index === selectedIndex ? "blue" : "transparent",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

// Type-safe keyboard handler props
interface InputProps {
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
}

function TypedInput({ onKeyDown, onKeyUp, onKeyPress }: InputProps) {
  return (
    <input
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onKeyPress={onKeyPress}
    />
  );
}

// Key code constants
function KeyConstants() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // Using key property (recommended)
    if (e.key === "Enter") {
      console.log("Enter");
    }

    // Using code property (physical key)
    if (e.code === "Enter") {
      console.log("Enter key (physical)");
    }

    // Key location
    if (e.location === KeyboardEvent.DOM_KEY_LOCATION_STANDARD) {
      console.log("Standard key");
    }
    if (e.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT) {
      console.log("Left modifier");
    }
    if (e.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) {
      console.log("Right modifier");
    }
    if (e.location === KeyboardEvent.DOM_KEY_LOCATION_NUMPAD) {
      console.log("Numpad key");
    }
  };

  return <div tabIndex={0} onKeyDown={handleKeyDown}>Key constants</div>;
}

// Generic keyboard handler
function useKeyboardHandler<T extends HTMLElement>(
  handler: (e: React.KeyboardEvent<T>) => void
): React.KeyboardEventHandler<T> {
  return handler;
}

// Usage
function GenericKeyboardHandler() {
  const handler = useKeyboardHandler<HTMLInputElement>((e) => {
    if (e.key === "Enter") {
      console.log("Enter in input");
    }
  });

  return <input onKeyDown={handler} />;
}

// onKeyPress vs onKeyDown vs onKeyUp
function KeyEventTypes() {
  // onKeyDown: Fires when key is pressed down
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    console.log("KeyDown:", e.key);  // Fires first
  };

  // onKeyPress: Fires for printable characters (deprecated in some browsers)
  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    console.log("KeyPress:", e.key);  // Fires second (for printable keys)
  };

  // onKeyUp: Fires when key is released
  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    console.log("KeyUp:", e.key);  // Fires last
  };

  return (
    <input
      onKeyDown={handleKeyDown}
      onKeyPress={handleKeyPress}
      onKeyUp={handleKeyUp}
    />
  );
}

// Repeating keys
function RepeatingKeys() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.repeat) {
      console.log("Key is being held down:", e.key);
      // Handle repeated key press
    } else {
      console.log("Key first pressed:", e.key);
      // Handle initial key press
    }
  };

  return <input onKeyDown={handleKeyDown} />;
}`}
        </CodeBlock>

        <InfoBox type="important">
          React.KeyboardEvent&lt;T&gt; provides type-safe keyboard events. Use
          KeyboardEventHandler&lt;T&gt; for handler function types. Access key,
          code, modifier keys, and repeat status through event properties.
          Prefer e.key over e.keyCode (deprecated). Use onKeyDown for most
          cases, it fires for all keys.
        </InfoBox>
      </Section>
    </div>
  );
}
