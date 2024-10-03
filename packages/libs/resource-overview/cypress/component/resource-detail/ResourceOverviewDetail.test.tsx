import { Box, ThemeProvider } from "@volocopter/design-library-react";
import { LocalAuthenticationProvider } from "@voloiq/auth";
import { DateTimeInputLocaleProvider } from "@voloiq/date-time-input";
import { LocalFeatureFlagsProvider } from "@voloiq/feature-flags";
import { FormProvider, createFormControl, object, string } from "@voloiq/form";
import { I18nProvider } from "@voloiq/i18n";
import { MemoryRouter, ParametersCacheProvider } from "@voloiq/routing";
import { ResourceOverview } from "../../../src/ResourceOverview";
import { RenderEditHandler } from "../../../src/edit/EditModal";
import { BaseResource } from "../../../src/state-machine/BaseResource";
import { anyDetailMachineConfig } from "./anyDetailMachineConfig";

type AircraftEditErrorProps =
    | {
          withBackendGenericError: true;
      }
    | {
          withBackendFormError: true;
      };

type TestResource = {
    id: string;
    name: string;
    validFrom: Date;
    validTo: Date;
};

const aircraftTypeCreateSchema = object({
    name: string().required().label("Name"),
});

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

describe("Detail Page", () => {
    it("can go to edit page when detail page is loaded directly", () => {
        const testStateMachineConfig = anyDetailMachineConfig({
            checkIfResourceIsEditable: () => ({
                isResourceEditable: true,
            }),
        });

        cy.mount(
            <ThemeProvider>
                <LocalFeatureFlagsProvider>
                    <LocalAuthenticationProvider>
                        <I18nProvider>
                            <DateTimeInputLocaleProvider>
                                <ParametersCacheProvider>
                                    <MemoryRouter initialEntries={["/overview/1"]}>
                                        <Box height="100vh">
                                            <ResourceOverview machineConfig={testStateMachineConfig}>
                                                <ResourceOverview.ListItem>
                                                    {(resource: BaseResource) => `ListItem ${resource.id}`}
                                                </ResourceOverview.ListItem>
                                                <ResourceOverview.Details>
                                                    {(resource: BaseResource) => `Details ${resource.id}`}
                                                </ResourceOverview.Details>
                                                <ResourceOverview.Edit>{() => "Edit Resource"}</ResourceOverview.Edit>
                                            </ResourceOverview>
                                        </Box>
                                    </MemoryRouter>
                                </ParametersCacheProvider>
                            </DateTimeInputLocaleProvider>
                        </I18nProvider>
                    </LocalAuthenticationProvider>
                </LocalFeatureFlagsProvider>
            </ThemeProvider>
        );

        cy.findByRole("button", { name: "Edit" }).click();

        cy.contains("Edit Resource").should("be.visible");
    });

    it("can go back to detail page after saving edit", () => {
        const testStateMachineConfig = anyDetailMachineConfig({
            checkIfResourceIsEditable: () => ({
                isResourceEditable: true,
            }),
        });

        cy.mount(
            <ThemeProvider>
                <LocalFeatureFlagsProvider>
                    <LocalAuthenticationProvider>
                        <I18nProvider>
                            <DateTimeInputLocaleProvider>
                                <ParametersCacheProvider>
                                    <MemoryRouter initialEntries={["/overview/1"]}>
                                        <Box height="100vh">
                                            <ResourceOverview machineConfig={testStateMachineConfig}>
                                                <ResourceOverview.ListItem>
                                                    {(resource: BaseResource) => `ListItem ${resource.id}`}
                                                </ResourceOverview.ListItem>
                                                <ResourceOverview.Details>
                                                    {(resource: BaseResource) => `Details ${resource.id}`}
                                                </ResourceOverview.Details>
                                                <ResourceOverview.Edit>{AircraftEdit()}</ResourceOverview.Edit>
                                            </ResourceOverview>
                                        </Box>
                                    </MemoryRouter>
                                </ParametersCacheProvider>
                            </DateTimeInputLocaleProvider>
                        </I18nProvider>
                    </LocalAuthenticationProvider>
                </LocalFeatureFlagsProvider>
            </ThemeProvider>
        );

        cy.findByRole("button", { name: "Edit" }).click();

        cy.findByRole("textbox", { name: "Name:*" }).type("New Name");

        cy.findByRole("button", { name: "Save" }).click();

        cy.contains("Any Details Title").should("be.visible");
    });
});
