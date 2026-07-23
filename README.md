# MultiHolidays — Student Attendance Tracker

A full-stack web application for students to self-report daily attendance, track their academic attendance percentage, and plan leave with automatic recovery calculation.

---

## Stack

| Layer    | Technology                                      |
|----------|-------------------------------------------------|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript |
| Backend  | Node.js + Express 5, ES Modules                 |
| Database | MongoDB via Mongoose 9                          |
| Auth     | JWT (httpOnly cookie, 7-day expiry) + bcryptjs  |

---

## Features

- **JWT Authentication** — auto-registration on first login, httpOnly cookie session
- **Daily Attendance Marking** — mark present/absent with an auto-popup on first visit each day
- **Live Attendance Percentage** — real-time calculation using the −3% / +0.5% rule
- **Leave Planning** — select upcoming dates, preview percentage impact, and save recovery plans
- **Leave Recovery Tracking** — live progress showing mandatory post-leave attendance dates
- **Profile Management** — edit name, student ID, course, and year inline
- **Responsive Design** — mobile bottom-nav + header vs. desktop sidebar layout
- **Rate Limiting** — 200 req/15 min globally, 20 req/15 min on auth endpoints
- **Security Headers** — powered by Helmet

---

## Semester Configuration

- **Window**: 15 July 2026 → 20 November 2026
- **Starting percentage**: 100%
- **Absence penalty**: −3% per working day missed
- **Presence reward**: +0.5% per working day attended
- **Threshold**: 75% minimum required
- **Holidays**: Sundays + 1st & 3rd Saturdays of each month

---

## Setup

### Prerequisites

- Node.js 18+
- A MongoDB cluster (Atlas or local)

### Environment Variables

**Root `.env`** (server):
```
PORT=2026
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:3000
```

**`Client/.env.local`** (frontend):
```
NEXT_PUBLIC_API_URL=http://localhost:2026/api
NEXT_PRIVATE_API_URL=http://localhost:2026/api
```

### Install & Run (Development)

```bash
# Install all dependencies (root + client) in one step
npm run install:all

# Start both servers together — API on :2026, Next.js on :3000
npm run dev
```

Output looks like:
```
[API] Server listening on port 2026 (development)
[API] MongoDB Connected: ...
[WEB] ▲ Next.js 16.2.10
[WEB] - Local: http://localhost:3000
```

Open **http://localhost:3000** in your browser.

### Production Build & Start

```bash
# 1. Build the Next.js client
npm run build

# 2. Start both servers (API + Next.js) together
NODE_ENV=production npm start
```

The two servers run as sibling processes from one command:
- **API server** → port 2026 (Express)
- **Web server** → port 3000 (Next.js)

> **Why two ports?** Next.js is a full Node.js server, not a static folder.
> It cannot be served by `express.static()`. The correct pattern is to run
> both processes and point a reverse proxy (Nginx, Caddy, Render, Railway)
> at each port.

### Deploying to a VPS / Cloud (Nginx example)

```nginx
# Nginx config — one domain, two upstreams
upstream nextjs  { server 127.0.0.1:3000; }
upstream express { server 127.0.0.1:2026; }

server {
    listen 80;
    server_name yourdomain.com;

    # All API calls go to Express
    location /api/ {
        proxy_pass http://express;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Everything else goes to Next.js
    location / {
        proxy_pass http://nextjs;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```

Then in `Client/.env.production`:
```
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PRIVATE_API_URL=https://yourdomain.com/api
```

And in root `.env`:
```
CLIENT_ORIGIN=https://yourdomain.com
NODE_ENV=production
```

### Deploying to Railway / Render

Both platforms support running two services from a monorepo. Create two services:

| Service | Root dir | Build cmd | Start cmd |
|---|---|---|---|
| API | `/` | `npm install` | `node Server/server.js` |
| Web | `/Client` | `npm run build` | `npm start` |

Set environment variables per-service in the platform dashboard.

---

## Project Structure

```
MultiHolidays/
├── .env                     ← Server environment variables
├── package.json             ← Root: Express server entry
├── Server/
│   ├── server.js            ← Express app (CORS, rate limiting, helmet, routes)
│   ├── models/              ← Mongoose models: User, Attendance, LeaveRequest
│   ├── controllers/         ← Auth, Attendance, Leave, Profile
│   ├── routes/              ← Route definitions
│   ├── middlewares/
│   │   └── protect.js       ← JWT validation middleware
│   └── utils/
│       ├── db.js            ← MongoDB connection
│       ├── generateToken.js ← JWT signing
│       └── attendanceHelpers.js ← Core business logic
└── Client/
    ├── .env.local           ← Frontend environment variables
    ├── src/
    │   ├── app/             ← Next.js App Router pages
    │   ├── components/      ← React components
    │   ├── context/
    │   │   └── AuthContext.tsx ← Global auth state (single /auth/me call)
    │   ├── lib/             ← API client functions
    │   ├── constants/       ← Semester config, nav items
    │   └── types/           ← Shared TypeScript types
    └── next.config.ts
```

---

## API Endpoints

All endpoints except `POST /api/auth/login` require a valid `token` cookie.

| Method | Path                                      | Description                          |
|--------|-------------------------------------------|--------------------------------------|
| POST   | `/api/auth/login`                         | Login (auto-registers on first use)  |
| GET    | `/api/auth/me`                            | Get current user                     |
| POST   | `/api/auth/logout`                        | Clear session cookie                 |
| POST   | `/api/attendance/mark`                    | Mark / update attendance for a date  |
| GET    | `/api/attendance/user/:userId`            | All records + summary                |
| GET    | `/api/attendance/user/:userId/percentage` | Live attendance percentage           |
| GET    | `/api/attendance/user/:userId/date/:date` | Single day status                    |
| POST   | `/api/leave/check-recovery`               | Preview leave impact (no DB write)   |
| POST   | `/api/leave`                              | Create leave request                 |
| GET    | `/api/leave/user/:userId`                 | All leave requests with live progress|
| GET    | `/api/leave/:id`                          | Single leave request with breakdown  |
| DELETE | `/api/leave/:id`                          | Cancel a leave request               |
| GET    | `/api/profile/me`                         | Get full profile                     |
| PUT    | `/api/profile/me`                         | Update name, studentId, course, year |
| GET    | `/health`                                 | Server health check                  |

---

## License

ISC — © 2026 MultiHolidays
