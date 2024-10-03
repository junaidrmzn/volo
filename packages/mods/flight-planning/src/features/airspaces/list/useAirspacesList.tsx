import type { Airspace } from "@voloiq-typescript-api/flight-planning-types";
import { useEffect, useMemo, useState } from "react";
import { createFormControl, number, object } from "@voloiq/form";
import type { ResponseEnvelope } from "@voloiq/service";
import { useFlightPlanningTranslation } from "../../../translations";
import type { AircraftOptionsList, AltitudeRange, Option } from "../types";

type UseAirspacesListProps = {
    airspacesList: ResponseEnvelope<Airspace> | undefined;
    altitudeRange: AltitudeRange;
};

// Create list of types and classifictions for dropdown
const addOptionsToList = (airspaceTypeList: string[], type: string): Option[] => {
    const optionList = airspaceTypeList
        // add options for each type
        .map((airspaceType) => {
            if (airspaceType !== "OTHER:MOA") return { value: airspaceType, label: airspaceType, type };
            return { value: airspaceType, label: "MOA", type: "" };
        });
    return optionList;
};

export const useAirspacesList = (props: UseAirspacesListProps) => {
    const { airspacesList, altitudeRange } = props;
    const [airspaceOptionsList, setAirspaceOptionsList] = useState<AircraftOptionsList[] | undefined>();
    const { t: translate } = useFlightPlanningTranslation();

    const editAltitudeRangeSchema = useMemo(
        () =>
            object({
                altitudeFrom: number()
                    .required("Required")
                    .min(0, translate("common.minError", { min: "0", field: "Altitude from" }))
                    .max(10_000, translate("common.maxError", { max: "10000", field: "Altitude from" }))
                    .label("Altitude from"),
                altitudeTo: number()
                    .required("Required")
                    .min(0, translate("common.minError", { min: "0", field: "Altitude to" }))
                    .max(10_000, translate("common.maxError", { max: "10000", field: "Altitude to" }))
                    .label("Altitude to"),
            }),
        [translate]
    );

    const FormControl = createFormControl<typeof editAltitudeRangeSchema>();

    useEffect(() => {
        const createAirspacesOptionsList = () => {
            if (airspacesList?.data?.features) {
                // Make an array only with available classifications of airspaces
                const airspaceClassificationsList: string[] = airspacesList.data.features
                    .map((airspace) => airspace.properties.classification)
                    .filter((airspace): airspace is string => !!airspace)
                    .sort();
                // Get the unique classification
                const uniqueAirspacesClassificationList: string[] = [...new Set(airspaceClassificationsList)];
                // Add the classfication options to the option list
                const airspaceClassicationOptionList = addOptionsToList(
                    uniqueAirspacesClassificationList,
                    "classification"
                );

                // Make an array only with available types of airspaces
                const airspaceTypesList: string[] = airspacesList.data?.features
                    .map((airspace) => airspace.properties?.type)
                    .filter((airspace): airspace is string => !!airspace)
                    .sort();
                // Get the unique types
                const uniqueAirspacesTypeList: string[] = [...new Set(airspaceTypesList)];
                // Add the type options to the option list
                const airspaceTypeOptionList: Option[] = addOptionsToList(uniqueAirspacesTypeList, "type");

                // Set the airspace options list
                setAirspaceOptionsList([
                    {
                        label: "+++ Types +++",
                        options: airspaceTypeOptionList,
                    },
                    {
                        label: "+++ Classifications +++",
                        options: airspaceClassicationOptionList,
                    },
                ]);
            }
        };

        createAirspacesOptionsList();
    }, [altitudeRange, airspacesList]);

    return {
        airspaceOptionsList,
        FormControl,
        editAltitudeRangeSchema,
    };
};
