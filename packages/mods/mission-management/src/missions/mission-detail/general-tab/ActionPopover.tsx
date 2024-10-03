import { useDisclosure } from "@volocopter/design-library-react";
import { StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { AssignmentsPopover } from "../general-assignments-section/AssignmentsPopover";
import { AssignmentsPopoverProvider } from "../general-assignments-section/assignments-popover-context/AssignmentsPopoverProvider";
import { RouteOptionsPopover } from "./RouteOptionsPopover";
import { UpdateScheduleActionPopover } from "./UpdateSchedulePopover";

type ActionsPopoverState = "aircraft" | "pilot" | "crewMember" | "updateSchedule" | "routeOption";
type ActionPopoverProps = {
    mission: Mission;
    onReloadList: () => void;
    type: ActionsPopoverState;
    onRedirectToResource?: () => void;
};

export const ActionPopover = (props: ActionPopoverProps) => {
    const { onReloadList, type, mission, onRedirectToResource } = props;
    const { isOpen, onClose, onOpen } = useDisclosure();

    return (
        <AssignmentsPopoverProvider>
            {match(type)
                .with("aircraft", () => (
                    <AssignmentsPopover
                        type="aircraft"
                        mission={mission}
                        isOpen={isOpen}
                        onClose={onClose}
                        onOpen={onOpen}
                        onReloadList={onReloadList}
                        onRedirectToResource={onRedirectToResource}
                    />
                ))
                .with("pilot", () => (
                    <AssignmentsPopover
                        type="pilot"
                        mission={mission}
                        isOpen={isOpen}
                        onClose={onClose}
                        onOpen={onOpen}
                        onReloadList={onReloadList}
                        onRedirectToResource={onRedirectToResource}
                    />
                ))
                .with("crewMember", () => (
                    <AssignmentsPopover
                        type="crewMember"
                        mission={mission}
                        isOpen={isOpen}
                        onClose={onClose}
                        onOpen={onOpen}
                        onReloadList={onReloadList}
                        onRedirectToResource={onRedirectToResource}
                    />
                ))
                .with("updateSchedule", () => (
                    <UpdateScheduleActionPopover
                        mission={mission}
                        isOpen={isOpen}
                        onClose={onClose}
                        onOpen={onOpen}
                        onReloadList={onReloadList}
                        onRedirectToResource={onRedirectToResource}
                    />
                ))
                .with(
                    "routeOption",
                    () =>
                        mission.statusOfMission !== StatusOfMission.CANCELLED &&
                        mission.statusOfMission !== StatusOfMission.FLYING && (
                            <RouteOptionsPopover
                                mission={mission}
                                isOpen={isOpen}
                                onClose={onClose}
                                onOpen={onOpen}
                                onReloadList={onReloadList}
                            />
                        )
                )
                .exhaustive()}
        </AssignmentsPopoverProvider>
    );
};
