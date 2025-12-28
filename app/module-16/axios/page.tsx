import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function AxiosPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Axios TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Axios can be typed with TypeScript for type-safe requests, responses,
        and interceptors.
      </p>

      <Section title="1. Typing Requests and Responses">
        <p className="text-gray-700 dark:text-gray-300">
          Axios requests and responses can be typed for type-safe API calls.
        </p>

        <CodeBlock title="Typed Axios Requests">
          {`import axios, { AxiosResponse, AxiosError } from 'axios';

// Typed GET request
async function getUser(id: string): Promise<User> {
  const response: AxiosResponse<User> = await axios.get(\`/api/users/\${id}\`);
  return response.data;
}

// Typed POST request
interface CreateUserRequest {
  name: string;
  email: string;
}

async function createUser(data: CreateUserRequest): Promise<User> {
  const response: AxiosResponse<User> = await axios.post('/api/users', data);
  return response.data;
}

// Typed PUT request
interface UpdateUserRequest {
  name?: string;
  email?: string;
}

async function updateUser(id: string, data: UpdateUserRequest): Promise<User> {
  const response: AxiosResponse<User> = await axios.put(
    \`/api/users/\${id}\`,
    data
  );
  return response.data;
}

// Typed DELETE request
async function deleteUser(id: string): Promise<void> {
  await axios.delete(\`/api/users/\${id}\`);
}

// Typed request with config
async function fetchWithConfig<T>(
  url: string,
  config?: {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
  }
): Promise<T> {
  const response: AxiosResponse<T> = await axios.get(url, config);
  return response.data;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Interceptors">
          {`// Typed request interceptor
axios.interceptors.request.use(
  (config) => {
    // Add auth token
    config.headers.Authorization = \`Bearer \${getToken()}\`;
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Typed response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

// Typed axios instance
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Typed instance methods
apiClient.get<User>('/users/1');
apiClient.post<User, CreateUserRequest>('/users', { name: 'John', email: 'john@example.com' });`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Axios requests are typed with generic parameters</li>
          <li>Responses are typed with AxiosResponse</li>
          <li>Interceptors support typed request/response handling</li>
          <li>Axios instances can be typed for consistent API calls</li>
        </ul>
      </InfoBox>
    </div>
  );
}

