import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function CheckboxRadioTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Checkbox & Radio Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Checkbox and Radio inputs enable boolean and value-based inputs.
        Understanding checkbox and radio typing enables type-safe form handling.
      </p>

      <Section title="1. Checkbox Typing">
        <p className="text-gray-700 dark:text-gray-300">
          Checkbox inputs enable boolean values. Understanding checkbox typing
          enables type-safe boolean input handling.
        </p>

        <CodeBlock title="Checkbox Typing">
          {`// Basic checkbox
function BasicCheckbox() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <input type="checkbox" checked={checked} onChange={handleChange} />
  );
}

// Typed checkbox
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

function TypedCheckbox({
  checked,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      {label}
    </label>
  );
}

// Checkbox with value
interface ValueCheckboxProps<T extends string | number> {
  value: T;
  checked: boolean;
  onChange: (value: T, checked: boolean) => void;
  label: string;
}

function ValueCheckbox<T extends string | number>({
  value,
  checked,
  onChange,
  label,
}: ValueCheckboxProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value, event.target.checked);
  };

  return (
    <label>
      <input
        type="checkbox"
        value={String(value)}
        checked={checked}
        onChange={handleChange}
      />
      {label}
    </label>
  );
}

// Multiple checkboxes
interface MultipleCheckboxProps<T extends string | number> {
  options: Array<{ value: T; label: string }>;
  selected: T[];
  onChange: (selected: T[]) => void;
}

function MultipleCheckbox<T extends string | number>({
  options,
  selected,
  onChange,
}: MultipleCheckboxProps<T>) {
  const handleChange = (value: T, checked: boolean) => {
    if (checked) {
      onChange([...selected, value]);
    } else {
      onChange(selected.filter((v) => v !== value));
    }
  };

  return (
    <div>
      {options.map((option) => (
        <ValueCheckbox
          key={String(option.value)}
          value={option.value}
          checked={selected.includes(option.value)}
          onChange={handleChange}
          label={option.label}
        />
      ))}
    </div>
  );
}

// Usage
<MultipleCheckbox<string>
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]}
  selected={selectedValues}
  onChange={setSelectedValues}
/>

// Checkbox group with object values
interface CheckboxOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface CheckboxGroupProps<T extends string | number> {
  options: CheckboxOption<T>[];
  selected: T[];
  onChange: (selected: T[]) => void;
  name?: string;
}

function CheckboxGroup<T extends string | number>({
  options,
  selected,
  onChange,
  name,
}: CheckboxGroupProps<T>) {
  const handleChange = (value: T, checked: boolean) => {
    if (checked) {
      onChange([...selected, value]);
    } else {
      onChange(selected.filter((v) => v !== value));
    }
  };

  return (
    <div role="group" aria-labelledby={name}>
      {options.map((option) => (
        <label key={String(option.value)}>
          <input
            type="checkbox"
            name={name}
            value={String(option.value)}
            checked={selected.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
            disabled={option.disabled}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

// Controlled checkbox with intermediate state
interface TriStateCheckboxProps {
  value: boolean | null; // null = indeterminate
  onChange: (value: boolean | null) => void;
  label?: string;
}

function TriStateCheckbox({
  value,
  onChange,
  label,
}: TriStateCheckboxProps) {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = value === null;
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Cycle: null -> true -> false -> null
    if (value === null) {
      onChange(true);
    } else if (value === true) {
      onChange(false);
    } else {
      onChange(null);
    }
  };

  return (
    <label>
      <input
        ref={checkboxRef}
        type="checkbox"
        checked={value === true}
        onChange={handleChange}
      />
      {label}
    </label>
  );
}

// Checkbox with async operation
interface AsyncCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => Promise<void>;
  label?: string;
}

function AsyncCheckbox({ checked, onChange, label }: AsyncCheckboxProps) {
  const [loading, setLoading] = React.useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      await onChange(event.target.checked);
    } catch (error) {
      console.error("Failed to update:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={loading}
      />
      {label}
      {loading && <span>Loading...</span>}
    </label>
  );
}

// Typed checkbox hook
function useCheckbox(initialValue = false) {
  const [checked, setChecked] = React.useState(initialValue);

  const toggle = React.useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    },
    []
  );

  return { checked, setChecked, toggle, handleChange };
}`}
        </CodeBlock>

        <InfoBox type="info">
          Checkbox inputs enable boolean values. Use event.target.checked for
          checkbox state. Support value-based checkboxes for multiple
          selections. Handle indeterminate state for tri-state checkboxes.
          Checkbox typing enables type-safe boolean input handling.
        </InfoBox>
      </Section>

      <Section title="2. Radio Typing">
        <p className="text-gray-700 dark:text-gray-300">
          Radio inputs enable single selection from multiple options.
          Understanding radio typing enables type-safe single-selection
          handling.
        </p>

        <CodeBlock title="Radio Typing">
          {`// Basic radio group
function BasicRadioGroup() {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          name="option"
          value="option1"
          checked={value === "option1"}
          onChange={handleChange}
        />
        Option 1
      </label>
      <label>
        <input
          type="radio"
          name="option"
          value="option2"
          checked={value === "option2"}
          onChange={handleChange}
        />
        Option 2
      </label>
    </div>
  );
}

// Typed radio group
interface RadioGroupProps<T extends string | number> {
  value: T | null;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string }>;
  name: string;
}

function TypedRadioGroup<T extends string | number>({
  value,
  onChange,
  options,
  name,
}: RadioGroupProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <div role="radiogroup">
      {options.map((option) => (
        <label key={String(option.value)}>
          <input
            type="radio"
            name={name}
            value={String(option.value)}
            checked={value === option.value}
            onChange={handleChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

// Usage
<TypedRadioGroup<string>
  value={selectedValue}
  onChange={setSelectedValue}
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]}
  name="myRadioGroup"
/>

// Radio group with object values
interface User {
  id: number;
  name: string;
}

interface ObjectRadioGroupProps {
  value: User | null;
  onChange: (value: User) => void;
  options: User[];
  name: string;
}

function ObjectRadioGroup({
  value,
  onChange,
  options,
  name,
}: ObjectRadioGroupProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = Number(event.target.value);
    const selectedUser = options.find((user) => user.id === selectedId);
    if (selectedUser) {
      onChange(selectedUser);
    }
  };

  return (
    <div role="radiogroup">
      {options.map((user) => (
        <label key={user.id}>
          <input
            type="radio"
            name={name}
            value={String(user.id)}
            checked={value?.id === user.id}
            onChange={handleChange}
          />
          {user.name}
        </label>
      ))}
    </div>
  );
}

// Radio group with disabled options
interface RadioOption<T extends string | number> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface RadioGroupWithDisabledProps<T extends string | number> {
  value: T | null;
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  name: string;
}

function RadioGroupWithDisabled<T extends string | number>({
  value,
  onChange,
  options,
  name,
}: RadioGroupWithDisabledProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <div role="radiogroup">
      {options.map((option) => (
        <label key={String(option.value)}>
          <input
            type="radio"
            name={name}
            value={String(option.value)}
            checked={value === option.value}
            onChange={handleChange}
            disabled={option.disabled}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

// Radio group with custom render
interface CustomRadioGroupProps<T extends string | number> {
  value: T | null;
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  name: string;
  renderOption?: (option: RadioOption<T>, checked: boolean) => React.ReactNode;
}

function CustomRadioGroup<T extends string | number>({
  value,
  onChange,
  options,
  name,
  renderOption,
}: CustomRadioGroupProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <div role="radiogroup">
      {options.map((option) => {
        const checked = value === option.value;
        const input = (
          <input
            type="radio"
            name={name}
            value={String(option.value)}
            checked={checked}
            onChange={handleChange}
            disabled={option.disabled}
            style={{ display: "none" }}
          />
        );

        return (
          <label key={String(option.value)}>
            {input}
            {renderOption ? renderOption(option, checked) : option.label}
          </label>
        );
      })}
    </div>
  );
}

// Radio group with validation
interface ValidatedRadioGroupProps<T extends string | number> {
  value: T | null;
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  name: string;
  required?: boolean;
  error?: string;
}

function ValidatedRadioGroup<T extends string | number>({
  value,
  onChange,
  options,
  name,
  required = false,
  error,
}: ValidatedRadioGroupProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <div>
      <div role="radiogroup">
        {options.map((option) => (
          <label key={String(option.value)}>
            <input
              type="radio"
              name={name}
              value={String(option.value)}
              checked={value === option.value}
              onChange={handleChange}
              required={required}
              disabled={option.disabled}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <span style={{ color: "red" }}>{error}</span>}
      {required && !value && (
        <span style={{ color: "red" }}>This field is required</span>
      )}
    </div>
  );
}

// Typed radio hook
function useRadio<T extends string | number>(
  initialValue: T | null = null,
  options: Array<{ value: T; label: string }>
) {
  const [value, setValue] = React.useState<T | null>(initialValue);

  const handleChange = React.useCallback(
    (newValue: T) => {
      setValue(newValue);
    },
    []
  );

  const reset = React.useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  const isValid = value !== null;

  return { value, onChange: handleChange, reset, isValid, options };
}

// Radio group component factory
function createRadioGroup<T extends string | number>() {
  return function RadioGroup(props: RadioGroupProps<T>) {
    return <TypedRadioGroup {...props} />;
  };
}

// Usage
const StringRadioGroup = createRadioGroup<string>();
const NumberRadioGroup = createRadioGroup<number>();`}
        </CodeBlock>

        <InfoBox type="important">
          Radio inputs enable single selection from multiple options. Use name
          attribute to group radio buttons. Type radio values with generics.
          Support object values with ID mapping. Radio typing enables type-safe
          single-selection handling.
        </InfoBox>
      </Section>
    </div>
  );
}
