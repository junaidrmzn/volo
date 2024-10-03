import { Button, HStack } from "@volocopter/design-library-react";
import React, { useEffect } from "react";
import { RequirePermissions, useIsAuthorizedTo } from "@voloiq/auth";
import { Waypoint, WaypointTransitionType } from "@voloiq/flight-planning-api/v1";
import { createFormControl, useForm } from "@voloiq/form";
import { useFlightPlanningTranslation } from "../../../translations";
import { getWaypointTransitionTypeSelectOption } from "../../../utils";
import { AltitudeReferenceTabField } from "./AltitudeReferenceTabField";
import { TransitionTypeTabField } from "./TransitionTypeTabField";
import { useEditWaypointSchema } from "./hooks/useEditWaypointSchema";

type EditWaypointSchema = ReturnType<typeof useEditWaypointSchema>["createWaypointSchema"];

function useResetOnWaypointChange(selectedWaypoint: Waypoint) {
    const { reset } = useForm();
    useEffect(() => {
        reset({ ...selectedWaypoint, transitionType: getWaypointTransitionTypeSelectOption(selectedWaypoint) });
    }, [reset, selectedWaypoint, selectedWaypoint.id]);
}

type EditWaypointFormFieldsProps = {
    isEditable: boolean;
    createWaypointSchema: EditWaypointSchema;
    selectedWaypoint: Waypoint;
    setIsRefAltitudeSelected: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTransitionType: WaypointTransitionType;
    onTransitionTypeChange: (transitionType: WaypointTransitionType) => void;
};

export const EditWaypointFields = (props: EditWaypointFormFieldsProps) => {
    const {
        isEditable,
        createWaypointSchema,
        selectedWaypoint,
        setIsRefAltitudeSelected,
        selectedTransitionType,
        onTransitionTypeChange,
    } = props;
    const FormControlField = createFormControl<typeof createWaypointSchema>();
    useResetOnWaypointChange(selectedWaypoint);
    const { t } = useFlightPlanningTranslation();
    const isAuthEditField = useIsAuthorizedTo(["update"], ["Waypoint"]);

    return (
        <>
            <FormControlField fieldName="name" isNotEditable={!isEditable || !isAuthEditField} />
            <HStack width="100%" marginTop={2} alignItems="flex-start">
                <TransitionTypeTabField
                    selectedTransitionType={selectedTransitionType}
                    onTransitionTypeChange={onTransitionTypeChange}
                />
                <FormControlField fieldName="transitionRadius" isNotEditable={!isAuthEditField} />
            </HStack>
            <HStack width="100%" marginTop={2} alignItems="flex-start">
                <AltitudeReferenceTabField setIsRefAltitudeSelected={setIsRefAltitudeSelected} />
                <FormControlField fieldName="altitudeValue" isNotEditable={!isEditable || !isAuthEditField} />
            </HStack>
            {!isEditable && selectedWaypoint.routeSequenceIndex > 0 && (
                <FormControlField fieldName="speed" isNotEditable={!isAuthEditField} />
            )}
            <FormControlField fieldName="lat" isNotEditable={!isEditable || !isAuthEditField} />
            <FormControlField fieldName="lng" isNotEditable={!isEditable || !isAuthEditField} />
            <HStack width="100%" marginTop={2} alignItems="flex-start">
                <FormControlField fieldName="heading" isNotEditable />
                <FormControlField fieldName="rnp" isNotEditable={!isAuthEditField} />
            </HStack>
            <RequirePermissions resources={["Waypoint"]} actions={["update"]}>
                <Button mt="4" width="100%" variant="primary" type="submit" form="waypointEditForm">
                    {t("common.save")}
                </Button>
            </RequirePermissions>
        </>
    );
};
