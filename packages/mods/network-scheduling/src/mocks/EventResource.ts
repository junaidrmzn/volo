import type { Event } from "@voloiq-typescript-api/network-scheduling-types";

export type EventResource = Event & { id: string };

export const anyEventResource = (overwrites?: Partial<EventResource>): Event => ({
    id: Math.round(Math.random() * 100).toString(),
    name: `istvaan-iii-${Math.round(Math.random() * 10).toString()}`,
    description: "Drop-Site-M....",
    isBlockedForMission: false,
    aircraftId: Math.round(Math.random() * 100).toString(),
    startDate: new Date(Date.UTC(2022, 4, 1)).toString(),
    endDate: new Date(Date.UTC(2022, 4, 1)).toString(),
    createTime: new Date(Date.UTC(2021, 4, 1)).toString(),
    updateTime: new Date(Date.UTC(2021, 6, 1)).toString(),
    ...overwrites,
});

export { NETWORK_SCHEDULING_MANAGEMENT_SERVICE_URL as eventBaseURL } from "./serviceUrls";
