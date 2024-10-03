import { PadEventType } from "@voloiq-typescript-api/vertiport-management-types";
import type { PadEvent, PadEventCreate } from "@voloiq/vertiport-management-api/v1";

export const anyPadEvent = (overwrites?: Partial<PadEvent>): PadEvent => ({
    id: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    title: "Arriving VC0001",
    subTitle: "VC0001",
    startTime: "2023-03-24T10:34:59.873385617Z",
    endTime: "2023-03-24T10:34:59.873412944Z",
    type: PadEventType.ACPARKING,
    createTime: "2020-11-06T16:34:41.000Z",
    updateTime: "2020-11-06T16:34:41.000Z",
    ...overwrites,
});

export const anyPadEventInsert = (overwrites?: Partial<PadEventCreate>): PadEventCreate => ({
    title: "Arriving VC0001",
    subTitle: "VC0001",
    startTime: "2023-03-24T10:34:59.873385617Z",
    endTime: "2023-03-24T10:34:59.873412944Z",
    type: PadEventType.ACPARKING,
    ...overwrites,
});
