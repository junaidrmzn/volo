import { ReactNode } from "react";
import { DragHandlePropsContext, DragHandlePropsContextType } from "./DragHandlePropsContext";

export type DragHandlePropsProviderProps = {
    children: ReactNode;
    dragHandleProps: DragHandlePropsContextType;
};

export const DragHandlePropsProvider = (props: DragHandlePropsProviderProps) => {
    const { children, dragHandleProps } = props;

    return <DragHandlePropsContext.Provider value={dragHandleProps}>{children}</DragHandlePropsContext.Provider>;
};
