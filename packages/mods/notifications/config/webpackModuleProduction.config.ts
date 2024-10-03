import path from "node:path";
import { webpackModuleConfiguration } from "../../../../config/webpack/webpackModule.config";

const rootPath = path.resolve(__dirname, "..");

export default webpackModuleConfiguration({ rootPath, moduleName: "notifications" });
