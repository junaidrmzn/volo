import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightTestOrderDetails.de.translations.json";
import en from "./flightTestOrderDetails.en.translations.json";

const translations = { en, de };
export const useFlightTestOrderDetailsTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
