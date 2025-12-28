import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TanStackQueryPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        TanStack Query TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TanStack Query (React Query) provides excellent TypeScript support
        for typing queries, mutations, and query keys.
      </p>

      <Section title="1. Typing Queries">
        <p className="text-gray-700 dark:text-gray-300">
          Queries in TanStack Query can be fully typed with TypeScript for
          type-safe data fetching.
        </p>

        <CodeBlock title="Basic Typed Queries">
          {`import { useQuery, useQueryClient } from '@tanstack/react-query';

// Typed query function
const fetchUser = async (id: string): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

// Typed query hook
function useUser(id: string) {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    enabled: !!id, // Only run if id exists
  });
}

// Usage in component
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUser(userId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;
  
  return <div>{user.name}</div>;
}

// Typed query with parameters
interface FetchUsersParams {
  page: number;
  limit: number;
  role?: string;
}

const fetchUsers = async (params: FetchUsersParams): Promise<User[]> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    limit: params.limit.toString(),
  });
  if (params.role) queryParams.append('role', params.role);
  
  const response = await fetch(\`/api/users?\${queryParams}\`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

function useUsers(params: FetchUsersParams) {
  return useQuery<User[], Error>({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
  });
}`}
        </CodeBlock>

        <CodeBlock title="Typed Query Keys">
          {`// Typed query key factory
const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};

// Typed query with typed keys
function useUser(id: string) {
  return useQuery<User, Error>({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUser(id),
  });
}

// Typed query invalidation
function useInvalidateUser() {
  const queryClient = useQueryClient();
  
  return (id: string) => {
    queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
  };
}

// Typed query key with complex parameters
interface UserListParams {
  page: number;
  filters: {
    role?: string;
    search?: string;
  };
}

const userListKeys = {
  all: ['users', 'list'] as const,
  lists: () => [...userListKeys.all] as const,
  list: (params: UserListParams) => [...userListKeys.lists(), params] as const,
};

function useUserList(params: UserListParams) {
  return useQuery<User[], Error>({
    queryKey: userListKeys.list(params),
    queryFn: () => fetchUsers(params),
  });
}`}
        </CodeBlock>

        <CodeBlock title="Typed Query Options">
          {`// Typed query with all options
function useUserWithOptions(id: string, options?: {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
}) {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    enabled: options?.enabled ?? !!id,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    cacheTime: options?.cacheTime ?? 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Typed query with select (transformation)
function useUserName(id: string) {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    select: (user) => user.name, // Return type is string
  });
}

// Typed query with multiple selectors
function useUserData(id: string) {
  const { data: name } = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    select: (user) => user.name,
  });
  
  const { data: email } = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    select: (user) => user.email,
  });
  
  return { name, email };
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Typing Mutations">
        <p className="text-gray-700 dark:text-gray-300">
          Mutations in TanStack Query can be typed for type-safe data
          modifications.
        </p>

        <CodeBlock title="Basic Typed Mutations">
          {`import { useMutation, useQueryClient } from '@tanstack/react-query';

// Typed mutation function
interface CreateUserRequest {
  name: string;
  email: string;
}

const createUser = async (data: CreateUserRequest): Promise<User> => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

// Typed mutation hook
function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation<User, Error, CreateUserRequest>({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Or update cache directly
      queryClient.setQueryData(['user', newUser.id], newUser);
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });
}

// Usage
function CreateUserForm() {
  const createUser = useCreateUser();
  
  const handleSubmit = async (data: CreateUserRequest) => {
    try {
      const newUser = await createUser.mutateAsync(data);
      console.log('User created:', newUser);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleSubmit({
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      });
    }}>
      {/* form fields */}
    </form>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Mutations with Variables">
          {`// Typed mutation with update function
interface UpdateUserRequest {
  id: string;
  changes: Partial<User>;
}

const updateUser = async ({ id, changes }: UpdateUserRequest): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation<User, Error, UpdateUserRequest>({
    mutationFn: updateUser,
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user', variables.id] });
      
      // Snapshot previous value
      const previousUser = queryClient.getQueryData<User>(['user', variables.id]);
      
      // Optimistically update
      queryClient.setQueryData<User>(['user', variables.id], (old) => {
        if (!old) return old;
        return { ...old, ...variables.changes };
      });
      
      return { previousUser };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryClient.setQueryData(['user', variables.id], context.previousUser);
      }
    },
    onSettled: (data, error, variables) => {
      // Refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
    },
  });
}

// Typed delete mutation
const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(\`/api/users/\${id}\`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
};

function useDeleteUser() {
  const queryClient = useQueryClient();
  
  return useMutation<void, Error, string>({
    mutationFn: deleteUser,
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ['user', id] });
      // Invalidate list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}`}
        </CodeBlock>

        <CodeBlock title="Typed Mutation with Context">
          {`// Typed mutation context
interface MutationContext {
  previousUsers: User[];
}

function useBulkUpdateUsers() {
  const queryClient = useQueryClient();
  
  return useMutation<
    User[],
    Error,
    Array<{ id: string; changes: Partial<User> }>,
    MutationContext
  >({
    mutationFn: async (updates) => {
      const results = await Promise.all(
        updates.map(({ id, changes }) => updateUser({ id, changes }))
      );
      return results;
    },
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });
      const previousUsers = queryClient.getQueryData<User[]>(['users']) || [];
      
      // Optimistically update
      queryClient.setQueryData<User[]>(['users'], (old) => {
        if (!old) return old;
        return old.map((user) => {
          const update = updates.find((u) => u.id === user.id);
          return update ? { ...user, ...update.changes } : user;
        });
      });
      
      return { previousUsers };
    },
    onError: (error, variables, context) => {
      if (context) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Advanced TanStack Query Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns including infinite queries, dependent queries,
          and typed query client.
        </p>

        <CodeBlock title="Typed Infinite Queries">
          {`import { useInfiniteQuery } from '@tanstack/react-query';

interface InfiniteUsersResponse {
  data: User[];
  nextCursor: string | null;
}

const fetchInfiniteUsers = async ({
  pageParam = 0,
}: {
  pageParam: number;
}): Promise<InfiniteUsersResponse> => {
  const response = await fetch(\`/api/users?page=\${pageParam}\`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

function useInfiniteUsers() {
  return useInfiniteQuery<InfiniteUsersResponse, Error>({
    queryKey: ['users', 'infinite'],
    queryFn: fetchInfiniteUsers,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    getPreviousPageParam: (firstPage) => firstPage.nextCursor,
  });
}

// Usage
function InfiniteUserList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteUsers();
  
  const users = data?.pages.flatMap((page) => page.data) ?? [];
  
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Dependent Queries">
          {`// Typed dependent query
function useUserProfile(userId: string | null) {
  const userQuery = useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId,
  });
  
  const profileQuery = useQuery<Profile, Error>({
    queryKey: ['profile', userId],
    queryFn: async () => {
      if (!userQuery.data) throw new Error('User not loaded');
      const response = await fetch(\`/api/users/\${userQuery.data.id}/profile\`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },
    enabled: !!userId && !!userQuery.data, // Only run if user is loaded
  });
  
  return {
    user: userQuery.data,
    profile: profileQuery.data,
    isLoading: userQuery.isLoading || profileQuery.isLoading,
    error: userQuery.error || profileQuery.error,
  };
}

// Typed parallel queries
function useUserData(userId: string) {
  const userQuery = useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
  
  const postsQuery = useQuery<Post[], Error>({
    queryKey: ['posts', userId],
    queryFn: () => fetchUserPosts(userId),
  });
  
  const commentsQuery = useQuery<Comment[], Error>({
    queryKey: ['comments', userId],
    queryFn: () => fetchUserComments(userId),
  });
  
  return {
    user: userQuery.data,
    posts: postsQuery.data,
    comments: commentsQuery.data,
    isLoading: userQuery.isLoading || postsQuery.isLoading || commentsQuery.isLoading,
  };
}`}
        </CodeBlock>

        <CodeBlock title="Typed Query Client">
          {`// Typed query client configuration
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Typed provider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* App components */}
    </QueryClientProvider>
  );
}

// Typed query client methods
function useTypedQueryClient() {
  const queryClient = useQueryClient();
  
  return {
    // Typed prefetch
    prefetchUser: (id: string) => {
      queryClient.prefetchQuery<User, Error>({
        queryKey: ['user', id],
        queryFn: () => fetchUser(id),
      });
    },
    
    // Typed set query data
    setUser: (id: string, user: User) => {
      queryClient.setQueryData<User>(['user', id], user);
    },
    
    // Typed get query data
    getUser: (id: string): User | undefined => {
      return queryClient.getQueryData<User>(['user', id]);
    },
    
    // Typed invalidate
    invalidateUser: (id: string) => {
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  };
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Queries are typed with generic parameters: useQuery&lt;Data, Error&gt;</li>
          <li>Query keys can be typed with const assertions</li>
          <li>Mutations support typed variables and return values</li>
          <li>Optimistic updates work with typed context</li>
          <li>Infinite queries support typed pagination</li>
          <li>Query client methods are fully typed</li>
        </ul>
      </InfoBox>
    </div>
  );
}

