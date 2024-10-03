import { anyTipTapJson } from "../../common";
import { TestPointAssociation, TestPointSequence, TestPointSequenceProcedure } from "./apiModels";

const someDate = new Date("2024-04-01T00:00:00Z");
const flightTestOrderId = "79638dbe-9833-436c-949f-4cfea0a1666a";
const testPointsSequenceId = "d0adad9c-26e5-405b-88f9-498fa6b26937";
const testPointAssociationId = "d0adad9c-26e5-405b-88f9-498fa6b26937";
const procedureId = "62ae9995-f626-434f-8274-5b543ef7c033";
const definitionId = "e08e8c85-c5b3-4a01-a6ee-b6f7a228b549";

export const anyTestPointSequenceProcedure = (
    overwrites: Partial<TestPointSequenceProcedure> = {}
): TestPointSequenceProcedure => ({
    id: procedureId,
    definitionId,
    procedureId: "FTD-V21-01-302-A00-01",
    title: "Test Procedure",
    testPointIds: ["Test Point"],
    ...overwrites,
});

export const anyTestPointAssociation = (overwrites: Partial<TestPointAssociation> = {}): TestPointAssociation => ({
    id: testPointAssociationId,
    sequenceIndex: 1,
    procedureTitle: "Vertical Take-Off",
    testPointId: "Test Point",
    isManual: false,
    testPointParameters: [],
    applicability: "AGENCY",
    createTime: someDate.toISOString(),
    updateTime: someDate.toISOString(),
    status: "IN WORK",
    definitionId,
    procedureId: "FTD-V21-01-302-A00-01",
    ...overwrites,
});

export const anyTestPointSequence = (overwrites: Partial<TestPointSequence> = {}): TestPointSequence => ({
    id: testPointsSequenceId,
    createTime: someDate.toISOString(),
    updateTime: someDate.toISOString(),
    flightTestOrderId,
    type: "Aerocover Installation Validation",
    testPoint: JSON.stringify(anyTipTapJson("Test Success Criteria")),
    successCriteria: JSON.stringify(anyTipTapJson("Test Success Criteria")),
    procedures: [],
    testPoints: [],
    ...overwrites,
});
