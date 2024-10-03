import { PadEventType, PadService } from "@voloiq-typescript-api/vertiport-management-types";
import type { Pad, PadCreate } from "@voloiq/vertiport-management-api/v1";

export const anyPad = (overwrites?: Partial<Pad & PadCreate>): Pad => ({
    id: "e1ccddd3-2c8f-4a5e-aea1-35679272bfe4",
    padKey: "PAD A",
    externalId: "ce118b6e-d8e1-11e7-9296-cec278b6jesdb5rr0a",
    services: [PadService.FATO],
    location: {
        longitude: 20.001,
        latitude: 10.001,
        height: 342,
    },
    vertiportId: "ce118b6e-d8e1-11e7-9296-cec278b6b50a",
    createTime: "2020-11-06T16:34:41.000Z",
    updateTime: "2020-11-06T16:34:41.000Z",
    validFrom: "2020-11-06T16:34:41.000Z",
    validTo: "2020-11-06T16:34:41.000Z",
    events: [
        {
            id: "6bba9d15-77cb-4964-8ed5-75830e2997e3",
            title: "Arriving VC0001",
            subTitle: "VC0001",
            startTime: "2023-03-24T10:34:59.873385617Z",
            endTime: "2023-03-24T10:34:59.873412944Z",
            type: PadEventType.ACPARKING,
            createTime: "2020-11-06T16:34:41.000Z",
            updateTime: "2020-11-06T16:34:41.000Z",
        },
    ],
    ...overwrites,
});
