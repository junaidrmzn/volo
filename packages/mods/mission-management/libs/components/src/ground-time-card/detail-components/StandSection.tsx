import { Box, HStack, Text, VStack } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { PadInfo } from "@voloiq/network-schedule-management-api/v1";
import { useGroundTimeCardTranslations } from "../translations/useGroundTimeCardTranslations";

export type StandSectionProps = {
    padInfo?: PadInfo;
};

export const StandSection = (props: StandSectionProps) => {
    const { padInfo } = props;
    const { padKey, validFrom, validTo } = padInfo || {};
    const { t } = useGroundTimeCardTranslations();
    const { formatTime } = useFormatDateTime();

    return (
        <VStack spacing={0} width="100%" height="100%" justifyContent="flex-start" py={3} gap={1.5}>
            <HStack width="100%" alignItems="stretch" justifyContent="space-between" px={3}>
                <Text fontSize="xs" lineHeight={6} fontWeight="semibold">
                    {t("standLabel")}
                </Text>
                {padKey && (
                    <Text fontSize="xs" lineHeight={6}>
                        {padKey}
                    </Text>
                )}
            </HStack>
            <HStack width="100%" alignItems="stretch" justifyContent="flex-end" pl={3}>
                <Box width="100%" bg="data1Emphasized" height={1.5} borderLeftRadius="sm" />
            </HStack>
            {validFrom && validTo && (
                <HStack width="100%" alignItems="stretch" justifyContent="flex-end" px={3}>
                    <Text fontSize="xxs" fontWeight="semibold" lineHeight={3}>
                        {formatTime(validFrom)}-{formatTime(validTo)}
                    </Text>
                </HStack>
            )}
        </VStack>
    );
};
