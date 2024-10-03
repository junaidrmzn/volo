import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./proceduresTab.de.translations.json";
import en from "./proceduresTab.en.translations.json";

const translations = { en, de };
export const useProceduresTabTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
