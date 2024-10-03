/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Battery, Esu, EsuIdLists } from "@voloiq-typescript-api/battery-management-types";
import { useAssignEsus } from "../../api-hooks/useBatteryService";
import { useErrorToast } from "../../hooks/useErrorToast";
import { useSuccessToast } from "../../hooks/useSuccessToast";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export const useHandleEsuAssign = (
    batteryId: string | undefined,
    getAssignedEsus: () => Promise<Esu[] | undefined>,
    getAssignableEsus: () => Promise<Esu[] | undefined>,
    refetchData: () => Promise<Battery | undefined>
) => {
    const selectedIdsToAssign: EsuIdLists = { ids: [] };
    const { sendRequest: assignEsus } = useAssignEsus(batteryId!);
    const { onSuccess } = useSuccessToast(false);
    const { onError } = useErrorToast();
    const { t } = useResourcesTranslation();

    const handleEsuAssign = () =>
        assignEsus({
            data: selectedIdsToAssign,
        })
            .then((response) => {
                if (response) {
                    const multipleEsuAssignment = selectedIdsToAssign.ids!.length > 1;
                    const singleEsuAssignment = selectedIdsToAssign.ids!.length === 1;
                    if (multipleEsuAssignment) {
                        onSuccess(t("battery.edit.assign multiple success"));
                    }
                    if (singleEsuAssignment) {
                        onSuccess(t("battery.edit.assign success"));
                    }
                    refetchData();
                    getAssignableEsus();
                    getAssignedEsus();
                }
            })
            .catch((error) => {
                if (error.response && error.response.data.error) {
                    onError(error.response.data.error);
                }
            });
    return { handleEsuAssign, selectedIdsToAssign };
};
