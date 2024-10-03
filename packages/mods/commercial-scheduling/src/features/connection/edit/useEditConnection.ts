import { useToast } from "@volocopter/design-library-react";
import { AircraftType, UpdateConnection, useUpdateConnection } from "@voloiq/commercial-scheduling-api/v1";
import { FieldName, OnEditHandler } from "@voloiq/form";
import { useRequestWithErrorHandling } from "../errors/useRequestWithErrorHandling";
import { ConnectionSchema } from "../hooks/useConnectionForm";
import { useConnectionTranslation } from "../translations/useConnectionTranslation";
import { useConnectionEditForm } from "./useConnectionEditForm";

export const useEditConnection = (connectionId: string) => {
    const {
        connection,
        FormControl,
        connectionSchema,
        connectionInitialValues,
        connectionGetState,
        onChangeSelectedAircraftType,
        aircraftTypes,
    } = useConnectionEditForm(connectionId || "-1");
    const { t } = useConnectionTranslation();
    const toast = useToast();
    const isUpdateAircraftFieldName = (attribute: unknown): attribute is FieldName<typeof connectionSchema> =>
        Object.keys(connectionSchema.describe().fields).includes(attribute as FieldName<typeof connectionSchema>);
    const { sendRequestById } = useUpdateConnection();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: (requestConfig: { data: UpdateConnection }) =>
            sendRequestById(connectionId || "-1", requestConfig),
        onSuccess: () => {
            toast({
                status: "success",
                title: t("title.Edit"),
                description: t("successMessages.Edit"),
            });
        },
        isFieldName: isUpdateAircraftFieldName,
    });

    const onEdit: OnEditHandler<ConnectionSchema> = (formData) => {
        const passengerSeats = aircraftTypes.find(
            (it: AircraftType) => it.id === formData.aircraftType.value
        )?.passengerSeats;
        const data: UpdateConnection = {
            name: formData.name,
            flightDuration: formData.flightDuration,
            validFrom: formData.validFrom.toISOString(),
            validTo: formData.validTo ? formData.validTo.toISOString() : "",
            title: formData.title,
            subtitle: formData?.subtitle!,
            category: formData.category.value,
            passengerSeats: passengerSeats || 1,
            aircraftTypeId: formData.aircraftType.value,
            aircraftTypeName: formData.aircraftType.label!,
        };

        return makeRequestWithErrorHandling(data);
    };

    return {
        connection,
        FormControl,
        connectionSchema,
        connectionInitialValues,
        connectionGetState,
        onChangeSelectedAircraftType,
        onEdit,
    };
};
