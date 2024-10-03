import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./procedures.de.translations.json";
import en from "./procedures.en.translations.json";

const translations = { en, de };
export const useProceduresTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
