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
            rowGap={0.5}
            zIndex={5}
            background={backgroundColor}
            borderRight={1}
            borderStyle="solid"
            borderColor="darkdarkBlue.200"
        >
            {labels.map((label, index) => (
                <SchedulerRowLabel
                    // There isn't really any other unique key for these items, but the array shouldn't be subject to change anyway
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    label={label}
                    schedulerRowIndex={index}
                />
            ))}
        </VStack>
    );
};
