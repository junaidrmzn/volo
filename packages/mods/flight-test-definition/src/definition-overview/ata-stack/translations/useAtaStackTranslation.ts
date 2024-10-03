import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ataStack.de.translations.json";
import en from "./ataStack.en.translations.json";

const translations = { en, de };
export const useAtaStackTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
