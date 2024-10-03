import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./masterModel.de.translations.json";
import en from "./masterModel.en.translations.json";

const translations = { en, de };
export const useMasterModelTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
