import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./scrollableContainer.de.translations.json";
import en from "./scrollableContainer.en.translations.json";

const translations = { en, de };
export const useScrollableContainerTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
