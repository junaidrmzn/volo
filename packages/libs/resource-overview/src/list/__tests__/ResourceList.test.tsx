import { Tag } from "@volocopter/design-library-react";
import { UIWrapperWithMemoryRouter, render, renderWithoutWrapper, screen, userEvent, within } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { anyFilterMachineConfig } from "../../filter/__tests__/anyFilterMachineConfig";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import { renderListItemWithReloadAction } from "../../utils/renderListItemWithReloadAction";
import { anyListMachineConfig, anyPagination } from "./anyListMachineConfig";

test("Invokes getListTitle callback on mount and renders the returned string as a header", async () => {
    const getListTitle = jest.fn(() => `List Title`);
    const testStateMachine = anyListMachineConfig({ getListTitle });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    expect(getListTitle).toHaveBeenCalled();
    expect(await screen.findByRole("heading", { name: "List Title" }));
});

test("Invokes getListTitleTag callback on mount and renders the returned tag in a header", async () => {
    const getListTitle = jest.fn(() => `List Title`);
    const getListTitleTag = jest.fn(() => <Tag>Draft</Tag>);
    const testStateMachine = anyListMachineConfig({ getListTitle, getListTitleTag });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    expect(getListTitle).toHaveBeenCalled();
    expect(await screen.findByText("Draft"));
});

test("Invokes fetchAllResources callback on mount and renders list of returned resources", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const pageSize = 1;
    const testStateMachine = anyListMachineConfig({ fetchAllResources, pageSize });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    expect(fetchAllResources).toHaveBeenCalledWith({
        page: 1,
        size: pageSize,
        filterSet: {
            filters: [],
        },
    });
    expect(await screen.findByText("ListItem 1")).toBeVisible();
});

test("Invokes fetchAllResources callback on pagination with next page and size", async () => {
    const fetchAllResources = jest.fn((params) =>
        Promise.resolve({
            data: [{ id: params.page }],
            pagination: {
                page: params.page,
                size: params.size,
                totalElements: 3,
                totalPages: 3,
            },
        })
    );
    const pageSize = 1;
    const testStateMachine = anyListMachineConfig({ fetchAllResources, pageSize });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    expect(fetchAllResources).toHaveBeenCalledWith({
        page: 1,
        size: pageSize,
        filterSet: {
            filters: [],
        },
    });
    expect(await screen.findByText("ListItem 1")).toBeVisible();

    userEvent.click(screen.getByRole("button", { name: "2" }));
    expect(fetchAllResources).toHaveBeenCalledWith({
        page: 2,
        size: pageSize,
        filterSet: {
            filters: [],
        },
    });
    expect(await screen.findByText("ListItem 2")).toBeVisible();

    userEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(fetchAllResources).toHaveBeenCalledWith({
        page: 1,
        size: pageSize,
        filterSet: {
            filters: [],
        },
    });
    expect(await screen.findByText("ListItem 1")).toBeVisible();
});

test("The url parameter determines the initial page number", async () => {
    const fetchAllResources = jest.fn((params) =>
        Promise.resolve({
            data: Array.from({ length: 20 }).map((_, index) => ({ id: `element${String(index)}` })),
            pagination: {
                page: params.page,
                size: params.size,
                totalElements: 20,
                totalPages: 2,
            },
        })
    );
    const pageSize = 10;
    const testStateMachine = anyListMachineConfig({ fetchAllResources, pageSize });
    renderWithoutWrapper(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>,
        {
            wrapper: (props) => <UIWrapperWithMemoryRouter {...props} initialEntries={["/?page=2"]} />,
        }
    );

    expect(fetchAllResources).toHaveBeenCalledWith({
        page: 2,
        size: pageSize,
        filterSet: {
            filters: [],
        },
    });

    const activeButton = await screen.findByRole("button", {
        current: true,
    });

    expect(activeButton).toHaveTextContent("2");
});

test("User cannot see the list without the canRead permission", async () => {
    const testStateMachine = anyListMachineConfig(undefined, {
        canRead: false,
    });

    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    expect(await screen.findByText("You do not have permission to access the requested page")).toBeVisible();
});

test("Changing filters sets pagination to page 1", async () => {
    const fetchAllResources = jest.fn((params) =>
        Promise.resolve({
            data: Array.from({ length: 20 }).map((_, index) => ({ id: `element${String(index)}` })),
            pagination: {
                page: params.page,
                size: params.size,
                totalElements: 20,
                totalPages: 2,
            },
        })
    );
    const pageSize = 10;
    const testStateMachine = anyFilterMachineConfig({ fetchAllResources, pageSize });
    renderWithoutWrapper(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>,
        {
            wrapper: (props) => <UIWrapperWithMemoryRouter {...props} initialEntries={["/?page=2"]} />,
        }
    );

    expect(fetchAllResources).toHaveBeenCalledWith({
        page: 2,
        size: pageSize,
        filterSet: {
            filters: [],
        },
    });

    let activeButton = await screen.findByRole("button", {
        current: true,
    });

    expect(activeButton).toHaveTextContent("2");

    userEvent.click(await screen.findByRole("button", { name: "Filter" }));

    const maxFlightDuration = await screen.findByRole("group", { name: "Flight Duration" });
    userEvent.type(within(maxFlightDuration).getByRole("spinbutton", { name: "min" }), "10");

    userEvent.click(
        await screen.findByRole("button", {
            name: "Apply",
        })
    );

    userEvent.click(
        screen.getByRole("button", {
            name: "Back",
        })
    );

    activeButton = await screen.findByRole("button", {
        current: true,
    });
    expect(activeButton).toHaveTextContent("1");
});

test("user can reload list", async () => {
    const fetchAllResources = jest.fn((params) =>
        Promise.resolve({
            data: [{ id: params.page }],
            pagination: {
                page: params.page,
                size: params.size,
                totalElements: 3,
                totalPages: 3,
            },
        })
    );
    const pageSize = 1;
    const testStateMachine = anyListMachineConfig({ fetchAllResources, pageSize });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithReloadAction}</ResourceOverview.ListItem>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByText("ListItem 1"));
    expect(fetchAllResources).toHaveBeenCalledTimes(2);
});

test("Displays the list's data in ListHeader", async () => {
    const fetchAllResources = jest.fn((params) =>
        Promise.resolve({
            data: [{ id: params.page }],
            pagination: {
                page: params.page,
                size: params.size,
                totalElements: 3,
                totalPages: 3,
            },
        })
    );
    const pageSize = 1;
    const testStateMachine = anyListMachineConfig({ fetchAllResources, pageSize });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
        </ResourceOverview>,
        { "iq-777-resource-management": { enabled: true } }
    );
    expect(await screen.findByText(/1 of 3/i)).toBeVisible();
    expect(await screen.findByText(/3 entries found/i)).toBeVisible();

    userEvent.click(screen.getByRole("button", { name: "2" }));

    expect(await screen.findByText(/2 of 3/i)).toBeVisible();
});
