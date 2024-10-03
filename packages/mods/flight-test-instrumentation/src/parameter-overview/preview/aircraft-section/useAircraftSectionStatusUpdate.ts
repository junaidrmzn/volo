import { useToast } from "@volocopter/design-library-react";
import { useCallback } from "react";
import { usePatchParameterAircraftStatus } from "../../../libs/fti-api/useParameterStatus";
import { useFtiPreviewTranslation } from "../translations/useFtiPreviewTranslation";

export type AircraftSectionStatusUpdateProps = {
    isOpen?: boolean;
    onClose: () => void;
    onStatusChange: () => void;
    aircraftId: string;
    parameterId: string;
};

export const useAircraftSectionStatusUpdate = (options: AircraftSectionStatusUpdateProps) => {
    const { onClose, onStatusChange, parameterId, aircraftId } = options;
    const toast = useToast();
    const { t } = useFtiPreviewTranslation();

    const onSuccess = useCallback(() => {
        toast({
            title: t("successToast.title"),
            description: t("successToast.description"),
            status: "success",
        });
    }, [t, toast]);

    const onError = useCallback(() => {
        toast({
            title: t("errorToast.title"),
            description: t("errorToast.description"),
            status: "error",
        });
    }, [t, toast]);

    const { sendRequest } = usePatchParameterAircraftStatus(parameterId, aircraftId);
    const onParameterStatusUpdate = useCallback(
        (data) =>
            sendRequest({ data })
                .then(() => {
                    onClose();
                    onStatusChange();

                    onSuccess();
                })
                .catch(() => onError()),
        [onError, onClose, onSuccess, onStatusChange, sendRequest]
    );

    return { onParameterStatusUpdate };
};
