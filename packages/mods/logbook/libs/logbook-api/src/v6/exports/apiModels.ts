import type { FileStatus } from "../files/apiModels";

export type Export = {
    id: string;
    url?: string;
    exportArguments: ExportArguments;
    status: FileStatus;
    logId: string;
    fileType: ExportFileType;
    description?: string;
    createTime: string;
    updateTime: string;
    createdBy?: string;
    updatedBy?: string;
};

export type ExportFileType = "CSV" | "PARQUET" | "HDF5";

export type ExportArguments = {
    parameters: string[];
    startTime: string;
    endTime: string;
    sampleRate: number | null;
    exportFileType: ExportFileType;
};

export type ExportInsert = {
    description?: string;
    parameters: string[];
    startTime: string;
    endTime: string;
    sampleRate: number | null;
    exportFileType: ExportFileType;
};

export type ExportUpdate = {
    url?: string;
    status: FileStatus;
};
