import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { useLocale } from "next-intl";
import { ReactNode } from "react";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn
    ? "Terms and Conditions | Catalyst Education"
    : "Kullanım Koşulları | Catalyst Education";
  const description = isEn
    ? "Web sitesi ve hizmet kullanım koşullarımız."
    : "Read the terms and conditions governing the use of Catalyst Education's platform and services.";
  const url = `${SITE_URL}/${locale}/terms`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { tr: `${SITE_URL}/tr/terms`, en: `${SITE_URL}/en/terms` },
    },
    openGraph: {
      title, description, url,
      siteName: "Catalyst Education",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: ogImage(title),
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage(title)[0].url] },
  };
}

// ─── Shared primitives ────────────────────────────────────────────────────────

const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className="text-3xl md:text-4xl font-extrabold text-warm-800 mb-2 leading-tight">{children}</h1>
);
const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-xl font-bold text-warm-800 mt-12 mb-3 pb-2 border-b border-warm-300">{children}</h2>
);
const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-base font-semibold text-warm-800 mt-6 mb-2">{children}</h3>
);
const P = ({ children }: { children: ReactNode }) => (
  <p className="text-[15px] text-warm-700 leading-relaxed mb-3">{children}</p>
);
const UL = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>
);
const LI = ({ children }: { children: ReactNode }) => (
  <li className="text-[15px] text-warm-700 leading-relaxed">{children}</li>
);
const B = ({ children }: { children: ReactNode }) => (
  <span className="font-semibold text-warm-800">{children}</span>
);
const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} className="text-brand-500 hover:text-brand-400 underline" target="_blank" rel="noopener noreferrer">{children}</a>
);
const ContactBox = ({ children }: { children: ReactNode }) => (
  <div className="bg-warm-100 border border-warm-300 rounded-2xl p-6 text-[15px] text-warm-700 leading-relaxed space-y-1 my-6">
    {children}
  </div>
);

// ─── Turkish content ──────────────────────────────────────────────────────────

function TermsTR() {
  return (
    <article>
      <H1>Kullanım Koşulları</H1>
      <p className="text-sm text-warm-500 mb-2">Son Güncelleme: 26 Mart 2026</p>
      <ContactBox>
        <p><B>Şirket:</B> Catalyst Education &amp; Research Inc.</p>
        <p>📍 173 Kingston Rd, Toronto, ON M4L 1T4, Kanada</p>
        <p>📧 info@catalysteducation.ca</p>
        <p>🌐 <A href="https://www.catalysteducation.ca/">catalysteducation.ca</A></p>
      </ContactBox>

      <H2>1. Taraflar ve Kapsam</H2>
      <P>Bu Kullanım Koşulları ("Koşullar"), Catalyst Education &amp; Research Inc. ("Catalyst Education", "biz", "şirket") ile <A href="https://www.catalysteducation.ca/">https://www.catalysteducation.ca/</A> adresindeki web sitesini ve sunulan hizmetleri kullanan bireyler ("Kullanıcı", "siz") arasındaki ilişkiyi düzenlemektedir.</P>
      <P>Web sitemizi ziyaret etmek, başvuru formlarını doldurmak veya herhangi bir hizmetimizden yararlanmak suretiyle bu Koşulları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz. Bu Koşulları kabul etmiyorsanız lütfen web sitemizi ve hizmetlerimizi kullanmayınız.</P>

      <H2>2. Hizmetlerin Tanımı</H2>
      <P>Catalyst Education; Ontario Secondary School Diploma (OSSD) programını ve buna bağlı eğitim hizmetlerini Türkiye'deki öğrencilere ve ailelerine sunmaktadır. Sunulan hizmetler şunları kapsar:</P>
      <UL>
        <LI>Ontario Ortaöğretim Diploma (OSSD) programına kayıt ve danışmanlık</LI>
        <LI>Eğitim danışmanlığı ve kariyer rehberliği</LI>
        <LI>Çevrimiçi ve yüz yüze kurs içerikleri</LI>
        <LI>Öğrenci takip ve akademik destek hizmetleri</LI>
        <LI>Bilgi amaçlı web sitesi içerikleri</LI>
      </UL>
      <P>Catalyst Education, hizmet kapsamını önceden bildirmeksizin güncelleme, genişletme veya daraltma hakkını saklı tutar.</P>

      <H2>3. Kullanım Koşulları</H2>
      <H3>3.1 Kabul Yaşı</H3>
      <P>Web sitemiz ve hizmetlerimiz 18 yaşını doldurmuş bireyler için tasarlanmıştır. 18 yaş altı bireyler yalnızca bir ebeveyn veya yasal vasi gözetiminde ve onayıyla hizmetlerimizden yararlanabilir. Veliler adına yapılan başvurularda, başvuruyu yapan kişinin velayete yetkili olduğu kabul edilir.</P>

      <H3>3.2 Doğru Bilgi Sağlama</H3>
      <P>Kullanıcılar, başvuru formları ve iletişim kanalları aracılığıyla sağladıkları bilgilerin doğru, güncel ve eksiksiz olduğunu beyan eder. Yanlış veya yanıltıcı bilgi sağlanması halinde Catalyst Education, hizmet sunumunu askıya alma veya sonlandırma hakkını saklı tutar.</P>

      <H3>3.3 Hesap Güvenliği</H3>
      <P>Öğrenci portalı veya çevrimiçi platformlara erişim için kullanıcı adı ve şifre oluşturulması durumunda, bu bilgilerin güvenliğini sağlamak kullanıcının sorumluluğundadır. Hesabınızla gerçekleştirilen tüm işlemler size ait kabul edilir.</P>

      <H2>4. Fikri Mülkiyet Hakları</H2>
      <P>Web sitesindeki tüm içerikler (metin, görsel, logo, video, kurs materyalleri, tasarım vb.) Catalyst Education &amp; Research Inc.'e veya lisans verenlerine aittir ve telif hakkı, ticari marka ile diğer fikri mülkiyet yasalarıyla korunmaktadır.</P>
      <P>Kullanıcılar şu kullanımlar için önceden yazılı izin almak zorundadır:</P>
      <UL>
        <LI>İçeriklerin ticari amaçla kullanımı</LI>
        <LI>İçeriklerin kopyalanması, çoğaltılması veya dağıtılması</LI>
        <LI>Türev çalışma oluşturulması</LI>
      </UL>
      <P>Kişisel ve eğitim amacıyla yapılan sınırlı alıntılar için kaynak gösterilmesi yeterlidir.</P>

      <H2>5. Yasaklı Kullanımlar</H2>
      <P>Kullanıcılar aşağıdaki eylemleri gerçekleştirmemeyi kabul eder:</P>
      <UL>
        <LI>Web sitesine yetkisiz erişim sağlamak veya sağlamaya çalışmak</LI>
        <LI>Zararlı yazılım, virüs veya benzeri kodlar yüklemek</LI>
        <LI>Diğer kullanıcıların hizmetlere erişimini engellemek</LI>
        <LI>Yanıltıcı, hakaret içeren veya yasadışı içerik paylaşmak</LI>
        <LI>Catalyst Education'ın itibarına zarar verebilecek eylemlerde bulunmak</LI>
        <LI>Hizmetlerin işleyişini bozacak teknik saldırılar düzenlemek (DDoS, scraping, vb.)</LI>
        <LI>Başka bir kişi veya kurum adına hareket etmek</LI>
      </UL>

      <H2>6. Ödeme ve İptal Koşulları</H2>
      <H3>6.1 Ücretlendirme</H3>
      <P>Hizmet ücretleri kayıt sırasında açıkça belirtilir. Tüm ödemeler, belirtilen para birimi (CAD veya TRY) üzerinden gerçekleştirilir. Kur farklılıklarından doğabilecek ek maliyetler kullanıcıya aittir.</P>

      <H3>6.2 İptal ve İade</H3>
      <P>İptal ve iade koşulları, kayıt aşamasında imzalanan öğrenci sözleşmesinde ayrıntılı olarak belirtilmektedir. Genel ilkeler:</P>
      <UL>
        <LI>Programa başlamadan önce yapılan iptallerde, şirket politikasına göre kısmi iade yapılabilir.</LI>
        <LI>Program başladıktan sonra yapılan iptallerde iade yapılmaz; ancak istisnai durumlar için Catalyst Education'a yazılı başvuru yapılabilir.</LI>
        <LI>Teknik aksaklık kaynaklı kesintilerde telafi mekanizmaları devreye alınır.</LI>
      </UL>

      <H2>7. Sorumluluğun Sınırlandırılması</H2>
      <P>Catalyst Education, aşağıdaki durumlardan kaynaklanan zararlardan sorumlu tutulamaz:</P>
      <UL>
        <LI>Kullanıcının yanlış ya da eksik bilgi sağlamasından doğan sonuçlar</LI>
        <LI>Üçüncü taraf web sitelerinin içerik veya uygulamaları</LI>
        <LI>Mücbir sebep halleri (doğal afet, siber saldırı, pandemi vb.)</LI>
        <LI>İnternet bağlantısı veya kullanıcı cihazından kaynaklanan teknik sorunlar</LI>
        <LI>Kullanıcının bu Koşulları ihlal etmesinden doğan zararlar</LI>
      </UL>
      <P>Catalyst Education'ın toplam sorumluluğu, ilgili hizmet için kullanıcının ödediği tutarı hiçbir koşulda aşamaz.</P>

      <H2>8. Üçüncü Taraf Bağlantıları</H2>
      <P>Web sitemiz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu bağlantılar yalnızca bilgi amaçlıdır. Catalyst Education, bu sitelerin içeriği, gizlilik politikaları veya uygulamalarından sorumlu değildir.</P>

      <H2>9. Değişiklikler</H2>
      <P>Catalyst Education, bu Koşulları zaman zaman güncelleme hakkını saklı tutar. Önemli değişiklikler web sitesi üzerinden veya kayıtlı e-posta adresinize duyurulacaktır. Değişiklik sonrası hizmetleri kullanmaya devam etmeniz, güncellenmiş Koşulları kabul ettiğiniz anlamına gelir.</P>

      <H2>10. Geçerli Hukuk ve Uyuşmazlık Çözümü</H2>
      <P>Bu Koşullar, Ontario eyaleti ve Kanada federal yasaları çerçevesinde yorumlanır. Taraflar arasında doğabilecek uyuşmazlıklarda önce müzakere, akabinde arabuluculuk yoluna başvurulması esastır. Çözüm sağlanamaması halinde Toronto, Ontario'daki yetkili mahkemeler yetkilidir.</P>
      <P>Türk kullanıcılar, bu Koşulların Türk tüketici mevzuatından doğan haklarını kısıtlamadığını bilmelidir.</P>

      <H2>11. İletişim</H2>
      <ContactBox>
        <p><B>Catalyst Education &amp; Research Inc.</B></p>
        <p>📍 173 Kingston Rd, Toronto, ON M4L 1T4, Kanada</p>
        <p>📧 info@catalysteducation.ca</p>
        <p>🌐 <A href="https://www.catalysteducation.ca/">catalysteducation.ca</A></p>
      </ContactBox>
    </article>
  );
}

// ─── English content ──────────────────────────────────────────────────────────

function TermsEN() {
  return (
    <article>
      <H1>Terms and Conditions</H1>
      <p className="text-sm text-warm-500 mb-2">Last Updated: March 26, 2026</p>
      <ContactBox>
        <p><B>Company:</B> Catalyst Education &amp; Research Inc.</p>
        <p>📍 173 Kingston Rd, Toronto, ON M4L 1T4, Canada</p>
        <p>📧 info@catalysteducation.ca</p>
        <p>🌐 <A href="https://www.catalysteducation.ca/">catalysteducation.ca</A></p>
      </ContactBox>

      <H2>1. Parties and Scope</H2>
      <P>These Terms and Conditions ("Terms") govern the relationship between Catalyst Education &amp; Research Inc. ("Catalyst Education", "we", "us", "our") and individuals ("User", "you") who access <A href="https://www.catalysteducation.ca/">https://www.catalysteducation.ca/</A> or use any of our services.</P>
      <P>By visiting our website, completing application forms, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.</P>

      <H2>2. Description of Services</H2>
      <P>Catalyst Education provides the Ontario Secondary School Diploma (OSSD) program and related educational services to students and families in Türkiye. Services include:</P>
      <UL>
        <LI>Enrolment and advisory services for the Ontario Secondary School Diploma (OSSD) program</LI>
        <LI>Educational consulting and career guidance</LI>
        <LI>Online and in-person course content delivery</LI>
        <LI>Student progress tracking and academic support</LI>
        <LI>Informational website content</LI>
      </UL>
      <P>Catalyst Education reserves the right to update, expand, or modify the scope of services at any time with reasonable notice.</P>

      <H2>3. Terms of Use</H2>
      <H3>3.1 Age Requirement</H3>
      <P>Our website and services are designed for individuals who are 18 years of age or older. Individuals under 18 may only use our services under the supervision and with the consent of a parent or legal guardian. Where applications are submitted on behalf of a minor, the submitting party represents that they have the legal authority to do so.</P>

      <H3>3.2 Accuracy of Information</H3>
      <P>Users represent that all information provided through application forms and communication channels is accurate, current, and complete. In the event of false or misleading information, Catalyst Education reserves the right to suspend or terminate service provision.</P>

      <H3>3.3 Account Security</H3>
      <P>Where usernames and passwords are created to access the student portal or online platforms, users are responsible for maintaining the confidentiality of their credentials. All activity conducted through your account will be attributed to you.</P>

      <H2>4. Intellectual Property Rights</H2>
      <P>All content on the website (text, images, logos, videos, course materials, designs, etc.) is the property of Catalyst Education &amp; Research Inc. or its licensors and is protected by copyright, trademark, and other intellectual property laws.</P>
      <P>Users must obtain prior written permission for:</P>
      <UL>
        <LI>Commercial use of any content</LI>
        <LI>Copying, reproducing, or distributing content</LI>
        <LI>Creating derivative works</LI>
      </UL>
      <P>Limited quotation for personal or educational purposes is permitted provided that proper attribution is given.</P>

      <H2>5. Prohibited Uses</H2>
      <P>Users agree not to:</P>
      <UL>
        <LI>Access or attempt to access the website in an unauthorized manner</LI>
        <LI>Upload malicious software, viruses, or similar code</LI>
        <LI>Prevent other users from accessing services</LI>
        <LI>Share misleading, defamatory, or unlawful content</LI>
        <LI>Engage in conduct that could damage Catalyst Education's reputation</LI>
        <LI>Conduct technical attacks on the service (DDoS, scraping, etc.)</LI>
        <LI>Act on behalf of another person or organization without authorization</LI>
      </UL>

      <H2>6. Fees and Cancellation</H2>
      <H3>6.1 Pricing</H3>
      <P>Service fees are clearly stated at the time of enrolment. All payments are processed in the currency specified (CAD or TRY). Any additional costs arising from currency fluctuations are the responsibility of the user.</P>

      <H3>6.2 Cancellations and Refunds</H3>
      <P>Cancellation and refund conditions are detailed in the student agreement signed at enrolment. General principles:</P>
      <UL>
        <LI>Cancellations prior to program commencement may be eligible for a partial refund in accordance with company policy.</LI>
        <LI>No refunds are issued following program commencement; however, exceptional circumstances may be considered upon written request to Catalyst Education.</LI>
        <LI>Service interruptions caused by technical failures will be addressed through compensatory mechanisms.</LI>
      </UL>

      <H2>7. Limitation of Liability</H2>
      <P>Catalyst Education shall not be liable for damages arising from:</P>
      <UL>
        <LI>Consequences of inaccurate or incomplete information provided by the user</LI>
        <LI>Content or practices of third-party websites</LI>
        <LI>Force majeure events (natural disasters, cyberattacks, pandemics, etc.)</LI>
        <LI>Technical issues arising from internet connectivity or user devices</LI>
        <LI>Damages arising from the user's breach of these Terms</LI>
      </UL>
      <P>In no event shall Catalyst Education's total liability exceed the amount paid by the user for the relevant service.</P>

      <H2>8. Third-Party Links</H2>
      <P>Our website may contain links to third-party websites. These links are provided for informational purposes only. Catalyst Education is not responsible for the content, privacy policies, or practices of those sites.</P>

      <H2>9. Modifications</H2>
      <P>Catalyst Education reserves the right to update these Terms from time to time. Significant changes will be communicated via the website or to your registered email address. Your continued use of the services following any update constitutes acceptance of the revised Terms.</P>

      <H2>10. Governing Law and Dispute Resolution</H2>
      <P>These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada. In the event of a dispute, the parties shall first seek resolution through negotiation and, if necessary, mediation. If resolution cannot be reached, the courts of Toronto, Ontario shall have jurisdiction.</P>
      <P>Users in Türkiye should be aware that these Terms do not limit any rights they may have under applicable Turkish consumer protection legislation.</P>

      <H2>11. Contact</H2>
      <ContactBox>
        <p><B>Catalyst Education &amp; Research Inc.</B></p>
        <p>📍 173 Kingston Rd, Toronto, ON M4L 1T4, Canada</p>
        <p>📧 info@catalysteducation.ca</p>
        <p>🌐 <A href="https://www.catalysteducation.ca/">catalysteducation.ca</A></p>
      </ContactBox>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  const locale = useLocale();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-warm-50">
        <div className="container mx-auto px-4 md:px-6 max-w-[860px] py-16 md:py-24">
          {locale === "tr" ? <TermsTR /> : <TermsEN />}
        </div>
      </main>
    </div>
  );
}
