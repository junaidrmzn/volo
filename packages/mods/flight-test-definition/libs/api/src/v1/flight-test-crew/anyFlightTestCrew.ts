import { v4 as uuidV4 } from "uuid";
import type { FlightTestCrew } from "./apiModels";

const someDate = new Date("2024-04-01T00:00:00Z");

export const anyFlightTestCrew = (overwrites: Partial<FlightTestCrew> = {}): FlightTestCrew => ({
    id: uuidV4(),
    name: "Paulo Treides",
    role: "Pilot in Command",
    category: "Cat. 1",
    position: "LH-RH Seat",
    createTime: someDate.toISOString(),
    updateTime: someDate.toISOString(),
    ...overwrites,
});
