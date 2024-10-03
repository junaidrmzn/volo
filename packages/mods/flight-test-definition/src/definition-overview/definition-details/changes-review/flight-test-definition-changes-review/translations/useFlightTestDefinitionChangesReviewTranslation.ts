import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./flightTestDefinitionChangesReview.de.translations.json";
import en from "./flightTestDefinitionChangesReview.en.translations.json";

const translations = { en, de };
export const useFlightTestDefinitionChangesReviewTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
