/* client/src/components/LogoutModal.tsx */
import React from "react";
import { useUser } from "../context/UserContext";
import { X, Upload, MessageCircle, BarChart2 } from "lucide-react";

export const LogoutModal: React.FC = () => {
  const { isLogoutOpen, setIsLogoutOpen } = useUser();

  if (!isLogoutOpen) return null;

  const handleLogoutConfirm = () => {
    setIsLogoutOpen(false);
    alert("You have logged out successfully (Mock Session Ended)!");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container" style={{ maxWidth: "580px" }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title">Leaving already?</div>
          <button className="btn-modal-close" onClick={() => setIsLogoutOpen(false)} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <p className="logout-message">
            You can log back in anytime to continue your meetings and call notes with Hintro.
          </p>

          {/* Onboarding walkthrough "How it works" */}
          <div className="logout-walkthrough">
            <div className="logout-walkthrough-title">How it works</div>
            <div className="walkthrough-grid">
              
              {/* Step 1: Upload */}
              <div className="walkthrough-step-card">
                <div className="walkthrough-step-label">Step 1</div>
                <div className="walkthrough-step-icon" style={{ color: "var(--color-primary)" }}>
                  <Upload size={18} />
                </div>
                <div className="walkthrough-step-title">Upload</div>
                <p className="walkthrough-step-desc">
                  Add files to your Knowledge Base
                </p>
              </div>

              {/* Step 2: Live Prompts */}
              <div className="walkthrough-step-card">
                <div className="walkthrough-step-label">Step 2</div>
                <div className="walkthrough-step-icon" style={{ color: "#10B981" }}>
                  <MessageCircle size={18} />
                </div>
                <div className="walkthrough-step-title">Prompts</div>
                <p className="walkthrough-step-desc">
                  Ask AI questions during your calls
                </p>
              </div>

              {/* Step 3: View Insights */}
              <div className="walkthrough-step-card">
                <div className="walkthrough-step-label">Step 3</div>
                <div className="walkthrough-step-icon" style={{ color: "#8B5CF6" }}>
                  <BarChart2 size={18} />
                </div>
                <div className="walkthrough-step-title">View Insights</div>
                <p className="walkthrough-step-desc">
                  Review meeting transcripts & action items
                </p>
                <button
                  className="btn-walkthrough-action"
                  onClick={() => alert("Showing product insights!")}
                >
                  View Insights
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer buttons */}
        <div className="modal-footer" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
          <button className="btn-modal-cancel" onClick={() => setIsLogoutOpen(false)}>
            Cancel
          </button>
          <button className="btn-modal-submit" onClick={handleLogoutConfirm} style={{ padding: "8px 24px" }}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
