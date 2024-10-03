import { defineConfig } from "cypress";
import path from "node:path";
import webpackConfig from "./webpack.cypress";

const toAbsolutePath = (relativePath: string) => path.join(__dirname, relativePath);

// eslint-disable-next-line import/no-default-export
export default defineConfig({
    supportFolder: "cypress/support",
    viewportWidth: 1920,
    viewportHeight: 1080,
    fixturesFolder: false,
    chromeWebSecurity: false,
    component: {
        indexHtmlFile: toAbsolutePath("../cypress/support/component-index.html"),
        specPattern: "**/*.cy.{ts,tsx}",
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig,
        },
    },
});
