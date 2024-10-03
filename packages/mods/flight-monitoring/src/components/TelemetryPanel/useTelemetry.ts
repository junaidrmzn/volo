import type { FlightPathItem } from "@voloiq-typescript-api/flight-monitoring-types";
import { useEffect, useMemo, useState } from "react";

export type Trend = "up" | "down" | "steady";

export const useTelemetry = (messages: FlightPathItem[]) => {
    const lastMessage = messages[messages.length - 1];
    const beforeLastMessage = messages[messages.length - 2];

    const groundLevel = useMemo(() => messages[0]?.alt || 0, [messages]);

    const [altitudeTrend, setAltitudeTrend] = useState<Trend>();
    const [airspeedTrend, setAirspeedTrend] = useState<Trend>();

    useEffect(() => {
        if (beforeLastMessage && lastMessage) {
            setAltitudeTrend(
                Math.round(lastMessage.alt!) > Math.round(beforeLastMessage.alt!)
                    ? "up"
                    : Math.round(lastMessage.alt!) < Math.round(beforeLastMessage.alt!)
                    ? "down"
                    : "steady"
            );
            setAirspeedTrend(
                Math.round(lastMessage.horizontalSpeed!) > Math.round(beforeLastMessage.horizontalSpeed!)
                    ? "up"
                    : Math.round(lastMessage.horizontalSpeed!) > Math.round(beforeLastMessage.horizontalSpeed!)
                    ? "down"
                    : "steady"
            );
        }
    }, [lastMessage, beforeLastMessage]);

    return { lastMessage, altitudeTrend, airspeedTrend, groundLevel };
};
