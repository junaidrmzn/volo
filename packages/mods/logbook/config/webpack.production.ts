import path from "node:path";
import { productionConfiguration } from "../../../../config/webpack.production";
import { name as packageName } from "../package.json";
import { baseConfiguration } from "./webpack.base";

const rootPath = path.resolve(__dirname, "..");

export default productionConfiguration({ rootPath, packageName, baseConfiguration });
