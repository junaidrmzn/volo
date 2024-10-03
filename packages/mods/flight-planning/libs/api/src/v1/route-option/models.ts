import { Vertiport } from "../vertiport";

export type RouteOptionBase = {
    name: string;
    aircraftType: string;
    aircraftTypeId?: string;
    validForOperation?: boolean;
    isCopied?: boolean;
};

export type RouteOption = RouteOptionBase & {
    id: number;
    departureExternalVertiport: Vertiport;
    arrivalExternalVertiport: Vertiport;
};

export type RouteOptionUpdate = RouteOptionBase & {
    id: number;
    departureExternalVertiport: number;
    arrivalExternalVertiport: number;
};
