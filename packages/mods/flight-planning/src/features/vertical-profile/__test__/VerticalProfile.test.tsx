import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen } from "@voloiq/testing";
import { mockedBaseUrl } from "../../../testing/url";
import { SegmentEditingProvider } from "../../map-route-layer/segment-editing";
import { SelectedRouteSequenceIndexProvider } from "../../selected-route-sequence-index";
import { VerticalProfile } from "../VerticalProfile";

const queryClient = new QueryClient();
const mockRoute = anyRoute();
const VerticalProfileTest = () => {
    return (
        <ServiceProvider baseUrl={mockedBaseUrl}>
            <QueryClientProvider client={queryClient}>
                <SegmentEditingProvider>
                    <SelectedRouteSequenceIndexProvider>
                        <VerticalProfile
                            selectedRoute={mockRoute}
                            airspacesAltitudeRange={[0, 1000]}
                            selectedAirspaceOptions={[]}
                            showAirspaces
                        />
                    </SelectedRouteSequenceIndexProvider>
                </SegmentEditingProvider>
            </QueryClientProvider>
        </ServiceProvider>
    );
};

describe("VerticalProfile", () => {
    test("render vertical profile", () => {
        render(<VerticalProfileTest />);
        expect(screen.getByTestId("vertical-profile")).toBeVisible();
    });
});
