import { useGetPlanOffers } from "@voloiq/commercial-scheduling-api/v1";

export const useOffer = (planId: string) => {
    const { data: offer, refetchData } = useGetPlanOffers(planId ?? "-1");

    const refetchOffer = () => {
        refetchData?.();
    };

    return { offer, refetchOffer };
};
