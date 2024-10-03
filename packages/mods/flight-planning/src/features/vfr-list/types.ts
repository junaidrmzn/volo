export type VfrLayer = {
    modified_on?: string | Date;
    id: string;
    file_name: string;
    valid_to: string;
    url?: string;
    created_on: string | Date;
    vfr_type: string;
    region_id: string;
};

export type VfrOption = {
    value: string;
    label?: string;
};

export type FileEntry = {};

export type VfrType = {
    value?: string;
    label?: string;
};

export type RegionId = {
    value?: string;
    label?: string;
};

export type FormMetaData = {
    vfr_type: VfrType;
    region_id: RegionId;
    file_name: string;
    valid_to: Date;
};

export type UploadStatus = {
    status: "idle" | "pending" | "success";
    percentage: number;
};
