import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function StrictModePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Strict Mode Options
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TypeScript strict mode options enable comprehensive type checking
        for safer React code.
      </p>

      <Section title="1. All Strict Mode Options">
        <p className="text-gray-700 dark:text-gray-300">
          Understanding all strict mode options and their impact on React
          development.
        </p>

        <CodeBlock title="Strict Mode Options Explained">
          {`{
  "compilerOptions": {
    // Master strict flag (enables all strict checks)
    "strict": true,
    
    // Individual strict options (automatically enabled by "strict": true)
    
    // strictNullChecks: true
    // Makes null and undefined distinct types
    let value: string | null = null;  // OK
    let value2: string = null;        // Error: Type 'null' is not assignable
    
    // strictFunctionTypes: true
    // Strict checking of function types (bivariant vs contravariant)
    type Handler = (event: Event) => void;
    const onClick: Handler = (e: MouseEvent) => {};  // Error if strict
    
    // strictBindCallApply: true
    // Strict checking of bind, call, apply
    function fn(x: number, y: number) { return x + y; }
    fn.call(null, 1);  // Error: Expected 2 arguments, got 1
    
    // strictPropertyInitialization: true
    // Properties must be initialized or have definite assignment
    class User {
      name: string;  // Error: Property 'name' has no initializer
      age?: number;  // OK: Optional property
      email!: string; // OK: Definite assignment assertion
    }
    
    // noImplicitAny: true
    // Error on implicit any types
    function fn(param) {  // Error: Parameter 'param' implicitly has 'any' type
      return param;
    }
    
    // noImplicitThis: true
    // Error on implicit this with any type
    class MyClass {
      method() {
        function callback() {
          this.value;  // Error: 'this' implicitly has type 'any'
        }
      }
    }
    
    // noImplicitReturns: true
    // Error on functions that don't return on all code paths
    function fn(x: number): number {
      if (x > 0) {
        return x;  // Error: Not all code paths return a value
      }
    }
    
    // noUnusedLocals: true
    // Error on unused local variables
    function fn() {
      const unused = 5;  // Error: 'unused' is declared but never used
      return 10;
    }
    
    // noUnusedParameters: true
    // Error on unused function parameters
    function fn(x: number, y: number) {  // Error: 'y' is declared but never used
      return x;
    }
    
    // noFallthroughCasesInSwitch: true
    // Error on fallthrough cases in switch
    switch (x) {
      case 1:
        console.log('one');
        // Error: Fallthrough case in switch
      case 2:
        console.log('two');
        break;
    }
    
    // noUncheckedIndexedAccess: true
    // Require index access checks
    const arr: string[] = ['a', 'b'];
    const value = arr[0];  // Type: string | undefined (not just string)
    
    // noImplicitOverride: true
    // Require explicit override keyword
    class Base {
      method() {}
    }
    class Derived extends Base {
      method() {}  // Error: This member must have an 'override' modifier
    }
  }
}`}
        </CodeBlock>

        <CodeBlock title="Strict Mode Best Practices for React">
          {`// Enable strict mode for React projects
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,  // Critical for React props
    "strictFunctionTypes": true,  // Important for event handlers
    "strictPropertyInitialization": true,  // Important for class components
    "noImplicitAny": true,  // Prevents accidental any types
    "noUnusedLocals": true,  // Clean code
    "noUnusedParameters": true,  // Clean code
    "noUncheckedIndexedAccess": true  // Safer array/object access
  }
}

// Example: strictNullChecks with React props
interface ButtonProps {
  label: string;
  onClick?: () => void;  // Optional, so type is () => void | undefined
}

function Button({ label, onClick }: ButtonProps) {
  // Must check before calling
  const handleClick = () => {
    if (onClick) {  // Type guard
      onClick();  // Now TypeScript knows onClick is defined
    }
  };
  
  return <button onClick={handleClick}>{label}</button>;
}

// Example: strictPropertyInitialization with class components
class Counter extends React.Component<{}, { count: number }> {
  state = { count: 0 };  // Must initialize or use !
  
  render() {
    return <div>{this.state.count}</div>;
  }
}

// Example: noUncheckedIndexedAccess with arrays
function List({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, index) => {
        const value = items[index];  // Type: string | undefined
        if (value) {  // Type guard needed
          return <li key={index}>{value}</li>;
        }
        return null;
      })}
    </ul>
  );
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>strict enables all strict type checking options</li>
          <li>strictNullChecks is critical for React prop handling</li>
          <li>strictPropertyInitialization ensures class properties are initialized</li>
          <li>noUncheckedIndexedAccess makes array access safer</li>
          <li>Individual options can be enabled/disabled as needed</li>
        </ul>
      </InfoBox>
    </div>
  );
}

