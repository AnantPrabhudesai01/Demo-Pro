export const LESSON_1_1 = {
  id: 'b1-c1-l1',
  bookId: 'book-1',
  bookSlug: 'javascript-foundations',
  chapterSlug: 'variables-and-data-structures',
  lessonSlug: 'variables-scope-primitives',
  title: 'Lesson 1.1: Variables, Scope, and Primitive vs Reference Types',
  subtitle: 'Master JavaScript memory pointers, block scope, and why React re-renders depend on referential immutability.',
  duration: '20 min read',
  difficulty: 'Foundational',

  learningObjectives: [
    {
      id: 1,
      title: "Master 'const' vs 'let' vs 'var'",
      detail: "Understand block scoping, avoid temporal dead zones (TDZ), and eliminate variable leakage across component re-renders."
    },
    {
      id: 2,
      title: "Understand Stack vs Heap Memory",
      detail: "Differentiate between Primitive values stored by value and Objects/Arrays stored by memory address (reference)."
    },
    {
      id: 3,
      title: "The React Re-render Law: Referential Identity",
      detail: "Explain why directly mutating an object in React causes silent bugs where the UI refuses to update on screen."
    },
    {
      id: 4,
      title: "Immutable State Updates with Spread (...)",
      detail: "Use the spread operator to produce new memory pointers, guaranteeing reliable React reconciliation."
    }
  ],

  prerequisites: [
    'Basic familiarity with reading JavaScript code.',
    'No prior React experience required — we establish the core mental foundation here first.'
  ],

  // Structured concept sections (rendered with bespoke cards, tables, and comparison blocks)
  conceptSections: [
    {
      id: 'declarations',
      title: "1. Variable Declarations: 'const' vs 'let' vs 'var'",
      lead: "In modern JavaScript and React, how you declare a variable determines its scope, lifetime, and whether it can cause subtle bugs.",
      tableData: [
        {
          keyword: 'const',
          scope: 'Block Scope { }',
          reassignable: 'No',
          hoisting: 'No (TDZ)',
          usage: '90% of your React code (hooks, functions, props, derived values)'
        },
        {
          keyword: 'let',
          scope: 'Block Scope { }',
          reassignable: 'Yes',
          hoisting: 'No (TDZ)',
          usage: 'Loop counters or values genuinely reassigned inside a function'
        },
        {
          keyword: 'var',
          scope: 'Function / Global',
          reassignable: 'Yes',
          hoisting: 'Yes (as undefined)',
          usage: 'Never use in modern React (causes variable leakage bugs)'
        }
      ],
      ruleOfThumb: "Always default to 'const'. Use 'let' only when you explicitly intend to reassign the identifier. Never use 'var'."
    },
    {
      id: 'memory-model',
      title: '2. The JavaScript Memory Model: Primitives vs Reference Types',
      lead: 'This is the single most important concept in JavaScript for understanding React state updates.',
      primitives: {
        types: ['string', 'number', 'boolean', 'null', 'undefined', 'symbol', 'bigint'],
        location: 'Stored directly in the Call Stack (by value)',
        comparison: 'Compared by value: (42 === 42 is true)',
        behavior: 'Copying a primitive creates an independent copy of the value.'
      },
      references: {
        types: ['Object', 'Array', 'Function', 'Date'],
        location: 'Stored in the Heap (variable holds a memory address pointer)',
        comparison: 'Compared by memory address: ({ id: 1 } === { id: 1 } is FALSE)',
        behavior: 'Copying an object only copies the memory pointer, NOT the data itself!'
      }
    },
    {
      id: 'react-state-law',
      title: '3. The React Re-render Law: Why Object Mutation Fails',
      lead: 'React uses shallow referential equality (Object.is) to decide if a component needs to re-render.',
      badCode: `// ANTI-PATTERN: Direct Object Mutation (UI WILL NOT UPDATE!)
const handleComplete = () => {
  task.status = "completed"; // Mutating the existing object in memory
  setTask(task);            // React checks: Object.is(task, task) -> TRUE!
  // RESULT: React assumes nothing changed and SKIPS re-rendering!
};`,
      goodCode: `// CORRECT PATTERN: Immutability (UI UPDATES INSTANTLY!)
const handleComplete = () => {
  // Return a BRAND NEW object with the spread operator (...)
  setTask(prevTask => ({
    ...prevTask,            // Copy existing properties
    status: "completed",    // Override changed property
  }));
  // React checks: Object.is(prevTask, newTask) -> FALSE (new memory pointer!)
  // RESULT: React triggers re-render and updates the DOM immediately!
};`,
      explanation: 'Because React compares memory addresses rather than inspecting every nested property, you must create a new object in memory to signal that data has changed.'
    },
    {
      id: 'derived-state',
      title: '4. Derived State: Avoid Storing Redundant Values',
      lead: 'A common beginner mistake is creating unnecessary state variables for values that can be calculated on the fly.',
      rule: 'If a value can be computed synchronously from existing state or props during render, do NOT store it in useState.'
    }
  ],

  analogy: {
    title: 'The Five-Dollar Bill vs. The Google Doc Link',
    primitiveTitle: 'Primitive Value = Cash in Your Pocket',
    primitiveText: 'If you have a $5 bill and give your friend a $5 bill, you each hold a separate physical bill. If your friend tears their bill, your bill remains intact.',
    referenceTitle: 'Reference Value = Shared Google Doc URL',
    referenceText: 'If you email a Google Doc link (URL) to a collaborator, you did not create a second document. You both hold the exact same pointer to the same document in the cloud. If your collaborator deletes paragraph 1, your document changes too.',
    reactTakeaway: 'In React, if you want to propose a revision, you must click "Make a Copy" (allocate a new memory pointer) so React can compare the old document link with the new document link.'
  },

  syntaxCards: [
    {
      title: 'Primitive Variables',
      code: `const projectName = "WorkSpace"; // Cannot be reassigned
let activeTaskCount = 0;        // Can be reassigned: activeTaskCount = 1;`
    },
    {
      title: 'Object Reference (Heap Memory)',
      code: `const task = {
  id: "task-101",
  title: "Build Navigation Shell",
  completed: false,
};`
    },
    {
      title: 'Immutable Update with Spread (...)',
      code: `const updatedTask = {
  ...task,          // Shallow-copies all properties
  completed: true,  // Overwrites specific property with new value
}; // updatedTask has a BRAND NEW memory address!`
    }
  ],

  standaloneDemo: {
    title: 'Standalone Node.js / Browser Console Experiment',
    code: `// Test 1: Primitive Value Equality
const valA = "WorkSpace";
const valB = "WorkSpace";
console.log(valA === valB); // Output: true (Values are identical)

// Test 2: Object Reference Equality
const taskA = { id: 1, title: "Deploy" };
const taskB = { id: 1, title: "Deploy" };
console.log(taskA === taskB); // Output: false! (Different memory addresses)

// Test 3: The Mutation Pitfall
const taskRef = taskA;
taskRef.title = "Updated Title";
console.log(taskA.title); // Output: "Updated Title" (taskA was mutated!)`,
    takeaway: 'Notice how taskA and taskB have identical contents, yet taskA === taskB is false because they point to different locations in heap memory.'
  },

  stepByStep: [
    {
      step: 1,
      title: 'Define the Task Object Shape',
      file: 'components/dashboard/TaskPreview.js',
      description: 'Model a realistic SaaS task with id, title, priority, status, and updatedAt timestamp.'
    },
    {
      step: 2,
      title: 'Initialize Reactive State with useState',
      file: 'components/dashboard/TaskPreview.js',
      description: 'Pass the task object as the initial state snapshot.'
    },
    {
      step: 3,
      title: 'Write a Pure State Updater Function',
      file: 'components/dashboard/TaskPreview.js',
      description: 'Use the functional updater form (prevTask => ...) and object spread ({ ...prevTask }) to return a new memory pointer.'
    },
    {
      step: 4,
      title: 'Calculate Derived State on the Fly',
      file: 'components/dashboard/TaskPreview.js',
      description: 'Compute isCompleted directly from task.status without declaring a separate useState variable.'
    }
  ],

  exactCode: `'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle, RefreshCw } from 'lucide-react';

export function TaskPreview() {
  // Step A: Declare state using an object reference
  const [task, setTask] = useState({
    id: 'task-1',
    title: 'Initialize Next.js App Router and Tailwind Shell',
    priority: 'high',
    status: 'in_progress',
    updatedAt: new Date().toLocaleTimeString(),
  });

  // Step B: Pure updater function producing a fresh object reference
  const handleToggleStatus = () => {
    setTask((prevTask) => {
      const nextStatus = prevTask.status === 'completed' ? 'in_progress' : 'completed';
      
      // CRITICAL: We return a brand new object using the spread operator (...prevTask).
      // This allocates a new memory address, ensuring React detects the state update!
      return {
        ...prevTask,
        status: nextStatus,
        updatedAt: new Date().toLocaleTimeString(),
      };
    });
  };

  // Step C: Derived state (calculated dynamically during render)
  const isCompleted = task.status === 'completed';

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-blue-500/40">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleStatus}
            className="mt-0.5 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
            title="Click to toggle status"
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          <div>
            <h4 className={\`font-medium text-sm text-foreground transition-all \${isCompleted ? 'line-through opacity-60' : ''}\`}>
              {task.title}
            </h4>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded bg-accent px-2 py-0.5 font-medium text-accent-foreground uppercase tracking-wider text-[10px]">
                <AlertCircle className="h-3 w-3" />
                {task.priority}
              </span>
              <span>Updated: {task.updatedAt}</span>
              <span className={\`font-medium capitalize \${isCompleted ? 'text-emerald-500' : 'text-blue-500'}\`}>
                {task.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={handleToggleStatus}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-hover transition-colors shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {isCompleted ? 'Reopen Task' : 'Complete Task'}
          </button>
        </div>
      </div>
    </div>
  );
}`,

  lineExplanations: [
    {
      lines: '1',
      code: "'use client';",
      explanation: 'Directs Next.js App Router to package this component for client-side interactivity, enabling useState and click handlers.'
    },
    {
      lines: '8–14',
      code: 'const [task, setTask] = useState({ ... });',
      explanation: 'Initializes state. task is the state snapshot reference; setTask is the dispatch function.'
    },
    {
      lines: '17–28',
      code: 'setTask((prevTask) => ({ ...prevTask, status: nextStatus }));',
      explanation: 'Uses the functional updater form. Creates a new object literal with spread, guaranteeing referential inequality.'
    },
    {
      lines: '31',
      code: "const isCompleted = task.status === 'completed';",
      explanation: 'Derived state: computed synchronously during render. Eliminates redundant useState variables.'
    }
  ],

  executionFlow: [
    { step: 1, title: 'User Click', desc: 'User clicks "Complete Task" button in browser.' },
    { step: 2, title: 'Event Trigger', desc: 'Synthetic onClick handler calls handleToggleStatus.' },
    { step: 3, title: 'State Dispatch', desc: 'setTask functional updater receives the current state snapshot (prevTask).' },
    { step: 4, title: 'Heap Allocation', desc: 'JavaScript allocates a BRAND NEW object in heap memory via spread (...).' },
    { step: 5, title: 'Object.is Comparison', desc: 'React checks Object.is(oldTask, newTask) -> Evaluates to FALSE.' },
    { step: 6, title: 'Reconciliation', desc: 'React schedules re-render and updates the DOM with green checkmark.' }
  ],

  testingCases: [
    {
      type: 'Normal Toggle',
      action: 'Click "Complete Task"',
      expected: 'Icon turns green checkmark, title gets strikethrough, button flips to "Reopen Task".'
    },
    {
      type: 'Reverse Toggle',
      action: 'Click "Reopen Task"',
      expected: 'Status reverts to in_progress, checkmark reverts to hollow circle.'
    },
    {
      type: 'Rapid Clicks',
      action: 'Click button 5 times rapidly',
      expected: 'All updates queue accurately because functional updater form (prev => ...) is used.'
    }
  ],

  commonMistakes: [
    {
      title: 'Direct Object Mutation',
      bad: 'task.status = "completed"; setTask(task);',
      why: 'task and task point to the identical memory address. Object.is returns true, so React skips rendering.',
      fix: 'setTask(prev => ({ ...prev, status: "completed" }));'
    },
    {
      title: 'Redundant Stored State',
      bad: 'const [isCompleted, setIsCompleted] = useState(false);',
      why: 'Forces you to keep two states in sync. If one fails, the UI displays contradictory information.',
      fix: 'const isCompleted = task.status === "completed"; // Calculate in render'
    },
    {
      title: 'Using var inside components',
      bad: 'for (var i = 0; i < items.length; i++) { ... }',
      why: 'var hoists to function scope and leaks across blocks, causing variable shadowing and race conditions.',
      fix: 'Always use const (or let for loop counters).'
    }
  ],

  exercise: {
    title: 'Challenge: The Task Priority Cycler',
    instruction: 'Write a pure JavaScript function named cyclePriority(task) that accepts a task object and returns a BRAND NEW task object with the next priority level in order:\n"low" → "medium" → "high" → "urgent" → "low"',
    rules: [
      'Do NOT mutate the original task (task.priority = ... is forbidden).',
      'The original task object must remain completely unmodified.',
      'Return a fresh object with the spread operator.'
    ],
    hints: [
      'Define an array of priorities: const levels = ["low", "medium", "high", "urgent"];',
      'Find the current index: const idx = levels.indexOf(task.priority);',
      'Compute the next index using modulo: const nextIdx = (idx + 1) % levels.length;',
      'Return a new object: return { ...task, priority: levels[nextIdx] };'
    ]
  },

  interviewQuestions: [
    {
      level: 'Beginner',
      question: 'What is the primary difference between let and const in JavaScript?',
      answer: 'const declares a block-scoped variable that cannot be reassigned to a new value. let declares a block-scoped variable that can be reassigned. Both exist in the Temporal Dead Zone (TDZ) before declaration. Note: const prevents reassigning the variable identifier, but does NOT make object properties immutable.'
    },
    {
      level: 'Intermediate',
      question: 'Why does React state require immutable updates instead of mutating existing objects?',
      answer: 'React relies on shallow referential equality checks (Object.is) for performance. If you mutate an object in place, its memory address remains unchanged, so React assumes nothing changed and skips re-rendering. Creating a new object reference triggers the reconciliation engine.'
    },
    {
      level: 'Practical Coding',
      question: 'Given an array of tasks in React state: const [tasks, setTasks] = useState([...]), how do you mark task #2 as completed without mutating the array?',
      answer: 'setTasks(prev => prev.map(t => t.id === 2 ? { ...t, completed: true } : t));\nmap() creates a brand new array reference, and the object spread creates a new object reference for the matching item.'
    },
    {
      level: 'Senior / Scenario',
      question: 'A junior developer says: "I updated the user profile object in my click handler, but my avatar component did not update on screen until I refreshed the page. Why?"',
      answer: 'The developer mutated the existing profile object (user.avatar = newUrl) and passed the same object back to state (setUser(user)). React compared the old and new object references, saw they were identical in memory, and skipped re-rendering. Solution: pass a fresh copy: setUser({ ...user, avatar: newUrl }).'
    }
  ],

  completionChecklist: [
    'I understand the difference between const, let, and why var is avoided.',
    'I can explain why objA === objB checks memory address rather than properties.',
    'I understand why direct state mutation causes React UI updates to fail.',
    'I can use the object spread operator (...) to produce a fresh copy of an object with modified fields.',
    'I can explain how to derive values during render instead of adding redundant state.'
  ]
};
