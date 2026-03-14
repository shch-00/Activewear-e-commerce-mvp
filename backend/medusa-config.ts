import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS ?? 'http://localhost:3000',
      adminCors: process.env.ADMIN_CORS ?? 'http://localhost:9000',
      authCors: process.env.AUTH_CORS ?? 'http://localhost:9000',
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    // Чтобы после логина не падал /admin/users/me с 401 на localhost. Для production заменить через env (secure: true, sameSite: "none").
    sessionOptions: {
      name: "connect.sid",
      resave: true,
      saveUninitialized: true,
      rolling: true,
    },
    cookieOptions: {
      // На localhost без HTTPS куки должны быть secure: false. В production задать COOKIE_SECURE=true.
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: (process.env.COOKIE_SAME_SITE as "lax" | "none" | "strict") || "lax",
    },
  }
})
