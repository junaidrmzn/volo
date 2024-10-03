import { createContext } from "react";

export type DefinitionEditSessionIdContextType = {
    definitionEditSessionId: string;
};

export const DefinitionEditSessionIdContext = createContext<DefinitionEditSessionIdContextType | undefined>(undefined);
