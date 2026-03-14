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

Перед первым запуском соберите админку (иначе `npm run start` упадёт с ошибкой про index.html). Сборка также копирует админку в `public/admin`, откуда её ищет старт.

Из **корня репозитория**:

```bash
cd backend && npm run build
cd backend && npm run start
```

Либо, если ты уже в папке `backend`: `npm run build`, затем `npm run start`.

- API: http://localhost:9000  
- Admin Panel: http://localhost:9000/app  

В `backend/.env` при необходимости задайте CORS (если не заданы, в конфиге подставятся значения по умолчанию для localhost). Для логина в админку без 401 на localhost в конфиг добавлены `cookieOptions` и `sessionOptions` для разработки. Если после входа GET `/admin/users/me` возвращает 401: (1) после любого изменения `medusa-config.ts` нужна пересборка: `npm run build`, затем `npm run start`; (2) очистите куки для localhost:9000 и войдите снова; (3) в запросе к `/admin/users/me` во вкладке Network проверьте, что в Request Headers есть `Cookie: connect.sid=...`. Пользователя админки создаёт `create-medusa-app`; нового: `npx medusa user -e email -p пароль` (оба флага `-e` и `-p` обязательны).

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Откройте http://localhost:3000  

В `.env` указаны:
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000` — запросы к Medusa проксируются через Next.js (`/api/store/*` → backend).
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` — **нужен для каталога** (Store API без ключа не отдаёт товары). Как получить — ниже.

### Где взять Publishable API Key

В сборке Medusa из `create-medusa-app` в админке **нет** раздела Developer / Publishable API Keys (есть только Settings → Store). Токен получают скриптом в backend:

```bash
cd backend
npm run get-publishable-key
```

Скрипт создаёт ключ «Storefront», привязывает его к Default Sales Channel и **один раз** выводит токен в консоль. Скопируйте его в `frontend/.env`:

```
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=вставьте_токен_из_консоли
```

После этого перезапустите frontend (`npm run dev` в папке frontend) — каталог на http://localhost:3000/products подтянет товары.

## Расширение frontend

- **shadcn/ui:** добавление компонентов: `npx shadcn@latest add button` (и др.) — конфиг в `components.json` уже настроен.
- **Zustand:** новые сторы создавайте в `src/store/` по аналогии с `cart-store.ts`.

## Лицензия

MIT
