import { useLocale } from "next-intl";
import { ReactNode } from "react";

const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className="text-3xl md:text-4xl font-extrabold text-warm-800 mb-2 leading-tight">{children}</h1>
);
const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-xl font-bold text-warm-800 mt-12 mb-3 pb-2 border-b border-warm-300">{children}</h2>
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

function PrivacyTR() {
  return (
    <article>
      <H1>Gizlilik Politikası</H1>
      <p className="text-sm text-warm-500 mb-10">Son Güncelleme: Mart 2026</p>

      <H2>1. Giriş</H2>
      <P>Catalyst Education kişisel verilerinizin gizliliğini korumaya önem verir.</P>
      <P>Bu politika, platformumuzu kullandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklar.</P>

      <H2>2. Toplanan Veriler</H2>
      <P>Toplanabilecek veriler:</P>
      <UL>
        <LI>Kimlik bilgileri</LI>
        <LI>İletişim bilgileri</LI>
        <LI>Akademik geçmiş</LI>
        <LI>Başvuru bilgileri</LI>
        <LI>Yüklenen belgeler</LI>
        <LI>İletişim kayıtları</LI>
        <LI>Teknik kullanım verileri</LI>
      </UL>

      <H2>3. Verilerin Kullanım Amacı</H2>
      <P>Veriler şu amaçlarla kullanılabilir:</P>
      <UL>
        <LI>Başvuru sürecini yürütmek</LI>
        <LI>Danışmanlık hizmeti sunmak</LI>
        <LI>Kullanıcı ile iletişim kurmak</LI>
        <LI>Yasal yükümlülükleri yerine getirmek</LI>
        <LI>Platform güvenliğini sağlamak</LI>
      </UL>

      <H2>4. Veri Paylaşımı</H2>
      <P>Kişisel veriler aşağıdaki durumlarda paylaşılabilir:</P>
      <UL>
        <LI><span className="font-semibold text-warm-800">Eğitim kurumları ile</span> — başvuru sürecinin yürütülmesi amacıyla</LI>
        <LI><span className="font-semibold text-warm-800">Hizmet sağlayıcılar ile</span> — teknik hizmet sunumu amacıyla</LI>
        <LI><span className="font-semibold text-warm-800">Yasal zorunluluk halinde</span></LI>
      </UL>

      <H2>5. Veri Güvenliği</H2>
      <P>Veriler aşağıdaki yöntemlerle korunur:</P>
      <UL>
        <LI>Şifreleme</LI>
        <LI>Erişim kontrolü</LI>
        <LI>Güvenli sunucular</LI>
      </UL>

      <H2>6. Veri Saklama</H2>
      <P>Veriler aşağıdaki süreler boyunca saklanabilir:</P>
      <UL>
        <LI>Hesap aktif olduğu sürece</LI>
        <LI>Yasal zorunluluklar süresince</LI>
      </UL>

      <H2>7. Kullanıcı Hakları</H2>
      <P>Kullanıcı aşağıdaki haklara sahiptir:</P>
      <UL>
        <LI>Verilerine erişme</LI>
        <LI>Düzeltme isteme</LI>
        <LI>Silme talep etme</LI>
      </UL>

      <H2>8. Çocukların Verileri</H2>
      <P>18 yaş altındaki kullanıcılar için ebeveyn onayı gerekebilir.</P>

      <H2>9. Uluslararası Veri Aktarımı</H2>
      <P>Veriler Kanada dışında işlenebilir.</P>

      <H2>10. Değişiklikler</H2>
      <P>Bu politika güncellenebilir. Güncel versiyon web sitesinde yayınlanır.</P>

      <H2>11. İletişim</H2>
      <div className="bg-warm-100 border border-warm-300 rounded-2xl p-6 text-[15px] text-warm-700 leading-relaxed space-y-1">
        <p className="font-semibold text-warm-800">Catalyst Education</p>
        <p>📧 info@catalysteducation.ca</p>
        <p>📍 173 Kingston Rd, Toronto ON M4L 1T4, Canada</p>
        <p>📞 +1 (437) 473 97 25</p>
      </div>
    </article>
  );
}

function PrivacyEN() {
  return (
    <article>
      <H1>Privacy Policy</H1>
      <p className="text-sm text-warm-500 mb-10">Last Updated: March 2026</p>

      <H2>1. Introduction</H2>
      <P>Catalyst Education is committed to protecting the privacy of your personal data.</P>
      <P>This policy explains how your personal data is collected, used, and protected when you use our platform.</P>

      <H2>2. Data We Collect</H2>
      <P>We may collect the following types of data:</P>
      <UL>
        <LI>Identity information</LI>
        <LI>Contact information</LI>
        <LI>Academic background</LI>
        <LI>Application information</LI>
        <LI>Uploaded documents</LI>
        <LI>Communication records</LI>
        <LI>Technical usage data</LI>
      </UL>

      <H2>3. How We Use Your Data</H2>
      <P>Your data may be used for the following purposes:</P>
      <UL>
        <LI>Managing the application process</LI>
        <LI>Providing advisory services</LI>
        <LI>Communicating with users</LI>
        <LI>Fulfilling legal obligations</LI>
        <LI>Ensuring platform security</LI>
      </UL>

      <H2>4. Data Sharing</H2>
      <P>Personal data may be shared in the following circumstances:</P>
      <UL>
        <LI><span className="font-semibold text-warm-800">With educational institutions</span> — for the purpose of managing the application process</LI>
        <LI><span className="font-semibold text-warm-800">With service providers</span> — for the purpose of delivering technical services</LI>
        <LI><span className="font-semibold text-warm-800">When legally required</span></LI>
      </UL>

      <H2>5. Data Security</H2>
      <P>Your data is protected through:</P>
      <UL>
        <LI>Encryption</LI>
        <LI>Access controls</LI>
        <LI>Secure servers</LI>
      </UL>

      <H2>6. Data Retention</H2>
      <P>Your data may be retained:</P>
      <UL>
        <LI>For as long as your account remains active</LI>
        <LI>For the duration required by legal obligations</LI>
      </UL>

      <H2>7. Your Rights</H2>
      <P>Users have the right to:</P>
      <UL>
        <LI>Access their data</LI>
        <LI>Request corrections</LI>
        <LI>Request deletion</LI>
      </UL>

      <H2>8. Children's Data</H2>
      <P>Parental consent may be required for users under the age of 18.</P>

      <H2>9. International Data Transfers</H2>
      <P>Your data may be processed outside of Canada.</P>

      <H2>10. Changes</H2>
      <P>This policy may be updated. The current version will be published on our website.</P>

      <H2>11. Contact</H2>
      <div className="bg-warm-100 border border-warm-300 rounded-2xl p-6 text-[15px] text-warm-700 leading-relaxed space-y-1">
        <p className="font-semibold text-warm-800">Catalyst Education</p>
        <p>📧 info@catalysteducation.ca</p>
        <p>📍 173 Kingston Rd, Toronto ON M4L 1T4, Canada</p>
        <p>📞 +1 (437) 473 97 25</p>
      </div>
    </article>
  );
}

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
