import { useState } from "react";
import { Waypoint } from "@voloiq/flight-planning-api/v1";

export const useWaypointItem = () => {
    const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null);
    const [modalType, setModalType] = useState<null | string>(null);

    const handleEdit = (waypoint: Waypoint, isSegment: boolean) => {
        if (isSegment) {
            setModalType("editSegment");
        } else {
            setModalType("edit");
        }
        setSelectedWaypoint(waypoint);
    };

    const handleDelete = (waypoint: Waypoint) => {
        setModalType("delete");
        setSelectedWaypoint(waypoint);
    };

    const handleClose = () => {
        setModalType(null);
        setSelectedWaypoint(null);
    };

    return {
        selectedWaypoint,
        modalType,
        setModalType,
        handleEdit,
        handleDelete,
        handleClose,
    };
};
