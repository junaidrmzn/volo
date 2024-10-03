import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightTestOrderListItemV2.de.translations.json";
import en from "./flightTestOrderListItemV2.en.translations.json";

const translations = { en, de };
export const useFlightTestOrderListItemV2Translation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
