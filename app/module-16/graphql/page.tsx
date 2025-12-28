import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function GraphQLPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        GraphQL TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        GraphQL queries and mutations can be typed with Codegen for
        type-safe GraphQL operations.
      </p>

      <Section title="1. Typing Queries with Codegen">
        <p className="text-gray-700 dark:text-gray-300">
          GraphQL Codegen generates TypeScript types from GraphQL schemas.
        </p>

        <CodeBlock title="Typed GraphQL Queries">
          {`// GraphQL query
const GET_USER = gql\`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
\`;

// Generated types from Codegen
interface GetUserQuery {
  user: {
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
  } | null;
}

interface GetUserQueryVariables {
  id: string;
}

// Typed useQuery hook
import { useQuery } from '@apollo/client';

function UserComponent({ userId }: { userId: string }) {
  const { data, loading, error } = useQuery<GetUserQuery, GetUserQueryVariables>(
    GET_USER,
    {
      variables: { id: userId },
    }
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.user) return null;
  
  return <div>{data.user.name}</div>;
}

// Typed GraphQL mutation
const CREATE_USER = gql\`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
\`;

interface CreateUserMutation {
  createUser: {
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
  };
}

interface CreateUserMutationVariables {
  input: {
    name: string;
    email: string;
  };
}

// Typed useMutation hook
import { useMutation } from '@apollo/client';

function CreateUserForm() {
  const [createUser, { loading, error }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER);
  
  const handleSubmit = async (data: CreateUserMutationVariables['input']) => {
    try {
      const result = await createUser({
        variables: { input: data },
      });
      console.log('User created:', result.data?.createUser);
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  return <form>{/* form */}</form>;
}`}
        </CodeBlock>

        <CodeBlock title="GraphQL Codegen Configuration">
          {`// codegen.yml
schema: http://localhost:4000/graphql
documents: './src/**/*.graphql'
generates:
  ./src/generated/graphql.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-apollo
    config:
      withHooks: true
      withComponent: false
      withHOC: false

// Generated types usage
import { GetUserDocument, GetUserQuery, GetUserQueryVariables } from './generated/graphql';

function useTypedUser(id: string) {
  return useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, {
    variables: { id },
  });
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>GraphQL Codegen generates TypeScript types</li>
          <li>Queries and mutations are fully typed</li>
          <li>Variables are typed with generated interfaces</li>
          <li>Apollo Client hooks support typed operations</li>
        </ul>
      </InfoBox>
    </div>
  );
}

