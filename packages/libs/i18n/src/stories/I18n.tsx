import type { Meta } from "@storybook/react";
import type { VerifiedTranslations } from "..";
import { I18nProvider, useLanguage, useTranslation } from "..";
import de from "./I18n.de.translations.json";
import en from "./I18n.en.translations.json";

const meta: Meta = {
    title: "I18n/I18n",
};
export default meta;

const LanguageSwitch = () => {
    const { changeLanguage, currentLanguage } = useLanguage();
    return (
        <select onChange={(event) => changeLanguage(event.target.value)} value={currentLanguage}>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
        </select>
    );
};

// the explicit generic definition of <VerifiedTranslations<typeof i18nTranslations>> is needed at the moment
// to ensure that all translation files have the same translation keys
const translations = { en, de };
const useI18nTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);

const App = () => {
    const { t } = useI18nTranslation();
    return <div>{t("I'm a translation")}</div>;
};

export const Example = () => (
    <I18nProvider>
        <LanguageSwitch />
        <App />
    </I18nProvider>
);
