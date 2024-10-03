import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./PlanStatus.de.translations.json";
import en from "./PlanStatus.en.translations.json";

const translations = { en, de };
export const usePlanStatusTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
