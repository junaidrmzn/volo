import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./navigationBar.de.translations.json";
import en from "./navigationBar.en.translations.json";

const translations = { en, de };
export const useNavigationBarTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
