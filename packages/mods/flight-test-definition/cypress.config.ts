import { defineConfig } from "cypress";
import webpackConfig from "./config/webpack.cypress";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
    supportFolder: "cypress/support",
    viewportWidth: 1920,
    viewportHeight: 1080,
    fixturesFolder: false,
    chromeWebSecurity: false,
    component: {
        specPattern: "cypress/**/*.cy.{ts,tsx}",
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig,
        },
    },
    env: {
        BACKEND_BASE_URL: "http://api.cypress.voloiq.io",
    },
});
