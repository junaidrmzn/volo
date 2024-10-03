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
