import type { NextConfig } from "next";
import { version } from "./package.json";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,

  // Add the APP_VERSION to the environment variables
  env: {
    APP_VERSION: version, // Inject version from package.json
  },
};

export default nextConfig;
