import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./requirements.de.translations.json";
import en from "./requirements.en.translations.json";

const translations = { en, de };
export const useRequirementsTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
