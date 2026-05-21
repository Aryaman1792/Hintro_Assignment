/* client/src/components/Sidebar.tsx */
import React from "react";
import { useUser } from "../context/UserContext";
import {
  LayoutDashboard,
  PhoneCall,
  Library,
  MessageSquare,
  Sliders,
  History,
  MessageCircle,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    dashboard,
    setIsFeedbackOpen,
    setIsFeedbackHistoryOpen,
    isFeedbackOpen,
    isFeedbackHistoryOpen
  } = useUser();

  // Extract usage parameters
  const kbUsed = dashboard?.usage?.kb_files?.used ?? 0;
  const kbLimit = dashboard?.usage?.kb_files?.limit ?? 100;
  const kbPercentage = dashboard?.usage?.kb_files?.percentage ?? 0;

  return (
    <>
      <aside className={`sidebar-wrapper ${isOpen ? "active" : ""}`}>
        {/* Mobile Close Button */}
        <button className="mobile-toggle-btn" style={{ position: "absolute", top: "16px", right: "16px", display: isOpen ? "flex" : "none" }} onClick={onClose}>
          <X size={20} />
        </button>

        {/* Brand identity */}
        <div className="sidebar-brand">
          <span>Hintro</span>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-menu">
          <div className="sidebar-link active">
            <div className="sidebar-link-left">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
          </div>

          <div className="sidebar-link">
            <div className="sidebar-link-left">
              <PhoneCall size={18} />
              <span>Call Insights</span>
            </div>
          </div>

          <div className="sidebar-link">
            <div className="sidebar-link-left">
              <Library size={18} />
              <span>Knowledge Base</span>
            </div>
            <div className="sidebar-badge-chevron">
              <X size={12} style={{ opacity: 0 }} />
            </div>
          </div>

          <div className="sidebar-link">
            <div className="sidebar-link-left">
              <MessageSquare size={18} />
              <span>Prompts</span>
            </div>
          </div>

          <div className="sidebar-link">
            <div className="sidebar-link-left">
              <Sliders size={18} />
              <span>Boxy Controls</span>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer Section */}
        <div className="sidebar-footer">
          {/* Feedback Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <button
              className={`sidebar-link ${isFeedbackHistoryOpen ? "active" : ""}`}
              onClick={() => {
                setIsFeedbackHistoryOpen(true);
                onClose();
              }}
            >
              <div className="sidebar-link-left">
                <History size={18} />
                <span>Feedback History</span>
              </div>
            </button>

            <button
              className={`sidebar-link ${isFeedbackOpen ? "active" : ""}`}
              onClick={() => {
                setIsFeedbackOpen(true);
                onClose();
              }}
            >
              <div className="sidebar-link-left">
                <MessageCircle size={18} />
                <span>Feedback</span>
              </div>
            </button>
          </div>

          {/* Usage Meter */}
          <div className="usage-meter">
            <div className="usage-meter-text">
              {kbUsed} of {kbLimit} files used
            </div>
            <div className="usage-meter-bar">
              <div
                className="usage-meter-fill"
                style={{ width: `${Math.min(100, kbPercentage)}%` }}
              ></div>
            </div>
          </div>

          {/* Upgrade Button */}
          <button className="btn-upgrade">
            Upgrade
          </button>

          {/* Made in India branding in Figma design */}
          <div className="sidebar-copyright">
            © 2026 Hintro. Made in India 🇮🇳
          </div>
        </div>
      </aside>
    </>
  );
};
