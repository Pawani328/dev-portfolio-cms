import type { NextConfig } from "next";

const adminSecret = process.env.NEXT_PUBLIC_ADMIN_SECRET || "admin";

const nextConfig: NextConfig = {
  reactCompiler: true,

  /** Rewrite secret admin path to the actual /admin route */
  async rewrites() {
    return [
      {
        source: `/${adminSecret}`,
        destination: "/admin",
      },
      {
        source: `/${adminSecret}/:path*`,
        destination: "/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
