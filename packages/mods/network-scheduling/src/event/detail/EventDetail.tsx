import { VStack } from "@volocopter/design-library-react";
import type { Event } from "@voloiq-typescript-api/network-scheduling-types";
import { DetailItem } from "@voloiq/aircraft-management";
import { useFormatDateTime } from "@voloiq/dates";
import { constructAircraftSummary } from "../constructAircraftSummary";
import { useEventTranslation } from "../translations/useEventTranslation";

export type Eventdetailstype = {
    event: Event;
    onRedirectToResource: (url: string) => void;
};

export const EventDetail = (props: Eventdetailstype) => {
    const { event: eventData, onRedirectToResource } = props;
    const { t: eventTranslation } = useEventTranslation();
    const { formatDateTime } = useFormatDateTime();

    return (
        <VStack padding="6" alignItems="flex-start" fontWeight="400" fontSize="16">
            <DetailItem label={eventTranslation("model.name")} value={eventData?.name} />
            <DetailItem label={eventTranslation("model.description")} value={eventData?.description} />
            <DetailItem
                label={eventTranslation("model.startDate")}
                value={eventData ? formatDateTime(eventData.startDate) : ""}
            />
            <DetailItem
                label={eventTranslation("model.endDate")}
                value={eventData?.endDate ? formatDateTime(eventData.endDate) : ""}
            />
            <DetailItem label={eventTranslation("model.blockedForMission")} value={eventData?.isBlockedForMission} />
            <DetailItem
                label={eventTranslation("model.aircraft")}
                value={constructAircraftSummary(eventData, eventTranslation("model.no assignment"))}
                {...(eventData?.aircraft?.aircraftId && {
                    onRedirectToResource: () =>
                        onRedirectToResource(
                            `/aircraft-management/aircraft/overview/${eventData?.aircraft?.aircraftId}`
                        ),
                })}
            />
        </VStack>
    );
};
