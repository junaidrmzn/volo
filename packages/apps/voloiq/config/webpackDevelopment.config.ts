import path, { resolve } from "node:path";
import merge from "webpack-merge";
import { webpackDevelopmentConfiguration } from "../../../../config/webpack/webpackDevelopment.config";
import { webpackHostConfiguration } from "../../../../config/webpack/webpackHost.config";

const rootPath = path.resolve(__dirname, "..");

export default merge(
    webpackDevelopmentConfiguration({ rootPath, port: 9000, bundleEntryFilePath: resolve(rootPath, "src/index.ts") }),
    webpackHostConfiguration({
        rootPath,
        remotes: {},
    })
);
