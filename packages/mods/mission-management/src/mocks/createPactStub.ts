import { Stub } from "@pact-foundation/pact-node";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type CreatePactStubOptions = {
    port: number;
};
export const createPactStub = (options: CreatePactStubOptions) => {
    const { port } = options;
    // eslint-disable-next-line unicorn/prefer-module
    const pactsDirectory = join(__dirname, "../..", "pact", "pacts");
    if (!existsSync(pactsDirectory)) {
        throw new Error(`Couldn't find any PACT files in ${pactsDirectory}, so the Pact Stub cannot be started`);
    }

    const pactFiles = readdirSync(pactsDirectory).map((pactFile) => join(pactsDirectory, pactFile));
    const pactStub = new Stub({ pactUrls: pactFiles, port });

    return { pactStub };
};
