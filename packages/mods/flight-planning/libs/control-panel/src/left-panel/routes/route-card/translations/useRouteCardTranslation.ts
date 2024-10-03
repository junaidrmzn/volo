import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./routeCard.de.translations.json";
import en from "./routeCard.en.translations.json";

const translations = { en, de };
export const useRouteCardTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
