'use client';

import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from 'firebase/auth';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LogOut, RefreshCw, CheckCircle, Clock, X, Mail } from 'lucide-react';

const ADMIN_EMAIL = 'wunkoteam@gmail.com';

type LeadStatus = 'new' | 'contacted' | 'closed';

interface Lead {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  budget: string;
  timeline: string;
  extra: string;
  status: LeadStatus;
  createdAt: { seconds: number } | null;
}

const PROJECT_LABELS: Record<string, string> = {
  website:    'Website',
  app:        'Custom App',
  automation: 'Automation',
  mobile:     'Mobile App',
  saas:       'SaaS',
  unsure:     'Not Sure',
};

const BUDGET_LABELS: Record<string, string> = {
  'under1k': 'Under $1k',
  '1k-3k':   '$1k – $3k',
  '3k-7k':   '$3k – $7k',
  '7k+':     '$7k+',
  'unsure':  'Not sure',
};

const TIMELINE_LABELS: Record<string, string> = {
  'asap':     'ASAP',
  '1-3mo':    '1–3 months',
  'flexible': 'No rush',
};

function timeAgo(seconds: number) {
  const diff = Math.floor(Date.now() / 1000 - seconds);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const STATUS_COLORS: Record<LeadStatus, string> = {
  new:       'bg-[#10B981]',
  contacted: 'bg-[#5B8DEF]',
  closed:    'bg-[#6B7280]',
};

export default function AdminPage() {
  const [user, setUser]         = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [leads, setLeads]       = useState<Lead[]>([]);
  const [loading, setLoading]   = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, u => {
      setUser(u);
      setAuthReady(true);
    });
  }, []);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) fetchLeads();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function fetchLeads() {
    setLoading(true);
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setLeads(snap.docs.map(d => ({ id: d.id, ...d.data() } as Lead)));
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  }

  async function setStatus(id: string, status: LeadStatus) {
    await updateDoc(doc(db, 'leads', id), { status });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  }

  async function signIn() {
    const auth     = getAuth();
    const provider = new GoogleAuthProvider();
    try { await signInWithPopup(auth, provider); }
    catch (err) { console.error(err); }
  }

  async function handleSignOut() {
    await signOut(getAuth());
  }

  // ── Loading ──
  if (!authReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#5B8DEF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ── Not signed in ──
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-[#101319] border border-[#1B1F2A] rounded-2xl flex items-center justify-center mx-auto mb-5 text-xl">
            🔒
          </div>
          <h1 className="text-xl font-bold text-[#F9FAFB] mb-2">Admin</h1>
          <p className="text-sm text-[#6B7280] mb-6">Sign in to view leads</p>
          <button
            onClick={signIn}
            className="inline-flex items-center gap-3 bg-white text-[#111] font-medium px-5 py-3 rounded-xl text-sm hover:bg-gray-100 transition-colors"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // ── Wrong account ──
  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[#9CA3AF] mb-4">Access denied for <span className="text-[#F9FAFB]">{user.email}</span></p>
          <button onClick={handleSignOut} className="text-sm text-[#5B8DEF] hover:text-[#86A8FF] transition-colors">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  const newCount       = leads.filter(l => l.status === 'new').length;
  const contactedCount = leads.filter(l => l.status === 'contacted').length;
  const closedCount    = leads.filter(l => l.status === 'closed').length;

  return (
    <div className="pt-24 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-bold text-[#F9FAFB]">Leads</h1>
            <p className="text-sm text-[#6B7280] mt-0.5">
              {leads.length} total · {newCount} unread
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              title="Refresh"
              className="p-2 rounded-lg border border-[#1B1F2A] text-[#6B7280] hover:text-[#F9FAFB] hover:border-[#262B38] transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1B1F2A] text-[#6B7280] hover:text-[#F9FAFB] transition-all text-sm"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'New',       value: newCount,       color: '#10B981' },
            { label: 'Contacted', value: contactedCount, color: '#5B8DEF' },
            { label: 'Closed',    value: closedCount,    color: '#6B7280' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#101319] border border-[#1B1F2A] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
              <p className="text-xs text-[#6B7280] mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Lead list */}
        {loading ? (
          <div className="text-center py-20 text-[#6B7280] text-sm">Loading…</div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20 text-[#6B7280] text-sm">
            No leads yet. Share the site!
          </div>
        ) : (
          <div className="space-y-3">
            {leads.map(lead => (
              <div
                key={lead.id}
                className={`bg-[#101319] border rounded-2xl overflow-hidden transition-all ${
                  lead.status === 'new' ? 'border-[#10B981]/30' : 'border-[#1B1F2A]'
                }`}
              >
                {/* Row */}
                <button
                  className="w-full text-left px-5 py-4 flex items-center gap-4"
                  onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_COLORS[lead.status]} ${lead.status === 'new' ? 'animate-pulse' : ''}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-semibold text-[#F9FAFB]">{lead.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[#5B8DEF]/10 text-[#86A8FF] border border-[#5B8DEF]/20">
                        {PROJECT_LABELS[lead.projectType] ?? lead.projectType}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B7280] truncate">{lead.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-[#6B7280]">
                      {lead.createdAt ? timeAgo(lead.createdAt.seconds) : '—'}
                    </p>
                    <p className="text-xs text-[#4B5563] capitalize mt-0.5">{lead.status}</p>
                  </div>
                </button>

                {/* Expanded */}
                {expanded === lead.id && (
                  <div className="px-5 pb-5 border-t border-[#1B1F2A] pt-4 space-y-4">
                    {/* Meta grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <p className="text-[#6B7280] mb-1">Email</p>
                        <a href={`mailto:${lead.email}`} className="text-[#5B8DEF] hover:text-[#86A8FF] flex items-center gap-1">
                          <Mail className="w-3 h-3" />{lead.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-[#6B7280] mb-1">Budget</p>
                        <p className="text-[#F9FAFB]">{BUDGET_LABELS[lead.budget] ?? lead.budget ?? '—'}</p>
                      </div>
                      <div>
                        <p className="text-[#6B7280] mb-1">Timeline</p>
                        <p className="text-[#F9FAFB]">{TIMELINE_LABELS[lead.timeline] ?? lead.timeline ?? '—'}</p>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <p className="text-xs text-[#6B7280] mb-1">Message</p>
                      <p className="text-sm text-[#9CA3AF] leading-relaxed whitespace-pre-wrap">{lead.message}</p>
                    </div>

                    {/* Extra */}
                    {lead.extra && (
                      <div>
                        <p className="text-xs text-[#6B7280] mb-1">Additional notes</p>
                        <p className="text-sm text-[#9CA3AF] leading-relaxed whitespace-pre-wrap">{lead.extra}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {lead.status !== 'contacted' && (
                        <button
                          onClick={() => setStatus(lead.id, 'contacted')}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#5B8DEF]/10 border border-[#5B8DEF]/20 text-[#86A8FF] rounded-lg hover:bg-[#5B8DEF]/20 transition-colors"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Mark contacted
                        </button>
                      )}
                      {lead.status !== 'new' && (
                        <button
                          onClick={() => setStatus(lead.id, 'new')}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#101319] border border-[#1B1F2A] text-[#9CA3AF] rounded-lg hover:border-[#262B38] transition-colors"
                        >
                          <Clock className="w-3.5 h-3.5" /> Mark new
                        </button>
                      )}
                      {lead.status !== 'closed' && (
                        <button
                          onClick={() => setStatus(lead.id, 'closed')}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#101319] border border-[#1B1F2A] text-[#6B7280] rounded-lg hover:border-[#262B38] transition-colors"
                        >
                          <X className="w-3.5 h-3.5" /> Close
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
