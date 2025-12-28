import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function RealWorldPatternsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Complex Real-World Patterns
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Real-world patterns for form builders, tables, modals, notifications,
        drag and drop, infinite scroll, multi-step forms, authentication,
        permissions, and internationalization.
      </p>

      <Section title="1. Form Builders, Tables, Modals">
        <p className="text-gray-700 dark:text-gray-300">
          Typing dynamic form systems, generic table components, and modal
          managers.
        </p>

        <CodeBlock title="Typed Form Builder">
          {`// Typed form field definition
type FieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox';

interface BaseField<T = unknown> {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  defaultValue?: T;
}

interface TextField extends BaseField<string> {
  type: 'text' | 'email';
  placeholder?: string;
  maxLength?: number;
}

interface SelectField<T = string> extends BaseField<T> {
  type: 'select';
  options: Array<{ value: T; label: string }>;
}

type FormField = TextField | SelectField | BaseField;

// Typed form builder
interface FormBuilderConfig {
  fields: FormField[];
  onSubmit: (data: Record<string, unknown>) => void;
}

function FormBuilder({ fields, onSubmit }: FormBuilderConfig) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(values);
    }}>
      {fields.map((field) => (
        <FormField key={field.name} field={field} value={values[field.name]} onChange={(v) => setValues(prev => ({ ...prev, [field.name]: v }))} />
      ))}
    </form>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Table Component">
          {`// Typed table column definition
interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
}

// Typed table component
interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  sortable?: boolean;
}

function Table<T extends Record<string, unknown>>({
  data,
  columns,
  onRowClick,
}: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} onClick={() => onRowClick?.(row)}>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render
                  ? col.render(row[col.key], row)
                  : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const columns: Column<User>[] = [
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    key: 'role',
    header: 'Role',
    render: (value) => <span className={\`role-\${value}\`}>{value}</span>,
  },
];

<Table<User> data={users} columns={columns} />`}
        </CodeBlock>

        <CodeBlock title="Typed Modal System">
          {`// Typed modal manager
type ModalId = string;

interface ModalState {
  id: ModalId;
  component: React.ComponentType<any>;
  props?: Record<string, unknown>;
  isOpen: boolean;
}

interface ModalManager {
  open: <P extends Record<string, unknown>>(
    id: ModalId,
    component: React.ComponentType<P>,
    props?: P
  ) => void;
  close: (id: ModalId) => void;
  isOpen: (id: ModalId) => boolean;
}

function useModalManager(): ModalManager {
  const [modals, setModals] = useState<ModalState[]>([]);
  
  const open = <P extends Record<string, unknown>>(
    id: ModalId,
    component: React.ComponentType<P>,
    props?: P
  ) => {
    setModals((prev) => [
      ...prev.filter((m) => m.id !== id),
      { id, component, props, isOpen: true },
    ]);
  };
  
  const close = (id: ModalId) => {
    setModals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isOpen: false } : m))
    );
  };
  
  const isOpen = (id: ModalId) => {
    return modals.some((m) => m.id === id && m.isOpen);
  };
  
  return { open, close, isOpen };
}

// Usage
interface UserModalProps {
  userId: string;
  onClose: () => void;
}

function UserModal({ userId, onClose }: UserModalProps) {
  return <div>User {userId}</div>;
}

const modalManager = useModalManager();
modalManager.open('user-modal', UserModal, { userId: '123', onClose: () => modalManager.close('user-modal') });`}
        </CodeBlock>
      </Section>

      <Section title="2. Authentication, Permissions, i18n">
        <p className="text-gray-700 dark:text-gray-300">
          Typing authentication flows, permission systems, and
          internationalization.
        </p>

        <CodeBlock title="Typed Authentication">
          {`// Typed auth state
type AuthState =
  | { status: 'loading' }
  | { status: 'authenticated'; user: User; token: string }
  | { status: 'unauthenticated'; error?: string };

interface AuthContextValue {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

// Typed permission system
type Permission = 'read' | 'write' | 'delete' | 'admin';
type Role = 'user' | 'moderator' | 'admin';

interface PermissionConfig {
  [role: Role]: Permission[];
}

const permissions: PermissionConfig = {
  user: ['read'],
  moderator: ['read', 'write'],
  admin: ['read', 'write', 'delete', 'admin'],
};

function hasPermission(userRole: Role, permission: Permission): boolean {
  return permissions[userRole]?.includes(permission) ?? false;
}

// Typed i18n
type Locale = 'en' | 'es' | 'fr' | 'de';
type TranslationKey = 'welcome' | 'goodbye' | 'error' | 'success';

interface Translations {
  [locale: Locale]: {
    [key in TranslationKey]: string;
  };
}

const translations: Translations = {
  en: {
    welcome: 'Welcome',
    goodbye: 'Goodbye',
    error: 'Error',
    success: 'Success',
  },
  es: {
    welcome: 'Bienvenido',
    goodbye: 'Adiós',
    error: 'Error',
    success: 'Éxito',
  },
  // ... other locales
};

function useTranslation(locale: Locale) {
  return (key: TranslationKey): string => {
    return translations[locale][key];
  };
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Form builders use discriminated unions for field types</li>
          <li>Tables are typed with generic row types</li>
          <li>Modal systems support typed component props</li>
          <li>Authentication uses discriminated unions for states</li>
          <li>Permission systems use mapped types</li>
          <li>i18n uses template literal types for keys</li>
        </ul>
      </InfoBox>
    </div>
  );
}

