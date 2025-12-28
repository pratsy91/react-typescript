import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function HTMLElementsAttributesPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        HTML Elements & Attributes
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React provides typed HTML element types and attribute interfaces for all
        HTML elements. Understanding HTML element types and their specific
        attribute interfaces enables type-safe DOM manipulation and component
        development.
      </p>

      <Section title="1. HTML Element Types">
        <p className="text-gray-700 dark:text-gray-300">
          React exports all HTML element types from the DOM. These types
          represent actual DOM elements and enable type-safe element access and
          manipulation.
        </p>

        <CodeBlock title="HTML Element Types">
          {`// Common HTML element types
// React exports all HTML element types from the DOM

// Structural elements
type DivElement = HTMLDivElement;
type SpanElement = HTMLSpanElement;
type ParagraphElement = HTMLParagraphElement;
type HeadingElement = HTMLHeadingElement;  // HTMLH1Element, HTMLH2Element, etc.
type SectionElement = HTMLSectionElement;
type ArticleElement = HTMLArticleElement;
type AsideElement = HTMLAsideElement;
type NavElement = HTMLNavElement;
type HeaderElement = HTMLHeaderElement;
type FooterElement = HTMLFooterElement;
type MainElement = HTMLMainElement;

// List elements
type UListElement = HTMLUListElement;
type OListElement = HTMLOListElement;
type ListItemElement = HTMLLIElement;
type DListElement = HTMLDListElement;

// Text elements
type AnchorElement = HTMLAnchorElement;
type StrongElement = HTMLStrongElement;
type EmphasisElement = HTMLEmElement;
type CodeElement = HTMLCodeElement;
type PreElement = HTMLPreElement;
type QuoteElement = HTMLQuoteElement;
type BlockquoteElement = HTMLBlockquoteElement;

// Form elements
type FormElement = HTMLFormElement;
type InputElement = HTMLInputElement;
type TextAreaElement = HTMLTextAreaElement;
type ButtonElement = HTMLButtonElement;
type SelectElement = HTMLSelectElement;
type OptionElement = HTMLOptionElement;
type LabelElement = HTMLLabelElement;
type FieldSetElement = HTMLFieldSetElement;
type LegendElement = HTMLLegendElement;

// Table elements
type TableElement = HTMLTableElement;
type TableRowElement = HTMLTableRowElement;
type TableCellElement = HTMLTableCellElement;  // TD
type TableHeaderCellElement = HTMLTableHeaderCellElement;  // TH
type TableSectionElement = HTMLTableSectionElement;  // THEAD, TBODY, TFOOT
type TableCaptionElement = HTMLTableCaptionElement;

// Media elements
type ImageElement = HTMLImageElement;
type VideoElement = HTMLVideoElement;
type AudioElement = HTMLAudioElement;
type SourceElement = HTMLSourceElement;
type TrackElement = HTMLTrackElement;
type CanvasElement = HTMLCanvasElement;
type EmbedElement = HTMLEmbedElement;
type IFrameElement = HTMLIFrameElement;
type ObjectElement = HTMLObjectElement;
type ParamElement = HTMLParamElement;

// Metadata elements
type HeadElement = HTMLHeadElement;
type TitleElement = HTMLTitleElement;
type MetaElement = HTMLMetaElement;
type LinkElement = HTMLLinkElement;
type StyleElement = HTMLStyleElement;
type ScriptElement = HTMLScriptElement;
type BaseElement = HTMLBaseElement;

// Interactive elements
type DetailsElement = HTMLDetailsElement;
type DialogElement = HTMLDialogElement;
type MenuElement = HTMLMenuElement;
type MenuItemElement = HTMLMenuItemElement;
type SummaryElement = HTMLSummaryElement;

// Other elements
type HtmlElement = HTMLHtmlElement;
type BodyElement = HTMLBodyElement;
type BreakElement = HTMLBRElement;
type HorizontalRuleElement = HTMLHRElement;
type DivElement = HTMLDivElement;

// Using HTML element types with refs
function ElementRefs() {
  const divRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const selectRef = React.useRef<HTMLSelectElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  return (
    <div ref={divRef}>
      <input ref={inputRef} />
      <button ref={buttonRef}>Click</button>
      <img ref={imgRef} src="image.jpg" alt="Image" />
      <video ref={videoRef} />
      <canvas ref={canvasRef} />
      <form ref={formRef}>
        <select ref={selectRef}>
          <option>Option</option>
        </select>
        <textarea ref={textareaRef} />
      </form>
    </div>
  );
}

// Using HTML element types with events
function ElementEvents() {
  const handleDivClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const div = e.currentTarget;  // HTMLDivElement (typed)
    console.log(div.tagName);  // "DIV"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;  // HTMLInputElement (typed)
    console.log(input.value);  // string
    console.log(input.type);  // string
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;  // HTMLButtonElement (typed)
    console.log(button.type);  // "button" | "submit" | "reset"
    console.log(button.disabled);  // boolean
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;  // HTMLFormElement (typed)
    console.log(form.action);  // string
    console.log(form.method);  // string
    const formData = new FormData(form);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;  // HTMLImageElement (typed)
    console.log(img.src);  // string
    console.log(img.width);  // number
    console.log(img.height);  // number
  };

  return (
    <div onClick={handleDivClick}>
      <input onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Click</button>
      <form onSubmit={handleFormSubmit}>
        <img onLoad={handleImageLoad} src="image.jpg" alt="Image" />
      </form>
    </div>
  );
}

// Element type extraction
function ElementTypeExtraction() {
  // Extract element type from component
  type ButtonElement = React.ComponentProps<"button">;  // HTMLButtonElement props

  // Extract from ref
  const ref = React.useRef<HTMLDivElement>(null);
  type DivElement = React.ElementRef<typeof ref>;  // HTMLDivElement

  // Extract from event
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    type ButtonElement2 = typeof e.currentTarget;  // HTMLButtonElement
  };

  return null;
}

// Element type narrowing
function ElementTypeNarrowing(e: EventTarget | null) {
  // Narrow to specific element type
  if (e instanceof HTMLInputElement) {
    console.log(e.value);  // Type-safe
    console.log(e.type);  // Type-safe
  }

  if (e instanceof HTMLButtonElement) {
    console.log(e.type);  // Type-safe
    console.log(e.disabled);  // Type-safe
  }

  if (e instanceof HTMLSelectElement) {
    console.log(e.value);  // Type-safe
    console.log(e.options);  // Type-safe
  }

  if (e instanceof HTMLTextAreaElement) {
    console.log(e.value);  // Type-safe
    console.log(e.cols);  // Type-safe
    console.log(e.rows);  // Type-safe
  }

  if (e instanceof HTMLFormElement) {
    console.log(e.action);  // Type-safe
    console.log(e.elements);  // Type-safe
  }

  if (e instanceof HTMLImageElement) {
    console.log(e.src);  // Type-safe
    console.log(e.alt);  // Type-safe
    console.log(e.width);  // Type-safe
    console.log(e.height);  // Type-safe
  }

  if (e instanceof HTMLVideoElement) {
    console.log(e.src);  // Type-safe
    console.log(e.duration);  // Type-safe
    console.log(e.currentTime);  // Type-safe
    e.play();  // Type-safe
    e.pause();  // Type-safe
  }

  if (e instanceof HTMLCanvasElement) {
    const ctx = e.getContext("2d");  // Type-safe
    console.log(e.width);  // Type-safe
    console.log(e.height);  // Type-safe
  }
}

// Generic element type helper
function useElementType<T extends HTMLElement>() {
  return {
    ref: React.useRef<T>(null),
    getElement: () => document.createElement("div") as T,
  };
}

// Usage
function GenericElementUsage() {
  const { ref: inputRef } = useElementType<HTMLInputElement>();
  const { ref: buttonRef } = useElementType<HTMLButtonElement>();

  return (
    <div>
      <input ref={inputRef} />
      <button ref={buttonRef}>Click</button>
    </div>
  );
}

// All HTML element types (partial list)
const HTMLElementTypes = {
  // Structural
  div: HTMLDivElement,
  span: HTMLSpanElement,
  p: HTMLParagraphElement,
  h1: HTMLHeadingElement,
  h2: HTMLHeadingElement,
  h3: HTMLHeadingElement,
  h4: HTMLHeadingElement,
  h5: HTMLHeadingElement,
  h6: HTMLHeadingElement,
  section: HTMLSectionElement,
  article: HTMLArticleElement,
  aside: HTMLAsideElement,
  nav: HTMLNavElement,
  header: HTMLHeaderElement,
  footer: HTMLFooterElement,
  main: HTMLMainElement,
  
  // Lists
  ul: HTMLUListElement,
  ol: HTMLOListElement,
  li: HTMLLIElement,
  dl: HTMLDListElement,
  dt: HTMLElement,
  dd: HTMLElement,
  
  // Forms
  form: HTMLFormElement,
  input: HTMLInputElement,
  textarea: HTMLTextAreaElement,
  button: HTMLButtonElement,
  select: HTMLSelectElement,
  option: HTMLOptionElement,
  label: HTMLLabelElement,
  fieldset: HTMLFieldSetElement,
  legend: HTMLLegendElement,
  
  // Tables
  table: HTMLTableElement,
  thead: HTMLTableSectionElement,
  tbody: HTMLTableSectionElement,
  tfoot: HTMLTableSectionElement,
  tr: HTMLTableRowElement,
  td: HTMLTableCellElement,
  th: HTMLTableHeaderCellElement,
  caption: HTMLTableCaptionElement,
  
  // Media
  img: HTMLImageElement,
  video: HTMLVideoElement,
  audio: HTMLAudioElement,
  canvas: HTMLCanvasElement,
  iframe: HTMLIFrameElement,
  
  // Links
  a: HTMLAnchorElement,
  
  // Text
  strong: HTMLStrongElement,
  em: HTMLEmElement,
  code: HTMLCodeElement,
  pre: HTMLPreElement,
  blockquote: HTMLBlockquoteElement,
  q: HTMLQuoteElement,
  
  // Interactive
  details: HTMLDetailsElement,
  summary: HTMLSummaryElement,
  dialog: HTMLDialogElement,
  menu: HTMLMenuElement,
  menuitem: HTMLMenuItemElement,
  
  // Other
  br: HTMLBRElement,
  hr: HTMLHRElement,
  script: HTMLScriptElement,
  style: HTMLStyleElement,
  link: HTMLLinkElement,
  meta: HTMLMetaElement,
  title: HTMLTitleElement,
  head: HTMLHeadElement,
  html: HTMLHtmlElement,
  body: HTMLBodyElement,
} as const;`}
        </CodeBlock>

        <InfoBox type="info">
          React exports all HTML element types from the DOM (e.g.,
          HTMLDivElement, HTMLInputElement, HTMLButtonElement). Use these types
          with refs, events, and type narrowing. Each element type has specific
          properties and methods available. Use instanceof for type narrowing
          when working with EventTarget.
        </InfoBox>
      </Section>

      <Section title="2. HTML Attribute Types">
        <p className="text-gray-700 dark:text-gray-300">
          React provides typed attribute interfaces for all HTML elements.
          React.HTMLAttributes provides base attributes, while specific
          interfaces (ButtonHTMLAttributes, InputHTMLAttributes, etc.) provide
          element-specific attributes.
        </p>

        <CodeBlock title="HTML Attribute Types">
          {`// Base HTMLAttributes
interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  customProp?: string;
}

function TypedDiv(props: DivProps) {
  return <div {...props} />;
}

// React.HTMLAttributes - base attributes for all HTML elements
type BaseAttributes = React.HTMLAttributes<HTMLElement>;

// Common HTML attributes
function HTMLAttributesExample() {
  const props: React.HTMLAttributes<HTMLDivElement> = {
    id: "myDiv",
    className: "container",
    style: { color: "red" },
    onClick: (e) => console.log("clicked"),
    onMouseEnter: (e) => console.log("enter"),
    dataTestId: "test",  // data-* attributes
    role: "button",
    ariaLabel: "Click me",
    title: "Tooltip",
    hidden: false,
    tabIndex: 0,
    contentEditable: false,
    spellCheck: false,
    draggable: false,
    translate: "yes",
    dir: "ltr",
    lang: "en",
    accessKey: "k",
    // All standard HTML attributes...
  };

  return <div {...props}>Content</div>;
}

// Element-specific attribute types

// React.ButtonHTMLAttributes
type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>;

function ButtonExample() {
  const props: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "button",  // "button" | "submit" | "reset"
    disabled: false,
    form: "formId",
    formAction: "/submit",
    formMethod: "post",
    formEncType: "application/x-www-form-urlencoded",
    formNoValidate: false,
    formTarget: "_self",
    name: "submit",
    value: "Click",
    autoFocus: false,
    // Plus all HTMLAttributes
  };

  return <button {...props}>Click</button>;
}

// React.InputHTMLAttributes
type InputAttributes = React.InputHTMLAttributes<HTMLInputElement>;

function InputExample() {
  const props: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "text",  // All input types
    value: "text",
    defaultValue: "default",
    placeholder: "Enter text",
    disabled: false,
    readOnly: false,
    required: false,
    autoComplete: "on",
    autoFocus: false,
    maxLength: 100,
    minLength: 1,
    pattern: "[0-9]+",
    accept: "image/*",
    multiple: false,
    checked: false,  // For checkbox/radio
    defaultChecked: false,
    form: "formId",
    formAction: "/submit",
    formMethod: "post",
    formNoValidate: false,
    formTarget: "_self",
    list: "datalistId",
    step: 1,
    min: 0,
    max: 100,
    name: "input",
    size: 20,
    src: "image.jpg",  // For image type
    alt: "Image",  // For image type
    width: 100,  // For image type
    height: 100,  // For image type
    capture: "user",  // For file type
    // Plus all HTMLAttributes
  };

  return <input {...props} />;
}

// React.TextareaHTMLAttributes
type TextareaAttributes = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

function TextareaExample() {
  const props: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
    value: "text",
    defaultValue: "default",
    placeholder: "Enter text",
    rows: 5,
    cols: 50,
    disabled: false,
    readOnly: false,
    required: false,
    autoComplete: "on",
    autoFocus: false,
    maxLength: 1000,
    minLength: 10,
    wrap: "soft",  // "soft" | "hard" | "off"
    form: "formId",
    name: "textarea",
    // Plus all HTMLAttributes
  };

  return <textarea {...props} />;
}

// React.SelectHTMLAttributes
type SelectAttributes = React.SelectHTMLAttributes<HTMLSelectElement>;

function SelectExample() {
  const props: React.SelectHTMLAttributes<HTMLSelectElement> = {
    value: "option1",
    defaultValue: "option1",
    disabled: false,
    required: false,
    autoFocus: false,
    multiple: false,
    size: 1,
    form: "formId",
    name: "select",
    // Plus all HTMLAttributes
  };

  return (
    <select {...props}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
  );
}

// React.FormHTMLAttributes
type FormAttributes = React.FormHTMLAttributes<HTMLFormElement>;

function FormExample() {
  const props: React.FormHTMLAttributes<HTMLFormElement> = {
    action: "/submit",
    method: "post",
    encType: "application/x-www-form-urlencoded",
    target: "_self",
    noValidate: false,
    acceptCharset: "UTF-8",
    autoComplete: "on",
    name: "form",
    // Plus all HTMLAttributes
  };

  return <form {...props}>Form content</form>;
}

// React.AnchorHTMLAttributes
type AnchorAttributes = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function AnchorExample() {
  const props: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
    href: "/page",
    target: "_blank",
    rel: "noopener noreferrer",
    download: "file.pdf",
    hreflang: "en",
    media: "screen",
    ping: "/track",
    referrerPolicy: "no-referrer",
    type: "text/html",
    // Plus all HTMLAttributes
  };

  return <a {...props}>Link</a>;
}

// React.ImgHTMLAttributes
type ImgAttributes = React.ImgHTMLAttributes<HTMLImageElement>;

function ImgExample() {
  const props: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: "image.jpg",
    srcSet: "image.jpg 1x, image@2x.jpg 2x",
    sizes: "(max-width: 600px) 100vw, 50vw",
    alt: "Description",
    width: 100,
    height: 100,
    loading: "lazy",  // "lazy" | "eager"
    decoding: "async",  // "async" | "sync" | "auto"
    crossOrigin: "anonymous",  // "anonymous" | "use-credentials"
    useMap: "mapName",
    referrerPolicy: "no-referrer",
    // Plus all HTMLAttributes
  };

  return <img {...props} />;
}

// React.VideoHTMLAttributes
type VideoAttributes = React.VideoHTMLAttributes<HTMLVideoElement>;

function VideoExample() {
  const props: React.VideoHTMLAttributes<HTMLVideoElement> = {
    src: "video.mp4",
    poster: "poster.jpg",
    preload: "metadata",  // "none" | "metadata" | "auto"
    autoplay: false,
    loop: false,
    muted: false,
    controls: true,
    playsInline: false,
    width: 640,
    height: 360,
    crossOrigin: "anonymous",
    // Plus all HTMLAttributes
  };

  return <video {...props} />;
}

// React.AudioHTMLAttributes
type AudioAttributes = React.AudioHTMLAttributes<HTMLAudioElement>;

function AudioExample() {
  const props: React.AudioHTMLAttributes<HTMLAudioElement> = {
    src: "audio.mp3",
    preload: "metadata",
    autoplay: false,
    loop: false,
    muted: false,
    controls: true,
    crossOrigin: "anonymous",
    // Plus all HTMLAttributes
  };

  return <audio {...props} />;
}

// React.TableHTMLAttributes
type TableAttributes = React.TableHTMLAttributes<HTMLTableElement>;

function TableExample() {
  const props: React.TableHTMLAttributes<HTMLTableElement> = {
    border: 1,
    cellPadding: 5,
    cellSpacing: 0,
    width: "100%",
    // Plus all HTMLAttributes
  };

  return (
    <table {...props}>
      <tbody>
        <tr>
          <td>Cell</td>
        </tr>
      </tbody>
    </table>
  );
}

// React.TdHTMLAttributes
type TdAttributes = React.TdHTMLAttributes<HTMLTableCellElement>;

function TdExample() {
  const props: React.TdHTMLAttributes<HTMLTableCellElement> = {
    colSpan: 2,
    rowSpan: 1,
    headers: "header1 header2",
    align: "left",  // Deprecated but still available
    valign: "top",  // Deprecated but still available
    // Plus all HTMLAttributes
  };

  return <td {...props}>Cell</td>;
}

// React.ThHTMLAttributes
type ThAttributes = React.ThHTMLAttributes<HTMLTableHeaderCellElement>;

function ThExample() {
  const props: React.ThHTMLAttributes<HTMLTableHeaderCellElement> = {
    colSpan: 2,
    rowSpan: 1,
    scope: "col",  // "col" | "row" | "colgroup" | "rowgroup"
    abbr: "Column Header",
    // Plus all HTMLAttributes
  };

  return <th {...props}>Header</th>;
}

// React.LabelHTMLAttributes
type LabelAttributes = React.LabelHTMLAttributes<HTMLLabelElement>;

function LabelExample() {
  const props: React.LabelHTMLAttributes<HTMLLabelElement> = {
    htmlFor: "inputId",  // React uses htmlFor instead of for
    form: "formId",
    // Plus all HTMLAttributes
  };

  return <label {...props}>Label</label>;
}

// React.IFrameHTMLAttributes
type IFrameAttributes = React.IFrameHTMLAttributes<HTMLIFrameElement>;

function IFrameExample() {
  const props: React.IFrameHTMLAttributes<HTMLIFrameElement> = {
    src: "https://example.com",
    srcDoc: "<html>...</html>",
    width: 800,
    height: 600,
    name: "iframe",
    sandbox: "allow-scripts",
    allow: "camera; microphone",
    allowFullScreen: true,  // React uses camelCase
    referrerPolicy: "no-referrer",
    loading: "lazy",
    // Plus all HTMLAttributes
  };

  return <iframe {...props} />;
}

// React.CanvasHTMLAttributes
type CanvasAttributes = React.CanvasHTMLAttributes<HTMLCanvasElement>;

function CanvasExample() {
  const props: React.CanvasHTMLAttributes<HTMLCanvasElement> = {
    width: 800,
    height: 600,
    // Plus all HTMLAttributes
  };

  return <canvas {...props} />;
}

// Extending HTML attributes
interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

function CustomButton({ variant, size, ...props }: CustomButtonProps) {
  const className = \`btn btn-\${variant} btn-\${size}\`;
  return <button {...props} className={className} />;
}

// Omit specific attributes
interface InputWithoutValue
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
  // value is omitted
  defaultValue: string;  // Use defaultValue instead
}

// Pick specific attributes
type InputValueAttributes = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "type"
>;

// Intersection of attributes
type InputAndButton = React.InputHTMLAttributes<HTMLInputElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;  // Combined attributes

// Generic attribute component
interface GenericHTMLProps<T extends HTMLElement>
  extends React.HTMLAttributes<T> {
  as?: React.ElementType;
}

function GenericHTML<T extends HTMLElement>({
  as,
  ...props
}: GenericHTMLProps<T>) {
  const Component = as || "div";
  return <Component {...props} />;
}

// Usage
function GenericUsage() {
  return (
    <GenericHTML<HTMLDivElement> as="div" id="test">
      Content
    </GenericHTML>
  );
}`}
        </CodeBlock>

        <InfoBox type="important">
          React provides typed attribute interfaces for all HTML elements:
          React.HTMLAttributes for base attributes, and specific interfaces
          (ButtonHTMLAttributes, InputHTMLAttributes, etc.) for element-specific
          attributes. Extend these interfaces for custom props. Use Omit/Pick to
          modify attribute types. All attributes are fully typed with
          TypeScript.
        </InfoBox>
      </Section>
    </div>
  );
}
