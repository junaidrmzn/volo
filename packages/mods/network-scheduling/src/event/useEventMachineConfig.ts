import type { Event } from "@voloiq-typescript-api/network-scheduling-types";
import { useMemo } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useGetAircraftsQuery } from "@voloiq/network-scheduling-management-api/v1";
import { ResourceMachineConfigBuilder } from "@voloiq/resource-overview";
import { useEventBulkEdit } from "./bulk-edit/useEventBulkEdit";
import { useGetAllFilterProperties } from "./filters/useGetAllFilterProperties";
import { useGetSortingConfig } from "./filters/useGetSortingConfig";
import { useEventTranslation } from "./translations/useEventTranslation";
import { useEventOverviewPage } from "./useEventOverviewPage";

export const useEventMachineConfig = () => {
    const { t } = useEventTranslation();
    const { fetchAllEvents, fetchEvent, deleteEvent, bulkEditEvent } = useEventOverviewPage();
    const { getAllFilterProperties } = useGetAllFilterProperties();
    const { getSortingConfig } = useGetSortingConfig();
    const { eventBulkEditSchema } = useEventBulkEdit();

    const { aircrafts, isLoading: isLoadingAircraft } = useGetAircraftsQuery();
    const canCreate = useIsAuthorizedTo(["create"], ["Event"]);
    const canRead = useIsAuthorizedTo(["read"], ["Event"]);
    const canUpdate = useIsAuthorizedTo(["update"], ["Event"]);
    const canDelete = useIsAuthorizedTo(["delete"], ["Event"]);

    return useMemo(() => {
        if (isLoadingAircraft) return { isLoadingAircraft };
        const config = new ResourceMachineConfigBuilder({
            canCreate,
            canRead,
            canUpdate,
            canDelete,
            getResourceName: () => t("overview.title-primary"),
        })
            .withList<Event>({
                fetchAllResources: fetchAllEvents,
                getListItemName: () => t("overview.title-secondary"),
                getListTitle: () => t("model.name"),
                getModuleTitle: () => t("overview.title-primary"),
                pageSize: 10,
                getListAriaLabel: () => t("overview.title-primary"),
            })
            .withPreview<Event>({
                fetchPreviewResource: fetchEvent,
                getPreviewTitle: () => t("preview.heading"),
            })
            .withAdd()
            .withDetails<Event>({
                fetchDetailsResource: fetchEvent,
                getDetailsTitle: (event) =>
                    t("detail.heading", {
                        name: event.name,
                    }),
                checkIfResourceIsEditable: () => ({
                    isResourceEditable: canUpdate,
                }),
            })
            .withEdit()
            .withBulkEdit<Event>({
                getBulkEditTitle: () => t("overview.title-secondary"),
                bulkEditResource: bulkEditEvent,
                schema: eventBulkEditSchema,
            })
            .withDelete<Event>({
                deleteResource: deleteEvent,
                getDeleteTexts: (event) => ({
                    confirmationModal: {
                        headerText: t("delete.modal-header", { entityName: "event" }),
                        bodyText: t("delete.modal-body", { eventName: event.name }),
                    },
                }),
            })
            .withFilterBar({ getAllFilters: () => getAllFilterProperties({ aircrafts }), getSortingConfig })
            .build();
        return { config, isLoadingAircraft };
    }, [
        aircrafts,
        canCreate,
        canDelete,
        canRead,
        canUpdate,
        deleteEvent,
        fetchAllEvents,
        fetchEvent,
        getAllFilterProperties,
        getSortingConfig,
        isLoadingAircraft,
        t,
    ]);
};
