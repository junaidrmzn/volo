import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./fileListItem.de.translations.json";
import en from "./fileListItem.en.translations.json";

const translations = { en, de };
export const useFileListItemTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
