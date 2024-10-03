import { Card, Divider, HStack, Icon, IconButton, Text, VStack } from "@volocopter/design-library-react";
import { EarlyAccess } from "@voloiq/commercial-scheduling-api/v1";
import { DateTimeRangeDisplay, PromotionStatusTag } from "@voloiq/commercial-scheduling-components";
import { usePromotionCardStatus } from "@voloiq/commercial-scheduling-utils";
import { useNavigate } from "@voloiq/routing";
import { useEarlyAccessTranslation } from "../translations/useEarlyAccessTranslation";
import { EarlyAccessListItemWidget } from "./EarlyAccessItemWidget";

export type EarlyAccessListItemProps = {
    earlyAccess: EarlyAccess;
};

export const EarlyAccessListItem = (props: EarlyAccessListItemProps) => {
    const { earlyAccess } = props;
    const { name, validFrom, validTo, regionName, status, id } = earlyAccess;
    const { t } = useEarlyAccessTranslation();
    const navigate = useNavigate();
    const { variant } = usePromotionCardStatus({ status });

    const navigateToDetails = () => {
        navigate(id);
    };

    return (
        <Card ariaLabel={name} status={variant} onClick={() => {}}>
            <HStack alignItems="flex-start" boxSize="full" width="100%">
                <VStack alignItems="flex-start" flex={1}>
                    <HStack alignSelf="stretch" alignItems="center" justifyContent="space-between">
                        <HStack alignItems="center">
                            <Text fontWeight="bold">{name}</Text>
                            <Text>{regionName}</Text>
                        </HStack>
                        <PromotionStatusTag status={status} />
                    </HStack>
                    <HStack alignSelf="stretch" alignItems="center" justifyContent="space-between">
                        <DateTimeRangeDisplay label={t("overview.validFrom")} startDate={validFrom} endDate={validTo} />
                    </HStack>
                    <Divider />
                    <EarlyAccessListItemWidget earlyAccess={earlyAccess} />
                </VStack>
                <VStack alignSelf="stretch" alignItems="flex-end" justifyContent="space-between">
                    <IconButton aria-label="actions" variant="ghost" size="md" icon={<Icon icon="ellipsis" />} />
                    <IconButton
                        aria-label="detail"
                        variant="ghost"
                        size="md"
                        onClick={navigateToDetails}
                        icon={<Icon icon="chevronRight" />}
                    />
                </VStack>
            </HStack>
        </Card>
    );
};
