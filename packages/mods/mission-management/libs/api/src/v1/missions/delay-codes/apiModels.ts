export type DelayCategory =
    | "SPECIAL"
    | "SCHEDULE"
    | "PASSENGER_AND_BAGGAGE"
    | "MAIL"
    | "AIRCRAFT_AND_RAMP_HANDLING"
    | "TECHNICAL_AND_AIRCRAFT_EQUIPMENT"
    | "DAMAGE_TO_AIRCRAFT_AND_EDP"
    | "FLIGHT_OPERATIONS_AND_CREWING"
    | "WEATHER"
    | "ATFM_AIRPORT_GOVERNMENTAL_AUTHORITIES"
    | "REACTIONARY"
    | "MISCELLANEOUS"
    | "UNKNOWN";

export type DelayCode = {
    code: string;
    priority: boolean;
    delayCategory: DelayCategory;
    description: string;
};
