# 🚀 VibeDay – Backend

![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![NestJS](https://img.shields.io/badge/NestJS-10.x-red?logo=nestjs)
![MySQL](https://img.shields.io/badge/Database-MySQL-informational?logo=mysql)
![Mailer](https://img.shields.io/badge/SMTP-Hostinger-purple)
![Swagger](https://img.shields.io/badge/Docs-Swagger-blueviolet)
![OpenAI](https://img.shields.io/badge/AI-GPT--4-ff69b4?logo=openai)
![Ticketmaster](https://img.shields.io/badge/Events-Ticketmaster-black?logo=ticketmaster)
![Weather](https://img.shields.io/badge/Weather-VisualCrossing-00BFFF)
![Maps](https://img.shields.io/badge/Maps-Google--Directions-blue?logo=googlemaps)
![Auth](https://img.shields.io/badge/Auth-JWT%20%7C%20bcrypt-orange)
![ORM](https://img.shields.io/badge/ORM-TypeORM-darkred?logo=typeorm)
![Frontend](https://img.shields.io/badge/Frontend-Flutter-02569B?logo=flutter)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/License-Private-lightgrey)


---


This is the backend of **VibeDay**, an intelligent activity recommendation platform powered by real-time data and AI. Built with NestJS, it integrates weather, events, health metrics, and user preferences to deliver smart suggestions.

---

## 🔗 Live Backend URL

```
https://smart-activity-backend.alaskaritech.com
```
---


## 📦 Features

- 🔐 **Authentication System**  
  Secure JWT-based authentication with:
  - User registration & login
  - Email verification
  - Password reset via tokenized email links

- 👤 **User Management**  
  Full CRUD operations for user accounts

- ⚙️ **Preferences Module**  
  Store and manage individual preferences including:
  - Budget
  - Group size
  - Time availability windows
  - Distance radius

- ☁️ **Weather Integration**  
  - 7-day weather forecast
  - Daily and hourly breakdown by coordinates  
  _(Powered by VisualCrossing API)_

- 🎫 **Event Integration**  
  - Filter events by location, date, radius, and group size
  - Connected to the Ticketmaster API

- ❤️ **Health Awareness**  
  - Analyze blood pressure, sleep, stress, and activity
  - Enhance suggestions based on personal health context

- 🤖 **AI-Powered Suggestions**  
  - Uses OpenAI GPT for generating personalized recommendations  
  - Context includes: preferences, weather, health, and events  
  - Returns structured JSON with human-readable logic explanations

- ✉️ **Email Notifications**  
  - Welcome, email verification, and password reset emails  
  - HTML templates using Hostinger SMTP via Nodemailer

- 🌍 **Geolocation & Directions**  
  - Resolve city from coordinates  
  - Estimate travel time and distance (walking, driving, etc.)  
  _(Using Google Directions API + Mapbox support)_

- 🧪 **API Documentation**  
  - Swagger-based OpenAPI documentation  
  - Developer-friendly interactive testing interface

---
## 🔐 Authentication & Security

Security and user identity verification are critical in **VibeDay's** backend architecture. The authentication system is designed with **robustness**, **extensibility**, and **developer-friendliness** in mind.

---

### 🛠️ Key Mechanisms

- **JWT Authentication**  
  All protected endpoints require a valid JSON Web Token (JWT), issued during login and verified by a global `AuthGuard`.

- **Password Hashing**  
  User passwords are securely hashed using **bcrypt** before being stored in the MySQL database.

- **Email Verification**  
  After registration, users must verify their email through a tokenized link sent via **SMTP**.

- **Password Reset Flow**
  1. User requests reset: `POST /auth/request-reset`
  2. Tokenized link is sent via email
  3. HTML reset form is served at: `GET /auth/reset-password`
  4. New password is submitted via `POST /auth/reset-password`

- **Access Control**  
  Routes like preferences, health data, and suggestions are protected with `@UseGuards(AuthGuard)`.

- **Token Storage**  
  JWTs are stored client-side (e.g., secure storage on mobile) and included in request headers.

---

### 🔒 Security Best Practices

- ✅ **HTTPS enforced** in deployment using Vercel + custom domain SSL
- ✅ **DTO-based validation** using `class-validator` for all incoming payloads
- ✅ **Global Exception Filters** for safe, consistent error handling
- ✅ **Public vs. Protected Route Separation** to minimize attack surface



---
## 📘 API Endpoints Overview

The API is fully documented using **Swagger (OpenAPI)** and accessible via `/api` in development.  
Below is a summary of the key endpoints grouped by module:

---

### 🔐 Authentication

- `POST /auth/register` – Register new users  
- `POST /auth/login` – Login with email and password  
- `GET  /auth/verify-email` – Verify account via token  
- `GET  /auth/current-user` – Get currently logged-in user (requires token)  
- `POST /auth/request-reset` – Request password reset via email  
- `GET  /auth/reset-password` – Serve reset form (HTML template)  
- `POST /auth/reset-password` – Submit new password using token  

---

### 👤 Users

- `POST /users` – Create new user  
- `GET /users` – Fetch user info (requires token)  
- `PATCH /users` – Update user details  
- `DELETE /users` – Delete user account  

---

### ⚙️ User Preferences

- `POST /user-preferences` – Create preferences  
- `GET /user-preferences` – Fetch preferences  
- `PATCH /user-preferences` – Update preferences  

---

### ❤️ Health Data

- `POST /health-data` – Submit health metrics (e.g. blood pressure, sleep, activity)  
- `GET  /health-data` – Get health data of the current user  

---

### ☀️ Weather

- `GET /weather/week/location` – 7-day forecast via city  
- `GET /weather/week/coordinates` – 7-day forecast via coordinates  
- `GET /weather/week/hours/coordinates` – Hourly forecast for the next 7 days  
- `GET /weather/day/coordinates` – Daily forecast by coordinates  
- `GET /weather/forecast/date` – Forecast for a specific date  

---

### 🎫 Events

- `GET /events` – Load events from Ticketmaster API  
  **Query Params:** `lat`, `lon`, `date`, `radius`, `size`

---

### 🚗 Directions

- `GET /directions/duration` – Get duration and distance between two locations  
  **Modes:** driving, walking, bicycling, transit  

- `GET /directions/resolve-city` – Resolve city name from coordinates  

---

### 🤖 Suggestions

- `GET /suggestions` – Generate AI-based activity suggestions  

  **Query Parameters:**
  - `lat`: Latitude (e.g., `52.52`)
  - `lon`: Longitude (e.g., `13.405`)
  - `date`: Desired date in format `YYYY-MM-DD` (e.g., `2025-06-25`)

  > This endpoint compiles a full context based on user preferences, health data, weather, events, and geolocation to return structured, AI-powered suggestions tailored to user well-being and current conditions.

---

### 🔐 Security Note

All sensitive endpoints are protected using **JWT-based AuthGuard**.  
Interactive testing and full documentation are available via **Swagger UI** (`/api`).

---


## 🧑‍💻 Tech Stack

| Component          | Technology / Service          |
|--------------------|-------------------------------|
| **Language**       | TypeScript                    |
| **Backend**        | NestJS                        |
| **Frontend Client**| Flutter                       |
| **Database**       | MySQL (via Hostinger)         |
| **ORM**            | TypeORM                       |
| **Authentication** | JWT + bcrypt                  |
| **Mailing**        | Nodemailer + Hostinger SMTP   |
| **API Docs**       | Swagger / OpenAPI             |
| **Weather Data**   | VisualCrossing API            |
| **Event Search**   | Ticketmaster API              |
| **Location**       | Google Directions API, Mapbox |
| **AI Engine**      | OpenAI GPT-4                  |
| **Deployment**     | Vercel (CI/CD) + Hostinger DNS|

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


---
### 📁 .env Datei (Beispiel)

```
PORT=3000
```



#### DB  
```
DB_PORT=3306
DB_HOST=srv972.hstgr.io
DB_USERNAME=u252525807_SamrtAdmin
DB_PASSWORD=SamrtActivity+SamrtAdmin2025.
DB_DATABASE=u252525807_SamrtActivity
```

#### JWT
```
JWT_SECRET=
JWT_EXPIRES_IN=
```


#### SMTP (Simple Mail Transfer Protocol)
```
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM_NAME=
```

#### OpenAI API key for development environment
```
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

#### OpenWeather API key for development environment
```
VISUAL_CROSSING_API_KEY=
```

#### Ticketmaster API key for development environment
```
TICKETMASTER_API_KEY=
```

#### Eventbrite API key for development environment
```
EVENTBRITE_API_KEY=
```

#### Directions API key for development environment
```
GOOGLE_MAPS_API_KEY=
```

#### Mapbox API key for development environment
```
MAPBOX_ACCESS_TOKEN=
```

---

## 🧪 API Endpoints Overview
The API is fully documented using Swagger (OpenAPI). Below is a summarized list of the most important endpoints organized by module:

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

```
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

```
📦src
 ┣ 📂common
 ┃ ┣ 📂decorators
 ┃ ┃ ┗ 📜current-user.decorator.ts
 ┃ ┣ 📂filters
 ┃ ┃ ┗ 📜global-exception.filter.ts
 ┃ ┣ 📂guards
 ┃ ┃ ┗ 📜auth.guard.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📂constants
 ┃ ┃ ┃ ┣ 📜ai.constant.ts
 ┃ ┃ ┃ ┣ 📜directions.constants.ts
 ┃ ┃ ┃ ┣ 📜events.constants.ts
 ┃ ┃ ┃ ┣ 📜user.constants.ts
 ┃ ┃ ┃ ┗ 📜weather.constants.ts
 ┃ ┃ ┗ 📂types
 ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┗ 📜app-config.service.ts
 ┣ 📂config
 ┃ ┗ 📜swagger.config.ts
 ┣ 📂core
 ┃ ┗ 📂ai
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜prompt.dto.ts
 ┃ ┃ ┃ ┣ 📜structured-suggestions.dto.ts
 ┃ ┃ ┃ ┗ 📜suggestion-result.dto.ts
 ┃ ┃ ┣ 📜ai.controller.ts
 ┃ ┃ ┣ 📜ai.module.ts
 ┃ ┃ ┗ 📜ai.service.ts
 ┣ 📂database
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜db.config.ts
 ┃ ┗ 📜database.module.ts
 ┣ 📂modules
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜login.dto.ts
 ┃ ┃ ┃ ┣ 📜register.dto.ts
 ┃ ┃ ┃ ┣ 📜request-password-reset.dto.ts
 ┃ ┃ ┃ ┗ 📜reset-password.dto.ts
 ┃ ┃ ┣ 📂templates
 ┃ ┃ ┃ ┣ 📜reset-error.template.ts
 ┃ ┃ ┃ ┣ 📜reset-password-form.template.ts
 ┃ ┃ ┃ ┗ 📜reset-success.template.ts
 ┃ ┃ ┣ 📜auth.controller.ts
 ┃ ┃ ┣ 📜auth.module.ts
 ┃ ┃ ┗ 📜auth.service.ts
 ┃ ┣ 📂directions
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜get-city-by-coords.dto.ts
 ┃ ┃ ┃ ┗ 📜get-directions.dto.ts
 ┃ ┃ ┣ 📂enums
 ┃ ┃ ┃ ┗ 📜directions-mode.enum.ts
 ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┣ 📜directions-response.interface.ts
 ┃ ┃ ┃ ┗ 📜mapbox-geocode-response.interface.ts
 ┃ ┃ ┣ 📜directions.controller.ts
 ┃ ┃ ┣ 📜directions.module.ts
 ┃ ┃ ┗ 📜directions.service.ts
 ┃ ┣ 📂events
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┗ 📜get-events-flat.dto.ts
 ┃ ┃ ┣ 📜events.controller.ts
 ┃ ┃ ┣ 📜events.module.ts
 ┃ ┃ ┗ 📜events.service.ts
 ┃ ┣ 📂health-data
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜blood-pressure.dto.ts
 ┃ ┃ ┃ ┣ 📜create-health-data.dto.ts
 ┃ ┃ ┃ ┗ 📜update-health-data.dto.ts
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┣ 📜blood-pressure.embedded.ts
 ┃ ┃ ┃ ┗ 📜health-data.entity.ts
 ┃ ┃ ┣ 📜health-data.controller.ts
 ┃ ┃ ┣ 📜health-data.module.ts
 ┃ ┃ ┗ 📜health-data.service.ts
 ┃ ┣ 📂mail
 ┃ ┃ ┣ 📂templates
 ┃ ┃ ┃ ┣ 📜updatePasswordEmail.template.ts
 ┃ ┃ ┃ ┣ 📜verification.template.ts
 ┃ ┃ ┃ ┗ 📜welcome.template.ts
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┗ 📜mailOptions.type.ts
 ┃ ┃ ┣ 📜mail.module.ts
 ┃ ┃ ┗ 📜mail.service.ts
 ┃ ┣ 📂suggestion
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┗ 📜create-suggestion.dto.ts
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┗ 📜suggestion.entity.ts
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┗ 📜suggestion.constant.ts
 ┃ ┃ ┣ 📜suggestions.controller.ts
 ┃ ┃ ┣ 📜suggestions.module.ts
 ┃ ┃ ┗ 📜suggestions.service.ts
 ┃ ┣ 📂user-preferences
 ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┣ 📜create-user-preferences.dto.ts
 ┃ ┃ ┃ ┗ 📜update-user-preferences.dto.ts
 ┃ ┃ ┣ 📂entities
 ┃ ┃ ┃ ┗ 📜user-preferences.entity.ts
 ┃ ┃ ┣ 📜user-preferences.controller.ts
 ┃ ┃ ┣ 📜user-preferences.module.ts
 ┃ ┃ ┗ 📜user-preferences.service.ts
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
 ┃ ┃ ┃ ┣ 📜get-week-weather.dto.ts
 ┃ ┃ ┃ ┣ 📜GetDayWeatherByCoordsDto.ts
 ┃ ┃ ┃ ┣ 📜getForecastByDate.ts
 ┃ ┃ ┃ ┗ 📜GetWeekWeatherByCoordsDto.ts
 ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┣ 📜DailyForecast.ts
 ┃ ┃ ┃ ┗ 📜weather-week-forecast.interface.ts
 ┃ ┃ ┣ 📜weather.controller.ts
 ┃ ┃ ┣ 📜weather.module.ts
 ┃ ┃ ┗ 📜weather.service.ts
 ┣ 📜.editorconfig
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
