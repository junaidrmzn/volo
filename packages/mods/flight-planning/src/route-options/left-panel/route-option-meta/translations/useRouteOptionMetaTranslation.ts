import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./routeOptionMeta.de.translations.json";
import en from "./routeOptionMeta.en.translations.json";

const translations = { en, de };
export const useRouteOptionMetaTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);
