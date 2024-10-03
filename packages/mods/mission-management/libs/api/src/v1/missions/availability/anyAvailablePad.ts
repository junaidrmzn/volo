import { Pad } from "@voloiq-typescript-api/vertiport-management-types";

export const anyAvailablePad = (overwrites?: Partial<Pad>): Required<Pad> => ({
    padKey: "P1",
    location: {
        longitude: 12.49,
        latitude: 41.89,
        height: 5,
    },
    validFrom: "2022-08-01T11:57:00.000Z",
    createTime: "2023-05-02T09:02:22.524Z",
    updateTime: "2023-08-30T09:45:13.294Z",
    id: "aa7b957f-d301-438f-af5a-e3ed0794ee75",
    externalId: "P1",
    services: ["STAND", "OVERNIGHT-PARKING", "FATO"],
    validTo: "2024-12-01T11:00:00.000Z",
    events: [
        {
            title: "",
            startTime: "2023-07-27T16:00:00.000Z",
            endTime: "2023-07-27T17:00:00.000Z",
            type: "GENERAL",
            createTime: "2023-07-25T13:27:40.735Z",
            updateTime: "2023-08-30T09:45:15.583Z",
            id: "3956758c-d71f-4561-921f-404d1c84471a",
            subTitle: "",
            blockerId: "459a6ccd-fa98-4689-abed-dc8371503236",
            blockerType: "MISSION",
            reservationType: "DEPARTURE",
            service: "STAND",
        },
    ],
    vertiportId: "97468050-19df-4c12-a751-b8a23da56121",
    ...overwrites,
});
