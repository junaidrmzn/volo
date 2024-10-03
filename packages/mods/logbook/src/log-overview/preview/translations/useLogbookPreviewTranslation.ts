import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./logbookPreview.de.translations.json";
import en from "./logbookPreview.en.translations.json";

const translations = { en, de };
export const useLogbookPreviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
