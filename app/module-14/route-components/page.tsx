import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function RouteComponentsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Typing Route Components
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Route components can be typed to receive typed props from route
        parameters, loaders, and search params.
      </p>

      <Section title="1. Typed Route Props">
        <p className="text-gray-700 dark:text-gray-300">
          Route components receive typed props from route configuration.
        </p>

        <CodeBlock title="Typed Route Component Props">
          {`import { useParams, useLoaderData, useSearchParams } from 'react-router-dom';

// Typed route component with params
interface UserProfileProps {
  // Props are inferred from route params
}

function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  
  return <div>User ID: {userId}</div>;
}

// Typed route component with loader data
interface UserLoaderData {
  user: User;
  posts: Post[];
}

export async function userLoader({ params }: { params: { userId: string } }): Promise<UserLoaderData> {
  const [user, posts] = await Promise.all([
    fetch(\`/api/users/\${params.userId}\`).then(r => r.json()),
    fetch(\`/api/users/\${params.userId}/posts\`).then(r => r.json()),
  ]);
  return { user, posts };
}

function UserProfileWithData() {
  const { user, posts } = useLoaderData() as UserLoaderData;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <div>
        {posts.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    </div>
  );
}

// Typed route component with search params
interface PostsSearchParams {
  page?: number;
  category?: string;
}

function PostsList() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const category = searchParams.get('category') || undefined;
  
  // Use typed search params
  const typedParams: PostsSearchParams = { page, category };
  
  return <div>Posts page {typedParams.page}</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Route Component Factory">
          {`// Factory for creating typed route components
function createTypedRouteComponent<
  TParams extends Record<string, string>,
  TLoaderData = unknown,
  TSearchParams = Record<string, string>
>() {
  return function TypedRouteComponent() {
    const params = useParams<keyof TParams>() as TParams;
    const loaderData = useLoaderData() as TLoaderData;
    const [searchParams] = useSearchParams();
    
    // Transform search params to typed object
    const typedSearchParams = Object.fromEntries(searchParams) as TSearchParams;
    
    return {
      params,
      loaderData,
      searchParams: typedSearchParams,
    };
  };
}

// Usage
interface UserRouteParams {
  userId: string;
}

interface UserLoaderData {
  user: User;
}

interface UserSearchParams {
  tab?: string;
}

const UserRouteComponent = createTypedRouteComponent<
  UserRouteParams,
  UserLoaderData,
  UserSearchParams
>();

function UserPage() {
  const { params, loaderData, searchParams } = UserRouteComponent();
  
  // All values are typed
  return (
    <div>
      <p>User: {loaderData.user.name}</p>
      <p>Tab: {searchParams.tab}</p>
    </div>
  );
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Route components receive typed params from useParams</li>
          <li>Loader data is typed with useLoaderData</li>
          <li>Search params can be typed with useSearchParams</li>
          <li>Route component factories enable reusable typed patterns</li>
        </ul>
      </InfoBox>
    </div>
  );
}

