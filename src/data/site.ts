/**
 * =============================================================================
 *  SITE.TS — Gabinet Weterynaryjny Maciej Tyszka, Gryfino
 *  Kategoria: Uslugi (archetyp „Karta") · Profil: weterynarz · Motyw: morski
 * =============================================================================
 *  ŹRÓDŁA DANYCH
 *  Kontakt (adres, telefon, e-mail, link do Map) — lead ID 41 z
 *  `research/leady-firmy-tracker.xlsx`. Te pola są realne i sprawdzone.
 *
 *  DANE DO POTWIERDZENIA PRZED WYSŁANIEM KLIENTOWI
 *  Godziny przyjęć i wszystkie ceny w `offer` to wartości poglądowe, ustawione
 *  na poziomie typowym dla gabinetu w powiecie gryfińskim (2026). Gabinet nie
 *  publikuje cennika ani grafiku — nie mieliśmy skąd ich wziąć. W rozmowie
 *  z klientem traktujemy je jako „przykładowe wypełnienie", nie jako jego ofertę.
 * =============================================================================
 */

export interface ServiceItem {
  name: string;
  description?: string;
  price?: number;
  priceFrom?: boolean;
  unit?: string;
  priceNote?: string;
  tags?: string[];
}

export interface ServiceCategory {
  id: string;
  label: string;
  note?: string;
  items: ServiceItem[];
}

export interface NavItem {
  label: string;
  id?: string;
  path?: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  category: string;
}

export const site = {
  // ---------------------------------------------------------------------------
  // MARKA
  // ---------------------------------------------------------------------------
  brand: {
    name: "Gabinet Tyszka",
    nameSuffix: "Weterynarz Gryfino",
    legalName: "Gabinet Weterynaryjny Maciej Tyszka",
    logoFull: "/logo-mark.svg",
    logoMark: "/logo-mark.svg",
    blurb:
      "Gabinet weterynaryjny w Gryfinie. Profilaktyka, diagnostyka i zabiegi " +
      "dla psów, kotów i małych zwierząt domowych.",
  },

  // ---------------------------------------------------------------------------
  // SEO / TYTUŁY
  // ---------------------------------------------------------------------------
  seo: {
    title: "Gabinet Tyszka — gabinet weterynaryjny w Gryfinie",
    titleTemplate: "%s | Gabinet Tyszka",
    description:
      "Gabinet weterynaryjny Maciej Tyszka w Gryfinie, ul. Krasińskiego 82. " +
      "Szczepienia, diagnostyka, zabiegi chirurgiczne i wizyty kontrolne. " +
      "Umów wizytę telefonicznie.",
    lang: "pl",
  },

  // ---------------------------------------------------------------------------
  // MOTYW — wariant „morski" z profile/weterynarz.ts (pierwszy klient w branży)
  // ---------------------------------------------------------------------------
  theme: {
    colors: {
      primary: "oklch(0.62 0.13 205)",
      primaryForeground: "oklch(0.99 0 0)",
      background: "oklch(0.985 0.004 220)",
      foreground: "oklch(0.19 0.015 235)",
      dark: "#101820",
      darkSurface: "#1a2530",
      darkForeground: "#eef3f7",
    },
    fonts: {
      display: '"Outfit", sans-serif',
      sans: '"Inter", sans-serif',
    },
    fontsUrl:
      "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
    radius: "0.9rem",
  },

  // ---------------------------------------------------------------------------
  // KONTAKT — dane realne (lead ID 41)
  // ---------------------------------------------------------------------------
  contact: {
    address: {
      street: "ul. Krasińskiego 82/U-20",
      city: "Gryfino",
      zip: "74-100",
      full: "ul. Krasińskiego 82/U-20, 74-100 Gryfino",
      googleMapsUrl:
        "https://maps.google.com/?q=Gabinet+Weterynaryjny+Tyszka+Gryfino+Krasinskiego",
    },
    phone: "+48 607 664 430",
    email: "maciejtyszka@wp.pl",
  },

  // ---------------------------------------------------------------------------
  // GODZINY OTWARCIA — POGLĄDOWE, do potwierdzenia z klientem
  // ---------------------------------------------------------------------------
  hours: {
    closedLabel: "Nieczynne",
    display: [
      { day: "Poniedziałek - Piątek", hours: "09:00 - 18:00" },
      { day: "Sobota", hours: "09:00 - 13:00" },
      { day: "Niedziela", hours: "Nieczynne" },
    ],
  },

  // ---------------------------------------------------------------------------
  // UDOGODNIENIA
  // ---------------------------------------------------------------------------
  features: [
    "Umawianie telefoniczne",
    "Gabinet zabiegowy",
    "Diagnostyka na miejscu",
    "Krótkie terminy",
    "Nagłe przypadki poza kolejnością",
  ],

  // ---------------------------------------------------------------------------
  // LINKI ZEWNĘTRZNE — gabinet nie prowadzi rezerwacji online ani profili
  // ---------------------------------------------------------------------------
  links: {
    booking: "",
  },
  socials: {
    facebook: "",
    instagram: "",
  },

  // ---------------------------------------------------------------------------
  // NAWIGACJA
  // ---------------------------------------------------------------------------
  nav: [
    { label: "Start", id: "start" },
    { label: "O nas", id: "story" },
    { label: "Cennik", id: "offer" },
    { label: "Galeria", path: "/galeria" },
    { label: "Kontakt", id: "contact" },
  ] as NavItem[],

  navCta: {
    label: "Umów wizytę",
    mobileLabel: "Umów wizytę",
    targetId: "contact",
  },

  // ---------------------------------------------------------------------------
  // TEKSTY SEKCJI
  // ---------------------------------------------------------------------------
  hero: {
    titleLines: ["Gabinet weterynaryjny", "w Gryfinie"],
    subtitle:
      "Opieka weterynaryjna dla psów, kotów i małych zwierząt — profilaktyka, " +
      "diagnostyka i zabiegi w jednym miejscu.",
    subtitleAccent: "Umów wizytę telefonicznie.",
    icon: "Stethoscope",
    ctaPrimary: { label: "Zobacz cennik", targetId: "offer" },
    ctaSecondary: { label: "Umów wizytę", targetId: "contact" },
    backgroundImage:
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=1600&auto=format&fit=crop",
  },

  info: {
    eyebrow: "Lokalizacja & kontakt",
    heading: "ZNAJDŹ NAS",
    addressTitle: "ADRES",
    addressCta: "Nawiguj",
    hoursTitle: "GODZINY PRZYJĘĆ",
    contactTitle: "KONTAKT",
    phoneLabel: "Rejestracja",
    emailLabel: "E-mail",
    contactCta: "Umów wizytę",
    banner: {
      title: "Nagły przypadek?",
      text: "Zadzwoń przed przyjazdem — przygotujemy gabinet i skrócimy czekanie.",
      cta: "Napisz do nas",
    },
  },

  story: {
    enabled: true,
    eyebrow: "Kilka słów o nas",
    heading: "Zwierzę u nas nie jest przypadkiem z kolejki",
    paragraphs: [
      "Wizyta u weterynarza bywa stresem — dla zwierzęcia i dla właściciela. " +
        "Dlatego pracujemy bez pośpiechu: najpierw badanie i rozmowa, dopiero " +
        "potem decyzja o leczeniu.",
      "Tłumaczymy, co się dzieje i dlaczego proponujemy dany zabieg. Zanim " +
        "cokolwiek zrobimy, wiesz ile to potrwa i z czym się wiąże.",
    ],
    points: [
      {
        icon: "PawPrint",
        title: "Spokojne badanie",
        text: "Dajemy zwierzęciu czas na oswojenie się z gabinetem.",
      },
      {
        icon: "HeartHandshake",
        title: "Rozmowa przed leczeniem",
        text: "Wyjaśniamy przebieg i koszt zabiegu, zanim się na niego zdecydujesz.",
      },
      {
        icon: "Clock",
        title: "Krótkie terminy",
        text: "Nagłe przypadki przyjmujemy poza kolejnością — zadzwoń przed przyjazdem.",
      },
    ],
    image: {
      src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=1400&auto=format&fit=crop",
      alt: "Pies na rękach właścicielki",
    },
    caption: "",
    cta: { label: "Umów wizytę", targetId: "contact" },
  },

  // ---------------------------------------------------------------------------
  // CENNIK — ceny POGLĄDOWE (patrz nagłówek pliku)
  // ---------------------------------------------------------------------------
  offer: {
    eyebrow: "Zakres usług",
    heading: "CENNIK",
    subtitle:
      "Wybierz kategorię i sprawdź, w czym możemy pomóc Twojemu zwierzakowi.",
    currency: "zł",
    fromLabel: "od",
    categories: [
      {
        id: "wizyty",
        label: "Wizyty",
        note: "Na wizytę planową umów się telefonicznie — unikniesz czekania.",
        items: [
          {
            name: "Konsultacja lekarska",
            description:
              "Wywiad, badanie kliniczne i plan dalszego postępowania.",
            price: 90,
          },
          {
            name: "Wizyta kontrolna",
            description: "Ocena postępów leczenia i korekta zaleceń.",
            price: 60,
          },
          {
            name: "Wizyta nagła",
            description: "Przyjęcie poza kolejnością. Zadzwoń przed przyjazdem.",
            price: 150,
            priceFrom: true,
            tags: ["na cito"],
          },
          {
            name: "Wizyta domowa",
            description: "Dojazd do pacjenta — dostępność zależy od grafiku.",
            price: 200,
            priceFrom: true,
            tags: ["na zapisy"],
          },
        ],
      },
      {
        id: "profilaktyka",
        label: "Profilaktyka",
        note: "Wizyty planowe — warto umówić się z wyprzedzeniem.",
        items: [
          {
            name: "Szczepienie psa",
            description:
              "Szczepienie podstawowe lub przypominające, z wpisem do książeczki.",
            price: 100,
            priceFrom: true,
          },
          {
            name: "Szczepienie kota",
            description:
              "Szczepienie podstawowe lub przypominające, z wpisem do książeczki.",
            price: 100,
            priceFrom: true,
          },
          {
            name: "Odrobaczanie",
            description:
              "Dobór preparatu i dawki do gatunku, wieku i masy ciała.",
            price: 40,
            priceFrom: true,
          },
          {
            name: "Czipowanie",
            description: "Wszczepienie mikroczipu i rejestracja w bazie.",
            price: 90,
          },
          {
            name: "Paszport dla zwierzęcia",
            description:
              "Wydanie paszportu do podróży zagranicznych — wymaga czipu i aktualnego szczepienia.",
            price: 70,
          },
          {
            name: "Przegląd zdrowia",
            description: "Badanie ogólne, ocena kondycji, zębów i masy ciała.",
            price: 90,
          },
        ],
      },
      {
        id: "diagnostyka",
        label: "Diagnostyka",
        note: "Wymaga wcześniejszego umówienia terminu.",
        items: [
          {
            name: "Badanie USG",
            description: "Ocena narządów jamy brzusznej, diagnostyka ciąży.",
            price: 150,
            priceFrom: true,
          },
          {
            name: "RTG",
            description: "Zdjęcie rentgenowskie wraz z opisem.",
            price: 130,
            priceFrom: true,
          },
          {
            name: "Badania krwi",
            description: "Morfologia i biochemia, wynik zwykle tego samego dnia.",
            price: 140,
            priceFrom: true,
          },
          {
            name: "Badanie cytologiczne",
            description:
              "Pobranie i ocena materiału ze zmian skórnych lub guzków.",
            price: 100,
            priceFrom: true,
          },
        ],
      },
      {
        id: "zabiegi",
        label: "Zabiegi i chirurgia",
        note: "Zawsze po wcześniejszej kwalifikacji i badaniu.",
        items: [
          {
            name: "Kastracja kota",
            description: "Zabieg planowy w znieczuleniu ogólnym.",
            price: 280,
          },
          {
            name: "Sterylizacja kotki",
            description: "Zabieg planowy w znieczuleniu ogólnym.",
            price: 450,
          },
          {
            name: "Kastracja / sterylizacja psa",
            description: "Cena zależna od masy ciała — ustalana po badaniu.",
            price: 600,
            priceFrom: true,
          },
          {
            name: "Usuwanie kamienia nazębnego",
            description: "Skaling ultradźwiękowy i polerowanie, w sedacji.",
            price: 350,
            priceFrom: true,
          },
          {
            name: "Opatrunki i szycie ran",
            description: "Zaopatrzenie ran, zmiana opatrunku, zdjęcie szwów.",
            price: 120,
            priceFrom: true,
          },
          {
            name: "Zabiegi chirurgiczne",
            description: "Zakres i termin ustalane indywidualnie po konsultacji.",
            priceNote: "wycena po badaniu",
          },
        ],
      },
    ] as ServiceCategory[],
  },

  // ---------------------------------------------------------------------------
  // GALERIA — zdjęcia szablonowe (klient nie dostarczył własnych)
  // ---------------------------------------------------------------------------
  gallery: {
    eyebrow: "Zobacz na własne oczy",
    heading: "GALERIA",
    subtitle: "Gabinet i sprzęt, z którym pracujemy.",
    allLabel: "Wszystko",
    categories: [
      { id: "gabinet", label: "Gabinet" },
      { id: "zespol", label: "Zespół" },
    ] as GalleryCategory[],
    photos: [
      {
        src: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=1200&auto=format&fit=crop",
        alt: "Gabinet weterynaryjny — stół zabiegowy",
        category: "gabinet",
      },
      {
        src: "https://images.unsplash.com/photo-1584467735815-f778f274e296?q=80&w=1200&auto=format&fit=crop",
        alt: "Poczekalnia gabinetu",
        category: "gabinet",
      },
      {
        src: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=1200&auto=format&fit=crop",
        alt: "Lekarz weterynarii podczas badania psa",
        category: "zespol",
      },
      {
        src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1200&auto=format&fit=crop",
        alt: "Badanie kota w gabinecie",
        category: "zespol",
      },
    ] as GalleryPhoto[],
  },

  // ---------------------------------------------------------------------------
  // FAQ
  // ---------------------------------------------------------------------------
  faq: {
    eyebrow: "O co pytacie?",
    heading: "FAQ",
    subtitle:
      "Najczęściej zadawane pytania. Jak nie ma tu Twojego, zadzwoń do nas śmiało.",
    items: [
      {
        question: "Czy trzeba umawiać się na wizytę?",
        answer:
          "Na wizyty planowe — szczepienia, przeglądy, badania — tak, dzięki temu " +
          "nie czekasz w poczekalni ze zestresowanym zwierzakiem. W nagłych " +
          "przypadkach zadzwoń przed przyjazdem, przyjmiemy poza kolejnością.",
      },
      {
        question: "Co zabrać na pierwszą wizytę?",
        answer:
          "Książeczkę zdrowia lub paszport, jeśli zwierzę je ma, oraz wyniki " +
          "wcześniejszych badań. Psy prosimy na smyczy, koty i małe zwierzęta " +
          "w transporterze — to kwestia bezpieczeństwa wszystkich pacjentów.",
      },
      {
        question: "Czy przyjmujecie w nagłych przypadkach?",
        answer:
          "Tak, w godzinach pracy gabinetu. Zadzwoń, zanim wyjedziesz z domu — " +
          "przygotujemy gabinet, a Ty nie stracisz czasu na czekanie.",
      },
      {
        question: "Czy wystawiacie paszporty i czipujecie zwierzęta?",
        answer:
          "Tak. Wszczepiamy mikroczip, rejestrujemy zwierzę w bazie i wydajemy " +
          "paszport — komplet potrzebny do podróży zagranicznych. Warto załatwić " +
          "to z wyprzedzeniem, nie tuż przed wyjazdem.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // UMAWIANIE WIZYTY
  // ---------------------------------------------------------------------------
  reservation: {
    headingLines: ["UMÓW", "WIZYTĘ"],
    subtitle:
      "Wybierz usługę i dogodny termin, a my potwierdzimy go telefonicznie.",
    directContactLabel: "Bezpośredni kontakt",
    external: {
      enabled: false,
      title: "Wolisz umówić się od razu?",
      text: "Pełną listę terminów znajdziesz również w naszym systemie rezerwacji.",
      cta: "Rezerwuj online",
    },
    labels: {
      name: "Imię i nazwisko",
      phone: "Numer telefonu",
      email: "E-mail",
      service: "Usługa",
      date: "Data",
      time: "Godzina",
      message: "Wiadomość",
      submit: "WYŚLIJ ZGŁOSZENIE",
    },
    placeholders: {
      name: "Jan Kowalski",
      phone: "+48 000 000 000",
      email: "email@adres.pl",
      service: "Wybierz usługę",
      date: "Wybierz datę",
      message: "Gatunek, wiek i powód wizyty...",
    },
    serviceOtherLabel: "Inna / do ustalenia",
    consent:
      "Rozumiem, że termin jest potwierdzony dopiero po otrzymaniu wiadomości " +
      "zwrotnej lub telefonu z gabinetu.",
    disclaimer:
      "Wysyłając wiadomość zgadzasz się na przetwarzanie danych osobowych w celu i zakresie niezbędnym do umówienia wizyty.",
    timeSlots: { fromHour: 9, toHour: 17, stepMin: 30 },
    toasts: {
      validationTitle: "Proszę uzupełnić wymagane pola",
      validationDesc: "Wymagane pola zostały zaznaczone na czerwono.",
      successTitle: "Zgłoszenie wysłane pomyślnie!",
      successDesc: "Skontaktujemy się z Tobą wkrótce w celu potwierdzenia.",
    },
    confirm: {
      title: "Potwierdź dane zgłoszenia",
      description: "Sprawdź poprawność wprowadzonych danych przed wysłaniem.",
      back: "Popraw dane",
      submit: "Wyślij zgłoszenie",
    },
  },

  // ---------------------------------------------------------------------------
  // STOPKA
  // ---------------------------------------------------------------------------
  footer: {
    navTitle: "Nawigacja",
    findUsTitle: "Znajdź nas",
    hoursTitle: "Przyjmujemy",
    legalLinks: [
      { label: "Polityka Prywatności", href: "#" },
      { label: "Regulamin", href: "#" },
      { label: "Cookies", href: "#" },
    ],
    credit: { prefix: "Strona stworzona przez", label: "Addigital" },
  },

  // ---------------------------------------------------------------------------
  // STRONA 404
  // ---------------------------------------------------------------------------
  notFound: {
    title: "404 - Strona nie znaleziona",
  },
} as const;

export type Site = typeof site;
