/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Battery, Esu, EsuIdLists } from "@voloiq-typescript-api/battery-management-types";
import { useUnassignEsus } from "../../api-hooks/useBatteryService";
import { useErrorToast } from "../../hooks/useErrorToast";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export const useHandleEsuUnassign = (
    batteryId: string | undefined,
    getAssignedEsus: () => Promise<Esu[] | undefined>,
    getAssignableEsus: () => Promise<Esu[] | undefined>,
    refetchData: () => Promise<Battery | undefined>
) => {
    const selectedIdsToUnassign: EsuIdLists = { ids: [] };
    const { sendRequest: assignEsus } = useUnassignEsus(batteryId!);
    const { onSuccess } = useSuccessToast(false);
    const { onError } = useErrorToast();
    const { t } = useResourcesTranslation();

    const handleEsuUnassign = () =>
        assignEsus({
            data: selectedIdsToUnassign,
        })
            .then((response) => {
                if (response) {
                    const multipleEsuUnassignment = selectedIdsToUnassign.ids!.length > 1;
                    const singleEsuUnassignment = selectedIdsToUnassign.ids!.length === 1;
                    if (multipleEsuUnassignment) {
                        onSuccess(t("battery.edit.unassign multiple success"));
                    }
                    if (singleEsuUnassignment) {
                        onSuccess(t("battery.edit.unassign success"));
                    }
                    getAssignedEsus();
                    getAssignableEsus();
                    refetchData();
                }
            })
            .catch((error) => {
                if (error.response && error.response.data.error) {
                    onError(error.response.data.error);
                }
            });
    return { handleEsuUnassign, selectedIdsToUnassign };
};
