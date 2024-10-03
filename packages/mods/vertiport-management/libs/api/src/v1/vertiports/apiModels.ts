import { BaseDto, CreateEntity, Point, StringPair } from "../common/apiModels";
import { Region } from "../regions/apiModels";
import { VertiportService } from "../services/apiModels";

export type GoAroundEnergy = {
    direction: number;
    goAroundEnergy: number;
};

export type ApproachDirection = {
    direction: number;
};

export type MinGroundTime = {
    batterySwap?: number;
    passengerHandling?: number;
    pilotBriefing?: number;
    vtolHandling?: number;
};

export type OperationAllOf = {
    fatos?: number;
    stands?: number;
};

export type AdditionalFiles = {
    key: string;
    url: string;
};

export type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
export type VertiportServiceHours = {
    dayOfWeek: DayOfWeek;
    open: number;
    operationStart: number;
    operationEnd: number;
    close: number;
};

export type OperationCreate = {
    MinGroundTimePre?: MinGroundTime;
    MinGroundTimePost?: MinGroundTime;
    fatoBlockingTimePre?: number;
    fatoBlockingTimePost?: number;
    additionalFiles?: AdditionalFiles[];
    serviceHours?: VertiportServiceHours[];
};

export type Operation = OperationCreate & OperationAllOf;

export type VertiportAddress = {
    country?: string;
    state?: string;
    city?: string;
    zipCode?: string;
    addressLine1?: string;
    addressLine2?: string;
};
export type PassengerCheckinType = "NOT_ALLOWED" | "BIOMETRIC" | "UNKNOWN";
export type ConnectingFlightOption = "UNKNOWN" | "ALL" | "INBOUND_ONLY" | "NONE" | "OUTBOUND_ONLY";
export type VertiportAllOf = {
    id: string;
    iataCode?: string;
    icaoCode?: string;
    code?: string;
    shortName: string;
    region: Region;
    timeZone: string;
    elevation: number;
    location: Point;
    services?: VertiportService[];
    operation?: Operation;
    address?: VertiportAddress;
    names?: StringPair[];
    images?: StringPair[];
    popularity: number;
    passengerCheckinType?: PassengerCheckinType;
    dataModelVersion: number;
    connectingFlightOption?: ConnectingFlightOption;
    version?: number;
    lokaliseLastUpdatedTime?: string;
    lokaliseErrorMessage?: string;
    countryCode?: string;
    goAroundEnergies?: GoAroundEnergy[];
    approachDirections?: number[];
    synchronizedWithLeon: boolean;
    lastSynchronizedAt?: string;
    createdBy: string;
    updatedBy: string;
    sitaId?: string;
};

export type VertiportCreateAllOf = {
    iataCode?: string;
    icaoCode?: string;
    code?: string;
    shortName: string;
    regionId?: string;
    timeZone?: string;
    elevation: number;
    location: Point;
    services?: VertiportService[];
    operation?: OperationCreate;
    address?: VertiportAddress;
    names?: StringPair[];
    images?: StringPair[];
    popularity: number;
    passengerCheckinType?: PassengerCheckinType;
    dataModelVersion: number;
    connectingFlightOption?: ConnectingFlightOption;
    countryCode?: string;
    goAroundEnergies?: GoAroundEnergy[];
    approachDirections?: number[];
};

export type VertiportUpdateAllOf = {
    id: string;
};

export type Vertiport = CreateEntity & BaseDto & VertiportAllOf;
export type VertiportCreate = CreateEntity & VertiportCreateAllOf;
export type VertiportUpdate = VertiportCreate & VertiportUpdateAllOf;
export type VertiportBulkUpdate = {
    fieldType: string;
    newValue: string | object[] | null;
};
