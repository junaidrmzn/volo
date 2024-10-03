import { v4 as uuidV4 } from "uuid";
import { anyTipTapJson } from "../../common";
import { anyLinkedDefinition } from "./anyLinkedDefinition";
import type { FlightTestOrder } from "./apiModels";

const someDate = new Date("2024-04-01T00:00:00Z");

export const anyFlightTestOrder = (overwrites: Partial<FlightTestOrder> = {}): FlightTestOrder => ({
    id: uuidV4(),
    createTime: someDate.toISOString(),
    updateTime: someDate.toISOString(),
    createdBy: "John Doe",
    ftoId: "FTO-V21-2023-002",
    missionTitle: "Flt#53: Aerocover Validation & ADAHRS Phase 3.1",
    masterModel: "VC2-1",
    msn: "MSN 01",
    missionObjective: JSON.stringify(anyTipTapJson("short summary")),
    flightTestPlanIds: [],
    riskLevel: "HIGH",
    flightTestCategory: "Cat. 1",
    aircraftCallsign: "Foo",
    model: "Foo",
    flightConditions: "Foo",
    revision: "Foo",
    issueDateFlightConditions: someDate.toISOString(),
    permitToFly: "Foo",
    issueDatePermitToFly: someDate.toISOString(),
    notesToAircraft: "These are notes",
    maxTestAltitude: "100 ft",
    weatherLimits: "no limits",
    weatherObserved: "great",
    airspaceRequested: "Test Airspace",
    aircraftReleaseConfigurations: [],
    flightTestCrew: [],
    testPointCounter: 2,
    testPointSequenceCounter: 1,
    status: "DRAFT",
    linkedDefinitions: [anyLinkedDefinition()],
    ...overwrites,
});
