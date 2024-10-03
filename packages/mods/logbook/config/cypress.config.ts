/* eslint-disable import/no-default-export */
import { defineConfig } from "cypress";
import path from "node:path";
import { Pool } from "pg";
import webpackConfig from "../../flight-test-instrumentation/config/webpack.production";

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
});
const toAbsolutePath = (relativePath: string) => path.join(__dirname, relativePath);

export default defineConfig({
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporter: "junit",

    reporterOptions: {
        mochaFile: "cypress/tests/test-output-[hash].xml",
        toConsole: true,
        attachments: true,
    },

    e2e: {
        baseUrl: "http://localhost:9000",
        setupNodeEvents(on) {
            on("task", {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                query: (value: { query: string; values?: any }) => {
                    const { query, values } = value;
                    return pool.query(query, values);
                },
            });
        },
    },

    component: {
        specPattern: toAbsolutePath("../src/**/*.cy-test.{ts,tsx}"),
        indexHtmlFile: toAbsolutePath("../cypress/support/component-index.html"),
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig,
        },
    },
});
