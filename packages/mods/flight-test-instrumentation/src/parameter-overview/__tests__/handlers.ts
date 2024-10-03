import { anyAircraft, makeGetAllAircraftHandler } from "../../libs/fti-api/mocks/msw/AircraftMock";
import { anyAircraftZone, makeGetAllAircraftZoneHandler } from "../../libs/fti-api/mocks/msw/AircraftZoneMock";
import { anyAtaIspec, makeGetAllAtaIspecsHandler } from "../../libs/fti-api/mocks/msw/AtaIspecMock";
import {
    anyParameter,
    makeGetAllParameterHandler,
    makeGetParameterHandler,
    makePatchParameterHandler,
    makePostParameterHandler,
    makePostParameterStatusBulkHandler,
    makePostParameterStatusHandler,
} from "../../libs/fti-api/mocks/msw/ParameterMock";
import { anyParameterSource, makeGetAllParameterSourceHandler } from "../../libs/fti-api/mocks/msw/ParameterSourceMock";
import { anySensorType, makeGetAllSensorTypesHandler } from "../../libs/fti-api/mocks/msw/SensorTypeMock";
import { anyUnit, makeGetAllUnitsHandler } from "../../libs/fti-api/mocks/msw/UnitMock";
import { anyWorkgroup, makeGetAllWorkgroupsHandler } from "../../libs/fti-api/mocks/msw/WorkgroupMock";

const parameterA = anyParameter({
    id: "A",
    createTime: "2022-08-02T00:00:00.000Z",
    description: "Long desc A",
    shortDescription: "Short desc A",
    maxValue: 100,
    minValue: 10,
    unit: anyUnit({ label: "m/s" }),
    minimumSamplingFrequency: 500,
    aircraft: anyAircraft({
        productLine: "A",
        aircraftType: "VD150",
        msn: "msn-123",
    }),
    ftiCode: "123",
    status: "DRAFT",
});
const parameterB = anyParameter({
    id: "B",
    createTime: "2022-08-01T00:00:00.000Z",
    description: "Long desc B",
    shortDescription: "Short desc B",
    maxValue: 10,
    minValue: 1,
    unit: anyUnit({ label: "Hz" }),
    minimumSamplingFrequency: 50,
    aircraft: anyAircraft({
        productLine: "B ",
        aircraftType: "VD200",
        msn: "msn-1234",
    }),
    ftiCode: "234",
    status: "DRAFT",
});

const getParameterHandler = makeGetParameterHandler(parameterA);

const getAllParametersHandler = makeGetAllParameterHandler([parameterA, parameterB]);

const postParameterHandler = makePostParameterHandler();
const postParameterStatusHandler = makePostParameterStatusHandler();

const patchParameterHandler = makePatchParameterHandler();

const getAllAircraftHandler = makeGetAllAircraftHandler([
    anyAircraft({
        msn: "VD150",
        aircraftType: "AT",
        productLine: "PL",
    }),
]);

const getAllAircraftZoneHandler = makeGetAllAircraftZoneHandler([
    anyAircraftZone({
        label: "AZ",
    }),
]);

const getAllParameterSourceHandler = makeGetAllParameterSourceHandler([
    anyParameterSource({
        label: "PS",
    }),
]);

const getAllUnitsHandler = makeGetAllUnitsHandler([
    anyUnit({
        label: "U",
    }),
]);

const getAllWorkgroupsHandler = makeGetAllWorkgroupsHandler([
    anyWorkgroup({
        label: "WG",
    }),
]);

const getAllAtaIspecsHandler = makeGetAllAtaIspecsHandler([
    anyAtaIspec({
        label: "AS",
    }),
]);

const getAllSensorTypesHandler = makeGetAllSensorTypesHandler([
    anySensorType({
        label: "ST",
    }),
]);

const postParameterStatusBulkHandler = makePostParameterStatusBulkHandler();

export {
    getParameterHandler,
    getAllParametersHandler,
    postParameterHandler,
    postParameterStatusHandler,
    getAllAircraftHandler,
    getAllAircraftZoneHandler,
    getAllParameterSourceHandler,
    getAllUnitsHandler,
    getAllWorkgroupsHandler,
    getAllAtaIspecsHandler,
    getAllSensorTypesHandler,
    patchParameterHandler,
    postParameterStatusBulkHandler,
};
