import { createContext } from "react";

export type ProcedureEditSessionIdContextType = {
    procedureEditSessionId: string;
};

export const ProcedureEditSessionIdContext = createContext<ProcedureEditSessionIdContextType | undefined>(undefined);
