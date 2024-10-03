import { Button, Flex, HStack, Icon, Tag, Text, VStack } from "@volocopter/design-library-react";
import { FlightTimeLimitation } from "./models";
import { useCrewSchedulerTranslations } from "./translations/useCrewSchedulerTranslations";

export type CrewSchedulerHeaderProps = {
    crewName: string;
    flightTimeLimitation: FlightTimeLimitation;
    onRedirectToResource: () => void;
};
export const CrewSchedulerHeader = (props: CrewSchedulerHeaderProps) => {
    const { crewName, flightTimeLimitation, onRedirectToResource } = props;
    const { t } = useCrewSchedulerTranslations();
    const checkFTLLimits =
        flightTimeLimitation &&
        flightTimeLimitation?.totalDutyTime < flightTimeLimitation?.maxDutyTime &&
        flightTimeLimitation?.totalFlightTime < flightTimeLimitation?.maxFlightTime;

    return (
        <Flex width="100%" mb={1} alignItems="center">
            <VStack spacing={0} alignItems="flex-start" minWidth="-webkit-fit-content">
                <HStack minWidth="-webkit-fill-available" spacing={0}>
                    <Text fontSize="sm" fontWeight="bold">
                        {crewName}
                    </Text>
                </HStack>
            </VStack>

            <VStack spacing={0} alignItems="stretch" width="100%" justifyContent="space-between">
                <HStack spacing={0} alignItems="stretch" justifyContent="space-between" ml={3}>
                    <Tag colorScheme={checkFTLLimits ? "gray" : "error-subtle"}>
                        <Tag.Label variant="light">{checkFTLLimits ? t("ftlChecked") : t("ftlExceeded")}</Tag.Label>
                    </Tag>

                    <VStack spacing={0} alignItems="stretch" justifyContent="space-between">
                        <HStack spacing={0} alignItems="stretch" justifyContent="space-between">
                            <Button
                                size="sm"
                                rightIcon={<Icon icon="internalLink" size={3} />}
                                onClick={onRedirectToResource}
                            >
                                {t("goToResource")}
                            </Button>
                        </HStack>
                    </VStack>
                </HStack>
            </VStack>
        </Flex>
    );
};
