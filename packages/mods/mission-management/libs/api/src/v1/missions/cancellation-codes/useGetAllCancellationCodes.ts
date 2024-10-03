import { useGetAllService } from "@voloiq/service";
import { networkSchedulingManagementBaseUrl } from "../../networkSchedulingManagementBaseUrl";
import type { CancellationCode } from "./apiModels";

export const useGetAllCancellationCodes = () => {
    return useGetAllService<CancellationCode>({
        route: `${networkSchedulingManagementBaseUrl}/cancellation-codes`,
    });
};
