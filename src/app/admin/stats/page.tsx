import type { Metadata } from "next";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getDashboardStats } from "@/lib/admin/stats";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import LogoutButton from "@/components/admin/LogoutButton";
import StatCard from "@/components/admin/StatCard";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin — Expat507",
  robots: { index: false, follow: false },
};

function RecentTable({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: string[];
  rows: Record<string, unknown>[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <p className="text-sm font-semibold text-[#0B1A17] mb-4">{title}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-[#9CA3AF]">Sin registros todavía.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                {columns.map((c) => (
                  <th key={c} className="text-left py-2 pr-4 font-semibold text-[#6B7280] whitespace-nowrap">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  {columns.map((c) => (
                    <td key={c} className="py-2 pr-4 text-[#374151] whitespace-nowrap max-w-[180px] truncate">
                      {String(row[c] ?? "—")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default async function AdminStatsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) return <AdminLoginForm />;

  const stats = await getDashboardStats();

  const toolCounts = stats.toolLeads.recent.reduce<Record<string, number>>((acc, r) => {
    acc[r.tool] = (acc[r.tool] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#F4F6F9] pt-10 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#0B1A17]" style={{ fontFamily: "var(--font-display)" }}>
              Dashboard — Expat507
            </h1>
            <p className="text-sm text-[#6B7280]">Actualizado al cargar esta página.</p>
          </div>
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard label="Consultas" total={stats.leads.total} daily={stats.leads.daily} />
          <StatCard label="Suscriptores" total={stats.subscribers.total} daily={stats.subscribers.daily} />
          <StatCard label="Descargas de guía" total={stats.downloads.total} daily={stats.downloads.daily} />
          <StatCard label="Uso de herramientas" total={stats.toolLeads.total} daily={stats.toolLeads.daily} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <RecentTable
            title="Últimas consultas"
            columns={["Nombre", "Email", "País", "Objetivo", "Idioma"]}
            rows={stats.leads.recent.map((r) => ({
              Nombre: r.name,
              Email: r.email,
              País: r.country,
              Objetivo: r.objective,
              Idioma: r.language,
            }))}
          />
          <RecentTable
            title="Últimos suscriptores"
            columns={["Nombre", "Email", "Origen", "Idioma"]}
            rows={stats.subscribers.recent.map((r) => ({
              Nombre: r.name || "—",
              Email: r.email,
              Origen: r.source,
              Idioma: r.language,
            }))}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <RecentTable
            title="Últimas descargas de guía"
            columns={["Nombre", "Email", "País", "Idioma"]}
            rows={stats.downloads.recent.map((r) => ({
              Nombre: r.name || "—",
              Email: r.email,
              País: r.country || "—",
              Idioma: r.language,
            }))}
          />
          <RecentTable
            title="Últimos usos de herramientas"
            columns={["Herramienta", "Nombre", "Email", "Idioma"]}
            rows={stats.toolLeads.recent.map((r) => ({
              Herramienta: r.tool,
              Nombre: r.name || "—",
              Email: r.email,
              Idioma: r.language,
            }))}
          />
        </div>

        {Object.keys(toolCounts).length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <p className="text-sm font-semibold text-[#0B1A17] mb-4">Herramientas más usadas (últimos registros)</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(toolCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([tool, count]) => (
                  <div key={tool} className="bg-[#FBF6EC] border border-[#B8935A]/20 rounded-xl px-4 py-2 text-sm">
                    <span className="font-semibold text-[#0B1A17]">{tool}</span>{" "}
                    <span className="text-[#6B7280]">× {count}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        <p className="text-xs text-[#9CA3AF] mt-8 text-center">
          {formatDate(new Date().toISOString(), "es")} · Expat507 Admin
        </p>
      </div>
    </div>
  );
}
