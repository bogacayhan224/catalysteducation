import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { ReactNode } from "react";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const title = "KVKK Aydınlatma Metni | Catalyst Education";
  const description =
    "6698 sayılı KVKK kapsamında kişisel veri aydınlatma metni.";
  const url = `${SITE_URL}/tr/kvkk`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Catalyst Education",
      type: "website",
      locale: "tr_TR",
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
  <th className="bg-warm-200 text-warm-800 font-semibold text-left px-3 py-2 border border-warm-300">
    {children}
  </th>
);
const TD = ({ children }: { children: ReactNode }) => (
  <td className="text-warm-700 px-3 py-2 border border-warm-300 align-top">
    {children}
  </td>
);

// ─── Page content (TR only — KVKK is Turkish law) ────────────────────────────

export default function KvkkPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-warm-50">
        <div className="container mx-auto px-4 md:px-6 max-w-[860px] py-16 md:py-24">
          <article>
            <H1>Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni</H1>
            <p className="text-sm text-warm-500 mb-2">
              6698 Sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") Madde 10 Uyarınca
            </p>
            <p className="text-sm text-warm-500 mb-6">Tarih: 26 Mart 2026</p>

            <ContactBox>
              <p><B>Veri Sorumlusu:</B> Catalyst Education &amp; Research Inc.</p>
              <p>📍 173 Kingston Rd, Toronto, ON M4L 1T4, Kanada</p>
              <p>📧 info@catalysteducation.ca</p>
              <p>🌐 <A href="https://www.catalysteducation.ca/">catalysteducation.ca</A></p>
            </ContactBox>

            <H2>1. Veri Sorumlusunun Kimliği</H2>
            <P>Kişisel verileriniz, veri sorumlusu sıfatıyla <B>Catalyst Education &amp; Research Inc.</B> ("Catalyst Education" veya "Şirket") tarafından işlenmektedir.</P>
            <P>Catalyst Education, Ontario Ortaöğretim Diploma (OSSD) programını Türkiye'deki öğrencilere ve ailelerine sunan bir Kanada şirketidir. Türkiye'de yerleşik kişilerin verilerini işlemesi nedeniyle KVKK kapsamında veri sorumlusu yükümlülüklerini yerine getirmektedir.</P>
            <Note>
              <B>Önemli Not:</B> Yurt dışında yerleşik veri sorumlusu konumundaki Catalyst Education &amp; Research Inc., KVKK'nın 11. maddesi kapsamında yönelteceğiniz talepler için <B>info@catalysteducation.ca</B> adresini irtibat noktası olarak belirlemiştir.
            </Note>

            <H2>2. İşlenen Kişisel Veriler ve Kategorileri</H2>
            <P>Catalyst Education tarafından aşağıdaki kişisel veri kategorileri işlenmektedir:</P>
            <Table>
              <thead>
                <tr>
                  <TH>Veri Kategorisi</TH>
                  <TH>İşlenen Veriler</TH>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TD><B>Kimlik</B></TD>
                  <TD>Ad, soyad, doğum tarihi, T.C. kimlik numarası (yalnızca yasal zorunluluk halinde)</TD>
                </tr>
                <tr>
                  <TD><B>İletişim</B></TD>
                  <TD>E-posta adresi, telefon numarası, ikametgâh adresi</TD>
                </tr>
                <tr>
                  <TD><B>Eğitim</B></TD>
                  <TD>Okul adı, sınıf düzeyi, akademik notlar, diploma bilgileri</TD>
                </tr>
                <tr>
                  <TD><B>Aile/Veli</B></TD>
                  <TD>Veli/vasi adı, soyadı, iletişim bilgileri</TD>
                </tr>
                <tr>
                  <TD><B>Finansal</B></TD>
                  <TD>Ödeme işlem bilgileri (kart numaraları hariç; ödeme aracı tarafından işlenir)</TD>
                </tr>
                <tr>
                  <TD><B>İşlem Güvenliği</B></TD>
                  <TD>Şifre, kullanıcı adı, IP adresi, oturum bilgileri</TD>
                </tr>
                <tr>
                  <TD><B>Pazarlama</B></TD>
                  <TD>İletişim tercihleri, kampanya etkileşim verileri (açık rıza ile)</TD>
                </tr>
                <tr>
                  <TD><B>Teknik</B></TD>
                  <TD>Çerez verileri, tarayıcı ve cihaz bilgileri</TD>
                </tr>
              </tbody>
            </Table>
            <P><B>Özel nitelikli kişisel veri</B> işlenmesi halinde (sağlık verisi gibi) bu durum ayrıca açık rızanıza sunulacaktır.</P>

            <H2>3. Kişisel Verilerin İşlenme Amaçları</H2>
            <P>Kişisel verileriniz KVKK'nın 5. ve 6. maddeleri kapsamında aşağıdaki amaçlarla işlenmektedir:</P>

            <H3>3.1 Sözleşmenin Kurulması ve İfası (Madde 5/2-c)</H3>
            <UL>
              <LI>OSSD programı başvuru ve kayıt süreçlerinin yürütülmesi</LI>
              <LI>Öğrenci kimlik doğrulama ve hesap yönetimi</LI>
              <LI>Ödeme ve faturalama işlemlerinin gerçekleştirilmesi</LI>
              <LI>Program süresince akademik takip ve destek hizmetlerinin sağlanması</LI>
              <LI>Veli/vasi ile iletişimin sürdürülmesi</LI>
            </UL>

            <H3>3.2 Kanuni Yükümlülüklerin Yerine Getirilmesi (Madde 5/2-ç)</H3>
            <UL>
              <LI>Muhasebe, vergi ve denetim yükümlülüklerinin karşılanması</LI>
              <LI>Yetkili kamu kurum ve kuruluşlarına bilgi/belge sağlanması</LI>
              <LI>Ontario eğitim mevzuatından doğan yükümlülüklerin yerine getirilmesi</LI>
            </UL>

            <H3>3.3 Meşru Menfaat (Madde 5/2-f)</H3>
            <UL>
              <LI>Web sitesi güvenliğinin sağlanması ve teknik sorunların giderilmesi</LI>
              <LI>Hizmet kalitesinin analiz edilmesi ve iyileştirilmesi</LI>
              <LI>Dolandırıcılık ve yetkisiz erişimin önlenmesi</LI>
            </UL>

            <H3>3.4 Açık Rıza (Madde 5/1)</H3>
            <UL>
              <LI>Katalog, kampanya ve program güncellemelerine ilişkin pazarlama iletişimleri</LI>
              <LI>Kişiselleştirilmiş içerik ve önerilerin sunulması</LI>
              <LI>Kişisel verilerin yurt dışına aktarımı (Kanada)</LI>
            </UL>
            <Note>
              Açık rızanıza dayalı işlemler için rızanızı her zaman geri alabilirsiniz. Rızanızın geri alınması, geri almadan önceki işlemlerin hukuki geçerliliğini etkilemez.
            </Note>

            <H2>4. Kişisel Verilerin Aktarımı</H2>

            <H3>4.1 Yurt İçi Aktarım</H3>
            <P>Kişisel verileriniz, yasal zorunluluk halleri dışında yurt içindeki üçüncü taraflara aktarılmamaktadır.</P>

            <H3>4.2 Yurt Dışına Aktarım (KVKK Madde 9)</H3>
            <P>Şirket merkezinin Kanada'da bulunması nedeniyle kişisel verileriniz yurt dışına aktarılmaktadır. Bu aktarım aşağıdaki taraflara gerçekleşmektedir:</P>
            <Table>
              <thead>
                <tr>
                  <TH>Alıcı / Hizmet</TH>
                  <TH>Aktarım Amacı</TH>
                  <TH>Aktarım Dayanağı</TH>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TD>Catalyst Education &amp; Research Inc. (Kanada)</TD>
                  <TD>Hizmet sunumu</TD>
                  <TD>Açık rıza / Sözleşme ifası</TD>
                </tr>
                <tr>
                  <TD>E-posta ve CRM platformu (ör. HubSpot)</TD>
                  <TD>İletişim ve müşteri yönetimi</TD>
                  <TD>Açık rıza / Meşru menfaat</TD>
                </tr>
                <tr>
                  <TD>Ödeme aracı (ör. Stripe/İyzico)</TD>
                  <TD>Ödeme işlemleri</TD>
                  <TD>Sözleşme ifası</TD>
                </tr>
                <tr>
                  <TD>Çerez analiz platformu</TD>
                  <TD>Web sitesi analizi</TD>
                  <TD>Açık rıza</TD>
                </tr>
              </tbody>
            </Table>
            <P><B>Kanada</B> hakkında: Avrupa Komisyonu, Kanada'yı GDPR kapsamında yeterli veri korumasına sahip ülke olarak tanımıştır. Catalyst Education, KVKK Madde 9 kapsamında açık rızanıza veya Kişisel Verileri Koruma Kurulu tarafından belirlenen güvenli ülkeler listesine dayanarak aktarım yapmaktadır.</P>

            <H2>5. Kişisel Verilerin Saklanma Süreleri</H2>
            <P>Kişisel verileriniz, işlenme amacının gerektirdiği süre ve yasal saklama yükümlülükleri çerçevesinde saklanmaktadır:</P>
            <Table>
              <thead>
                <tr>
                  <TH>Veri Türü</TH>
                  <TH>Saklama Süresi</TH>
                </tr>
              </thead>
              <tbody>
                <tr><TD>Başvuru ve kayıt bilgileri</TD><TD>Program bitiminden itibaren 5 yıl</TD></tr>
                <tr><TD>Öğrenci akademik kayıtları</TD><TD>Program bitiminden itibaren 10 yıl</TD></tr>
                <tr><TD>Pazarlama iletişim verileri</TD><TD>Rızanın geri alınmasına kadar</TD></tr>
                <tr><TD>Ödeme kayıtları</TD><TD>Vergi mevzuatı uyarınca</TD></tr>
                <tr><TD>Teknik/log verileri</TD><TD>1 yıl</TD></tr>
              </tbody>
            </Table>
            <P>Saklama süresi dolan veriler, KVKK'nın 7. maddesi ve ilgili yönetmelik hükümleri çerçevesinde <B>silinir, yok edilir veya anonim hale getirilir.</B></P>

            <H2>6. KVKK Madde 11 Kapsamındaki Haklarınız</H2>
            <P>Kişisel veri sahipleri olarak aşağıdaki haklara sahipsiniz:</P>
            <UL>
              <LI><B>a)</B> Kişisel verilerinizin işlenip işlenmediğini öğrenme,</LI>
              <LI><B>b)</B> Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</LI>
              <LI><B>c)</B> Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</LI>
              <LI><B>d)</B> Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,</LI>
              <LI><B>e)</B> Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</LI>
              <LI><B>f)</B> KVKK'nın 7. maddesi kapsamında kişisel verilerin silinmesini veya yok edilmesini isteme,</LI>
              <LI><B>g)</B> (e) ve (f) bentleri kapsamında yapılan işlemlerin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</LI>
              <LI><B>h)</B> İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</LI>
              <LI><B>i)</B> Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</LI>
            </UL>

            <H2>7. Başvuru Yöntemi</H2>
            <P>Yukarıda belirtilen haklarınızı kullanmak için <B>info@catalysteducation.ca</B> adresine, kimliğinizi doğrulayan bilgiler ve talebinizi içeren bir e-posta gönderebilirsiniz.</P>
            <P><B>Başvurunuzda bulunması gerekenler:</B></P>
            <UL>
              <LI>Ad, soyad</LI>
              <LI>T.C. kimlik numarası veya pasaport numarası (kimlik doğrulama amacıyla)</LI>
              <LI>İletişim bilgisi (e-posta veya telefon)</LI>
              <LI>Talep konusu</LI>
            </UL>
            <P>Başvurularınız, talebin niteliğine göre <B>en geç 30 (otuz) gün</B> içinde ücretsiz olarak yanıtlanacaktır. Talebin ayrıca bir maliyet gerektirmesi durumunda Kişisel Verileri Koruma Kurulu tarafından belirlenen tarife esas alınacaktır.</P>

            <H2>8. Kişisel Verileri Koruma Kurumu'na Başvuru</H2>
            <P>Başvurunuzun reddedilmesi, verilen cevabın yetersiz bulunması veya süresinde yanıt verilmemesi halinde; cevabı öğrendiğiniz tarihten itibaren <B>15 gün</B> ve her hâlde başvuru tarihinden itibaren <B>60 gün</B> içinde <B>Kişisel Verileri Koruma Kurumu'na</B> şikâyette bulunabilirsiniz.</P>
            <ContactBox>
              <p><B>Kişisel Verileri Koruma Kurumu</B></p>
              <p>📍 Nasuh Akar Mahallesi, Ziyabey Caddesi No: 1407, 06520 Balgat / Ankara</p>
              <p>📞 0312 216 50 50</p>
              <p>🌐 <A href="https://www.kvkk.gov.tr/">kvkk.gov.tr</A></p>
            </ContactBox>

            <H2>9. Aydınlatma Metninin Güncellenmesi</H2>
            <P>Bu Aydınlatma Metni, KVKK ve ilgili mevzuatta değişiklik olması veya veri işleme faaliyetlerimizde güncelleme yapılması durumunda revize edilecektir. Güncel metin her zaman web sitemizde yayımlanacaktır.</P>

            <p className="text-[13px] text-warm-500 mt-12 italic border-t border-warm-300 pt-6">
              Bu metin, 6698 Sayılı Kişisel Verilerin Korunması Kanunu'nun 10. maddesi ile Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ hükümlerine uygun olarak hazırlanmıştır.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
