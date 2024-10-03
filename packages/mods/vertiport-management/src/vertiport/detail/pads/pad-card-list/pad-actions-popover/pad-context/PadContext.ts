import { createContext } from "react";
import type { Pad } from "@voloiq/vertiport-management-api/v1";

export type PadContextType = {
    pad: Pad;
};
export const PadContext = createContext<PadContextType | undefined>(undefined);
