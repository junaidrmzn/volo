/* eslint-disable unicorn/consistent-function-scoping */
import { Button } from "@volocopter/design-library-react";
import { startOfToday } from "date-fns";
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
import { object, radioGroup, string } from "../yup";
import { FormControl, testSchema } from "./testSchema";

configure({ asyncUtilTimeout: 10_000 });
test("User sees an accessible description for form field", () => {
    render(
        <FormProvider schema={testSchema} formType="create" onCreate={jest.fn()}>
            <FormControl fieldName="firstName" helperText="Non-unique identifier defined by your parents" />
        </FormProvider>
    );

    expect(screen.getByRole("textbox", { name: "First Name:*" })).toHaveAccessibleDescription(
        "Non-unique identifier defined by your parents"
    );
}, 30_000);

test("User sees error message after submitting the form", async () => {
    const schema = object({ firstName: string().required().label("First Name") });
    const FormControl = createFormControl<typeof schema>();
    const onCreate = () => ({
        firstName: "This first name is too cool for you, please enter something else",
    });
    render(
        <FormProvider schema={schema} formType="create" onCreate={onCreate}>
            <FormControl fieldName="firstName" />
            <Button type="submit">Create</Button>
        </FormProvider>
    );

    const firstNameTextBox = screen.getByRole("textbox", { name: "First Name:*" });
    userEvent.type(firstNameTextBox, "Calvin");
    userEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() =>
        expect(firstNameTextBox).toHaveAccessibleDescription(
            "This first name is too cool for you, please enter something else"
        )
    );
});

test("User can submit form only when all fields contain valid values", async () => {
    const onCreate = jest.fn();
    const { container } = render(
        <FormProvider schema={testSchema} formType="create" onCreate={onCreate}>
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
            <Button type="submit">Create</Button>
        </FormProvider>
    );

    userEvent.type(screen.getByRole("textbox", { name: "Coordinates:*" }), "41.40338, 2.17403");
    userEvent.type(screen.getByRole("textbox", { name: "First Name:*" }), "John");

    userEvent.click(screen.getByRole("button", { name: "Create" }));
    await waitFor(() =>
        expect(screen.getByRole("spinbutton", { name: "Age:*" })).toHaveAccessibleDescription("Age is a required field")
    );

    expect(screen.getByRole("spinbutton", { name: "Temperature:*" })).toBeInTheDocument();

    expect(screen.getByText("Please choose a valid option")).toBeInTheDocument();

    expect(screen.getByRole("combobox", { name: "Hobbies:" })).not.toHaveAccessibleDescription(
        "Please choose a valid option"
    );

    expect(screen.getByRole("textbox", { name: "Last Name:" })).not.toHaveAccessibleDescription(
        "Last name is a required field"
    );

    expect(screen.getByRole("textbox", { name: "Notes:*" })).toHaveAccessibleDescription("Notes is a required field");
    expect(screen.getByPlaceholderText("Enter flight notes...")).toBeVisible();

    expect(onCreate).not.toHaveBeenCalled();

    userEvent.type(screen.getByRole("spinbutton", { name: "Age:*" }), "25");
    await waitFor(() =>
        expect(screen.getByRole("spinbutton", { name: "Age:*" })).not.toHaveAccessibleDescription(
            "Age is a required field"
        )
    );

    userEvent.type(screen.getByRole("spinbutton", { name: "Temperature:*" }), "1");
    await waitFor(() =>
        expect(screen.getByRole("spinbutton", { name: "Temperature:*" })).not.toHaveAccessibleDescription(
            "Temperature is a required field"
        )
    );

    const genderSelect = screen.getByRole("combobox", { name: "Gender:*" });
    await selectEvent.select(genderSelect, "male");

    await waitFor(() =>
        expect(screen.getByRole("combobox", { name: "Gender:*" })).not.toHaveAccessibleDescription(
            "Please choose a valid option"
        )
    );

    const hobbiesSelect = screen.getByRole("combobox", { name: "Hobbies:" });
    await selectEvent.select(hobbiesSelect, "Sleeping");

    userEvent.click(screen.getByRole("checkbox", { name: "Vegetarian: Vegetarian" }));

    // eslint-disable-next-line testing-library/no-container
    const dropzoneInput = container.querySelector<HTMLInputElement>(`input[type="file"]`);
    const files = [new File(["hello"], "hello.png", { type: "image/png" })];

    userEvent.upload(dropzoneInput!, files);
    await waitForElementToBeRemoved(() => screen.queryByText("Please select at least one attachment"));

    userEvent.type(screen.getByRole("textbox", { name: "Notes:*" }), "Pretty windy today");

    const dateOfBirth = toUTCDate(startOfToday());
    const dateOfBirthPicker = screen.getByLabelText("Date of Birth:*");
    selectDate(dateOfBirthPicker, dateOfBirth);

    userEvent.click(screen.getByRole("button", { name: "Create" }));

    await waitFor(() =>
        expect(onCreate).toHaveBeenCalledWith(
            {
                firstName: "John",
                age: 25,
                gender: { value: "male", label: "male" },
                hobbies: [{ value: "Sleeping", label: "Sleeping" }],
                isVegetarian: true,
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

test("User cannot see an readOnly text form field", () => {
    render(
        <FormProvider schema={testSchema} formType="create" onCreate={jest.fn()}>
            <FormControl fieldName="firstName" helperText="Non-unique identifier defined by your parents" />
        </FormProvider>
    );

    const FirstNameTextBox = screen.getByRole("textbox", { name: "First Name:*" });
    const style = window.getComputedStyle(FirstNameTextBox);
    expect(FirstNameTextBox).toHaveProperty("readOnly", false);
    expect(style.border).toBe("1px solid");
}, 30_000);

test("User can see an readOnly text form field", () => {
    render(
        <FormProvider schema={testSchema} formType="create" onCreate={jest.fn()}>
            <FormControl fieldName="firstName" isReadOnly helperText="Non-unique identifier defined by your parents" />
        </FormProvider>
    );

    const FirstNameTextBox = screen.getByRole("textbox", { name: "First Name:*" });
    const style = window.getComputedStyle(FirstNameTextBox);
    expect(FirstNameTextBox).toHaveProperty("readOnly", true);
    expect(style.border).toBe("transparent");
}, 30_000);

test("User can choose a different option in the radio button", async () => {
    const testSchema = object({
        hairColor: radioGroup({
            options: [
                {
                    label: "Red",
                    value: "red",
                },
                {
                    label: "Blue",
                    value: "blue",
                },
                {
                    label: "Green",
                    value: "green",
                },
            ],
            errorMessage: "Something went wrong",
            defaultValue: "red",
        }).label("Hair Color"),
    });
    const FormControl = createFormControl<typeof testSchema>();
    const onCreate = jest.fn();
    render(
        <FormProvider schema={testSchema} formType="create" onCreate={onCreate}>
            <FormControl fieldName="hairColor" />
            <Button type="submit">Create</Button>
        </FormProvider>
    );

    userEvent.click(screen.getByRole("radio", { name: "Blue" }));
    userEvent.click(screen.getByRole("button", { name: "Create" }));
    await waitFor(() => {
        expect(onCreate).toHaveBeenCalledWith(
            {
                hairColor: "blue",
            },
            expect.any(Function)
        );
    });
}, 30_000);
