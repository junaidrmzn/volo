import { createInstance } from "i18next";
import { isDevelopment, isTesting } from "@voloiq/utils";
import { languages } from "./language";
import { runtimeNamespacesPlugin } from "./runtimeNamespacesPlugin";

export const createI18n = () => {
    const i18n = createInstance({
        fallbackLng: "en",
        interpolation: {
            // react already escapes values for us
            escapeValue: false,
            prefix: "{",
            suffix: "}",
        },
        supportedLngs: languages,
        react: {
            useSuspense: false,
        },
        debug: isDevelopment,
        initImmediate: !isTesting,
    });
    i18n.use(runtimeNamespacesPlugin());
    i18n.init();
    return i18n;
};
