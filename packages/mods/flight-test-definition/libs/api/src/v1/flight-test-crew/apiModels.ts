import { FlightTestCategory } from "../common/apiModels";

export type CrewOccupantPosition = "LH-RH Seat" | "TM" | "Ground" | "Remote";

export type FlightTestCrewInsert = {
    name: string;
    role: string;
    category?: FlightTestCategory | null;
    position: CrewOccupantPosition;
};

export type FlightTestCrew = FlightTestCrewInsert & {
    id: string;
    createTime: string;
    updateTime: string;
};

export type FlightTestCrewPatch = Partial<FlightTestCrewInsert> & { id: string };
