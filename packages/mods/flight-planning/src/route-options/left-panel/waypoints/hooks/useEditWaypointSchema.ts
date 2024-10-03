import { useState } from "react";
import { Waypoint, WaypointTransitionType } from "@voloiq/flight-planning-api/v1";
import type { FormValues } from "@voloiq/form";
import { number, object, string } from "@voloiq/form";
import { VoloiqMapStoreType } from "@voloiq/map";
import { useEditWaypointWrapper, useGetRouteTerrainData } from "../../../../api-hooks";
import { useSelectedRouteSequenceIndex } from "../../../../features/selected-route-sequence-index";
import { useFlightPlanningTranslation } from "../../../../translations";
import { convertWaypointUpdateDataUnitsToSiUnits } from "../../../../utils/convertWaypointUnits";

type useEditWaypointSchemaProps = {
    routeId: number;
    waypoint: Waypoint;
    onWaypointEditCallback?: () => void;
    isRefAltitudeSelected: boolean;
    voloiqMapStore?: VoloiqMapStoreType;
};

export const useEditWaypointSchema = (options: useEditWaypointSchemaProps) => {
    const { routeId, waypoint, onWaypointEditCallback, isRefAltitudeSelected, voloiqMapStore } = options;
    const { t: translate } = useFlightPlanningTranslation();
    const [selectedTransitionType, setSelectedTransitionType] = useState<WaypointTransitionType>(
        waypoint.transitionType
    );
    const { setSelectedRouteSequenceIndex } = useSelectedRouteSequenceIndex();
    const { editWaypointOnRouteAsync } = useEditWaypointWrapper(routeId, voloiqMapStore?.map);
    const { invalidateRouteTerrainData } = useGetRouteTerrainData(routeId);

    const editWaypointSchema = object({
        altitudeValue: number()
            .typeError(translate("common.numberError"))
            .min(
                0,
                translate("common.minError", {
                    field: translate("flight.waypointAttributes.Altitude"),
                    min: 0,
                })
            )
            .label(translate("flight.waypointAttributes.Altitude"))
            .required(translate("common.requiredError")),
        heading: number()
            .typeError(translate("common.numberError"))
            .min(
                0,
                translate("common.minError", {
                    field: translate("flight.waypointAttributes.Heading"),
                    min: 0,
                })
            )
            .max(
                360,
                translate("common.maxError", {
                    field: translate("flight.waypointAttributes.Heading"),
                    max: 360,
                })
            )
            .label(translate("flight.waypointAttributes.Heading"))
            .required(translate("common.requiredError")),
        lat: number()
            .typeError(translate("common.numberError"))
            .min(
                -90,
                translate("common.minError", {
                    field: translate("flight.waypointAttributes.Latitude"),
                    min: -90,
                })
            )
            .max(
                90,
                translate("common.maxError", {
                    field: translate("flight.waypointAttributes.Latitude"),
                    max: 90,
                })
            )
            .label(translate("flight.waypointAttributes.Latitude"))
            .required(translate("common.requiredError")),
        lng: number()
            .typeError(translate("common.numberError"))
            .min(
                -180,
                translate("common.minError", {
                    field: translate("flight.waypointAttributes.Longitude"),
                    min: -180,
                })
            )
            .max(
                180,
                translate("common.maxError", {
                    field: translate("flight.waypointAttributes.Longitude"),
                    max: 180,
                })
            )
            .label(translate("flight.waypointAttributes.Longitude"))
            .required(translate("common.requiredError")),
        name: string().label(translate("flight.waypointAttributes.Name")).required(translate("common.requiredError")),
        transitionRadius: number()
            .typeError(translate("common.numberError"))
            .min(
                0,
                translate("common.minError", {
                    field: translate("flight.waypointAttributes.TransitionRadius"),
                    min: 0,
                })
            )
            .max(
                200,
                translate("common.maxError", {
                    field: translate("flight.waypointAttributes.TransitionRadius"),
                    max: 200,
                })
            )
            .label(translate("flight.waypointAttributes.TransitionRadius"))
            .required(translate("common.requiredError")),
        rnp: number()
            .typeError(translate("common.numberError"))
            .min(
                0,
                translate("common.minError", {
                    field: translate("flight.waypointAttributes.RNP"),
                    min: 0,
                })
            )
            .label(translate("flight.waypointAttributes.RNP"))
            .required(translate("common.requiredError")),
        routeSequenceIndex: number()
            .typeError(translate("common.numberError"))
            .min(
                0,
                translate("common.minError", {
                    field: translate("flight.waypointAttributes.Route Sequence Index"),
                    min: 0,
                })
            )
            .label(translate("flight.waypointAttributes.Route Sequence Index"))
            .required(translate("common.requiredError")),
        speed: number()
            .typeError(translate("common.numberError"))
            .min(
                1,
                translate("common.minError", {
                    field: translate("flight.waypointAttributes.Speed"),
                    min: 1,
                })
            )
            .default(10)
            .label(translate("flight.waypointAttributes.Speed"))
            .required(translate("common.requiredError")),
        targetTimeOver: number()
            .typeError(translate("common.numberError"))
            .min(
                0,
                translate("common.minError", {
                    field: translate("flight.waypointAttributes.TargetTimeOver"),
                    min: 0,
                })
            )
            .required(translate("common.requiredError")),
    });

    const handleSubmit = async (formData: FormValues<typeof editWaypointSchema>) => {
        const editedWaypointOnRouteData = convertWaypointUpdateDataUnitsToSiUnits({
            id: waypoint.id,
            lat: formData.lat,
            lng: formData.lng,
            heading: formData.heading,
            name: formData.name,
            speed: formData.speed,
            rnp: formData.rnp,
            routeSequenceIndex: formData.routeSequenceIndex,
            targetTimeOver: formData.targetTimeOver,
            transitionType: selectedTransitionType,
            transitionRadius: formData.transitionRadius,
            ...(isRefAltitudeSelected ? { altAboveRefAlt: formData.altitudeValue } : { alt: formData.altitudeValue }),
        });
        await editWaypointOnRouteAsync(editedWaypointOnRouteData);
        if (waypoint.lat !== editedWaypointOnRouteData.lat || waypoint.lng !== editedWaypointOnRouteData.lng) {
            await invalidateRouteTerrainData();
        }
        setSelectedRouteSequenceIndex(undefined);
        onWaypointEditCallback?.();
    };

    return {
        createWaypointSchema: editWaypointSchema,
        handleSubmit,
        selectedTransitionType,
        setSelectedTransitionType,
    };
};
