import type { DateRangePickerLocaleProviderProps as DLDateRangePickerLocaleProviderProps } from "@volocopter/date-time-input-react";
import { DateRangePickerLocaleProvider as DLDateRangePickerLocaleProvider } from "@volocopter/date-time-input-react";
import { locales } from "./locales";
import { useDateTimeInputTranslations } from "./translations/useDateTimeInputTranslation";

export type DateRangePickerLocaleProviderProps = Partial<Pick<DLDateRangePickerLocaleProviderProps, "currentLanguage">>;

export const DateRangePickerLocaleProvider: FCC<DateRangePickerLocaleProviderProps> = (props) => {
    const { children, currentLanguage = "en" } = props;
    const { t } = useDateTimeInputTranslations();

    return (
        <DLDateRangePickerLocaleProvider
            locales={locales}
            currentLanguage={currentLanguage}
            canceButtonlLabel={t("Cancel")}
            doneButtonLabel={t("Done")}
            endDateLabel={t("Selected End Date")}
            endTimeLabel={t("Time")}
            placeholder={t("Select Dates")}
            startDateLabel={t("Selected Start Date")}
            startTimeLabel={t("Time")}
        >
            {children}
        </DLDateRangePickerLocaleProvider>
    );
};

export { useDateRangePickerLocaleContext } from "@volocopter/date-time-input-react";
