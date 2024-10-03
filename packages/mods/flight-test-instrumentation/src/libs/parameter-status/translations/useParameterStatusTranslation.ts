import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./parameterStatus.de.translations.json";
import en from "./parameterStatus.en.translations.json";

const translations = { en, de };
export const useParameterStatusTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
