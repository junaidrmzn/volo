import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./parameterPreview.de.translations.json";
import en from "./parameterPreview.en.translations.json";

const translations = { en, de };
export const useParameterPreviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
