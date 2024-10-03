import { Box, VStack } from "@volocopter/design-library-react";
import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { PriceContent } from "./PriceContent";
import { PriceHeader } from "./PriceHeader";
import { usePrice } from "./usePrice";

type PriceProps = {
    plan: Plan;
    refetchPlan: () => void;
};

export const Price = (props: PriceProps) => {
    const { plan, refetchPlan } = props;
    const { price, refetchPrice } = usePrice(plan.id);
    const isPlanPublished = plan.status === "PUBLISHED";

    return price ? (
        <VStack boxSize="full" spacing={9}>
            <PriceHeader price={price} refetchPrice={refetchPrice} refetchPlan={refetchPlan} />
            <Box boxSize="full">
                <PriceContent
                    price={price}
                    isPlanPublished={isPlanPublished}
                    refetchPrice={refetchPrice}
                    refetchPlan={refetchPlan}
                />
            </Box>
        </VStack>
    ) : null;
};
