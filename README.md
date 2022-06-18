# MangaWebshop: Manga Miracle

Projekt von Rahil Chughtai und Christopher John für Kurs Web-Engineering 2 TINF20AI2.
Die Applikation stellt eine e-commerce Plattform speziell für die Manga Niche dar.
Die Manga Daten werden mithilfe der JIKAN-API über HTTP requests gefetched.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/DHBW-Vilas/20ai2-webeng-II-mangawebshop/tree/project)

## **Quick Start Guide**

### Applikation Aufrufen

Die Empfohlenen möglichkeiten, um die Applikation zu starten sind:

1. Über Gitpod
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/DHBW-Vilas/20ai2-webeng-II-mangawebshop/tree/project)
2. Über die öffentlich Domäne: https://manga-miracle-tinf20ai2.web.app/
3. Lokales ausführen mit `ng serve`

### Nutzerprofil

Zum Einloggen kann der Account

- email: user@user.de
- pw: sh7up#KT!

verwendet werden. Alternativ kann ein neuer Account über die Registrierung erstellt werden, oder das Google-Login kann benutzt werden.

## Verwendete Technologien

- Angular 13
  - Angular Material
  - Angular Flex layout
  - Angular Fire
- Firebase
  - Firestore
  - Firebase hosting
  - Firebase authentication
- [JikanApi](https://jikan.moe/)

## **Features:**

- Login
  - Firebase Login/Registrierung mit Email/Passwort oder Google
- Favoriten
  - Hinzufügen/Entfernen und Anzeigen von Favoriten
- Manga Details
  - Verfassen und Einsehen von Nutzer Kommentaren
- Manga Suche
  - Filterung, Sortierung nach verschiedenen Attributen
- Warenkorb
  - Hinzufügen/Entfernen zum Warenkorb
- Bestellungen
  - Abschließen einer Bestellung
  - Anzeigen aller Bestellungen
- Profil
  - Profilansicht, die bearbeitet werden kann

## Pages

- Profile
- Login/Register
- Home (Landing Page der Seite)
- Cart (Warenkorb)
- Checkout (Zur Kasse)
- Favorites (Einsehen der gespeicherten Favoriten)
- Orders (Bestellungsansicht)
- Manga-List (Suche, Filterung von Mangas)
- Manga-Detail (Detail Ansicht eines Mangas)

## **Ordner Struktur**

- components
  - Hier befinden sich alle wiederverwendbare UI Komponenten
- pages
  - In diesem Ordner befinden sich die verschiedenen Hauptseiten der Anwendung, die der Nutzer über die Routen einsehen kann
- shared
  - Utilities, Models und andere Einheiten, die innerhalb der Applikation, übergreifend verwendet werden können befinden sich hier

## Benutzte API

### Jikan

Wir nutzen die JIKAN-API, eine
open-source PHP & REST API, welche eine Schnittstelle zu der online Anime+Manga Datenbank MyAnimeList.net bietet. Über den Angular HTTP-Client werden API Requests verschickt und verarbeitet.

Docs: https://jikan.moe/

Verwendung in: `app/shared/services/manga-api.ts`

### Firebase Firestore

Zur Persistenz von Daten wird der Firestore Service von Firebase genutzt. Das Login wird auch über den Firebase Service gehandled.

### Datenstruktur

Firebase Firestore nutzt eine Collection/Document basierte Datenbank. Das Diagramm zeigt die verwendete Struktur.
![workflow diagram](/src/assets/readme/data.jpg)

## User Flow

Das folgende Diagramm zeigt den User Workflow. Hierbei wurde sich auf das Bestell-Feature fokussiert.
![workflow diagram](/src/assets/readme/workflow.jpg)

Automatisch Generierter Text von Angular CLI:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
