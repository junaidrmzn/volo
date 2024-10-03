import { mockResizeObserver } from "jsdom-testing-mocks";
import { setupServer } from "msw/node";
import { expectToHaveNoA11yViolations, render, screen, selectEvent, userEvent, waitFor, within } from "@voloiq/testing";
import { ServiceWrapper } from "../../libs/software-configuration/mocks/TestWrapper";
import {
    anySoftwareConfig,
    makeDeleteSoftwareConfigHandler,
    makeGetAllSoftwareConfigHandler,
    makeGetSoftwareConfigHandler,
    makePostSoftwareConfigHandler,
} from "../../libs/software-configuration/mocks/msw/SoftwareConfigMock";
import { SoftwareConfigurationsPage } from "../SoftwareConfigurationsPage";

const firstConfig = anySoftwareConfig({
    id: "AAA",
    createTime: "2022-08-15T11:00:00.000Z",
    configType: "FC",
    gitHash: "hash1",
});
const secondConfig = anySoftwareConfig({
    id: "BBB",
    createTime: "2022-08-15T12:00:00.000Z",
    configType: "FC",
    gitHash: "hash2",
});

const { listen, resetHandlers, close, use } = setupServer(makeGetAllSoftwareConfigHandler([firstConfig, secondConfig]));

mockResizeObserver();

beforeAll(() => {
    listen();
});

afterEach(() => {
    resetHandlers();
});

afterAll(() => {
    close();
});

test("User can see an empty state when there are no entries", async () => {
    use(makeGetAllSoftwareConfigHandler([]));
    render(
        <ServiceWrapper>
            <SoftwareConfigurationsPage />
        </ServiceWrapper>
    );

    const spinner = screen.queryByText("Loading...");
    await waitFor(() => {
        expect(spinner).not.toBeInTheDocument();
    });

    const emptyState = screen.getByText("No entries found");

    expect(emptyState).toBeVisible();
}, 30_000);

test("User can view and sort the software configurations", async () => {
    use(makeGetAllSoftwareConfigHandler([firstConfig, secondConfig], { orderBy: "createTime:desc" }));
    render(
        <ServiceWrapper>
            <SoftwareConfigurationsPage />
        </ServiceWrapper>
    );

    await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    userEvent.click(screen.getByRole("button", { name: "Sort" }));

    userEvent.click(
        screen.getByRole("button", {
            name: "Back",
        })
    );

    await waitFor(() => {
        expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    let listElements = within(
        screen.getByRole("list", {
            name: "Software Config entries",
        })
    ).getAllByRole("listitem");
    expect(listElements.length).toBe(2);
    expect(listElements[0]?.textContent).toContain("hash1");
    expect(listElements[1]?.textContent).toContain("hash2");

    use(makeGetAllSoftwareConfigHandler([secondConfig, firstConfig], { orderBy: "createTime:asc" }));

    userEvent.click(screen.getByRole("button", { name: "Sort" }));

    userEvent.click(screen.getByLabelText("Ascending"));
    userEvent.click(
        screen.getByRole("button", {
            name: "Apply",
        })
    );

    // We need to click the Back button otherwise the software configuration entries list is hidden as
    // Jest renders the sort side panel in full screen
    userEvent.click(
        screen.getByRole("button", {
            name: "Back",
        })
    );

    const entriesList = () => screen.getByRole("list", { name: "Software Config entries" });

    await waitFor(() => {
        listElements = within(entriesList()).getAllByRole("listitem");
        expect(listElements[0]?.textContent).toContain("hash2");
    });

    listElements = within(entriesList()).getAllByRole("listitem");
    expect(listElements.length).toBe(2);
    expect(listElements[0]?.textContent).toContain("hash2");
    expect(listElements[1]?.textContent).toContain("hash1");
}, 30_000);

test("User can create a software configuration", async () => {
    use(makePostSoftwareConfigHandler());
    render(
        <ServiceWrapper>
            <SoftwareConfigurationsPage />
        </ServiceWrapper>
    );

    const spinner = screen.queryByText("Loading...");
    await waitFor(() => {
        expect(spinner).not.toBeInTheDocument();
    });

    userEvent.click(screen.getByRole("button", { name: "Add" }));

    const file = new File(["fcvar"], "fcvar.h", { type: "text/html" });
    const configurationTypeSelect = screen.getByLabelText("Software Config Type:*");
    const gitHashInput = screen.getByLabelText("Git Hash:*");
    const softwareConfigurationFileInput = document.querySelector<HTMLInputElement>(`input[type="file"]`);
    const saveButton = screen.getByRole("button", {
        name: "Save",
    });

    await selectEvent.select(configurationTypeSelect, "FC");
    userEvent.type(gitHashInput, "hash");
    userEvent.upload(softwareConfigurationFileInput!, file);
    await screen.findByText(file.name);
    userEvent.click(saveButton);

    await waitFor(() => {
        expect(screen.getByText("Software Config added")).toBeVisible();
    });
}, 30_000);

test("User can select and delete a entry", async () => {
    use(makeGetSoftwareConfigHandler());
    use(makeDeleteSoftwareConfigHandler());
    render(
        <ServiceWrapper>
            <SoftwareConfigurationsPage />
        </ServiceWrapper>
    );

    const spinner = screen.queryByText("Loading...");
    await waitFor(() => {
        expect(spinner).not.toBeInTheDocument();
    });

    const entriesList = screen.getByRole("list", { name: "Software Config entries" });
    userEvent.click(within(entriesList).getAllByRole("button")[0]!);

    const deleteButton = await screen.findByRole("button", { name: "Delete" });
    userEvent.click(deleteButton);

    const deleteModal = await screen.findByRole("dialog");
    userEvent.click(within(deleteModal).getByRole("button", { name: "Delete" }));

    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() => expect(screen.getByText("Software Config deleted")).toBeInTheDocument());
}, 30_000);

test("Page has no a11y violations", async () => {
    const { container } = render(
        <ServiceWrapper>
            <SoftwareConfigurationsPage />
        </ServiceWrapper>
    );

    const spinner = screen.queryByText("Loading...");
    await waitFor(() => {
        expect(spinner).not.toBeInTheDocument();
    });

    await expectToHaveNoA11yViolations(container);
}, 30_000);
