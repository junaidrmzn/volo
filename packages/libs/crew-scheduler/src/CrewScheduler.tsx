import { Box, Card, Divider, Flex, Text, VStack } from "@volocopter/design-library-react";
import { CrewSchedulerHeader } from "./CrewSchedulerHeader";
import { RestTimeBar } from "./RestTimeBar";
import { CrewSchedulerTable } from "./crew-scheduler-table/CrewSchedulerTable";
import { FlightTimeLimitation } from "./models";

export type CrewSchedulerProps = {
    headerLabel: string;
    crewName: string;
    flightTimeLimitation: FlightTimeLimitation;
    onRedirectToResource: () => void;
};
export const CrewScheduler = (props: CrewSchedulerProps) => {
    const { headerLabel, flightTimeLimitation } = props;

    return (
        <Box width="100%" backgroundColor="bgNavigationLayer1" borderRadius="md">
            <VStack spacing={1.5} alignItems="flex-start" p={3}>
                <Flex width="100%" mb={1}>
                    <VStack spacing={0} alignItems="flex-start" width="100%">
                        <Text fontWeight="light">{headerLabel}</Text>
                    </VStack>
                </Flex>
                <VStack width="100%" alignItems="flex-start">
                    <Card width="100%" p={3}>
                        <VStack alignItems="flex-start">
                            <CrewSchedulerHeader {...props} />
                            <Divider />
                            <VStack width="100%" alignItems="stretch" gap={3}>
                                <RestTimeBar restTime={flightTimeLimitation.restBefore} type="before" />
                                <CrewSchedulerTable missions={flightTimeLimitation.missions} />
                                <RestTimeBar restTime={flightTimeLimitation.restAfter} type="after" />
                            </VStack>
                        </VStack>
                    </Card>
                </VStack>
            </VStack>
        </Box>
    );
};
