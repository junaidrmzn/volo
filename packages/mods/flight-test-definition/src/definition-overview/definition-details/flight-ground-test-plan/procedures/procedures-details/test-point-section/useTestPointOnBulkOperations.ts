import type { TestPointInsert } from "@voloiq/flight-test-definition-api/v1";
import {
    useBulkAddTestPoints,
    useBulkDeleteTestPoints,
    useBulkEditTestPoints,
} from "@voloiq/flight-test-definition-api/v1";
import type { OnBulkAdd, OnBulkDelete, OnBulkEdit } from "@voloiq/form";
import { useProcedureEditSessionId } from "../procedure-edit-session-id-context/useProcedureEditSessionId";
import type { TestPointsFormSchema } from "./useTestPointFormSchema";
import { testPointParameterFormFieldPrefix } from "./useTestPointFormSchema";

type FormDataArray = Parameters<OnBulkAdd<TestPointsFormSchema>>[0];
const mapFormDataToDto = (formDataArray: FormDataArray) =>
    formDataArray.map((formData) => {
        const testPointParameterData = Object.entries(formData)
            .filter(([formFieldName]) => formFieldName.startsWith(testPointParameterFormFieldPrefix))
            .map(([formFieldName, formValue]) => ({
                id: formFieldName.replace(testPointParameterFormFieldPrefix, ""),
                value: formValue as string,
            }));
        const data: TestPointInsert = {
            testPointParameters: testPointParameterData,
            comments: formData.comments,
            grossWeight: formData.grossWeight,
            centerOfGravity: formData.centerOfGravity,
            isApplicableForAgency: !!formData.isApplicableForAgency,
            isApplicableForBuildUp: !!formData.isApplicableForBuildUp,
            isApplicableForCertification: !!formData.isApplicableForCertification,
            isApplicableForDevelopment: !!formData.isApplicableForDevelopment,
            isApplicableForUnassigned: !!formData.isApplicableForUnassigned,
            sequenceIndex: formData.sequenceIndex,
        };
        return data;
    });

export type UseTestPointsOnBulkOperationsOptions = {
    definitionId: string;
    procedureId: string;
};

export const useTestPointOnBulkOperations = (options: UseTestPointsOnBulkOperationsOptions) => {
    const { definitionId, procedureId } = options;
    const { bulkDeleteTestPoints } = useBulkDeleteTestPoints({ definitionId, procedureId });
    const { bulkEditTestPoints } = useBulkEditTestPoints({ definitionId, procedureId });
    const { bulkAddTestPoints } = useBulkAddTestPoints({ definitionId, procedureId });
    const { procedureEditSessionId: editSessionId } = useProcedureEditSessionId();

    const onBulkDeleteTestPoints: OnBulkDelete = async (data) => {
        await bulkDeleteTestPoints({ data, params: { editSessionId } });
    };
    const onBulkAddTestPoints: OnBulkAdd<TestPointsFormSchema> = async (formDataArray) => {
        await bulkAddTestPoints({ data: mapFormDataToDto(formDataArray), params: { editSessionId } });
    };
    const onBulkEditTestPoints: OnBulkEdit<TestPointsFormSchema> = async (formDataArray) => {
        const data = mapFormDataToDto(formDataArray).map((dto, index) => ({ ...dto, id: formDataArray[index]!.id }));
        await bulkEditTestPoints({ data, params: { editSessionId } });
    };

    return { onBulkAddTestPoints, onBulkDeleteTestPoints, onBulkEditTestPoints };
};
