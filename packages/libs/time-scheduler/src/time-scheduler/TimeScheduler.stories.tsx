import type { Meta, StoryFn } from "@storybook/react";
import type { BoxProps } from "@volocopter/design-library-react";
import { Box } from "@volocopter/design-library-react";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { add } from "../time-utils/add";
import type { TimeSchedulerTranslations } from "./TimeScheduler";
import { TimeScheduler, TimeSchedulerRow } from "./TimeScheduler";
import { TimeSchedulerRowLabel } from "./TimeSchedulerWithoutProviders";
import { TimeSchedulerRowContent } from "./items/TimeSchedulerRowContent";
import { TimeSchedulerRowItem } from "./items/TimeSchedulerRowItem";

const meta: Meta = {
    title: "Time Scheduler/Time Scheduler",
    component: TimeScheduler,
    decorators: [
        (Story) => (
            <LocalFeatureFlagsProvider
                configurationOverride={{
                    timeGridStickyHeader: {
                        enabled: false,
                    },
                }}
            >
                <Story />
            </LocalFeatureFlagsProvider>
        ),
    ],
    parameters: {
        layout: "fullscreen",
    },
};
export default meta;

const ItemBox = (props: BoxProps) => {
    return (
        <Box bg="gray.100" p={1} whiteSpace="nowrap" width="100%" color="darkBlue.900" borderRadius="sm" {...props} />
    );
};

const SmallItem = (props: { itemCount: number }) => {
    const { itemCount } = props;

    return (
        <Box
            bg="gray.200"
            p={1}
            whiteSpace="nowrap"
            width="100%"
            color="darkBlue.900"
            borderRadius="sm"
            position="relative"
            _before={{
                content: `""`,
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: "10px",
                background: "gray.300",
            }}
        >
            <Box
                background="gray.100"
                position="absolute"
                top={-2}
                right={-2}
                borderRadius="full"
                fontWeight="bold"
                px={1}
                fontSize="sm"
            >
                {itemCount}
            </Box>
            &nbsp;
        </Box>
    );
};

const translations: TimeSchedulerTranslations = {
    scrollLeftButtonLabel: "Scroll left",
    scrollRightButtonLabel: "Scroll right",
    zoomInButtonLabel: "Zoom in",
    zoomOutButtonLabel: "Zoom out",
    closeButton: "close",
    title: "Go To Date",
    go: "Go",
};

export const Basic: StoryFn = () => (
    <TimeScheduler
        // eslint-disable-next-line no-console
        onRangeUpdate={(range, previousRange) => console.log({ range, previousRange })}
        translations={translations}
        config={{
            renderExpandedItems: (items) => <SmallItem itemCount={items.length} />,
        }}
    >
        {Array.from({ length: 20 }).map(() => (
            <TimeSchedulerRow>
                <TimeSchedulerRowLabel>
                    <Box p={1} background="white" boxSize="full">
                        VoloCity
                    </Box>
                </TimeSchedulerRowLabel>
                <TimeSchedulerRowContent>
                    {Array.from({ length: 20 }).map((_, index) => (
                        <TimeSchedulerRowItem
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            id={`${index + 20}`}
                            startDate={add(new Date(), { hours: 1 + index * 10 })}
                            endDate={add(new Date(), { hours: (index + 1) * 10 })}
                        >
                            <ItemBox>Trade Fair</ItemBox>
                        </TimeSchedulerRowItem>
                    ))}
                </TimeSchedulerRowContent>
            </TimeSchedulerRow>
        ))}
    </TimeScheduler>
);
export const WithoutLabel: StoryFn = () => (
    <TimeScheduler
        // eslint-disable-next-line no-console
        onRangeUpdate={(range, previousRange) => console.log({ range, previousRange })}
        translations={translations}
        config={{
            renderExpandedItems: (items) => <SmallItem itemCount={items.length} />,
        }}
    >
        <TimeSchedulerRow>
            <TimeSchedulerRowContent>
                <TimeSchedulerRowItem
                    id="1"
                    startDate={add(new Date(), { days: 6 })}
                    endDate={add(new Date(), { days: 9 })}
                >
                    <ItemBox>Trade Fair (BRU)</ItemBox>
                </TimeSchedulerRowItem>
                <TimeSchedulerRowItem
                    id="2"
                    startDate={add(new Date(), { days: 1 })}
                    endDate={add(new Date(), { days: 3 })}
                >
                    <ItemBox>Trade Fair (MUC)</ItemBox>
                </TimeSchedulerRowItem>
                <TimeSchedulerRowItem
                    id="3"
                    startDate={add(new Date(), { days: 1 })}
                    endDate={add(new Date(), { days: 7 })}
                >
                    <ItemBox>Trade Fair (HAM)</ItemBox>
                </TimeSchedulerRowItem>
                <TimeSchedulerRowItem
                    id="4"
                    startDate={add(new Date(), { days: 2 })}
                    endDate={add(new Date(), { days: 4 })}
                >
                    <ItemBox>Exhibition (BRU)</ItemBox>
                </TimeSchedulerRowItem>
                <TimeSchedulerRowItem
                    id="5"
                    startDate={add(new Date(), { days: 4 })}
                    endDate={add(new Date(), { days: 7 })}
                >
                    <ItemBox>Exhibition (MUC)</ItemBox>
                </TimeSchedulerRowItem>
                <TimeSchedulerRowItem id="6" startDate={new Date()} endDate={add(new Date(), { days: 4 })}>
                    <ItemBox>Exhibition (HAM)</ItemBox>
                </TimeSchedulerRowItem>
                <TimeSchedulerRowItem id="7" startDate={new Date()} endDate={add(new Date(), { days: 3 })}>
                    <ItemBox>Demo Flight</ItemBox>
                </TimeSchedulerRowItem>
            </TimeSchedulerRowContent>
        </TimeSchedulerRow>
    </TimeScheduler>
);

export const WithGroups: StoryFn = () => (
    <TimeScheduler
        // eslint-disable-next-line no-console
        onRangeUpdate={(range, previousRange) => console.log({ range, previousRange })}
        translations={translations}
        config={{
            renderExpandedItems: (items) => <SmallItem itemCount={items.length} />,
        }}
    >
        <TimeSchedulerRow>
            <TimeSchedulerRowLabel>
                <Box p={1} background="white" boxSize="full">
                    VoloCity
                </Box>
            </TimeSchedulerRowLabel>
            <TimeSchedulerRowContent>
                {Array.from({ length: 20 }).map((_, index) => (
                    <TimeSchedulerRowItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={`blue-${index}`}
                        startDate={add(new Date(), { hours: index })}
                        endDate={add(new Date(), { hours: index + 1 })}
                        group="blue"
                    >
                        <ItemBox bg="darkBlue.200">Item {index}</ItemBox>
                    </TimeSchedulerRowItem>
                ))}
                {Array.from({ length: 20 }).map((_, index) => (
                    <TimeSchedulerRowItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={`coral-${index}`}
                        startDate={add(new Date(), { hours: index, minutes: 1 })}
                        endDate={add(new Date(), { hours: index + 1, minutes: -1 })}
                        group="coral"
                    >
                        <ItemBox bg="coral.200">Item {index}</ItemBox>
                    </TimeSchedulerRowItem>
                ))}
            </TimeSchedulerRowContent>
        </TimeSchedulerRow>
    </TimeScheduler>
);

export const WithPersistence: StoryFn = () => (
    <TimeScheduler
        translations={translations}
        config={{
            renderExpandedItems: (items) => <SmallItem itemCount={items.length} />,
            persistSettings: true,
            identifier: "persistence-story",
        }}
    >
        <TimeSchedulerRow>
            <TimeSchedulerRowLabel>
                <Box p={1} background="white" boxSize="full">
                    VoloCity
                </Box>
            </TimeSchedulerRowLabel>
            <TimeSchedulerRowContent>
                {Array.from({ length: 20 }).map((_, index) => (
                    <TimeSchedulerRowItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={`blue-${index}`}
                        startDate={add(new Date(), { hours: index })}
                        endDate={add(new Date(), { hours: index + 1 })}
                        group="blue"
                    >
                        <ItemBox bg="darkBlue.200">Item {index}</ItemBox>
                    </TimeSchedulerRowItem>
                ))}
            </TimeSchedulerRowContent>
        </TimeSchedulerRow>
    </TimeScheduler>
);

export const WithManyRows: StoryFn = () => (
    <TimeScheduler
        translations={translations}
        config={{
            renderExpandedItems: (items) => <SmallItem itemCount={items.length} />,
            persistSettings: true,
            identifier: "persistence-story",
        }}
    >
        {Array.from({ length: 20 }).map((_, rowIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <TimeSchedulerRow key={rowIndex}>
                <TimeSchedulerRowLabel>
                    <Box p={1} background="white" boxSize="full" width="100px">
                        VoloCity {rowIndex}
                    </Box>
                </TimeSchedulerRowLabel>
            </TimeSchedulerRow>
        ))}
    </TimeScheduler>
);
