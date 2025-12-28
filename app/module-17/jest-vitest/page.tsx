import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function JestVitestPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Jest & Vitest TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Jest and Vitest can be typed with TypeScript for type-safe test
        cases, mocks, and custom matchers.
      </p>

      <Section title="1. Typing Test Cases, Mocks, Custom Matchers">
        <p className="text-gray-700 dark:text-gray-300">
          Jest and Vitest test cases, mocks, and matchers can be typed for
          type-safe testing.
        </p>

        <CodeBlock title="Typed Test Cases">
          {`import { describe, test, expect } from '@jest/globals';

// Typed test function
function add(a: number, b: number): number {
  return a + b;
}

test('adds two numbers', () => {
  const result: number = add(2, 3);
  expect(result).toBe(5);
});

// Typed describe blocks
describe('UserService', () => {
  interface User {
    id: string;
    name: string;
  }
  
  test('creates user', async () => {
    const user: User = await createUser({ name: 'John' });
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John');
  });
});

// Typed test.each
test.each([
  [1, 2, 3],
  [2, 3, 5],
  [3, 4, 7],
])('adds %i and %i to get %i', (a: number, b: number, expected: number) => {
  expect(add(a, b)).toBe(expected);
});

// Typed mocks
interface ApiClient {
  fetch: (url: string) => Promise<unknown>;
}

const mockApiClient: jest.Mocked<ApiClient> = {
  fetch: jest.fn(),
};

test('uses mocked API', async () => {
  mockApiClient.fetch.mockResolvedValue({ data: 'test' });
  const result = await mockApiClient.fetch('/api/data');
  expect(result).toEqual({ data: 'test' });
});

// Typed custom matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidEmail(): R;
    }
  }
}

expect.extend({
  toBeValidEmail(received: string) {
    const pass = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(received);
    return {
      message: () => \`expected \${received} to be a valid email\`,
      pass,
    };
  },
});

test('validates email', () => {
  expect('test@example.com').toBeValidEmail();
  expect('invalid').not.toBeValidEmail();
});`}
        </CodeBlock>

        <CodeBlock title="Typed Vitest (Same Patterns)">
          {`import { describe, test, expect, vi } from 'vitest';

// Vitest uses same typing patterns as Jest
test('typed test', () => {
  const result: number = add(2, 3);
  expect(result).toBe(5);
});

// Typed mocks with vi
const mockFn = vi.fn<(a: number, b: number) => number>();
mockFn.mockReturnValue(5);

test('mocked function', () => {
  const result = mockFn(2, 3);
  expect(result).toBe(5);
  expect(mockFn).toHaveBeenCalledWith(2, 3);
});

// Typed spies
interface Service {
  method: (param: string) => Promise<string>;
}

const service: Service = {
  method: async (param: string) => \`result: \${param}\`,
};

const spy = vi.spyOn(service, 'method');
spy.mockResolvedValue('mocked result');

test('spied method', async () => {
  const result = await service.method('test');
  expect(result).toBe('mocked result');
  expect(spy).toHaveBeenCalledWith('test');
});`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Test cases are typed with function signatures</li>
          <li>Mocks are typed with jest.Mocked or vi.fn</li>
          <li>Custom matchers extend Jest/Vitest interfaces</li>
          <li>test.each supports typed parameters</li>
        </ul>
      </InfoBox>
    </div>
  );
}

