import { slugify } from "@/lib/slugify";

export interface TocItem {
  id: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_HEADING = /^(preguntas frecuentes|frequently asked questions)$/i;

export function extractFaq(content: string): FaqItem[] {
  const blocks = content.split("\n\n");
  const startIndex = blocks.findIndex((b) => b.startsWith("## ") && FAQ_HEADING.test(b.slice(3).trim()));
  if (startIndex === -1) return [];

  const items: FaqItem[] = [];
  let current: FaqItem | null = null;

  for (let i = startIndex + 1; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.startsWith("## ")) break; // next section — FAQ block ended
    if (block.startsWith("### ")) {
      if (current) items.push(current);
      current = { question: block.slice(4).trim(), answer: "" };
    } else if (current && block.trim()) {
      current.answer = current.answer ? `${current.answer} ${block.trim()}` : block.trim();
    }
  }
  if (current) items.push(current);

  return items;
}

export function buildToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      items.push({ id: slugify(text), text });
    }
  }
  return items;
}

function isTableBlock(block: string): boolean {
  const lines = block.split("\n").filter((l) => l.trim());
  return lines.length >= 2 && lines.every((l) => l.trim().startsWith("|"));
}

function renderTable(block: string, key: number) {
  const lines = block.split("\n").filter((l) => l.trim());
  const cells = (line: string) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());

  const header = cells(lines[0]);
  const rows = lines.slice(2).map(cells);

  return (
    <div key={key} className="overflow-x-auto mb-6 rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#0B1A17]">
            {header.map((h, i) => (
              <th key={i} className="text-left text-white font-semibold px-4 py-3 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F4F6F9]"}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 text-[#374151] align-top"
                  dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, "<strong class=\"text-[#0B1A17]\">$1</strong>") }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function renderGuideBody(content: string) {
  return content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      const text = block.slice(3).trim();
      return (
        <h2
          key={i}
          id={slugify(text)}
          className="text-2xl font-bold text-[#0B1A17] mt-10 mb-4 scroll-mt-28"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {text}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      const text = block.slice(4).trim();
      return (
        <h3
          key={i}
          id={slugify(text)}
          className="text-xl font-bold text-[#0B1A17] mt-8 mb-3 scroll-mt-28"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {text}
        </h3>
      );
    }
    if (isTableBlock(block)) {
      return renderTable(block, i);
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "));
      return (
        <ul key={i} className="space-y-2 mb-5">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-[#374151]">
              <span className="text-[#B8935A] mt-1 text-xs">✦</span>
              <span dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ul>
      );
    }
    if (block.startsWith("1. ")) {
      const items = block.split("\n").filter((l) => /^\d+\./.test(l));
      return (
        <ol key={i} className="space-y-2 mb-5 counter-reset-list">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-[#374151]">
              <span className="w-6 h-6 rounded-full bg-[#FBF6EC] text-[#B8935A] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {j + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            </li>
          ))}
        </ol>
      );
    }
    if (block.trim()) {
      return (
        <p
          key={i}
          className="text-[#374151] leading-relaxed mb-5"
          dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#0B1A17]">$1</strong>') }}
        />
      );
    }
    return null;
  });
}
