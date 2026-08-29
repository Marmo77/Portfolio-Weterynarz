import { site } from "../data/site";

const ADMIN = {
  name: "Aleksy Dobrodziej",
  brand: "AD digital (Addigital)",
  email: "aleksydobrodziej@gmail.com",
  phone: "+48 510 378 629",
  city: "Szczecin",
};

const UPDATED = "29 sierpnia 2026 r.";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl font-bold mb-3 text-foreground">
        {title}
      </h2>
      <div className="text-muted-foreground leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function Prywatnosc() {
  return (
    <div className="bg-background text-foreground py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          Informacje prawne
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
          Polityka prywatności
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-12">
          Dotyczy strony internetowej {site.brand.name}.
        </p>

        <Section title="Administrator strony">
          <p>
            Administratorem tej strony internetowej jest {ADMIN.name},
            działający pod nazwą {ADMIN.brand}, {ADMIN.city} — działalność
            nierejestrowana, bez wpisu do CEIDG. W sprawach dotyczących
            niniejszej strony i przetwarzania danych
            możesz się skontaktować pod adresem{" "}
            <a
              href={`mailto:${ADMIN.email}`}
              className="underline hover:text-primary"
            >
              {ADMIN.email}
            </a>{" "}
            lub telefonicznie: {ADMIN.phone}.
          </p>
        </Section>

        <Section title="Formularz kontaktowy — brak przetwarzania danych">
          <p>
            Formularz widoczny na tej stronie ma charakter poglądowy —
            pokazuje, jak będzie wyglądać i działać docelowa funkcjonalność.
            Dane wpisane w formularzu (m.in. imię i nazwisko, numer telefonu,
            adres e-mail oraz treść wiadomości){" "}
            <strong>
              nie są przesyłane na żaden serwer, nie są zapisywane ani w żaden
              inny sposób przetwarzane
            </strong>
            . Pozostają wyłącznie tymczasowo w przeglądarce urządzenia, z
            którego korzystasz, i znikają bezpowrotnie po odświeżeniu lub
            zamknięciu strony.
          </p>
        </Section>

        <Section title="Pliki cookies">
          <p>
            Strona nie zapisuje żadnych plików cookies — ani analitycznych,
            ani marketingowych, ani technicznych.
          </p>
        </Section>

        <Section title="Statystyki odwiedzin (Vercel Analytics)">
          <p>
            Strona korzysta z Vercel Analytics i Vercel Speed Insights —
            narzędzi statystycznych dostawcy hostingu, które nie zapisują
            plików cookies ani nie identyfikują konkretnej osoby. Zbierają
            zagregowane dane o ruchu na stronie (np. liczba odsłon, kraj,
            typ urządzenia) na podstawie naszego prawnie uzasadnionego
            interesu (art. 6 ust. 1 lit. f RODO) w zrozumieniu, jak działa
            strona.
          </p>
        </Section>

        <Section title="Czcionki Google Fonts">
          <p>
            Do wyświetlenia tekstu strona wczytuje czcionki z serwerów Google
            (Google Fonts, Google Ireland Ltd.). Powoduje to przekazanie
            adresu IP przeglądarki do Google w momencie wczytywania strony —
            niezależnie od tego, czy formularz jest używany. Szczegóły:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              polityka prywatności Google
            </a>
            .
          </p>
        </Section>

        <Section title="Hosting">
          <p>
            Strona jest hostowana przez Vercel Inc. (USA). Jak każdy dostawca
            hostingu, Vercel przetwarza w niezbędnym zakresie adres IP i
            podstawowe dane techniczne żądania (logi serwera) w celu
            zapewnienia bezpieczeństwa i prawidłowego działania
            infrastruktury — na podstawie prawnie uzasadnionego interesu
            administratora (art. 6 ust. 1 lit. f RODO). Transfer danych do USA
            odbywa się w oparciu o mechanizm EU-US Data Privacy Framework.
          </p>
        </Section>

        <Section title="Linki zewnętrzne">
          <p>
            Strona zawiera odnośniki do usług zewnętrznych (np. Mapy Google,
            numer telefonu, adres e-mail). Skorzystanie z takiego linku
            przenosi do serwisu podmiotu trzeciego, który ma własną,
            niezależną politykę prywatności.
          </p>
        </Section>

        <Section title="Twoje prawa">
          <p>
            W związku z ewentualnym bezpośrednim kontaktem (telefon, e-mail)
            przysługuje Ci prawo dostępu do danych, ich sprostowania,
            usunięcia, ograniczenia przetwarzania, przenoszenia danych oraz
            sprzeciwu wobec przetwarzania, a także prawo wniesienia skargi do
            Prezesa Urzędu Ochrony Danych Osobowych. Skontaktuj się z
            administratorem pod adresem wskazanym wyżej.
          </p>
        </Section>

        <Section title="Zautomatyzowane podejmowanie decyzji">
          <p>
            Administrator nie stosuje profilowania ani zautomatyzowanego
            podejmowania decyzji.
          </p>
        </Section>

        <p className="text-sm text-muted-foreground mt-16 pt-8 border-t border-border">
          Ostatnia aktualizacja: {UPDATED}
        </p>
      </div>
    </div>
  );
}
