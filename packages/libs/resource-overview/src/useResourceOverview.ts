import { useMemo } from "react";
import type { MachineConfig } from "xstate";
import { createMachine } from "xstate";
import { createAddNotificationExtension } from "./add/state-machine/addMachineBuilder";
import { useAddMachineNotifications } from "./add/useAddMachineNotifications";
import { createBulkEditNotificationExtension, useBulkEditMachineNotifications } from "./bulk-edit";
import { createDeleteNotificationExtension } from "./delete/state-machine/deleteMachineBuilder";
import { useDeleteMachineNotifications } from "./delete/useDeleteMachineNotifications";
import { createEditNotificationExtension } from "./edit/state-machine/editMachineBuilder";
import { useEditMachineNotifications } from "./edit/useEditMachineNotifications";
import { mergeWithArrays } from "./utils/mergeWithArrays";
import { useGetResourceIdFromURL } from "./utils/urlUtils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useResourceOverview = (machineConfig: MachineConfig<any, any, any>) => {
    const {
        meta: { getResourceName, getSuccessToastLabelPrefix },
        states,
    } = machineConfig;

    const addMachineNotifications = useAddMachineNotifications({
        resourceLabel: getResourceName(),
        successToastLabelPrefix: getSuccessToastLabelPrefix && getSuccessToastLabelPrefix(),
    });
    const editMachineNotifications = useEditMachineNotifications({ resourceLabel: getResourceName() });
    const bulkEditMachineNotifications = useBulkEditMachineNotifications({ resourceLabel: getResourceName() });

    let deleteSuccessBodyText;
    let deleteSuccessHeaderText;
    if (states?.delete) {
        const { deleteSuccessTexts = {} } = states.delete.meta;
        deleteSuccessBodyText = deleteSuccessTexts.successToastBodyText;
        deleteSuccessHeaderText = deleteSuccessTexts.successToastHeaderText;
    }
    const deleteMachineNotifications = useDeleteMachineNotifications({
        bodyText: deleteSuccessBodyText,
        headerText: deleteSuccessHeaderText,
        resourceLabel: getResourceName(),
    });

    const extendedMachineConfig = useMemo(() => {
        let extendedMachineConfig = { ...machineConfig };

        if (states?.add) {
            const addNotificationExtension = createAddNotificationExtension(addMachineNotifications);
            extendedMachineConfig = mergeWithArrays(extendedMachineConfig, addNotificationExtension);
        }
        if (states?.edit) {
            const editNotificationExtension = createEditNotificationExtension(editMachineNotifications);
            extendedMachineConfig = mergeWithArrays(extendedMachineConfig, editNotificationExtension);
        }

        if (states?.bulk_edit) {
            const bulkEditNotificationExtension = createBulkEditNotificationExtension(bulkEditMachineNotifications);
            extendedMachineConfig = mergeWithArrays(extendedMachineConfig, bulkEditNotificationExtension);
        }

        if (states?.delete) {
            const deleteNotificationExtension = createDeleteNotificationExtension(deleteMachineNotifications);
            extendedMachineConfig = mergeWithArrays(extendedMachineConfig, deleteNotificationExtension);
        }

        return extendedMachineConfig;
    }, [
        addMachineNotifications,
        deleteMachineNotifications,
        editMachineNotifications,
        bulkEditMachineNotifications,
        machineConfig,
        states,
    ]);

    // If a resource id is present in the URL, we want to display the details page.
    // This is a temporary measure until we have proper routing in the resource overview.
    const resourceId = useGetResourceIdFromURL();
    if (resourceId && extendedMachineConfig?.states?.details) {
        extendedMachineConfig.states.details.initial = "loading";
        extendedMachineConfig.context.selectedResourceId = resourceId;
    }

    const stateMachine = useMemo(() => {
        return createMachine(extendedMachineConfig);
    }, [extendedMachineConfig]);

    return { stateMachine };
};
