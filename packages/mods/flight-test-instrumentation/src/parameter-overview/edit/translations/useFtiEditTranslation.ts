import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftiEdit.de.translations.json";
import en from "./ftiEdit.en.translations.json";

const translations = { en, de };

export const useFtiEditTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
