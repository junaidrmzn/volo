#!/usr/bin/env node
import { existsSync, lstatSync, readFileSync, readdirSync, writeFileSync } from "fs-extra";

const replaceInFile = (filePath: string, searchReplaceMap: Record<string, string>) => {
    if (!existsSync(filePath)) {
        process.stderr.write(`Cannot find file: ${filePath} \n`);
        process.exit(1);
    }

    const fileStream = readFileSync(filePath, "utf-8");
    let content = fileStream.toString();

    for (const [key, value] of Object.entries(searchReplaceMap)) {
        content = content.split(key).join(value);
    }

    writeFileSync(filePath, content, "utf-8");
};

export const replaceInDirectory = (directoryPath: string, searchReplaceMap: Record<string, string>) => {
    if (!existsSync(directoryPath)) {
        process.stderr.write(`Cannot find dir: ${directoryPath} \n`);
        process.exit(1);
    }

    const files = readdirSync(directoryPath);

    for (const file of files) {
        const filePath = `${directoryPath}/${file}`;
        if (lstatSync(filePath).isDirectory()) {
            replaceInDirectory(filePath, searchReplaceMap);
        } else {
            replaceInFile(filePath, searchReplaceMap);
        }
    }
};
