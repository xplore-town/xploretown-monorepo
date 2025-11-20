import { defineConfig } from "eslint/config";
import { fileURLToPath } from "node:url";
import path from "node:path";
import rootConfig from "../../eslint.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig([
  ...rootConfig,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
]);
