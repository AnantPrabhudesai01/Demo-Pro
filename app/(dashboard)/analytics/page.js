import { BarChart3, TrendingUp, CheckCircle2, Clock, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Productivity &amp; Sprint Analytics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Analyze task completion trends, team velocity, and project milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 space-y-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Completed this Sprint
          </span>
          <p className="text-3xl font-bold text-foreground">26 Tasks</p>
          <span className="text-xs text-emerald-500 font-semibold">+18% vs last sprint</span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
            <Clock className="h-4 w-4 text-blue-500" />
            Avg Completion Time
          </span>
          <p className="text-3xl font-bold text-foreground">1.8 Days</p>
          <span className="text-xs text-blue-500 font-semibold">Fast turnaround</span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-2">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            Overall Velocity
          </span>
          <p className="text-3xl font-bold text-foreground">94%</p>
          <span className="text-xs text-purple-500 font-semibold">Exceeding sprint target</span>
        </div>
      </div>
    </div>
  );
}
