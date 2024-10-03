import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./testPointAttemptModalV2Translation.de.translations.json";
import en from "./testPointAttemptModalV2Translation.en.translations.json";

const translations = { en, de };
export const useTestPointAttemptModalV2Translation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
