import { rest } from "msw";
import { AIRCRAFT_MANAGEMENT_SERVICE_URL } from "../serviceUrls";
import { vertiportDatabase } from "./VertiportManagementDatabase";

const getAllVertiportSelectOptionsHandler = rest.get(
    `${AIRCRAFT_MANAGEMENT_SERVICE_URL}/vertiports`,
    (_request, response, context) =>
        response(
            context.json({
                data: vertiportDatabase.getAll(),
            })
        )
);

export const vertiportHandlers = () => [getAllVertiportSelectOptionsHandler];
