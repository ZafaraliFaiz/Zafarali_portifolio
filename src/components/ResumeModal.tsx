import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ExternalLink,
  Github,
  Linkedin,
  BookOpen,
  FileDown,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, RESEARCH_PAPER, EDUCATION_LIST } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'ats'>('pdf');

  const handlePrint = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore
    }
    window.print();
  };

  const handleCopyText = () => {
    const textResume = `
ZAFARALI FAIZAHMED INAMDAR
SOFTWARE DEVELOPER • FULL STACK & MOBILE
Pune, Maharashtra | ${PERSONAL_INFO.email} | ${PERSONAL_INFO.phone} | linkedin.com/in/zafarali-inamdar | github.com/ZafaraliFaiz

PROFESSIONAL SUMMARY
${PERSONAL_INFO.bio}

TECHNICAL SKILLS
• Languages: Java, Python, JavaScript, TypeScript, C, SQL
• Frontend & Mobile: React.js, Next.js, React Native (Expo, Expo Router), HeroUI, Material UI, HTML5/CSS3, Tailwind CSS, Redux Toolkit, Zustand, React Hook Form
• Backend, APIs & DevOps: Node.js, Express.js, FastAPI, MySQL, RESTful APIs, Docker, NGINX, Jenkins, AWS (EC2, IAM, S3), Vercel, Git/GitHub, CI/CD
• AI, Tools & Practices: LangChain, OpenAI API, Gemini API, Prompt Engineering, Postman, VS Code, OOP, Agile/Scrum, Code Reviews

PROFESSIONAL EXPERIENCE
TAIN ELECT AI (INDEPENDENT CONTRACTOR) - FREELANCE REACT NATIVE DEVELOPER (Aug 2026 – Present)
• Built a cross-platform (iOS/Android) field-operations app in React Native (Expo, Expo Router) for election canvassing agents.
• Designed an offline-first architecture with a local AsyncStorage write-queue, automatic background sync, retry-with-backoff, and NetInfo.
• Integrated Supabase (Auth, Postgres, Storage) with TanStack React Query and Zustand, plus expo-camera and role-based PII masking.
• Owned end-to-end iOS/Android release lifecycle via EAS Build & Submit: successfully published under Apple iOS Unlisted App Distribution, completed Google Play Closed Testing tracks, and published to production on the Google Play Store through Google Play Console.

NEBULA TECHNOLOGY - SOFTWARE DEVELOPER INTERN (Jan 2026 – Jun 2026)
• Built the React.js (Vite) frontend of a full-stack agriculture management system ("AgroStock") using Tailwind CSS, SCSS, and Material UI.
• Integrated Chart.js dashboards and automated PDF export/printing via jsPDF/AutoTable and react-to-print.
• Implemented Redux Toolkit state management, dynamic inventory stock deduction pipelines, and role-based access.

KNOWLEDGE KEEN - WEB DEVELOPMENT INTERN (May 2025 – Jul 2025)
• Developed full-stack business management modules ("Greentop") using Next.js (App Router), React.js, TypeScript, HeroUI, and Tailwind CSS.
• Built Express.js REST APIs backed by MySQL (connection pooling, parameterized queries, transactional writes) with Winston logging and PM2.

PROJECTS
• AI-Powered Email Translator: React.js, FastAPI, LangChain, MySQL, OpenAI/Gemini API - Full-stack AI platform to translate/reformat email content by tone and style.
• House Rent Admin: React.js, Node.js, Express.js, Docker, NGINX, Jenkins, AWS EC2 - Containerized with multi-stage Docker builds and Jenkins CI/CD pipeline.

RESEARCH PAPER
"${RESEARCH_PAPER.title}." Bharathi, R., Shaikh, A. A., and Inamdar, Z. A. (2026). InSight Bulletin: A Multidisciplinary Interlink International Research Journal, 3(1), 85. ISSN: 3065-7857.
Direct Paper PDF: https://ibrj.us/wp-content/uploads/030117.pdf

EDUCATION
• M.Sc. Computer Science | Nowrosjee Wadia College, Pune (2026) CGPA: 9.05
• B.Sc. Computer Science | Poona College, Pune (2024) CGPA: 9.05
• HSC (Electronics - Bifocal) | Poona College (2021) 94%
• SSC | Don Bosco High School (2019) 87.60%
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const textResume = `
ZAFARALI FAIZAHMED INAMDAR
SOFTWARE DEVELOPER • FULL STACK & MOBILE
Pune, Maharashtra | ${PERSONAL_INFO.email} | ${PERSONAL_INFO.phone} | linkedin.com/in/zafarali-inamdar | github.com/ZafaraliFaiz

PROFESSIONAL SUMMARY
${PERSONAL_INFO.bio}

TECHNICAL SKILLS
• Languages: Java, Python, JavaScript, TypeScript, C, SQL
• Frontend & Mobile: React.js, Next.js, React Native (Expo, Expo Router), HeroUI, Material UI, HTML5/CSS3, Tailwind CSS, Redux Toolkit, Zustand, React Hook Form
• Backend, APIs & DevOps: Node.js, Express.js, FastAPI, MySQL, RESTful APIs, Docker, NGINX, Jenkins, AWS (EC2, IAM, S3), Vercel, Git/GitHub, CI/CD
• AI, Tools & Practices: LangChain, OpenAI API, Gemini API, Prompt Engineering, Postman, VS Code, OOP, Agile/Scrum, Code Reviews

PROFESSIONAL EXPERIENCE
TAIN ELECT AI (INDEPENDENT CONTRACTOR) - FREELANCE REACT NATIVE DEVELOPER (Aug 2026 – Present)
• Built a cross-platform (iOS/Android) field-operations app in React Native (Expo, Expo Router) for election canvassing agents.
• Designed an offline-first architecture with a local AsyncStorage write-queue, automatic background sync, retry-with-backoff, and NetInfo.
• Integrated Supabase (Auth, Postgres, Storage) with TanStack React Query and Zustand, plus expo-camera and role-based PII masking.
• Owned end-to-end iOS/Android release lifecycle via EAS Build & Submit: successfully published under Apple iOS Unlisted App Distribution, completed Google Play Closed Testing tracks, and published to production on the Google Play Store through Google Play Console.

NEBULA TECHNOLOGY - SOFTWARE DEVELOPER INTERN (Jan 2026 – Jun 2026)
• Built the React.js (Vite) frontend of a full-stack agriculture management system ("AgroStock") using Tailwind CSS, SCSS, and Material UI.
• Integrated Chart.js dashboards and automated PDF export/printing via jsPDF/AutoTable and react-to-print.
• Implemented Redux Toolkit state management, dynamic inventory stock deduction pipelines, and role-based access.

KNOWLEDGE KEEN - WEB DEVELOPMENT INTERN (May 2025 – Jul 2025)
• Developed full-stack business management modules ("Greentop") using Next.js (App Router), React.js, TypeScript, HeroUI, and Tailwind CSS.
• Built Express.js REST APIs backed by MySQL (connection pooling, parameterized queries, transactional writes) with Winston logging and PM2.

PROJECTS
• AI-Powered Email Translator: React.js, FastAPI, LangChain, MySQL, OpenAI/Gemini API - Full-stack AI platform to translate/reformat email content by tone and style.
• House Rent Admin: React.js, Node.js, Express.js, Docker, NGINX, Jenkins, AWS EC2 - Containerized with multi-stage Docker builds and Jenkins CI/CD pipeline.

RESEARCH PAPER
"${RESEARCH_PAPER.title}." Bharathi, R., Shaikh, A. A., and Inamdar, Z. A. (2026). InSight Bulletin: A Multidisciplinary Interlink International Research Journal, 3(1), 85. ISSN: 3065-7857.
Direct Paper PDF: https://ibrj.us/wp-content/uploads/030117.pdf

EDUCATION
• M.Sc. Computer Science | Nowrosjee Wadia College, Pune (2026) CGPA: 9.05
• B.Sc. Computer Science | Poona College, Pune (2024) CGPA: 9.05
• HSC (Electronics - Bifocal) | Poona College (2021) 94%
• SSC | Don Bosco High School (2019) 87.60%
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([textResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Zafarali_Faizahmed_Inamdar_Resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={`resume-modal-overlay fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-2.5 md:p-3.5 bg-slate-950/70 backdrop-blur-2xl transition-all duration-300 ${
        isOpen ? 'flex' : 'hidden print:block'
      }`}
    >
      {/* Generated Dynamic Ambient Glow Backdrop (Removes dull grey, generates subtle radiant cosmic aura) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-sky-500/25 via-indigo-500/15 to-transparent rounded-full blur-3xl opacity-80 animate-pulse" />
        <div className="absolute -bottom-32 left-1/4 w-[750px] h-[450px] bg-gradient-to-t from-emerald-500/20 via-sky-500/10 to-transparent rounded-full blur-3xl opacity-70" />
      </div>

      <div 
        onClick={(e) => e.stopPropagation()}
        className="resume-modal-box relative w-full h-full sm:h-[98vh] max-w-6xl xl:max-w-7xl bg-white border-0 sm:border-2 border-slate-300/90 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-600 shrink-0" />

        {/* Top Control Bar (Never Printed) */}
        <div className="no-print flex flex-wrap items-center justify-between p-3 sm:p-4 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 gap-2 sm:gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 border-2 border-sky-300 flex items-center justify-center text-sky-700">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 text-sm sm:text-base font-display tracking-tight">
                Official Resume
              </span>
              <span className="text-[10px] font-mono bg-sky-100 text-sky-900 px-2.5 py-0.5 rounded-full border-2 border-sky-300 font-black shadow-2xs">
                v2026 Verified
              </span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-200 p-0.5 rounded-xl border-2 border-slate-300 ml-1 sm:ml-2">
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  viewMode === 'pdf'
                    ? 'bg-sky-600 text-white font-black shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                title="Preview original Google Drive PDF"
              >
                PDF Preview
              </button>
              <button
                type="button"
                onClick={() => setViewMode('ats')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  viewMode === 'ats'
                    ? 'bg-sky-600 text-white font-black shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                title="View ATS structured readable text layout"
              >
                ATS Text View
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Direct Download */}
            <a
              href="/Zafarali_Inamdar_Resume.pdf"
              download="Zafarali_Inamdar_Resume.pdf"
              id="resume-download-official-btn"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black hover:bg-emerald-500 active:scale-95 transition-all shadow-md shadow-emerald-600/20"
              title="Download official 1-page PDF directly"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            {/* Google Drive Link */}
            <a
              href="https://drive.google.com/file/d/1zJbDNuuUu1DTW65sB7WTlAqmrysI2cPM/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border-2 border-blue-300 hover:bg-blue-100 text-xs font-bold transition-colors"
              title="Open in Google Drive in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Google Drive</span>
            </a>

            <button
              onClick={handlePrint}
              id="resume-print-pdf-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-800 border-2 border-slate-300 hover:border-slate-400 text-xs font-bold transition-colors shadow-sm"
              title="Print directly or save clean 2-page PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden md:inline">Print</span>
            </button>

            <a
              href={RESEARCH_PAPER.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="GenAI_Research_Paper_Inamdar_2026.pdf"
              id="modal-download-research-paper-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 border-2 border-purple-300 hover:bg-purple-100 text-xs font-bold transition-all"
              title="Download published Gen-AI research paper PDF (030117.pdf)"
            >
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span className="hidden lg:inline">Paper PDF</span>
            </a>

            <button
              onClick={handleDownloadTxt}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-800 border-2 border-slate-300 hover:border-slate-400 text-xs font-bold transition-colors shadow-sm"
              title="Download text resume"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">.txt</span>
            </button>

            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-800 border-2 border-slate-300 hover:border-slate-400 text-xs font-bold transition-colors shadow-sm"
              title="Copy entire text to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Container (Visible when viewMode === 'pdf') */}
        {viewMode === 'pdf' && (
          <div className="no-print flex-1 w-full h-full p-2 sm:p-3 bg-slate-50 flex flex-col overflow-hidden">
            <div className="w-full h-full flex flex-col rounded-2xl overflow-hidden border-2 border-slate-200 bg-white shadow-lg">
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-50 border-b border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span className="font-semibold text-slate-900">Zafarali_Inamdar_Resume.pdf</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold hidden sm:inline-block">
                    Official 1-Page Document
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/Zafarali_Inamdar_Resume.pdf"
                    download="Zafarali_Inamdar_Resume.pdf"
                    className="flex items-center gap-1 px-3 py-1 rounded bg-emerald-600 text-white font-bold text-xs hover:brightness-110 transition-all shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                  <a
                    href="https://drive.google.com/file/d/1zJbDNuuUu1DTW65sB7WTlAqmrysI2cPM/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-white text-slate-700 hover:text-slate-900 text-xs border border-slate-200 transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden md:inline">Open Drive</span>
                  </a>
                </div>
              </div>
              <div className="flex-1 w-full h-full relative bg-white">
                <iframe
                  src="/Zafarali_Inamdar_Resume.pdf#toolbar=1"
                  className="w-full h-full border-none"
                  title="Official Resume PDF Preview"
                />
              </div>
            </div>
          </div>
        )}

        {/* Resume Scrollable Document Canvas (Always printed via @media print, visible on screen when viewMode === 'ats') */}
        <div
          className={`resume-scroll-canvas flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50/80 ${
            viewMode === 'ats' ? 'block' : 'hidden print:block'
          }`}
        >
          <div className="print-page max-w-3xl mx-auto bg-white text-[#111827] p-6 sm:p-10 rounded-xl shadow-2xl font-sans text-xs leading-relaxed selection:bg-cyan-200">
            {/* Header */}
            <div className="print-section text-center border-b pb-3.5 border-slate-300">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-slate-950 uppercase font-display">
                Zafarali Faizahmed Inamdar
              </h1>
              <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-700 uppercase mt-0.5">
                Software Developer • Full Stack & Mobile
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-600 mt-1.5 font-mono">
                <span>Pune, Maharashtra</span>
                <span>|</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-700 hover:underline">
                  {PERSONAL_INFO.email}
                </a>
                <span>|</span>
                <span>{PERSONAL_INFO.phone}</span>
                <span>|</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  linkedin.com/in/zafarali-inamdar
                </a>
                <span>|</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  github.com/ZafaraliFaiz
                </a>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mt-3.5 print-section">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                Professional Summary
              </h2>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="mt-3.5 print-section">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                Technical Skills
              </h2>
              <ul className="space-y-1 text-[11px] text-slate-700">
                <li>
                  <strong className="text-slate-900">• Languages:</strong> Java, Python, JavaScript, TypeScript, C, SQL
                </li>
                <li>
                  <strong className="text-slate-900">• Frontend & Mobile:</strong> React.js, Next.js, React Native (Expo, Expo Router), HeroUI, Material UI, HTML5/CSS3, Tailwind CSS, Redux Toolkit, Zustand, React Hook Form
                </li>
                <li>
                  <strong className="text-slate-900">• Backend, APIs & DevOps:</strong> Node.js, Express.js, FastAPI, MySQL, RESTful APIs, Docker, NGINX, Jenkins, AWS (EC2, IAM, S3), Vercel, Git/GitHub, CI/CD
                </li>
                <li>
                  <strong className="text-slate-900">• AI, Tools & Practices:</strong> LangChain, OpenAI API, Gemini API, Prompt Engineering, Postman, VS Code, OOP, Agile/Scrum, Code Reviews
                </li>
              </ul>
            </div>

            {/* Professional Experience */}
            <div className="mt-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
                Professional Experience
              </h2>

              {/* TAIN Elect AI */}
              <div className="mb-3 print-section">
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-[11px]">
                  <span>TAIN ELECT AI (INDEPENDENT CONTRACTOR)</span>
                  <span className="font-semibold text-slate-700">FREELANCE REACT NATIVE DEVELOPER</span>
                </div>
                <div className="text-[10px] text-slate-500 italic mb-1 font-mono">Aug 2026 – Present</div>
                <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-slate-700 leading-normal">
                  <li>Built a cross-platform (iOS/Android) field-operations app in React Native (Expo, Expo Router) for election canvassing agents, covering member management, voter counselling, and live election-day polling.</li>
                  <li>Designed an offline-first architecture with a local AsyncStorage write-queue, automatic background sync, retry-with-backoff, and live connection-state feedback via NetInfo.</li>
                  <li>Integrated Supabase (Auth, Postgres, Storage) with TanStack React Query and Zustand, plus expo-camera for compressed photo capture; implemented a permission-driven UI with role-based PII masking and a hardened, role-restricted auth flow (expo-secure-store).</li>
                  <li>Owned end-to-end iOS/Android release lifecycle via EAS Build &amp; Submit: successfully published under <a href="https://apps.apple.com/us/app/tain-electai/id6807301293" target="_blank" rel="noopener noreferrer" className="text-sky-700 underline font-bold hover:text-sky-900">Apple iOS Unlisted App Distribution</a>, completed Google Play Closed Testing tracks, and published to production on the <a href="https://play.google.com/store/apps/details?id=com.elitespro.BEMS&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-bold hover:text-emerald-900">Google Play Store via Google Play Console</a>.</li>
                </ul>
              </div>

              {/* Nebula Technology */}
              <div className="mb-3 print-section">
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-[11px]">
                  <span>NEBULA TECHNOLOGY</span>
                  <span className="font-semibold text-slate-700">SOFTWARE DEVELOPER INTERN</span>
                </div>
                <div className="text-[10px] text-slate-500 italic mb-1 font-mono">Jan 2026 – Jun 2026</div>
                <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-slate-700 leading-normal">
                  <li>Built the React.js (Vite) frontend of a full-stack agriculture management system using Tailwind CSS, SCSS, and Material UI, covering product catalog, purchase, stock, sales billing, ledger, and returns, with Chart.js dashboards and automated PDF export/printing via jsPDF/AutoTable and react-to-print.</li>
                  <li>Implemented Redux Toolkit state management, dynamic inventory stock deduction with low-stock alerts, and role-based access (Super Admin/Sub Admin) with protected routes and validated forms (React Hook Form, Yup).</li>
                </ul>
              </div>

              {/* Knowledge Keen */}
              <div className="mb-2 print-section">
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-[11px]">
                  <span>KNOWLEDGE KEEN</span>
                  <span className="font-semibold text-slate-700">WEB DEVELOPMENT INTERN</span>
                </div>
                <div className="text-[10px] text-slate-500 italic mb-1 font-mono">May 2025 – Jul 2025</div>
                <ul className="list-disc pl-4 space-y-1 text-[10.5px] text-slate-700 leading-normal">
                  <li>Developed full-stack business management modules (supplier, customer, product, order, dispatch, dashboard) using Next.js (App Router), React.js, TypeScript, HeroUI, and Tailwind CSS, with reusable components and a typed custom data-fetching hook.</li>
                  <li>Built Express.js REST APIs backed by MySQL (connection pooling, parameterized queries, transactional writes) for orders, dispatches, tax invoices, and batches, with Winston logging and PM2; collaborated via Git/GitHub, pull requests, and code reviews.</li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div className="mt-4 print-section">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                Projects
              </h2>
              <ul className="space-y-1.5 text-[10.5px] text-slate-700 leading-normal">
                <li>
                  <strong className="text-slate-900">• AI-Powered Email Translator</strong> | React.js, FastAPI, LangChain, MySQL, OpenAI/Gemini API — Full-stack AI platform to translate/reformat email content by tone and style, with multi-provider LLM switching, FastAPI/Pydantic REST endpoints, and MySQL-backed translation history.
                </li>
                <li>
                  <strong className="text-slate-900">• House Rent Admin</strong> | React.js, Node.js, Express.js, Docker, NGINX, Jenkins, AWS EC2 — Rent management app (React.js, Node.js/Express.js REST API) containerized with multi-stage Docker builds, NGINX reverse proxy, and a Jenkins CI/CD pipeline to AWS EC2.
                </li>
              </ul>
            </div>

            {/* Research Paper */}
            <div className="mt-4 print-section">
              <div className="flex items-center justify-between border-b border-slate-300 pb-0.5 mb-1.5">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900">
                  Published Research Paper
                </h2>
                <a
                  href={RESEARCH_PAPER.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-purple-700 hover:text-purple-900 font-bold underline flex items-center gap-1 no-print"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Download / View Paper PDF</span>
                </a>
              </div>
              <p className="text-[10.5px] text-slate-700 leading-normal">
                &ldquo;A Study on the Efficient and Effective Use of Gen-AI Tools in Software Development.&rdquo; Bharathi, R., Shaikh, A. A., and Inamdar, Z. A. (2026). <span className="italic">InSight Bulletin: A Multidisciplinary Interlink International Research Journal</span>, 3(1), 85. ISSN: 3065-7857.
              </p>
              <div className="mt-1 text-[10px] font-mono text-slate-600">
                Official Paper PDF: <a href={RESEARCH_PAPER.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">{RESEARCH_PAPER.pdfUrl}</a>
              </div>
            </div>

            {/* Education */}
            <div className="mt-4 print-section">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5">
                Education
              </h2>
              <div className="space-y-1 text-[10.5px] text-slate-700">
                <div className="flex justify-between">
                  <span>M.Sc. Computer Science | Nowrosjee Wadia College, Pune (2026)</span>
                  <span className="font-bold text-slate-900 font-mono">CGPA: 9.05</span>
                </div>
                <div className="flex justify-between">
                  <span>B.Sc. Computer Science | Poona College, Pune (2024)</span>
                  <span className="font-bold text-slate-900 font-mono">CGPA: 9.05</span>
                </div>
                <div className="flex justify-between">
                  <span>HSC (Electronics - Bifocal) | Poona College (2021)</span>
                  <span className="font-bold text-slate-900 font-mono">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>SSC | Don Bosco High School (2019)</span>
                  <span className="font-bold text-slate-900 font-mono">87.60%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (No Print) */}
        <div className="no-print p-3 sm:p-4 bg-[#0e1629] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Candidate: <strong className="text-white">Zafarali Faizahmed Inamdar</strong> • Pune, MH
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/Zafarali_Inamdar_Resume.pdf"
              download="Zafarali_Inamdar_Resume.pdf"
              className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume (PDF)</span>
            </a>
            <a
              href="https://drive.google.com/file/d/1zJbDNuuUu1DTW65sB7WTlAqmrysI2cPM/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-slate-900 text-blue-300 border border-blue-500/30 text-xs font-semibold hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Google Drive</span>
            </a>
            <a
              href="https://wa.me/919860800543?text=Hi%20Zafarali,%20I%20reviewed%20your%20resume%20and%20portfolio%20and%20would%20like%20to%20connect%20regarding%20an%20engineering%20opportunity."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <MessageCircle className="w-3.5 h-3.5 text-slate-950" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
