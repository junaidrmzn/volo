import { Notification, anyNotification } from "@voloiq/notifications-api/v1";
import { baseUrl } from "./constants";
import { getResponseValuesArray } from "./mockResponse";

export const getNotificationsInterceptor = (notifications?: Partial<Notification>[]) =>
    cy.intercept("GET", new RegExp(`${baseUrl}/notification/v1/notifications`), {
        ...getResponseValuesArray(anyNotification, 200, notifications),
    });

export const postNotificationToggleReadInterceptor = (notificationId: string) =>
    cy.intercept("POST", new RegExp(`${baseUrl}/notification/v1/notifications/${notificationId}/toggle-read`), {
        statusCode: 201,
    });

export const postNotificationToggleMuteInterceptor = (notificationId: string) =>
    cy.intercept("POST", new RegExp(`${baseUrl}/notification/v1/notifications/${notificationId}/toggle-mute`), {
        statusCode: 201,
    });

export const postNotificationToggleRemoveInterceptor = (notificationId: string) =>
    cy.intercept("POST", new RegExp(`${baseUrl}/notification/v1/notifications/${notificationId}/toggle-remove`), {
        statusCode: 201,
    });
