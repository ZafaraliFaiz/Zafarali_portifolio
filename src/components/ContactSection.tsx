import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  MessageCircle,
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
import { ScrollAssemble } from './animations/ScrollAssemble';
import { ScrollFocusZoom } from './animations/ScrollFocusZoom';

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

  const [copiedMessage, setCopiedMessage] = useState(false);

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
        message: 'Hi Zafarali, we reviewed your work on AgroStock and TAIN Elect AI and would love to schedule a technical screening interview for a Software Engineer position.',
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
        message: 'Hi Zafarali, we have a project requiring offline-first React Native (Expo) architecture similar to your work on TAIN Elect AI. Are you available for a brief call?',
      });
    }
  };

  const getEmailSubject = () => {
    return `[${formData.roleType}] Inquiry from ${formData.name || 'Hiring Team'} (${formData.company || 'Direct'})`;
  };

  const getEmailBody = () => {
    return `Hi Zafarali,\n\nName: ${formData.name || 'Hiring Team'}\nEmail: ${formData.email || 'Not specified'}\nCompany: ${formData.company || 'Direct Inquiry'}\nRole / Intent: ${formData.roleType}\n\nMessage Details:\n${formData.message || 'I would like to discuss an engineering opportunity with you.'}\n\n---\nSent via portfolio inquiry form`;
  };

  const handleSendViaGmail = () => {
    const subject = encodeURIComponent(getEmailSubject());
    const body = encodeURIComponent(getEmailBody());
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  };

  const getWhatsAppMessage = () => {
    const lines = [
      `*New Portfolio Inquiry for Zafarali Inamdar*`,
      ``,
      `*Intent:* ${formData.roleType}`,
      `*Name:* ${formData.name || 'Hiring Team'}`,
      `*Email:* ${formData.email || 'Not specified'}`,
    ];
    if (formData.company) {
      lines.push(`*Company:* ${formData.company}`);
    }
    lines.push(
      ``,
      `*Message Details:*`,
      formData.message || 'Hi Zafarali, I would like to connect with you regarding an engineering opportunity.',
      ``,
      `_Sent via zafarali-portfolio_`
    );
    return lines.join('\n');
  };

  const handleSendViaWhatsApp = () => {
    const text = encodeURIComponent(getWhatsAppMessage());
    const phoneDigits = PERSONAL_INFO.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${phoneDigits}?text=${text}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(getWhatsAppMessage());
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
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
    // Direct to WhatsApp (not Gmail)
    handleSendViaWhatsApp();
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
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollAssemble direction="top">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border-2 border-sky-300 text-sky-800 text-xs font-mono uppercase tracking-wider mb-3 font-bold shadow-sm">
              <MessageSquare className="w-4 h-4 text-sky-600 stroke-[2.5]" />
              <span>Direct Inquiries</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
              Let&apos;s Build Something{' '}
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Exceptional Together
              </span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base mt-2 font-medium leading-relaxed">
              Recruiter, engineering manager, founder, or collaborator? Reach out directly to discuss opportunities.
            </p>
          </div>
        </ScrollAssemble>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollAssemble direction="tilt-left" delay={0.1}>
              <ScrollFocusZoom glowColor="rgba(56, 189, 248, 0.2)">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200/90 shadow-2xl space-y-6 relative overflow-hidden">
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2 mt-1">
                <span>Fast-Track Connection</span>
                <Sparkles className="w-4 h-4 text-sky-600 stroke-[2.5]" />
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                I am actively interviewing and open to high-impact full-stack and mobile engineering positions. 
                Guaranteed response within 24 hours.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 pt-2">
                {/* Email */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 border-2 border-sky-300 flex items-center justify-center text-sky-800 shadow-sm">
                      <Mail className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Direct Email</div>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs sm:text-sm font-mono text-slate-900 hover:text-sky-600 font-black">
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl bg-white text-slate-700 hover:text-slate-900 border-2 border-slate-200 hover:border-sky-400 shadow-sm transition-all"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
                  </button>
                </div>

                {/* Phone & WhatsApp (FEAT-08 with green outer glow on hover) */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-sm transition-all duration-300 hover:shadow-[0_0_24px_rgba(16,185,129,0.30)] hover:border-emerald-400 group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-800 shadow-sm group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">WhatsApp & Direct Phone</div>
                      <a 
                        href="https://wa.me/919860800543?text=Hi%20Zafarali,%20I%20would%20like%20to%20connect%20with%20you."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-mono text-emerald-800 hover:text-emerald-900 font-black flex items-center gap-1.5"
                      >
                        <span>{PERSONAL_INFO.phone}</span>
                        <ExternalLink className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href="https://wa.me/919860800543?text=Hi%20Zafarali,%20I%20would%20like%20to%20connect%20with%20you."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-mono font-black transition-all flex items-center gap-1 border-2 border-emerald-500 shadow-md shadow-emerald-500/20 active:scale-95"
                      title="Direct WhatsApp Chat"
                    >
                      <MessageCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Chat</span>
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      className="p-2.5 rounded-xl bg-white text-slate-700 hover:text-slate-900 border-2 border-slate-200 hover:border-emerald-400 shadow-sm transition-all"
                      title="Copy Phone"
                    >
                      {copiedPhone ? <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
                    </button>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-purple-800 shadow-sm">
                    <MapPin className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Location & Relocation</div>
                    <div className="text-xs sm:text-sm font-black text-slate-900 font-mono">
                      Pune, Maharashtra, India (Open to Remote / Hybrid / Relocation)
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2 border-t-2 border-slate-100 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-blue-100 text-blue-900 border-2 border-blue-300 hover:bg-blue-200 text-xs font-mono font-black transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4 text-blue-700 stroke-[2.5]" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-slate-100 text-slate-900 border-2 border-slate-300 hover:bg-slate-200 text-xs font-mono font-black transition-all shadow-sm"
                >
                  <Github className="w-4 h-4 text-slate-800 stroke-[2.5]" />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
            </ScrollFocusZoom>
            </ScrollAssemble>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <ScrollAssemble direction="tilt-right" delay={0.2}>
              <ScrollFocusZoom glowColor="rgba(99, 102, 241, 0.2)">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200/90 shadow-2xl relative overflow-hidden">
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

              {/* Pre-fill Quick Chips */}
              <div className="mb-6 mt-1">
                <div className="text-xs font-mono text-slate-700 mb-2.5 font-bold">
                  ⚡ Recruiter Shortcuts (Click to prefill message):
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handlePreFill('interview')}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-sky-500 hover:text-sky-800 hover:bg-sky-50 text-xs font-mono font-bold transition-all shadow-sm"
                  >
                    Schedule Interview
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreFill('fullstack')}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-sky-500 hover:text-sky-800 hover:bg-sky-50 text-xs font-mono font-bold transition-all shadow-sm"
                  >
                    Full Stack Role
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePreFill('mobile')}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-sky-500 hover:text-sky-800 hover:bg-sky-50 text-xs font-mono font-bold transition-all shadow-sm"
                  >
                    Mobile Project
                  </button>
                </div>
              </div>

              {/* Destination Notice & Status Indicator (FEAT-08) */}
              <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-xs text-slate-800 font-medium">
                    Direct Destination:{' '}
                    <strong className="text-emerald-800 font-mono font-black">+91 9860800543 (WhatsApp)</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-800 font-black">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Usually replies within a few hours</span>
                </div>
              </div>

              {submitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 border-2 border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                    <MessageCircle className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 font-display">
                    Message Directed to WhatsApp!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-lg mx-auto font-medium">
                    Your inquiry is prepared directly for Zafarali on WhatsApp (<strong className="text-emerald-800 font-mono font-black">+91 9860800543</strong>).
                    A WhatsApp chat tab has been opened. If you were blocked by a popup blocker or want to reopen/copy the message, choose an option below:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={handleSendViaWhatsApp}
                      className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-black text-xs shadow-lg shadow-emerald-600/30 hover:brightness-110 active:scale-95 transition-all border-2 border-emerald-500"
                    >
                      <MessageCircle className="w-4 h-4 text-white stroke-[2.5]" />
                      <span>Open WhatsApp Chat</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white text-slate-800 border-2 border-slate-300 hover:border-emerald-500 text-xs font-bold transition-all shadow-sm"
                    >
                      {copiedMessage ? <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
                      <span>{copiedMessage ? 'Copied to Clipboard!' : 'Copy WhatsApp Message'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendViaGmail}
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-slate-800 border-2 border-slate-300 hover:border-rose-400 text-xs font-bold transition-all shadow-sm"
                    >
                      <Mail className="w-4 h-4 text-rose-500 stroke-[2.5]" />
                      <span>Send via Gmail</span>
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-slate-600 hover:text-slate-900 underline font-mono font-bold"
                    >
                      ← Edit Message / Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Role Type Selection */}
                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-2 font-bold">
                      Inquiry Intent:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {roleTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, roleType: type })}
                          className={`p-3 rounded-xl text-xs font-mono text-left transition-all border-2 ${
                            formData.roleType === type
                              ? 'bg-sky-600 text-white border-sky-600 font-black shadow-md shadow-sky-500/25'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900 font-bold'
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
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-bold">
                        Your Name / Team Lead *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor / Tech Recruiter"
                        className="w-full bg-white border-2 border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none shadow-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 mb-1 font-bold">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. sarah@company.com"
                        className="w-full bg-white border-2 border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none shadow-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1 font-bold">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Corp / Tech Recruiting Agency"
                      className="w-full bg-white border-2 border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none shadow-sm font-medium"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-700 mb-1 font-bold">
                      Message / Project Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding the role, timeline, tech stack, or proposed interview slot..."
                      className="w-full bg-white border-2 border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-xl p-3.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none resize-none shadow-sm font-medium"
                    />
                  </div>

                  {/* Submit Button Bar */}
                  <div className="pt-2 space-y-3">
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white font-black text-xs sm:text-sm hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-emerald-600/30 border-2 border-emerald-500"
                      >
                        <MessageCircle className="w-4 h-4 text-white stroke-[2.5]" />
                        <span>Send Direct Message (WhatsApp)</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSendViaGmail}
                        className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white text-slate-800 border-2 border-slate-300 hover:border-rose-400 text-xs font-mono font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                        title="Alternative: Send via Gmail"
                      >
                        <Mail className="w-4 h-4 text-rose-500 stroke-[2.5]" />
                        <span>Gmail Option</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-600 text-center font-mono">
                      Destination: <strong className="text-emerald-800 font-black">WhatsApp (+91 9860800543)</strong> • Instant Response Guaranteed
                    </div>
                  </div>
                </form>
              )}
            </div>
            </ScrollFocusZoom>
            </ScrollAssemble>
          </div>
        </div>
      </div>
    </section>
  );
};
