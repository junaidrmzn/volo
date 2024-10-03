export type Category = "DIRECT" | "SIGHTSEEING" | "ROUNDTRIP";

export type Connection = {
    id: string;
    name: string;
    title: string;
    subtitle?: string;
    category: Category;
    flightDuration: number;
    aircraftTypeId: string;
    aircraftTypeName: string;
    passengerSeats: number;
    regionId: string;
    regionName: string;
    departureVertiportUuid: string;
    departureVertiportCode: string;
    arrivalVertiportUuid: string;
    arrivalVertiportCode: string;
    validFrom: string;
    validTo: string;
    updatedAt: string;
};

export type CreateConnection = Pick<
    Connection,
    | "name"
    | "title"
    | "subtitle"
    | "category"
    | "flightDuration"
    | "aircraftTypeId"
    | "aircraftTypeName"
    | "passengerSeats"
    | "regionId"
    | "regionName"
    | "departureVertiportUuid"
    | "departureVertiportCode"
    | "arrivalVertiportUuid"
    | "arrivalVertiportCode"
    | "validFrom"
    | "validTo"
>;

export type UpdateConnection = Pick<
    Connection,
    | "name"
    | "title"
    | "subtitle"
    | "category"
    | "flightDuration"
    | "aircraftTypeId"
    | "aircraftTypeName"
    | "passengerSeats"
    | "validFrom"
    | "validTo"
>;
