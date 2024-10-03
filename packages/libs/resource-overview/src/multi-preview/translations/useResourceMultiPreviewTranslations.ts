import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourceMultiPreview.de.translations.json";
import en from "./resourceMultiPreview.en.translations.json";

const translations = { en, de };
export const useResourceMultiPreviewTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
