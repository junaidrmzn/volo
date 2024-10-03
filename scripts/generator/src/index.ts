import { Command } from "commander";
import path from "node:path";
import { generate } from "./generate";
import { packageTypes } from "./packageType";

const rootPath = path.resolve(__dirname, "../../..");
const generator = new Command();

for (const packageType of packageTypes)
    generator.command(`${packageType} <packageName>`).action((name: string) => generate(packageType, name, rootPath));

generator.parse(process.argv);
