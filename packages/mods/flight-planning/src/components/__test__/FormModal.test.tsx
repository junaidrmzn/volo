import { FormProvider, createFormControl, object, string } from "@voloiq/form";
import { render, screen, userEvent, waitFor } from "@voloiq/testing";
import { FormModal } from "../FormModal";

describe("FormModal Test", () => {
    test("Heading is being rendered", () => {
        const testHeading: string = "Test Heading";
        render(<FormModal formId="" handleClose={jest.fn()} isOpen heading={testHeading} />);

        expect(screen.getByText(testHeading)).toBeInTheDocument();
    });

    test("Close Button triggers handleClose", () => {
        const testHandleClose = jest.fn();
        render(<FormModal formId="" handleClose={testHandleClose} isOpen heading="" />);

        const closeButton = screen.getByTestId("form-modal-cancel-button");
        userEvent.click(closeButton);
        expect(testHandleClose).toHaveBeenCalledTimes(1);
    });

    test("Set Button triggers onEdit", async () => {
        const mockHandleEdit = jest.fn();
        const mockSchema = object({
            mockProperty: string().label("mockProperty"),
        });
        const FormControl = createFormControl<typeof mockSchema>();
        render(
            <FormModal isOpen handleClose={jest.fn()} heading="" formId="mockFormId">
                <FormProvider
                    formId="mockFormId"
                    formType="edit"
                    schema={mockSchema}
                    initialValues={{ mockProperty: "testValue" }}
                    onEdit={mockHandleEdit}
                >
                    <FormControl fieldName="mockProperty" />
                </FormProvider>
            </FormModal>
        );

        const testPropertyField = screen.getByLabelText("mockProperty:");
        userEvent.type(testPropertyField, "typed property");
        const setButton = screen.getByTestId("form-modal-set-button");
        userEvent.click(setButton);

        await waitFor(() => expect(mockHandleEdit).toHaveBeenCalledTimes(1));
    });
});
