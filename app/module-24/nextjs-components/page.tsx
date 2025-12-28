import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function NextJSComponentsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Next.js Component Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Typing Next.js-specific components like Link, Image, Script, and
        Head.
      </p>

      <Section title="1. Link, Image, Script Types">
        <p className="text-gray-700 dark:text-gray-300">
          Typing Next.js Link, Image, and Script components.
        </p>

        <CodeBlock title="Typed Link Component">
          {`import Link from 'next/link';

// Typed Link with href
<Link href="/about">About</Link>

// Typed Link with dynamic route
<Link href="/users/[id]" as="/users/123">User Profile</Link>

// Typed Link with query params
<Link
  href={{
    pathname: '/users/[id]',
    query: { id: '123', tab: 'profile' },
  }}
>
  User Profile
</Link>

// Typed Link with replace
<Link href="/home" replace>
  Home
</Link>

// Typed Link with scroll
<Link href="/section" scroll={false}>
  Section
</Link>

// Typed Link with prefetch
<Link href="/page" prefetch={false}>
  Page
</Link>

// Typed Link with locale
<Link href="/about" locale="en">
  About (English)
</Link>

// Typed Link with shallow routing
<Link href="/?page=2" shallow>
  Page 2
</Link>

// Typed Link component wrapper
interface TypedLinkProps {
  href: string;
  children: React.ReactNode;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
}

function TypedLink({ href, children, ...props }: TypedLinkProps) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Image Component">
          {`import Image from 'next/image';

// Typed Image with src
<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
/>

// Typed Image with external src
<Image
  src="https://example.com/image.jpg"
  alt="Description"
  width={500}
  height={300}
/>

// Typed Image with fill
<div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src="/image.jpg"
    alt="Description"
    fill
    style={{ objectFit: 'cover' }}
  />
</div>

// Typed Image with sizes
<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Typed Image with priority
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>

// Typed Image with placeholder
<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Typed Image component wrapper
interface TypedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
}

function TypedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  className,
}: TypedImageProps) {
  if (fill) {
    return (
      <div className={className} style={{ position: 'relative' }}>
        <Image src={src} alt={alt} fill priority={priority} />
      </div>
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Script Component">
          {`import Script from 'next/script';

// Typed Script with src
<Script src="https://example.com/script.js" />

// Typed Script with strategy
<Script
  src="https://example.com/script.js"
  strategy="afterInteractive"
/>

// Typed Script with onLoad
<Script
  src="https://example.com/script.js"
  onLoad={() => {
    console.log('Script loaded');
  }}
/>

// Typed Script with onError
<Script
  src="https://example.com/script.js"
  onError={(e) => {
    console.error('Script error:', e);
  }}
/>

// Typed Script with inline script
<Script id="inline-script" strategy="afterInteractive">
  {"console.log('Inline script');"}
</Script>

// Typed Script component wrapper
interface TypedScriptProps {
  src?: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  onLoad?: () => void;
  onError?: (e: Error) => void;
  children?: string;
}

function TypedScript({
  src,
  strategy = 'afterInteractive',
  onLoad,
  onError,
  children,
}: TypedScriptProps) {
  if (children) {
    return (
      <Script strategy={strategy} onLoad={onLoad} onError={onError}>
        {children}
      </Script>
    );
  }
  
  return (
    <Script
      src={src}
      strategy={strategy}
      onLoad={onLoad}
      onError={onError}
    />
  );
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Link href can be string or object with pathname/query</li>
          <li>Image requires width/height or fill prop</li>
          <li>Script strategy controls loading behavior</li>
          <li>All Next.js components have typed props</li>
          <li>Component wrappers preserve type safety</li>
        </ul>
      </InfoBox>
    </div>
  );
}

