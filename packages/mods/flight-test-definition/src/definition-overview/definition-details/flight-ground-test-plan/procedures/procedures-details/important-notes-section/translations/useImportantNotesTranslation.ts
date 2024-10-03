import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./importantNotesSection.de.translations.json";
import en from "./importantNotesSection.en.translations.json";

const translations = { en, de };
export const useImportantNotesSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
