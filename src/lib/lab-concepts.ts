export type LabConcept = {
  id:
    | "ssr-boundary"
    | "csr-state"
    | "client-cache"
    | "shared-state"
    | "push-notifications"
    | "a11y-systems"
    | "micro-frontend"
    | "nested-comments"
    | "autocomplete"
    | "infinite-scroll"
    | "pagination"
    | "image-slider"
    | "localization";
  title: string;
  category: "Rendering" | "State" | "Platform" | "Architecture" | "Accessibility";
  shortDescription: string;
  objective: string;
  lld: {
    components: string[];
    stateModel: string[];
    dataFlow: string[];
    tradeoffs: string[];
  };
};

export const labConcepts: LabConcept[] = [
  {
    id: "ssr-boundary",
    title: "SSR Boundary Strategy",
    category: "Rendering",
    shortDescription: "Demonstrates server-rendered values and route-level rendering boundaries.",
    objective: "Show how server-generated content remains deterministic while interactive islands stay client-side.",
    lld: {
      components: [
        "Server shell (route/page)",
        "Server timestamp card",
        "Client hydration comparison helper",
      ],
      stateModel: [
        "Server time created on request/render",
        "Client time captured after hydration",
      ],
      dataFlow: [
        "request -> server render -> HTML",
        "client hydrate -> compare server/client values",
      ],
      tradeoffs: [
        "Great for SEO and first paint consistency",
        "Needs careful split to avoid over-hydration",
      ],
    },
  },
  {
    id: "csr-state",
    title: "CSR State Transitions",
    category: "State",
    shortDescription: "Reducer and controlled-input demos for local state correctness.",
    objective: "Show deterministic client-state transitions and derivation patterns for interactive UIs.",
    lld: {
      components: ["CounterDemo", "FilterDemo"],
      stateModel: [
        "Reducer-driven transition graph",
        "Local controlled input state",
        "Memoized derived view model",
      ],
      dataFlow: [
        "user event -> reducer/setter",
        "state update -> derived memo",
        "render commit -> updated UI",
      ],
      tradeoffs: [
        "Simple and highly testable",
        "May become fragmented when state crosses feature boundaries",
      ],
    },
  },
  {
    id: "client-cache",
    title: "Client Data Caching",
    category: "State",
    shortDescription: "TanStack Query demo for remote data, retries, and cache behavior.",
    objective: "Show cache-aware client fetching patterns and resilient refresh workflows.",
    lld: {
      components: ["CsrQueryShowcase", "QueryProvider"],
      stateModel: [
        "query cache with stale time",
        "request status flags: loading/error/success",
      ],
      dataFlow: [
        "mount -> query function fetch",
        "cache fill -> render",
        "manual refresh -> refetch",
      ],
      tradeoffs: [
        "Great for async consistency and retries",
        "Needs cache policies aligned to product data freshness",
      ],
    },
  },
  {
    id: "shared-state",
    title: "Shared Client State",
    category: "State",
    shortDescription: "Global lightweight store using Zustand for cross-widget communication.",
    objective: "Demonstrate minimal global state for cross-component synchronization.",
    lld: {
      components: ["ZustandDemo", "lab-store"],
      stateModel: ["single selectedTechnique atom", "store action to mutate selection"],
      dataFlow: [
        "button click -> store action",
        "store update -> subscriber re-render",
      ],
      tradeoffs: [
        "Tiny API and low ceremony",
        "Not a replacement for server-state cache",
      ],
    },
  },
  {
    id: "push-notifications",
    title: "Push Notification Platform",
    category: "Platform",
    shortDescription: "Service worker registration, permission flow, and Firebase token lifecycle.",
    objective: "Show web platform depth around notifications and browser capability fallbacks.",
    lld: {
      components: ["PushNotificationCard", "firebase-client", "firebase-messaging-sw"],
      stateModel: [
        "permission states: default/granted/denied",
        "service worker registration readiness",
        "FCM token lifecycle",
      ],
      dataFlow: [
        "register SW -> request permission",
        "permission granted -> token request",
        "token -> backend registration path",
      ],
      tradeoffs: [
        "Powerful re-engagement capability",
        "Platform support and permission UX require graceful fallback",
      ],
    },
  },
  {
    id: "a11y-systems",
    title: "Accessibility Engineering",
    category: "Accessibility",
    shortDescription: "Practical checklist for keyboard, semantics, and assistive-tech compatibility.",
    objective: "Present an engineering workflow for WCAG-aligned component and page implementation.",
    lld: {
      components: [
        "semantic landmarks",
        "focus-visible interactions",
        "skip-link strategy",
      ],
      stateModel: [
        "UI states exposed through semantic attributes",
        "interactive states preserved for keyboard and SR users",
      ],
      dataFlow: [
        "interaction -> focus/ARIA update",
        "assistive tech reads updated semantics",
      ],
      tradeoffs: [
        "Requires discipline across all features",
        "Delivers quality, usability, and legal compliance benefits",
      ],
    },
  },
  {
    id: "micro-frontend",
    title: "Micro Frontend Boundaries",
    category: "Architecture",
    shortDescription: "Boundary planning for independently deployable frontend modules.",
    objective: "Show how module ownership, contracts, and deployment isolation scale product teams.",
    lld: {
      components: [
        "host shell",
        "remote module contracts",
        "shared design-system primitives",
      ],
      stateModel: [
        "local state per remote",
        "minimal shared state through explicit contracts",
      ],
      dataFlow: [
        "host route load -> remote chunk request",
        "remote render -> host lifecycle hooks",
      ],
      tradeoffs: [
        "Strong team autonomy and deployment agility",
        "Requires strict versioning and contract governance",
      ],
    },
  },
  {
    id: "nested-comments",
    title: "Nested Comments System",
    category: "Architecture",
    shortDescription: "Tree-based comment rendering with depth-aware layout and reply threading.",
    objective: "Show recursive UI composition for discussion systems with predictable state updates.",
    lld: {
      components: [
        "CommentThread root",
        "Recursive CommentNode",
        "Reply composer",
      ],
      stateModel: [
        "comments map keyed by id",
        "child id list per parent",
        "expanded/collapsed node state",
      ],
      dataFlow: [
        "fetch comments -> normalize graph",
        "render root nodes -> recursive children",
        "reply submit -> append child node",
      ],
      tradeoffs: [
        "Natural representation of discussion hierarchy",
        "Needs depth guard and virtualization for large threads",
      ],
    },
  },
  {
    id: "autocomplete",
    title: "Autocomplete Typeahead",
    category: "State",
    shortDescription: "Debounced query matching with keyboard-friendly result list and highlight.",
    objective: "Demonstrate fast local suggestion filtering with predictable UX states.",
    lld: {
      components: [
        "Search input",
        "Suggestion list",
        "Matched text highlighter",
      ],
      stateModel: [
        "search query string",
        "filtered suggestion array",
        "active suggestion index",
      ],
      dataFlow: [
        "input change -> debounce -> filter",
        "filtered data -> list render",
        "select suggestion -> input commit",
      ],
      tradeoffs: [
        "Excellent discoverability and speed",
        "Requires debounce tuning and accessible keyboard support",
      ],
    },
  },
  {
    id: "infinite-scroll",
    title: "Infinite Scroll Feed",
    category: "State",
    shortDescription: "Progressive list loading using dummy API pages and merge-on-scroll behavior.",
    objective: "Show append-only pagination and scroll boundary handling for feed experiences.",
    lld: {
      components: [
        "Scrollable feed container",
        "Feed item card",
        "Bottom loading sentinel",
      ],
      stateModel: [
        "loaded item collection",
        "current page counter",
        "hasMore/loading flags",
      ],
      dataFlow: [
        "scroll near bottom -> request next page",
        "response -> append list",
        "no records -> hasMore false",
      ],
      tradeoffs: [
        "Great continuous browsing UX",
        "Harder deep-linking and footer reachability",
      ],
    },
  },
  {
    id: "pagination",
    title: "Paginated Data Grid",
    category: "State",
    shortDescription: "Page-based dataset navigation with deterministic item windows.",
    objective: "Demonstrate page index state and predictable fetch boundaries.",
    lld: {
      components: [
        "Page controls",
        "Result list",
        "Current page indicator",
      ],
      stateModel: [
        "current page index",
        "page size",
        "total count",
      ],
      dataFlow: [
        "change page -> request page payload",
        "response -> replace window",
        "update controls enabled/disabled state",
      ],
      tradeoffs: [
        "Strong control and easy shareable URLs",
        "Lower content discovery compared with infinite feed",
      ],
    },
  },
  {
    id: "image-slider",
    title: "Image Slider Carousel",
    category: "Rendering",
    shortDescription: "Slide-based media viewer using dummy gallery data and index transitions.",
    objective: "Show state-driven carousel interactions with previous/next controls.",
    lld: {
      components: [
        "Slider viewport",
        "Previous/next controls",
        "Slide indicator dots",
      ],
      stateModel: [
        "active slide index",
        "slides data array",
      ],
      dataFlow: [
        "button click -> index change",
        "index -> active slide render",
        "dot click -> direct slide jump",
      ],
      tradeoffs: [
        "Great storytelling for visual content",
        "Must handle motion sensitivity and responsive sizing",
      ],
    },
  },
  {
    id: "localization",
    title: "Localization and Multi-language UX",
    category: "Platform",
    shortDescription: "End-to-end localization demo with translated copy, locale-aware date/time, currency, and number formatting.",
    objective: "Show how a frontend handles internationalization beyond static strings, including time, money, and culturally correct formatting.",
    lld: {
      components: [
        "Locale switch control",
        "Translation message dictionary",
        "Intl formatters for date, time, currency, and numbers",
        "Localized summary card",
      ],
      stateModel: [
        "selected locale state",
        "message bundle resolved by locale",
        "formatted derived values for date, currency, and counts",
      ],
      dataFlow: [
        "locale change -> resolve translation bundle",
        "locale -> Intl.DateTimeFormat / Intl.NumberFormat",
        "derived localized values -> render localized UI",
      ],
      tradeoffs: [
        "Improves global usability and product readiness",
        "Needs message governance, fallback strategy, and formatting consistency across the app",
      ],
    },
  },
];
