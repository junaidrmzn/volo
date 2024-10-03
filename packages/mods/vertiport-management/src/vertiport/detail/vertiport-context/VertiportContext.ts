import { createContext } from "react";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";

export type VertiportContextType = {
    vertiport: Vertiport;
};
export const VertiportContext = createContext<VertiportContextType | undefined>(undefined);
