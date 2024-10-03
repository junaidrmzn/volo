import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testRequestSection.de.translations.json";
import en from "./testRequestSection.en.translations.json";

const translations = { en, de };
export const useTestRequestSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
