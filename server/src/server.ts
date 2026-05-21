import express, { Request, Response } from "express";
import cors from "cors";
import { MockDataStore } from "./dataGenerator";

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all requests so our React frontend can query us
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-user-id"]
}));

app.use(express.json());

// Initialize our mock data store
const store = new MockDataStore();

// Helper to extract x-user-id header
function getUserId(req: Request): string {
  const userId = req.headers["x-user-id"];
  if (typeof userId === "string" && (userId === "u1" || userId === "u2")) {
    return userId;
  }
  return "u1"; // default to u1 as specified in variable configurations
}

// 1. Health check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", service: "Hintro Mock API Server" });
});

// 2. Get Profile
app.get("/api/auth/profile", (req: Request, res: Response) => {
  const userId = getUserId(req);
  const profile = store.getProfile(userId);
  console.log(`[API] GET /api/auth/profile for User: ${userId}`);
  res.status(200).json(profile);
});

// 3. Get Dashboard
app.get("/api/auth/dashboard", (req: Request, res: Response) => {
  const userId = getUserId(req);
  const dashboard = store.getDashboard(userId);
  console.log(`[API] GET /api/auth/dashboard for User: ${userId}`);
  res.status(200).json(dashboard);
});

// 4. Get Call Session Stats
app.get("/api/call-sessions/stats", (req: Request, res: Response) => {
  const userId = getUserId(req);
  const stats = store.getStats(userId);
  console.log(`[API] GET /api/call-sessions/stats for User: ${userId}`);
  res.status(200).json(stats);
});

// 5. Get Call History (with limit and pagination)
app.get("/api/call-sessions", (req: Request, res: Response) => {
  const userId = getUserId(req);
  const limit = parseInt(req.query.limit as string) || 10;
  const page = parseInt(req.query.page as string) || 1;
  
  const callHistory = store.getCallHistory(userId, limit, page);
  console.log(`[API] GET /api/call-sessions?limit=${limit}&page=${page} for User: ${userId}`);
  res.status(200).json(callHistory);
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🚀 Hintro Mock Server is running on port ${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/health`);
  console.log(`=================================================`);
});
