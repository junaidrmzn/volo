import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./supportCircle.de.translations.json";
import en from "./supportCircle.en.translations.json";

const translations = { en, de };
export const useSupportCircleTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
