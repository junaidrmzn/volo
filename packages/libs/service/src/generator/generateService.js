#!/usr/bin/env node
const { spawnSync } = require("child_process");
const path = require("path");
const { platform } = require("os");

const scriptFile = path.resolve(__dirname, "index.ts");
const args = process.argv.slice(2);
spawnSync(platform() === "win32" ? "yarn.cmd" : "yarn", ["ts-node", scriptFile, ...args], {
    encoding: "utf8",
    stdio: "inherit",
});
