import { useLocale } from "next-intl";
import { ReactNode } from "react";

const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className="text-3xl md:text-4xl font-extrabold text-warm-800 mb-2 leading-tight">{children}</h1>
);
const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-xl font-bold text-warm-800 mt-12 mb-3 pb-2 border-b border-warm-300">{children}</h2>
);
const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-base font-semibold text-warm-800 mt-5 mb-2">{children}</h3>
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

function TermsTR() {
  return (
    <article>
      <H1>Kullanım Koşulları</H1>
      <p className="text-sm text-warm-500 mb-10">Son Güncelleme: Mart 2026</p>

      <H2>1. Giriş</H2>
      <P>Bu Kullanım Koşulları ("Koşullar"), Catalyst Education ("Şirket", "biz", "bize" veya "bizim") tarafından işletilen web sitesi, başvuru sistemleri ve ilgili hizmetlerin ("Platform") kullanımını düzenler.</P>
      <P>Platformu kullanarak bu Koşulları kabul etmiş sayılırsınız. Eğer bu Koşulları kabul etmiyorsanız Platformu kullanmamanız gerekmektedir.</P>

      <H2>2. Hizmet Tanımı</H2>
      <P>Catalyst Education aşağıdaki hizmetleri sunar:</P>
      <UL>
        <LI>Uluslararası eğitim programlarına başvuru süreci</LI>
        <LI>Akademik planlama ve yönlendirme</LI>
        <LI>Öğrenci ve veli danışmanlığı</LI>
        <LI>Başvuru koordinasyonu ve belge yönetimi</LI>
      </UL>
      <P>Catalyst Education:</P>
      <UL>
        <LI>Bir eğitim kurumu değildir</LI>
        <LI>Diploma veya akademik sertifika vermez</LI>
        <LI>Eğitim kurumları adına akademik karar vermez</LI>
        <LI>Eğitim kurumlarının ücretlerini belirlemez</LI>
      </UL>
      <P>Platform, eğitim kurumlarına başvuru sürecini destekleyen bir danışmanlık ve koordinasyon hizmeti sunmaktadır.</P>

      <H2>3. Kullanıcı Yükümlülükleri</H2>
      <P>Kullanıcı:</P>
      <UL>
        <LI>Sağladığı bilgilerin doğru ve güncel olduğunu kabul eder</LI>
        <LI>Sahte veya yanıltıcı bilgi vermemeyi taahhüt eder</LI>
        <LI>Platformu yasalara uygun şekilde kullanacağını kabul eder</LI>
      </UL>
      <P>Catalyst Education, yanlış veya eksik bilgi verilmesi nedeniyle oluşabilecek sonuçlardan sorumlu tutulamaz.</P>

      <H2>4. Hizmetler ve Ücretler</H2>
      <H3>4.1 Hizmet Kapsamı</H3>
      <P>Catalyst Education tarafından sunulan danışmanlık ve başvuru yönetimi hizmetleri ücretli olabilir. Hizmet kapsamı ve ücretlendirme koşulları başvuru sürecinde kullanıcıya ayrıca bildirilebilir.</P>

      <H3>4.2 Eğitim Kurumu Ücretleri</H3>
      <P>Eğitim kurumlarına ait öğrenim ücretleri, kayıt ücretleri ve diğer mali yükümlülükler ilgili eğitim kurumları tarafından belirlenir. Catalyst Education bu ücretlerin belirlenmesinden sorumlu değildir.</P>

      <H3>4.3 Ödeme</H3>
      <P>Ödemeler aşağıdaki yöntemlerle gerçekleştirilebilir:</P>
      <UL>
        <LI>Banka transferi</LI>
        <LI>Kredi kartı</LI>
        <LI>Diğer güvenli ödeme yöntemleri</LI>
      </UL>
      <P>Catalyst Education; üçüncü taraf ödeme sistemlerinden kaynaklanan kesintilerden, bankacılık işlemlerindeki gecikmelerden veya teknik sistem arızalarından sorumlu tutulamaz.</P>

      <H3>4.4 İptal ve İade</H3>
      <UL>
        <LI>Sunulan danışmanlık hizmetlerinin niteliğine bağlı olarak iptal ve iade koşulları değişiklik gösterebilir.</LI>
        <LI>Danışmanlık süreci başlatıldıktan sonra gerçekleştirilen hizmetlere ilişkin ücretler iade edilmeyebilir.</LI>
        <LI>İade talepleri her başvuru özelinde değerlendirilir.</LI>
        <LI>Eğitim kurumlarının kendi iade politikaları Catalyst Education'dan bağımsızdır.</LI>
      </UL>

      <H3>4.5 Hizmet ve Ücret Değişiklikleri</H3>
      <P>Catalyst Education, hizmet kapsamını ve ücretlendirme koşullarını önceden bildirimde bulunmaksızın güncelleme hakkını saklı tutar.</P>

      <H2>5. Başvuru ve Kabul Kararları</H2>
      <P>Başvuru ve kabul kararları tamamen ilgili eğitim kurumları tarafından verilir. Catalyst Education:</P>
      <UL>
        <LI>Kabul garantisi vermez</LI>
        <LI>Akademik sonuçları garanti etmez</LI>
        <LI>Eğitim kurumlarının kararlarından sorumlu değildir</LI>
      </UL>

      <H2>6. Sorumluluk Sınırlaması</H2>
      <P>Catalyst Education aşağıdaki durumlardan sorumlu tutulamaz:</P>
      <UL>
        <LI>Eğitim kurumlarının akademik kararları</LI>
        <LI>Vize başvurusu sonuçları</LI>
        <LI>Resmi makam kararları</LI>
        <LI>Teknik sistem kesintileri</LI>
        <LI>Üçüncü taraf hizmet sağlayıcılar</LI>
      </UL>

      <H2>7. Fikri Mülkiyet</H2>
      <P>Platformda yer alan tüm içerik, marka ve materyaller Catalyst Education'a aittir. İzinsiz kullanım yasaktır.</P>

      <H2>8. Gizlilik</H2>
      <P>Kişisel verileriniz Gizlilik Politikası kapsamında işlenmektedir.</P>

      <H2>9. Değişiklikler</H2>
      <P>Catalyst Education bu Koşulları zaman zaman güncelleyebilir. Güncel versiyon web sitesinde yayınlanır.</P>

      <H2>10. İletişim</H2>
      <div className="bg-warm-100 border border-warm-300 rounded-2xl p-6 text-[15px] text-warm-700 leading-relaxed space-y-1">
        <p className="font-semibold text-warm-800">Catalyst Education</p>
        <p>📧 info@catalysteducation.ca</p>
        <p>📍 173 Kingston Rd, Toronto ON M4L 1T4, Canada</p>
        <p>📞 +1 (437) 473 97 25</p>
        <p>🌐 catalysteducation.ca</p>
      </div>
    </article>
  );
}

function TermsEN() {
  return (
    <article>
      <H1>Terms of Use</H1>
      <p className="text-sm text-warm-500 mb-10">Last Updated: March 2026</p>

      <H2>1. Introduction</H2>
      <P>These Terms of Use ("Terms") govern the use of the website, application systems, and related services ("Platform") operated by Catalyst Education ("Company," "we," "us," or "our").</P>
      <P>By using the Platform, you agree to these Terms. If you do not agree, please refrain from using the Platform.</P>

      <H2>2. Service Description</H2>
      <P>Catalyst Education provides the following services:</P>
      <UL>
        <LI>Application process support for international education programs</LI>
        <LI>Academic planning and guidance</LI>
        <LI>Student and parent advisory services</LI>
        <LI>Application coordination and document management</LI>
      </UL>
      <P>Catalyst Education:</P>
      <UL>
        <LI>Is not an educational institution</LI>
        <LI>Does not issue diplomas or academic certificates</LI>
        <LI>Does not make academic decisions on behalf of educational institutions</LI>
        <LI>Does not set tuition fees for educational institutions</LI>
      </UL>
      <P>The Platform provides advisory and coordination services to support the application process to educational institutions.</P>

      <H2>3. User Obligations</H2>
      <P>The user:</P>
      <UL>
        <LI>Confirms that the information provided is accurate and up to date</LI>
        <LI>Agrees not to provide false or misleading information</LI>
        <LI>Agrees to use the Platform in compliance with applicable laws</LI>
      </UL>
      <P>Catalyst Education cannot be held responsible for consequences arising from incorrect or incomplete information provided by the user.</P>

      <H2>4. Services and Fees</H2>
      <H3>4.1 Scope of Services</H3>
      <P>Advisory and application management services provided by Catalyst Education may be subject to fees. The scope of services and fee terms will be communicated to the user separately during the application process.</P>

      <H3>4.2 Institutional Fees</H3>
      <P>Tuition fees, registration fees, and other financial obligations of educational institutions are determined by those institutions. Catalyst Education is not responsible for setting these fees.</P>

      <H3>4.3 Payment</H3>
      <P>Payments may be made via:</P>
      <UL>
        <LI>Bank transfer</LI>
        <LI>Credit card</LI>
        <LI>Other secure payment methods</LI>
      </UL>
      <P>Catalyst Education cannot be held responsible for fees charged by third-party payment systems, delays in banking transactions, or technical system failures.</P>

      <H3>4.4 Cancellation and Refund</H3>
      <UL>
        <LI>Cancellation and refund conditions may vary depending on the nature of the advisory services provided.</LI>
        <LI>Fees for services already rendered after the advisory process has begun may not be refunded.</LI>
        <LI>Refund requests are evaluated on a case-by-case basis.</LI>
        <LI>The refund policies of educational institutions are independent of Catalyst Education.</LI>
      </UL>

      <H3>4.5 Service and Fee Changes</H3>
      <P>Catalyst Education reserves the right to update the scope of services and fee terms without prior notice.</P>

      <H2>5. Applications and Admission Decisions</H2>
      <P>Admission decisions are made solely by the relevant educational institutions. Catalyst Education:</P>
      <UL>
        <LI>Does not guarantee admission</LI>
        <LI>Does not guarantee academic outcomes</LI>
        <LI>Is not responsible for decisions made by educational institutions</LI>
      </UL>

      <H2>6. Limitation of Liability</H2>
      <P>Catalyst Education cannot be held responsible for:</P>
      <UL>
        <LI>Academic decisions by educational institutions</LI>
        <LI>Visa application outcomes</LI>
        <LI>Decisions by official authorities</LI>
        <LI>Technical system outages</LI>
        <LI>Third-party service providers</LI>
      </UL>

      <H2>7. Intellectual Property</H2>
      <P>All content, trademarks, and materials on the Platform belong to Catalyst Education. Unauthorized use is prohibited.</P>

      <H2>8. Privacy</H2>
      <P>Your personal data is processed in accordance with our Privacy Policy.</P>

      <H2>9. Modifications</H2>
      <P>Catalyst Education may update these Terms from time to time. The current version will be published on the website.</P>

      <H2>10. Contact</H2>
      <div className="bg-warm-100 border border-warm-300 rounded-2xl p-6 text-[15px] text-warm-700 leading-relaxed space-y-1">
        <p className="font-semibold text-warm-800">Catalyst Education</p>
        <p>📧 info@catalysteducation.ca</p>
        <p>📍 173 Kingston Rd, Toronto ON M4L 1T4, Canada</p>
        <p>📞 +1 (437) 473 97 25</p>
        <p>🌐 catalysteducation.ca</p>
      </div>
    </article>
  );
}

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
