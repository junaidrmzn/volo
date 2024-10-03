import { useContext } from "react";
import { ProcedureEditSessionIdContext } from "./ProcedureEditSessionIdContext";

export const useProcedureEditSessionId = () => {
    const context = useContext(ProcedureEditSessionIdContext);

    if (context === undefined) {
        throw new Error("useProcedureEditSessionId must be used within ProcedureEditSessionIdProvider");
    }

    return context;
};
