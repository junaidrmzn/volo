import { useContext } from "react";
import { TimeZoneContext } from "./TimeZoneContext";

export const useTimeZone = () => {
    const context = useContext(TimeZoneContext);

    if (context === undefined) {
        throw new Error("useTimeZone must be used within TimeZoneProvider");
    }

    const { timeZone } = context;

    return timeZone;
};
