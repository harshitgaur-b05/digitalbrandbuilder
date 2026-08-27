"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  label: string;
  type: "heading" | "subheading";
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const headingEls = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="bg-white border border-[#20211D]/6 rounded-2xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-[#20211D]/6">
        <p className="text-[10px] font-bold tracking-widest text-[#20211D] uppercase">
          On this page
        </p>
      </div>

      {/* Scrollable list */}
      <nav
        className="px-3 py-3 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 22rem)" }}
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`
                flex items-start gap-2 py-1.5 px-2 rounded-lg text-sm leading-snug
                transition-all duration-150 group
                ${item.type === "subheading" ? "pl-5" : ""}
                ${
                  isActive
                    ? "bg-[#A0AD91]/10 text-[#20211D] font-semibold"
                    : "text-[#5A5D55] hover:text-[#20211D] hover:bg-[#F3F1EB]"
                }
              `}
            >
              {/* Active indicator bar */}
              <span
                className={`mt-[0.35rem] shrink-0 w-[2px] h-[0.85rem] rounded-full transition-all duration-200 ${
                  isActive ? "bg-[#7E8E71]" : "bg-transparent group-hover:bg-[#A0AD91]/40"
                }`}
              />
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
