/* eslint-disable unicorn/consistent-function-scoping */
import { Button } from "@volocopter/design-library-react";
import { startOfYear } from "date-fns";
import {
    configure,
    render,
    screen,
    selectDate,
    selectEvent,
    userEvent,
    waitFor,
    waitForElementToBeRemoved,
} from "@voloiq/testing";
import { toUTCDate } from "@voloiq/utils";
import { FormProvider } from "../form-context/FormProvider";
import { createFormControl } from "../form-control/FormControl";
import { object, select, string } from "../yup";
import { FormControl, initialValues, testSchema } from "./testSchema";

configure({ asyncUtilTimeout: 10_000 });

test("User can edit form only when all fields contain valid values", async () => {
    const onEdit = jest.fn();
    const { container } = render(
        <FormProvider schema={testSchema} formType="edit" onEdit={onEdit} initialValues={initialValues}>
            <FormControl fieldName="coordinates" />
            <FormControl fieldName="firstName" />
            <FormControl fieldName="lastName" />
            <FormControl fieldName="age" />
            <FormControl fieldName="temperature" />
            <FormControl fieldName="gender" />
            <FormControl fieldName="hobbies" />
            <FormControl fieldName="isVegetarian" />
            <FormControl fieldName="attachments" />
            <FormControl fieldName="notes" />
            <FormControl fieldName="dateOfBirth" />
            <Button type="submit">Edit</Button>
        </FormProvider>
    );

    expect(screen.getByRole("textbox", { name: "Coordinates:*" })).toHaveValue("41.40338, 2.17403");
    expect(screen.getByRole("textbox", { name: "First Name:*" })).toHaveValue("John");
    expect(screen.getByRole("textbox", { name: "Last Name:" })).toHaveValue("Doe");
    expect(screen.getByRole("spinbutton", { name: "Age:*" })).toHaveValue("25");
    expect(screen.getByText("male")).toBeVisible();
    expect(screen.getByRole("checkbox", { name: "Vegetarian: Vegetarian" })).not.toBeChecked();
    expect(screen.getByRole("textbox", { name: "Notes:*" })).toHaveValue("Pretty windy today");
    expect(screen.getByRole("spinbutton", { name: "Temperature:*" })).toBeInTheDocument();
    userEvent.clear(screen.getByRole("textbox", { name: "First Name:*" }));
    userEvent.click(screen.getByRole("button", { name: "Edit" }));
    await waitFor(() =>
        expect(screen.getByRole("textbox", { name: "First Name:*" })).toHaveAccessibleDescription(
            "First Name is a required field"
        )
    );
    expect(onEdit).not.toHaveBeenCalled();

    userEvent.type(screen.getByRole("textbox", { name: "First Name:*" }), "Johann");
    await waitFor(() =>
        expect(screen.getByRole("textbox", { name: "First Name:*" })).not.toHaveAccessibleDescription(
            "First Name is a required field"
        )
    );

    // eslint-disable-next-line testing-library/no-container
    const dropzoneInput = container.querySelector<HTMLInputElement>(`input[type="file"]`);
    const files = [new File(["hello"], "hello.png", { type: "image/png" })];

    expect(screen.getByText("Please select at least one attachment")).toBeInTheDocument();

    userEvent.upload(dropzoneInput!, files);

    await waitForElementToBeRemoved(() => screen.queryByText("Please select at least one attachment"));

    const dateOfBirth = toUTCDate(startOfYear(initialValues.dateOfBirth));
    const dateOfBirthPicker = screen.getByLabelText("Date of Birth:*");
    selectDate(dateOfBirthPicker, dateOfBirth);

    userEvent.click(screen.getByRole("button", { name: "Edit" }));
    await waitFor(() =>
        expect(onEdit).toHaveBeenCalledWith(
            {
                firstName: "Johann",
                lastName: "Doe",
                age: 25,
                gender: { value: "male" },
                hobbies: [{ value: "Sleeping" }, { value: "Eating" }],
                isVegetarian: false,
                attachments: files,
                notes: "Pretty windy today",
                dateOfBirth,
                temperature: 1,
                coordinates: "41.40338, 2.17403",
            },
            expect.any(Function)
        )
    );
}, 30_000);

test("User cannot edit an uneditable field", async () => {
    const onEdit = jest.fn();
    render(
        <FormProvider schema={testSchema} formType="edit" onEdit={onEdit} initialValues={initialValues}>
            <FormControl fieldName="firstName" isNotEditable />
        </FormProvider>
    );

    expect(screen.getByRole("textbox", { name: "First Name:*" })).toBeDisabled();
}, 30_000);

test("User cannot see an readOnly text form field", () => {
    const onEdit = jest.fn();
    render(
        <FormProvider schema={testSchema} formType="edit" onEdit={onEdit} initialValues={initialValues}>
            <FormControl fieldName="firstName" helperText="Non-unique identifier defined by your parents" />
        </FormProvider>
    );

    const FirstNameTextBox = screen.getByRole("textbox", { name: "First Name:*" });
    const style = window.getComputedStyle(FirstNameTextBox);
    expect(FirstNameTextBox).toHaveProperty("readOnly", false);
    expect(style.border).toBe("1px solid");
}, 30_000);

test("User can see an readOnly text form field", () => {
    const onEdit = jest.fn();
    render(
        <FormProvider schema={testSchema} formType="edit" onEdit={onEdit} initialValues={initialValues}>
            <FormControl fieldName="firstName" isReadOnly helperText="Non-unique identifier defined by your parents" />
        </FormProvider>
    );

    const FirstNameTextBox = screen.getByRole("textbox", { name: "First Name:*" });
    const style = window.getComputedStyle(FirstNameTextBox);
    expect(FirstNameTextBox).toHaveProperty("readOnly", true);
    expect(style.border).toBe("transparent");
}, 30_000);

test("User sees error message after submitting the form", async () => {
    const schema = object({ firstName: string().required().label("First Name") });
    const initialValues = { firstName: "John" };
    const FormControl = createFormControl<typeof schema>();
    const onEdit = () => ({
        firstName: "This first name is too cool for you, please enter something else",
    });
    render(
        <FormProvider schema={schema} formType="edit" onEdit={onEdit} initialValues={initialValues}>
            <FormControl fieldName="firstName" />
            <Button type="submit">Edit</Button>
        </FormProvider>
    );

    const firstNameTextBox = screen.getByRole("textbox", { name: "First Name:*" });
    userEvent.clear(firstNameTextBox);
    userEvent.type(firstNameTextBox, "Calvin");
    userEvent.click(screen.getByRole("button", { name: "Edit" }));

    await waitFor(() =>
        expect(firstNameTextBox).toHaveAccessibleDescription(
            "This first name is too cool for you, please enter something else"
        )
    );
});

test("Value change will execute onChange callback", async () => {
    const schema = object({
        firstName: string().required().label("First Name"),
        gender: select<string>({
            placeholder: "Please choose",
            options: [
                { value: "male", label: "male" },
                { value: "female", label: "female" },
            ],
            errorMessage: "Please choose a valid option",
        })
            .required()
            .label("Gender"),
    });
    const initialValues = { firstName: "John", gender: { value: "female" } };
    const FormControl = createFormControl<typeof schema>();
    const onChangeName = jest.fn();
    const onChangeGender = jest.fn();
    render(
        <FormProvider schema={schema} formType="edit" onEdit={() => {}} initialValues={initialValues}>
            <FormControl fieldName="firstName" onChange={onChangeName} />
            <FormControl fieldName="gender" onChange={onChangeGender} />
            <Button type="submit">Edit</Button>
        </FormProvider>
    );

    const firstNameTextBox = screen.getByRole("textbox", { name: "First Name:*" });
    const genderSelect = screen.getByRole("combobox", { name: "Gender:*" });
    userEvent.clear(firstNameTextBox);
    userEvent.type(firstNameTextBox, "Calvin");
    await selectEvent.select(genderSelect, "male");

    expect(onChangeName).toHaveBeenCalledTimes(7);
    expect(onChangeGender).toHaveBeenCalledTimes(1);
});
