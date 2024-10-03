import { createContext } from "react";

export type CrewMemberContextState = {
    refresh: () => void;
};

export const CrewMemberContext = createContext<CrewMemberContextState | undefined>(undefined);
