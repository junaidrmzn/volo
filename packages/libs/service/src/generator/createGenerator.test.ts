import mockFs, { load, restore } from "mock-fs";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import waitForExpect from "wait-for-expect";
import { createGenerator } from "./createGenerator";

const testOpenApiSpec = readFileSync(resolve(__dirname, "./test-data/testOpenApiSpec.yaml"), "utf8");
const testOpenApiSpecV2 = readFileSync(resolve(__dirname, "./test-data/testOpenApiSpec_v2.yaml"), "utf8");

const resourceHandlers = [
    rest.get(
        "https://dev.azure.com/volocopter/voloiq/_apis/git/repositories/voloiq-openapi-schemas/items",
        (request, response, context) => {
            if (request.url.searchParams.get("path") === "/logbook/logbook.yaml") {
                return response(
                    context.status(200),
                    context.json({
                        content: testOpenApiSpec,
                    })
                );
            }
            if (request.url.searchParams.get("path") === "/logbook/logbook_v2.yaml") {
                return response(
                    context.status(200),
                    context.json({
                        content: testOpenApiSpecV2,
                    })
                );
            }
            return response(context.status(404));
        }
    ),
];

const { listen, close } = setupServer(...resourceHandlers);

beforeAll(() => {
    process.env.AZURE_DEVOPS_TOKEN = "XXX";
    listen();
});

beforeEach(() => {
    mockFs({
        "resources/openApiSpec.yaml": load(resolve(__dirname, "./test-data/testOpenApiSpec.yaml"), {
            lazy: false,
        }),
        "temp/logbook.yaml": load(resolve(__dirname, "./test-data/testOpenApiSpec.yaml"), {
            lazy: false,
        }),
        "temp/logbook_v2.yaml": load(resolve(__dirname, "./test-data/testOpenApiSpec_v2.yaml"), {
            lazy: false,
        }),
    });
});

afterEach(() => {
    restore();
});

afterAll(() => {
    delete process.env.AZURE_DEVOPS_TOKEN;
    close();
});

test("Generates consumer code with a local OAS", async () => {
    const program = createGenerator({ prettier: false });
    program.parse(["-s", "resources/openApiSpec.yaml", "-n", "some-api"], { from: "user" });

    await waitForExpect(() =>
        expect(readdirSync("src/api/some-api")).toEqual([
            "productLine.ts",
            "technicalStatus.ts",
            "vtol.ts",
            "vtolCreate.ts",
            "vtolType.ts",
            "vtolTypeCreate.ts",
            "vtolUpdate.ts",
        ])
    );
});

test("Generates consumer code with a remote OAS", async () => {
    const program = createGenerator({ prettier: false });
    program.parse(["-n", "logbook"], { from: "user" });

    await waitForExpect(() =>
        expect(readdirSync("src/api/logbook")).toEqual([
            "productLine.ts",
            "technicalStatus.ts",
            "vtol.ts",
            "vtolCreate.ts",
            "vtolType.ts",
            "vtolTypeCreate.ts",
            "vtolUpdate.ts",
        ])
    );
});

test("Generates consumer code with a remote OAS with a specified version", async () => {
    const program = createGenerator({ prettier: false });
    program.parse(["-n", "logbook", "-v", "v2"], { from: "user" });

    await waitForExpect(() =>
        expect(readdirSync("src/api/logbook")).toEqual([
            "productLine.ts",
            "technicalStatus.ts",
            "vtol.ts",
            "vtolCreate.ts",
            "vtolType.ts",
            "vtolTypeCreate.ts",
        ])
    );
});
