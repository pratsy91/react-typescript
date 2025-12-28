import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function AnimationTransitionEventsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Animation & Transition Events
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React.AnimationEvent and React.TransitionEvent provide type-safe
        animation and transition event handling. Understanding their types
        enables robust animation lifecycle management.
      </p>

      <Section title="1. Animation Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.AnimationEvent handles CSS animation events.
          AnimationEventHandler types animation event handlers. Understanding
          animation events enables animation lifecycle management and
          coordination.
        </p>

        <CodeBlock title="React.AnimationEvent and AnimationEventHandler">
          {`// Basic AnimationEvent
function AnimationExample() {
  const handleAnimationStart = (e: React.AnimationEvent<HTMLDivElement>) => {
    console.log("Animation started");
    console.log(e.animationName);  // string (name of animation)
    console.log(e.elapsedTime);  // number (time elapsed)
  };

  return (
    <div
      onAnimationStart={handleAnimationStart}
      style={{
        animation: "slide 1s ease-in-out",
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      Animated
    </div>
  );
}

// AnimationEvent properties
function AnimationEventProperties() {
  const handleAnimation = (e: React.AnimationEvent<HTMLDivElement>) => {
    console.log(e.animationName);  // string (CSS animation name)
    console.log(e.elapsedTime);  // number (seconds since animation started)
    console.log(e.pseudoElement);  // string (pseudo-element if any)
    console.log(e.target);  // EventTarget | null
    console.log(e.currentTarget);  // HTMLElement (typed)
    console.log(e.type);  // "animationstart" | "animationend" | "animationiteration"
  };

  return <div onAnimationStart={handleAnimation}>Animation</div>;
}

// AnimationEventHandler type
function AnimationEventHandlerExample() {
  const handleAnimationStart: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    // e is automatically typed as React.AnimationEvent<HTMLDivElement>
    console.log(\`Animation \${e.animationName} started\`);
  };

  return (
    <div
      onAnimationStart={handleAnimationStart}
      style={{ animation: "fade 1s" }}
    >
      Animation
    </div>
  );
}

// All animation events
function AllAnimationEvents() {
  const handleAnimationStart: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log("AnimationStart:", e.animationName, e.elapsedTime);
  };

  const handleAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log("AnimationEnd:", e.animationName, e.elapsedTime);
  };

  const handleAnimationIteration: React.AnimationEventHandler<
    HTMLDivElement
  > = (e) => {
    console.log("AnimationIteration:", e.animationName, e.elapsedTime);
  };

  const handleAnimationCancel: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log("AnimationCancel:", e.animationName, e.elapsedTime);
  };

  return (
    <div
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
      onAnimationIteration={handleAnimationIteration}
      onAnimationCancel={handleAnimationCancel}
      style={{
        animation: "pulse 2s infinite",
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      Animation
    </div>
  );
}

// Animation lifecycle
function AnimationLifecycle() {
  const [state, setState] = React.useState<
    "idle" | "running" | "paused" | "finished"
  >("idle");

  const handleAnimationStart: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    setState("running");
    console.log("Animation started:", e.animationName);
  };

  const handleAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    setState("finished");
    console.log("Animation ended:", e.animationName, e.elapsedTime);
  };

  return (
    <div>
      <div
        onAnimationStart={handleAnimationStart}
        onAnimationEnd={handleAnimationEnd}
        style={{
          animation: "slide 1s",
          width: "100px",
          height: "100px",
          backgroundColor: "blue",
        }}
      >
        State: {state}
      </div>
    </div>
  );
}

// Multiple animations
function MultipleAnimations() {
  const handleAnimationStart: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log(\`\${e.animationName} started at \${e.elapsedTime}s\`);
  };

  const handleAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log(\`\${e.animationName} ended at \${e.elapsedTime}s\`);
  };

  return (
    <div
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={handleAnimationEnd}
      style={{
        animation: "fade 1s, slide 2s",
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      Multiple animations
    </div>
  );
}

// Animation timing
function AnimationTiming() {
  const handleAnimation = (e: React.AnimationEvent<HTMLDivElement>) => {
    console.log(\`\${e.type}: \${e.animationName} - \${e.elapsedTime.toFixed(2)}s\`);
  };

  return (
    <div
      onAnimationStart={handleAnimation}
      onAnimationIteration={handleAnimation}
      onAnimationEnd={handleAnimation}
      style={{
        animation: "pulse 2s infinite",
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      Timing
    </div>
  );
}

// Animation coordination
function AnimationCoordination() {
  const [animationState, setAnimationState] = React.useState<
    Map<string, boolean>
  >(new Map());

  const handleAnimationStart: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    setAnimationState((prev) => {
      const next = new Map(prev);
      next.set(e.animationName, true);
      return next;
    });
  };

  const handleAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    setAnimationState((prev) => {
      const next = new Map(prev);
      next.set(e.animationName, false);
      return next;
    });
  };

  const isAnimating = (name: string) => animationState.get(name) || false;

  return (
    <div>
      <div
        onAnimationStart={handleAnimationStart}
        onAnimationEnd={handleAnimationEnd}
        style={{
          animation: "fade 1s",
          width: "100px",
          height: "100px",
          backgroundColor: "blue",
        }}
      >
        Animating: {isAnimating("fade") ? "Yes" : "No"}
      </div>
    </div>
  );
}

// Type-safe animation handler props
interface AnimatedProps {
  onAnimationStart?: React.AnimationEventHandler<HTMLDivElement>;
  onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>;
  onAnimationIteration?: React.AnimationEventHandler<HTMLDivElement>;
  onAnimationCancel?: React.AnimationEventHandler<HTMLDivElement>;
}

function TypedAnimated({
  onAnimationStart,
  onAnimationEnd,
  onAnimationIteration,
  onAnimationCancel,
}: AnimatedProps) {
  return (
    <div
      onAnimationStart={onAnimationStart}
      onAnimationEnd={onAnimationEnd}
      onAnimationIteration={onAnimationIteration}
      onAnimationCancel={onAnimationCancel}
      style={{ animation: "fade 1s" }}
    >
      Animated
    </div>
  );
}

// Generic animation handler
function useAnimationHandler<T extends HTMLElement>(
  handler: (e: React.AnimationEvent<T>) => void
): React.AnimationEventHandler<T> {
  return handler;
}`}
        </CodeBlock>

        <InfoBox type="info">
          React.AnimationEvent&lt;T&gt; handles CSS animation events.
          AnimationEventHandler&lt;T&gt; types animation event handlers. Access
          animationName (string), elapsedTime (number), and pseudoElement
          (string) through event properties. Perfect for animation lifecycle
          management, coordination, and state synchronization.
        </InfoBox>
      </Section>

      <Section title="2. Transition Events">
        <p className="text-gray-700 dark:text-gray-300">
          React.TransitionEvent handles CSS transition events.
          TransitionEventHandler types transition event handlers. Understanding
          transition events enables transition lifecycle management.
        </p>

        <CodeBlock title="React.TransitionEvent and TransitionEventHandler">
          {`// Basic TransitionEvent
function TransitionExample() {
  const handleTransitionStart = (e: React.TransitionEvent<HTMLDivElement>) => {
    console.log("Transition started");
    console.log(e.propertyName);  // string (CSS property transitioning)
    console.log(e.elapsedTime);  // number (time elapsed)
  };

  return (
    <div
      onTransitionStart={handleTransitionStart}
      style={{
        transition: "width 1s ease-in-out",
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      Transition
    </div>
  );
}

// TransitionEvent properties
function TransitionEventProperties() {
  const handleTransition = (e: React.TransitionEvent<HTMLDivElement>) => {
    console.log(e.propertyName);  // string (CSS property name)
    console.log(e.elapsedTime);  // number (seconds since transition started)
    console.log(e.pseudoElement);  // string (pseudo-element if any)
    console.log(e.target);  // EventTarget | null
    console.log(e.currentTarget);  // HTMLElement (typed)
    console.log(e.type);  // "transitionstart" | "transitionend" | "transitionrun" | "transitioncancel"
  };

  return <div onTransitionStart={handleTransition}>Transition</div>;
}

// TransitionEventHandler type
function TransitionEventHandlerExample() {
  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    // e is automatically typed as React.TransitionEvent<HTMLDivElement>
    console.log(
      \`Transition of \${e.propertyName} ended after \${e.elapsedTime}s\`
    );
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        transition: "width 1s",
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      Transition
    </div>
  );
}

// All transition events
function AllTransitionEvents() {
  const handleTransitionRun: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log("TransitionRun:", e.propertyName, e.elapsedTime);
  };

  const handleTransitionStart: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log("TransitionStart:", e.propertyName, e.elapsedTime);
  };

  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log("TransitionEnd:", e.propertyName, e.elapsedTime);
  };

  const handleTransitionCancel: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log("TransitionCancel:", e.propertyName, e.elapsedTime);
  };

  return (
    <div
      onTransitionRun={handleTransitionRun}
      onTransitionStart={handleTransitionStart}
      onTransitionEnd={handleTransitionEnd}
      onTransitionCancel={handleTransitionCancel}
      style={{
        transition: "width 1s, height 1s",
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      Transition
    </div>
  );
}

// Transition lifecycle
function TransitionLifecycle() {
  const [state, setState] = React.useState<
    "idle" | "running" | "finished" | "cancelled"
  >("idle");

  const handleTransitionStart: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    setState("running");
    console.log("Transition started:", e.propertyName);
  };

  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    setState("finished");
    console.log("Transition ended:", e.propertyName);
  };

  const handleTransitionCancel: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    setState("cancelled");
    console.log("Transition cancelled:", e.propertyName);
  };

  return (
    <div>
      <div
        onTransitionStart={handleTransitionStart}
        onTransitionEnd={handleTransitionEnd}
        onTransitionCancel={handleTransitionCancel}
        style={{
          transition: "width 1s",
          width: "100px",
          height: "100px",
          backgroundColor: "blue",
        }}
      >
        State: {state}
      </div>
    </div>
  );
}

// Multiple property transitions
function MultipleTransitions() {
  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log(\`\${e.propertyName} transition ended at \${e.elapsedTime}s\`);
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        transition: "width 1s, height 1s, opacity 0.5s",
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      Multiple transitions
    </div>
  );
}

// Transition timing
function TransitionTiming() {
  const handleTransition = (e: React.TransitionEvent<HTMLDivElement>) => {
    console.log(
      \`\${e.type}: \${e.propertyName} - \${e.elapsedTime.toFixed(2)}s\`
    );
  };

  return (
    <div
      onTransitionRun={handleTransition}
      onTransitionStart={handleTransition}
      onTransitionEnd={handleTransition}
      onTransitionCancel={handleTransition}
      style={{
        transition: "width 1s",
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      Timing
    </div>
  );
}

// Wait for transition end
function WaitForTransition() {
  const [width, setWidth] = React.useState(100);

  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.propertyName === "width") {
      console.log("Width transition finished");
      // Do something after width transition
    }
  };

  const toggleWidth = () => {
    setWidth((prev) => (prev === 100 ? 200 : 100));
  };

  return (
    <div>
      <button onClick={toggleWidth}>Toggle Width</button>
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          width: \`\${width}px\`,
          height: "100px",
          backgroundColor: "blue",
          transition: "width 1s",
        }}
      >
        Width: {width}px
      </div>
    </div>
  );
}

// Type-safe transition handler props
interface TransitableProps {
  onTransitionRun?: React.TransitionEventHandler<HTMLDivElement>;
  onTransitionStart?: React.TransitionEventHandler<HTMLDivElement>;
  onTransitionEnd?: React.TransitionEventHandler<HTMLDivElement>;
  onTransitionCancel?: React.TransitionEventHandler<HTMLDivElement>;
}

function TypedTransitable({
  onTransitionRun,
  onTransitionStart,
  onTransitionEnd,
  onTransitionCancel,
}: TransitableProps) {
  return (
    <div
      onTransitionRun={onTransitionRun}
      onTransitionStart={onTransitionStart}
      onTransitionEnd={onTransitionEnd}
      onTransitionCancel={onTransitionCancel}
      style={{ transition: "width 1s" }}
    >
      Transitable
    </div>
  );
}

// Generic transition handler
function useTransitionHandler<T extends HTMLElement>(
  handler: (e: React.TransitionEvent<T>) => void
): React.TransitionEventHandler<T> {
  return handler;
}

// Transition vs Animation
function TransitionVsAnimation() {
  // Transitions: Triggered by property changes (hover, class changes)
  // Animations: Continuous, can loop, keyframe-based

  const [expanded, setExpanded] = React.useState(false);

  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log("Transition ended:", e.propertyName);
  };

  const handleAnimationEnd: React.AnimationEventHandler<HTMLDivElement> = (
    e
  ) => {
    console.log("Animation ended:", e.animationName);
  };

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>Toggle</button>
      
      {/* Transition: triggered by width change */}
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          width: expanded ? "200px" : "100px",
          height: "100px",
          backgroundColor: "blue",
          transition: "width 0.5s",
        }}
      >
        Transition
      </div>

      {/* Animation: continuous, looping */}
      <div
        onAnimationEnd={handleAnimationEnd}
        style={{
          animation: "pulse 2s infinite",
          width: "100px",
          height: "100px",
          backgroundColor: "red",
        }}
      >
        Animation
      </div>
    </div>
  );
}`}
        </CodeBlock>

        <InfoBox type="tip">
          React.TransitionEvent&lt;T&gt; handles CSS transition events.
          TransitionEventHandler&lt;T&gt; types transition event handlers.
          Access propertyName (string), elapsedTime (number), and pseudoElement
          (string) through event properties. Perfect for transition lifecycle
          management, waiting for transitions to complete, and coordinating
          multiple property transitions.
        </InfoBox>
      </Section>
    </div>
  );
}
