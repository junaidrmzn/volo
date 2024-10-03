import { Icon } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { joinNullableStrings } from "@voloiq/utils";
import { useScheduleColors } from "../useScheduleColors";
import { ItemLayout } from "./ItemLayout";
import type { AssignmentState } from "./useGetAssignmentColor";
import { useGetAssignmentColor } from "./useGetAssignmentColor";

export type MissionItemProps = {
    arrivalVertiport?: string;
    departureVertiport?: string;
    flightNumber: string;
    pilotAssignment: AssignmentState;
    batteryAssignment: AssignmentState;
    isDueSoon?: boolean;
    width: number;
};

export const MissionItem = (props: MissionItemProps) => {
    const {
        arrivalVertiport,
        departureVertiport,
        flightNumber,
        pilotAssignment,
        batteryAssignment,
        width,
        isDueSoon = false,
    } = props;

    const hasWarning = [pilotAssignment, batteryAssignment].includes("warning") || isDueSoon;
    const { warningColor } = useScheduleColors();
    const { getAssignmentColor } = useGetAssignmentColor();

    return (
        <ItemLayout borderWidth={hasWarning ? 1 : 0} borderColor={warningColor} widthInPx={width}>
            <ItemLayout.Header>{flightNumber}</ItemLayout.Header>
            <ItemLayout.Body>{joinNullableStrings([departureVertiport, arrivalVertiport], " - ")}</ItemLayout.Body>
            <ItemLayout.FooterLeft>
                {hasWarning && <Icon icon="alert" size={4} color={warningColor} />}
            </ItemLayout.FooterLeft>
            <ItemLayout.FooterRight>
                <Icon
                    icon={match(pilotAssignment)
                        .with("assigned", "warning", () => "pilotAssigned" as const)
                        .with("unassigned", () => "pilotUnassigned" as const)
                        .exhaustive()}
                    size={4}
                    color={getAssignmentColor(pilotAssignment)}
                />
                <Icon
                    icon={match(batteryAssignment)
                        .with("assigned", "warning", () => "batteryAssigned" as const)
                        .with("unassigned", () => "batteryUnassigned" as const)
                        .exhaustive()}
                    size={4}
                    color={getAssignmentColor(batteryAssignment)}
                />
            </ItemLayout.FooterRight>
        </ItemLayout>
    );
};
