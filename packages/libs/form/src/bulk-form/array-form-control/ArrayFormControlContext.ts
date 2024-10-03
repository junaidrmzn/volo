import { createContext } from "react";

export type ArrayFormControlContextType = {
    formControlFieldIndex: number;
};

export const ArrayFormControlContext = createContext<ArrayFormControlContextType | undefined>(undefined);
