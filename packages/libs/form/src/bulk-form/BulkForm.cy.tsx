import { Button } from "@volocopter/design-library-react";
import { number, object, string } from "../yup";
import { BulkForm } from "./BulkForm";
import { useAddFormControlGroup } from "./bulk-form-context/useAddFormControlGroup";
import { useRemoveFormControlGroup } from "./bulk-form-context/useRemoveFormControlGroup";
import { DragHandle } from "./sortable/DragHandle";

const schema = object({
    firstName: string().required().label("First Name"),
    lastName: string().label("Last Name"),
    age: number().min(0).required().label("Age"),
});

const AddFormControlGroupButton = () => {
    const { addFormControlGroup } = useAddFormControlGroup();

    return <Button onClick={() => addFormControlGroup()}>+ Add</Button>;
};

const RemoveFormControlGroupButton = () => {
    const { removeFormControlGroup } = useRemoveFormControlGroup();

    return <Button onClick={removeFormControlGroup}>- Remove</Button>;
};

const asyncNoop = async () => {};
describe("Bulk Form", () => {
    it("can be sorted if isSortable is true", () => {
        cy.mount(
            <BulkForm
                onAdd={cy.stub().as("onAdd")}
                onDelete={asyncNoop}
                onEdit={cy.stub().as("onEdit")}
                schema={schema}
                renderFormControlGroup={(FormControl) => (
                    <>
                        <DragHandle />
                        <FormControl fieldName="firstName" />
                        <FormControl fieldName="lastName" />
                        <FormControl fieldName="age" />
                        <RemoveFormControlGroupButton />
                    </>
                )}
                initialValues={[
                    { id: "1", firstName: "John", lastName: "Doe", age: 50 },
                    { id: "2", firstName: "Martin", lastName: "Foe", age: 60 },
                ]}
                isSortable
            >
                <AddFormControlGroupButton />
                <Button type="submit">Submit</Button>
            </BulkForm>
        );

        cy.findAllByRole("textbox", { name: "First Name:*" }).first().should("have.value", "John");
        cy.findAllByRole("textbox", { name: "First Name:*" }).last().should("have.value", "Martin");

        // Drag and drop Martin above John
        cy.findAllByRole("button", { name: "Click and hold to sort elements" })
            .first()
            .trigger("mousedown", { which: 1 })
            .trigger("mousemove", { clientY: 1000, force: true })
            .trigger("mouseup", { clientY: 1000, force: true });

        cy.findAllByRole("textbox", { name: "First Name:*" }).first().should("have.value", "Martin");
        cy.findAllByRole("textbox", { name: "First Name:*" }).last().should("have.value", "John");

        // Add new person called Anakin
        cy.findByRole("button", { name: "+ Add" }).click();
        cy.findAllByRole("textbox", { name: "First Name:*" }).last().type("Anakin");
        cy.findAllByRole("spinbutton", { name: "Age:*" }).last().type("32");

        // Drag and drop Anakin between John and Martin
        cy.findAllByRole("button", { name: "Click and hold to sort elements" })
            .last()
            .trigger("mousedown", { which: 1 })
            .trigger("mousemove", { clientY: 200, force: true })
            .trigger("mouseup", { clientY: 200, force: true });

        cy.findByRole("button", { name: "Submit" }).click();
        cy.get("@onEdit").should("have.been.calledWith", [
            { id: "2", firstName: "Martin", lastName: "Foe", age: 60, sequenceIndex: 0 },
            { id: "1", firstName: "John", lastName: "Doe", age: 50, sequenceIndex: 2 },
        ]);
        cy.get("@onAdd").should("have.been.calledWith", [{ firstName: "Anakin", age: 32, sequenceIndex: 1 }]);
    });
});
