import { defineConfig } from "cypress";
import path from "node:path";
import webpackConfig from "./webpack.production";

const toAbsolutePath = (relativePath: string) => path.join(__dirname, relativePath);

export default defineConfig({
    reporter: "junit",
    reporterOptions: {
        mochaFile: "cypress/tests/test-output-[hash].xml",
        toConsole: true,
        attachments: true,
    },
    video: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    fixturesFolder: false,
    e2e: {
        baseUrl: "http://localhost:9000/mission-management",
    },
    component: {
        specPattern: toAbsolutePath("../cypress/**/*.cy.{ts,tsx}"),
        indexHtmlFile: toAbsolutePath("../cypress/support/component-index.html"),
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig,
        },
    },
});
