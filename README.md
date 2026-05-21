# Hintro Mock Dashboard & Server

Welcome to the **Hintro Mock Dashboard & Server** workspace! This project is a complete, production-grade reconstruction of the Hintro Dashboard based closely on Figma designs. It includes a responsive, premium React frontend interface and a robust mock Express API backend.

## 🚀 Quick Start (Launch both Servers in 1-Click)

To make review and evaluation as simple as possible, you can launch the Express Mock API Server (port `3001`) and the Vite React Frontend (port `5173`) concurrently using a single command:

1. **Install workspace dependencies**:
   ```bash
   npm run install-all
   ```
   *(This automatically installs packages for both the `/server` and `/client` directories, as well as root concurrency tools)*.

2. **Launch both servers concurrently**:
   ```bash
   npm start
   ```
   *Your terminal will spin up both servers. The frontend will automatically load on **`http://localhost:5173/`**.*

---

## 🛠️ Tech Stack & Architecture

The project is designed in an structured, clean monorepo architecture:

### 1. **Mock Express Backend (`/server`)**
- **Core**: Node.js, Express, TypeScript, CORS middleware.
- **Dynamic Generator (`/server/src/dataGenerator.ts`)**: Rather than returning static hardcoded items, it contains a robust, realistic data generator. 
  - For **User 2 (`u2`)**, it generates exactly 22 calls with realistic client names (Acme Corp, Figma, Stripe, Retool, Retool etc.), durations, and participant badges, then **automatically derives and calculates dashboard stats and calendar groupings** so the figures match perfectly with absolute coherence.
  - For **User 1 (`u1`)**, it serves default empty profiles, 0 usage statistics, and zero call arrays to showcase empty dashboard templates.

### 2. **Premium React Frontend (`/client`)**
- **Core**: Vite, React (v18+), TypeScript.
- **Styling (Vanilla CSS)**: As per guidelines, this app is built purely with modular, native CSS files located in `/src/styles/`:
  - `theme.css`: Core design system, color variables matching Figma, Plus Jakarta Sans font imports, base resets.
  - `layout.css`: Grid systems, desktop static side-by-side splits, and mobile responsive containers.
  - `components.css`: Buttons, card badges, modals, star ratings, and lists.
  - `animations.css`: Keyframe transitions, modal scales, toast slide-ups, and active card glows.
- **Icons**: `lucide-react` for responsive, premium SVG visual vectors.
- **State Context (`/src/context/UserContext.tsx`)**: Coordinates active user switching, dynamic API querying, error handling, and overlay dialog controls.

---

## 🕹️ Feature Walkthrough & Testing Guides

### 1. **Interactive User Switcher (Floating Dev-Bar)**
At the bottom of the viewport, we added a custom **Floating Dev Switcher Bar**. This allows you to toggle instantly between:
- **New User (u1)**: Displays the empty state welcome banner, `0` total sessions, `0` average duration, `0` AI interactions, and the dashed calendar card with the text *"No Recent Calls"*.
- **Active User (u2)**: The dashboard instantly hot-reloads and populates with realistic, date-grouped recent call logs (e.g. grouped under "April 28th", "April 30th"), initials in purple square badges, attendee names, formatted durations, and usage graphs.

### 2. **Premium Logout walkthrough Modal**
- Click on the user profile avatar in the top right header (next to "Watch Tutorial").
- Select **Log out** from the popover dropdown.
- This triggers a blur-backdrop overlay modal featuring an onboarding **"How Hintro Works"** walkthrough cards (Steps 1, 2, and 3) as designed in Figma. Click *Cancel* or *Log out* to interact.

### 3. **Persistent LocalStorage Feedback Loop**
- In the sidebar, click the **Feedback** link. This slides open a form containing:
  - Interactive star ratings (1 to 5 stars) with active glow filters.
  - Category tags (Bug 🐛, Feature Request 🚀, Question ❓, Suggestion 💡).
  - Feedback details comments input.
- Click **Submit Feedback**. A success toast slides up on the bottom right and the modal auto-closes.
- Click **Feedback History** in the sidebar. This opens a dedicated drawer displaying all feedback items stored persistently inside `localStorage` (sorted newest-first, displaying user email, formatted creation timestamp, and a delete button to purge entries).

### 4. **Flawless Mobile Responsiveness**
- Scale the viewport to mobile width (e.g. 375px).
- The stats grid seamlessly adapts from 4-columns inline to a **2x2 compact block grid**.
- The main sidebar collapses into a **slide-in slide-out mobile drawer menu** triggered via the hamburger icon in the top left header.

---

## 💡 Engineering Assumptions & Conventions

- **Derived Statistics**: Rather than sending unlinked static metrics, the backend calculates all averages and counts directly from the generated calls array. This ensures that the call logs visible on screen correspond 100% to the cards at the top.
- **Time Measurements formatting**: The raw metrics from the backend (seconds and ISO strings) are parsed on the client side using robust modular formatter hooks (`src/utils/formatters.ts`) to output exactly:
  - `Xm Ysec` for average durations.
  - `X days ago` / `Today` / `Yesterday` for relative stats.
  - Custom calendar formats like `April 28th` with ordinals (`st`, `nd`, `rd`, `th`).
- **localStorage Namespace**: Feedbacks are sandboxed inside the browser's `localStorage` under `hintro_user_feedbacks` to prevent local cache clashing.

---

## 🛠️ Running Components Individually

If you prefer to run the components in separate terminal tabs, you can do so easily:

### Running the API Mock Server
```bash
cd server
npm install
npm run dev
```
- Listens on: `http://localhost:3001`
- Endpoints:
  - `GET /health`
  - `GET /api/auth/profile`
  - `GET /api/auth/dashboard`
  - `GET /api/call-sessions/stats`
  - `GET /api/call-sessions?limit=N`

### Running the Frontend Client
```bash
cd client
npm install
npm run dev
```
- Listens on: `http://localhost:5173` (Vite Hot-Reload active)
