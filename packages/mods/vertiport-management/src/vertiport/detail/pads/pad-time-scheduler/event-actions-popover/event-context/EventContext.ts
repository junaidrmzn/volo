import { createContext } from "react";
import type { PadEvent } from "@voloiq/vertiport-management-api/v1";

export type EventContextType = {
    padEvent: PadEvent;
};
export const EventContext = createContext<EventContextType | undefined>(undefined);
