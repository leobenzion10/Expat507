import MiniBarChart from "./MiniBarChart";
import type { DailyCount } from "@/lib/admin/stats";

export default function StatCard({
  label,
  total,
  daily,
}: {
  label: string;
  total: number;
  daily: DailyCount[];
}) {
  const last14Total = daily.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-1">{label}</p>
      <p className="text-3xl font-semibold text-[#0B1A17] mb-3" style={{ fontFamily: "var(--font-display)" }}>
        {total.toLocaleString()}
      </p>
      <MiniBarChart data={daily} />
      <p className="text-xs text-[#9CA3AF] mt-2">{last14Total} en los últimos 14 días</p>
    </div>
  );
}
