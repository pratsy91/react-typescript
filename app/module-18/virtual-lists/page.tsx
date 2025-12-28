import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function VirtualListsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Virtual Lists TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Virtualized components can be typed for type-safe virtual list
        implementations.
      </p>

      <Section title="1. Typing Virtualized Components">
        <p className="text-gray-700 dark:text-gray-300">
          Virtual lists can be typed with TypeScript for type-safe row
          rendering and virtualization.
        </p>

        <CodeBlock title="Typed Virtual List">
          {`import { useVirtualizer } from '@tanstack/react-virtual';

// Typed virtual list props
interface VirtualListProps<T> {
  items: T[];
  itemHeight: number | ((index: number) => number);
  renderItem: (item: T, index: number) => React.ReactNode;
  containerHeight: number;
  overscan?: number;
}

// Typed virtual list component
function VirtualList<T>({
  items,
  itemHeight,
  renderItem,
  containerHeight,
  overscan = 5,
}: VirtualListProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) =>
      typeof itemHeight === 'function' ? itemHeight(index) : itemHeight,
    overscan,
  });
  
  return (
    <div
      ref={parentRef}
      style={{
        height: containerHeight,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: \`\${virtualizer.getTotalSize()}px\`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: \`\${virtualItem.size}px\`,
                transform: \`translateY(\${virtualItem.start}px)\`,
              }}
            >
              {renderItem(item, virtualItem.index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Usage
interface User {
  id: string;
  name: string;
  email: string;
}

function UserList({ users }: { users: User[] }) {
  return (
    <VirtualList<User>
      items={users}
      itemHeight={50}
      containerHeight={400}
      renderItem={(user, index) => (
        <div key={user.id}>
          {index + 1}. {user.name} - {user.email}
        </div>
      )}
    />
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Virtual Grid">
          {`// Typed virtual grid props
interface VirtualGridProps<T> {
  items: T[];
  columnCount: number;
  itemWidth: number;
  itemHeight: number;
  containerWidth: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

// Typed virtual grid component
function VirtualGrid<T>({
  items,
  columnCount,
  itemWidth,
  itemHeight,
  containerWidth,
  containerHeight,
  renderItem,
}: VirtualGridProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  
  const rowCount = Math.ceil(items.length / columnCount);
  
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });
  
  return (
    <div
      ref={parentRef}
      style={{
        width: containerWidth,
        height: containerHeight,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: \`\${rowVirtualizer.getTotalSize()}px\`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columnCount;
          const endIndex = Math.min(startIndex + columnCount, items.length);
          const rowItems = items.slice(startIndex, endIndex);
          
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: \`\${virtualRow.size}px\`,
                transform: \`translateY(\${virtualRow.start}px)\`,
                display: 'flex',
              }}
            >
              {rowItems.map((item, colIndex) => {
                const index = startIndex + colIndex;
                return (
                  <div
                    key={index}
                    style={{
                      width: itemWidth,
                      height: itemHeight,
                    }}
                  >
                    {renderItem(item, index)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Usage
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <VirtualGrid<Product>
      items={products}
      columnCount={3}
      itemWidth={200}
      itemHeight={250}
      containerWidth={600}
      containerHeight={500}
      renderItem={(product) => (
        <div>
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p>\${product.price}</p>
        </div>
      )}
    />
  );
}`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Virtual lists are typed with generic item types</li>
          <li>Render functions preserve item types</li>
          <li>Virtual grids support typed grid layouts</li>
          <li>Dynamic item heights work with typed functions</li>
          <li>Virtualization props are fully typed</li>
        </ul>
      </InfoBox>
    </div>
  );
}

