/**
 * Default Portfolio Data
 * The admin panel saves changes to localStorage under key "portfolio_data"
 * This file provides the defaults that are shown when no admin changes exist.
 */

const DEFAULT_PORTFOLIO_DATA = {
  profile: {
    name: "Kingsley Anaab",
    role: "IT Student & Web Developer.",
    tagline: "Still learning. Actively building. Continuously improving.",
    bio: "I'm an Information Technology student at Knutsford University College who enjoys experimenting with new technologies, building practical applications, and continuously developing my technical skills. I'm still in the process of growing — some areas are things I'm actively learning and improving in.",
    bio2: "Rather than focusing on theory alone, I prefer to learn by building real-world projects — taking an idea, understanding how pieces fit together, and turning it into a working application.",
    location: "Ghana 🇬🇭",
    available: true,
    availabilityText: "Open to internships, part-time & remote learning opportunities",
    currentlyBuilding: "React & TypeScript projects",
    photo: "kesh.jpg",
    stats: [
      { value: "15+", label: "Projects Built" },
      { value: "2025", label: "Started Coding" },
      { value: "BSc", label: "IT Student" }
    ],
    tags: ["IT Student", "Web Developer", "Learning Daily", "Building Real Things"],
    email: "kingsleyanaab604@gmail.com",
    phone: "0501901401",
    phone2: "0538212213",
    github: "https://github.com/kingsleyweb-tech",
    githubHandle: "@kingsleyweb-tech",
    whatsapp: "https://wa.me/233501901401"
  },

  skills: {
    categories: [
      {
        name: "Languages",
        icon: "fas fa-code",
        items: [
          { name: "HTML", icon: "html5", level: "Comfortable" },
          { name: "CSS", icon: "css3", level: "Comfortable" },
          { name: "JavaScript", icon: "javascript", level: "Developing" },
          { name: "TypeScript", icon: "typescript", level: "Learning" },
          { name: "PHP", icon: "php", level: "Developing" },
          { name: "Python", icon: "python", level: "Beginner" },
          { name: "SQL", icon: "mysql", level: "Developing" }
        ]
      },
      {
        name: "Frontend",
        icon: "fas fa-desktop",
        items: [
          { name: "React", icon: "react", level: "Learning" },
          { name: "Vite", icon: "vitejs", level: "Learning" },
          { name: "Tailwind CSS", icon: "tailwindcss", level: "Learning" },
          { name: "Chart.js", icon: "chartjs", level: "Beginner" }
        ]
      },
      {
        name: "Backend",
        icon: "fas fa-server",
        items: [
          { name: "Node.js", icon: "nodejs", level: "Learning" },
          { name: "Express.js", icon: "express", level: "Learning" },
          { name: "REST APIs", icon: "fastapi", level: "Learning" },
          { name: "Socket.io", icon: "socketio", level: "Learning" }
        ]
      },
      {
        name: "Databases",
        icon: "fas fa-database",
        items: [
          { name: "MySQL", icon: "mysql", level: "Developing" },
          { name: "MongoDB", icon: "mongodb", level: "Learning" },
          { name: "Firebase", icon: "firebase", level: "Learning" }
        ]
      },
      {
        name: "Tools & Deploy",
        icon: "fas fa-tools",
        items: [
          { name: "Git", icon: "git", level: "Developing" },
          { name: "GitHub", icon: "github", level: "Developing" },
          { name: "VS Code", icon: "vscode", level: "Daily Driver" },
          { name: "Vercel", icon: "vercel", level: "Comfortable" },
          { name: "Netlify", icon: "netlify", level: "Comfortable" },
          { name: "Electron", icon: "electron", level: "Learning" },
          { name: "Postman", icon: "postman", level: "Learning" }
        ]
      }
    ]
  },

  experience: [
    {
      id: 1,
      title: "Personal & Academic Projects",
      organization: "Self-Directed Learning",
      type: "Project Work",
      location: "Ghana",
      period: "2025 – Present",
      current: true,
      description: "Building real-world web applications to develop my skills across frontend, backend, databases, and system design. Each project is an opportunity to learn something new.",
      highlights: [
        "Built and deployed 10+ projects across different technology stacks",
        "Explored full-stack development with React, Node.js, PHP, and MySQL",
        "Developed real-time applications using Socket.io and Firebase",
        "Experimented with desktop app development using Electron"
      ]
    },
    {
      id: 2,
      title: "BSc Information Technology",
      organization: "Knutsford University College",
      type: "Education",
      location: "East Legon, Ghana",
      period: "2025 – Present",
      current: true,
      description: "Pursuing a Bachelor of Science in Information Technology with a focus on software development, databases, networking, and computer science fundamentals.",
      highlights: [
        "Studying programming fundamentals and software engineering principles",
        "Learning database systems, networking, and cybersecurity concepts",
        "Applying academic concepts through hands-on personal projects",
        "Currently at Level 200 (Year 2)"
      ]
    }
  ],

  projects: [
    {
      id: 1,
      title: "Vendora",
      category: "fullstack",
      categoryLabel: "Full Stack · Marketplace",
      description: "A campus-focused marketplace platform where vendors can create stores, manage products, and run their businesses. Includes vendor dashboards, subscription plans, AI-assisted tools, and PWA support.",
      image: "",
      icon: "fas fa-store",
      featured: true,
      liveUrl: "https://campuscart.shop",
      githubUrl: "",
      tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Firebase", "PWA"],
      highlights: [
        "Vendor dashboards and store management",
        "Subscription plan system",
        "AI-assisted tools via Cloudflare Workers AI",
        "Firebase push notifications (FCM)",
        "Progressive Web App (PWA)"
      ],
      year: "2025"
    },
    {
      id: 2,
      title: "RealTimeDocs",
      category: "fullstack",
      categoryLabel: "Full Stack · Real-Time",
      description: "A collaborative real-time document editor allowing multiple users to work simultaneously. Explores Socket.io, authentication, MongoDB, and multi-service deployment.",
      image: "",
      icon: "fas fa-file-alt",
      featured: true,
      liveUrl: "https://realtimedocs.vercel.app",
      githubUrl: "",
      tech: ["React", "TypeScript", "Socket.io", "Node.js", "MongoDB", "Firebase Auth"],
      highlights: [
        "Real-time collaborative editing",
        "Firebase Auth integration",
        "Socket.io for live communication",
        "Multi-service architecture"
      ],
      year: "2025"
    },
    {
      id: 3,
      title: "Cyber News & Threat Monitor",
      category: "cybersecurity",
      categoryLabel: "Cybersecurity · Web App",
      description: "A cybersecurity web app for monitoring cyber news and threat intelligence feeds. Demonstrates REST API integration, data visualization, and frontend/backend separation.",
      image: "",
      icon: "fas fa-shield-virus",
      featured: false,
      liveUrl: "https://cybermonitorgha.vercel.app",
      githubUrl: "",
      tech: ["React", "TypeScript", "Node.js", "Chart.js", "Netlify", "Render"],
      highlights: [
        "REST API integration for live threat feeds",
        "Chart.js data visualization",
        "CORS and environment variable configuration"
      ],
      year: "2025"
    },
    {
      id: 4,
      title: "Military Reports Dashboard",
      category: "webapp",
      categoryLabel: "Dashboard · Admin",
      description: "A reporting dashboard for organizing operational reports and making information accessible through a centralized administrative interface.",
      image: "",
      icon: "fas fa-chart-bar",
      featured: false,
      liveUrl: "http://mil-reports-dashboard.vercel.app",
      githubUrl: "",
      tech: ["React", "TypeScript", "Vite", "Vercel"],
      highlights: [
        "Centralized report management",
        "Responsive admin interface",
        "Information organization system"
      ],
      year: "2025"
    },
    {
      id: 5,
      title: "Military Entry / QR System",
      category: "systems",
      categoryLabel: "Systems · QR Verification",
      description: "A registration and QR-based entry verification system for registering personnel and verifying authorized entry using QR codes.",
      image: "",
      icon: "fas fa-qrcode",
      featured: false,
      liveUrl: "http://mil-entry-system.vercel.app",
      githubUrl: "",
      tech: ["React", "TypeScript", "Vite", "QR Code", "Vercel"],
      highlights: [
        "QR code generation and scanning",
        "Personnel registration workflow",
        "Entry tracking and logging"
      ],
      year: "2025"
    },
    {
      id: 6,
      title: "Online Examination System",
      category: "fullstack",
      categoryLabel: "Full Stack · Education",
      description: "A web-based exam platform with admin tools and student-facing examination interfaces, including scheduling and results generation.",
      image: "",
      icon: "fas fa-clipboard-list",
      featured: false,
      liveUrl: "https://examsuite.great-site.net",
      githubUrl: "",
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
      highlights: [
        "Exam and question management",
        "Student examination interface",
        "Automated results generation",
        "Admin dashboard"
      ],
      year: "2025"
    },
    {
      id: 7,
      title: "MyCommandShell",
      category: "desktop",
      categoryLabel: "Desktop · Electron",
      description: "A desktop command-shell application built to explore Electron, terminal interaction, and desktop app packaging with web technologies.",
      image: "",
      icon: "fas fa-terminal",
      featured: false,
      liveUrl: "https://command-shell-website.vercel.app",
      githubUrl: "",
      tech: ["Electron", "React", "TypeScript", "Vite"],
      highlights: [
        "Terminal-style desktop interface",
        "Custom command parsing",
        "Electron packaging and distribution"
      ],
      year: "2025"
    }
  ],

  engineeringProjects: [
    {
      id: 1,
      title: "Spreadsheet Calculation Engine",
      category: "engineering",
      description: "A custom spreadsheet engine exploring formula parsing, expression evaluation, cell dependency graphs, and circular dependency detection.",
      icon: "fas fa-table",
      tech: ["TypeScript", "JavaScript", "Vite"],
      concepts: ["Formula Parsing", "Dependency Graphs", "SUM/IF/AVERAGE", "OOP"],
      year: "2025"
    },
    {
      id: 2,
      title: "Network Routing Simulator",
      category: "engineering",
      description: "A networking simulation modeling routers, connections, and latency using Dijkstra's and Bellman-Ford algorithms.",
      icon: "fas fa-project-diagram",
      tech: ["React", "TypeScript", "Vite"],
      concepts: ["Dijkstra's Algorithm", "Bellman-Ford", "Graph Traversal", "Routing Tables"],
      year: "2025"
    },
    {
      id: 3,
      title: "KingScript",
      category: "engineering",
      description: "A custom mini programming language with a lexer, parser, AST builder, and tree-walking interpreter — built from scratch.",
      icon: "fas fa-code",
      tech: ["TypeScript", "JavaScript", "React", "Vite"],
      concepts: ["Lexer / Tokenizer", "AST", "Recursive Descent Parser", "Interpreter"],
      year: "2025"
    }
  ],

  aiWorkflow: {
    intro: "I actively use AI tools as part of my learning and development workflow. AI helps me explore ideas, understand unfamiliar concepts, and move faster — but I still make sure to understand what I'm building and why.",
    disclaimer: "I don't rely on AI to build everything for me. I use it as a learning and problem-solving partner while continuously working to deepen my own understanding.",
    tools: [
      { name: "Cursor", icon: "fas fa-i-cursor", description: "AI-powered code editor I use for coding assistance and exploration" },
      { name: "OpenAI Codex", icon: "fas fa-robot", description: "For code generation, understanding, and experimentation" },
      { name: "ChatGPT", icon: "fas fa-comments", description: "For researching concepts, debugging, and learning new technologies" },
      { name: "Claude", icon: "fas fa-brain", description: "For detailed explanations, code review, and complex reasoning" },
      { name: "Antigravity IDE", icon: "fas fa-rocket", description: "My current favourite — an AI-powered development environment I enjoy using for building projects" },
      { name: "VS Code", icon: "fas fa-code", description: "Primary code editor for daily development work" }
    ],
    useCases: [
      "Exploring ideas and understanding unfamiliar concepts",
      "Debugging problems and researching possible solutions",
      "Generating and improving code",
      "Refactoring and reviewing implementations",
      "Learning new technologies faster",
      "Speeding up development without skipping understanding"
    ]
  }
};

// Load data: merge localStorage (admin changes) with defaults
function loadPortfolioData() {
  try {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Deep merge: admin data overrides defaults
      return deepMerge(DEFAULT_PORTFOLIO_DATA, parsed);
    }
  } catch (e) {
    console.warn('Could not load admin data from localStorage, using defaults.');
  }
  return DEFAULT_PORTFOLIO_DATA;
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

// Export defaults (used by Firebase seed & admin panel fallback)
window.DEFAULT_PORTFOLIO_DATA = DEFAULT_PORTFOLIO_DATA;

// Export merged data as PORTFOLIO (localStorage overrides defaults until Firestore loads)
window.PORTFOLIO = loadPortfolioData();
