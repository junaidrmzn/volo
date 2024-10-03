import { useTimeZone } from "../context";
import { DATE, DATE_TIME, TIME, UTC, getDateTimeFormatters } from "../utils";
import { LocalTimeDisplay } from "./LocalTimeDisplay";
import { TextWithLabelAndSup } from "./TextWithLabelAndSup";

type DateTimeMode = typeof DATE_TIME | typeof DATE | typeof TIME;
export type DateTimeDisplayProps = {
    mode: DateTimeMode;
    label?: string;
    value?: string | Date;
    noValueText?: string;
    timeZone?: string;
    withUtcTime?: boolean;
    showTimeZone?: boolean;
    showTooltip?: boolean;
};

export const DateTimeDisplay = (props: DateTimeDisplayProps) => {
    const {
        mode,
        label,
        value,
        noValueText,
        timeZone: specifiedTimeZone,
        withUtcTime = mode === DATE_TIME,
        showTimeZone = mode === DATE_TIME,
        showTooltip = mode === DATE_TIME && label,
    } = props;

    const defaultTimeZone = useTimeZone();
    const timeZone = specifiedTimeZone ?? defaultTimeZone;

    const {
        formatDateTime,
        formatDate,
        formatTime,
        formatUtcDateTime,
        formatUtcDate,
        formatUtcTime,
        formatTimeZoneShortName,
    } = getDateTimeFormatters(timeZone);

    const getDate = () => {
        let date;
        if (value) {
            if (mode === DATE_TIME) date = withUtcTime ? formatUtcDateTime(value) : formatDateTime(value);
            if (mode === DATE) date = withUtcTime ? formatUtcDate(value) : formatDate(value);
            if (mode === TIME) date = withUtcTime ? formatUtcTime(value) : formatTime(value);
        }
        return date;
    };

    const getTimeZoneShortName = () => {
        let timeZoneShortName;
        if (value) {
            timeZoneShortName = withUtcTime ? UTC : formatTimeZoneShortName(value);
        }
        return timeZoneShortName;
    };

    const date = getDate();
    const timeZoneShortName = showTimeZone ? getTimeZoneShortName() : "";

    return (
        <TextWithLabelAndSup
            label={label}
            text={date}
            sup={timeZoneShortName}
            tooltip={showTooltip && <LocalTimeDisplay value={value} />}
            noValueText={noValueText}
        />
    );
};
