import type { RouteOptionCreate } from "@voloiq-typescript-api/flight-planning-types";
import { useMemo } from "react";
import { useGetVertiports } from "@voloiq/flight-planning-api/v1";
import type { FormValues, SelectOption } from "@voloiq/form";
import { createFormControl, object, select, string } from "@voloiq/form";
import { useNavigate } from "@voloiq/routing";
import { useCreateRouteOption, useGetAllAircraftTypes } from "../../../../api-hooks";
import { useFlightPlanningTranslation } from "../../../../translations";

export const useRouteOptionAddForm = () => {
    const vertiportsQuery = useGetVertiports();
    const aircraftTypeQuery = useGetAllAircraftTypes();
    const { t: translate } = useFlightPlanningTranslation();
    const { createRouteOptionAsync } = useCreateRouteOption();
    const navigate = useNavigate();

    const createRouteOptionSchema = useMemo(
        () =>
            object({
                name: string()
                    .required(translate("common.requiredError"))
                    .label(translate("routeOption.properties.name")),
                aircraftType: select({
                    placeholder: translate("routeOption.properties.aircraftType"),
                    options: aircraftTypeQuery.data
                        ? aircraftTypeQuery.data.map<SelectOption>((aircraftType) => ({
                              value: aircraftType.externalId,
                              label: aircraftType.name,
                          }))
                        : [],
                    errorMessage: translate("common.requiredError"),
                })
                    .required(translate("common.requiredError"))
                    .label(translate("routeOption.properties.aircraftType")),
                departureVertiport: select({
                    placeholder: translate("routeOption.properties.departureVertiport"),
                    options: vertiportsQuery.data
                        ? vertiportsQuery.data.map<SelectOption>((vertiport) => ({
                              value: `${vertiport.id}`,
                              label: vertiport.name,
                          }))
                        : [],
                    errorMessage: translate("common.requiredError"),
                })
                    .required(translate("common.requiredError"))
                    .label(translate("routeOption.properties.departureVertiport")),
                arrivalVertiport: select({
                    placeholder: translate("routeOption.properties.arrivalVertiport"),
                    options: vertiportsQuery.data
                        ? vertiportsQuery.data.map<SelectOption>((vertiport) => ({
                              value: `${vertiport.id}`,
                              label: vertiport.name,
                          }))
                        : [],
                    errorMessage: translate("common.requiredError"),
                })
                    .required(translate("common.requiredError"))
                    .label(translate("routeOption.properties.arrivalVertiport")),
            }),
        [vertiportsQuery.data, translate, aircraftTypeQuery.data]
    );

    const handleCreate = (formData: FormValues<typeof createRouteOptionSchema>) => {
        const aircraftType = aircraftTypeQuery.data?.find(
            (aircraftType) => aircraftType.externalId === formData.aircraftType.value
        );

        const routeOption: RouteOptionCreate = {
            name: formData.name,
            aircraftType: aircraftType?.name || "not set",
            departureExternalVertiport: +formData.departureVertiport.value,
            arrivalExternalVertiport: +formData.arrivalVertiport.value,
            aircraftTypeId: aircraftType?.externalId,
        };

        createRouteOptionAsync(routeOption).then((responseData) => {
            if (responseData) navigate(`${responseData.data?.id}/map`);
        });
    };

    const FormControl = createFormControl<typeof createRouteOptionSchema>();

    return {
        FormControl,
        createRouteOptionSchema,
        handleCreate,
        isLoading: vertiportsQuery.isLoading || aircraftTypeQuery.isLoading,
    };
};
