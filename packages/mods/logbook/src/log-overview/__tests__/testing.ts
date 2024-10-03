import { readFileSync } from "node:fs";

export const createFile = (path: string, fileName: string) => {
    // eslint-disable-next-line unicorn/prefer-module
    return new File([new Blob([readFileSync(path, "binary")])], fileName, {
        type: "application/octet-stream",
    });
};
