import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function TanStackRouterPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        TanStack Router TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        TanStack Router provides excellent TypeScript support for typing route
        definitions and search params.
      </p>

      <Section title="1. Typing Route Definitions">
        <p className="text-gray-700 dark:text-gray-300">
          Route definitions in TanStack Router can be fully typed with
          TypeScript.
        </p>

        <CodeBlock title="Basic Typed Route Definitions">
          {`import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

// Typed root route
const rootRoute = createRootRoute({
  component: RootComponent,
});

// Typed route with params
const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  component: UserComponent,
});

// Typed route with search params
interface UserSearchParams {
  tab?: 'profile' | 'settings' | 'posts';
  page?: number;
}

const userRouteWithSearch = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  validateSearch: (search: Record<string, unknown>): UserSearchParams => {
    return {
      tab: search.tab as UserSearchParams['tab'],
      page: search.page ? Number(search.page) : undefined,
    };
  },
  component: UserComponent,
});

// Typed route with loader
const userRouteWithLoader = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users/$userId',
  loader: async ({ params }) => {
    const response = await fetch(\`/api/users/\${params.userId}\`);
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json() as Promise<User>;
  },
  component: UserComponent,
});

// Typed route component
function UserComponent() {
  const { userId } = userRouteWithLoader.useParams();
  const search = userRouteWithSearch.useSearch();
  
  // userId is typed as string
  // search is typed as UserSearchParams
  return (
    <div>
      <p>User ID: {userId}</p>
      {search.tab && <p>Tab: {search.tab}</p>}
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Nested Routes">
          {`// Typed nested route structure
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeComponent,
});

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: UsersLayout,
});

const usersIndexRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: '/',
  component: UsersListComponent,
});

const userDetailRoute = createRoute({
  getParentRoute: () => usersRoute,
  path: '/$userId',
  loader: async ({ params }) => {
    const response = await fetch(\`/api/users/\${params.userId}\`);
    return response.json() as Promise<User>;
  },
  component: UserDetailComponent,
});

// Typed route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  usersRoute.addChildren([
    usersIndexRoute,
    userDetailRoute,
  ]),
]);

// Create typed router
const router = createRouter({ routeTree });

// Typed route navigation
function UsersListComponent() {
  const navigate = userDetailRoute.useNavigate();
  
  const handleUserClick = (userId: string) => {
    navigate({ params: { userId } });
  };
  
  return <div>{/* user list */}</div>;
}`}
        </CodeBlock>
      </Section>

      <Section title="2. Typing Search Params">
        <p className="text-gray-700 dark:text-gray-300">
          Search parameters can be typed for type-safe query string handling.
        </p>

        <CodeBlock title="Typed Search Params">
          {`// Typed search params with validation
interface PostsSearchParams {
  page?: number;
  limit?: number;
  sort?: 'newest' | 'oldest' | 'popular';
  category?: string;
  tags?: string[];
}

const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts',
  validateSearch: (search: Record<string, unknown>): PostsSearchParams => {
    return {
      page: search.page ? Number(search.page) : undefined,
      limit: search.limit ? Number(search.limit) : undefined,
      sort: search.sort as PostsSearchParams['sort'],
      category: search.category as string,
      tags: Array.isArray(search.tags) ? search.tags as string[] : undefined,
    };
  },
  component: PostsComponent,
});

// Usage in component
function PostsComponent() {
  const search = postsRoute.useSearch();
  const navigate = postsRoute.useNavigate();
  
  // search is typed as PostsSearchParams
  const handlePageChange = (page: number) => {
    navigate({
      search: (prev) => ({ ...prev, page }),
    });
  };
  
  const handleSortChange = (sort: PostsSearchParams['sort']) => {
    navigate({
      search: (prev) => ({ ...prev, sort }),
    });
  };
  
  return (
    <div>
      <p>Page: {search.page ?? 1}</p>
      <p>Sort: {search.sort ?? 'newest'}</p>
      <button onClick={() => handlePageChange(2)}>Page 2</button>
    </div>
  );
}

// Typed search params with defaults
interface SearchParamsWithDefaults {
  page: number;
  limit: number;
  sort: 'newest' | 'oldest';
}

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  validateSearch: (search: Record<string, unknown>): SearchParamsWithDefaults => {
    return {
      page: search.page ? Number(search.page) : 1,
      limit: search.limit ? Number(search.limit) : 10,
      sort: (search.sort as SearchParamsWithDefaults['sort']) ?? 'newest',
    };
  },
  component: SearchComponent,
});`}
        </CodeBlock>

        <CodeBlock title="Advanced Search Params Typing">
          {`// Typed search params with zod validation
import { z } from 'zod';

const searchParamsSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  sort: z.enum(['newest', 'oldest', 'popular']).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type SearchParams = z.infer<typeof searchParamsSchema>;

const validatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return searchParamsSchema.parse(search);
  },
  component: ProductsComponent,
});

// Typed search params with transformation
interface TransformedSearchParams {
  currentPage: number;
  itemsPerPage: number;
  sortOrder: 'asc' | 'desc';
}

const transformedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/items',
  validateSearch: (search: Record<string, unknown>): TransformedSearchParams => {
    return {
      currentPage: search.page ? Number(search.page) : 1,
      itemsPerPage: search.limit ? Number(search.limit) : 20,
      sortOrder: search.sort === 'oldest' ? 'asc' : 'desc',
    };
  },
  component: ItemsComponent,
});`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Route definitions are typed with createRoute</li>
          <li>Route params are automatically typed from path</li>
          <li>Search params are typed with validateSearch</li>
          <li>Nested routes maintain type safety</li>
          <li>Loaders support typed return values</li>
          <li>Navigation is fully typed</li>
        </ul>
      </InfoBox>
    </div>
  );
}

