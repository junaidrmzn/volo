import type { CrewMember, MissionResource } from "@voloiq-typescript-api/network-scheduling-types";

type RowLabelType = {
    missionResources: MissionResource[];
};

const isValidObject = (object: object): boolean => {
    if (typeof object !== "object" || Array.isArray(object) || object === null) {
        return false;
    }
    return Object.keys(object).length > 0;
};

const filterByObjectKey = (missionResources: MissionResource[], matchKey: string) => {
    for (const [key, value] of Object.entries(missionResources)) {
        if (key === matchKey) {
            return value as CrewMember[];
        }
    }
    return undefined;
};

const getMissionReservations = (missionResource: MissionResource) => {
    if (missionResource !== null && missionResource !== undefined) {
        const reservationObject = Object.entries(missionResource).find(([key]) => {
            return key === "reservations";
        });

        if (reservationObject !== undefined) {
            const [, responseValue] = reservationObject;
            return responseValue;
        }
    }
    return undefined;
};

export const useMissionTimeGridData = (props: RowLabelType) => {
    const { missionResources } = props;

    const crewData = filterByObjectKey(missionResources, "crewMembers");

    return { crewData, getMissionReservations, isValidObject };
};
