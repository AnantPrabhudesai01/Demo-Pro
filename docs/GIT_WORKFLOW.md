# WorkSpace Git & GitHub Professional Workflow Guide

> "Git is your safety net and time machine. GitHub is your portfolio and team collaboration hub."

---

## 1. The Core Concept: Git vs. GitHub

- **Git:** A local command-line tool installed on your computer that tracks changes in your code files over time (version control). It works 100% offline.
- **GitHub:** A cloud-based hosting service for Git repositories. It lets you store your code safely in the cloud, collaborate with teammates, track issues, and show off your portfolio to recruiters.

---

## 2. The 4 States of Code in Git

```text
+---------------------+           git add .          +--------------------+
|  Working Directory  |  ─────────────────────────>  |   Staging Area     |
| (Files being edited)|                              | (Packed box ready) |
+---------------------+                              +--------------------+
           ^                                                   │
           │                                                   │ git commit -m "..."
           │ git restore                                       v
+---------------------+          git push origin     +--------------------+
|   GitHub (Remote)   |  <─────────────────────────  |  Local Repository  |
|  (Cloud Repository) |                              |  (Sealed snapshot) |
+---------------------+                              +--------------------+
```

---

## 3. Daily Command Reference (The Commands You Use Every Day)

### 3.1 Check Your Status
Always run this before doing anything else to see what files were modified, created, or deleted:
```powershell
git status
```
- **Red files:** Changed in your working directory, but not staged yet.
- **Green files:** Staged and ready to be committed.

---

### 3.2 Stage Changes (`git add`)
Tells Git which files you want to include in your next snapshot:
```powershell
# Stage a specific file
git add components/dashboard/TaskPreview.js

# Stage ALL changed and newly created files in the project
git add .
```

---

### 3.3 Commit Changes (`git commit`)
Creates a permanent snapshot with a descriptive message. Follow the **Conventional Commits** standard:
```powershell
git commit -m "feat: implement interactive task status toggle"
```

#### Professional Commit Prefixes:
- `feat:` A new feature or screen (e.g. `feat: add projects filter modal`)
- `fix:` A bug fix (e.g. `fix: resolve 404 route collision on dashboard`)
- `docs:` Documentation updates (e.g. `docs: update learning checklist`)
- `style:` Formatting, CSS tweaks, whitespace changes
- `refactor:` Code restructuring without changing external behavior
- `test:` Adding or updating tests

---

### 3.4 Push to GitHub (`git push`)
Uploads your local commits to GitHub:
```powershell
# First time pushing a new branch (sets upstream tracking):
git push -u origin main

# All subsequent pushes:
git push
```

---

### 3.5 Inspect History (`git log`)
View your past commits:
```powershell
# Clean, readable single-line history:
git log --oneline -n 10

# Graph view showing branches and merges:
git log --oneline --graph --all
```

---

## 4. How to Undo Mistakes (Your Git Emergency Toolkit)

### Scenario A: You modified a file, broke it, and want to reset it back to the last commit
```powershell
git restore path/to/file.js
```

### Scenario B: You ran `git add .` by accident and want to unstage a file
```powershell
git restore --staged path/to/file.js
```

### Scenario C: You made a commit but made a typo in the commit message
```powershell
git commit --amend -m "fix: your corrected commit message here"
```

### Scenario D: View exact line-by-line differences before committing
```powershell
# See unstaged changes:
git diff

# See staged changes:
git diff --staged
```

---

## 5. Working with Feature Branches (Professional Team Workflow)

Never write code directly on `main` when working in production teams. Always work on a feature branch:

```powershell
# 1. Create and switch to a new branch for your feature
git switch -c feature/kanban-board

# 2. Make your changes and commit them
git add .
git commit -m "feat: implement kanban column layout"

# 3. Push your feature branch to GitHub
git push -u origin feature/kanban-board

# 4. Once reviewed/tested, switch back to main
git switch main

# 5. Merge the feature into main
git merge feature/kanban-board

# 6. Delete the temporary feature branch
git branch -d feature/kanban-board
```

---

## 6. Initial GitHub Setup Walkthrough (Run This Once)

```powershell
# Step 1: Ensure your default branch is named 'main'
git branch -M main

# Step 2: Add your GitHub repository as the remote origin
# (Replace with your actual GitHub username and repository name)
git remote add origin https://github.com/YOUR_USERNAME/workspace.git

# Step 3: Verify the remote address was saved
git remote -v

# Step 4: Push all your local commits to GitHub!
git push -u origin main
```
