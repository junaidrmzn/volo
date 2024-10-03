const COMMERCIAL_SCHEDULING = "commercial-scheduling";
const VERTIPORT_MANAGEMENT = "vertiport-management";
const AIRCRAFT_MANAGEMENT = "aircraft-management";
const FLIGHT_PLANNING = "flight-planning";

export const BASE_URL = "http://api.cypress.voloiq.io";
export const VERSION = "v1";

export const regionUrl = `${BASE_URL}/${VERTIPORT_MANAGEMENT}/${VERSION}/regions`;
export const scheduleUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/commercial-schedules`;
export const planUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/commercial-plans`;
export const planProcessUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/commercial-plan-processes`;
export const priceUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/commercial-prices`;
export const priceItemUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/commercial-price-items`;
export const offerUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/commercial-offers`;
export const offerItemUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/commercial-offer-items`;
export const planSummaryUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/commercial-schedule-item-customizations`;
export const promotionUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/promotions`;
export const connectionUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/connections`;
export const aircrafttypeUrl = `${BASE_URL}/${VERSION}/${AIRCRAFT_MANAGEMENT}/aircraft-types`;
export const vertiportUrl = `${BASE_URL}/${VERSION}/${VERTIPORT_MANAGEMENT}/vertiports`;
export const routeUrl = `${BASE_URL}/${VERSION}/${FLIGHT_PLANNING}/routes`;
export const routeOptionUrl = `${BASE_URL}/${VERSION}/${FLIGHT_PLANNING}/route-options`;
