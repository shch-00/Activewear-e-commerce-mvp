# Activewear E-commerce MVP

Каркас MVP интернет-магазина одежды для активного отдыха: frontend на Next.js + готовый e-commerce backend на Medusa.

## Стек

| Часть | Технологии |
|-------|------------|
| **Frontend** | Next.js (App Router), React, TypeScript, Tailwind CSS, базис для shadcn/ui, Zustand |
| **Backend** | Medusa, PostgreSQL, встроенная Admin Panel |

## Структура репозитория

```
├── frontend/          # Next.js storefront
│   ├── src/
│   │   ├── app/       # страницы, layout, globals.css
│   │   ├── components/# UI (в т.ч. базис shadcn)
│   │   ├── lib/       # утилиты (cn и т.д.)
│   │   └── store/     # Zustand (корзина и др.)
│   └── components.json
├── backend-setup/     # Инструкции и .env.example для backend
├── backend/           # Medusa (создаётся командой create-medusa-app, см. ниже)
├── docker-compose.yml # PostgreSQL для backend (опционально)
└── README.md
```

## Быстрый старт

### 1. Backend (Medusa + PostgreSQL)

**Важно:** папка `backend` не должна существовать — её создаёт `create-medusa-app`. Если она уже есть (например, пустая или с старыми файлами), удалите её: `rm -rf backend`. Подробнее и пример `.env`: **backend-setup/README.md**.

**Вариант A — с локальной PostgreSQL**

Убедитесь, что PostgreSQL запущен, затем из корня репозитория:

```bash
npx create-medusa-app@latest backend --directory-path .
```

Следуйте подсказкам (email админа, при необходимости — учётные данные БД).

**Вариант B — PostgreSQL в Docker**

```bash
docker compose up -d
npx create-medusa-app@latest backend --directory-path . --db-url "postgres://postgres:postgres@localhost:5432/medusa-store"
```

Запуск backend:

```bash
cd backend && npm run start
```

- API: http://localhost:9000  
- Admin Panel: http://localhost:9000/app  

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Откройте http://localhost:3000  

В `.env` указан `NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000` для запросов к Medusa.

## Расширение frontend

- **shadcn/ui:** добавление компонентов: `npx shadcn@latest add button` (и др.) — конфиг в `components.json` уже настроен.
- **Zustand:** новые сторы создавайте в `src/store/` по аналогии с `cart-store.ts`.

## Лицензия

MIT
