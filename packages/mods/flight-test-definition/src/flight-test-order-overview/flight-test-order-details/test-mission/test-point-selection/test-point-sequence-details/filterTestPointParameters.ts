import {
    ManualTestPointParameter,
    TestPointParameterResponse,
    TestPointSequenceTestPointAssociation,
} from "@voloiq/flight-test-definition-api/v1";

export type TestPointParameterDescription = { id: string; name: string; unit?: string };

const isTestPointParameter = (
    testParameter: TestPointParameterResponse | ManualTestPointParameter
): testParameter is TestPointParameterResponse => {
    return "unit" in testParameter;
};

const isInArray = (haystack: TestPointParameterDescription[], needle: TestPointParameterDescription) =>
    haystack.some((item) => item.id === needle.id);

export const filterTestPointParameters = (testPointAssociations?: TestPointSequenceTestPointAssociation[]) => {
    if (!testPointAssociations) return [];

    const uniqueTestPointParameters: TestPointParameterDescription[] = [];

    for (const testPointAssociation of testPointAssociations) {
        for (const testPointParameter of testPointAssociation.testPointParameters) {
            if (!isInArray(uniqueTestPointParameters, testPointParameter)) {
                uniqueTestPointParameters.push({
                    id: testPointParameter.id,
                    name: testPointParameter.name,
                    unit: isTestPointParameter(testPointParameter) ? testPointParameter.unit : undefined,
                });
            }
        }
    }

    return uniqueTestPointParameters;
};
