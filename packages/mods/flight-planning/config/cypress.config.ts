import { defineConfig } from "cypress";
import path from "node:path";
import webpackConfig from "./webpack.cypress";

const toAbsolutePath = (relativePath: string) => path.join(__dirname, relativePath);

export default defineConfig({
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10_000,
    supportFolder: "cypress/support",
    e2e: {
        baseUrl: "http://localhost:9000",
    },
    component: {
        indexHtmlFile: toAbsolutePath("../cypress/support/component-index.html"),
        specPattern: toAbsolutePath("../src/**/*.cy.{ts,tsx}"),
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
