import { useTimeZone } from "../context";
import { getDateTimeFormatters } from "../utils";
import { TextWithLabelAndSup } from "./TextWithLabelAndSup";

export type LocalTimeDisplayProps = {
    label?: string;
    value?: string | Date;
    noValueText?: string;
};

export const LocalTimeDisplay = (props: LocalTimeDisplayProps) => {
    const { label, value, noValueText } = props;

    const timeZone = useTimeZone();
    const { formatTime, formatLocalTimeZoneShortName } = getDateTimeFormatters(timeZone);
    const date = value && formatTime(value);
    const timeZoneShortName = value && formatLocalTimeZoneShortName(value);

    return <TextWithLabelAndSup label={label} text={date} sup={timeZoneShortName} noValueText={noValueText} />;
};
