import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./attachedFilesContext.de.translations.json";
import en from "./attachedFilesContext.en.translations.json";

const translations = { en, de };
export const useAttachedFilesContextTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
