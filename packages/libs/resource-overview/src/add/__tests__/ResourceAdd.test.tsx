import { Button } from "@volocopter/design-library-react";
import { FormProvider, createFormControl, datetime, object, string } from "@voloiq/form";
import { render, screen, userEvent, waitFor } from "@voloiq/testing";
import { ResourceOverview } from "../../ResourceOverview";
import { anyPagination } from "../../list/__tests__/anyListMachineConfig";
import type { BaseResource } from "../../state-machine/BaseResource";
import { renderListItemWithId } from "../../utils/renderListItemWithId";
import type { RenderAddHandler, RenderAddHandlerProps } from "../ResourceAdd";
import {
    anyAddMachine,
    anyAddMachineWithCallback,
    anyAddMachineWithConfigBuilderOptions,
    anyAddMachineWithDetail,
} from "./anyAddMachine";

const aircraftTypeCreateSchema = object({
    name: string().required().label("Name"),
    validFrom: datetime().label("Valid From"),
    validTo: datetime().label("Valid To"),
});

type AircraftAddErrorProps =
    | {
          withBackendGenericError: true;
      }
    | {
          withBackendFormError: true;
      }
    | {
          withAllFailedError: true;
      }
    | {
          withSomeFailedError: true;
      };

const AircraftAdd =
    (errorProps?: AircraftAddErrorProps): RenderAddHandler =>
    (props) => {
        const { formRef, onAfterSubmit, onSubmit, onSubmitError } = props;
        const FormControl = createFormControl<typeof aircraftTypeCreateSchema>();
        return (
            <FormProvider
                schema={aircraftTypeCreateSchema}
                formType="create"
                onCreate={() => {
                    onSubmit();
                    return new Promise<{}>((resolve) =>
                        setTimeout(() => {
                            if (!errorProps) {
                                resolve({});
                            } else if ("withBackendGenericError" in errorProps) {
                                onSubmitError("GENERIC");
                            } else if ("withAllFailedError" in errorProps) {
                                onSubmitError("ALL_FAILED");
                            } else if ("withSomeFailedError" in errorProps) {
                                onSubmitError("SOME_FAILED");
                            } else {
                                resolve({
                                    name: "This name already exists",
                                });
                            }
                        }, 500)
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

const AircraftAddDetailJump = (props: RenderAddHandlerProps) => {
    const { onSubmit, openDetails } = props;
    return (
        <Button
            onClick={() => {
                onSubmit();
                openDetails("testId");
            }}
        >
            Jump to detail view
        </Button>
    );
};

test("Submitting a valid form shows a success toast", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyAddMachine({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Add>{AircraftAdd()}</ResourceOverview.Add>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Add" }));
    userEvent.type(screen.getByLabelText("Name:*"), "Volocity");
    fetchAllResources.mockClear();
    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);
    await waitFor(() => expect(saveButton).toBeDisabled());

    await screen.findByRole("button", { name: "Add" });

    await waitFor(() => expect(screen.getByText("Resource added")).toBeVisible());

    expect(fetchAllResources).toHaveBeenCalledTimes(1);
});

test("Submitting the form with a backend generic error shows an error toast", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyAddMachine({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Add>{AircraftAdd({ withBackendGenericError: true })}</ResourceOverview.Add>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Add" }));
    userEvent.type(screen.getByLabelText("Name:*"), "Volocity");
    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);
    await waitFor(() => expect(saveButton).toBeDisabled());
    await waitFor(() => expect(saveButton).toBeEnabled());

    await waitFor(() => expect(screen.getByText("Something went wrong. Please try again later.")).toBeVisible());
    // make sure we're still on the add screen
    expect(saveButton).toBeVisible();
});

test("Submitting the form with a backend form error shows an form error toast and show form errors", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyAddMachine({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Add>{AircraftAdd({ withBackendFormError: true })}</ResourceOverview.Add>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Add" }));
    userEvent.type(screen.getByLabelText("Name:*"), "Volocity");
    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);
    await waitFor(() => expect(saveButton).toBeDisabled());
    await waitFor(() => expect(saveButton).toBeEnabled());

    await waitFor(() =>
        expect(
            screen.getByText("Some form fields are incorrect or invalid. Please correct them and try again.")
        ).toBeVisible()
    );
    expect(screen.getByLabelText("Name:*")).toHaveAccessibleDescription("This name already exists");
    // make sure we're still on the add screen
    expect(saveButton).toBeVisible();
});

test("Do not reload list when nothing is added", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyAddMachine({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Add>{AircraftAdd}</ResourceOverview.Add>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Add" }));
    fetchAllResources.mockClear();
    userEvent.click(screen.getByRole("button", { name: "Return to list" }));

    expect(fetchAllResources).toHaveBeenCalledTimes(0);
});

test("Do not reload list when nothing is added when exiting from add modal", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyAddMachine({ fetchAllResources });
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Add>{AircraftAdd}</ResourceOverview.Add>
        </ResourceOverview>,
        { "iq-777-resource-management": { enabled: true } }
    );

    userEvent.click(await screen.findByRole("button", { name: "Add" }));
    fetchAllResources.mockClear();
    userEvent.click(await screen.findByRole("button", { name: "Cancel" }));

    expect(fetchAllResources).toHaveBeenCalledTimes(0);
});

test("User cannot see the add button without the canCreate permission", async () => {
    const testStateMachine = anyAddMachine(undefined, { canCreate: false });

    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Add>{AircraftAdd}</ResourceOverview.Add>
        </ResourceOverview>
    );

    await screen.findByText("ListItem 1");

    expect(screen.queryByRole("button", { name: "Add" })).not.toBeInTheDocument();
});

test("User directly navigates from the add view to the detail view", async () => {
    const testStateMachine = anyAddMachineWithDetail();

    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Add>{AircraftAddDetailJump}</ResourceOverview.Add>
            <ResourceOverview.Details>{(resource: BaseResource) => `Details ${resource.id}`}</ResourceOverview.Details>
        </ResourceOverview>
    );

    await screen.findByText("ListItem 1");

    userEvent.click(await screen.findByRole("button", { name: "Add" }));

    const detailViewButton = await await screen.findByRole("button", { name: "Jump to detail view" });

    expect(detailViewButton).toBeVisible();

    userEvent.click(detailViewButton);

    expect(await screen.findByText("Details testId")).toBeVisible();
});

test("User can add item and execute a callback after item is added", async () => {
    const invokeOnSaved = jest.fn(() => {});
    const testStateMachine = anyAddMachineWithCallback(invokeOnSaved);
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Add>{AircraftAdd()}</ResourceOverview.Add>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Add" }));
    userEvent.type(screen.getByLabelText("Name:*"), "Volocity");

    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);
    await waitFor(() => expect(saveButton).toBeDisabled());

    await screen.findByRole("button", { name: "Add" });

    expect(invokeOnSaved).toHaveBeenCalledTimes(1);
});

test("Submitting the form with a all failed error shows an error toast", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyAddMachineWithConfigBuilderOptions(
        { fetchAllResources },
        { getResourceName: () => "Resources" }
    );
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Add>{AircraftAdd({ withAllFailedError: true })}</ResourceOverview.Add>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Add" }));
    userEvent.type(screen.getByLabelText("Name:*"), "Volocity");
    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);
    await waitFor(() => expect(saveButton).toBeDisabled());
    await waitFor(() => expect(saveButton).toBeEnabled());
    await waitFor(() => expect(screen.getByText("Adding Resources failed")).toBeVisible());
    expect(saveButton).toBeVisible();
});

test("Submitting the form with a some failed error shows an error toast", async () => {
    const fetchAllResources = jest.fn(() =>
        Promise.resolve({
            data: [{ id: "1" }],
            pagination: anyPagination(),
        })
    );
    const testStateMachine = anyAddMachineWithConfigBuilderOptions(
        { fetchAllResources },
        { getResourceName: () => "Resources" }
    );
    render(
        <ResourceOverview machineConfig={testStateMachine}>
            <ResourceOverview.ListItem>{renderListItemWithId}</ResourceOverview.ListItem>
            <ResourceOverview.Add>{AircraftAdd({ withSomeFailedError: true })}</ResourceOverview.Add>
        </ResourceOverview>
    );

    userEvent.click(await screen.findByRole("button", { name: "Add" }));
    userEvent.type(screen.getByLabelText("Name:*"), "Volocity");
    const saveButton = screen.getByRole("button", { name: "Save" });
    userEvent.click(saveButton);
    await waitFor(() => expect(saveButton).toBeDisabled());
    await waitFor(() => expect(saveButton).toBeEnabled());
    await waitFor(() => expect(screen.getByText("Adding some Resources failed")).toBeVisible());
    expect(saveButton).toBeVisible();
});
