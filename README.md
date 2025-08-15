# Splitlier Backend

Backend API for the Splitlier mobile application, built with [NestJS](https://nestjs.com/).  
Splitlier helps groups easily track and share expenses, settle debts, and have fun while doing it.  
Users can create groups, add expenses, scan receipts, and send humorous GIFs to remind friends who owe money.

---

## 🚀 Features

- **Authentication & Authorization**
  - Secure JWT-based authentication
  - Role-based access control for users and admins
- **User Management**
  - Create, read, update, and delete user accounts
  - Retrieve user profiles with activity history
- **Group Expense Sharing**
  - Create and join groups
  - Add and split expenses among group members
  - Track balances in real-time
- **Receipt Scanning**
  - OCR-based receipt scanning for automatic expense creation
- **Debt Reminders**
  - Send fun GIFs to group members who owe money
- **Security**
  - Helmet for secure HTTP headers
  - Throttler for API rate limiting
  - Environment-based configuration for production & development
- **Developer Friendly**
  - Centralized exception handling
  - Validation pipes for request payloads
  - CORS support for mobile applications

---

## 🛠 Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/) (Node.js + TypeScript)
- **Database:** PostgreSQL (via [Prisma](https://www.prisma.io/))
- **Authentication:** JWT with refresh tokens
- **Security:** Helmet, Throttler, ValidationPipe, CORS
- **Receipt Scanning:** OCR integration (Tesseract.js / external API)
- **Testing:** Cucumber + Gherkin
- **Deployment Ready:** Environment-driven config for cloud or on-prem

---

## 📦 Requirements

- Node.js 18+
- npm or yarn
- PostgreSQL database

---

## ⚙️ Installation

```bash
git clone https://github.com/<your-repo>/splitlier-backend.git
cd splitlier-backend
npm install
```

## 🔧 Configuration

Copy .env.example to .env and set the environment variables

```bash
  NODE_ENV=development
  PORT=3000
  DATABASE_URL=postgresql://user:pass@localhost:5432/splitlier
  JWT_SECRET=super_secret_key
  JWT_EXPIRATION=1h
```

## ▶️ Running the App

- Development

```bash
  npm run start:dev
```

- Production

```bash
  npm run build
  npm run start:prod
```

## 🧪 Testing

```bash
  npm run test
```
