import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function LegacyPagesRouterPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Next.js Pages Router Types (Legacy)
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Typing Next.js Pages Router patterns (for projects still using
        Pages Router, not covered in other modules).
      </p>

      <Section title="1. GetServerSideProps, GetStaticProps, GetStaticPaths">
        <p className="text-gray-700 dark:text-gray-300">
          Typing Next.js data fetching functions in Pages Router.
        </p>

        <CodeBlock title="Typed GetServerSideProps">
          {`import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// Typed GetServerSideProps
interface PageProps {
  user: User;
  timestamp: number;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  const { params, query, req, res } = context;
  
  // Typed params
  const userId = params?.id as string;
  
  // Typed query
  const tab = query.tab as string | undefined;
  
  // Fetch data
  const user = await fetchUser(userId);
  
  if (!user) {
    return {
      notFound: true,  // Typed
    };
  }
  
  return {
    props: {
      user,
      timestamp: Date.now(),
    },
  };
};

// Typed GetServerSideProps with redirect
export const getServerSideProps: GetServerSideProps = async (context) => {
  const isAuthenticated = checkAuth(context.req);
  
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  
  return {
    props: {},
  };
};

// Typed GetServerSideProps with typed params
interface PageParams {
  id: string;
  slug: string;
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  PageParams
> = async (context) => {
  const { id, slug } = context.params!;  // Typed params
  
  return {
    props: {
      id,
      slug,
    },
  };
};`}
        </CodeBlock>

        <CodeBlock title="Typed GetStaticProps & GetStaticPaths">
          {`import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
} from 'next';

// Typed GetStaticProps
interface StaticPageProps {
  post: Post;
  relatedPosts: Post[];
}

export const getStaticProps: GetStaticProps<StaticPageProps> = async (
  context: GetStaticPropsContext
) => {
  const { params } = context;
  const postId = params?.id as string;
  
  const post = await getPost(postId);
  const relatedPosts = await getRelatedPosts(postId);
  
  return {
    props: {
      post,
      relatedPosts,
    },
    revalidate: 60,  // ISR: revalidate every 60 seconds
  };
};

// Typed GetStaticPaths
interface PathParams {
  id: string;
}

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const posts = await getAllPosts();
  
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));
  
  return {
    paths,
    fallback: 'blocking',  // or 'true' or 'false'
  };
};

// Typed GetStaticProps with typed params
export const getStaticProps: GetStaticProps<
  StaticPageProps,
  PathParams
> = async (context) => {
  const { id } = context.params!;  // Typed params
  
  const post = await getPost(id);
  
  return {
    props: {
      post,
      relatedPosts: [],
    },
  };
};

// Typed GetStaticPaths with fallback
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,  // Generate pages on-demand
  };
};`}
        </CodeBlock>

        <CodeBlock title="Typed NextPage & AppProps">
          {`import { NextPage, GetServerSideProps } from 'next';
import { AppProps } from 'next/app';

// Typed NextPage
interface PageProps {
  title: string;
  content: string;
}

const TypedPage: NextPage<PageProps> = ({ title, content }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default TypedPage;

// Typed NextPage with getServerSideProps
export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  return {
    props: {
      title: 'My Page',
      content: 'Page content',
    },
  };
};

// Typed AppProps
interface CustomAppProps extends AppProps {
  customProp: string;
}

function MyApp({ Component, pageProps, customProp }: CustomAppProps) {
  return (
    <>
      <Component {...pageProps} />
      <p>Custom: {customProp}</p>
    </>
  );
}

export default MyApp;

// Typed NextPage with layout
type PageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

const PageWithLayout: PageWithLayout = () => {
  return <div>Page content</div>;
};

PageWithLayout.getLayout = (page) => {
  return <CustomLayout>{page}</CustomLayout>;
};

export default PageWithLayout;`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>GetServerSideProps is typed with generic PageProps</li>
          <li>GetStaticProps supports ISR with revalidate</li>
          <li>GetStaticPaths defines typed path parameters</li>
          <li>NextPage is typed with page props</li>
          <li>AppProps extends for custom app properties</li>
          <li>Pages Router types are still relevant for legacy projects</li>
        </ul>
      </InfoBox>
    </div>
  );
}

