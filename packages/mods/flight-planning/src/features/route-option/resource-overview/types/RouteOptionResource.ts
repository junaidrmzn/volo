import type { RouteOption } from "@voloiq-typescript-api/flight-planning-types/dist";

/**
 * This Type is needed because the default RouteOption
 * has an id of type number.
 *
 * Until this is changed to string this type is needed for
 * Generic ResourceOverview to work without rewriting
 * everything related to fetching data
 */

export type RouteOptionResource = RouteOption & { id: string };
