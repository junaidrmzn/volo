export const FileTypeEnum = {
    FC: "FC",
    MESH: "MESH",
    IADS: "IADS",
    IADS_RAW: "IADS_RAW",
    MEDIA: "MEDIA",
} as const;

export type FileType = typeof FileTypeEnum[keyof typeof FileTypeEnum];

export const FileStatusEnum = {
    QUEUED: "QUEUED",
    PROCESSING: "PROCESSING",
    PROCESSED: "PROCESSED",
    ERROR: "ERROR",
    UPLOADED: "UPLOADED",
    UPLOAD_REQUESTED: "UPLOAD_REQUESTED",
} as const;

export type FileStatus = typeof FileStatusEnum[keyof typeof FileStatusEnum];

export type LogbookFile = {
    id: string;
    url: string;
    fileType: FileType;
    fileName: string;
    logId: string;
    status: FileStatus;
    statusDescription?: string;
    processingTime?: number;
    createTime: string;
    updateTime: string;
};

export type FileInsert = {
    url: string;
    fileType: FileType;
    fileName: string;
};

export type FileEntry = {
    type: FileType;
    file: File;
    metaData?: Metadata;
    metadataRequestStatus?: "pending" | "success" | "error";
};

export type LogFileSnippet = {
    logFile: Blob;
};

export type FileUrl = {
    url: string;
    expiry: string;
};

export type ExportFileUrl = {
    url: string;
    expiry: string;
};

export type Metadata = {
    fileType: FileType;
    productLine: ProductLine;
    timestamp: string;
};

export type ProductLine = typeof ProductLineEnum[keyof typeof ProductLineEnum];
export const ProductLineEnum = {
    VoloDrone: "VoloDrone",
    VoloCity: "VoloCity",
    VoloRegion: "VoloRegion",
    Autonomy: "Autonomy",
    "2X": "2X",
} as const;
