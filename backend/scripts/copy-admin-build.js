/**
 * Копирует собранную админку из .medusa/server/public/admin в public/admin.
 * medusa start ищет index.html в public/admin, а medusa build пишет в .medusa/server/public/admin.
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const src = path.join(root, ".medusa/server/public/admin");
const dest = path.join(root, "public/admin");

if (!fs.existsSync(src)) {
  console.warn("copy-admin-build: Admin build not found at", src);
  process.exit(0);
}

fs.mkdirSync(path.join(root, "public"), { recursive: true });
fs.cpSync(src, dest, { recursive: true });
console.log("Admin UI copied to public/admin");
