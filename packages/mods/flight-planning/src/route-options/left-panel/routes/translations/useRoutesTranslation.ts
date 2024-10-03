import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./routes.de.translations.json";
import en from "./routes.en.translations.json";

const translations = { en, de };
export const useRoutesTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
