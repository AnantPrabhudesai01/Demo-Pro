# WorkSpace – Project Management & Team Collaboration Platform

> Learn React.js and Next.js by building a production-style SaaS application from the ground up.

WorkSpace combines an enterprise-grade project management application (inspired by Linear, Trello, and Notion) with a full, textbook-style interactive curriculum integrated directly at `/learn`.

---

## Key Features

- **Production SaaS Platform:**
  - Modern, responsive dashboard with key performance indicators (KPIs).
  - Project management with dynamic routing (`/projects/[projectId]`).
  - Interactive Kanban board with drag-and-drop workflow.
  - Team collaboration, task assignments, and activity logs.
  - Dark and light theme modes with seamless CSS variable toggles.

- **Built-in Interactive Learning Book (`/learn`):**
  - Complete 7-book curriculum spanning JavaScript Foundations to Full-Stack Next.js.
  - Granular, structured lessons with real-world analogies, code walkthroughs, execution flows, and interview questions.
  - Live code examples, standalone sandboxes, and independent coding challenges.
  - In-browser progress tracking and concept mastery indicators.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Frontend Library:** React.js
- **Styling:** Tailwind CSS & Lucide Icons
- **Language:** JavaScript (with structured TypeScript migration in Phase 8)
- **Backend:** Next.js Server Components, Server Actions, Route Handlers
- **Database:** PostgreSQL (Supabase / Neon)
- **Testing:** Vitest, React Testing Library, Playwright

---

## Getting Started

### Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+`

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd ProBook

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access WorkSpace, or navigate to [http://localhost:3000/learn](http://localhost:3000/learn) to explore the interactive programming textbook.

---

## Documentation
- [System Architecture](docs/ARCHITECTURE.md)
- [Database Schema](docs/DATABASE.md)
- [Learning Progress Tracker](docs/LEARNING_PROGRESS.md)
- [Project Progress Tracker](docs/PROJECT_PROGRESS.md)
- [Concept Mastery Checklist](docs/CONCEPT_CHECKLIST.md)
- [Changelog](docs/CHANGELOG.md)
