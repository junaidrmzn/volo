/* eslint-disable unicorn/consistent-function-scoping */
import { Button } from "@volocopter/design-library-react";
import { configure, render, screen, userEvent, waitFor } from "@voloiq/testing";
import { number, object, string } from "../yup";
import { BulkForm } from "./BulkForm";
import { useAddFormControlGroup } from "./bulk-form-context/useAddFormControlGroup";
import { useRemoveFormControlGroup } from "./bulk-form-context/useRemoveFormControlGroup";

configure({ asyncUtilTimeout: 10_000 });

const schema = object({
    firstName: string().required().label("First Name"),
    lastName: string().label("Last Name"),
    age: number().min(0).required().label("Age"),
});

const AddFormControlGroupButton = () => {
    const { addFormControlGroup } = useAddFormControlGroup();

    return <Button onClick={() => addFormControlGroup()}>Add</Button>;
};

const RemoveFormControlGroupButton = () => {
    const { removeFormControlGroup } = useRemoveFormControlGroup();

    return <Button onClick={removeFormControlGroup}>Remove</Button>;
};
const onAdd = jest.fn();
const onEdit = jest.fn();
const onDelete = jest.fn();

const TestBulkForm = () => (
    <BulkForm
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        schema={schema}
        renderFormControlGroup={(FormControl) => (
            <>
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
    >
        <AddFormControlGroupButton />
        <Button type="submit">Submit</Button>
    </BulkForm>
);

beforeEach(() => {
    for (const mock of [onAdd, onEdit, onDelete]) mock.mockClear();
});

test("Bulk form is pre-filled with initial values", async () => {
    render(<TestBulkForm />);

    const [firstFirstNameInput, secondFirstNameInput] = screen.getAllByRole("textbox", { name: "First Name:*" });
    expect(firstFirstNameInput).toHaveValue("John");
    expect(secondFirstNameInput).toHaveValue("Martin");
    const [firstLastNameInput, secondLastNameInput] = screen.getAllByRole("textbox", { name: "Last Name:" });
    expect(firstLastNameInput).toHaveValue("Doe");
    expect(secondLastNameInput).toHaveValue("Foe");
    const [firstAgeInput, secondAgeInput] = screen.getAllByRole("spinbutton", { name: "Age:*" });
    expect(firstAgeInput).toHaveValue("50");
    expect(secondAgeInput).toHaveValue("60");
}, 30_000);

test("Bulk form callbacks are not invoked if there are no changes", async () => {
    render(<TestBulkForm />);

    screen.getByRole("button", { name: "Submit" }).click();
    await waitFor(() => {
        for (const callback of [onAdd, onEdit, onDelete]) expect(callback).not.toHaveBeenCalled();
    });
}, 30_000);

test("Bulk form input groups can be removed", async () => {
    render(<TestBulkForm />);

    const [deleteJohnDoeButton] = screen.getAllByRole("button", { name: "Remove" });
    deleteJohnDoeButton?.click();
    screen.getByRole("button", { name: "Submit" }).click();
    await waitFor(() => {
        for (const callback of [onAdd, onEdit]) expect(callback).not.toHaveBeenCalled();
        expect(onDelete).toHaveBeenCalledWith(["1"]);
    });
}, 30_000);

test("Bulk form input values can be edited", async () => {
    render(<TestBulkForm />);

    const [, secondFirstNameInput] = screen.getAllByRole("textbox", { name: "First Name:*" });
    if (secondFirstNameInput === undefined) {
        throw new Error("Input field for first name was not found");
    }
    userEvent.clear(secondFirstNameInput);
    userEvent.type(secondFirstNameInput, "Paulo");
    screen.getByRole("button", { name: "Submit" }).click();
    await waitFor(() => {
        for (const callback of [onAdd, onDelete]) expect(callback).not.toHaveBeenCalled();
        expect(onEdit).toHaveBeenCalledWith([
            {
                id: "2",
                firstName: "Paulo",
                lastName: "Foe",
                age: 60,
                sequenceIndex: 1,
            },
        ]);
    });
}, 30_000);

test("Bulk form input groups can be added", async () => {
    render(<TestBulkForm />);
    userEvent.click(screen.getByRole("button", { name: "Add" }));
    const newFirstNameInput = screen.getAllByRole("textbox", { name: "First Name:*" })[2];
    const newAgeInput = screen.getAllByRole("spinbutton", { name: "Age:*" })[2];
    if (newFirstNameInput === undefined || newAgeInput === undefined) {
        throw new Error("Input fields for first name or age were not found");
    }
    userEvent.type(newFirstNameInput, "Brolo");
    userEvent.type(newAgeInput, "50");
    screen.getByRole("button", { name: "Submit" }).click();
    await waitFor(() => {
        for (const callback of [onEdit, onDelete]) expect(callback).not.toHaveBeenCalled();
        expect(onAdd).toHaveBeenCalledWith([
            {
                firstName: "Brolo",
                age: 50,
                sequenceIndex: 2,
            },
        ]);
    });
}, 30_000);
