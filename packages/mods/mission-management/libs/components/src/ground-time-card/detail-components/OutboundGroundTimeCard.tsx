import { Divider, Flex, HStack, Icon, IconButton, Text, VStack } from "@volocopter/design-library-react";
import { GroundEvent } from "@voloiq/network-schedule-management-api/v1";
import { useGroundTimeCardTranslations } from "../translations/useGroundTimeCardTranslations";
import { FatoSection } from "./FatoSection";
import { StandSection } from "./StandSection";

export type OutboundGroundTimeCardProps = {
    groundEvent: GroundEvent;
};

export const OutboundGroundTimeCard = (props: OutboundGroundTimeCardProps) => {
    const { groundEvent } = props;
    const { vertiportCode, outboundFato, outboundStand } = groundEvent;
    const { t } = useGroundTimeCardTranslations();

    return (
        <VStack width="100%" bg="semanticUnknownSubtle" borderRadius="sm">
            <Flex width="100%" p={3} height="100%" gap={3}>
                <VStack spacing={0} width="50%" justifyContent="flex-start" gap={1.5}>
                    <HStack width="100%" alignItems="stretch" justifyContent="space-between">
                        <Text fontSize="sm" lineHeight={6} fontWeight="semibold">
                            {vertiportCode}
                        </Text>
                        <IconButton aria-label={t("outboundLabel")} variant="ghost" size="sm">
                            <Icon icon="arrowDownRight" size={4} />
                        </IconButton>
                    </HStack>
                    <Divider />
                    <FatoSection padInfo={outboundFato} />
                </VStack>
                <Divider orientation="vertical" height="auto" />
                <VStack width="50%" />
            </Flex>
            <Divider />
            <StandSection padInfo={outboundStand} />
        </VStack>
    );
};
