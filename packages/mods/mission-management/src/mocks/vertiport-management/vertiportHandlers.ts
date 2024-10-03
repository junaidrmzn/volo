import { rest } from "msw";
import { vertiportDatabase } from "./VertiportManagementDatabase";

const getAllVertiportsHandler = rest.get(
    `${BACKEND_BASE_URL}/vertiport-management/v1/vertiports`,
    (_request, response, context) =>
        response(
            context.json({
                data: vertiportDatabase.getAll(),
            })
        )
);

export const vertiportHandlers = [getAllVertiportsHandler];
