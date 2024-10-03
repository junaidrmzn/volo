import { Divider, Flex, VStack } from "@volocopter/design-library-react";
import { AircraftAssignment, ShortInfoMission } from "@voloiq/network-schedule-management-api/v1";
import { TodosSection } from "../scheduled-mission-card/TodosSection";
import { PopoverActions } from "./popover-components/PopoverActions";
import { PopoverHeader } from "./popover-components/PopoverHeader";
import { PopoverHomebase } from "./popover-components/PopoverHomebase";
import { PopoverModuleLayer } from "./popover-components/PopoverModuleLayer";

export type ScheduledMissionPopoverContentProps = {
    mission: ShortInfoMission;
    aircraftAssignment: AircraftAssignment;
};

export const ScheduledMissionPopoverContent = (props: ScheduledMissionPopoverContentProps) => {
    const { mission, aircraftAssignment } = props;

    return (
        <Flex
            width="100%"
            bg="bgContentLayer"
            borderRadius="sm"
            borderColor={mission.isInConflict ? "semanticErrorBasic" : "data1Basic"}
            borderWidth="thin"
            borderLeftWidth={6}
        >
            <Flex width="100%" height="100%" gap={3}>
                <VStack width="100%" height="100%" p={3} pl={6} pr={0} gap={1.5} spacing={0}>
                    <PopoverHeader mission={mission} aircraftAssignment={aircraftAssignment} />
                    <Divider mt={0} />
                    <PopoverHomebase mission={mission} />
                    <Divider mt={0} />
                    <PopoverModuleLayer mission={mission} />
                    <Divider mt={0} />
                    <TodosSection />
                </VStack>
                <PopoverActions mission={mission} />
            </Flex>
        </Flex>
    );
};
