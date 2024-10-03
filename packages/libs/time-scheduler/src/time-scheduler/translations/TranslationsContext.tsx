import { createContext } from "react";

export type TranslationsContextType = {
    scrollLeftButtonLabel: string;
    scrollRightButtonLabel: string;
    zoomInButtonLabel: string;
    zoomOutButtonLabel: string;
    closeButton: string;
    title: string;
    go: string;
};

export const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);
