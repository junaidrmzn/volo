import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointMachineConfig.de.translations.json";
import en from "./testPointMachineConfig.en.translations.json";

const translations = { en, de };
export const useTestPointMachineConfigTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
