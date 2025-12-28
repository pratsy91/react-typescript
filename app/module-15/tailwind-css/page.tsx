import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TailwindCSSPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Tailwind CSS TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Tailwind CSS className can be typed with autocomplete support for
        type-safe utility classes.
      </p>

      <Section title="1. ClassName Typing with Autocomplete">
        <p className="text-gray-700 dark:text-gray-300">
          Tailwind CSS classes can be typed for autocomplete and validation.
        </p>

        <CodeBlock title="Typed Tailwind Classes">
          {`// Typed className prop
interface ButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

function Button({ className, variant }: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-medium';
  const variantClasses = variant === 'primary' 
    ? 'bg-blue-500 text-white' 
    : 'bg-gray-500 text-white';
  
  return (
    <button className={\`\${baseClasses} \${variantClasses} \${className || ''}\`}>
      Button
    </button>
  );
}

// Typed class name builder
type TailwindClass = string;

function cn(...classes: (TailwindClass | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Usage
function Component() {
  const isActive = true;
  return (
    <div className={cn(
      'p-4',
      'bg-white',
      isActive && 'border-blue-500',
      'rounded-lg'
    )}>
      Content
    </div>
  );
}

// Typed conditional classes
interface CardProps {
  elevated?: boolean;
  outlined?: boolean;
}

function Card({ elevated, outlined }: CardProps) {
  return (
    <div className={cn(
      'p-4 rounded-lg',
      elevated && 'shadow-lg',
      outlined && 'border border-gray-300'
    )}>
      Card content
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Tailwind Config">
          {`// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff',
          light: '#0056b3',
          dark: '#004085',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};

export default config;

// Typed theme access
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from './tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

// fullConfig.theme.colors.primary is typed`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Tailwind classes are typed as strings</li>
          <li>Class name builders enable type-safe composition</li>
          <li>Conditional classes work with typed props</li>
          <li>Tailwind config can be fully typed</li>
        </ul>
      </InfoBox>
    </div>
  );
}

