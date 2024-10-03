import type { ReactNode } from "react";
import { ScrollContext } from "./ScrollContext";
import { useScrollProvider } from "./useScrollProvider";

export type ScrollProviderProps = {
    children: ReactNode;
};

export const ScrollProvider = (props: ScrollProviderProps) => {
    const { children } = props;

    const value = useScrollProvider();

    return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
};
