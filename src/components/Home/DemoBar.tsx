// Uzupełnij poniższe dane swoimi informacjami
const demoBar = {
  enabled: true,
  note: "Wersja poglądowa — treści i dane są przykładowe",
  agencyName: "Addigital",
  agencyUrl: "https://www.addigital.pl/",
  email: "aleksydobrodziej@gmail.com",
  phone: "+48 510 378 629",
};

/**
 * Pasek informujący, że strona jest wersją demonstracyjną,
 * z danymi kontaktowymi wykonawcy.
 * Wyłączany jednym przełącznikiem: `demoBar.enabled = false`.
 */
export function DemoBar() {
  if (!demoBar.enabled) return null;

  return (
    // z-50 = ten sam poziom co navbar. Bez tego pasek wpadał pod elementy
    // z własnym stackiem (sticky pasek kategorii, sekcje z `relative z-10`).
    <div className="border-t border-white/10 bg-[oklch(0.19_0.02_250)]/95 backdrop-blur fixed bottom-0 left-0 right-0 z-50">
      {/* Ta sama siatka co w Navbarze (container / px-6 / max-w-7xl), żeby treść paska trzymała jedną oś z górną belką */}
      <div className="container mx-auto flex max-w-7xl flex-col items-center gap-x-6 gap-y-1.5 px-6 py-2.5 text-center text-[12.5px] sm:flex-row sm:justify-between sm:text-left">
        <p className="flex items-center gap-2 text-white/70">
          <span
            aria-hidden="true"
            className="bg-accent-warm inline-block h-1.5 w-1.5 shrink-0 rounded-full"
          />
          {demoBar.note}
        </p>

        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-white/55">
          <span>
            Współpraca i realizacja:{" "}
            <a
              href={demoBar.agencyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              {demoBar.agencyName}
            </a>
          </span>
          <a
            href={`mailto:${demoBar.email}`}
            className="underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {demoBar.email}
          </a>
          <a
            // Usuwa spacje z linku tel:, aby działał poprawnie na telefonach
            href={`tel:${demoBar.phone.replace(/\s+/g, "")}`}
            className="underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {demoBar.phone}
          </a>
        </p>
      </div>
    </div>
  );
}
