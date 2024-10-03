import { Text, VStack } from "@volocopter/design-library-react";
import type { TimeSchedulerTranslations } from "@voloiq/time-scheduler";
import {
    TimeSchedulerNew,
    TimeSchedulerRowContentNew,
    TimeSchedulerRowItemNew,
    TimeSchedulerRowLabelNew,
    TimeSchedulerRowNew,
} from "@voloiq/time-scheduler";
import type { Pad } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";
import { OnRangeUpdateCallback } from "../pads-context/useGetPad";
import { ExpandedEventItem } from "./ExpandedEventItem";
import { PadAvailabilityCard } from "./PadAvailabilityCard";

type PadTimeSchedulerProps = {
    pads: Pad[];
    onRangeUpdate: OnRangeUpdateCallback;
};

export const PadTimeScheduler = (props: PadTimeSchedulerProps) => {
    const { pads, onRangeUpdate } = props;
    const { t } = useVertiportTranslation();

    const translations: TimeSchedulerTranslations = {
        scrollLeftButtonLabel: t("fatoStand.timeSchedular.scrollLeft"),
        scrollRightButtonLabel: t("fatoStand.timeSchedular.scrollRight"),
        zoomInButtonLabel: t("fatoStand.timeSchedular.zoomIn"),
        zoomOutButtonLabel: t("fatoStand.timeSchedular.zoomOut"),
        closeButton: t("fatoStand.timeSchedular.closeButton"),
        title: t("fatoStand.timeSchedular.title"),
        go: t("fatoStand.timeSchedular.go"),
    };

    return (
        <TimeSchedulerNew
            translations={translations}
            config={{
                renderExpandedItems: (items) => <ExpandedEventItem itemCount={items.length} />,
                persistSettings: true,
                identifier: "pad-availability",
            }}
            onRangeUpdate={onRangeUpdate}
        >
            {pads &&
                pads.map((pad) => {
                    const { id, padKey, events } = pad;
                    return (
                        <TimeSchedulerRowNew key={id}>
                            <TimeSchedulerRowLabelNew>
                                <VStack m={3}>
                                    <Text fontSize="md" lineHeight="short" fontWeight="bold">
                                        {padKey}
                                    </Text>
                                </VStack>
                            </TimeSchedulerRowLabelNew>
                            <TimeSchedulerRowContentNew>
                                {events &&
                                    events.map((event) => (
                                        <TimeSchedulerRowItemNew
                                            key={event.id}
                                            id={event.id}
                                            startDate={new Date(event.startTime)}
                                            endDate={new Date(event.endTime)}
                                            group="event"
                                        >
                                            <PadAvailabilityCard event={event} pad={pad} />
                                        </TimeSchedulerRowItemNew>
                                    ))}
                            </TimeSchedulerRowContentNew>
                        </TimeSchedulerRowNew>
                    );
                })}
        </TimeSchedulerNew>
    );
};
