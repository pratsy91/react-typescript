import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function EffectHooksPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Effect Hooks
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        useEffect, useLayoutEffect, and useInsertionEffect handle side effects
        in React. Understanding their TypeScript typing, dependency arrays, and
        cleanup functions enables type-safe side effect management.
      </p>

      <Section title="1. useEffect Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useEffect handles side effects with typed dependency arrays and
          cleanup functions. Understanding dependency typing, async effects, and
          cleanup return types ensures type-safe effect handling.
        </p>

        <CodeBlock title="useEffect with TypeScript">
          {`// Basic useEffect - no dependencies
function BasicEffect() {
  React.useEffect(() => {
    // Side effect runs on every render
    console.log("Component rendered");
  });  // No dependency array

  return <div>Component</div>;
}

// useEffect with empty dependency array
function MountEffect() {
  React.useEffect(() => {
    // Runs only on mount
    console.log("Component mounted");

    // Cleanup runs on unmount
    return () => {
      console.log("Component unmounted");
    };
  }, []);  // Empty array

  return <div>Component</div>;
}

// useEffect with dependencies
function DependentEffect({ userId }: { userId: number }) {
  React.useEffect(() => {
    // Runs when userId changes
    fetchUserData(userId);
  }, [userId]);  // Dependency array

  return null;
}

// Type-safe dependency array
function TypedDependencies() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    // TypeScript ensures count and name are in dependency array
    console.log(\`Count: \${count}, Name: \${name}\`);
  }, [count, name]);  // All used values must be listed

  return null;
}

// Cleanup function typing
function CleanupEffect() {
  React.useEffect(() => {
    // Setup
    const intervalId = setInterval(() => {
      console.log("Tick");
    }, 1000);

    // Cleanup: return type is void | (() => void)
    return () => {
      clearInterval(intervalId);  // Type-safe
    };
  }, []);

  return null;
}

// Multiple cleanup effects
function MultipleCleanups() {
  React.useEffect(() => {
    const intervalId = setInterval(() => {}, 1000);
    const timeoutId = setTimeout(() => {}, 2000);

    // Cleanup function runs all cleanup
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}

// Event listener cleanup
function EventListenerEffect() {
  React.useEffect(() => {
    const handleScroll = () => {
      console.log("Scrolling");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}

// Subscription cleanup
function SubscriptionEffect() {
  React.useEffect(() => {
    const subscription = subscribe((data: string) => {
      console.log(data);
    });

    return () => {
      subscription.unsubscribe();  // Type-safe cleanup
    };
  }, []);

  return null;
}

// Async effect pattern
function AsyncEffect() {
  const [data, setData] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      const result = await fetch("/api/data").then((res) => res.text());
      
      // Check if effect was cleaned up
      if (!cancelled) {
        setData(result);
      }
    }

    fetchData();

    // Cleanup: cancel async operation
    return () => {
      cancelled = true;
    };
  }, []);

  return <div>{data}</div>;
}

// Async function in useEffect (proper pattern)
function AsyncEffectPattern() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        
        if (isMounted) {
          setUser(userData);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
        }
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return null;
}

// Effect with ref in dependencies
function RefDependency() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (ref.current) {
      setMounted(true);
    }
  }, [ref]);  // Ref object is stable, but ref.current changes don't trigger

  // Better: track ref.current changes differently
  React.useEffect(() => {
    if (ref.current) {
      // Do something with ref.current
    }
    // No ref in deps - ref object itself doesn't change
  }, []);

  return <div ref={ref}>Content</div>;
}

// Effect with function in dependencies
function FunctionDependency() {
  const [count, setCount] = React.useState(0);

  // ❌ Bad: function recreated every render
  const handleClick = () => {
    setCount(count + 1);
  };

  // ❌ Problem: handleClick changes every render
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [handleClick]);  // Runs every render!

  // ✓ Good: use useCallback or define inside effect
  React.useEffect(() => {
    const handleClick = () => {
      setCount((prev) => prev + 1);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);  // Stable dependencies

  return null;
}

// Effect with object/array dependencies
function ObjectDependency() {
  const [user, setUser] = React.useState({ id: 1, name: "John" });

  // ❌ Problem: object reference changes every render
  React.useEffect(() => {
    updateUser(user);
  }, [user]);  // Runs every render!

  // ✓ Better: use primitive dependencies
  React.useEffect(() => {
    updateUser(user);
  }, [user.id, user.name]);  // Track primitives

  // ✓ Or useMemo for stable reference
  const stableUser = React.useMemo(() => user, [user.id, user.name]);
  React.useEffect(() => {
    updateUser(stableUser);
  }, [stableUser]);

  return null;
}

// Conditional effect
function ConditionalEffect({ enabled }: { enabled: boolean }) {
  React.useEffect(() => {
    if (!enabled) return;

    // Effect only runs when enabled is true
    const intervalId = setInterval(() => {
      console.log("Running");
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [enabled]);

  return null;
}

// Effect with multiple dependencies
function MultipleDependencies() {
  const [userId, setUserId] = React.useState(0);
  const [filter, setFilter] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("name");

  React.useEffect(() => {
    // Runs when any dependency changes
    fetchData({ userId, filter, sortBy });
  }, [userId, filter, sortBy]);  // All dependencies

  return null;
}

// Effect with previous value tracking
function PreviousValueEffect({ count }: { count: number }) {
  const prevCountRef = React.useRef<number>();

  React.useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  React.useEffect(() => {
    const prevCount = prevCountRef.current;
    if (prevCount !== undefined && prevCount !== count) {
      console.log(\`Count changed from \${prevCount} to \${count}\`);
    }
  }, [count]);

  return null;
}

// Effect with AbortController
function AbortControllerEffect() {
  const [data, setData] = React.useState<string | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();

    fetch("/api/data", { signal: controller.signal })
      .then((res) => res.text())
      .then(setData)
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      });

    return () => {
      controller.abort();  // Cancel fetch on cleanup
    };
  }, []);

  return <div>{data}</div>;
}

// Effect return type
// useEffect callback can return: void | (() => void)
function EffectReturnType() {
  React.useEffect(() => {
    // Can return nothing (void)
    console.log("Effect");
  }, []);

  React.useEffect(() => {
    // Can return cleanup function
    return () => {
      console.log("Cleanup");
    };
  }, []);

  // ❌ Cannot return other types
  // React.useEffect(() => {
  //   return "string";  // Error
  // }, []);

  return null;
}

// Type-safe effect with generic data
function useFetch<T>(url: string) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result: T = await response.json();

        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function FetchExample() {
  interface User {
    id: number;
    name: string;
  }

  const { data, loading, error } = useFetch<User[]>("/api/users");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
        </CodeBlock>

        <InfoBox type="info">
          useEffect dependency arrays must include all values used from
          component scope. Cleanup functions return void or a cleanup function.
          Use cancellation flags for async effects. Avoid objects/arrays in
          dependencies unless wrapped in useMemo/useCallback.
        </InfoBox>
      </Section>

      <Section title="2. useLayoutEffect Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useLayoutEffect has the same API as useEffect but runs synchronously
          after DOM mutations but before paint. Same typing patterns apply.
        </p>

        <CodeBlock title="useLayoutEffect with TypeScript">
          {`// Basic useLayoutEffect - same API as useEffect
function LayoutEffect() {
  React.useLayoutEffect(() => {
    // Runs synchronously after DOM updates, before paint
    // Use for DOM measurements, animations
    const element = document.getElementById("my-element");
    if (element) {
      const rect = element.getBoundingClientRect();
      console.log("Element position:", rect);
    }
  }, []);

  return <div id="my-element">Content</div>;
}

// Typing is identical to useEffect
function TypedLayoutEffect() {
  const [width, setWidth] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (ref.current) {
      // Synchronously measure DOM
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  return <div ref={ref}>Width: {width}px</div>;
}

// Cleanup in useLayoutEffect
function LayoutCleanup() {
  React.useLayoutEffect(() => {
    // Setup
    const element = document.createElement("div");
    document.body.appendChild(element);

    // Cleanup runs before paint
    return () => {
      document.body.removeChild(element);
    };
  }, []);

  return null;
}

// Animation synchronization
function AnimatedElement() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState(0);

  React.useLayoutEffect(() => {
    if (ref.current) {
      // Synchronously update position to avoid flicker
      ref.current.style.transform = \`translateX(\${position}px)\`;
    }
  }, [position]);

  return <div ref={ref}>Animated</div>;
}

// DOM measurements
function MeasuredElement() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useLayoutEffect(() => {
    if (ref.current) {
      // Measure before paint to avoid layout shift
      const { width, height } = ref.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div ref={ref} style={{ padding: "1rem" }}>
      Width: {dimensions.width}, Height: {dimensions.height}
    </div>
  );
}

// When to use useLayoutEffect vs useEffect
// useLayoutEffect: DOM measurements, animations, synchronous DOM mutations
// useEffect: data fetching, subscriptions, most side effects

function Comparison() {
  // useEffect: asynchronous, doesn't block paint
  React.useEffect(() => {
    // This runs after paint
    console.log("After paint");
  }, []);

  // useLayoutEffect: synchronous, blocks paint
  React.useLayoutEffect(() => {
    // This runs before paint
    console.log("Before paint");
  }, []);

  return null;
}`}
        </CodeBlock>

        <InfoBox type="tip">
          useLayoutEffect has identical TypeScript typing to useEffect. Use it
          when you need synchronous DOM access before paint (measurements,
          animations). Most effects should use useEffect (async, non-blocking).
        </InfoBox>
      </Section>

      <Section title="3. useInsertionEffect Hook">
        <p className="text-gray-700 dark:text-gray-300">
          useInsertionEffect runs before DOM mutations, perfect for CSS-in-JS
          libraries. Same typing as useEffect but runs at a different timing.
        </p>

        <CodeBlock title="useInsertionEffect with TypeScript">
          {`// Basic useInsertionEffect - runs before DOM updates
function InsertionEffect() {
  React.useInsertionEffect(() => {
    // Runs before any DOM mutations
    // Perfect for injecting <style> tags
    const style = document.createElement("style");
    style.textContent = \`
      .my-class {
        color: red;
      }
    \`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return <div className="my-class">Styled content</div>;
}

// Typing identical to useEffect
function TypedInsertionEffect() {
  const [css, setCss] = React.useState(".class { color: blue; }");

  React.useInsertionEffect(() => {
    // Inject styles before DOM update
    const styleId = "dynamic-styles";
    let style = document.getElementById(styleId) as HTMLStyleElement;

    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }

    style.textContent = css;

    return () => {
      // Cleanup on unmount
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, [css]);

  return <div>Content</div>;
}

// CSS-in-JS pattern
function useCSS(styles: string) {
  React.useInsertionEffect(() => {
    const styleId = \`css-\${styles.slice(0, 8)}\`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = styles;

    return () => {
      const element = document.getElementById(styleId);
      if (element) {
        document.head.removeChild(element);
      }
    };
  }, [styles]);
}

// Usage
function StyledComponent() {
  const css = \`
    .my-component {
      padding: 1rem;
      background: #f0f0f0;
    }
  \`;

  useCSS(css);

  return <div className="my-component">Content</div>;
}

// Timing: useInsertionEffect runs before useLayoutEffect
function TimingExample() {
  React.useInsertionEffect(() => {
    console.log("1. Insertion effect - before DOM mutations");
  }, []);

  React.useLayoutEffect(() => {
    console.log("2. Layout effect - after DOM mutations, before paint");
  }, []);

  React.useEffect(() => {
    console.log("3. Effect - after paint");
  }, []);

  return null;
}

// When to use useInsertionEffect
// - Injecting <style> tags (CSS-in-JS)
// - Any DOM mutations that must happen before layout
// - Not for most use cases (use useEffect/useLayoutEffect instead)

function CSSinJSLibrary() {
  // Example: styled-components like library
  function useStyledComponent(componentId: string, css: string) {
    React.useInsertionEffect(() => {
      const id = \`style-\${componentId}\`;
      let style = document.getElementById(id) as HTMLStyleElement;

      if (!style) {
        style = document.createElement("style");
        style.id = id;
        document.head.appendChild(style);
      }

      style.textContent = css;

      return () => {
        const element = document.getElementById(id);
        if (element && !document.getElementById(componentId)) {
          // Only remove if component is unmounted
          document.head.removeChild(element);
        }
      };
    }, [componentId, css]);
  }

  useStyledComponent("my-component", ".my-component { color: red; }");

  return <div className="my-component">Styled</div>;
}`}
        </CodeBlock>

        <InfoBox type="important">
          useInsertionEffect runs before DOM mutations, perfect for CSS-in-JS
          style injection. Typing is identical to useEffect. Use sparingly -
          most effects should use useEffect or useLayoutEffect. Only needed for
          DOM mutations that must happen before layout calculations.
        </InfoBox>
      </Section>
    </div>
  );
}
