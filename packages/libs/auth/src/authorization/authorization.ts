export const GROUPS = [
    "Admin",
    "CommercialRoutePlanner",
    "CrewManager",
    "DesignEngineer",
    "DesignEngineerSupervisor",
    "PrivilegedCrewManager",
    "Engineer",
    "FleetManager",
    "FleetReporting",
    "ChiefFlightTestEngineer",
    "FlightTestEngineer",
    "FlightTestInstrumentationEngineer",
    "FlightTestSupervisor",
    "OCC",
    "OperationalRoutePlanner",
    "VertiportManager",
    "ChiefTestPilot",
    "Pilot",
    "SalesManager",
    "BatteryEngineer",
    "Support",
    "WeatherAnalyst",
    "CommercialManagerSalesAgent",
    "CommercialManagerSalesSupervisor",
] as const;
export type Group = typeof GROUPS[number];

export const isGroup = (group: string): group is Group => GROUPS.includes(group as Group);

const ROLES = [
    "AircraftWrite",
    "AircraftRead",
    "FlightMovementRead",
    "FTIRead",
    "FTICreate",
    "FTIEdit",
    "FTIImport",
    "FTIStatusUpdate",
    "LogbookRead",
    "LogbookWrite",
    "MissionRead",
    "MissionWrite",
    "MissionResourcePlanerUpdate",
    "NetworkSchedulingRead",
    "NetworkSchedulingWrite",
    "TestMissionWrite",
    "VertiportRead",
    "VertiportWrite",
    "CrewList",
    "CrewRequest",
    "CrewMngt",
    "CrewPrivilegedAccess",
    "ConnectionWrite",
    "CommercialScheduleWrite",
    "CommercialScheduleRead",
    "BookingRead",
    "BookingWrite",
    "BatteryRead",
    "BatteryUpdate",
    "BatteryAdmin",
    "ESUTypeAdmin",
    "ESUUpdate",
    "ESUAdmin",
    "ChargingOperation",
    "ChargingOperationAdmin",
    "ChargingAdmin",
    "RouteOptionsCreate",
    "RouteOptionsEdit",
    "RouteOptionsRead",
    "RouteCreate",
    "RouteEdit",
    "RouteRead",
    "RouteTemplateCreate",
    "RouteTemplateEdit",
    "RouteTemplateRead",
    "OperationalFlightPlanCreate",
    "OperationalFlightPlanRead",
    "TestPointParameterRead",
    "TestPointParameterCreate",
    "TestPointParameterDelete",
    "TestPointParameterEdit",
    "FlightTestDefinitionRead",
    "FlightTestDefinitionCreate",
    "FlightTestDefinitionDelete",
    "FlightTestDefinitionEdit",
    "TestPointRead",
    "TestPointCreate",
    "TestPointDelete",
    "TestPointEdit",
    "WeatherRead",
    "WeatherUpdate",
    "WeatherCreate",
    "WeatherForecastRead",
    "ConductedRouteGraphRead",
    "WindDataRead",
    "FlightTestOrderRead",
    "FlightTestOrderCreate",
    "FlightTestOrderDelete",
    "FlightTestOrderEdit",
    "FlightTestOrderApprove",
    "FlightTestOrderRelease",
    "FlightTestOrderExecute",
    "FullEnvelopeValidationRead",
    "CommercialManagerSalesAgent",
    "CommercialManagerSalesSupervisor",
    "TestHazardRead",
    "TestHazardEdit",
    "TestHazardDelete",
    "TestHazardCreate",
] as const;
export type Role = typeof ROLES[number];

const RESOURCES = [
    "AcTimegrid",
    "Aircraft",
    "AircraftType",
    "CrewMember",
    "CrewRole",
    "CrewAvailability",
    "CrewInformation",
    "Event",
    "FlightPlan",
    "FlightMovement",
    "Location",
    "Log",
    "ConductedRouteGraph",
    "File",
    "LogStatus",
    "LogExport",
    "LogbookAircraft",
    "LogbookCrewMember",
    "Mission",
    "NspMission",
    "Parameter",
    "ParameterStatusLog",
    "ParameterBulkImportLog",
    "Region",
    "Route",
    "RouteOptions",
    "RouteTemplate",
    "Services",
    "SoftwareConfiguration",
    "TestMission",
    "Timezones",
    "Vertiport",
    "Waypoint",
    "Connection",
    "Battery",
    "ESU",
    "ESUType",
    "ChargingProfile",
    "ChargingStation",
    "ChargingSlot",
    "ChargingLog",
    "ChargingStationSlot",
    "Weather",
    "WeatherForecast",
    "Booking",
    "FlightTestDefinition",
    "TestPointParameter",
    "TestPoint",
    "FlightTestOrder",
    "FlightTestOrderApprove",
    "FlightTestOrderRelease",
    "FlightTestOrderExecute",
    "WindData",
    "FullEnvelopeValidation",
    "CommercialPlan",
    "CommercialSchedule",
    "CommercialPricing",
    "CommercialOffering",
    "PlanSummary",
    "PlanSummaryCustomization",
    "CommercialPromotion",
    "TestHazard",
    "BookingManagement",
] as const;
export type Resource = typeof RESOURCES[number];

export type Action = "create" | "read" | "update" | "delete" | "request-approval" | "approve" | "reject" | "publish";

export type Permission = `${Resource}.${Action}` | "*";

// Wildcards are not allowed at the permission level so that we have
// a one to one mapping with the Confluence Group & Roles page
const rolePermissions: Record<Role, Exclude<Permission, "*">[]> = {
    LogbookRead: [
        "Log.read",
        "Location.read",
        "LogbookCrewMember.read",
        "LogbookAircraft.read",
        "SoftwareConfiguration.read",
        "LogExport.create",
        "LogExport.read",
    ],
    LogbookWrite: [
        "Log.create",
        "Log.read",
        "Log.update",
        "Log.delete",
        "Location.read",
        "LogbookCrewMember.read",
        "LogbookAircraft.read",
        "SoftwareConfiguration.create",
        "SoftwareConfiguration.read",
        "SoftwareConfiguration.update",
        "SoftwareConfiguration.delete",
    ],
    FTIRead: ["Parameter.read", "ParameterStatusLog.read"],
    FTICreate: ["Parameter.create", "Parameter.read", "ParameterStatusLog.read"],
    FTIEdit: ["Parameter.read", "Parameter.update", "ParameterStatusLog.read"],
    FTIImport: ["ParameterBulkImportLog.create", "ParameterBulkImportLog.read"],
    FTIStatusUpdate: [
        "Parameter.read",
        "ParameterStatusLog.create",
        "ParameterStatusLog.read",
        "ParameterStatusLog.update",
    ],
    AircraftWrite: [
        "AircraftType.create",
        "AircraftType.read",
        "AircraftType.update",
        "AircraftType.delete",
        "Aircraft.create",
        "Aircraft.read",
        "Aircraft.update",
        "Aircraft.delete",
    ],
    AircraftRead: ["AircraftType.read", "Aircraft.read"],
    NetworkSchedulingWrite: ["Event.create", "Event.read", "Event.update", "Event.delete", "AcTimegrid.read"],
    NetworkSchedulingRead: ["AcTimegrid.read"],
    MissionWrite: [
        "TestMission.create",
        "TestMission.read",
        "TestMission.update",
        "TestMission.delete",
        "Mission.read",
        "Mission.create",
        "Mission.delete",
    ],
    MissionRead: ["TestMission.read", "Mission.read"],
    TestMissionWrite: ["TestMission.create", "TestMission.read", "TestMission.update", "TestMission.delete"],
    MissionResourcePlanerUpdate: ["NspMission.read", "NspMission.update"],
    VertiportRead: ["Vertiport.read", "Region.read", "Services.read", "Timezones.read"],
    VertiportWrite: [
        "Vertiport.create",
        "Vertiport.read",
        "Vertiport.update",
        "Vertiport.delete",
        "Region.create",
        "Region.read",
        "Region.update",
        "Region.delete",
        "Services.read",
        "Timezones.read",
    ],
    FlightMovementRead: ["Vertiport.read", "Region.read", "Services.read", "Timezones.read", "FlightMovement.read"],
    RouteOptionsCreate: ["RouteOptions.create", "RouteOptions.read", "RouteOptions.update", "RouteOptions.delete"],
    RouteOptionsEdit: ["RouteOptions.read", "RouteOptions.update"],
    RouteOptionsRead: ["RouteOptions.read"],
    RouteCreate: [
        "Route.create",
        "Route.read",
        "Route.update",
        "Route.delete",
        "Waypoint.create",
        "Waypoint.read",
        "Waypoint.update",
        "Waypoint.delete",
    ],
    RouteEdit: ["Route.read", "Route.update", "Waypoint.create", "Waypoint.read", "Waypoint.update", "Waypoint.delete"],
    RouteRead: ["Route.read", "Waypoint.read"],
    RouteTemplateCreate: [
        "RouteTemplate.create",
        "RouteTemplate.read",
        "RouteTemplate.update",
        "RouteTemplate.delete",
        "Waypoint.create",
        "Waypoint.read",
        "Waypoint.update",
        "Waypoint.delete",
    ],
    RouteTemplateEdit: [
        "RouteTemplate.read",
        "RouteTemplate.update",
        "Waypoint.create",
        "Waypoint.read",
        "Waypoint.update",
        "Waypoint.delete",
    ],
    RouteTemplateRead: ["RouteTemplate.read", "Waypoint.read"],
    ConductedRouteGraphRead: ["ConductedRouteGraph.read"],
    WindDataRead: ["WindData.read"],
    FullEnvelopeValidationRead: ["FullEnvelopeValidation.read"],
    OperationalFlightPlanCreate: ["FlightPlan.create", "FlightPlan.read", "FlightPlan.update", "FlightPlan.delete"],
    OperationalFlightPlanRead: ["FlightPlan.read"],
    CrewList: ["CrewMember.read", "CrewRole.read"],
    CrewRequest: [
        "CrewMember.read",
        "CrewRole.read",
        "CrewAvailability.create",
        "CrewAvailability.delete",
        "CrewAvailability.read",
        "CrewAvailability.update",
    ],
    CrewMngt: [
        "CrewAvailability.create",
        "CrewAvailability.read",
        "CrewAvailability.update",
        "CrewAvailability.delete",
        "CrewRole.create",
        "CrewRole.read",
        "CrewRole.update",
        "CrewRole.delete",
        "CrewMember.create",
        "CrewMember.read",
        "CrewMember.update",
        "CrewMember.delete",
    ],
    CrewPrivilegedAccess: ["CrewInformation.read", "CrewInformation.update"],
    ConnectionWrite: ["Connection.create", "Connection.delete", "Connection.read", "Connection.update"],
    CommercialScheduleWrite: [
        "CommercialPlan.create",
        "CommercialPlan.delete",
        "CommercialPlan.read",
        "CommercialPlan.update",
    ],
    CommercialScheduleRead: ["CommercialPlan.read"],
    BookingRead: ["Booking.read"],
    BookingWrite: ["Booking.update", "Booking.read"],
    BatteryRead: ["Battery.read", "ESU.read", "ESUType.read"],
    BatteryUpdate: ["Battery.read", "Battery.update", "ESU.read", "ESU.update", "ESUType.read", "ChargingProfile.read"],
    BatteryAdmin: [
        "Battery.create",
        "Battery.read",
        "Battery.update",
        "Battery.delete",
        "ESU.create",
        "ESU.read",
        "ESU.update",
        "ESU.delete",
        "ESUType.read",
        "ChargingProfile.read",
    ],
    ESUTypeAdmin: ["ESUType.create", "ESUType.read", "ESUType.update", "ESUType.delete"],
    ESUUpdate: ["Battery.read", "Battery.update", "ESU.read", "ESU.update", "ESUType.read", "ChargingProfile.read"],
    ESUAdmin: [
        "Battery.read",
        "Battery.update",
        "ESU.create",
        "ESU.read",
        "ESU.update",
        "ESU.delete",
        "ESUType.read",
        "ChargingProfile.read",
    ],
    ChargingOperation: [
        "ChargingProfile.read",
        "ChargingStation.read",
        "ChargingSlot.read",
        "ChargingLog.read",
        "ChargingStationSlot.read",
    ],
    ChargingOperationAdmin: [
        "ChargingProfile.read",
        "ChargingStation.read",
        "ChargingSlot.read",
        "ChargingLog.read",
        "ChargingStationSlot.read",
    ],
    ChargingAdmin: [
        "ChargingProfile.create",
        "ChargingProfile.read",
        "ChargingProfile.update",
        "ChargingProfile.delete",
        "ChargingStation.create",
        "ChargingStation.read",
        "ChargingStation.update",
        "ChargingStation.delete",
        "ChargingSlot.create",
        "ChargingSlot.read",
        "ChargingSlot.update",
        "ChargingSlot.delete",
        "ChargingLog.read",
        "ChargingLog.create",
        "ChargingLog.update",
        "ChargingLog.delete",
        "ChargingStationSlot.read",
        "ChargingStationSlot.create",
        "ChargingStationSlot.update",
        "ChargingStationSlot.delete",
    ],
    TestPointParameterRead: ["TestPointParameter.read"],
    TestPointParameterCreate: ["TestPointParameter.create"],
    TestPointParameterDelete: ["TestPointParameter.delete"],
    TestPointParameterEdit: ["TestPointParameter.update"],
    FlightTestDefinitionRead: ["FlightTestDefinition.read"],
    FlightTestDefinitionCreate: ["FlightTestDefinition.create"],
    FlightTestDefinitionDelete: ["FlightTestDefinition.delete"],
    FlightTestDefinitionEdit: ["FlightTestDefinition.update"],
    TestPointRead: ["TestPoint.read"],
    TestPointCreate: ["TestPoint.create"],
    TestPointDelete: ["TestPoint.delete"],
    TestPointEdit: ["TestPoint.update"],
    WeatherRead: ["Weather.read"],
    WeatherUpdate: ["Weather.update"],
    WeatherCreate: ["Weather.create"],
    WeatherForecastRead: ["WeatherForecast.read"],
    FlightTestOrderRead: ["FlightTestOrder.read"],
    FlightTestOrderCreate: ["FlightTestOrder.create"],
    FlightTestOrderDelete: ["FlightTestOrder.delete"],
    FlightTestOrderEdit: ["FlightTestOrder.update"],
    FlightTestOrderApprove: ["FlightTestOrderApprove.create"],
    FlightTestOrderExecute: ["FlightTestOrderExecute.create"],
    FlightTestOrderRelease: ["FlightTestOrderRelease.create"],
    CommercialManagerSalesAgent: [
        "CommercialPlan.create",
        "CommercialPlan.read",
        "CommercialPlan.update",
        "CommercialPlan.delete",
        "CommercialPlan.request-approval",
        "CommercialSchedule.read",
        "CommercialPricing.create",
        "CommercialPricing.read",
        "CommercialPricing.update",
        "CommercialPricing.request-approval",
        "CommercialOffering.create",
        "CommercialOffering.read",
        "CommercialOffering.update",
        "CommercialOffering.request-approval",
        "PlanSummary.read",
        "PlanSummary.update",
        "PlanSummaryCustomization.update",
        "PlanSummaryCustomization.delete",
        "CommercialPromotion.create",
        "CommercialPromotion.read",
        "BookingManagement.read",
    ],
    CommercialManagerSalesSupervisor: [
        "CommercialPlan.create",
        "CommercialPlan.read",
        "CommercialPlan.update",
        "CommercialPlan.delete",
        "CommercialPlan.request-approval",
        "CommercialPlan.approve",
        "CommercialPlan.reject",
        "CommercialPlan.publish",
        "CommercialSchedule.read",
        "CommercialPricing.create",
        "CommercialPricing.read",
        "CommercialPricing.update",
        "CommercialPricing.delete",
        "CommercialPricing.request-approval",
        "CommercialPricing.approve",
        "CommercialPricing.reject",
        "CommercialOffering.create",
        "CommercialOffering.read",
        "CommercialOffering.update",
        "CommercialOffering.delete",
        "CommercialOffering.request-approval",
        "CommercialOffering.approve",
        "CommercialOffering.reject",
        "PlanSummary.read",
        "PlanSummary.update",
        "PlanSummary.delete",
        "PlanSummaryCustomization.update",
        "PlanSummaryCustomization.delete",
        "PlanSummaryCustomization.approve",
        "PlanSummaryCustomization.reject",
        "CommercialPromotion.create",
        "CommercialPromotion.read",
        "CommercialPromotion.publish",
        "BookingManagement.read",
    ],
    TestHazardRead: ["TestHazard.read"],
    TestHazardCreate: ["TestHazard.create"],
    TestHazardEdit: ["TestHazard.update"],
    TestHazardDelete: ["TestHazard.delete"],
};

const groupRoles: Record<Group, (Role | "*")[]> = {
    Admin: ["*"],
    FlightTestSupervisor: [
        "LogbookWrite",
        "FTIRead",
        "TestPointParameterRead",
        "TestPointParameterCreate",
        "TestPointParameterEdit",
        "TestPointParameterDelete",
        "FlightTestDefinitionRead",
        "FlightTestDefinitionCreate",
        "FlightTestDefinitionDelete",
        "FlightTestDefinitionEdit",
        "TestPointRead",
        "TestPointCreate",
        "TestPointDelete",
        "TestPointEdit",
        "FlightTestOrderRead",
        "FlightTestOrderCreate",
        "FlightTestOrderDelete",
        "FlightTestOrderEdit",
        "FlightTestOrderRelease",
        "FlightTestOrderExecute",
        "TestHazardCreate",
        "TestHazardRead",
        "TestHazardEdit",
        "TestHazardDelete",
    ],
    ChiefFlightTestEngineer: [
        "LogbookRead",
        "FTIRead",
        "MissionWrite",
        "TestPointParameterRead",
        "FlightTestDefinitionRead",
        "FlightTestDefinitionCreate",
        "FlightTestDefinitionEdit",
        "TestPointRead",
        "TestPointCreate",
        "TestPointEdit",
        "FlightTestOrderRead",
        "FlightTestOrderCreate",
        "FlightTestOrderDelete",
        "FlightTestOrderEdit",
        "FlightTestOrderApprove",
        "FlightTestOrderRelease",
        "FlightTestOrderExecute",
        "TestHazardRead",
        "TestHazardCreate",
    ],
    FlightTestEngineer: [
        "LogbookRead",
        "FTIRead",
        "MissionWrite",
        "TestPointParameterRead",
        "FlightTestDefinitionRead",
        "FlightTestDefinitionCreate",
        "FlightTestDefinitionEdit",
        "TestPointRead",
        "TestPointCreate",
        "TestPointEdit",
        "FlightTestOrderRead",
        "FlightTestOrderCreate",
        "FlightTestOrderDelete",
        "FlightTestOrderEdit",
        "FlightTestOrderRelease",
        "FlightTestOrderExecute",
        "TestHazardRead",
        "TestHazardCreate",
    ],
    FlightTestInstrumentationEngineer: ["FTIRead", "FTICreate", "FTIEdit", "FTIImport", "FTIStatusUpdate"],
    Engineer: ["FTIRead", "FTICreate", "LogbookRead"],
    DesignEngineer: [
        "TestPointParameterRead",
        "TestPointParameterCreate",
        "TestPointParameterEdit",
        "TestPointParameterDelete",
        "FlightTestDefinitionRead",
        "FlightTestDefinitionCreate",
        "FlightTestDefinitionDelete",
        "FlightTestDefinitionEdit",
        "TestPointRead",
        "TestPointCreate",
        "TestPointDelete",
        "TestPointEdit",
        "FTIRead",
        "TestHazardRead",
    ],
    DesignEngineerSupervisor: [
        "TestPointParameterRead",
        "TestPointParameterCreate",
        "TestPointParameterEdit",
        "TestPointParameterDelete",
        "FlightTestDefinitionRead",
        "FlightTestDefinitionCreate",
        "FlightTestDefinitionDelete",
        "FlightTestDefinitionEdit",
        "TestPointRead",
        "TestPointCreate",
        "TestPointDelete",
        "TestPointEdit",
        "FTIRead",
        "TestHazardRead",
    ],
    FleetManager: [
        "AircraftWrite",
        "NetworkSchedulingWrite",
        "NetworkSchedulingRead",
        "VertiportRead",
        "FlightMovementRead",
        "CrewList",
    ],
    FleetReporting: ["NetworkSchedulingRead", "VertiportRead"],
    OCC: [
        "NetworkSchedulingRead",
        "TestMissionWrite",
        "MissionResourcePlanerUpdate",
        "MissionWrite",
        "VertiportRead",
        "FlightMovementRead",
        "CrewList",
        "CrewRequest",
        "RouteOptionsRead",
        "RouteRead",
        "RouteTemplateRead",
        "OperationalFlightPlanCreate",
        "BatteryRead",
        "ChargingOperation",
    ],
    VertiportManager: [
        "VertiportWrite",
        "FlightMovementRead",
        "BatteryRead",
        "ChargingOperation",
        "ChargingOperationAdmin",
    ],
    CrewManager: ["VertiportRead", "CrewList", "CrewRequest", "CrewMngt"],
    PrivilegedCrewManager: ["VertiportRead", "CrewList", "CrewRequest", "CrewMngt", "CrewPrivilegedAccess"],
    OperationalRoutePlanner: [
        "ConductedRouteGraphRead",
        "AircraftWrite",
        "VertiportRead",
        "RouteOptionsCreate",
        "RouteCreate",
        "RouteTemplateCreate",
        "FullEnvelopeValidationRead",
    ],
    CommercialRoutePlanner: [
        "WindDataRead",
        "AircraftWrite",
        "VertiportRead",
        "RouteOptionsCreate",
        "RouteRead",
        "RouteTemplateRead",
        "ConnectionWrite",
        "CommercialScheduleWrite",
        "OperationalFlightPlanRead",
        "WeatherCreate",
        "WeatherUpdate",
    ],
    ChiefTestPilot: [
        "LogbookRead",
        "FTIRead",
        "TestPointParameterRead",
        "FlightTestDefinitionRead",
        "TestPointRead",
        "FlightTestOrderRead",
        "FlightTestOrderEdit",
        "FlightTestOrderApprove",
        "TestHazardRead",
    ],
    Pilot: ["CrewList", "BatteryRead", "RouteOptionsRead", "RouteRead", "OperationalFlightPlanRead"],
    SalesManager: ["BookingRead", "BookingWrite"],
    BatteryEngineer: [
        "LogbookRead",
        "FTIRead",
        "BatteryRead",
        "BatteryUpdate",
        "BatteryAdmin",
        "ESUUpdate",
        "ESUAdmin",
        "ESUTypeAdmin",
        "ChargingOperation",
        "ChargingOperationAdmin",
        "ChargingAdmin",
    ],
    Support: [
        "LogbookRead",
        "FTIRead",
        "NetworkSchedulingRead",
        "MissionRead",
        "VertiportRead",
        "FlightMovementRead",
        "CrewList",
        "RouteOptionsRead",
        "RouteRead",
        "RouteTemplateRead",
        "OperationalFlightPlanRead",
        "BookingRead",
    ],
    WeatherAnalyst: ["WeatherRead", "WeatherForecastRead"],
    CommercialManagerSalesAgent: ["CommercialManagerSalesAgent"],
    CommercialManagerSalesSupervisor: ["CommercialManagerSalesSupervisor"],
};

export const getPermissionsFromGroups = (groups: Group[]): Permission[] => {
    const permissions: Permission[] = [];

    for (const group of groups) {
        const roles = groupRoles[group];

        if (roles.includes("*")) {
            return ["*"];
        }

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        for (const role of roles as Role[]) {
            const innerPermissions = rolePermissions[role];
            permissions.push(...innerPermissions);
        }
    }

    return [...new Set(permissions)];
};
