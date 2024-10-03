import type {
    DateTimeInputMode as DLDateTimeInputMode,
    DateTimeInputProps as DLDateTimeInputProps,
} from "@volocopter/date-time-input-react";
import { DateTimeInput as DLDateTimeInput } from "@volocopter/date-time-input-react";
// eslint-disable-next-line no-restricted-imports
import "flatpickr/dist/themes/light.css";
import { forwardRef } from "react";
import { useDateTimeInputLocaleContext } from "./DateTimeInputLocaleContext";

export type DateTimeInputProps = Omit<DLDateTimeInputProps, "locale">;
export type DateTimeInputMode = DLDateTimeInputMode;

export const DateTimeInput = forwardRef((props: DateTimeInputProps, ref) => {
    const { locale } = useDateTimeInputLocaleContext();

    return <DLDateTimeInput locale={locale} ref={ref} {...props} />;
});
