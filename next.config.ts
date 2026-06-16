import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@portabletext/react",
    ],
  },

  async redirects() {
    return [
      {
        source: "/ofis-mobilyalari-modoko",
        destination: "/modoko-ofis-mobilyalari",
        permanent: true,
      },
      {
        source: "/blog/ofis-mobilyalari-modoko",
        destination: "/modoko-ofis-mobilyalari",
        permanent: true,
      },
      {
        source: "/modoko-ofis-mobilyalari-merkezi",
        destination: "/modoko-ofis-mobilyalari",
        permanent: true,
      },
      {
        source: "/blog/modoko-ofis-mobilyalari-merkezi",
        destination: "/modoko-ofis-mobilyalari",
        permanent: true,
      },
      {
        source: "/blog/kategori",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
