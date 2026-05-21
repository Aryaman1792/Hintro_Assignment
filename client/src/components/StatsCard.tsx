/* client/src/components/StatsCard.tsx */
import React from "react";
import { Clock, Hourglass, Sparkles, Calendar } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  type: "sessions" | "duration" | "ai" | "last";
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, type }) => {
  // Select icon based on category type
  const getIcon = () => {
    switch (type) {
      case "sessions":
        return <Clock size={20} />;
      case "duration":
        return <Hourglass size={20} />;
      case "ai":
        return <Sparkles size={20} className="active-glow" />;
      case "last":
        return <Calendar size={20} />;
    }
  };

  return (
    <div className="stats-card">
      <div className={`stats-card-icon-container ${type}`}>
        {getIcon()}
      </div>
      <div className="stats-card-info">
        <span className="stats-card-label">{label}</span>
        <span className="stats-card-value">{value}</span>
      </div>
    </div>
  );
};
