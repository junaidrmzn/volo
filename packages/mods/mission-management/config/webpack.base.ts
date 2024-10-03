import path from "node:path";
import { baseConfiguration as rootBaseConfiguration } from "../../../../config/webpack.base";

const rootPath = path.resolve(__dirname, "..");
export const baseConfiguration = rootBaseConfiguration({
    rootPath,
    mainEntryPoint: path.resolve(rootPath, "src/bootstrap.tsx"),
});
