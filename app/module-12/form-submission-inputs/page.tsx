import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function FormSubmissionInputsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Form Submission & Input Changes
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Form submission and input change handlers are fundamental to form
        handling. Understanding their TypeScript typing enables type-safe form
        interactions.
      </p>

      <Section title="1. Form Submission Typing">
        <p className="text-gray-700 dark:text-gray-300">
          Form submission handlers use React.FormEvent for submit events.
          Understanding submit handler typing enables type-safe form submission.
        </p>

        <CodeBlock title="Form Submission Typing">
          {`// Basic form submission handler
interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function Form({ onSubmit }: FormProps) {
  return (
    <form onSubmit={onSubmit}>
      <input name="field" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Usage
<Form
  onSubmit={(event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("field"));
  }}
/>

// Typed form submission with data extraction
interface UserFormData {
  name: string;
  email: string;
  age: number;
}

interface TypedFormProps {
  onSubmit: (data: UserFormData) => void;
}

function TypedForm({ onSubmit }: TypedFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const data: UserFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      age: Number(formData.get("age")),
    };
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" required />
      <input name="email" type="email" required />
      <input name="age" type="number" required />
      <button type="submit">Submit</button>
    </form>
  );
}

// Generic form submission helper
function extractFormData<T extends Record<string, string>>(
  form: HTMLFormElement
): Partial<T> {
  const formData = new FormData(form);
  const data: Partial<T> = {};
  
  for (const [key] of formData.entries()) {
    data[key as keyof T] = formData.get(key) as T[keyof T];
  }
  
  return data;
}

interface GenericFormProps<T extends Record<string, string>> {
  onSubmit: (data: T) => void;
  fields: Array<keyof T>;
}

function GenericForm<T extends Record<string, string>>({
  onSubmit,
  fields,
}: GenericFormProps<T>) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = extractFormData<T>(event.currentTarget) as T;
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <input key={String(field)} name={String(field)} />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

// Async form submission
interface AsyncFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

function AsyncForm({ onSubmit, onSuccess, onError }: AsyncFormProps) {
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      await onSubmit(formData);
      onSuccess?.();
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="field" />
      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

// Form submission with validation
interface ValidatedFormProps {
  onSubmit: (data: Record<string, string>) => void;
  validate?: (data: Record<string, string>) => Record<string, string>;
}

function ValidatedForm({ onSubmit, validate }: ValidatedFormProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const data: Record<string, string> = {};
    
    for (const [key, value] of formData.entries()) {
      data[key] = value as string;
    }

    if (validate) {
      const validationErrors = validate(data);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setErrors({});
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="field" />
      {errors.field && <span>{errors.field}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

// Form submission with event target access
function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  
  // Access form element
  const form = event.currentTarget;
  
  // Access form elements
  const inputs = form.elements;
  
  // Type-safe element access
  const nameInput = form.elements.namedItem("name") as HTMLInputElement;
  const emailInput = form.elements.namedItem("email") as HTMLInputElement;
  
  const data = {
    name: nameInput.value,
    email: emailInput.value,
  };
  
  console.log(data);
}

// Form submission with refs
interface RefFormProps {
  onSubmit: (data: Record<string, string>) => void;
}

function RefForm({ onSubmit }: RefFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    
    for (const [key, value] of formData.entries()) {
      data[key] = value as string;
    }
    
    onSubmit(data);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="field" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Typed form submission hook
function useFormSubmit<T extends Record<string, any>>(
  onSubmit: (data: T) => void | Promise<void>
) {
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitting(true);
      setErrors({});

      try {
        const formData = new FormData(event.currentTarget);
        const data: Partial<T> = {};

        for (const [key, value] of formData.entries()) {
          data[key as keyof T] = value as T[keyof T];
        }

        await onSubmit(data as T);
      } catch (error) {
        if (error instanceof Error) {
          setErrors({ submit: error.message });
        }
      } finally {
        setSubmitting(false);
      }
    },
    [onSubmit]
  );

  return { handleSubmit, submitting, errors };
}

// Usage
function Component() {
  const { handleSubmit, submitting, errors } = useFormSubmit<UserFormData>(
    async (data) => {
      console.log(data);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" />
      {errors.submit && <span>{errors.submit}</span>}
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
}`}
        </CodeBlock>

        <InfoBox type="info">
          Form submission handlers use React.FormEvent for submit events. Use
          event.preventDefault() to prevent default form submission. Access form
          data via FormData or form elements. Type form data extraction for type
          safety. Use async handlers for server submission.
        </InfoBox>
      </Section>

      <Section title="2. Input Change Handlers">
        <p className="text-gray-700 dark:text-gray-300">
          Input change handlers use React.ChangeEvent for different input types.
          Understanding change handler typing enables type-safe input handling
          for various input types.
        </p>

        <CodeBlock title="Input Change Handler Typing">
          {`// Basic input change handler
function TextInput() {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return <input value={value} onChange={handleChange} />;
}

// Typed input change handler
interface InputProps {
  value: string;
  onChange: (value: string) => void;
}

function TypedInput({ value, onChange }: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return <input value={value} onChange={handleChange} />;
}

// Number input change handler
function NumberInput() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value);
    if (!isNaN(numValue)) {
      setValue(numValue);
    }
  };

  return <input type="number" value={value} onChange={handleChange} />;
}

// Typed number input
interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

function TypedNumberInput({ value, onChange, min, max }: NumberInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value);
    
    if (isNaN(numValue)) return;
    if (min !== undefined && numValue < min) return;
    if (max !== undefined && numValue > max) return;
    
    onChange(numValue);
  };

  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
    />
  );
}

// Textarea change handler
function TextareaInput() {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return <textarea value={value} onChange={handleChange} />;
}

// Typed textarea
interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
}

function TypedTextarea({ value, onChange }: TextareaProps) {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return <textarea value={value} onChange={handleChange} />;
}

// Select change handler
function SelectInput() {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="">Select...</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
  );
}

// Typed select with options
interface SelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
}

function TypedSelect<T extends string>({
  value,
  onChange,
  options,
}: SelectProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <select value={value} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Checkbox change handler
function CheckboxInput() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return <input type="checkbox" checked={checked} onChange={handleChange} />;
}

// Typed checkbox
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function TypedCheckbox({ checked, onChange }: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return <input type="checkbox" checked={checked} onChange={handleChange} />;
}

// Radio change handler
function RadioInput() {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <input
        type="radio"
        name="option"
        value="option1"
        checked={value === "option1"}
        onChange={handleChange}
      />
      <input
        type="radio"
        name="option"
        value="option2"
        checked={value === "option2"}
        onChange={handleChange}
      />
    </>
  );
}

// Typed radio group
interface RadioGroupProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
  name: string;
}

function TypedRadioGroup<T extends string>({
  value,
  onChange,
  options,
  name,
}: RadioGroupProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleChange}
          />
          {option.label}
        </label>
      ))}
    </>
  );
}

// Generic input change handler
interface GenericInputProps<T> {
  value: T;
  onChange: (value: T) => void;
  type?: "text" | "number" | "email" | "password";
  parse?: (value: string) => T;
  format?: (value: T) => string;
}

function GenericInput<T>({
  value,
  onChange,
  type = "text",
  parse,
  format,
}: GenericInputProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = event.target.value;
    const parsedValue = parse ? parse(stringValue) : (stringValue as T);
    onChange(parsedValue);
  };

  const displayValue = format ? format(value) : String(value);

  return (
    <input
      type={type}
      value={displayValue}
      onChange={handleChange}
    />
  );
}

// Usage
<GenericInput<string>
  value="Hello"
  onChange={(v) => console.log(v)}
/>

<GenericInput<number>
  value={42}
  onChange={(v) => console.log(v)}
  parse={(v) => Number(v)}
  format={(v) => String(v)}
/>

// Input change handler with validation
interface ValidatedInputProps {
  value: string;
  onChange: (value: string) => void;
  validator?: (value: string) => string | undefined;
}

function ValidatedInput({ value, onChange, validator }: ValidatedInputProps) {
  const [error, setError] = React.useState<string | undefined>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);

    if (validator) {
      const validationError = validator(newValue);
      setError(validationError);
    }
  };

  return (
    <div>
      <input
        value={value}
        onChange={handleChange}
        style={{ borderColor: error ? "red" : "gray" }}
      />
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}

// Multiple input change handler
interface MultiInputProps {
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

function MultiInput({ values, onChange }: MultiInputProps) {
  const handleChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    onChange(field, event.target.value);
  };

  return (
    <form>
      <input
        value={values.name || ""}
        onChange={handleChange("name")}
      />
      <input
        value={values.email || ""}
        onChange={handleChange("email")}
      />
    </form>
  );
}

// Input change handler hook
function useInputChange<T>(
  initialValue: T,
  onChange?: (value: T) => void
): [T, (event: React.ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = React.useState<T>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as T;
    setValue(newValue);
    onChange?.(newValue);
  };

  return [value, handleChange];
}`}
        </CodeBlock>

        <InfoBox type="important">
          Input change handlers use React.ChangeEvent for different input types.
          Use event.target.value for text inputs, event.target.checked for
          checkboxes. Type change handlers based on input type. Use generic
          handlers for reusable input components. Validate input changes inline.
        </InfoBox>
      </Section>
    </div>
  );
}
