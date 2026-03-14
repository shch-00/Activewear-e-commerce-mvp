import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Подключение к Medusa backend (расширить при необходимости)
  async rewrites() {
    return [
      {
        source: "/api/store/:path*",
        destination: `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000"}/store/:path*`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000"}/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
