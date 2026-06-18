import { createServiceClient } from "@/lib/supabase";

export interface DailyCount {
  date: string;
  count: number;
}

export interface TableStats<T> {
  total: number;
  recent: T[];
  daily: DailyCount[];
}

const DAYS = 14;
const RECENT_LIMIT = 8;

async function getTableStats<T>(table: string, selectCols: string): Promise<TableStats<T>> {
  const db = createServiceClient();
  const since = new Date();
  since.setDate(since.getDate() - DAYS);

  const [{ count }, { data: recent }, { data: dailyRows }] = await Promise.all([
    db.from(table).select("*", { count: "exact", head: true }),
    db.from(table).select(selectCols).order("created_at", { ascending: false }).limit(RECENT_LIMIT),
    db.from(table).select("created_at").gte("created_at", since.toISOString()),
  ]);

  const buckets: Record<string, number> = {};
  for (let i = 0; i < DAYS; i++) {
    const d = new Date();
    d.setDate(d.getDate() - (DAYS - 1 - i));
    buckets[d.toISOString().slice(0, 10)] = 0;
  }
  for (const row of dailyRows || []) {
    const day = (row as { created_at: string }).created_at.slice(0, 10);
    if (day in buckets) buckets[day] += 1;
  }

  return {
    total: count || 0,
    recent: (recent || []) as T[],
    daily: Object.entries(buckets).map(([date, c]) => ({ date, count: c })),
  };
}

export interface LeadRow {
  name: string;
  email: string;
  country: string;
  objective: string;
  language: string;
  created_at: string;
}

export interface SubscriberRow {
  name: string | null;
  email: string;
  language: string;
  source: string;
  created_at: string;
}

export interface DownloadRow {
  name: string | null;
  email: string;
  country: string | null;
  language: string;
  created_at: string;
}

export interface ToolLeadRow {
  tool: string;
  name: string | null;
  email: string;
  language: string;
  created_at: string;
}

export async function getDashboardStats() {
  const [leads, subscribers, downloads, toolLeads] = await Promise.all([
    getTableStats<LeadRow>("leads", "name,email,country,objective,language,created_at"),
    getTableStats<SubscriberRow>("subscribers", "name,email,language,source,created_at"),
    getTableStats<DownloadRow>("downloads", "name,email,country,language,created_at"),
    getTableStats<ToolLeadRow>("tool_leads", "tool,name,email,language,created_at"),
  ]);
  return { leads, subscribers, downloads, toolLeads };
}
