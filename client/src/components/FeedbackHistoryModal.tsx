/* client/src/components/FeedbackHistoryModal.tsx */
import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { X, Star, Trash2, MessageSquare } from "lucide-react";

interface FeedbackItem {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  rating: number;
  category: string;
  comment: string;
  createdAt: string;
}

export const FeedbackHistoryModal: React.FC = () => {
  const { isFeedbackHistoryOpen, setIsFeedbackHistoryOpen } = useUser();
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

  // Load feedbacks when modal opens
  useEffect(() => {
    if (isFeedbackHistoryOpen) {
      loadFeedbacks();
    }
  }, [isFeedbackHistoryOpen]);

  const loadFeedbacks = () => {
    const saved = localStorage.getItem("hintro_user_feedbacks");
    if (saved) {
      setFeedbacks(JSON.parse(saved));
    } else {
      setFeedbacks([]);
    }
  };

  if (!isFeedbackHistoryOpen) return null;

  const handleDeleteFeedback = (id: string) => {
    const updated = feedbacks.filter((fb) => fb.id !== id);
    localStorage.setItem("hintro_user_feedbacks", JSON.stringify(updated));
    setFeedbacks(updated);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all feedback history?")) {
      localStorage.removeItem("hintro_user_feedbacks");
      setFeedbacks([]);
    }
  };

  // Helper to format date cleanly
  const formatDate = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container" style={{ maxWidth: "520px" }}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">Feedback History</div>
          <button
            className="btn-modal-close"
            onClick={() => setIsFeedbackHistoryOpen(false)}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {feedbacks.length === 0 ? (
            <div className="feedback-empty-state">
              <MessageSquare size={38} style={{ color: "var(--color-text-muted)" }} />
              <h3>No Feedback Submitted Yet</h3>
              <p>
                Click on the "Feedback" link in the sidebar to share your thoughts, report bugs, or request features!
              </p>
            </div>
          ) : (
            <div className="feedback-history-list">
              {feedbacks.map((fb) => (
                <div key={fb.id} className="feedback-history-card">
                  
                  {/* Category and stars */}
                  <div className="feedback-history-card-header">
                    <span className={`feedback-history-badge ${fb.category}`}>
                      {fb.category === "bug" ? "Bug Report" : fb.category === "feature" ? "Feature Request" : fb.category === "question" ? "Question" : "Suggestion"}
                    </span>
                    <div className="feedback-history-stars">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={12}
                          fill={idx < fb.rating ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment Details */}
                  <p className="feedback-history-comment">{fb.comment}</p>

                  {/* User submission details footer */}
                  <div className="feedback-history-footer">
                    <div>
                      <div>By: {fb.userName} ({fb.userEmail})</div>
                      <div style={{ fontSize: "0.68rem", marginTop: "2px" }}>{formatDate(fb.createdAt)}</div>
                    </div>
                    
                    <button
                      className="btn-delete-feedback"
                      onClick={() => handleDeleteFeedback(fb.id)}
                      aria-label="Delete feedback entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="modal-footer" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "12px" }}>
          {feedbacks.length > 0 && (
            <button
              className="btn-modal-cancel"
              style={{ color: "#EF4444", borderColor: "#FEE2E2", backgroundColor: "#FEF2F2", marginRight: "auto" }}
              onClick={handleClearAll}
            >
              Clear All
            </button>
          )}
          <button className="btn-modal-submit" onClick={() => setIsFeedbackHistoryOpen(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
