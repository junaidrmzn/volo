import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../constants";
import { renderServiceHook } from "../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../serviceEndpoints";
import { useGetKmlFileUploadLink } from "../useGetKmlFileUploadLink";

const { term } = Matchers;
const kmlFileUploadLinkRequest = (routeOptionId: number, fileName: string, fileType: string): RequestOptions => ({
    path: `${FLIGHT_PLANNING_V1}/route-options/${routeOptionId}/kml/upload-link`,
    method: "GET",
    query: { fileName, fileType },
});

const kmlFileUploadLinkResponse = (fileName: string): ResponseOptions => ({
    status: 200,
    body: {
        data: {
            url: term({
                generate: `https://voloiqdevstshsprem.blob.core.windows.net/flight-planning-uploads/kml-files/${fileName}?se=2023-11-07T11%3A49%3A11Z&sp=w&sv=2022-11-02&sr=b&rscd=attachment%3B%20filename%3Dkml-files/${fileName}&sig=5rzuf9LZNcPfy8jqgz4mLw%2B8xNECmzecLi9UsR8WrwI%3D`,
                matcher: 'https:\\/\\/[^\\/]+\\.blob\\.core\\.windows\\.net\\/[^?]+\\.kml[^"]*',
            }),
            expiry: term({
                matcher: "(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d+)?)\\+\\d{2}:\\d{2}",
                generate: "2023-11-03T07:45:23.754231+00:00",
            }),
        },
    },
});

// Skipping this pact test as provider test has not been written yet,
// Reference : https://jira.volocopter.org/browse/VFP-1592
pactWith.skip({ consumer: CONSUMER_FLIGHT_PLANNING_UI, provider: PROVIDER_FLIGHT_PLANNING_API }, (provider) => {
    const routeOptionId = 1;
    const fileName = "test.kml";
    const fileType = "KML";

    it("will fetch route option's kml file upload link", async () => {
        await provider.addInteraction({
            state: `route option with id ${routeOptionId} exists which has a file with fileName ${fileName} and of type ${fileType} ready to be uploaded`,
            uponReceiving: "request to fetch route option's file upload link",
            withRequest: kmlFileUploadLinkRequest(routeOptionId, fileName, fileType),
            willRespondWith: kmlFileUploadLinkResponse(fileName),
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetKmlFileUploadLink({ routeOptionId, manual: true }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.refetchData({ params: { fileName, fileType } });
        });

        await waitForNextUpdate();
    });
});
