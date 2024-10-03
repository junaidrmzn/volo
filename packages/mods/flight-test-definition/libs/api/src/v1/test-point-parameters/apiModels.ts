export type TestPointParameter = {
    id: string;
    isActive: boolean;
    name: string;
    unit: string;
    acronym: string;
    createTime: string;
    updateTime: string;
};

export type TestPointParameterInsert = {
    id: string;
    value: string;
};

export type TestPointParameterPatch = {
    name?: string;
    unit?: string;
    acronym?: string;
    isActive?: boolean;
};

export type TestPointParameterResponse = TestPointParameterInsert & {
    name: string;
    unit: string;
};
