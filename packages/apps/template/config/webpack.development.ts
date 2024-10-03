import path from "node:path";
import { developmentConfiguration } from "../../../../config/webpack.development";

const rootPath = path.resolve(__dirname, "..");

export default developmentConfiguration({ rootPath });
