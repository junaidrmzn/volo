import type { AircraftResource } from "@voloiq-typescript-api/aircraft-management-types";
import { AircraftResourceType } from "@voloiq-typescript-api/aircraft-management-types";
import { useState } from "react";

export const useAircraftResources = () => {
    const [aircraftResources, setAircraftResources] = useState<(AircraftResource & { editMode: boolean })[]>([]);
    const [aircraftResourcesDisplayValues, setAircraftResourcesDisplayValues] = useState<{ weight?: string }[]>([]);

    const handleDelete = (index: number) => {
        const newAircraftResources = [...aircraftResources];
        newAircraftResources.splice(index, 1);
        setAircraftResources(newAircraftResources);
    };

    const toggleEditMode = (index: number) => {
        const newAircraftResources = [...aircraftResources];
        const weights: { weight?: string }[] = aircraftResources.map((resource) => {
            return { weight: resource.weight?.toString() };
        });
        setAircraftResourcesDisplayValues(weights);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newAircraftResources[index]!.editMode = !newAircraftResources[index]!.editMode;
        setAircraftResources(newAircraftResources);
    };

    const handleChange = (index: number, aircraftResource: AircraftResource) => {
        const newAircraftResources = [...aircraftResources];
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        newAircraftResources[index] = { ...newAircraftResources[index]!, ...aircraftResource };
        setAircraftResources(newAircraftResources);
    };

    const handleAdd = () => {
        setAircraftResources([
            {
                name: "",
                type: AircraftResourceType.OTHER,
                position: { x: 0, y: 0 },
                weight: undefined,
                editMode: true,
            },
            ...aircraftResources,
        ]);
        setAircraftResourcesDisplayValues([
            {
                weight: "",
            },
            ...aircraftResourcesDisplayValues,
        ]);
    };

    return {
        aircraftResources,
        aircraftResourcesDisplayValues,
        setAircraftResources,
        handleDelete,
        toggleEditMode,
        handleChange,
        handleAdd,
    };
};
