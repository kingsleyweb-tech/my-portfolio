# Kingsley Anaab — Personal Portfolio

A personal portfolio website built from scratch with vanilla HTML, CSS, and JavaScript. It showcases my projects, skills, experience, and engineering deep-dives — with a fully functional admin dashboard for managing content.

---

## 🌐 Live Site


---

## 👤 About Me

I'm **Kingsley Anaab**, an IT student at **Knutsford University College**, Ghana 🇬🇭.  
I enjoy experimenting with new technologies, building practical applications, and continuously improving my technical skills. Rather than focusing on theory alone, I prefer to learn by building real-world projects.

- 📍 Location: Ghana
- 📧 Email: kingsleyanaab604@gmail.com
- 🐙 GitHub: [@kingsleyweb-tech](https://github.com/kingsleyweb-tech)
- 💬 WhatsApp: [Chat](https://wa.me/233501901401)
- ✅ Open to: Internships, part-time & remote learning opportunities

---

## 🗂️ Project Structure

```
my-portfolio/
├── index.html              # Main homepage (single-page)
├── projects.html           # Full projects listing page
├── admin/
│   └── index.html          # Admin dashboard (password protected)
├── css/
│   └── styles.css          # All site styles
├── js/
│   ├── script.js           # Main site logic & rendering
│   ├── portfolio-data.js   # Default portfolio data (fallback)
│   ├── firebase-db.js      # Firestore load/save helpers
│   ├── cloudinary.js       # Cloudinary image upload helper
│   └── config.js           # ⚠️ Gitignored — credentials (see Setup)
├── firestore.rules         # Firestore security rules
├── firebase.json           # Firebase hosting config
├── vercel.json             # Vercel routing config
└── .gitignore
```

---

## ✨ Features

### Portfolio Site
- **Hero section** with profile photo, role, tagline, and social links
- **About / Skills** — categorized skill list with proficiency levels
- **Experience** timeline
- **Projects** — featured cards + full grid with category filters
- **Deep-dive Engineering Projects** — CS fundamentals explorations
- **AI Workflow** section — tools and use cases
- **Dark / Light mode** toggle
- **Scroll reveal animations**
- **Project detail modals**
- **Responsive** — works on mobile and desktop

### Admin Dashboard (`/admin/`)
- Password-protected login (permanent password, stored in config)
- **3-hour session** — auto-logs out after 3 hours; stays logged in across page refreshes within that window
- **Login hint** after 3 failed attempts
- Add, edit, and delete **Projects** and **Experience** entries
- **Cover image upload** for projects via Cloudinary (with progress bar)
- **Remove image** button per project
- Images saved to localStorage cache immediately (survive page refresh even if Firestore is unavailable)
- Auto-saves to **Firebase Firestore** on image upload/removal
- Manual **Force Save to Firebase** button
- **Seed defaults** button (seeds Firestore from `portfolio-data.js` if empty)
- **Reload from Firebase** button
- Dark/Light mode toggle

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | Vanilla CSS (custom design system) |
| Logic | Vanilla JavaScript (ES2020+) |
| Database | Firebase Firestore |
| Auth | Firebase Anonymous Auth (for Firestore writes) |
| Images | Cloudinary (unsigned upload) |
| Icons | Font Awesome 6 |
| Fonts | Google Fonts |
| Deployment | Vercel / Firebase Hosting |

---

## 🚀 Projects Featured

| Project | Category | Stack |
|---|---|---|
| **Vendora** | Full Stack · Marketplace | HTML, CSS, JS, PHP, MySQL, Firebase, PWA |
| **RealTimeDocs** | Full Stack · Real-Time | React, TypeScript, Socket.io, Node.js, MongoDB |
| **Cyber News & Threat Monitor** | Cybersecurity | React, TypeScript, Node.js, Chart.js |
| **Military Reports Dashboard** | Dashboard · Admin | React, TypeScript, Vite |
| **Military Entry / QR System** | Systems · QR | React, TypeScript, QR Code |
| **Online Examination System** | Full Stack · Education | PHP, MySQL, HTML, CSS, JS |
| **MyCommandShell** | Desktop · Electron | Electron, React, TypeScript |

### ⚙️ Deep-Dive Engineering Projects

Projects that go beyond building UIs — exploring CS fundamentals:

| Project | Concepts |
|---|---|
| **Spreadsheet Calculation Engine** | Formula Parsing, Dependency Graphs, OOP |
| **Network Routing Simulator** | Dijkstra's, Bellman-Ford, Graph Traversal |
| **KingScript** | Lexer, AST, Recursive Descent Parser, Interpreter |

---

## ⚙️ Setup & Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/kingsleyweb-tech/my-portfolio.git
cd my-portfolio
```

### 2. Configure Credentials

Create `js/config.js` (this file is gitignored — never commit it):

```js
window.CONFIG = {
  firebase: {
    apiKey:            "YOUR_FIREBASE_API_KEY",
    authDomain:        "YOUR_PROJECT.firebaseapp.com",
    projectId:         "YOUR_PROJECT_ID",
    storageBucket:     "YOUR_PROJECT.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId:             "YOUR_APP_ID"
  },
  cloudinary: {
    cloudName:    "YOUR_CLOUDINARY_CLOUD_NAME",
    uploadPreset: "YOUR_UPLOAD_PRESET",
    apiKey:       "YOUR_CLOUDINARY_API_KEY"
  },
  
};
```

### 3. Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Firestore Database** and **Anonymous Authentication**
3. Deploy Firestore rules from `firestore.rules`:
   - Go to **Firestore → Rules** in the Firebase Console
   - Paste the contents of `firestore.rules`
   - Click **Publish**

### 4. Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Create an **unsigned upload preset**
3. Add your `cloudName` and `uploadPreset` to `js/config.js`

### 5. Run Locally

Open `index.html` with a live server (e.g. VS Code Live Server extension).

> The workspace is pre-configured to open `index.html` by default via `.vscode/settings.json`.

---

## 🔐 Admin Dashboard

Access at: `/admin/index.html`

- Password is set in `js/config.js` under `adminPassword`
- Sessions last **3 hours** before requiring re-login
- After **3 failed login attempts**, a hint is shown

> ⚠️ `js/config.js` is gitignored. The admin password is never committed to the repository.

---

## 📦 Deployment

### Vercel
Push to GitHub. Connect the repository to [Vercel](https://vercel.com) and deploy. The `vercel.json` handles routing for the SPA.

### Firebase Hosting
```bash
firebase deploy
```
The `firebase.json` file is pre-configured for hosting.

---

## 🤖 AI Tools Used in Development

I use AI as a learning and problem-solving partner:

- **Antigravity IDE** — AI-powered dev environment (primary tool for this project)
- **ChatGPT / Claude** — Debugging, research, and concept understanding
- **Cursor** — AI-assisted code editing
- **OpenAI Codex** — Code generation and exploration

> I make sure to understand everything I build — AI accelerates the process, not replaces understanding.

---

## 📄 License

This project is for personal/portfolio use. Feel free to draw inspiration, but please don't copy it wholesale and present it as your own.

---

*Built by Kingsley Anaab — Still learning. Actively building. Continuously improving.*
