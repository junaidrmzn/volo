import { useCreateService } from "@voloiq/service";

export type UseBulkAssociateTestPointsByIdOptions = {
    flightTestOrderId: string;
    testPointSequenceId: string;
};

export const useBulkAssociateTestPointsById = (options: UseBulkAssociateTestPointsByIdOptions) => {
    const { flightTestOrderId, testPointSequenceId } = options;

    const { sendRequest: bulkAssociateTestPointsById, state } = useCreateService<string[], {}>({
        route: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-points`,
    });

    return { bulkAssociateTestPointsById, isLoading: state === "pending" };
};
