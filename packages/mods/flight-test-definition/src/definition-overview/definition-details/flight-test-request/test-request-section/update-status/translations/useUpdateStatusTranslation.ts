import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./updateStatus.de.translations.json";
import en from "./updateStatus.en.translations.json";

const translations = { en, de };
export const useUpdateStatusTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
