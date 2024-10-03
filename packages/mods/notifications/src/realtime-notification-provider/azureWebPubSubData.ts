import { Notification, isNotification } from "@voloiq/notifications-api/v1";

const azureWebPubSubDataTypes = ["system", "message"] as const;

type AzureWebPubSubData = {
    type: typeof azureWebPubSubDataTypes[number];
    data: Notification;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAzureWebPubSubData = (data: any): data is AzureWebPubSubData =>
    azureWebPubSubDataTypes.includes(data.type) && isNotification(data.data);
