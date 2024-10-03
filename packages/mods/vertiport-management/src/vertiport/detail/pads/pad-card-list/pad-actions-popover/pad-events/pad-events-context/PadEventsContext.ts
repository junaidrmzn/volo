import { createContext } from "react";
import type { AddPadEventCallback } from "./useAddPadEvent";
import type { DeletePadEventCallback } from "./useDeletePadEvent";

type PadEventsContextType = {
    addPadEvent: AddPadEventCallback;
    deletePadEvent: DeletePadEventCallback;
};

export const PadEventsContext = createContext<PadEventsContextType | undefined>(undefined);
