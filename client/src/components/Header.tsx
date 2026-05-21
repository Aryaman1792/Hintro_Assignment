/* client/src/components/Header.tsx */
import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Menu, Play, ChevronDown, LogOut } from "lucide-react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { profile, setIsLogoutOpen } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Premium default avatar image matching the Figma user representation
  const avatarUrl = profile?.id === "u2"
    ? "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" // Active female Jane Smith
    : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"; // John Doe male avatar

  const userDisplayName = profile ? `${profile.firstName} ${profile.lastName}` : "User";

  return (
    <header className="header-wrapper">
      {/* Mobile Hamburger menu toggle */}
      <button className="mobile-toggle-btn" onClick={onMenuToggle} aria-label="Toggle Navigation">
        <Menu size={20} />
      </button>

      {/* Header Page Title */}
      <div className="header-title-container">
        <h1 className="header-title">Dashboard</h1>
      </div>

      {/* Actions (Tutorial + Profile dropdown) */}
      <div className="header-actions">
        <button className="btn-watch-tutorial">
          <Play size={14} fill="currentColor" />
          <span>Watch Tutorial</span>
        </button>

        {/* User avatar menu */}
        <div className="profile-menu-container" ref={dropdownRef}>
          <button
            className="profile-trigger"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <img
              src={avatarUrl}
              alt={userDisplayName}
              className="profile-avatar"
            />
            <ChevronDown size={14} className="profile-chevron" />
          </button>

          {/* Dropdown Menu */}
          <div className={`profile-dropdown ${isDropdownOpen ? "open" : ""}`}>
            <div style={{ padding: "8px", fontSize: "0.75rem", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
              <div style={{ fontWeight: 600, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {userDisplayName}
              </div>
              <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {profile?.email}
              </div>
            </div>

            <button
              className="profile-dropdown-item danger"
              onClick={() => {
                setIsDropdownOpen(false);
                setIsLogoutOpen(true);
              }}
            >
              <LogOut size={14} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
