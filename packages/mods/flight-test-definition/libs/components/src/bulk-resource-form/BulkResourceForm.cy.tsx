import { object, string } from "@voloiq/form";
import { BulkResourceForm } from "./BulkResourceForm";

const definitionSchema = object({
    title: string().label("Title"),
});

describe("Bulk Resource Form", () => {
    it("User can duplicate new form control group by clicking duplicate button", () => {
        const onAddStub = cy
            .stub(
                {
                    onAdd: () => Promise.resolve(),
                },
                "onAdd"
            )
            .as("onAdd");
        cy.mount(
            <BulkResourceForm
                entityName="Definition"
                schema={definitionSchema}
                onAdd={onAddStub}
                onDelete={() => Promise.resolve()}
                onEdit={() => Promise.resolve()}
                renderFormControlGroup={(FormControl) => <FormControl fieldName="title" />}
                withDuplicateButton
                withSubmitButton
            />
        );

        cy.findByRole("textbox", { name: "Title:" }).type("Foo");
        cy.findByRole("button", { name: "Duplicate" }).click();
        cy.findAllByRole("textbox", { name: "Title:" }).should("have.length", 2).should("have.value", "Foo");
        cy.findByRole("button", { name: "Done" }).click();

        cy.get("@onAdd").should("be.calledWith", [
            { title: "Foo", sequenceIndex: 0 },
            { title: "Foo", sequenceIndex: 1 },
        ]);
    });
    it("User can duplicate existing form control group by clicking duplicate button", () => {
        const onAddStub = cy
            .stub(
                {
                    onAdd: () => Promise.resolve(),
                },
                "onAdd"
            )
            .as("onAdd");
        const onEditStub = cy
            .stub(
                {
                    onEdit: () => Promise.resolve(),
                },
                "onEdit"
            )
            .as("onEdit");
        cy.mount(
            <BulkResourceForm
                entityName="Definition"
                schema={definitionSchema}
                onAdd={onAddStub}
                onDelete={() => Promise.resolve()}
                onEdit={onEditStub}
                renderFormControlGroup={(FormControl) => <FormControl fieldName="title" />}
                withDuplicateButton
                withSubmitButton
                initialValues={[{ id: "1", title: "Foo" }]}
            />
        );

        cy.findByRole("button", { name: "Duplicate" }).click();
        cy.findAllByRole("textbox", { name: "Title:" }).should("have.length", 2).should("have.value", "Foo");
        cy.findByRole("button", { name: "Done" }).click();

        cy.get("@onAdd").should("be.calledWith", [{ title: "Foo", sequenceIndex: 0 }]);
        cy.get("@onEdit").should("not.be.called");
    });
});
