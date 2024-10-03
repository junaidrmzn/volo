import type { ChargingStation } from "@voloiq-typescript-api/battery-management-types";
import { match } from "ts-pattern";
import type { FormValues } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import type { AxiosError } from "@voloiq/service";
import { useUpdateChargingStation } from "../../api-hooks/useChargingStationService";
import { useGetAllVertiportWithinValidity } from "../../api-hooks/useVertiportService";
import type { useChargingStationFormSchema } from "./useChargingStationFormSchema";

type EditChargingStationProps = RenderEditHandlerProps<ChargingStation> & {
    onSubmit: (formValues: FormValues<ReturnType<typeof useChargingStationFormSchema>>) => void;
};

type UseEditChargingStationProps = Omit<EditChargingStationProps, "formRef"> & {};

export const useEditChargingStation = (props: UseEditChargingStationProps) => {
    const { onSubmit, onAfterSubmit, resource, onSubmitError } = props;

    const { state: initialDataState, data: vertiports } = useGetAllVertiportWithinValidity();
    const isLoading = initialDataState === "pending";

    const { sendRequest } = useUpdateChargingStation(resource.id);

    const handleSubmit = (props: FormValues<ReturnType<typeof useChargingStationFormSchema>>) => {
        const validFrom = props.validFrom.toISOString();
        const validTo = props.validTo?.toISOString();
        const chargingStationStatus = props.chargingStationStatus.value;
        const vertiport = props.vertiport.value;
        onSubmit();
        sendRequest({
            data: {
                id: resource.id,
                ...props,
                chargingStationStatus,
                validFrom,
                validTo,
                vertiport,
            },
        })
            .then(() => onAfterSubmit())
            .catch((error: AxiosError) => {
                const errorKey = match(error.response?.data.error.status)
                    .with("ALREADY_EXISTS", () => "ALREADY_EXISTS" as const)
                    .otherwise(() => "GENERIC" as const);
                onSubmitError(errorKey);
            });
    };

    return { isLoading, handleSubmit, vertiports };
};
