import { createContext } from "react";

export type AddFormControlGroupOptions = { index?: number; value?: Object };

export type BulkFormContextType = {
    getFormFieldValues: () => unknown;
    addFormControlGroup: (options?: AddFormControlGroupOptions) => void;
    removeFormControlGroup: (index: number) => void;
};

export const BulkFormContext = createContext<BulkFormContextType | undefined>(undefined);
