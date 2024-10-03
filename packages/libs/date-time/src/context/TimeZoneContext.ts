import { createContext } from "react";

export type TimeZoneContextValue = {
    timeZone?: string;
};

export const TimeZoneContext = createContext<TimeZoneContextValue | undefined>(undefined);
