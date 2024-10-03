import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./sortable.de.translations.json";
import en from "./sortable.en.translations.json";

const translations = { en, de };
export const useSortableTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
