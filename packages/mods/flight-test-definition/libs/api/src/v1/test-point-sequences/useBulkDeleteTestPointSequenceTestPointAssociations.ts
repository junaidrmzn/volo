import { useDeleteService } from "@voloiq/service";

export type UseBulkDeleteTestPointSequenceTestPointAssociationsOptions = {
    flightTestOrderId: string;
    testPointSequenceId: string;
};
export const useBulkDeleteTestPointSequenceTestPointAssociations = (
    options: UseBulkDeleteTestPointSequenceTestPointAssociationsOptions
) => {
    const { flightTestOrderId, testPointSequenceId } = options;

    const { sendRequest: bulkDeleteTestPointSequenceTestPointAssociations, state } = useDeleteService<string[]>({
        route: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-point-associations`,
    });

    return { bulkDeleteTestPointSequenceTestPointAssociations, isLoading: state === "pending" };
};
