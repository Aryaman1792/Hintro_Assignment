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

const CLIENTS = [
  "Acme Corp", "TechStart", "BigCorp", "StartupXYZ", "Enterprise Inc",
  "Stripe", "Vercel", "Linear", "Figma", "Supabase", "Retool"
];

const DESCRIPTIONS = [
  "Product demo", "Discovery call", "Sales call", "Weekly Sync", "Feedback session",
  "Onboarding", "Technical Deep Dive", "Pricing Discussion", "Contract review"
];

const NAMES = [
  "Sarah Connor", "Bruce Wayne", "Clark Kent", "Peter Parker", "Tony Stark",
  "Natasha Romanoff", "Steve Rogers", "Wanda Maximoff", "Barry Allen", "Diana Prince"
];

// Helper to generate a random date in the last 60 days
function getRandomDateInLast60Days(): Date {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 60);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);
  
  const date = new Date(now.getTime());
  date.setDate(now.getDate() - daysAgo);
  date.setHours(now.getHours() - hoursAgo);
  date.setMinutes(now.getMinutes() - minutesAgo);
  return date;
}

export class MockDataStore {
  private u1Profile: Profile;
  private u2Profile: Profile;
  private u2Calls: CallSession[] = [];
  
  constructor() {
    // 1. Initialize Profiles
    this.u1Profile = {
      id: "u1",
      email: "john@example.com",
      firstName: "John",
      lastName: "Doe",
      login_method: "google",
      status: "active",
      is_hintro_admin: false,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-06-20T14:30:00Z"
    };

    this.u2Profile = {
      id: "u2",
      email: "jane@example.com",
      firstName: "Jane",
      lastName: "Smith",
      login_method: "google",
      status: "active",
      is_hintro_admin: false,
      createdAt: "2024-02-10T08:00:00Z",
      updatedAt: "2024-06-20T14:30:00Z"
    };

    // 2. Generate u2 Calls once at startup so stats and call history match perfectly!
    this.generateU2Calls(22); // Let's generate 22 calls to match the Figma dashboard!
  }

  private generateU2Calls(count: number) {
    const startId = 100;
    const calls: CallSession[] = [];

    for (let i = 0; i < count; i++) {
      const client = CLIENTS[Math.floor(Math.random() * CLIENTS.length)];
      const description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];
      const started = getRandomDateInLast60Days();
      // duration 300 to 3600 seconds
      const durationSeconds = Math.floor(Math.random() * (3600 - 300 + 1)) + 300;
      const ended = new Date(started.getTime() + durationSeconds * 1000);
      
      const aiInteractions = Math.floor(Math.random() * 8); // 0 to 7 per call

      const participants: Participant[] = [
        { name: "Jane Smith", isUser: true },
        { name: NAMES[Math.floor(Math.random() * NAMES.length)], isUser: false }
      ];

      // Randomly add another participant
      if (Math.random() > 0.5) {
        participants.push({ name: NAMES[Math.floor(Math.random() * NAMES.length)], isUser: false });
      }

      calls.push({
        _id: `cs${startId + i}`,
        user_id: "u2",
        status: "ended",
        client,
        description,
        started_at: started.toISOString(),
        ended_at: ended.toISOString(),
        total_duration_seconds: durationSeconds,
        language: ["en"],
        auto_gen_ai_response: Math.random() > 0.5,
        save_transcript: true,
        transcript: null,
        transcript_final: Math.random() > 0.2,
        ai_interactions: aiInteractions,
        call_framework_id: null,
        participants,
        ended_reason: "user_ended",
        createdAt: started.toISOString(),
        updatedAt: ended.toISOString()
      });
    }

    // Sort calls by started_at descending (newest first)
    this.u2Calls = calls.sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime());
  }

  public getProfile(userId: string): Profile {
    if (userId === "u2") return this.u2Profile;
    return this.u1Profile; // default to u1
  }

  public getDashboard(userId: string): DashboardData {
    const user = this.getProfile(userId);
    if (userId === "u2") {
      return {
        user,
        subscription: {
          plan: "professional",
          billing_cycle: "monthly",
          status: "active"
        },
        usage: {
          kb_files: { used: 181, limit: 1000, percentage: 18.1 },
          vocab_terms: 104,
          notes: 24
        }
      };
    }

    // u1 - Empty State
    return {
      user,
      subscription: null,
      usage: {
        kb_files: { used: 0, limit: 100, percentage: 0 },
        vocab_terms: 0,
        notes: 0
      }
    };
  }

  public getStats(userId: string): CallStats {
    if (userId === "u2") {
      const totalSessions = this.u2Calls.length;
      const totalDuration = this.u2Calls.reduce((sum, c) => sum + c.total_duration_seconds, 0);
      const averageDuration = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;
      const totalAIInteractions = this.u2Calls.reduce((sum, c) => sum + c.ai_interactions, 0);
      
      // Get last 3 dates
      const lastSession = this.u2Calls.slice(0, 3).map(c => c.started_at);

      return {
        totalSessions,
        averageDuration,
        totalAIInteractions,
        lastSession
      };
    }

    // u1 - Empty State
    return {
      totalSessions: 0,
      averageDuration: 0,
      totalAIInteractions: 0,
      lastSession: []
    };
  }

  public getCallHistory(userId: string, limit: number = 10, page: number = 1): CallHistoryResponse {
    if (userId === "u2") {
      const totalCount = this.u2Calls.length;
      const totalPages = Math.max(1, Math.ceil(totalCount / limit));
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const callSessions = this.u2Calls.slice(startIndex, endIndex);

      return {
        callSessions,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      };
    }

    // u1 - Empty State
    return {
      callSessions: [],
      pagination: {
        page: 1,
        limit,
        totalCount: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  }
}
