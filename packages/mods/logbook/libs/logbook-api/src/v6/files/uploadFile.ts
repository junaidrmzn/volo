import type { AbortSignal } from "@azure/abort-controller";
import { AnonymousCredential, BlockBlobClient } from "@azure/storage-blob";
import { isTesting } from "@voloiq/utils";

const readFileAsync = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion, no-type-assertion/no-type-assertion
            resolve(reader.result as ArrayBuffer);
        });
        reader.readAsArrayBuffer(file);
    });
};

export const uploadFile = async (
    uploadLink: string,
    file: File,
    onUploadProgress: (progress: number) => void,
    abortSignal: AbortSignal
) => {
    const ONE_MB = 1 * 1024 * 1024;
    const blobServiceClient = new BlockBlobClient(uploadLink, new AnonymousCredential());
    return blobServiceClient.uploadData(
        isTesting ? await readFileAsync(file) : new Blob([file], { type: "application/octet-stream" }),
        {
            onProgress: (progress) => onUploadProgress((progress.loadedBytes / file.size) * 100),
            // Upload in parallel with chunks when the file is bigger than 1MB (workaround as the upload
            // percentage is not properly displayed if we use a single request sometimes, but this also
            // increases performance for larger file uploads and allows to exceed the default browser 2GB limit)
            maxSingleShotSize: ONE_MB,
            abortSignal,
        }
    );
};
