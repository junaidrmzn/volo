import fs from "fs-extra";
import mockFs, { load, restore } from "mock-fs";
import childProcess from "node:child_process";
import path from "node:path";
import { generate } from "./generate";

const stdoutSpy = jest.spyOn(process.stdout, "write").mockImplementation();
const stderrSpy = jest.spyOn(process.stderr, "write").mockImplementation();
const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {
    throw new Error("Process exited");
});
const execSpy = jest.spyOn(childProcess, "exec").mockImplementation();

afterEach(() => {
    for (const spy of [stdoutSpy, stderrSpy, exitSpy, execSpy]) spy.mockReset();
});

test("Will err if new package scope is missing", () => {
    expect(() => generate("mod", "no-scope", ".")).toThrow();
    expect(stderrSpy).toHaveBeenCalledWith(
        "Package name is invalid. A valid format could be @voloiq/your-package-name \n"
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
});

test("Will err if new package name has invalid format", () => {
    expect(() => generate("mod", "@voloiq/invalid/name", ".")).toThrow();
    expect(stderrSpy).toHaveBeenCalledWith(
        "Package name is invalid. A valid format could be @voloiq/your-package-name \n"
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
});

test("Executes yarn install", () => {
    mockFs({
        "packages/apps/template": load(path.resolve(__dirname, "../../../packages/apps/template"), { lazy: false }),
    });

    generate("app", "@voloiq/valid-name", ".");
    expect(execSpy).toHaveBeenCalledWith("yarn install");

    restore();
});
describe("App", () => {
    beforeEach(() => {
        mockFs({
            "packages/apps/template": load(path.resolve(__dirname, "../../../packages/apps/template"), { lazy: false }),
        });
    });

    afterEach(() => {
        restore();
    });

    test("Creates a new app", async () => {
        generate("app", "@voloiq/new-app", ".");

        expect(fs.existsSync("packages/apps/new-app")).toBe(true);
    });

    test("Changes package name", async () => {
        generate("app", "@voloiq/new-app", ".");

        expect(fs.readFileSync("packages/apps/new-app/package.json", "utf-8")).toContain('"name": "@voloiq/new-app"');
    });
});

describe("Mod", () => {
    beforeEach(() => {
        mockFs({
            "packages/mods/template": load(path.resolve(__dirname, "../../../packages/mods/template"), { lazy: false }),
        });
    });

    afterEach(() => {
        restore();
    });

    test("Creates a new module", () => {
        generate("mod", "@voloiq/new-mod", ".");

        expect(fs.existsSync("packages/mods/new-mod")).toBe(true);
    });

    test("Changes package name", () => {
        generate("mod", "@voloiq/new-mod", ".");

        expect(fs.readFileSync("packages/mods/new-mod/package.json", "utf-8")).toContain('"name": "@voloiq/new-mod"');
    });

    test("Updates translation files", () => {
        generate("mod", "@voloiq/new-mod", ".");

        expect(fs.existsSync("packages/mods/new-mod/src/translations/newMod.en.translations.json")).toBe(true);
        expect(fs.existsSync("packages/mods/new-mod/src/translations/useNewModTranslation.ts")).toBe(true);
        expect(fs.readFileSync("packages/mods/new-mod/src/translations/useNewModTranslation.ts", "utf-8")).toContain(
            "export const useNewModTranslation"
        );
    });
});

describe("Lib", () => {
    beforeEach(() => {
        mockFs({
            "packages/libs/template": load(path.resolve(__dirname, "../../../packages/libs/template"), { lazy: false }),
        });
    });

    afterEach(() => {
        restore();
    });

    test("Creates a new library", async () => {
        generate("lib", "@voloiq/new-lib", ".");

        expect(fs.existsSync("packages/libs/new-lib")).toBe(true);
    });

    test("Changes package name", () => {
        generate("lib", "@voloiq/new-lib", ".");

        expect(fs.readFileSync("packages/libs/new-lib/package.json", "utf-8")).toContain('"name": "@voloiq/new-lib"');
    });
});
