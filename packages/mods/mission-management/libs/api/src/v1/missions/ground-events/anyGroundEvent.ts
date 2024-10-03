import { GroundEvent } from "./apiModels";

export const anyGroundEvent = (overwrites?: Partial<GroundEvent>): Required<GroundEvent> => ({
    id: "67971e70-6483-4a4d-b871-ae7228465f90",
    startTime: "2023-12-12T16:34:41.000Z",
    endTime: "2023-12-12T17:34:41.000Z",
    inboundMissionId: "913bbd82-373e-4574-9ada-56b04872d54a",
    inboundFato: {
        id: "67971e70-6483-4a4d-b871-ae7228465f91",
        validFrom: "2023-12-12T16:34:41.000Z",
        validTo: "2023-12-12T17:34:41.000Z",
        padKey: "F1",
    },
    inboundStand: {
        id: "67971e70-6483-4a4d-b871-ae7228465f91",
        validFrom: "2023-12-12T16:34:41.000Z",
        validTo: "2023-12-12T17:34:41.000Z",
        padKey: "S1",
    },
    outboundMissionId: "913bbd82-373e-4574-9ada-56b04872d54a",
    outboundFato: {
        id: "67971e70-6483-4a4d-b871-ae7228465f91",
        validFrom: "2023-12-12T16:34:41.000Z",
        validTo: "2023-12-12T17:34:41.000Z",
        padKey: "F1",
    },
    outboundStand: {
        id: "67971e70-6483-4a4d-b871-ae7228465f91",
        validFrom: "2023-12-12T16:34:41.000Z",
        validTo: "2023-12-12T17:34:41.000Z",
        padKey: "S1",
    },
    vertiportCode: "XRJ",
    ...overwrites,
});
