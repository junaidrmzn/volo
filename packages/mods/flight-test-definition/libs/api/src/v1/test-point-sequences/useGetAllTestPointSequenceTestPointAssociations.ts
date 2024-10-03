import { ServiceOptions, useGetAllService } from "@voloiq/service";
import type { TestPointSequenceTestPointAssociation } from "./apiModels";

export type UseGetAllTestPointSequenceTestPointAssociationsOptions = {
    flightTestOrderId: string;
    testPointSequenceId: string;
    serviceOptions?: Partial<ServiceOptions>;
};

export const useGetAllTestPointSequenceTestPointAssociations = (
    options: UseGetAllTestPointSequenceTestPointAssociationsOptions
) => {
    const { flightTestOrderId, testPointSequenceId, serviceOptions } = options;

    const { sendRequest: getAllTestPointSequenceTestPointAssociations } =
        useGetAllService<TestPointSequenceTestPointAssociation>({
            route: `ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-point-associations`,
            options: { manual: true },
            params: {
                orderBy: "createTime:asc",
            },
            ...serviceOptions,
        });

    return { getAllTestPointSequenceTestPointAssociations };
};
