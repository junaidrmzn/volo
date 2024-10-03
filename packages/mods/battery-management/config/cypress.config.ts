/* eslint-disable import/no-default-export */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { defineConfig } from "cypress";

export default defineConfig({
    reporter: "junit",
    reporterOptions: {
        mochaFile: "cypress/tests/test-output-[hash].xml",
        toConsole: true,
        attachments: true,
    },
    video: false,
    fixturesFolder: false,
    e2e: {
        baseUrl: "http://localhost:9000/",
    },
});
