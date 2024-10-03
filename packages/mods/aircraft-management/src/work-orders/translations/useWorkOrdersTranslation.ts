import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./workOrders.de.translations.json";
import en from "./workOrders.en.translations.json";

const translations = { en, de };
export const useWorkOrdersTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
