import {
    useBulkAddTestPointSequenceManualRows,
    useBulkDeleteTestPointSequenceTestPointAssociations,
    useBulkEditTestPointSequenceTestPointAssociations,
} from "@voloiq/flight-test-definition-api/v1";
import { OnBulkAdd, OnBulkDelete, OnBulkEdit } from "@voloiq/form";
import { useParams } from "@voloiq/routing";
import { sanitizeTestPointsInsertFormData, sanitizeTestPointsUpdateFormData } from "./sanitizeTestPointsFormData";
import { TestPointsTabContentFormSchema } from "./useTestPointTabContentFormSchema";

export type UseTestPointSequenceBulkOperationsOptions = {
    testPointSequenceId: string;
};

export const useTestPointSequenceBulkOperations = (options: UseTestPointSequenceBulkOperationsOptions) => {
    const { testPointSequenceId } = options;
    const { flightTestOrderId = "" } = useParams();

    const { bulkAddTestPointSequenceManualRows, isLoading: isLoadingAddManualRows } =
        useBulkAddTestPointSequenceManualRows({
            testPointSequenceId,
            flightTestOrderId,
        });
    const { bulkEditTestPointSequenceTestPointAssociations, isLoading: isLoadingEdit } =
        useBulkEditTestPointSequenceTestPointAssociations({
            testPointSequenceId,
            flightTestOrderId,
        });

    const { bulkDeleteTestPointSequenceTestPointAssociations, isLoading: isLoadingDelete } =
        useBulkDeleteTestPointSequenceTestPointAssociations({
            testPointSequenceId,
            flightTestOrderId,
        });

    const onBulkAddManualRows: OnBulkAdd<TestPointsTabContentFormSchema> = async (data) => {
        const convertedFormData = sanitizeTestPointsInsertFormData(data);
        await bulkAddTestPointSequenceManualRows({ data: convertedFormData });
    };

    const onBulkEditTestPointAssociations: OnBulkEdit<TestPointsTabContentFormSchema> = async (data) => {
        const convertedFormData = sanitizeTestPointsUpdateFormData(data);
        await bulkEditTestPointSequenceTestPointAssociations({ data: convertedFormData });
    };

    const onBulkDeleteTestPointAssociations: OnBulkDelete = async (data: string[]) => {
        await bulkDeleteTestPointSequenceTestPointAssociations({ data });
    };

    const isBulkFormLoading = isLoadingDelete || isLoadingEdit || isLoadingAddManualRows;

    return {
        onBulkEditTestPointAssociations,
        onBulkDeleteTestPointAssociations,
        onBulkAddManualRows,
        isBulkFormLoading,
    };
};
