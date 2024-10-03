import { Box, HStack, Text } from "@volocopter/design-library-react";
import { useFormatDateTime } from "@voloiq/dates";
import { PadInfo } from "@voloiq/network-schedule-management-api/v1";
import { useGroundTimeCardTranslations } from "../translations/useGroundTimeCardTranslations";

export type FatoSectionProps = {
    padInfo?: PadInfo;
};

export const FatoSection = (props: FatoSectionProps) => {
    const { padInfo } = props;
    const { padKey, validFrom, validTo } = padInfo || {};
    const { t } = useGroundTimeCardTranslations();
    const { formatTime } = useFormatDateTime();

    return (
        <>
            <HStack width="100%" alignItems="stretch" justifyContent="space-between">
                <Text fontSize="xs" lineHeight={6} fontWeight="semibold">
                    {t("fatoLabel")}
                </Text>
                {padKey && (
                    <Text fontSize="xs" lineHeight={6}>
                        {padKey}
                    </Text>
                )}
            </HStack>
            <HStack width="100%" alignItems="stretch" justifyContent="flex-end">
                <Box width="60%" bg="data1Basic" height={1.5} borderRadius="sm" />
            </HStack>
            {validFrom && validTo && (
                <HStack width="100%" alignItems="stretch" justifyContent="flex-end">
                    <Text fontSize="xxs" fontWeight="semibold" lineHeight={3}>
                        {formatTime(validFrom)}-{formatTime(validTo)}
                    </Text>
                </HStack>
            )}
        </>
    );
};
