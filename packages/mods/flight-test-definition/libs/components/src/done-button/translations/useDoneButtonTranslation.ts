import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./doneButton.de.translations.json";
import en from "./doneButton.en.translations.json";

const translations = { en, de };
export const useDoneButtonTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
