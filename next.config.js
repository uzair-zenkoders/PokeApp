/** @type {import('next').NextConfig} */

const { parsed: envVariables } = require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: envVariables,
}

module.exports = nextConfig
