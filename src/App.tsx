/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HorizontalScrollytelling } from './components/HorizontalScrollytelling';
import { ArchitectureVisualizer } from './components/ArchitectureVisualizer';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { ResearchPaperSection } from './components/ResearchPaperSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { ResumeModal } from './components/ResumeModal';
import { RecruiterFastDeck } from './components/RecruiterFastDeck';
import { SmoothScroll } from './components/SmoothScroll';
import { Project } from './types/portfolio';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isRecruiterDeckOpen, setIsRecruiterDeckOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isAnyModalOpen =
    isTerminalOpen || isResumeOpen || isRecruiterDeckOpen || selectedProject !== null;

  // Global hotkeys (Cmd/Ctrl + K for Terminal, Escape to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setIsResumeOpen(false);
        setIsRecruiterDeckOpen(false);
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenProjectById = (projectId: string) => {
    const proj = PROJECTS.find((p) => p.id === projectId);
    if (proj) {
      setSelectedProject(proj);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 relative selection:bg-sky-500 selection:text-white">
      {/* Lenis Smooth Scrolling Engine */}
      <SmoothScroll isModalOpen={isAnyModalOpen} />

      {/* Dynamic Physics / Constellation Canvas */}
      <BackgroundCanvas />

      {/* Dynamic Scroll Progress & HUD */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenRecruiterDeck={() => setIsRecruiterDeckOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="relative z-10 space-y-12">
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenRecruiterDeck={() => setIsRecruiterDeckOpen(true)}
        />

        {/* Pinned Horizontal Scrollytelling Journey */}
        <HorizontalScrollytelling
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Interactive Architecture Visualizer (AgroStock, TAIN Elect AI, AI Engine, DevOps) */}
        <ArchitectureVisualizer />

        {/* Flagship Production Projects */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Professional Work Experience Timeline */}
        <ExperienceSection
          onOpenProject={handleOpenProjectById}
        />

        {/* Verified Skills Matrix */}
        <SkillsSection />

        {/* Published Gen-AI Research Paper */}
        <ResearchPaperSection />

        {/* Academic Excellence & 9.05 CGPA Education */}
        <EducationSection />

        {/* Direct Contact Form & Recruiter Fast-Track */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Modals & Overlays */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSelectProject={handleOpenProjectById}
        onOpenResume={() => {
          setIsTerminalOpen(false);
          setIsResumeOpen(true);
        }}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <RecruiterFastDeck
        isOpen={isRecruiterDeckOpen}
        onClose={() => setIsRecruiterDeckOpen(false)}
        onOpenResume={() => {
          setIsRecruiterDeckOpen(false);
          setIsResumeOpen(true);
        }}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
