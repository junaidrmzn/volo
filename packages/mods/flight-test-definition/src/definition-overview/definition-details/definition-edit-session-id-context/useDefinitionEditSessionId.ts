import { useContext } from "react";
import { DefinitionEditSessionIdContext } from "./DefinitionEditSessionIdContext";

export const useDefinitionEditSessionId = () => {
    const context = useContext(DefinitionEditSessionIdContext);

    if (context === undefined) {
        throw new Error("useDefinitionEditSessionId must be used within DefinitionEditSessionIdProvider");
    }

    return context;
};
