import { format, intervalToDuration } from "date-fns";
import { match, not } from "ts-pattern";
import { toLocalDate } from "@voloiq/utils";

type FormatDurationOptions = {
    start?: Date;
    end?: Date;
    useUtcTime?: boolean;
};

const transformToUtc = (options: FormatDurationOptions) => {
    const { start, end } = options;
    return {
        start: start ? toLocalDate(start) : undefined,
        end: end ? toLocalDate(end) : undefined,
    };
};

const getReadableDate = (date: Date) => {
    return `${format(date, "yyyy-MM-dd, HH:mm")}`;
};

const getReadableDuration = (start: Date, end: Date, utcPostfix: string) =>
    match({ ...intervalToDuration({ start, end }) })
        .with({ days: 0 }, () => `${getReadableDate(start)} - ${format(end, "HH:mm")} ${utcPostfix}`)
        .otherwise(() => `${getReadableDate(start)} - ${getReadableDate(end)} ${utcPostfix}`);

export const getReadableRange = (options: FormatDurationOptions) => {
    const { useUtcTime } = options;
    const { start, end } = useUtcTime ? transformToUtc(options) : options;
    const utcPostfix = useUtcTime ? "UTC" : "";

    return match({ start, end })
        .with({ start: undefined, end: undefined }, () => "* - *")
        .with({ start: undefined, end: not(undefined) }, (data) => `* - ${getReadableDate(data.end)} ${utcPostfix}`)
        .with(
            { start: not(undefined), end: undefined },
            (data) => `${[getReadableDate(data.start), utcPostfix].filter(Boolean).join(" ")} - *`
        )
        .with({ start: not(undefined), end: not(undefined) }, (data) =>
            getReadableDuration(data.start, data.end, utcPostfix)
        )
        .exhaustive()
        .trim();
};
