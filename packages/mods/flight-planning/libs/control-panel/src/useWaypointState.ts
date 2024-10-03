import { useLayoutEffect, useState } from "react";

const areWaypointsEqual = (a: Waypoint, b: Waypoint) => {
    return a.id === b.id;
};

export type UseWaypointStateOptions = {
    onAddWaypoint: (waypoint: Waypoint) => void;
    onUpdateWaypoint: (waypoint: Waypoint) => void;
    onDeleteWaypoint: (waypoint: Waypoint) => void;
    onSubscribeToWaypointUpdate: (callback: (waypoint: Waypoint) => void) => void;
    onSubscribeToWaypointAdd: (callback: (waypoint: Waypoint) => void) => void;
    onSubscribeToWaypointDelete: (callback: (waypoint: Waypoint) => void) => void;
};
export const useWaypointState = (options: UseWaypointStateOptions) => {
    const {
        onAddWaypoint,
        onDeleteWaypoint,
        onSubscribeToWaypointAdd,
        onSubscribeToWaypointDelete,
        onSubscribeToWaypointUpdate,
        onUpdateWaypoint,
    } = options;

    const [waypoints, setWaypoints] = useState<Waypoint[]>([]);

    useLayoutEffect(() => {
        onSubscribeToWaypointAdd((waypoint) => {
            setWaypoints((waypoints) => [...waypoints, waypoint]);
        });

        onSubscribeToWaypointUpdate((updatedWaypoint) => {
            setWaypoints((waypoints) =>
                waypoints.map((waypoint) => {
                    return areWaypointsEqual(waypoint, updatedWaypoint) ? updatedWaypoint : waypoint;
                })
            );
        });

        onSubscribeToWaypointDelete((deletedWaypoint) => {
            setWaypoints((waypoints) =>
                waypoints.filter((waypoint) => {
                    return areWaypointsEqual(waypoint, deletedWaypoint);
                })
            );
        });
    }, []);

    const addWaypoint = () => {
        const newWaypoint = {
            id: Math.max(...waypoints.map((waypoint) => waypoint.id), 0) + 1,
            routeSequenceIndex: waypoints.length + 1,
            isVertiport: false,
            targetTimeOver: 0,
            altAboveRefAlt: 0,
            alt: 0,
            lat: 0,
            lng: 0,
            transitionType: "fly-by" as const,
            speed: 0,
            name: "Waypoint",
            heading: 0,
            rnp: 0,
            transitionRadius: 0,
        };
        onAddWaypoint(newWaypoint);
        setWaypoints((waypoints) => [...waypoints, newWaypoint]);
    };

    const updateWaypoint = (index: number, key: keyof Waypoint, updatedValue: number) => {
        const waypoint = waypoints[index];
        if (!waypoint) {
            return;
        }
        const updatedWaypoint = { ...waypoint, [key]: updatedValue };
        onUpdateWaypoint(updatedWaypoint);
        setWaypoints((waypoints) =>
            waypoints.map((waypoint, index_) => (index_ === index ? updatedWaypoint : waypoint))
        );
    };

    const deleteWaypoint = (waypoint: Waypoint) => {
        onDeleteWaypoint(waypoint);
        setWaypoints((waypoints) => waypoints.filter((w) => w !== waypoint));
    };

    return { addWaypoint, updateWaypoint, deleteWaypoint, waypoints };
};
