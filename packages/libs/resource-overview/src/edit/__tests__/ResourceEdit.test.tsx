import { FormProvider, createFormControl, datetime, object, string } from "@voloiq/form";
import { render, screen, userEvent, waitFor, waitForElementToBeRemoved } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { anyPagination } from "../../list/__tests__/anyListMachineConfig";
import type { BaseResource } from "../../state-machine/BaseResource";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import type { RenderEditHandler } from "../ResourceEdit";
import { anyEditMachineWithDetails, anyEditMachineWithPreview } from "./anyEditMachine";

type TestResource = {
    id: string;
    name: string;
    validFrom: Date;
    validTo: Date;
};

const aircraftTypeCreateSchema = object({
    name: string().required().label("Name"),
    validFrom: datetime().label("Valid From"),
    validTo: datetime().label("Valid To"),
});

const testResource: TestResource = {
    id: "testID",
    name: "Volodrone",
    validFrom: new Date(),
    validTo: new Date(),
};

type AircraftEditErrorProps =
    | {
          withBackendGenericError: true;
      }
    | {
          withBackendFormError: true;
      };

const AircraftEdit =
    (errorProps?: AircraftEditErrorProps): RenderEditHandler<TestResource> =>
    (props) => {
        const { formRef, onAfterSubmit, onSubmit, onSubmitError, resource } = props;
        const FormControl = createFormControl<typeof aircraftTypeCreateSchema>();
        return (
            <FormProvider
                schema={aircraftTypeCreateSchema}
                formType="edit"
                initialValues={resource}
                onEdit={() => {
                    onSubmit();
                    return new Promise<{}>((resolve) =>
                        setTimeout(() => {
                            if (!errorProps) {
                                resolve({});
                            } else if ("withBackendGenericError" in errorProps) {
                                onSubmitError("GENERIC");
                            } else {
                                resolve({
                                    name: "This name already exists",
                                });
                            }
                        }, 300)
                    );
                }}
                onAfterSubmit={onAfterSubmit}
                onSubmitError={(isBackendFormError) =>
                    onSubmitError(isBackendFormError ? "BACKEND_FORM_ERROR" : "GENERIC")
                }
                formRef={formRef}
            >
                <FormControl fieldName="name" />
            </FormProvider>
        );
    };

test("Submitting a valid form shows a success toast", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [testResource],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyEditMachineWithPreview({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Edit>{AircraftEdit()}</ResourceOverview.Edit>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    expect(screen.queryByRole("button", { name: "Edit" })).not.toBeInTheDocument();

    userEvent.click(await screen.findByText("ListItem testID"));

    userEvent.click(await screen.findByRole("button", { name: "Edit" }));
    userEvent.type(await screen.findByLabelText("Name:*"), "Volocity");
    fetchAllResources.mockClear();
    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);

    await waitFor(() => expect(saveButton).toBeDisabled());

    await waitFor(() => expect(screen.getByText("The Resource changes have been saved")).toBeVisible());

    expect(fetchAllResources).toHaveBeenCalledTimes(1);
});

test("Edit view can be reached from the preview edit button", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [testResource],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyEditMachineWithPreview({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Edit>{AircraftEdit()}</ResourceOverview.Edit>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    expect(screen.queryByRole("button", { name: "Edit" })).not.toBeInTheDocument();

    userEvent.click(await screen.findByText("ListItem testID"));

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    const previewEditButton = await screen.findByRole("button", { name: "Edit" });

    userEvent.click(previewEditButton);

    expect(
        await screen.findByRole("heading", {
            name: /edit resource/i,
        })
    ).toBeInTheDocument();
});

test("Edit modal can be reached from the preview edit button", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [testResource],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyEditMachineWithPreview({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Edit>{AircraftEdit()}</ResourceOverview.Edit>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>,
        { "iq-777-resource-management": { enabled: true } }
    );

    expect(screen.queryByRole("button", { name: "Edit" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Cancel" })).not.toBeInTheDocument();

    userEvent.click(await screen.findByText("ListItem testID"));

    const previewEditButton = await screen.findByRole("button", { name: "Edit" });

    userEvent.click(previewEditButton);

    expect(await screen.findByRole("button", { name: "Cancel" })).toBeInTheDocument();
});

test("Edit view can be reached from the details edit button", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [testResource],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyEditMachineWithDetails(
        {
            checkIfResourceIsEditable: () => ({
                isResourceEditable: true,
            }),
        },
        {
            fetchAllResources,
        }
    );
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Details>{(resource: BaseResource) => `Details ${resource.id}`}</ResourceOverview.Details>
            <ResourceOverview.Edit>{AircraftEdit()}</ResourceOverview.Edit>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    expect(screen.queryByRole("button", { name: "Details" })).not.toBeInTheDocument();

    userEvent.click(await screen.findByText("ListItem testID"));

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    const previewDetailsButton = await screen.findByRole("button", { name: "Details" });

    userEvent.click(previewDetailsButton);

    userEvent.click(await screen.findByRole("button", { name: "Edit" }));

    expect(
        await screen.findByRole("heading", {
            name: /edit resource/i,
        })
    ).toBeInTheDocument();
});

test("Edit modal can be reached from the details edit button", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [testResource],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyEditMachineWithDetails(
        {
            checkIfResourceIsEditable: () => ({
                isResourceEditable: true,
            }),
        },
        {
            fetchAllResources,
        },
        {},
        {},
        { getEditTitle: () => "Edit Modal Title" }
    );
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Details>{(resource: BaseResource) => `Details ${resource.id}`}</ResourceOverview.Details>
            <ResourceOverview.Edit>{AircraftEdit()}</ResourceOverview.Edit>
            <ResourceOverview.Preview>{(resource: BaseResource) => `Preview ${resource.id}`}</ResourceOverview.Preview>
        </ResourceOverview>,
        { "iq-777-resource-management": { enabled: true } }
    );

    expect(screen.queryByRole("button", { name: "Details" })).not.toBeInTheDocument();

    userEvent.click(await screen.findByText("ListItem testID"));

    const previewDetailsButton = await screen.findByRole("button", { name: "Details" });

    userEvent.click(previewDetailsButton);

    userEvent.click(await screen.findByRole("button", { name: "Edit" }));

    expect(
        await screen.findByRole("heading", {
            name: /edit modal title/i,
        })
    ).toBeInTheDocument();
});

test("Submitting the form with a backend form error shows an form error toast and show form errors", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [testResource],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyEditMachineWithPreview({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Preview>{AircraftEdit}</ResourceOverview.Preview>
            <ResourceOverview.Edit>{AircraftEdit({ withBackendFormError: true })}</ResourceOverview.Edit>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByText("ListItem testID"));

    userEvent.click(await screen.findByRole("button", { name: "Edit" }));
    userEvent.type(await screen.findByLabelText("Name:*"), "Volocity");
    const saveButton = await screen.findByRole("button", { name: "Save" });
    userEvent.click(saveButton);
    await waitFor(() => expect(saveButton).toBeDisabled());
    await waitFor(() => expect(saveButton).toBeEnabled());

    await waitFor(() =>
        expect(
            screen.getByText("Some form fields are incorrect or invalid. Please correct them and try again.")
        ).toBeVisible()
    );
    expect(screen.getByLabelText("Name:*")).toHaveAccessibleDescription("This name already exists");
    // make sure we're still on the edit screen
    expect(saveButton).toBeVisible();
});

test("Do not reload list when nothing is edited", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [testResource],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyEditMachineWithPreview({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Edit>{AircraftEdit}</ResourceOverview.Edit>
            <ResourceOverview.Preview>{AircraftEdit}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByText("ListItem testID"));

    userEvent.click(await screen.findByRole("button", { name: "Edit" }));
    fetchAllResources.mockClear();
    userEvent.click(screen.getByRole("button", { name: "Return to list" }));

    expect(fetchAllResources).toHaveBeenCalledTimes(0);
});

test("Do not reload list when nothing is edited when exiting from edit modal", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [testResource],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyEditMachineWithPreview({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Edit>{AircraftEdit}</ResourceOverview.Edit>
            <ResourceOverview.Preview>{AircraftEdit}</ResourceOverview.Preview>
        </ResourceOverview>,
        { "iq-777-resource-management": { enabled: true } }
    );

    userEvent.click(await screen.findByText("ListItem testID"));

    userEvent.click(await screen.findByRole("button", { name: "Edit" }));
    fetchAllResources.mockClear();
    userEvent.click(await screen.findByRole("button", { name: "Cancel" }));

    expect(fetchAllResources).toHaveBeenCalledTimes(0);
});

test("User cannot see the details button without the canUpdate permission", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [testResource],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyEditMachineWithPreview({ fetchAllResources }, undefined, {
        canUpdate: false,
    });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Edit>{AircraftEdit}</ResourceOverview.Edit>
            <ResourceOverview.Preview>{AircraftEdit}</ResourceOverview.Preview>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByText("ListItem testID"));

    expect(screen.queryByRole("button", { name: "Edit" })).not.toBeInTheDocument();
});
