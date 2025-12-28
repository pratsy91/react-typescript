import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TSConfigOptionsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        tsconfig.json Options
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript compiler options in tsconfig.json control how TypeScript
        compiles and type-checks your React code.
      </p>

      <Section title="1. All Compiler Options Explained">
        <p className="text-gray-700 dark:text-gray-300">
          Comprehensive guide to all TypeScript compiler options relevant
          for React development.
        </p>

        <CodeBlock title="Complete tsconfig.json for React">
          {`{
  "compilerOptions": {
    // Target and Module
    "target": "ES2020",              // JavaScript version to compile to
    "module": "ESNext",               // Module system (ESNext for modern bundlers)
    "lib": ["ES2020", "DOM", "DOM.Iterable"], // Type definitions to include
    
    // JSX Options
    "jsx": "react-jsx",               // Transform JSX (react-jsx for React 17+)
    "jsxFactory": "React.createElement", // Custom JSX factory (legacy)
    "jsxFragmentFactory": "React.Fragment", // Custom fragment factory
    "jsxImportSource": "react",       // JSX import source (for jsx: "react-jsx")
    
    // Module Resolution
    "moduleResolution": "bundler",   // How modules are resolved
    "baseUrl": ".",                   // Base directory for module resolution
    "paths": {                         // Path mapping
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"]
    },
    "resolveJsonModule": true,        // Allow importing JSON files
    "allowSyntheticDefaultImports": true, // Allow default imports from modules without default export
    "esModuleInterop": true,          // Enable ES module interop
    
    // Type Checking
    "strict": true,                    // Enable all strict type checking
    "strictNullChecks": true,          // Null and undefined are distinct types
    "strictFunctionTypes": true,       // Strict checking of function types
    "strictBindCallApply": true,      // Strict bind, call, apply
    "strictPropertyInitialization": true, // Strict property initialization
    "noImplicitAny": true,             // Error on implicit any
    "noImplicitThis": true,            // Error on implicit this
    "noImplicitReturns": true,        // Error on missing return
    "noUnusedLocals": true,            // Error on unused locals
    "noUnusedParameters": true,        // Error on unused parameters
    "noFallthroughCasesInSwitch": true, // Error on fallthrough cases
    "noUncheckedIndexedAccess": true,  // Require index access checks
    "noImplicitOverride": true,       // Require explicit override keyword
    
    // Emit
    "outDir": "./dist",                // Output directory
    "declaration": true,               // Generate .d.ts files
    "declarationMap": true,            // Generate source maps for declarations
    "sourceMap": true,                 // Generate source maps
    "inlineSourceMap": false,          // Inline source maps in JS
    "removeComments": true,            // Remove comments from output
    "emitDeclarationOnly": false,      // Only emit declaration files
    
    // Interop Constraints
    "isolatedModules": true,           // Ensure each file can be transpiled independently
    "allowJs": false,                  // Allow JavaScript files
    "checkJs": false,                  // Type check JavaScript files
    "skipLibCheck": true,              // Skip type checking of declaration files
    
    // Language and Environment
    "experimentalDecorators": true,    // Enable decorators
    "emitDecoratorMetadata": true,     // Emit decorator metadata
    "useDefineForClassFields": true,  // Use define for class fields
    
    // Completeness
    "skipDefaultLibCheck": true       // Skip type checking default library files
  },
  "include": ["src/**/*"],             // Files to include
  "exclude": ["node_modules", "dist"] // Files to exclude
}`}
        </CodeBlock>

        <CodeBlock title="JSX Options Explained">
          {`// jsx: "preserve" - Keep JSX in output (for Babel)
{
  "jsx": "preserve"
}

// jsx: "react" - Transform to React.createElement (React < 17)
{
  "jsx": "react",
  "jsxFactory": "React.createElement"
}

// jsx: "react-jsx" - Transform to new JSX transform (React 17+)
{
  "jsx": "react-jsx",
  "jsxImportSource": "react"
}

// jsx: "react-native" - Keep JSX for React Native
{
  "jsx": "react-native"
}

// Custom JSX factory
{
  "jsx": "react",
  "jsxFactory": "h",  // Use 'h' instead of React.createElement
  "jsxFragmentFactory": "Fragment"
}

// Custom JSX import source
{
  "jsx": "react-jsx",
  "jsxImportSource": "preact"  // Use Preact instead of React
}`}
        </CodeBlock>

        <CodeBlock title="Module Resolution Options">
          {`// moduleResolution: "node" - Node.js resolution (legacy)
{
  "moduleResolution": "node"
}

// moduleResolution: "bundler" - Modern bundler resolution
{
  "moduleResolution": "bundler",
  "module": "ESNext"
}

// moduleResolution: "classic" - Classic TypeScript resolution
{
  "moduleResolution": "classic"
}

// Path mapping with baseUrl
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/utils/*": ["./src/utils/*"]
  }
}

// Path mapping with multiple patterns
{
  "paths": {
    "*": ["./src/types/*", "./node_modules/@types/*"]
  }
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>target and module control JavaScript output</li>
          <li>jsx options control JSX transformation</li>
          <li>moduleResolution affects how imports are resolved</li>
          <li>strict options enable comprehensive type checking</li>
          <li>paths enable path aliasing for cleaner imports</li>
        </ul>
      </InfoBox>
    </div>
  );
}

