#!/usr/bin/env node
import { existsSync, lstatSync, readdirSync, renameSync } from "fs-extra";

const replaceFileName = (filePath: string, searchReplaceMap: Record<string, string>) => {
    for (const templateString of Object.keys(searchReplaceMap)) {
        const packageString = searchReplaceMap[templateString];

        const newFilePath = filePath.replace(templateString, packageString ?? templateString);
        if (filePath !== newFilePath) {
            renameSync(filePath, newFilePath);
        }
    }
};

export const replaceFileNames = (directoryPath: string, searchReplaceMap: Record<string, string>) => {
    if (!existsSync(directoryPath)) {
        process.stderr.write(`Cannot find dir: ${directoryPath} \n`);
        process.exit(1);
    }

    const files = readdirSync(directoryPath);

    for (const file of files) {
        const filePath = `${directoryPath}/${file}`;
        if (lstatSync(filePath).isDirectory()) {
            replaceFileNames(filePath, searchReplaceMap);
        } else {
            replaceFileName(filePath, searchReplaceMap);
        }
    }
};
