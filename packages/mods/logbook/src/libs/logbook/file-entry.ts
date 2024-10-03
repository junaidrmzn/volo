import type { FileType, Metadata } from "@voloiq/logbook-api/v6";

export type FileEntry = {
    type: FileType;
    file: File;
    metaData?: Metadata;
    metadataRequestStatus?: "pending" | "success" | "error";
};
