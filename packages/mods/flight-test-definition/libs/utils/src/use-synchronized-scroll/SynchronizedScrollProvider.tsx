import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useSynchronizedScroll } from "./useSynchronizedScroll";

type SynchronizedScrollContextType = ReturnType<typeof useSynchronizedScroll>;
const SynchronizedScrollContext = createContext<SynchronizedScrollContextType | undefined>(undefined);

export type SynchronizedScrollProviderProps = {
    children: ReactNode;
};

export const SynchronizedScrollProvider = (props: SynchronizedScrollProviderProps) => {
    const { children } = props;

    const synchronizedScrollValues = useSynchronizedScroll();

    return (
        <SynchronizedScrollContext.Provider value={synchronizedScrollValues}>
            {children}
        </SynchronizedScrollContext.Provider>
    );
};

export const useSynchronizedScrollProvider = () => {
    const synchronizedScrollContext = useContext(SynchronizedScrollContext);

    if (synchronizedScrollContext === undefined) {
        throw new Error("useSynchronizedScrollProvider must be used within SynchronizedScrollProvider");
    }

    return synchronizedScrollContext;
};
