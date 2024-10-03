import type { MessageInformation } from "@voloiq-typescript-api/network-scheduling-types";

export const anyMessageInformation = (overwrites?: Partial<MessageInformation>) =>
    ({
        id: "d9381aa2-0955-47a2-ada8-5dcd49117d7d",
        message: "test message",
        authorEmail: "test@volocopter.com",
        publishDate: "2023-04-06T09:42:29.991Z",
        userRole: "OCC",
        ...overwrites,
    } as MessageInformation);
