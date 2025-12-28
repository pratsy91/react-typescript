import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function FormLibrariesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Form Libraries Integration
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Form libraries like React Hook Form and Formik provide powerful form
        handling with TypeScript support. Understanding their typing enables
        type-safe form libraries integration.
      </p>

      <Section title="1. React Hook Form Typing">
        <p className="text-gray-700 dark:text-gray-300">
          React Hook Form provides performant form handling with TypeScript
          support. Understanding React Hook Form typing enables type-safe form
          handling.
        </p>

        <CodeBlock title="React Hook Form Typing">
          {`// Basic React Hook Form usage
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  email: string;
  age: number;
}

function ReactHookFormComponent() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="number"
        {...register("age", {
          required: "Age is required",
          min: { value: 18, message: "Must be 18+" },
          valueAsNumber: true,
        })}
      />
      {errors.age && <span>{errors.age.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}

// Typed form validation
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "Must be 18+"),
});

type FormDataFromSchema = z.infer<typeof formSchema>;

function TypedReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataFromSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormDataFromSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

// React Hook Form with nested objects
interface NestedFormData {
  user: {
    name: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
}

function NestedReactHookForm() {
  const { register, handleSubmit } = useForm<NestedFormData>();

  const onSubmit: SubmitHandler<NestedFormData> = (data) => {
    console.log(data.user.name);
    console.log(data.address.city);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("user.name")} />
      <input {...register("user.email")} />
      <input {...register("address.street")} />
      <input {...register("address.city")} />
      <input {...register("address.zipCode")} />
      <button type="submit">Submit</button>
    </form>
  );
}

// React Hook Form with arrays
interface ArrayFormData {
  items: Array<{ name: string; quantity: number }>;
}

function ArrayReactHookForm() {
  const { register, handleSubmit, watch } = useForm<ArrayFormData>({
    defaultValues: {
      items: [{ name: "", quantity: 0 }],
    },
  });

  const items = watch("items");

  const onSubmit: SubmitHandler<ArrayFormData> = (data) => {
    console.log(data.items);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {items.map((item, index) => (
        <div key={index}>
          <input {...register(\`items.\${index}.name\`)} />
          <input {...register(\`items.\${index}.quantity\`, { valueAsNumber: true })} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

// React Hook Form with Controller
import { Controller } from "react-hook-form";

function ControllerReactHookForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field, fieldState }) => (
          <div>
            <input {...field} />
            {fieldState.error && <span>{fieldState.error.message}</span>}
          </div>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// React Hook Form with useWatch
import { useWatch } from "react-hook-form";

function WatchReactHookForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const name = useWatch({ control, name: "name" });

  return (
    <form>
      <input {...register("name")} />
      <p>Current name: {name}</p>
    </form>
  );
}

// React Hook Form with async validation
function AsyncValidationReactHookForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    async validate: async (values) => {
      // Async validation
      const emailExists = await checkEmailExists(values.email);
      if (emailExists) {
        return { email: "Email already exists" };
      }
      return true;
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}`}
        </CodeBlock>

        <InfoBox type="info">
          <p>
            React Hook Form provides excellent TypeScript support. Use
            SubmitHandler&lt;T&gt; for typed submit handlers. Use zodResolver with
            Zod schemas for type-safe validation. Support nested objects and
            arrays. React Hook Form typing enables performant, type-safe forms.
          </p>
        </InfoBox>
      </Section>

      <Section title="2. Formik Typing">
        <p className="text-gray-700 dark:text-gray-300">
          Formik provides form state management with TypeScript support.
          Understanding Formik typing enables type-safe form handling.
        </p>

        <CodeBlock title="Formik Typing">
          {`// Basic Formik usage
import { useFormik } from "formik";

interface FormValues {
  name: string;
  email: string;
  age: number;
}

function FormikComponent() {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      age: 0,
    },
    validate: (values) => {
      const errors: Partial<Record<keyof FormValues, string>> = {};

      if (!values.name) {
        errors.name = "Name is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.age || values.age < 18) {
        errors.age = "Must be 18+";
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name && (
        <span>{formik.errors.name}</span>
      )}

      <input
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && (
        <span>{formik.errors.email}</span>
      )}

      <input
        name="age"
        type="number"
        value={formik.values.age}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.age && formik.errors.age && (
        <span>{formik.errors.age}</span>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

// Formik with Yup validation
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number().min(18, "Must be 18+").required("Age is required"),
});

function FormikWithYup() {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      age: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input {...formik.getFieldProps("name")} />
      {formik.touched.name && formik.errors.name && (
        <span>{formik.errors.name}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

// Formik with Field component
import { Field, Form, Formik } from "formik";

function FormikFieldComponent() {
  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <Field name="name" />
        <ErrorMessage name="name" component="div" />

        <Field name="email" type="email" />
        <ErrorMessage name="email" component="div" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

// Formik with custom Field
function CustomFieldComponent() {
  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <form>
          <Field name="name">
            {({ field, meta }: any) => (
              <div>
                <input {...field} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
        </form>
      )}
    </Formik>
  );
}

// Formik with nested objects
interface NestedFormValues {
  user: {
    name: string;
    email: string;
  };
}

function NestedFormik() {
  const formik = useFormik<NestedFormValues>({
    initialValues: {
      user: {
        name: "",
        email: "",
      },
    },
    onSubmit: (values) => {
      console.log(values.user.name);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="user.name"
        value={formik.values.user.name}
        onChange={formik.handleChange}
      />
    </form>
  );
}

// Formik with arrays
interface ArrayFormValues {
  items: Array<{ name: string; quantity: number }>;
}

function ArrayFormik() {
  const formik = useFormik<ArrayFormValues>({
    initialValues: {
      items: [{ name: "", quantity: 0 }],
    },
    onSubmit: (values) => {
      console.log(values.items);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.items.map((item, index) => (
        <div key={index}>
          <input
            name={\`items.\${index}.name\`}
            value={item.name}
            onChange={formik.handleChange}
          />
        </div>
      ))}
    </form>
  );
}

// Type-safe Formik helper
type FormikHelpers<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldError: <K extends keyof T>(field: K, error: string) => void;
};

function useTypedFormik<T extends Record<string, any>>(
  config: {
    initialValues: T;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit: (values: T) => void | Promise<void>;
  }
): FormikHelpers<T> {
  return useFormik<T>(config);
}`}
        </CodeBlock>

        <InfoBox type="important">
          <p>
            Formik provides form state management with TypeScript support. Use
            useFormik&lt;T&gt; for typed form handling. Use Yup schemas for type-safe
            validation. Support nested objects and arrays. Formik typing enables
            type-safe form state management.
          </p>
        </InfoBox>
      </Section>
    </div>
  );
}

