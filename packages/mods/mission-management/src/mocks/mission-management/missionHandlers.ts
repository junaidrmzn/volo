import { isMissionCreate } from "@voloiq-typescript-api/network-scheduling-types";
import { rest } from "msw";
import { missionDatabaseOperations } from "./MissionManagementDatabase";

const postMissionHandler = rest.post(
    `${BACKEND_BASE_URL}/v1/network-scheduling-management/missions`,
    (request, response, context) => {
        const { body } = request;
        if (!isMissionCreate(body) || body.arrivalDateTime < body.departureDateTime) {
            return response(context.status(400));
        }
        missionDatabaseOperations.add(body);
        return response(context.json({ data: body }));
    }
);

export const missionHandlers = [postMissionHandler];
