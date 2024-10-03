import { ServiceProvider } from "@voloiq/service";
import { render, screen, userEvent } from "@voloiq/testing";
import { anyEsuTypeResourceWithId } from "../../mocks/battery-management";
import { setupEsuTypeServiceMock } from "../../mocks/server";
import { BATTERY_MANAGEMENT_BASE_URL } from "../../mocks/serviceUrls";
import { EsuTypeOverview } from "../EsuTypeOverview";

const { listen, resetHandlers, close, esuTypeDatabaseOperations } = setupEsuTypeServiceMock();

beforeAll(() => {
    listen();
    esuTypeDatabaseOperations.add(
        anyEsuTypeResourceWithId({
            id: "1234",
            name: "VDC-150",
        })
    );
    esuTypeDatabaseOperations.add(
        anyEsuTypeResourceWithId({
            id: "1235",
            name: "VDC-199",
        })
    );
});

afterEach(() => resetHandlers);
afterAll(() => {
    close();
    esuTypeDatabaseOperations.clear();
});

describe("EsuTypeOverview Test", () => {
    const EsuTypeOverviewComponent = () => {
        return (
            <ServiceProvider baseUrl={BATTERY_MANAGEMENT_BASE_URL}>
                <EsuTypeOverview />
            </ServiceProvider>
        );
    };

    test("it renders EsuTypeOverview and opens the side menu after clicking elements inside EsuTypeOverview", async () => {
        render(<EsuTypeOverviewComponent />);
        const firstEsuTypeEntry = await screen.findByText("VDC-150");
        const secondEsuTypeEntry = await screen.findByText("VDC-199");
        expect(firstEsuTypeEntry).toBeVisible();
        expect(secondEsuTypeEntry).toBeVisible();
        userEvent.click(firstEsuTypeEntry);
        await screen.findByText("Delete");
    }, 10_000);
});
