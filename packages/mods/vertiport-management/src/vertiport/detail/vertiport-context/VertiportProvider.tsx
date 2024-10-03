import type { ReactNode } from "react";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { VertiportContext } from "./VertiportContext";

export type VertiportProviderProps = {
    children: ReactNode;
    vertiport: Vertiport;
};

export const VertiportProvider = (props: VertiportProviderProps) => {
    const { children, vertiport } = props;

    return <VertiportContext.Provider value={{ vertiport }}>{children}</VertiportContext.Provider>;
};
