import { copyFileSync, emptyDirSync, existsSync, lstatSync, readdirSync } from "fs-extra";
import { execSync } from "node:child_process";
import path from "node:path";

const ROOT_PATH = path.resolve(__dirname, "../..");
const PACKAGE_PATHS = ["./packages/apps", "./packages/libs", "./packages/mods"].map((folder) =>
    path.resolve(ROOT_PATH, folder)
);
const COVERAGE_FOLDER = "coverage";

emptyDirSync(COVERAGE_FOLDER);

for (const packagePath of PACKAGE_PATHS) {
    for (const file of readdirSync(packagePath)) {
        const filePath = path.resolve(packagePath, file);
        const isFolder = lstatSync(filePath).isDirectory();
        const coverageFolderExists = isFolder && existsSync(path.resolve(filePath, COVERAGE_FOLDER));

        if (coverageFolderExists) {
            copyFileSync(
                path.resolve(filePath, COVERAGE_FOLDER, "coverage-final.json"),
                path.resolve(ROOT_PATH, COVERAGE_FOLDER, `${file}-coverage-final.json`)
            );
        }
    }
}

// merges the package coverage json files that have been copied in the coverage folder into a merged.json file
execSync(`nyc merge ${COVERAGE_FOLDER} ${COVERAGE_FOLDER}/summary/merged.json`);
// generates a html report from the the merged.json file
execSync(`nyc report --reporter html -t ${COVERAGE_FOLDER}/summary --report-dir ${COVERAGE_FOLDER}/summary`);
