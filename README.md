# usluga-gabinet-tyszka-demo

Projekt demo dla klienta. Repozytorium prywatne — README jest notatką wewnętrzną.

## Klient

| | |
|---|---|
| Firma | Gabinet Weterynaryjny Maciej Tyszka |
| Nazwa prawna | Gabinet Weterynaryjny Maciej Tyszka |
| Branża | gabinet weterynaryjny |
| Adres | ul. Krasińskiego 82/U-20, 74-100 Gryfino |
| Miasto | Gryfino |
| Telefon | +48 607 664 430 |
| E-mail | maciejtyszka@wp.pl |
| Google Maps | https://maps.google.com/?q=Gabinet+Weterynaryjny+Tyszka+Gryfino+Krasinskiego |
| Obecna strona | weterynarz-gryfino.pl — **domena martwa**, brak rekordu DNS (zweryfikowane 2026-08-09) |

Lead **ID 41** z `research/leady-firmy-tracker.xlsx`, potencjał **9/10** — najwyższy
wśród ośmiu weterynarzy w bazie.

**Hak sprzedażowy:** katalogi wciąż podają `weterynarz-gryfino.pl` jako stronę gabinetu,
ale domena nie odpowiada — właściciel prawdopodobnie nie wie, że stracił witrynę. Sama
nazwa domeny jest idealna pod wyszukiwanie „weterynarz Gryfino". W Gryfinie żaden gabinet
weterynaryjny nie ma działającej strony, więc pierwszy przejmuje wyszukiwania.

## Projekt

- **Kategoria:** `Uslugi/` (archetyp „Karta" — cennik usług + umawianie wizyty)
- **Profil branżowy:** `Uslugi/profile/weterynarz.ts`
- **Wariant palety:** `morski` (pierwszy klient w tej branży — następny bierze `szalwia`)
- **Wariant zdjęcia `story`:** `imageVariants[0]`
- **Folder źródłowy:** `Uslugi/gabinet-tyszka/`
- **Konfiguracja:** `Uslugi/sites/site.gabinet-tyszka.ts` → `src/data/site.ts`
- **Status:** demo, nieprezentowane klientowi
- **Deploy:** — (docelowo Vercel)
- **Utworzono:** 2026-08-11

## Dane realne vs. poglądowe

**Realne, wzięte z trackera:** nazwa, adres, telefon, e-mail, link do Map Google.

**Poglądowe — do potwierdzenia w rozmowie z klientem:**

- **godziny przyjęć** — gabinet nie publikuje grafiku; ustawione pn-pt 09:00-18:00,
  sob. 09:00-13:00,
- **cały cennik** — nie ma go ani na stronie (martwa domena), ani na Facebooku, ani
  na znanylekarz.pl. Ceny ustawione na poziomie typowym dla gabinetu w powiecie
  gryfińskim (2026): konsultacja 90 zł, szczepienie od 100 zł, USG od 150 zł,
  kastracja kota 280 zł, sterylizacja kotki 450 zł.

Zakres usług obejmuje psy, koty i małe zwierzęta domowe — bez zwierząt gospodarskich
i bez usług pielęgnacyjnych (strzyżenie, groomerka), których gabinet nie oferuje.

Gabinet nie ma profilu na Facebooku ani systemu rezerwacji online → `socials` i
`links.booking` puste, `reservation.external.enabled: false`.

## Stack

Vite + React + TypeScript + Tailwind CSS + shadcn/ui + React Router

## Uruchomienie

```bash
npm install
npm run dev
```

## Do zrobienia przed pokazaniem klientowi

- [x] `src/data/site.ts` — treść, adres, cennik
- [x] blok `seo` w `site.ts` uzupełniony
- [x] DemoBar widoczny i przyklejony do dołu podczas scrollowania
- [x] `npm run build` przechodzi
- [ ] potwierdzić z klientem godziny przyjęć i cennik
- [ ] deploy na Vercel
