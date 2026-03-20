"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface FaqItem {
  question: string;
  answer: PortableTextBlock[];
}

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((faq, index) => (
        <div
          key={index}
          className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
            openIndex === index
              ? "border-brand-200 bg-brand-50/40 shadow-sm"
              : "border-warm-300 bg-white hover:border-brand-200"
          }`}
        >
          <button
            className="w-full flex items-center justify-between p-6 md:p-7 text-left focus:outline-none"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-semibold text-base md:text-lg text-warm-800 pr-4">{faq.question}</span>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180 text-brand-500" : "text-warm-500"
              }`}
            />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="px-6 md:px-7 pb-7 pt-0 text-warm-700 leading-relaxed text-base portable-text">
              <PortableText
                value={faq.answer}
                components={{
                  block: {
                    normal: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  },
                  list: {
                    bullet: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                  },
                  listItem: {
                    bullet: ({ children }) => <li>{children}</li>,
                  },
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
