import type { ReactNode } from "react";
import { usePads } from "../../../../pads-context/usePads";
import { PadEventsContext } from "./PadEventsContext";
import { useAddPadEvent } from "./useAddPadEvent";
import { useDeletePadEvent } from "./useDeletePadEvent";

type PadEventsProviderProps = {
    children: ReactNode;
};

export const PadEventsProvider = (props: PadEventsProviderProps) => {
    const { children } = props;
    const { refetchPads } = usePads();
    const { addPadEvent } = useAddPadEvent({ onSuccessfulAdd: refetchPads });
    const { deletePadEvent } = useDeletePadEvent({ onSuccessfulDelete: refetchPads });

    return <PadEventsContext.Provider value={{ addPadEvent, deletePadEvent }}>{children}</PadEventsContext.Provider>;
};
