# usluga-gabinet-pogodno-demo

Projekt demo — element portfolio. Repozytorium prywatne — README jest notatką wewnętrzną.

> ⚠ **To nie jest klient.** Gabinet Pogodno jest firmą wymyśloną. Nazwa, adres,
> telefon i e-mail są zmyślone. Projekt pierwotnie startował jako demo pod
> konkretnego leada (prawdziwy gabinet weterynaryjny w Gryfinie), ale przed
> publikacją na żywej domenie wszystkie dane kontaktowe podmieniono na
> fikcyjne, a lokalizację przeniesiono do Szczecina — patrz `src/data/site.ts`.
> Nie wysyłamy tego demo pod żadną realną tożsamością.

## „Klient"

| | |
|---|---|
| Firma | Gabinet Weterynaryjny Pogodno *(przykładowa)* |
| Nazwa prawna | Gabinet Weterynaryjny Pogodno *(przykładowa)* |
| Branża | gabinet weterynaryjny |
| Miasto | Szczecin, dzielnica Pogodno *(tylko dzielnica — bez realnej ulicy)* |
| Telefon | +48 515 668 204 *(fikcyjny)* |
| E-mail | kontakt@gabinetpogodno.pl *(fikcyjny)* |

## Projekt

- **Kategoria:** `Uslugi/` (archetyp „Karta" — cennik usług + umawianie wizyty)
- **Profil branżowy:** `Uslugi/profile/weterynarz.ts`
- **Wariant palety:** `morski`
- **Folder źródłowy:** `Uslugi/gabinet-pogodno/`
- **Konfiguracja:** `src/data/site.ts`
- **Status:** demo portfolio, dane w pełni fikcyjne
- **Deploy:** — (docelowo Vercel)
- **Utworzono:** 2026-08-11

## Dane

Cennik i godziny przyjęć to wartości poglądowe, dobrane tak, by wyglądały na
typowe dla gabinetu weterynaryjnego w większym mieście — nie są niczyją
faktyczną ofertą.

Zakres usług obejmuje psy, koty i małe zwierzęta domowe — bez zwierząt
gospodarskich i bez usług pielęgnacyjnych (strzyżenie, groomerka).

## Stack

Vite + React + TypeScript + Tailwind CSS + shadcn/ui + React Router

## Uruchomienie

```bash
npm install
npm run dev
```

## Do zrobienia przed publikacją

- [x] `src/data/site.ts` — treść, adres, cennik
- [x] usunięcie realnych danych kontaktowych realnego leada
- [x] blok `seo` w `site.ts` uzupełniony
- [x] `npm run build` przechodzi
- [x] przeniesienie lokalizacji do Szczecina (dzielnica Pogodno), zmiana marki
- [x] dodana strona `/polityka-prywatnosci` + link w stopce
- [x] `DemoBar` wyłączony (`enabled: false`)
- [x] dodana sekcja „Zakres opieki" (bento z 5 kart) między „O nas" a cennikiem
- [ ] self-hosting fontów Google zamiast `fonts.googleapis.com` w `index.html`
- [ ] lekki remake wizualny (był za podobny do BurgerSzczecin)
- [ ] deploy na Vercel
