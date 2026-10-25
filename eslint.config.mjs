import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default [
    { ignores: ["node_modules/**", "dist/**", "coverage/**"] },
    {
        ...js.configs.recommended,
        files: ["**/*.{js,mjs,cjs,jsx}"],
    },
    ...tseslint.configs.recommended.map((config) => ({
        ...config,
        files: ["**/*.{ts,mts,cts,tsx}"],
    })),
    {
        files: ["**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}"],
        languageOptions: {
            globals: globals.node,
        },
    },
    prettierRecommended,
];
