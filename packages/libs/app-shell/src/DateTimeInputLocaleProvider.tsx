import { DateTimeInputLocaleProvider as DTILocaleProvider } from "@voloiq/date-time-input";
import { useLanguage } from "@voloiq/i18n";

export const DateTimeInputLocaleProvider: FCC = (props) => {
    const { children } = props;
    const { currentLanguage } = useLanguage();

    return <DTILocaleProvider currentLanguage={currentLanguage}>{children}</DTILocaleProvider>;
};
