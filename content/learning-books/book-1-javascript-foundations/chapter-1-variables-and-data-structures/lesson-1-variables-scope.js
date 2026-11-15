export const LESSON_1_1 = {
  id: 'b1-c1-l1',
  bookId: 'book-1',
  bookSlug: 'javascript-foundations',
  chapterSlug: 'variables-and-data-structures',
  lessonSlug: 'variables-scope-primitives',
  title: 'Lesson 1.1: Variables, Scope, and Primitive vs Reference Types in React',

  learningObjective: `By the end of this lesson, you will be able to:
1. Distinguish between 'const' and 'let' and explain why 'var' should never be used in modern React.
2. Differentiate between Primitive values (stored by value) and Objects/Arrays (stored by reference in memory).
3. Explain why directly mutating an object or array in React causes subtle, silent bugs where the UI fails to update.
4. Predict variable scope (block scope vs function scope) and avoid temporal dead zone (TDZ) traps.`,

  prerequisites: [
    'Basic familiarity with reading code or text in a code editor.',
    'No prior React experience required — we build the mental foundation here first.'
  ],

  conceptExplanation: `In JavaScript, every piece of data you handle inside a component or function lives in computer memory. How that data is stored and referenced determines whether React knows when to re-render your screen.

### 1. 'const' vs 'let'
In modern JavaScript, we declare variables with either 'const' or 'let':
- **const**: Declares a block-scoped identifier that cannot be reassigned to a different value. 90% of your React component variables (hooks, props, helper functions, derived calculations) should be declared with 'const'.
- **let**: Declares a block-scoped variable that CAN be reassigned later. We use 'let' for counters in traditional loops or values that are genuinely reassigned within a block.
- **Why not 'var'?**: 'var' is function-scoped (or globally scoped if declared outside a function) and gets "hoisted" to the top of its scope as 'undefined'. This causes variable leakage across 'if' blocks and loops, creating unpredictable bugs. 'const' and 'let' are strictly block-scoped (confined within the curly braces '{}' where they are defined).

### 2. Primitive Values vs. Reference Values (The Golden React Concept)
This is the single most common reason beginners struggle with React state:
- **Primitives** (number, string, boolean, null, undefined, symbol, bigint):
  These values are stored directly in the execution stack. When you compare two primitives ('42 === 42' or '"WorkSpace" === "WorkSpace"'), JavaScript checks the **actual value**.
- **Objects and Arrays (Reference Types)**:
  An object or array is NOT stored directly in the variable. Instead, the variable only holds a **memory address (a pointer/reference)** pointing to where the object's data sits in the heap.
  When JavaScript compares two objects ('objA === objB'), it does NOT check their internal contents; it checks **whether both variables point to the exact same memory address** (referential identity).

### Why this matters in React:
React state updates rely on shallow referential equality checks (Object.is). If you modify the inside of an existing object:
\`\`\`javascript
project.name = "Updated Project"; // Mutating the existing object!
setProject(project);              // React checks: is project === project? YES! Same memory address.
// RESULT: React assumes nothing changed and SKIPS re-rendering the UI!
\`\`\`
To tell React that data changed, you must create a **new object in memory** (immutability), which we demonstrate below.`,

  analogy: `Think of a Primitive value like a five-dollar bill in your wallet: if someone gives you another five-dollar bill, you literally hold a distinct second bill of the same value.
Think of an Object or Array like a Google Doc link (URL) sent to you:
If you give that link to a friend, you did not create a new document — you both hold the same link pointing to the same document in the cloud. If your friend edits paragraph 1, your document changes too.
In React, if you want to propose a revision without confusing the system, you must click **"Make a Copy"** (new URL/new memory location) and edit your new copy. React compares the link addresses: if the link is different, React updates the screen.`,

  syntax: `// 1. Primitive declaration
const projectName = "SaaS Launchpad"; // Cannot be reassigned
let taskCount = 0;                   // Can be reassigned: taskCount = 1

// 2. Object declaration (Reference in memory)
const task = {
  id: "task-101",
  title: "Design Navigation",
  completed: false
};

// 3. Creating a new reference (Immutable copy)
const updatedTask = {
  ...task,            // Copy all properties
  completed: true     // Overwrite specific property with new value
};`,

  standaloneExample: `// Standalone JavaScript Demo:
// Run this directly in Node.js or browser console

const originalTask = { id: 1, title: "Set up project", status: "todo" };

// Anti-Pattern: Direct Mutation
const mutatedTask = originalTask;
mutatedTask.status = "done";

console.log(originalTask.status); // Outputs "done"! Original was changed accidentally!
console.log(originalTask === mutatedTask); // true (Same memory reference)

// Correct Pattern: Immutability (Shallow Copy)
const freshTask = { id: 2, title: "Build sidebar", status: "todo" };
const updatedFreshTask = { ...freshTask, status: "done" };

console.log(freshTask.status);        // "todo" (Original preserved intact!)
console.log(updatedFreshTask.status); // "done"
console.log(freshTask === updatedFreshTask); // false (New memory reference! React will re-render!)`,

  stepByStep: [
    {
      step: 1,
      title: 'Inspect how WorkSpace stores a Task object',
      goal: 'Define a task with standard SaaS properties (id, title, priority, status).',
      why: 'Real applications operate on structured objects, not raw primitive variables alone.',
      file: 'components/dashboard/TaskPreview.js',
      description: 'We represent a task with typed fields and render its attributes cleanly.'
    },
    {
      step: 2,
      title: 'Simulate updating the task status',
      goal: 'Create an updater function that produces a brand new reference instead of mutating the task in place.',
      why: 'Demonstrates the exact mechanism that React useState updater functions require.',
      file: 'components/dashboard/TaskPreview.js',
      description: 'We show before and after state snapshots and log their referential identity.'
    }
  ],

  exactCode: `// components/dashboard/TaskPreview.js
'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react';

export function TaskPreview() {
  // Step A: Declare state using a clean object reference
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
      
      // We return a BRAND NEW object with the spread operator (...prevTask).
      // This gives React a new memory pointer, guaranteeing an instant UI update!
      return {
        ...prevTask,
        status: nextStatus,
        updatedAt: new Date().toLocaleTimeString(),
      };
    });
  };

  const isCompleted = task.status === 'completed';

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-blue-500/50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggleStatus}
            className="mt-0.5 text-muted-foreground hover:text-primary transition-colors"
            title="Click to toggle status"
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          <div>
            <h4 className={\`font-medium text-sm text-foreground \${isCompleted ? 'line-through opacity-60' : ''}\`}>
              {task.title}
            </h4>
            <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded bg-accent px-2 py-0.5 font-medium text-accent-foreground uppercase tracking-wider text-[10px]">
                <AlertCircle className="h-3 w-3" />
                {task.priority}
              </span>
              <span>Updated: {task.updatedAt}</span>
              <span className={\`font-medium \${isCompleted ? 'text-emerald-500' : 'text-blue-500'}\`}>
                {task.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleToggleStatus}
          className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          {isCompleted ? 'Reopen Task' : 'Complete Task'}
        </button>
      </div>
    </div>
  );
}`,

  lineByLineExplanation: [
    {
      lines: "1",
      code: "'use client';",
      explanation: "Tells Next.js App Router that this component contains interactive client-side React code (state hooks and click handlers), rendering on the client after SSR."
    },
    {
      lines: "7-13",
      code: "const [task, setTask] = useState({ ... });",
      explanation: "Initializes React state with an initial object. 'task' is the current snapshot reference; 'setTask' is the dispatch function used to trigger updates."
    },
    {
      lines: "16-27",
      code: "setTask((prevTask) => ({ ...prevTask, status: nextStatus }));",
      explanation: "CRITICAL: Uses the functional updater form '(prevTask) => ...'. Instead of modifying prevTask directly (e.g. prevTask.status = nextStatus), we return a NEW object literal '{ ...prevTask, status: nextStatus }'. This ensures referential inequality (new memory address), prompting React to schedule a re-render."
    },
    {
      lines: "29",
      code: "const isCompleted = task.status === 'completed';",
      explanation: "Derived state! Notice we do NOT store 'isCompleted' in a separate useState. It is calculated synchronously during render from 'task.status'. Keeping derived values out of state prevents desynchronization bugs."
    }
  ],

  conceptMapping: [
    {
      concept: "Block Scope (const / let)",
      relationship: "Variables inside handleToggleStatus are isolated within that function; they do not leak or overwrite outer component variables."
    },
    {
      concept: "Referential Equality (Object.is)",
      relationship: "React checks if oldState === newState. Returning '{ ...prevTask }' creates a new reference so the equality check returns false, triggering a render."
    },
    {
      concept: "Derived State vs. Stored State",
      relationship: "Deriving 'isCompleted' from 'task.status' directly in render avoids managing two separate states that could get out of sync."
    }
  ],

  executionFlow: `User clicks 'Complete Task' button
    ↓
Browser triggers the onClick event
    ↓
handleToggleStatus handler executes
    ↓
setTask((prevTask) => ({ ...prevTask, status: 'completed' })) is called
    ↓
JavaScript creates a BRAND NEW object in heap memory
    ↓
React compares old task reference with new task reference (Object.is)
    ↓
References are DIFFERENT (referential inequality)
    ↓
React schedules a re-render of TaskPreview
    ↓
Component re-executes with task.status === 'completed'
    ↓
Virtual DOM diff applies green CheckCircle2 and strikethrough to real DOM
    ↓
User sees updated task UI instantly!`,

  expectedOutput: `In the browser:
- A card displaying the task title: "Initialize Next.js App Router and Tailwind Shell".
- A badge showing priority "HIGH" in blue/indigo and status "in progress".
- When you click "Complete Task":
  1. The radio circle turns into a green checkmark icon.
  2. The title text receives a strikethrough line and subtle opacity.
  3. The status text changes to "completed" in green.
  4. The timestamp updates to the current second.
  5. The action button text switches to "Reopen Task".`,

  testingCases: [
    {
      type: 'Normal Case',
      action: 'Click "Complete Task"',
      expected: 'Status toggles to completed, icon changes to green checkmark, timestamp updates.'
    },
    {
      type: 'Toggle Back',
      action: 'Click "Reopen Task"',
      expected: 'Status toggles back to in_progress, checkmark reverts to hollow circle.'
    },
    {
      type: 'Rapid Clicks (Stress test)',
      action: 'Click the button 5 times quickly',
      expected: 'Because we used functional state updates (prevTask => ...), every click is processed accurately without dropping updates.'
    }
  ],

  commonMistakes: [
    {
      mistake: "Mutating state directly: task.status = 'completed'; setTask(task);",
      whyWrong: "Because 'task' has the same memory reference as before, React's 'Object.is' check returns true. React believes nothing changed and skips re-rendering!",
      correction: "Always create a new object: setTask(prev => ({ ...prev, status: 'completed' }));"
    },
    {
      mistake: "Declaring variables with 'var' inside loops or conditions.",
      whyWrong: "'var' leaks outside the block and can overwrite other variables with the same name.",
      correction: "Always default to 'const'. Use 'let' only when you intend to reassign the identifier."
    },
    {
      mistake: "Storing derived values in separate state (e.g. const [isCompleted, setIsCompleted] = useState(false)).",
      whyWrong: "You now have to remember to update two states in sync. If one fails, your UI displays contradictory data.",
      correction: "Calculate derived values on the fly: const isCompleted = task.status === 'completed';"
    }
  ],

  exercise: {
    title: 'Independent Coding Exercise: Task Priority Cycler',
    description: `Write a small function named 'cyclePriority' that takes a task object with priority ('low', 'medium', 'high', 'urgent') and returns a NEW task object with the next priority level in order:
low → medium → high → urgent → low.
Requirements:
1. Do NOT mutate the original task.
2. The original task object must remain completely unchanged.
3. Return a new object with the updated priority.`,
    hints: [
      'Hint 1: Use an array of priorities: const priorities = ["low", "medium", "high", "urgent"];',
      'Hint 2: Find the current index using priorities.indexOf(task.priority).',
      'Hint 3: Use the modulo operator (%) to wrap around to 0 when reaching the end: (currentIndex + 1) % priorities.length.',
      'Hint 4: Use object spread ({ ...task, priority: nextPriority }) to return a fresh reference.'
    ]
  },

  workspaceImplementation: `In WorkSpace:
- Every Task in our Project Board (/projects/[projectId]/board) is represented as an object with status, priority, title, and assigned team members.
- When you drag a card from 'In Progress' to 'Completed', or change its priority in a dropdown, our Kanban state reducer uses object and array spread operators to construct new references.
- This guarantees instant, flicker-free optimistic UI updates.`,

  canWeBuildThis: {
    verdict: 'YES – We can implement it now!',
    reasons: [
      'It only requires standard JavaScript objects, basic function execution, and modern const/let scoping.',
      'We will immediately embed this TaskPreview component into our WorkSpace Dashboard shell to make it interactive.'
    ]
  },

  interviewQuestions: [
    {
      level: 'Beginner',
      question: 'What is the primary difference between let and const in JavaScript?',
      answer: "'const' creates an identifier that cannot be reassigned to a new value after its initial declaration. 'let' allows reassignment. Both are block-scoped. Note that 'const' prevents reassignment of the variable identifier itself, but does NOT make the contents of an object or array immutable."
    },
    {
      level: 'Intermediate',
      question: 'Why does React state require immutable updates instead of direct mutation?',
      answer: "React relies on shallow referential equality (Object.is) to quickly determine if component state has changed. If you mutate an object in place, its memory address remains unchanged, so React assumes no update occurred and avoids re-rendering. Creating a new object reference triggers the reconciliation pipeline."
    },
    {
      level: 'Practical Coding',
      question: 'Given an array of tasks in React state: const [tasks, setTasks] = useState([...]), how do you update task with id = 2 to completed without mutating the array?',
      answer: "setTasks(prevTasks => prevTasks.map(task => task.id === 2 ? { ...task, completed: true } : task));\nUsing map() creates a brand new array, and for the matching item, the object spread returns a new object reference, leaving all other items untouched."
    },
    {
      level: 'Scenario-Based',
      question: 'A teammate says: \"I updated the user profile object in my click handler, but my avatar component did not update on screen until I refreshed the page. Why?\"',
      answer: "The teammate mutated the existing profile object (e.g. user.avatar = newUrl) and passed the same object back to state (setUser(user)). React compared the old and new object references, saw they were identical in memory, and skipped re-rendering. Solution: pass a fresh copy: setUser({ ...user, avatar: newUrl })."
    }
  ],

  chapterSummary: `In this foundational lesson, we established the core mental model that governs all React state management:
1. 'const' and 'let' provide clean, block-scoped variable declarations that prevent accidental hoisting bugs.
2. Primitives are compared by value; Objects and Arrays are compared by memory reference.
3. React relies on referential comparison to trigger re-renders.
4. Direct mutation breaks React reactivity. Always return fresh copies using the spread operator or array transformation methods.
5. Derived state should be calculated on the fly during render, not stored in unnecessary separate useState variables.`,

  completionChecklist: [
    'I understand the difference between const, let, and why var is avoided.',
    'I can explain why objA === objB checks memory address rather than properties.',
    'I understand why direct state mutation causes React UI updates to fail.',
    'I can use the object spread operator (...) to produce a fresh copy of an object with modified fields.',
    'I can explain how to derive values during render instead of adding redundant state.'
  ]
};
