import { HStack, Text } from "@volocopter/design-library-react";
import { DateTimeDisplay } from "@voloiq/date-time";

export type DateTimeDisplayWithLabelProps = {
    value: string | Date;
    label?: React.ReactNode;
};

export const DateTimeDisplayWithLabel = (props: DateTimeDisplayWithLabelProps) => {
    const { label, value } = props;
    return (
        <HStack>
            {label && <Text fontWeight="bold">{label}: </Text>}
            <DateTimeDisplay
                mode="datetime"
                value={value}
                withUtcTime={false}
                showTimeZone={false}
                showTooltip={false}
            />
        </HStack>
    );
};
