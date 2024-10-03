import { Command } from "commander";
import dotenv from "dotenv";
import log from "loglevel";
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "node:fs";
import path, { resolve } from "node:path";
import { generate } from "orval";
import { fetchOAS } from "./fetch";

dotenv.config({
    path: resolve(__dirname, "../../../../../.env"),
});

log.setLevel("info");

export type CreateGeneratorOptions = {
    prettier?: boolean;
};

/**
 * Returns the path to the OAS.
 * If we're in the development or testing environment, we are fetching the OAS
 * directly from the voloiq-openapi-schemas repository using Azure's REST api.
 * Otherwise, we assume we're in the pipeline. In this case the voloiq-openapi-schemas
 * repository should be available at the root of the local voloiq-ui repository because
 * it was cloned during the checkout step.
 *
 * @param apiName The name of the api to retrieve the OAS from (e.g. "logbook")
 * @returns The local path to the OAS
 */
const getOASPath = async (apiName: string, version: string, branchName: string): Promise<string> => {
    const pipelineOASFolderRoot = resolve(__dirname, "../../../../../voloiq-openapi-schemas/");
    const OASShouldBeFetchedRemotely = !existsSync(pipelineOASFolderRoot);
    const fileName = `${apiName}${version !== "v1" ? `_${version}` : ""}`;

    if (OASShouldBeFetchedRemotely) {
        log.info(
            `Fetching ${apiName} OpenAPI schema with version ${version} remotely in the voloiq-openapi-schemas repository on branch ${branchName}...`
        );
        const fetchedOAS = await fetchOAS(apiName, version, branchName);
        if (!existsSync(resolve(__dirname, "./temp"))) {
            mkdirSync(resolve(__dirname, "./temp"), { recursive: true });
        }
        writeFileSync(resolve(__dirname, `./temp/${fileName}.yaml`), fetchedOAS);
    }

    return OASShouldBeFetchedRemotely
        ? resolve(__dirname, `./temp/${fileName}.yaml`)
        : resolve(pipelineOASFolderRoot, `${apiName}/${fileName}.yaml`);
};

export const createGenerator = (createGeneratorOptions: CreateGeneratorOptions = {}) => {
    const { prettier = true } = createGeneratorOptions;
    const program = new Command();

    return program
        .option("-s, --localOASPath <path>", "local path to OpenAPI schema")
        .requiredOption("-n, --apiName <name>", "name of API")
        .option("-v, --version <version>", "version of the OAS (v1 by default)")
        .option("-b, --branchName <branchName>", "name of the OAS repo branch (main by default)")
        .action(async (cliOptions) => {
            const { localOASPath, apiName, version = "v1", branchName = "main" } = cliOptions;
            const workspace = "./src/api";

            log.info("Generating API consumer code...");
            await generate({
                input: localOASPath || (await getOASPath(apiName, version, branchName)),
                output: {
                    workspace,
                    schemas: `./${apiName}`,
                    prettier,
                },
            });

            unlinkSync(path.join(workspace, "index.ts"));
            unlinkSync(path.join(workspace, apiName, "index.ts"));
        });
};
