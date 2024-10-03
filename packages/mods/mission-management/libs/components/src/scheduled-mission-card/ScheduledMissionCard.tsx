import { Box, Divider, Flex, HStack, Stack, VStack } from "@volocopter/design-library-react";
import { HomebaseSection } from "./HomebaseSection";
import { ScheduledMissionHeader } from "./ScheduledMissionHeader";

export type ShortInfoMission = {
    isInConflict?: boolean;
    flightNumber?: string;
    aircraftTypeName?: string;
    departureVertiportCode?: string;
    estimatedDepartureDateTime?: string;
    arrivalVertiportCode?: string;
    estimatedArrivalDateTime?: string;
};
export type ScheduledMissionCardProps = {
    mission: ShortInfoMission;
};

export const ScheduledMissionCard = (props: ScheduledMissionCardProps) => {
    const { mission } = props;
    const {
        isInConflict,
        flightNumber,
        aircraftTypeName,
        departureVertiportCode,
        estimatedArrivalDateTime,
        arrivalVertiportCode,
        estimatedDepartureDateTime,
    } = mission;

    return (
        <Stack height="100%" width="100%" justifyContent="center">
            <HStack
                bg="bgContentLayer"
                borderRadius="sm"
                borderColor={isInConflict ? "semanticErrorBasic" : "data1Basic"}
                borderWidth="thin"
            >
                <Box
                    bg={isInConflict ? "semanticErrorBasic" : "data1Basic"}
                    width="6px"
                    borderLeftRadius="sm"
                    height="full"
                />
                <Flex width="100%" p={2} height="100%" gap={3}>
                    <VStack spacing={0} width="100%" height="100%" gap={1.5}>
                        <ScheduledMissionHeader flightNumber={flightNumber} aircraftTypeName={aircraftTypeName} />
                        <Divider />
                        <HomebaseSection
                            departureVertiportCode={departureVertiportCode}
                            estimatedDepartureDateTime={estimatedDepartureDateTime}
                            arrivalVertiportCode={arrivalVertiportCode}
                            estimatedArrivalDateTime={estimatedArrivalDateTime}
                        />
                    </VStack>
                </Flex>
            </HStack>
        </Stack>
    );
};
