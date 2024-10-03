import type {
    Aircraft,
    CrewMember,
    MissionResource,
    Reservation,
} from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { AircraftEventCard } from "./AircraftEventCard";
import { PadEventCard } from "./PadEventCard";
import { PilotEventCard } from "./PilotEventCard";

export type EventItemProps = {
    missionAssignmentKey: string;
    missionData: MissionResource;
    missionReservations: Reservation;
};
export const MissionEventCard = (props: EventItemProps) => {
    const { missionAssignmentKey, missionData, missionReservations } = props;

    return match(missionAssignmentKey)
        .with("aircraft", () => (
            <AircraftEventCard aircraftData={missionData as Aircraft} aircraftReservations={missionReservations} />
        ))
        .with("pilot", () => (
            <PilotEventCard pilotData={missionData as CrewMember} pilotReservations={missionReservations} />
        ))
        .with("arrivalFato", () => (
            <PadEventCard padData={missionData as CrewMember} padReservations={missionReservations} />
        ))
        .with("departureFato", () => (
            <PadEventCard padData={missionData as CrewMember} padReservations={missionReservations} />
        ))
        .with("arrivalStand", () => (
            <PadEventCard padData={missionData as CrewMember} padReservations={missionReservations} />
        ))
        .with("departureStand", () => (
            <PadEventCard padData={missionData as CrewMember} padReservations={missionReservations} />
        ))
        .otherwise(() => null);
};
