import { Boxes, Brain, GitPullRequest, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* -------------------------------------------------------------------------- */
/*  THE SINGLE SOURCE OF EDITABLE CONTENT                                     */
/*                                                                            */
/*  Everything a real person needs to change lives in this file. Edit the      */
/*  values below and the whole site updates. Design tokens (colours, fonts)    */
/*  live in tailwind.config.js instead.                                        */
/*                                                                            */
/*  Every factual claim below traces to a line of the owner's CV. Keep it      */
/*  that way: figures are quoted exactly (83.7%, 50+, 55% to 70%, over 5x,     */
/*  8%) and nothing here asserts availability for hire.                        */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Types ----------------------------------- */

export interface NavItem {
  id: string
  label: string
}

export interface Project {
  id: string
  /** Editorial index shown beside the title, e.g. '01'. */
  number: string
  title: string
  /** A single year, or a range such as '2020–2022' where one year would mislead. */
  year: string
  category: string
  description: string
  /** Unsplash placeholder — swap for your own image. */
  image: string
  /** Describe what is actually in the frame, for screen readers. */
  imageAlt: string
  /**
   * Destination for the card. `null` means "no destination yet": the card then
   * renders as a plain, non-interactive article rather than a link that goes
   * nowhere. Set a real URL to turn the whole card into one link.
   */
  href: string | null
  /** Drives the alternating editorial grid rhythm. */
  size: 'large' | 'standard'
}

export interface ExpertiseItem {
  number: '01' | '02' | '03' | '04'
  title: string
  description: string
  icon: LucideIcon
}

export interface ExperienceItem {
  id: string
  period: string
  role: string
  org: string
  summary: string
}

export interface EducationItem {
  id: string
  period: string
  degree: string
  field: string
  institution: string
  detail: string
}

export interface PublicationItem {
  id: string
  authors: string
  title: string
  venue: string
  year: string
  /** Full https DOI URL — the card links straight to it. */
  doi: string
}

export interface SocialLink {
  label: string
  href: string
}

export interface PersonalFact {
  label: string
  value: string
}

export interface Personal {
  name: string
  roles: string
  title: string
  /**
   * A neutral, factual status line for the hero badge — current role and base.
   * NOT an availability claim: the CV makes none, so the site makes none.
   */
  availability: string
  email: string
  location: string
  experienceYears: string
  focus: string
}

export interface About {
  label: string
  /** statementLead + statementEmphasis + statementRest form one sentence pair. */
  statementLead: string
  /** Rendered in Instrument Serif italic by the About component. */
  statementEmphasis: string
  statementRest: string
  paragraph: string
  facts: readonly PersonalFact[]
}

export interface WorkIntro {
  title: string
  intro: string
}

export interface Expertise {
  title: string
  items: readonly ExpertiseItem[]
}

export interface Experience {
  title: string
  items: readonly ExperienceItem[]
}

export interface Education {
  title: string
  items: readonly EducationItem[]
}

export interface Publications {
  title: string
  items: readonly PublicationItem[]
}

export interface Contact {
  label: string
  headingLead: string
  /** Rendered in Instrument Serif italic by the Contact component. */
  headingEmphasis: string
  headingRest: string
  body: string
  cta: string
}

export interface Footer {
  tagline: string
}

/* ------------------------------ Personal --------------------------------- */

export const personal: Personal = {
  name: 'Thang Le Viet',
  roles:
    'AI Engineer building agentic systems for software engineering: code review, bug localization, and codebase intelligence.',
  title: 'AI Engineer',
  availability: 'AI Engineer — FPT AI Center, Ho Chi Minh City',
  email: 'levietthang0512@outlook.com',
  location: 'Ho Chi Minh City, Viet Nam',
  experienceYears: '5 years',
  focus: 'Agentic AI for Software Engineering',
}

/* ------------------------------ Hero media -------------------------------- */

/** Placeholder showreel — replace with your own hosted video file. */
export const heroVideo: string =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4'

/** Shown while the hero video loads, and whenever it cannot play. */
export const heroPoster: string =
  'https://images.unsplash.com/photo-1693648793394-0b76b7eb042e?auto=format&fit=crop&w=1600&q=80'

/* -------------------------------- Nav ------------------------------------ */

export const nav: readonly NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' },
]

/* -------------------------------- About ---------------------------------- */

export const about: About = {
  label: 'About',
  statementLead: 'I am Thang Le Viet, an ',
  statementEmphasis: 'AI engineer specializing in agentic AI for software engineering',
  statementRest: '. I build production LLM systems that read, review, and reason about code.',
  paragraph:
    'Over the last five years I have shipped production ML and LLM systems, from ranking and recommendation models to prompt-based LLM products. Today I build enterprise coding agents for code review, bug localization, and codebase intelligence at FPT AI Center.',
  /*
   * Derived from `personal` on purpose: these three values are the single
   * source of truth, so editing them above updates the About facts row too.
   * Only the labels live here.
   */
  facts: [
    { label: 'Based in', value: personal.location },
    { label: 'Experience', value: personal.experienceYears },
    { label: 'Focus', value: personal.focus },
  ],
}

/* -------------------------------- Work ----------------------------------- */

export const work: WorkIntro = {
  title: 'Selected work',
  intro:
    'Production systems, research, and internal tools built across enterprise AI, LLM products, and applied machine learning.',
}

/**
 * Project imagery uses direct images.unsplash.com URLs as placeholders: dark,
 * abstract textures chosen to read as one system on black. Swap `image` for your
 * own art and rewrite `imageAlt` to describe the new frame.
 *
 * `size` alternates large (7 cols) / standard (5 cols) so each lg row sums to 12.
 */
export const projects: readonly Project[] = [
  {
    id: 'metis',
    number: '01',
    title: 'Metis',
    year: '2024',
    category: 'Codebase Intelligence',
    description:
      'A codebase-intelligence engine that auto-generates technical wikis via RAG and vector search over large multi-language repositories. Adopted by internal FPT engineering teams.',
    image:
      'https://images.unsplash.com/photo-1736843638421-9c3770d28c91?auto=format&fit=crop&w=1600&q=80',
    imageAlt:
      'Fine luminous contour lines tracing across a black field, like a topographic map in near darkness.',
    href: null,
    size: 'large',
  },
  {
    id: 'multi-agent-code-review',
    number: '02',
    title: 'Multi-Agent Code Review',
    year: '2024',
    category: 'Agentic Systems',
    description:
      'A LangGraph-based multi-agent system automating code review, code analysis, and bug localization across 50+ multi-language enterprise repositories.',
    image:
      'https://images.unsplash.com/photo-1709377058964-929af7f2d02f?auto=format&fit=crop&w=1600&q=80',
    imageAlt:
      'Parallel bands of dark teal silk folding over one another, catching a thin cold highlight.',
    href: null,
    size: 'standard',
  },
  {
    id: 'mainframe-modernization',
    number: '03',
    title: 'Mainframe Modernization Platform',
    year: '2024',
    category: 'Backend Systems',
    description:
      'Production Python backend services powering a mainframe code-analysis and modernization platform that surfaces legacy-system intelligence to developers.',
    image:
      'https://images.unsplash.com/photo-1527049979667-990f1d0d8e7f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Cracked dark rock in raking light, broken into irregular interlocking plates.',
    href: null,
    size: 'standard',
  },
  {
    id: 'writerzen-ai-copilot',
    number: '04',
    title: 'WriterZen AI Copilot',
    year: '2022–2023',
    category: 'LLM Product',
    description:
      'A prototype copilot automating end-to-end SEO workflows, content planning, and competitive analysis, built at Resonance Technology.',
    image:
      'https://images.unsplash.com/photo-1608501821300-4f99e58bba77?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Deep blue and black fluid marbling, swirled into thin veins against darkness.',
    href: null,
    size: 'large',
  },
  {
    id: 'be-food-search-ranking',
    number: '05',
    title: 'Be Food Search Ranking',
    year: '2021–2022',
    category: 'Applied ML',
    description:
      'Ranking algorithms for Be Food search that raised top-recommendation click-through from 55% to 70%.',
    image:
      'https://images.unsplash.com/photo-1710438399422-2fca27686bcd?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'A dark green ribbon of light curling back on itself against a black ground.',
    href: null,
    size: 'large',
  },
  {
    id: 'covidrop',
    number: '06',
    title: 'COVIDROP',
    year: '2020–2022',
    category: 'Research Dataset',
    description:
      'The first Vietnamese numerical-reasoning reading-comprehension dataset, based on DROP, with annotation guidelines and labeling tools.',
    image:
      'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Black sand raked into fine parallel ripples, grain visible across the surface.',
    href: 'https://doi.org/10.1007/s00521-024-09744-5',
    size: 'standard',
  },
]

/* ------------------------------ Expertise -------------------------------- */

export const expertise: Expertise = {
  title: 'What I do',
  items: [
    {
      number: '01',
      title: 'Agentic AI for Software Engineering',
      description:
        'Agentic code review, bug localization, codebase intelligence, and mainframe modernization.',
      icon: GitPullRequest,
    },
    {
      number: '02',
      title: 'LLM & Multi-Agent Systems',
      description:
        'LLM agents, multi-agent orchestration with LangGraph, RAG, prompt engineering, fine-tuning (LoRA), LLM evaluation, tool calling, and MCP.',
      icon: Workflow,
    },
    {
      number: '03',
      title: 'Machine Learning & Data',
      description:
        'PyTorch, Hugging Face Transformers, TensorFlow, ranking and recommendation, semantic search, and vector databases.',
      icon: Brain,
    },
    {
      number: '04',
      title: 'MLOps & Infrastructure',
      description: 'Docker, Kubernetes, FastAPI and REST APIs, and cloud across AWS, GCP, and Azure.',
      icon: Boxes,
    },
  ],
}

/* ------------------------------ Experience ------------------------------- */

export const experience: Experience = {
  title: 'Selected experience',
  items: [
    {
      id: 'fpt-ai-center',
      period: 'Jan 2024 – Present',
      role: 'AI Engineer',
      org: 'FPT AI Center · AI4SE Laboratory',
      summary:
        'Leads a LangGraph-based multi-agent system automating code review, code analysis, and bug localization across 50+ multi-language enterprise repositories.',
    },
    {
      id: 'resonance-technology',
      period: 'Apr 2022 – Oct 2023',
      role: 'AI Engineer',
      org: 'Resonance Technology',
      summary:
        'Lifted platform user engagement 83.7% by leading R&D on prompt-based LLM product features.',
    },
    {
      id: 'be-group',
      period: 'Jul 2021 – Apr 2022',
      role: 'Data Scientist',
      org: 'Be Group',
      summary:
        'Raised top-recommendation click-through from 55% to 70% by building ranking algorithms for Be Food search.',
    },
    {
      id: 'nlp-uit',
      period: 'Feb 2020 – Feb 2022',
      role: 'Research Assistant',
      org: 'NLP@UIT Laboratory, University of Information Technology',
      summary:
        'Built COVIDROP, the first Vietnamese numerical-reasoning reading-comprehension dataset, with annotation guidelines and labeling tools.',
    },
  ],
}

/* ------------------------------ Education -------------------------------- */

export const education: Education = {
  title: 'Education',
  items: [
    {
      id: 'msc-computer-science',
      period: 'Sep 2023 – Mar 2026',
      degree: 'Master of Science',
      field: 'Computer Science',
      institution: 'University of Information Technology',
      detail: 'GPA 3.7/4.0',
    },
    {
      id: 'bsc-data-science',
      period: 'Sep 2018 – Jan 2022',
      degree: 'Bachelor of Science',
      field: 'Data Science',
      institution: 'University of Information Technology',
      detail: 'GPA 3.6/4.0 — Top 1 in Major',
    },
  ],
}

/* ----------------------------- Publications ------------------------------ */

export const publications: Publications = {
  title: 'Publications',
  items: [
    {
      id: 'covidrop-nca-2024',
      authors: 'Van Nguyen, K., Le, T.V. & Do, T.P.P.',
      title:
        'Numerical reasoning reading comprehension on Vietnamese COVID-19 news: task, corpus, and challenges',
      venue: 'Neural Computing & Applications 36, 14053–14073',
      year: '2024',
      doi: 'https://doi.org/10.1007/s00521-024-09744-5',
    },
  ],
}

/* ------------------------------- Contact --------------------------------- */

export const contact: Contact = {
  label: 'Start a conversation',
  headingLead: 'Have a problem ',
  headingEmphasis: 'worth solving',
  headingRest: '?',
  body: 'Reach out about agentic AI, LLM systems, and AI for software engineering.',
  cta: 'Get in touch',
}

/* ------------------------------- Socials --------------------------------- */

/** Live profiles — these are the real destinations, not placeholders. */
export const socials: readonly SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/toreleon' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/thanglv' },
]

/* -------------------------------- Footer --------------------------------- */

export const footer: Footer = {
  tagline: 'Designed and built with intention.',
}
