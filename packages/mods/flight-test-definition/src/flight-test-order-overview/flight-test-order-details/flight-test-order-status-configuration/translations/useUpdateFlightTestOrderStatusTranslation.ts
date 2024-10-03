import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./updateFlightTestOrderStatus.de.translations.json";
import en from "./updateFlightTestOrderStatus.en.translations.json";

const translations = { en, de };
export const useUpdateFlightTestOrderStatusTranslation = () =>
    useTranslation<VerifiedTranslations<typeof translations>>(translations);

export type UpdateFlightTestOrderStatusTranslationFunction = ReturnType<
    typeof useUpdateFlightTestOrderStatusTranslation
>["t"];
