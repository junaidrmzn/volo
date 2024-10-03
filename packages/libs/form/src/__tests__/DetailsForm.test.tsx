import { configure, render, screen } from "@voloiq/testing";
import { FormProvider } from "../form-context/FormProvider";
import { FormControl, initialValues, testSchema } from "./testSchema";

configure({ asyncUtilTimeout: 10_000 });

test("User sees pre-filled values but cannot edit a detail form", async () => {
    render(
        <FormProvider schema={testSchema} formType="details" initialValues={initialValues}>
            <FormControl fieldName="coordinates" />
            <FormControl fieldName="firstName" />
            <FormControl fieldName="lastName" />
            <FormControl fieldName="age" />
            <FormControl fieldName="gender" />
            <FormControl fieldName="hobbies" />
            <FormControl fieldName="isVegetarian" />
            <FormControl fieldName="attachments" />
            <FormControl fieldName="notes" />
        </FormProvider>
    );

    expect(screen.getByRole("textbox", { name: "Coordinates:*" })).toHaveValue("41.40338, 2.17403");
    expect(screen.getByRole("textbox", { name: "Coordinates:*" })).toBeDisabled();

    expect(screen.getByRole("textbox", { name: "First Name:*" })).toHaveValue("John");
    expect(screen.getByRole("textbox", { name: "First Name:*" })).toBeDisabled();

    expect(screen.getByRole("textbox", { name: "Last Name:" })).toHaveValue("Doe");
    expect(screen.getByRole("textbox", { name: "Last Name:" })).toBeDisabled();

    expect(screen.getByRole("spinbutton", { name: "Age:*" })).toHaveValue("25");
    expect(screen.getByRole("spinbutton", { name: "Age:*" })).toBeDisabled();

    expect(screen.getByText("male")).toBeVisible();
    expect(screen.getByRole("combobox", { name: "Gender:*" })).toBeDisabled();

    expect(screen.getByText("Sleeping")).toBeInTheDocument();
    expect(screen.getByText("Eating")).toBeInTheDocument();
    expect(screen.queryByText("Tennis")).not.toBeInTheDocument();
    expect(screen.queryByText("Football")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Hobbies:" })).toBeDisabled();

    expect(screen.getByRole("checkbox", { name: "Vegetarian: Vegetarian" })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Vegetarian: Vegetarian" })).toBeDisabled();

    expect(screen.getByRole("button", { name: "Attachments:*" })).toBeDisabled();

    expect(screen.getByRole("textbox", { name: "Notes:*" })).toHaveValue("Pretty windy today");
    expect(screen.getByRole("textbox", { name: "Notes:*" })).toBeDisabled();
}, 30_000);
