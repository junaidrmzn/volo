import type { ReactNode } from "react";
import type { Pad } from "@voloiq/vertiport-management-api/v1";
import { PadContext } from "./PadContext";

export type PadProviderProps = {
    children: ReactNode;
    pad: Pad;
};

export const PadProvider = (props: PadProviderProps) => {
    const { children, pad } = props;

    return <PadContext.Provider value={{ pad }}>{children}</PadContext.Provider>;
};
