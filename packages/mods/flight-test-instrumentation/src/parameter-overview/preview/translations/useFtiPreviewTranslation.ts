import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./ftiPreview.de.translations.json";
import en from "./ftiPreview.en.translations.json";

const translations = { en, de };
export const useFtiPreviewTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
