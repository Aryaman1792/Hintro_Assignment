/* client/src/components/FeedbackModal.tsx */
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { X, Star, CheckCircle } from "lucide-react";

export const FeedbackModal: React.FC = () => {
  const { isFeedbackOpen, setIsFeedbackOpen, profile } = useUser();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("feature");
  const [comment, setComment] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);

  const categories = [
    { value: "bug", label: "Bug Report 🐛" },
    { value: "feature", label: "Feature Request 🚀" },
    { value: "question", label: "Question ❓" },
    { value: "other", label: "Other 💡" }
  ];

  if (!isFeedbackOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Please enter some feedback comments before submitting!");
      return;
    }

    // 1. Prepare feedback object
    const newFeedback = {
      id: "fb-" + Date.now(),
      userId: profile?.id || "anonymous",
      userName: profile ? `${profile.firstName} ${profile.lastName}` : "Anonymous User",
      userEmail: profile?.email || "anonymous@example.com",
      rating,
      category,
      comment,
      createdAt: new Date().toISOString()
    };

    // 2. Save in localStorage
    const saved = localStorage.getItem("hintro_user_feedbacks");
    const feedbacks = saved ? JSON.parse(saved) : [];
    feedbacks.unshift(newFeedback); // Insert newest first
    localStorage.setItem("hintro_user_feedbacks", JSON.stringify(feedbacks));

    // 3. Show Toast success
    setShowToast(true);

    // Reset inputs
    setRating(5);
    setCategory("feature");
    setComment("");

    // 4. Auto close modal after brief delay
    setTimeout(() => {
      setIsFeedbackOpen(false);
      setShowToast(false);
    }, 1800);
  };

  return (
    <>
      <div className="modal-backdrop">
        <form className="modal-container" onSubmit={handleSubmit}>
          {/* Header */}
          <div className="modal-header">
            <div className="modal-title">Send us Feedback</div>
            <button
              type="button"
              className="btn-modal-close"
              onClick={() => setIsFeedbackOpen(false)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Content */}
          <div className="modal-body">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              
              {/* Star Rating Section */}
              <div className="feedback-form-group">
                <label className="feedback-form-label">How would you rate Hintro?</label>
                <div className="feedback-star-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`feedback-star-btn ${(hoverRating !== null ? star <= hoverRating : star <= rating) ? "active" : ""}`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      aria-label={`Rate ${star} stars out of 5`}
                    >
                      <Star size={26} fill={(hoverRating !== null ? star <= hoverRating : star <= rating) ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories Pills */}
              <div className="feedback-form-group">
                <label className="feedback-form-label">Category</label>
                <div className="feedback-categories-row">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      className={`feedback-category-pill ${category === cat.value ? "active" : ""}`}
                      onClick={() => setCategory(cat.value)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea Comments */}
              <div className="feedback-form-group">
                <label className="feedback-form-label">Feedback Details</label>
                <textarea
                  className="feedback-textarea"
                  rows={4}
                  placeholder="Tell us what you like or what we can improve..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Pre-filled user details description */}
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", backgroundColor: "var(--color-bg-secondary)", padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}>
                Submitting as: <strong>{profile ? `${profile.firstName} ${profile.lastName}` : "User"}</strong> ({profile?.email})
              </div>

            </div>
          </div>

          {/* Form Actions */}
          <div className="modal-footer" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "12px" }}>
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={() => setIsFeedbackOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-modal-submit">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>

      {/* Success Toast Overlay Alert */}
      {showToast && (
        <div className="success-toast">
          <CheckCircle size={18} />
          <span>Feedback Saved Successfully!</span>
        </div>
      )}
    </>
  );
};
