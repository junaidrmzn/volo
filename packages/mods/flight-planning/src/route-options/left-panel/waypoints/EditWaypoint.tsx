import { Text } from "@volocopter/design-library-react";
import { Waypoint, WaypointTransitionType } from "@voloiq/flight-planning-api/v1";
import { FormProvider } from "@voloiq/form";
import { useAltitudeReferenceSelect } from "../../../features/waypoint-on-route-details";
import { convertWaypointUnitsForDisplay } from "../../../utils/convertWaypointUnits";
import { FloatingModal } from "../generic/FloatingModal";
import { EditWaypointFields } from "./EditWaypointFields";
import { useEditWaypointSchema } from "./hooks/useEditWaypointSchema";
import { useWaypointsTranslation } from "./translations";
import { getWaypointName } from "./utils/getWaypointName";

export type EditWaypointProps = {
    waypoint: Waypoint;
    selectedRouteId: number;
    onClose: () => void;
    onInvalidateRoute: () => void;
    isOpen: boolean;
};

export const EditWaypoint = (props: EditWaypointProps) => {
    const { waypoint, selectedRouteId, onClose, onInvalidateRoute, isOpen } = props;

    const { getWaypointAltitudeReferenceFormValues, setIsRefAltitudeSelected } = useAltitudeReferenceSelect();
    const { createWaypointSchema, handleSubmit, selectedTransitionType, setSelectedTransitionType } =
        useEditWaypointSchema({
            routeId: selectedRouteId,
            waypoint,
            isRefAltitudeSelected: true,
            onWaypointEditCallback: onInvalidateRoute,
        });
    const handleTransitionTypeChange = (type: WaypointTransitionType) => {
        setSelectedTransitionType(type);
    };
    const { t } = useWaypointsTranslation();
    return (
        <FloatingModal
            size="sm"
            title={t("edit")}
            subTitle={t("waypoint")}
            onClose={onClose}
            isOpen={isOpen}
            hasFooter={false}
        >
            <Text fontSize="sm" textAlign="left" marginBottom={2}>
                {t("edit")} {getWaypointName(waypoint)}
            </Text>
            <FormProvider
                formId="waypointEditForm"
                schema={createWaypointSchema}
                formType="edit"
                initialValues={{
                    ...getWaypointAltitudeReferenceFormValues(convertWaypointUnitsForDisplay(waypoint)),
                }}
                onEdit={handleSubmit}
            >
                <EditWaypointFields
                    isEditable={!waypoint.isVertiport}
                    createWaypointSchema={createWaypointSchema}
                    selectedWaypoint={getWaypointAltitudeReferenceFormValues(convertWaypointUnitsForDisplay(waypoint))}
                    setIsRefAltitudeSelected={setIsRefAltitudeSelected}
                    selectedTransitionType={selectedTransitionType}
                    onTransitionTypeChange={handleTransitionTypeChange}
                />
            </FormProvider>
        </FloatingModal>
    );
};
