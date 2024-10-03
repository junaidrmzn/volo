export declare type MSNModel = "01" | "02" | "03" | "04" | "05" | "B0-01" | "B0-02";
export declare type MasterModel = "2X" | "VC2-1" | "VD150";
export declare type TestTypeEnum = "GROUND" | "FLIGHT";
export declare type StatusModel = "DRAFT" | "APPROVED";
export declare type RequestStatus =
    | "DRAFT"
    | "FLIGHT TEST REVIEW"
    | "ENGINEERING REVIEW"
    | "TECHNICAL APPROVAL"
    | "SAFETY APPROVAL";

export declare function isMSNModel(object: unknown): object is MSNModel;

export type FlightTestDefinitionInsert = {
    title: string;
    summary: string;
    scope: string;
    testArticle?: string;
    testType?: TestTypeEnum;
    masterModel: MasterModel;
    msn: MSNModel;
    ata: number;
    testNumber: number;
    revision: string;
    requesterName: string;
};

export type FlightTestDefinition = FlightTestDefinitionInsert & {
    id: string;
    ftdId: string;
    status: StatusModel;
    requestStatus: RequestStatus;
    createTime: string;
};

export type FlightTestDefinitionPatch = {
    title?: string;
    summary?: string;
    scope?: string;
    testArticle?: string;
    masterModel?: MasterModel;
    msn?: MSNModel;
    ata?: number;
    testNumber?: number;
    revision?: string;
    testType?: TestTypeEnum;
};

export type Revision = {
    ftdId: string;
    released: boolean;
    revision: string;
    revisionDescription: string;
    released_date: Date;
};

export type RevisionPatch = Partial<Revision>;
