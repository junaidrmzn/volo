import type { ReactNode } from "react";
import type { PadEvent } from "@voloiq/vertiport-management-api/v1";
import { EventContext } from "./EventContext";

export type EventProviderProps = {
    children: ReactNode;
    padEvent: PadEvent;
};

export const EventProvider = (props: EventProviderProps) => {
    const { children, padEvent } = props;

    return <EventContext.Provider value={{ padEvent }}>{children}</EventContext.Provider>;
};
