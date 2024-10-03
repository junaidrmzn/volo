import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./template.de.translations.json";
import en from "./template.en.translations.json";

const translations = { en, de };
export const useTemplateTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
