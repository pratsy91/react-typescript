import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function SelectFileInputsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Select/Option Types & File Inputs
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Select/option types enable typed dropdowns. File inputs enable typed
        file upload handlers. Understanding both patterns enables type-safe
        form handling.
      </p>

      <Section title="1. Select/Option Types">
        <p className="text-gray-700 dark:text-gray-300">
          Select/Option types enable typed dropdowns with options. Understanding
          select typing enables type-safe dropdown components.
        </p>

        <CodeBlock title="Select/Option Typing">
          {`// Basic select typing
function BasicSelect() {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="">Select...</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  );
}

// Typed select with string options
type OptionValue = "option1" | "option2" | "option3";

interface TypedSelectProps {
  value: OptionValue | "";
  onChange: (value: OptionValue) => void;
}

function TypedSelect({ value, onChange }: TypedSelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as OptionValue);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="">Select...</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  );
}

// Generic select with typed options
interface SelectOption<T extends string | number> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface GenericSelectProps<T extends string | number> {
  value: T | "";
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  placeholder?: string;
}

function GenericSelect<T extends string | number>({
  value,
  onChange,
  options,
  placeholder = "Select...",
}: GenericSelectProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option
          key={String(option.value)}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Usage
<GenericSelect<string>
  value={selectedValue}
  onChange={(v) => setSelectedValue(v)}
  options={[
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]}
/>

<GenericSelect<number>
  value={selectedNumber}
  onChange={(v) => setSelectedNumber(v)}
  options={[
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
  ]}
/>

// Select with object values
interface User {
  id: number;
  name: string;
}

interface ObjectSelectProps {
  value: User | null;
  onChange: (value: User) => void;
  options: User[];
}

function ObjectSelect({ value, onChange, options }: ObjectSelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(event.target.value);
    const selectedUser = options.find((user) => user.id === selectedId);
    if (selectedUser) {
      onChange(selectedUser);
    }
  };

  return (
    <select value={value?.id || ""} onChange={handleChange}>
      <option value="">Select user...</option>
      {options.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

// Multi-select typing
interface MultiSelectProps<T extends string | number> {
  value: T[];
  onChange: (value: T[]) => void;
  options: SelectOption<T>[];
}

function MultiSelect<T extends string | number>({
  value,
  onChange,
  options,
}: MultiSelectProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value as T
    );
    onChange(selectedOptions);
  };

  return (
    <select multiple value={value.map(String)} onChange={handleChange}>
      {options.map((option) => (
        <option key={String(option.value)} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Typed select option helper
function createSelectOption<T extends string | number>(
  value: T,
  label: string,
  disabled?: boolean
): SelectOption<T> {
  return { value, label, disabled };
}

// Usage
const options = [
  createSelectOption("option1", "Option 1"),
  createSelectOption("option2", "Option 2"),
];

// Select with groups
interface SelectGroup<T extends string | number> {
  label: string;
  options: SelectOption<T>[];
}

interface GroupedSelectProps<T extends string | number> {
  value: T | "";
  onChange: (value: T) => void;
  groups: SelectGroup<T>[];
}

function GroupedSelect<T extends string | number>({
  value,
  onChange,
  groups,
}: GroupedSelectProps<T>) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <select value={value} onChange={handleChange}>
      {groups.map((group, groupIndex) => (
        <optgroup key={groupIndex} label={group.label}>
          {group.options.map((option) => (
            <option key={String(option.value)} value={option.value}>
              {option.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

// Select with search/filter
interface SearchableSelectProps<T extends string | number> {
  value: T | "";
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  searchable?: boolean;
}

function SearchableSelect<T extends string | number>({
  value,
  onChange,
  options,
  searchable = false,
}: SearchableSelectProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as T);
  };

  return (
    <div>
      {searchable && (
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      )}
      <select value={value} onChange={handleChange}>
        {filteredOptions.map((option) => (
          <option key={String(option.value)} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Typed select hook
function useSelect<T extends string | number>(
  initialValue: T | "",
  options: SelectOption<T>[]
) {
  const [value, setValue] = React.useState<T | "">(initialValue);

  const handleChange = (newValue: T) => {
    setValue(newValue);
  };

  const reset = () => {
    setValue(initialValue);
  };

  const isValid = value !== "";

  return { value, onChange: handleChange, reset, isValid, options };
}`}
        </CodeBlock>

        <InfoBox type="info">
          <p>
            Select/Option types enable typed dropdowns. Use generic types for
            reusable select components. Support string, number, and object
            values. Handle multi-select with arrays. Type select options with
            SelectOption&lt;T&gt; interface. Select typing enables type-safe dropdown
            components.
          </p>
        </InfoBox>
      </Section>

      <Section title="2. File Inputs">
        <p className="text-gray-700 dark:text-gray-300">
          File inputs enable typed file upload handlers. Understanding file
          input typing enables type-safe file upload handling.
        </p>

        <CodeBlock title="File Input Typing">
          {`// Basic file input
function BasicFileInput() {
  const [file, setFile] = React.useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <input type="file" onChange={handleChange} />
  );
}

// Typed file input
interface FileInputProps {
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  multiple?: boolean;
}

function TypedFileInput({
  value,
  onChange,
  accept,
  multiple = false,
}: FileInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onChange(multiple ? files[0] : files[0]);
    } else {
      onChange(null);
    }
  };

  return (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={handleChange}
    />
  );
}

// Multiple file input
interface MultipleFileInputProps {
  value: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
}

function MultipleFileInput({
  value,
  onChange,
  accept,
  maxFiles,
}: MultipleFileInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const limitedFiles = maxFiles
        ? fileArray.slice(0, maxFiles)
        : fileArray;
      onChange(limitedFiles);
    }
  };

  return (
    <input
      type="file"
      accept={accept}
      multiple
      onChange={handleChange}
    />
  );
}

// File input with validation
interface ValidatedFileInputProps {
  onChange: (file: File | null, error: string | null) => void;
  accept?: string;
  maxSize?: number; // in bytes
  minSize?: number; // in bytes
}

function ValidatedFileInput({
  onChange,
  accept,
  maxSize,
  minSize,
}: ValidatedFileInputProps) {
  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return \`File size exceeds \${maxSize / 1024 / 1024}MB\`;
    }

    if (minSize && file.size < minSize) {
      return \`File size must be at least \${minSize / 1024}KB\`;
    }

    if (accept) {
      const acceptedTypes = accept.split(",").map((type) => type.trim());
      const fileType = file.type || \`.\${file.name.split(".").pop()}\`;
      
      const isValidType = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        return file.type === type || file.type.startsWith(type + "/");
      });

      if (!isValidType) {
        return \`File type not allowed. Accepted types: \${accept}\`;
      }
    }

    return null;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (file) {
      const error = validateFile(file);
      onChange(file, error);
    } else {
      onChange(null, null);
    }
  };

  return (
    <input
      type="file"
      accept={accept}
      onChange={handleChange}
    />
  );
}

// File input with preview
interface FileInputWithPreviewProps {
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: "image/*" | "video/*" | "audio/*";
}

function FileInputWithPreview({
  value,
  onChange,
  accept = "image/*",
}: FileInputWithPreviewProps) {
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (file) {
      onChange(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onChange(null);
      setPreview(null);
    }
  };

  return (
    <div>
      <input type="file" accept={accept} onChange={handleChange} />
      {preview && (
        <div>
          {accept === "image/*" && <img src={preview} alt="Preview" />}
          {accept === "video/*" && <video src={preview} controls />}
          {accept === "audio/*" && <audio src={preview} controls />}
        </div>
      )}
    </div>
  );
}

// File input with drag and drop
interface DragDropFileInputProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
}

function DragDropFileInput({
  onFiles,
  accept,
  multiple = false,
}: DragDropFileInputProps) {
  const [dragging, setDragging] = React.useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const files = Array.from(event.dataTransfer.files);
    const filteredFiles = accept
      ? files.filter((file) => {
          const acceptedTypes = accept.split(",").map((t) => t.trim());
          return acceptedTypes.some((type) =>
            file.type.includes(type.replace("*", ""))
          );
        })
      : files;

    onFiles(multiple ? filteredFiles : filteredFiles.slice(0, 1));
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFiles(Array.from(files));
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        border: dragging ? "2px dashed blue" : "2px dashed gray",
        padding: "20px",
      }}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
      />
      <p>Drag and drop files here</p>
    </div>
  );
}

// File upload with progress
interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  onProgress?: (progress: number) => void;
  accept?: string;
}

function FileUpload({ onUpload, onProgress, accept }: FileUploadProps) {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
      onProgress?.(progress);
    }, 200);

    try {
      await onUpload(file);
      setProgress(100);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      clearInterval(interval);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={uploading}
      />
      {uploading && <progress value={progress} max={100} />}
    </div>
  );
}

// Typed file input hook
function useFileInput(config?: {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
}) {
  const [file, setFile] = React.useState<File | null>(null);
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      setFile(null);
      setFiles([]);
      setError(null);
      return;
    }

    const fileArray = Array.from(selectedFiles);

    // Validate file size
    if (config?.maxSize) {
      const invalidFiles = fileArray.filter((f) => f.size > config.maxSize!);
      if (invalidFiles.length > 0) {
        setError(\`File size exceeds \${config.maxSize / 1024 / 1024}MB\`);
        return;
      }
    }

    setError(null);
    
    if (config?.multiple) {
      setFiles(fileArray);
      setFile(null);
    } else {
      setFile(fileArray[0]);
      setFiles([]);
    }
  };

  const reset = () => {
    setFile(null);
    setFiles([]);
    setError(null);
  };

  return {
    file,
    files,
    error,
    onChange: handleChange,
    reset,
  };
}`}
        </CodeBlock>

        <InfoBox type="important">
          File inputs enable typed file upload handling. Use File type for
          single files, File[] for multiple files. Validate file size and type.
          Support drag and drop with drag events. File input typing enables
          type-safe file upload handling.
        </InfoBox>
      </Section>
    </div>
  );
}

