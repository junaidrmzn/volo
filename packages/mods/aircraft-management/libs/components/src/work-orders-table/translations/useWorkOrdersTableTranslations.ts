import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./workOrdersTable.de.translations.json";
import en from "./workOrdersTable.en.translations.json";

const translations = { en, de };
export const useWorkOrdersTableTranslations = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
