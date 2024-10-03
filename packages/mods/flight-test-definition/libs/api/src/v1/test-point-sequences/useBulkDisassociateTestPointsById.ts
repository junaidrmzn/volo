import { useDeleteService } from "@voloiq/service";

export type UseBulkDisassociateTestPointsByIdOptions = {
    flightTestOrderId: string;
    testPointSequenceId: string;
};
export const useBulkDisassociateTestPointsById = (options: UseBulkDisassociateTestPointsByIdOptions) => {
    const { flightTestOrderId, testPointSequenceId } = options;

    const { sendRequest: bulkDisassociateTestPointsById, state } = useDeleteService<string[]>({
        route: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-points`,
    });

    return { bulkDisassociateTestPointsById, isLoading: state === "pending" };
};
