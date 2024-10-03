import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointSelection.de.translations.json";
import en from "./testPointSelection.en.translations.json";

const translations = { en, de };
export const useTestPointSelectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
