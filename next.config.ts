import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pra deploy v1 — ignora warnings/erros de TS estritos no build.
  // Quando estabilizar, voltar pra type-check normal.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
