import { Button, HStack } from "@volocopter/design-library-react";
import { useEffect } from "react";
import { RequirePermissions, useIsAuthorizedTo } from "@voloiq/auth";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import type { AnyObjectSchema } from "@voloiq/form";
import { createFormControl, useForm } from "@voloiq/form";
import { useFlightPlanningTranslation } from "../../../translations";
import { getWaypointTransitionTypeSelectOption } from "../../../utils";
import { AltitudeReferenceSelectField } from "./AltitudeReferenceSelect";

function useResetOnWaypointChange(selectedWaypoint: Waypoint) {
    const { reset } = useForm();
    useEffect(() => {
        reset({ ...selectedWaypoint, transitionType: getWaypointTransitionTypeSelectOption(selectedWaypoint) });
    }, [reset, selectedWaypoint, selectedWaypoint.id]);
}

type WaypointOnRouteDetailsFormFieldsProps = {
    isEditable: boolean;
    createWaypointSchema: AnyObjectSchema;
    selectedWaypoint: Waypoint;
    setIsRefAltitudeSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WaypointOnRouteDetailsFormFields = (props: WaypointOnRouteDetailsFormFieldsProps) => {
    const { isEditable, createWaypointSchema, selectedWaypoint, setIsRefAltitudeSelected } = props;
    const FormControlField = createFormControl<typeof createWaypointSchema>();
    useResetOnWaypointChange(selectedWaypoint);
    const { t } = useFlightPlanningTranslation();
    const isAuthEditField = useIsAuthorizedTo(["update"], ["Waypoint"]);

    return (
        <>
            <HStack width="100%">
                <FormControlField fieldName="name" isNotEditable={!isEditable || !isAuthEditField} />
            </HStack>
            <HStack width="100%" marginTop={2} alignItems="flex-start">
                <FormControlField fieldName="transitionType" isNotEditable={!isAuthEditField} />
                <FormControlField fieldName="transitionRadius" isNotEditable={!isAuthEditField} />
            </HStack>
            <HStack width="100%" marginTop={2} alignItems="flex-start">
                <AltitudeReferenceSelectField setIsRefAltitudeSelected={setIsRefAltitudeSelected} />
                <FormControlField fieldName="altitudeValue" isNotEditable={!isEditable || !isAuthEditField} />
            </HStack>
            <HStack width="100%" marginTop={2} alignItems="flex-start">
                {!isEditable && selectedWaypoint.routeSequenceIndex > 0 ? null : (
                    <FormControlField fieldName="speed" isNotEditable={!isAuthEditField} />
                )}
            </HStack>
            <HStack width="100%" marginTop={2} alignItems="flex-start">
                <FormControlField fieldName="lat" isNotEditable={!isEditable || !isAuthEditField} />
            </HStack>
            <HStack width="100%" marginTop={2} alignItems="flex-start">
                <FormControlField fieldName="lng" isNotEditable={!isEditable || !isAuthEditField} />
            </HStack>
            <HStack width="100%" marginTop={2} alignItems="flex-start">
                <FormControlField fieldName="heading" isNotEditable />
                <FormControlField fieldName="rnp" isNotEditable={!isAuthEditField} />
            </HStack>
            <HStack mt="4">
                <RequirePermissions resources={["Waypoint"]} actions={["update"]}>
                    <Button width="100%" variant="primary" type="submit" form="waypointEditForm">
                        {t("common.save")}
                    </Button>
                </RequirePermissions>
            </HStack>
        </>
    );
};
