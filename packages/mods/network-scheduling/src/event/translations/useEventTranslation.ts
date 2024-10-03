import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./event.de.translations.json";
import en from "./event.en.translations.json";

const translations = { en, de };
export const useEventTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
export type EventTranslationFunction = ReturnType<typeof useEventTranslation>["t"];
