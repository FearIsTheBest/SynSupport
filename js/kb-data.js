// ---------------------------------------------------------------------------
// Knowledgebase content.
//
// This is the single source of truth for the categories and articles rendered
// on index.html / Knowledgebase.html, category.html and article.html.
//
// It's plain data — edit freely. Add a category by pushing an object with a
// unique `id`; add an article by pushing to that category's `articles` array
// with a unique `id`. `body` may contain simple HTML (it's sanitised before
// being inserted).  When you move content into Firebase later, this file is the
// shape to mirror.
// ---------------------------------------------------------------------------

window.KB_CATEGORIES = [
  {
    id: "getting-started",
    title: "Getting Started",
    description:
      "Learn how to get support via this site, purchase Synapse, create your account, and more.",
    articles: [
      {
        id: "creating-your-account",
        title: "Creating your account",
        body:
          "<p>Click <strong>Sign up</strong> in the top-right corner and enter your email and a password " +
          "(at least 6 characters). Once registered you'll be signed in automatically and can access " +
          "your dashboard.</p>",
      },
      {
        id: "purchasing-synapse",
        title: "Purchasing Synapse",
        body:
          "<p>Synapse can be purchased from an authorised reseller. After checkout your license is tied " +
          "to your account — sign in with the same email you used at purchase to activate it.</p>",
      },
      {
        id: "getting-support",
        title: "How to get support",
        body:
          "<p>Search this Knowledgebase first — most common questions are answered here. If you're still " +
          "stuck, open a request from the <strong>Reporting</strong> category and include as much detail " +
          "as possible.</p>",
      },
    ],
  },
  {
    id: "common-errors",
    title: "Common Errors",
    description:
      "Here you can learn about some of the issues we see popping up regularly.",
    articles: [
      {
        id: "attach-failed",
        title: "\"Attach failed\" when injecting",
        body:
          "<p>Close the target application completely, run Synapse as administrator, then re-open the " +
          "target and try attaching again. Make sure your antivirus isn't quarantining the bootstrapper.</p>",
      },
      {
        id: "whitelist-antivirus",
        title: "Whitelisting Synapse in your antivirus",
        body:
          "<p>Add the Synapse install folder to your antivirus exclusions. Real-time protection can delete " +
          "files mid-update and cause launch failures.</p>",
      },
    ],
  },
  {
    id: "reporting",
    title: "Reporting",
    description: "Learn how to make a proper bug report or support request.",
    articles: [
      {
        id: "writing-a-good-report",
        title: "Writing a good bug report",
        body:
          "<p>Include your OS version, what you were doing, what you expected to happen, and what actually " +
          "happened. Attach screenshots or a short screen recording where possible — it dramatically " +
          "speeds up a fix.</p>",
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations",
    description:
      "Find out more about integrations in Synapse X and how they can improve your experience.",
    articles: [
      {
        id: "available-integrations",
        title: "Available integrations",
        body:
          "<p>Synapse supports a range of third-party integrations. Browse the options in your dashboard " +
          "and enable the ones you need — each can be toggled independently.</p>",
      },
    ],
  },
  {
    id: "account-management",
    title: "Account Management",
    description:
      "Helpful tips to keep your account safe and how to change information such as your email and password.",
    articles: [
      {
        id: "change-password",
        title: "Changing your password",
        body:
          "<p>Use a unique password you don't reuse anywhere else. You can reset it at any time from the " +
          "login page.</p>",
      },
      {
        id: "secure-your-account",
        title: "Keeping your account secure",
        body:
          "<p>Never share your login details. Support staff will never ask for your password. Be cautious " +
          "of sites impersonating Synapse.</p>",
      },
    ],
  },
  {
    id: "developing-scripts",
    title: "Developing Scripts",
    description:
      "Introduction to creating your first script as well as the various Synapse APIs.",
    articles: [
      {
        id: "your-first-script",
        title: "Your first script",
        body:
          "<p>Open the editor, type <code>print(\"Hello, world!\")</code> and hit execute. If you see the " +
          "message in the output console, you're ready to start building.</p>",
      },
      {
        id: "api-overview",
        title: "API overview",
        body:
          "<p>Synapse exposes a set of custom functions on top of the standard environment. Reach for the " +
          "built-ins first, and consult this section as the APIs are documented.</p>",
      },
    ],
  },
];
