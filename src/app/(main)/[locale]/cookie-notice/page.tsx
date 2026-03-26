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
    ? "Cookie Notice | Catalyst Education"
    : "Çerez Bildirimi | Catalyst Education";
  const description = isEn
    ? "Information about the cookies used on our website."
    : "Web sitemizde kullandığımız çerezler hakkında bilgi.";
  const url = `${SITE_URL}/${locale}/cookie-notice`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        tr: `${SITE_URL}/tr/cookie-notice`,
        en: `${SITE_URL}/en/cookie-notice`,
      },
    },
    openGraph: {
      title, description, url,
      siteName: "Catalyst Education",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: ogImage(title),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage(title)[0].url],
    },
  };
}

// ─── Shared primitives ────────────────────────────────────────────────────────

const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className="text-3xl md:text-4xl font-extrabold text-warm-800 mb-2 leading-tight">
    {children}
  </h1>
);
const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-xl font-bold text-warm-800 mt-12 mb-3 pb-2 border-b border-warm-300">
    {children}
  </h2>
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
  <a
    href={href}
    className="text-brand-500 hover:text-brand-400 underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);
const Code = ({ children }: { children: ReactNode }) => (
  <code className="font-mono bg-warm-200 text-warm-800 px-1.5 py-0.5 rounded text-[13px]">
    {children}
  </code>
);
const Note = ({ children }: { children: ReactNode }) => (
  <div className="bg-warm-100 border-l-4 border-brand-500 pl-4 pr-4 py-3 my-4 rounded-r-lg">
    <p className="text-[14px] text-warm-700 leading-relaxed">{children}</p>
  </div>
);
const ContactBox = ({ children }: { children: ReactNode }) => (
  <div className="bg-warm-100 border border-warm-300 rounded-2xl p-6 text-[15px] text-warm-700 leading-relaxed space-y-1 my-6">
    {children}
  </div>
);
const Table = ({ children }: { children: ReactNode }) => (
  <div className="overflow-x-auto my-4">
    <table className="w-full text-[14px] border-collapse">{children}</table>
  </div>
);
const TH = ({ children }: { children: ReactNode }) => (
  <th className="bg-warm-200 text-warm-800 font-semibold text-left px-3 py-2 border border-warm-300 whitespace-nowrap">
    {children}
  </th>
);
const TD = ({ children }: { children: ReactNode }) => (
  <td className="text-warm-700 px-3 py-2 border border-warm-300 align-top">
    {children}
  </td>
);

// ─── Turkish content ──────────────────────────────────────────────────────────

function CookieNoticeTR() {
  return (
    <article>
      <H1>Çerez Bildirimi</H1>
      <p className="text-sm text-warm-500 mb-6">Son Güncelleme: 26 Mart 2026</p>

      <H2>1. Çerezler Hakkında</H2>
      <P>Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız tarafından cihazınıza (bilgisayar, tablet, akıllı telefon) kaydedilen küçük metin dosyalarıdır. Çerezler; web sitemizin düzgün çalışması, kullanıcı deneyiminin iyileştirilmesi ve ziyaretçi davranışlarının analiz edilmesi amacıyla kullanılmaktadır.</P>
      <P>Web sitemizi kullanarak <B>zorunlu çerezlerin</B> yerleştirilmesine onay vermiş olursunuz. Zorunlu olmayan çerezler için ise çerez banner'ı aracılığıyla açık onayınız alınmaktadır.</P>

      <H2>2. Kullandığımız Çerez Türleri</H2>

      <H3>2.1 Zorunlu Çerezler (Strictly Necessary)</H3>
      <P>Bu çerezler, web sitesinin temel işlevleri için gereklidir ve devre dışı bırakılamazlar. Herhangi bir kişisel bilgi saklamazlar.</P>
      <Table>
        <thead>
          <tr><TH>Çerez Adı</TH><TH>Amaç</TH><TH>Süre</TH></tr>
        </thead>
        <tbody>
          <tr>
            <TD><Code>session_id</Code></TD>
            <TD>Kullanıcı oturumunu tanımlar</TD>
            <TD>Oturum süresince</TD>
          </tr>
          <tr>
            <TD><Code>csrf_token</Code></TD>
            <TD>Güvenlik saldırılarına karşı koruma</TD>
            <TD>Oturum süresince</TD>
          </tr>
          <tr>
            <TD><Code>catalyst_consent</Code></TD>
            <TD>Çerez tercihlerinizi kaydeder</TD>
            <TD>12 ay</TD>
          </tr>
        </tbody>
      </Table>

      <H3>2.2 Tercih / İşlevsellik Çerezleri</H3>
      <P>Bu çerezler, dil tercihi ve kullanıcı arayüzü ayarları gibi tercihlerinizi hatırlar.</P>
      <Table>
        <thead>
          <tr><TH>Çerez Adı</TH><TH>Amaç</TH><TH>Süre</TH></tr>
        </thead>
        <tbody>
          <tr>
            <TD><Code>lang_pref</Code></TD>
            <TD>Dil tercihini kaydeder (TR/EN)</TD>
            <TD>12 ay</TD>
          </tr>
          <tr>
            <TD><Code>ui_settings</Code></TD>
            <TD>Ekran ve görüntüleme tercihlerini saklar</TD>
            <TD>6 ay</TD>
          </tr>
        </tbody>
      </Table>

      <H3>2.3 Analitik Çerezler</H3>
      <P>Web sitemizin nasıl kullanıldığını anlamamıza yardımcı olur. Bu veriler anonim veya takma ad kullanılarak işlenir.</P>
      <Table>
        <thead>
          <tr><TH>Araç</TH><TH>Amaç</TH><TH>Süre</TH><TH>Opt-out</TH></tr>
        </thead>
        <tbody>
          <tr>
            <TD>Google Analytics 4</TD>
            <TD>Sayfa görüntüleme, kullanıcı akışı, dönüşüm analizi</TD>
            <TD>13 ay</TD>
            <TD><A href="https://tools.google.com/dlpage/gaoptout">GA Opt-out</A></TD>
          </tr>
        </tbody>
      </Table>
      <Note>
        <B>IP Anonimleştirme:</B> Google Analytics kullanımında IP adresi anonimleştirme (<Code>anonymizeIp</Code>) etkin tutulmaktadır.
      </Note>

      <H3>2.4 Pazarlama / Hedefleme Çerezleri</H3>
      <P>Bu çerezler, ilgi alanlarınıza yönelik reklamlar göstermek ve pazarlama kampanyalarımızın etkinliğini ölçmek amacıyla kullanılır. Bu çerezler yalnızca <B>açık onayınızla</B> yerleştirilir.</P>
      <Table>
        <thead>
          <tr><TH>Araç</TH><TH>Amaç</TH><TH>Süre</TH></tr>
        </thead>
        <tbody>
          <tr>
            <TD>Meta Pixel (Facebook)</TD>
            <TD>Reklam performansı ölçümü ve yeniden hedefleme</TD>
            <TD>90 gün</TD>
          </tr>
          <tr>
            <TD>Google Ads (gclid)</TD>
            <TD>Reklam tıklaması ve dönüşüm takibi</TD>
            <TD>90 gün</TD>
          </tr>
        </tbody>
      </Table>

      <H2>3. Üçüncü Taraf Çerezleri</H2>
      <P>Web sitemiz, aşağıdaki üçüncü taraf hizmetleri içerebilir ve bu hizmetler kendi çerezlerini yerleştirebilir:</P>
      <UL>
        <LI><B>Google Analytics / Google Ads</B> — <A href="https://policies.google.com/privacy">Gizlilik Politikası</A></LI>
        <LI><B>Meta / Facebook Pixel</B> — <A href="https://www.facebook.com/privacy/policy/">Gizlilik Politikası</A></LI>
        <LI><B>YouTube (gömülü video)</B> — <A href="https://policies.google.com/privacy">Gizlilik Politikası</A></LI>
      </UL>
      <P>Bu üçüncü taraflar kendi gizlilik politikalarına tabidir ve bizim denetimimiz dışındadır.</P>

      <H2>4. Çerez Tercihlerinizi Yönetme</H2>

      <H3>4.1 Çerez Banner'ı</H3>
      <P>Web sitemizi ilk ziyaretinizde çerez tercihlerinizi belirlemeniz için bir banner görüntülenecektir. İstediğiniz zaman sayfanın alt bölümünde yer alan <B>"Çerez Tercihleri"</B> bağlantısına tıklayarak tercihlerinizi güncelleyebilirsiniz.</P>

      <H3>4.2 Tarayıcı Ayarları</H3>
      <P>Çerezleri tarayıcı ayarlarından yönetebilirsiniz:</P>
      <UL>
        <LI><B>Google Chrome:</B> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Diğer Site Verileri</LI>
        <LI><B>Mozilla Firefox:</B> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri</LI>
        <LI><B>Safari:</B> Tercihler &gt; Gizlilik &gt; Çerezleri ve Web Sitesi Verilerini Yönet</LI>
        <LI><B>Microsoft Edge:</B> Ayarlar &gt; Çerezler ve Site İzinleri</LI>
      </UL>
      <Note>
        <B>Dikkat:</B> Zorunlu çerezlerin devre dışı bırakılması, web sitesinin bazı işlevlerinin çalışmamasına yol açabilir.
      </Note>

      <H3>4.3 Google Analytics Opt-out</H3>
      <P>Google Analytics takibini tarayıcı düzeyinde devre dışı bırakmak için: <A href="https://tools.google.com/dlpage/gaoptout">tools.google.com/dlpage/gaoptout</A></P>

      <H2>5. Hukuki Dayanak</H2>
      <Table>
        <thead>
          <tr><TH>Çerez Türü</TH><TH>Hukuki Dayanak (KVKK)</TH><TH>Hukuki Dayanak (GDPR)</TH></tr>
        </thead>
        <tbody>
          <tr><TD>Zorunlu çerezler</TD><TD>Meşru menfaat (Md. 5/2-f)</TD><TD>Meşru menfaat (Art. 6/1-f)</TD></tr>
          <tr><TD>Tercih çerezleri</TD><TD>Açık rıza (Md. 5/1)</TD><TD>Rıza (Art. 6/1-a)</TD></tr>
          <tr><TD>Analitik çerezler</TD><TD>Açık rıza (Md. 5/1)</TD><TD>Rıza (Art. 6/1-a)</TD></tr>
          <tr><TD>Pazarlama çerezleri</TD><TD>Açık rıza (Md. 5/1)</TD><TD>Rıza (Art. 6/1-a)</TD></tr>
        </tbody>
      </Table>

      <H2>6. İletişim</H2>
      <ContactBox>
        <p><B>Catalyst Education &amp; Research Inc.</B></p>
        <p>📧 info@catalysteducation.ca</p>
        <p>🌐 <A href="https://www.catalysteducation.ca/">catalysteducation.ca</A></p>
      </ContactBox>
    </article>
  );
}

// ─── English content ──────────────────────────────────────────────────────────

function CookieNoticeEN() {
  return (
    <article>
      <H1>Cookie Notice</H1>
      <p className="text-sm text-warm-500 mb-6">Last Updated: March 26, 2026</p>

      <H2>1. About Cookies</H2>
      <P>Cookies are small text files that are saved to your device (computer, tablet, or smartphone) by your browser when you visit a website. We use cookies to ensure our website functions correctly, to improve the user experience, and to analyse visitor behaviour.</P>
      <P>By using our website, you consent to the placement of <B>strictly necessary cookies</B>. For non-essential cookies, your explicit consent is obtained via the cookie banner.</P>

      <H2>2. Types of Cookies We Use</H2>

      <H3>2.1 Strictly Necessary Cookies</H3>
      <P>These cookies are required for the basic functions of the website and cannot be disabled. They do not store any personally identifiable information.</P>
      <Table>
        <thead>
          <tr><TH>Cookie Name</TH><TH>Purpose</TH><TH>Duration</TH></tr>
        </thead>
        <tbody>
          <tr>
            <TD><Code>session_id</Code></TD>
            <TD>Identifies the user session</TD>
            <TD>Session</TD>
          </tr>
          <tr>
            <TD><Code>csrf_token</Code></TD>
            <TD>Protection against security attacks</TD>
            <TD>Session</TD>
          </tr>
          <tr>
            <TD><Code>catalyst_consent</Code></TD>
            <TD>Saves your cookie preferences</TD>
            <TD>12 months</TD>
          </tr>
        </tbody>
      </Table>

      <H3>2.2 Preference / Functional Cookies</H3>
      <P>These cookies remember your preferences such as language selection and interface settings.</P>
      <Table>
        <thead>
          <tr><TH>Cookie Name</TH><TH>Purpose</TH><TH>Duration</TH></tr>
        </thead>
        <tbody>
          <tr>
            <TD><Code>lang_pref</Code></TD>
            <TD>Saves language preference (TR/EN)</TD>
            <TD>12 months</TD>
          </tr>
          <tr>
            <TD><Code>ui_settings</Code></TD>
            <TD>Stores display and layout preferences</TD>
            <TD>6 months</TD>
          </tr>
        </tbody>
      </Table>

      <H3>2.3 Analytics Cookies</H3>
      <P>These cookies help us understand how our website is being used. Data is processed anonymously or pseudonymously.</P>
      <Table>
        <thead>
          <tr><TH>Tool</TH><TH>Purpose</TH><TH>Duration</TH><TH>Opt-out</TH></tr>
        </thead>
        <tbody>
          <tr>
            <TD>Google Analytics 4</TD>
            <TD>Page views, user flow, conversion analysis</TD>
            <TD>13 months</TD>
            <TD><A href="https://tools.google.com/dlpage/gaoptout">GA Opt-out</A></TD>
          </tr>
        </tbody>
      </Table>
      <Note>
        <B>IP Anonymisation:</B> IP anonymisation (<Code>anonymizeIp</Code>) is enabled for Google Analytics.
      </Note>

      <H3>2.4 Marketing / Targeting Cookies</H3>
      <P>These cookies are used to show advertisements relevant to your interests and to measure the effectiveness of our marketing campaigns. These cookies are only placed with your <B>explicit consent</B>.</P>
      <Table>
        <thead>
          <tr><TH>Tool</TH><TH>Purpose</TH><TH>Duration</TH></tr>
        </thead>
        <tbody>
          <tr>
            <TD>Meta Pixel (Facebook)</TD>
            <TD>Ad performance measurement and retargeting</TD>
            <TD>90 days</TD>
          </tr>
          <tr>
            <TD>Google Ads (gclid)</TD>
            <TD>Ad click and conversion tracking</TD>
            <TD>90 days</TD>
          </tr>
        </tbody>
      </Table>

      <H2>3. Third-Party Cookies</H2>
      <P>Our website may include the following third-party services, which may place their own cookies:</P>
      <UL>
        <LI><B>Google Analytics / Google Ads</B> — <A href="https://policies.google.com/privacy">Privacy Policy</A></LI>
        <LI><B>Meta / Facebook Pixel</B> — <A href="https://www.facebook.com/privacy/policy/">Privacy Policy</A></LI>
        <LI><B>YouTube (embedded video)</B> — <A href="https://policies.google.com/privacy">Privacy Policy</A></LI>
      </UL>
      <P>These third parties are subject to their own privacy policies and are outside our control.</P>

      <H2>4. Managing Your Cookie Preferences</H2>

      <H3>4.1 Cookie Banner</H3>
      <P>A cookie banner will be displayed on your first visit to our website, allowing you to set your preferences. You can update your preferences at any time by clicking the <B>"Cookie Preferences"</B> link at the bottom of the page.</P>

      <H3>4.2 Browser Settings</H3>
      <P>You can manage cookies through your browser settings:</P>
      <UL>
        <LI><B>Google Chrome:</B> Settings &gt; Privacy and Security &gt; Cookies and Other Site Data</LI>
        <LI><B>Mozilla Firefox:</B> Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</LI>
        <LI><B>Safari:</B> Preferences &gt; Privacy &gt; Manage Website Data</LI>
        <LI><B>Microsoft Edge:</B> Settings &gt; Cookies and Site Permissions</LI>
      </UL>
      <Note>
        <B>Please note:</B> Disabling strictly necessary cookies may prevent certain functions of the website from operating correctly.
      </Note>

      <H3>4.3 Google Analytics Opt-out</H3>
      <P>To disable Google Analytics tracking at the browser level: <A href="https://tools.google.com/dlpage/gaoptout">tools.google.com/dlpage/gaoptout</A></P>

      <H2>5. Legal Basis</H2>
      <Table>
        <thead>
          <tr><TH>Cookie Type</TH><TH>Legal Basis (KVKK)</TH><TH>Legal Basis (GDPR)</TH></tr>
        </thead>
        <tbody>
          <tr><TD>Strictly necessary</TD><TD>Legitimate interest (Art. 5/2-f)</TD><TD>Legitimate interest (Art. 6/1-f)</TD></tr>
          <tr><TD>Preference cookies</TD><TD>Explicit consent (Art. 5/1)</TD><TD>Consent (Art. 6/1-a)</TD></tr>
          <tr><TD>Analytics cookies</TD><TD>Explicit consent (Art. 5/1)</TD><TD>Consent (Art. 6/1-a)</TD></tr>
          <tr><TD>Marketing cookies</TD><TD>Explicit consent (Art. 5/1)</TD><TD>Consent (Art. 6/1-a)</TD></tr>
        </tbody>
      </Table>

      <H2>6. Contact</H2>
      <ContactBox>
        <p><B>Catalyst Education &amp; Research Inc.</B></p>
        <p>📧 info@catalysteducation.ca</p>
        <p>🌐 <A href="https://www.catalysteducation.ca/">catalysteducation.ca</A></p>
      </ContactBox>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CookieNoticePage() {
  const locale = useLocale();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-warm-50">
        <div className="container mx-auto px-4 md:px-6 max-w-[860px] py-16 md:py-24">
          {locale === "tr" ? <CookieNoticeTR /> : <CookieNoticeEN />}
        </div>
      </main>
    </div>
  );
}
