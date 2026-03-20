import { Hero } from "@/components/sections/Hero";
import { TrustSection } from "@/components/sections/TrustSection";
import { ValueProp } from "@/components/sections/ValueProp";
import { Process } from "@/components/sections/Process";
import { AudiencePathways } from "@/components/sections/AudiencePathways";
import { CertificatesIntro } from "@/components/sections/CertificatesIntro";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* 1. Hero — OSSD diploma, primary offer, lead form */}
        <Hero />

        {/* 2. Trust — TVO ILC authorization & credibility */}
        <TrustSection />

        {/* 3. Value Props — diploma benefits */}
        <ValueProp />

        {/* 4. Process — how the diploma pathway works */}
        <Process />

        {/* 5. Audience Pathways — 2-card segment selector */}
        <AudiencePathways />

        {/* 6. Certificates Intro — Ontario Tech / Brilliant Catalyst programs */}
        <CertificatesIntro />
      </main>
    </div>
  );
}
