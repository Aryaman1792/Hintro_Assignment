/* client/src/utils/api.ts */

// const BASE_URL = "http://localhost:3001";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/**
 * Perform a generic fetch call with specified user header and handles base configurations
 */
async function fetchFromApi<T>(endpoint: string, userId: string, queryParams?: Record<string, string | number>): Promise<T> {
  let url = `${BASE_URL}${endpoint}`;
  
  if (queryParams) {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, val]) => {
      params.append(key, String(val));
    });
    url += `?${params.toString()}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": userId
    }
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText} on ${endpoint}`);
  }

  return response.json() as Promise<T>;
}

// Interfaces matching data models
export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  login_method: string;
  status: string;
  is_hintro_admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UsageMetric {
  used: number;
  limit: number;
  percentage: number;
}

export interface DashboardData {
  user: Profile;
  subscription: {
    plan: string;
    billing_cycle: string;
    status: string;
  } | null;
  usage: {
    kb_files: UsageMetric;
    vocab_terms: number;
    notes: number;
  };
}

export interface CallStats {
  totalSessions: number;
  averageDuration: number;
  totalAIInteractions: number;
  lastSession: string[];
}

export interface Participant {
  name: string;
  isUser: boolean;
}

export interface CallSession {
  _id: string;
  user_id: string;
  status: string;
  client: string;
  description: string;
  started_at: string;
  ended_at: string;
  total_duration_seconds: number;
  language: string[];
  auto_gen_ai_response: boolean;
  save_transcript: boolean;
  transcript: string | null;
  transcript_final: boolean;
  ai_interactions: number;
  call_framework_id: string | null;
  participants: Participant[];
  ended_reason: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CallHistoryResponse {
  callSessions: CallSession[];
  pagination: Pagination;
}

/**
 * API Operations
 */
export const HintroApi = {
  /**
   * Health Check
   */
  checkHealth: async (): Promise<{ status: string }> => {
    const res = await fetch(`${BASE_URL}/health`);
    if (!res.ok) throw new Error("Health check failed");
    return res.json();
  },

  /**
   * Get User Profile
   */
  getProfile: async (userId: string): Promise<Profile> => {
    return fetchFromApi<Profile>("/api/auth/profile", userId);
  },

  /**
   * Get Dashboard Sub and Usage
   */
  getDashboard: async (userId: string): Promise<DashboardData> => {
    return fetchFromApi<DashboardData>("/api/auth/dashboard", userId);
  },

  /**
   * Get Call Session Stats
   */
  getStats: async (userId: string): Promise<CallStats> => {
    return fetchFromApi<CallStats>("/api/call-sessions/stats", userId);
  },

  /**
   * Get Call History list
   */
  getCallHistory: async (userId: string, limit: number = 10, page: number = 1): Promise<CallHistoryResponse> => {
    return fetchFromApi<CallHistoryResponse>("/api/call-sessions", userId, { limit, page });
  }
};
