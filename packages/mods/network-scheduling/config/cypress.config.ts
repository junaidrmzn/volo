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
    e2e: {
        baseUrl: "http://localhost:9000",
    },
    component: {
        viewportWidth: 1440,
        viewportHeight: 900,
        specPattern: toAbsolutePath("../cypress/component/**/*.{test,cy}.{ts,tsx}"),
        indexHtmlFile: toAbsolutePath("../cypress/support/component-index.html"),
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig,
        },
    },
});
