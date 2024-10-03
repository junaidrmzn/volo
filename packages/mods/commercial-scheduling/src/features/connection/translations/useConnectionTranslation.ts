import { VerifiedTranslations, useTranslation } from "@voloiq/i18n";
import de from "./Connection.de.translations.json";
import en from "./Connection.en.translations.json";

const translations = { en, de };
export const useConnectionTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type ConnectionTranslationFunction = ReturnType<typeof useConnectionTranslation>["t"];
export type ErrorMessage = keyof typeof translations["en"]["errorMessages"];
