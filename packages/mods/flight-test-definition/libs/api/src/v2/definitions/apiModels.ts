import type {
    EngineeringTestProcedure,
    FTILink,
    ProcedureRead,
    Requirement,
    RiskLevel,
    SignatureRecord,
    SpecialComment,
    TestHazardAssessment,
    WindchillRequirement,
} from "../../v1";
import type { FlightTestDefinitionRequestStatus } from "../common/apiModels";

export const masterModels = ["2X", "VC2-1", "VD150", "SIMX", "SIMZERO"] as const;
export type MasterModel = typeof masterModels[number];
export const isMasterModel = (input: unknown): input is MasterModel => masterModels.includes(input as MasterModel);

export type MSNModel =
    | "01"
    | "02"
    | "03"
    | "04"
    | "05"
    | "B0-01"
    | "B0-02"
    | "MSN01"
    | "MSN03"
    | "MSN04"
    | "MSN05"
    | "MSN06";
export declare function isMSNModel(object: unknown): object is MSNModel;
export const testTypes = ["GROUND", "FLIGHT"] as const;

export type TestTypeEnum = typeof testTypes[number];
export type FlightTestDefinitionInsert = {
    title: string;
    summary: string;
    scope: string;
    testArticle?: string;
    masterModel: MasterModel;
    msn: MSNModel;
    ata: number;
    testNumber: number;
    revision: string;
    requesterName: string;
    testType: TestTypeEnum;
    model: string;
};
export type FlightTestDefinitionPatchRequestBody = Partial<
    FlightTestDefinitionInsert &
        Pick<
            FlightTestDefinitionResponseBody,
            "requestStatus" | "specialEquipment" | "dataAnalysisPlan" | "safetyReviewComments" | "safetyRecommendations"
        >
>;
export type FlightTestDefinitionStatus = "DRAFT" | "APPROVED";

export type FlightTestDefinitionResponseBody = FlightTestDefinitionInsert & {
    createTime: string;
    updateTime: string;
    id: string;
    inactive: boolean;
    status: FlightTestDefinitionStatus;
    ftdId: string;
    requestStatus: FlightTestDefinitionRequestStatus;
    specialEquipment?: string;
    dataAnalysisPlan?: string;
    isReadyForRevision: boolean;
    safetyReviewComments?: string;
    highestRiskLevel?: RiskLevel;
    releasedRevisions: string[];
    safetyRecommendations?: string;
};

export type FlightTestDefinitionOverviewResponseBody = FlightTestDefinitionResponseBody & {
    requirementCount: number;
    ftiCount: number;
    fileCount: number;
};

export type FlightTestDefinitionOverviewListResponseBody = {
    id: string;
    ata: number;
    value: FlightTestDefinitionOverviewResponseBody[];
};

export type FlightTestDefinitionChangesOverview = FlightTestDefinitionResponseBody & {
    procedures?: ProcedureRead[];
    manualRequirements?: Requirement[];
    windchillRequirements?: WindchillRequirement[];
    ftiLinks?: FTILink[];
    specialComments?: SpecialComment[];
    testHazardAssessments?: TestHazardAssessment[];
    signatureRecords?: SignatureRecord[];
    engineeringTestProcedures?: EngineeringTestProcedure[];
};

export type TabCountersResponseBody = {
    ftdId: string;
    procedureCount: number;
    fileCount: number;
    requirementCount: number;
    ftiCount: number;
};
