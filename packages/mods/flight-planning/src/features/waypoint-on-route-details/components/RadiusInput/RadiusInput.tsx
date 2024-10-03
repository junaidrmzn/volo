import { FormControl, FormLabel, NumberInput, Text } from "@volocopter/design-library-react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../../../translations";
import { useRadiusInput } from "./useRadiusInput";

type RadiusInputProps = {
    isEditable: boolean;
    isInvalid: boolean;
    setIsInvalid: (isInvalid: boolean) => void;
    selectedWaypoint: Waypoint;
};

export const RadiusInput = (props: RadiusInputProps) => {
    const { isEditable, isInvalid, selectedWaypoint, setIsInvalid } = props;
    const { handleApplyRadiusOnEnter, handleApplyRadiusOnBlur, isDisabled, radius, handleRadiusChange, minimalRadius } =
        useRadiusInput({ selectedWaypoint, isEditable, setIsInvalid, isInvalid });
    const { t } = useFlightPlanningTranslation();

    return (
        <FormControl>
            <FormLabel>{t("flight.routeSegment.radius")}</FormLabel>
            <NumberInput
                value={radius}
                onChange={handleRadiusChange}
                onBlur={handleApplyRadiusOnBlur}
                onKeyDown={handleApplyRadiusOnEnter}
                isDisabled={isDisabled}
                min={0}
            />
            {isInvalid ? (
                <Text color="red.500" fontSize="sm" mt="2">
                    {t("flight.routeSegment.minimumRadiusError", { minimalRadius })}
                </Text>
            ) : (
                <Text color="gray.500" fontSize="xs" mt="2">
                    {t("flight.routeSegment.minumumRadiusHint", { minimalRadius })}
                </Text>
            )}
        </FormControl>
    );
};
