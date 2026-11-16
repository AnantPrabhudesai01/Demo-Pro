'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Mail, 
  Shield, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ArrowUpRight,
  UserCheck,
  X
} from 'lucide-react';

export default function TeamsPage() {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');
  const [inviteTitle, setInviteTitle] = useState('Frontend Engineer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadMembers = async () => {
    try {
      const res = await fetch('/api/members');
      if (res.ok) {
        const data = await res.json();
        const memberList = Array.isArray(data) ? data : (data.members || []);
        setMembers(memberList);
      }
    } catch (err) {
      console.error('Failed to load members:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inviteName.trim(),
          email: inviteEmail.trim(),
          role: inviteRole,
          title: inviteTitle.trim(),
        })
      });
      if (!res.ok) throw new Error('Invite failed');
      const newMemberData = await res.json();
      const newMember = newMemberData.member || newMemberData;
      setMembers(prev => [...(Array.isArray(prev) ? prev : []), newMember]);
      setIsInviteOpen(false);
      setInviteName('');
      setInviteEmail('');
      showToast(`Invited ${newMember.name} to the workspace!`);
    } catch (err) {
      console.error(err);
      showToast('Error inviting teammate.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-primary/20 bg-card p-4 text-xs font-semibold text-foreground shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="h-4 w-4 text-primary" />
          {toastMessage}
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Team &amp; Access Control
            </h1>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-mono font-bold text-blue-500">
              {members.length} collaborators
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage workspace roles, seat allocations, and member permissions.
          </p>
        </div>

        <button 
          onClick={() => setIsInviteOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Invite Teammate
        </button>
      </div>

      {/* Senior Dev Banner */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              Team RBAC (Role-Based Access Control) Architecture
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Users are mapped with fine-grained roles (<code className="font-mono text-primary">owner</code>, <code className="font-mono text-primary">admin</code>, <code className="font-mono text-primary">member</code>) enabling task assignments across Kanban columns and sprint audits.
            </p>
          </div>
        </div>

        <Link
          href="/learn/javascript-foundations/variables-and-data-structures/variables-scope-primitives"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0 self-start md:self-auto"
        >
          Review Curriculum
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Members List */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
        <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Active Workspace Seats ({members.length})
          </span>
          <span className="text-xs text-muted-foreground">
            Enterprise Plan • Unlimited seats
          </span>
        </div>

        <div className="divide-y divide-border">
          {members.map((member) => (
            <div key={member.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-tr ${member.color || 'from-blue-600 to-indigo-600'} text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0`}>
                  {member.avatar || member.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-foreground">{member.name}</h4>
                    {member.role === 'owner' && (
                      <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-500 uppercase">
                        Owner
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                  <p className="text-[11px] text-muted-foreground/80 mt-0.5">{member.title || 'Engineer'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground capitalize">
                  {member.role}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  Joined {member.createdAt ? new Date(member.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Nov 2026'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold text-foreground">
                Invite New Teammate
              </h3>
              <button
                onClick={() => setIsInviteOpen(false)}
                className="rounded-lg p-1 text-muted-foreground hover:text-foreground text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Alex Rivera"
                  className="w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="alex@workspace.dev"
                  className="w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-foreground mb-1">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full rounded-xl border border-border bg-card p-2.5 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-foreground mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={inviteTitle}
                    onChange={(e) => setInviteTitle(e.target.value)}
                    placeholder="e.g. Backend Lead"
                    className="w-full rounded-xl border border-border bg-muted/30 p-2.5 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="rounded-xl border border-border px-4 py-2 font-medium text-foreground hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !inviteName.trim() || !inviteEmail.trim()}
                  className="rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Invite...' : 'Send Invitation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
