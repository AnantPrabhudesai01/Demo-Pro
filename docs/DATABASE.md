# WorkSpace Database Schema & Relational Design

## 1. Overview
WorkSpace utilizes a relational PostgreSQL database schema. The database manages hierarchical relationships between Users, Workspaces, Teams, Projects, Tasks, Comments, and Activity Logs.

---

## 2. Entity Relationship Diagram (ERD)

```text
  +------------------+         +----------------------+
  |      users       | <-----> |   workspace_members  |
  +------------------+         +----------------------+
           |                              |
           | 1:N                          | N:1
           v                              v
  +------------------+         +----------------------+
  |    activities    |         |      workspaces      |
  +------------------+         +----------------------+
                                          |
                                          | 1:N
                                          v
                               +----------------------+
                               |       projects       |
                               +----------------------+
                                          |
                                          | 1:N
                                          v
                               +----------------------+
                               |        tasks         |
                               +----------------------+
                                          |
                                          | 1:N
                                          v
                               +----------------------+
                               |       comments       |
                               +----------------------+
```

---

## 3. Core Tables Specification

### 3.1 `users`
Represents registered users in the platform.
- `id` (UUID, Primary Key) - Matches Auth provider user ID.
- `email` (VARCHAR(255), UNIQUE, NOT NULL).
- `full_name` (VARCHAR(100), NOT NULL).
- `avatar_url` (TEXT).
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).
- `updated_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).

### 3.2 `workspaces`
Top-level multi-tenant container for projects and teams.
- `id` (UUID, Primary Key, DEFAULT gen_random_uuid()).
- `name` (VARCHAR(100), NOT NULL).
- `slug` (VARCHAR(100), UNIQUE, NOT NULL).
- `owner_id` (UUID, REFERENCES users(id) ON DELETE CASCADE).
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).

### 3.3 `workspace_members`
Junction table managing roles and permissions.
- `id` (UUID, Primary Key, DEFAULT gen_random_uuid()).
- `workspace_id` (UUID, REFERENCES workspaces(id) ON DELETE CASCADE).
- `user_id` (UUID, REFERENCES users(id) ON DELETE CASCADE).
- `role` (VARCHAR(20), CHECK role IN ('owner', 'admin', 'member', 'viewer')).
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).
- UNIQUE(workspace_id, user_id).

### 3.4 `projects`
Individual initiatives within a workspace.
- `id` (UUID, Primary Key, DEFAULT gen_random_uuid()).
- `workspace_id` (UUID, REFERENCES workspaces(id) ON DELETE CASCADE).
- `name` (VARCHAR(150), NOT NULL).
- `description` (TEXT).
- `status` (VARCHAR(20), CHECK status IN ('planning', 'active', 'paused', 'completed')).
- `start_date` (DATE).
- `target_date` (DATE).
- `owner_id` (UUID, REFERENCES users(id) ON DELETE SET NULL).
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).

### 3.5 `tasks`
Work items tracked inside projects.
- `id` (UUID, Primary Key, DEFAULT gen_random_uuid()).
- `project_id` (UUID, REFERENCES projects(id) ON DELETE CASCADE).
- `title` (VARCHAR(255), NOT NULL).
- `description` (TEXT).
- `status` (VARCHAR(20), CHECK status IN ('backlog', 'todo', 'in_progress', 'in_review', 'completed')).
- `priority` (VARCHAR(20), CHECK priority IN ('low', 'medium', 'high', 'urgent')).
- `assignee_id` (UUID, REFERENCES users(id) ON DELETE SET NULL).
- `due_date` (TIMESTAMP WITH TIME ZONE).
- `position` (INTEGER, NOT NULL DEFAULT 0) - Order in Kanban column.
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).
- `updated_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).

### 3.6 `comments`
Collaboration thread on tasks.
- `id` (UUID, Primary Key, DEFAULT gen_random_uuid()).
- `task_id` (UUID, REFERENCES tasks(id) ON DELETE CASCADE).
- `user_id` (UUID, REFERENCES users(id) ON DELETE CASCADE).
- `content` (TEXT, NOT NULL).
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()).

---

## 4. Indexing & Security Strategy
- Foreign keys indexed for fast joins (`tasks.project_id`, `projects.workspace_id`, `workspace_members.user_id`).
- Row-Level Security (RLS) enabled on all tables in production: users can only query workspaces and tasks where an active membership entry exists for their `auth.uid()`.
