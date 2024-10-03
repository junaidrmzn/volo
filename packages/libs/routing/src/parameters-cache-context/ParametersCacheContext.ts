import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export type ContextParameters = {
    initialized: boolean;
    setInitialized: () => void;
    parametersCache: Record<string, string> | undefined;
    setParametersCache: Dispatch<SetStateAction<Record<string, string> | undefined>>;
};

export const ParametersCacheContext = createContext<ContextParameters | undefined>(undefined);
