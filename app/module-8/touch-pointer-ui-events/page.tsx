import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TouchPointerUIEventsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Touch, Pointer & UI Events
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React.TouchEvent, React.PointerEvent, React.UIEvent, and
        React.WheelEvent provide type-safe touch, pointer, UI, and wheel
        interactions. Understanding their types enables robust touch and pointer
        handling.
      </p>

      <Section title="1. Touch Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.TouchEvent handles touch interactions for mobile devices.
          TouchEventHandler types touch event handlers. Understanding touch
          coordinates and touches enables multi-touch support.
        </p>

        <CodeBlock title="React.TouchEvent and TouchEventHandler">
          {`// Basic TouchEvent
function TouchExample() {
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("Touch started");
    console.log(e.touches);  // TouchList (all active touches)
    console.log(e.targetTouches);  // TouchList (touches on this element)
    console.log(e.changedTouches);  // TouchList (touches that changed)
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
    >
      Touch me
    </div>
  );
}

// TouchEvent properties
function TouchEventProperties() {
  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log(e.touches);  // TouchList (all touches)
    console.log(e.targetTouches);  // TouchList (touches on target)
    console.log(e.changedTouches);  // TouchList (changed touches)
    console.log(e.touches.length);  // number (number of touches)
    console.log(e.bubbles);  // boolean
    console.log(e.cancelable);  // boolean
    console.log(e.type);  // "touchstart" | "touchmove" | "touchend" | "touchcancel"
  };

  return <div onTouchStart={handleTouch}>Touch</div>;
}

// TouchEventHandler type
function TouchEventHandlerExample() {
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    // e is automatically typed as React.TouchEvent<HTMLDivElement>
    const touch = e.touches[0];
    if (touch) {
      console.log("Touch at:", touch.clientX, touch.clientY);
    }
  };

  return <div onTouchStart={handleTouchStart}>Touch</div>;
}

// All touch events
function AllTouchEvents() {
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    console.log("TouchStart");
    const touch = e.changedTouches[0];
    console.log("Position:", touch?.clientX, touch?.clientY);
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    console.log("TouchMove");
    const touch = e.changedTouches[0];
    console.log("Position:", touch?.clientX, touch?.clientY);
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    console.log("TouchEnd");
  };

  const handleTouchCancel: React.TouchEventHandler<HTMLDivElement> = (e) => {
    console.log("TouchCancel");
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    >
      Touch area
    </div>
  );
}

// Touch coordinates
function TouchCoordinates() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    if (touch) {
      setPosition({
        x: touch.clientX,  // Relative to viewport
        y: touch.clientY,
      });

      // Other coordinate properties
      console.log(touch.pageX);  // Relative to document
      console.log(touch.pageY);
      console.log(touch.screenX);  // Relative to screen
      console.log(touch.screenY);
    }
  };

  return (
    <div
      onTouchMove={handleTouchMove}
      style={{ width: "100%", height: "300px", backgroundColor: "lightgray" }}
    >
      Position: {position.x}, {position.y}
    </div>
  );
}

// Multi-touch
function MultiTouch() {
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("Number of touches:", e.touches.length);
    
    // Process all touches
    Array.from(e.touches).forEach((touch, index) => {
      console.log(\`Touch \${index}:\`, touch.clientX, touch.clientY);
    });

    // Check for pinch (two touches)
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      console.log("Pinch distance:", distance);
    }
  };

  return <div onTouchStart={handleTouchStart}>Multi-touch area</div>;
}

// Touch data
function TouchData() {
  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    if (touch) {
      console.log(touch.identifier);  // number (unique ID for touch)
      console.log(touch.target);  // EventTarget (element touched)
      console.log(touch.radiusX);  // number (touch radius X)
      console.log(touch.radiusY);  // number (touch radius Y)
      console.log(touch.rotationAngle);  // number (rotation angle)
      console.log(touch.force);  // number (pressure, 0-1)
    }
  };

  return <div onTouchStart={handleTouch}>Touch data</div>;
}

// Prevent scroll on touch
function PreventScroll() {
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // Prevent default scroll behavior
    e.preventDefault();
    
    // Handle touch movement
    const touch = e.changedTouches[0];
    if (touch) {
      console.log("Touch move:", touch.clientX, touch.clientY);
    }
  };

  return (
    <div
      onTouchMove={handleTouchMove}
      style={{ overflow: "hidden", touchAction: "none" }}
    >
      Non-scrollable touch area
    </div>
  );
}

// Swipe detection
function SwipeDetection() {
  const [startTouch, setStartTouch] = React.useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) {
      setStartTouch({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startTouch) return;

    const touch = e.changedTouches[0];
    if (touch) {
      const deltaX = touch.clientX - startTouch.x;
      const deltaY = touch.clientY - startTouch.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Minimum swipe distance
      if (distance > 50) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0) {
            console.log("Swipe right");
          } else {
            console.log("Swipe left");
          }
        } else {
          // Vertical swipe
          if (deltaY > 0) {
            console.log("Swipe down");
          } else {
            console.log("Swipe up");
          }
        }
      }
    }

    setStartTouch(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ width: "100%", height: "300px", backgroundColor: "lightgray" }}
    >
      Swipe me
    </div>
  );
}

// Type-safe touch handler props
interface TouchableProps {
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
  onTouchMove?: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
  onTouchCancel?: React.TouchEventHandler<HTMLDivElement>;
}

function TypedTouchable({
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onTouchCancel,
}: TouchableProps) {
  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
    >
      Touchable
    </div>
  );
}`}
        </CodeBlock>

        <InfoBox type="info">
          React.TouchEvent&lt;T&gt; handles touch interactions for mobile
          devices. TouchEventHandler&lt;T&gt; types touch event handlers. Access
          touches (all), targetTouches (on element), and changedTouches
          (changed). Touch coordinates: clientX/Y (viewport), pageX/Y
          (document), screenX/Y (screen). Perfect for mobile gestures,
          multi-touch, and swipe detection.
        </InfoBox>
      </Section>

      <Section title="2. Pointer Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.PointerEvent unifies mouse, touch, and pen interactions in a
          single API. PointerEventHandler types pointer event handlers.
          Understanding pointer types and properties enables universal input
          handling.
        </p>

        <CodeBlock title="React.PointerEvent and PointerEventHandler">
          {`// Basic PointerEvent
function PointerExample() {
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    console.log("Pointer down");
    console.log(e.pointerId);  // number (unique ID)
    console.log(e.pointerType);  // "mouse" | "pen" | "touch"
    console.log(e.clientX, e.clientY);  // Coordinates
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
    >
      Point me
    </div>
  );
}

// PointerEvent properties
function PointerEventProperties() {
  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    // Pointer identification
    console.log(e.pointerId);  // number (unique ID for pointer)
    console.log(e.pointerType);  // "mouse" | "pen" | "touch"
    console.log(e.isPrimary);  // boolean (primary pointer)
    
    // Coordinates (same as MouseEvent)
    console.log(e.clientX, e.clientY);  // Viewport coordinates
    console.log(e.pageX, e.pageY);  // Document coordinates
    console.log(e.screenX, e.screenY);  // Screen coordinates
    
    // Pressure/width/height (for pressure-sensitive devices)
    console.log(e.pressure);  // number (0-1)
    console.log(e.width);  // number (contact width)
    console.log(e.height);  // number (contact height)
    console.log(e.tiltX);  // number (tilt X, -90 to 90)
    console.log(e.tiltY);  // number (tilt Y, -90 to 90)
    console.log(e.tangentialPressure);  // number (tangential pressure, -1 to 1)
    
    // Button/modifier keys (same as MouseEvent)
    console.log(e.button);  // number (0-4)
    console.log(e.buttons);  // number (bitmask)
    console.log(e.ctrlKey, e.shiftKey, e.altKey, e.metaKey);  // booleans
  };

  return <div onPointerDown={handlePointer}>Pointer</div>;
}

// PointerEventHandler type
function PointerEventHandlerExample() {
  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    // e is automatically typed as React.PointerEvent<HTMLDivElement>
    console.log(\`Pointer \${e.pointerId} down: \${e.pointerType}\`);
  };

  return <div onPointerDown={handlePointerDown}>Pointer</div>;
}

// All pointer events
function AllPointerEvents() {
  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    console.log("PointerDown", e.pointerId, e.pointerType);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    console.log("PointerMove", e.pointerId);
  };

  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    console.log("PointerUp", e.pointerId);
  };

  const handlePointerCancel: React.PointerEventHandler<HTMLDivElement> = (e) => {
    console.log("PointerCancel", e.pointerId);
  };

  const handlePointerEnter: React.PointerEventHandler<HTMLDivElement> = (e) => {
    console.log("PointerEnter", e.pointerId);
  };

  const handlePointerLeave: React.PointerEventHandler<HTMLDivElement> = (e) => {
    console.log("PointerLeave", e.pointerId);
  };

  const handlePointerOver: React.PointerEventHandler<HTMLDivElement> = (e) => {
    console.log("PointerOver", e.pointerId);
  };

  const handlePointerOut: React.PointerEventHandler<HTMLDivElement> = (e) => {
    console.log("PointerOut", e.pointerId);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      Pointer area
    </div>
  );
}

// Pointer type detection
function PointerTypeDetection() {
  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    switch (e.pointerType) {
      case "mouse":
        console.log("Mouse pointer");
        break;
      case "pen":
        console.log("Pen/ stylus pointer");
        break;
      case "touch":
        console.log("Touch pointer");
        break;
      default:
        console.log("Unknown pointer type");
    }
  };

  return <div onPointerDown={handlePointer}>Detect pointer type</div>;
}

// Pressure-sensitive interaction
function PressureSensitive() {
  const [pressure, setPressure] = React.useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Pressure is 0-1 (1 = full pressure)
    setPressure(e.pressure);
    
    // Visual feedback based on pressure
    if (e.pressure > 0) {
      e.currentTarget.style.opacity = String(0.5 + e.pressure * 0.5);
    }
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "blue",
        opacity: String(0.5 + pressure * 0.5),
      }}
    >
      Pressure: {pressure.toFixed(2)}
    </div>
  );
}

// Multi-pointer tracking
function MultiPointer() {
  const [pointers, setPointers] = React.useState<
    Map<number, { x: number; y: number; type: string }>
  >(new Map());

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setPointers((prev) => {
      const next = new Map(prev);
      next.set(e.pointerId, {
        x: e.clientX,
        y: e.clientY,
        type: e.pointerType,
      });
      return next;
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setPointers((prev) => {
      const next = new Map(prev);
      if (next.has(e.pointerId)) {
        next.set(e.pointerId, {
          x: e.clientX,
          y: e.clientY,
          type: e.pointerType,
        });
      }
      return next;
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setPointers((prev) => {
      const next = new Map(prev);
      next.delete(e.pointerId);
      return next;
    });
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ width: "100%", height: "300px", backgroundColor: "lightgray" }}
    >
      Active pointers: {pointers.size}
      {Array.from(pointers.entries()).map(([id, pos]) => (
        <div
          key={id}
          style={{
            position: "absolute",
            left: pos.x,
            top: pos.y,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "red",
          }}
        >
          {id}
        </div>
      ))}
    </div>
  );
}

// Pointer capture
function PointerCapture() {
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Capture pointer to element (even if pointer leaves)
    e.currentTarget.setPointerCapture(e.pointerId);
    console.log("Pointer captured");
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    // Release pointer capture
    e.currentTarget.releasePointerCapture(e.pointerId);
    console.log("Pointer released");
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
    >
      Pointer capture
    </div>
  );
}

// Universal input (mouse + touch + pen)
function UniversalInput() {
  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    // Works for mouse, touch, and pen
    console.log(\`\${e.pointerType} pointer down\`);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      style={{ width: "100px", height: "100px", backgroundColor: "blue" }}
    >
      Universal input
    </div>
  );
}

// Type-safe pointer handler props
interface PointerableProps {
  onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
  onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
  onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
}

function TypedPointerable({
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: PointerableProps) {
  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      Pointerable
    </div>
  );
}`}
        </CodeBlock>

        <InfoBox type="important">
          React.PointerEvent&lt;T&gt; unifies mouse, touch, and pen
          interactions. PointerEventHandler&lt;T&gt; types pointer event
          handlers. Use pointerType to detect input method ("mouse", "pen",
          "touch"). pointerId tracks multiple pointers. Perfect for universal
          input handling that works across all input methods.
        </InfoBox>
      </Section>

      <Section title="3. UI Events & Wheel Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.UIEvent handles UI-level events. React.WheelEvent handles wheel
          and scroll events. UIEventHandler and WheelEventHandler type event
          handlers. Understanding these enables scroll and UI interaction
          handling.
        </p>

        <CodeBlock title="React.UIEvent, WheelEvent and Handlers">
          {`// Basic UIEvent
function UIEventExample() {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    console.log("Scrolled");
    console.log(e.target);  // Scrolled element
    console.log(e.currentTarget);  // Element with handler
  };

  return (
    <div onScroll={handleScroll} style={{ height: "200px", overflow: "auto" }}>
      Scrollable content
    </div>
  );
}

// UIEvent properties
function UIEventProperties() {
  const handleUIEvent = (e: React.UIEvent<HTMLDivElement>) => {
    console.log(e.target);  // EventTarget | null
    console.log(e.currentTarget);  // HTMLElement (typed)
    console.log(e.view);  // Window | null
    console.log(e.detail);  // number (event-specific detail)
    console.log(e.bubbles);  // boolean
    console.log(e.cancelable);  // boolean
    console.log(e.type);  // "scroll" | "resize" | etc.
  };

  return <div onScroll={handleUIEvent}>UI Event</div>;
}

// UIEventHandler type
function UIEventHandlerExample() {
  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    // e is automatically typed as React.UIEvent<HTMLDivElement>
    const element = e.currentTarget;
    console.log("Scroll position:", element.scrollTop, element.scrollLeft);
  };

  return (
    <div
      onScroll={handleScroll}
      style={{ height: "200px", overflow: "auto" }}
    >
      Scrollable
    </div>
  );
}

// All UI events
function AllUIEvents() {
  const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    console.log("Scroll");
  };

  const handleResize: React.UIEventHandler<HTMLDivElement> = (e) => {
    console.log("Resize");
  };

  return (
    <div onScroll={handleScroll} onResize={handleResize}>
      UI Events
    </div>
  );
}

// WheelEvent
function WheelEventExample() {
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();  // Prevent default scroll
    
    console.log(e.deltaX);  // number (horizontal scroll, -left, +right)
    console.log(e.deltaY);  // number (vertical scroll, -up, +down)
    console.log(e.deltaZ);  // number (zoom scroll)
    console.log(e.deltaMode);  // number (unit: 0=px, 1=lines, 2=pages)
  };

  return (
    <div
      onWheel={handleWheel}
      style={{ width: "200px", height: "200px", overflow: "auto" }}
    >
      Wheel area
    </div>
  );
}

// WheelEventHandler type
function WheelEventHandlerExample() {
  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    // e is automatically typed as React.WheelEvent<HTMLDivElement>
    if (e.deltaY > 0) {
      console.log("Scroll down");
    } else {
      console.log("Scroll up");
    }
  };

  return <div onWheel={handleWheel}>Wheel</div>;
}

// WheelEvent properties
function WheelEventProperties() {
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Scroll deltas
    console.log(e.deltaX);  // Horizontal scroll amount
    console.log(e.deltaY);  // Vertical scroll amount
    console.log(e.deltaZ);  // Zoom scroll amount
    console.log(e.deltaMode);  // Unit mode (0=px, 1=lines, 2=pages)
    
    // Coordinates
    console.log(e.clientX, e.clientY);  // Viewport coordinates
    console.log(e.pageX, e.pageY);  // Document coordinates
    console.log(e.screenX, e.screenY);  // Screen coordinates
    
    // Modifier keys
    console.log(e.ctrlKey, e.shiftKey, e.altKey, e.metaKey);
    
    // Standard event properties
    console.log(e.bubbles, e.cancelable, e.type);
  };

  return <div onWheel={handleWheel}>Wheel</div>;
}

// Custom scroll behavior
function CustomScroll() {
  const [scrollPosition, setScrollPosition] = React.useState(0);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Custom scroll behavior
    setScrollPosition((prev) => {
      const newPosition = prev - e.deltaY;  // Invert for natural scroll
      return Math.max(0, Math.min(newPosition, 1000));  // Clamp to 0-1000
    });
  };

  return (
    <div
      onWheel={handleWheel}
      style={{
        height: "200px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          transform: \`translateY(-\${scrollPosition}px)\`,
        }}
      >
        Scrollable content (custom scroll)
      </div>
    </div>
  );
}

// Horizontal scroll with wheel
function HorizontalScroll() {
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Convert vertical wheel to horizontal scroll
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <div
      onWheel={handleWheel}
      style={{
        width: "200px",
        height: "100px",
        overflowX: "auto",
        overflowY: "hidden",
        display: "flex",
      }}
    >
      <div style={{ width: "500px" }}>Horizontal scroll content</div>
    </div>
  );
}

// Zoom with wheel + Ctrl
function ZoomWheel() {
  const [scale, setScale] = React.useState(1);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey) {
      e.preventDefault();
      
      // Zoom with Ctrl + Wheel
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      setScale((prev) => Math.max(0.5, Math.min(prev * zoomFactor, 3)));
    }
  };

  return (
    <div
      onWheel={handleWheel}
      style={{
        transform: \`scale(\${scale})\`,
        transformOrigin: "top left",
      }}
    >
      Ctrl + Wheel to zoom
    </div>
  );
}

// Delta mode handling
function DeltaMode() {
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    let scrollAmount: number;
    
    switch (e.deltaMode) {
      case WheelEvent.DOM_DELTA_PIXEL:
        // Pixel-based scrolling (default)
        scrollAmount = e.deltaY;
        break;
      case WheelEvent.DOM_DELTA_LINE:
        // Line-based scrolling
        scrollAmount = e.deltaY * 16;  // Approximate line height
        break;
      case WheelEvent.DOM_DELTA_PAGE:
        // Page-based scrolling
        scrollAmount = e.deltaY * e.currentTarget.clientHeight;
        break;
      default:
        scrollAmount = e.deltaY;
    }
    
    e.currentTarget.scrollTop += scrollAmount;
  };

  return (
    <div
      onWheel={handleWheel}
      style={{ height: "200px", overflow: "auto" }}
    >
      Scroll content
    </div>
  );
}

// Type-safe UI/Wheel handler props
interface ScrollableProps {
  onScroll?: React.UIEventHandler<HTMLDivElement>;
  onWheel?: React.WheelEventHandler<HTMLDivElement>;
}

function TypedScrollable({ onScroll, onWheel }: ScrollableProps) {
  return (
    <div
      onScroll={onScroll}
      onWheel={onWheel}
      style={{ height: "200px", overflow: "auto" }}
    >
      Scrollable
    </div>
  );
}

// Generic UI/Wheel handlers
function useUIHandler<T extends HTMLElement>(
  handler: (e: React.UIEvent<T>) => void
): React.UIEventHandler<T> {
  return handler;
}

function useWheelHandler<T extends HTMLElement>(
  handler: (e: React.WheelEvent<T>) => void
): React.WheelEventHandler<T> {
  return handler;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          React.UIEvent&lt;T&gt; handles UI-level events like scroll and resize.
          React.WheelEvent&lt;T&gt; handles wheel/scroll events with deltaX,
          deltaY, deltaZ, and deltaMode properties. UIEventHandler and
          WheelEventHandler type event handlers. Perfect for custom scroll
          behavior, zoom with Ctrl+Wheel, and horizontal scrolling.
        </InfoBox>
      </Section>
    </div>
  );
}
