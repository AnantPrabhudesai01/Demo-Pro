'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  HelpCircle, 
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
  Layers
} from 'lucide-react';
import { TaskPreview } from '@/components/dashboard/TaskPreview';

export function LessonContent({ lesson, prevLesson, nextLesson }) {
  const [copied, setCopied] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [revealedHints, setRevealedHints] = useState({});
  const [completedItems, setCompletedItems] = useState({});

  // Restore checklist from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`workspace_checklist_${lesson.id}`);
      if (stored) {
        setCompletedItems(JSON.parse(stored));
      }
    } catch (e) {
      // localStorage may fail in private mode
    }
  }, [lesson.id]);

  const toggleChecklist = (index) => {
    const updated = { ...completedItems, [index]: !completedItems[index] };
    setCompletedItems(updated);
    try {
      localStorage.setItem(`workspace_checklist_${lesson.id}`, JSON.stringify(updated));
    } catch (e) {}
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAnswer = (idx) => {
    setRevealedAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleHint = (idx) => {
    setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* 1. Header & Title */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 uppercase tracking-wider">
          <BookOpen className="h-4 w-4" />
          {lesson.bookSlug.replace('-', ' ')} • Chapter {lesson.chapterSlug.replace('-', ' ')}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {lesson.title}
        </h1>
      </div>

      {/* 2. Learning Objective */}
      <section className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-blue-600 dark:text-blue-400">
          <Sparkles className="h-5 w-5" />
          2. Learning Objective
        </h2>
        <div className="mt-3 text-sm text-foreground leading-relaxed whitespace-pre-line">
          {lesson.learningObjective}
        </div>
      </section>

      {/* 3. Prerequisites */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">3. Prerequisites</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
          {lesson.prerequisites.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </section>

      {/* 4. Concept Explanation */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">4. Concept Explanation</h2>
        <div className="prose prose-slate dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {lesson.conceptExplanation}
        </div>
      </section>

      {/* 5. Real-World Analogy */}
      <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-amber-600 dark:text-amber-400">
          <Lightbulb className="h-5 w-5" />
          5. Real-World Analogy
        </h2>
        <p className="mt-2 text-sm text-foreground leading-relaxed">
          {lesson.analogy}
        </p>
      </section>

      {/* 6. Syntax */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">6. Syntax</h2>
        <div className="relative rounded-xl border border-border bg-slate-950 p-4 font-mono text-xs text-slate-100">
          <pre className="overflow-x-auto">{lesson.syntax}</pre>
        </div>
      </section>

      {/* 7. Small Standalone Example */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">7. Small Standalone Example</h2>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Terminal className="h-3.5 w-3.5" />
            Runs in Node.js or Browser Console
          </span>
        </div>
        <div className="relative rounded-xl border border-border bg-slate-950 p-4 font-mono text-xs text-slate-100">
          <pre className="overflow-x-auto">{lesson.standaloneExample}</pre>
        </div>
      </section>

      {/* 8. Step-by-Step Implementation */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">8. Step-by-Step Implementation</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {lesson.stepByStep.map((step) => (
            <div key={step.step} className="rounded-xl border border-border bg-card p-5">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white mb-2">
                {step.step}
              </span>
              <h3 className="font-semibold text-sm text-foreground">{step.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{step.goal}</p>
              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-mono text-blue-500">{step.file}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Exact Code */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">9. Exact Code</h2>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">components/dashboard/TaskPreview.js</p>
          </div>
          <button
            onClick={() => copyCode(lesson.exactCode)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy Code'}
          </button>
        </div>
        <div className="relative rounded-xl border border-border bg-slate-950 p-5 font-mono text-xs text-slate-100 overflow-x-auto max-h-[460px] overflow-y-auto">
          <pre>{lesson.exactCode}</pre>
        </div>
      </section>

      {/* 10. Line-by-Line Explanation */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">10. Line-by-Line Explanation</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="divide-y divide-border">
            {lesson.lineByLineExplanation.map((item, idx) => (
              <div key={idx} className="p-4 space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-foreground font-semibold">
                    Lines {item.lines}
                  </span>
                  <code className="text-blue-500 dark:text-blue-400 font-mono font-semibold">{item.code}</code>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Concept Mapping */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">11. React Concept Mapping</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {lesson.conceptMapping.map((map, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-card p-4 space-y-1.5">
              <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-blue-500" />
                {map.concept}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{map.relationship}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Execution Flow */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">12. Execution Flow</h2>
        <div className="rounded-xl border border-border bg-muted/40 p-5 font-mono text-xs text-foreground leading-relaxed whitespace-pre-line">
          {lesson.executionFlow}
        </div>
      </section>

      {/* 13. Expected Output & Live Component */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">13. Expected Output & Live Sandbox</h2>
        <p className="text-sm text-muted-foreground whitespace-pre-line">{lesson.expectedOutput}</p>
        
        {/* Live Interactive Sandbox right inside the lesson! */}
        <div className="rounded-xl border-2 border-dashed border-blue-500/40 p-4 bg-background">
          <div className="text-[11px] font-semibold text-blue-500 uppercase tracking-wider mb-2">
            Live Embedded Component:
          </div>
          <TaskPreview />
        </div>
      </section>

      {/* 14. Testing Cases */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">14. Testing & Verification</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="p-3 font-semibold">Test Type</th>
                <th className="p-3 font-semibold">Action Performed</th>
                <th className="p-3 font-semibold">Expected Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lesson.testingCases.map((tc, idx) => (
                <tr key={idx} className="hover:bg-muted/30">
                  <td className="p-3 font-semibold text-foreground">{tc.type}</td>
                  <td className="p-3 text-muted-foreground">{tc.action}</td>
                  <td className="p-3 text-foreground">{tc.expected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 15. Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">15. Common Beginner Mistakes</h2>
        <div className="space-y-3">
          {lesson.commonMistakes.map((cm, idx) => (
            <div key={idx} className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400">
                <AlertTriangle className="h-4 w-4" />
                Mistake: {cm.mistake}
              </div>
              <p className="text-xs text-muted-foreground"><strong className="text-foreground">Why it fails:</strong> {cm.whyWrong}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono"><strong className="text-foreground">Correct pattern:</strong> {cm.correction}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 16. Independent Coding Exercise */}
      <section className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-6 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
          <Code2 className="h-5 w-5" />
          16. {lesson.exercise.title}
        </div>
        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
          {lesson.exercise.description}
        </p>

        {/* Hints toggles */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-muted-foreground">Need hints?</p>
          {lesson.exercise.hints.map((hint, idx) => (
            <div key={idx} className="rounded-lg border border-border bg-card p-3 text-xs">
              <button
                onClick={() => toggleHint(idx)}
                className="flex w-full items-center justify-between text-left font-medium text-foreground"
              >
                <span>Hint #{idx + 1}</span>
                {revealedHints[idx] ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
              {revealedHints[idx] && (
                <p className="mt-2 text-muted-foreground font-mono text-[11px]">{hint}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 17. WorkSpace Implementation */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">17. WorkSpace SaaS Implementation</h2>
        <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {lesson.workspaceImplementation}
        </div>
      </section>

      {/* 18. Can We Build This? */}
      <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 space-y-2">
        <h2 className="text-base font-bold text-emerald-600 dark:text-emerald-400">
          18. Can We Build This Feature Now?
        </h2>
        <p className="text-sm font-semibold text-foreground">{lesson.canWeBuildThis.verdict}</p>
        <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1 mt-2">
          {lesson.canWeBuildThis.reasons.map((r, idx) => (
            <li key={idx}>{r}</li>
          ))}
        </ul>
      </section>

      {/* 19. Interview Questions with Expandable Answers */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">19. Interview Questions</h2>
        <div className="space-y-3">
          {lesson.interviewQuestions.map((iq, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="rounded bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-accent-foreground">
                  {iq.level}
                </span>
                <button
                  onClick={() => toggleAnswer(idx)}
                  className="text-xs font-semibold text-blue-500 hover:underline flex items-center gap-1"
                >
                  {revealedAnswers[idx] ? 'Hide Answer' : 'Reveal Answer'}
                  {revealedAnswers[idx] ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                </button>
              </div>
              <h3 className="text-sm font-semibold text-foreground">{iq.question}</h3>
              {revealedAnswers[idx] && (
                <div className="mt-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground leading-relaxed whitespace-pre-line border border-border">
                  {iq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 20. Chapter Summary */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-foreground">20. Chapter Summary</h2>
        <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {lesson.chapterSummary}
        </div>
      </section>

      {/* 21. Interactive Completion Checklist */}
      <section className="rounded-2xl border border-blue-500/30 bg-card p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-500" />
            21. Completion Checklist
          </h2>
          <span className="text-xs text-muted-foreground">Persisted in browser</span>
        </div>
        <div className="space-y-2.5">
          {lesson.completionChecklist.map((item, idx) => {
            const isChecked = completedItems[idx] ?? false;
            return (
              <label
                key={idx}
                onClick={() => toggleChecklist(idx)}
                className={`flex items-start gap-3 rounded-lg border p-3 text-xs cursor-pointer transition-colors ${
                  isChecked
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-foreground'
                    : 'border-border bg-background text-muted-foreground hover:bg-muted/40'
                }`}
              >
                <div className="mt-0.5">
                  {isChecked ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <span className={isChecked ? 'font-medium' : ''}>{item}</span>
              </label>
            );
          })}
        </div>
      </section>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between border-t border-border pt-6">
        {prevLesson ? (
          <Link
            href={prevLesson.href}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous: {prevLesson.title}
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            href={nextLesson.href}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            Next: {nextLesson.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Return to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
