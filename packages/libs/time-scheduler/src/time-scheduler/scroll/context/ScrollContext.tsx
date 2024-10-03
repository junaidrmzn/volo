import type { RefObject } from "react";
import { createContext } from "react";

type ScrollContextType = {
    headerRef: RefObject<HTMLDivElement>;
    timeGridContainerRef: RefObject<HTMLDivElement>;
    timeGridOffset: number;
    scrollTo: (xPosition: number) => void;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(undefined);
