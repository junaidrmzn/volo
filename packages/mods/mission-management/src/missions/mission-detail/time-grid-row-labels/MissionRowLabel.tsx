import type { Aircraft, CrewMember, MissionResource, Pad } from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { AircraftRowLabel } from "./AircraftRowLabel";
import { PadRowLabel } from "./PadRowLabel";
import { PilotRowLabel } from "./PilotRowLabel";

type MissionRowLabelType = {
    missionAssignmentKey: string;
    data: MissionResource;
};

export const MissionRowLabel = (props: MissionRowLabelType) => {
    const { missionAssignmentKey, data } = props;
    return match(missionAssignmentKey)
        .with("aircraft", () => <AircraftRowLabel aircraftData={data as Aircraft} />)
        .with("pilot", () => <PilotRowLabel pilotData={data as CrewMember} />)
        .with("arrivalFato", () => <PadRowLabel padData={data as Pad} missionAssignmentKey={missionAssignmentKey} />)
        .with("departureFato", () => <PadRowLabel padData={data as Pad} missionAssignmentKey={missionAssignmentKey} />)
        .with("arrivalStand", () => <PadRowLabel padData={data as Pad} missionAssignmentKey={missionAssignmentKey} />)
        .with("departureStand", () => <PadRowLabel padData={data as Pad} missionAssignmentKey={missionAssignmentKey} />)

        .otherwise(() => null);
};
