import { usePatchService } from "@voloiq/service";
import type { TestPointSequence, TestPointSequencePatch } from "./apiModels";

export type UseBulkEditTestPointSequencesOptions = {
    flightTestOrderId: string;
};
export const useBulkEditTestPointSequences = (options: UseBulkEditTestPointSequencesOptions) => {
    const { flightTestOrderId } = options;

    const { sendRequest: bulkEditTestPointSequences, state } = usePatchService<
        TestPointSequencePatch[],
        TestPointSequence[]
    >({
        route: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence`,
    });

    return { bulkEditTestPointSequences, isLoading: state === "pending" };
};
