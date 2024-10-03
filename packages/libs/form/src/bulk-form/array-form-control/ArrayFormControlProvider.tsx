import type { ReactNode } from "react";
import type { ArrayFormControlContextType } from "./ArrayFormControlContext";
import { ArrayFormControlContext } from "./ArrayFormControlContext";

export type ArrayFormControlProviderProps = {
    children: ReactNode;
} & Pick<ArrayFormControlContextType, "formControlFieldIndex">;

export const ArrayFormControlProvider = (props: ArrayFormControlProviderProps) => {
    const { children, formControlFieldIndex } = props;

    return (
        <ArrayFormControlContext.Provider value={{ formControlFieldIndex }}>
            {children}
        </ArrayFormControlContext.Provider>
    );
};
