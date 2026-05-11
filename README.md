# 🧭 Career Navigator — Frontend

<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" />
<img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />

<br/><br/>

> **AI-Powered Resume Analyzer & Personalized Career Roadmap Generator**

<br/>

[🌐 Live Demo](https://career-navigator-frontend-psi.vercel.app/) &nbsp;•&nbsp;
[⚙️ Backend Repo](https://github.com/nitin811/career-navigator-backend) &nbsp;•&nbsp;
[🚀 Quick Start](#-quick-start)

<br/>

![Career Navigator Demo](https://img.shields.io/badge/Status-Live%20%26%20Running-00D4AA?style=for-the-badge)

</div>

---

## 📌 What is Career Navigator?

**Career Navigator** is a full-stack AI-powered web app that helps **freshers and job seekers** understand why their resume isn't getting shortlisted — and what to do about it.

Just upload your resume PDF, select your target role, and within seconds get:

- 📊 **ATS Score** — How optimized your resume is (0–100)
- 🔍 **Keyword Analysis** — Found vs Missing keywords for your target role
- 🗺️ **4-Week Personalized Roadmap** — Step-by-step learning plan with resources
- 💡 **AI Career Advice** — Actionable suggestions to improve your profile
- 📄 **PDF Export** — Download your roadmap as a clean PDF

---


## ✨ Features

| Feature | Description |
|---------|-------------|
| 📄 **Smart Resume Upload** | Drag & drop or click to upload PDF resumes |
| 🎯 **Target Role Selection** | Choose from 12+ job roles or type your own |
| 📊 **ATS Score Gauge** | Beautiful circular gauge showing resume score |
| 🔍 **Keyword Gap Analysis** | See exactly which keywords are missing |
| 🗺️ **AI Roadmap Generator** | Personalized 4-week plan with YouTube & docs links |
| 💡 **AI Career Advice** | Groq LLaMA 3.3 powered suggestions |
| 📚 **History Dashboard** | Access all your past analyses anytime |
| 📄 **PDF Export** | Download roadmap as a professional PDF |
| 🔐 **Google Auth** | One-click sign in with Clerk |
| 📱 **Fully Responsive** | Works perfectly on mobile, tablet & desktop |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18 + Vite** | Fast SPA with instant HMR |
| **Tailwind CSS** | Utility-first responsive styling |
| **Clerk** | Google authentication in minutes |
| **Axios** | HTTP client for API calls |
| **jsPDF** | Client-side PDF generation |
| **Vercel** | Frontend deployment with CDN |

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Responsive navbar with mobile menu
│   │   ├── Footer.jsx          # Professional footer with all links
│   │   ├── UploadSection.jsx   # Drag & drop resume upload
│   │   ├── ResultsDashboard.jsx # Full results view
│   │   ├── ATSGauge.jsx        # Circular SVG score gauge
│   │   ├── KeywordAnalysis.jsx  # Found vs missing keywords
│   │   ├── RoadmapSection.jsx  # 4-week roadmap with resources
│   │   └── HistoryPage.jsx     # Past analyses dashboard
│   ├── App.jsx                 # Root component with routing logic
│   ├── main.jsx                # Entry point with ClerkProvider
│   └── index.css               # Global styles
├── .env                        # Environment variables (not committed)
├── .env.example                # Environment variables template
├── .gitignore
├── index.html
├── vite.config.js
└── package.json
```

---

## ⚡ Quick Start

### Prerequisites

- Node.js v18+
- npm or yarn
- [Backend server running](https://github.com/nitin811/career-navigator-backend)
- [Clerk account](https://clerk.com) (free)

### 1. Clone the repository

```bash
git clone https://github.com/nitin811/career-navigator-frontend.git
cd career-navigator-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
VITE_API_URL=http://127.0.0.1:5000
```

> 💡 Get your Clerk key from [clerk.com](https://clerk.com) → API Keys

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deployment (Vercel)

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "feat: initial commit"
git push origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import `career-navigator-frontend` repo
3. Click **Deploy**

### Step 3 — Add Environment Variables

In Vercel → Project → **Settings** → **Environment Variables**:

```
VITE_CLERK_PUBLISHABLE_KEY = pk_live_your_production_key
VITE_API_URL               = https://your-railway-backend.up.railway.app
```

### Step 4 — Redeploy

Vercel → Deployments → **Redeploy**

---

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | `pk_test_...` or `pk_live_...` |
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

---

## 📡 API Integration

This frontend connects to the [Career Navigator Backend](https://github.com/nitin811/career-navigator-backend).

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analyze` | Upload resume & get AI analysis |
| `POST` | `/api/history/save` | Save analysis to database |
| `GET` | `/api/history/:userId` | Get user's past analyses |
| `DELETE` | `/api/history/:id` | Delete a specific analysis |

---

## 🎨 UI Highlights

- 🌑 **Dark theme** — Professional `#080B14` background
- ✨ **Glassmorphism** — Frosted glass cards and navbar
- 🎨 **Gradient accents** — Purple (`#6C63FF`) + Teal (`#00D4AA`)
- 📱 **Mobile-first** — Hamburger menu, responsive grid
- ⚡ **Smooth animations** — Fade-up, gauge fill, pulse effects
- 🖋️ **Custom typography** — Syne (headings) + DM Sans (body)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 🔗 Related

| Resource | Link |
|----------|------|
| 🔧 Backend Repo | [career-navigator-backend](https://github.com/nitin811/career-navigator-backend) |
| 🌐 Live Demo | [career-navigator-frontend-psi.vercel.app](https://career-navigator-frontend-psi.vercel.app/) |
| 👤 Portfolio | [nitintiwari.netlify.app](https://nitintiwari.netlify.app/) |
| 💼 LinkedIn | [nitin-tiwari-272508281](https://www.linkedin.com/in/nitin-tiwari-272508281/) |

---

## 👨‍💻 Author

<div align="center">

**Nitin Tiwari**

[![GitHub](https://img.shields.io/badge/GitHub-nitin811-181717?style=for-the-badge&logo=github)](https://github.com/nitin811)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/nitin-tiwari-272508281/)
[![Twitter](https://img.shields.io/badge/Twitter-@tiwarinitin2212-1DA1F2?style=for-the-badge&logo=twitter)](https://x.com/tiwarinitin2212)
[![Email](https://img.shields.io/badge/Email-nitinks3366@gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:nitinks3366@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-nitintiwari.netlify.app-FF6B6B?style=for-the-badge&logo=netlify)](https://nitintiwari.netlify.app/)

</div>

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it for your own projects!

---

<div align="center">

**⭐ Star this repo if it helped you!**

*Built with ❤️ for freshers, by a fresher*

</div>
