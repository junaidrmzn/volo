export type SoftwareConfig = {
    id: string;
    configType: SoftwareConfigType;
    gitHash: string;
    createTime: string;
    updateTime: string;
    validTo?: string;
    inactive: boolean;
};

export type SoftwareConfigInsert = {
    configFile: Blob;
};

export type SoftwareConfigType = typeof SoftwareConfigTypeEnum[keyof typeof SoftwareConfigTypeEnum];

export const SoftwareConfigTypeEnum = {
    FC: "FC",
} as const;
