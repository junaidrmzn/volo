import { Box, Divider, Flex, HStack, Stack, VStack } from "@volocopter/design-library-react";
import { AircraftAssignment, ShortInfoMission } from "@voloiq/network-schedule-management-api/v1";
import { HomebaseSection } from "./HomebaseSection";
import { ScheduledMissionActions } from "./ScheduledMissionActions";
import { ScheduledMissionHeader } from "./ScheduledMissionHeader";
import { TodosSection } from "./TodosSection";
import { useScheduledMissionCardResize } from "./useScheduledMissionCardResize";

type ScheduledMissionCardProps = {
    mission: ShortInfoMission;
    aircraftAssignment: AircraftAssignment;
    onOpenPopover: () => void;
};

export const ScheduledMissionCard = (props: ScheduledMissionCardProps) => {
    const { mission, aircraftAssignment, onOpenPopover } = props;
    const { isXSCardVisible, isSCardVisible, isMCardVisible, isLCardVisible, outerStackRef } =
        useScheduledMissionCardResize();

    return (
        <Stack height="100%">
            <HStack
                width="100%"
                bg="bgContentLayer"
                borderRadius="sm"
                borderColor={mission.isInConflict ? "semanticErrorBasic" : "data1Basic"}
                borderWidth="thin"
                ref={outerStackRef}
            >
                <Box
                    bg={mission.isInConflict ? "semanticErrorBasic" : "data1Basic"}
                    width="6px"
                    borderLeftRadius="sm"
                    height="100%"
                />

                <Flex width="100%" p={3} height="100%" gap={3}>
                    <VStack
                        onClick={(event) => {
                            onOpenPopover();
                            event.stopPropagation();
                        }}
                        spacing={0}
                        width="100%"
                        height="100%"
                        gap={1.5}
                    >
                        <ScheduledMissionHeader
                            mission={mission}
                            aircraftAssignment={aircraftAssignment}
                            isXSCardVisible={isXSCardVisible}
                            isSCardVisible={isSCardVisible}
                        />
                        {isLCardVisible && (
                            <>
                                <Divider />
                                <HomebaseSection mission={mission} />
                            </>
                        )}
                        {isMCardVisible && (
                            <>
                                <Divider />
                                <TodosSection />
                            </>
                        )}
                    </VStack>
                    {isMCardVisible && <ScheduledMissionActions mission={mission} />}
                </Flex>
            </HStack>
        </Stack>
    );
};
