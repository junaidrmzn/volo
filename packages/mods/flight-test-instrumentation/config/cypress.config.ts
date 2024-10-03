import { defineConfig } from "cypress";
import path from "node:path";
import { Pool } from "pg";
import webpackConfig from "./webpack.production";

const pool = new Pool({
    host: "localhost",
    port: 6543,
    user: "postgres",
    password: "postgres",
    database: "postgres_fti",
});
const toAbsolutePath = (relativePath: string) => path.join(__dirname, relativePath);
export default defineConfig({
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    reporter: "junit",
    reporterOptions: {
        mochaFile: "cypress/tests/test-output-[hash].xml",
        toConsole: true,
        attachments: true,
    },
    e2e: {
        setupNodeEvents(on) {
            on("task", {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                query: (value: { query: string; values?: any }) => {
                    const { query, values } = value;
                    return pool.query(query, values);
                },
            });
        },
        baseUrl: "http://localhost:9000",
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
