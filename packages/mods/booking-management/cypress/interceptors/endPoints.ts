const COMMERCIAL_SCHEDULING = "commercial-scheduling";
const VERTIPORT_MANAGEMENT = "vertiport-management";
const BOOKING = "booking";

export const BASE_URL = "http://api.cypress.voloiq.io";
export const VERSION = "v1";

export const regionUrl = `${BASE_URL}/${VERTIPORT_MANAGEMENT}/${VERSION}/regions`;
export const connectionUrl = `${BASE_URL}/${VERSION}/${COMMERCIAL_SCHEDULING}/connections`;
export const bookingUrl = `${BASE_URL}/${VERSION}/${BOOKING}`;
