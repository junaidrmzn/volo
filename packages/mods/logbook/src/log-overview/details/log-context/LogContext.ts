import { createContext } from "react";

export type LogContextState = {
    refresh: () => void;
};

export const LogContext = createContext<LogContextState | undefined>(undefined);
