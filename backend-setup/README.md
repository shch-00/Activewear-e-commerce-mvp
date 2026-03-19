# Установка Backend (Medusa + PostgreSQL + Admin)

E-commerce backend на [Medusa](https://medusajs.com/). База данных — PostgreSQL. Админ-панель встроена в Medusa.

## Важно: папка `backend` не должна существовать

Команда `create-medusa-app` создаёт папку с указанным именем. Если в репозитории **уже есть папка `backend`** (например, только с инструкциями), её нужно удалить или переименовать:

```bash
# из корня репозитория
rm -rf backend
# или переименовать: mv backend backend.bak
```

После этого выполняйте команды ниже.

## Требования

- Node.js v20+
- PostgreSQL (локально или Docker)
- Git

## Быстрый старт

Из **корня репозитория** выполните:

```bash
npx create-medusa-app@latest backend --directory-path .
```

Интерактивно укажите:
- email админа для входа в Admin Panel
- при необходимости — данные PostgreSQL (или используйте локальный инстанс)

После установки соберите админку и запустите backend:

```bash
cd backend
npm run build
npm run start
```

- **API (Store):** http://localhost:9000  
- **Admin Panel:** http://localhost:9000/app  

## Подключение к своей PostgreSQL

Если база уже развёрнута (локально, Docker, Supabase, Vercel Postgres):

```bash
npx create-medusa-app@latest backend --directory-path . --db-url "postgres://user:password@host:5432/dbname"
```

Для Supabase в конец URL при необходимости добавьте: `?sslmode=require`.

## Переменные окружения

После создания проекта в `backend/` появится свой `.env`. Дополнительные переменные (CORS и т.д.) можно взять из **backend-setup/.env.example** и добавить в `backend/.env`:

- `DATABASE_URL` — строка подключения PostgreSQL
- `REDIS_URL` — (опционально) для production
- `STORE_CORS`, `ADMIN_CORS` — при необходимости для frontend на другом порту (например `http://localhost:3000`)

## Интеграция с frontend

В папке `frontend` в `.env` укажите:

```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

Запросы к товарам и корзине делайте на `http://localhost:9000/store/*` (Store API).
