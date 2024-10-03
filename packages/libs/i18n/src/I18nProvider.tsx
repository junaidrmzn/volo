import { I18nextProvider } from "react-i18next";
import { useCreateI18n } from "./useCreateI18n";

export const I18nProvider: FCC = (props) => {
    const { children } = props;
    const i18n = useCreateI18n();

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
