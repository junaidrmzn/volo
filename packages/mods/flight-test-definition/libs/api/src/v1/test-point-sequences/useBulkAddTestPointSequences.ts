import { useCreateService } from "@voloiq/service";
import type { TestPointSequence, TestPointSequenceInsert } from "./apiModels";

export type UseBulkAddTestPointSequencesOptions = {
    flightTestOrderId: string;
};

export const useBulkAddTestPointSequences = (options: UseBulkAddTestPointSequencesOptions) => {
    const { flightTestOrderId } = options;

    const { sendRequest: bulkAddTestPointSequences } = useCreateService<TestPointSequenceInsert[], TestPointSequence[]>(
        {
            route: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence`,
        }
    );

    return { bulkAddTestPointSequences };
};
