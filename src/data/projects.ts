export type ProjectTier = 1 | 2;

export type PublicationKind = 'vercel' | 'playstore' | 'github' | 'moodle' | 'website';

export interface Publication {
  kind: PublicationKind;
  href: string;
  label?: string;
}

export interface CaseStudyContent {
  problem: string;
  solution: string;
  results: string[];
  preview?: { description: string; tech: string[] };
}

export interface LabContent {
  blurb: string;
  highlight?: string;
}

export interface Project {
  id: string;
  title: string;
  tier: ProjectTier;
  featured?: boolean;
  tag: string;
  tagColor: string;
  status: string;
  statusColor: string;
  tech: string[];
  publications?: Publication[];
  caseStudy?: CaseStudyContent;
  lab?: LabContent;
}

export const projects: Project[] = [
  {
    id: 'insurance-ops',
    title: 'Insurance Ops Platform — Renewals, Tasks & Secure Intake',
    tier: 1,
    featured: true,
    tag: 'SaaS · Insurance',
    tagColor: '#10B981',
    status: 'Live · In production daily',
    statusColor: '#10B981',
    tech: [
      'React 19',
      'Vite',
      'Firebase Auth',
      'Firestore',
      'Firebase Storage',
      'TweetNaCl encryption',
      'Resend',
      'Tailwind CSS 4',
      'Framer Motion',
      'React Router 7',
    ],
    caseStudy: {
      preview: {
        description:
          'A multi-module operations platform for a small insurance team — renewal pipeline with seven status states, full audit log, secure tokenized client intake encrypted with TweetNaCl, and a notes-and-tasks workspace with assignment, due dates, file attachments, and end-of-day email reports.',
        tech: ['React 19', 'Firestore', 'TweetNaCl', 'Resend'],
      },
      problem:
        'A small insurance team was running their entire operation — renewal pipeline, client notes, follow-up tasks, sensitive banking intake from clients — across spreadsheets and email. Sensitive payment information was being collected over insecure channels. There was no audit trail, no shared task list, and no notification system when something needed attention.',
      solution:
        "A multi-module operations platform built around five surfaces: a renewal pipeline with seven status states and live auto-save, a full client database view, a complete audit log with before/after diffs of every change, a secure tokenized intake form for clients to submit payment information (TweetNaCl asymmetric encryption — the public form can encrypt but can't decrypt what it submits), and a notes-and-tasks workspace with assignment, due dates, file attachments, and a one-click end-of-day email report.",
      results: [
        'Live in production, used daily by the team',
        'Encrypted payment intake replacing insecure email exchanges',
        'Full audit log of every record change for compliance',
        'Notes + tasks with assignment, due dates, and file attachments',
        'Real-time sync across team members via Firestore listeners',
        'Automated end-of-day reports via Resend',
      ],
    },
  },
  {
    id: 'engler',
    title: 'Engler Contracting — Business Website',
    tier: 1,
    featured: true,
    tag: 'Business · Web',
    tagColor: '#5B8DEF',
    status: 'Live at englercontracting.com',
    statusColor: '#5B8DEF',
    tech: ['HTML', 'CSS', 'JavaScript', 'Google Forms', 'Static Hosting'],
    publications: [{ kind: 'website', href: 'https://www.englercontracting.com/' }],
    caseStudy: {
      preview: {
        description:
          'Complete business website for a tree contracting company built from a minimal brief. Full professional presence with an integrated Google Form lead capture system — designed and shipped with near-zero client hand-holding.',
        tech: ['HTML', 'CSS', 'Google Forms', 'Hosting'],
      },
      problem:
        'Engler Contracting & Consulting, a professional tree service and contracting company, had no online presence. They needed a full website that reflected their professionalism, helped customers find them, and captured incoming leads — all from a minimal brief.',
      solution:
        'With just their vision and brand direction, I designed and built a complete business website. The site includes a professional homepage, services overview, and an integrated Google Form for lead capture that routes inquiries directly to their inbox. The entire project was built with near-zero back-and-forth — I took their vision and executed it independently.',
      results: [
        'Professional online presence live and indexed by Google',
        'Integrated lead capture system via Google Forms',
        'Fully responsive — works on all devices',
        'Built from minimal brief with no spec document required',
        'Client had their website without managing a design process',
      ],
    },
  },
  {
    id: 'enterprise-ai-platform',
    title: 'Enterprise AI Orchestration Platform',
    tier: 1,
    featured: true,
    tag: 'Infrastructure · AI',
    tagColor: '#06B6D4',
    status: 'Deployed · Internal platform',
    statusColor: '#06B6D4',
    tech: ['Go', 'Kubernetes', 'Helm', 'Ollama', 'MCP', 'nginx ingress', 'Streaming APIs', 'Docker'],
    caseStudy: {
      preview: {
        description:
          'A platform team needed a way to run, route, and stream LLM workloads behind a single Kubernetes ingress. I built the orchestration layer in Go: model registry, MCP server registry, streaming chat, and a web frontend, all packaged with Helm.',
        tech: ['Go', 'Kubernetes', 'Ollama', 'MCP'],
      },
      problem:
        'A platform team needed a way to host, route, and stream multiple LLM workloads behind a single Kubernetes ingress — without each application reimplementing model selection, streaming, and tool integration on its own. They needed an internal orchestration layer that other teams could build on.',
      solution:
        'A Go-based microservices stack deployed on Kubernetes via Helm. A model registry routes inference requests across Ollama-hosted models. An MCP server registry exposes tool integrations to any client that speaks the Model Context Protocol. A streaming chat service handles long-lived connections through the nginx ingress so browser clients can consume token-by-token responses without buffering. A web frontend ties the pieces together for internal users. Containerized end-to-end, port-forwarded for local dev, troubleshooting playbooks documented.',
      results: [
        'Multi-service Go backend running on Kubernetes',
        'Helm charts for repeatable deployments',
        'Streaming chat through nginx ingress with token-level delivery',
        'Model Context Protocol registry for tool integrations',
        'Ollama-backed model routing with hot-swappable models',
        'Internal-platform footprint serving multiple downstream apps',
      ],
    },
  },
  {
    id: 'polklookup',
    title: 'PolkLookup — Property Records (Mobile + Web)',
    tier: 1,
    featured: true,
    tag: 'Mobile + Web · Public Data',
    tagColor: '#F59E0B',
    status: 'Live on Google Play and web',
    statusColor: '#F59E0B',
    tech: [
      'React Native 0.81',
      'Expo 54',
      'Expo SQLite',
      'React 19',
      'Vite',
      'sql.js (WASM)',
      'cheerio',
      'Vercel',
    ],
    publications: [
      { kind: 'vercel', href: 'https://polklookup.vercel.app/' },
      { kind: 'playstore', href: 'https://play.google.com/store/apps/details?id=com.joholz.PolkLookup' },
    ],
    caseStudy: {
      preview: {
        description:
          'An offline-capable property lookup over 310k+ Polk County, FL public records — published as both a React Native app on Google Play and a browser app that runs SQLite in WebAssembly.',
        tech: ['React Native', 'sql.js (WASM)', 'SQLite', 'Vercel'],
      },
      problem:
        'Polk County, FL publishes property records on a search interface that requires an internet connection, returns one record at a time, and is slow to traverse for anyone doing field work or batch lookups. There was no offline option, no fuzzy matching across owners and addresses, and no way to use the data in a browser without round-tripping every query.',
      solution:
        'Two artifacts solving one problem. The React Native app on Expo bundles the dataset into Expo SQLite and runs queries fully offline with fuzzy owner / address matching. The browser app uses sql.js to load the same SQLite database into WebAssembly and run queries in-memory in the browser — no backend, no API rate limits, no per-query roundtrip. Both handle the upstream HTML scraping and parsing through cheerio so the dataset stays current.',
      results: [
        '310k+ records searchable offline on mobile',
        'Browser app runs SQLite in WebAssembly — zero backend',
        'Published on Google Play and live on the web',
        'Fuzzy owner / address matching for field work',
        'Same data layer powers both surfaces',
        'HTML parsing pipeline keeps the dataset current',
      ],
    },
  },
  {
    id: 'marigold',
    title: 'Marigold — Recipe App with LLM Drafting',
    tier: 1,
    tag: 'Mobile · LLM',
    tagColor: '#8B5CF6',
    status: 'Live on Google Play · Refresh in progress',
    statusColor: '#8B5CF6',
    tech: ['React Native 0.76', 'Expo SDK 52', 'Firebase', 'Expo Router', 'React Native Paper', 'LLM integration'],
    publications: [
      { kind: 'playstore', href: 'https://play.google.com/store/apps/details?id=com.joholz.CookBookPal' },
    ],
    caseStudy: {
      preview: {
        description:
          'A cross-platform mobile app for managing, importing, and drafting recipes — running on iOS and Android with Firebase sync, URL-based recipe import, and a distraction-free cook mode. Currently being refreshed under the new name Marigold; the existing Play Store listing remains under the previous name.',
        tech: ['React Native', 'Expo', 'Firebase', 'LLM'],
      },
      problem:
        'Recipe management is scattered across bookmarks, apps, screenshots, and browser tabs. There was no single app that could import recipes from any URL, draft new ones from a prompt, and walk you step-by-step through cooking — all with your own library synced across devices.',
      solution:
        'A full React Native app on Expo, running on iOS and Android. Recipe drafting via LLM from a prompt, web scraping to import recipes from any URL, Firebase Firestore for real-time cross-device sync, and a dedicated cook mode that walks users through each step without distraction. Currently being refreshed under the name Marigold — the existing Play Store listing still resolves under the previous name during the transition.',
      results: [
        'Published on Google Play under previous name (link still resolves)',
        'iOS and Android from one React Native codebase',
        'Recipe drafting via LLM from a prompt',
        'URL-based recipe import via web scraping',
        'Firestore real-time sync across devices',
        'Distraction-free step-by-step cook mode',
      ],
    },
  },
  {
    id: 'moodle-stack',
    title: 'Moodle — Custom Plugins & Container Stack',
    tier: 1,
    tag: 'LMS · DevOps',
    tagColor: '#10B981',
    status: 'In production · Enterprise education client',
    statusColor: '#10B981',
    tech: [
      'PHP',
      'Moodle 4.5 LTS',
      'MySQL 8',
      'Redis',
      'Docker',
      'nginx (custom build)',
      'Azure OIDC',
      'supervisord',
    ],
    publications: [{ kind: 'moodle', href: 'https://moodle.org/', label: 'Moodle stack' }],
    caseStudy: {
      preview: {
        description:
          'Five custom Moodle plugins and a multi-stage container stack for an enterprise education client. PHP plugins handle automation, group sync, completion vaulting, and SQL reporting. The Docker image bakes a custom nginx with VTS metrics for Prometheus.',
        tech: ['PHP', 'Moodle', 'Docker', 'Azure OIDC'],
      },
      problem:
        'An enterprise education client running Moodle at scale needed more than the marketplace plugin ecosystem could give them: token cleanup for Azure OIDC sessions, group and cohort sync against external identity systems, audited course-completion sync into a downstream vault, safe ad-hoc SQL reporting for admins, custom dashboard blocks, and a container image that exposed nginx metrics for Prometheus. They also needed the whole stack reproducible across environments.',
      solution:
        'Five custom Moodle plugins totaling 78+ PHP files. local_automationservices exposes a web service API and integrates with external orchestration. local_bethel handles cohort/group sync, transcript display, user-merge utilities, and OIDC token cleanup across four custom DB tables. local_mesh syncs course completions into a vault with an audit ledger. local_sqlreport runs a curated set of safe SELECT queries with date filtering, sorting, and CSV export. block_hubts is a custom dashboard block. The container side: a 258-line multi-stage Dockerfile that compiles nginx from source with the VTS module for Prometheus metrics, a docker-compose.yml orchestrating MySQL 8 and Redis with feature-flag environment variables, and a Lambda theme with custom fonts and assets.',
      results: [
        '5 custom plugins (78+ PHP files, 4 custom DB tables)',
        'Multi-stage Dockerfile with custom nginx VTS for metrics',
        'Azure OIDC integration including token cleanup tasks',
        'Vault sync for course completions with full audit ledger',
        'Curated safe-SQL reporting tool with CSV export',
        'Lambda theme + custom dashboard blocks',
        'Feature-flagged container stack reproducible across environments',
      ],
    },
  },
  {
    id: 'halitaily',
    title: 'HaliTaily',
    tier: 2,
    tag: 'Web · Booking',
    tagColor: '#5B8DEF',
    status: 'Live',
    statusColor: '#5B8DEF',
    tech: ['React 19', 'Vite', 'Supabase', 'react-calendar', 'date-fns', 'Tailwind'],
    publications: [{ kind: 'vercel', href: 'https://halitaily.vercel.app/' }],
    lab: {
      blurb: 'Property availability calendar backed by Supabase, with a date-picker UI for guests and admin-side scheduling.',
    },
  },
  {
    id: 'enterprise-desktop',
    title: 'Cross-platform Desktop App',
    tier: 2,
    tag: 'Desktop · Internal',
    tagColor: '#06B6D4',
    status: 'Internal · Anonymized',
    statusColor: '#06B6D4',
    tech: ['Electron', 'React 19', 'Vite', 'Zustand', 'Firebase', 'electron-builder'],
    lab: {
      blurb: 'A cross-platform desktop client for an internal enterprise system, packaged for macOS and Windows. Login auth, Firebase-backed state, Zustand store.',
    },
  },
  {
    id: 'mcp-trio',
    title: 'MCP Server Trio',
    tier: 2,
    tag: 'Tooling · MCP',
    tagColor: '#8B5CF6',
    status: 'Open source',
    statusColor: '#8B5CF6',
    tech: ['Model Context Protocol', 'TypeScript', 'Python', 'Playwright', 'Express'],
    lab: {
      blurb: 'Three Claude/MCP servers: a Simplified Technical English analyzer (TS), a Redmine issue manager (TS + Playwright), and an American Airlines award-flight finder (Python + headless Firefox).',
      highlight: '3 servers · TS + Python',
    },
  },
  {
    id: 'siphaus',
    title: 'SipHaus',
    tier: 2,
    tag: 'Web · Marketing',
    tagColor: '#F59E0B',
    status: 'Live',
    statusColor: '#F59E0B',
    tech: ['React 19', 'Vite', 'Tailwind', 'Framer Motion', 'React Router'],
    publications: [{ kind: 'vercel', href: 'https://siphaus.vercel.app/' }],
    lab: {
      blurb: 'Curated drinks-menu site with sophisticated filtering and animation. Built as a brand-forward visual portfolio piece.',
    },
  },
  {
    id: 'couples-game',
    title: 'Couples Game',
    tier: 2,
    tag: 'Web · Multiplayer',
    tagColor: '#10B981',
    status: 'Containerized',
    statusColor: '#10B981',
    tech: ['Docker Compose', 'Node.js', 'Real-time messaging', 'Health checks'],
    lab: {
      blurb: 'Multi-container Docker Compose multiplayer game with separate host, player, and server services, environment-driven config, and health checks.',
    },
  },
  {
    id: 'waveform-creator',
    title: 'Waveform Creator',
    tier: 2,
    tag: 'CLI · Video',
    tagColor: '#06B6D4',
    status: 'Utility',
    statusColor: '#06B6D4',
    tech: ['Bash', 'ffmpeg', 'ProRes 4444'],
    lab: {
      blurb: 'A shell utility that extracts audio from video and renders transparent waveform overlays, encoded for drop-in use in DaVinci Resolve.',
    },
  },
];

export const tier1 = () => projects.filter((p) => p.tier === 1);
export const tier2 = () => projects.filter((p) => p.tier === 2);
export const featured = () => projects.filter((p) => p.featured);
