import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
  remotePatterns: [
    {
      hostname: "pub-cdb46f8c553a4b7b82762889da022d4f.r2.dev",
      protocol: "https",
      port: ""
    },
    {
      hostname: "lh3.googleusercontent.com",
      protocol: "https",
      port: ""
    }
  ]
 }
};

export default nextConfig;
