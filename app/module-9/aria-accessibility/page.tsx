import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ARIAAccessibilityPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        ARIA & Accessibility Types
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        React provides React.AriaAttributes and role types for accessibility.
        Understanding ARIA attributes enables accessible component development
        with full type safety.
      </p>

      <Section title="1. React.AriaAttributes">
        <p className="text-gray-700 dark:text-gray-300">
          React.AriaAttributes provides typed ARIA attributes for accessibility.
          All aria-* props are fully typed with TypeScript, enabling type-safe
          accessible component development.
        </p>

        <CodeBlock title="React.AriaAttributes">
          {`// React.AriaAttributes provides all ARIA attributes
type AriaAttributes = React.AriaAttributes;

// Common ARIA attributes
function AriaAttributesExample() {
  const props: React.AriaAttributes = {
    // ARIA properties
    "aria-label": "Button label",
    "aria-labelledby": "labelId",
    "aria-describedby": "descriptionId",
    "aria-controls": "controlledElementId",
    "aria-owns": "ownedElementId",
    "aria-flowto": "nextElementId",
    
    // ARIA states
    "aria-disabled": false,
    "aria-hidden": false,
    "aria-expanded": false,
    "aria-selected": false,
    "aria-checked": false,  // "true" | "false" | "mixed"
    "aria-pressed": false,  // "true" | "false" | "mixed"
    "aria-readonly": false,
    "aria-required": false,
    "aria-invalid": false,  // "true" | "false" | "grammar" | "spelling"
    "aria-busy": false,
    "aria-live": "off",  // "off" | "polite" | "assertive"
    "aria-relevant": "additions text",  // "additions" | "removals" | "text" | "all"
    "aria-atomic": false,
    "aria-autocomplete": "none",  // "none" | "inline" | "list" | "both"
    "aria-haspopup": false,  // "true" | "false" | "menu" | "listbox" | "tree" | "grid" | "dialog"
    "aria-modal": false,
    "aria-multiline": false,
    "aria-multiselectable": false,
    "aria-orientation": "horizontal",  // "horizontal" | "vertical" | undefined
    "aria-sort": "none",  // "none" | "ascending" | "descending" | "other"
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": 50,
    "aria-valuetext": "50 percent",
    "aria-current": false,  // "true" | "false" | "page" | "step" | "location" | "date" | "time"
    "aria-placeholder": "Enter text",
    "aria-level": 1,
    "aria-posinset": 1,
    "aria-setsize": 5,
    "aria-colcount": 5,
    "aria-colindex": 1,
    "aria-colspan": 1,
    "aria-rowcount": 10,
    "aria-rowindex": 1,
    "aria-rowspan": 1,
    
    // ARIA attributes (string values)
    "aria-details": "detailsId",
    "aria-errormessage": "errorId",
    "aria-keyshortcuts": "Ctrl+S",
    "aria-roledescription": "Custom role description",
  };

  return <div {...props}>Content</div>;
}

// ARIA attributes with HTML elements
function ARIAWithHTML() {
  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> & React.AriaAttributes = {
    "aria-label": "Close dialog",
    "aria-pressed": false,
    "aria-expanded": false,
    "aria-controls": "dialog",
    onClick: () => {},
  };

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> & React.AriaAttributes = {
    "aria-label": "Search",
    "aria-describedby": "search-help",
    "aria-required": true,
    "aria-invalid": false,
    "aria-autocomplete": "list",
    type: "text",
  };

  const divProps: React.HTMLAttributes<HTMLDivElement> & React.AriaAttributes = {
    role: "button",
    "aria-label": "Clickable div",
    "aria-pressed": false,
    tabIndex: 0,
  };

  return (
    <div>
      <button {...buttonProps}>Close</button>
      <input {...inputProps} />
      <div {...divProps}>Click me</div>
    </div>
  );
}

// ARIA attributes are included in HTMLAttributes
function AriaInHTMLAttributes() {
  // ARIA attributes are automatically included
  const props: React.HTMLAttributes<HTMLDivElement> = {
    "aria-label": "Label",  // ✓ Available
    "aria-hidden": false,  // ✓ Available
    "aria-expanded": true,  // ✓ Available
    role: "button",  // ✓ Available
    id: "test",
    className: "class",
  };

  return <div {...props}>Content</div>;
}

// Type-safe ARIA component
interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string;
  ariaPressed?: boolean | "mixed";
  ariaExpanded?: boolean;
  ariaControls?: string;
}

function AccessibleButton({
  ariaLabel,
  ariaPressed,
  ariaExpanded,
  ariaControls,
  ...props
}: AccessibleButtonProps) {
  return (
    <button
      {...props}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    />
  );
}

// ARIA live regions
function AriaLiveRegion() {
  const [message, setMessage] = React.useState("");

  return (
    <div>
      <button onClick={() => setMessage("Action completed")}>
        Trigger
      </button>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </div>
    </div>
  );
}

// ARIA dialog
function AriaDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      {isOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <h2 id="dialog-title">Dialog Title</h2>
          <p id="dialog-description">Dialog description</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

// ARIA tabs
function AriaTabs() {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = ["Tab 1", "Tab 2", "Tab 3"];

  return (
    <div role="tablist" aria-label="Tabs">
      {tabs.map((tab, index) => (
        <button
          key={index}
          role="tab"
          aria-selected={activeTab === index}
          aria-controls={\`tabpanel-\${index}\`}
          onClick={() => setActiveTab(index)}
        >
          {tab}
        </button>
      ))}
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={\`tabpanel-\${index}\`}
          aria-labelledby={\`tab-\${index}\`}
          hidden={activeTab !== index}
        >
          {tab} content
        </div>
      ))}
    </div>
  );
}

// ARIA form
function AriaForm() {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        aria-required="true"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      {errors.email && (
        <span id="email-error" role="alert" aria-live="polite">
          {errors.email}
        </span>
      )}
    </form>
  );
}

// ARIA menu
function AriaMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      {isOpen && (
        <ul role="menu" id="menu" aria-label="Actions">
          <li role="menuitem" tabIndex={0}>Item 1</li>
          <li role="menuitem" tabIndex={0}>Item 2</li>
          <li role="menuitem" tabIndex={0}>Item 3</li>
        </ul>
      )}
    </div>
  );
}

// ARIA slider
function AriaSlider() {
  const [value, setValue] = React.useState(50);

  return (
    <div>
      <label htmlFor="slider">Volume</label>
      <input
        id="slider"
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={\`\${value} percent\`}
        aria-label="Volume"
      />
    </div>
  );
}

// ARIA progress
function AriaProgress() {
  const [progress, setProgress] = React.useState(60);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Progress"
    >
      {progress}%
    </div>
  );
}

// ARIA listbox
function AriaListbox() {
  const [selected, setSelected] = React.useState<string[]>([]);
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <ul
      role="listbox"
      aria-label="Options"
      aria-multiselectable="true"
    >
      {options.map((option, index) => (
        <li
          key={index}
          role="option"
          aria-selected={selected.includes(option)}
          onClick={() => {
            setSelected((prev) =>
              prev.includes(option)
                ? prev.filter((o) => o !== option)
                : [...prev, option]
            );
          }}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}

// ARIA combobox
function AriaCombobox() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const options = ["Apple", "Banana", "Cherry"];

  return (
    <div>
      <label htmlFor="combobox">Fruit</label>
      <input
        id="combobox"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls="listbox"
        aria-autocomplete="list"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <ul role="listbox" id="listbox" aria-label="Fruits">
          {options
            .filter((opt) => opt.toLowerCase().includes(value.toLowerCase()))
            .map((option, index) => (
              <li
                key={index}
                role="option"
                onClick={() => {
                  setValue(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

// Type-safe ARIA helper
function useAriaProps<T extends HTMLElement>(
  props: React.HTMLAttributes<T> & React.AriaAttributes
) {
  return props;
}

// Usage
function AriaHelperUsage() {
  const props = useAriaProps<HTMLButtonElement>({
    "aria-label": "Button",
    "aria-pressed": false,
    onClick: () => {},
  });

  return <button {...props}>Button</button>;
}`}
        </CodeBlock>

        <InfoBox type="info">
          React.AriaAttributes provides all ARIA attributes with full type
          safety. All aria-* props are included in HTMLAttributes automatically.
          Use specific ARIA attributes based on element role and state. Common
          patterns include aria-label, aria-expanded, aria-selected,
          aria-controls, and role attributes. All values are type-checked.
        </InfoBox>
      </Section>

      <Section title="2. Role Types">
        <p className="text-gray-700 dark:text-gray-300">
          React provides typed role values for HTML role attributes.
          Understanding role types enables proper semantic HTML and ARIA usage.
        </p>

        <CodeBlock title="Role Types">
          {`// Role type in React
// role is typed as string | undefined in HTMLAttributes

// Standard ARIA roles
function RoleExamples() {
  return (
    <div>
      {/* Landmark roles */}
      <header role="banner">Banner</header>
      <nav role="navigation">Navigation</nav>
      <main role="main">Main</main>
      <aside role="complementary">Sidebar</aside>
      <footer role="contentinfo">Footer</footer>

      {/* Widget roles */}
      <button role="button">Button</button>
      <div role="button" tabIndex={0}>Div as button</div>
      <input role="checkbox" type="checkbox" />
      <div role="checkbox" aria-checked="false">Checkbox</div>
      <input role="radio" type="radio" />
      <input role="textbox" type="text" />
      <div role="textbox" contentEditable>Editable div</div>
      <input role="switch" type="checkbox" />
      <input role="slider" type="range" />
      <select role="listbox">
        <option>Option</option>
      </select>
      <ul role="listbox">
        <li role="option">Option</li>
      </ul>
      <div role="progressbar" aria-valuenow={50}>Progress</div>
      <div role="scrollbar">Scrollbar</div>
      <div role="searchbox">
        <input type="search" />
      </div>
      <div role="separator" />
      <div role="tab">Tab</div>
      <div role="tabpanel">Tab panel</div>
      <div role="tooltip">Tooltip</div>
      <div role="treeitem">Tree item</div>

      {/* Composite roles */}
      <div role="combobox">
        <input />
        <ul role="listbox">
          <li role="option">Option</li>
        </ul>
      </div>
      <div role="grid">
        <div role="row">
          <div role="gridcell">Cell</div>
        </div>
      </div>
      <div role="listbox" aria-multiselectable="true">
        <div role="option">Option</div>
      </div>
      <div role="menu">
        <div role="menuitem">Item</div>
      </div>
      <div role="menubar">
        <div role="menuitem">Item</div>
      </div>
      <div role="radiogroup">
        <div role="radio" aria-checked="false">Option</div>
      </div>
      <div role="tablist">
        <div role="tab">Tab</div>
      </div>
      <div role="tree">
        <div role="treeitem">Item</div>
      </div>
      <div role="treegrid">
        <div role="row">
          <div role="gridcell">Cell</div>
        </div>
      </div>

      {/* Document structure roles */}
      <article role="article">Article</article>
      <section role="region" aria-label="Section">Section</section>
      <div role="application">Application</div>
      <div role="document">Document</div>
      <div role="feed">Feed</div>
      <div role="figure">
        <img alt="Figure" />
        <figcaption>Caption</figcaption>
      </div>
      <div role="group">Group</div>
      <div role="heading" aria-level={1}>Heading</div>
      <img role="img" alt="Image" />
      <div role="list">
        <div role="listitem">Item</div>
      </div>
      <div role="marquee">Marquee</div>
      <div role="math">Math</div>
      <div role="none">None</div>
      <div role="note">Note</div>
      <div role="presentation">Presentation</div>
      <table role="table">
        <tr role="row">
          <td role="cell">Cell</td>
        </tr>
      </table>
      <div role="timer">Timer</div>
    </div>
  );
}

// Type-safe role component
interface RoleProps {
  role?:
    | "button"
    | "checkbox"
    | "radio"
    | "textbox"
    | "listbox"
    | "combobox"
    | "menu"
    | "menuitem"
    | "tab"
    | "tabpanel"
    | "dialog"
    | "alert"
    | "alertdialog"
    | "status"
    | "log"
    | "marquee"
    | "timer"
    | "progressbar"
    | "slider"
    | "spinbutton"
    | "switch"
    | "tree"
    | "treegrid"
    | "treeitem"
    | "grid"
    | "row"
    | "columnheader"
    | "rowheader"
    | "gridcell"
    | "article"
    | "banner"
    | "complementary"
    | "contentinfo"
    | "form"
    | "main"
    | "navigation"
    | "region"
    | "search"
    | "application"
    | "document"
    | "feed"
    | "figure"
    | "group"
    | "heading"
    | "img"
    | "list"
    | "listitem"
    | "math"
    | "none"
    | "note"
    | "presentation"
    | "table"
    | "cell"
    | "columnheader"
    | "rowheader"
    | "timer";
}

function TypedRole({ role, ...props }: RoleProps & React.HTMLAttributes<HTMLDivElement>) {
  return <div role={role} {...props} />;
}

// Role with ARIA attributes
function RoleWithAria() {
  return (
    <div>
      {/* Button role */}
      <div
        role="button"
        aria-label="Click me"
        aria-pressed="false"
        tabIndex={0}
      >
        Custom button
      </div>

      {/* Checkbox role */}
      <div
        role="checkbox"
        aria-checked="false"
        aria-label="Checkbox"
        tabIndex={0}
      >
        Custom checkbox
      </div>

      {/* Dialog role */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <h2 id="dialog-title">Title</h2>
        <p id="dialog-description">Description</p>
      </div>

      {/* Tab role */}
      <div role="tablist" aria-label="Tabs">
        <div
          role="tab"
          aria-selected="true"
          aria-controls="panel1"
          id="tab1"
        >
          Tab 1
        </div>
        <div
          role="tabpanel"
          id="panel1"
          aria-labelledby="tab1"
        >
          Panel 1
        </div>
      </div>

      {/* Menu role */}
      <div role="menubar" aria-label="Menu">
        <div
          role="menuitem"
          aria-haspopup="menu"
          aria-expanded="false"
        >
          Menu item
        </div>
      </div>
    </div>
  );
}

// Custom role component
interface CustomRoleProps extends React.HTMLAttributes<HTMLDivElement> {
  role: "button" | "checkbox" | "radio";
  selected?: boolean;
  checked?: boolean;
}

function CustomRole({
  role,
  selected,
  checked,
  ...props
}: CustomRoleProps) {
  const ariaProps: React.AriaAttributes = {};

  if (role === "button") {
    ariaProps["aria-pressed"] = selected || false;
  } else if (role === "checkbox") {
    ariaProps["aria-checked"] = checked || false;
  } else if (role === "radio") {
    ariaProps["aria-checked"] = checked || false;
  }

  return (
    <div
      role={role}
      {...ariaProps}
      tabIndex={0}
      {...props}
    />
  );
}

// Usage
function CustomRoleUsage() {
  return (
    <div>
      <CustomRole role="button" selected={false}>Button</CustomRole>
      <CustomRole role="checkbox" checked={true}>Checkbox</CustomRole>
      <CustomRole role="radio" checked={false}>Radio</CustomRole>
    </div>
  );
}`}
        </CodeBlock>

        <InfoBox type="tip">
          React types role as string | undefined in HTMLAttributes. Use standard
          ARIA role values for semantic HTML. Common roles include button,
          checkbox, radio, textbox, listbox, combobox, menu, menuitem, tab,
          tabpanel, dialog, alert, progressbar, slider, and many more. Combine
          role with appropriate ARIA attributes for full accessibility.
        </InfoBox>
      </Section>
    </div>
  );
}
