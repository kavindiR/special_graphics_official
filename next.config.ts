import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",                // Enables static HTML export
  basePath: "/special-graphics-official", // GitHub Pages repo name
  images: {
    unoptimized: true,             // GitHub Pages does not support Next.js image optimization
  },
};

export default nextConfig;
