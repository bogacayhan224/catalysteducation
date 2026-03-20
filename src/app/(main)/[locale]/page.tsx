import { Hero } from "@/components/sections/Hero";
import { ValueProp } from "@/components/sections/ValueProp";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Hero />
        <ValueProp />
        <Process />
        <FAQ />
        <FinalCTA />
      </main>
    </div>
  );
}
