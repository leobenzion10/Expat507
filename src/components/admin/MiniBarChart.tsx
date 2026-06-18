import type { DailyCount } from "@/lib/admin/stats";

export default function MiniBarChart({ data }: { data: DailyCount[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((d) => (
        <div
          key={d.date}
          title={`${d.date}: ${d.count}`}
          className="flex-1 h-full flex items-end"
        >
          <div
            className="w-full bg-[#B8935A] rounded-sm transition-all"
            style={{ height: d.count > 0 ? `${Math.max(8, (d.count / max) * 100)}%` : "2px" }}
          />
        </div>
      ))}
    </div>
  );
}
