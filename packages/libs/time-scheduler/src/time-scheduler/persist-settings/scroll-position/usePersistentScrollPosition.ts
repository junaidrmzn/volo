import type { RefObject } from "react";
import { useInitialScrollPosition } from "./useInitialScrollPosition";
import { usePersistScrollPositionBeforeUnmount } from "./usePersistScrollPositionBeforeUnmount";

export const usePersistentScrollPosition = (containerRef: RefObject<HTMLElement>) => {
    useInitialScrollPosition(containerRef);
    usePersistScrollPositionBeforeUnmount(containerRef);
};
