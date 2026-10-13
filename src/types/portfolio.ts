export interface Project {
  id: string;
  title: string;
  clientOrOrg?: string;
  tagline: string;
  category: 'Full Stack' | 'Mobile' | 'AI & Gen-AI' | 'DevOps & Cloud';
  period: string;
  description: string;
  keyHighlights: string[];
  technologies: string[];
  badge: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
  architectureOverview?: string;
  architectureNodes?: { title: string; desc: string; icon: string }[];
  demoType?: 'interactive-flow' | 'simulation' | 'preview';
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  logoUrl?: string;
  previewImages?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Contract / Freelance' | 'Internship' | 'Full-time';
  summary: string;
  highlights: string[];
  technologies: string[];
  associatedProject?: string;
  accentColor: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 1-100
    highlight?: boolean;
    description: string;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  year: string;
  score: string;
  scoreType: 'CGPA' | 'Percentage';
  notes?: string;
}

export interface ResearchPaper {
  title: string;
  authors: string[];
  year: number;
  journal: string;
  volume: string;
  page: string;
  issn: string;
  abstract: string;
  keyContributions: string[];
  citationApa: string;
  citationBibtex: string;
  pdfUrl: string;
  localPdfUrl?: string;
}
