import { Aircraft } from "@voloiq-typescript-api/fti-types";
import { useState } from "react";
import { AircraftWithStatus, Parameter } from "../../libs/fti-api/apiModels";

export type AircraftOptionType = {
    label: string;
    value: string;
};

export type UseAssignAircraftsProps = {
    aircrafts: Aircraft[];
    resource: Parameter;
};

export const useAssignAircrafts = (props: UseAssignAircraftsProps) => {
    const { aircrafts, resource } = props;
    const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(false);
    const [selectedAircraft, setSelectedAircraft] = useState<AircraftWithStatus>();
    const [assignedAircrafts, setAssigendAircrafts] = useState<AircraftWithStatus[]>(resource.aircrafts);

    const onAircraftUpdate = (aircraft: AircraftOptionType) => {
        const [productLine, aircraftType, msn] = aircraft.label.split(" - ");
        setSelectedAircraft({
            id: aircraft.value,
            aircraftType: aircraftType ?? "",
            msn: msn ?? "",
            productLine: productLine ?? "",
            status: "REQUESTED",
        });
    };

    const onAssignAircraft = () => {
        setIsEditModeEnabled(false);
        if (selectedAircraft) {
            setAssigendAircrafts([...assignedAircrafts, selectedAircraft]);
        }
    };

    const availableAircrafts = aircrafts.filter(
        (aircraft) => !assignedAircrafts.some((assignedAircraft) => assignedAircraft.id === aircraft.id)
    );

    return {
        isEditModeEnabled,
        setIsEditModeEnabled,
        assignedAircrafts,
        setAssigendAircrafts,
        onAircraftUpdate,
        selectedAircraft,
        setSelectedAircraft,
        onAssignAircraft,
        availableAircrafts,
    };
};
