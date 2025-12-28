import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function CSSModulesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        CSS Modules TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        CSS Modules can be typed with TypeScript declaration files for
        type-safe class name imports.
      </p>

      <Section title="1. Typing Module Imports">
        <p className="text-gray-700 dark:text-gray-300">
          CSS Module imports can be typed with declaration files.
        </p>

        <CodeBlock title="Typed CSS Module Imports">
          {`// styles.module.css
.button {
  background: blue;
  color: white;
}

.primary {
  background: #007bff;
}

// styles.module.css.d.ts
declare const styles: {
  readonly button: string;
  readonly primary: string;
};

export default styles;

// Component usage
import styles from './styles.module.css';

function Button() {
  return <button className={styles.button}>Click me</button>;
}

// Typed class name composition
import classNames from 'classnames';

function PrimaryButton({ disabled }: { disabled?: boolean }) {
  return (
    <button
      className={classNames(styles.button, styles.primary, {
        [styles.disabled]: disabled,
      })}
    >
      Primary Button
    </button>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed CSS Module with Variables">
          {`// styles.module.css
:root {
  --primary-color: #007bff;
  --spacing: 1rem;
}

.button {
  background: var(--primary-color);
  padding: var(--spacing);
}

// styles.module.css.d.ts
declare const styles: {
  readonly button: string;
  readonly [key: string]: string;
};

export default styles;

// Typed CSS Module with composition
// button.module.css
.button {
  composes: base from './base.module.css';
  background: blue;
}

// Typed import
import buttonStyles from './button.module.css';
import baseStyles from './base.module.css';

// buttonStyles.button includes baseStyles.base`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>CSS Modules are typed with .d.ts declaration files</li>
          <li>Class names are typed as readonly string properties</li>
          <li>Composition works with typed imports</li>
          <li>CSS variables can be used in typed modules</li>
        </ul>
      </InfoBox>
    </div>
  );
}

