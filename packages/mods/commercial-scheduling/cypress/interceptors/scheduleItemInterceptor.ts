import { ScheduleItem, anyScheduleItem } from "@voloiq/commercial-scheduling-api/v1";
import { scheduleUrl } from "./endPoints";
import { paramsRegex } from "./regex";

export const getScheduleItemsInterceptor = (scheduleId: string, overwrites?: Partial<ScheduleItem>) => {
    const url = new RegExp(`^${scheduleUrl}/${scheduleId}/commercial-schedule-items${paramsRegex}$`);

    cy.intercept("GET", url, {
        statusCode: 200,
        body: {
            data: [anyScheduleItem(overwrites)],
            error: null,
            meta: null,
            pagination: { page: 1, size: 10, totalPages: 1, totalElements: 1 },
        },
    }).as("getScheduleItems");
};
