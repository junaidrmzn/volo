import type { TOptions } from "i18next";
import { useTranslation as useI18nTranslation } from "react-i18next";
import type { Language } from "./language";
import { isExtendedI18n } from "./runtimeNamespacesPlugin";

type Translation = { [key: string]: string | Translation };
type TranslationObject = { [K in Language]: Translation };
type DeepKeys<T, K extends keyof T = keyof T> = T extends object
    ? K extends string
        ? T[K] extends object
            ? `${K}.${DeepKeys<T[K]>}`
            : K
        : never
    : T extends string
    ? T
    : never;

type TranslationKey<T extends TranslationObject> = {
    [K in keyof T[Language]]: DeepKeys<T[Language]>;
}[keyof T[Language]];

export const useTranslation = <T extends TranslationObject>(translations: T) => {
    const { i18n } = useI18nTranslation();

    if (!isExtendedI18n(i18n)) {
        throw new Error("useTranslation must be used within I18nProvider");
    }

    const t = (translationKey: TranslationKey<T>, options?: TOptions | string) =>
        i18n.getTranslation(translations)(translationKey, options);

    return { t, i18n };
};
