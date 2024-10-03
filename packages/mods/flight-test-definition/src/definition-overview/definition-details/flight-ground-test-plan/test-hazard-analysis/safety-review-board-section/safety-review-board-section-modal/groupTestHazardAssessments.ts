import type { TestHazardAssessment } from "@voloiq/flight-test-definition-api/v1";
import { getTypedKeys } from "@voloiq/utils";

type TestHazardAssessmentGroupsHash = {
    [key in TestHazardAssessment["hazardGroup"]]: TestHazardAssessment[];
};

export type TestHazardAssessmentGroup = {
    id: TestHazardAssessment["hazardGroup"];
    testHazardAssessments: TestHazardAssessment[];
};

export const groupTestHazardAssessments = (
    testHazardAssessments: TestHazardAssessment[]
): TestHazardAssessmentGroup[] => {
    const groupsHash: TestHazardAssessmentGroupsHash = {
        GENERIC_HAZARDS: [],
        TEST_POINT_SPECIFIC_HAZARDS: [],
    };

    for (const testHazardAssessment of testHazardAssessments) {
        groupsHash[testHazardAssessment.hazardGroup]?.push(testHazardAssessment);
    }

    const groups = getTypedKeys(groupsHash).map((key) => ({
        id: key,
        testHazardAssessments: groupsHash[key],
    }));

    return groups;
};
