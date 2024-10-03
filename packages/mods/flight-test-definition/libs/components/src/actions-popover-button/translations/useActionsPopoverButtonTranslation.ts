import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./actionsPopoverButton.de.translations.json";
import en from "./actionsPopoverButton.en.translations.json";

const translations = { en, de };
export const useActionsPopoverButtonTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
