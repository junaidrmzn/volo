import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./routesSection.de.translations.json";
import en from "./routesSection.en.translations.json";

const translations = { en, de };
export const useRoutesSectionTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
