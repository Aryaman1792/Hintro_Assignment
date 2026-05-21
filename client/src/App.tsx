/* client/src/App.tsx */
import React, { useState } from "react";
import { UserProvider, useUser } from "./context/UserContext";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { StatsCard } from "./components/StatsCard";
import { CallHistory } from "./components/CallHistory";
import { LogoutModal } from "./components/LogoutModal";
import { FeedbackModal } from "./components/FeedbackModal";
import { FeedbackHistoryModal } from "./components/FeedbackHistoryModal";
import { formatDuration, formatRelativeDate } from "./utils/formatters";
import { Plus, ShieldAlert, Sparkles, RefreshCw } from "lucide-react";

// CSS files import
import "./styles/theme.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/animations.css";

const DashboardContent: React.FC = () => {
  const {
    userId,
    setUserId,
    profile,
    stats,
    callHistory,
    loading,
    error,
    refreshData
  } = useUser();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleStartCall = () => {
    alert("Starting a new meeting session! (Boxy Controls and Assistant will load dynamically on call connecting)");
  };

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 1. Loading Skeleton Screen
  if (loading && !profile) {
    return (
      <div className="app-container" style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", height: "100vh", width: "100vw", backgroundColor: "var(--color-bg-secondary)" }}>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
          <RefreshCw className="active-glow" size={32} style={{ color: "var(--color-primary)", animation: "spin 1.5s linear infinite" }} />
          <span style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
            Syncing Hintro Dashboard...
          </span>
        </div>
      </div>
    );
  }

  // 2. Error State Screen
  if (error) {
    return (
      <div className="app-container" style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", height: "100vh", width: "100vw", padding: "24px" }}>
        <div style={{ border: "1.5px solid #FEE2E2", backgroundColor: "#FEF2F2", padding: "32px", borderRadius: "var(--radius-lg)", maxWidth: "480px", textAlign: "center", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", boxShadow: "var(--shadow-md)" }}>
          <ShieldAlert size={44} style={{ color: "#EF4444" }} />
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111827" }}>Connection Issue</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
            {error}
          </p>
          <div style={{ display: "flex", gap: "12px", width: "100%", justifyContent: "center", marginTop: "8px" }}>
            <button
              onClick={() => refreshData()}
              className="btn-modal-submit"
              style={{ padding: "8px 24px", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <RefreshCw size={14} /> Try Reconnecting
            </button>
            <button
              onClick={() => {
                // If API is down, allow bypassing with standard offline fallback stats for demo purposes
                window.location.reload();
              }}
              className="btn-modal-cancel"
            >
              Reload Page
            </button>
          </div>
          
          <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", borderTop: "1px solid #FCA5A5", paddingTop: "12px", width: "100%", marginTop: "8px" }}>
            💡 Run <strong>npm start</strong> from the project root to start both backend & client together!
          </div>
        </div>
      </div>
    );
  }

  // 3. Populate statistics values safely
  const totalSessions = stats?.totalSessions ?? 0;
  const averageDurationFormatted = stats?.averageDuration
    ? formatDuration(stats.averageDuration)
    : "0";
  
  // Format AI interactions
  const aiUsedFormatted = stats?.totalAIInteractions
    ? `${stats.totalAIInteractions} times`
    : "0";

  // Last session date
  const lastSessionFormatted = stats?.lastSession && stats.lastSession.length > 0
    ? formatRelativeDate(stats.lastSession[0])
    : "-";

  return (
    <div className="app-container">
      {/* Sidebar - Desktop and Mobile Slide Drawer */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Mobile Drawer Slide overlay backdrop */}
      <div
        className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Main workspace container */}
      <main className="main-wrapper">
        <Header onMenuToggle={handleToggleMobileMenu} />

        <div className="content-container">
          {/* Main welcome message banner */}
          <section className="dashboard-welcome-row">
            <div className="welcome-text">
              <h1>
                Hi, {profile?.firstName || "Name"} 👋 Welcome to Hintro
              </h1>
              <p>Ready to make your next call smarter?</p>
            </div>
            <button className="btn-start-call" onClick={handleStartCall}>
              <Plus size={16} strokeWidth={2.5} />
              <span>Start New Call</span>
            </button>
          </section>

          {/* Core Analytics Cards Grid */}
          <section className="stats-grid">
            <StatsCard
              label="Total Sessions"
              value={totalSessions}
              type="sessions"
            />
            <StatsCard
              label="Average Duration"
              value={averageDurationFormatted}
              type="duration"
            />
            <StatsCard
              label="AI Used"
              value={aiUsedFormatted}
              type="ai"
            />
            <StatsCard
              label="Last Session"
              value={lastSessionFormatted}
              type="last"
            />
          </section>

          {/* Recent Call Records log list */}
          <section className="recent-calls-section">
            <h2>Recent calls</h2>
            <CallHistory
              calls={callHistory}
              onStartCallClick={handleStartCall}
            />
          </section>
        </div>
      </main>

      {/* Modals & Backdrop Dialog overlays */}
      <LogoutModal />
      <FeedbackModal />
      <FeedbackHistoryModal />

      {/* Floating Developer User-Switching Bar */}
      <div className="dev-switcher-bar" role="toolbar" aria-label="Mock state switcher">
        <span className="dev-switcher-label">TESTING USER:</span>
        <div className="dev-switcher-btns">
          <button
            className={`btn-dev-switch ${userId === "u1" ? "active" : ""}`}
            onClick={() => setUserId("u1")}
            aria-pressed={userId === "u1"}
          >
            New User (u1)
          </button>
          <button
            className={`btn-dev-switch ${userId === "u2" ? "active" : ""}`}
            onClick={() => setUserId("u2")}
            aria-pressed={userId === "u2"}
          >
            Active User (u2)
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <DashboardContent />
    </UserProvider>
  );
}

export default App;
