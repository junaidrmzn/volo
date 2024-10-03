import { useGetAllService } from "@voloiq/service";
import { aircraftManagementBaseUrl } from "../aircraftManagementBaseUrl";
import { WorkOrder } from "./apiModels";

type UseGetWorkOrdersOptions = {
    manual: boolean;
    aircraftId: string;
};

export const useGetWorkOrders = (options: UseGetWorkOrdersOptions) => {
    const { aircraftId, manual } = options;
    return useGetAllService<WorkOrder>({
        route: `${aircraftManagementBaseUrl}/aircraft/${aircraftId}/work-orders`,
        options: { manual },
    });
};
