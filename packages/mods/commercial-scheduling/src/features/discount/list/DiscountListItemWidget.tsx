import { Card, HStack, Text } from "@volocopter/design-library-react";
import { Discount } from "@voloiq/commercial-scheduling-api/v1";
import { useDiscountTranslation } from "../translations/useDiscountTranslation";

export type DiscountListItemWidgetProps = {
    discount: Discount;
};

export const DiscountListItemWidget = (props: DiscountListItemWidgetProps) => {
    const {
        discount: { itemsCount, value, symbol },
    } = props;
    const { t } = useDiscountTranslation();

    return (
        <HStack alignSelf="stretch" alignItems="center" justifyContent="space-between">
            <Card variant="subtle" width="100%">
                <Text fontWeight="bold" fontSize="lg">
                    {itemsCount}
                </Text>
                <Text fontSize="sm">{t("overview.amountOfCodes")}</Text>
            </Card>
            <Card variant="subtle" width="100%">
                <Text fontSize="lg" fontWeight="bold">
                    {value}
                    {symbol ? 1 : "%"} {t("overview.off")}
                </Text>
                <Text fontSize="sm">{t("overview.amountOfDiscount")}</Text>
            </Card>
        </HStack>
    );
};
