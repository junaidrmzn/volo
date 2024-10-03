import type { ReactNode } from "react";
import { useEditSessionId } from "@voloiq/flight-test-definition-utils";
import { ProcedureEditSessionIdContext } from "./ProcedureEditSessionIdContext";

export type ProcedureEditSessionIdProviderProps = {
    children: ReactNode;
};

export const ProcedureEditSessionIdProvider = (props: ProcedureEditSessionIdProviderProps) => {
    const { children } = props;
    const { editSessionId: procedureEditSessionId } = useEditSessionId();

    return (
        <ProcedureEditSessionIdContext.Provider value={{ procedureEditSessionId }}>
            {children}
        </ProcedureEditSessionIdContext.Provider>
    );
};
