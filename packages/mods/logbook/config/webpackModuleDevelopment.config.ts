import { merge } from "lodash";
import path from "node:path";
import { webpackDevelopmentConfiguration } from "../../../../config/webpack/webpackDevelopment.config";
import { webpackModuleConfiguration } from "../../../../config/webpack/webpackModule.config";

const rootPath = path.resolve(__dirname, "..");

export default merge(
    webpackModuleConfiguration({
        rootPath,
        moduleName: "logbook",
        filePathPrefix: "logbook",
    }),
    // The order is important here, because the development configuration needs to overwrite some of the above configuration
    webpackDevelopmentConfiguration({
        rootPath,
        bundleEntryFilePath: path.resolve(rootPath, "src/bootstrap.tsx"),
        port: 9002,
    })
);
