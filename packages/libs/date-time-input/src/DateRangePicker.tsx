import type { DateRangeProps as DLDateRangeProps } from "@volocopter/date-time-input-react";
import { DateRangePicker as DLDateRangePicker } from "@volocopter/date-time-input-react";
import { forwardRef } from "react";
import { useDateRangePickerLocaleContext } from "./DateRangePickerLocaleContext";

export type DateRangeProps = Omit<DLDateRangeProps, "locale">;

export const DateRangePicker = forwardRef((props: DateRangeProps, ref) => {
    const { locale } = useDateRangePickerLocaleContext();

    return <DLDateRangePicker locale={locale} ref={ref} {...props} />;
});
