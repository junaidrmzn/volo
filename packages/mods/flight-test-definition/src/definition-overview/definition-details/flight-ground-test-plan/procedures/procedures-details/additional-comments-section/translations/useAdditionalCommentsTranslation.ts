import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./additionalCommentsSection.de.translations.json";
import en from "./additionalCommentsSection.en.translations.json";

const translations = { en, de };
export const useAdditionalCommentsSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
