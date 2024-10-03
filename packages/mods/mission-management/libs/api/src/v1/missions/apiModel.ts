import { CheckListCategory, MessageInformation } from "./message/apiModels";
import { Weather } from "./weather/apiModels";

export type CheckListItemSeverity = "INFO" | "WARNING" | "ERROR" | "UNKNOWN";

export type CheckListItemStatus = "NEW" | "UPDATED" | "IGNORED" | "OPEN" | "CLOSED" | "UNKNOWN";

export type CheckListItemCreate = {
    title: string;
    checkListCategory: CheckListCategory;
    description: string;
    checkListItemStatus: CheckListItemStatus;
    checkListItemSeverity: CheckListItemSeverity;
    dueDateTime: string;
    assignee?: string;
};

export type CheckListItemAllOf = {
    id: string;
    lastUpdatedAt: string;
    lastUpdatedBy: string;
};

export type CheckListItem = CheckListItemCreate & CheckListItemAllOf;

export type CheckList = {
    name: CheckListCategory;
    severity: CheckListItemSeverity;
    checkListItems: CheckListItem[];
};

export type MassAndBalanceConfigurationType = "BEM" | "BOM" | "BOM1" | "BOM2" | "TOM" | "TOM1" | "TOM2" | "TOM3";
export type WeightPoint = {
    weight?: number;
    momentumX?: number;
    momentumY?: number;
};

export type LoadingItemType = "LUGGAGE" | "OTHER" | "PASSENGER" | "PILOT" | "UNKNOWN";

export type LoadingItem = {
    id?: string;
    name?: string;
    weightPoint?: WeightPoint;
    type?: LoadingItemType;
    isEstimated?: boolean;
};

export type MassAndBalanceConfiguration = {
    id?: string;
    type?: MassAndBalanceConfigurationType;
    isWithinLimits?: boolean;
    loadingItems?: LoadingItem[];
    weightPoint?: WeightPoint;
};

export type MassAndBalanceLoadingConfiguration = {
    cgX: number;
    cgY: number;
    totalWeight: number;
};

export type MassAndBalanceLoadingConfigurationCollection = {
    bem: MassAndBalanceLoadingConfiguration;
    bom: MassAndBalanceLoadingConfiguration;
    tom: MassAndBalanceLoadingConfiguration;
    tom1: MassAndBalanceLoadingConfiguration;
    tom2: MassAndBalanceLoadingConfiguration;
    tom3: MassAndBalanceLoadingConfiguration;
};

export type MassAndBalanceLoadingItem = {
    name: string;
    positionX: number;
    positionY: number;
    weight: number;
};

export type MassAndBalanceLoadingItemCollection = {
    aircraft: MassAndBalanceLoadingItem;
    pilot: MassAndBalanceLoadingItem;
    battery: MassAndBalanceLoadingItem;
    passengers: MassAndBalanceLoadingItem[];
    luggageCollection: MassAndBalanceLoadingItem[];
    others: MassAndBalanceLoadingItem[];
};

export type MissionForFTL = {
    arrivalTimeZone: string;
    arrivalVertiportCode: string;
    departureTimeZone: string;
    departureVertiportCode: string;
    estimatedArrival: string;
    estimatedDeparture: string;
    reportOff: string;
    reportOn: string;
};

export type FlightTimeLimitation = {
    restBefore: number;
    restAfter: number;
    minRestBefore: number;
    minRestAfter: number;
    totalFlightTime: number;
    totalDutyTime: number;
    maxFlightTime: number;
    maxDutyTime: number;
    missions: MissionForFTL[];
};

type ReservationBlockerType =
    | "UNKNOWN"
    | "EVENT"
    | "MISSION"
    | "BRIEFING"
    | "DEBRIEFING"
    | "VACATION"
    | "SICK"
    | "OTHER"
    | "ABSENT_IN_HR_SYSTEM"
    | "PILOT_MISSION"
    | "VERTIPORT";

export declare type ReservationStatus =
    | "UNKNOWN"
    | "PENDING"
    | "ACCEPTED"
    | "DECLINED"
    | "CONFLICT"
    | "RESOURCE_NOT_FOUND";

export declare type AircraftTechnicalStatus =
    | "SERVICEABLE"
    | "UNSERVICEABLE"
    | "SERVICEABLE_WITH_LIMITATIONS"
    | "UNKNOWN";

export declare type StatusOfMission =
    | "PLANNED"
    | "CANCELLED"
    | "BOARDING"
    | "FLYING"
    | "DIVERTED"
    | "PERFORMED"
    | "CLOSED"
    | "UNKNOWN";

export declare type MissionBoardingStatus = "UNKNOWN" | "BOARDING_PENDING" | "BOARDING_OPEN" | "BOARDING_CLOSED";

export declare type MissionConflictType =
    | "UNKNOWN"
    | "TOTAL_TAKE_OFF_WEIGHT_EXCEEDED"
    | "MASS_AND_BALANCE_OUT_OF_LIMITS"
    | "PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT"
    | "AIRCRAFT_ASSIGNMENT_INCOMPLETE"
    | "AIRCRAFT_UNSERVICEABLE"
    | "AIRCRAFT_SERVICE_TYPE_INVALID"
    | "PILOT_ASSIGNMENT_INCOMPLETE"
    | "BOOKINGS_EXCEED_SEAT_NUMBER"
    | "VERTIPORT_DELETED"
    | "WEATHER_OUT_OF_LIMITS"
    | "NOTAMS_INCOMPLETE"
    | "ROUTE_OPTION_ASSIGNMENT_INCOMPLETE"
    | "ROUTE_OPTION_VALIDATION_INCOMPLETE"
    | "PAD_ASSIGNMENT_INCOMPLETE"
    | "MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN";

export const MissionConflict: {
    UNKNOWN: MissionConflictType;
    TOTAL_TAKE_OFF_WEIGHT_EXCEEDED: MissionConflictType;
    MASS_AND_BALANCE_OUT_OF_LIMITS: MissionConflictType;
    PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT: MissionConflictType;
    AIRCRAFT_ASSIGNMENT_INCOMPLETE: MissionConflictType;
    AIRCRAFT_UNSERVICEABLE: MissionConflictType;
    AIRCRAFT_SERVICE_TYPE_INVALID: MissionConflictType;
    PILOT_ASSIGNMENT_INCOMPLETE: MissionConflictType;
    BOOKINGS_EXCEED_SEAT_NUMBER: MissionConflictType;
    VERTIPORT_DELETED: MissionConflictType;
    WEATHER_OUT_OF_LIMITS: MissionConflictType;
    NOTAMS_INCOMPLETE: MissionConflictType;
    ROUTE_OPTION_ASSIGNMENT_INCOMPLETE: MissionConflictType;
    ROUTE_OPTION_VALIDATION_INCOMPLETE: MissionConflictType;
    PAD_ASSIGNMENT_INCOMPLETE: MissionConflictType;
    MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN: MissionConflictType;
} = {
    UNKNOWN: "UNKNOWN",
    TOTAL_TAKE_OFF_WEIGHT_EXCEEDED: "TOTAL_TAKE_OFF_WEIGHT_EXCEEDED",
    MASS_AND_BALANCE_OUT_OF_LIMITS: "MASS_AND_BALANCE_OUT_OF_LIMITS",
    PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT: "PILOT_WITHOUT_PILOT_SEAT_ASSIGNMENT",
    AIRCRAFT_ASSIGNMENT_INCOMPLETE: "AIRCRAFT_ASSIGNMENT_INCOMPLETE",
    AIRCRAFT_UNSERVICEABLE: "AIRCRAFT_UNSERVICEABLE",
    AIRCRAFT_SERVICE_TYPE_INVALID: "AIRCRAFT_SERVICE_TYPE_INVALID",
    PILOT_ASSIGNMENT_INCOMPLETE: "PILOT_ASSIGNMENT_INCOMPLETE",
    BOOKINGS_EXCEED_SEAT_NUMBER: "BOOKINGS_EXCEED_SEAT_NUMBER",
    VERTIPORT_DELETED: "VERTIPORT_DELETED",
    WEATHER_OUT_OF_LIMITS: "WEATHER_OUT_OF_LIMITS",
    NOTAMS_INCOMPLETE: "NOTAMS_INCOMPLETE",
    ROUTE_OPTION_ASSIGNMENT_INCOMPLETE: "ROUTE_OPTION_ASSIGNMENT_INCOMPLETE",
    ROUTE_OPTION_VALIDATION_INCOMPLETE: "ROUTE_OPTION_VALIDATION_INCOMPLETE",
    PAD_ASSIGNMENT_INCOMPLETE: "PAD_ASSIGNMENT_INCOMPLETE",
    MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN: "MISSION_DURATION_MISMATCH_WITH_FLIGHT_PLAN",
};

export declare type Service = "PASSENGER" | "CARGO" | "TEST" | "FERRY_FLIGHT" | "TRAINING" | "CARPOOL" | "UNKNOWN";

export declare type TypeOfOperation = "PILOTED" | "REMOTE_PILOTED" | "UNKNOWN";

export type Booking = {
    bookingId: string;
    scheduleItemId: string;
    customerId: string;
    bookingCode: string;
};

export type CrewMemberAssignment = {
    crewMemberId: string;
    crewMemberRole?: string;
    firstName?: string;
    middleName?: string;
    surName?: string;
};

export type AircraftReservationConflict = {
    blockerId: string;
    blockerType: ReservationBlockerType;
    reservationStartDateTime: string;
    reservationEndDateTime: string;
};

export type PilotReservationConflict = {
    blockerId: string;
    blockerType: ReservationBlockerType;
    reservationStartDateTime: string;
    reservationEndDateTime: string;
};

export type WaypointAssignment = {
    validationResult: {
        time: number;
        remainingDistance2d: number;
        remainingDistance3d: number;
        remainingEnergy: number;
    };
};

export type RouteAssignment = {
    id: number;
    status: "valid" | "invalid";
    waypoints: WaypointAssignment[];
};

export type RouteOptionAssignment = {
    id: number;
    routes: RouteAssignment[];
};

export type MissionAssignmentAllof = {
    id: string;
    aircraftId?: string;
    aircraftTypeId?: string;
    aircraftMSN?: string;
    aircraftRegistration?: string;
    aircraftTypeName?: string;
    batteryId?: string;
    batteryName?: string;
    aircraftReservationStatus?: ReservationStatus;
    aircraftReservationDeclineMessages?: string[];
    aircraftReservationBlockingEntities?: AircraftReservationConflict[];
    aircraftTechnicalStatus?: AircraftTechnicalStatus;
    pilotReservationStatus?: ReservationStatus;
    pilotReservationDeclineMessages?: string[];
    pilotReservationBlockingEntities?: PilotReservationConflict[];
    pilotId?: string;
    pilotFirstName?: string;
    pilotMiddleName?: string;
    pilotSurName?: string;
    crewMemberAssignments?: CrewMemberAssignment[];
    routeOptionId?: number;
    routeOption?: RouteOptionAssignment;
    scheduledDepartureFatoId?: string;
    scheduledDepartureStandId?: string;
    scheduledArrivalFatoId?: string;
    scheduledArrivalStandId?: string;
    scheduledDepartureFatoKey?: string;
    scheduledDepartureStandKey?: string;
    scheduledArrivalFatoKey?: string;
    scheduledArrivalStandKey?: string;
};

export type MissionAssignment = MissionAssignmentAllof & {
    createTime: string;
    updateTime: string;
};

export type BaseDto = {
    createTime: string;
    updateTime: string;
};

export type SubProcessAllOf = {
    id?: string;
    resourceAssignmentDone: boolean;
    batteryAssignmentDone: boolean;
    pilotAcceptanceDone: boolean;
    operationalFlightPlanDone: boolean;
    groundOpsReadyDone: boolean;
    utmClearanceDone: boolean;
    actualDepartureTimeDone: boolean;
    actualArrivalTimeDone: boolean;
    groundOpsCompletionDone: boolean;
    flightClosedDone: boolean;
    telemetryDataUploadDone: boolean;
    pilotDiaryDone?: boolean;
    airlineAcceptanceDone?: boolean;
    paxCheckedInDone?: boolean;
    pilotBriefingAcceptanceDone?: boolean;
};

export type SubProcess = BaseDto & SubProcessAllOf;

export type MissionAllOf = {
    missionAssignmentConfirmed: boolean;
    aircraftReservationStartDateTime: string;
    aircraftReservationEndDateTime: string;
    crewReservationStartDateTime: string;
    crewReservationEndDateTime: string;
    statusOfMission: StatusOfMission;
    missionBoardingStatus: MissionBoardingStatus;
    clearance: boolean;
    isClosable: boolean;
    createdOperationalFlightPlans: number;
    actualDepartureVertiportId?: string;
    actualDepartureVertiportCode?: string;
    departureVertiportCode?: string;
    actualDepartureDateTime?: string;
    estimatedDepartureDateTime?: string;
    actualArrivalVertiportId?: string;
    actualArrivalVertiportCode?: string;
    arrivalVertiportCode?: string;
    actualArrivalDateTime?: string;
    estimatedArrivalDateTime?: string;
    missionConflicts?: MissionConflictType[];
    bookings?: Booking[];
    assignments?: MissionAssignment;
};

export type MissionCreateSource = "UNKNOWN" | "LEON" | "NETWORK_SCHEDULE" | "COMMERCIAL_SCHEDULE";
export type Mission = MissionAllOf &
    MissionEstimatedDateTimes & {
        createTime: string;
        updateTime: string;
        id: string;
        scheduleItemId?: string;
        flightNumber?: string;
        service: Service;
        departureDateTime: string;
        departureVertiportId: string;
        arrivalDateTime: string;
        arrivalVertiportId: string;
        ftoNumber?: string;
        typeOfOperation: TypeOfOperation;
        version: number;
        leonServiceId?: string;
        synchronizedWithLeon: boolean;
        lastSynchronizedAt?: string;
        subProcess?: SubProcess;
        scheduledDepartureFatoId?: string;
        scheduledDepartureStandId?: string;
        scheduledArrivalFatoId?: string;
        scheduledArrivalStandId?: string;
        messages?: MessageInformation[];
        checkLists: CheckList[];
        massAndBalanceConfigurations?: MassAndBalanceConfiguration[];
        massAndBalanceLoadingConfigurationCollection?: MassAndBalanceLoadingConfigurationCollection;
        massAndBalanceLoadingItemCollection?: MassAndBalanceLoadingItemCollection;
        source?: MissionCreateSource;
        departureWeather?: Weather;
        arrivalWeather?: Weather;
        inFlightWeather?: Weather;
        notam?: Notam;
        weatherLastUpdated: string;
        cancellationCode?: string;
        cancellationDescription?: string;
    };

export type MissionBulkUpdate = {
    fieldType: string;
    newValue: string | object[] | null;
};

export type Notam = {
    type: string;
    features: Feature[];
};

export type Feature = {
    id: number;
    type: FeatureType;
    geometry: FeatureGeometry;
    properties: Properties;
};

type FeatureType = "Feature";

type FeatureGeometry = {
    type: FeatureGeometryType;
    geometries: GeometryElement[];
};

type FeatureGeometryType = "GeometryCollection";

type GeometryElement = {
    type: "POINT" | "LINE" | "POLYGON" | "MULTIPOLYGON";
    pointCoordinates: PointCoordinates | null;
    lineCoordinates: LineCoordinates | null;
    polygonCoordinates: PolygonCoordinates | null;
    multiPolygonCoordinates: MultiPolygonCoordinates | null;
};

type PointCoordinates = {
    longitude: number;
    latitude: number;
    height: number;
};

type LineCoordinates = {
    line: PointCoordinates[];
};
type PolygonCoordinates = {
    polygon: LineCoordinates[];
};

type MultiPolygonCoordinates = {
    multiPolygon: PolygonCoordinates;
};

type Properties = {
    lat: number;
    lon: number;
    title: string;
    description: string;
    radius: number;
    effectiveStart: string;
    effectiveEnd: string;
    schedule: string | null;
    purpose: string;
    affectedFIR: string;
};

export type MissionEstimatedDateTimes = {
    estimatedDepartureDateTime: string;
    estimatedArrivalDateTime: string;
    delayCodes: string[];
    version: number;
};
