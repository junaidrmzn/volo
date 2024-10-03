import { useGetPlanPrices } from "@voloiq/commercial-scheduling-api/v1";

export const usePrice = (planId: string) => {
    const { data: price, refetchData } = useGetPlanPrices(planId ?? "-1");

    const refetchPrice = () => {
        refetchData?.();
    };

    return { price, refetchPrice };
};
