import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./parameterMachineConfig.de.translations.json";
import en from "./parameterMachineConfig.en.translations.json";

const translations = { en, de };
export const useParameterMachineConfigTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
