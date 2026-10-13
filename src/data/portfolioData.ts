import { Project, Experience, SkillCategory, EducationItem, ResearchPaper } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Zafarali Faizahmed Inamdar',
  preferredName: 'Zafarali Inamdar',
  title: 'Software Developer • Full Stack & Mobile',
  status: 'Open to Full-Time Software Engineering & Mobile Roles',
  location: 'Pune, Maharashtra, India',
  email: 'zafaraliinamdar@gmail.com',
  phone: '+91 9860800543',
  linkedin: 'https://linkedin.com/in/zafarali-inamdar',
  linkedinDisplay: 'linkedin.com/in/zafarali-inamdar',
  github: 'https://github.com/ZafaraliFaiz',
  githubDisplay: 'github.com/ZafaraliFaiz',
  bio: 'Full Stack Software Developer with hands-on experience building scalable web and cross-platform mobile applications using React.js, Next.js, React Native (Expo), Node.js, and Express.js. Skilled in RESTful API design, offline-first data sync architectures, Agile/Scrum, Git, and CI/CD-driven delivery.',
  tagline: 'Engineering high-resilience web platforms, offline-first mobile apps, and Gen-AI integrated software systems.',
};

export const PROJECTS: Project[] = [
  {
    id: 'bems',
    title: 'BEMS - Booth & Election Field Operations Suite',
    clientOrOrg: 'Tain ElectAI (Independent Contractor)',
    tagline: 'Offline-First React Native Mobile Suite with Local Write-Queue & Zero-Downtime Sync',
    category: 'Mobile',
    period: 'Aug 2026 – Present',
    badge: 'Production Mobile',
    featured: true,
    description:
      'Cross-platform (iOS/Android) mobile field-operations application built in React Native (Expo, Expo Router) for election canvassing agents. Designed to operate reliably in challenging rural network connectivity scenarios during voter counselling and live election-day polling.',
    keyHighlights: [
      'Engineered an offline-first architecture utilizing a custom local AsyncStorage write-queue with NetInfo network listeners and automatic exponential backoff retry algorithms.',
      'Integrated Supabase (Auth, Postgres, Storage) with TanStack React Query and Zustand state management for reactive UI updates and cached data synchronization.',
      'Implemented hardware-level camera integration using expo-camera with client-side image compression and secure storage with expo-secure-store.',
      'Architected permission-driven UI with role-based PII masking to strictly guard sensitive constituent information.',
      'Owned complete release lifecycle via EAS Build & Submit, resolved App Store review compliance, secured Apple Unlisted App Distribution approval, and orchestrated Google Play Closed Testing rollouts.'
    ],
    technologies: [
      'React Native',
      'Expo / Expo Router',
      'Supabase',
      'TanStack React Query',
      'Zustand',
      'AsyncStorage',
      'NetInfo',
      'Expo Camera',
      'Expo SecureStore',
      'EAS Build'
    ],
    metrics: [
      { label: 'Network Uptime Requirement', value: '0% (Offline-First)' },
      { label: 'Mobile Platforms', value: 'iOS & Android' },
      { label: 'Sync Resilience', value: 'Auto-Retry Backoff' },
      { label: 'App Distribution', value: 'Apple & Google Play' }
    ],
    architectureOverview:
      'Client Layer (React Native + Expo Router) -> Local Storage Write-Queue (AsyncStorage + Zustand) -> Network Observer (NetInfo) -> Sync Worker with Exponential Backoff -> Supabase Edge / Postgres DB.',
    architectureNodes: [
      { title: 'Local Write-Queue', desc: 'AsyncStorage queues votes/surveys immediately without waiting for server response.', icon: 'database' },
      { title: 'NetInfo Connectivity Watcher', desc: 'Monitors socket/cellular states and signals the sync daemon on reconnection.', icon: 'wifi' },
      { title: 'Supabase Postgres & Auth', desc: 'Role-based access, row-level security (RLS), and biometric token exchange.', icon: 'shield' },
      { title: 'EAS Production Pipelines', desc: 'Unlisted distribution for Apple iOS enterprise & Android Closed Testing tracks.', icon: 'smartphone' }
    ],
    demoType: 'simulation'
  },
  {
    id: 'krushi',
    title: 'Krushi - Full-Stack AgriTech ERP & Commerce System',
    clientOrOrg: 'Nebula Technology',
    tagline: 'Comprehensive Agricultural Enterprise Management System with Real-Time Financial Billing',
    category: 'Full Stack',
    period: 'Jan 2026 – Jun 2026',
    badge: 'Enterprise ERP',
    featured: true,
    description:
      'Engineered the core React.js frontend of a comprehensive agriculture management ecosystem. Built end-to-end modules covering product catalog, bulk purchasing, warehouse inventory management, sales billing, customer ledgers, returns processing, and automated audit-ready PDF reporting.',
    keyHighlights: [
      'Architected intuitive, high-throughput workflows for agricultural merchants covering stock monitoring, multi-tier pricing, sales tax invoicing, and credit ledgers.',
      'Configured Redux Toolkit for unified global state and built Axios interceptors with cookie-based automatic token refresh to ensure uninterrupted sessions.',
      'Implemented Super Admin and Sub Admin role-based access control (RBAC) with protected route boundaries and strict permission enforcement.',
      'Created robust form validation pipelines with React Hook Form and Yup schemas to prevent discrepancies in financial billing and quantity entries.',
      'Integrated Chart.js for real-time sales and stock velocity visualization, coupled with automated browser printing and PDF generation using jsPDF, AutoTable, and react-to-print.'
    ],
    technologies: [
      'React.js (Vite)',
      'Tailwind CSS',
      'SCSS',
      'Material UI',
      'Redux Toolkit',
      'Axios Interceptors',
      'Chart.js',
      'jsPDF / AutoTable',
      'react-to-print',
      'React Hook Form',
      'Yup'
    ],
    metrics: [
      { label: 'Core Modules', value: '7+ ERP Modules' },
      { label: 'State Management', value: 'Redux Toolkit' },
      { label: 'Reporting', value: 'Automated jsPDF' },
      { label: 'Security Model', value: 'RBAC (Super/Sub Admin)' }
    ],
    architectureOverview:
      'Vite React SPA -> Redux Toolkit State Store -> Axios Token-Refresh Interceptors -> REST API Server -> Invoicing & jsPDF Engine -> Chart.js Visualizer.',
    architectureNodes: [
      { title: 'ERP Business Engine', desc: 'Product Catalog, Purchase, Stock Inventory, Invoicing, Ledger, Returns.', icon: 'layout' },
      { title: 'Token Refresh Lifecycle', desc: 'Silent Axios interceptor handles 401s via secure HTTP-only cookies without UX disruption.', icon: 'refresh' },
      { title: 'Automated Invoicing', desc: 'Vectorized PDF rendering using jsPDF/AutoTable for invoices and ledgers.', icon: 'file-text' },
      { title: 'Analytics Dashboards', desc: 'Interactive Chart.js charts rendering revenue velocity, inventory runouts, and yield trends.', icon: 'bar-chart' }
    ],
    demoType: 'interactive-flow'
  },
  {
    id: 'greentop',
    title: 'Greentop - Enterprise B2B Supply & Dispatch Suite',
    clientOrOrg: 'Knowledge Keen',
    tagline: 'Full-Stack Operations & Batch Manufacturing Portal with High-Concurrency MySQL Backend',
    category: 'Full Stack',
    period: 'May 2025 – Jul 2025',
    badge: 'B2B Enterprise',
    featured: true,
    description:
      'Full-stack enterprise business management portal handling mission-critical business modules: vendor/supplier onboarding, customer directories, product master, order dispatch pipelines, batch tracking, and transactional invoicing.',
    keyHighlights: [
      'Engineered responsive, accessible UI modules using Next.js (App Router), React.js, TypeScript, HeroUI, and Tailwind CSS.',
      'Developed a typed custom data-fetching hook abstraction for clean caching, revalidation, and error handling across tabular data interfaces.',
      'Built production Express.js REST APIs backed by MySQL, utilizing connection pooling, parameterized queries, and ACID transactional writes for orders, dispatches, and batches.',
      'Implemented production monitoring and log rotation using Winston logging alongside process clustering via PM2.',
      'Enforced code quality and agility through disciplined Git workflows, granular pull request reviews, and continuous integration checks.'
    ],
    technologies: [
      'Next.js (App Router)',
      'React.js',
      'TypeScript',
      'HeroUI',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MySQL',
      'Connection Pooling',
      'Winston Logger',
      'PM2'
    ],
    metrics: [
      { label: 'Framework', value: 'Next.js App Router' },
      { label: 'Database', value: 'MySQL (ACID Writes)' },
      { label: 'Process Runtime', value: 'PM2 Clustered' },
      { label: 'Component System', value: 'HeroUI + Tailwind' }
    ],
    architectureOverview:
      'Next.js Client (HeroUI + Custom Hooks) -> Express.js API Gateway (PM2) -> MySQL Connection Pool (ACID Transactions) -> Winston Central Logging.',
    architectureNodes: [
      { title: 'Modular App Router', desc: 'Server and client components optimized for snappy data tables and batch workflows.', icon: 'box' },
      { title: 'Transactional REST API', desc: 'Express API ensuring atomicity during multi-item dispatch and invoice generation.', icon: 'server' },
      { title: 'MySQL Connection Pool', desc: 'Optimized pool with parameterized queries preventing SQL injection and thread starvation.', icon: 'database' },
      { title: 'PM2 & Winston Observability', desc: 'Zero-downtime process daemon with daily rotating JSON log files.', icon: 'activity' }
    ],
    demoType: 'interactive-flow'
  },
  {
    id: 'email-translator',
    title: 'AI-Powered Email Tone & Style Translator',
    clientOrOrg: 'Personal Innovation Project',
    tagline: 'Multi-Provider Gen-AI Engine with Tone Adaptation & Resilient Fallback Routing',
    category: 'AI & Gen-AI',
    period: '2026',
    badge: 'Gen-AI Platform',
    featured: true,
    description:
      'Full-stack intelligent email transformation platform that adapts and refines email communication across diverse professional tones (Diplomatic, Executive, Persuasive, Casual, Concise) while preserving core context and business intent.',
    keyHighlights: [
      'Architected multi-provider LLM orchestration utilizing LangChain, OpenAI API, and Google Gemini API with automatic fallback routing for 99.9% availability.',
      'Designed high-throughput FastAPI REST endpoints with strict Pydantic model validation and asynchronous streaming responses.',
      'Integrated MySQL database for persistent translation histories, prompt audit logs, and tone preference bookmarks.',
      'Built a sleek, responsive React.js frontend with live side-by-side diffing, one-click copy, and tone parameter tweaking.'
    ],
    technologies: [
      'React.js',
      'FastAPI',
      'LangChain',
      'Google Gemini API',
      'OpenAI API',
      'Python',
      'Pydantic',
      'MySQL',
      'Tailwind CSS'
    ],
    metrics: [
      { label: 'AI Providers', value: 'Gemini + OpenAI Dual Routing' },
      { label: 'API Backend', value: 'FastAPI / Async' },
      { label: 'Tone Profiles', value: '6 Dynamic Styles' },
      { label: 'History Persistence', value: 'MySQL Backed' }
    ],
    architectureOverview:
      'React Frontend -> FastAPI Async API -> LangChain Orchestration Layer -> Gemini / OpenAI Providers -> MySQL Translation History.',
    architectureNodes: [
      { title: 'Prompt Strategy Engine', desc: 'Context-preserving system prompts customized for executive, diplomatic, and concise communication.', icon: 'cpu' },
      { title: 'Multi-Model Fallback', desc: 'Transparent fallback from primary LLM to secondary provider on latency spikes or rate limits.', icon: 'git-branch' },
      { title: 'FastAPI Microservice', desc: 'Asynchronous Python backend with typed Pydantic payloads and CORS compliance.', icon: 'terminal' },
      { title: 'History & Tone Analytics', desc: 'MySQL relational storage capturing usage frequencies, sentiment shifts, and bookmarks.', icon: 'history' }
    ],
    demoType: 'interactive-flow'
  },
  {
    id: 'house-rent-devops',
    title: 'House Rent Admin & Cloud DevOps Pipeline',
    clientOrOrg: 'Full-Stack & Cloud Project',
    tagline: 'Containerized Microservice Architecture with Automated Jenkins CI/CD to AWS EC2',
    category: 'DevOps & Cloud',
    period: '2025 – 2026',
    badge: 'Cloud & DevOps',
    featured: true,
    description:
      'End-to-end residential property management application fully engineered with automated CI/CD deployment pipelines, multi-stage Docker containerization, NGINX reverse proxying, and AWS cloud hosting.',
    keyHighlights: [
      'Engineered React.js frontend and Node.js/Express.js REST API with comprehensive tenant, lease, and payment tracking capabilities.',
      'Containerized the entire application ecosystem with optimized multi-stage Dockerfiles, slashing image footprint by over 60%.',
      'Configured NGINX as an edge reverse proxy with custom caching headers, security headers, and request rate limiting.',
      'Constructed an automated Jenkins CI/CD pipeline triggered by Git commits to run unit tests, build Docker images, and deploy seamlessly to an AWS EC2 instance with IAM and S3 asset backup.'
    ],
    technologies: [
      'React.js',
      'Node.js',
      'Express.js',
      'Docker',
      'NGINX',
      'Jenkins CI/CD',
      'AWS EC2',
      'AWS IAM',
      'AWS S3',
      'Linux / Bash'
    ],
    metrics: [
      { label: 'Deployment Strategy', value: 'Jenkins Automated CI/CD' },
      { label: 'Cloud Provider', value: 'AWS EC2 + S3' },
      { label: 'Reverse Proxy', value: 'NGINX Secure Edge' },
      { label: 'Image Optimization', value: 'Multi-stage Docker' }
    ],
    architectureOverview:
      'Git Push -> Jenkins Pipeline Trigger -> Docker Image Build -> AWS EC2 SSH -> NGINX Reverse Proxy -> Node.js / React Containers.',
    architectureNodes: [
      { title: 'Multi-Stage Docker', desc: 'Production artifacts isolated from build dependencies for minimal CVE surface area.', icon: 'layers' },
      { title: 'Jenkins Automation', desc: 'Automated test suite execution and continuous deployment upon master branch merges.', icon: 'play' },
      { title: 'NGINX Edge Proxy', desc: 'SSL termination, compression, routing, and rate-limiting shield for internal Node services.', icon: 'shield-check' },
      { title: 'AWS Cloud Infrastructure', desc: 'EC2 computing cluster configured with least-privilege IAM roles and S3 storage.', icon: 'cloud' }
    ],
    demoType: 'preview'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'tain-electai',
    role: 'Freelance React Native Developer (Independent Contractor)',
    company: 'TAIN ELECTAI',
    period: 'Aug 2026 – Present',
    location: 'Pune, Maharashtra (Remote / Hybrid)',
    type: 'Contract / Freelance',
    summary:
      'Building a production-grade, offline-first mobile application (BEMS) for field operations, election canvassing, voter counselling, and polling management across iOS and Android.',
    highlights: [
      'Built a cross-platform (iOS/Android) field-operations app in React Native (Expo, Expo Router) for election canvassing agents, covering member management, voter counselling, and live election-day polling.',
      'Designed an offline-first architecture with a local AsyncStorage write-queue, automatic background sync, retry-with-backoff, and live connection-state feedback via NetInfo.',
      'Integrated Supabase (Auth, Postgres, Storage) with TanStack React Query and Zustand, plus expo-camera for compressed photo capture; implemented a permission-driven UI with role-based PII masking and a hardened, role-restricted auth flow (expo-secure-store).',
      'Owned iOS/Android releases via EAS Build/Submit: resolved App Store Review compliance issues, secured Apple approval for Unlisted App Distribution, and managed TestFlight and Google Play Closed Testing rollout.'
    ],
    technologies: [
      'React Native',
      'Expo',
      'Expo Router',
      'Supabase',
      'TanStack React Query',
      'Zustand',
      'AsyncStorage',
      'NetInfo',
      'Expo Camera',
      'Expo SecureStore',
      'EAS Build'
    ],
    associatedProject: 'bems',
    accentColor: '#38bdf8'
  },
  {
    id: 'nebula-technology',
    role: 'Software Developer Intern',
    company: 'NEBULA TECHNOLOGY',
    period: 'Jan 2026 – Jun 2026',
    location: 'Pune, Maharashtra',
    type: 'Internship',
    summary:
      'Spearheaded frontend architecture for "Krushi", a full-scale agriculture management ERP covering products, purchasing, stock, billing, ledgers, and automated reporting.',
    highlights: [
      'Built the React.js (Vite) frontend of a full-stack agriculture management system using Tailwind CSS, SCSS, and Material UI, covering product catalog, purchase, stock, sales billing, ledger, and returns.',
      'Designed and integrated responsive Chart.js dashboards for sales and inventory analytics.',
      'Implemented automated PDF export and printing workflows via jsPDF, jsPDF-AutoTable, and react-to-print for invoices and audit records.',
      'Implemented Redux Toolkit state management, Axios API integration with cookie-based token refresh, and role-based access (Super Admin/Sub Admin) with protected routes and validated forms (React Hook Form, Yup).'
    ],
    technologies: [
      'React.js',
      'Vite',
      'Tailwind CSS',
      'SCSS',
      'Material UI',
      'Redux Toolkit',
      'Axios Interceptors',
      'Chart.js',
      'jsPDF',
      'React Hook Form',
      'Yup'
    ],
    associatedProject: 'krushi',
    accentColor: '#10b981'
  },
  {
    id: 'knowledge-keen',
    role: 'Web Development Intern',
    company: 'KNOWLEDGE KEEN',
    period: 'May 2025 – Jul 2025',
    location: 'Pune, Maharashtra',
    type: 'Internship',
    summary:
      'Engineered business management modules for "Greentop" enterprise suite using Next.js App Router, HeroUI, Express.js REST APIs, and transactional MySQL.',
    highlights: [
      'Developed full-stack business management modules (supplier, customer, product, order, dispatch, dashboard) using Next.js (App Router), React.js, TypeScript, HeroUI, and Tailwind CSS.',
      'Crafted modular reusable components and a typed custom data-fetching hook for optimized caching and revalidation.',
      'Built Express.js REST APIs backed by MySQL (connection pooling, parameterized queries, transactional writes) for orders, dispatches, tax invoices, and batches.',
      'Implemented production logging with Winston and process management with PM2; collaborated via Git/GitHub, pull requests, and peer code reviews.'
    ],
    technologies: [
      'Next.js (App Router)',
      'React.js',
      'TypeScript',
      'HeroUI',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'MySQL',
      'Winston',
      'PM2',
      'Git'
    ],
    associatedProject: 'greentop',
    accentColor: '#8b5cf6'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend & Mobile',
    iconName: 'smartphone',
    skills: [
      { name: 'React.js', level: 95, highlight: true, description: 'Component architecture, Hooks, Context, Concurrent rendering' },
      { name: 'React Native & Expo', level: 92, highlight: true, description: 'Cross-platform iOS/Android, Expo Router, EAS, Native Modules' },
      { name: 'Next.js (App Router)', level: 90, highlight: true, description: 'Server Components, SSR/SSG, dynamic routing, edge runtime' },
      { name: 'TypeScript & JavaScript', level: 94, highlight: true, description: 'Strict typing, Generics, ESNext features, async patterns' },
      { name: 'Tailwind CSS & HeroUI', level: 95, highlight: false, description: 'Utility-first design, design systems, accessible UI patterns' },
      { name: 'Redux Toolkit & Zustand', level: 92, highlight: true, description: 'Predictable state stores, slice architecture, persistence' },
      { name: 'React Hook Form & Yup', level: 90, highlight: false, description: 'Complex form validation, schema validation, multi-step flows' },
      { name: 'TanStack React Query', level: 88, highlight: false, description: 'Server state synchronization, query caching, optimistic updates' }
    ]
  },
  {
    category: 'Backend, APIs & Databases',
    iconName: 'server',
    skills: [
      { name: 'Node.js & Express.js', level: 92, highlight: true, description: 'RESTful API design, middleware pipelines, error handling' },
      { name: 'FastAPI & Python', level: 86, highlight: true, description: 'Asynchronous APIs, Pydantic data modeling, high-throughput workers' },
      { name: 'MySQL & Relational Design', level: 90, highlight: true, description: 'Connection pooling, ACID transactions, indexing, complex joins' },
      { name: 'Supabase (Postgres & Auth)', level: 88, highlight: false, description: 'Row-Level Security (RLS), real-time listeners, Auth policies' },
      { name: 'Offline-First Architectures', level: 94, highlight: true, description: 'Local queues, sync reconciliation, NetInfo, retry backoff' }
    ]
  },
  {
    category: 'DevOps, Cloud & Infrastructure',
    iconName: 'cloud',
    skills: [
      { name: 'Docker & Containerization', level: 88, highlight: true, description: 'Multi-stage Dockerfiles, minimal image footprint, docker-compose' },
      { name: 'NGINX Reverse Proxy', level: 85, highlight: false, description: 'SSL termination, reverse proxy routing, rate-limiting headers' },
      { name: 'Jenkins CI/CD', level: 84, highlight: false, description: 'Automated test pipelines, webhooks, automated deploy scripts' },
      { name: 'AWS (EC2, IAM, S3)', level: 85, highlight: true, description: 'Instance provisioning, security groups, IAM least-privilege, S3' },
      { name: 'EAS Build & App Distribution', level: 90, highlight: true, description: 'TestFlight, Google Play Closed Testing, Apple Unlisted rollouts' },
      { name: 'Git, GitHub & CI/CD', level: 94, highlight: false, description: 'Trunk-based development, branch protection, code reviews' }
    ]
  },
  {
    category: 'AI, Gen-AI & Research',
    iconName: 'cpu',
    skills: [
      { name: 'LangChain Orchestration', level: 88, highlight: true, description: 'Prompt chaining, retrieval pipelines, multi-model agent loops' },
      { name: 'OpenAI & Gemini APIs', level: 90, highlight: true, description: 'Function calling, structured output generation, multi-provider failover' },
      { name: 'Prompt Engineering', level: 92, highlight: true, description: 'Few-shot learning, chain-of-thought, tone transformation' },
      { name: 'Scientific Research Methodology', level: 90, highlight: false, description: 'Formal empirical evaluation of Gen-AI in dev workflows' }
    ]
  }
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    degree: 'M.Sc. Computer Science',
    institution: 'Nowrosjee Wadia College',
    location: 'Pune, Maharashtra',
    year: '2026',
    score: '9.05',
    scoreType: 'CGPA',
    notes: 'Advanced Algorithms, Distributed Systems, Software Engineering, Mobile Architecture, and Machine Intelligence.'
  },
  {
    degree: 'B.Sc. Computer Science',
    institution: 'Poona College of Arts, Science and Commerce',
    location: 'Pune, Maharashtra',
    year: '2024',
    score: '9.05',
    scoreType: 'CGPA',
    notes: 'Core Computer Science: Data Structures, Database Management Systems, Operating Systems, OOP, Computer Networks.'
  },
  {
    degree: 'Higher Secondary Certificate (HSC) - Electronics Bifocal',
    institution: 'Poona College',
    location: 'Pune, Maharashtra',
    year: '2021',
    score: '94.00%',
    scoreType: 'Percentage',
    notes: 'Distinction in Mathematics, Physics, and Digital/Analog Electronics.'
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Don Bosco High School',
    location: 'Pune, Maharashtra',
    year: '2019',
    score: '87.60%',
    scoreType: 'Percentage',
    notes: 'Strong foundation in Science, Mathematics, and Analytical Reasoning.'
  }
];

export const RESEARCH_PAPER: ResearchPaper = {
  title: 'A Study on the Efficient and Effective Use of Gen-AI Tools in Software Development',
  authors: ['Bharathi, R.', 'Shaikh, A. A.', 'Inamdar, Z. A.'],
  year: 2026,
  journal: 'InSight Bulletin: A Multidisciplinary Interlink International Research Journal',
  volume: 'Vol. 3, Issue 1',
  page: 'Page 85',
  issn: '3065-7857',
  abstract:
    'This empirical investigation analyzes the quantitative and qualitative impacts of Generative AI tools (LLMs, code assistants, automated testing generators) integrated across software development lifecycles. We assess productivity acceleration, code quality metrics, architectural consistency, and security vulnerability introduction across industry-standard development teams. The paper outlines actionable prompt-engineering frameworks and developer guardrails to maximize throughput while preventing hallucinated technical debt.',
  keyContributions: [
    'Empirical productivity evaluation showing 35%+ velocity gains in boilerplate generation and automated test synthesis.',
    'Formulation of dual-layered developer review protocols to counteract AI hallucination and security regressions.',
    'Systematic prompt design strategies for complex architectural refactoring and API contract validation.',
    'Comparative benchmark of modern LLM assistants across frontend and backend full-stack ecosystems.'
  ],
  citationApa:
    'Bharathi, R., Shaikh, A. A., & Inamdar, Z. A. (2026). A Study on the Efficient and Effective Use of Gen-AI Tools in Software Development. InSight Bulletin: A Multidisciplinary Interlink International Research Journal, 3(1), 85. ISSN: 3065-7857.',
  citationBibtex: `@article{inamdar2026genai,
  title={A Study on the Efficient and Effective Use of Gen-AI Tools in Software Development},
  author={Bharathi, R. and Shaikh, A. A. and Inamdar, Zafarali Faizahmed},
  journal={InSight Bulletin: A Multidisciplinary Interlink International Research Journal},
  volume={3},
  number={1},
  pages={85},
  year={2026},
  issn={3065-7857}
}`,
  pdfUrl: 'https://ibrj.us/wp-content/uploads/030117.pdf',
  localPdfUrl: '/research-paper-genai-inamdar-2026.pdf'
};
