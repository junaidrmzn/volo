#!/usr/bin/env node
import { copySync, existsSync, rmSync } from "fs-extra";
import { exec } from "node:child_process";
import path from "node:path";
import type { PackageType } from "./packageType";
import { replaceFileNames } from "./replaceFileNames";
import { replaceInDirectory } from "./replaceInDirectory";

const kebapCaseToCamelCase = (kebapCaseString: string) =>
    kebapCaseString.replace(/-./g, (x) => x[1]?.toUpperCase() ?? x);

const camelCaseToPascalCase = (camelCaseString: string) =>
    camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);

export const generate = (packageType: PackageType, packageName: string, rootPath: string) => {
    const packageRegex = /@voloiq\/(([a-z]+-*)+[a-z]+$)/;
    const result = packageRegex.exec(packageName);

    if (result === null || !result[1]) {
        process.stderr.write("Package name is invalid. A valid format could be @voloiq/your-package-name \n");
        process.exit(1);
    }

    const name = result[1].toLowerCase();
    const targetPath = `packages/${packageType}s`;
    const absoluteTemplatePath = path.resolve(rootPath, `${targetPath}/template`);
    const absoluteTargetPath = path.resolve(rootPath, `${targetPath}/${name}`);

    process.stdout.write(`Creating new "${packageType}" package "${packageName}"\n`);
    process.stdout.write(`Template path: "${absoluteTemplatePath}"\n`);
    process.stdout.write(`Target path: "${absoluteTargetPath}"\n`);

    const camelCaseName = kebapCaseToCamelCase(name);
    const pascalCaseName = camelCaseToPascalCase(camelCaseName);
    const searchReplaceMap = {
        [`@voloiq/${packageType}-template`]: packageName,
        template: camelCaseName,
        Template: pascalCaseName,
    };

    try {
        copySync(absoluteTemplatePath, absoluteTargetPath);
        replaceInDirectory(absoluteTargetPath, searchReplaceMap);
        replaceFileNames(absoluteTargetPath, searchReplaceMap);
    } catch (error) {
        process.stderr.write(JSON.stringify(error));
        process.stderr.write(`Will remove ${absoluteTargetPath}`);

        if (existsSync(absoluteTargetPath)) {
            rmSync(absoluteTargetPath, { recursive: true, force: true });
        }
        process.exit(1);
    }

    exec("yarn install");
};
