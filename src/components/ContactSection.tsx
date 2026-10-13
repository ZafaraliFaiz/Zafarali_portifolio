import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    roleType: 'Full-Time Engineering Role',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const roleTypes = [
    'Full-Time Engineering Role',
    'Technical Interview / Screening',
    'Freelance / Contract Project',
    'Gen-AI System Collaboration',
  ];

  const handlePreFill = (type: 'interview' | 'fullstack' | 'mobile') => {
    if (type === 'interview') {
      setFormData({
        name: '',
        email: '',
        company: '',
        roleType: 'Technical Interview / Screening',
        message: 'Hi Zafarali, we reviewed your work on Krushi and BEMS and would love to schedule a technical screening interview for a Software Engineer position.',
      });
    } else if (type === 'fullstack') {
      setFormData({
        name: '',
        email: '',
        company: '',
        roleType: 'Full-Time Engineering Role',
        message: 'Hi Zafarali, we are impressed by your React/Next.js and full-stack API background and would like to discuss an opportunity on our engineering team.',
      });
    } else {
      setFormData({
        name: '',
        email: '',
        company: '',
        roleType: 'Freelance / Contract Project',
        message: 'Hi Zafarali, we have a project requiring offline-first React Native (Expo) architecture similar to your work on BEMS. Are you available for a brief call?',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    setSubmitted(true);
  };

  const handleSendViaMailClient = () => {
    const subject = encodeURIComponent(`[${formData.roleType}] Inquiry from ${formData.name || 'Hiring Team'} (${formData.company || 'Direct'})`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nRole Type: ${formData.roleType}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/60">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Let&apos;s Build Something{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Exceptional Together
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Recruiter, engineering manager, founder, or collaborator? Reach out directly to discuss opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <span>Fast-Track Connection</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                I am actively interviewing and open to high-impact full-stack and mobile engineering positions. 
                Guaranteed response within 24 hours.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 pt-2">
                {/* Email */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Direct Email</div>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs sm:text-sm font-mono text-white hover:text-cyan-300 font-bold">
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Phone & WhatsApp</div>
                      <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs sm:text-sm font-mono text-white hover:text-emerald-300 font-bold">
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white transition-colors"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Location & Relocation</div>
                    <div className="text-xs sm:text-sm font-bold text-white font-mono">
                      Pune, Maharashtra, India (Open to Remote / Hybrid / Relocation)
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-950/50 text-blue-300 border border-blue-500/30 hover:bg-blue-900/50 text-xs font-mono font-bold transition-all"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-500 text-xs font-mono font-bold transition-all"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
              {/* Pre-fill Quick Chips */}
              <div className="mb-6">
                <div className="text-xs font-mono text-slate-400 mb-2">
                  ⚡ Recruiter Shortcuts (Click to prefill message):
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handlePreFill('interview')}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 text-xs font-mono transition-colors"
                  >
                    Schedule Interview
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreFill('fullstack')}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 text-xs font-mono transition-colors"
                  >
                    Full Stack Role
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreFill('mobile')}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 text-xs font-mono transition-colors"
                  >
                    Mobile Project
                  </button>
                </div>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-display">
                    Thank You, {formData.name || 'Friend'}!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                    Your inquiry has been generated. To ensure zero delivery delay, you can dispatch it directly to Zafarali&apos;s inbox with 1 click:
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button
                      onClick={handleSendViaMailClient}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-xs sm:text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Launch In Default Mail Client</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 text-xs font-semibold hover:text-white"
                    >
                      Edit Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Role Type Selection */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-2">
                      Inquiry Intent:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {roleTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, roleType: type })}
                          className={`p-2.5 rounded-xl text-xs font-mono text-left transition-all border ${
                            formData.roleType === type
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                              : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Your Name / Team Lead *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor / Tech Recruiter"
                        className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@company.com"
                        className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Corp / Tech Recruiting Agency"
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Message / Project Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding the role, timeline, tech stack, or proposed interview slot..."
                      className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl p-3.5 text-xs text-white placeholder:text-slate-600 outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-cyan-500/25"
                    >
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Send Direct Message</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaMailClient}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400 text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Open in Mail Client</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
