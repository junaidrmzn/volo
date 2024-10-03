import type { DateTimeInputLocaleProviderProps as DLDateTimeInputLocaleProviderProps } from "@volocopter/date-time-input-react";
import { DateTimeInputLocaleProvider as DLDateTimeInputLocaleProvider } from "@volocopter/date-time-input-react";
import { locales } from "./locales";
import { useDateTimeInputTranslations } from "./translations/useDateTimeInputTranslation";

export type DateTimeInputLocaleProviderProps = Partial<Pick<DLDateTimeInputLocaleProviderProps, "currentLanguage">>;

export const DateTimeInputLocaleProvider: FCC<DateTimeInputLocaleProviderProps> = (props) => {
    const { children, currentLanguage = "en" } = props;
    const { t } = useDateTimeInputTranslations();

    return (
        <DLDateTimeInputLocaleProvider
            locales={locales}
            currentLanguage={currentLanguage}
            clearIconLabel={t("Clear date")}
            clockIconLabel={t("Pick date")}
        >
            {children}
        </DLDateTimeInputLocaleProvider>
    );
};

export { useDateTimeInputLocaleContext } from "@volocopter/date-time-input-react";
