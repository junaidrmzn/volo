import { useLayoutEffect, useRef } from "react";
import { useSynchronizedScrollProvider } from "./SynchronizedScrollProvider";

export const useSynchronizedScrollElement = () => {
    const { registerRef, unregisterRef, onScroll } = useSynchronizedScrollProvider();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const id = registerRef(ref);

        return () => {
            unregisterRef(id);
        };
    }, [registerRef, unregisterRef]);

    return { ref, onScroll };
};
