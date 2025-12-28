import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function SWRPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        SWR TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        SWR can be typed with TypeScript for type-safe data fetching, error
        handling, and mutations.
      </p>

      <Section title="1. Typing Data, Error, and Mutate">
        <p className="text-gray-700 dark:text-gray-300">
          SWR hooks can be typed for type-safe data, error, and mutate
          functions.
        </p>

        <CodeBlock title="Typed SWR Hooks">
          {`import useSWR from 'swr';

// Typed fetcher function
const fetcher = async (url: string): Promise<User> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

// Typed useSWR hook
function useUser(id: string) {
  const { data, error, isLoading, mutate } = useSWR<User>(
    id ? \`/api/users/\${id}\` : null,
    fetcher
  );
  
  return {
    user: data,
    error: error as Error | undefined,
    isLoading,
    mutate,
  };
}

// Typed useSWR with options
function useUsers() {
  const { data, error, mutate } = useSWR<User[], Error>(
    '/api/users',
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 5000,
      onSuccess: (data) => {
        console.log('Users loaded:', data);
      },
      onError: (error) => {
        console.error('Error loading users:', error);
      },
    }
  );
  
  return { users: data, error, mutate };
}

// Typed mutate function
function useUpdateUser() {
  const { mutate } = useSWR<User>('/api/users/1', fetcher);
  
  const updateUser = async (changes: Partial<User>) => {
    const updated = await fetch('/api/users/1', {
      method: 'PATCH',
      body: JSON.stringify(changes),
    }).then(r => r.json());
    
    mutate(updated, false); // Update cache without revalidation
  };
  
  return { updateUser };
}`}
        </CodeBlock>

        <CodeBlock title="Typed SWR Configuration">
          {`// Typed SWR config
import { SWRConfiguration } from 'swr';

const swrConfig: SWRConfiguration<User, Error> = {
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 5000,
  onSuccess: (data) => {
    console.log('Data loaded:', data);
  },
  onError: (error) => {
    console.error('Error:', error);
  },
};

// Typed SWR provider
import { SWRConfig } from 'swr';

function App() {
  return (
    <SWRConfig value={swrConfig}>
      <UserComponent />
    </SWRConfig>
  );
}

// Typed useSWRInfinite
import useSWRInfinite from 'swr/infinite';

function useInfiniteUsers() {
  const { data, error, size, setSize, mutate } = useSWRInfinite<User[]>(
    (index) => \`/api/users?page=\${index + 1}\`,
    fetcher
  );
  
  const users = data ? data.flat() : [];
  const isLoadingMore = size > 0 && data && typeof data[size - 1] === 'undefined';
  
  return {
    users,
    error,
    isLoadingMore,
    loadMore: () => setSize(size + 1),
    mutate,
  };
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>SWR hooks are typed with generic parameters</li>
          <li>Data, error, and mutate are fully typed</li>
          <li>SWR configuration supports typed options</li>
          <li>useSWRInfinite supports typed pagination</li>
        </ul>
      </InfoBox>
    </div>
  );
}

