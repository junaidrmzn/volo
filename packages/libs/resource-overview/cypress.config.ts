/* eslint-disable import/no-default-export */
import { defineConfig } from "cypress";
import webpackConfig from "./config/cypress.webpack.config";

export default defineConfig({
    supportFolder: "cypress/support",
    viewportWidth: 1440,
    viewportHeight: 900,
    fixturesFolder: false,
    component: {
        specPattern: "cypress/component/**/*.test.{ts,tsx}",
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig,
        },
    },
});
