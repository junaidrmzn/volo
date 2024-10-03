import { Box, VStack } from "@volocopter/design-library-react";
import { Plan } from "@voloiq/commercial-scheduling-api/v1";
import { OfferContent } from "./OfferContent";
import { OfferHeader } from "./OfferHeader";
import { useOffer } from "./useOffer";

type OfferProps = {
    plan: Plan;
    refetchPlan: () => void;
};

export const Offer = (props: OfferProps) => {
    const {
        plan: { id, status },
        refetchPlan,
    } = props;
    const isPlanPublished = status === "PUBLISHED";
    const { offer, refetchOffer } = useOffer(id);

    return offer ? (
        <VStack boxSize="full" spacing={9}>
            <OfferHeader offer={offer} refetchOffer={refetchOffer} refetchPlan={refetchPlan} />
            <Box boxSize="full">
                <OfferContent
                    isPlanPublished={isPlanPublished}
                    refetchOffer={refetchOffer}
                    refetchPlan={refetchPlan}
                    offer={offer}
                />
            </Box>
        </VStack>
    ) : null;
};
