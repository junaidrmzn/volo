import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { NumberRangeFilter } from "../NumberRangeFilter";

const InputRangeNumberForm = () => {
    const formData = useForm({ mode: "onChange" });

    return (
        <FormProvider {...formData}>
            <NumberRangeFilter
                displayName="Max. Velocity"
                fromLabel="From"
                toLabel="To"
                propertyName="velocityRange"
                type="numberRange"
            />
        </FormProvider>
    );
};

test("Access NumberRangeFilter", async () => {
    render(<InputRangeNumberForm />);

    const filterElement = screen.getByRole("group", { name: "Max. Velocity" });
    userEvent.type(within(filterElement).getByRole("spinbutton", { name: "From" }), "10");
});
