import { anyTestPointAttempt } from "../test-point-attempt";
import { anyTestPointParameterResponse } from "../test-point-parameters";
import type { TestPoint, TestPointGroup } from "./apiModels";

export const anyTestPoint = (overrides?: Partial<TestPoint>): TestPoint => ({
    id: "e7ad28d3-20c6-4447-8f07-d4071f53a538",
    testPointParameters: [anyTestPointParameterResponse()],
    isApplicableForAgency: true,
    isApplicableForBuildUp: false,
    isApplicableForCertification: false,
    isApplicableForDevelopment: false,
    isApplicableForUnassigned: false,
    applicability: "AGENCY",
    attempts: [anyTestPointAttempt()],
    procedureId: "ad5b117b-94d7-43a0-bf42-9493a73bf6fa",
    definitionId: "845db7c6-fa54-429c-9cfb-ada8358ee1e7",
    testPointId: "TD-VC2-01-001-A00",
    comments: "A comment",
    grossWeight: "23",
    centerOfGravity: "-1",
    status: "READY" as const,
    ...overrides,
});

export const anyTestPointGroup = (overwrites?: Partial<TestPointGroup>): TestPointGroup => ({
    id: "e7ad28d3-20c6-4447-8f07-d4071f53a538",
    ata: 12,
    definitions: [
        {
            definitionId: "845db7c6-fa54-429c-9cfb-ada8358ee1e7",
            procedures: [
                {
                    procedureId: "ad5b117b-94d7-43a0-bf42-9493a73bf6fa",
                    procedureTitle: "procedure",
                    testPoints: [anyTestPoint()],
                },
            ],
        },
    ],
    ...overwrites,
});
