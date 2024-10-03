import { useEffect, useState } from "react";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { Waypoint } from "@voloiq/flight-planning-api/v1";
import { useSegmentEditingContext } from "../../../map-route-layer/segment-editing";
import { useSelectedRoute } from "../../../selected-route";
import { useGetInitialAndMinimalRadius } from "./useGetMinimalRadius";

type UseRadiusInputOptions = {
    selectedWaypoint: Waypoint;
    isEditable: boolean;
    isInvalid: boolean;
    setIsInvalid: (isInvalid: boolean) => void;
};

export const useRadiusInput = (options: UseRadiusInputOptions) => {
    const { isEditable, isInvalid, selectedWaypoint, setIsInvalid } = options;
    const { selectedRoute } = useSelectedRoute();
    const { setArcSegmentRadius, segmentEditMode, setArcSegmentCoordinates } = useSegmentEditingContext();

    const canEditField = useIsAuthorizedTo(["update"], ["Waypoint"]);
    const isDisabled = !isEditable || !canEditField || segmentEditMode !== "turn";

    const { initialRadius, minimalRadius } = useGetInitialAndMinimalRadius(selectedRoute?.id || 0);
    const [radius, setRadius] = useState(initialRadius);

    useEffect(() => {
        // set initial values for context radius & lat, lng values
        setArcSegmentRadius(initialRadius);
        if (selectedWaypoint.routeSegment)
            setArcSegmentCoordinates({
                latitude: selectedWaypoint.routeSegment.latitude,
                longitude: selectedWaypoint.routeSegment.longitude,
            });
        setRadius(initialRadius);
    }, [setArcSegmentRadius, initialRadius, selectedWaypoint.routeSegment, setArcSegmentCoordinates]);

    const handleRadiusChange = (_: string, valueAsNumber: number) => {
        setRadius(valueAsNumber);
        if (valueAsNumber < minimalRadius) setIsInvalid(true);
        else setIsInvalid(false);
    };

    const handleApplyRadius = () => {
        if (radius < minimalRadius || isInvalid) return;
        setArcSegmentRadius(radius);
    };

    const handleApplyRadiusOnEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") return;
        handleApplyRadius();
        event.preventDefault();
    };

    return {
        handleApplyRadiusOnBlur: handleApplyRadius,
        handleApplyRadiusOnEnter,
        isDisabled,
        handleRadiusChange,
        radius,
        minimalRadius,
    };
};
