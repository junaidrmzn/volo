import type { Event } from "@voloiq-typescript-api/network-scheduling-types";
import type { CardListItemProps } from "@voloiq/card-list-item";
import { LoadingPage } from "@voloiq/network-scheduling-management-components";
import { BulkEditForm, RenderEditHandlerProps, ResourceOverview } from "@voloiq/resource-overview";
import { useNavigate } from "@voloiq/routing";
import { CreateEvent } from "./create/CreateEvent";
import { EventDetail } from "./detail/EventDetail";
import { EditEvent } from "./edit/EditEvent";
import { EventListItem } from "./list/EventListItem";
import { EventPreview } from "./preview/EventPreview";
import { useEventMachineConfig } from "./useEventMachineConfig";

export const EventOverview = () => {
    const navigation = useNavigate();

    const { config, isLoadingAircraft } = useEventMachineConfig();
    if (isLoadingAircraft) return <LoadingPage />;

    const redirectToResource = (url: string) => {
        navigation(url);
    };

    return (
        <ResourceOverview<Event> machineConfig={config}>
            <ResourceOverview.ListItem>
                {(event: Event, cardListItemProps: CardListItemProps) => (
                    <EventListItem event={event} {...cardListItemProps} />
                )}
            </ResourceOverview.ListItem>
            <ResourceOverview.Preview>
                {(event: Event) => <EventPreview event={event} onRedirectToResource={redirectToResource} />}
            </ResourceOverview.Preview>
            <ResourceOverview.Details>
                {(event: Event) => <EventDetail event={event} onRedirectToResource={redirectToResource} />}
            </ResourceOverview.Details>
            <ResourceOverview.Add>{CreateEvent}</ResourceOverview.Add>
            <ResourceOverview.Edit>
                {(props: RenderEditHandlerProps<Event>) => <EditEvent {...props} />}
            </ResourceOverview.Edit>
            <ResourceOverview.BulkEdit>{BulkEditForm}</ResourceOverview.BulkEdit>
        </ResourceOverview>
    );
};
