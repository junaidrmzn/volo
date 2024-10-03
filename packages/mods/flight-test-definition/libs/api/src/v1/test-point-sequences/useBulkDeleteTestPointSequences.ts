import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteTestPointSequencesOptions = {
    flightTestOrderId: string;
};
export const useBulkDeleteTestPointSequences = (options: UseBulkDeleteTestPointSequencesOptions) => {
    const { flightTestOrderId } = options;

    const { sendRequest: bulkDeleteTestPointSequences } = useDeleteService<{}, string[]>({
        route: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence`,
    });

    return { bulkDeleteTestPointSequences };
};
