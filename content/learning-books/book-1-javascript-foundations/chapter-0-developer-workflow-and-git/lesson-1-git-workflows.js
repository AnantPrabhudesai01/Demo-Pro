export const LESSON_0_1 = {
  id: 'b1-c0-l1',
  bookId: 'book-1',
  bookSlug: 'javascript-foundations',
  chapterSlug: 'developer-workflow-and-git',
  lessonSlug: 'git-and-github-workflows',
  title: 'Lesson 0.1: Professional Git & GitHub Workflows',
  subtitle: 'Master the 4 Git stages, conventional commits, feature branches, and pushing your SaaS code to GitHub with confidence.',
  duration: '15 min read',
  difficulty: 'Essential Tooling',

  learningObjectives: [
    {
      id: 1,
      title: "The 4 States of Code",
      detail: "Understand the transition from Working Directory -> Staging Area -> Local Commit -> GitHub Remote."
    },
    {
      id: 2,
      title: "Daily Staging and Commits",
      detail: "Master 'git status', 'git add', and professional conventional commit messages (feat:, fix:, docs:)."
    },
    {
      id: 3,
      title: "GitHub Synchronization",
      detail: "Connect a local repository to GitHub with 'git remote add origin' and push using 'git push -u origin main'."
    },
    {
      id: 4,
      title: "The Emergency Undo Toolkit",
      detail: "Safely restore accidental changes, unstage files, and amend commit typos without losing work."
    }
  ],

  prerequisites: [
    'Git installed on your operating system (run git --version to verify).',
    'A free GitHub account at https://github.com.'
  ],

  conceptSections: [
    {
      id: 'git-vs-github',
      title: "1. Git vs. GitHub: What's the Difference?",
      lead: "Many beginners confuse Git and GitHub. They are complementary tools with different responsibilities.",
      tableData: [
        {
          keyword: 'Git',
          scope: 'Local Computer (100% Offline)',
          reassignable: 'Version Control Engine',
          hoisting: 'Installed CLI binary',
          usage: 'Tracks file changes, creates snapshots (commits), manages branches'
        },
        {
          keyword: 'GitHub',
          scope: 'Cloud Platform (Online)',
          reassignable: 'Collaboration & Hosting',
          hoisting: 'Web service owned by Microsoft',
          usage: 'Hosts repositories online, peer reviews (Pull Requests), issues, portfolio'
        }
      ],
      ruleOfThumb: "Git is your local time machine and safety net. GitHub is your cloud backup and public resume."
    },
    {
      id: 'four-stages',
      title: '2. The 4 Stages of Code in Git',
      lead: 'Every line of code you write moves through 4 distinct zones before reaching GitHub.',
      primitives: {
        types: ['Working Directory', 'Staging Area (Index)'],
        location: 'Local Computer (Uncommitted)',
        comparison: 'git add . moves files from Working Directory into Staging Area',
        behavior: 'Staging lets you curate which changes belong in the next snapshot.'
      },
      references: {
        types: ['Local Repository (.git)', 'GitHub Remote (Cloud)'],
        location: 'Committed Snapshots & Cloud Server',
        comparison: 'git commit seals the snapshot; git push uploads it to GitHub',
        behavior: 'Once pushed to GitHub, your work is permanently backed up and shareable.'
      }
    },
    {
      id: 'conventional-commits',
      title: '3. Professional Conventional Commits Standard',
      lead: 'Senior engineers never write vague messages like "fixed stuff" or "update code". They use Conventional Commits.',
      badCode: `// ❌ UNPROFESSIONAL GIT COMMITS (Confusing history)
git commit -m "changes"
git commit -m "wip"
git commit -m "fixed bug"
git commit -m "final final version"`,
      goodCode: `// ✅ SENIOR CONVENTIONAL COMMITS (Crystal clear history)
git commit -m "feat: implement kanban drag-and-drop column layout"
git commit -m "fix: resolve 404 route collision on /projects"
git commit -m "docs: add git workflow and conventional commits guide"
git commit -m "refactor: extract task status cycler into pure function"`,
      explanation: 'Using clear prefixes (feat, fix, docs, refactor, test, chore) allows teammates and employers to instantly understand the purpose of every commit in your repository.'
    },
    {
      id: 'undo-toolkit',
      title: '4. The Emergency Undo Toolkit',
      lead: 'Never panic when you make a mistake in Git. There is an exact command to undo every action safely.',
      rule: 'To discard uncommitted changes in a file: git restore <file>. To unstage a file: git restore --staged <file>. To fix the last commit message: git commit --amend.'
    }
  ],

  analogy: {
    title: 'The Amazon Warehouse & Shipping Analogy',
    primitiveTitle: 'Working Directory = Items on Your Desk',
    primitiveText: 'You are assembling multiple products. Some are ready, some are half-finished.',
    referenceTitle: 'Staging Area = The Shipping Box',
    referenceText: 'You run "git add ." to place the finished items into the cardboard box. They are packed, but the box is not taped shut yet.',
    reactTakeaway: '"git commit" tapes the box shut and sticks an official barcode label on it. "git push" is the delivery truck that transports the sealed box to the GitHub warehouse in the cloud.'
  },

  syntaxCards: [
    {
      title: '1. Check Status & Stage',
      code: `git status       # Inspect what changed (red vs green)
git add .        # Stage all modified and new files`
    },
    {
      title: '2. Commit Snapshot',
      code: `git commit -m "feat: your descriptive message"
# Creates a permanent local snapshot with hash ID`
    },
    {
      title: '3. Push to GitHub',
      code: `git push -u origin main  # First time push
git push                 # All future pushes`
    }
  ],

  standaloneDemo: {
    title: 'The Standard 3-Step Daily Git Routine',
    code: `// Step 1: Inspect what changed
git status

// Step 2: Stage your files
git add .

// Step 3: Commit with standard prefix
git commit -m "feat: build project detail dynamic route"

// Step 4: Ship to GitHub
git push`,
    takeaway: 'Make small, frequent commits for each logical piece of work rather than one gigantic commit with 50 unrelated files.'
  },

  stepByStep: [
    {
      step: 1,
      title: 'Rename local default branch to main',
      file: 'Terminal',
      description: 'Run: git branch -M main to adhere to modern GitHub conventions.'
    },
    {
      step: 2,
      title: 'Create empty repository on GitHub',
      file: 'github.com/new',
      description: 'Create a new repo named workspace without initializing README or .gitignore.'
    },
    {
      step: 3,
      title: 'Link local repository to remote origin',
      file: 'Terminal',
      description: 'Run: git remote add origin https://github.com/YOUR_USER/workspace.git'
    },
    {
      step: 4,
      title: 'Push code and track upstream branch',
      file: 'Terminal',
      description: 'Run: git push -u origin main to publish all your commits to the cloud.'
    }
  ],

  exactCode: `# The Complete GitHub Initial Push Sequence:

# 1. Verify working directory is clean
git status

# 2. View recent local commits
git log --oneline -n 5

# 3. Rename branch to main
git branch -M main

# 4. Link your personal GitHub repo
# (Replace with your actual GitHub username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/workspace.git

# 5. Verify the remote URL
git remote -v

# 6. Push local history to GitHub!
git push -u origin main`,

  lineExplanations: [
    {
      lines: '1–2',
      code: 'git status',
      explanation: 'Reports which files are untracked, modified, or staged. Always check status before committing.'
    },
    {
      lines: '7–8',
      code: 'git branch -M main',
      explanation: 'The -M flag forces a rename of the current branch from master to main.'
    },
    {
      lines: '11–12',
      code: 'git remote add origin <url>',
      explanation: 'Adds a remote alias named "origin" pointing to your GitHub repository URL.'
    },
    {
      lines: '17–18',
      code: 'git push -u origin main',
      explanation: 'Uploads commits to origin/main. The -u flag saves the upstream link so future commands only require "git push".'
    }
  ],

  executionFlow: [
    { step: 1, title: 'Code Change', desc: 'You write code in VS Code / editor.' },
    { step: 2, title: 'git status', desc: 'Git identifies which files have changed (shown in red).' },
    { step: 3, title: 'git add .', desc: 'Files are placed into the Staging Index (shown in green).' },
    { step: 4, title: 'git commit', desc: 'Git computes SHA-1 hash and records a permanent snapshot.' },
    { step: 5, title: 'git push', desc: 'Git sends the commit objects over HTTPS/SSH to GitHub cloud.' },
    { step: 6, title: 'GitHub Live', desc: 'Your repo updates with the new commit, green square awarded!' }
  ],

  testingCases: [
    {
      type: 'Verification',
      action: 'Run: git remote -v',
      expected: 'Displays origin fetch and push URLs matching your GitHub repository.'
    },
    {
      type: 'Branch Check',
      action: 'Run: git branch',
      expected: 'Displays * main in green indicating active branch is main.'
    },
    {
      type: 'History Check',
      action: 'Run: git log --oneline -n 3',
      expected: 'Displays your latest commit hashes and descriptions.'
    }
  ],

  commonMistakes: [
    {
      title: 'Committing node_modules or .env secrets',
      bad: 'git add node_modules/ or git add .env.local',
      why: 'Uploads thousands of heavy dependencies or exposes secret database keys publicly!',
      fix: 'Always ensure .gitignore contains node_modules and .env*.local before committing.'
    },
    {
      title: 'Checking "Initialize with README" on GitHub',
      bad: 'Creating a new GitHub repo with a README when you already have a local project',
      why: 'Causes a "refusing to merge unrelated histories" conflict when you try to push.',
      fix: 'Leave all initialization checkboxes unchecked when creating the repo on GitHub.'
    },
    {
      title: 'Vague non-descriptive commit messages',
      bad: 'git commit -m "update"',
      why: 'Makes it impossible to find when a bug was introduced when reviewing history.',
      fix: 'Use conventional commits: git commit -m "feat: add project creation modal"'
    }
  ],

  exercise: {
    title: 'Challenge: Inspect, Stage, and Commit Documentation',
    instruction: 'Practice the complete Git workflow right now in your terminal:\n1. Check your status using git status.\n2. Stage the new documentation files using git add .\n3. Create a commit using the conventional commit standard: git commit -m "docs: add comprehensive git and github workflow handbook".',
    rules: [
      'Do not use vague commit messages.',
      'Always inspect git status before and after staging.',
      'Check git log --oneline to verify your commit was recorded.'
    ],
    hints: [
      'Command 1: git status',
      'Command 2: git add .',
      'Command 3: git commit -m "docs: add comprehensive git and github workflow handbook"',
      'Command 4: git log --oneline -n 1'
    ]
  },

  interviewQuestions: [
    {
      level: 'Beginner',
      question: 'What is the difference between git add and git commit?',
      answer: 'git add moves changed files from your working directory into the staging area (preparing the files for the snapshot). git commit permanently records that staged snapshot into the local repository history with a unique hash ID and message.'
    },
    {
      level: 'Intermediate',
      question: 'What does the -u flag do in "git push -u origin main"?',
      answer: 'The -u (or --set-upstream) flag links your local branch to the remote branch on GitHub. Once this upstream tracking link is established, you can simply type "git push" or "git pull" in the future without specifying origin and main every time.'
    },
    {
      level: 'Practical Coding',
      question: 'How do you discard changes in a single file that has not yet been staged?',
      answer: 'Run: git restore <path/to/file>. In older versions of Git, this was done with git checkout -- <file>.'
    },
    {
      level: 'Senior / Team Workflow',
      question: 'Why do engineering teams use feature branches instead of committing directly to the main branch?',
      answer: 'Working on feature branches isolates new work from the stable production codebase. It allows automated tests and CI/CD pipelines to run independently, enables peer code reviews via Pull Requests (PRs), and ensures the main branch remains deployable at all times.'
    }
  ],

  completionChecklist: [
    'I understand the difference between Git (local version control) and GitHub (cloud collaboration).',
    'I understand the 4 stages: Working Directory, Staging Area, Local Repository, Remote.',
    'I can use git status, git add ., and git commit -m with conventional prefixes.',
    'I can link a local repository to GitHub using git remote add origin and push with git push -u origin main.',
    'I know how to undo mistakes using git restore and git restore --staged.'
  ]
};
