import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, bilgi talebimle ilgili görüşmek istiyorum."
);

const NEXT_STEPS = [
  "Uzmanlarımız bilgilerinizi inceleyecek.",
  "24 saat içinde sizi arayacak ya da mesaj atacağız.",
  "Size özel bir bilgi paketi hazırlayacağız.",
];

const LINKS = [
  { href: "/tr/kanada-lise-diplomasi", label: "Kanada Lise Diploması Sayfası" },
  { href: "/tr/ossd-cift-diploma", label: "Çift Diploma Programını İncele" },
  { href: "/tr/faq", label: "Sık Sorulan Sorular" },
];

export default function TesekkurlerPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <div className="min-h-screen bg-warm-100 flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-md mx-auto">

        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-[0_2px_16px_rgba(31,29,26,0.08)] border border-warm-300 p-8 text-center">

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="h-16 w-16 rounded-full bg-trust-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-trust-500" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl font-bold text-warm-800 mb-2">
            Talebiniz Alındı!
          </h1>
          <p className="text-warm-600 text-sm leading-relaxed mb-6">
            Formu doldurduğunuz için teşekkür ederiz. Ekibimiz en kısa sürede sizinle iletişime geçecek.
          </p>

          {/* Next steps */}
          <div className="bg-warm-100 rounded-2xl p-5 text-left mb-6">
            <p className="text-xs font-semibold text-warm-500 uppercase tracking-widest mb-3">
              Bundan sonra ne olacak?
            </p>
            <ol className="space-y-2">
              {NEXT_STEPS.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-warm-700">
                  <span className="h-5 w-5 rounded-full bg-trust-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 justify-center w-full h-12 rounded-full bg-trust-500 px-6 text-sm font-semibold text-white hover:bg-trust-600 transition-colors mb-3"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp ile İletişime Geç
          </a>
          <p className="text-xs text-warm-500">
            Genellikle birkaç dakika içinde yanıt veriyoruz.
          </p>
        </div>

        {/* Secondary links */}
        <div className="mt-6 space-y-2">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between w-full bg-white rounded-2xl border border-warm-300 px-5 py-3.5 text-sm font-medium text-warm-700 hover:bg-warm-200 hover:text-warm-800 transition-colors"
            >
              {label}
              <ArrowRight className="h-4 w-4 text-warm-400 flex-shrink-0" />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
