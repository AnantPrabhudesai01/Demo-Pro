# WorkSpace Concept Mastery Checklist

Legend:
- `NOT STARTED`: Concept not yet reached.
- `LEARNING`: Currently being taught in lessons.
- `IMPLEMENTED`: Built in the WorkSpace codebase.
- `PRACTISED`: Tested and exercised by learner.
- `MASTERED`: Fully understood, can be explained and written from memory.

---

## 1. JavaScript for React

| Concept | Status | Corresponding Lesson | Implementation in WorkSpace |
|---|---|---|---|
| Variables (`const`, `let`) | LEARNING | Book 1, Lesson 1.1 | Universal |
| Primitive vs Reference Types | LEARNING | Book 1, Lesson 1.1 | State updates & data structures |
| Scope & Hoisting | LEARNING | Book 1, Lesson 1.1 | Event handlers & closures |
| Arrow Functions & Implicit Returns | NOT STARTED | Book 1, Lesson 2.1 | Component definitions & callbacks |
| `map()` Array Transformation | NOT STARTED | Book 1, Lesson 3.1 | Rendering lists (Projects, Tasks) |
| `filter()` Array Filtering | NOT STARTED | Book 1, Lesson 3.2 | Task status & priority filters |
| `reduce()` Aggregation | NOT STARTED | Book 1, Lesson 3.3 | Dashboard metrics & progress stats |
| Destructuring (Objects & Arrays) | NOT STARTED | Book 1, Lesson 4.1 | Props, Hook returns (`useState`) |
| Spread Operator (`...`) | NOT STARTED | Book 1, Lesson 4.2 | Immutable state updates |
| Async / Await & Promises | NOT STARTED | Book 1, Lesson 5.2 | Server actions, data fetching |
| ES Modules (`import` / `export`) | NOT STARTED | Book 1, Lesson 6.1 | Component modularity |

---

## 2. React Fundamentals

| Concept | Status | Corresponding Lesson | Implementation in WorkSpace |
|---|---|---|---|
| JSX Syntax & Expressions | NOT STARTED | Book 2, Lesson 1.1 | UI templates |
| Functional Components | NOT STARTED | Book 2, Lesson 2.1 | All UI components |
| Component Hierarchy & Composition | NOT STARTED | Book 2, Lesson 2.2 | Layout, Dashboard, Cards |
| Props & Destructuring | NOT STARTED | Book 2, Lesson 3.1 | Card & Button primitives |
| The `children` Prop | NOT STARTED | Book 2, Lesson 3.2 | Modals, Cards, Layouts |
| Conditional Rendering (`&&`, Ternary) | NOT STARTED | Book 2, Lesson 4.1 | Empty states, Badges |
| List Rendering & Keys | NOT STARTED | Book 2, Lesson 4.2 | Task & project grids |
| Synthetic Events (`onClick`, etc.) | NOT STARTED | Book 2, Lesson 5.1 | Buttons, form submits |
| `useState` Mental Model & Snapshots | NOT STARTED | Book 2, Lesson 6.1 | Modal open/close, active tabs |
| Controlled Inputs | NOT STARTED | Book 2, Lesson 7.1 | Project & task forms |

---

## 3. Advanced React & Hooks

| Concept | Status | Corresponding Lesson | Implementation in WorkSpace |
|---|---|---|---|
| `useEffect` & Cleanups | NOT STARTED | Book 3, Lesson 1.1 | Listeners, outside click detection |
| `useRef` for DOM & Persistence | NOT STARTED | Book 3, Lesson 2.1 | Input autofocus, timer storage |
| `useMemo` & Memoization | NOT STARTED | Book 3, Lesson 3.1 | Filtered task lists |
| `useCallback` Referential Equality | NOT STARTED | Book 3, Lesson 3.2 | Drag event handlers |
| `useReducer` Action Architecture | NOT STARTED | Book 3, Lesson 4.1 | Complex Kanban column mutations |
| React Context API | NOT STARTED | Book 3, Lesson 5.1 | ThemeContext, WorkspaceContext |
| Custom Hooks Extraction | NOT STARTED | Book 3, Lesson 6.1 | `useDebounce`, `useLocalStorage` |
| `useOptimistic` Immediate Feedback | NOT STARTED | Book 3, Lesson 7.2 | Dragging tasks between columns |

---

## 4. Next.js App Router Architecture

| Concept | Status | Corresponding Lesson | Implementation in WorkSpace |
|---|---|---|---|
| React Server Components (RSC) | NOT STARTED | Book 4, Lesson 3.1 | Dashboard page, project loaders |
| Client Components (`"use client"`) | NOT STARTED | Book 4, Lesson 3.2 | Interactive forms, buttons, tabs |
| Dynamic Routing (`[projectId]`) | NOT STARTED | Book 4, Lesson 4.1 | Project details & Kanban board |
| Server Actions (`"use server"`) | NOT STARTED | Book 5, Lesson 1.1 | Project creation, task mutations |
| Route Handlers (`app/api/*`) | NOT STARTED | Book 5, Lesson 2.1 | REST data export |
| Caching & `revalidatePath` | NOT STARTED | Book 5, Lesson 3.1 | Cache invalidation after mutations |
| Middleware & Route Guards | NOT STARTED | Book 5, Lesson 4.1 | Protecting dashboard from guests |
