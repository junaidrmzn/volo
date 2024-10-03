import { resolve } from "node:path";
import merge from "webpack-merge";
import { productionConfiguration } from "../../../../config/webpack.production";
import { webpackHostConfiguration } from "../../../../config/webpack/webpackHost.config";
import { name as packageName } from "../package.json";

const rootPath = resolve(__dirname, "..");

export default merge(
    productionConfiguration({ rootPath, packageName, mainEntryPoint: resolve(rootPath, "src/index.ts") }),
    webpackHostConfiguration({
        rootPath,
        remotes: {},
    })
);
