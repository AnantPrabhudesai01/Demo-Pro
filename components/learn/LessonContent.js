'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Code2, 
  AlertTriangle, 
  BookOpen, 
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Terminal,
  Layers,
  Clock,
  Flame,
  CheckSquare,
  FileCode,
  Compass,
  Bookmark
} from 'lucide-react';
import { TaskPreview } from '@/components/dashboard/TaskPreview';

export function LessonContent({ lesson, prevLesson, nextLesson }) {
  const [activeConceptTab, setActiveConceptTab] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [revealedHints, setRevealedHints] = useState({});
  const [completedItems, setCompletedItems] = useState({});
  const [bookmarked, setBookmarked] = useState(false);

  // Restore checklist & bookmark from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`workspace_checklist_${lesson.id}`);
      if (stored) setCompletedItems(JSON.parse(stored));
      const isBookmarked = localStorage.getItem(`workspace_bookmark_${lesson.id}`) === 'true';
      setBookmarked(isBookmarked);
    } catch (e) {}
  }, [lesson.id]);

  const toggleChecklist = (index) => {
    const updated = { ...completedItems, [index]: !completedItems[index] };
    setCompletedItems(updated);
    try {
      localStorage.setItem(`workspace_checklist_${lesson.id}`, JSON.stringify(updated));
    } catch (e) {}
  };

  const toggleBookmark = () => {
    const nextVal = !bookmarked;
    setBookmarked(nextVal);
    try {
      localStorage.setItem(`workspace_bookmark_${lesson.id}`, String(nextVal));
    } catch (e) {}
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleAnswer = (idx) => {
    setRevealedAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleHint = (idx) => {
    setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalChecklist = lesson.completionChecklist?.length || 5;
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalChecklist) * 100);

  return (
    <div className="relative flex gap-10">
      {/* ========================================================
          CENTER: Primary Textbook Lesson Content
          ======================================================== */}
      <div className="flex-1 min-w-0 space-y-16 pb-28">
        
        {/* Lesson Header Banner */}
        <header className="space-y-4 border-b border-border pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
              <BookOpen className="h-3.5 w-3.5" />
              Book 1: JavaScript Foundations • Chapter 1
            </div>

            <button
              onClick={toggleBookmark}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                bookmarked
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-500'
                  : 'border-border bg-card text-muted-foreground hover:bg-muted'
              }`}
            >
              <Bookmark className="h-3.5 w-3.5" />
              {bookmarked ? 'Bookmarked' : 'Bookmark Lesson'}
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {lesson.title}
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            {lesson.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-blue-500" />
              {lesson.duration}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Flame className="h-3.5 w-3.5 text-amber-500" />
              {lesson.difficulty}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="font-semibold text-emerald-500">
              Progress: {completedCount}/{totalChecklist} Mastered ({progressPercent}%)
            </span>
          </div>
        </header>

        {/* 1. Learning Objectives */}
        <section id="overview" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500">
            <Sparkles className="h-4 w-4" />
            1. Learning Objectives
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {lesson.learningObjectives.map((obj) => (
              <div
                key={obj.id}
                className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {obj.id}
                  </span>
                  <h3 className="text-xs font-bold text-foreground">{obj.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed pl-7">
                  {obj.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Structured Concept Deep-Dive with Interactive Tabs */}
        <section id="concepts" className="space-y-6 scroll-mt-20">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500">
              <Layers className="h-4 w-4" />
              2. Core Concept Deep-Dive
            </div>
            <span className="text-xs text-muted-foreground">Choose a topic below</span>
          </div>

          {/* Concept Tabs Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 rounded-xl border border-border bg-card p-1.5 text-xs font-semibold">
            {[
              '1. Declarations',
              '2. Stack vs Heap',
              '3. React State Law',
              '4. Derived State'
            ].map((tabName, idx) => (
              <button
                key={tabName}
                onClick={() => setActiveConceptTab(idx)}
                className={`rounded-lg py-2 px-3 text-center transition-all ${
                  activeConceptTab === idx
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>

          {/* Concept Tab 0: Variable Declarations Table */}
          {activeConceptTab === 0 && (
            <div className="rounded-2xl border border-border bg-card p-6 space-y-5 animate-in fade-in-50 duration-200">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  Variable Declarations: <code className="font-mono text-blue-500">const</code> vs <code className="font-mono text-blue-500">let</code> vs <code className="font-mono text-red-400">var</code>
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  In modern JavaScript, variable scope and mutability directly influence whether code will introduce accidental bugs during React re-renders.
                </p>
              </div>

              {/* Responsive Comparison Table */}
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted text-foreground border-b border-border font-semibold">
                    <tr>
                      <th className="p-3">Keyword</th>
                      <th className="p-3">Scope Boundary</th>
                      <th className="p-3">Reassignable?</th>
                      <th className="p-3">Hoisting Behavior</th>
                      <th className="p-3">React Best Practice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-muted/30">
                      <td className="p-3 font-mono font-bold text-blue-500">const</td>
                      <td className="p-3 text-foreground">Block Scope &#123; &#125;</td>
                      <td className="p-3 text-emerald-500 font-semibold">No (Immutable identifier)</td>
                      <td className="p-3 text-muted-foreground">No (Temporal Dead Zone)</td>
                      <td className="p-3 font-semibold text-foreground">Default for 90%+ of React code</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="p-3 font-mono font-bold text-amber-500">let</td>
                      <td className="p-3 text-foreground">Block Scope &#123; &#125;</td>
                      <td className="p-3 text-amber-500 font-semibold">Yes</td>
                      <td className="p-3 text-muted-foreground">No (Temporal Dead Zone)</td>
                      <td className="p-3 text-foreground">Only for loop counters or reassignments</td>
                    </tr>
                    <tr className="hover:bg-muted/30 bg-destructive/5">
                      <td className="p-3 font-mono font-bold text-destructive">var</td>
                      <td className="p-3 text-destructive font-semibold">Function / Global</td>
                      <td className="p-3 text-foreground">Yes</td>
                      <td className="p-3 text-destructive font-semibold">Hoists as undefined</td>
                      <td className="p-3 font-bold text-destructive">Never use in modern React</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-xs flex items-start gap-3">
                <Lightbulb className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Senior Engineer Rule of Thumb:</strong> Always declare with <code className="font-mono text-foreground font-semibold">const</code>. Only downgrade to <code className="font-mono text-foreground font-semibold">let</code> when you explicitly intend to reassign the variable. Notice that <code className="font-mono text-foreground font-semibold">const</code> prevents reassigning the variable name, but does NOT freeze an object’s internal properties!
                </p>
              </div>
            </div>
          )}

          {/* Concept Tab 1: Memory Model: Stack vs Heap */}
          {activeConceptTab === 1 && (
            <div className="rounded-2xl border border-border bg-card p-6 space-y-6 animate-in fade-in-50 duration-200">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  The JavaScript Memory Model: Call Stack vs Heap Memory
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  JavaScript treats Primitive values and Reference values completely differently in physical RAM.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Stack Box */}
                <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-blue-500 uppercase tracking-wider">
                      1. The Call Stack
                    </span>
                    <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                      Primitive Values
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-foreground">Stored Directly by Value</h4>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li>• Types: <code className="font-mono text-foreground">string</code>, <code className="font-mono text-foreground">number</code>, <code className="font-mono text-foreground">boolean</code>, <code className="font-mono text-foreground">null</code>, <code className="font-mono text-foreground">undefined</code>.</li>
                    <li>• Stored directly in the fast, contiguous execution stack.</li>
                    <li>• Compared by <strong>actual value</strong>: <code className="font-mono text-emerald-400">&quot;WorkSpace&quot; === &quot;WorkSpace&quot;</code> is <strong className="text-emerald-400">true</strong>.</li>
                    <li>• Copying creates an independent value clone.</li>
                  </ul>
                </div>

                {/* Heap Box */}
                <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-indigo-500 uppercase tracking-wider">
                      2. Heap Memory
                    </span>
                    <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-400">
                      Reference Types
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm text-foreground">Stored by Memory Address (Pointer)</h4>
                  <ul className="text-xs space-y-2 text-muted-foreground">
                    <li>• Types: <code className="font-mono text-foreground">Object</code>, <code className="font-mono text-foreground">Array</code>, <code className="font-mono text-foreground">Function</code>.</li>
                    <li>• The variable in the stack holds only a <strong>memory address pointer</strong> (e.g. <code className="font-mono text-foreground">0x00FF2A</code>) pointing to data in the Heap.</li>
                    <li>• Compared by <strong>pointer address</strong>: <code className="font-mono text-red-400">&#123; id: 1 &#125; === &#123; id: 1 &#125;</code> is <strong className="text-red-400">FALSE</strong>!</li>
                    <li>• Copying only copies the pointer, NOT the data!</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Concept Tab 2: React Re-render Law */}
          {activeConceptTab === 2 && (
            <div className="rounded-2xl border border-border bg-card p-6 space-y-6 animate-in fade-in-50 duration-200">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  The React Re-render Law: Referential Equality (<code className="font-mono text-blue-500">Object.is</code>)
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  React optimizes performance by running a shallow reference comparison: <code className="font-mono text-foreground font-semibold">Object.is(oldState, newState)</code>. If both point to the same memory address, React assumes nothing changed and skips re-rendering!
                </p>
              </div>

              {/* Side-by-Side Comparison: Bad Mutation vs Correct Immutability */}
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Wrong */}
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-destructive flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4" />
                      Anti-Pattern: Direct Mutation
                    </span>
                    <span className="rounded bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">
                      UI Breaks!
                    </span>
                  </div>
                  <pre className="rounded-lg bg-slate-950 p-3 font-mono text-[11px] text-red-300 overflow-x-auto">
{`// ❌ BROKEN: Mutating memory in place
const toggle = () => {
  task.status = "completed"; // Same address!
  setTask(task);
  // React checks: Object.is(task, task)
  // Evaluates to TRUE!
  // React SKIPS rendering!
};`}
                  </pre>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    The task object was changed in memory, but because its address never changed, React does not know it needs to repaint the screen.
                  </p>
                </div>

                {/* Correct */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      Correct: Immutability via Spread
                    </span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                      Reactive UI
                    </span>
                  </div>
                  <pre className="rounded-lg bg-slate-950 p-3 font-mono text-[11px] text-emerald-300 overflow-x-auto">
{`// ✅ CORRECT: Brand new memory pointer
const toggle = () => {
  setTask(prev => ({
    ...prev,             // Copy fields
    status: "completed", // Overwrite field
  }));
  // React checks: Object.is(prev, next)
  // Evaluates to FALSE!
  // React RE-RENDERS immediately!
};`}
                  </pre>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    The spread operator allocates a brand new object in memory with a distinct address, triggering the React reconciliation pipeline.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Concept Tab 3: Derived State */}
          {activeConceptTab === 3 && (
            <div className="rounded-2xl border border-border bg-card p-6 space-y-4 animate-in fade-in-50 duration-200">
              <h3 className="text-base font-bold text-foreground">
                Derived State: Calculate on the Fly During Render
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Many developers create redundant <code className="font-mono text-foreground font-semibold">useState</code> variables for values that can be computed synchronously:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 pt-2">
                <div className="rounded-xl border border-border bg-background p-4 space-y-2">
                  <span className="text-xs font-bold text-destructive">❌ Redundant Dual State</span>
                  <pre className="font-mono text-xs text-muted-foreground bg-muted p-2.5 rounded-lg overflow-x-auto">
{`const [status, setStatus] = useState('todo');
const [isDone, setIsDone] = useState(false);
// Trap: You must remember to keep both
// states synchronized manually!`}
                  </pre>
                </div>

                <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 space-y-2">
                  <span className="text-xs font-bold text-emerald-500">✅ Clean Derived State</span>
                  <pre className="font-mono text-xs text-foreground bg-muted p-2.5 rounded-lg overflow-x-auto">
{`const [status, setStatus] = useState('todo');
// Derived synchronously in render:
const isDone = status === 'completed';
// Zero risk of desynchronization!`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 3. Real-World Analogy */}
        <section id="analogy" className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-card to-transparent p-6 sm:p-8 space-y-6 scroll-mt-20">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Lightbulb className="h-5 w-5" />
            3. Real-World Analogy: {lesson.analogy.title}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                💵 {lesson.analogy.primitiveTitle}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {lesson.analogy.primitiveText}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 space-y-2">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                🔗 {lesson.analogy.referenceTitle}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {lesson.analogy.referenceText}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-amber-500/10 p-4 text-xs font-medium text-amber-900 dark:text-amber-200 leading-relaxed border border-amber-500/20">
            <strong>The React Lesson:</strong> {lesson.analogy.reactTakeaway}
          </div>
        </section>

        {/* 4. Syntax Comparison */}
        <section id="syntax" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500">
            <Code2 className="h-4 w-4" />
            4. Syntax Comparison
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {lesson.syntaxCards.map((card, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 space-y-2 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-foreground">{card.title}</h4>
                  <pre className="mt-3 rounded-xl bg-slate-950 p-3 font-mono text-[11px] text-slate-200 overflow-x-auto leading-relaxed">
                    {card.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Standalone Experiment */}
        <section id="standalone" className="space-y-4 scroll-mt-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500">
              <Terminal className="h-4 w-4" />
              5. Standalone Console Experiment
            </div>
            <span className="text-xs text-muted-foreground">Test in Node or Chrome DevTools</span>
          </div>

          <div className="rounded-2xl border border-border bg-slate-950 p-6 space-y-4 font-mono text-xs text-slate-100">
            <pre className="overflow-x-auto leading-relaxed">{lesson.standaloneDemo.code}</pre>
            <div className="pt-3 border-t border-slate-800 text-slate-400 text-[11px]">
              <strong className="text-slate-200">Key Takeaway:</strong> {lesson.standaloneDemo.takeaway}
            </div>
          </div>
        </section>

        {/* 6. Step-by-Step Implementation */}
        <section id="implementation" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500">
            <Compass className="h-4 w-4" />
            6. Step-by-Step Implementation in WorkSpace
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {lesson.stepByStep.map((s) => (
              <div key={s.step} className="rounded-2xl border border-border bg-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {s.step}
                  </span>
                  <span className="font-mono text-[11px] text-blue-500">{s.file}</span>
                </div>
                <h4 className="text-xs font-bold text-foreground">{s.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Exact Source Code & Line Breakdown */}
        <section id="code" className="space-y-5 scroll-mt-20">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500">
                <FileCode className="h-4 w-4" />
                7. Exact Component Source Code
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">components/dashboard/TaskPreview.js</p>
            </div>

            <button
              onClick={() => copyToClipboard(lesson.exactCode)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copiedCode ? 'Copied to Clipboard' : 'Copy Code'}
            </button>
          </div>

          {/* Styled Code Box */}
          <div className="rounded-2xl border border-border bg-slate-950 p-6 font-mono text-xs text-slate-100 overflow-x-auto max-h-[460px] overflow-y-auto leading-relaxed shadow-lg">
            <pre>{lesson.exactCode}</pre>
          </div>

          {/* Line by line cards */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Line-by-Line Technical Analysis
            </h4>
            <div className="space-y-3">
              {lesson.lineExplanations.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-background p-3.5 space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] font-bold text-foreground">
                      Lines {item.lines}
                    </span>
                    <code className="font-mono font-semibold text-blue-500">{item.code}</code>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-1">{item.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Execution Flow */}
        <section id="flow" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500">
            <Layers className="h-4 w-4" />
            8. Execution Flow Diagram
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              What happens step-by-step from the exact millisecond the user clicks the status button:
            </p>

            <div className="space-y-3">
              {lesson.executionFlow.map((step) => (
                <div key={step.step} className="flex items-start gap-3 text-xs">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600/10 font-bold text-blue-600 border border-blue-500/20">
                    {step.step}
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">{step.title}</h5>
                    <p className="text-muted-foreground mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Live Embedded Component Sandbox */}
        <section id="sandbox" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-500">
            <Sparkles className="h-4 w-4" />
            9. Live Embedded Component Sandbox
          </div>

          <div className="rounded-3xl border-2 border-dashed border-blue-500/40 bg-gradient-to-br from-blue-500/5 via-card to-transparent p-6 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-foreground">
                Interact with the Component Directly:
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click &quot;Complete Task&quot; below. Observe how state updates instantly without page refresh because React receives a fresh object reference!
              </p>
            </div>

            {/* Embedded Live Component */}
            <TaskPreview />
          </div>
        </section>

        {/* 10. Common Mistakes & Anti-Patterns */}
        <section id="mistakes" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-destructive">
            <AlertTriangle className="h-4 w-4" />
            10. Common Pitfalls &amp; Anti-Patterns
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {lesson.commonMistakes.map((cm, idx) => (
              <div key={idx} className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5 space-y-3">
                <h4 className="text-xs font-bold text-destructive">❌ {cm.title}</h4>
                <div className="rounded-lg bg-slate-950 p-2.5 font-mono text-[11px] text-red-300 overflow-x-auto">
                  {cm.bad}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Why it fails:</strong> {cm.why}
                </p>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                  <strong>Fix:</strong> {cm.fix}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Independent Coding Challenge */}
        <section id="challenge" className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-card to-transparent p-6 sm:p-8 space-y-6 scroll-mt-20">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Code2 className="h-5 w-5" />
            11. Independent Coding Challenge
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-foreground">{lesson.exercise.title}</h3>
            <p className="text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-line">
              {lesson.exercise.instruction}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
            <span className="text-xs font-bold text-foreground">Challenge Rules:</span>
            <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-5">
              {lesson.exercise.rules.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          {/* Progressive Hint Accordions */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-muted-foreground">Need Guidance? Progressive Hints:</span>
            {lesson.exercise.hints.map((hint, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-card overflow-hidden text-xs">
                <button
                  onClick={() => toggleHint(idx)}
                  className="flex w-full items-center justify-between p-3 text-left font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <span>Hint #{idx + 1}</span>
                  {revealedHints[idx] ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
                {revealedHints[idx] && (
                  <div className="border-t border-border bg-muted/40 p-3 font-mono text-[11px] text-muted-foreground">
                    {hint}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 12. Interview Questions & Answers */}
        <section id="interview" className="space-y-4 scroll-mt-20">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500">
            <Sparkles className="h-4 w-4" />
            12. Technical Interview Preparation
          </div>

          <div className="space-y-3">
            {lesson.interviewQuestions.map((iq, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                    {iq.level}
                  </span>

                  <button
                    onClick={() => toggleAnswer(idx)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600"
                  >
                    {revealedAnswers[idx] ? 'Hide Answer' : 'Reveal Answer'}
                    {revealedAnswers[idx] ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>
                </div>

                <h4 className="text-sm font-semibold text-foreground">{iq.question}</h4>

                {revealedAnswers[idx] && (
                  <div className="rounded-xl border border-border bg-muted/50 p-4 text-xs text-muted-foreground leading-relaxed whitespace-pre-line animate-in fade-in-50 duration-150">
                    {iq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 13. Interactive Completion Checklist */}
        <section id="checklist" className="rounded-3xl border border-blue-500/30 bg-card p-6 sm:p-8 space-y-5 shadow-sm scroll-mt-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-500">
              <CheckSquare className="h-4 w-4" />
              13. Mastery Verification Checklist
            </div>
            <span className="text-xs text-muted-foreground">Persisted in browser</span>
          </div>

          <div className="space-y-2.5">
            {lesson.completionChecklist.map((item, idx) => {
              const isChecked = completedItems[idx] ?? false;
              return (
                <label
                  key={idx}
                  onClick={() => toggleChecklist(idx)}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-xs cursor-pointer transition-all ${
                    isChecked
                      ? 'border-emerald-500/40 bg-emerald-500/5 text-foreground font-medium'
                      : 'border-border bg-background text-muted-foreground hover:bg-muted/40'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <span>{item}</span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Bottom Pagination Links */}
        <nav className="flex items-center justify-between border-t border-border pt-8">
          {prevLesson ? (
            <Link
              href={prevLesson.href}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Lesson
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link
              href={nextLesson.href}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              Next: {nextLesson.title}
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Return to SaaS Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </nav>
      </div>

      {/* ========================================================
          RIGHT SIDEBAR: Table of Contents & Quick Navigation
          ======================================================== */}
      <aside className="hidden xl:block w-64 shrink-0 space-y-6 sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            On This Page
          </p>
          <nav className="space-y-1.5 text-xs">
            {[
              { id: 'overview', label: '1. Objectives' },
              { id: 'concepts', label: '2. Concept Deep-Dive' },
              { id: 'analogy', label: '3. Real-World Analogy' },
              { id: 'syntax', label: '4. Syntax Comparison' },
              { id: 'standalone', label: '5. Console Demo' },
              { id: 'implementation', label: '6. WorkSpace Steps' },
              { id: 'code', label: '7. Source Code' },
              { id: 'flow', label: '8. Execution Flow' },
              { id: 'sandbox', label: '9. Live Sandbox' },
              { id: 'mistakes', label: '10. Common Pitfalls' },
              { id: 'challenge', label: '11. Coding Challenge' },
              { id: 'interview', label: '12. Interview Prep' },
              { id: 'checklist', label: '13. Mastery Checklist' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="block text-muted-foreground hover:text-blue-500 transition-colors truncate py-0.5"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Quick Tips Box */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 text-xs space-y-1.5">
          <span className="font-bold text-blue-500 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Mentor Advice
          </span>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            Never memorize syntax blindly. Master the mental model of memory references, and React state will become effortless.
          </p>
        </div>
      </aside>
    </div>
  );
}
