import type { Meta, StoryFn } from "@storybook/react";
import type { BoxProps } from "@volocopter/design-library-react";
import { Box } from "@volocopter/design-library-react";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { TimeSchedulerRowContent } from "..";
import { add } from "../time-utils/add";
import type { TimeSchedulerTranslations } from "./TimeScheduler";
import { TimeSchedulerNew, TimeSchedulerRowNew } from "./TimeScheduler";
import { TimeSchedulerRowLabelNew } from "./TimeSchedulerWithoutProviders";
import { TimeSchedulerRowItemNew } from "./items/TimeSchedulerRowItem";

const meta: Meta = {
    title: "Time Scheduler/Time Scheduler Old",
    component: TimeSchedulerNew,
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
    <TimeSchedulerNew
        // eslint-disable-next-line no-console
        onRangeUpdate={(range, previousRange) => console.log({ range, previousRange })}
        translations={translations}
        config={{
            renderExpandedItems: (items) => <SmallItem itemCount={items.length} />,
        }}
    >
        <TimeSchedulerRowNew>
            <TimeSchedulerRowLabelNew>
                <Box p={1} background="white" boxSize="full" width="100px">
                    VoloCity
                </Box>
            </TimeSchedulerRowLabelNew>
            <TimeSchedulerRowContent>
                {Array.from({ length: 20 }).map((_, index) => (
                    <TimeSchedulerRowItemNew
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={`${index}`}
                        startDate={add(new Date(), { days: 1, hours: index })}
                        endDate={add(new Date(), { days: 1, hours: index, minutes: 1 })}
                    >
                        <ItemBox>Item {index}</ItemBox>
                    </TimeSchedulerRowItemNew>
                ))}
                <TimeSchedulerRowItemNew
                    id="Foo"
                    startDate={add(new Date(), { days: 2, minutes: 1 })}
                    endDate={add(new Date(), { days: 2, minutes: 2 })}
                >
                    <ItemBox>Item</ItemBox>
                </TimeSchedulerRowItemNew>
                {Array.from({ length: 20 }).map((_, index) => (
                    <TimeSchedulerRowItemNew
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={`${index + 20}`}
                        startDate={add(new Date(), { days: 3, hours: 1 + index * 10 })}
                        endDate={add(new Date(), { days: 3, hours: (index + 1) * 10 })}
                    >
                        <ItemBox>Trade Fair</ItemBox>
                    </TimeSchedulerRowItemNew>
                ))}
            </TimeSchedulerRowContent>
        </TimeSchedulerRowNew>
        <TimeSchedulerRowNew>
            <TimeSchedulerRowLabelNew>
                <Box p={1} background="white" boxSize="full" width="100px">
                    VoloCity
                </Box>
            </TimeSchedulerRowLabelNew>
            <TimeSchedulerRowContent>
                {Array.from({ length: 20 }).map((_, index) => (
                    <TimeSchedulerRowItemNew
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={`${index}`}
                        startDate={add(new Date(), { days: 1, hours: index })}
                        endDate={add(new Date(), { days: 1, hours: index, minutes: 1 })}
                    >
                        <ItemBox>Item {index}</ItemBox>
                    </TimeSchedulerRowItemNew>
                ))}
                <TimeSchedulerRowItemNew
                    id="Foo"
                    startDate={add(new Date(), { days: 2, minutes: 1 })}
                    endDate={add(new Date(), { days: 2, minutes: 2 })}
                >
                    <ItemBox>Item</ItemBox>
                </TimeSchedulerRowItemNew>
                {Array.from({ length: 20 }).map((_, index) => (
                    <TimeSchedulerRowItemNew
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={`${index + 20}`}
                        startDate={add(new Date(), { days: 3, hours: 1 + index * 10 })}
                        endDate={add(new Date(), { days: 3, hours: (index + 1) * 10 })}
                    >
                        <ItemBox>Trade Fair</ItemBox>
                    </TimeSchedulerRowItemNew>
                ))}
            </TimeSchedulerRowContent>
        </TimeSchedulerRowNew>
    </TimeSchedulerNew>
);
export const WithoutLabel: StoryFn = () => (
    <TimeSchedulerNew
        // eslint-disable-next-line no-console
        onRangeUpdate={(range, previousRange) => console.log({ range, previousRange })}
        translations={translations}
        config={{
            renderExpandedItems: (items) => <SmallItem itemCount={items.length} />,
        }}
    >
        <TimeSchedulerRowNew>
            <TimeSchedulerRowContent>
                <TimeSchedulerRowItemNew
                    id="1"
                    startDate={add(new Date(), { days: 6 })}
                    endDate={add(new Date(), { days: 9 })}
                >
                    <ItemBox>Trade Fair (BRU)</ItemBox>
                </TimeSchedulerRowItemNew>
                <TimeSchedulerRowItemNew
                    id="2"
                    startDate={add(new Date(), { days: 1 })}
                    endDate={add(new Date(), { days: 3 })}
                >
                    <ItemBox>Trade Fair (MUC)</ItemBox>
                </TimeSchedulerRowItemNew>
                <TimeSchedulerRowItemNew
                    id="3"
                    startDate={add(new Date(), { days: 1 })}
                    endDate={add(new Date(), { days: 7 })}
                >
                    <ItemBox>Trade Fair (HAM)</ItemBox>
                </TimeSchedulerRowItemNew>
                <TimeSchedulerRowItemNew
                    id="4"
                    startDate={add(new Date(), { days: 2 })}
                    endDate={add(new Date(), { days: 4 })}
                >
                    <ItemBox>Exhibition (BRU)</ItemBox>
                </TimeSchedulerRowItemNew>
                <TimeSchedulerRowItemNew
                    id="5"
                    startDate={add(new Date(), { days: 4 })}
                    endDate={add(new Date(), { days: 7 })}
                >
                    <ItemBox>Exhibition (MUC)</ItemBox>
                </TimeSchedulerRowItemNew>
                <TimeSchedulerRowItemNew id="6" startDate={new Date()} endDate={add(new Date(), { days: 4 })}>
                    <ItemBox>Exhibition (HAM)</ItemBox>
                </TimeSchedulerRowItemNew>
                <TimeSchedulerRowItemNew id="7" startDate={new Date()} endDate={add(new Date(), { days: 3 })}>
                    <ItemBox>Demo Flight</ItemBox>
                </TimeSchedulerRowItemNew>
            </TimeSchedulerRowContent>
        </TimeSchedulerRowNew>
    </TimeSchedulerNew>
);

export const WithGroups: StoryFn = () => (
    <TimeSchedulerNew
        // eslint-disable-next-line no-console
        onRangeUpdate={(range, previousRange) => console.log({ range, previousRange })}
        translations={translations}
        config={{
            renderExpandedItems: (items) => <SmallItem itemCount={items.length} />,
        }}
    >
        <TimeSchedulerRowNew>
            <TimeSchedulerRowLabelNew>
                <Box p={1} background="white" boxSize="full" width="100px">
                    VoloCity
                </Box>
            </TimeSchedulerRowLabelNew>
            <TimeSchedulerRowContent>
                {Array.from({ length: 20 }).map((_, index) => (
                    <TimeSchedulerRowItemNew
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={`blue-${index}`}
                        startDate={add(new Date(), { hours: index })}
                        endDate={add(new Date(), { hours: index + 1 })}
                        group="blue"
                    >
                        <ItemBox bg="darkBlue.200">Item {index}</ItemBox>
                    </TimeSchedulerRowItemNew>
                ))}
                {Array.from({ length: 20 }).map((_, index) => (
                    <TimeSchedulerRowItemNew
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={`coral-${index}`}
                        startDate={add(new Date(), { hours: index, minutes: 1 })}
                        endDate={add(new Date(), { hours: index + 1, minutes: -1 })}
                        group="coral"
                    >
                        <ItemBox bg="coral.200">Item {index}</ItemBox>
                    </TimeSchedulerRowItemNew>
                ))}
            </TimeSchedulerRowContent>
        </TimeSchedulerRowNew>
    </TimeSchedulerNew>
);

export const WithPersistence: StoryFn = () => (
    <TimeSchedulerNew
        translations={translations}
        config={{
            renderExpandedItems: (items) => <SmallItem itemCount={items.length} />,
            persistSettings: true,
            identifier: "persistence-story",
        }}
    >
        <TimeSchedulerRowNew>
            <TimeSchedulerRowLabelNew>
                <Box p={1} background="white" boxSize="full" width="100px">
                    VoloCity
                </Box>
            </TimeSchedulerRowLabelNew>
            <TimeSchedulerRowContent>
                {Array.from({ length: 20 }).map((_, index) => (
                    <TimeSchedulerRowItemNew
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        id={`blue-${index}`}
                        startDate={add(new Date(), { hours: index })}
                        endDate={add(new Date(), { hours: index + 1 })}
                        group="blue"
                    >
                        <ItemBox bg="darkBlue.200">Item {index}</ItemBox>
                    </TimeSchedulerRowItemNew>
                ))}
            </TimeSchedulerRowContent>
        </TimeSchedulerRowNew>
    </TimeSchedulerNew>
);

export const WithManyRows: StoryFn = () => (
    <TimeSchedulerNew
        translations={translations}
        config={{
            renderExpandedItems: (items) => <SmallItem itemCount={items.length} />,
            persistSettings: true,
            identifier: "persistence-story",
        }}
    >
        {Array.from({ length: 20 }).map((_, rowIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <TimeSchedulerRowNew key={rowIndex}>
                <TimeSchedulerRowLabelNew>
                    <Box p={1} background="white" boxSize="full" width="100px">
                        VoloCity {rowIndex}
                    </Box>
                </TimeSchedulerRowLabelNew>
            </TimeSchedulerRowNew>
        ))}
    </TimeSchedulerNew>
);
