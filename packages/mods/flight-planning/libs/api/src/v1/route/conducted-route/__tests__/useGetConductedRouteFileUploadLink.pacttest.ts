import { Matchers } from "@pact-foundation/pact";
import type { RequestOptions, ResponseOptions } from "@pact-foundation/pact";
import { act } from "@testing-library/react-hooks";
import { pactWith } from "jest-pact";
import { CONSUMER_FLIGHT_PLANNING_UI, PROVIDER_FLIGHT_PLANNING_API } from "../../../../constants";
import { renderServiceHook } from "../../../../renderServiceHook";
import { FLIGHT_PLANNING_V1 } from "../../../../serviceEndpoints";
import { useGetConductedRouteFileUploadLink } from "../useGetConductedRouteFileUploadLink";

const { term } = Matchers;
const conductedRouteFileUploadLinkRequest = (routeId: number, fileName: string, fileType: string): RequestOptions => ({
    path: `${FLIGHT_PLANNING_V1}/routes/${routeId}/conducted-route/upload-link`,
    method: "GET",
    query: { fileName, fileType },
});

const conductedRouteFileUploadLinkResponse = (fileName: string): ResponseOptions => ({
    status: 200,
    body: {
        data: {
            url: term({
                generate: `https://my-testing-storage.blob.core.windows.net/uploads/simulator-logs/${fileName}?se=2023-11-03T07%3A45%3A23Z&sp=w&sv=2022-11-02&sr=b&rscd=attachment%3B%20filename%3Dsimulator-logs/${fileName}&sig=8uqJ9icAmZOyR3eLuPPKGBJ36BLVrqCnUaBdClDyVe8%3D%22,%22expiry%22:%222023-11-03T07:45:23.754231+00:00%22%7D%7D`,
                matcher: 'https:\\/\\/[^\\/]+\\.blob\\.core\\.windows\\.net\\/[^?]+\\.csv[^"]*',
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
    const routeId = 1;
    const fileName = "test.csv";
    const fileType = "SIMULATOR";

    it("will get conducted route's upload link", async () => {
        await provider.addInteraction({
            state: `route with id ${routeId} exists which has a file with fileName ${fileName} and of type ${fileType} ready to be uploaded`,
            uponReceiving: "request to fetch conducted route's file upload link",
            withRequest: conductedRouteFileUploadLinkRequest(routeId, fileName, fileType),
            willRespondWith: conductedRouteFileUploadLinkResponse(fileName),
        });

        const { result, waitForNextUpdate } = renderServiceHook(
            () => useGetConductedRouteFileUploadLink({ routeId, manual: true }),
            provider.mockService.baseUrl + FLIGHT_PLANNING_V1
        );

        act(() => {
            result.current.refetchData({ params: { fileName, fileType } });
        });

        await waitForNextUpdate();
    });
});
