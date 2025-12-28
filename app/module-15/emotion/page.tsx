import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function EmotionPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Emotion TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Emotion provides TypeScript support for typing css prop and styled
        components.
      </p>

      <Section title="1. Typing CSS Prop">
        <p className="text-gray-700 dark:text-gray-300">
          The css prop can be typed for type-safe inline styles.
        </p>

        <CodeBlock title="Typed CSS Prop">
          {`import { css, CSSObject } from '@emotion/react';

// Typed css prop
function Component() {
  return (
    <div
      css={css\`
        color: blue;
        padding: 1rem;
      \`}
    >
      Styled with css prop
    </div>
  );
}

// Typed css with props
interface StyledProps {
  primary?: boolean;
  size?: 'small' | 'large';
}

function StyledComponent({ primary, size }: StyledProps) {
  return (
    <div
      css={css\`
        color: \${primary ? 'blue' : 'gray'};
        padding: \${size === 'large' ? '2rem' : '1rem'};
      \`}
    >
      Dynamic styles
    </div>
  );
}

// Typed CSS object
const styles: CSSObject = {
  color: 'blue',
  padding: '1rem',
  '&:hover': {
    color: 'red',
  },
};

function ObjectStyledComponent() {
  return <div css={styles}>Styled</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Styled Components with Emotion">
          {`import styled from '@emotion/styled';

// Typed styled component
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const Button = styled.button<ButtonProps>\`
  padding: \${props => {
    switch (props.size) {
      case 'small': return '0.25rem 0.5rem';
      case 'large': return '0.75rem 1.5rem';
      default: return '0.5rem 1rem';
    }
  }};
  background: \${props => props.variant === 'primary' ? 'blue' : 'gray'};
\`;`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>CSS prop is typed with css template literal</li>
          <li>CSSObject provides typed style objects</li>
          <li>Styled components work similarly to styled-components</li>
          <li>Props can be typed for dynamic styles</li>
        </ul>
      </InfoBox>
    </div>
  );
}

