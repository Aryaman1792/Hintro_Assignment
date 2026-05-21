/* client/src/components/CallHistory.tsx */
import React, { useState } from "react";
import type { CallSession } from "../utils/api";
import { formatDateGroupHeader, formatCallTime } from "../utils/formatters";
import { Calendar, MoreVertical, Play, Trash2 } from "lucide-react";

interface CallHistoryProps {
  calls: CallSession[];
  onStartCallClick: () => void;
}

// Helper to determine letter box color based on client name hash
function getAvatarColor(client: string): string {
  const colors = [
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#3B82F6", // Blue
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#6366F1"  // Indigo
  ];
  let hash = 0;
  for (let i = 0; i < client.length; i++) {
    hash = client.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export const CallHistory: React.FC<CallHistoryProps> = ({ calls, onStartCallClick }) => {
  const [activeActionsRowId, setActiveActionsRowId] = useState<string | null>(null);

  // 1. Group calls by formatted date header (e.g., 'April 28th')
  const groupCallsByDate = () => {
    const groups: { [key: string]: CallSession[] } = {};
    
    calls.forEach(call => {
      const header = formatDateGroupHeader(call.started_at);
      if (!groups[header]) {
        groups[header] = [];
      }
      groups[header].push(call);
    });

    // Convert object to array of date groups
    return Object.entries(groups).map(([dateHeader, sessions]) => ({
      dateHeader,
      sessions
    }));
  };

  const groupedCalls = groupCallsByDate();

  // If empty state
  if (calls.length === 0) {
    return (
      <div className="empty-calls-card">
        <div className="empty-calls-icon-container">
          <Calendar size={28} />
        </div>
        <h3>No Recent Calls</h3>
        <p>
          Connect your Google Calendar to see upcoming meetings, get reminders, and join calls directly from Hintro.
        </p>
        <button className="btn-start-a-call" onClick={onStartCallClick}>
          Start a Call
        </button>
      </div>
    );
  }

  return (
    <div className="calls-list-container">
      {groupedCalls.map(group => (
        <div key={group.dateHeader} className="calls-date-group">
          {/* Calendar Day Header */}
          <div className="calls-date-header">{group.dateHeader}</div>
          
          {/* List of Sessions for this day */}
          <div className="calls-list">
            {group.sessions.map(call => {
              const initial = call.client ? call.client.charAt(0).toUpperCase() : "C";
              const avatarColor = getAvatarColor(call.client);
              const isActionsOpen = activeActionsRowId === call._id;

              return (
                <div key={call._id} className="call-item-row">
                  {/* Left Side: Avatar badge, Client, Details */}
                  <div className="call-item-left">
                    <div
                      className="call-letter-avatar"
                      style={{ backgroundColor: avatarColor }}
                    >
                      {initial}
                    </div>
                    <div className="call-client-info">
                      <div className="call-client-name">{call.client}</div>
                      <div className="call-description">{call.description}</div>
                      
                      {/* Attendee Badges */}
                      {call.participants && call.participants.length > 0 && (
                        <div className="call-participants-list">
                          {call.participants.slice(0, 3).map((p, idx) => (
                            <span key={idx} className="participant-bubble">
                              {p.name}
                            </span>
                          ))}
                          {call.participants.length > 3 && (
                            <span className="participant-bubble">
                              +{call.participants.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Call Time and Actions Dropdown Menu */}
                  <div className="call-item-right" style={{ position: "relative" }}>
                    <div className="call-time">{formatCallTime(call.started_at)}</div>
                    
                    <button
                      className="btn-call-actions"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveActionsRowId(isActionsOpen ? null : call._id);
                      }}
                      aria-label="Call actions menu"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {/* Popover action list */}
                    {isActionsOpen && (
                      <>
                        {/* Overlay backdrop for clicks to close */}
                        <div
                          style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 10,
                            background: "transparent"
                          }}
                          onClick={() => setActiveActionsRowId(null)}
                        ></div>
                        <div
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "100%",
                            backgroundColor: "#FFFFFF",
                            border: "1px solid var(--color-border)",
                            boxShadow: "var(--shadow-md)",
                            borderRadius: "var(--radius-md)",
                            padding: "4px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                            zIndex: 20,
                            width: "120px"
                          }}
                        >
                          <button
                            onClick={() => {
                              alert(`Launching details for: ${call.client}`);
                              setActiveActionsRowId(null);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "6px 8px",
                              fontSize: "0.75rem",
                              borderRadius: "4px",
                              textAlign: "left",
                              color: "var(--color-text-primary)",
                              cursor: "pointer",
                              width: "100%"
                            }}
                          >
                            <Play size={12} />
                            View Summary
                          </button>
                          <button
                            onClick={() => {
                              alert(`Archiving session: ${call._id}`);
                              setActiveActionsRowId(null);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "6px 8px",
                              fontSize: "0.75rem",
                              borderRadius: "4px",
                              textAlign: "left",
                              color: "#EF4444",
                              cursor: "pointer",
                              width: "100%"
                            }}
                          >
                            <Trash2 size={12} />
                            Delete Call
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
