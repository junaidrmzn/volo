import { VStack, useColorModeValue } from "@volocopter/design-library-react";
import type { ReactNode } from "react";
import { SchedulerRowLabel } from "./SchedulerRowLabel";

export type SchedulerRowLabelContainerProps = {
    labels: ReactNode[];
};

export const SchedulerRowLabelContainer = (props: SchedulerRowLabelContainerProps) => {
    const { labels } = props;

    const backgroundColor = useColorModeValue("darkBlue.100", "darkBlue.800");

    return (
        <VStack
            spacing={0}
            zIndex={5}
            background={backgroundColor}
            borderRightWidth="1px"
            borderStyle="solid"
            borderColor="accentSecondaryMuted"
        >
            {labels.map((label, index) => (
                <SchedulerRowLabel
                    // There isn't really any other unique key for these items, but the array shouldn't be subject to change anyway
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    label={label}
                    schedulerRowIndex={index}
                    borderTopWidth="1px"
                    borderStyle="solid"
                    borderColor={index > 0 ? "accentSecondaryMuted" : "transparent"}
                />
            ))}
        </VStack>
    );
};
