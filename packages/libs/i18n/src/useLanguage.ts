import { useTranslation } from "react-i18next";
import { isLanguage } from "./language";

export const useLanguage = () => {
    const {
        i18n: { changeLanguage: changeI18nLanguage, languages },
    } = useTranslation();
    const currentLanguage = languages && languages[0];

    // currentLanguage should always be of type Language after initialization, but i18next's types don't support that
    if (currentLanguage !== undefined && !isLanguage(currentLanguage)) {
        throw new Error(`${currentLanguage} is not a valid language`);
    }

    const changeLanguage = (language: string) => {
        if (!isLanguage(language)) {
            throw new Error(`${language} is not a valid language`);
        }
        changeI18nLanguage(language);
    };

    return { changeLanguage, currentLanguage };
};
