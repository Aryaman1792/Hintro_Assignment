/* client/src/context/UserContext.tsx */
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { HintroApi } from "../utils/api";
import type { Profile, DashboardData, CallStats, CallSession, Pagination } from "../utils/api";

interface UserContextType {
  userId: "u1" | "u2";
  setUserId: (id: "u1" | "u2") => void;
  profile: Profile | null;
  dashboard: DashboardData | null;
  stats: CallStats | null;
  callHistory: CallSession[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  
  // Modal Triggers
  isFeedbackOpen: boolean;
  setIsFeedbackOpen: (open: boolean) => void;
  isFeedbackHistoryOpen: boolean;
  setIsFeedbackHistoryOpen: (open: boolean) => void;
  isLogoutOpen: boolean;
  setIsLogoutOpen: (open: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserIdState] = useState<"u1" | "u2">(() => {
    const saved = localStorage.getItem("hintro_active_user");
    return (saved === "u1" || saved === "u2") ? saved : "u1"; // default to u1
  });
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [stats, setStats] = useState<CallStats | null>(null);
  const [callHistory, setCallHistory] = useState<CallSession[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isFeedbackHistoryOpen, setIsFeedbackHistoryOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const setUserId = useCallback((id: "u1" | "u2") => {
    setUserIdState(id);
    localStorage.setItem("hintro_active_user", id);
  }, []);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Execute all fetches in parallel
      const [profileData, dashboardData, statsData, historyData] = await Promise.all([
        HintroApi.getProfile(userId),
        HintroApi.getDashboard(userId),
        HintroApi.getStats(userId),
        HintroApi.getCallHistory(userId, 15, 1) // Fetch first 15 calls
      ]);

      setProfile(profileData);
      setDashboard(dashboardData);
      setStats(statsData);
      setCallHistory(historyData.callSessions);
      setPagination(historyData.pagination);
    } catch (err: any) {
      console.error("[UserContext] Error loading user data:", err);
      setError("Failed to fetch dashboard data. Please make sure the mock server is running on http://localhost:3001.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Trigger fetch when userId changes
  useEffect(() => {
    refreshData();
  }, [refreshData, userId]);

  return (
    <UserContext.Provider
      value={{
        userId,
        setUserId,
        profile,
        dashboard,
        stats,
        callHistory,
        pagination,
        loading,
        error,
        refreshData,
        isFeedbackOpen,
        setIsFeedbackOpen,
        isFeedbackHistoryOpen,
        setIsFeedbackHistoryOpen,
        isLogoutOpen,
        setIsLogoutOpen
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
