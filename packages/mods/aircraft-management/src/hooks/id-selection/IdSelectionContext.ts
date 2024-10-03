import { createContext } from "react";

export type IdSelectionContextProps = {
    selectedId?: string;
    setSelectedId: (id: string) => void;
};

export const IdSelectionContext = createContext<IdSelectionContextProps | undefined>(undefined);
