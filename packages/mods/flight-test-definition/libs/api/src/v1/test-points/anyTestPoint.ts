import { v4 as uuidV4 } from "uuid";
import { anyTestPointAttempt } from "../test-point-attempt/anyTestPointAttempt";
import { anyTestPointParameterResponse } from "../test-point-parameters";
import type { TestPoint, TestPointGroup } from "./apiModels";

export const anyTestPoint = (overrides?: Partial<TestPoint>): TestPoint => ({
    id: uuidV4(),
    testPointParameters: [anyTestPointParameterResponse()],
    isApplicableForAgency: true,
    isApplicableForBuildUp: false,
    isApplicableForCertification: false,
    isApplicableForDevelopment: false,
    isApplicableForUnassigned: false,
    applicability: "AGENCY",
    attempts: [anyTestPointAttempt()],
    procedureId: uuidV4(),
    definitionId: uuidV4(),
    testPointId: "TD-VC2-01-001-A00",
    comments: "A comment",
    grossWeight: "23",
    centerOfGravity: "-1",
    status: "READY" as const,
    ...overrides,
});

export const anyTestPointGroup = (overwrites?: Partial<TestPointGroup>): TestPointGroup => ({
    id: uuidV4(),
    ata: 12,
    definitions: [
        {
            definitionId: uuidV4(),
            procedures: [
                {
                    procedureId: uuidV4(),
                    procedureTitle: "procedure",
                    testPoints: [anyTestPoint() as unknown as TestPoint],
                },
            ],
        },
    ],
    ...overwrites,
});
