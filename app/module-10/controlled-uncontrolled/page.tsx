import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ControlledUncontrolledPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Controlled vs Uncontrolled Components
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Controlled components have their state managed by React, while
        uncontrolled components store state in the DOM. Understanding both
        patterns with TypeScript enables type-safe form handling and component
        design.
      </p>

      <Section title="1. Controlled Components">
        <p className="text-gray-700 dark:text-gray-300">
          Controlled components manage their state through React props. Value
          and onChange are controlled by parent components. Understanding
          controlled component typing enables type-safe form state management.
        </p>

        <CodeBlock title="Controlled Components Typing">
          {`// Basic controlled component
function ControlledInput() {
  const [value, setValue] = React.useState("");

  return (
    <input
      value={value}  // Controlled value
      onChange={(e) => setValue(e.target.value)}  // Controlled onChange
    />
  );
}

// Typed controlled input
interface ControlledInputProps {
  value: string;
  onChange: (value: string) => void;
}

function TypedControlledInput({ value, onChange }: ControlledInputProps) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// Controlled component with validation
interface ValidatedInputProps {
  value: string;
  onChange: (value: string) => void;
  validator?: (value: string) => string | undefined;
}

function ValidatedInput({
  value,
  onChange,
  validator,
}: ValidatedInputProps) {
  const error = validator?.(value);

  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ borderColor: error ? "red" : "gray" }}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

// Controlled checkbox
function ControlledCheckbox() {
  const [checked, setChecked] = React.useState(false);

  return (
    <input
      type="checkbox"
      checked={checked}  // Controlled checked
      onChange={(e) => setChecked(e.target.checked)}  // Controlled onChange
    />
  );
}

// Typed controlled checkbox
interface ControlledCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function TypedControlledCheckbox({
  checked,
  onChange,
}: ControlledCheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
}

// Controlled select
function ControlledSelect() {
  const [value, setValue] = React.useState("option1");

  return (
    <select
      value={value}  // Controlled value
      onChange={(e) => setValue(e.target.value)}  // Controlled onChange
    >
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  );
}

// Typed controlled select
interface ControlledSelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
}

function TypedControlledSelect<T extends string>({
  value,
  onChange,
  options,
}: ControlledSelectProps<T>) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as T)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Controlled textarea
function ControlledTextarea() {
  const [value, setValue] = React.useState("");

  return (
    <textarea
      value={value}  // Controlled value
      onChange={(e) => setValue(e.target.value)}  // Controlled onChange
    />
  );
}

// Typed controlled textarea
interface ControlledTextareaProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  cols?: number;
}

function TypedControlledTextarea({
  value,
  onChange,
  rows = 5,
  cols = 50,
}: ControlledTextareaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      cols={cols}
    />
  );
}

// Controlled form
interface FormData {
  name: string;
  email: string;
  age: number;
}

function ControlledForm() {
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    email: "",
    age: 0,
  });

  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={formData.age}
        onChange={(e) => handleChange("age", Number(e.target.value))}
        placeholder="Age"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Generic controlled component
interface ControlledComponentProps<T> {
  value: T;
  onChange: (value: T) => void;
}

function GenericControlledInput<T extends string | number>({
  value,
  onChange,
}: ControlledComponentProps<T>) {
  return (
    <input
      value={String(value)}
      onChange={(e) => {
        const newValue = typeof value === "number"
          ? Number(e.target.value) as T
          : e.target.value as T;
        onChange(newValue);
      }}
    />
  );
}

// Controlled component with multiple fields
interface MultiFieldFormProps {
  values: Record<string, any>;
  onChange: (field: string, value: any) => void;
}

function MultiFieldForm({ values, onChange }: MultiFieldFormProps) {
  return (
    <form>
      {Object.entries(values).map(([field, value]) => (
        <input
          key={field}
          name={field}
          value={String(value)}
          onChange={(e) => onChange(field, e.target.value)}
        />
      ))}
    </form>
  );
}

// Type-safe controlled form hook
function useControlledForm<T extends Record<string, any>>(
  initialValues: T
): {
  values: T;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  reset: () => void;
  handleChange: (field: keyof T) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
} {
  const [values, setValues] = React.useState<T>(initialValues);

  const setValue = React.useCallback(<K extends keyof T>(
    field: K,
    value: T[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const reset = React.useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = React.useCallback(
    (field: keyof T) => (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value = e.target.value as T[typeof field];
      setValue(field, value);
    },
    [setValue]
  );

  return { values, setValue, reset, handleChange };
}

// Usage
function FormHookUsage() {
  const { values, setValue, reset, handleChange } = useControlledForm({
    name: "",
    email: "",
    age: 0,
  });

  return (
    <form>
      <input
        value={values.name}
        onChange={handleChange("name")}
      />
      <input
        type="email"
        value={values.email}
        onChange={handleChange("email")}
      />
      <input
        type="number"
        value={values.age}
        onChange={(e) => setValue("age", Number(e.target.value))}
      />
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
}`}
        </CodeBlock>

        <InfoBox type="info">
          Controlled components have their value controlled by React state. Use
          value and onChange props for type-safe controlled components. Validate
          input through onChange handlers. Use generic types for reusable
          controlled components. Controlled components provide full control over
          component state.
        </InfoBox>
      </Section>

      <Section title="2. Uncontrolled Components">
        <p className="text-gray-700 dark:text-gray-300">
          Uncontrolled components store their state in the DOM. Use refs or
          defaultValue/defaultChecked to access values. Understanding
          uncontrolled component typing enables type-safe DOM access.
        </p>

        <CodeBlock title="Uncontrolled Components Typing">
          {`// Basic uncontrolled component
function UncontrolledInput() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const value = inputRef.current?.value;
    console.log("Value:", value);
  };

  return (
    <div>
      <input ref={inputRef} defaultValue="Default" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// Typed uncontrolled input
interface UncontrolledInputProps {
  defaultValue?: string;
  onBlur?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function TypedUncontrolledInput({
  defaultValue = "",
  onBlur,
  onKeyDown,
}: UncontrolledInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    const value = inputRef.current?.value || "";
    onBlur?.(value);
  };

  return (
    <input
      ref={inputRef}
      defaultValue={defaultValue}
      onBlur={handleBlur}
      onKeyDown={onKeyDown}
    />
  );
}

// Uncontrolled checkbox
function UncontrolledCheckbox() {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const checked = checkboxRef.current?.checked;
    console.log("Checked:", checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        ref={checkboxRef}
        defaultChecked={false}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// Typed uncontrolled checkbox
interface UncontrolledCheckboxProps {
  defaultChecked?: boolean;
  onBlur?: (checked: boolean) => void;
}

function TypedUncontrolledCheckbox({
  defaultChecked = false,
  onBlur,
}: UncontrolledCheckboxProps) {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    const checked = checkboxRef.current?.checked || false;
    onBlur?.(checked);
  };

  return (
    <input
      type="checkbox"
      ref={checkboxRef}
      defaultChecked={defaultChecked}
      onBlur={handleBlur}
    />
  );
}

// Uncontrolled select
function UncontrolledSelect() {
  const selectRef = React.useRef<HTMLSelectElement>(null);

  const handleSubmit = () => {
    const value = selectRef.current?.value;
    console.log("Selected:", value);
  };

  return (
    <div>
      <select ref={selectRef} defaultValue="option1">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// Typed uncontrolled select
interface UncontrolledSelectProps<T extends string> {
  defaultValue?: T;
  options: Array<{ value: T; label: string }>;
  onBlur?: (value: T) => void;
}

function TypedUncontrolledSelect<T extends string>({
  defaultValue,
  options,
  onBlur,
}: UncontrolledSelectProps<T>) {
  const selectRef = React.useRef<HTMLSelectElement>(null);

  const handleBlur = () => {
    const value = (selectRef.current?.value || defaultValue) as T;
    onBlur?.(value);
  };

  return (
    <select ref={selectRef} defaultValue={defaultValue} onBlur={handleBlur}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Uncontrolled form
function UncontrolledForm() {
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = Object.fromEntries(formData.entries());
      console.log("Form data:", data);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="name" defaultValue="" />
      <input name="email" type="email" defaultValue="" />
      <input name="age" type="number" defaultValue="0" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Uncontrolled form with refs
function UncontrolledFormWithRefs() {
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const ageRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const data = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      age: Number(ageRef.current?.value) || 0,
    };
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <input ref={nameRef} defaultValue="" placeholder="Name" />
      <input ref={emailRef} type="email" defaultValue="" placeholder="Email" />
      <input ref={ageRef} type="number" defaultValue="0" placeholder="Age" />
      <button type="submit">Submit</button>
    </form>
  );
}

// File input (always uncontrolled)
function FileInput() {
  const fileRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    const files = fileRef.current?.files;
    if (files) {
      Array.from(files).forEach((file) => {
        console.log("File:", file.name, file.size);
      });
    }
  };

  return (
    <input
      ref={fileRef}
      type="file"
      onChange={handleFileChange}
    />
  );
}

// Mixed controlled/uncontrolled
interface FlexibleInputProps {
  // Controlled
  value?: string;
  onChange?: (value: string) => void;
  // Uncontrolled
  defaultValue?: string;
  onBlur?: (value: string) => void;
}

function FlexibleInput({
  value,
  onChange,
  defaultValue,
  onBlur,
}: FlexibleInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const handleBlur = () => {
    const finalValue = isControlled
      ? value
      : inputRef.current?.value || "";
    onBlur?.(finalValue);
  };

  return (
    <input
      ref={inputRef}
      value={currentValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

// Type-safe uncontrolled form hook
function useUncontrolledForm<T extends Record<string, any>>(
  defaultValues: T
): {
  refs: { [K in keyof T]: React.RefObject<HTMLInputElement> };
  getValues: () => T;
  reset: () => void;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
} {
  const refs = React.useMemo(() => {
    const refsMap = {} as { [K in keyof T]: React.RefObject<HTMLInputElement> };
    (Object.keys(defaultValues) as Array<keyof T>).forEach((key) => {
      refsMap[key] = React.useRef<HTMLInputElement>(null);
    });
    return refsMap;
  }, [defaultValues]);

  const getValues = React.useCallback((): T => {
    const values = {} as T;
    (Object.keys(defaultValues) as Array<keyof T>).forEach((key) => {
      const ref = refs[key];
      if (ref.current) {
        values[key] = ref.current.value as T[typeof key];
      } else {
        values[key] = defaultValues[key];
      }
    });
    return values;
  }, [refs, defaultValues]);

  const reset = React.useCallback(() => {
    (Object.keys(defaultValues) as Array<keyof T>).forEach((key) => {
      const ref = refs[key];
      if (ref.current) {
        ref.current.value = String(defaultValues[key]);
      }
    });
  }, [refs, defaultValues]);

  const setValue = React.useCallback(<K extends keyof T>(
    field: K,
    value: T[K]
  ) => {
    const ref = refs[field];
    if (ref.current) {
      ref.current.value = String(value);
    }
  }, [refs]);

  return { refs, getValues, reset, setValue };
}

// Usage
function UncontrolledFormHookUsage() {
  const { refs, getValues, reset } = useUncontrolledForm({
    name: "",
    email: "",
    age: 0,
  });

  const handleSubmit = () => {
    const values = getValues();
    console.log("Values:", values);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <input ref={refs.name} defaultValue="" placeholder="Name" />
      <input ref={refs.email} type="email" defaultValue="" placeholder="Email" />
      <input ref={refs.age} type="number" defaultValue="0" placeholder="Age" />
      <button type="submit">Submit</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  );
}

// When to use controlled vs uncontrolled
// Controlled: When you need real-time validation, formatting, or control
// Uncontrolled: For simple forms, file inputs, or when performance matters`}
        </CodeBlock>

        <InfoBox type="tip">
          Uncontrolled components store state in the DOM. Use refs to access
          values. Use defaultValue/defaultChecked for initial values. File
          inputs are always uncontrolled. Create flexible components that
          support both controlled and uncontrolled patterns. Use FormData API
          for form submission with uncontrolled components.
        </InfoBox>
      </Section>
    </div>
  );
}

