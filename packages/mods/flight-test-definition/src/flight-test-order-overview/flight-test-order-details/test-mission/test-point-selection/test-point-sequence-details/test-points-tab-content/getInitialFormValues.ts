import { TestPointSequenceTestPointAssociation } from "@voloiq/flight-test-definition-api/v1";
import { InitialValues } from "@voloiq/form";
import { TestPointsTabContentFormSchema, testPointParameterFormFieldPrefix } from "./useTestPointTabContentFormSchema";

export type TestPointTabContentInitialValues = InitialValues<TestPointsTabContentFormSchema> & {
    id: string;
    readOnly: boolean;
    isManual: boolean;
};

export const getInitialFormValues = (testPointAssociations: TestPointSequenceTestPointAssociation[] = []) => {
    const initialValues = testPointAssociations.map((testPoint) => {
        const isReadOnlyParameterRow = !testPoint.isManual;

        const values: TestPointTabContentInitialValues = {
            id: testPoint.id,
            isManual: testPoint.isManual,
            readOnly: isReadOnlyParameterRow,
            sequenceIndex: testPoint.sequenceIndex,
            procedureTitle: testPoint.procedureTitle,
            testPointId: testPoint.testPointId,
            notes: testPoint.notes,
        };

        for (const testPointParameter of testPoint.testPointParameters) {
            values[`${testPointParameterFormFieldPrefix}${testPointParameter.id}-${testPointParameter.name}`] =
                testPointParameter.value;
        }

        return values;
    });

    return initialValues;
};
