import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { SubmitFlightPlanButton } from "../components/SubmitFlightPlanButton";

const queryClient = new QueryClient();
const mockRoute = anyRoute();

const mockSearchParams = { get: () => "1" };
jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        routeOptionId: 1,
    }),
    useSearchParams: () => {
        return [mockSearchParams];
    },
}));

const mockEditFlightPlanningMissionAsync = jest.fn();
jest.mock("../../../api-hooks", () => ({
    ...jest.requireActual("../../../api-hooks"),
    useEditFlightPlanningMission: () => ({
        editMissionAsync: mockEditFlightPlanningMissionAsync,
    }),
}));

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("SubmitFlightPlanButton Test", () => {
    const SubmitFlightPlanButtonTestComponent = () => {
        return (
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <QueryClientProvider client={queryClient}>
                    <SubmitFlightPlanButton route={mockRoute} />
                </QueryClientProvider>
            </ServiceProvider>
        );
    };

    test("SubmitFlightPlanButton should render", async () => {
        render(<SubmitFlightPlanButtonTestComponent />);
        const submitFlightPlanButton = await screen.findByTestId("submit-flight-plan-button");
        expect(submitFlightPlanButton).toBeVisible();
    });

    test("Clicking SubmitFlightPlanButton should call putFlightPlan", async () => {
        render(<SubmitFlightPlanButtonTestComponent />);
        const menuButton = await screen.findByTestId("submit-flight-plan-button");
        userEvent.click(menuButton);
        expect(mockEditFlightPlanningMissionAsync).toHaveBeenCalledTimes(1);
    });
});
