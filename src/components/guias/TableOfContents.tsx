import type { TocItem } from "./GuideBody";

export default function TableOfContents({ items, title }: { items: TocItem[]; title: string }) {
  if (items.length === 0) return null;

  return (
    <div className="bg-[#F4F6F9] rounded-2xl p-5 sticky top-24">
      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-3">{title}</p>
      <nav>
        <ol className="space-y-2.5">
          {items.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-sm text-[#374151] hover:text-[#B8935A] transition-colors flex items-start gap-2"
              >
                <span className="text-[#B8935A] text-xs mt-0.5">{i + 1}.</span>
                <span>{item.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
