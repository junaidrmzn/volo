import { Box, Popover, Portal, useDisclosure } from "@volocopter/design-library-react";
import { AircraftAssignment, ShortInfoMission } from "@voloiq/network-schedule-management-api/v1";
import { ScheduledMissionCard } from "../scheduled-mission-card/ScheduledMissionCard";
import { ScheduledMissionPopoverContent } from "./ScheduledMissionPopoverContent";

export type ScheduledMissionPopoverProps = {
    mission: ShortInfoMission;
    aircraftAssignment: AircraftAssignment;
};

export const ScheduledMissionPopover = (props: ScheduledMissionPopoverProps) => {
    const { mission, aircraftAssignment } = props;
    const { isOpen: isPopoverOpen, onClose: onClosePopover, onOpen: onOpenPopover } = useDisclosure();

    return (
        <Box
            onClick={(event) => {
                event.stopPropagation();
            }}
            height="100%"
        >
            <Popover variant="notPadded" isOpen={isPopoverOpen} onClose={onClosePopover} placement="auto">
                <Popover.Trigger>
                    <Box height="100%">
                        <ScheduledMissionCard
                            onOpenPopover={onOpenPopover}
                            mission={mission}
                            aircraftAssignment={aircraftAssignment}
                        />
                    </Box>
                </Popover.Trigger>
                <Popover.Overlay />
                <Portal>
                    <Popover.Content minWidth={80}>
                        <ScheduledMissionPopoverContent mission={mission} aircraftAssignment={aircraftAssignment} />
                    </Popover.Content>
                </Portal>
            </Popover>
        </Box>
    );
};
