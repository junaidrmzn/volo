import { useGetAllService } from "@voloiq/service";
import { PROMOTION_BASE_URL } from "../../serviceEndpoints";
import { Discount } from "./apiModels";

export const useGetDiscounts = () =>
    useGetAllService<Discount>({
        params: { page: 1, size: 10 },
        route: `${PROMOTION_BASE_URL}/discounts`,
    });
