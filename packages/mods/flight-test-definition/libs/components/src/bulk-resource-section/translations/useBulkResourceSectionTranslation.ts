import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./bulkResourceSection.de.translations.json";
import en from "./bulkResourceSection.en.translations.json";

const translations = { en, de };
export const useBulkResourceSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
