import { QueryClient, QueryClientProvider } from "react-query";
import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { mswServer } from "../../../testing/msw-server";
import { mockedBaseUrl } from "../../../testing/url";
import { RouteTemplateNavigation } from "../RouteTemplateNavigation";

const queryClient = new QueryClient();

jest.mock("@voloiq/routing", () => ({
    ...jest.requireActual("@voloiq/routing"),
    useParams: () => ({
        routeOptionId: 1,
    }),
    useOutletContext: () => ({
        onSelectRouteTemplatePreview: jest.fn(),
        closeSidebar: jest.fn(),
        previewedTemplate: undefined,
    }),
}));

const RouteTemplateNavigationTestComponent = () => (
    <ServiceProvider baseUrl={mockedBaseUrl}>
        <QueryClientProvider client={queryClient}>
            <RouteTemplateNavigation />
        </QueryClientProvider>
    </ServiceProvider>
);

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

describe("RouteTemplateNavigation", () => {
    test("clicking filter button renders filter options", async () => {
        render(<RouteTemplateNavigationTestComponent />);
        expect(await screen.findByText("Route Template List")).toBeVisible();
        const filterButton = screen.getByTestId("route-templates-filter-button");
        userEvent.click(filterButton);
        expect(await screen.findByText("Filter", { exact: false })).toBeVisible();
        expect(screen.getByText("Name")).toBeVisible();
        expect(screen.getByText("Planned by")).toBeVisible();
        expect(screen.getByText("Distance")).toBeVisible();
        expect(screen.getByText("Created at")).toBeVisible();
        expect(screen.getByText("Validity Date")).toBeVisible();
    });

    test("clicking sort button renders sort options", async () => {
        render(<RouteTemplateNavigationTestComponent />);
        expect(await screen.findByText("Route Template List")).toBeVisible();
        const sortButton = screen.getByTestId("route-templates-sort-button");
        userEvent.click(sortButton);
        expect(await screen.findByText("Sort", { exact: false })).toBeVisible();
        expect(screen.getByText("Name")).toBeVisible();
        expect(screen.getByText("Distance")).toBeVisible();
        expect(screen.getByText("Created at")).toBeVisible();
        expect(screen.getByText("Validity Date")).toBeVisible();
        expect(screen.getByText("Ascending")).toBeVisible();
        expect(screen.getByText("Descending")).toBeVisible();
    });

    test("open filter and press cancel", async () => {
        render(<RouteTemplateNavigationTestComponent />);

        expect(await screen.findByText("Route Template List")).toBeVisible();
        const filterButton = screen.getByTestId("route-templates-filter-button");
        userEvent.click(filterButton);
        expect(await screen.findByText("Filter", { exact: false })).toBeVisible();

        const cancelButton = screen.getByRole("button", { name: "Cancel" });
        userEvent.click(cancelButton);
        expect(await screen.findByText("Route Template List")).toBeVisible();
    });

    test("open filter and press apply", async () => {
        render(<RouteTemplateNavigationTestComponent />);

        expect(await screen.findByText("Route Template List")).toBeVisible();
        const filterButton = screen.getByTestId("route-templates-filter-button");
        userEvent.click(filterButton);
        expect(await screen.findByText("Filter", { exact: false })).toBeVisible();

        const applyButton = screen.getByRole("button", { name: "Apply" });
        userEvent.click(applyButton);
        expect(await screen.findByText("Route Template List")).toBeVisible();
    });

    test("open filter and press back", async () => {
        render(<RouteTemplateNavigationTestComponent />);

        expect(await screen.findByText("Route Template List")).toBeVisible();
        const filterButton = screen.getByTestId("route-templates-filter-button");
        userEvent.click(filterButton);
        expect(await screen.findByText("Filter", { exact: false })).toBeVisible();

        const backButton = screen.getByRole("button", { name: "Back" });
        userEvent.click(backButton);
        expect(await screen.findByText("Route Template List")).toBeVisible();
    });

    test("open sort and press cancel", async () => {
        render(<RouteTemplateNavigationTestComponent />);

        expect(await screen.findByText("Route Template List")).toBeVisible();
        const sortButton = screen.getByTestId("route-templates-sort-button");
        userEvent.click(sortButton);
        expect(await screen.findByText("Sort", { exact: false })).toBeVisible();

        const cancelButton = screen.getByRole("button", { name: "Cancel" });
        userEvent.click(cancelButton);
        expect(await screen.findByText("Route Template List")).toBeVisible();
    });

    test("open sort and press apply", async () => {
        render(<RouteTemplateNavigationTestComponent />);

        expect(await screen.findByText("Route Template List")).toBeVisible();
        const sortButton = screen.getByTestId("route-templates-sort-button");
        userEvent.click(sortButton);
        expect(await screen.findByText("Sort", { exact: false })).toBeVisible();

        const applyButton = screen.getByRole("button", { name: "Apply" });
        userEvent.click(applyButton);
        expect(await screen.findByText("Route Template List")).toBeVisible();
    });

    test("open sort and press back", async () => {
        render(<RouteTemplateNavigationTestComponent />);

        expect(await screen.findByText("Route Template List")).toBeVisible();
        const sortButton = screen.getByTestId("route-templates-sort-button");
        userEvent.click(sortButton);
        expect(await screen.findByText("Sort", { exact: false })).toBeVisible();

        const backButton = screen.getByRole("button", { name: "Back" });
        userEvent.click(backButton);
        expect(await screen.findByText("Route Template List")).toBeVisible();
    });
});
