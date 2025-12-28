import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function SVGTypesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        SVG Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React provides typed SVG element types and React.SVGAttributes for SVG
        elements. Understanding SVG types enables type-safe SVG rendering and
        manipulation.
      </p>

      <Section title="1. SVG Element Types">
        <p className="text-gray-700 dark:text-gray-300">
          React exports all SVG element types from the DOM. These types
          represent SVG DOM elements and enable type-safe SVG manipulation.
        </p>

        <CodeBlock title="SVG Element Types">
          {`// SVG element types
// React exports all SVG element types from the DOM

// Root SVG element
type SVGSVGElement = SVGSVGElement;

// Structural elements
type SVGGElement = SVGGElement;  // Group
type SVGDefsElement = SVGDefsElement;  // Definitions
type SVGUseElement = SVGUseElement;  // Use/reference
type SVGSymbolElement = SVGSymbolElement;  // Symbol
type SVGMarkerElement = SVGMarkerElement;  // Marker

// Shape elements
type SVGRectElement = SVGRectElement;  // Rectangle
type SVGCircleElement = SVGCircleElement;  // Circle
type SVGEllipseElement = SVGEllipseElement;  // Ellipse
type SVGLineElement = SVGLineElement;  // Line
type SVGPolylineElement = SVGPolylineElement;  // Polyline
type SVGPolygonElement = SVGPolygonElement;  // Polygon
type SVGPathElement = SVGPathElement;  // Path

// Text elements
type SVGTextElement = SVGTextElement;  // Text
type SVGTSpanElement = SVGTSpanElement;  // Text span
type SVGTextPathElement = SVGTextPathElement;  // Text path

// Image and foreign object
type SVGImageElement = SVGImageElement;  // Image
type SVGForeignObjectElement = SVGForeignObjectElement;  // Foreign object

// Gradient elements
type SVGLinearGradientElement = SVGLinearGradientElement;  // Linear gradient
type SVGRadialGradientElement = SVGRadialGradientElement;  // Radial gradient

// Pattern elements
type SVGPatternElement = SVGPatternElement;  // Pattern

// Clip and mask
type SVGClipPathElement = SVGClipPathElement;  // Clip path
type SVGMaskElement = SVGMaskElement;  // Mask

// Filter elements
type SVGFilterElement = SVGFilterElement;  // Filter
type SVGFEBlendElement = SVGFEBlendElement;  // Blend
type SVGFEColorMatrixElement = SVGFEColorMatrixElement;  // Color matrix
type SVGFEComponentTransferElement = SVGFEComponentTransferElement;
type SVGFECompositeElement = SVGFECompositeElement;  // Composite
type SVGFEConvolveMatrixElement = SVGFEConvolveMatrixElement;
type SVGFEDiffuseLightingElement = SVGFEDiffuseLightingElement;
type SVGFEDisplacementMapElement = SVGFEDisplacementMapElement;
type SVGFEDistantLightElement = SVGFEDistantLightElement;
type SVGFEDropShadowElement = SVGFEDropShadowElement;  // Drop shadow
type SVGFEFloodElement = SVGFEFloodElement;  // Flood
type SVGFEFuncAElement = SVGFEFuncAElement;  // Function A
type SVGFEFuncRElement = SVGFEFuncRElement;  // Function R
type SVGFEFuncGElement = SVGFEFuncGElement;  // Function G
type SVGFEFuncBElement = SVGFEFuncBElement;  // Function B
type SVGFEGaussianBlurElement = SVGFEGaussianBlurElement;  // Gaussian blur
type SVGFEImageElement = SVGFEImageElement;  // Image
type SVGFEMergeElement = SVGFEMergeElement;  // Merge
type SVGFEMergeNodeElement = SVGFEMergeNodeElement;  // Merge node
type SVGFEMorphologyElement = SVGFEMorphologyElement;  // Morphology
type SVGFEOffsetElement = SVGFEOffsetElement;  // Offset
type SVGFEPointLightElement = SVGFEPointLightElement;  // Point light
type SVGFESpecularLightingElement = SVGFESpecularLightingElement;
type SVGFESpotLightElement = SVGFESpotLightElement;  // Spot light
type SVGFETileElement = SVGFETileElement;  // Tile
type SVGFETurbulenceElement = SVGFETurbulenceElement;  // Turbulence

// Animation elements
type SVGAnimateElement = SVGAnimateElement;  // Animate
type SVGAnimateMotionElement = SVGAnimateMotionElement;  // Animate motion
type SVGAnimateTransformElement = SVGAnimateTransformElement;  // Animate transform
type SVGSetElement = SVGSetElement;  // Set

// Using SVG element types with refs
function SVGRefs() {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const rectRef = React.useRef<SVGRectElement>(null);
  const circleRef = React.useRef<SVGCircleElement>(null);
  const pathRef = React.useRef<SVGPathElement>(null);
  const textRef = React.useRef<SVGTextElement>(null);
  const gRef = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (svgRef.current) {
      console.log("SVG viewBox:", svgRef.current.viewBox);
    }
    if (rectRef.current) {
      console.log("Rect width:", rectRef.current.width.baseVal.value);
    }
    if (circleRef.current) {
      console.log("Circle radius:", circleRef.current.r.baseVal.value);
    }
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 100 100">
      <g ref={gRef}>
        <rect ref={rectRef} x="10" y="10" width="20" height="20" />
        <circle ref={circleRef} cx="50" cy="50" r="10" />
        <path ref={pathRef} d="M 0 0 L 10 10" />
        <text ref={textRef} x="10" y="90">
          Text
        </text>
      </g>
    </svg>
  );
}

// Using SVG element types with events
function SVGEvents() {
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;  // SVGSVGElement (typed)
    console.log("SVG clicked");
  };

  const handleRectClick = (e: React.MouseEvent<SVGRectElement>) => {
    const rect = e.currentTarget;  // SVGRectElement (typed)
    console.log("Rect clicked");
  };

  const handleCircleClick = (e: React.MouseEvent<SVGCircleElement>) => {
    const circle = e.currentTarget;  // SVGCircleElement (typed)
    console.log("Circle clicked");
  };

  const handlePathClick = (e: React.MouseEvent<SVGPathElement>) => {
    const path = e.currentTarget;  // SVGPathElement (typed)
    console.log("Path clicked");
  };

  return (
    <svg onClick={handleSvgClick} viewBox="0 0 100 100">
      <rect onClick={handleRectClick} x="10" y="10" width="20" height="20" />
      <circle onClick={handleCircleClick} cx="50" cy="50" r="10" />
      <path onClick={handlePathClick} d="M 0 0 L 10 10" />
    </svg>
  );
}

// SVG element type narrowing
function SVGTypeNarrowing(e: EventTarget | null) {
  if (e instanceof SVGSVGElement) {
    console.log(e.viewBox.baseVal);  // Type-safe
    console.log(e.width.baseVal.value);  // Type-safe
    console.log(e.height.baseVal.value);  // Type-safe
  }

  if (e instanceof SVGRectElement) {
    console.log(e.x.baseVal.value);  // Type-safe
    console.log(e.y.baseVal.value);  // Type-safe
    console.log(e.width.baseVal.value);  // Type-safe
    console.log(e.height.baseVal.value);  // Type-safe
  }

  if (e instanceof SVGCircleElement) {
    console.log(e.cx.baseVal.value);  // Type-safe
    console.log(e.cy.baseVal.value);  // Type-safe
    console.log(e.r.baseVal.value);  // Type-safe
  }

  if (e instanceof SVGEllipseElement) {
    console.log(e.cx.baseVal.value);  // Type-safe
    console.log(e.cy.baseVal.value);  // Type-safe
    console.log(e.rx.baseVal.value);  // Type-safe
    console.log(e.ry.baseVal.value);  // Type-safe
  }

  if (e instanceof SVGLineElement) {
    console.log(e.x1.baseVal.value);  // Type-safe
    console.log(e.y1.baseVal.value);  // Type-safe
    console.log(e.x2.baseVal.value);  // Type-safe
    console.log(e.y2.baseVal.value);  // Type-safe
  }

  if (e instanceof SVGPathElement) {
    console.log(e.pathLength.baseVal);  // Type-safe
    // Path methods
    const point = e.getPointAtLength(10);  // Type-safe
  }

  if (e instanceof SVGTextElement) {
    console.log(e.x.baseVal);  // Type-safe
    console.log(e.y.baseVal);  // Type-safe
  }

  if (e instanceof SVGImageElement) {
    console.log(e.x.baseVal.value);  // Type-safe
    console.log(e.y.baseVal.value);  // Type-safe
    console.log(e.width.baseVal.value);  // Type-safe
    console.log(e.height.baseVal.value);  // Type-safe
    console.log(e.href.baseVal);  // Type-safe
  }

  if (e instanceof SVGLinearGradientElement) {
    console.log(e.x1.baseVal.value);  // Type-safe
    console.log(e.y1.baseVal.value);  // Type-safe
    console.log(e.x2.baseVal.value);  // Type-safe
    console.log(e.y2.baseVal.value);  // Type-safe
  }

  if (e instanceof SVGRadialGradientElement) {
    console.log(e.cx.baseVal.value);  // Type-safe
    console.log(e.cy.baseVal.value);  // Type-safe
    console.log(e.r.baseVal.value);  // Type-safe
  }
}`}
        </CodeBlock>

        <InfoBox type="info">
          React exports all SVG element types from the DOM (e.g., SVGSVGElement,
          SVGRectElement, SVGCircleElement). Use these types with refs and
          events. SVG elements use SVGAnimatedLength/Number for numeric
          attributes (e.g., rect.width.baseVal.value). Use instanceof for type
          narrowing.
        </InfoBox>
      </Section>

      <Section title="2. React.SVGAttributes">
        <p className="text-gray-700 dark:text-gray-300">
          React.SVGAttributes provides typed attributes for all SVG elements.
          Understanding SVG attributes enables type-safe SVG rendering and
          styling.
        </p>

        <CodeBlock title="React.SVGAttributes">
          {`// Base SVGAttributes
// React.SVGAttributes provides typed attributes for all SVG elements

// React.SVGAttributes<SVGSVGElement>
type SVGSVGAttributes = React.SVGAttributes<SVGSVGElement>;

// Common SVG attributes
function SVGAttributesExample() {
  const svgProps: React.SVGAttributes<SVGSVGElement> = {
    // Presentation attributes
    fill: "blue",
    fillOpacity: 1,
    fillRule: "nonzero",  // "nonzero" | "evenodd"
    stroke: "black",
    strokeWidth: 2,
    strokeOpacity: 1,
    strokeLinecap: "round",  // "butt" | "round" | "square"
    strokeLinejoin: "miter",  // "miter" | "round" | "bevel"
    strokeMiterlimit: 4,
    strokeDasharray: "5,5",
    strokeDashoffset: 0,
    
    // Color
    color: "red",
    opacity: 1,
    
    // Transform
    transform: "translate(10, 20)",
    transformOrigin: "center",
    
    // Position and size
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    viewBox: "0 0 100 100",
    preserveAspectRatio: "xMidYMid meet",
    
    // Text
    fontSize: 12,
    fontFamily: "Arial",
    fontWeight: "normal",
    fontStyle: "normal",
    textAnchor: "start",  // "start" | "middle" | "end"
    dominantBaseline: "auto",
    
    // Visibility
    visibility: "visible",  // "visible" | "hidden" | "collapse"
    display: "block",
    overflow: "visible",  // "visible" | "hidden" | "scroll" | "auto"
    
    // Pointer events
    pointerEvents: "auto",  // "auto" | "none" | etc.
    cursor: "pointer",
    
    // Event handlers (all mouse, keyboard, etc.)
    onClick: (e) => console.log("clicked"),
    onMouseEnter: (e) => console.log("enter"),
    
    // Standard HTML attributes (most work in SVG context)
    id: "svg1",
    className: "svg-class",
    style: { color: "red" },
    role: "img",
    ariaLabel: "SVG description",
  };

  return <svg {...svgProps}>SVG content</svg>;
}

// SVG-specific element attributes

// React.SVGProps<SVGRectElement>
function RectExample() {
  const rectProps: React.SVGProps<SVGRectElement> = {
    x: 10,
    y: 10,
    width: 100,
    height: 50,
    rx: 5,  // Border radius X
    ry: 5,  // Border radius Y
    fill: "blue",
    stroke: "black",
    strokeWidth: 2,
  };

  return <rect {...rectProps} />;
}

// React.SVGProps<SVGCircleElement>
function CircleExample() {
  const circleProps: React.SVGProps<SVGCircleElement> = {
    cx: 50,  // Center X
    cy: 50,  // Center Y
    r: 25,  // Radius
    fill: "red",
    stroke: "black",
    strokeWidth: 2,
  };

  return <circle {...circleProps} />;
}

// React.SVGProps<SVGEllipseElement>
function EllipseExample() {
  const ellipseProps: React.SVGProps<SVGEllipseElement> = {
    cx: 50,
    cy: 50,
    rx: 40,  // Radius X
    ry: 20,  // Radius Y
    fill: "green",
  };

  return <ellipse {...ellipseProps} />;
}

// React.SVGProps<SVGLineElement>
function LineExample() {
  const lineProps: React.SVGProps<SVGLineElement> = {
    x1: 0,
    y1: 0,
    x2: 100,
    y2: 100,
    stroke: "black",
    strokeWidth: 2,
  };

  return <line {...lineProps} />;
}

// React.SVGProps<SVGPathElement>
function PathExample() {
  const pathProps: React.SVGProps<SVGPathElement> = {
    d: "M 0 0 L 10 10 Q 20 20 30 30 Z",  // Path data
    fill: "none",
    stroke: "black",
    strokeWidth: 2,
    pathLength: 100,
  };

  return <path {...pathProps} />;
}

// React.SVGProps<SVGPolygonElement>
function PolygonExample() {
  const polygonProps: React.SVGProps<SVGPolygonElement> = {
    points: "10,10 20,10 20,20 10,20",  // Space or comma-separated coordinates
    fill: "blue",
    stroke: "black",
  };

  return <polygon {...polygonProps} />;
}

// React.SVGProps<SVGPolylineElement>
function PolylineExample() {
  const polylineProps: React.SVGProps<SVGPolylineElement> = {
    points: "10,10 20,10 20,20 10,20",
    fill: "none",
    stroke: "black",
    strokeWidth: 2,
  };

  return <polyline {...polylineProps} />;
}

// React.SVGProps<SVGTextElement>
function TextExample() {
  const textProps: React.SVGProps<SVGTextElement> = {
    x: 10,
    y: 20,
    fontSize: 16,
    fontFamily: "Arial",
    fill: "black",
    textAnchor: "start",
    dominantBaseline: "auto",
  };

  return <text {...textProps}>SVG Text</text>;
}

// React.SVGProps<SVGImageElement>
function ImageExample() {
  const imageProps: React.SVGProps<SVGImageElement> = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    href: "image.jpg",  // SVG uses href, not src
    preserveAspectRatio: "xMidYMid meet",
  };

  return <image {...imageProps} />;
}

// React.SVGProps<SVGGElement>
function GroupExample() {
  const groupProps: React.SVGProps<SVGGElement> = {
    transform: "translate(10, 20)",
    fill: "blue",  // Applied to all children
    opacity: 0.8,
  };

  return (
    <g {...groupProps}>
      <rect x="0" y="0" width="10" height="10" />
      <circle cx="5" cy="5" r="3" />
    </g>
  );
}

// React.SVGProps<SVGUseElement>
function UseExample() {
  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <circle id="circle" cx="10" cy="10" r="5" fill="blue" />
      </defs>
      <use href="#circle" x="20" y="20" />  {/* Use referenced element */}
    </svg>
  );
}

// React.SVGProps<SVGLinearGradientElement>
function LinearGradientExample() {
  const gradientProps: React.SVGProps<SVGLinearGradientElement> = {
    id: "gradient1",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "0%",
    gradientUnits: "userSpaceOnUse",  // "userSpaceOnUse" | "objectBoundingBox"
  };

  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <linearGradient {...gradientProps}>
          <stop offset="0%" stopColor="red" />
          <stop offset="100%" stopColor="blue" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="80" height="80" fill="url(#gradient1)" />
    </svg>
  );
}

// React.SVGProps<SVGRadialGradientElement>
function RadialGradientExample() {
  const gradientProps: React.SVGProps<SVGRadialGradientElement> = {
    id: "radialGradient1",
    cx: "50%",
    cy: "50%",
    r: "50%",
    gradientUnits: "objectBoundingBox",
  };

  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <radialGradient {...gradientProps}>
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#radialGradient1)" />
    </svg>
  );
}

// React.SVGProps<SVGPatternElement>
function PatternExample() {
  const patternProps: React.SVGProps<SVGPatternElement> = {
    id: "pattern1",
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    patternUnits: "userSpaceOnUse",
  };

  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <pattern {...patternProps}>
          <rect width="20" height="20" fill="blue" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100" height="100" fill="url(#pattern1)" />
    </svg>
  );
}

// React.SVGProps<SVGClipPathElement>
function ClipPathExample() {
  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <clipPath id="clip1">
          <circle cx="50" cy="50" r="40" />
        </clipPath>
      </defs>
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="blue"
        clipPath="url(#clip1)"
      />
    </svg>
  );
}

// React.SVGProps<SVGMaskElement>
function MaskExample() {
  return (
    <svg viewBox="0 0 100 100">
      <defs>
        <mask id="mask1">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <circle cx="50" cy="50" r="30" fill="black" />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="blue"
        mask="url(#mask1)"
      />
    </svg>
  );
}

// Extending SVG attributes
interface CustomSVGProps extends React.SVGProps<SVGSVGElement> {
  customProp?: string;
}

function CustomSVG(props: CustomSVGProps) {
  return <svg {...props} />;
}

// Type-safe SVG component
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

function Icon({ size = 24, color = "currentColor", ...props }: IconProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
    >
      {props.children}
    </svg>
  );
}

// Usage
function IconUsage() {
  return (
    <Icon size={32} color="blue">
      <path d="M 0 0 L 12 12" />
    </Icon>
  );
}`}
        </CodeBlock>

        <InfoBox type="important">
          React.SVGAttributes provides typed attributes for all SVG elements.
          Use React.SVGProps&lt;T&gt; for specific SVG elements. SVG attributes
          use string/number values (not baseVal). Common attributes include
          fill, stroke, transform, x, y, width, height, viewBox, and
          presentation attributes. SVG elements support all standard React event
          handlers.
        </InfoBox>
      </Section>
    </div>
  );
}
