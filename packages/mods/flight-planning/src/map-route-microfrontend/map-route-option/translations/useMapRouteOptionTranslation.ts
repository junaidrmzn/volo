import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./mapRouteOption.de.translations.json";
import en from "./mapRouteOption.en.translations.json";

const translations = { en, de };
export const useMapRouteOptionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
