"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Lesson {
  id: string;
  title: string;
  topics: string[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const modules: Module[] = [
  {
    id: "module-1",
    title: "Module 1: Core Type System",
    lessons: [
      {
        id: "primitive-types",
        title: "Primitive Types",
        topics: [
          "string",
          "number",
          "boolean",
          "null",
          "undefined",
          "symbol",
          "bigint",
        ],
      },
      {
        id: "special-types",
        title: "Special Types",
        topics: ["any", "unknown", "never", "void"],
      },
      {
        id: "literal-types",
        title: "Literal Types",
        topics: [
          "string literals",
          "numeric literals",
          "boolean literals",
          "template literal types",
        ],
      },
      {
        id: "type-annotations",
        title: "Type Annotations",
        topics: ["variables", "parameters", "return types"],
      },
      {
        id: "type-inference",
        title: "Type Inference",
        topics: ["implicit typing", "contextual typing"],
      },
      {
        id: "type-assertions",
        title: "Type Assertions",
        topics: ["as syntax", "angle bracket syntax", "const assertions"],
      },
      {
        id: "non-null-assertion",
        title: "Non-null Assertion Operator",
        topics: ["postfix !"],
      },
    ],
  },
  {
    id: "module-2",
    title: "Module 2: Complex Types",
    lessons: [
      {
        id: "arrays",
        title: "Arrays",
        topics: ["type[]", "Array<T>", "readonly arrays", "tuple types"],
      },
      {
        id: "tuples",
        title: "Tuples",
        topics: [
          "fixed-length",
          "optional elements",
          "rest elements",
          "labeled tuples",
        ],
      },
      {
        id: "objects",
        title: "Objects",
        topics: ["object type", "object literals", "index signatures"],
      },
      {
        id: "enums",
        title: "Enums",
        topics: ["numeric", "string", "const", "computed", "ambient"],
      },
      {
        id: "functions",
        title: "Functions",
        topics: ["function types", "optional", "default", "rest", "overloads"],
      },
      {
        id: "union-types",
        title: "Union Types",
        topics: ["type1 | type2", "discriminated unions", "narrowing"],
      },
      {
        id: "intersection-types",
        title: "Intersection Types",
        topics: ["type1 & type2", "combining types"],
      },
      {
        id: "type-guards",
        title: "Type Guards",
        topics: ["typeof", "instanceof", "in operator", "custom guards"],
      },
      {
        id: "type-narrowing",
        title: "Type Narrowing",
        topics: ["control flow", "truthiness", "equality narrowing"],
      },
    ],
  },
  {
    id: "module-3",
    title: "Module 3: Advanced Type Features",
    lessons: [
      {
        id: "interfaces",
        title: "Interfaces",
        topics: [
          "basic",
          "optional",
          "readonly",
          "index signatures",
          "extending",
          "merging",
        ],
      },
      {
        id: "type-aliases",
        title: "Type Aliases",
        topics: ["difference from interfaces", "when to use each"],
      },
      {
        id: "generics",
        title: "Generics",
        topics: [
          "functions",
          "interfaces",
          "classes",
          "constraints",
          "defaults",
          "inference",
        ],
      },
      {
        id: "keyof-operator",
        title: "Keyof Operator",
        topics: ["keyof typeof", "index access types"],
      },
      {
        id: "typeof-operator",
        title: "Typeof Operator",
        topics: ["type queries", "typeof guards"],
      },
      {
        id: "indexed-access-types",
        title: "Indexed Access Types",
        topics: ["T[K]", "nested property access"],
      },
      {
        id: "conditional-types",
        title: "Conditional Types",
        topics: ["T extends U", "infer keyword", "distributive"],
      },
      {
        id: "mapped-types",
        title: "Mapped Types",
        topics: ["{ [K in keyof T] }", "modifiers"],
      },
      {
        id: "template-literal-types",
        title: "Template Literal Types",
        topics: ["string manipulation", "pattern matching"],
      },
    ],
  },
  {
    id: "module-4",
    title: "Module 4: Utility Types",
    lessons: [
      {
        id: "property-modifiers",
        title: "Property Modifiers",
        topics: ["Partial<T>", "Required<T>", "Readonly<T>"],
      },
      {
        id: "object-manipulation",
        title: "Object Manipulation",
        topics: ["Record<K, T>", "Pick<T, K>", "Omit<T, K>"],
      },
      {
        id: "union-manipulation",
        title: "Union Manipulation",
        topics: ["Exclude<T, U>", "Extract<T, U>", "NonNullable<T>"],
      },
      {
        id: "function-utilities",
        title: "Function Utilities",
        topics: [
          "Parameters<T>",
          "ConstructorParameters<T>",
          "ReturnType<T>",
          "InstanceType<T>",
        ],
      },
      {
        id: "this-parameter-utilities",
        title: "This Parameter Utilities",
        topics: ["ThisParameterType<T>", "OmitThisParameter<T>", "ThisType<T>"],
      },
      {
        id: "string-manipulation",
        title: "String Manipulation",
        topics: [
          "Uppercase<T>",
          "Lowercase<T>",
          "Capitalize<T>",
          "Uncapitalize<T>",
        ],
      },
      {
        id: "promise-utilities",
        title: "Promise Utilities",
        topics: ["Awaited<T>"],
      },
    ],
  },
  {
    id: "module-5",
    title: "Module 5: Advanced Concepts",
    lessons: [
      {
        id: "declaration-merging",
        title: "Declaration Merging",
        topics: [
          "interface merging",
          "namespace merging",
          "module augmentation",
          "global augmentation",
        ],
      },
      {
        id: "namespaces-modules",
        title: "Namespaces & Modules",
        topics: [
          "namespaces",
          "ES modules",
          "ambient declarations",
          "triple-slash directives",
          "module resolution",
        ],
      },
      {
        id: "type-system-advanced",
        title: "Advanced Type System",
        topics: [
          "type compatibility",
          "type inference",
          "control flow analysis",
          "discriminated unions",
          "brand types",
        ],
      },
      {
        id: "classes-oop",
        title: "Classes & OOP",
        topics: [
          "abstract classes",
          "access modifiers",
          "parameter properties",
        ],
      },
      {
        id: "decorators-mixins",
        title: "Decorators & Mixins",
        topics: [
          "class decorators",
          "method decorators",
          "property decorators",
          "parameter decorators",
          "mixins",
        ],
      },
    ],
  },
  {
    id: "module-6",
    title: "Module 6: React Component Types",
    lessons: [
      {
        id: "function-components",
        title: "Function Components",
        topics: [
          "React.FC",
          "React.FunctionComponent",
          "VFC (deprecated)",
          "plain functions",
          "generics",
        ],
      },
      {
        id: "return-children-types",
        title: "Return & Children Types",
        topics: [
          "React.ReactElement",
          "React.ReactNode",
          "JSX.Element",
          "React.ReactPortal",
          "ReactChild (deprecated)",
        ],
      },
      {
        id: "ref-types",
        title: "Ref Types",
        topics: [
          "React.Ref",
          "React.RefObject",
          "React.MutableRefObject",
          "React.ForwardedRef",
          "React.LegacyRef",
        ],
      },
    ],
  },
  {
    id: "module-7",
    title: "Module 7: React Hooks TypeScript",
    lessons: [
      {
        id: "state-hooks",
        title: "State Management Hooks",
        topics: [
          "useState",
          "useReducer",
          "type inference",
          "generic typing",
          "discriminated unions",
        ],
      },
      {
        id: "effect-hooks",
        title: "Effect Hooks",
        topics: [
          "useEffect",
          "useLayoutEffect",
          "useInsertionEffect",
          "dependency arrays",
          "cleanup functions",
        ],
      },
      {
        id: "context-ref-hooks",
        title: "Context & Ref Hooks",
        topics: [
          "useContext",
          "useRef",
          "useImperativeHandle",
          "generic contexts",
          "ref typing",
        ],
      },
      {
        id: "memoization-hooks",
        title: "Memoization Hooks",
        topics: [
          "useCallback",
          "useMemo",
          "function inference",
          "return type inference",
          "dependency typing",
        ],
      },
      {
        id: "advanced-hooks",
        title: "Advanced Hooks",
        topics: [
          "useTransition",
          "useDeferredValue",
          "useSyncExternalStore",
          "useDebugValue",
          "useId",
        ],
      },
    ],
  },
  {
    id: "module-8",
    title: "Module 8: React Event Types",
    lessons: [
      {
        id: "mouse-keyboard-events",
        title: "Mouse & Keyboard Events",
        topics: [
          "React.MouseEvent",
          "React.KeyboardEvent",
          "MouseEventHandler",
          "KeyboardEventHandler",
          "event properties",
        ],
      },
      {
        id: "form-focus-events",
        title: "Form & Focus Events",
        topics: [
          "React.FormEvent",
          "React.ChangeEvent",
          "React.SubmitEvent",
          "React.FocusEvent",
          "FormEventHandler",
        ],
      },
      {
        id: "touch-pointer-ui-events",
        title: "Touch, Pointer & UI Events",
        topics: [
          "React.TouchEvent",
          "React.PointerEvent",
          "React.UIEvent",
          "React.WheelEvent",
          "TouchEventHandler",
        ],
      },
      {
        id: "animation-transition-events",
        title: "Animation & Transition Events",
        topics: [
          "React.AnimationEvent",
          "React.TransitionEvent",
          "AnimationEventHandler",
          "TransitionEventHandler",
          "lifecycle events",
        ],
      },
      {
        id: "clipboard-composition-drag-events",
        title: "Clipboard, Composition & Drag",
        topics: [
          "React.ClipboardEvent",
          "React.CompositionEvent",
          "React.DragEvent",
          "ClipboardEventHandler",
          "DragEventHandler",
        ],
      },
      {
        id: "generic-event-handlers",
        title: "Generic Event Handlers",
        topics: [
          "EventHandler types",
          "typing event.target",
          "event.currentTarget",
          "generic patterns",
          "event utilities",
        ],
      },
    ],
  },
  {
    id: "module-9",
    title: "Module 9: React DOM Types",
    lessons: [
      {
        id: "html-elements-attributes",
        title: "HTML Elements & Attributes",
        topics: [
          "HTML element types",
          "HTMLAttributes",
          "element-specific attributes",
          "ButtonHTMLAttributes",
          "InputHTMLAttributes",
        ],
      },
      {
        id: "svg-types",
        title: "SVG Types",
        topics: [
          "SVG element types",
          "React.SVGAttributes",
          "SVGProps",
          "SVG attributes",
          "SVG refs",
        ],
      },
      {
        id: "aria-accessibility",
        title: "ARIA & Accessibility",
        topics: [
          "React.AriaAttributes",
          "role types",
          "aria-* props",
          "accessibility patterns",
          "semantic HTML",
        ],
      },
      {
        id: "data-attributes-custom-props",
        title: "Data Attributes & Custom Props",
        topics: [
          "data-* attributes",
          "camelCase conversion",
          "custom props",
          "extending attributes",
          "polymorphic components",
        ],
      },
      {
        id: "style-classname-props",
        title: "Style & ClassName Props",
        topics: [
          "React.CSSProperties",
          "className typing",
          "conditional classes",
          "CSS-in-JS",
          "style merging",
        ],
      },
      {
        id: "key-ref-props",
        title: "Key & Ref Props",
        topics: [
          "React.Key type",
          "ref typing",
          "forwardRef",
          "useImperativeHandle",
          "ref extraction",
        ],
      },
    ],
  },
  {
    id: "module-10",
    title: "Module 10: Advanced React Patterns",
    lessons: [
      {
        id: "hoc-render-props",
        title: "HOCs & Render Props",
        topics: [
          "Higher-Order Components",
          "HOC typing",
          "prop inference",
          "injected props",
          "render props",
        ],
      },
      {
        id: "compound-context-patterns",
        title: "Compound Components & Context",
        topics: [
          "compound components",
          "context patterns",
          "provider/consumer typing",
          "default values",
          "optional context",
        ],
      },
      {
        id: "controlled-uncontrolled",
        title: "Controlled vs Uncontrolled",
        topics: [
          "controlled components",
          "uncontrolled components",
          "typing both patterns",
          "form handling",
          "ref access",
        ],
      },
      {
        id: "polymorphic-forwardref",
        title: "Polymorphic & Forward Ref",
        topics: [
          "polymorphic components",
          "as prop pattern",
          "React.forwardRef",
          "generic forward refs",
          "useImperativeHandle",
        ],
      },
      {
        id: "lazy-error-boundaries",
        title: "Lazy Loading & Error Boundaries",
        topics: [
          "React.lazy",
          "Suspense boundaries",
          "error boundaries",
          "class components",
          "error handling",
        ],
      },
      {
        id: "portals-custom-hooks",
        title: "Portals, Custom Hooks & Factories",
        topics: [
          "ReactDOM.createPortal",
          "custom hooks",
          "return type inference",
          "hook factories",
          "typed hook generators",
        ],
      },
    ],
  },
  {
    id: "module-11",
    title: "Module 11: React Component Props Patterns",
    lessons: [
      {
        id: "optional-default-props",
        title: "Optional & Default Props",
        topics: [
          "optional props with ?",
          "default parameters",
          "defaultProps (deprecated)",
          "Partial utility type",
          "default values",
        ],
      },
      {
        id: "spread-discriminated-props",
        title: "Spread & Discriminated Props",
        topics: [
          "spread props",
          "rest props typing",
          "extending HTML attributes",
          "discriminated props",
          "union props with variants",
        ],
      },
      {
        id: "function-children-props",
        title: "Function & Children Props",
        topics: [
          "function props",
          "callback typing",
          "event handler props",
          "children props",
          "children patterns",
        ],
      },
      {
        id: "render-slot-props",
        title: "Render Function & Slot Props",
        topics: [
          "render function props",
          "typing functions returning JSX",
          "slot props",
          "typing component slots",
          "render props patterns",
        ],
      },
      {
        id: "polymorphic-generic-props",
        title: "Polymorphic & Generic Props",
        topics: [
          "polymorphic props",
          "generic component props",
          "strict props",
          "exact props typing",
          "props with generics",
        ],
      },
    ],
  },
  {
    id: "module-12",
    title: "Module 12: Form Handling with TypeScript",
    lessons: [
      {
        id: "form-submission-inputs",
        title: "Form Submission & Input Changes",
        topics: [
          "form submission typing",
          "submit handlers",
          "input change handlers",
          "text inputs",
          "number inputs",
          "textarea inputs",
        ],
      },
      {
        id: "form-data-validation",
        title: "Form Data & Validation",
        topics: [
          "FormData typing",
          "typed form data extraction",
          "validation functions",
          "error types",
          "validation schemas",
          "async validation",
        ],
      },
      {
        id: "form-libraries",
        title: "Form Libraries Integration",
        topics: [
          "React Hook Form typing",
          "Formik typing",
          "SubmitHandler types",
          "validation schemas",
          "nested forms",
          "array fields",
        ],
      },
      {
        id: "select-file-inputs",
        title: "Select/Option & File Inputs",
        topics: [
          "select typing",
          "option types",
          "dropdowns",
          "file inputs",
          "file upload handlers",
          "drag and drop",
        ],
      },
      {
        id: "checkbox-radio-types",
        title: "Checkbox & Radio Types",
        topics: [
          "checkbox typing",
          "boolean inputs",
          "radio typing",
          "value-based inputs",
          "multiple checkboxes",
          "radio groups",
        ],
      },
    ],
  },
  {
    id: "module-13",
    title: "Module 13: State Management",
    lessons: [
      {
        id: "redux-toolkit",
        title: "Redux Toolkit",
        topics: [
          "typed slices",
          "typed hooks",
          "typed thunks",
          "typed middleware",
        ],
      },
      {
        id: "zustand",
        title: "Zustand",
        topics: ["typing stores", "typing selectors", "typing actions"],
      },
      {
        id: "jotai",
        title: "Jotai",
        topics: ["typing atoms", "typing atom families"],
      },
      {
        id: "recoil",
        title: "Recoil",
        topics: ["typing atoms", "typing selectors"],
      },
      {
        id: "mobx",
        title: "MobX",
        topics: ["typing observables", "typing computed values"],
      },
      {
        id: "context-api",
        title: "Context API",
        topics: ["advanced context typing patterns"],
      },
      {
        id: "tanstack-query",
        title: "TanStack Query",
        topics: ["typing queries", "typing mutations", "typing query keys"],
      },
    ],
  },
  {
    id: "module-14",
    title: "Module 14: Routing",
    lessons: [
      {
        id: "react-router-v6",
        title: "React Router v6",
        topics: [
          "typing route params",
          "typing location state",
          "typing navigation",
        ],
      },
      {
        id: "tanstack-router",
        title: "TanStack Router",
        topics: ["typing route definitions", "typing search params"],
      },
      {
        id: "route-components",
        title: "Typing Route Components",
        topics: ["typed route props"],
      },
      {
        id: "protected-routes",
        title: "Typing Protected Routes",
        topics: ["auth guards with types"],
      },
      {
        id: "dynamic-routes",
        title: "Typing Dynamic Routes",
        topics: ["parameter extraction"],
      },
    ],
  },
  {
    id: "module-15",
    title: "Module 15: Styling Solutions",
    lessons: [
      {
        id: "styled-components",
        title: "Styled Components",
        topics: ["typing styled components", "typing theme"],
      },
      {
        id: "emotion",
        title: "Emotion",
        topics: ["typing css prop", "typing styled components"],
      },
      {
        id: "css-modules",
        title: "CSS Modules",
        topics: ["typing module imports"],
      },
      {
        id: "tailwind-css",
        title: "Tailwind CSS",
        topics: ["className typing with autocomplete"],
      },
      {
        id: "css-in-js",
        title: "CSS-in-JS",
        topics: ["typing style objects"],
      },
      {
        id: "theme-provider",
        title: "Theme Provider",
        topics: ["typing theme objects"],
      },
    ],
  },
  {
    id: "module-16",
    title: "Module 16: Data Fetching & API",
    lessons: [
      {
        id: "fetch-api",
        title: "Fetch API",
        topics: ["typing fetch requests and responses"],
      },
      {
        id: "axios",
        title: "Axios",
        topics: ["typing requests", "responses", "interceptors"],
      },
      {
        id: "tanstack-query",
        title: "TanStack Query",
        topics: ["comprehensive typing"],
      },
      {
        id: "swr",
        title: "SWR",
        topics: ["typing data", "error", "mutate"],
      },
      {
        id: "graphql",
        title: "GraphQL",
        topics: ["typing queries with Codegen", "typing mutations"],
      },
      {
        id: "rest-api",
        title: "REST API",
        topics: ["typing endpoints", "request/response types"],
      },
      {
        id: "websockets",
        title: "WebSockets",
        topics: ["typing socket events and messages"],
      },
    ],
  },
  {
    id: "module-17",
    title: "Module 17: Testing",
    lessons: [
      {
        id: "react-testing-library",
        title: "React Testing Library",
        topics: [
          "typing queries",
          "typing user events",
          "typing custom render",
        ],
      },
      {
        id: "jest-vitest",
        title: "Jest & Vitest",
        topics: [
          "typing test cases",
          "typing mocks",
          "typing custom matchers",
        ],
      },
      {
        id: "testing-patterns",
        title: "Testing Patterns",
        topics: [
          "testing component props",
          "testing hooks",
          "testing context",
          "testing async components",
          "mocking",
        ],
      },
    ],
  },
  {
    id: "module-18",
    title: "Module 18: Performance Optimization Types",
    lessons: [
      {
        id: "react-memo",
        title: "React.memo",
        topics: [
          "typing memoized components",
          "custom comparison",
        ],
      },
      {
        id: "usememo-usecallback",
        title: "useMemo & useCallback",
        topics: ["typing memoized values", "typing memoized callbacks"],
      },
      {
        id: "code-splitting",
        title: "Code Splitting",
        topics: ["typing lazy imports"],
      },
      {
        id: "virtual-lists",
        title: "Virtual Lists",
        topics: ["typing virtualized components"],
      },
    ],
  },
  {
    id: "module-19",
    title: "Module 19: TypeScript Configuration for React",
    lessons: [
      {
        id: "tsconfig-options",
        title: "tsconfig.json Options",
        topics: [
          "all compiler options explained",
          "JSX options",
          "module resolution",
          "source map options",
          "type checking options",
        ],
      },
      {
        id: "strict-mode",
        title: "Strict Mode Options",
        topics: [
          "strict",
          "strictNullChecks",
          "noImplicitAny",
          "declaration options",
        ],
      },
      {
        id: "project-references",
        title: "Project References",
        topics: ["monorepo setup"],
      },
    ],
  },
  {
    id: "module-20",
    title: "Module 20: Type Safety Best Practices",
    lessons: [
      {
        id: "type-safety-patterns",
        title: "Type Safety Patterns",
        topics: [
          "avoiding type assertions",
          "exhaustive type checking",
          "branded types",
          "type predicates",
          "const assertions",
          "satisfies operator",
          "template literal types",
          "recursive types",
          "conditional type patterns",
          "variadic tuple types",
        ],
      },
    ],
  },
  {
    id: "module-21",
    title: "Module 21: Complex Real-World Patterns",
    lessons: [
      {
        id: "real-world-patterns",
        title: "Real-World Patterns",
        topics: [
          "form builders",
          "table components",
          "modal systems",
          "notification systems",
          "drag and drop",
          "infinite scroll",
          "multi-step forms",
          "authentication flows",
          "permission systems",
          "internationalization",
        ],
      },
    ],
  },
  {
    id: "module-22",
    title: "Module 22: Type Utilities & Helpers",
    lessons: [
      {
        id: "type-utilities",
        title: "Type Utilities",
        topics: [
          "creating custom utility types",
          "type inference helpers",
          "validation types",
          "builder pattern types",
          "chain types",
          "type-safe event emitters",
          "type-safe redux",
          "type-safe routing",
        ],
      },
    ],
  },
  {
    id: "module-23",
    title: "Module 23: Edge Cases & Gotchas",
    lessons: [
      {
        id: "edge-cases",
        title: "Edge Cases & Gotchas",
        topics: [
          "event handler return types",
          "ref forwarding issues",
          "generic component issues",
          "type widening issues",
          "circular dependencies",
          "module augmentation conflicts",
          "library type definitions",
          "performance of complex types",
        ],
      },
    ],
  },
  {
    id: "module-24",
    title: "Module 24: Next.js Types",
    lessons: [
      {
        id: "app-router-types",
        title: "App Router Types",
        topics: [
          "server component types",
          "client component types",
          "metadata types",
          "route handler types",
        ],
      },
      {
        id: "nextjs-components",
        title: "Next.js Component Types",
        topics: ["Link types", "Image types", "Script types"],
      },
      {
        id: "nextjs-utilities",
        title: "Next.js Utility Types",
        topics: [
          "middleware types",
          "redirect types",
          "navigation types",
          "server actions",
        ],
      },
      {
        id: "legacy-pages-router",
        title: "Pages Router Types (Legacy)",
        topics: [
          "GetServerSideProps",
          "GetStaticProps",
          "GetStaticPaths",
          "NextPage types",
        ],
      },
    ],
  },
  {
    id: "module-25",
    title: "Module 25: Interview Cheatsheet",
    lessons: [
      {
        id: "typescript-fundamentals-cheatsheet",
        title: "TypeScript Fundamentals Cheatsheet",
        topics: [
          "core type system",
          "union intersection literal types",
          "generics",
          "type inference",
          "advanced type patterns",
        ],
      },
      {
        id: "react-typescript-patterns",
        title: "React + TypeScript Patterns",
        topics: [
          "component typing patterns",
          "hooks typing",
          "event handlers",
          "HOC and render props",
          "context and custom hooks",
        ],
      },
      {
        id: "common-interview-questions",
        title: "Common Interview Questions",
        topics: [
          "implement utility types",
          "deep readonly",
          "type-safe event emitter",
          "generic table component",
          "type-safe form hook",
          "polymorphic component",
        ],
      },
      {
        id: "common-pitfalls-solutions",
        title: "Common Pitfalls & Solutions",
        topics: [
          "type assertion pitfalls",
          "event handler return types",
          "ref forwarding issues",
          "generic component constraints",
          "type widening issues",
          "performance considerations",
        ],
      },
      {
        id: "quick-reference",
        title: "Quick Reference",
        topics: [
          "utility types cheatsheet",
          "React type patterns",
          "common type patterns",
          "interview checklist",
        ],
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="p-6">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            TypeScript for React
          </h1>
        </Link>

        <nav className="space-y-6">
          {modules.map((module) => (
            <div key={module.id}>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                {module.title}
              </h2>
              <ul className="space-y-2">
                {module.lessons.map((lesson) => {
                  const lessonPath = `/${module.id}/${lesson.id}`;
                  const isActive = pathname === lessonPath;

                  return (
                    <li key={lesson.id}>
                      <Link
                        href={lessonPath}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                        }`}
                      >
                        {lesson.title}
                      </Link>
                      {isActive && lesson.topics.length > 0 && (
                        <ul className="mt-2 ml-3 space-y-1 border-l-2 border-blue-200 dark:border-blue-800 pl-3">
                          {lesson.topics.map((topic, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-gray-600 dark:text-gray-400"
                            >
                              {topic}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
