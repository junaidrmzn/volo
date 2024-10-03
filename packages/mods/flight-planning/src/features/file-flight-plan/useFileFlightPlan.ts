import type {
    ExternalAircraft,
    ExternalAircraftType,
    UTMServiceProvider,
} from "@voloiq-typescript-api/flight-planning-types";
import { useEffect, useMemo, useState } from "react";
import { Route } from "@voloiq/flight-planning-api/v1";
import type { SelectOption } from "@voloiq/form";
import { createFormControl, datetime, multiselect, number, object, select } from "@voloiq/form";
import { useNavigate, useParams } from "@voloiq/routing";
import { useGetAllAircraft, useGetAllAircraftTypes, useGetRoutes, useGetUtmServiceProviders } from "../../api-hooks";
import { useFlightPlanningTranslation } from "../../translations";

const getAvailableRouteOptions = (routes: Route[] | undefined, preferredRouteId?: number): SelectOption<string>[] => {
    if (routes !== undefined && routes.length > 0) {
        return routes
            .map<SelectOption<string>>((route) => ({
                value: `${route.id}`,
                label: route.name,
            }))
            .filter((entry) => entry.value !== `${preferredRouteId}`);
    }
    return [];
};

const getUtmProviderOptions = (providers: UTMServiceProvider[] | undefined): SelectOption<string>[] => {
    if (providers !== undefined && providers.length > 0) {
        return providers.map<SelectOption<string>>((provider) => ({
            value: `${provider.id}`,
            label: provider.name,
        }));
    }
    return [];
};

const generateAircraftLabel = (aircraft: ExternalAircraft, aircraftTypeList: ExternalAircraftType[]) => {
    const aircraftType = aircraftTypeList.find((type) => type.externalId === aircraft.aircraftTypeId);

    let label = !aircraftType ? `VTOL` : `${aircraftType.name}`;
    if (aircraft.registration) label = `${label} - ${aircraft.registration}`;
    if (aircraft.msn) label = `${label} - ${aircraft.msn}`;
    return label;
};

export const useFileFlightPlan = (isSuccess: boolean) => {
    const { t: translate } = useFlightPlanningTranslation();
    const { routeOptionId } = useParams();
    const utmProvidersQuery = useGetUtmServiceProviders();
    const [aircraftSelectOptions, setAircraftSelectOptions] = useState<{ label: string; value: string }[]>([]);
    const routesQuery = useGetRoutes(routeOptionId, true, !!routeOptionId);
    const aircraftQuery = useGetAllAircraft();
    const aircraftTypeQuery = useGetAllAircraftTypes();

    const [preferredRouteId, setPreferredRouteId] = useState<number | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (
            !aircraftQuery.isSuccess ||
            !aircraftQuery.data?.length ||
            !aircraftTypeQuery.isSuccess ||
            aircraftTypeQuery.data.length === 0
        )
            return;
        setAircraftSelectOptions(
            aircraftQuery.data.map((aircraft) => ({
                label: generateAircraftLabel(aircraft, aircraftTypeQuery.data),
                value: aircraft.externalId,
            }))
        );
    }, [aircraftQuery.isSuccess, aircraftQuery.data, aircraftTypeQuery.isSuccess, aircraftTypeQuery.data]);

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                navigate(`../../flight-planning/flight-plans`);
            }, 500);
    }, [isSuccess, navigate]);

    const createFlightParametersSchema = useMemo(
        () =>
            object({
                scheduledDepartureTime: datetime()
                    .required(translate("common.requiredError"))
                    .label(
                        `${translate("flight.fileFlightPlan.attributes.flightParameters.ScheduledDepartureTime")} (UTC)`
                    ),
                scheduledArrivalTime: datetime()
                    .when(
                        "scheduledDepartureTime",
                        (scheduledDepartureTime, yup) =>
                            scheduledDepartureTime &&
                            yup.min(
                                scheduledDepartureTime,
                                translate("flight.fileFlightPlan.errors.arrivalBeforeDeparture")
                            )
                    )
                    .required(translate("common.requiredError"))
                    .label(
                        `${translate("flight.fileFlightPlan.attributes.flightParameters.ScheduledArrivalTime")} (UTC)`
                    ),
                aircraftId: select({
                    placeholder: `${translate(
                        "flight.fileFlightPlan.attributes.aircraftParameters.SelectAircraft"
                    )}...`,
                    options: aircraftSelectOptions,
                    errorMessage: translate("common.requiredError"),
                })
                    .required(translate("common.requiredError"))
                    .label(translate("flight.fileFlightPlan.attributes.aircraftParameters.SelectAircraft")),
                operationType: select({
                    placeholder: "Operation Type",
                    options: [
                        { label: "GA", value: "GA" },
                        { label: "Law Enforcement", value: "law enforcement" },
                        { label: "Medical", value: "medical" },
                        { label: "Military", value: "military" },
                        { label: "Other", value: "other" },
                        { label: "Non Scheduled", value: "non-scheduled service" },
                        { label: "Scheduled Service", value: "scheduled service" },
                    ],
                    errorMessage: translate("common.requiredError"),
                })
                    .required(translate("common.requiredError"))
                    .label(translate("flight.fileFlightPlan.attributes.flightParameters.Type")),
                flightRules: select({
                    placeholder: "Flight Rules",
                    options: [
                        { label: "IFR", value: "IFR" },
                        { label: "VFR", value: "VFR" },
                        { label: "SVFR", value: "SVFR" },
                        { label: "BVLOS Route", value: "BVLOS-Route" },
                        { label: "BVLOS Free", value: "BVLOS-Free" },
                        { label: "BVLOS Mixed", value: "BVLOS-Mixed" },
                        { label: "VLOS", value: "VLOS" },
                    ],
                    errorMessage: translate("common.requiredError"),
                })
                    .required(translate("common.requiredError"))
                    .label(translate("flight.fileFlightPlan.attributes.flightParameters.FlightRules")),
                paxCount: number()
                    .required(translate("common.requiredError"))
                    .label(translate("flight.fileFlightPlan.attributes.flightParameters.NumberOfPAX")),
                preferredRoute: select({
                    placeholder: translate("flight.fileFlightPlan.preferredRoute"),
                    options: getAvailableRouteOptions(routesQuery.data, undefined),
                    errorMessage: translate("common.requiredError"),
                })
                    .required()
                    .label(translate("flight.fileFlightPlan.preferredRoute")),
                additionalRoutes: multiselect({
                    placeholder: translate("flight.fileFlightPlan.alternativeRoutes"),
                    options: getAvailableRouteOptions(routesQuery.data, preferredRouteId),
                    errorMessage: translate("common.requiredError"),
                }).label(translate("flight.fileFlightPlan.alternativeRoutes")),
                utmProvider: select({
                    options: getUtmProviderOptions(utmProvidersQuery.data),
                    placeholder: translate("flight.fileFlightPlan.utmProvider"),
                    errorMessage: translate("common.requiredError"),
                })
                    .label(translate("flight.fileFlightPlan.utmProvider"))
                    .required(),
            }),
        [preferredRouteId, routesQuery.data, translate, utmProvidersQuery.data]
    );
    const FormControl = createFormControl<typeof createFlightParametersSchema>();
    return { FormControl, createFlightParametersSchema, setPreferredRouteId, routesQuery, utmProvidersQuery };
};
