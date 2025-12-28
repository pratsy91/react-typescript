import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ClipboardCompositionDragEventsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Clipboard, Composition & Drag Events
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React.ClipboardEvent, React.CompositionEvent, and React.DragEvent
        provide type-safe clipboard, composition, and drag-and-drop event
        handling. Understanding their types enables robust data transfer and
        input method handling.
      </p>

      <Section title="1. Clipboard Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.ClipboardEvent handles clipboard operations (copy, cut, paste).
          ClipboardEventHandler types clipboard event handlers. Understanding
          clipboard events enables custom clipboard handling and security
          measures.
        </p>

        <CodeBlock title="React.ClipboardEvent and ClipboardEventHandler">
          {`// Basic ClipboardEvent
function ClipboardExample() {
  const handleCopy = (e: React.ClipboardEvent<HTMLDivElement>) => {
    console.log("Copy event");
    const selection = window.getSelection()?.toString();
    e.clipboardData.setData("text/plain", selection || "");
  };

  return (
    <div
      onCopy={handleCopy}
      contentEditable
      style={{ border: "1px solid gray", padding: "10px" }}
    >
      Select and copy this text
    </div>
  );
}

// ClipboardEvent properties
function ClipboardEventProperties() {
  const handleClipboard = (e: React.ClipboardEvent<HTMLDivElement>) => {
    console.log(e.clipboardData);  // DataTransfer (clipboard data)
    console.log(e.clipboardData.getData("text/plain"));  // string (text data)
    console.log(e.clipboardData.items);  // DataTransferItemList
    console.log(e.clipboardData.types);  // string[] (MIME types)
    console.log(e.target);  // EventTarget | null
    console.log(e.currentTarget);  // HTMLElement (typed)
    console.log(e.type);  // "copy" | "cut" | "paste"
  };

  return <div onCopy={handleClipboard}>Clipboard</div>;
}

// ClipboardEventHandler type
function ClipboardEventHandlerExample() {
  const handleCopy: React.ClipboardEventHandler<HTMLDivElement> = (e) => {
    // e is automatically typed as React.ClipboardEvent<HTMLDivElement>
    const text = window.getSelection()?.toString() || "";
    e.clipboardData.setData("text/plain", text);
    e.preventDefault();  // Prevent default copy
  };

  return (
    <div onCopy={handleCopy} contentEditable>
      Copy me
    </div>
  );
}

// All clipboard events
function AllClipboardEvents() {
  const handleCopy: React.ClipboardEventHandler<HTMLDivElement> = (e) => {
    console.log("Copy");
    const selection = window.getSelection()?.toString() || "";
    e.clipboardData.setData("text/plain", selection);
    e.clipboardData.setData("text/html", \`<strong>\${selection}</strong>\`);
  };

  const handleCut: React.ClipboardEventHandler<HTMLDivElement> = (e) => {
    console.log("Cut");
    const selection = window.getSelection()?.toString() || "";
    e.clipboardData.setData("text/plain", selection);
    window.getSelection()?.deleteContents();  // Remove selection
  };

  const handlePaste: React.ClipboardEventHandler<HTMLDivElement> = (e) => {
    console.log("Paste");
    const text = e.clipboardData.getData("text/plain");
    const html = e.clipboardData.getData("text/html");
    
    // Insert pasted content
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
    }
    
    e.preventDefault();  // Prevent default paste
  };

  return (
    <div
      onCopy={handleCopy}
      onCut={handleCut}
      onPaste={handlePaste}
      contentEditable
      style={{ border: "1px solid gray", padding: "10px", minHeight: "100px" }}
    >
      Copy, cut, or paste here
    </div>
  );
}

// ClipboardData API
function ClipboardDataAPI() {
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData;
    
    // Get data by MIME type
    const text = clipboardData.getData("text/plain");
    const html = clipboardData.getData("text/html");
    const url = clipboardData.getData("text/uri-list");
    
    // Set data (for copy/cut)
    // clipboardData.setData("text/plain", "Custom text");
    // clipboardData.setData("text/html", "<strong>HTML</strong>");
    
    // Check available types
    console.log("Available types:", clipboardData.types);
    
    // Access items
    Array.from(clipboardData.items).forEach((item) => {
      console.log("Item type:", item.type, "kind:", item.kind);
      if (item.kind === "file") {
        const file = item.getAsFile();
        console.log("File:", file?.name, file?.size);
      }
    });
    
    console.log("Pasted text:", text);
  };

  return (
    <input
      onPaste={handlePaste}
      placeholder="Paste here"
    />
  );
}

// File paste
function FilePaste() {
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = Array.from(e.clipboardData.items);
    
    items.forEach((item) => {
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          console.log("Pasted file:", file.name, file.type, file.size);
          
          // Handle image
          if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const imageUrl = event.target?.result;
              console.log("Image URL:", imageUrl);
            };
            reader.readAsDataURL(file);
          }
        }
      }
    });
    
    e.preventDefault();
  };

  return (
    <div
      onPaste={handlePaste}
      contentEditable
      style={{
        border: "2px dashed gray",
        padding: "20px",
        minHeight: "100px",
      }}
    >
      Paste files/images here
    </div>
  );
}

// Custom copy handler
function CustomCopy() {
  const handleCopy: React.ClipboardEventHandler<HTMLDivElement> = (e) => {
    const selection = window.getSelection()?.toString() || "";
    
    // Custom formatting
    const formatted = \`[COPIED] \${selection.toUpperCase()} [COPIED]\`;
    e.clipboardData.setData("text/plain", formatted);
    
    e.preventDefault();  // Prevent default copy
  };

  return (
    <div
      onCopy={handleCopy}
      contentEditable
      style={{ border: "1px solid gray", padding: "10px" }}
    >
      Copy this text (will be formatted)
    </div>
  );
}

// Paste validation
function PasteValidation() {
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text/plain");
    
    // Validate pasted content
    if (!/^[0-9]*$/.test(text)) {
      e.preventDefault();
      alert("Only numbers allowed!");
      return;
    }
    
    // Allow paste
    e.currentTarget.value += text;
    e.preventDefault();
  };

  return (
    <input
      onPaste={handlePaste}
      placeholder="Paste numbers only"
    />
  );
}

// Type-safe clipboard handler props
interface ClipboardableProps {
  onCopy?: React.ClipboardEventHandler<HTMLElement>;
  onCut?: React.ClipboardEventHandler<HTMLElement>;
  onPaste?: React.ClipboardEventHandler<HTMLElement>;
}

function TypedClipboardable({
  onCopy,
  onCut,
  onPaste,
}: ClipboardableProps) {
  return (
    <div
      onCopy={onCopy}
      onCut={onCut}
      onPaste={onPaste}
      contentEditable
      style={{ border: "1px solid gray", padding: "10px" }}
    >
      Clipboardable
    </div>
  );
}

// Generic clipboard handler
function useClipboardHandler<T extends HTMLElement>(
  handler: (e: React.ClipboardEvent<T>) => void
): React.ClipboardEventHandler<T> {
  return handler;
}`}
        </CodeBlock>

        <InfoBox type="info">
          React.ClipboardEvent&lt;T&gt; handles clipboard operations (copy, cut,
          paste). ClipboardEventHandler&lt;T&gt; types clipboard event handlers.
          Access clipboardData (DataTransfer) through event properties. Use
          getData()/setData() for clipboard operations. Perfect for custom
          clipboard handling, file paste, and paste validation.
        </InfoBox>
      </Section>

      <Section title="2. Composition Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.CompositionEvent handles input method editor (IME) events for
          languages like Chinese, Japanese, and Korean. CompositionEventHandler
          types composition event handlers. Understanding composition events
          enables proper IME input handling.
        </p>

        <CodeBlock title="React.CompositionEvent and CompositionEventHandler">
          {`// Basic CompositionEvent
function CompositionExample() {
  const handleCompositionStart = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    console.log("Composition started");
    console.log(e.data);  // string (composition string)
  };

  return <input onCompositionStart={handleCompositionStart} />;
}

// CompositionEvent properties
function CompositionEventProperties() {
  const handleComposition = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    console.log(e.data);  // string (composition string)
    console.log(e.target);  // EventTarget | null
    console.log(e.currentTarget);  // HTMLElement (typed)
    console.log(e.type);  // "compositionstart" | "compositionupdate" | "compositionend"
  };

  return <input onCompositionStart={handleComposition} />;
}

// CompositionEventHandler type
function CompositionEventHandlerExample() {
  const handleCompositionStart: React.CompositionEventHandler<HTMLInputElement> = (
    e
  ) => {
    // e is automatically typed as React.CompositionEvent<HTMLInputElement>
    console.log("IME started:", e.data);
  };

  return <input onCompositionStart={handleCompositionStart} />;
}

// All composition events
function AllCompositionEvents() {
  const handleCompositionStart: React.CompositionEventHandler<
    HTMLInputElement
  > = (e) => {
    console.log("CompositionStart:", e.data);
  };

  const handleCompositionUpdate: React.CompositionEventHandler<
    HTMLInputElement
  > = (e) => {
    console.log("CompositionUpdate:", e.data);
  };

  const handleCompositionEnd: React.CompositionEventHandler<
    HTMLInputElement
  > = (e) => {
    console.log("CompositionEnd:", e.data);
  };

  return (
    <input
      onCompositionStart={handleCompositionStart}
      onCompositionUpdate={handleCompositionUpdate}
      onCompositionEnd={handleCompositionEnd}
      placeholder="Type in Chinese/Japanese/Korean"
    />
  );
}

// IME input handling
function IMEInput() {
  const [isComposing, setIsComposing] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleCompositionStart: React.CompositionEventHandler<
    HTMLInputElement
  > = (e) => {
    setIsComposing(true);
    console.log("IME started");
  };

  const handleCompositionUpdate: React.CompositionEventHandler<
    HTMLInputElement
  > = (e) => {
    console.log("IME updating:", e.data);
    // Don't update value during composition
  };

  const handleCompositionEnd: React.CompositionEventHandler<
    HTMLInputElement
  > = (e) => {
    setIsComposing(false);
    console.log("IME ended:", e.data);
    // Now update value with final composition
    setValue((prev) => prev + e.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only update if not composing
    if (!isComposing) {
      setValue(e.target.value);
    }
  };

  return (
    <div>
      <input
        value={value}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionUpdate={handleCompositionUpdate}
        onCompositionEnd={handleCompositionEnd}
        placeholder="Type with IME"
      />
      <p>Composing: {isComposing ? "Yes" : "No"}</p>
    </div>
  );
}

// Composition tracking
function CompositionTracking() {
  const [composition, setComposition] = React.useState({
    isActive: false,
    data: "",
  });

  const handleCompositionStart: React.CompositionEventHandler<
    HTMLInputElement
  > = (e) => {
    setComposition({ isActive: true, data: e.data });
  };

  const handleCompositionUpdate: React.CompositionEventHandler<
    HTMLInputElement
  > = (e) => {
    setComposition({ isActive: true, data: e.data });
  };

  const handleCompositionEnd: React.CompositionEventHandler<
    HTMLInputElement
  > = (e) => {
    setComposition({ isActive: false, data: "" });
  };

  return (
    <div>
      <input
        onCompositionStart={handleCompositionStart}
        onCompositionUpdate={handleCompositionUpdate}
        onCompositionEnd={handleCompositionEnd}
        placeholder="Type with IME"
      />
      {composition.isActive && (
        <p>Composing: {composition.data}</p>
      )}
    </div>
  );
}

// Preventing input during composition
function PreventInputDuringComposition() {
  const [isComposing, setIsComposing] = React.useState(false);

  const handleCompositionStart: React.CompositionEventHandler<
    HTMLInputElement
  > = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd: React.CompositionEventHandler<
    HTMLInputElement
  > = () => {
    setIsComposing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent some keys during composition
    if (isComposing && e.key === "Enter") {
      e.preventDefault();
      console.log("Enter prevented during composition");
    }
  };

  return (
    <input
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      placeholder="Type with IME"
    />
  );
}

// Type-safe composition handler props
interface ComposableProps {
  onCompositionStart?: React.CompositionEventHandler<HTMLInputElement>;
  onCompositionUpdate?: React.CompositionEventHandler<HTMLInputElement>;
  onCompositionEnd?: React.CompositionEventHandler<HTMLInputElement>;
}

function TypedComposable({
  onCompositionStart,
  onCompositionUpdate,
  onCompositionEnd,
}: ComposableProps) {
  return (
    <input
      onCompositionStart={onCompositionStart}
      onCompositionUpdate={onCompositionUpdate}
      onCompositionEnd={onCompositionEnd}
    />
  );
}

// Generic composition handler
function useCompositionHandler<T extends HTMLElement>(
  handler: (e: React.CompositionEvent<T>) => void
): React.CompositionEventHandler<T> {
  return handler;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          React.CompositionEvent&lt;T&gt; handles IME input for languages like
          Chinese, Japanese, and Korean. CompositionEventHandler&lt;T&gt; types
          composition event handlers. Access data (string) through event
          properties. Use composition events to track IME input state and avoid
          updating values during composition. Perfect for IME-aware input
          handling.
        </InfoBox>
      </Section>

      <Section title="3. Drag Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.DragEvent handles drag-and-drop operations. DragEventHandler
          types drag event handlers. Understanding drag events enables robust
          drag-and-drop functionality.
        </p>

        <CodeBlock title="React.DragEvent and DragEventHandler">
          {`// Basic DragEvent
function DragExample() {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("Drag started");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "dragged content");
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
        cursor: "move",
      }}
    >
      Drag me
    </div>
  );
}

// DragEvent properties
function DragEventProperties() {
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    // DataTransfer API
    console.log(e.dataTransfer);  // DataTransfer (drag data)
    console.log(e.dataTransfer.effectAllowed);  // string (allowed effects)
    console.log(e.dataTransfer.dropEffect);  // string (drop effect)
    console.log(e.dataTransfer.types);  // string[] (data types)
    console.log(e.dataTransfer.files);  // FileList (files being dragged)
    
    // Mouse coordinates (same as MouseEvent)
    console.log(e.clientX, e.clientY);
    console.log(e.pageX, e.pageY);
    console.log(e.screenX, e.screenY);
    
    // Standard event properties
    console.log(e.target, e.currentTarget, e.type);
  };

  return <div draggable onDragStart={handleDrag}>Drag</div>;
}

// DragEventHandler type
function DragEventHandlerExample() {
  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    // e is automatically typed as React.DragEvent<HTMLDivElement>
    e.dataTransfer.setData("text/plain", "data");
  };

  return (
    <div draggable onDragStart={handleDragStart}>
      Drag
    </div>
  );
}

// All drag events
function AllDragEvents() {
  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    console.log("DragStart");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "data");
  };

  const handleDrag: React.DragEventHandler<HTMLDivElement> = (e) => {
    console.log("Drag", e.clientX, e.clientY);
  };

  const handleDragEnd: React.DragEventHandler<HTMLDivElement> = (e) => {
    console.log("DragEnd");
  };

  const handleDragEnter: React.DragEventHandler<HTMLDivElement> = (e) => {
    console.log("DragEnter");
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();  // Required for drop
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    console.log("DragLeave");
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    console.log("Drop:", data);
  };

  return (
    <div>
      <div
        draggable
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "blue",
          cursor: "move",
        }}
      >
        Drag me
      </div>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "lightgray",
          border: "2px dashed gray",
        }}
      >
        Drop zone
      </div>
    </div>
  );
}

// Drag and drop with data
function DragAndDrop() {
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null);
  const [items, setItems] = React.useState(["Item 1", "Item 2", "Item 3"]);

  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    item: string
  ) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLUListElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent<HTMLLIElement>,
    targetItem: string
  ) => {
    e.preventDefault();
    
    if (draggedItem && draggedItem !== targetItem) {
      // Reorder items
      setItems((prev) => {
        const newItems = [...prev];
        const draggedIndex = newItems.indexOf(draggedItem);
        const targetIndex = newItems.indexOf(targetItem);
        
        newItems.splice(draggedIndex, 1);
        newItems.splice(targetIndex, 0, draggedItem);
        
        return newItems;
      });
    }
    
    setDraggedItem(null);
  };

  return (
    <ul onDragOver={handleDragOver}>
      {items.map((item) => (
        <li
          key={item}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDrop={(e) => handleDrop(e, item)}
          style={{
            padding: "10px",
            margin: "5px",
            backgroundColor: draggedItem === item ? "yellow" : "white",
            cursor: "move",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

// File drag and drop
function FileDragAndDrop() {
  const [files, setFiles] = React.useState<File[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    
    droppedFiles.forEach((file) => {
      console.log("Dropped file:", file.name, file.type, file.size);
    });
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: "300px",
        height: "200px",
        border: "2px dashed gray",
        padding: "20px",
      }}
    >
      Drop files here
      {files.length > 0 && (
        <ul>
          {files.map((file, i) => (
            <li key={i}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Drag effects
function DragEffects() {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // Allowed effects: "none" | "copy" | "move" | "link" | "copyMove" | "copyLink" | "linkMove" | "all"
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Drop effect: "none" | "copy" | "move" | "link"
    e.dataTransfer.dropEffect = "copy";
  };

  return (
    <div>
      <div
        draggable
        onDragStart={handleDragStart}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "blue",
          cursor: "move",
        }}
      >
        Drag (copy)
      </div>
      <div
        onDragOver={handleDragOver}
        onDrop={(e) => e.preventDefault()}
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: "lightgray",
          border: "2px dashed gray",
        }}
      >
        Drop zone
      </div>
    </div>
  );
}

// Type-safe drag handler props
interface DraggableProps {
  onDragStart?: React.DragEventHandler<HTMLElement>;
  onDrag?: React.DragEventHandler<HTMLElement>;
  onDragEnd?: React.DragEventHandler<HTMLElement>;
}

interface DroppableProps {
  onDragEnter?: React.DragEventHandler<HTMLElement>;
  onDragOver?: React.DragEventHandler<HTMLElement>;
  onDragLeave?: React.DragEventHandler<HTMLElement>;
  onDrop?: React.DragEventHandler<HTMLElement>;
}

function TypedDraggable({
  onDragStart,
  onDrag,
  onDragEnd,
  children,
}: DraggableProps & { children: React.ReactNode }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      {children}
    </div>
  );
}

function TypedDroppable({
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  children,
}: DroppableProps & { children: React.ReactNode }) {
  return (
    <div
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {children}
    </div>
  );
}

// Generic drag handler
function useDragHandler<T extends HTMLElement>(
  handler: (e: React.DragEvent<T>) => void
): React.DragEventHandler<T> {
  return handler;
}`}
        </CodeBlock>

        <InfoBox type="important">
          React.DragEvent&lt;T&gt; handles drag-and-drop operations.
          DragEventHandler&lt;T&gt; types drag event handlers. Access
          dataTransfer (DataTransfer) through event properties. Use
          effectAllowed and dropEffect for drag effects. Always call
          preventDefault() in onDragOver for drops to work. Perfect for
          drag-and-drop lists, file uploads, and reordering.
        </InfoBox>
      </Section>
    </div>
  );
}
