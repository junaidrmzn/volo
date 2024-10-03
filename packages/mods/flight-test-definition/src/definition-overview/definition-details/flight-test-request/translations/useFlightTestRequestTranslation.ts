import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightTestRequest.de.translations.json";
import en from "./flightTestRequest.en.translations.json";

const translations = { en, de };
export const useFlightTestRequestTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
