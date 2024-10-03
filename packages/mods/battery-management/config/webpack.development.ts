import path from "node:path";
import { developmentConfiguration } from "../../../../config/webpack.development";
import { baseConfiguration } from "./webpack.base";

const rootPath = path.resolve(__dirname, "..");

export default developmentConfiguration({ rootPath, baseConfiguration });
