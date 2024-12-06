import {defineConfig} from 'cypress';
import * as dotenv from 'dotenv';

dotenv.config({path: '.env'});

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    supportFile: false,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  
  env: process.env,
});
