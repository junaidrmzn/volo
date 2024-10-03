import { Card, HStack, Icon, Text } from "@volocopter/design-library-react";
import { EarlyAccess } from "@voloiq/commercial-scheduling-api/v1";
import { useEarlyAccessTranslation } from "../translations/useEarlyAccessTranslation";

export type EarlyAccessListItemWidgetProps = {
    earlyAccess: EarlyAccess;
};

export const EarlyAccessListItemWidget = (props: EarlyAccessListItemWidgetProps) => {
    const {
        earlyAccess: { itemsCount, value, accessType },
    } = props;
    const { t } = useEarlyAccessTranslation();

    return (
        <HStack alignSelf="stretch" alignItems="center" justifyContent="space-between">
            <Card variant="subtle" width="100%">
                <Text fontWeight="bold" fontSize="lg">
                    {itemsCount}
                </Text>
                <Text fontSize="sm">{t("overview.amountOfCodes")}</Text>
            </Card>
            <Card variant="subtle" width="100%">
                <HStack alignItems="center">
                    <Icon icon="plus" size={4} />
                    <Text fontWeight="bold" fontSize="lg" alignItems="flex-start">
                        {value} {t(`overview.accessType.${accessType}`)}
                    </Text>
                </HStack>
                <Text fontSize="sm">{t("overview.offerRunwayExtension")}</Text>
            </Card>
        </HStack>
    );
};
