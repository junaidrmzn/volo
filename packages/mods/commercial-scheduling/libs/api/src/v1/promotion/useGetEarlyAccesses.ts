import { useGetAllService } from "@voloiq/service";
import { PROMOTION_BASE_URL } from "../../serviceEndpoints";
import { EarlyAccess } from "./apiModels";

export const useGetEarlyAccesses = () =>
    useGetAllService<EarlyAccess>({
        params: { page: 1, size: 10 },
        route: `${PROMOTION_BASE_URL}/early-accesses`,
    });
