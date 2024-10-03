import { AircraftResource, BaseDto, MassAndBalanceData, TechnicalStatus } from "../common/apiModels";

export type CrewConfiguration = "UNKNOWN" | "CREWED" | "UNCREWED";
export type Service = "UNKNOWN" | "PASSENGER" | "CARGO" | "TEST" | "TRAINING" | "FERRY_FLIGHT" | "CARPOOL";
export type SurvivalEquipmentClassification = "UNKNOWN" | "D" | "J" | "M" | "S" | "P";
export type LifeJacketEquipment = "UNKNOWN" | "F" | "H" | "J" | "L" | "U";
export type SurveillanceTransponderType =
    | "UNKNOWN"
    | "A"
    | "C"
    | "E"
    | "H"
    | "L"
    | "S"
    | "P"
    | "B1"
    | "B2"
    | "D1"
    | "G1"
    | "I"
    | "U1"
    | "U2"
    | "V1"
    | "V2"
    | "X";
export type CommunicationCapability =
    | "UNKNOWN"
    | "H"
    | "U"
    | "E1"
    | "E2"
    | "E3"
    | "J1"
    | "J2"
    | "J3"
    | "J4"
    | "J5"
    | "J6"
    | "J7"
    | "M1"
    | "M2"
    | "M3"
    | "V"
    | "Y"
    | "P1"
    | "P2"
    | "P3"
    | "P4"
    | "P5"
    | "P6"
    | "P7"
    | "P8"
    | "P9";
export type NavigationCapability =
    | "UNKNOWN"
    | "A"
    | "B"
    | "C"
    | "D"
    | "F"
    | "L"
    | "I"
    | "X"
    | "G"
    | "K"
    | "O"
    | "R"
    | "T"
    | "W"
    | "RNAVX"
    | "RNAVINOP";
export type EmergencyRadioType = "E" | "U" | "V";
export type PerformanceBasedNavigationCapability =
    | "UNKNOWN"
    | "B1"
    | "B2"
    | "D1"
    | "A1"
    | "B3"
    | "B4"
    | "B5"
    | "B6"
    | "C1"
    | "C2"
    | "C3"
    | "C4"
    | "D2"
    | "D3"
    | "D4"
    | "L1"
    | "O1"
    | "O2"
    | "O3"
    | "O4"
    | "S1"
    | "S2"
    | "T1"
    | "T2";
export type AircraftBase = {
    registration?: string;
    msn: string;
    technicalStatus: TechnicalStatus;
    homebaseVertiportId?: string;
    validFrom: string;
    validTo?: string;
    crewConfiguration: CrewConfiguration;
    services: Service[];
    colorAndMarkingCharacteristics?: string[];
    survivalEquipmentClassifications?: SurvivalEquipmentClassification[];
    lifeJacketEquipment?: LifeJacketEquipment[];
    surveillanceTransponderTypes?: SurveillanceTransponderType[];
    communicationCapabilities?: CommunicationCapability[];
    navigationCapabilities?: NavigationCapability[];
    dryOperatingMass?: number;
    nominalRange?: number;
    nominalEndurance?: number;
    emergencyRadioTypes?: EmergencyRadioType[];
    performanceBasedNavigationCapabilities?: PerformanceBasedNavigationCapability[];
    massAndBalanceData?: MassAndBalanceData;
    aircraftResources?: AircraftResource[];
};

export type AircraftCreateAllOf = {
    aircraftTypeId: string;
};

export type AircraftUpdate = AircraftBase;

export type AircraftResourcesCount = {
    pilotSeats?: number;
    passengerSeats?: number;
    batterySlots?: number;
    luggageCompartments?: number;
    otherResources?: number;
    aircraftCount?: number;
};

export type AircraftAllOf = {
    id: string;
    aircraftTypeName?: string;
    homebaseVertiportName?: string;
    version?: number;
    synchronizedWithLeon: boolean;
    lastSynchronizedAt?: string;
    createdBy: string;
    createTime: string;
    updatedBy: string;
    updateTime: string;
};

export type AircraftCreate = AircraftBase & AircraftCreateAllOf;
export type Aircraft = AircraftCreate & AircraftUpdate & BaseDto & AircraftResourcesCount & AircraftAllOf;
export type AircraftBulkUpdate = {
    fieldType: string;
    newValue: string | object[] | null;
};
