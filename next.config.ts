import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/special-graphics",
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
