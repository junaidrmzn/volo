import type { RefObject, UIEventHandler } from "react";
import { useCallback, useRef } from "react";
import { v4 as uuidV4 } from "uuid";

export const useSynchronizedScroll = <T extends Element>() => {
    const registeredReferences = useRef<{ [id: string]: RefObject<T> }>({});

    const registerRef = useCallback((ref: RefObject<T>) => {
        const id = uuidV4();
        registeredReferences.current[id] = ref;

        return id;
    }, []);
    const unregisterRef = useCallback((id: string) => {
        delete registeredReferences.current[id];
    }, []);

    const onScroll: UIEventHandler<T> = (event) => {
        const { scrollLeft } = event.currentTarget;
        for (const registeredRef of Object.values(registeredReferences.current)) {
            const { current: registeredElement } = registeredRef;
            if (registeredElement) {
                registeredElement.scrollLeft = scrollLeft;
            }
        }
    };

    return { registerRef, unregisterRef, onScroll };
};
