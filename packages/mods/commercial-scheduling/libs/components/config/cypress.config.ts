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
    component: {
        indexHtmlFile: toAbsolutePath("../cypress/support/component-index.html"),
        specPattern: toAbsolutePath("../src/**/*.cy.tsx"),
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig,
        },
    },
});
