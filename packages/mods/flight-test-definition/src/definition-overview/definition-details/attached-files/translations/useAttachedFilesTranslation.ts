import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./attachedFiles.de.translations.json";
import en from "./attachedFiles.en.translations.json";

const translations = { en, de };
export const useAttachedFilesTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
