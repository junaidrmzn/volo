import { Divider, Flex, HStack, Icon, IconButton, Stack, Text, VStack } from "@volocopter/design-library-react";
import { getDurationInMinutes } from "@voloiq/utils";
import { useGroundTimeCardTranslations } from "./translations/useGroundTimeCardTranslations";
import { useGroundTimeCardResize } from "./useGroundTimeCardResize";

export type GroundTimeCardProps = {
    vertiport: string;
    startTime: string;
    endTime: string;
    onClickAction: () => void;
};

export const GroundTimeCard = (props: GroundTimeCardProps) => {
    const { vertiport, startTime, endTime, onClickAction } = props;
    const { t } = useGroundTimeCardTranslations();
    const { isSCardVisible, isMCardVisible, outerStackRef } = useGroundTimeCardResize();

    return (
        <Stack height="100%">
            <HStack
                width="100%"
                bg="bgNavigationLayer1"
                borderRadius="sm"
                borderColor="bgNavigationLayer1"
                borderWidth="thin"
                minH={13.5}
                ref={outerStackRef}
            >
                <Flex width="100%" p={3} height="100%" gap={3}>
                    {isSCardVisible && (
                        <VStack spacing={0.5} width="100%" height="100%" alignItems="flex-start">
                            <Text fontSize="sm" lineHeight={6} fontWeight="bold">
                                {t("headerLabel")}
                            </Text>
                            <Divider />
                            <Text fontSize="xs" lineHeight={3} fontWeight="semibold" pt={1.5}>
                                {vertiport}
                            </Text>
                            <Text fontSize="xs" fontWeight="normal" lineHeight={6}>
                                {getDurationInMinutes(new Date(startTime), new Date(endTime))} {t("minutes")}
                            </Text>
                        </VStack>
                    )}
                    {isMCardVisible && (
                        <VStack justifyContent="end">
                            <IconButton aria-label={t("actionLabel")} variant="ghost" size="sm" onClick={onClickAction}>
                                <Icon icon="chevronRight" size={5} />
                            </IconButton>
                        </VStack>
                    )}
                </Flex>
            </HStack>
        </Stack>
    );
};
