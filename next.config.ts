import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // About is the home page; /about is the URL people guess.
  async redirects() {
    return [{ source: "/about", destination: "/", permanent: true }];
  },
};

export default nextConfig;
