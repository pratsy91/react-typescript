import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function FormDataValidationPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Form Data & Validation
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        FormData typing and typed form data extraction enable type-safe form
        handling. Validation typing ensures type-safe validation functions and
        error handling.
      </p>

      <Section title="1. FormData Typing">
        <p className="text-gray-700 dark:text-gray-300">
          FormData API enables form data extraction. Understanding FormData
          typing enables type-safe form data handling and extraction.
        </p>

        <CodeBlock title="FormData Typing">
          {`// Basic FormData usage
function BasicForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Get form values
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    
    console.log({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" />
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}

// Typed FormData extraction
interface UserFormData {
  name: string;
  email: string;
  age: number;
}

function extractTypedFormData<T extends Record<string, any>>(
  form: HTMLFormElement,
  schema: Record<keyof T, (value: FormDataEntryValue | null) => T[keyof T]>
): T {
  const formData = new FormData(form);
  const data: Partial<T> = {};

  for (const [key, parser] of Object.entries(schema)) {
    const value = formData.get(key);
    data[key as keyof T] = parser(value);
  }

  return data as T;
}

// Usage
const userData = extractTypedFormData<UserFormData>(form, {
  name: (value) => String(value || ""),
  email: (value) => String(value || ""),
  age: (value) => Number(value) || 0,
});

// Generic FormData helper
function getFormData<T extends Record<string, any>>(
  form: HTMLFormElement
): Partial<T> {
  const formData = new FormData(form);
  const data: Partial<T> = {};

  for (const [key, value] of formData.entries()) {
    // Type assertion - in real app, validate types
    data[key as keyof T] = value as T[keyof T];
  }

  return data;
}

// Typed FormData with validation
function getTypedFormData<T extends Record<string, any>>(
  form: HTMLFormElement,
  validators: {
    [K in keyof T]: (value: FormDataEntryValue | null) => T[K];
  }
): T {
  const formData = new FormData(form);
  const data: Partial<T> = {};

  for (const [key, validator] of Object.entries(validators)) {
    const value = formData.get(key);
    data[key as keyof T] = validator(value);
  }

  return data as T;
}

// FormData with array values
interface FormDataWithArrays {
  tags: string[];
  categories: number[];
}

function getArrayFormData(form: HTMLFormElement): FormDataWithArrays {
  const formData = new FormData(form);
  
  return {
    tags: formData.getAll("tags") as string[],
    categories: formData
      .getAll("categories")
      .map((v) => Number(v))
      .filter((v) => !isNaN(v)),
  };
}

// Typed FormData entry
type FormDataEntry = [string, FormDataEntryValue];

function processFormDataEntries<T extends Record<string, any>>(
  entries: FormDataEntry[],
  mapper: (key: string, value: FormDataEntryValue) => any
): Partial<T> {
  const data: Partial<T> = {};

  for (const [key, value] of entries) {
    data[key as keyof T] = mapper(key, value) as T[keyof T];
  }

  return data;
}

// FormData with file handling
interface FormDataWithFiles {
  name: string;
  avatar: File | null;
  documents: File[];
}

function extractFormDataWithFiles(form: HTMLFormElement): FormDataWithFiles {
  const formData = new FormData(form);
  const avatar = formData.get("avatar") as File | null;
  const documents = formData.getAll("documents") as File[];

  return {
    name: formData.get("name") as string,
    avatar,
    documents,
  };
}

// Type-safe FormData builder
class TypedFormData<T extends Record<string, any>> {
  private formData: FormData;

  constructor(initialData?: Partial<T>) {
    this.formData = new FormData();
    
    if (initialData) {
      for (const [key, value] of Object.entries(initialData)) {
        this.set(key, value);
      }
    }
  }

  set<K extends keyof T>(key: K, value: T[K]): void {
    if (value instanceof File) {
      this.formData.append(String(key), value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        this.formData.append(String(key), String(item));
      });
    } else {
      this.formData.append(String(key), String(value));
    }
  }

  get<K extends keyof T>(key: K): T[K] | null {
    return this.formData.get(String(key)) as T[K] | null;
  }

  getAll<K extends keyof T>(key: K): T[K][] {
    return this.formData.getAll(String(key)) as T[K][];
  }

  toFormData(): FormData {
    return this.formData;
  }

  static fromForm<T extends Record<string, any>>(
    form: HTMLFormElement,
    schema: {
      [K in keyof T]: (value: FormDataEntryValue | null) => T[K];
    }
  ): T {
    const formData = new FormData(form);
    const data: Partial<T> = {};

    for (const [key, parser] of Object.entries(schema)) {
      const value = formData.get(key);
      data[key as keyof T] = parser(value);
    }

    return data as T;
  }
}

// Usage
const typedFormData = new TypedFormData<UserFormData>();
typedFormData.set("name", "John");
typedFormData.set("email", "john@example.com");
typedFormData.set("age", 30);

// Extract from form
const userData2 = TypedFormData.fromForm<UserFormData>(form, {
  name: (v) => String(v || ""),
  email: (v) => String(v || ""),
  age: (v) => Number(v) || 0,
});

// FormData hook
function useFormData<T extends Record<string, any>>(
  initialData?: Partial<T>
) {
  const [data, setData] = React.useState<Partial<T>>(initialData || {});

  const updateField = <K extends keyof T>(key: K, value: T[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const extractFromForm = (form: HTMLFormElement, schema: {
    [K in keyof T]: (value: FormDataEntryValue | null) => T[K];
  }) => {
    const formData = TypedFormData.fromForm(form, schema);
    setData(formData);
    return formData;
  };

  const reset = () => {
    setData(initialData || {});
  };

  return { data, updateField, extractFromForm, reset };
}`}
        </CodeBlock>

        <InfoBox type="info">
          FormData API enables typed form data extraction. Use type assertions
          carefully and validate types. Create typed FormData helpers for
          reusable extraction. Handle arrays and files separately. FormData
          typing enables type-safe form data handling.
        </InfoBox>
      </Section>

      <Section title="2. Validation Typing">
        <p className="text-gray-700 dark:text-gray-300">
          Validation typing ensures type-safe validation functions and error
          handling. Understanding validation typing enables robust form
          validation.
        </p>

        <CodeBlock title="Validation Typing">
          {`// Basic validation function
type ValidationResult = string | undefined;

function validateEmail(email: string): ValidationResult {
  if (!email) return "Email is required";
  if (!email.includes("@")) return "Invalid email format";
  return undefined;
}

// Typed validation function
type Validator<T> = (value: T) => string | undefined;

function validateString(value: string): ValidationResult {
  if (!value || value.trim().length === 0) {
    return "This field is required";
  }
  return undefined;
}

function validateNumber(value: number): ValidationResult {
  if (isNaN(value)) return "Must be a number";
  if (value < 0) return "Must be positive";
  return undefined;
}

// Validation with multiple rules
type ValidationRule<T> = {
  validator: Validator<T>;
  message?: string;
};

function createValidator<T>(rules: ValidationRule<T>[]): Validator<T> {
  return (value: T) => {
    for (const rule of rules) {
      const error = rule.validator(value);
      if (error) return error || rule.message;
    }
    return undefined;
  };
}

// Usage
const emailValidator = createValidator<string>([
  { validator: (v) => !v ? "Required" : undefined },
  { validator: (v) => !v.includes("@") ? "Invalid email" : undefined },
]);

// Typed validation schema
interface ValidationSchema<T extends Record<string, any>> {
  [K in keyof T]?: Validator<T[K]>;
}

type ValidationErrors<T> = Partial<Record<keyof T, string>>;

function validateForm<T extends Record<string, any>>(
  data: T,
  schema: ValidationSchema<T>
): ValidationErrors<T> {
  const errors: ValidationErrors<T> = {};

  for (const [field, validator] of Object.entries(schema)) {
    if (validator) {
      const value = data[field as keyof T];
      const error = validator(value);
      if (error) {
        errors[field as keyof T] = error;
      }
    }
  }

  return errors;
}

// Usage
interface UserData {
  name: string;
  email: string;
  age: number;
}

const userSchema: ValidationSchema<UserData> = {
  name: (value) => !value ? "Name is required" : undefined,
  email: (value) => !value?.includes("@") ? "Invalid email" : undefined,
  age: (value) => value < 18 ? "Must be 18+" : undefined,
};

const errors = validateForm(userData, userSchema);

// Async validation
type AsyncValidator<T> = (value: T) => Promise<string | undefined>;

async function validateEmailUnique(email: string): Promise<ValidationResult> {
  // Simulate API call
  const exists = await checkEmailExists(email);
  return exists ? "Email already taken" : undefined;
}

// Combined sync and async validation
async function validateWithAsync<T extends Record<string, any>>(
  data: T,
  syncSchema: ValidationSchema<T>,
  asyncValidators?: Partial<Record<keyof T, AsyncValidator<T[keyof T]>>>
): Promise<ValidationErrors<T>> {
  // First, run sync validators
  const errors = validateForm(data, syncSchema);

  // If sync errors exist, don't run async
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // Run async validators
  if (asyncValidators) {
    for (const [field, validator] of Object.entries(asyncValidators)) {
      if (validator) {
        const value = data[field as keyof T];
        const error = await validator(value);
        if (error) {
          errors[field as keyof T] = error;
        }
      }
    }
  }

  return errors;
}

// Validation with conditional rules
interface ConditionalRule<T, K extends keyof T> {
  field: K;
  condition: (data: T) => boolean;
  validator: Validator<T[K]>;
}

function validateConditional<T extends Record<string, any>>(
  data: T,
  rules: ConditionalRule<T, keyof T>[]
): ValidationErrors<T> {
  const errors: ValidationErrors<T> = {};

  for (const rule of rules) {
    if (rule.condition(data)) {
      const value = data[rule.field];
      const error = rule.validator(value);
      if (error) {
        errors[rule.field] = error;
      }
    }
  }

  return errors;
}

// Usage
const conditionalRules: ConditionalRule<UserData, keyof UserData>[] = [
  {
    field: "email",
    condition: (data) => !!data.email,
    validator: (email) => !email.includes("@") ? "Invalid email" : undefined,
  },
];

// Validation result type
type ValidationResult2<T> =
  | { valid: true; data: T }
  | { valid: false; errors: ValidationErrors<T> };

function validateAndTransform<T extends Record<string, any>>(
  rawData: Record<string, any>,
  schema: ValidationSchema<T>,
  transformer?: (data: Partial<T>) => T
): ValidationResult2<T> {
  const typedData = rawData as Partial<T>;
  const errors = validateForm(typedData as T, schema);

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  const data = transformer ? transformer(typedData) : (typedData as T);
  return { valid: true, data };
}

// Type-safe validation error
class ValidationError<T extends Record<string, any>> extends Error {
  constructor(
    public errors: ValidationErrors<T>,
    message?: string
  ) {
    super(message || "Validation failed");
    this.name = "ValidationError";
  }

  getFieldError<K extends keyof T>(field: K): string | undefined {
    return this.errors[field];
  }

  hasError<K extends keyof T>(field: K): boolean {
    return !!this.errors[field];
  }
}

// Validation hook
function useValidation<T extends Record<string, any>>(
  schema: ValidationSchema<T>
) {
  const [errors, setErrors] = React.useState<ValidationErrors<T>>({});

  const validate = React.useCallback(
    (data: T): boolean => {
      const validationErrors = validateForm(data, schema);
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    },
    [schema]
  );

  const validateField = React.useCallback(
    <K extends keyof T>(field: K, value: T[K]): boolean => {
      const validator = schema[field];
      if (!validator) return true;

      const error = validator(value);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));

      return !error;
    },
    [schema]
  );

  const clearErrors = React.useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = React.useCallback(<K extends keyof T>(field: K) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  return {
    errors,
    validate,
    validateField,
    clearErrors,
    clearFieldError,
  };
}

// Usage
function FormComponent() {
  const { errors, validate, validateField } = useValidation(userSchema);

  const handleSubmit = (data: UserData) => {
    if (validate(data)) {
      console.log("Valid data:", data);
    } else {
      console.error("Validation errors:", errors);
    }
  };

  return <form>{/* form fields */}</form>;
}`}
        </CodeBlock>

        <InfoBox type="important">
          <p>
            Validation typing ensures type-safe validation functions. Use
            Validator&lt;T&gt; type for typed validators. Create validation schemas
            for structured validation. Support async validation for server-side
            checks. Use ValidationErrors type for error handling. Validation
            typing enables robust form validation with type safety.
          </p>
        </InfoBox>
      </Section>
    </div>
  );
}

