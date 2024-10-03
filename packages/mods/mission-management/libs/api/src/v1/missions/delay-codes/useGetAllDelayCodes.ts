import { ServiceOptions, useGetAllService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import type { DelayCode } from "./apiModels";

type UseGetAllDelayCodesOptions = Partial<ServiceOptions>;

export const useGetAllDelayCodes = (options: UseGetAllDelayCodesOptions) => {
    return useGetAllService<DelayCode>({
        route: `${networkSchedulingManagementBaseUrl}/delay-codes`,
        ...options,
    });
};
