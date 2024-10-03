import { ManualTestPointParameter } from "../../v1/test-point-sequences/apiModels";
import { TestPointParameterResponse } from "../test-point-parameters/apiModels";
import type { TestPointApplicability, TestPointStatus } from "../test-point/apiModels";

export type TestPointSequenceProcedure = {
    id: string;
    definitionId: string;
    procedureId: string;
    title: string;
    testPointIds: string[];
};

export type TestPointAssociation = {
    id: string;
    createTime: string;
    updateTime: string;
    sequenceIndex: number;
    isManual: boolean;
    definitionId?: string;
    procedureId?: string;
    procedureTitle?: string;
    testPointId?: string;
    applicability?: TestPointApplicability;
    status: TestPointStatus;
    grossWeight?: string;
    centerOfGravity?: string;
    notes?: string;
    comments?: string;
    testPointParameters: (TestPointParameterResponse | ManualTestPointParameter)[];
};

export type TestPointSequence = {
    id: string;
    createTime: string;
    updateTime: string;
    flightTestOrderId: string;
    type: string;
    testPoint: string;
    successCriteria: string;
    additionalNotes?: string;
    testPoints?: TestPointAssociation[];
    procedures?: TestPointSequenceProcedure[];
};
