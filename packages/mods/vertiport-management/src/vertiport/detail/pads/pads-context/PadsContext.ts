import type { Pad } from "@voloiq-typescript-api/vertiport-management-types";
import { createContext } from "react";
import { TimeRange } from "@voloiq/time-scheduler";
import type { AddPadCallback } from "./useAddPad";
import type { DeletePadCallback } from "./useDeletePad";
import type { EditPadCallback } from "./useEditPad";
import type { OnRangeUpdateCallback } from "./useGetPad";

type PadsContextType = {
    pads: Pad[];
    padsCount?: number;
    timeRange?: TimeRange;
    refetchPads: () => void;
    deletePad: DeletePadCallback;
    addPad: AddPadCallback;
    editPad: EditPadCallback;
    onRangeUpdate: OnRangeUpdateCallback;
};

export const PadsContext = createContext<PadsContextType | undefined>(undefined);
