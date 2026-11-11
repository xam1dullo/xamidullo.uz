export interface ProjectArchitecture {
  problem: string;
  solution: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  diagramNodes: { id: string; label: string; role: string }[];
}

export interface Project {
  id: string;
  type: string;
  name: string;
  description: string;
  stack: string[];
  url: string;
  featured?: boolean;
  architecture?: ProjectArchitecture;
}

export interface ArchiveProject {
  mark: string;
  name: string;
  meta: string;
  description: string;
  url: string;
}

export interface PrincipleItem {
  number: string;
  title: string;
  detail: string;
}

export interface Capability {
  number: string;
  title: string;
  detail: string;
  tags?: string[];
}

export interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  detail: string;
  skills?: string[];
  outcomes?: string[];
}

export interface MetricItem {
  value: string;
  suffix: string;
  label: string;
  detail: string;
  numericTarget: number;
}

export interface LocaleContent {
  nav: {
    about: string;
    work: string;
    experience: string;
    blog: string;
    contact: string;
    availability: string;
  };
  hero: {
    eyebrow: string;
    fullName: string;
    title: string;
    titleHtml: string;
    summary: string;
    roleLabel: string;
    roleValue: string;
    mottoBadge: string;
    telegramCta: string;
    worksCta: string;
    cliCta: string;
  };
  metricsHeading: {
    eyebrow: string;
    title: string;
    summary: string;
  };
  principlesHeading: {
    eyebrow: string;
    title: string;
    summary: string;
    quote: string;
    quoteAuthor: string;
  };
  principles: PrincipleItem[];
  rangeHeading: {
    eyebrow: string;
    title: string;
    summary: string;
  };
  workHeading: {
    eyebrow: string;
    title: string;
    summary: string;
    caseStudyBtn: string;
    archiveTitle: string;
    archiveSubtitle: string;
  };
  archiveProjects: ArchiveProject[];
  experienceHeading: {
    eyebrow: string;
    title: string;
    summary: string;
  };
  blogHeading: {
    eyebrow: string;
    title: string;
    summary: string;
    allPosts: string;
  };
  knowledge: {
    eyebrow: string;
    title: string;
    summary: string;
    mentorOrg: string;
    mentorRole: string;
    blogLink: string;
    blogDesc: string;
    linkedinTitle: string;
    linkedinDesc: string;
    eduLabel: string;
    eduYears: string;
    eduTitle: string;
    eduDegree: string;
    eduSummary: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    summary: string;
    telegramBtn: string;
    linkedinBtn: string;
    location: string;
    footerNote: string;
  };
  drawer: {
    caseStudy: string;
    problem: string;
    solution: string;
    highlights: string;
    metrics: string;
    topology: string;
    liveBtn: string;
  };
  telemetry: {
    status: string;
    uptime: string;
    latency: string;
    build: string;
    version: string;
  };
  metrics: MetricItem[];
  capabilities: Capability[];
  projects: Project[];
  experience: ExperienceItem[];
}
