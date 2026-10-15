/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { SplashPreloader } from './components/SplashPreloader';
import { Hero } from './components/Hero';
import { KeywordMarquee } from './components/KeywordMarquee';
import { HangingIdCardSection } from './components/HangingIdCardSection';
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
import { AboutMyselfModal } from './components/AboutMyselfModal';
import { SmoothScroll } from './components/SmoothScroll';
import { Project } from './types/portfolio';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isRecruiterDeckOpen, setIsRecruiterDeckOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const isAnyModalOpen =
    isTerminalOpen ||
    isResumeOpen ||
    isRecruiterDeckOpen ||
    isAboutModalOpen ||
    selectedProject !== null;

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
        setIsAboutModalOpen(false);
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
      {/* FEAT-01: Animated Splash Preloader */}
      {showPreloader && (
        <SplashPreloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Lenis Smooth Scrolling Engine */}
      <SmoothScroll isModalOpen={isAnyModalOpen} />

      {/* Dynamic Physics / Constellation Canvas */}
      <BackgroundCanvas />

      {/* Dynamic Scroll Progress & HUD */}
      <ScrollProgress />

      {/* FEAT-02: Fixed Glassmorphic Navigation with Live System Clock */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenRecruiterDeck={() => setIsRecruiterDeckOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenRecruiterDeck={() => setIsRecruiterDeckOpen(true)}
        />

        {/* FEAT-03: Infinite Horizontal Keyword Marquee Ticker */}
        <KeywordMarquee />

        {/* FEAT-04: Developer Intro & Interactive Physics-Based 3D Hanging ID Card */}
        <HangingIdCardSection
          onOpenAboutModal={() => setIsAboutModalOpen(true)}
        />

        {/* Pinned Horizontal Scrollytelling Journey */}
        <HorizontalScrollytelling
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Interactive Architecture Visualizer (AgroStock, TAIN Elect AI, AI Engine, DevOps) */}
        <ArchitectureVisualizer />

        {/* FEAT-06 & FEAT-07: Segmented Multi-Tab Portfolio Showcase & Brand Glow Tech Grid */}
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

        {/* FEAT-08: Direct Contact Form & WhatsApp Quick-Action Channels */}
        <ContactSection />
      </main>

      {/* FEAT-09: Interactive Social Footer with Circular Glassmorphic Buttons */}
      <Footer
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* FEAT-05: Dedicated "About Myself" Full-Screen Modal Overlay */}
      <AboutMyselfModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
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
