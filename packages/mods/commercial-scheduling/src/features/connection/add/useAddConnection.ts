import { useToast } from "@volocopter/design-library-react";
import { AircraftType, CreateConnection, useCreateConnection } from "@voloiq/commercial-scheduling-api/v1";
import { FieldName, OnCreateHandler } from "@voloiq/form";
import { useRequestWithErrorHandling } from "../errors/useRequestWithErrorHandling";
import { ConnectionSchema, useConnectionForm } from "../hooks/useConnectionForm";
import { useConnectionTranslation } from "../translations/useConnectionTranslation";

export const useAddConnection = () => {
    const {
        FormControl,
        connectionSchema,
        aircraftTypes,
        vertiports,
        onChangeSelectedRegion,
        onChangeSelectedAircraftType,
        onChangeSelectedArrivalVertiport,
        onChangeSelectedDepartureVertiport,
        passengerSeats,
        isVertiportFormControlsVisible,
    } = useConnectionForm();
    const { t } = useConnectionTranslation();
    const toast = useToast();
    const isCreateAircraftFieldName = (attribute: unknown): attribute is FieldName<typeof connectionSchema> =>
        Object.keys(connectionSchema.describe().fields).includes(attribute as FieldName<typeof connectionSchema>);
    const { sendRequest } = useCreateConnection();
    const { makeRequestWithErrorHandling } = useRequestWithErrorHandling({
        makeRequest: sendRequest,
        onSuccess: () => {
            toast({
                status: "success",
                title: t("title.Add"),
                description: t("successMessages.Add"),
            });
        },
        isFieldName: isCreateAircraftFieldName,
    });

    const onCreate: OnCreateHandler<ConnectionSchema> = async (formData) => {
        const passengerSeats = aircraftTypes.find(
            (it: AircraftType) => it.id === formData.aircraftType.value
        )?.passengerSeats;

        const arrivalVertiportCode = vertiports.find(
            (vertiport) => vertiport.id === formData.arrivalVertiport?.value
        )?.code;

        const departureVertiportCode = vertiports.find(
            (vertiport) => vertiport.id === formData.departureVertiport?.value
        )?.code;

        const data: CreateConnection = {
            name: formData.name,
            regionId: formData.region.value,
            regionName: formData.region.label!,
            departureVertiportUuid: formData.departureVertiport?.value ?? "",
            departureVertiportCode: departureVertiportCode!,
            arrivalVertiportUuid: formData.arrivalVertiport?.value ?? "",
            arrivalVertiportCode: arrivalVertiportCode!,
            aircraftTypeId: formData.aircraftType.value,
            aircraftTypeName: formData.aircraftType.label!,
            flightDuration: formData.flightDuration,
            validFrom: formData.validFrom.toISOString(),
            validTo: formData.validTo.toISOString(),
            title: formData.title,
            subtitle: formData?.subtitle!,
            category: formData.category.value,
            passengerSeats: passengerSeats || 1,
        };
        return makeRequestWithErrorHandling(data);
    };

    return {
        FormControl,
        connectionSchema,
        onCreate,
        onChangeSelectedRegion,
        onChangeSelectedAircraftType,
        onChangeSelectedArrivalVertiport,
        onChangeSelectedDepartureVertiport,
        passengerSeats,
        isVertiportFormControlsVisible,
    };
};
