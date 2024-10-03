import { TestPointParameterResponse } from "../test-point-parameters/apiModels";

export type TestPointSequence = {
    id: string;
    createTime: string;
    updateTime: string;
    flightTestOrderId: string;
    type: string;
    testPoint: string;
    successCriteria: string;
    additionalNotes?: string;
    testPointAssociations?: TestPointSequenceTestPointAssociation[];
};

export type TestPointSequenceInsert = Pick<
    TestPointSequence,
    "type" | "testPoint" | "successCriteria" | "additionalNotes"
>;

export type TestPointSequencePatch = Partial<TestPointSequenceInsert> & {
    id: string;
};

export type TestPointInfoInsert = {
    sequenceIndex?: number;
    procedureTitle?: string;
    testPointId?: string;
    isManual: boolean;
    testPointParameters?: ManualTestPointParameter[];
    notes?: string;
};

export type TestPointInfoPatch = TestPointInfoInsert & {
    id: string;
    sequenceIndex?: number;
};

export type ManualTestPointParameter = {
    id: string;
    name: string;
    value?: string;
};

export type TestPointSequenceTestPointAssociation = {
    id: string;
    sequenceIndex: number;
    procedureTitle: string;
    testPointId: string;
    notes?: string;
    isManual: boolean;
    testPointParameters: TestPointParameterResponse[] | ManualTestPointParameter[];
};
