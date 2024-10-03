import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent, waitFor } from "@voloiq/testing";
import { anyEsuResourceWithId } from "../../mocks/battery-management";
import { setupEsuServiceMock } from "../../mocks/server";
import { BATTERY_MANAGEMENT_BASE_URL } from "../../mocks/serviceUrls";
import { EsuOverview } from "../EsuOverview";
import { EditEsu } from "../edit/EditEsu";

const { listen, resetHandlers, close, esuDatabaseOperations } = setupEsuServiceMock();
const timeout: number = 10_000;

beforeAll(() => {
    listen();
    esuDatabaseOperations.add(
        anyEsuResourceWithId({
            id: "12345",
            name: `ESU-12345`,
        })
    );
    esuDatabaseOperations.add(
        anyEsuResourceWithId({
            id: "54321",
            name: `ESU-54321`,
        })
    );
});

afterEach(resetHandlers);
afterAll(() => {
    close();
    esuDatabaseOperations.clear();
});

describe("EsuOverview Test", () => {
    const EsuOverviewComponent = () => {
        return (
            <ServiceProvider baseUrl={BATTERY_MANAGEMENT_BASE_URL}>
                <EsuOverview />
            </ServiceProvider>
        );
    };

    const EsuEditComponent = () => {
        return (
            <ServiceProvider baseUrl={BATTERY_MANAGEMENT_BASE_URL}>
                <EditEsu />
            </ServiceProvider>
        );
    };

    test(
        "it renders EsuOverview",
        async () => {
            render(<EsuOverviewComponent />);
            const firstEsuEntry = await screen.findByText("ESU-54321");
            expect(firstEsuEntry).toBeVisible();
        },
        timeout
    );

    test(
        "it renders EsuOverviewDetails with its corresponding buttons",
        async () => {
            render(<EsuOverviewComponent />);
            const firstEsuEntry = await screen.findByText("ESU-12345");
            userEvent.click(firstEsuEntry);
            const editButton = await screen.findByText("Edit");
            expect(editButton).toBeInTheDocument();
            expect(await screen.findByText("Delete")).toBeInTheDocument();
        },
        timeout
    );

    test(
        "it renders EsuEdit and its corresponding buttons",
        async () => {
            render(<EsuEditComponent />);
            const cancelButton = await screen.findByText("Cancel");
            const updateButton = await screen.findByText("Update");
            expect(cancelButton).toBeInTheDocument();
            expect(updateButton).toBeInTheDocument();
            const editHeader = await screen.findByText("Edit ESU");
            expect(editHeader).toBeInTheDocument();
        },
        timeout
    );

    test("Pagination is not rendered if only 2 entries exist", async () => {
        render(<EsuOverviewComponent />);
        await waitFor(() => expect(screen.queryByText("Loading...")).not.toBeInTheDocument());
        await waitFor(() => expect(screen.queryByTestId("overview-pagination")).not.toBeInTheDocument());
    });
});
