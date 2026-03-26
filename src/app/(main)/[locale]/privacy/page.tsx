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
    ? "Privacy Policy | Catalyst Education"
    : "Gizlilik Politikası | Catalyst Education";
  const description = isEn
    ? "Learn how Catalyst Education collects, uses, and protects your personal data."
    : "Kişisel verilerinizin nasıl işlendiğini öğrenin.";
  const url = `${SITE_URL}/${locale}/privacy`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { tr: `${SITE_URL}/tr/privacy`, en: `${SITE_URL}/en/privacy` },
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
const Table = ({ children }: { children: ReactNode }) => (
  <div className="overflow-x-auto my-4">
    <table className="w-full text-[14px] border-collapse">{children}</table>
  </div>
);
const TH = ({ children }: { children: ReactNode }) => (
  <th className="bg-warm-200 text-warm-800 font-semibold text-left px-3 py-2 border border-warm-300">{children}</th>
);
const TD = ({ children }: { children: ReactNode }) => (
  <td className="text-warm-700 px-3 py-2 border border-warm-300 align-top">{children}</td>
);

// ─── Turkish content ──────────────────────────────────────────────────────────

function PrivacyTR() {
  return (
    <article>
      <H1>Gizlilik Politikası</H1>
      <p className="text-sm text-warm-500 mb-2">Son Güncelleme: 26 Mart 2026</p>
      <ContactBox>
        <p><B>Veri Sorumlusu:</B> Catalyst Education &amp; Research Inc.</p>
        <p>📍 173 Kingston Rd, Toronto, ON M4L 1T4, Kanada</p>
        <p>📧 info@catalysteducation.ca</p>
        <p>🌐 <A href="https://www.catalysteducation.ca/">catalysteducation.ca</A></p>
      </ContactBox>

      <H2>1. Giriş</H2>
      <P>Catalyst Education &amp; Research Inc. ("Catalyst Education", "biz") olarak kişisel verilerinizin korunmasına büyük önem veriyoruz. Bu Gizlilik Politikası; web sitemizi ziyaret ettiğinizde, hizmetlerimize başvurduğunuzda veya programlarımıza kayıt yaptırdığınızda hangi kişisel verileri topladığımızı, bu verileri nasıl kullandığımızı, kimlerle paylaştığımızı ve haklarınızın neler olduğunu açıklamaktadır.</P>
      <P>Bu Gizlilik Politikası; Türkiye'de yerleşik kullanıcılar için <B>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</B> ile Avrupa Birliği'ndeki kullanıcılar için <B>Genel Veri Koruma Tüzüğü (GDPR)</B> ve Kanadalı kullanıcılar için <B>PIPEDA</B> kapsamındaki yükümlülüklerimize uygun olarak hazırlanmıştır.</P>

      <H2>2. Topladığımız Kişisel Veriler</H2>
      <H3>2.1 Doğrudan Sağladığınız Bilgiler</H3>
      <P>Web sitemizi kullanırken bize aşağıdaki bilgileri sağlayabilirsiniz:</P>
      <Table>
        <thead>
          <tr><TH>Veri Kategorisi</TH><TH>Örnekler</TH></tr>
        </thead>
        <tbody>
          <tr><TD>Kimlik bilgileri</TD><TD>Ad, soyad, doğum tarihi</TD></tr>
          <tr><TD>İletişim bilgileri</TD><TD>E-posta adresi, telefon numarası</TD></tr>
          <tr><TD>Eğitim bilgileri</TD><TD>Okul adı, sınıf düzeyi, akademik not ortalaması</TD></tr>
          <tr><TD>Veli/vasi bilgileri</TD><TD>Veli adı, soyadı, iletişim bilgileri</TD></tr>
          <tr><TD>Finansal bilgiler</TD><TD>Ödeme yöntemi bilgileri (kart numarası hariç; ödeme aracı üzerinden işlenir)</TD></tr>
          <tr><TD>Hesap bilgileri</TD><TD>Kullanıcı adı, şifreli erişim bilgileri</TD></tr>
        </tbody>
      </Table>

      <H3>2.2 Otomatik Olarak Toplanan Bilgiler</H3>
      <P>Web sitemizi ziyaret ettiğinizde teknik ve davranışsal veriler otomatik olarak toplanabilir:</P>
      <UL>
        <LI>IP adresi ve tarayıcı türü</LI>
        <LI>İşletim sistemi ve cihaz bilgisi</LI>
        <LI>Ziyaret edilen sayfalar ve erişim süreleri</LI>
        <LI>Çerezler (cookies) ve benzer teknolojiler aracılığıyla toplanan veriler</LI>
      </UL>
      <P>Bu verilere ilişkin detaylı bilgi için <B>Çerez Bildirimimizi</B> inceleyiniz.</P>

      <H3>2.3 Üçüncü Taraflardan Alınan Bilgiler</H3>
      <UL>
        <LI>Referans olarak belirttiğiniz okul veya danışmanlardan</LI>
        <LI>Ödeme işlem ortaklarından (yalnızca işlem onay bilgisi)</LI>
        <LI>Google/Meta gibi reklam platformlarından (yalnızca anonim demografik veriler)</LI>
      </UL>

      <H2>3. Kişisel Verilerin İşlenme Amaçları</H2>
      <P><B>Hizmet Sunumu</B></P>
      <UL>
        <LI>OSSD programı başvuru ve kayıt süreçlerinin yürütülmesi</LI>
        <LI>Öğrenci gelişiminin takip edilmesi ve akademik destek sağlanması</LI>
        <LI>Veli/vasi ile iletişimin sürdürülmesi</LI>
      </UL>
      <P><B>İletişim ve Pazarlama</B></P>
      <UL>
        <LI>Program ve hizmetler hakkında bilgilendirme e-postaları gönderilmesi</LI>
        <LI>Açık rızanıza dayalı olarak pazarlama iletişimi yapılması</LI>
        <LI>Müşteri hizmetleri sağlanması</LI>
      </UL>
      <P><B>Yasal Yükümlülükler</B></P>
      <UL>
        <LI>Vergi, muhasebe ve yasal mevzuat gerekliliklerinin karşılanması</LI>
        <LI>Yetkili kurum taleplerinin yanıtlanması</LI>
      </UL>
      <P><B>Web Sitesi İyileştirme</B></P>
      <UL>
        <LI>Kullanıcı deneyiminin analiz edilmesi ve geliştirilmesi</LI>
        <LI>Teknik sorunların tespiti ve giderilmesi</LI>
      </UL>

      <H2>4. Hukuki İşleme Dayanağı</H2>
      <P><B>KVKK kapsamındaki kullanıcılar için:</B></P>
      <UL>
        <LI>Açık rıza (Madde 5/1)</LI>
        <LI>Sözleşmenin kurulması veya ifası için zorunluluk (Madde 5/2-c)</LI>
        <LI>Meşru menfaat (Madde 5/2-f)</LI>
        <LI>Kanuni yükümlülüğün yerine getirilmesi (Madde 5/2-ç)</LI>
      </UL>
      <P><B>GDPR kapsamındaki kullanıcılar için:</B></P>
      <UL>
        <LI>Rıza (Madde 6/1-a)</LI>
        <LI>Sözleşmenin ifası (Madde 6/1-b)</LI>
        <LI>Yasal yükümlülük (Madde 6/1-c)</LI>
        <LI>Meşru menfaat (Madde 6/1-f)</LI>
      </UL>

      <H2>5. Kişisel Verilerin Paylaşımı</H2>
      <P><B>Hizmet Sağlayıcılar:</B> E-posta platformları, ödeme altyapısı, CRM ve öğrenci yönetim sistemleri gibi teknik hizmet sağlayıcılarla (veri işleme sözleşmesi çerçevesinde).</P>
      <P><B>Ontario Eğitim Yetkilileri:</B> OSSD programının yönetimi ve akreditasyonu kapsamında yasal zorunluluk halinde.</P>
      <P><B>Yasal Zorunluluk:</B> Mahkeme kararı, yasal düzenleme veya yetkili makam talebi durumunda.</P>
      <P><B>Kurumsal Değişiklik:</B> Şirket birleşmesi, devri veya varlık satışı durumunda (bu Politika geçerliliğini korumak kaydıyla).</P>
      <P>Kişisel verilerinizi ticari amaçlarla üçüncü taraflara <B>satmıyor veya kiralamıyoruz.</B></P>

      <H2>6. Yurt Dışına Veri Aktarımı</H2>
      <P>Şirket merkezi Kanada'da bulunduğundan, verileriniz Türkiye dışına aktarılmaktadır. Bu aktarım:</P>
      <UL>
        <LI>KVKK Madde 9 kapsamında açık rızanıza veya Kişisel Verileri Koruma Kurulu'nun belirlediği yeterli korumanın bulunduğu ülkeler listesine dayanarak gerçekleştirilmektedir.</LI>
        <LI>Kanada, GDPR kapsamında <B>yeterlilik kararına</B> sahip bir ülke olarak değerlendirilmektedir.</LI>
      </UL>
      <P>Hizmet sağlayıcılarımız Kanada veya Avrupa Ekonomik Alanı (AEA) dışında yer aldığında, uygun güvenceler (Standart Sözleşme Maddeleri vb.) uygulanmaktadır.</P>

      <H2>7. Veri Saklama Süreleri</H2>
      <Table>
        <thead>
          <tr><TH>Veri Türü</TH><TH>Saklama Süresi</TH></tr>
        </thead>
        <tbody>
          <tr><TD>Başvuru ve kayıt bilgileri</TD><TD>Programın bitiminden itibaren 5 yıl</TD></tr>
          <tr><TD>Öğrenci akademik kayıtları</TD><TD>Programın bitiminden itibaren 10 yıl</TD></tr>
          <tr><TD>Pazarlama iletişim verileri</TD><TD>Rızanın geri alınmasına kadar</TD></tr>
          <tr><TD>Teknik log kayıtları</TD><TD>1 yıl</TD></tr>
          <tr><TD>Ödeme kayıtları</TD><TD>Yasal zorunluluk süresi (vergi mevzuatı)</TD></tr>
        </tbody>
      </Table>
      <P>Saklama süresi dolan veriler güvenli biçimde silinir veya anonim hale getirilir.</P>

      <H2>8. Veri Güvenliği</H2>
      <UL>
        <LI>SSL/TLS şifreleme ile veri iletimi güvenliği</LI>
        <LI>Erişim kısıtlaması ve yetkilendirme kontrolleri</LI>
        <LI>Düzenli güvenlik testleri ve güncellemeleri</LI>
        <LI>Personel gizlilik eğitimleri</LI>
        <LI>Veri ihlali müdahale planı</LI>
      </UL>
      <P>Bununla birlikte, internet üzerinden gerçekleştirilen hiçbir veri iletiminin %100 güvenli olmadığını belirtmek isteriz.</P>

      <H2>9. Haklarınız</H2>
      <H3>KVKK Kapsamındaki Haklarınız (Madde 11)</H3>
      <UL>
        <LI>Kişisel verilerinizin işlenip işlenmediğini öğrenme</LI>
        <LI>İşlenmişse buna ilişkin bilgi talep etme</LI>
        <LI>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</LI>
        <LI>Yurt içinde veya yurt dışında aktarılan üçüncü kişileri bilme</LI>
        <LI>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</LI>
        <LI>KVKK'nın 7. maddesi kapsamında verilerin silinmesini veya yok edilmesini isteme</LI>
        <LI>Düzeltme ve silme işlemlerinin aktarılan üçüncü kişilere bildirilmesini isteme</LI>
        <LI>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</LI>
        <LI>Verilerin kanuna aykırı işlenmesi sebebiyle zararın giderilmesini talep etme</LI>
      </UL>
      <H3>GDPR Kapsamındaki Ek Haklarınız</H3>
      <UL>
        <LI>Veri taşınabilirliği hakkı</LI>
        <LI>İşlemeyi kısıtlama hakkı</LI>
        <LI>Meşru menfaate dayalı işlemeye itiraz hakkı</LI>
        <LI>Denetim otoritesine şikâyet hakkı</LI>
      </UL>
      <H3>Haklarınızı Kullanmak İçin</H3>
      <P>Taleplerinizi <B>info@catalysteducation.ca</B> adresine e-posta göndererek iletebilirsiniz. Başvurularınız en geç <B>30 gün</B> içinde yanıtlanacaktır.</P>

      <H2>10. Çerezler</H2>
      <P>Web sitemizde çerezler ve benzeri teknolojiler kullanılmaktadır. Detaylı bilgi için <B>Çerez Bildirimimizi</B> inceleyiniz.</P>

      <H2>11. Çocukların Gizliliği</H2>
      <P>Hizmetlerimiz 18 yaşın altındaki bireylere doğrudan yönelik değildir. 18 yaş altı bireylerin verilerini yalnızca ebeveyn veya vasi onayıyla ve OSSD programı kapsamında işliyoruz.</P>

      <H2>12. Politika Değişiklikleri</H2>
      <P>Bu Gizlilik Politikası zaman zaman güncellenebilir. Önemli değişiklikler web sitesinde duyurulur ve kayıtlı e-posta adresinize bildirim gönderilir.</P>

      <H2>13. İletişim ve Şikâyet</H2>
      <ContactBox>
        <p><B>Catalyst Education &amp; Research Inc.</B></p>
        <p>📍 173 Kingston Rd, Toronto, ON M4L 1T4, Kanada</p>
        <p>📧 info@catalysteducation.ca</p>
      </ContactBox>
      <P><B>Türkiye'deki kullanıcılar</B> ayrıca <B>Kişisel Verileri Koruma Kurumu'na</B> başvurabilirler: <A href="https://www.kvkk.gov.tr/">kvkk.gov.tr</A></P>
      <P><B>AB kullanıcıları</B> ilgili ülkelerindeki <B>Veri Koruma Otoritesine (DPA)</B> şikâyette bulunabilirler.</P>
    </article>
  );
}

// ─── English content ──────────────────────────────────────────────────────────

function PrivacyEN() {
  return (
    <article>
      <H1>Privacy Policy</H1>
      <p className="text-sm text-warm-500 mb-2">Last Updated: March 26, 2026</p>
      <ContactBox>
        <p><B>Data Controller:</B> Catalyst Education &amp; Research Inc.</p>
        <p>📍 173 Kingston Rd, Toronto, ON M4L 1T4, Canada</p>
        <p>📧 info@catalysteducation.ca</p>
        <p>🌐 <A href="https://www.catalysteducation.ca/">catalysteducation.ca</A></p>
      </ContactBox>

      <H2>1. Introduction</H2>
      <P>At Catalyst Education &amp; Research Inc. ("Catalyst Education", "we", "us"), we are committed to protecting your personal information. This Privacy Policy explains what personal data we collect when you visit our website, apply for our services, or enrol in our programs, how we use it, with whom we share it, and what rights you have.</P>
      <P>This Privacy Policy has been prepared in compliance with our obligations under <B>Turkey's Personal Data Protection Law No. 6698 (KVKK)</B> for users in Türkiye, the <B>General Data Protection Regulation (GDPR)</B> for users in the European Union, and the <B>Personal Information Protection and Electronic Documents Act (PIPEDA)</B> for Canadian users.</P>

      <H2>2. Personal Data We Collect</H2>
      <H3>2.1 Information You Provide Directly</H3>
      <Table>
        <thead>
          <tr><TH>Data Category</TH><TH>Examples</TH></tr>
        </thead>
        <tbody>
          <tr><TD>Identity information</TD><TD>First name, last name, date of birth</TD></tr>
          <tr><TD>Contact information</TD><TD>Email address, phone number</TD></tr>
          <tr><TD>Educational information</TD><TD>School name, grade level, academic GPA</TD></tr>
          <tr><TD>Parent/guardian information</TD><TD>Parent/guardian name and contact details</TD></tr>
          <tr><TD>Financial information</TD><TD>Payment method details (card numbers excluded; processed via payment gateway)</TD></tr>
          <tr><TD>Account information</TD><TD>Username and password credentials</TD></tr>
        </tbody>
      </Table>

      <H3>2.2 Automatically Collected Information</H3>
      <UL>
        <LI>IP address and browser type</LI>
        <LI>Operating system and device information</LI>
        <LI>Pages visited and access durations</LI>
        <LI>Data collected via cookies and similar technologies</LI>
      </UL>
      <P>For detailed information on cookies, please refer to our <B>Cookie Notice</B>.</P>

      <H3>2.3 Information from Third Parties</H3>
      <UL>
        <LI>From schools or counsellors you have listed as references</LI>
        <LI>From payment processing partners (transaction confirmation only)</LI>
        <LI>From advertising platforms such as Google/Meta (anonymised demographic data only)</LI>
      </UL>

      <H2>3. Purposes of Processing Personal Data</H2>
      <P><B>Service Delivery</B></P>
      <UL>
        <LI>Managing OSSD programme applications and enrolment</LI>
        <LI>Monitoring student progress and providing academic support</LI>
        <LI>Maintaining communication with parents/guardians</LI>
      </UL>
      <P><B>Communication and Marketing</B></P>
      <UL>
        <LI>Sending informational emails about programmes and services</LI>
        <LI>Marketing communications based on your explicit consent</LI>
        <LI>Providing customer support</LI>
      </UL>
      <P><B>Legal Obligations</B></P>
      <UL>
        <LI>Meeting tax, accounting, and regulatory requirements</LI>
        <LI>Responding to requests from competent authorities</LI>
      </UL>
      <P><B>Website Improvement</B></P>
      <UL>
        <LI>Analysing and enhancing the user experience</LI>
        <LI>Identifying and resolving technical issues</LI>
      </UL>

      <H2>4. Legal Basis for Processing</H2>
      <P><B>For users under KVKK:</B></P>
      <UL>
        <LI>Explicit consent (Article 5/1)</LI>
        <LI>Necessity for the establishment or performance of a contract (Article 5/2-c)</LI>
        <LI>Legitimate interest (Article 5/2-f)</LI>
        <LI>Fulfilment of a legal obligation (Article 5/2-ç)</LI>
      </UL>
      <P><B>For users under GDPR:</B></P>
      <UL>
        <LI>Consent (Article 6/1-a)</LI>
        <LI>Performance of a contract (Article 6/1-b)</LI>
        <LI>Legal obligation (Article 6/1-c)</LI>
        <LI>Legitimate interests (Article 6/1-f)</LI>
      </UL>

      <H2>5. Sharing of Personal Data</H2>
      <P><B>Service Providers:</B> Technical service providers such as email platforms, payment infrastructure, CRM, and student management systems (pursuant to data processing agreements).</P>
      <P><B>Ontario Education Authorities:</B> Where legally required in connection with the administration and accreditation of the OSSD programme.</P>
      <P><B>Legal Requirement:</B> In response to a court order, legal regulation, or competent authority request.</P>
      <P><B>Corporate Change:</B> In the event of a company merger, transfer, or asset sale (subject to this Policy remaining in effect).</P>
      <P>We do <B>not sell or rent</B> your personal data to third parties for commercial purposes.</P>

      <H2>6. International Data Transfers</H2>
      <UL>
        <LI>Under KVKK Article 9, based on your explicit consent or the list of countries with adequate protection as determined by the Personal Data Protection Authority.</LI>
        <LI>Canada is considered a country with an <B>adequacy decision</B> under GDPR.</LI>
      </UL>
      <P>Where our service providers are located outside Canada or the European Economic Area (EEA), appropriate safeguards (such as Standard Contractual Clauses) are applied.</P>

      <H2>7. Data Retention Periods</H2>
      <Table>
        <thead>
          <tr><TH>Data Type</TH><TH>Retention Period</TH></tr>
        </thead>
        <tbody>
          <tr><TD>Application and enrolment records</TD><TD>5 years from programme completion</TD></tr>
          <tr><TD>Student academic records</TD><TD>10 years from programme completion</TD></tr>
          <tr><TD>Marketing communication data</TD><TD>Until consent is withdrawn</TD></tr>
          <tr><TD>Technical log records</TD><TD>1 year</TD></tr>
          <tr><TD>Payment records</TD><TD>As required by law (tax regulations)</TD></tr>
        </tbody>
      </Table>
      <P>Data that has exceeded its retention period is securely deleted or anonymised.</P>

      <H2>8. Data Security</H2>
      <UL>
        <LI>SSL/TLS encryption for secure data transmission</LI>
        <LI>Access restrictions and authorisation controls</LI>
        <LI>Regular security testing and updates</LI>
        <LI>Staff privacy training</LI>
        <LI>Data breach response plan</LI>
      </UL>
      <P>However, we note that no data transmission over the internet is 100% secure.</P>

      <H2>9. Your Rights</H2>
      <H3>Your Rights under KVKK (Article 11)</H3>
      <UL>
        <LI>To learn whether your personal data has been processed</LI>
        <LI>To request information if it has been processed</LI>
        <LI>To learn the purpose of processing and whether it is being used in accordance with that purpose</LI>
        <LI>To know the third parties to whom data is transferred, domestically or abroad</LI>
        <LI>To request correction of incomplete or inaccurate data</LI>
        <LI>To request deletion or destruction of data under KVKK Article 7</LI>
        <LI>To request notification of correction and deletion to third parties</LI>
        <LI>To object to a result arising from automated analysis of processed data</LI>
        <LI>To claim compensation for losses arising from unlawful processing of data</LI>
      </UL>
      <H3>Additional Rights under GDPR</H3>
      <UL>
        <LI>Right to data portability</LI>
        <LI>Right to restriction of processing</LI>
        <LI>Right to object to processing based on legitimate interests</LI>
        <LI>Right to lodge a complaint with a supervisory authority</LI>
      </UL>
      <H3>How to Exercise Your Rights</H3>
      <P>You may submit your requests by emailing <B>info@catalysteducation.ca</B>. Requests will be responded to within <B>30 days</B>. Identity verification may be requested.</P>

      <H2>10. Cookies</H2>
      <P>We use cookies and similar technologies on our website. For information about cookie types, their purposes, and how to manage your preferences, please refer to our <B>Cookie Notice</B>.</P>

      <H2>11. Children's Privacy</H2>
      <P>Our services are not directed at individuals under the age of 18. We only process data relating to minors with parental or guardian consent and within the scope of the OSSD programme.</P>

      <H2>12. Policy Changes</H2>
      <P>This Privacy Policy may be updated from time to time. Significant changes will be announced on the website and notified to your registered email address.</P>

      <H2>13. Contact and Complaints</H2>
      <ContactBox>
        <p><B>Catalyst Education &amp; Research Inc.</B></p>
        <p>📍 173 Kingston Rd, Toronto, ON M4L 1T4, Canada</p>
        <p>📧 info@catalysteducation.ca</p>
      </ContactBox>
      <P><B>Users in Türkiye</B> may also submit requests and complaints to the <B>Personal Data Protection Authority (KVKK)</B>: <A href="https://www.kvkk.gov.tr/">kvkk.gov.tr</A></P>
      <P><B>EU users</B> may lodge a complaint with the <B>Data Protection Authority (DPA)</B> in their country of residence.</P>
      <P><B>Canadian users</B> may contact the <B>Office of the Privacy Commissioner of Canada</B>: <A href="https://www.priv.gc.ca/">priv.gc.ca</A></P>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
  const locale = useLocale();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-warm-50">
        <div className="container mx-auto px-4 md:px-6 max-w-[860px] py-16 md:py-24">
          {locale === "tr" ? <PrivacyTR /> : <PrivacyEN />}
        </div>
      </main>
    </div>
  );
}
