"use client";

import { Shield, Clock, MessageCircle } from "lucide-react";
import { LeadForm } from "@/components/sections/LeadForm";

const TRUST_ITEMS = [
  { icon: Clock, text: "24 saat içinde dönüş" },
  { icon: Shield, text: "Kişisel verileriniz güvende" },
  { icon: MessageCircle, text: "WhatsApp desteği mevcut" },
];

export default function BilgiAlPage() {
  return (
    <div className="min-h-screen bg-warm-100 flex flex-col">
      <main className="flex-1 flex flex-col">

        {/* ── Hero strip ─────────────────────────────────────── */}
        <section
          className="py-10 text-white text-center"
          style={{ background: "linear-gradient(135deg, #5A0F1A 0%, #8B1E2D 60%, #B33A4A 100%)" }}
        >
          <div className="px-4 max-w-lg mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
              Kanada Lise Diploması Hakkında Bilgi Al
            </h1>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Formu doldurun, uzmanlarımız size özel bilgi paketi ile 24 saat içinde ulaşsın.
            </p>
          </div>
        </section>

        {/* ── Form area ──────────────────────────────────────── */}
        <section className="flex-1 py-8 px-4">
          <div className="max-w-lg mx-auto w-full">

            {/* Trust mini-bar */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6">
              {TRUST_ITEMS.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-xs text-warm-600 font-medium">
                  <Icon className="h-3.5 w-3.5 text-trust-500 flex-shrink-0" />
                  {text}
                </span>
              ))}
            </div>

            <LeadForm
              redirectTo="/tr/tesekkurler"
              defaultProgramType="diploma"
              requireEmail
              requireGrade
            />

            <p className="text-center text-xs text-warm-500 mt-4 leading-relaxed">
              Bilgi talebiniz{" "}
              <span className="font-medium text-warm-600">tamamen ücretsizdir</span>
              {" "}ve size herhangi bir yükümlülük doğurmaz.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}
