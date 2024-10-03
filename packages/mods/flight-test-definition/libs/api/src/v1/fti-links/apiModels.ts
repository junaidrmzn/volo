import { Parameter } from "../fti-parameters/apiModels";

export declare type DesirabilityEnum = "DESIRABLE" | "ESSENTIAL";

export type FTILinkInsertBulk = {
    desirability: DesirabilityEnum;
    instrumentationId: string;
};

export type FTILinkPatchBulk = {
    id: string;
    desirability?: DesirabilityEnum;
};

export type FTILink = {
    id: string;
    definitionId: string;
    instrumentationId: string;
    desirability?: DesirabilityEnum;
    instrumentationParameter: Parameter;
};
