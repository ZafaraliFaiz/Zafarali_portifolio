import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, EDUCATION_LIST, RESEARCH_PAPER } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenResume: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">
            Zafarali Inamdar - Interactive Developer Shell [v2.26.0]
          </p>
          <p className="text-slate-400">
            Type <span className="text-emerald-400 font-semibold">&apos;help&apos;</span> to view available commands, or click any suggestion below.
          </p>
        </div>
      ),
    },
  ]);

  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const commandLog = useRef<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const quickCommands = [
    'help',
    'projects',
    'agrostock',
    'greentop',
    'tain',
    'cat resume',
    'skills',
    'sudo hire zafarali',
  ];

  const handleExecute = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    commandLog.current.push(trimmed);
    setCommandIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p className="text-cyan-400 font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-mono">
              <div><span className="text-emerald-400">whoami</span> - Developer bio & credentials</div>
              <div><span className="text-emerald-400">projects</span> - List flagship projects</div>
              <div><span className="text-emerald-400">agrostock</span> - Deep dive into AgroStock ERP (Nebula)</div>
              <div><span className="text-emerald-400">greentop</span> - Deep dive into Greentop B2B Suite</div>
              <div><span className="text-emerald-400">tain</span> - Deep dive into TAIN Elect AI Mobile App</div>
              <div><span className="text-emerald-400">skills</span> - Full technical skill tree</div>
              <div><span className="text-emerald-400">experience</span> - Work & internships history</div>
              <div><span className="text-emerald-400">education</span> - Academic scores (9.05 CGPA)</div>
              <div><span className="text-emerald-400">research</span> - Published Gen-AI paper info</div>
              <div><span className="text-emerald-400">cat resume</span> - View formatted CV summary</div>
              <div><span className="text-emerald-400">contact</span> - Email, Phone, Socials</div>
              <div><span className="text-amber-400">sudo hire zafarali</span> - Priority recruitment pipeline</div>
              <div><span className="text-emerald-400">clear</span> - Clear terminal window</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p className="font-bold text-white">{PERSONAL_INFO.name}</p>
            <p className="text-cyan-400">{PERSONAL_INFO.title}</p>
            <p className="text-slate-400">{PERSONAL_INFO.location}</p>
            <p className="text-xs mt-2 text-slate-300 leading-relaxed">{PERSONAL_INFO.bio}</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2">
            <p className="text-cyan-400 font-bold">Production Projects & Architecture:</p>
            {PROJECTS.map((p) => (
              <div key={p.id} className="text-xs p-2 rounded bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{p.title}</span>
                  <span className="text-cyan-300 font-mono text-[10px]">{p.category}</span>
                </div>
                <p className="text-slate-400 mt-0.5">{p.tagline}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {p.technologies.slice(0, 5).map((t) => (
                    <span key={t} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'agrostock':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-emerald-400 font-bold">AgroStock - Agriculture ERP (Nebula Technology)</p>
            <p className="text-slate-300">
              Frontend architected in React.js (Vite), Tailwind, SCSS, and Material UI. Built 7+ modules:
              Catalog, Purchasing, Stock tracking, Sales billing, Financial ledger, Returns, and automated PDF reporting (jsPDF).
            </p>
            <p className="text-slate-400">
              State: Redux Toolkit | Auth: Axios token refresh with HTTP-only cookies | RBAC: Super Admin/Sub Admin.
            </p>
          </div>
        );
        break;

      case 'greentop':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-purple-400 font-bold">Greentop - Enterprise B2B Supply Suite (Knowledge Keen)</p>
            <p className="text-slate-300">
              Full-stack operations modules built in Next.js (App Router), HeroUI, and Tailwind CSS.
              Powered by Express.js REST APIs backed by MySQL connection pooling and ACID transactional writes.
            </p>
            <p className="text-slate-400">
              Observability: Winston daily rotating logs | Runtime: PM2 process clustering.
            </p>
          </div>
        );
        break;

      case 'tain':
      case 'tain-electai':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-sky-400 font-bold">TAIN Elect AI - Field Operations & Voter Suite</p>
            <p className="text-slate-300">
              Cross-platform React Native (Expo Router) app with custom offline-first AsyncStorage write-queue,
              NetInfo connectivity listeners, and automatic background sync with exponential backoff.
            </p>
            <p className="text-slate-400">
              Backend: Supabase Postgres & Auth | Native: Expo Camera, SecureStore | Release: EAS Build, Apple Unlisted & Google Closed Testing.
            </p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-400 font-bold">Technical Skills Tree:</p>
            <div>
              <span className="text-slate-400 font-semibold">Languages: </span>
              <span className="text-slate-200">Java, Python, JavaScript, TypeScript, C, SQL</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Frontend & Mobile: </span>
              <span className="text-slate-200">React.js, Next.js, React Native (Expo), HeroUI, Material UI, Tailwind CSS, Redux Toolkit, Zustand, React Hook Form</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Backend & DevOps: </span>
              <span className="text-slate-200">Node.js, Express.js, FastAPI, MySQL, RESTful APIs, Docker, NGINX, Jenkins, AWS (EC2, IAM, S3), Vercel, CI/CD</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">AI & Tools: </span>
              <span className="text-slate-200">LangChain, OpenAI API, Gemini API, Prompt Engineering, Postman, Git/GitHub, Code Reviews</span>
            </div>
          </div>
        );
        break;

      case 'experience':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-400 font-bold">Work Experience:</p>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="border-l-2 border-cyan-500 pl-2">
                <div className="font-bold text-white">{exp.role}</div>
                <div className="text-cyan-300">{exp.company} • {exp.period}</div>
                <p className="text-slate-400 mt-1">{exp.summary}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-emerald-400 font-bold">Academic Record:</p>
            {EDUCATION_LIST.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-300">
                <span>{edu.degree} ({edu.institution}, {edu.year})</span>
                <span className="text-emerald-400 font-mono font-bold">{edu.score}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'research':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-purple-400 font-bold">Published Research Paper:</p>
            <p className="text-white italic">&quot;{RESEARCH_PAPER.title}&quot;</p>
            <p className="text-slate-400">
              Journal: {RESEARCH_PAPER.journal} ({RESEARCH_PAPER.year}) • ISSN: {RESEARCH_PAPER.issn}
            </p>
            <p className="text-slate-400">
              Authors: {RESEARCH_PAPER.authors.join(', ')}
            </p>
            <div className="pt-1">
              <a
                href={RESEARCH_PAPER.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-semibold hover:bg-purple-500/30 transition-colors"
              >
                <span>Download Research Paper PDF (030117.pdf)</span>
              </a>
            </div>
          </div>
        );
        break;

      case 'cat resume':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-emerald-400 font-bold">Resume Summary for Zafarali Faizahmed Inamdar:</p>
            <p className="text-slate-300">
              Location: Pune, Maharashtra | Email: zafaraliinamdar@gmail.com | Phone: 9860800543
            </p>
            <p className="text-slate-400">
              Experienced in high-throughput React/Next.js web platforms, offline-first React Native mobile applications,
              and Gen-AI pipeline development.
            </p>
            <button
              onClick={onOpenResume}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold hover:bg-emerald-500/30"
            >
              Click here to open printable / downloadable Resume Sheet
            </button>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-400 font-bold">Get In Touch Directly:</p>
            <p className="text-slate-300">Email: <a href="mailto:zafaraliinamdar@gmail.com" className="text-cyan-400 underline">zafaraliinamdar@gmail.com</a></p>
            <p className="text-slate-300">Phone: <a href="tel:+919860800543" className="text-emerald-400 underline">+91 9860800543</a></p>
            <p className="text-slate-300">LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">linkedin.com/in/zafarali-inamdar</a></p>
            <p className="text-slate-300">GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-white underline">github.com/ZafaraliFaiz</a></p>
          </div>
        );
        break;

      case 'sudo hire zafarali':
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore
        }
        outputNode = (
          <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-400 text-xs space-y-2">
            <p className="text-emerald-300 font-bold text-sm">🎉 PERMISSION GRANTED: ACCESS LEVEL ROOT</p>
            <p className="text-slate-200">
              Outstanding decision! Zafarali is ready to accelerate your engineering team with production React/Next.js,
              React Native mobile resilience, and Gen-AI system architectures.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://wa.me/919860800543?text=Hi%20Zafarali,%20I%20would%20like%20to%20connect%20regarding%20an%20engineering%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
              >
                Chat on WhatsApp (+91 9860800543)
              </a>
              <a
                href="#contact"
                onClick={onClose}
                className="px-3 py-1 rounded bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs hover:bg-slate-700 transition-colors"
              >
                Go to Contact Form
              </a>
              <a
                href="mailto:zafaraliinamdar@gmail.com?subject=Interview%20Invitation%20for%20Zafarali%20Inamdar"
                className="px-3 py-1 rounded bg-slate-900 text-slate-300 border border-slate-700 text-xs hover:text-white transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <div className="text-rose-400 text-xs">
            Command not recognized: &quot;{trimmed}&quot;. Type <span className="text-cyan-400 underline font-bold">&apos;help&apos;</span> for the list of available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: trimmed, output: outputNode }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecute(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandLog.current.length > 0) {
        const nextIdx = commandIndex + 1;
        if (nextIdx < commandLog.current.length) {
          setCommandIndex(nextIdx);
          setInputVal(commandLog.current[commandLog.current.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const nextIdx = commandIndex - 1;
        setCommandIndex(nextIdx);
        setInputVal(commandLog.current[commandLog.current.length - 1 - nextIdx]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#070b14] border border-cyan-500/40 rounded-2xl shadow-2xl flex flex-col h-[80vh] max-h-[640px] overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0c1222] border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-xs font-mono text-cyan-300 ml-2 font-semibold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              zafarali@dev-system: ~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Command Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <span className="text-slate-500">guest@zafarali:~$</span>
                <span>{item.command}</span>
              </div>
              <div className="pl-3">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestions Chips */}
        <div className="px-4 py-2 bg-[#090e1b] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono scrollbar-none">
          <span className="text-slate-500 shrink-0">Quick run:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleExecute(cmd)}
              className="shrink-0 px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-[#0a101f] border-t border-cyan-500/20 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xs font-bold pl-1">
            zafarali@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (e.g. 'help', 'agrostock', 'tain', 'skills', 'sudo hire zafarali')..."
            className="flex-1 bg-transparent border-none text-slate-100 font-mono text-xs focus:outline-none placeholder:text-slate-600"
          />
          <button
            onClick={() => handleExecute(inputVal)}
            className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
