import type { ChargingStationSlot } from "@voloiq-typescript-api/battery-management-types";
import { match } from "ts-pattern";
import type { FormValues } from "@voloiq/form";
import type { RenderEditHandlerProps } from "@voloiq/resource-overview";
import type { AxiosError } from "@voloiq/service";
import { useUpdateChargingStationSlot } from "../../api-hooks/useChargingStationSlotService";
import { useGetEsuTypes } from "../../api-hooks/useEsuTypeService";
import type { useChargingStationSlotFormSchema } from "./useChargingStationSlotFormSchema";

type EditChargingStationSlotProps = RenderEditHandlerProps<ChargingStationSlot> & {
    onSubmit: (formValues: FormValues<ReturnType<typeof useChargingStationSlotFormSchema>>) => void;
};

type UseEditChargingStationSlotProps = Omit<EditChargingStationSlotProps, "formRef"> & {};

export const useEditChargingStationSlot = (props: UseEditChargingStationSlotProps) => {
    const { onSubmit, onAfterSubmit, resource, onSubmitError } = props;
    const { state: initialDataState } = useGetEsuTypes(1);
    const isLoading = initialDataState === "pending";

    const { sendRequest } = useUpdateChargingStationSlot(resource.id);

    const handleSubmit = (props: FormValues<ReturnType<typeof useChargingStationSlotFormSchema>>) => {
        const validFrom = props.validFrom.toISOString();
        const validTo = props.validTo?.toISOString();
        const chargingStationSlotStatus = props.chargingStationSlotStatus.value;
        const supportedEsuTypes = props.supportedEsuTypes.map((esuType) => esuType.value);
        const chargingStation = props.chargingStation.value;
        const { nrChargeEsu, slotNumber } = props;

        onSubmit();
        sendRequest({
            data: {
                id: resource.id,
                ...props,
                validFrom,
                validTo,
                chargingStationSlotStatus,
                chargingStation,
                nrChargeEsu,
                slotNumber,
                supportedEsuTypes,
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

    return { handleSubmit, isLoading };
};
