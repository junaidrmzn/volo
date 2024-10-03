import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./bulkResourceForm.de.translations.json";
import en from "./bulkResourceForm.en.translations.json";

const translations = { en, de };
export const useBulkResourceFormTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
