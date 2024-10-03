import type { Event } from "@voloiq-typescript-api/network-scheduling-types";

export const anyEvent = (overwrites?: Partial<Event>): Event => ({
    id: "09b11eb3-323c-4a62-99ff-a797db1d35b1",
    name: "Test 2",
    startDate: "2022-08-22T10:00:00Z",
    endDate: "2022-08-23T11:00:00Z",
    isBlockedForMission: true,
    createTime: "2022-07-01T12:00:00Z",
    updateTime: "2022-07-01T12:00:00Z",
    description: "",
    ...overwrites,
});
