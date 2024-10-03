import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./software-config.de.translations.json";
import en from "./software-config.en.translations.json";

const translations = { en, de };
export const useSoftwareConfigTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
