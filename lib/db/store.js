/**
 * WorkSpace In-Memory & Persisted Relational Data Engine
 * 
 * Provides relational storage and asynchronous query/mutation methods
 * for Users, Workspaces, Projects, Tasks, Comments, and Audit Activities.
 * Architected to mirror PostgreSQL / Prisma / Supabase ORM APIs.
 */

// Initial Seed Data
const SEED_USERS = [
  {
    id: 'user-1',
    name: 'Anant',
    email: 'anant@workspace.dev',
    role: 'owner',
    title: 'Lead Architect & Founder',
    avatar: 'AN',
    color: 'from-blue-600 to-indigo-600',
    createdAt: '2026-11-01T08:00:00Z',
  },
  {
    id: 'user-2',
    name: 'Jane Doe',
    email: 'jane@workspace.dev',
    role: 'admin',
    title: 'Senior Frontend Engineer',
    avatar: 'JD',
    color: 'from-purple-600 to-pink-600',
    createdAt: '2026-11-02T09:30:00Z',
  },
  {
    id: 'user-3',
    name: 'Sam K.',
    email: 'sam@workspace.dev',
    role: 'member',
    title: 'Full-Stack Developer',
    avatar: 'SK',
    color: 'from-emerald-600 to-teal-600',
    createdAt: '2026-11-03T11:15:00Z',
  },
  {
    id: 'user-4',
    name: 'Emily M.',
    email: 'emily@workspace.dev',
    role: 'member',
    title: 'Product & UX Designer',
    avatar: 'EM',
    color: 'from-amber-600 to-orange-600',
    createdAt: '2026-11-04T14:00:00Z',
  },
];

const SEED_PROJECTS = [
  {
    id: 'proj-1',
    workspaceId: 'ws-1',
    name: 'WorkSpace Core SaaS Engine',
    description: 'Next.js 15 full-stack infrastructure, App Router layouts, and theme switching.',
    status: 'active',
    priority: 'high',
    startDate: '2026-11-10',
    targetDate: '2026-11-20',
    ownerId: 'user-1',
    members: ['user-1', 'user-2', 'user-3'],
    color: 'bg-blue-600',
    createdAt: '2026-11-10T10:00:00Z',
  },
  {
    id: 'proj-2',
    workspaceId: 'ws-1',
    name: 'Design System & UI Primitives',
    description: 'Tailwind CSS component library with accessible buttons, cards, modals, and badges.',
    status: 'completed',
    priority: 'medium',
    startDate: '2026-11-05',
    targetDate: '2026-11-15',
    ownerId: 'user-4',
    members: ['user-1', 'user-4'],
    color: 'bg-emerald-600',
    createdAt: '2026-11-05T09:00:00Z',
  },
  {
    id: 'proj-3',
    workspaceId: 'ws-1',
    name: 'Auth & PostgreSQL Integration',
    description: 'Supabase authentication, session cookies, database migrations, and Row-Level Security.',
    status: 'planning',
    priority: 'urgent',
    startDate: '2026-11-18',
    targetDate: '2026-11-28',
    ownerId: 'user-3',
    members: ['user-1', 'user-2', 'user-3'],
    color: 'bg-purple-600',
    createdAt: '2026-11-12T14:30:00Z',
  },
  {
    id: 'proj-4',
    workspaceId: 'ws-1',
    name: 'Interactive Kanban Workflow',
    description: 'Drag-and-drop task boards using dnd-kit with optimistic UI updates and server reconciliation.',
    status: 'active',
    priority: 'high',
    startDate: '2026-11-14',
    targetDate: '2026-12-02',
    ownerId: 'user-1',
    members: ['user-1', 'user-3', 'user-4'],
    color: 'bg-amber-600',
    createdAt: '2026-11-14T11:00:00Z',
  },
];

const SEED_TASKS = [
  {
    id: 'task-1',
    projectId: 'proj-1',
    title: 'Initialize Next.js App Router and Tailwind Shell',
    description: 'Scaffold project with Next.js 15+, Tailwind CSS, and configure path aliases.',
    status: 'completed',
    priority: 'high',
    assigneeId: 'user-1',
    dueDate: '2026-11-12',
    position: 0,
    createdAt: '2026-11-10T11:00:00Z',
    updatedAt: '2026-11-12T16:30:00Z',
  },
  {
    id: 'task-2',
    projectId: 'proj-1',
    title: 'Configure ThemeProvider for Dark and Light modes',
    description: 'Implement system preference detection and localStorage persistence with zero flash.',
    status: 'completed',
    priority: 'medium',
    assigneeId: 'user-2',
    dueDate: '2026-11-13',
    position: 1,
    createdAt: '2026-11-11T09:00:00Z',
    updatedAt: '2026-11-13T14:15:00Z',
  },
  {
    id: 'task-3',
    projectId: 'proj-1',
    title: 'Build Executive Dashboard with Real-Time KPIs',
    description: 'Aggregate project counts, pending tasks, velocity rate, and sprint progress.',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'user-1',
    dueDate: '2026-11-18',
    position: 0,
    createdAt: '2026-11-12T10:00:00Z',
    updatedAt: '2026-11-15T11:20:00Z',
  },
  {
    id: 'task-4',
    projectId: 'proj-4',
    title: 'Implement 5-Column Kanban Board Layout',
    description: 'Create Backlog, To Do, In Progress, In Review, and Completed columns.',
    status: 'in_progress',
    priority: 'urgent',
    assigneeId: 'user-2',
    dueDate: '2026-11-19',
    position: 1,
    createdAt: '2026-11-14T13:00:00Z',
    updatedAt: '2026-11-16T15:00:00Z',
  },
  {
    id: 'task-5',
    projectId: 'proj-4',
    title: 'Add Drag-and-Drop Card Interactions',
    description: 'Enable smooth card movements between columns with visual drop target indicators.',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user-3',
    dueDate: '2026-11-21',
    position: 0,
    createdAt: '2026-11-15T09:30:00Z',
    updatedAt: '2026-11-15T09:30:00Z',
  },
  {
    id: 'task-6',
    projectId: 'proj-3',
    title: 'Model PostgreSQL Relational Schema',
    description: 'Write SQL tables for users, workspaces, projects, tasks, and comments with foreign keys.',
    status: 'todo',
    priority: 'urgent',
    assigneeId: 'user-3',
    dueDate: '2026-11-22',
    position: 1,
    createdAt: '2026-11-15T14:00:00Z',
    updatedAt: '2026-11-15T14:00:00Z',
  },
  {
    id: 'task-7',
    projectId: 'proj-3',
    title: 'Implement Session Cookie Authentication',
    description: 'Secure HTTP-only cookies, password hashing, and protected server-side routes.',
    status: 'backlog',
    priority: 'high',
    assigneeId: 'user-1',
    dueDate: '2026-11-25',
    position: 0,
    createdAt: '2026-11-15T16:00:00Z',
    updatedAt: '2026-11-15T16:00:00Z',
  },
  {
    id: 'task-8',
    projectId: 'proj-2',
    title: 'Create Accessible Modal Dialog Primitive',
    description: 'Focus trapping, ESC key listener, and smooth enter/exit animations.',
    status: 'completed',
    priority: 'medium',
    assigneeId: 'user-4',
    dueDate: '2026-11-14',
    position: 0,
    createdAt: '2026-11-08T10:00:00Z',
    updatedAt: '2026-11-14T17:00:00Z',
  },
  {
    id: 'task-9',
    projectId: 'proj-4',
    title: 'Build Task Details & Commenting Drawer',
    description: 'Allow team members to click any card to inspect descriptions and leave comments.',
    status: 'in_review',
    priority: 'medium',
    assigneeId: 'user-4',
    dueDate: '2026-11-20',
    position: 0,
    createdAt: '2026-11-14T15:00:00Z',
    updatedAt: '2026-11-16T12:00:00Z',
  },
  {
    id: 'task-10',
    projectId: 'proj-1',
    title: 'Productivity Charts & Analytics Calculations',
    description: 'Aggregate tasks completed by week and compute team velocity distribution.',
    status: 'in_review',
    priority: 'high',
    assigneeId: 'user-2',
    dueDate: '2026-11-18',
    position: 1,
    createdAt: '2026-11-13T11:00:00Z',
    updatedAt: '2026-11-16T16:30:00Z',
  },
];

const SEED_COMMENTS = [
  {
    id: 'comm-1',
    taskId: 'task-3',
    userId: 'user-2',
    content: 'Dashboard KPI cards look great! We should also add an overdue task alert.',
    createdAt: '2026-11-15T14:30:00Z',
  },
  {
    id: 'comm-2',
    taskId: 'task-3',
    userId: 'user-1',
    content: 'Agreed. Adding overdue calculation to the analytics query now.',
    createdAt: '2026-11-15T15:00:00Z',
  },
  {
    id: 'comm-3',
    taskId: 'task-4',
    userId: 'user-3',
    content: 'Column layout is responsive across mobile and desktop breakpoints.',
    createdAt: '2026-11-16T11:20:00Z',
  },
];

const SEED_ACTIVITIES = [
  {
    id: 'act-1',
    userId: 'user-1',
    action: 'created',
    targetType: 'project',
    targetTitle: 'WorkSpace Core SaaS Engine',
    timestamp: '2 hours ago',
  },
  {
    id: 'act-2',
    userId: 'user-2',
    action: 'completed',
    targetType: 'task',
    targetTitle: 'Configure ThemeProvider for Dark and Light modes',
    timestamp: '4 hours ago',
  },
  {
    id: 'act-3',
    userId: 'user-4',
    action: 'moved to In Review',
    targetType: 'task',
    targetTitle: 'Build Task Details & Commenting Drawer',
    timestamp: 'Yesterday',
  },
  {
    id: 'act-4',
    userId: 'user-3',
    action: 'commented on',
    targetType: 'task',
    targetTitle: 'Implement 5-Column Kanban Board Layout',
    timestamp: 'Yesterday',
  },
];

// In-Memory Database Store singleton
class DatabaseStore {
  constructor() {
    this.users = [...SEED_USERS];
    this.projects = [...SEED_PROJECTS];
    this.tasks = [...SEED_TASKS];
    this.comments = [...SEED_COMMENTS];
    this.activities = [...SEED_ACTIVITIES];
    this.currentUser = this.users[0]; // Default logged-in user: Anant
  }

  // --- Users & Auth ---
  async getCurrentUser() {
    return { ...this.currentUser };
  }

  async authenticate(email, password) {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('Invalid email or password.');
    // Demo password check
    if (password !== 'password123' && password !== 'admin123' && password !== 'password') {
      throw new Error('Invalid credentials. (Hint: use password123 for demo)');
    }
    this.currentUser = user;
    this.logActivity(user.id, 'logged in to', 'workspace', 'Acme Engineering');
    return { ...user };
  }

  async register({ name, email, password }) {
    const existing = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) throw new Error('An account with this email already exists.');

    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'US';

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'member',
      title: 'Product Collaborator',
      avatar: initials,
      color: 'from-blue-600 to-indigo-600',
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    this.logActivity(newUser.id, 'registered new account', 'user', name);
    return { ...newUser };
  }

  async getMembers() {
    return this.users.map(u => ({ ...u }));
  }

  async inviteMember({ name, email, role }) {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'MB';
    const newMember = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: role || 'member',
      title: 'Invited Member',
      avatar: initials,
      color: 'from-indigo-600 to-purple-600',
      createdAt: new Date().toISOString(),
    };
    this.users.push(newMember);
    this.logActivity(this.currentUser.id, 'invited teammate', 'user', name);
    return { ...newMember };
  }

  async updateMemberRole(userId, newRole) {
    const user = this.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found.');
    user.role = newRole;
    this.logActivity(this.currentUser.id, `updated role of ${user.name} to`, 'role', newRole);
    return { ...user };
  }

  // --- Projects ---
  async getProjects({ search = '', status = 'all' } = {}) {
    let result = [...this.projects];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (status && status !== 'all') {
      result = result.filter(p => p.status === status);
    }
    // Attach computed task counts
    return result.map(p => {
      const projectTasks = this.tasks.filter(t => t.projectId === p.id);
      const completedCount = projectTasks.filter(t => t.status === 'completed').length;
      return {
        ...p,
        tasksCount: projectTasks.length,
        completedTasks: completedCount,
        progressPct: projectTasks.length === 0 ? 0 : Math.round((completedCount / projectTasks.length) * 100),
      };
    });
  }

  async getProjectById(id) {
    const project = this.projects.find(p => p.id === id);
    if (!project) return null;
    const projectTasks = this.tasks.filter(t => t.projectId === project.id);
    const completedCount = projectTasks.filter(t => t.status === 'completed').length;
    const memberUsers = this.users.filter(u => project.members.includes(u.id));

    return {
      ...project,
      tasksCount: projectTasks.length,
      completedTasks: completedCount,
      progressPct: projectTasks.length === 0 ? 0 : Math.round((completedCount / projectTasks.length) * 100),
      memberDetails: memberUsers,
    };
  }

  async createProject({ name, description, priority = 'medium', targetDate = 'Next Month' }) {
    if (!name?.trim()) throw new Error('Project title is required.');

    const newProject = {
      id: `proj-${Date.now()}`,
      workspaceId: 'ws-1',
      name: name.trim(),
      description: description?.trim() || '',
      status: 'active',
      priority,
      startDate: new Date().toISOString().split('T')[0],
      targetDate,
      ownerId: this.currentUser.id,
      members: [this.currentUser.id],
      color: 'bg-blue-600',
      createdAt: new Date().toISOString(),
    };

    this.projects.unshift(newProject);
    this.logActivity(this.currentUser.id, 'created project', 'project', newProject.name);
    return this.getProjectById(newProject.id);
  }

  async updateProject(id, updates) {
    const idx = this.projects.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Project not found.');

    this.projects[idx] = {
      ...this.projects[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.logActivity(this.currentUser.id, 'updated project', 'project', this.projects[idx].name);
    return this.getProjectById(id);
  }

  async deleteProject(id) {
    const idx = this.projects.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Project not found.');

    const [deleted] = this.projects.splice(idx, 1);
    // Cascade delete tasks
    this.tasks = this.tasks.filter(t => t.projectId !== id);
    this.logActivity(this.currentUser.id, 'deleted project', 'project', deleted.name);
    return { success: true, id };
  }

  // --- Tasks & Kanban ---
  async getTasks({ projectId, status = 'all', priority = 'all', search = '', sortBy = 'dueDate' } = {}) {
    let result = [...this.tasks];

    if (projectId) {
      result = result.filter(t => t.projectId === projectId);
    }
    if (status && status !== 'all') {
      result = result.filter(t => t.status === status);
    }
    if (priority && priority !== 'all') {
      result = result.filter(t => t.priority === priority);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }

    // Attach assignee and project name
    return result.map(t => {
      const assignee = this.users.find(u => u.id === t.assigneeId);
      const project = this.projects.find(p => p.id === t.projectId);
      return {
        ...t,
        assigneeName: assignee ? assignee.name : 'Unassigned',
        assigneeAvatar: assignee ? assignee.avatar : '--',
        projectName: project ? project.name : 'Unknown Project',
      };
    });
  }

  async getTaskById(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return null;
    const assignee = this.users.find(u => u.id === task.assigneeId);
    const project = this.projects.find(p => p.id === task.projectId);
    const comments = this.comments
      .filter(c => c.taskId === task.id)
      .map(c => ({
        ...c,
        user: this.users.find(u => u.id === c.userId),
      }));

    return {
      ...task,
      assigneeName: assignee ? assignee.name : 'Unassigned',
      assigneeAvatar: assignee ? assignee.avatar : '--',
      projectName: project ? project.name : 'Unknown Project',
      comments,
    };
  }

  async createTask({ projectId, title, description = '', priority = 'medium', status = 'todo', assigneeId = null, dueDate = 'Next Week' }) {
    if (!title?.trim()) throw new Error('Task title is required.');

    const targetProject = this.projects.find(p => p.id === projectId) || this.projects[0];

    const newTask = {
      id: `task-${Date.now()}`,
      projectId: targetProject.id,
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      assigneeId: assigneeId || this.currentUser.id,
      dueDate,
      position: this.tasks.filter(t => t.status === status).length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.push(newTask);
    this.logActivity(this.currentUser.id, 'created task', 'task', newTask.title);
    return this.getTaskById(newTask.id);
  }

  async updateTask(id, updates) {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) throw new Error('Task not found.');

    const oldStatus = this.tasks[idx].status;

    this.tasks[idx] = {
      ...this.tasks[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (updates.status && updates.status !== oldStatus) {
      this.logActivity(
        this.currentUser.id,
        `moved task to ${updates.status.replace('_', ' ')}`,
        'task',
        this.tasks[idx].title
      );
    }

    return this.getTaskById(id);
  }

  async moveTask(taskId, newStatus, newPosition = 0) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) throw new Error('Task not found.');

    task.status = newStatus;
    task.position = newPosition;
    task.updatedAt = new Date().toISOString();

    this.logActivity(
      this.currentUser.id,
      `moved task to ${newStatus.replace('_', ' ')}`,
      'task',
      task.title
    );

    return this.getTaskById(taskId);
  }

  async deleteTask(id) {
    const idx = this.tasks.findIndex(t => t.id === id);
    if (idx === -1) throw new Error('Task not found.');

    const [deleted] = this.tasks.splice(idx, 1);
    this.comments = this.comments.filter(c => c.taskId !== id);
    this.logActivity(this.currentUser.id, 'deleted task', 'task', deleted.title);
    return { success: true, id };
  }

  // --- Comments ---
  async getComments(taskId) {
    return this.comments
      .filter(c => c.taskId === taskId)
      .map(c => ({
        ...c,
        user: this.users.find(u => u.id === c.userId),
      }));
  }

  async addComment(taskId, content) {
    if (!content?.trim()) throw new Error('Comment cannot be empty.');

    const newComment = {
      id: `comm-${Date.now()}`,
      taskId,
      userId: this.currentUser.id,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    this.comments.push(newComment);
    const task = this.tasks.find(t => t.id === taskId);
    this.logActivity(
      this.currentUser.id,
      'commented on',
      'task',
      task ? task.title : 'Task'
    );

    return {
      ...newComment,
      user: { ...this.currentUser },
    };
  }

  // --- Activities Audit Feed ---
  async getActivities(limit = 10) {
    return this.activities.slice(0, limit).map(act => {
      const user = this.users.find(u => u.id === act.userId);
      return {
        ...act,
        userName: user ? user.name : 'Team Member',
        userAvatar: user ? user.avatar : '--',
        userColor: user ? user.color : 'from-blue-600 to-indigo-600',
      };
    });
  }

  logActivity(userId, action, targetType, targetTitle) {
    this.activities.unshift({
      id: `act-${Date.now()}`,
      userId,
      action,
      targetType,
      targetTitle,
      timestamp: 'Just now',
    });
    if (this.activities.length > 50) this.activities.pop();
  }

  // --- SaaS Analytics Engine ---
  async getAnalytics() {
    const totalProjects = this.projects.length;
    const totalTasks = this.tasks.length;
    const completedTasks = this.tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = this.tasks.filter(t => t.status === 'in_progress').length;
    const inReviewTasks = this.tasks.filter(t => t.status === 'in_review').length;
    const todoTasks = this.tasks.filter(t => t.status === 'todo').length;
    const backlogTasks = this.tasks.filter(t => t.status === 'backlog').length;

    // Overdue calculation (if targetDate < today and status != completed)
    const today = new Date().toISOString().split('T')[0];
    const overdueTasks = this.tasks.filter(t => t.status !== 'completed' && t.dueDate && t.dueDate < today).length;

    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Distribution by priority
    const priorities = {
      urgent: this.tasks.filter(t => t.priority === 'urgent').length,
      high: this.tasks.filter(t => t.priority === 'high').length,
      medium: this.tasks.filter(t => t.priority === 'medium').length,
      low: this.tasks.filter(t => t.priority === 'low').length,
    };

    // Distribution by status
    const statusDistribution = {
      backlog: backlogTasks,
      todo: todoTasks,
      in_progress: inProgressTasks,
      in_review: inReviewTasks,
      completed: completedTasks,
    };

    // Team workload (tasks per member)
    const teamWorkload = this.users.map(u => {
      const assigned = this.tasks.filter(t => t.assigneeId === u.id);
      const completed = assigned.filter(t => t.status === 'completed').length;
      return {
        id: u.id,
        name: u.name,
        role: u.role,
        avatar: u.avatar,
        assignedCount: assigned.length,
        completedCount: completed,
        completionPct: assigned.length === 0 ? 0 : Math.round((completed / assigned.length) * 100),
      };
    });

    // 4-Week trend mock
    const weeklyTrend = [
      { week: 'Week 1', completed: 4, target: 5 },
      { week: 'Week 2', completed: 8, target: 7 },
      { week: 'Week 3', completed: 11, target: 10 },
      { week: 'Current Sprint', completed: completedTasks, target: 15 },
    ];

    return {
      totalProjects,
      totalTasks,
      completedTasks,
      inProgressTasks,
      overdueTasks,
      completionRate,
      velocity: '94%',
      priorities,
      statusDistribution,
      teamWorkload,
      weeklyTrend,
    };
  }
}

// Global singleton to persist state in Node during runtime
const globalForStore = global;
if (!globalForStore.__workspaceDb) {
  globalForStore.__workspaceDb = new DatabaseStore();
}

export const db = globalForStore.__workspaceDb;
