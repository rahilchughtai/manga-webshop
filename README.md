# MangaWebshop: Manga Miracle

Projekt von Rahil Chughtai und Christopher John für Kurs Web-Engineering 2 TINF20AI2.
Die Applikation stellt eine e-commerce Plattform speziell für die Manga Niche dar.
Die Manga Daten werden mithilfe der JIKAN-API über HTTP requests gefetched.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/rahilchughtai/manga-webshop)

## Quick Start Guide

Zum Einloggen kann der Account

- email: user@user.de
- pw: sh7up#KT!

verwendet werden. Alternativ kann ein neuer Account über die Registrierung erstellt werden.

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

- Firebase Login/Registrierung mit Email/Passwort
- Hinzufügen/Entfernen und Anzeigen von Favoriten
- Detaillierte Manga Suche mit Filterung, Sortierung nach verschiedenen Attributen
- Hinzufügen/Entfernen zum Warenkorb
- Abschließen einer Bestellung
- Anzeigen aller Bestellungen
- Profilansicht, die bearbeitet werden kann
- Manga Details
  - Verfassen und Einsehen von Nutzer Kommentaren

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

## **OrdnerStruktur**

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

### Firebase Firestore

Zur Persistenz von Daten wird der Firestore Service von Firebase genutzt. Das Login wird auch über den Firebase Service gehandled.

## User Flow

Das folgende Diagramm zeigt den User Workflow. Hierbei wurde sich auf das Bestell-Feature fokussiert.
![alt text](/src/assets/workflow.jpg)

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
