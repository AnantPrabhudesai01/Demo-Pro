'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Users, 
  Layers, 
  Sparkles, 
  BookOpen, 
  ArrowUpRight,
  Flame,
  CheckSquare
} from 'lucide-react';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const res = await fetch('/api/analytics');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (isLoading || !data) {
    return (
      <div className="space-y-8 max-w-6xl mx-auto animate-pulse">
        <div className="h-10 w-1/3 bg-muted rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="h-32 rounded-2xl border border-border bg-card/60 p-6" />
          ))}
        </div>
        <div className="h-64 rounded-2xl border border-border bg-card/60" />
      </div>
    );
  }

  const {
    totalProjects = 4,
    totalTasks = 12,
    completedTasks = 5,
    inProgressTasks = 4,
    completionRate = 42,
    velocity = '94%',
    priorities = { urgent: 3, high: 4, medium: 4, low: 1 },
    statusDistribution = { backlog: 2, todo: 3, in_progress: 4, in_review: 1, completed: 5 },
    teamWorkload = [],
    weeklyTrend = []
  } = data;

  const totalPriorityCount = (priorities.urgent || 0) + (priorities.high || 0) + (priorities.medium || 0) + (priorities.low || 0) || 1;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            SaaS Productivity &amp; Velocity Analytics
          </h1>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-500">
            Live Database Telemetry
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Real-time metrics computed across projects, task lifecycles, and team throughput.
        </p>
      </div>

      {/* Senior Dev Architecture Banner */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-foreground">
              Analytics Engine Architecture: <code className="font-mono text-blue-500">GET /api/analytics</code>
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              Metrics are derived from the active relational store, computing aggregate completion rates, priority distributions, and individual engineer throughput.
            </p>
          </div>
        </div>

        <Link
          href="/learn/react-fundamentals/react-hooks-deep-dive/use-state-primitive-deep-dive"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600 shrink-0 self-start md:self-auto"
        >
          Study State Modeling
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 4 Core KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-1.5 shadow-xs">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Sprint Completion
          </span>
          <p className="text-2xl font-bold text-foreground font-mono">{completionRate}%</p>
          <span className="text-[11px] text-muted-foreground block">
            {completedTasks} of {totalTasks} tasks closed
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-1.5 shadow-xs">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
            <Flame className="h-4 w-4 text-amber-500" />
            Active Velocity
          </span>
          <p className="text-2xl font-bold text-foreground font-mono">{velocity}</p>
          <span className="text-[11px] text-amber-500 font-semibold block">
            Exceeding sprint benchmark
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-1.5 shadow-xs">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
            <Layers className="h-4 w-4 text-blue-500" />
            Active Initiatives
          </span>
          <p className="text-2xl font-bold text-foreground font-mono">{totalProjects}</p>
          <span className="text-[11px] text-blue-500 font-semibold block">
            Projects underway
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 space-y-1.5 shadow-xs">
          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
            <Clock className="h-4 w-4 text-purple-500" />
            Work in Progress
          </span>
          <p className="text-2xl font-bold text-foreground font-mono">{inProgressTasks}</p>
          <span className="text-[11px] text-muted-foreground block">
            Tasks in active development
          </span>
        </div>
      </div>

      {/* Two-Column Visual Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend Bar Chart */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground">Sprint Velocity Trend</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Tasks delivered vs sprint targets</p>
            </div>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-blue-400">
              4-Week Window
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {weeklyTrend.map((item, idx) => {
              const maxTarget = 15;
              const completedWidth = Math.min(100, Math.round((item.completed / maxTarget) * 100));
              const targetWidth = Math.min(100, Math.round((item.target / maxTarget) * 100));

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">{item.week}</span>
                    <span className="text-muted-foreground font-mono">
                      <strong className="text-foreground">{item.completed}</strong> / {item.target} tasks
                    </span>
                  </div>
                  <div className="relative h-3 w-full rounded-full bg-muted overflow-hidden">
                    {/* Target line */}
                    <div 
                      className="absolute top-0 bottom-0 bg-blue-500/30 rounded-full"
                      style={{ width: `${targetWidth}%` }}
                    />
                    {/* Completed bar */}
                    <div 
                      className="absolute top-0 bottom-0 bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${completedWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 pt-2 text-[11px] text-muted-foreground border-t border-border">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              Completed Tasks
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500/30" />
              Sprint Target
            </span>
          </div>
        </div>

        {/* Priority & Status Distribution */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-xs">
          <div>
            <h3 className="text-sm font-bold text-foreground">Task Priority Distribution</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Allocation of backlog by severity</p>
          </div>

          <div className="space-y-3.5 pt-1">
            {[
              { label: 'Urgent', count: priorities.urgent || 0, color: 'bg-red-500', text: 'text-red-400' },
              { label: 'High', count: priorities.high || 0, color: 'bg-amber-500', text: 'text-amber-400' },
              { label: 'Medium', count: priorities.medium || 0, color: 'bg-blue-500', text: 'text-blue-400' },
              { label: 'Low', count: priorities.low || 0, color: 'bg-slate-500', text: 'text-slate-400' },
            ].map(p => {
              const pct = Math.round((p.count / totalPriorityCount) * 100);
              return (
                <div key={p.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${p.text}`}>{p.label} Priority</span>
                    <span className="text-muted-foreground font-mono">
                      {p.count} tasks ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${p.color} transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Kanban Status Pills */}
          <div className="pt-4 border-t border-border">
            <h4 className="text-xs font-semibold text-foreground mb-2">Current Column Counts</h4>
            <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
              {Object.entries(statusDistribution).map(([col, cnt]) => (
                <div key={col} className="rounded-xl border border-border/80 bg-muted/40 p-2">
                  <span className="block text-[10px] text-muted-foreground uppercase font-bold truncate">
                    {col.replace('_', ' ')}
                  </span>
                  <span className="text-sm font-bold text-foreground font-mono">{cnt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Workload & Throughput Table */}
      <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">Team Throughput &amp; Assignment Balance</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Tasks assigned, completed, and completion percentages per engineer</p>
          </div>
          <Link
            href="/teams"
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
          >
            Manage Team
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 text-foreground border-b border-border font-semibold">
              <tr>
                <th className="p-3">Team Member</th>
                <th className="p-3">Role</th>
                <th className="p-3">Assigned Tasks</th>
                <th className="p-3">Completed</th>
                <th className="p-3">Throughput Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {teamWorkload.map((member) => (
                <tr key={member.id} className="hover:bg-muted/20">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                        {member.avatar}
                      </div>
                      <span className="font-semibold text-foreground">{member.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground capitalize">{member.role}</td>
                  <td className="p-3 font-mono font-bold text-foreground">{member.assignedCount}</td>
                  <td className="p-3 font-mono font-semibold text-emerald-500">{member.completedCount}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2 max-w-xs">
                      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: `${member.completionPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-foreground shrink-0">
                        {member.completionPct}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
