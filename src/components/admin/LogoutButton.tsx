"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-[#6B7280] hover:text-[#0B1A17] font-medium transition-colors"
    >
      Cerrar sesión
    </button>
  );
}
