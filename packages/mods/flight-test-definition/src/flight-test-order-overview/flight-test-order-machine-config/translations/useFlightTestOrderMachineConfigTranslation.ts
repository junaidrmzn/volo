import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightTestOrderMachineConfig.de.translations.json";
import en from "./flightTestOrderMachineConfig.en.translations.json";

const translations = { en, de };
export const useFlightTestOrderMachineConfigTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
