import { FormProvider } from "@voloiq/form";
import { FloatingModal } from "../generic/FloatingModal";
import { EditWaypointFields } from "./EditWaypointFields";
import { useAltitudeReferenceSelect } from "./hooks/useAltitudeReferenceSelect";
import { useEditWaypointSchema } from "./hooks/useEditWaypointSchema";
import { useWaypointsTranslation } from "./translations";
import { convertWaypointUnitsForDisplay } from "./utils/convertWaypointUnits";

export type EditWaypointProps = {
    waypoint: Waypoint;
    onClose: () => void;
};

export const EditWaypoint = (props: EditWaypointProps) => {
    const { waypoint, onClose } = props;

    const { getWaypointAltitudeReferenceFormValues, setIsRefAltitudeSelected } = useAltitudeReferenceSelect();
    const { createWaypointSchema, handleSubmit, selectedTransitionType, setSelectedTransitionType } =
        useEditWaypointSchema({
            waypoint,
            isRefAltitudeSelected: true,
        });
    const handleTransitionTypeChange = (type: WaypointTransitionType) => {
        setSelectedTransitionType(type);
    };
    const { t } = useWaypointsTranslation();
    return (
        <FloatingModal size="sm" title={t("edit")} subTitle={t("waypoint")} onClose={onClose} isOpen hasFooter={false}>
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
