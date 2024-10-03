import type { DefaultRequestBody, MockedRequest, RestHandler } from "msw";
import { setupServer } from "msw/node";
import {
    createFlightPlanHandler,
    createRouteHandler,
    createRouteOptionHandler,
    deleteWaypointOnRouteHandler,
    getAllExternalAircraftHandler,
    getAllExternalAircraftTypeHandler,
    getEnergySettingsHandler,
    getExternalAircraftTypeHandler,
    getFlightPlanHandler,
    getFlightPlanLogsHandler,
    getFlightPlansHandler,
    getRouteHandler,
    getRouteOptionHandler,
    getRouteOptionsHandler,
    getRouteTemplateHandler,
    getRouteTemplatesHandler,
    getRoutesHandler,
    getUtmServiceProvidersHandler,
    getVerticalTerrainHandler,
    getVertiportsHandler,
    getWaypointsOnRouteHandler,
    getWebsocketJoinGroupHandler,
    getWebsocketNegotiateHandler,
    postVerticalTerrainHandler,
    putWaypointOnRouteHandler,
} from "./handlers";

const handlers: RestHandler<MockedRequest<DefaultRequestBody>>[] = [
    createFlightPlanHandler,
    createRouteHandler,
    createRouteOptionHandler,
    deleteWaypointOnRouteHandler,
    getAllExternalAircraftHandler,
    getAllExternalAircraftTypeHandler,
    getExternalAircraftTypeHandler,
    getUtmServiceProvidersHandler,
    getFlightPlanHandler,
    getFlightPlanLogsHandler,
    getFlightPlansHandler,
    getRouteHandler,
    getRouteOptionHandler,
    getRouteOptionsHandler,
    getRouteTemplateHandler,
    getRouteTemplatesHandler,
    getRoutesHandler,
    getVertiportsHandler,
    getWaypointsOnRouteHandler,
    getWebsocketJoinGroupHandler,
    getWebsocketNegotiateHandler,
    putWaypointOnRouteHandler,
    getEnergySettingsHandler,
    getVerticalTerrainHandler,
    postVerticalTerrainHandler,
];
export const mswServer = setupServer(...handlers);
