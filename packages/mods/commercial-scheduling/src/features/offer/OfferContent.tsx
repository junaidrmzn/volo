import { Box, Card, Divider, HStack, Icon, Text, VStack } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Offer } from "@voloiq/commercial-scheduling-api/v1";
import { DateTimeDisplayWithLabel } from "@voloiq/commercial-scheduling-components";
import { CreateOffer } from "./create/CreateOffer";
import { EditOffer } from "./edit/EditOffer";
import { useOfferTranslation } from "./translations/useOfferTranslation";

type OfferContentProps = {
    offer: Offer;
    isPlanPublished: boolean;
    refetchOffer: () => void;
    refetchPlan: () => void;
};

export const OfferContent = (props: OfferContentProps) => {
    const { offer, isPlanPublished, refetchOffer, refetchPlan } = props;
    const { t } = useOfferTranslation();
    const canEdit = useIsAuthorizedTo(["update"], ["CommercialOffering"]);
    const canCreate = useIsAuthorizedTo(["create"], ["CommercialOffering"]);

    const hasOfferItems = offer?.commercialOfferItems?.length > 0;

    return (
        <Card>
            <HStack alignItems="baseline" width="100%">
                <VStack alignItems="flex-start" spacing={3} flex={1}>
                    <Text fontWeight="bold">{t("subheading")}</Text>
                    {hasOfferItems ? (
                        <DateTimeDisplayWithLabel
                            label={t("labels.validFrom")}
                            value={offer.commercialOfferItems[0]?.validFrom || new Date()}
                        />
                    ) : null}
                </VStack>
                {hasOfferItems && canEdit ? (
                    <EditOffer
                        refetchOffer={refetchOffer}
                        refetchPlan={refetchPlan}
                        isPlanPublished={isPlanPublished}
                        offer={offer}
                    />
                ) : (
                    canCreate && <CreateOffer refetchOffer={refetchOffer} refetchPlan={refetchPlan} offer={offer} />
                )}
            </HStack>
            <Divider mt={5} mb={5} />
            {hasOfferItems ? (
                <VStack alignItems="flex-start" width="100%">
                    <Box boxSize="full">
                        <Card variant="subtle">
                            <VStack alignItems="flex-start">
                                <HStack>
                                    <Text fontWeight="bold">{offer.commercialOfferItems?.[0]?.offerRunwayValue}</Text>
                                    <Text fontWeight="bold">
                                        {t(`units.${offer.commercialOfferItems?.[0]?.offerRunwayUnit ?? "DAYS"}`)}
                                    </Text>
                                </HStack>
                                <Text>{t("offeringLeadTime")}</Text>
                            </VStack>
                        </Card>
                    </Box>
                </VStack>
            ) : (
                <Icon aria-label="minus" icon="minus" size={3} />
            )}
        </Card>
    );
};
