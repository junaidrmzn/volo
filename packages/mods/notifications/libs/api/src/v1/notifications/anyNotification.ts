import merge from "lodash.merge";
import { DeepPartial } from "@voloiq/utils";
import { Notification } from "./notification";

export const anyNotification = (overwrites: DeepPartial<Notification> = {}): Notification =>
    merge(
        {
            id: "326fa915-efc5-48ee-ad14-b6f6c25001b8",
            createdAt: "2022-07-28T14:08:51.607219Z",
            entityType: "Foo",
            entityUuid: "326fa915-efc5-48ee-ad14-b6f6c25001b8",
            resolvable: true,
            resolvedBy: "Foo",
            resolvedAt: "2022-07-28T14:08:51.607219Z",
            severity: "ERROR",
            language: "en",
            sender: "Battery Management",
            message: "Battery temperature surpassed critical level",
            title: "Battery about to explode",
            removed: false,
            muted: false,
            read: false,
            removedAt: null,
            mutedAt: null,
            readAt: null,
        },
        overwrites
    );
