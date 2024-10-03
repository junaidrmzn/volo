import { Table, Tbody } from "@volocopter/design-library-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { anyRoute } from "@voloiq/flight-planning-api/v1";
import { ServiceProvider } from "@voloiq/service";
import { render, screen } from "@voloiq/testing";
import { mockedBaseUrl } from "../../../testing/url";
import { RouteListItem } from "../components/RouteListItem";

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        flightId: 1,
    }),
}));

const mockSelectRoute = jest.fn();
jest.mock("../../selected-route", () => ({
    ...jest.requireActual("../../selected-route"),
    useSelectedRoute: () => ({
        selectRoute: mockSelectRoute,
    }),
}));

const mockCreateRouteAsync = jest.fn();
jest.mock("../../../api-hooks", () => ({
    ...jest.requireActual("../../../api-hooks"),
    useCreateRoute: () => ({
        createRouteAsync: mockCreateRouteAsync,
    }),
}));

const queryClient = new QueryClient();
const mockedRoute = anyRoute({ id: 1, name: "route1" });

describe.skip("Route List Item Tests", () => {
    const renderRouteList = () => {
        render(
            <ServiceProvider baseUrl={mockedBaseUrl}>
                <QueryClientProvider client={queryClient}>
                    <Table variant="striped" size="xs">
                        <Tbody>
                            <RouteListItem route={mockedRoute} />
                        </Tbody>
                    </Table>
                </QueryClientProvider>
            </ServiceProvider>
        );
    };

    test("should show route list item", () => {
        renderRouteList();
        expect(screen.getByText(mockedRoute.name)).toBeVisible();
    });

    test("should select route", () => {
        renderRouteList();
        screen.getByText(mockedRoute.name).click();
        expect(mockSelectRoute).toHaveBeenCalledWith(mockedRoute.id);
    });
});
