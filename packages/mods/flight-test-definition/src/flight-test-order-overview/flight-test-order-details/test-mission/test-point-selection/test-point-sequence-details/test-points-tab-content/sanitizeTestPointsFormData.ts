import {
    ManualTestPointParameter,
    TestPointInfoInsert,
    TestPointInfoPatch,
    TestPointParameterResponse,
} from "@voloiq/flight-test-definition-api/v1";
import { uuidRegex } from "@voloiq/flight-test-definition-utils";
import { FormValues } from "@voloiq/form";
import { TestPointsTabContentFormSchema, testPointParameterFormFieldPrefix } from "./useTestPointTabContentFormSchema";

export type TestPointInsertFields = FormValues<TestPointsTabContentFormSchema>;
export type TestPointUpdateFields = FormValues<TestPointsTabContentFormSchema> & { id: string };

export const extractParameterFormFields = (
    testPointFormFields: TestPointUpdateFields | TestPointInsertFields
): (TestPointParameterResponse | ManualTestPointParameter)[] => {
    const searchTerm = testPointParameterFormFieldPrefix;
    const parameters: (TestPointParameterResponse | ManualTestPointParameter)[] = [];

    for (const field in testPointFormFields) {
        if (!field.startsWith(searchTerm)) continue;
        const id = field.match(uuidRegex)?.join("");
        const idLength = id ? id.length : 0;

        const name = field.slice(searchTerm.length + idLength + "-".length);
        const value = testPointFormFields[`${searchTerm}${id}-${name}`];

        if (field in testPointFormFields && value && id) {
            parameters.push({
                id,
                name,
                value,
            });
        }
    }

    return parameters;
};

const getInsertData = (testPointFormFields: TestPointInsertFields): TestPointInfoInsert => {
    // need to explicitly extract the attributes to remove all helper fields from the bulkForm
    const { notes, procedureTitle, sequenceIndex, testPointId, isManual } = testPointFormFields;
    return {
        notes,
        isManual,
        procedureTitle,
        sequenceIndex,
        testPointId,
    };
};

const getUpdateData = (testPointFormFields: TestPointUpdateFields): TestPointInfoPatch => {
    // need to explicitly extract the attributes to remove all helper fields from the bulkForm
    const { notes, procedureTitle, sequenceIndex, testPointId, id, isManual } = testPointFormFields;
    return {
        id,
        notes,
        isManual,
        procedureTitle,
        sequenceIndex,
        testPointId,
    };
};

export const sanitizeTestPointsInsertFormData = (data: TestPointInsertFields[]): TestPointInfoInsert[] => {
    const sanitizedFormData: TestPointInfoInsert[] = [];

    for (const testPointFormFields of data) {
        sanitizedFormData.push({
            ...getInsertData(testPointFormFields),
            testPointParameters: extractParameterFormFields(testPointFormFields),
        });
    }

    return sanitizedFormData;
};

export const sanitizeTestPointsUpdateFormData = (data: TestPointUpdateFields[]): TestPointInfoPatch[] => {
    const sanitizedFormData: TestPointInfoPatch[] = [];

    for (const testPointFormFields of data) {
        sanitizedFormData.push({
            ...getUpdateData(testPointFormFields),
            testPointParameters: extractParameterFormFields(testPointFormFields),
        });
    }

    return sanitizedFormData;
};
