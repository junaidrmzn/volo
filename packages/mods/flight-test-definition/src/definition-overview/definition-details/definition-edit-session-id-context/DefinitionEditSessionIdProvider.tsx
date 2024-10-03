import type { ReactNode } from "react";
import { useEditSessionId } from "@voloiq/flight-test-definition-utils";
import { DefinitionEditSessionIdContext } from "./DefinitionEditSessionIdContext";

export type DefinitionEditSessionIdProviderProps = {
    children: ReactNode;
};

export const DefinitionEditSessionIdProvider = (props: DefinitionEditSessionIdProviderProps) => {
    const { children } = props;
    const { editSessionId: definitionEditSessionId } = useEditSessionId();

    return (
        <DefinitionEditSessionIdContext.Provider value={{ definitionEditSessionId }}>
            {children}
        </DefinitionEditSessionIdContext.Provider>
    );
};
