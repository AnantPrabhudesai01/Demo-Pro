import { Users, Mail, Shield, Plus } from 'lucide-react';

const MEMBERS = [
  { id: 1, name: 'Anant', email: 'anant@workspace.dev', role: 'Owner', initials: 'AN', color: 'from-blue-600 to-indigo-600' },
  { id: 2, name: 'Jane Doe', email: 'jane@workspace.dev', role: 'Admin', initials: 'JD', color: 'from-purple-600 to-pink-600' },
  { id: 3, name: 'Sam K.', email: 'sam@workspace.dev', role: 'Member', initials: 'SK', color: 'from-emerald-600 to-teal-600' },
  { id: 4, name: 'Emily M.', email: 'emily@workspace.dev', role: 'Member', initials: 'EM', color: 'from-amber-600 to-orange-600' },
];

export default function TeamsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Team Members
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your workspace collaborators, roles, and invitation permissions.
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Invite Teammate
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="divide-y divide-border">
          {MEMBERS.map((member) => (
            <div key={member.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${member.color} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
                  {member.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{member.name}</h4>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-foreground">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
