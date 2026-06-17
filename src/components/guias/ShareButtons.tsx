"use client";

import { useState } from "react";
import { Share2, Printer, Check } from "lucide-react";

export function ShareButtons({ title, label }: { title: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled or share failed — fall back to copy
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm text-[#374151] hover:text-[#C9A84C] transition-colors px-3 py-2 rounded-lg border border-gray-200 hover:border-[#C9A84C]"
    >
      {copied ? <Check size={15} className="text-[#C9A84C]" /> : <Share2 size={15} />}
      {label}
    </button>
  );
}

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 text-sm text-[#374151] hover:text-[#C9A84C] transition-colors px-3 py-2 rounded-lg border border-gray-200 hover:border-[#C9A84C]"
    >
      <Printer size={15} />
      {label}
    </button>
  );
}
