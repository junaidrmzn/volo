import { useContext } from "react";
import type { TranslationsContextType } from "./TranslationsContext";
import { TranslationsContext } from "./TranslationsContext";

export type UseTranslationsProps = keyof TranslationsContextType;

export const useTranslations = () => {
    const translations = useContext(TranslationsContext);

    if (translations === undefined) {
        throw new Error("useTranslations must be used within TranslationsProvider");
    }

    const getTranslation = (key: keyof TranslationsContextType) => translations[key];
    return { t: getTranslation };
};
