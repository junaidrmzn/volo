import { useContext } from "react";
import { DefinitionContext } from "./DefinitionContext";

export const useDefinition = () => {
    const context = useContext(DefinitionContext);

    if (context === undefined) {
        throw new Error("useDefinition must be used within DefinitionProvider");
    }

    return context;
};
