type ArticleSection = {
  id: string;
  title: string;
  blocks: (
    | { kind: "paragraph"; text: string }
    | { kind: "list"; items: string[] }
  )[];
};

export const introduction = [
  "Kanada'nın Ontario eyaletinde lise eğitimi yalnızca akademik başarıya değil, öğrencilerin günlük yaşamda kullanabilecekleri becerilere de odaklanıyor.",
  "2026–2027 eğitim yılında uygulamaya giren yeni bir mezuniyet gerekliliği, bu yaklaşımın somut örneklerinden biri: Finansal Okuryazarlık (Financial Literacy).",
  "Öğrencilerin bütçe hazırlama, tasarruf, faiz, kredi ve finansal güvenlik gibi konulardaki bilgilerini değerlendiren bu uygulamanın öğrenme modülleri ve değerlendirme soruları, Ontario'nun kamu eğitim kuruluşu TVO tarafından geliştirildi.",
  "Peki bu yenilik hangi öğrencileri kapsıyor, öğrenciler neler öğreniyor ve TVO'nun rolü neden önemli?"
];

export const sections = [
  {
    id: "kisa-cevap",
    title: "Kısa Cevap: Ontario'da Finansal Okuryazarlık Nedir?",
    blocks: [
      {
        kind: "paragraph",
        text: "Ontario'da 2026–2027 eğitim yılından itibaren, 2025–2026 yılında veya sonrasında 9. sınıfa başlayan öğrenciler için finansal okuryazarlık yeni OSSD mezuniyet gerekliliklerinden biri haline geldi."
      },
      {
        kind: "paragraph",
        text: "Öğrenciler bu gerekliliği 10. sınıftaki zorunlu Career Studies dersi kapsamında tamamlıyor."
      },
      {
        kind: "paragraph",
        text: "Amaç, öğrencilerin günlük yaşamlarında karşılaşabilecekleri finansal durumları daha iyi anlamalarını ve bilinçli kararlar vermelerini desteklemek."
      },
      {
        kind: "paragraph",
        text: "Yeni uygulamanın modülleri ve değerlendirme soruları TVO tarafından geliştiriliyor."
      }
    ]
  },
  {
    id: "neden-onemli",
    title: "Finansal Okuryazarlık Neden Lise Eğitiminde Önemli?",
    blocks: [
      {
        kind: "paragraph",
        text: "Bir öğrenci matematik problemlerini çözebilir. Ancak aynı öğrenci bir banka hesabı seçerken, kredi kartı koşullarını değerlendirirken veya aylık harcamalarını planlarken de bilgiye dayalı kararlar verebiliyor mu?"
      },
      {
        kind: "paragraph",
        text: "Finansal okuryazarlık, finansal kavramların teorik olarak bilinmesinin ötesinde, bu bilgilerin gerçek yaşamda kullanılabilmesidir."
      },
      {
        kind: "paragraph",
        text: "Ontario eğitim sistemi, erken sınıflardan itibaren finansal kavramlara matematik müfredatında yer veriyor."
      },
      {
        kind: "paragraph",
        text: "Öğrencilerin geliştirmesi hedeflenen beceriler arasında bütçe oluşturma, tasarruf, finansal hedef belirleme, faiz, borçlanma, bilinçli tüketim ve finansal güvenlik bulunuyor."
      },
      {
        kind: "paragraph",
        text: "Bu yaklaşım, öğrencilerin üniversite yaşamına ve yetişkinlik dönemindeki sorumluluklarına hazırlanmasına katkıda bulunmayı hedefliyor."
      }
    ]
  },
  {
    id: "ne-degisti",
    title: "2026–2027 Eğitim Yılında Ne Değişti?",
    blocks: [
      {
        kind: "paragraph",
        text: "Ontario Eğitim Bakanlığı'nın Financial Literacy Graduation Requirement düzenlemesi kapsamında:"
      },
      {
        kind: "list",
        items: [
          "Gereklilik, kapsama giren öğrencilerin 10. sınıf Career Studies dersi içinde uygulanır.",
          "Öğrencilerin modüllerde en az %70 başarı elde etmesi gerekir.",
          "Ders kapsamında en fazla iki değerlendirme hakkı bulunur.",
          "Değerlendirme sonucu Career Studies dersinin final notunun %5'ini oluşturur. Birden fazla denemede en yüksek not kullanılır. Gerekliliği daha önce karşılayan veya muaf olan öğrencilerde bu %5 final notuna dâhil edilmez.",
          "Gereklilik karşılandığında bu durum resmi Ontario Student Transcript belgesine işlenir.",
          "Gerekliliği ilk iki denemesinde karşılayamayan öğrenciler için ek destek ve alternatif tamamlama yolları bulunmaktadır."
        ]
      },
      {
        kind: "paragraph",
        text: "Bu uygulama, bütün öğrencilere ayrı bir finans dersi eklenmesi anlamına gelmez."
      },
      {
        kind: "paragraph",
        text: "Finansal okuryazarlık, mevcut Ontario müfredatıyla bağlantılı yeni bir mezuniyet gerekliliğidir."
      }
    ]
  },
  {
    id: "tvo-rolu",
    title: "TVO'nun Finansal Okuryazarlık Eğitimindeki Resmi Rolü",
    blocks: [
      {
        kind: "paragraph",
        text: "Yeni uygulamanın önemli özelliklerinden biri, TVO'nun içerik ve değerlendirme geliştirme sorumluluğudur."
      },
      {
        kind: "paragraph",
        text: "Ontario Eğitim Bakanlığı'nın resmi politika belgelerinde, finansal okuryazarlık mezuniyet gerekliliğinin öğrenme modüllerinin ve değerlendirme sorularının TVO tarafından geliştirildiği açıkça belirtiliyor."
      },
      {
        kind: "paragraph",
        text: "TVO (Ontario Educational Communications Authority), Ontario hükümeti tarafından finanse edilen ve denetlenen bir kamu eğitim kuruluşudur."
      },
      {
        kind: "paragraph",
        text: "TVO'nun bu çalışması, kurumun yalnızca kendi öğrenci kitlesine değil, Ontario eğitim sisteminin genelindeki öğrenci ve öğretmenlere de destek sağladığını gösteriyor."
      },
      {
        kind: "paragraph",
        text: "Burada kurumsal rolleri doğru tanımlamak önemlidir: Ontario eğitim politikasını ve mezuniyet gerekliliklerini Bakanlık belirler; TVO ise ilgili öğrenme ve değerlendirme kaynaklarını geliştirir."
      }
    ]
  },
  {
    id: "universite-hayati",
    title: "Finansal Okuryazarlık Üniversite Hayatına Nasıl Katkı Sağlar?",
    blocks: [
      {
        kind: "paragraph",
        text: "Üniversite hayatına başlayan öğrenciler, günlük yaşamlarıyla ilgili daha fazla finansal sorumluluk üstlenebilir."
      },
      {
        kind: "paragraph",
        text: "Konaklama, ulaşım ve yaşam giderlerinin planlanması, banka hesaplarının yönetimi, burs ve eğitim maliyetlerinin karşılaştırılması bu sorumluluklardan bazılarıdır."
      },
      {
        kind: "paragraph",
        text: "Özellikle uluslararası üniversite hedefi bulunan öğrenciler için farklı para birimleriyle işlem yapmak ve finansal bütçeyi yönetmek önemli hale gelebilir."
      },
      {
        kind: "paragraph",
        text: "Finansal okuryazarlık eğitimi, öğrencilerin bu konularda bilinçli ve bilgiye dayalı kararlar alabilmelerini destekleyebilir."
      }
    ]
  },
  {
    id: "turkiyedeki-ogrenciler",
    title: "Türkiye'deki OSSD Öğrencileri İçin Yeni Gereklilik Zorunlu mu?",
    blocks: [
      {
        kind: "paragraph",
        text: "Yeni finansal okuryazarlık mezuniyet gerekliliği bütün öğrencilere aynı şekilde uygulanmaz."
      },
      {
        kind: "paragraph",
        text: "Ontario dışından 11. veya 12. sınıf seviyesinde gelen öğrencilere, denklik süreciyle 10. sınıf Career Studies kredisi dâhil olmak üzere 9. ve 10. sınıf kredileri tanındığında, Ontario'nun ilgili düzenlemesi kapsamında muafiyet uygulanabilir. Bu karar okul müdürünün yetkisi çerçevesinde değerlendirilir."
      },
      {
        kind: "paragraph",
        text: "Dolayısıyla Türkiye'den TVO ILC programına katılan bütün öğrencilerin aynı finansal okuryazarlık değerlendirmesine tabi olduğunu söylemek doğru değildir."
      },
      {
        kind: "paragraph",
        text: "Öğrencinin önceki eğitimi, sınıf seviyesi, denklik sonuçları ve TVO ILC'nin ilgili gereklilikleri dikkate alınmalıdır."
      },
      {
        kind: "paragraph",
        text: "Ontario düzenlemeleri, TVO ILC'nin uygun koşullarda çevrim içi sınav gözetimi kullanmasına da izin vermektedir. Bu izin, öğrencilerin her durumda uzaktan değerlendirmeye girebileceği anlamına gelmez."
      }
    ]
  },
  {
    id: "sonuc",
    title: "Sonuç — Eğitim Hayata da Hazırlamalı",
    blocks: [
      {
        kind: "paragraph",
        text: "Ontario'nun finansal okuryazarlık mezuniyet gerekliliği, öğrencilerin akademik bilgilerinin yanında günlük yaşam becerilerini de geliştirmeyi hedefleyen eğitim yaklaşımının somut örneklerinden biridir."
      },
      {
        kind: "paragraph",
        text: "Bu uygulamanın öğrenme ve değerlendirme modüllerinin TVO tarafından geliştirilmesi, kurumun Ontario eğitim ekosistemindeki rolünü gösteriyor."
      },
      {
        kind: "paragraph",
        text: "Çünkü kaliteli eğitim yalnızca üniversiteye değil, hayata da hazırlar."
      },
      {
        kind: "paragraph",
        text: "Catalyst Education olarak Ontario eğitim sisteminin öğrencilerin akademik ve kişisel gelişimine katkı sağlayan farklı yönlerini paylaşmaya devam ediyoruz."
      }
    ]
  }
] satisfies ArticleSection[];

export const faqItems = [
  {
    question: "Kanada'da finansal okuryazarlık eğitimi zorunlu mu?",
    answer: "Ontario'da 2026–2027 eğitim yılından itibaren belirli öğrenci grupları için finansal okuryazarlık mezuniyet gerekliliği uygulanıyor. Kapsam, öğrencinin 9. sınıfa başlama yılına ve varsa muafiyet koşullarına bağlıdır."
  },
  {
    question: "Finansal okuryazarlık ayrı bir lise dersi mi?",
    answer: "Hayır. Yeni mezuniyet gerekliliği 10. sınıftaki zorunlu Career Studies dersi kapsamında tamamlanır. Finansal okuryazarlık konuları daha erken sınıflardan itibaren müfredatta da yer alır."
  },
  {
    question: "Finansal okuryazarlık değerlendirmesinde başarı notu kaçtır?",
    answer: "Öğrencilerin gerekliliği karşılamak için modüllerden en az %70 alması gerekir."
  },
  {
    question: "TVO ILC öğrencileri bu gerekliliği tamamlamak zorunda mı?",
    answer: "Bu durum öğrencinin sınıfına, kayıt geçmişine, denklik değerlendirmesine ve geçerli muafiyet koşullarına bağlıdır. Her öğrenci için otomatik zorunluluk varsayılmamalıdır."
  },
  {
    question: "Türkiye'de okurken OSSD diploması alınabilir mi?",
    answer: "Uygun öğrenciler Türkiye'deki eğitimlerine devam ederken TVO ILC'nin online lise programına katılabilir ve belirlenen akademik gereklilikleri tamamlayarak OSSD diploması alabilir."
  }
];

export const references = [
  {
    label: "Ontario Ministry of Education — Financial Literacy Education in Schools",
    href: "https://www.ontario.ca/page/financial-literacy-education-schools"
  },
  {
    label: "Ontario Schools — Section 6.1.4 Financial Literacy Graduation Requirement",
    href: "https://www.ontario.ca/document/ontario-schools-kindergarten-grade-12-policy-and-program-requirements/diploma-and-certificate-requirements-related-procedures"
  },
  {
    label: "Ontario Ministry of Education — Growing Success",
    href: "https://www.ontario.ca/page/growing-success-assessment-evaluation-and-reporting-ontario-schools-kindergarten-grade-12"
  }
];
