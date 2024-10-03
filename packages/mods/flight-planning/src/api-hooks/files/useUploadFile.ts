import type { AbortSignal } from "@azure/abort-controller";
import { AnonymousCredential, BlockBlobClient } from "@azure/storage-blob";

export const uploadFile = async (
    uploadLink: string,
    file: File,
    onUploadProgress?: (progress: number) => void,
    abortSignal?: AbortSignal
) => {
    const blobServiceClient = new BlockBlobClient(uploadLink, new AnonymousCredential());
    return blobServiceClient.uploadData(new Blob([file], { type: "application/octet-stream" }), {
        onProgress: onUploadProgress
            ? (progress) => onUploadProgress((progress.loadedBytes / file.size) * 100)
            : undefined,
        abortSignal,
    });
};
