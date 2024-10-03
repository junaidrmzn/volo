import { HStack, Icon } from "@volocopter/design-library-react";
import { DateTimeDisplay } from "@voloiq/date-time";
import { DateTimeDisplayWithLabel } from "../date-time-display-with-label/DateTimeDisplayWithLabel";

export type DateTimeRangeDisplayProps = {
    startDate: string | Date;
    endDate: string | Date;
    label?: React.ReactNode;
};

export const DateTimeRangeDisplay = (props: DateTimeRangeDisplayProps) => {
    const { startDate, endDate, label } = props;
    return (
        <HStack>
            <DateTimeDisplayWithLabel label={label} value={startDate} />
            <Icon aria-label="minus" icon="minus" size={3} />
            <DateTimeDisplay
                mode="datetime"
                value={endDate}
                withUtcTime={false}
                showTimeZone={false}
                showTooltip={false}
            />
        </HStack>
    );
};
