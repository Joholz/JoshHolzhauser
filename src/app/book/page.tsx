'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, Cpu, Smartphone, Layers, Zap, MessageCircle, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const PROJECT_TYPES = [
  { id: 'website',    icon: Globe,          label: 'Need a website',       sub: 'Business site, landing page, portfolio' },
  { id: 'app',        icon: Cpu,            label: 'Custom web app',       sub: 'Dashboard, tool, internal system' },
  { id: 'automation', icon: Zap,            label: 'Automate something',   sub: 'API integrations, workflows, data sync' },
  { id: 'mobile',     icon: Smartphone,     label: 'Mobile app',           sub: 'iOS + Android, React Native' },
  { id: 'saas',       icon: Layers,         label: 'Start a SaaS',         sub: 'Payments, auth, the full thing' },
  { id: 'unsure',     icon: MessageCircle,  label: "Not sure yet",         sub: 'Just want to think it through' },
];

const BUDGETS = [
  { id: 'under1k', label: 'Under $1k' },
  { id: '1k-3k',   label: '$1k – $3k' },
  { id: '3k-7k',   label: '$3k – $7k' },
  { id: '7k+',     label: '$7k+' },
  { id: 'unsure',  label: "Not sure yet" },
];

const TIMELINES = [
  { id: 'asap',     label: 'As soon as possible' },
  { id: '1-3mo',    label: '1 – 3 months' },
  { id: 'flexible', label: 'No rush' },
];

export default function BookPage() {
  const [step, setStep]             = useState(1);
  const [projectType, setProjectType] = useState('');
  const [message, setMessage]       = useState('');
  const [budget, setBudget]         = useState('');
  const [timeline, setTimeline]     = useState('');
  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [extra, setExtra]           = useState('');
  const [honeypot, setHoneypot]     = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState('');

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) return;
    if (honeypot) return; // bot trap
    setSubmitting(true);
    setError('');
    try {
      await addDoc(collection(db, 'leads'), {
        projectType,
        message,
        budget,
        timeline,
        name:    name.trim(),
        email:   email.trim().toLowerCase(),
        extra,
        status:    'new',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong on my end. Email me directly at josh@joshholzhauser.com");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-[#10B981]" />
          </div>
          <h1 className="text-2xl font-bold text-[#F9FAFB] mb-3">
            Got it, {name.split(' ')[0]}.
          </h1>
          <p className="text-[#9CA3AF] text-base leading-relaxed mb-8">
            I&apos;ll review what you sent and get back to you within 24 hours. If it looks like a good fit,
            I&apos;ll reach out to set up a call.
          </p>
          <Link href="/" className="text-sm text-[#5B8DEF] hover:text-[#86A8FF] transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 px-6">
      <div className="max-w-xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#F9FAFB] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#F9FAFB] mb-1">
            {step === 1 && "What are you working on?"}
            {step === 2 && "Tell me more."}
            {step === 3 && "How do I reach you?"}
          </h1>
          <p className="text-[#6B7280] text-sm">Step {step} of 3</p>
          <div className="mt-4 h-1 bg-[#1B1F2A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5B8DEF] rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* ── Step 1: Project type ── */}
        {step === 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PROJECT_TYPES.map(({ id, icon: Icon, label, sub }) => (
              <button
                key={id}
                onClick={() => { setProjectType(id); setStep(2); }}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                  projectType === id
                    ? 'border-[#5B8DEF] bg-[#5B8DEF]/10'
                    : 'border-[#1B1F2A] bg-[#101319] hover:border-[#262B38]'
                }`}
              >
                <Icon className="w-5 h-5 text-[#5B8DEF] mb-3" />
                <p className="text-sm font-semibold text-[#F9FAFB] mb-1">{label}</p>
                <p className="text-xs text-[#6B7280] leading-snug">{sub}</p>
              </button>
            ))}
          </div>
        )}

        {/* ── Step 2: Details ── */}
        {step === 2 && (
          <div className="space-y-7">
            <div>
              <label className="block text-sm font-medium text-[#F9FAFB] mb-2">
                Describe the problem or idea
              </label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Plain language is fine. The rougher the idea, the better — that's what I'm here for."
                rows={5}
                className="w-full bg-[#101319] border border-[#1B1F2A] focus:border-[#5B8DEF] rounded-xl px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#4B5563] outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F9FAFB] mb-3">Rough budget</label>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setBudget(id)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      budget === id
                        ? 'border-[#5B8DEF] bg-[#5B8DEF]/10 text-[#86A8FF]'
                        : 'border-[#1B1F2A] text-[#9CA3AF] hover:border-[#262B38] hover:text-[#F9FAFB]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F9FAFB] mb-3">Timeline</label>
              <div className="flex flex-wrap gap-2">
                {TIMELINES.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setTimeline(id)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      timeline === id
                        ? 'border-[#5B8DEF] bg-[#5B8DEF]/10 text-[#86A8FF]'
                        : 'border-[#1B1F2A] text-[#9CA3AF] hover:border-[#262B38] hover:text-[#F9FAFB]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl border border-[#1B1F2A] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#262B38] transition-all text-sm"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!message.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-[#5B8DEF] hover:bg-[#4775D9] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Contact details ── */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="First name is fine"
                  className="w-full bg-[#101319] border border-[#1B1F2A] focus:border-[#5B8DEF] rounded-xl px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#4B5563] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F9FAFB] mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#101319] border border-[#1B1F2A] focus:border-[#5B8DEF] rounded-xl px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#4B5563] outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F9FAFB] mb-2">
                Anything else?{' '}
                <span className="text-[#6B7280] font-normal">(optional)</span>
              </label>
              <textarea
                value={extra}
                onChange={e => setExtra(e.target.value)}
                placeholder="Links, references, constraints — anything that feels relevant."
                rows={3}
                className="w-full bg-[#101319] border border-[#1B1F2A] focus:border-[#5B8DEF] rounded-xl px-4 py-3 text-sm text-[#F9FAFB] placeholder-[#4B5563] outline-none transition-colors resize-none"
              />
            </div>

            {error && <p className="text-sm text-[#EF4444]">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-xl border border-[#1B1F2A] text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#262B38] transition-all text-sm"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!name.trim() || !email.trim() || submitting}
                className="flex-1 flex items-center justify-center gap-2 bg-[#5B8DEF] hover:bg-[#4775D9] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                {submitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                  : <>Send it over <ArrowRight className="w-4 h-4" /></>
                }
              </button>
            </div>

            <p className="text-xs text-[#4B5563] text-center">
              I&apos;ll get back to you within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
