import type { RefObject } from "react";
import { useInitialZoomFactor } from "./useInitialZoomFactor";
import { usePersistZoomFactorBeforeUnmount } from "./usePersistZoomFactorBeforeUnmount";

export const usePersistentZoomFactor = (containerRef: RefObject<HTMLElement>) => {
    useInitialZoomFactor(containerRef);
    usePersistZoomFactorBeforeUnmount();
};
