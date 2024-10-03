import { Text, VStack } from "@volocopter/design-library-react";
import type { TimeSchedulerTranslations } from "@voloiq/time-scheduler";
import {
    TimeScheduler,
    TimeSchedulerRow,
    TimeSchedulerRowContent,
    TimeSchedulerRowItem,
    TimeSchedulerRowLabel,
} from "@voloiq/time-scheduler";
import type { Pad } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../../../translations/useVertiportTranslation";
import { ExpandedEventItem } from "./ExpandedEventItem";
import { PadAvailabilityCard } from "./PadAvailabilityCard";

type PadTimeSchedulerOldProps = {
    pads: Pad[];
};

export const PadTimeSchedulerOld = (props: PadTimeSchedulerOldProps) => {
    const { pads } = props;
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
        <TimeScheduler
            translations={translations}
            config={{
                renderExpandedItems: (items) => <ExpandedEventItem itemCount={items.length} />,
                persistSettings: true,
                identifier: "pad-availability",
            }}
        >
            {pads &&
                pads.map((pad) => {
                    const { id, padKey, events } = pad;
                    return (
                        <TimeSchedulerRow key={id}>
                            <TimeSchedulerRowLabel>
                                <VStack m={3}>
                                    <Text fontSize="md" lineHeight="short" fontWeight="bold">
                                        {padKey}
                                    </Text>
                                </VStack>
                            </TimeSchedulerRowLabel>
                            <TimeSchedulerRowContent>
                                {events &&
                                    events.map((event) => (
                                        <TimeSchedulerRowItem
                                            key={event.id}
                                            id={event.id}
                                            startDate={new Date(event.startTime)}
                                            endDate={new Date(event.endTime)}
                                            group="event"
                                        >
                                            <PadAvailabilityCard event={event} pad={pad} />
                                        </TimeSchedulerRowItem>
                                    ))}
                            </TimeSchedulerRowContent>
                        </TimeSchedulerRow>
                    );
                })}
        </TimeScheduler>
    );
};
