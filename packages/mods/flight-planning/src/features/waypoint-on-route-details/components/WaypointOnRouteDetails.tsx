import { Box } from "@volocopter/design-library-react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { FormProvider } from "@voloiq/form";
import { VoloiqMapStoreType } from "@voloiq/map";
import { getWaypointTransitionTypeSelectOption } from "../../../utils";
import { convertWaypointUnitsForDisplay } from "../../../utils/convertWaypointUnits";
import { useAltitudeReferenceSelect, useWaypointOnRouteDetails } from "../hooks";
import { WaypointOnRouteDetailTabs } from "./WaypointOnRouteDetailTabs";
import { WaypointOnRouteDetailsHeader } from "./WaypointOnRouteDetailsHeader";

type WaypointOnRouteDetailsProps = {
    isLastWaypoint: boolean;
    isEditable: boolean;
    waypoint: Waypoint;
    routeId: number;
    voloiqMapStore?: VoloiqMapStoreType;
    onWaypointEditCallback?: () => void;
    onSuccessfulDelete?: () => unknown;
};
export const WaypointOnRouteDetails = (props: WaypointOnRouteDetailsProps) => {
    const {
        isLastWaypoint,
        isEditable,
        waypoint,
        routeId,
        onWaypointEditCallback,
        onSuccessfulDelete,
        voloiqMapStore,
    } = props;
    const { isRefAltitudeSelected, setIsRefAltitudeSelected, getWaypointAltitudeReferenceFormValues } =
        useAltitudeReferenceSelect();
    const { createWaypointSchema, handleSubmit } = useWaypointOnRouteDetails({
        routeId,
        waypoint,
        isRefAltitudeSelected,
        onWaypointEditCallback,
        voloiqMapStore,
    });

    return (
        <>
            <WaypointOnRouteDetailsHeader
                isEditable={isEditable}
                routeId={routeId}
                waypoint={waypoint}
                onSuccessfulDelete={onSuccessfulDelete}
                voloiqMapStore={voloiqMapStore}
            />
            <Box flex="1 1 auto" overflowY="auto" padding={3}>
                <FormProvider
                    formId="waypointEditForm"
                    schema={createWaypointSchema}
                    formType="edit"
                    initialValues={{
                        transitionType: getWaypointTransitionTypeSelectOption(waypoint),
                    }}
                    onEdit={handleSubmit}
                >
                    <WaypointOnRouteDetailTabs
                        isLastWaypoint={isLastWaypoint}
                        isEditable={isEditable}
                        createWaypointSchema={createWaypointSchema}
                        waypoint={getWaypointAltitudeReferenceFormValues(convertWaypointUnitsForDisplay(waypoint))}
                        setIsRefAltitudeSelected={setIsRefAltitudeSelected}
                        routeId={routeId}
                        voloiqMapStore={voloiqMapStore}
                    />
                </FormProvider>
            </Box>
        </>
    );
};
