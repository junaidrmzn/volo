import { FileTypeEnum } from "@voloiq/logbook-api/v6";

const FILE_SIGNATURES = {
    [FileTypeEnum.MESH]: "23232042",
    [FileTypeEnum.FC]: "4643",
    [FileTypeEnum.IADS]: "74696d65",
};

const readBlob = (blob: Blob): Promise<string | ArrayBuffer | undefined> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", (event) => {
            resolve(event.target?.result || undefined);
        });
        fileReader.addEventListener("error", reject);
        fileReader.readAsArrayBuffer(blob);
    });
};

const getFileSignature = async (blob: Blob) => {
    const arrayBuffer = await readBlob(blob.slice(0, 4));
    if (arrayBuffer instanceof ArrayBuffer) {
        const array = new Uint8Array(arrayBuffer);
        let fileSignature = "";
        for (const element of array) {
            fileSignature += element.toString(16);
        }
        return fileSignature;
    }
    throw new TypeError("Unknown MIME type");
};

export const getFileType = async (file: File) => {
    const fileSignature = await getFileSignature(file);

    if (fileSignature.startsWith(FILE_SIGNATURES[FileTypeEnum.MESH]!)) {
        return FileTypeEnum.MESH;
    }
    if (fileSignature.startsWith(FILE_SIGNATURES[FileTypeEnum.FC]!)) {
        return FileTypeEnum.FC;
    }
    if (fileSignature.startsWith(FILE_SIGNATURES[FileTypeEnum.IADS]!)) {
        return FileTypeEnum.IADS;
    }

    return FileTypeEnum.MEDIA;
};
