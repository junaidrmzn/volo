import { createGenerator } from "./createGenerator";

createGenerator().parse(process.argv, { from: "user" });
