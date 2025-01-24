import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    supportFile: false,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  env: process.env,

  defaultCommandTimeout: 10000,
});
