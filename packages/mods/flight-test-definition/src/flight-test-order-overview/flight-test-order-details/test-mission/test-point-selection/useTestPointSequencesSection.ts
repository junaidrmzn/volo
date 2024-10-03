import { useQueryClient } from "@tanstack/react-query";
import {
    getAllTestPointSequencesQueryKey,
    useBulkAddTestPointSequences,
    useBulkDeleteTestPointSequences,
    useBulkEditTestPointSequences,
    useGetAllTestPointSequencesQuery,
} from "@voloiq/flight-test-definition-api/v1";
import { OnBulkAdd, OnBulkDelete, OnBulkEdit } from "@voloiq/form";
import { TestPointSequencesFormSchema } from "./useTestPointSequencesFormSchema";

export type UseTestPointSequencesSectionOptions = {
    flightTestOrderId: string;
};

export const useTestPointSequencesSection = (options: UseTestPointSequencesSectionOptions) => {
    const { flightTestOrderId } = options;

    const queryClient = useQueryClient();
    const { testPointSequences = [] } = useGetAllTestPointSequencesQuery({ flightTestOrderId });
    const { bulkAddTestPointSequences } = useBulkAddTestPointSequences({ flightTestOrderId });
    const { bulkEditTestPointSequences } = useBulkEditTestPointSequences({ flightTestOrderId });
    const { bulkDeleteTestPointSequences } = useBulkDeleteTestPointSequences({ flightTestOrderId });

    const onBulkAddTestPointSequences: OnBulkAdd<TestPointSequencesFormSchema> = async (data) => {
        await bulkAddTestPointSequences({ data });
    };

    const onBulkEditTestPointSequences: OnBulkEdit<TestPointSequencesFormSchema> = async (data) => {
        await bulkEditTestPointSequences({ data });
    };

    const onBulkDeleteTestPointSequences: OnBulkDelete = async (data: string[]) => {
        await bulkDeleteTestPointSequences({ data });
    };

    const invalidateGetAllTestPointSequencesQuery = () => {
        queryClient.invalidateQueries(getAllTestPointSequencesQueryKey(flightTestOrderId));
    };

    return {
        testPointSequences,
        onBulkAddTestPointSequences,
        onBulkEditTestPointSequences,
        onBulkDeleteTestPointSequences,
        invalidateGetAllTestPointSequencesQuery,
    };
};
