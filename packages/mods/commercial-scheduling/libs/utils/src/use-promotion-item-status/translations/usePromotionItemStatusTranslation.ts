import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./PromotionItemStatus.de.translations.json";
import en from "./PromotionItemStatus.en.translations.json";

const translations = { en, de };
export const usePromotionItemStatusTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
