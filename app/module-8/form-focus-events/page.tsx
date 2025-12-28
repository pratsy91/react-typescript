import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function FormFocusEventsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Form & Focus Events
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React.FormEvent, React.ChangeEvent, React.SubmitEvent, and
        React.FocusEvent provide type-safe form and focus event handling.
        Understanding their types enables robust form validation and focus
        management.
      </p>

      <Section title="1. Form Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.FormEvent handles form submission and interaction.
          React.ChangeEvent handles input value changes. React.SubmitEvent
          handles form submission specifically. FormEventHandler types event
          handlers.
        </p>

        <CodeBlock title="React.FormEvent, ChangeEvent, and SubmitEvent">
          {`// Basic FormEvent
function FormExample() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent default form submission
    e.stopPropagation();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" />
      <button type="submit">Submit</button>
    </form>
  );
}

// FormEvent properties
function FormEventProperties() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e.currentTarget);  // HTMLFormElement (typed)
    console.log(e.target);  // EventTarget | null (could be form or button)
    console.log(e.bubbles);  // boolean
    console.log(e.cancelable);  // boolean
    console.log(e.defaultPrevented);  // boolean
    console.log(e.eventPhase);  // number
    console.log(e.isTrusted);  // boolean
    console.log(e.nativeEvent);  // Native FormEvent
    console.log(e.timeStamp);  // number
    console.log(e.type);  // "submit"
  };

  return <form onSubmit={handleSubmit}>Form</form>;
}

// FormEventHandler type
function FormEventHandlerExample() {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    // e is automatically typed as React.FormEvent<HTMLFormElement>
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form.elements);
  };

  return <form onSubmit={handleSubmit}>Form</form>;
}

// ChangeEvent for inputs
function ChangeEventExample() {
  const [value, setValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);  // Type-safe value access
    console.log("Value changed:", e.target.value);
  };

  return <input value={value} onChange={handleChange} />;
}

// ChangeEvent for different input types
function AllChangeEvents() {
  const [text, setText] = React.useState("");
  const [number, setNumber] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [file, setFile] = React.useState<FileList | null>(null);
  const [select, setSelect] = React.useState("");

  // Text input
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);  // string
  };

  // Number input
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(Number(e.target.value));  // Convert to number
  };

  // Checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);  // boolean
  };

  // File input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files);  // FileList | null
    if (e.target.files) {
      Array.from(e.target.files).forEach((file) => {
        console.log(file.name, file.size);
      });
    }
  };

  // Select
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);  // string
  };

  // Textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);  // string
  };

  return (
    <form>
      <input type="text" value={text} onChange={handleTextChange} />
      <input type="number" value={number} onChange={handleNumberChange} />
      <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
      <input type="file" onChange={handleFileChange} />
      <select value={select} onChange={handleSelectChange}>
        <option value="">Select...</option>
        <option value="1">Option 1</option>
      </select>
      <textarea value={text} onChange={handleTextareaChange} />
    </form>
  );
}

// Generic ChangeEvent handler
function GenericChangeHandler<T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
  handler: (e: React.ChangeEvent<T>) => void
): React.ChangeEventHandler<T> {
  return handler;
}

// ChangeEvent properties
function ChangeEventProperties() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);  // HTMLInputElement (typed)
    console.log(e.target.value);  // string (for text inputs)
    console.log(e.target.checked);  // boolean (for checkboxes)
    console.log(e.target.files);  // FileList | null (for file inputs)
    console.log(e.currentTarget);  // HTMLInputElement (typed)
    console.log(e.bubbles);  // boolean
    console.log(e.type);  // "change"
  };

  return <input onChange={handleChange} />;
}

// Controlled vs uncontrolled
function ControlledUncontrolled() {
  // Controlled: value controlled by React state
  const [controlledValue, setControlledValue] = React.useState("");

  const handleControlledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setControlledValue(e.target.value);
  };

  // Uncontrolled: value stored in DOM
  const uncontrolledRef = React.useRef<HTMLInputElement>(null);

  const handleUncontrolledSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = uncontrolledRef.current?.value;
    console.log("Uncontrolled value:", value);
  };

  return (
    <div>
      <input
        value={controlledValue}
        onChange={handleControlledChange}
        placeholder="Controlled"
      />
      <form onSubmit={handleUncontrolledSubmit}>
        <input ref={uncontrolledRef} placeholder="Uncontrolled" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// Form validation
function FormValidation() {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Validate
    if (newValue.length < 3) {
      setError("Must be at least 3 characters");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <input value={value} onChange={handleChange} />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

// Form data extraction
function FormDataExtraction() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Method 1: FormData API
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("FormData:", data);

    // Method 2: Accessing named inputs
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      ?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    console.log("Username:", username, "Email:", email);

    // Method 3: Using refs (for uncontrolled)
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" />
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// SubmitEvent (React 19+)
function SubmitEventExample() {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // SubmitEvent is a more specific type than FormEvent
    const form = e.currentTarget;
    console.log("Form submitting:", form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

// Type-safe form props
interface FormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  onChange?: React.FormEventHandler<HTMLFormElement>;
}

function TypedForm({ onSubmit, onChange }: FormProps) {
  return <form onSubmit={onSubmit} onChange={onChange}>Form</form>;
}

// Type-safe input props
interface InputProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: "text" | "email" | "password" | "number";
}

function TypedInput({ value, onChange, type = "text" }: InputProps) {
  return <input type={type} value={value} onChange={onChange} />;
}

// Multiple inputs with single handler
function MultipleInputs() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Custom form hook
function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = React.useState<T>(initialValues);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>, onSubmit: (values: T) => void) => {
      e.preventDefault();
      onSubmit(values);
    },
    [values]
  );

  return { values, handleChange, handleSubmit };
}

// Usage
function FormHookExample() {
  const { values, handleChange, handleSubmit } = useForm({
    username: "",
    email: "",
  });

  return (
    <form onSubmit={(e) => handleSubmit(e, (data) => console.log(data))}>
      <input name="username" value={values.username} onChange={handleChange} />
      <input name="email" value={values.email} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}`}
        </CodeBlock>

        <InfoBox type="info">
          React.FormEvent&lt;T&gt; handles form submission.
          React.ChangeEvent&lt;T&gt; handles input value changes - T can be
          HTMLInputElement, HTMLSelectElement, or HTMLTextAreaElement.
          React.SubmitEvent is a more specific form submission event (React
          19+). Use FormEventHandler and ChangeEventHandler for handler types.
          Access e.target.value for text inputs, e.target.checked for
          checkboxes, e.target.files for file inputs.
        </InfoBox>
      </Section>

      <Section title="2. Focus Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.FocusEvent handles focus and blur events for focusable elements.
          FocusEventHandler types focus event handlers. Understanding focus
          events enables proper focus management and accessibility.
        </p>

        <CodeBlock title="React.FocusEvent and FocusEventHandler">
          {`// Basic FocusEvent
function FocusExample() {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("Input focused");
    console.log(e.target);  // HTMLInputElement (the focused element)
    console.log(e.currentTarget);  // HTMLInputElement (same for focus events)
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("Input blurred");
    console.log(e.target);  // HTMLInputElement (the blurred element)
  };

  return (
    <input
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="Click to focus"
    />
  );
}

// FocusEvent properties
function FocusEventProperties() {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e.target);  // HTMLElement (element that received focus)
    console.log(e.currentTarget);  // HTMLElement (element handler attached to)
    console.log(e.relatedTarget);  // HTMLElement | null (element losing focus)
    console.log(e.bubbles);  // boolean
    console.log(e.cancelable);  // boolean
    console.log(e.type);  // "focus" or "focusin"
  };

  return <input onFocus={handleFocus} />;
}

// FocusEventHandler type
function FocusEventHandlerExample() {
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    // e is automatically typed as React.FocusEvent<HTMLInputElement>
    e.target.select();  // Select all text when focused
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    // Validate on blur
    if (!e.target.value) {
      e.target.focus();  // Refocus if empty
    }
  };

  return (
    <input
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

// All focus events
function AllFocusEvents() {
  // onFocus: Fires when element receives focus
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    console.log("Focus");
  };

  // onBlur: Fires when element loses focus
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    console.log("Blur");
  };

  // onFocusIn: Fires during focus capture phase (bubbles)
  const handleFocusIn: React.FocusEventHandler<HTMLInputElement> = (e) => {
    console.log("FocusIn", e.relatedTarget);
  };

  // onFocusOut: Fires during blur capture phase (bubbles)
  const handleFocusOut: React.FocusEventHandler<HTMLInputElement> = (e) => {
    console.log("FocusOut", e.relatedTarget);
  };

  return (
    <input
      onFocus={handleFocus}
      onBlur={handleBlur}
      onFocusIn={handleFocusIn}
      onFocusOut={handleFocusOut}
    />
  );
}

// Focus management
function FocusManagement() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Focus received
    e.target.style.borderColor = "blue";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Focus lost
    e.target.style.borderColor = "gray";
    
    // Validate on blur
    if (!e.target.value.trim()) {
      // Refocus if invalid
      e.target.focus();
    }
  };

  const moveFocusToButton = () => {
    buttonRef.current?.focus();
  };

  return (
    <div>
      <input
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button ref={buttonRef} onClick={moveFocusToButton}>
        Move Focus
      </button>
    </div>
  );
}

// relatedTarget for focus transitions
function RelatedTarget() {
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // relatedTarget is the element losing focus
    if (e.relatedTarget instanceof HTMLInputElement) {
      console.log("Focus moved from:", e.relatedTarget.id);
      console.log("Focus moved to:", e.target.id);
    }
  };

  return (
    <div>
      <input id="input1" onFocus={handleFocus} />
      <input id="input2" onFocus={handleFocus} />
      <input id="input3" onFocus={handleFocus} />
    </div>
  );
}

// Focus trap
function FocusTrap() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleFocusIn = (e: React.FocusEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    // Get all focusable elements
    const focusableElements = container.querySelectorAll<
      HTMLInputElement | HTMLButtonElement | HTMLAnchorElement
    >(
      'input, button, a[href], select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Trap focus within container
    if (e.target === container) {
      firstElement?.focus();
      return;
    }

    // Check if focus moved outside
    if (!container.contains(e.target as Node)) {
      if (e.relatedTarget === lastElement) {
        firstElement?.focus();
      } else if (e.relatedTarget === firstElement) {
        lastElement?.focus();
      } else {
        firstElement?.focus();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onFocusIn={handleFocusIn}
      tabIndex={-1}
      style={{ border: "2px solid blue", padding: "1rem" }}
    >
      <input />
      <button>Button</button>
      <input />
    </div>
  );
}

// Auto-focus
function AutoFocus() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    // Auto-focus on mount
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}

// Focus validation
function FocusValidation() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "Required" }));
    } else {
      setErrors((prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      }));
    }
  };

  return (
    <div>
      <input
        name="username"
        onBlur={handleBlur}
        style={{
          borderColor: touched.username && errors.username ? "red" : "gray",
        }}
      />
      {touched.username && errors.username && (
        <span style={{ color: "red" }}>{errors.username}</span>
      )}
    </div>
  );
}

// Type-safe focus handler props
interface InputProps {
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocusIn?: React.FocusEventHandler<HTMLInputElement>;
  onFocusOut?: React.FocusEventHandler<HTMLInputElement>;
}

function TypedInput({ onFocus, onBlur, onFocusIn, onFocusOut }: InputProps) {
  return (
    <input
      onFocus={onFocus}
      onBlur={onBlur}
      onFocusIn={onFocusIn}
      onFocusOut={onFocusOut}
    />
  );
}

// Generic focus handler
function useFocusHandler<T extends HTMLElement>(
  handler: (e: React.FocusEvent<T>) => void
): React.FocusEventHandler<T> {
  return handler;
}

// Usage
function GenericFocusHandler() {
  const handler = useFocusHandler<HTMLInputElement>((e) => {
    console.log("Focused:", e.target);
  });

  return <input onFocus={handler} />;
}

// Focus with keyboard navigation
function KeyboardFocus() {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      // Tab navigation already handled by browser
      // But we can customize behavior
      e.preventDefault();
      // Custom focus navigation
    }
  };

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown}>
      Focusable div
    </div>
  );
}

// Focus indicator
function FocusIndicator() {
  const [focused, setFocused] = React.useState(false);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true);
    e.target.style.outline = "2px solid blue";
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false);
    e.target.style.outline = "";
  };

  return (
    <div>
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          border: focused ? "2px solid blue" : "1px solid gray",
        }}
      />
      {focused && <span>Focused</span>}
    </div>
  );
}`}
        </CodeBlock>

        <InfoBox type="tip">
          React.FocusEvent&lt;T&gt; handles focus and blur events.
          FocusEventHandler&lt;T&gt; types focus event handlers. Use
          relatedTarget to track focus transitions. onFocus/onBlur don't bubble,
          use onFocusIn/onFocusOut for bubbling. Perfect for validation on blur,
          focus management, and accessibility.
        </InfoBox>
      </Section>
    </div>
  );
}
