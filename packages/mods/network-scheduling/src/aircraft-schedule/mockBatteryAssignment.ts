import { match } from "ts-pattern";

export type MockBattery = { id?: string; name?: string };

// TODO remove after Rome VT-711
export const mockAssignedBattery = (flightNumber?: string, aircraftId?: string, pilotId?: string): MockBattery => {
    if (flightNumber && pilotId && aircraftId) {
        return match(flightNumber)
            .when(
                () => flightNumber.startsWith("VC001"),
                () => {
                    return {
                        id: "VCBCI00300125",
                    };
                }
            )
            .when(
                () => flightNumber.startsWith("VC002"),
                () => {
                    return {
                        id: "VCBCI00300126",
                    };
                }
            )
            .when(
                () => flightNumber.startsWith("VC003"),
                () => {
                    return {
                        id: "VCBCI00300127",
                    };
                }
            )
            .otherwise(() => {
                return {};
            });
    }
    return {};
};
