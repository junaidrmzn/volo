import type { AirspaceFeatureAllOf } from "@voloiq-typescript-api/flight-planning-types";
import type { Dispatch, SetStateAction } from "react";

export type AirspaceListContext = {
    closeRightSidebar: () => void;
    altitudeRange: AltitudeRange;
    changeAltitudeRange: (newAltitudeRange: [number, number]) => void;
    setSelectedAirspaceOptions: Dispatch<SetStateAction<readonly Option[]>>;
    selectedAirspaceOptions: Option[];
};

export type Option = {
    value: number | string;
    label: string | undefined;
    type?: string;
};

export type AircraftOptionsList = {
    label: string;
    options: Option[];
};

export type AltitudeRange = [number, number];

export type FilteredAirspaces = AirspaceFeatureAllOf[] | undefined;
