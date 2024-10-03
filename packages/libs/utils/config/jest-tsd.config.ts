import { baseTSDConfiguration } from "../../../../config/jest-tsd.config.base";
import { name } from "../package.json";

export default baseTSDConfiguration({ name, babelConfigPath: "./babel.config.js" });
