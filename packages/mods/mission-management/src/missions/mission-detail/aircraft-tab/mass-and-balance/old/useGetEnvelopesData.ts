import { Aircraft } from "@voloiq-typescript-api/aircraft-management-types";

export const useGetEnvelopesData = (aircraftData: Aircraft | undefined) => {
    const pilotResource = aircraftData?.aircraftResources?.find((resource) => resource.type === "PILOT_SEAT");
    const passangerResource = aircraftData?.aircraftResources?.find((resource) => resource.type === "PASSENGER_SEAT");
    const luggageResource = aircraftData?.aircraftResources?.find(
        (resource) => resource.type === "LUGGAGE_COMPARTMENT"
    );
    const batteryResource = aircraftData?.aircraftResources?.find((resource) => resource.type === "BATTERY_SLOT");

    const bemMx = (aircraftData?.massAndBalanceData?.bem ?? 0) * (aircraftData?.massAndBalanceData?.cgPosition.x ?? 0);
    const bemMy = (aircraftData?.massAndBalanceData?.bem ?? 0) * (aircraftData?.massAndBalanceData?.cgPosition.y ?? 0);

    const batteryMX = (batteryResource?.position.x ?? 0) * (batteryResource?.weight ?? 0) + bemMx;
    const pilotMX = (pilotResource?.position.x ?? 0) * (pilotResource?.weight ?? 0) + batteryMX;
    const passangerMX = (passangerResource?.position.x ?? 0) * (passangerResource?.weight ?? 0) + pilotMX;
    const luggageMX = (luggageResource?.position.x ?? 0) * (luggageResource?.weight ?? 0) + passangerMX;

    const batteryMY = (batteryResource?.position.y ?? 0) * (batteryResource?.weight ?? 0) + bemMy;
    const pilotMY = (pilotResource?.position.y ?? 0) * (pilotResource?.weight ?? 0) + batteryMY;
    const passangerMY = (passangerResource?.position.y ?? 0) * (passangerResource?.weight ?? 0) + pilotMY;
    const luggageMY = (luggageResource?.position.y ?? 0) * (luggageResource?.weight ?? 0) + passangerMY;

    const batteryWeight = batteryResource?.weight || 0;
    const pilotWeight = pilotResource?.weight || 0;
    const passangerWeight = passangerResource?.weight || 0;
    const luggageWeight = luggageResource?.weight || 0;

    return {
        positions: {
            bemMx,
            batteryMX,
            pilotMX,
            passangerMX,
            luggageMX,
            bemMy,
            batteryMY,
            pilotMY,
            passangerMY,
            luggageMY,
        },
        weights: {
            batteryWeight,
            pilotWeight,
            passangerWeight,
            luggageWeight,
        },
    };
};
