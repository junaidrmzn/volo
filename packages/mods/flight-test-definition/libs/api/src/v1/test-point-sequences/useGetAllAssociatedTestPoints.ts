import { ServiceOptions, useGetAllService } from "@voloiq/service";
import { TestPoint } from "../test-points/apiModels";

export type UseGetAllAssociatedTestPointsOptions = {
    flightTestOrderId: string;
    testPointSequenceId: string;
    serviceOptions?: Partial<ServiceOptions>;
};

export const useGetAllAssociatedTestPoints = (options: UseGetAllAssociatedTestPointsOptions) => {
    const { flightTestOrderId, testPointSequenceId } = options;

    const { sendRequest: getAllAssociatedTestPoints } = useGetAllService<TestPoint>({
        route: `/ftd/v1/orders/${flightTestOrderId}/test-point-sequence/${testPointSequenceId}/test-points`,
    });

    return { getAllAssociatedTestPoints };
};
