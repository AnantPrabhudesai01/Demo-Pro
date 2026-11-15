# WorkSpace Application Architecture

## 1. High-Level System Architecture

WorkSpace is a modern project management and team collaboration SaaS platform built with the Next.js App Router, React, Tailwind CSS, and a relational PostgreSQL database.

```text
+-------------------------------------------------------------------------+
|                              CLIENT TIER                                |
|  - React Client Components ("use client") for interactive UI            |
|  - Local state: useState, useReducer                                    |
|  - Shared UI state: React Context (Theme, Workspace, Toast)             |
|  - Optimistic mutations: useOptimistic for rapid feedback               |
+-------------------------------------------------------------------------+
                                    |
                HTTP / Server Action RPC / Next Router
                                    v
+-------------------------------------------------------------------------+
|                            NEXT.JS SERVER                               |
|  - React Server Components (RSC): Direct data fetching without client   |
|    network waterfalls, zero bundle overhead for backend logic           |
|  - Server Actions: Type-safe, validated data mutations                  |
|  - Route Handlers (/api/*): Public REST endpoints & webhooks            |
|  - Middleware: Session validation, cookie handling, redirects          |
+-------------------------------------------------------------------------+
                                    |
                          SQL / Database Driver
                                    v
+-------------------------------------------------------------------------+
|                             DATA TIER                                   |
|  - PostgreSQL Database (Supabase / Neon)                                |
|  - Normalized relational schema (Workspaces, Projects, Tasks, Users)   |
|  - Row Level Security (RLS) & Server-side Authorization                 |
+-------------------------------------------------------------------------+
```

---

## 2. Component Boundary Strategy: Server vs. Client

One of the central architectural lessons of WorkSpace is **establishing clean component boundaries**:

1. **Default to Server Components (RSC):**
   - Components that fetch data, read database records, or render static structure are Server Components by default.
   - Benefits: Zero JavaScript shipped to the browser, direct access to server secrets and database drivers, better SEO and initial page load speed.

2. **Client Components (`"use client"`):**
   - Used strictly at the leaf level or for interactive islands:
     - Form input handling (`onChange`, `onSubmit`).
     - State management (`useState`, `useReducer`, `useContext`).
     - Browser-only APIs (`localStorage`, `window`, resize listeners).
     - Drag-and-drop interactions (`dnd-kit`).

3. **Composition Pattern:**
   - Server Components can pass data as props to Client Components.
   - Server Components can pass other Server Components as `children` into Client Components (slot pattern), ensuring nested content remains on the server.

---

## 3. Directory Layout & Organization

The project uses a feature-collocated architecture:

- `app/`: Next.js App Router route trees, layouts, templates, and error boundaries.
  - `(marketing)/`: Public routes.
  - `(auth)/`: Authentication pages.
  - `(dashboard)/`: Authenticated SaaS application views.
  - `learn/`: Interactive in-app learning textbook.
- `components/`:
  - `ui/`: Design system primitives (Button, Input, Modal, Badge, Dropdown).
  - `layout/`: Top navigation, collapsible sidebar, footer.
  - `learn/`: Dedicated components for code presentation, exercises, and checklists.
- `content/`: Structured curriculum data and lesson files.
- `docs/`: Technical specifications, architectural decisions, and progress tracking.
- `lib/`: Utilities, formatting, class name helpers (`clsx`, `tailwind-merge`).
- `services/`: Encapsulated database and third-party API queries.
- `actions/`: Next.js Server Actions for mutations.
