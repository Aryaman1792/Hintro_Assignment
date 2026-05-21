# 🚀 Hintro Dashboard Assignment

A modern, responsive dashboard application built with **React + TypeScript + Vite**, featuring a premium UI, reusable components, mock analytics data, interactive modals, and responsive layouts.

This project recreates the Hintro dashboard experience using a clean frontend architecture and a mock backend workspace setup.

---

# 📸 Project Overview

The application includes:

* Responsive dashboard layout
* Interactive sidebar navigation
* Analytics & stats cards
* Recent call history tracking
* Feedback & rating modal system
* User switching simulation
* Logout walkthrough modal
* LocalStorage persistence
* Mock API integration structure
* Clean modular CSS architecture

---

# 🛠️ Tech Stack

## Frontend

* **React 19**
* **TypeScript**
* **Vite**
* **Lucide React Icons**
* **Vanilla Modular CSS**

## Tooling

* ESLint
* TypeScript Compiler
* Concurrently

---

# 📂 Project Structure

```bash
Hintro_Assignment-main/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── package.json
└── README.md
```

---

# ✨ Features

## 🎯 Dashboard Analytics

The dashboard displays:

* Total sessions
* Average session duration
* AI interaction metrics
* Recent calls
* User activity overview

---

## 👥 User Switching Simulation

A floating developer switcher allows toggling between:

### `u1` — New User

Displays:

* Empty dashboard state
* Zero analytics
* Empty recent calls section
* Welcome UI

### `u2` — Active User

Displays:

* Fully populated analytics
* Dynamic call history
* Grouped recent calls
* Realistic usage statistics

---

## ⭐ Feedback System

The app includes a feedback modal featuring:

* Star rating system
* Feedback categories
* Comment input
* LocalStorage persistence
* Feedback history modal

Categories include:

* Bug Report
* Feature Request
* Suggestion
* Question

---

## 🔒 Logout Walkthrough Modal

Clicking the user avatar opens a premium walkthrough modal that includes:

* Blur background overlay
* Onboarding cards
* Interactive actions
* Animated transitions

---

## 📱 Responsive Design

The UI is fully responsive and optimized for:

* Desktop
* Tablet
* Mobile devices

The layout uses flexible grids and adaptive containers.

---

# 🎨 Styling Architecture

The project uses pure modular CSS.

## CSS Files

| File             | Purpose                           |
| ---------------- | --------------------------------- |
| `theme.css`      | Design tokens, colors, typography |
| `layout.css`     | Layout grids and responsiveness   |
| `components.css` | UI component styling              |
| `animations.css` | Transitions and animations        |

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
cd Hintro_Assignment-main
```

---

## 2. Install Dependencies

### Install root dependencies

```bash
npm install
```

### Install frontend dependencies

```bash
cd client
npm install
```

---

# ▶️ Running the Project

## Start Frontend Development Server

```bash
cd client
npm run dev
```

Application runs on:

```bash
http://localhost:5173
```

---

# 🏗️ Build for Production

```bash
cd client
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# 🧩 Important Components

| Component                  | Description                         |
| -------------------------- | ----------------------------------- |
| `Header.tsx`               | Top navigation and profile controls |
| `Sidebar.tsx`              | Main navigation sidebar             |
| `StatsCard.tsx`            | Reusable analytics card             |
| `CallHistory.tsx`          | Recent calls display                |
| `FeedbackModal.tsx`        | Feedback submission form            |
| `FeedbackHistoryModal.tsx` | Stored feedback viewer              |
| `LogoutModal.tsx`          | Logout walkthrough UI               |

---

# 🧠 State Management

The project uses React Context API.

## `UserContext.tsx`

Handles:

* Active user state
* User switching
* Modal visibility
* API synchronization
* Dashboard data updates

---

# 🔌 Utility Layer

## `api.ts`

Contains helper methods for:

* Fetching mock data
* API abstraction
* Error handling

## `formatters.ts`

Handles:

* Duration formatting
* Date formatting
* Text utilities

---

# 🎯 Assignment Highlights

This assignment demonstrates:

* Clean React architecture
* Component reusability
* Type-safe development
* Responsive UI implementation
* State management
* UX-focused modal interactions
* Modular CSS organization
* Local persistence handling

---

# 🚀 Future Improvements

Potential enhancements include:

* Authentication system
* Real backend integration
* API caching
* Dark mode
* Unit testing
* E2E testing
* Charts & advanced analytics
* Accessibility improvements
* Internationalization

---

# 📦 Available Scripts

## Root Scripts

| Command          | Description            |
| ---------------- | ---------------------- |
| `npm start`      | Run workspace services |
| `npm run client` | Start frontend only    |

## Client Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start Vite dev server    |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

---

# 📄 License

This project was created as part of a frontend assignment/demo project.

---

# 👨‍💻 Author

Developed for the Hintro assignment submission using React, TypeScript, and Vite.
