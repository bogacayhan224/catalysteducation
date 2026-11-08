import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import type { turkishGuides } from "@/lib/turkish-guides";

export function TurkishGuideCard({
  guide,
  heading: Heading = "h2",
  locale = "tr",
}: {
  guide: (typeof turkishGuides)[number];
  heading?: "h2" | "h3";
  locale?: "tr" | "en";
}) {
  return (
    <Link
      href={guide.href}
      className="group flex flex-col bg-white border border-warm-300 rounded-3xl p-7 hover:shadow-md hover:border-warm-400 transition-all"
    >
      <div className="flex items-center flex-wrap gap-2 justify-between mb-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-100 px-3 py-1 text-xs font-semibold text-brand-500">
          <BookOpen className="h-3 w-3" />
          {guide.tag}
        </span>
        <span className="flex items-center gap-1 text-xs text-warm-700">
          <Clock className="h-3 w-3" />
          {guide.readTime}
        </span>
      </div>

      <Heading className="text-lg font-bold text-warm-800 leading-snug mb-3 group-hover:text-brand-500 transition-colors">
        {guide.title}
      </Heading>

      <p className="text-sm text-warm-600 leading-relaxed flex-1 mb-6">
        {guide.description}
      </p>

      <div className="flex items-center flex-wrap gap-2 justify-between pt-5 border-t border-warm-200">
        <span className="text-xs text-warm-700">{guide.date}</span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 group-hover:gap-2 transition-all">
          {locale === "tr" ? "Rehberi oku" : "Read guide"}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
