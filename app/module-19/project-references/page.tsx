import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ProjectReferencesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Project References
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript project references enable monorepo setups with proper
        type checking across multiple projects.
      </p>

      <Section title="1. Monorepo Setup">
        <p className="text-gray-700 dark:text-gray-300">
          Project references allow TypeScript to understand dependencies
          between multiple projects in a monorepo.
        </p>

        <CodeBlock title="Typed Project References">
          {`// Root tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./packages/shared" },
    { "path": "./packages/ui" },
    { "path": "./apps/web" },
    { "path": "./apps/mobile" }
  ]
}

// packages/shared/tsconfig.json
{
  "compilerOptions": {
    "composite": true,        // Enable project references
    "declaration": true,      // Required for references
    "declarationMap": true,   // Source maps for declarations
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}

// packages/ui/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "references": [
    { "path": "../shared" }  // Depends on shared package
  ],
  "include": ["src/**/*"]
}

// apps/web/tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "jsx": "react-jsx"
  },
  "references": [
    { "path": "../../packages/shared" },
    { "path": "../../packages/ui" }
  ],
  "include": ["src/**/*"]
}

// Usage in code
// packages/ui/src/Button.tsx
import { ButtonProps } from '@shared/types';  // Typed import from shared

export function Button(props: ButtonProps) {
  return <button {...props} />;
}

// apps/web/src/App.tsx
import { Button } from '@ui/components';  // Typed import from ui package
import { User } from '@shared/types';     // Typed import from shared

function App() {
  const user: User = { id: '1', name: 'John' };
  return <Button label="Click" />;
}`}
        </CodeBlock>

        <CodeBlock title="Building with Project References">
          {`// Build all projects
tsc --build

// Build specific project
tsc --build packages/shared

// Build with force (rebuild all)
tsc --build --force

// Clean build outputs
tsc --build --clean

// Watch mode
tsc --build --watch

// Incremental builds (faster)
tsc --build --incremental

// Example package.json scripts
{
  "scripts": {
    "build": "tsc --build",
    "build:shared": "tsc --build packages/shared",
    "build:ui": "tsc --build packages/ui",
    "build:web": "tsc --build apps/web",
    "build:watch": "tsc --build --watch",
    "clean": "tsc --build --clean"
  }
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>composite enables project references</li>
          <li>declaration is required for referenced projects</li>
          <li>references define project dependencies</li>
          <li>tsc --build builds projects in dependency order</li>
          <li>Project references enable type-safe monorepos</li>
        </ul>
      </InfoBox>
    </div>
  );
}

