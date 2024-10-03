import { useGetAllService } from "@voloiq/service";
import { aircraftManagementBaseUrl } from "../aircraftManagementBaseUrl";
import { ProductLine } from "../common";

type UseGetProductLinesOptions = {
    manual: boolean;
};

export const useGetProductLines = (options: UseGetProductLinesOptions) => {
    return useGetAllService<ProductLine>({
        route: `${aircraftManagementBaseUrl}/product-lines`,
        options,
    });
};
