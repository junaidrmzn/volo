import { Aircraft } from "../aircrafts";

export type BaseDto = {
    createTime: string;
    updateTime: string;
};

export type EventBase = {
    name: string;
    startDate: string;
    endDate: string;
    description?: string;
    isBlockedForMission: boolean;
    aircraftId?: string;
};

export type EventCreateAllOf = {};

export type EventUpdateAllOf = {
    version?: number;
};

export type EventAllOf = {
    id: string;
    aircraft?: Aircraft;
};

export type EventCreate = EventBase & EventCreateAllOf;
export type EventUpdate = EventBase & EventUpdateAllOf;
export type Event = BaseDto & EventCreate & EventUpdate & EventAllOf;
export type EventBulkUpdate = {
    fieldType: string;
    newValue: string | object[] | null;
};
