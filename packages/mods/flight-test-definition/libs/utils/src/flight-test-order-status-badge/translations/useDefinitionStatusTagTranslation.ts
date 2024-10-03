import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightTestOrderStatusTag.de.translations.json";
import en from "./flightTestOrderStatusTag.en.translations.json";

const translations = { en, de };
export const useFlightTestOrderStatusTagTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
