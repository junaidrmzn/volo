import type { i18n as I18nType } from "i18next";
import { getTypedKeys } from "@voloiq/utils";
import type { TranslationObject } from "./translations";

/**
 * This plugin allows to load translations synchronously and with full TypeScript support.
 * It adds a `getTranslation` function to the `i18n` instance that takes a translation object as an argument,
 * creates a namespace for it if one doesn't exist already and returns the translations in the currently active language.
 * @returns Plugin object for i18next
 */
export const runtimeNamespacesPlugin = () =>
    ({
        type: "3rdParty",
        init: (i18n: I18nType) => {
            const namespaces = new Map<TranslationObject, string>();
            const getNamespace = (translations: TranslationObject) => {
                let namespace = namespaces.get(translations);
                if (!namespace) {
                    namespace = `runtime-namespace-${namespaces.size}`;
                    namespaces.set(translations, namespace);

                    for (const language of getTypedKeys(translations)) {
                        if (namespace) {
                            i18n.addResourceBundle(language, namespace, translations[language]);
                        }
                    }
                }
                return namespace;
            };
            const getTranslation = (translations: TranslationObject) => {
                const namespace = getNamespace(translations);
                return i18n.getFixedT(null, namespace);
            };
            return Object.assign(i18n, { getTranslation });
        },
    } as const);

export type ExtendedI18n = ReturnType<ReturnType<typeof runtimeNamespacesPlugin>["init"]>;
export const isExtendedI18n = (i18n: I18nType): i18n is ExtendedI18n =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    (i18n as ExtendedI18n).getTranslation !== undefined;
