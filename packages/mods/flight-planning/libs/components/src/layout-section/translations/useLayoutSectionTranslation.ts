import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./layoutSection.de.translations.json";
import en from "./layoutSection.en.translations.json";

const translations = { en, de };
export const useLayoutSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
