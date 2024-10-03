import type { ReactNode } from "react";
import { TimeZoneContext } from "./TimeZoneContext";

export type TimeZoneProviderProps = {
    timeZone?: string;
    children: ReactNode;
};

export const TimeZoneProvider = (props: TimeZoneProviderProps) => {
    const { timeZone, children } = props;

    return <TimeZoneContext.Provider value={{ timeZone }}>{children}</TimeZoneContext.Provider>;
};
