# URL Shortener 🔗

[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/Neon-336791?logo=postgresql)](https://neon.tech/)
[![Redis](https://img.shields.io/badge/Upstash-DC382D?logo=redis)](https://upstash.com/)
[![Drizzle](https://img.shields.io/badge/Drizzle-FF4785?logo=drizzle)](https://orm.drizzle.team/)

A modern, scalable URL shortening service built with **Next.js**, **Hono**, **Upstash Redis**, **Neon PostgreSQL**, **Drizzle ORM**, **Tailwind CSS**, and **Shadcn UI**.

---

## 🌟 Features

- **Fast API Routes**: Built with [Hono](https://hono.dev/) in Next.js API routes.
- **Persistent Storage**: Neon PostgreSQL stores all long URLs and short codes.
- **Caching**: Upstash Redis for quick URL lookups.
- **Type-Safe Database**: Drizzle ORM with TypeScript ensures type safety.
- **Modern UI**: Tailwind CSS + Shadcn UI for a sleek and responsive interface.
- **Duplicate Handling**: Automatically returns the same short code for URLs that already exist.
- **Responsive Design**: Works beautifully on mobile and desktop.

---

## 🛠 Tech Stack

| Layer         | Technology |
|---------------|------------|
| Frontend      | Next.js, Tailwind CSS, Shadcn UI |
| Backend       | Hono (Next.js API Routes) |
| Database      | Neon PostgreSQL |
| ORM           | Drizzle ORM |
| Caching       | Upstash Redis |
| Language      | TypeScript |

---

## 💻 Installation

### 1. Clone the repository

```bash
git clone https://github.com/rohankale-18/url-shortner.git
cd url-shortner
```

### 2 Install dependencies

```bash
pnpm install
```

### 3 Setup environment variables
Create a .env file in the root directory:
```
DATABASE_URL=your_neon_postgresql_connection_string
REDIS_URL=your_upstash_redis_connection_string
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token_string
```
Replace with your actual Neon PostgreSQL, Upstash Redis connection string and Upstash Redis rest token.

### 4 Run the development server
```
pnpm dev
```
---

## 🧪 Development

- API Routes: src/pages/api/
- Frontend Components: src/components/
- Database Models: src/db/schema.ts
- Tailwind Configuration: tailwind.config.js
- Shadcn Components: src/components/ui/

---

## 🔗 Useful Links

- [Next.js](https://nextjs.org/)
- [Hono](https://hono.dev/)
- [Upstash](https://upstash.com/)
- [Neon](https://neon.tech/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.dev/)