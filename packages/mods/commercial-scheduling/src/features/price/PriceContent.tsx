import { Box, Card, Divider, HStack, Icon, Text, VStack } from "@volocopter/design-library-react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Price } from "@voloiq/commercial-scheduling-api/v1";
import { DateTimeDisplayWithLabel } from "@voloiq/commercial-scheduling-components";
import { CreatePrice } from "./create/CreatePrice";
import { EditPrice } from "./edit/EditPrice";
import { usePriceTranslation } from "./translations/usePriceTranslation";

type PriceContentProps = {
    price: Price;
    isPlanPublished: boolean;
    refetchPrice: () => void;
    refetchPlan: () => void;
};

export const PriceContent = (props: PriceContentProps) => {
    const { price, isPlanPublished, refetchPrice, refetchPlan } = props;
    const { t } = usePriceTranslation();
    const canEdit = useIsAuthorizedTo(["update"], ["CommercialPricing"]);
    const canCreate = useIsAuthorizedTo(["create"], ["CommercialPricing"]);
    const hasPriceItems = price?.commercialPriceItems?.length > 0;

    return (
        <Card>
            <HStack alignItems="baseline" width="100%">
                <VStack alignItems="flex-start" spacing={3} flex={1}>
                    <Text fontWeight="bold">{t("subheading")}</Text>
                    {hasPriceItems ? (
                        <DateTimeDisplayWithLabel
                            label={t("labels.validFrom")}
                            value={price.commercialPriceItems[0].validFrom}
                        />
                    ) : null}
                </VStack>
                {hasPriceItems && canEdit ? (
                    <EditPrice
                        price={price}
                        isPlanPublished={isPlanPublished}
                        refetchPrice={refetchPrice}
                        refetchPlan={refetchPlan}
                    />
                ) : (
                    canCreate && (
                        <CreatePrice refetchPrice={refetchPrice} refetchPlan={refetchPlan} priceId={price.id} />
                    )
                )}
            </HStack>
            <Divider mt={5} mb={5} />
            {hasPriceItems ? (
                <VStack alignItems="flex-start" width="100%">
                    <Text>{t("allRoutes")}</Text>
                    <Box boxSize="full">
                        <Card variant="subtle">
                            <VStack alignItems="flex-start">
                                <Text fontWeight="bold">
                                    {price.commercialPriceItems[0].currency} {price.commercialPriceItems[0].price}
                                </Text>
                                <Text>{t("priceForAllDays")}</Text>
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
