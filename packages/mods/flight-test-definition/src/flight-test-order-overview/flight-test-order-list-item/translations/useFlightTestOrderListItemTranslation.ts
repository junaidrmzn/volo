import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightTestOrderListItem.de.translations.json";
import en from "./flightTestOrderListItem.en.translations.json";

const translations = { en, de };
export const useFlightTestOrderListItemTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
