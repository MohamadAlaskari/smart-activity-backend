# 🚀 Smart Activity – Backend

![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![NestJS](https://img.shields.io/badge/NestJS-10.x-red?logo=nestjs)
![MySQL](https://img.shields.io/badge/Database-MySQL-informational?logo=mysql)
![Mailer](https://img.shields.io/badge/SMTP-Hostinger-purple)
![Swagger](https://img.shields.io/badge/Docs-Swagger-blueviolet)
![License](https://img.shields.io/badge/License-Private-lightgrey)
![Status](https://img.shields.io/badge/status-active-brightgreen)


Ein modulares, sicheres und skalierbares Backend für die Smart Activity App. Entwickelt mit **NestJS**, **TypeORM**, **MySQL**, **JWT** und **Hostinger SMTP**. Inklusive E-Mail-Verifizierung, Authentifizierung und Dokumentation via Swagger.

## 🔗 Live Backend URL

```
https://smart-activity-backend.alaskaritech.com
```

## 📦 Features

- ✅ Benutzerregistrierung mit E-Mail-Verifizierung (Token via Hostinger SMTP)
- 🔐 Login mit JWT + AuthGuard
- 🛡️ Geschützte Endpunkte
- 🧩 TypeORM + MySQL
- 📬 Wiederverwendbarer MailService mit Templates
- 📘 Swagger API-Dokumentation (`/api`)
- 🚀 Deployment auf Vercel

## 🧑‍💻 Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: MySQL (TypeORM)
- **Auth**: JWT (Access Token)
- **Mailing**: Hostinger SMTP via `@nestjs-modules/mailer`
- **Deploy**: Vercel

---

## 🛠️ Installation

### Klone das Projekt
```bash
git clone https://github.com/dein-nutzer/smart-activity-backend.git
cd smart-activity-backend
```
### Project setup

```bash
$ npm install
```
### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


### 📁 .env Datei (Beispiel)

```env
PORT=3000
```
# DB
```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```
```env
# JWT
JWT_SECRET=yourSuperSecretKey
JWT_EXPIRES_IN=
```
```env
# SMTP
MAIL_HOST=
MAIL_PORT=465
MAIL_USER=vibeday@alaskaritech.com
MAIL_PASS=dein-smtp-passwort
MAIL_FROM=
BASE_URL=https://smart-activity-backend.alaskaritech.com
```

---

## 🧪 Endpunkte (Kurzüberblick)

### 📥 `POST /auth/register`
Registriert neuen Nutzer und sendet Verifizierungslink per Mail.  
**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johnny",
  "email": "john@example.com",
  "password": "123456"
}
```

### ✅ `GET /auth/verify-email?token=...`
Verifiziert den User anhand des Tokens. Gültig für 30 Minuten.

### 🔐 `POST /auth/login`
Gibt ein gültiges Access Token bei erfolgreichem Login zurück.

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

## 📘 Swagger

Alle Endpunkte sind dokumentiert unter:

```
http://localhost:3000/swagger
```

---

## 📁 Projektstruktur (Module-basiert)

```plaintext
📦src
 ┣ 📂common
 ┃ ┣ 📂decorators
 ┃ ┃ ┗ 📜current-user.decorator.ts
 ┃ ┣ 📂filters
 ┃ ┃ ┗ 📜global-exception.filter.ts
 ┃ ┣ 📂guards
 ┃ ┃ ┗ 📜auth.guard.ts
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┗ 📜constants.ts
 ┣ 📂config
 ┃ ┗ 📜swagger.config.ts
 ┣ 📂core
 ┃ ┗ 📂ai
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜daily-suggestion.dto.ts
 ┃ ┃ ┃ ┣ 📜group-suggestion.dto.ts
 ┃ ┃ ┃ ┣ 📜prompt.dto.ts
 ┃ ┃ ┃ ┗ 📜suggestion-response.dto.ts
 ┃ ┃ ┣ 📜ai.controller.ts
 ┃ ┃ ┣ 📜ai.module.ts
 ┃ ┃ ┗ 📜ai.service.ts
 ┣ 📂database
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜db.config.ts
 ┃ ┗ 📜database.module.ts
 ┣ 📂modules
 ┃ ┣ 📂activities
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜login.dto.ts
 ┃ ┃ ┃ ┗ 📜register.dto.ts
 ┃ ┃ ┣ 📜auth.controller.ts
 ┃ ┃ ┣ 📜auth.module.ts
 ┃ ┃ ┗ 📜auth.service.ts
 ┃ ┣ 📂events
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┗ 📜search-events.dto.ts
 ┃ ┃ ┣ 📜events.controller.ts
 ┃ ┃ ┣ 📜events.module.ts
 ┃ ┃ ┗ 📜events.service.ts
 ┃ ┣ 📂mail
 ┃ ┃ ┣ 📂templates
 ┃ ┃ ┃ ┣ 📜verification.template.ts
 ┃ ┃ ┃ ┗ 📜welcome.template.ts
 ┃ ┃ ┣ 📜mail.module.ts
 ┃ ┃ ┗ 📜mail.service.ts
 ┃ ┣ 📂notifications
 ┃ ┣ 📂transport
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┗ 📜get-directions.dto.ts
 ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┗ 📜directions-response.interface.ts
 ┃ ┃ ┣ 📜directions.controller.ts
 ┃ ┃ ┣ 📜directions.module.ts
 ┃ ┃ ┗ 📜directions.service.ts
 ┃ ┣ 📂users
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜create-user.dto.ts
 ┃ ┃ ┃ ┗ 📜update-user.dto.ts
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┗ 📜user.entity.ts
 ┃ ┃ ┣ 📜users.controller.ts
 ┃ ┃ ┣ 📜users.module.ts
 ┃ ┃ ┗ 📜users.service.ts
 ┃ ┗ 📂weather
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┗ 📜get-weather.dto.ts
 ┃ ┃ ┣ 📜weather.controller.ts
 ┃ ┃ ┣ 📜weather.module.ts
 ┃ ┃ ┗ 📜weather.service.ts
 ┣ 📜app.controller.ts
 ┣ 📜app.module.ts
 ┗ 📜main.ts
```

---

## ✅ Status

- [x] Registrierung + E-Mail-Verifizierung
- [x] Login + JWT
- [x] User CRUD
- [x] Deployment + Swagger
- [x] MailService

---

## 👨‍💻 Autor

> **Mohamad Alaskari**  
> 📫 [mohamad@alaskaritech.com](mailto:mohamad@alaskaritech.com)  
> 🌐 [www.alaskaritech.com](https://www.alaskaritech.com)  
> 🧑‍💻 GitHub: [mohamad-alaskari](https://github.com/mohamad-alaskari)

---

## 📜 Lizenz

Dieses Projekt steht unter der MIT-Lizenz.
