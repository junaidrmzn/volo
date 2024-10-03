import type { ReactNode } from "react";
import { PadsContext } from "./PadsContext";
import { useAddPad } from "./useAddPad";
import { useDeletePad } from "./useDeletePad";
import { useEditPad } from "./useEditPad";
import { useGetPad } from "./useGetPad";

type PadsProviderProps = {
    children: ReactNode;
};

export const PadsProvider = (props: PadsProviderProps) => {
    const { children } = props;

    const { pads, padsCount, timeRange, refetchPads, onRangeUpdate } = useGetPad();
    const { deletePad } = useDeletePad({ onSuccessfulDelete: refetchPads });
    const { addPad } = useAddPad({ onSuccessfulAdd: refetchPads });
    const { editPad } = useEditPad({ onSuccessfulEdit: refetchPads });

    return (
        <PadsContext.Provider
            value={{ pads, padsCount, timeRange, addPad, deletePad, editPad, refetchPads, onRangeUpdate }}
        >
            {children}
        </PadsContext.Provider>
    );
};
