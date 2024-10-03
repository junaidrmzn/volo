import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./resourcePreview.de.translations.json";
import en from "./resourcePreview.en.translations.json";

const translations = { en, de };
export const useResourcePreviewTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
